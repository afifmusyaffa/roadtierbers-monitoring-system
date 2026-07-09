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
        trend: "Meningkat",
        decision: "Pertimbangkan menunda perjalanan",
        decisionSub: "Kondisi jalan macet. Perjalanan akan memakan waktu lebih lama dari biasanya."
      };
    } else if (cat.includes("agak padat") || cat.includes("sedang")) {
      return {
        color: "text-amber-700",
        bgStatus: "bg-amber-50",
        borderColor: "border-amber-200",
        trend: "Stabil",
        decision: "Berangkat dengan waktu tambahan",
        decisionSub: "Kepadatan mulai terlihat. Sediakan waktu ekstra agar perjalanan lebih tenang."
      };
    } else if (cat.includes("padat")) {
      return {
        color: "text-red-700",
        bgStatus: "bg-red-50",
        borderColor: "border-red-200",
        trend: "Meningkat",
        decision: "Pertimbangkan menunda perjalanan",
        decisionSub: "Arus jalan terpantau lambat. Perjalanan Anda berisiko terhambat."
      };
    } else if (cat.includes("lancar")) {
      return {
        color: "text-[#0f766e]", // teal-700
        bgStatus: "bg-teal-50",
        borderColor: "border-teal-200",
        trend: "Menurun",
        decision: "Berangkat sekarang",
        decisionSub: "Jalan terpantau lancar. Kondisi masih aman untuk perjalanan."
      };
    }
    
    return {
      color: "text-slate-600",
      bgStatus: "bg-slate-50",
      borderColor: "border-slate-200",
      trend: "-",
      decision: "Rekomendasi belum tersedia",
      decisionSub: "Sistem menunggu data monitoring dari hasil deteksi."
    };
  };

  const statusInfo = getStatusInfo(categoryStr);

  return (
    <PublicPageShell>
      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          
          {/* 1. Compact Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#0B1F3A] tracking-tight">Pantauan Lalu Lintas</h1>
              <p className="text-sm text-slate-500 mt-1">Ringkasan kondisi jalan dan rekomendasi perjalanan untuk wilayah Pekanbaru.</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
              <span>Area: Pekanbaru</span>
              <span className="hidden md:inline text-slate-300">•</span>
              <span>Sumber: Hasil deteksi sistem</span>
              <span className="hidden md:inline text-slate-300">•</span>
              <span>Mode evaluasi</span>
            </div>
          </div>

          {/* Main State Handling */}
          {isLoading ? (
            <div className="py-12 flex items-center justify-center space-x-3 text-slate-500 text-sm">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#1D4ED8]"></div>
              <span>Mengambil pantauan lalu lintas...</span>
            </div>
          ) : error ? (
            <div className="py-12 px-6 bg-red-50/50 border border-red-100 rounded-xl text-center">
              <h2 className="text-base font-bold text-red-800 mb-1">Koneksi server terputus</h2>
              <p className="text-sm text-red-600">Pastikan layanan backend RoadTierbers sedang berjalan.</p>
            </div>
          ) : !hasData ? (
            <div className="py-12 px-6 border border-slate-200 rounded-xl text-center">
              <h2 className="text-base font-bold text-[#0B1F3A] mb-1">Belum ada data monitoring</h2>
              <p className="text-sm text-slate-500 mb-4">Sistem menunggu data monitoring dari hasil deteksi.</p>
              <Link href="/officer/ai-detection" className="text-sm font-semibold text-[#1D4ED8] hover:underline">
                Ke Pusat Deteksi AI →
              </Link>
            </div>
          ) : (
            <div className="space-y-10">
              
              {/* 2. Main Traffic Brief Panel */}
              <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${statusInfo.bgStatus} ${statusInfo.borderColor} ${statusInfo.color}`}>
                    {categoryStr}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
                    {statusInfo.decision}
                  </h2>
                </div>
                <p className="text-sm text-slate-600 mb-6">
                  {statusInfo.decisionSub}
                </p>
                
                {/* Inline Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-200">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Kepadatan</p>
                    <p className="text-sm font-semibold text-[#0B1F3A]">
                      {congestion?.volume_pred !== undefined ? `${congestion.volume_pred} kendaraan` : "Belum tersedia"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Keterlambatan</p>
                    <p className="text-sm font-semibold text-[#0B1F3A]">
                      {delayMinutes !== undefined ? `${delayMinutes} menit` : "Belum tersedia"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Risiko Perjalanan</p>
                    <p className={`text-sm font-semibold ${statusInfo.trend === "Meningkat" ? "text-red-600" : (statusInfo.trend === "Menurun" ? "text-teal-600" : (statusInfo.trend === "-" ? "text-slate-500" : "text-amber-500"))}`}>
                      {statusInfo.trend}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Pembaruan</p>
                    <p className="text-sm font-semibold text-[#0B1F3A]">
                      {data?.target_hour ? data.target_hour : "Belum tersedia"}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Monitoring Detail Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Area Pemantauan */}
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A] mb-4">Area pemantauan</h3>
                  <div className="border border-slate-200 rounded-lg overflow-hidden text-sm">
                    <div className="flex justify-between items-center p-3 border-b border-slate-200 bg-white">
                      <div>
                        <span className="font-medium text-[#0B1F3A]">Simpang SKA</span>
                        <span className="text-xs text-slate-400 ml-2">— Area utama</span>
                      </div>
                      <span className={`font-semibold capitalize ${statusInfo.color}`}>{categoryStr}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-b border-slate-100 bg-slate-50/50">
                      <div>
                        <span className="font-medium text-slate-600">Jl. Sudirman</span>
                        <span className="text-xs text-slate-400 ml-2 hidden sm:inline">— Menunggu sinkronisasi</span>
                      </div>
                      <span className="text-slate-400">Belum tersedia</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-b border-slate-100 bg-slate-50/50">
                      <div>
                        <span className="font-medium text-slate-600">Panam</span>
                        <span className="text-xs text-slate-400 ml-2 hidden sm:inline">— Menunggu sinkronisasi</span>
                      </div>
                      <span className="text-slate-400">Belum tersedia</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50/50">
                      <div>
                        <span className="font-medium text-slate-600">Harapan Raya</span>
                        <span className="text-xs text-slate-400 ml-2 hidden sm:inline">— Menunggu sinkronisasi</span>
                      </div>
                      <span className="text-slate-400">Belum tersedia</span>
                    </div>
                  </div>
                </div>

                {/* Estimasi Waktu */}
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A] mb-4">Estimasi waktu</h3>
                  <div className="border border-slate-200 rounded-lg overflow-hidden text-sm">
                    {[0, 15, 30, 45].map((offset, i, arr) => {
                      const isNow = offset === 0;
                      const timeStr = isNow ? "Sekarang" : `+${offset} menit`;
                      const label = isNow ? categoryStr : "Belum tersedia";
                      const borderClass = i < arr.length - 1 ? (isNow ? "border-b border-slate-200" : "border-b border-slate-100") : "";
                      const bgClass = isNow ? "bg-white" : "bg-slate-50/50";
                      
                      return (
                        <div key={offset} className={`flex justify-between items-center p-3 ${borderClass} ${bgClass}`}>
                          <span className={isNow ? "font-medium text-[#0B1F3A]" : "font-medium text-slate-600"}>{timeStr}</span>
                          <span className={`capitalize ${isNow ? `font-semibold ${statusInfo.color}` : 'text-slate-400'}`}>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Practical Guidance */}
          <div className="pt-8 border-t border-slate-100">
            <h3 className="text-sm font-bold text-[#0B1F3A] mb-3">Catatan perjalanan</h3>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
              <li>Periksa kondisi jalan sebelum berangkat.</li>
              <li>Siapkan waktu tambahan jika area tujuan padat.</li>
              <li>Ikuti rambu dan arahan petugas di lapangan.</li>
            </ul>
          </div>

          {/* 5. Supporting Links */}
          <div className="pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/departure-recommendation" className="text-[#1D4ED8] hover:underline">
              Rekomendasi waktu berangkat
            </Link>
            <Link href="/congestion-prediction" className="text-[#1D4ED8] hover:underline">
              Detail prediksi kemacetan
            </Link>
            <Link href="/traffic-sign-education" className="text-[#1D4ED8] hover:underline">
              Edukasi rambu
            </Link>
          </div>

        </div>
      </div>
    </PublicPageShell>
  );
}
