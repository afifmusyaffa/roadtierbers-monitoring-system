"use client";

import { useEffect, useState } from "react";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { StatusBadge } from "@/components/common";
import { ForecastVolumeChart, ForecastViolationChart, ForecastCongestionChart } from "@/components/charts/officer-forecasting-charts";

interface ForecastResponseData {
  data_available?: boolean;
  mode?: string;
  model_loaded?: boolean;
  message?: string;
  target_hour?: string;
  congestion?: {
    category?: string;
    delay_minutes?: number;
    volume_pred?: number;
    risk_level?: string;
  };
  violations?: {
    input_tanggal?: string;
    input_jumlah?: number;
    rata_rata_pelanggaran?: number;
    forecast_30_hari?: Array<{tanggal: string; prediksi_pelanggaran: number}>;
  };
  yolo_history_used?: Record<string, number>;
}

export default function OfficerForecastingPage() {
  const [data, setData] = useState<ForecastResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${apiUrl}/forecasting/current`);
        const json = await res.json();
        if (json.status === "success") {
          // Store full data including data_available flag
          setData(json.data);
        } else {
          setError(json.message || "Gagal mengambil data");
        }
      } catch {
        setError("Koneksi ke backend gagal. Pastikan FastAPI berjalan di http://127.0.0.1:8000");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <OfficerPageShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-medium animate-pulse">Menghitung Prediksi AI...</p>
          </div>
        </div>
      </OfficerPageShell>
    );
  }

  if (error) {
    return (
      <OfficerPageShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3 max-w-md">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        </div>
      </OfficerPageShell>
    );
  }

  // No-data state: backend reachable but no detection records yet
  if (!data || data.data_available === false) {
    return (
      <OfficerPageShell>
        <div className="max-w-7xl mx-auto pb-12">
          <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-purple-200 bg-purple-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-purple-700">
                Officer Forecasting
              </span>
              <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">Prediksi Operasional Petugas</h1>
              <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
                Pantauan prediksi volume kendaraan, pelanggaran, dan durasi kemacetan (Real-time AI).
              </p>
            </div>
          </section>
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm max-w-lg w-full">
              <p className="text-4xl mb-4">📊</p>
              <h2 className="text-lg font-medium text-[#0B1F3A] mb-2">Belum Ada Data Monitoring</h2>
              <p className="text-sm font-normal text-slate-600 leading-relaxed mb-6">
                {data?.message || "Upload sample gambar melalui halaman Pusat Deteksi AI untuk mulai menghasilkan data monitoring."}
              </p>
              <a
                href="/officer/ai-detection"
                className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#0B1F3A] text-white text-sm font-semibold hover:bg-[#142d52] transition-colors"
              >
                Buka Pusat Deteksi AI
              </a>
            </div>
          </div>
        </div>
      </OfficerPageShell>
    );
  }

  // Extract Data
  const { congestion, violations, yolo_history_used, target_hour } = data;
  
  // Format Data for Charts
  // hours not directly used — use keys inline below
  
  // 1. Volume Data (History + Target Hour)
  const volumeChartData: {time: string; aktual?: number; prediksi?: number}[] = [];
  const yoloHistoryUsed = yolo_history_used ?? {};
  Object.keys(yoloHistoryUsed).forEach((h, index) => {
    const keys = Object.keys(yoloHistoryUsed);
    const isLast = index === keys.length - 1;
    const vol = yoloHistoryUsed[h] as number;
    volumeChartData.push({
      time: `${String(h).padStart(2, '0')}:00`,
      aktual: vol,
      ...(isLast ? { prediksi: vol } : {}) // link point
    });
  });
  
  // Append prediction
  volumeChartData.push({
    time: target_hour ?? "--:--",
    prediksi: congestion?.volume_pred || 0
  });

  // 2. Congestion Data (Simulate history based on volume proportion to delay_minutes)
  const targetVol = congestion?.volume_pred || 1;
  const targetDelay = congestion?.delay_minutes || 0;
  const congestionChartData = volumeChartData.map(d => {
    const res: {time: string; aktual?: number; prediksi?: number} = { time: d.time };
    if (d.aktual !== undefined) {
      res.aktual = Number(((d.aktual / targetVol) * targetDelay).toFixed(1));
    }
    if (d.prediksi !== undefined) {
      res.prediksi = Number(((d.prediksi / targetVol) * targetDelay).toFixed(1));
    }
    return res;
  });

  // 3. Violation Data (Next 7 days from Kel 8)
  const violationChartData: {time: string; aktual?: number; prediksi?: number}[] = [];
  if (violations) {
    violationChartData.push({
      time: violations.input_tanggal ?? "--",
      aktual: violations.input_jumlah ?? 0
    });
    (violations.forecast_30_hari as Array<{tanggal: string; prediksi_pelanggaran: number}> || []).slice(0, 7).forEach((d) => {
      violationChartData.push({
        time: d.tanggal,
        prediksi: d.prediksi_pelanggaran
      });
    });
  }

  // KPIs
  // Use the average of available actual volumes to prevent massive spikes from partial hour data
  const actualVolumes = volumeChartData.slice(0, -1).map(d => d.aktual).filter(v => v !== undefined);
  const avgVolume = actualVolumes.length > 0 
    ? actualVolumes.reduce((acc, curr) => acc + curr, 0) / actualVolumes.length 
    : 0;
  
  const currentVolume = avgVolume;
  const predVolume = congestion?.volume_pred || 0;
  const volumeChange = currentVolume ? (((predVolume - currentVolume) / currentVolume) * 100).toFixed(1) : 0;
  
  const volumeChangeNum = parseFloat(String(volumeChange));
  const volumeChangeLabel = volumeChangeNum > 0 ? "Kenaikan Volume Kendaraan" : (volumeChangeNum < 0 ? "Penurunan Volume Kendaraan" : "Perubahan Volume Kendaraan");
  const volumeChangeValue = `${volumeChangeNum > 0 ? '+' : ''}${volumeChangeNum}%`;
  const volumeChangeColor = volumeChangeNum > 0 ? "text-amber-600" : (volumeChangeNum < 0 ? "text-green-600" : "text-slate-500");

  const dateStr = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        
        {/* 1. Forecasting Header Bar */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-purple-200 bg-purple-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-purple-700">
              Officer Forecasting
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">
              Prediksi Operasional Petugas
            </h1>
            <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
              Pantauan prediksi volume kendaraan, pelanggaran, dan durasi kemacetan (Real-time AI).
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-right bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Sumber:</span> {data.mode === "real_inference" ? "Model AI + Data Deteksi" : "Agregasi Hasil Deteksi"}
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Target Jam:</span> {target_hour}
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Validasi:</span> AI Memerlukan Supervisi
            </p>
          </div>
        </section>

        {/* 2. Forecast Status Summary */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              <div className="flex flex-col space-y-2 md:pr-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Prediksi Volume</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-[#0B1F3A]">{predVolume} Kendaraan</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Volume kendaraan {parseFloat(String(volumeChange)) > 0 ? 'diperkirakan meningkat' : 'diperkirakan menurun'} pada jam berikutnya.
                </p>
              </div>
              
              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Prediksi Pelanggaran</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-amber-600">{violations?.rata_rata_pelanggaran || 0} kasus/hari</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Rata-rata potensi pelanggaran berdasar riwayat YOLO.
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Prediksi Kemacetan</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-red-600">{targetDelay} menit</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Estimasi antrean berdasarkan rasio volume & jam.
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:pl-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Level Risiko</p>
                <div className="flex items-center pt-1 pb-2">
                  <StatusBadge status={congestion?.risk_level || "Sedang"} className="px-4 py-1.5 text-sm" />
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  {congestion?.risk_level === "Tinggi" ? "Petugas perlu bersiaga." : "Kondisi relatif dapat ditangani."}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. KPI Forecasting Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Rata-rata Volume", value: Math.round(currentVolume), unit: "Kendaraan", color: "text-[#0B1F3A]", helper: `Rata-rata volume dari data historis hari ini.` },
              { label: "Volume Prediksi", value: predVolume, unit: "Kendaraan", color: "text-[#1D4ED8]", helper: `Estimasi untuk hari ${dateStr}, jam ${target_hour}.` },
              { label: volumeChangeLabel, value: volumeChangeValue, unit: "", color: volumeChangeColor, helper: "Persentase tren prediksi dari rata-rata historis." },
              { label: "Dasar Pelanggaran", value: violations?.input_jumlah || 0, unit: "Kasus Hari Ini", color: "text-[#0B1F3A]", helper: "Total deteksi dari kamera AI hari ini." },
              { label: "Prediksi Durasi Kemacetan", value: targetDelay, unit: "Menit", color: "text-red-600", helper: `Estimasi puncak kemacetan rute Simpang SKA - Bandara SSK II pada hari ${dateStr}.` },
              { label: "Kategori Kondisi", value: congestion?.category || "-", unit: "", color: "text-red-600", helper: `Status arus lalu lintas rute Simpang SKA - Bandara SSK II pada hari ${dateStr}.` },
            ].map((kpi, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col justify-between">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">{kpi.label}</p>
                <div className="mb-4">
                  <span className={`text-4xl font-medium ${kpi.color} tracking-tight`}>
                    {kpi.value}
                  </span>
                  {kpi.unit && <span className="text-base font-medium text-slate-500 ml-2">{kpi.unit}</span>}
                </div>
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <p className="text-sm font-normal text-slate-500">{kpi.helper}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 & 5. Forecasting Workspace */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column (Charts) */}
          <div className="xl:col-span-2 space-y-8">
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-lg font-medium text-[#0B1F3A] mb-8">Grafik Prediksi Operasional AI</h2>
              
              <div className="space-y-12">
                <div>
                  <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Tren & Prediksi Volume Kendaraan</h3>
                  <ForecastVolumeChart data={volumeChartData} />
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-normal text-slate-700 leading-relaxed">
                      AI mendasarkan grafik ini pada historis tangkapan kamera YOLO dan mengkalkulasi proyeksi 1 jam ke depan ({target_hour}).
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Prediksi Pelanggaran Harian (7 Hari Ke Depan)</h3>
                  <ForecastViolationChart data={violationChartData} />
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-normal text-slate-700 leading-relaxed">
                      Menggunakan data deret waktu (LSTM), AI memprediksi sebaran potensi pelanggaran lintas hari yang terpengaruh efek siklus akhir pekan dan pola mingguan.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Estimasi Beban Kemacetan</h3>
                  <ForecastCongestionChart data={congestionChartData} />
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-normal text-slate-700 leading-relaxed">
                      Sistem cerdas AI mengonversi analisis kepadatan volume kendaraan menjadi estimasi akurat durasi tundaan perjalanan (delay).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Risks & Priorities) */}
          <div className="xl:col-span-1 space-y-8">
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Kesimpulan AI Agent</h2>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-[#0B1F3A]">Prediksi Arus & Volume</p>
                    <StatusBadge status={congestion?.category || "Lancar"} />
                  </div>
                  <p className="text-sm font-normal text-slate-600 leading-relaxed">
                    Sistem mendeteksi <b>{volumeChangeLabel.toLowerCase()}</b> sebesar {Math.abs(volumeChangeNum)}% (menjadi {predVolume} kendaraan) pada <b>pukul {target_hour}</b>. Estimasi tundaan/delay perjalanan diprediksi sekitar <b>{congestion?.delay_minutes || 0} menit</b>.
                  </p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-[#0B1F3A]">Potensi Pelanggaran</p>
                    <StatusBadge status="Normal" />
                  </div>
                  <p className="text-sm font-normal text-slate-600 leading-relaxed">
                    Berdasarkan analisis pola historis yang dikalibrasi dengan <b>{violations?.input_jumlah || 0} kasus hari ini</b>, tren 7 hari ke depan diprediksi berada di rata-rata <b>{violations?.rata_rata_pelanggaran || 0} pelanggaran/hari</b>.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-3">Saran Petugas Lapangan</h2>
              <ul className="space-y-2">
                <li className="flex gap-2 text-sm font-normal text-slate-700">
                  <span className="text-blue-500">■</span> Prediksi otomatis dibangkitkan dari feed kamera AI terbaru (ter-cache per jam).
                </li>
                <li className="flex gap-2 text-sm font-normal text-slate-700">
                  <span className="text-blue-500">■</span> Segera intervensi simpang jika delay kemacetan menyentuh di atas 20 menit.
                </li>
              </ul>
            </div>

          </div>
        </section>

      </div>
    </OfficerPageShell>
  );
}
