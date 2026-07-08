# ── 1. Import & Setup ───
import os, random, time
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import numpy as np, pandas as pd
import matplotlib.pyplot as plt, matplotlib.dates as mdates
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Input
from tensorflow.keras.callbacks import EarlyStopping

def set_seed(s=42):
    os.environ['PYTHONHASHSEED']=str(s); random.seed(s); np.random.seed(s); tf.random.set_seed(s)
set_seed()

PRIMARY, ACCENT, BG, GRID = '#1A3C6B', '#2E86C1', '#F8FAFC', '#DDE3EA'
plt.rcParams.update({'font.family':'DejaVu Sans','axes.facecolor':BG,'figure.facecolor':'white',
    'axes.grid':True,'grid.color':GRID,'grid.linewidth':0.7,
    'axes.spines.top':False,'axes.spines.right':False})
# ── 2. Load Dataset (HARIAN) ───
df = pd.read_csv('data_pelanggaran.csv')
df['Tanggal'] = pd.to_datetime(df['Tanggal'])
df = df.sort_values('Tanggal').reset_index(drop=True)
print(f'Jumlah hari   : {len(df):,}')
print(f'Rentang waktu : {df["Tanggal"].min().date()} s.d. {df["Tanggal"].max().date()}')
# ── 3. Sample Data ───
print('=== 5 Data Pertama ==='); print(df.head(), '\n')
print('=== 5 Data Terakhir ==='); print(df.tail(), '\n')
print('=== Tipe Data ==='); print(df.dtypes)
# ── 4. Cek Missing Value & Duplikat ───
print('=== Missing Value ==='); print(df.isnull().sum())
print(f'\nJumlah data duplikat : {df.duplicated().sum()}')
# ── 5. Statistik Deskriptif ───
s = df['Jumlah Pelanggaran']
print(f'Mean   : {s.mean():,.2f}')
print(f'Median : {s.median():,.2f}')
print(f'Std    : {s.std():,.2f}')
print(f'Min    : {s.min():,.0f}   Max : {s.max():,.0f}')
print('\n=== Rata-rata harian per tahun ===')
for th, g in df.groupby(df['Tanggal'].dt.year):
    print(f'  {th} : {g["Jumlah Pelanggaran"].mean():,.0f}  (n={len(g)})')
# ── 6. Line Plot — Tren Harian ───
fig, ax = plt.subplots(figsize=(13,5))
ax.plot(df['Tanggal'], df['Jumlah Pelanggaran'], color=PRIMARY, lw=0.9)
ax.fill_between(df['Tanggal'], df['Jumlah Pelanggaran'], alpha=0.12, color=ACCENT)
ax.xaxis.set_major_locator(mdates.YearLocator())
ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y'))
ax.set_xlabel('Tahun'); ax.set_ylabel('Jumlah Pelanggaran')
ax.set_title('Tren Jumlah Pelanggaran Lalu Lintas Harian (2020–2026)',
             fontsize=13, fontweight='bold', color=PRIMARY)
ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x,_: f'{int(x):,}'))
plt.tight_layout(); plt.show()
# ── 7. Histogram — Distribusi Harian ───
fig, ax = plt.subplots(figsize=(10,5))
ax.hist(df['Jumlah Pelanggaran'], bins=40, color=ACCENT, edgecolor='white', lw=0.4, alpha=0.85)
mv, md_ = s.mean(), s.median()
ax.axvline(mv, color='#E74C3C', ls='--', lw=1.8, label=f'Mean: {mv:,.0f}')
ax.axvline(md_, color='#27AE60', ls='--', lw=1.8, label=f'Median: {md_:,.0f}')
ax.set_xlabel('Jumlah Pelanggaran per Hari'); ax.set_ylabel('Frekuensi')
ax.set_title('Distribusi Pelanggaran Harian', fontsize=13, fontweight='bold', color=PRIMARY)
ax.xaxis.set_major_formatter(plt.FuncFormatter(lambda x,_: f'{int(x):,}'))
ax.legend(); plt.tight_layout(); plt.show()
# ── 8. Diagnosis batas R² ───
v = df['Jumlah Pelanggaran'].values.astype(float)
n = len(v); train_size = int(n*0.8)
true_test = v[train_size:]

