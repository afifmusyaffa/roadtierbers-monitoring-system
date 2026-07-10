import numpy as np
import math
import joblib
from datetime import datetime, date
import os

# ============================================================
# Server produksi ber-CPU tanpa AVX sehingga TensorFlow tidak bisa
# dijalankan (crash "Illegal instruction"). Model .keras telah
# dikonversi ke bobot .npz + .json (tools/export_lstm_weights.py,
# parity check vs Keras < 1e-7) dan dijalankan dengan NumPy murni
# lewat models/lstm_numpy.py. Perilaku & hasil prediksi identik.
# ============================================================
try:
    from models.lstm_numpy import NumpyLSTMModel
except ImportError:
    from lstm_numpy import NumpyLSTMModel

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WEIGHTS_DIR = os.path.join(BASE_DIR, "..", "weights", "forecasting_kel9")

# Load model dan scaler
try:
    model_kel9 = NumpyLSTMModel.load(os.path.join(WEIGHTS_DIR, "pku_lstm_model"))
    scaler_X_kel9 = joblib.load(os.path.join(WEIGHTS_DIR, "pku_scaler_X.pkl"))
    scaler_y_kel9 = joblib.load(os.path.join(WEIGHTS_DIR, "pku_scaler_y.pkl"))
    feature_cols = joblib.load(os.path.join(WEIGHTS_DIR, "feature_columns.pkl"))
    onehot_cols = joblib.load(os.path.join(WEIGHTS_DIR, "onehot_columns.pkl"))
    print("Successfully loaded Kelompok 9 Forecasting Model")
except Exception as e:
    print(f"Failed to load Kelompok 9 model: {e}")
    model_kel9 = None

# Definisi rute valid: (distance_km, speed_free_flow, speed_min_macet, base_volume, tipe)
routes = {
    ("Pandau", "Simpang Tiga"): (12.0, 42, 10, 2800, "komuter"),
    ("Simpang SKA", "Bandara SSK II"): (8.5, 40, 15, 2200, "bandara"),
    ("Panam (UNRI)", "Simpang SKA"): (6.0, 38, 10, 2500, "kampus"),
    ("Pasar Pusat", "Rumbai"): (10.0, 35, 12, 2000, "pasar_industri"),
    ("Jl. Sudirman (MTQ)", "Kantor Gubernur"): (5.0, 40, 12, 2400, "perkantoran"),
    ("Harapan Raya", "Sudirman"): (7.5, 35, 10, 2600, "komersial"),
}

HOLIDAYS_2025 = {
    date(2025, 1, 1), date(2025, 1, 27), date(2025, 1, 29),
    date(2025, 3, 29), date(2025, 3, 31), date(2025, 4, 1),
    date(2025, 4, 18), date(2025, 5, 1), date(2025, 5, 12),
    date(2025, 5, 29), date(2025, 6, 1), date(2025, 6, 6),
    date(2025, 6, 27), date(2025, 8, 17), date(2025, 9, 5),
    date(2025, 12, 25),
}
RAMADAN_START, RAMADAN_END = date(2025, 3, 1), date(2025, 3, 29)
MUDIK_START, MUDIK_END = date(2025, 3, 24), date(2025, 4, 8)

def get_category(delay, distance):
    delay_per_km = delay / distance
    if delay_per_km < 0.5:
        return "Lancar"
    elif delay_per_km < 1.2:
        return "Agak Padat"
    elif delay_per_km < 2.5:
        return "Padat"
    elif delay_per_km < 4.0:
        return "Macet"
    return "Macet Total"

def gaussian_peak(hour, center, sigma, amplitude):
    return amplitude * math.exp(-0.5 * ((hour - center) / sigma) ** 2)

def get_congestion_factor(tipe, hour, is_wknd, is_hol, is_ram, is_mud):
    cf = 0.0
    if tipe == "komuter":
        cf = gaussian_peak(hour, 7.0, 1.5, 1.15) + gaussian_peak(hour, 17.5, 2.0, 1.25) + gaussian_peak(hour, 12.5, 1.5, 0.35)
        if is_wknd: cf *= 0.30
        if is_hol: cf *= 0.25
        if is_mud: cf *= 0.50
        if is_ram: cf += gaussian_peak(hour, 16.5, 1.2, 0.40)
    elif tipe == "bandara":
        cf = gaussian_peak(hour, 6.5, 1.8, 0.90) + gaussian_peak(hour, 17.0, 1.8, 0.85)
        if is_wknd: cf *= 0.85
        if is_hol: cf *= 1.10
        if is_mud: cf *= 1.20
    elif tipe == "kampus":
        cf = gaussian_peak(hour, 7.5, 1.0, 1.10) + gaussian_peak(hour, 12.5, 1.0, 0.65) + gaussian_peak(hour, 17.0, 1.5, 0.90)
        if is_wknd: cf *= 0.20
        if is_hol: cf *= 0.15
        if is_mud: cf *= 0.30
    elif tipe == "pasar_industri":
        cf = gaussian_peak(hour, 6.5, 2.0, 1.00) + gaussian_peak(hour, 15.5, 1.8, 0.60)
        if is_wknd: cf *= 0.55
        if is_hol: cf *= 0.40
        if is_ram: cf += gaussian_peak(hour, 16.5, 1.0, 0.30)
    elif tipe == "perkantoran":
        cf = gaussian_peak(hour, 7.5, 0.9, 1.05) + gaussian_peak(hour, 12.5, 0.9, 0.45) + gaussian_peak(hour, 16.5, 1.0, 0.90)
        if is_wknd: cf *= 0.10
        if is_hol: cf *= 0.08
        if is_mud: cf *= 0.40
        if is_ram: cf += gaussian_peak(hour, 16.0, 0.8, 0.30)
    elif tipe == "komersial":
        cf = gaussian_peak(hour, 11.0, 3.0, 0.55) + gaussian_peak(hour, 18.0, 2.5, 0.75) + gaussian_peak(hour, 14.0, 2.0, 0.45)
        if is_wknd: cf *= 1.25
        if is_hol: cf *= 1.15
        if is_ram: cf += gaussian_peak(hour, 17.0, 1.0, 0.40)

    cf += 0.03
    return max(0.0, cf)

