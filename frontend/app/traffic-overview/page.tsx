"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import {
  InteractiveGlassCard,
  ScrollRevealRow,
  MouseSpotlight,
  MotionSection,
} from "@/components/common";

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
          // Store full data; may have data_available: false
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
        color: "text-red-600",
        bgStatus: "bg-red-50",
        borderColor: "border-red-200",
        statusDesc: "Arus kendaraan nyaris berhenti.",
        rekomendasi: "Tunda Perjalanan",
        rekomendasiDesc: "Sebaiknya tunda setidaknya 30-45 menit.",
        pesan: "Jaga Jarak Aman",
        pesanDesc: "Hati-hati rem mendadak, jaga jarak.",
        trend: "Meningkat",
        decision: "Sebaiknya tunda perjalanan Anda",
        decisionSub: "Kondisi jalan macet, perjalanan akan memakan waktu lebih lama."
      };
    } else if (cat.includes("agak padat") || cat.includes("sedang")) {
      return {
        color: "text-amber-500",
        bgStatus: "bg-amber-50",
        borderColor: "border-amber-200",
        statusDesc: "Kepadatan mulai terlihat di beberapa titik.",
        rekomendasi: "Cari Rute Alternatif",
        rekomendasiDesc: "Atau berangkat 15 menit lebih awal.",
        pesan: "Tetap Fokus",
        pesanDesc: "Kecepatan kendaraan mulai melambat.",
        trend: "Stabil",
        decision: "Berangkat dengan waktu tambahan",
        decisionSub: "Kepadatan mulai terlihat, sediakan waktu ekstra."
      };
    } else if (cat.includes("padat")) {
      return {
        color: "text-red-600",
        bgStatus: "bg-red-50",
        borderColor: "border-red-200",
        statusDesc: "Arus kendaraan mulai melambat.",
        rekomendasi: "Tunda 20-30 mnt",
        rekomendasiDesc: "Jika tidak mendesak, pilih waktu lebih lengang.",
        pesan: "Berkendara tenang",
        pesanDesc: "Jaga jarak aman dan patuhi rambu.",
        trend: "Meningkat",
        decision: "Tunda keberangkatan",
        decisionSub: "Arus jalan lambat, perjalanan akan terhambat."
      };
    } else if (cat.includes("lancar")) {
      return {
        color: "text-[#14B8A6]",
        bgStatus: "bg-teal-50",
        borderColor: "border-teal-200",
        statusDesc: "Lalu lintas berjalan normal tanpa hambatan.",
        rekomendasi: "Jalan Terus",
        rekomendasiDesc: "Kondisi jalan sangat ideal untuk perjalanan.",
        pesan: "Kecepatan Normal",
        pesanDesc: "Patuhi batas kecepatan dan nikmati perjalanan.",
        trend: "Menurun",
        decision: "Berangkat sekarang",
        decisionSub: "Jalan terpantau lancar, kondisi ideal untuk perjalanan."
      };
    }
    // Belum tersedia
    return {
      color: "text-slate-500",
      bgStatus: "bg-slate-50",
      borderColor: "border-slate-200",
      statusDesc: "Data belum tersedia.",
      rekomendasi: "Belum tersedia",
      rekomendasiDesc: "-",
      pesan: "-",
      pesanDesc: "-",
      trend: "-",
      decision: "Rekomendasi belum tersedia",
      decisionSub: "Sistem menunggu data monitoring dari hasil deteksi."
    };
  };

  const statusInfo = getStatusInfo(categoryStr);

  return (
    <PublicPageShell>
      <div className="rt-bright-stage relative overflow-hidden pb-32 min-h-screen pt-12">
        <MouseSpotlight />
        
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* 1. Public Header Section */}
        <section className="relative pt-32 pb-8 lg:pt-36 lg:pb-10 flex flex-col items-center justify-center z-10">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6">
            <MotionSection direction="up" delay={0.1}>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center rounded-full border border-white/80 bg-white/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0B1F3A] backdrop-blur-md shadow-sm">
                  Area: Pekanbaru
                </span>
                <span className="inline-flex items-center rounded-full border border-white/80 bg-white/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0B1F3A] backdrop-blur-md shadow-sm">
                  Sumber: Hasil Deteksi Sistem
                </span>
                <span className="inline-flex items-center rounded-full border border-[#1D4ED8]/20 bg-blue-50/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#1D4ED8] backdrop-blur-md shadow-sm">
                  Mode Evaluasi
                </span>
              </div>
            </MotionSection>

            <MotionSection direction="up" delay={0.15} className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B1F3A] leading-[1.1]">
                Pantauan Lalu Lintas
              </h1>
              <p className="text-base sm:text-lg text-[#0B1F3A]/70 font-medium leading-relaxed max-w-xl mx-auto">
                Lihat kondisi jalan, estimasi kepadatan, dan saran waktu berangkat dalam satu halaman.
              </p>
            </MotionSection>
          </div>
        </section>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20 relative z-20 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1D4ED8]"></div>
            <p className="text-[#0B1F3A]/60 font-medium">Mengambil pantauan lalu lintas...</p>
          </div>
        ) : error ? (
           <div className="flex flex-col items-center justify-center py-20 relative z-20 px-4">
             <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-red-100 shadow-sm max-w-lg w-full text-center">
               <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">⚠️</div>
               <h2 className="text-lg font-bold text-[#0B1F3A] mb-2">{error}</h2>
               <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                 Pastikan layanan backend RoadTierbers sedang berjalan.
               </p>
             </div>
           </div>
        ) : !hasData ? (
          <div className="flex flex-col items-center justify-center py-20 relative z-20 px-4">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-sm max-w-lg w-full text-center">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl border border-slate-100">📊</div>
              <h2 className="text-xl font-bold text-[#0B1F3A] mb-3">Belum ada data monitoring</h2>
              <p className="text-sm font-medium text-slate-600 leading-relaxed mb-8">
                Jalankan deteksi dari halaman Pusat Deteksi AI agar sistem memiliki data pemantauan terkini.
              </p>
              <Link
                href="/officer/ai-detection"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1e40af] transition-colors shadow-sm"
              >
                Ke Pusat Deteksi AI
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* 2. Main Traffic Decision Card */}
            <section className="relative z-20 pb-12">
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <MotionSection direction="up" delay={0.2}>
                  <InteractiveGlassCard intensity="strong" glow className="w-full p-8 sm:p-12 flex flex-col items-center text-center gap-8 border-white rounded-[2.5rem] shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#1D4ED8]/5 blur-[80px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10 w-full max-w-2xl">
                      <p className="text-xs font-bold text-[#0B1F3A]/50 uppercase tracking-[0.2em] mb-6">Apakah sebaiknya berangkat sekarang?</p>
                      
                      <div className={`flex flex-col items-center justify-center px-6 py-8 rounded-3xl border ${statusInfo.bgStatus} ${statusInfo.borderColor} mb-8 w-full shadow-sm`}>
                        <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${statusInfo.color} mb-3`}>{statusInfo.decision}</h2>
                        <p className="text-sm sm:text-base font-medium text-slate-600 px-4">{statusInfo.decisionSub}</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 bg-white/50 py-4 px-8 rounded-2xl border border-white/60">
                        <div className="text-center">
                          <p className="text-[10px] font-bold text-[#0B1F3A]/50 uppercase tracking-widest mb-1.5">Kondisi Saat Ini</p>
                          <p className={`text-xl font-extrabold capitalize ${statusInfo.color}`}>{categoryStr}</p>
                        </div>
                        <div className="w-full h-px sm:w-px sm:h-12 bg-slate-200/60" />
                        <div className="text-center">
                          <p className="text-[10px] font-bold text-[#0B1F3A]/50 uppercase tracking-widest mb-1.5">Estimasi Keterlambatan</p>
                          <p className="text-xl font-extrabold text-[#0B1F3A]">{delayMinutes !== undefined ? `${delayMinutes} menit` : "Belum tersedia"}</p>
                        </div>
                      </div>
                    </div>
                  </InteractiveGlassCard>
                </MotionSection>
              </div>
            </section>

            {/* 3. Current Condition Summary */}
            <section className="relative z-10 pb-16">
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: "Kondisi Jalan", value: categoryStr, helper: statusInfo.statusDesc, valueColor: statusInfo.color },
                    { title: "Estimasi Kepadatan", value: categoryStr === "Belum tersedia" ? "Belum tersedia" : (congestion?.volume_pred ? `${congestion.volume_pred} kend` : "Belum tersedia"), helper: "Volume kendaraan per jam.", valueColor: "text-[#0B1F3A]" },
                    { title: "Estimasi Keterlambatan", value: delayMinutes !== undefined ? `${delayMinutes} mnt` : "Belum tersedia", helper: "Waktu ekstra yang dibutuhkan.", valueColor: "text-[#0B1F3A]" },
                    { title: "Risiko Perjalanan", value: statusInfo.trend, helper: "Tren kondisi jalan terkini.", valueColor: statusInfo.trend === "Meningkat" ? "text-red-600" : (statusInfo.trend === "Menurun" ? "text-[#14B8A6]" : "text-amber-500") },
                  ].map((item, i) => (
                    <ScrollRevealRow key={i} direction="up" delay={0.1 + (i * 0.05)} className="h-full">
                      <InteractiveGlassCard intensity="medium" className="p-6 h-full flex flex-col justify-between border-white shadow-sm hover:shadow-md transition-shadow rounded-3xl">
                        <div className="mb-4">
                          <p className="text-[10px] font-bold text-[#0B1F3A]/50 uppercase tracking-widest">{item.title}</p>
                          <p className={`text-xl font-extrabold tracking-tight mt-1 capitalize ${item.valueColor}`}>{item.value}</p>
                        </div>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed">{item.helper}</p>
                      </InteractiveGlassCard>
                    </ScrollRevealRow>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Area Monitoring Section */}
            <section className="relative z-10 pb-16">
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <ScrollRevealRow direction="up" delay={0.2}>
                  <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/80 p-6 sm:p-8 shadow-sm">
                    <h3 className="text-sm font-bold text-[#0B1F3A] mb-6">Pantauan Area Terkait</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Using the current origin/destination context as the primary area, and showing placeholder for others without fake numbers */}
                      <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-[#0B1F3A]">Simpang SKA</p>
                          <p className="text-[11px] font-medium text-slate-400 mt-0.5">Area pantauan utama</p>
                        </div>
                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${statusInfo.bgStatus} ${statusInfo.borderColor} ${statusInfo.color}`}>{categoryStr}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-[#0B1F3A]">Jl. Sudirman</p>
                          <p className="text-[11px] font-medium text-slate-400 mt-0.5">Menunggu data pemantauan area</p>
                        </div>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-400 uppercase tracking-wider">Belum tersedia</span>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-[#0B1F3A]">Panam</p>
                          <p className="text-[11px] font-medium text-slate-400 mt-0.5">Menunggu data pemantauan area</p>
                        </div>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-400 uppercase tracking-wider">Belum tersedia</span>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-[#0B1F3A]">Harapan Raya</p>
                          <p className="text-[11px] font-medium text-slate-400 mt-0.5">Menunggu data pemantauan area</p>
                        </div>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-400 uppercase tracking-wider">Belum tersedia</span>
                      </div>
                    </div>
                  </div>
                </ScrollRevealRow>
              </div>
            </section>

            {/* 5. Time Pattern / Prediction Section */}
            <section className="relative z-10 pb-16">
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <ScrollRevealRow direction="up" delay={0.25}>
                  <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/80 p-6 sm:p-8 shadow-sm overflow-x-auto">
                    <h3 className="text-sm font-bold text-[#0B1F3A] mb-8 text-center sm:text-left">Estimasi Pola Waktu Ke Depan</h3>
                    
                    {data?.target_hour ? (
                      <div className="flex justify-between items-end gap-4 relative min-w-[500px]">
                        <div className="absolute top-1/2 left-4 right-4 h-px bg-slate-200 -translate-y-1/2 z-0" />
                        
                        {(() => {
                          const currentHour = parseInt(data.target_hour?.split(":")[0] || "12");
                          const timeline = [0, 1, 2, 3, 4].map(offset => {
                            const h = (currentHour + offset) % 24;
                            const t = offset === 0 ? "Sekarang" : `+${offset * 15} mnt`;
                            
                            // Using current data for now and 'Belum tersedia' for future as we don't have time-series array in API payload
                            const act = offset === 0;
                            const cat = act ? categoryStr : "Belum tersedia";
                            const col = act 
                              ? (statusInfo.color.includes("red") ? "bg-red-500" : (statusInfo.color.includes("amber") ? "bg-amber-400" : "bg-[#14B8A6]"))
                              : "bg-slate-300";
                            
                            return { time: t, label: cat, color: col, active: act };
                          });
                          
                          return timeline.map((node, i) => (
                            <div key={i} className={`flex flex-col items-center gap-3 relative z-10 px-2 py-3 rounded-2xl w-full max-w-[90px] transition-all duration-300 ${node.active ? 'bg-white border border-white shadow-md scale-110' : 'bg-white/60 border border-white/50'}`}>
                              <span className="text-[10px] font-bold text-[#0B1F3A]/50 uppercase tracking-widest">{node.time}</span>
                              <div className={`w-3.5 h-3.5 rounded-full ${node.color} ${node.active ? `ring-4 ${node.color.replace('bg-', 'ring-')}/20` : 'ring-4 ring-white shadow-sm'}`} />
                              <span className={`text-[10px] font-bold text-center capitalize ${node.active ? 'text-[#0B1F3A]' : 'text-slate-400'}`}>{node.label}</span>
                            </div>
                          ));
                        })()}
                      </div>
                    ) : (
                      <div className="py-6 text-center border-t border-slate-100">
                        <p className="text-sm font-medium text-slate-500">Prediksi waktu belum tersedia</p>
                      </div>
                    )}
                  </div>
                </ScrollRevealRow>
              </div>
            </section>
          </>
        )}

        {/* 6. Public Guidance Section */}
        <section className="relative z-10 pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScrollRevealRow direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-5 p-6 sm:p-8 rounded-3xl bg-blue-50/50 border border-blue-100 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-[#1D4ED8]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#1D4ED8] font-bold text-lg">!</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-[#0B1F3A]">Imbauan Keselamatan</h3>
                  <div className="space-y-2 text-sm font-medium text-slate-600 leading-relaxed">
                    <p>• Jika kondisi padat, siapkan waktu tambahan untuk perjalanan Anda.</p>
                    <p>• Hindari terburu-buru dan tetap jaga jarak aman dengan kendaraan di depan.</p>
                    <p>• Periksa kembali kondisi jalan sebelum berangkat, dan selalu patuhi arahan petugas di lapangan.</p>
                  </div>
                </div>
              </div>
            </ScrollRevealRow>
          </div>
        </section>

        {/* 7. Supporting Actions */}
        <section className="relative z-10 pb-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-8">
            <ScrollRevealRow direction="up" delay={0.4}>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0B1F3A]">
                Eksplorasi Fitur Lainnya
              </h2>
            </ScrollRevealRow>
            
            <ScrollRevealRow direction="up" delay={0.45} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/departure-recommendation"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1e40af] transition-colors shadow-md"
              >
                Rekomendasi Waktu Berangkat
              </Link>
              <Link
                href="/congestion-prediction"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-[#0B1F3A] text-sm font-semibold hover:bg-white transition-colors shadow-sm"
              >
                Detail Prediksi Kemacetan
              </Link>
              <Link
                href="/traffic-sign-education"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-[#0B1F3A] text-sm font-semibold hover:bg-white transition-colors shadow-sm"
              >
                Edukasi Rambu
              </Link>
            </ScrollRevealRow>
          </div>
        </section>
      </div>
    </PublicPageShell>
  );
}
