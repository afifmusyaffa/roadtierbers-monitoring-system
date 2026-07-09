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
        leftBorder: "border-l-red-500",
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
        leftBorder: "border-l-amber-500",
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
        leftBorder: "border-l-red-500",
        badgeBg: "bg-red-600",
        trend: "Meningkat",
        decision: "Pertimbangkan menunda perjalanan",
        decisionSub: "Arus jalan terpantau lambat. Perjalanan Anda berisiko terhambat."
      };
    } else if (cat.includes("lancar")) {
      return {
        color: "text-teal-800",
        bgStatus: "bg-teal-50",
        borderColor: "border-teal-200",
        leftBorder: "border-l-teal-500",
        badgeBg: "bg-teal-600", 
        trend: "Menurun",
        decision: "Berangkat sekarang",
        decisionSub: "Jalan terpantau lancar. Kondisi masih aman untuk perjalanan."
      };
    }
    
    return {
      color: "text-slate-700",
      bgStatus: "bg-slate-50",
      borderColor: "border-slate-200",
      leftBorder: "border-l-slate-400",
      badgeBg: "bg-slate-400",
      trend: "-",
      decision: "Rekomendasi belum tersedia",
      decisionSub: "Sistem menunggu data monitoring dari hasil deteksi."
    };
  };

  const statusInfo = getStatusInfo(categoryStr);

  return (
    <PublicPageShell>
      <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* 1. Header Area */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold text-[#0B1F3A] tracking-tight">Pantauan Lalu Lintas</h1>
              <p className="text-base text-slate-500 mt-2">Ringkasan kondisi jalan dan rekomendasi perjalanan untuk wilayah Pekanbaru.</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 font-medium">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Area</span>
                <span className="text-[#0B1F3A] font-semibold">Pekanbaru</span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Sumber</span>
                <span className="text-[#0B1F3A] font-semibold">Hasil deteksi sistem</span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Evaluasi</span>
                <span className="text-[#1D4ED8] font-bold">Mode aktif</span>
              </div>
            </div>
          </div>

          {/* Main State Handling */}
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1D4ED8]"></div>
              <span className="text-slate-500 text-sm font-medium">Mengambil pantauan lalu lintas...</span>
            </div>
          ) : error ? (
            <div className="py-16 px-6 bg-red-50 border border-red-200 rounded-2xl text-center max-w-2xl mx-auto shadow-sm">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-xl mx-auto">⚠️</div>
              <h2 className="text-lg font-bold text-red-800 mb-2">Koneksi server terputus</h2>
              <p className="text-sm text-red-600">Pastikan layanan backend RoadTierbers sedang berjalan.</p>
            </div>
          ) : !hasData ? (
            <div className="py-16 px-6 bg-white border border-slate-200 rounded-2xl text-center max-w-2xl mx-auto shadow-sm">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 text-2xl border border-slate-100 mx-auto">📊</div>
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-2">Belum ada data monitoring</h2>
              <p className="text-sm text-slate-500 mb-6">Sistem menunggu data monitoring dari hasil deteksi.</p>
              <Link href="/officer/ai-detection" className="inline-flex items-center justify-center h-10 px-6 rounded-lg bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1e40af] transition-colors shadow-sm">
                Ke Pusat Deteksi AI →
              </Link>
            </div>
          ) : (
            <div className="space-y-10">
              
              {/* 2. Main Traffic Brief */}
              <div className={`bg-white border ${statusInfo.borderColor} border-l-[6px] ${statusInfo.leftBorder} rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row`}>
                
                {/* Left side: Recommendation */}
                <div className={`lg:w-1/2 p-6 sm:p-8 ${statusInfo.bgStatus} flex flex-col justify-center`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider bg-white shadow-sm ${statusInfo.color}`}>
                      {categoryStr}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusInfo.badgeBg}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${statusInfo.badgeBg}`}></span>
                      </span>
                      Live
                    </span>
                  </div>
                  <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${statusInfo.color} mb-4 leading-tight`}>
                    {statusInfo.decision}
                  </h2>
                  <p className={`text-base font-medium opacity-90 ${statusInfo.color}`}>
                    {statusInfo.decisionSub}
                  </p>
                </div>
                
                {/* Right side: Key Numbers Grid */}
                <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center bg-white border-t lg:border-t-0 lg:border-l border-slate-100">
                  <div className="grid grid-cols-2 gap-y-8 gap-x-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Kepadatan</p>
                      <p className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A]">
                        {congestion?.volume_pred !== undefined ? `${congestion.volume_pred} kend` : "Belum tersedia"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Keterlambatan</p>
                      <p className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A]">
                        {delayMinutes !== undefined ? `${delayMinutes} menit` : "Belum tersedia"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Risiko Perjalanan</p>
                      <p className={`text-xl sm:text-2xl font-extrabold ${statusInfo.trend === "Meningkat" ? "text-red-600" : (statusInfo.trend === "Menurun" ? "text-teal-600" : (statusInfo.trend === "-" ? "text-slate-500" : "text-amber-500"))}`}>
                        {statusInfo.trend}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Pembaruan</p>
                      <p className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A]">
                        {data?.target_hour ? data.target_hour : "Belum tersedia"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Main Details Area (3 columns on desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Column 1: Area Pemantauan */}
                <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-5">Area Pemantauan</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                      <div>
                        <p className="font-bold text-[#0B1F3A] text-sm mb-0.5">Simpang SKA</p>
                        <p className="text-[11px] font-medium text-slate-400">Area utama</p>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md capitalize bg-white border border-slate-200 shadow-sm ${statusInfo.color}`}>{categoryStr}</span>
                    </div>
                    <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                      <div>
                        <p className="font-semibold text-slate-600 text-sm mb-0.5">Jl. Sudirman</p>
                        <p className="text-[11px] font-medium text-slate-400">Menunggu sinkronisasi</p>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400">Belum tersedia</span>
                    </div>
                    <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                      <div>
                        <p className="font-semibold text-slate-600 text-sm mb-0.5">Panam</p>
                        <p className="text-[11px] font-medium text-slate-400">Menunggu sinkronisasi</p>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400">Belum tersedia</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-slate-600 text-sm mb-0.5">Harapan Raya</p>
                        <p className="text-[11px] font-medium text-slate-400">Menunggu sinkronisasi</p>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400">Belum tersedia</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Estimasi Waktu */}
                <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-5">Estimasi Waktu</h3>
                  <div className="space-y-4">
                    {[0, 15, 30, 45].map((offset, i, arr) => {
                      const isNow = offset === 0;
                      const timeStr = isNow ? "Sekarang" : `+${offset} menit`;
                      const label = isNow ? categoryStr : "Belum tersedia";
                      const isLast = i === arr.length - 1;
                      const dotColor = isNow ? statusInfo.badgeBg : "bg-slate-300";
                      
                      return (
                        <div key={offset} className={`flex items-center justify-between ${!isLast ? 'pb-4 border-b border-slate-100' : ''}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></div>
                            <span className={isNow ? "font-bold text-[#0B1F3A] text-sm" : "font-medium text-slate-600 text-sm"}>{timeStr}</span>
                          </div>
                          <span className={`text-[11px] font-semibold capitalize ${isNow ? statusInfo.color : 'text-slate-400'}`}>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Column 3: Catatan Perjalanan */}
                <div className="lg:col-span-1 bg-blue-50/50 border border-blue-100 rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-5 flex items-center gap-2">
                    <span className="text-[#1D4ED8]">🛡️</span> Catatan Perjalanan
                  </h3>
                  <ul className="space-y-4 text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-3">
                      <span className="text-[#1D4ED8] mt-0.5">•</span>
                      <span>Periksa kondisi jalan sebelum berangkat.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1D4ED8] mt-0.5">•</span>
                      <span>Siapkan waktu tambahan jika area tujuan padat.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1D4ED8] mt-0.5">•</span>
                      <span>Ikuti rambu dan arahan petugas di lapangan.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* 7. Supporting Links */}
              <div className="pt-6 border-t border-slate-200">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-bold">
                  <Link href="/departure-recommendation" className="text-[#1D4ED8] hover:text-blue-800 transition-colors inline-flex items-center gap-1.5">
                    Rekomendasi waktu berangkat <span aria-hidden="true">→</span>
                  </Link>
                  <Link href="/congestion-prediction" className="text-[#1D4ED8] hover:text-blue-800 transition-colors inline-flex items-center gap-1.5">
                    Detail prediksi kemacetan <span aria-hidden="true">→</span>
                  </Link>
                  <Link href="/traffic-sign-education" className="text-[#1D4ED8] hover:text-blue-800 transition-colors inline-flex items-center gap-1.5">
                    Edukasi rambu <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </PublicPageShell>
  );
}
