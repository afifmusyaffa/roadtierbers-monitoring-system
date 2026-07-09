import cv2
import numpy as np
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import Any, Optional
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from models.detect_all import load_all_models, detect_all
from database import engine, Base, SessionLocal
from db_models import DetectionHistory
from datetime import datetime, timedelta
import pytz

# --- Optional model imports — never crash on missing deps ---
try:
    from models.forecasting_kel9 import predict_congestion
    print("[STARTUP] predict_congestion (kel9): loaded")
except ImportError as e:
    predict_congestion = None
    print(f"[STARTUP] predict_congestion (kel9): NOT loaded — {e}")

try:
    from models.forecasting_kel8 import predict_violations
    print("[STARTUP] predict_violations (kel8): loaded")
except ImportError as e:
    predict_violations = None
    print(f"[STARTUP] predict_violations (kel8): NOT loaded — {e}")

try:
    from models.forecasting_kendaraan import predict_kendaraan
    print("[STARTUP] predict_kendaraan: loaded")
except ImportError as e:
    predict_kendaraan = None
    print(f"[STARTUP] predict_kendaraan: NOT loaded — {e}")

Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("[STARTUP] Loading all YOLO models...")
    load_all_models()
    print("[STARTUP] YOLO model loading complete. Server ready.")
    yield
    print("[SHUTDOWN] Shutting down.")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ApiResponse(BaseModel):
    status: str
    message: Optional[str] = None
    data: Any


def _aggregate_db_records(records: list) -> dict:
    total_vehicles = 0
    total_violations = 0
    total_signs = 0
    vehicle_classes: dict = {}
    yolo_history: dict = {}
    kendaraan_hourly: dict = {}

    for record in records:
        if not record.results:
            continue
        kendaraan_res = record.results.get("kendaraan", {})
        if kendaraan_res.get("status") == "success" and kendaraan_res.get("data"):
            dets = kendaraan_res["data"]
            total_vehicles += len(dets)
            hour = record.timestamp.hour
            yolo_history[hour] = yolo_history.get(hour, 0) + len(dets)
            if hour not in kendaraan_hourly:
                kendaraan_hourly[hour] = {"Mobil": 0, "Bus": 0, "Truk": 0, "Motor": 0}
            for det in dets:
                name = det.get("name")
                vehicle_classes[name] = vehicle_classes.get(name, 0) + 1
                if name in kendaraan_hourly[hour]:
                    kendaraan_hourly[hour][name] += 1

        for model_name in ["helm", "boncengan", "plat", "pajak"]:
            res = record.results.get(model_name, {})
            if res.get("status") == "success" and res.get("data"):
                total_violations += len(res["data"])

        edukasi_res = record.results.get("edukasi", {})
        if edukasi_res.get("status") == "success" and edukasi_res.get("data"):
            total_signs += len(edukasi_res["data"])

    return {
        "total_vehicles": total_vehicles,
        "total_violations": total_violations,
        "total_signs": total_signs,
        "vehicle_classes": vehicle_classes,
        "yolo_history": yolo_history,
        "kendaraan_hourly": kendaraan_hourly,
    }


def _compute_risk_level(vehicle_count: int, violation_count: int) -> str:
    if vehicle_count >= 500 or violation_count >= 30:
        return "Tinggi"
    if vehicle_count >= 200 or violation_count >= 10:
        return "Sedang"
    return "Rendah"


def _compute_congestion_category(vehicle_count: int) -> str:
    if vehicle_count >= 600:
        return "Macet"
    if vehicle_count >= 300:
        return "Padat"
    if vehicle_count >= 100:
        return "Agak Padat"
    return "Lancar"


def _compute_delay_minutes(vehicle_count: int) -> int:
    if vehicle_count <= 50:
        return 0
    return min(int((vehicle_count - 50) / 10), 90)


