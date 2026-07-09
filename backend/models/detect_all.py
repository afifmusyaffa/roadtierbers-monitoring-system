import os
import concurrent.futures

# ============================================================
# Import ultralytics/torch dibungkus try/except.
# Jika dependency berat (torch/ultralytics) gagal dimuat — misalnya
# karena kehabisan RAM (OOM) saat startup — backend TIDAK ikut mati.
# Deteksi YOLO otomatis dinonaktifkan dan endpoint lain (forecasting,
# history, dsb.) tetap berfungsi normal.
# ============================================================
try:
    from ultralytics import YOLO
    _YOLO_AVAILABLE = True
except Exception as e:
    print(f"[detect_all] ultralytics/torch tidak tersedia — deteksi YOLO dinonaktifkan: {e}")
    YOLO = None
    _YOLO_AVAILABLE = False

# Dictionary to hold the loaded models
loaded_models = {}

MODEL_PATHS = {
    "helm": "weights/best_kelompok2_helm.pt",
    "boncengan": "weights/best_kelompok1_boncengan.pt",
    "plat": "weights/best_kelompok4_plat.pt",
    "kendaraan": "weights/best_kelompok6_kendaraan.onnx",
    "edukasi": "weights/best_edukasi.pt",
}

# Set ALLOW_YOLO_DOWNLOAD=1 untuk mengizinkan fallback unduh yolov8n.pt
# dari internet bila model kendaraan tidak ditemukan. Default: dimatikan,
# supaya startup tidak menggantung di server dengan jaringan terbatas.
_ALLOW_DOWNLOAD = os.environ.get("ALLOW_YOLO_DOWNLOAD", "0") == "1"


def load_all_models():
    """Load all available YOLO models (aman: tidak pernah melempar exception)."""
    global loaded_models

    if not _YOLO_AVAILABLE:
        print("[detect_all] Lewati load_all_models() — YOLO tidak tersedia.")
        return

    for name, path in MODEL_PATHS.items():
        if os.path.exists(path):
            try:
                if name == "kendaraan" and path.endswith('.onnx'):
                    loaded_models[name] = YOLO(path, task="detect")
                else:
                    loaded_models[name] = YOLO(path)
                print(f"Successfully loaded model: {name}")
            except BaseException as e:
                print(f"Failed to load model {name}: {e}")
        elif name == "kendaraan" and _ALLOW_DOWNLOAD:
            print(f"Custom model for {name} not found. Falling back to pre-trained yolov8n.pt...")
            try:
                loaded_models[name] = YOLO("yolov8n.pt")
                print(f"Successfully loaded model: {name} (yolov8n.pt)")
            except BaseException as e:
                print(f"Failed to load fallback model {name}: {e}")
        else:
            print(f"Model file not found for {name}: {path}")


def _run_model(name, frame):
    """Run a single model and format the output."""
    if name not in loaded_models:
        return name, {
            "status": "belum_tersedia",
            "message": f"Model {name} belum tersedia di backend",
            "data": None,
        }

    try:
        model = loaded_models[name]
        # Gunakan conf threshold lebih rendah khusus untuk edukasi atau secara general
        # agar lebih sensitif terhadap gambar yang mungkin kurang sempurna/digital
        conf_threshold = 0.15 if name == "edukasi" else 0.25
        results = model(frame, verbose=False, conf=conf_threshold)

        detections = []
        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                conf = float(box.conf[0])
                cls_id = int(box.cls[0])
                cls_name = model.names[cls_id]

                detections.append({
                    "name": cls_name,
                    "class": cls_id,
                    "confidence": conf,
                    "box": {
                        "x1": x1,
                        "y1": y1,
                        "x2": x2,
                        "y2": y2,
                    },
                })

        return name, {
            "status": "success",
            "message": "Detection successful",
            "data": detections,
        }
    except Exception as e:
        print(f"Error running model {name}: {e}")
        return name, {
            "status": "error",
            "message": str(e),
            "data": None,
        }


def detect_all(frame):
    """
    Run all loaded models in parallel on the given frame.
    Returns: (results_dict, error_count)
    """
    results_dict = {}
    error_count = 0

    # Run in parallel
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        future_to_name = {executor.submit(_run_model, name, frame): name for name in MODEL_PATHS.keys()}

        for future in concurrent.futures.as_completed(future_to_name):
            name, res = future.result()
            results_dict[name] = res
            if res["status"] == "error":
                error_count += 1

    return results_dict, error_count
