"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { PublicPageShell } from "@/components/layout/public-page-shell";

interface ForecastData {
  data_available?: boolean;
  mode?: string;
  message?: string;
  target_hour?: string;
  congestion?: {
    category?: string;
    delay_minutes?: number;
    volume_pred?: number;
  };
}

export default function TrafficOverviewPage() {
  const [data, setData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const response = await fetch(`${apiUrl}/forecasting/current?origin=Simpang SKA&destination=Bandara SSK II`);
        
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }
        
        const res = await response.json();
        if (res.status === "success") {
          setData(res.data);
        } else {
          throw new Error(res.message || "Data tidak valid");
        }
      } catch (err) {
        console.error(err);
        setError("Koneksi server terputus");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const congestion = data?.congestion;
  const categoryStr = congestion?.category ?? "Belum tersedia";
  const delayMinutes = congestion?.delay_minutes;
  const hasData = data?.data_available === true;
  
  // Helper to determine text colors and recommendations
  const getStatusInfo = (category: string) => {
    const cat = category?.toLowerCase() || "";
    if (cat.includes("macet total") || cat.includes("macet")) {
      return {
        color: "text-red-700",
        bgStatus: "bg-red-50",
        borderColor: "border-red-200",
        badgeBg: "bg-red-600",
        trend: "Meningkat",
        decision: "Pertimbangkan menunda perjalanan",
        decisionSub: "Kondisi jalan macet. Perjalanan akan memakan waktu lebih lama dari biasanya."
      };
    } else if (cat.includes("agak padat") || cat.includes("sedang")) {
      return {
        color: "text-amber-700",
        bgStatus: "bg-amber-50",
        borderColor: "border-amber-200",
        badgeBg: "bg-amber-500",
        trend: "Stabil",
        decision: "Berangkat dengan waktu tambahan",
        decisionSub: "Kepadatan mulai terlihat. Sediakan waktu ekstra agar perjalanan lebih tenang."
      };
    } else if (cat.includes("padat")) {
      return {
        color: "text-red-700",
        bgStatus: "bg-red-50",
        borderColor: "border-red-200",
        badgeBg: "bg-red-600",
        trend: "Meningkat",
        decision: "Pertimbangkan menunda perjalanan",
        decisionSub: "Arus jalan terpantau lambat. Perjalanan Anda berisiko terhambat."
      };
    } else if (cat.includes("lancar")) {
      return {
        color: "text-[#0f766e]", // teal-700
        bgStatus: "bg-teal-50",
        borderColor: "border-teal-200",
        badgeBg: "bg-[#0d9488]", // teal-600
        trend: "Menurun",
        decision: "Berangkat sekarang",
        decisionSub: "Jalan terpantau lancar. Ini adalah kondisi ideal untuk perjalanan Anda."
      };
    }
    
    return {
      color: "text-slate-600",
      bgStatus: "bg-slate-50",
      borderColor: "border-slate-200",
      badgeBg: "bg-slate-400",
      trend: "-",
      decision: "Rekomendasi belum tersedia",
      decisionSub: "Sistem menunggu data monitoring dari hasil deteksi."
    };
  };

  const statusInfo = getStatusInfo(categoryStr);

  return (
    <PublicPageShell>
      <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* 1. Compact Top Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">Pantauan Lalu Lintas</h1>
              <p className="text-sm sm:text-base text-slate-500 mt-1">Cek kondisi jalan, estimasi kepadatan, dan rekomendasi perjalanan sebelum berangkat.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600">
                Area: Pekanbaru
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600">
                Sumber: Hasil deteksi sistem
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-[11px] font-semibold text-[#1D4ED8]">
                Mode evaluasi
              </span>
            </div>
          </div>

          {/* 2. Route / Area Selection Panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Area pemantauan</span>
              <span className="text-sm font-bold text-[#0B1F3A]">Pekanbaru</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-[#0B1F3A] text-white text-xs font-semibold shadow-sm">
                Simpang SKA
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 text-xs font-medium border border-slate-200">
                Panam
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 text-xs font-medium border border-slate-200">
                Jl. Sudirman
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 text-xs font-medium border border-slate-200">
                Harapan Raya
              </span>
            </div>
          </div>

          {/* Main State Handling */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1D4ED8]"></div>
              <p className="text-sm font-medium text-slate-500">Mengambil pantauan lalu lintas...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 bg-red-50 rounded-2xl border border-red-100 text-center px-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-xl">⚠️</div>
              <h2 className="text-lg font-bold text-red-800 mb-2">{error}</h2>
              <p className="text-sm text-red-600 max-w-md">Pastikan layanan backend RoadTierbers sedang berjalan.</p>
            </div>
          ) : !hasData ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm text-center px-4">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 text-2xl border border-slate-100">📊</div>
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-2">Belum ada data monitoring</h2>
              <p className="text-sm text-slate-500 max-w-md mb-6">Jalankan deteksi dari halaman Pusat Deteksi AI agar sistem memiliki data pemantauan.</p>
              <Link href="/officer/ai-detection" className="px-5 py-2.5 rounded-lg bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                Ke Pusat Deteksi AI
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 3. Main Decision Section & 4. Key Metrics Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Recommendation Card */}
                <div className={`col-span-1 lg:col-span-7 rounded-2xl border ${statusInfo.borderColor} ${statusInfo.bgStatus} p-6 sm:p-8 flex flex-col justify-center`}>
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: statusInfo.color.replace('text-', '') }} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${statusInfo.color}`}>Rekomendasi Sistem</span>
                  </div>
                  <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${statusInfo.color} mb-3`}>
                    {statusInfo.decision}
                  </h2>
                  <p className={`text-sm sm:text-base font-medium opacity-90 ${statusInfo.color} max-w-lg`}>
                    {statusInfo.decisionSub}
                  </p>
                </div>

                {/* Right: Key Metrics Grid */}
                <div className="col-span-1 lg:col-span-5 grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Kondisi Jalan</p>
                    <p className={`text-lg font-bold capitalize ${statusInfo.color}`}>{categoryStr}</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Kepadatan</p>
                    <p className="text-lg font-bold text-[#0B1F3A]">{congestion?.volume_pred !== undefined ? `${congestion.volume_pred} kend` : "Belum tersedia"}</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Keterlambatan</p>
                    <p className="text-lg font-bold text-[#0B1F3A]">{delayMinutes !== undefined ? `${delayMinutes} mnt` : "Belum tersedia"}</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Risiko Perjalanan</p>
                    <p className={`text-lg font-bold ${statusInfo.trend === "Meningkat" ? "text-red-600" : (statusInfo.trend === "Menurun" ? "text-teal-600" : (statusInfo.trend === "-" ? "text-slate-500" : "text-amber-500"))}`}>{statusInfo.trend}</p>
                  </div>
                </div>
              </div>

              {/* 5. Main Content Grid (Area Monitoring & Time Pattern) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Area Monitoring */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-[#0B1F3A] mb-4">Pantauan Area Terkait</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-[#0B1F3A]">Simpang SKA</p>
                        <p className="text-xs text-slate-500 mt-0.5">Area pantauan utama</p>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md capitalize border ${statusInfo.bgStatus} ${statusInfo.borderColor} ${statusInfo.color}`}>{categoryStr}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-slate-700">Jl. Sudirman</p>
                        <p className="text-xs text-slate-400 mt-0.5">Menunggu sinkronisasi area</p>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">Belum tersedia</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-slate-700">Panam</p>
                        <p className="text-xs text-slate-400 mt-0.5">Menunggu sinkronisasi area</p>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">Belum tersedia</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-slate-700">Harapan Raya</p>
                        <p className="text-xs text-slate-400 mt-0.5">Menunggu sinkronisasi area</p>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200">Belum tersedia</span>
                    </div>
                  </div>
                </div>

                {/* Time Pattern */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
                  <h3 className="text-sm font-bold text-[#0B1F3A] mb-8">Estimasi Pola Waktu Ke Depan</h3>
                  <div className="flex-1 flex flex-col justify-center px-2">
                    {data?.target_hour ? (
                      <div className="flex justify-between items-center relative">
                        <div className="absolute left-0 right-0 h-px bg-slate-200 z-0" />
                        {[0, 15, 30, 45].map((offset) => {
                          const isNow = offset === 0;
                          const timeStr = isNow ? "Sekarang" : `+${offset}m`;
                          const stateColor = isNow ? statusInfo.badgeBg : "bg-slate-200";
                          const label = isNow ? categoryStr : "Belum tersedia";
                          
                          return (
                            <div key={offset} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{timeStr}</span>
                              <div className={`w-3.5 h-3.5 rounded-full ${stateColor} ring-4 ring-white shadow-sm`} />
                              <span className={`text-[10px] font-bold capitalize ${isNow ? 'text-[#0B1F3A]' : 'text-slate-400'}`}>{label}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 text-center">Prediksi waktu belum tersedia</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. Public Guidance Section */}
          <div className="bg-[#0B1F3A] rounded-2xl p-6 sm:p-8 shadow-sm text-white mt-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <span className="text-2xl">🛡️</span>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold mb-3">Saran untuk Pengguna Jalan</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-white/80 font-medium">
                  <p className="flex items-start gap-2"><span className="text-[#1D4ED8] font-bold">•</span> Periksa kondisi jalan sebelum berangkat.</p>
                  <p className="flex items-start gap-2"><span className="text-[#1D4ED8] font-bold">•</span> Siapkan waktu tambahan jika area terpantau padat.</p>
                  <p className="flex items-start gap-2"><span className="text-[#1D4ED8] font-bold">•</span> Jaga jarak aman dan hindari terburu-buru.</p>
                  <p className="flex items-start gap-2"><span className="text-[#1D4ED8] font-bold">•</span> Ikuti rambu serta arahan petugas di lapangan.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Supporting Actions */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/departure-recommendation" className="px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-sm font-semibold text-[#0B1F3A] hover:bg-slate-50 transition-colors shadow-sm text-center">
                Lihat rekomendasi waktu berangkat
              </Link>
              <Link href="/congestion-prediction" className="px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-sm font-semibold text-[#0B1F3A] hover:bg-slate-50 transition-colors shadow-sm text-center">
                Lihat detail prediksi kemacetan
              </Link>
              <Link href="/traffic-sign-education" className="px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-sm font-semibold text-[#0B1F3A] hover:bg-slate-50 transition-colors shadow-sm text-center">
                Pelajari rambu lalu lintas
              </Link>
            </div>
          </div>

        </div>
      </div>
    </PublicPageShell>
  );
}