# ─── Detection endpoint ───────────────────────────────────────────────────────
@app.post("/detection/analyze-all", response_model=ApiResponse)
async def analyze_all(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if frame is None:
            return ApiResponse(status="error", message="Invalid image file format", data=None)

        results, _errors = detect_all(frame)

        models_used = [k for k, v in results.items() if v.get("status") == "success"]
        unavailable_models = [k for k, v in results.items() if v.get("status") in ("belum_tersedia", "error")]

        vehicle_count = 0
        violation_count = 0
        sign_count = 0

        kendaraan_res = results.get("kendaraan", {})
        if kendaraan_res.get("status") == "success" and kendaraan_res.get("data"):
            vehicle_count = len(kendaraan_res["data"])

        for model_name in ["helm", "boncengan", "plat", "pajak"]:
            res = results.get(model_name, {})
            if res.get("status") == "success" and res.get("data"):
                violation_count += len(res["data"])

        edukasi_res = results.get("edukasi", {})
        if edukasi_res.get("status") == "success" and edukasi_res.get("data"):
            sign_count = len(edukasi_res["data"])

        if len(unavailable_models) == 0:
            message = "Semua model berhasil dijalankan."
        elif len(unavailable_models) == len(results):
            message = "Semua model tidak tersedia atau gagal."
        else:
            message = f"Deteksi selesai. Model tidak tersedia: {', '.join(unavailable_models)}."

        db = SessionLocal()
        history_id = None
        try:
            history = DetectionHistory(filename=file.filename, results=results)
            db.add(history)
            db.commit()
            db.refresh(history)
            history_id = history.id
        finally:
            db.close()

        timestamp = datetime.utcnow().isoformat() + "Z"

        return ApiResponse(
            status="success",
            message=message,
            data={
                "data_available": True,
                "mode": "real_inference",
                "source": "uploaded_image",
                "timestamp": timestamp,
                "history_id": history_id,
                "models_used": models_used,
                "unavailable_models": unavailable_models,
                "vehicle_count": vehicle_count,
                "violation_count": violation_count,
                "sign_count": sign_count,
                "summary": {
                    "risk_level": _compute_risk_level(vehicle_count, violation_count),
                    "congestion_category": _compute_congestion_category(vehicle_count),
                    "delay_minutes": _compute_delay_minutes(vehicle_count),
                },
                "detections": results,
                "warnings": [f"Model tidak tersedia: {m}" for m in unavailable_models],
            }
        )

    except Exception as e:
        import traceback
        traceback.print_exc()
        return ApiResponse(status="error", message=str(e), data=None)


# ─── Trip Planner endpoint ────────────────────────────────────────────────────
@app.get("/forecasting/plan", response_model=ApiResponse)
async def plan_trip(
    origin: str,
    destination: str,
    time_mode: str = "berangkat",
    target_time: str = "08:00",
    weather: str = "Cerah",
    temp_c: float = 30.0
):
    local_now = datetime.now()

    if not predict_congestion:
        db = SessionLocal()
        try:
            today_start = local_now.replace(hour=0, minute=0, second=0, microsecond=0)
            record_count = db.query(DetectionHistory).filter(DetectionHistory.timestamp >= today_start).count()
        finally:
            db.close()

        if record_count == 0:
            return ApiResponse(
                status="success",
                message="Belum ada data monitoring.",
                data={
                    "data_available": False,
                    "mode": "no_data",
                    "model_loaded": False,
                    "message": "Belum ada data monitoring. Upload sample gambar melalui halaman Pusat Deteksi AI untuk mulai menghasilkan data."
                }
            )

        db = SessionLocal()
        try:
            today_start = local_now.replace(hour=0, minute=0, second=0, microsecond=0)
            records = db.query(DetectionHistory).filter(DetectionHistory.timestamp >= today_start).all()
            agg = _aggregate_db_records(records)
        finally:
            db.close()

        v = agg["total_vehicles"]
        viol = agg["total_violations"]
        delay = _compute_delay_minutes(v)
        cat = _compute_congestion_category(v)
        risk = _compute_risk_level(v, viol)
        base_travel_time_minutes = 25
        total_travel_time = base_travel_time_minutes + delay

        hour, minute = map(int, target_time.split(":"))
        target_dt = local_now.replace(hour=hour, minute=minute, second=0, microsecond=0)

        if time_mode == "tiba":
            recommended_depart = target_dt - timedelta(minutes=total_travel_time)
            return ApiResponse(
                status="success",
                message="Estimasi berdasarkan data deteksi YOLO hari ini.",
                data={
                    "data_available": True,
                    "mode": "real_aggregate",
                    "model_loaded": False,
                    "source": "database_detection_records",
                    "target_arrival": target_time,
                    "recommended_departure": recommended_depart.strftime("%H:%M"),
                    "base_travel_time": base_travel_time_minutes,
                    "delay_minutes": delay,
                    "total_travel_time": total_travel_time,
                    "congestion_category": cat,
                    "risk_level": risk
                }
            )
        else:
            arrival_time = target_dt + timedelta(minutes=total_travel_time)
            return ApiResponse(
                status="success",
                message="Estimasi berdasarkan data deteksi YOLO hari ini.",
                data={
                    "data_available": True,
                    "mode": "real_aggregate",
                    "model_loaded": False,
                    "source": "database_detection_records",
                    "departure_time": target_time,
                    "estimated_arrival": arrival_time.strftime("%H:%M"),
                    "base_travel_time": base_travel_time_minutes,
                    "delay_minutes": delay,
                    "total_travel_time": total_travel_time,
                    "congestion_category": cat,
                    "risk_level": risk
                }
            )

    try:
        from models.forecasting_kel9 import routes
        route_info = routes.get((origin, destination))
        if route_info is None:
            distance, speed_ff = 5.0, 40
        else:
            distance, speed_ff, _, _, _ = route_info

        base_travel_time_minutes = int(distance / speed_ff * 60)
        now = datetime.now()
        hour, minute = map(int, target_time.split(":"))
        target_dt = now.replace(hour=hour, minute=minute, second=0, microsecond=0)

        db = SessionLocal()
        yolo_history = {}
        try:
            now_utc = datetime.utcnow()
            twelve_hours_ago = now_utc - timedelta(hours=12)
            records = db.query(DetectionHistory).filter(DetectionHistory.timestamp >= twelve_hours_ago).all()
            agg = _aggregate_db_records(records)
            yolo_history = agg["yolo_history"]
        finally:
            db.close()

        if time_mode == "tiba":
            guess_depart = target_dt - timedelta(minutes=base_travel_time_minutes)
            res_guess = predict_congestion(
                origin=origin, destination=destination, weather=weather,
                temp_c=temp_c, target_hour_str=guess_depart.strftime("%H:00"),
                current_date=now.date(), yolo_history=yolo_history
            )
            delay = res_guess["delay_minutes"] if res_guess else 0
            total_travel_time = base_travel_time_minutes + delay
            recommended_depart = target_dt - timedelta(minutes=total_travel_time)
            res_final = predict_congestion(
                origin=origin, destination=destination, weather=weather,
                temp_c=temp_c, target_hour_str=recommended_depart.strftime("%H:00"),
                current_date=now.date(), yolo_history=yolo_history
            )
            delay_final = res_final["delay_minutes"] if res_final else 0
            cat_final = res_final["category"] if res_final else "Tidak Diketahui"
            risk_final = res_final["risk_level"] if res_final else "Rendah"
            total_travel_time_final = base_travel_time_minutes + delay_final
            recommended_depart_final = target_dt - timedelta(minutes=total_travel_time_final)
            return ApiResponse(
                status="success",
                message="Plan generated successfully",
                data={
                    "data_available": True,
                    "mode": "real_inference",
                    "model_loaded": True,
                    "target_arrival": target_time,
                    "recommended_departure": recommended_depart_final.strftime("%H:%M"),
                    "base_travel_time": base_travel_time_minutes,
                    "delay_minutes": delay_final,
                    "total_travel_time": total_travel_time_final,
                    "congestion_category": cat_final,
                    "risk_level": risk_final
                }
            )
        else:
            target_hour_str = target_dt.strftime("%H:00")
            res = predict_congestion(
                origin=origin, destination=destination, weather=weather,
                temp_c=temp_c, target_hour_str=target_hour_str,
                current_date=now.date(), yolo_history=yolo_history
            )
            delay = res["delay_minutes"] if res else 0
            cat = res["category"] if res else "Tidak Diketahui"
            risk = res["risk_level"] if res else "Rendah"
            total_travel_time = base_travel_time_minutes + delay
            arrival_time = target_dt + timedelta(minutes=total_travel_time)
            return ApiResponse(
                status="success",
                message="Plan generated successfully",
                data={
                    "data_available": True,
                    "mode": "real_inference",
                    "model_loaded": True,
                    "departure_time": target_time,
                    "estimated_arrival": arrival_time.strftime("%H:%M"),
                    "base_travel_time": base_travel_time_minutes,
                    "delay_minutes": delay,
                    "total_travel_time": total_travel_time,
                    "congestion_category": cat,
                    "risk_level": risk
                }
            )
    except Exception as e:
        import traceback
        traceback.print_exc()
        return ApiResponse(status="error", message=str(e), data=None)


# ─── Current Forecasting endpoint ────────────────────────────────────────────
@app.get("/forecasting/current", response_model=ApiResponse)
async def get_forecast(
    origin: str = "Simpang SKA",
    destination: str = "Bandara SSK II",
    weather: str = "Cerah",
    temp_c: float = 30.0
):
    local_now = datetime.now()
    target_hour = (local_now + timedelta(hours=1)).strftime("%H:00")

    db = SessionLocal()
    try:
        now_utc = datetime.utcnow()
        twelve_hours_ago = now_utc - timedelta(hours=12)
        records = db.query(DetectionHistory).filter(DetectionHistory.timestamp >= twelve_hours_ago).all()
        agg = _aggregate_db_records(records)

        today_start_utc = now_utc.replace(hour=0, minute=0, second=0, microsecond=0)
        records_today = db.query(DetectionHistory).filter(DetectionHistory.timestamp >= today_start_utc).all()
        agg_today = _aggregate_db_records(records_today)
    finally:
        db.close()

    has_records = len(records) > 0
    yolo_history = agg["yolo_history"]
    kendaraan_hourly = agg["kendaraan_hourly"]
    total_vehicles_today = agg_today["total_vehicles"]
    total_violations_today = agg_today["total_violations"]

    if not has_records:
        return ApiResponse(
            status="success",
            message="Belum ada data monitoring.",
            data={
                "data_available": False,
                "mode": "no_data",
                "model_loaded": predict_congestion is not None,
                "target_hour": target_hour,
                "message": "Belum ada data monitoring. Upload sample gambar melalui halaman Pusat Deteksi AI untuk mulai menghasilkan data.",
                "congestion": None,
                "violations": None,
                "vehicles": None,
                "yolo_history_used": {}
            }
        )

    if predict_violations:
        tanggal = local_now.strftime("%Y-%m-%d")
        input_jumlah = total_violations_today if total_violations_today > 0 else 0
        result_kel8 = predict_violations(tanggal, input_jumlah)
    else:
        result_kel8 = {
            "data_available": total_violations_today > 0,
            "predicted_violations": total_violations_today,
            "input_jumlah": total_violations_today,
            "note": "Model prediksi pelanggaran belum tersedia. Menampilkan hasil deteksi YOLO hari ini.",
        }

    sorted_hours = sorted(kendaraan_hourly.keys())[-3:]
    yolo_history_3_steps = [kendaraan_hourly[h] for h in sorted_hours]
    if predict_kendaraan:
        result_kendaraan = predict_kendaraan(yolo_history_3_steps)
    else:
        result_kendaraan = {
            "data_available": total_vehicles_today > 0,
            "total": total_vehicles_today,
            "note": "Model prediksi kendaraan belum tersedia. Menampilkan hasil deteksi YOLO hari ini.",
        }

    if predict_congestion:
        try:
            result_kel9 = predict_congestion(
                origin=origin,
                destination=destination,
                weather=weather,
                temp_c=temp_c,
                target_hour_str=target_hour,
                current_date=local_now.date(),
                yolo_history=yolo_history
            )
            return ApiResponse(
                status="success",
                message="Forecasting berhasil menggunakan model AI dan data deteksi.",
                data={
                    "data_available": True,
                    "mode": "real_inference",
                    "model_loaded": True,
                    "source": "ml_model_with_db_records",
                    "target_hour": target_hour,
                    "congestion": result_kel9,
                    "violations": result_kel8,
                    "vehicles": result_kendaraan,
                    "yolo_history_used": yolo_history,
                }
            )
        except Exception as e:
            import traceback
            traceback.print_exc()

    v = agg["total_vehicles"]
    viol = agg["total_violations"]
    delay = _compute_delay_minutes(v)
    cat = _compute_congestion_category(v)
    risk = _compute_risk_level(v, viol)

    return ApiResponse(
        status="success",
        message="Forecasting berhasil menggunakan agregasi data deteksi YOLO.",
        data={
            "data_available": True,
            "mode": "real_aggregate",
            "model_loaded": False,
            "source": "database_detection_records",
            "target_hour": target_hour,
            "congestion": {
                "category": cat,
                "delay_minutes": delay,
                "volume_pred": v,
                "risk_level": risk,
            },
            "violations": result_kel8,
            "vehicles": result_kendaraan,
            "yolo_history_used": yolo_history,
        }
    )
