# ============================================================
# lstm_numpy.py - Runtime inference LSTM berbasis NumPy murni.
#
# KENAPA FILE INI ADA:
#   Server produksi (CPU tanpa instruksi AVX, hanya SSE2) TIDAK BISA
#   menjalankan TensorFlow (binary resmi TF wajib AVX -> proses mati
#   dengan "Illegal instruction"). Model LSTM .keras kelompok 8 & 9
#   karenanya dikonversi menjadi bobot .npz + spesifikasi .json
#   (lihat tools/export_lstm_weights.py), lalu dijalankan di sini
#   dengan NumPy murni -- hasil numeriknya identik dengan Keras
#   (diverifikasi parity check < 1e-5 saat ekspor).
#
# Layer yang didukung: LSTM (stacked, return_sequences), Dense,
# Dropout (identitas saat inference). Cukup untuk model kel8 & kel9.
#
# API meniru Keras seperlunya:
#   model = NumpyLSTMModel.load(prefix_path)   # tanpa ekstensi
#   y = model.predict(x, verbose=0)            # x: (batch, T, F) -> (batch, out)
# ============================================================
import json
import os
import numpy as np


def _sigmoid(x):
    # Stabil secara numerik
    return 1.0 / (1.0 + np.exp(-x))


def _hard_sigmoid(x):
    return np.clip(0.2 * x + 0.5, 0.0, 1.0)


_ACT = {
    "linear": lambda x: x,
    None: lambda x: x,
    "tanh": np.tanh,
    "sigmoid": _sigmoid,
    "hard_sigmoid": _hard_sigmoid,
    "relu": lambda x: np.maximum(0.0, x),
    "softmax": lambda x: np.exp(x - x.max(axis=-1, keepdims=True))
    / np.exp(x - x.max(axis=-1, keepdims=True)).sum(axis=-1, keepdims=True),
}


def _act(name):
    if name not in _ACT:
        raise ValueError(f"Aktivasi tidak didukung: {name}")
    return _ACT[name]


class _LSTMLayer:
    def __init__(self, W, U, b, activation, recurrent_activation, return_sequences):
        # Layout bobot Keras: W (input_dim, 4*units), U (units, 4*units),
        # b (4*units,), urutan gerbang: i, f, c(g), o
        self.W = W.astype(np.float32)
        self.U = U.astype(np.float32)
        self.b = b.astype(np.float32)
        self.units = U.shape[0]
        self.act = _act(activation)
        self.rec_act = _act(recurrent_activation)
        self.return_sequences = return_sequences

    def __call__(self, x):
        # x: (batch, T, F) -> (batch, T, units) atau (batch, units)
        batch, T, _ = x.shape
        u = self.units
        h = np.zeros((batch, u), dtype=np.float32)
        c = np.zeros((batch, u), dtype=np.float32)
        outs = np.empty((batch, T, u), dtype=np.float32) if self.return_sequences else None
        for t in range(T):
            z = x[:, t, :] @ self.W + h @ self.U + self.b
            i = self.rec_act(z[:, :u])
            f = self.rec_act(z[:, u : 2 * u])
            g = self.act(z[:, 2 * u : 3 * u])
            o = self.rec_act(z[:, 3 * u :])
            c = f * c + i * g
            h = o * self.act(c)
            if outs is not None:
                outs[:, t, :] = h
        return outs if self.return_sequences else h


class _DenseLayer:
    def __init__(self, W, b, activation):
        self.W = W.astype(np.float32)
        self.b = b.astype(np.float32) if b is not None else None
        self.act = _act(activation)

    def __call__(self, x):
        y = x @ self.W
        if self.b is not None:
            y = y + self.b
        return self.act(y)


class NumpyLSTMModel:
    def __init__(self, layers, input_shape):
        self.layers = layers
        self.input_shape = tuple(input_shape)  # (T, F)

    @classmethod
    def load(cls, prefix):
        """prefix: path tanpa ekstensi; membutuhkan <prefix>.json dan <prefix>.npz"""
        spec_path = prefix + ".json"
        npz_path = prefix + ".npz"
        if not (os.path.exists(spec_path) and os.path.exists(npz_path)):
            raise FileNotFoundError(f"Artefak model tidak ditemukan: {prefix}.json/.npz")
        with open(spec_path, "r") as f:
            spec = json.load(f)
        wz = np.load(npz_path)
        layers = []
        for lyr in spec["layers"]:
            t = lyr["type"]
            if t == "lstm":
                layers.append(
                    _LSTMLayer(
                        wz[lyr["weights"][0]],
                        wz[lyr["weights"][1]],
                        wz[lyr["weights"][2]],
                        lyr["activation"],
                        lyr["recurrent_activation"],
                        lyr["return_sequences"],
                    )
                )
            elif t == "dense":
                b = wz[lyr["weights"][1]] if len(lyr["weights"]) > 1 else None
                layers.append(_DenseLayer(wz[lyr["weights"][0]], b, lyr["activation"]))
            elif t in ("dropout", "input"):
                continue  # identitas saat inference
            else:
                raise ValueError(f"Tipe layer tidak didukung: {t}")
        return cls(layers, spec["input_shape"])

    def predict(self, x, verbose=0):  # signature meniru Keras (verbose diabaikan)
        x = np.asarray(x, dtype=np.float32)
        if x.ndim == 2:  # (T, F) -> (1, T, F)
            x = x[None, ...]
        out = x
        for lyr in self.layers:
            out = lyr(out)
        return out