def get_volume_from_cf(cf, base_vol):
    return int(base_vol * (0.3 + 0.9 * cf))

def get_onehot_vector(weather, origin, destination):
    onehot_dict = {col: 0 for col in onehot_cols}
    if f"weather_{weather}" in onehot_dict: onehot_dict[f"weather_{weather}"] = 1
    if f"origin_{origin}" in onehot_dict: onehot_dict[f"origin_{origin}"] = 1
    if f"dest_{destination}" in onehot_dict: onehot_dict[f"dest_{destination}"] = 1
    return [onehot_dict[col] for col in onehot_cols]

_WEATHER_ALIASES = {
    "cerah": "Cerah", "berawan": "Berawan", "mendung": "Berawan",
    "hujan ringan": "Hujan Ringan", "gerimis": "Hujan Ringan",
    "hujan deras": "Hujan Deras", "hujan lebat": "Hujan Deras", "hujan": "Hujan Deras",
    "berkabut": "Berkabut/Asap", "kabut": "Berkabut/Asap", "asap": "Berkabut/Asap",
    "berkabut/asap": "Berkabut/Asap",
}

def _normalize_weather(w):
    """Samakan input cuaca apa pun (beda kapital/sinonim) dengan kategori training."""
    if not w:
        return w
    return _WEATHER_ALIASES.get(str(w).strip().lower(), w)

def predict_congestion(origin, destination, weather, temp_c, target_hour_str, current_date, yolo_history=None):
    weather = _normalize_weather(weather)
    """
    yolo_history: dictionary berisi data YOLO per jam, e.g. {8: 500, 9: 750}
    """
    if model_kel9 is None:
        return None

    route_info = routes.get((origin, destination))
    if route_info is None:
        # Fallback default
        distance, speed_ff, speed_min, base_vol, tipe = 5.0, 40, 12, 2000, "komuter"
    else:
        distance, speed_ff, speed_min, base_vol, tipe = route_info
        
    target_hour = int(target_hour_str.split(":")[0])
    month_num = current_date.month
    dow_num = current_date.weekday()
    
    is_weekend = 1 if dow_num >= 5 else 0
    is_hol = 1 if current_date in HOLIDAYS_2025 else 0
    is_ram = 1 if RAMADAN_START <= current_date <= RAMADAN_END else 0
    is_mud = 1 if MUDIK_START <= current_date <= MUDIK_END else 0
    
    onehot_vals = get_onehot_vector(weather, origin, destination)
    
    X = []
    
    for i in range(12):
        h = (target_hour - 12 + i) % 24
        
        # Kombinasi YOLO & Simulasi Kelompok 9
        # Jika data YOLO untuk jam h ada, gunakan itu. Jika tidak, gunakan simulasi base_vol.
        if yolo_history and h in yolo_history:
            volume = yolo_history[h]
            is_rush = 1 if volume > (base_vol * 0.7) else 0 # Threshold estimasi
        else:
            cf = get_congestion_factor(tipe, h, is_weekend, is_hol, is_ram, is_mud)
            is_rush = 1 if cf >= 0.45 else 0
            volume = get_volume_from_cf(cf, base_vol)
        
        cont_features = [distance, volume, temp_c]
        bin_features = [is_weekend, is_rush, is_hol, is_ram, is_mud]
        cyc_features = [
            np.sin(2 * np.pi * h / 24), np.cos(2 * np.pi * h / 24),
            np.sin(2 * np.pi * month_num / 12), np.cos(2 * np.pi * month_num / 12),
            np.sin(2 * np.pi * dow_num / 7), np.cos(2 * np.pi * dow_num / 7)
        ]
        
        row = cont_features + bin_features + cyc_features + onehot_vals
        X.append(row)

    X = np.array(X, dtype=np.float32)
    X[:, 0:3] = scaler_X_kel9.transform(X[:, 0:3])
    X_scaled = X.reshape(1, 12, len(feature_cols))

    pred_scaled = model_kel9.predict(X_scaled, verbose=0)
    delay_log = scaler_y_kel9.inverse_transform(pred_scaled)[0][0]
    delay = np.expm1(delay_log)
    delay = max(0.0, float(delay))
    
    # Sesuaikan baseline volume dengan rata-rata realitas YOLO hari ini
    recent_ratios = []
    if yolo_history:
        for h, v in yolo_history.items():
            sim_cf = get_congestion_factor(tipe, h, is_weekend, is_hol, is_ram, is_mud)
            sim_v = get_volume_from_cf(sim_cf, base_vol)
            if sim_v > 0:
                recent_ratios.append(v / sim_v)
                
    vol_ratio = sum(recent_ratios) / len(recent_ratios) if recent_ratios else 0.0
    
    cf_target = get_congestion_factor(tipe, target_hour, is_weekend, is_hol, is_ram, is_mud)
    volume_pred_raw = get_volume_from_cf(cf_target, base_vol)
    volume_pred = int(volume_pred_raw * vol_ratio)
    
    if vol_ratio == 0.0:
        delay = 0.0
        
    category = get_category(delay, distance)

    return {
        "volume_pred": volume_pred,
        "delay_minutes": round(delay),
        "category": category,
        "risk_level": "Tinggi" if delay > 30 else ("Sedang" if delay > 15 else "Rendah")
    }