cv_test = true_test.std()/true_test.mean()
r2_naive = r2_score(true_test, v[train_size-1:n-1])     # prediksi = nilai kemarin
print(f'Coef. Variasi data TEST : {cv_test:.3f}  (kecil = zona test cenderung datar)')
print(f'Mean train / test       : {v[:train_size].mean():,.0f} / {true_test.mean():,.0f}')
print(f'R² baseline naif (t-1)  : {r2_naive:.4f}  <-- ini "lantai"-nya')
print('\nKesimpulan: pada split standar, R² ~0.4 sudah mendekati batas wajar untuk '
      'prediksi 1 hari ke depan. Untuk R² yang lebih bermakna, lihat walk-forward (bag. 7).')
# ── 9. Bangun fitur ───
dow = df['Tanggal'].dt.dayofweek.values
doy = df['Tanggal'].dt.dayofyear.values
features = np.column_stack([
    v,                                   # 0: nilai harian (target juga)
    np.sin(2*np.pi*dow/7), np.cos(2*np.pi*dow/7),
    np.sin(2*np.pi*doy/365.25), np.cos(2*np.pi*doy/365.25),
])
print('Bentuk matriks fitur :', features.shape, '(nilai + 4 fitur kalender)')
# ── 10. Helper: scaling, windowing, split ───
def create_sequences_mv(F, y, time_steps):
    X, Y = [], []
    for i in range(len(F)-time_steps):
        X.append(F[i:i+time_steps]); Y.append(y[i+time_steps])
    return np.array(X), np.array(Y)

def build_model(time_steps, n_feat, units1=64, units2=32, dropout=0.2, lr=0.001):
    m = Sequential([
        Input((time_steps, n_feat)),
        LSTM(units1, return_sequences=True),
        LSTM(units2),
        Dropout(dropout),
        Dense(1),
    ])
    m.compile(optimizer=tf.keras.optimizers.Adam(lr), loss='mse')
    return m

TIMESTEPS = 21
# ── 11. Latih & evaluasi pada split standar ───
set_seed()
sc_x = MinMaxScaler().fit(features[:train_size]); F = sc_x.transform(features)
sc_y = MinMaxScaler().fit(v[:train_size].reshape(-1,1)); y_scaled = sc_y.transform(v.reshape(-1,1)).flatten()

X, Y = create_sequences_mv(F, y_scaled, TIMESTEPS)
level_idx = np.arange(TIMESTEPS, len(F)); is_test = level_idx >= train_size

model = build_model(TIMESTEPS, F.shape[1])
hist = model.fit(X[~is_test], Y[~is_test], epochs=80, batch_size=32, validation_split=0.1,
                 callbacks=[EarlyStopping('val_loss', patience=10, restore_best_weights=True)], verbose=0)

pred_std = sc_y.inverse_transform(model.predict(X[is_test], verbose=0).reshape(-1,1)).flatten()
actual_std = v[level_idx[is_test]]
r2_std = r2_score(actual_std, pred_std)
mape_std = np.mean(np.abs((actual_std-pred_std)/actual_std))*100
print(f'=== Split standar (pembanding) ===')
print(f'R²   : {r2_std:.4f}   (dekat batas wajar; baseline naif {r2_naive:.4f})')
print(f'MAPE : {mape_std:.2f}%   Akurasi : {100-mape_std:.2f}%')
# ── 12. Walk-Forward ───
def walk_forward(time_steps=21, start=400, step=150,
                 units1=64, units2=32, dropout=0.2, lr=0.001, epochs=40):
    preds, trues, idxs = [], [], []
    dow_a = df['Tanggal'].dt.dayofweek.values; doy_a = df['Tanggal'].dt.dayofyear.values
    feat_all = np.column_stack([v, np.sin(2*np.pi*dow_a/7), np.cos(2*np.pi*dow_a/7),
                                np.sin(2*np.pi*doy_a/365.25), np.cos(2*np.pi*doy_a/365.25)])
    nfeat = feat_all.shape[1]
    for blk in range(start, n, step):
        set_seed()                                  # reproducible tiap fold
        scx = MinMaxScaler().fit(feat_all[:blk]); Fh = scx.transform(feat_all)
        scy = MinMaxScaler().fit(v[:blk].reshape(-1,1))
        yh = scy.transform(v.reshape(-1,1)).flatten()
        Xh, Yh = create_sequences_mv(Fh[:blk], yh[:blk], time_steps)
        m = build_model(time_steps, nfeat, units1, units2, dropout, lr)
        m.fit(Xh, Yh, epochs=epochs, batch_size=32, verbose=0,
              callbacks=[EarlyStopping('loss', patience=6, restore_best_weights=True)])
        end = min(blk+step, n)
        for d in range(blk, end):                   # 1-step-ahead pakai histori aktual
            w = Fh[d-time_steps:d].reshape(1, time_steps, nfeat)
            p = scy.inverse_transform(m.predict(w, verbose=0).reshape(-1,1)).flatten()[0]
            preds.append(p); trues.append(v[d]); idxs.append(d)
    return np.array(preds), np.array(trues), idxs

