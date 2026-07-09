# ============================================================
# export_lstm_weights.py - Konversi model LSTM .keras -> .npz + .json
#
# Jalankan di mesin yang PUNYA TensorFlow/Keras (mis. laptop dev),
# BUKAN di server (server tidak bisa menjalankan TF karena CPU tanpa AVX).
# Hasil (.npz + .json) di-commit ke repo dan dibaca di server oleh
# models/lstm_numpy.py (NumPy murni).
#
#   python tools/export_lstm_weights.py
#
# Skrip melakukan PARITY CHECK: membandingkan keras.predict vs runtime
# numpy pada input acak; gagal keras jika selisih > 1e-4.
# ============================================================
import json
import os
import sys

import numpy as np

os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "3")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # backend/
sys.path.insert(0, BASE_DIR)

from models.lstm_numpy import NumpyLSTMModel  # noqa: E402

MODELS = [
    os.path.join(BASE_DIR, "weights", "kelompok_8_Jumlah Pelanggaran Lalu Lintas", "model_pelanggaran.keras"),
    os.path.join(BASE_DIR, "weights", "forecasting_kel9", "pku_lstm_model.keras"),
]


def _load_keras(path):
    import keras
    from keras.models import load_model

    try:
        return load_model(path, compile=False)
    except Exception:
        # Fallback utk Keras 2 memuat file yang disimpan Keras 3
        # (buang field 'quantization_config' yang tidak dikenal)
        import keras.layers as layers

        orig = layers.Dense.from_config

        def patched(cls, config):
            config.pop("quantization_config", None)
            return orig(config)

        layers.Dense.from_config = classmethod(patched)
        return load_model(path, compile=False)


def export_one(path):
    print(f"\n== Ekspor: {path}")
    m = _load_keras(path)
    in_shape = m.input_shape  # (None, T, F)
    spec = {"input_shape": [int(in_shape[1]), int(in_shape[2])], "layers": []}
    weights = {}
    for idx, lyr in enumerate(m.layers):
        cname = lyr.__class__.__name__
        if cname == "LSTM":
            W, U, b = lyr.get_weights()
            cfg = lyr.get_config()
            names = [f"l{idx}_W", f"l{idx}_U", f"l{idx}_b"]
            weights[names[0]], weights[names[1]], weights[names[2]] = W, U, b
            spec["layers"].append(
                {
                    "type": "lstm",
                    "units": int(cfg["units"]),
                    "activation": cfg["activation"],
                    "recurrent_activation": cfg["recurrent_activation"],
                    "return_sequences": bool(cfg["return_sequences"]),
                    "weights": names,
                }
            )
            if cfg.get("go_backwards"):
                raise ValueError("go_backwards belum didukung runtime numpy")
        elif cname == "Dense":
            ws = lyr.get_weights()
            cfg = lyr.get_config()
            names = [f"l{idx}_W"] + ([f"l{idx}_b"] if len(ws) > 1 else [])
            weights[names[0]] = ws[0]
            if len(ws) > 1:
                weights[names[1]] = ws[1]
            spec["layers"].append({"type": "dense", "activation": cfg["activation"], "weights": names})
        elif cname in ("Dropout", "InputLayer"):
            spec["layers"].append({"type": "dropout" if cname == "Dropout" else "input", "weights": []})
        else:
            raise ValueError(f"Layer '{cname}' belum didukung -- tambahkan dukungannya di lstm_numpy.py")

    prefix = os.path.splitext(path)[0]
    np.savez(prefix + ".npz", **weights)
    with open(prefix + ".json", "w") as f:
        json.dump(spec, f, indent=1)
    print(f"   -> {prefix}.npz / .json")

    # ---- PARITY CHECK ----
    rng = np.random.default_rng(42)
    x = rng.normal(size=(3, spec["input_shape"][0], spec["input_shape"][1])).astype(np.float32)
    y_keras = m.predict(x, verbose=0)
    y_np = NumpyLSTMModel.load(prefix).predict(x)
    diff = float(np.max(np.abs(y_keras - y_np)))
    print(f"   Parity check: max|keras - numpy| = {diff:.2e}")
    if diff > 1e-4:
        raise AssertionError(f"PARITY GAGAL ({diff}) -- jangan pakai hasil ekspor ini")
    print("   PARITY OK")


if __name__ == "__main__":
    for p in MODELS:
        export_one(p)
    print("\nSemua model terekspor & terverifikasi.")
