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

try:
    from models.forecasting_kel9 import predict_congestion
except ImportError:
    predict_congestion = None

try:
    from models.forecasting_kel8 import predict_violations
except ImportError:
    predict_violations = None

try:
    from models.forecasting_kendaraan import predict_kendaraan
except ImportError:
    predict_kendaraan = None

# 1. Initialize DB tables
Base.metadata.create_all(bind=engine)

# 2. Define Lifespan for Model Loading
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Loading all YOLO models...")
    load_all_models()
    print("Models loaded. Startup complete.")
    yield
    print("Shutting down.")

app = FastAPI(lifespan=lifespan)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Define Response Schema matching frontend ApiResponse<T>
class ApiResponse(BaseModel):
    status: str
    message: Optional[str] = None
    data: Any

# 4. API Endpoints
@app.post("/detection/analyze-all", response_model=ApiResponse)
async def analyze_all(file: UploadFile = File(...)):
    try:
        # Read image
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if frame is None:
            return ApiResponse(
                status="error",
                message="Invalid image file format",
                data=None
            )

        # Run parallel detection
        results, errors = detect_all(frame)

        # Determine status
        status = "success"
        message = "All models ran successfully."
        if errors > 0:
            if errors == 5:
                status = "error"
                message = "All models failed to run."
            else:
                message = f"Detection completed with {errors} model error(s)."

        # Save to DB
        db = SessionLocal()
        try:
            history = DetectionHistory(
                filename=file.filename,
                results=results
            )
            db.add(history)
            db.commit()
            db.refresh(history)
        finally:
            db.close()

        return ApiResponse(
            status=status,
            message=message,
            data={"history_id": history.id if 'history' in locals() else None, "detections": results}
        )

    except Exception as e:
        return ApiResponse(
            status="error",
            message=str(e),
            data=None
        )

# 5. Forecasting Endpoint
@app.get("/forecasting/current", response_model=ApiResponse)
async def get_forecast(
    origin: str = "Simpang SKA", 
    destination: str = "Bandara SSK II", 
    weather: str = "Cerah", 
    temp_c: float = 30.0
):
    if not predict_congestion:
        return ApiResponse(status="error", message="Forecasting model not loaded", data=None)

    db = SessionLocal()
    try:
        # Get YOLO history for the last 12 hours
        now = datetime.utcnow()
        twelve_hours_ago = now - timedelta(hours=12)
        
        # Query db for detections
        records = db.query(DetectionHistory).filter(DetectionHistory.timestamp >= twelve_hours_ago).all()
        
        yolo_history = {}
        kendaraan_hourly = {}
        for record in records:
            if not record.results: continue
            
            # Record results format: dict of models -> {status, message, data: [detections]}
            kendaraan_res = record.results.get('kendaraan', {})
            if kendaraan_res.get('status') == 'success' and kendaraan_res.get('data'):
                hour = record.timestamp.hour
                # Add to YOLO history (count vehicles)
                yolo_history[hour] = yolo_history.get(hour, 0) + len(kendaraan_res['data'])
                
                # Detail per kelas untuk lstm kendaraan
                if hour not in kendaraan_hourly:
                    kendaraan_hourly[hour] = {'Mobil': 0, 'Bus': 0, 'Truk': 0, 'Motor': 0}
                for det in kendaraan_res['data']:
                    name = det.get('name')
                    if name in kendaraan_hourly[hour]:
                        kendaraan_hourly[hour][name] += 1

        # Since UTC hour might be different, let's just use it directly or convert to local.
        # For simplicity, we use local hour for the prediction target
        local_now = datetime.now()
        target_hour = (local_now + timedelta(hours=1)).strftime("%H:00")
        
        result_kel9 = predict_congestion(
            origin=origin,
            destination=destination,
            weather=weather,
            temp_c=temp_c,
            target_hour_str=target_hour,
            current_date=local_now.date(),
            yolo_history=yolo_history
        )
        
        # Hitung total pelanggaran hari ini (untuk input Kelompok 8)
        today_start_utc = now.replace(hour=0, minute=0, second=0, microsecond=0)
        records_today = db.query(DetectionHistory).filter(DetectionHistory.timestamp >= today_start_utc).all()
        
        total_violations_today = 0
        for record in records_today:
            if not record.results: continue
            # Model pelanggaran: plat, pajak, helm, boncengan
            for model_name in ['plat', 'pajak', 'helm', 'boncengan']:
                res = record.results.get(model_name, {})
                if res.get('status') == 'success' and res.get('data'):
                    total_violations_today += len(res['data'])

        # Result for Kelompok 8
        if predict_violations:
            tanggal = local_now.strftime("%Y-%m-%d")
            # Jika tidak ada deteksi sama sekali, berikan nilai default historis (misal 25)
            # Jika ada, gunakan hasil deteksi YOLO (total_violations_today)
            input_jumlah = total_violations_today if total_violations_today > 0 else 25
            result_kel8 = predict_violations(tanggal, input_jumlah)
        else:
            result_kel8 = {
                "predicted_violations": total_violations_today,
                "note": "Fungsi predict_violations gagal dimuat."
            }

        # Forecasting lstm kendaraan
        sorted_hours = sorted(kendaraan_hourly.keys())[-3:]
        yolo_history_3_steps = [kendaraan_hourly[h] for h in sorted_hours]
        
        if predict_kendaraan:
            result_kendaraan = predict_kendaraan(yolo_history_3_steps)
        else:
            result_kendaraan = {"error": "Fungsi predict_kendaraan gagal dimuat."}

        return ApiResponse(
            status="success",
            message="Forecasting successful",
            data={
                "congestion": result_kel9,
                "violations": result_kel8,
                "vehicles": result_kendaraan,
                "yolo_history_used": yolo_history,
                "target_hour": target_hour
            }
        )

    except Exception as e:
        import traceback
        traceback.print_exc()
        return ApiResponse(
            status="error",
            message=str(e),
            data=None
        )
    finally:
        db.close()