print('Menjalankan walk-forward (mohon tunggu ~5 menit)...')
t0 = time.time()
wf_pred, wf_true, wf_idx = walk_forward()
wf_mae  = mean_absolute_error(wf_true, wf_pred)
wf_rmse = np.sqrt(mean_squared_error(wf_true, wf_pred))
wf_r2   = r2_score(wf_true, wf_pred)
wf_mape = np.mean(np.abs((wf_true-wf_pred)/wf_true))*100
print(f'\n=== Hasil Walk-Forward ({time.time()-t0:.0f}s) ===')
print(f'Titik OOS : {len(wf_true)} (rentang {wf_true.min():,.0f} -> {wf_true.max():,.0f})')
print(f'MAE  : {wf_mae:,.0f}    RMSE : {wf_rmse:,.0f}')
print(f'R²   : {wf_r2:.4f}')
print(f'MAPE : {wf_mape:.2f}%    Akurasi : {100-wf_mape:.2f}%')
# ── 13. Plot Walk-Forward: Prediksi vs Aktual ───
wf_dates = df['Tanggal'].values[wf_idx]
plt.figure(figsize=(13,5))
plt.plot(wf_dates, wf_true, label='Aktual', color=PRIMARY, lw=0.9)
plt.plot(wf_dates, wf_pred, label=f'Prediksi Walk-Forward (R²={wf_r2:.3f})',
         color='#E74C3C', lw=0.9, ls='--')
plt.ylabel('Jumlah Pelanggaran')
plt.title('Walk-Forward: Prediksi vs Aktual (membentang seluruh rentang)',
          fontweight='bold', color=PRIMARY)
plt.gca().yaxis.set_major_formatter(plt.FuncFormatter(lambda x,_: f'{int(x):,}'))
plt.legend(); plt.tight_layout(); plt.show()
# ── 14. Ringkasan Evaluasi ───
ringkas = pd.DataFrame({
    'Pendekatan':['Baseline naif (t-1)','LSTM split standar','LSTM Walk-Forward'],
    'R²':[f'{r2_naive:.4f}', f'{r2_std:.4f}', f'{wf_r2:.4f}'],
    'MAPE (%)':['-', f'{mape_std:.2f}', f'{wf_mape:.2f}'],
    'Akurasi (%)':['-', f'{100-mape_std:.2f}', f'{100-wf_mape:.2f}'],
})
print('=== Ringkasan Evaluasi ==='); print(ringkas.to_string(index=False))
print('\nMetrik utama (dilaporkan): LSTM Walk-Forward.')
# ── 15a. Latih Model Final pada SELURUH Data ───
set_seed()
sc_x_full = MinMaxScaler().fit(features)
sc_y_full = MinMaxScaler().fit(v.reshape(-1, 1))
F_full = sc_x_full.transform(features)
y_full = sc_y_full.transform(v.reshape(-1, 1)).flatten()

