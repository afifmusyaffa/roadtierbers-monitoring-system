"use client";

import { useEffect, useState } from "react";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { OfficerPageHeader } from "@/components/officer/officer-page-header";
import { OfficerDisclaimer } from "@/components/officer/officer-disclaimer";
import { KpiCard } from "@/components/officer/kpi-card";
import { StatusBadge } from "@/components/common";
import { ForecastVolumeChart, ForecastViolationChart, ForecastCongestionChart } from "@/components/charts/officer-forecasting-charts";
import { apiUrl } from "@/lib/api";

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
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchData(isSilent = false) {
      try {
        const res = await fetch(apiUrl("/forecasting/current"));
        const json = await res.json();
        if (json.status === "success") {
          setData(json.data);
          setLastUpdated(new Date());
          setError("");
        } else if (!isSilent) {
          setError(json.message || "Gagal mengambil data");
        }
      } catch {
        if (!isSilent) {
          setError("Koneksi ke backend gagal.");
        }
      } finally {
        if (!isSilent) {
          setLoading(false);
        }
      }
    }
    fetchData(false);
    const interval = setInterval(() => fetchData(true), 30000);
    return () => clearInterval(interval);
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
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
          <OfficerPageHeader
            title="Prediksi Operasional Petugas"
            description="Pantauan prediksi volume kendaraan, pelanggaran, dan durasi kemacetan (Real-time AI)."
            badge={{ label: "Officer Forecasting", tone: "blue" }}
            compact
          />
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-4xl mb-4">📊</p>
            <h2 className="text-lg font-medium text-[#0B1F3A] mb-2">Belum Ada Data Monitoring</h2>
            <p className="text-sm font-normal text-slate-600 mb-6">
              {data?.message || "Upload sample gambar melalui halaman Pusat Deteksi AI untuk mulai menghasilkan data monitoring."}
            </p>
            <a
              href="/officer/ai-detection"
              className="px-6 py-2 bg-[#0B1F3A] text-white text-sm font-medium rounded-lg hover:bg-[#142d52] transition-colors"
            >
              Buka Pusat Deteksi AI
            </a>
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
    time: (target_hour ?? "--:--") + " (Est)",
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
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        
        <OfficerPageHeader
          title="Prediksi Operasional Petugas"
          description="Pantauan prediksi volume kendaraan, pelanggaran, dan durasi kemacetan (Real-time AI)."
          badge={{ label: "Officer Forecasting", tone: "blue" }}
          lastUpdated={lastUpdated}
          compact
        />

        {/* 2. Forecast Status Summary */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="Prediksi Volume"
              value={`${predVolume}`}
              unit="Kendaraan"
              tone={volumeChangeNum > 0 ? "amber" : "blue"}
              helper={`Pada pukul ${target_hour}`}
            />
            <KpiCard
              title="Prediksi Pelanggaran"
              value={`${violations?.rata_rata_pelanggaran || 0}`}
              unit="kasus/hari"
              tone="red"
              helper="Berdasarkan histori YOLO"
            />
            <KpiCard
              title="Prediksi Kemacetan"
              value={`${targetDelay}`}
              unit="menit delay"
              tone={targetDelay > 15 ? "red" : "emerald"}
              helper="Estimasi beban antrean"
            />
            <KpiCard
              title="Level Risiko"
              value={congestion?.risk_level || "Sedang"}
              tone={congestion?.risk_level === "Tinggi" ? "red" : "blue"}
              isText
              helper="Status kesiagaan"
            />
          </div>
          <p className="text-[11px] text-slate-500 text-right mt-2 italic">
            * Data prediksi ini dibangkitkan secara otomatis melalui {data.mode === "real_inference" ? "Model AI & Histori Deteksi" : "Agregasi Hasil Deteksi"} dan memerlukan verifikasi lapangan.
          </p>
        </section>

        {/* 3. Forecasting Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col h-full">
            <h3 className="text-sm font-medium text-[#0B1F3A] mb-4">Prediksi Volume Kendaraan</h3>
            <div className="h-44">
              <ForecastVolumeChart data={volumeChartData} />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col h-full">
            <h3 className="text-sm font-medium text-[#0B1F3A] mb-4">Estimasi Beban Kemacetan</h3>
            <div className="h-44">
              <ForecastCongestionChart data={congestionChartData} />
            </div>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col h-full lg:col-span-2">
            <h3 className="text-sm font-medium text-[#0B1F3A] mb-4">Prediksi Pelanggaran Harian (7 Hari Ke Depan)</h3>
            <div className="h-44">
              <ForecastViolationChart data={violationChartData} />
            </div>
          </div>
        </section>

        <OfficerDisclaimer />

      </div>
    </OfficerPageShell>
  );
}
