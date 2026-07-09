"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { TrafficVolumeChart, ViolationDistributionChart } from "@/components/charts/officer-dashboard-charts";
import { StatusBadge } from "@/components/common";

export default function OfficerDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData(isSilent = false) {
      try {
        const res = await fetch("http://127.0.0.1:8000/dashboard/summary");
        const json = await res.json();
        if (json.status === "success") {
          setData(json.data);
          setError("");
        } else if (!isSilent) {
          setError(json.message || "Gagal mengambil data dari server");
        }
      } catch (err) {
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
    const interval = setInterval(() => fetchData(true), 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <OfficerPageShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-medium animate-pulse">Menghubungkan ke server AI...</p>
          </div>
        </div>
      </OfficerPageShell>
    );
  }

  if (error || !data) {
    return (
      <OfficerPageShell>
        <div className="flex items-center justify-center min-h-[60vh] text-red-500">
          <p>{error || "Data kosong"}</p>
        </div>
      </OfficerPageShell>
    );
  }

  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        
        {/* 1. Monitoring Header Bar */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">
              Dashboard Monitoring Petugas
            </h1>
            <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
              Pantauan operasional untuk membaca kondisi lalu lintas, pelanggaran, prediksi, dan tindak lanjut petugas.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-right bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Mode:</span> Data Real-time (API)
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Area:</span> Simpang SKA, Pekanbaru
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Update:</span> Live
            </p>
          </div>
        </section>

        {/* 2. Live Monitoring Summary */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#1D4ED8]/5 blur-[60px] rounded-full pointer-events-none" />
            
            <h2 className="text-lg font-medium text-[#0B1F3A] mb-6 relative z-10">
              Ringkasan Situasi Saat Ini
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              <div className="flex flex-col space-y-2 md:pr-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Status Sistem</p>
                <div className="flex items-center pt-1 pb-2">
                  <StatusBadge status={data.system_status as string} className="px-4 py-1.5 text-sm" />
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Sistem berjalan normal.
                </p>
              </div>
              
              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Kondisi Lalu Lintas</p>
                <div className="flex items-center pt-1 pb-2">
                  <StatusBadge status={data.traffic_condition as string} className="px-4 py-1.5 text-sm" />
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Kondisi arus di lapangan.
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:pl-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Risiko Pelanggaran</p>
                <div className="flex items-center pt-1 pb-2">
                  <StatusBadge status={data.violation_risk as string} className="px-4 py-1.5 text-sm" />
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Tingkat deteksi risiko saat ini.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Monitoring KPI Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                label: "Total Deteksi", 
                value: data.total_detections_today.toLocaleString('id-ID'), 
                color: "text-[#1D4ED8]",
                helper: "Analisis kamera CCTV hari ini."
              },
              { 
                label: "Total Pelanggaran", 
                value: data.total_violations_today.toLocaleString('id-ID'), 
                color: "text-red-600",
                helper: "Kasus terkonfirmasi."
              },
              { 
                label: "Kendaraan Aktif", 
                value: data.total_vehicles.toLocaleString('id-ID'), 
                color: "text-[#14B8A6]",
                helper: "Estimasi volume terdeteksi."
              },
              { 
                label: "Pelanggaran Dominan", 
                value: data.dominant_violation, 
                color: "text-amber-600", 
                isText: true,
                helper: "Kasus paling sering terjadi."
              },
              { 
                label: "Tren Data", 
                value: data.volume_data.length > 0 ? "Aktif" : "Menunggu",
                unit: "", 
                color: "text-blue-600",
                helper: "Tangkapan deret waktu."
              },
              { 
                label: "Sumber AI", 
                value: "YOLOv8",
                unit: "", 
                color: "text-purple-600",
                helper: "Engine pendeteksi utama."
              },
            ].map((metric, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col justify-between">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">{metric.label}</p>
                <div className="mb-4">
                  <span className={`${metric.isText ? 'text-xl' : 'text-4xl'} font-medium ${metric.color} tracking-tight`}>
                    {metric.value}
                  </span>
                  {metric.unit && <span className="text-base font-medium text-slate-500 ml-2">{metric.unit}</span>}
                </div>
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <p className="text-sm font-normal text-slate-500">{metric.helper}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Main Monitoring Workspace */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Charts) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Grafik Pemantauan Aktual</h2>
              
              <div className="space-y-10">
                <div>
                  <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Tren Volume Kendaraan</h3>
                  <TrafficVolumeChart data={data.volume_data} />
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-normal text-slate-700 leading-relaxed">
                      Grafik di atas menunjukkan akumulasi kendaraan yang ditangkap secara periodik hari ini oleh kamera Simpang SKA.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Komposisi Pelanggaran</h3>
                  <ViolationDistributionChart data={data.violation_data} />
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-normal text-slate-700 leading-relaxed">
                      Sebaran kategori pelanggaran yang paling banyak dilakukan berdasarkan ekstraksi AI YOLO terbaru.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 7. Recent Detection Activity */}
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col">
              <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Akses Cepat Halaman Petugas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {[
                  { 
                    label: "Mulai Deteksi AI", 
                    href: "/officer/ai-detection",
                    helper: "Buka halaman utama deteksi kamera."
                  },
                  { 
                    label: "Lihat Forecasting", 
                    href: "/officer/forecasting",
                    helper: "Periksa detail prediksi volume & kemacetan."
                  },
                  { 
                    label: "Cek Riwayat Deteksi", 
                    href: "/officer/history",
                    helper: "Lihat data riwayat operasional."
                  },
                  { 
                    label: "Buat Laporan", 
                    href: "/officer/report",
                    helper: "Cetak atau unduh hasil monitoring."
                  },
                ].map((action, i) => (
                  <Link
                    key={i}
                    href={action.href}
                    className="flex flex-col p-6 rounded-2xl bg-[#0B1F3A] border border-[#142d52] hover:bg-[#142d52] transition-colors shadow-md group h-full"
                  >
                    <h3 className="text-base font-medium text-white mb-2">{action.label}</h3>
                    <p className="text-sm font-normal text-blue-200/70 leading-relaxed mb-6 flex-1">{action.helper}</p>
                    <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center text-sm font-medium text-white/50 group-hover:text-blue-400 transition-colors">
                      <span>Buka Menu</span>
                      <span>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Priority, Actions) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Right: Area Monitoring Priority */}
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Prioritas Area (Simpang SKA)</h2>
              <div className="space-y-4">
                {[
                  { area: "Kamera Utama (Tengah)", status: data.traffic_condition, note: "Pusat pantauan." },
                  { area: "Kamera Utara (Jl. Tuanku Tambusai)", status: "Lancar", note: "Pantauan sekunder." },
                  { area: "Kamera Selatan (Jl. Soekarno Hatta)", status: "Lancar", note: "Pantauan sekunder." },
                  { area: "Kamera Timur (Arah Sudirman)", status: "Lancar", note: "Pantauan sekunder." },
                ].map((loc, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-[#0B1F3A]">{loc.area}</p>
                      <StatusBadge status={loc.status} />
                    </div>
                    <p className="text-sm font-normal text-slate-600">{loc.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Recommended Officer Actions */}
            <div className="p-6 rounded-2xl bg-blue-50/50 backdrop-blur-xl border border-blue-200 shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-5 flex items-center gap-2">
                Rekomendasi Tindakan
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Prioritaskan Area Padat", desc: "Pantau Simpang SKA jika data real-time menunjukkan peningkatan kepadatan secara eksponensial." },
                  { title: `Pantau Pelanggaran ${data.dominant_violation}`, desc: "Fokus pada deteksi dominan yang sering terjadi hari ini berdasarkan statistik AI." },
                  { title: "Cek Log Riwayat", desc: "Verifikasi visual di menu Riwayat Deteksi untuk anomali yang mencurigakan." },
                ].map((action, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-medium text-[#0B1F3A] mb-1">{action.title}</p>
                    <p className="text-sm font-normal text-slate-600 leading-relaxed">{action.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </OfficerPageShell>
  );
}