X_full, Y_full = create_sequences_mv(F_full, y_full, TIMESTEPS)
model_final = build_model(TIMESTEPS, F_full.shape[1])
model_final.fit(X_full, Y_full, epochs=80, batch_size=32, validation_split=0.1,
                callbacks=[EarlyStopping('val_loss', patience=10, restore_best_weights=True)],
                verbose=0)
print('Model final dilatih pada', len(X_full), 'sampel (seluruh data).')
# ── 15b. Forecasting 30 Hari ke Depan ───
FORECAST_DAYS = 30
last_date = df['Tanggal'].max()
future_dates = pd.date_range(last_date + pd.Timedelta(days=1), periods=FORECAST_DAYS, freq='D')

window = F_full[-TIMESTEPS:].copy()       # window fitur terakhir (sudah ter-scale)
forecast = []
for fd in future_dates:
    p_scaled = model_final.predict(window.reshape(1, TIMESTEPS, -1), verbose=0).flatten()[0]
    p_value = sc_y_full.inverse_transform([[p_scaled]])[0, 0]
    forecast.append(p_value)
    # bangun baris fitur untuk hari ini: [nilai_prediksi, fitur kalender hari ini]
    d_, y_ = fd.dayofweek, fd.dayofyear
    row_raw = np.array([[p_value, np.sin(2*np.pi*d_/7), np.cos(2*np.pi*d_/7),
                         np.sin(2*np.pi*y_/365.25), np.cos(2*np.pi*y_/365.25)]])
    row_scaled = sc_x_full.transform(row_raw)[0]
    window = np.vstack([window[1:], row_scaled])    # geser window

forecast = np.array(forecast)
hasil = pd.DataFrame({'Tanggal': future_dates.date,
                      'Prediksi Pelanggaran': forecast.astype(int)})
print('=== Forecast 30 Hari ke Depan ===')
print(hasil.to_string(index=False))
print(f'\nRata-rata : {forecast.mean():,.0f} / hari')
print(f'Min / Max : {forecast.min():,.0f} / {forecast.max():,.0f}')
# ── 15c. Plot: Historis + Forecast ───
ctx = 90                                    # tampilkan 90 hari terakhir sbg konteks
plt.figure(figsize=(13, 5))
plt.plot(df['Tanggal'].values[-ctx:], v[-ctx:], color=PRIMARY, lw=1.3,
         label=f'Historis ({ctx} hari terakhir)')
plt.axvline(last_date, color='gray', ls='--', lw=1.2, alpha=0.7)
plt.plot(future_dates, forecast, color='#E74C3C', lw=1.6, ls='--', marker='o',
         markersize=3, label=f'Forecast {FORECAST_DAYS} hari')
plt.ylabel('Jumlah Pelanggaran')
plt.title('Testing — Forecasting Pelanggaran 30 Hari ke Depan',
          fontweight='bold', color=PRIMARY)
plt.gca().yaxis.set_major_formatter(plt.FuncFormatter(lambda x, _: f'{int(x):,}'))
plt.legend()
plt.tight_layout()
plt.show()
from google.colab import files

# Simpan model dalam format .keras
model_final.save('model_pelanggaran.keras')

# Simpan scaler
import pickle
with open('scaler_x.pkl', 'wb') as f:
    pickle.dump(sc_x_full, f)
with open('scaler_y.pkl', 'wb') as f:
    pickle.dump(sc_y_full, f)

# Simpan metadata (timesteps, fitur, tanggal terakhir, window terakhir)
import json
metadata = {
    'timesteps'       : int(TIMESTEPS),
    'n_features'      : int(F_full.shape[1]),
    'feature_order'   : ['nilai', 'sin_dayofweek', 'cos_dayofweek', 'sin_dayofyear', 'cos_dayofyear'],
    'last_date'       : str(df['Tanggal'].max().date()),
    'last_window_raw' : features[-TIMESTEPS:].tolist(),
}
with open('metadata.json', 'w') as f:
    json.dump(metadata, f, indent=2)

# Download semua file
files.download('model_pelanggaran.keras')
files.download('scaler_x.pkl')
files.download('scaler_y.pkl')
files.download('metadata.json')
