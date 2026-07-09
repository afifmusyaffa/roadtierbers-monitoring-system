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
        setError("Koneksi backend gagal. Pastikan FastAPI berjalan di http://127.0.0.1:8000");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const congestion = data?.congestion;
  
  // Helper to determine text colors and recommendations
  const getStatusInfo = (category: string) => {
    const cat = category?.toLowerCase() || "";
    if (cat.includes("macet total") || cat.includes("macet")) {
      return {
        color: "text-red-600",
        statusDesc: "Arus kendaraan nyaris berhenti.",
        rekomendasi: "Tunda Perjalanan",
        rekomendasiDesc: "Sebaiknya tunda setidaknya 30-45 menit.",
        pesan: "Jaga Jarak Aman",
        pesanDesc: "Hati-hati rem mendadak, jaga jarak.",
        trend: "Meningkat"
      };
    } else if (cat.includes("agak padat")) {
      return {
        color: "text-amber-500",
        statusDesc: "Kepadatan mulai terlihat di beberapa titik.",
        rekomendasi: "Cari Rute Alternatif",
        rekomendasiDesc: "Atau berangkat 15 menit lebih awal.",
        pesan: "Tetap Fokus",
        pesanDesc: "Kecepatan kendaraan mulai melambat.",
        trend: "Stabil"
      };
    } else if (cat.includes("padat")) {
      return {
        color: "text-red-600",
        statusDesc: "Arus kendaraan mulai melambat.",
        rekomendasi: "Tunda 20-30 mnt",
        rekomendasiDesc: "Jika tidak mendesak, pilih waktu lebih lengang.",
        pesan: "Berkendara tenang",
        pesanDesc: "Jaga jarak aman dan patuhi rambu.",
        trend: "Meningkat"
      };
    }
    // Lancar
    return {
      color: "text-[#14B8A6]",
      statusDesc: "Lalu lintas berjalan normal tanpa hambatan.",
      rekomendasi: "Jalan Terus",
      rekomendasiDesc: "Kondisi jalan sangat ideal untuk perjalanan.",
      pesan: "Kecepatan Normal",
      pesanDesc: "Patuhi batas kecepatan dan nikmati perjalanan.",
      trend: "Menurun"
    };
  };

  const statusInfo = getStatusInfo(congestion?.category ?? "");
  const delayMinutes = congestion?.delay_minutes ?? 0;
  const categoryStr = congestion?.category ?? "Tidak Diketahui";

  return (
    <PublicPageShell>
      <div className="rt-bright-stage relative overflow-hidden pb-32 min-h-screen pt-12">
        <MouseSpotlight />
        
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/5 blur-[120px] rounded-full pointer-events-none" />

        <section className="relative pt-32 pb-12 lg:pt-36 lg:pb-16 flex flex-col items-center justify-center z-10">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6">
            <MotionSection direction="up" delay={0.1}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B1F3A] backdrop-blur-md shadow-sm">
                Layanan Publik
              </span>
            </MotionSection>

            <MotionSection direction="up" delay={0.15} className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B1F3A] leading-[1.1]">
                Kondisi lalu lintas,<br />lebih mudah dipahami.
              </h1>
              <p className="text-base sm:text-lg text-[#0B1F3A]/70 font-medium leading-relaxed max-w-xl mx-auto">
                Ringkasan kondisi jalan untuk membantu pengguna memilih waktu perjalanan dengan lebih tenang.
              </p>
            </MotionSection>
            
            <MotionSection direction="up" delay={0.2}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-white/80 shadow-sm backdrop-blur-md mt-4">
                <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse shadow-[0_0_8px_#14B8A6]" />
                <span className="text-xs font-bold text-[#0B1F3A]/70">Pemantauan aktif</span>
              </div>
            </MotionSection>
          </div>
        </section>

        {isLoading ? (
          <div className="flex justify-center items-center py-20 relative z-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1D4ED8]"></div>
          </div>
        ) : error ? (
           <div className="text-center py-20 relative z-20">
             <p className="text-red-500 font-bold">{error}</p>
           </div>
        ) : data?.data_available === false ? (
          <div className="flex flex-col items-center justify-center py-24 relative z-20 px-4">
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm max-w-lg w-full text-center">
              <p className="text-4xl mb-4">📊</p>
              <h2 className="text-lg font-medium text-[#0B1F3A] mb-2">Belum Ada Data Monitoring</h2>
              <p className="text-sm font-normal text-slate-600 leading-relaxed mb-6">
                {data?.message || "Upload sample gambar melalui halaman Pusat Deteksi AI untuk mulai menghasilkan data monitoring."}
              </p>
            </div>
          </div>
        ) : (
          <>
            <section className="relative z-20 pb-16">
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <MotionSection direction="up" delay={0.3}>
                  <InteractiveGlassCard intensity="strong" glow className="w-full p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 justify-between border-white rounded-[2rem] shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#1D4ED8]/5 blur-[80px] rounded-full pointer-events-none" />
                    
                    <div className="flex-1 space-y-2 relative z-10 w-full">
                      <p className="text-sm font-bold text-[#0B1F3A]/60 uppercase tracking-widest">Area Pemantauan</p>
                      <h2 className="text-3xl font-extrabold text-[#0B1F3A] tracking-tight">Simpang SKA</h2>
                      <div className="inline-flex items-center gap-2 mt-2 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
                        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">Trend: {statusInfo.trend}</span>
                      </div>
                    </div>

                    <div className="flex flex-row gap-4 relative z-10 w-full md:w-auto">
                      <div className="flex-1 md:flex-none p-5 rounded-2xl bg-white/60 border border-white/80 shadow-sm backdrop-blur-md text-center">
                        <p className="text-xs font-bold text-[#0B1F3A]/60 uppercase tracking-widest mb-1">Status Lalu Lintas</p>
                        <p className={`text-2xl font-extrabold tracking-tight ${statusInfo.color}`}>{categoryStr}</p>
                      </div>
                      <div className="flex-1 md:flex-none p-5 rounded-2xl bg-white/60 border border-white/80 shadow-sm backdrop-blur-md text-center">
                        <p className="text-xs font-bold text-[#0B1F3A]/60 uppercase tracking-widest mb-1">Estimasi Kemacetan</p>
                        <p className="text-2xl font-extrabold text-[#0B1F3A] tracking-tight">{delayMinutes} menit</p>
                      </div>
                    </div>
                  </InteractiveGlassCard>
                </MotionSection>
              </div>
            </section>

            <section className="relative z-10 pb-20">
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { title: "Status Saat Ini", value: categoryStr, helper: statusInfo.statusDesc, delay: 0.1, valueColor: statusInfo.color },
                    { title: "Estimasi Kemacetan", value: `${delayMinutes} mnt`, helper: "Perjalanan dapat memakan waktu lebih lama.", delay: 0.15, valueColor: "text-[#0B1F3A]" },
                    { title: "Rekomendasi", value: statusInfo.rekomendasi, helper: statusInfo.rekomendasiDesc, delay: 0.2, valueColor: "text-[#1D4ED8]" },
                    { title: "Pesan Keselamatan", value: statusInfo.pesan, helper: statusInfo.pesanDesc, delay: 0.25, valueColor: "text-[#14B8A6]" },
                  ].map((item, i) => (
                    <ScrollRevealRow key={i} direction="up" delay={item.delay}>
                      <InteractiveGlassCard intensity="medium" glow className="p-6 h-full flex flex-col justify-between border-white shadow-[0_8px_32px_rgba(11,31,58,0.03)] hover:shadow-lg transition-shadow">
                        <div className="mb-4">
                          <p className="text-xs font-bold text-[#0B1F3A]/60 uppercase tracking-widest">{item.title}</p>
                          <p className={`text-2xl font-extrabold tracking-tight mt-1 ${item.valueColor}`}>{item.value}</p>
                        </div>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.helper}</p>
                      </InteractiveGlassCard>
                    </ScrollRevealRow>
                  ))}
                </div>
              </div>
            </section>

            <section className="relative z-10 pb-20">
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <ScrollRevealRow direction="up" delay={0.1}>
                  <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/80 p-6 sm:p-8 shadow-sm overflow-x-auto">
                    <h3 className="text-sm font-bold text-[#0B1F3A] mb-8">Pola Hari Ini (Data Forecasting & YOLO)</h3>
                    <div className="flex justify-between items-end gap-2 relative min-w-[500px]">
                      <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-slate-100 rounded-full -translate-y-1/2 z-0" />
                      
                      {(() => {
                        // In reality, this would be a map over historical/predicted hourly data
                        const currentHour = parseInt(data?.target_hour?.split(":")[0] || "12");
                        const timeline = [-2, -1, 0, 1, 2].map(offset => {
                          const h = (currentHour + offset + 24) % 24;
                          const t = `${h.toString().padStart(2, '0')}:00`;
                          
                          let cat = "Sedang";
                          let col = "bg-amber-400";
                          const act = offset === 0;
                          
                          if (act) {
                             if (statusInfo.color.includes("red")) { cat = "Padat"; col = "bg-red-500"; }
                             else if (statusInfo.color.includes("amber")) { cat = "Sedang"; col = "bg-amber-400"; }
                             else { cat = "Lancar"; col = "bg-[#14B8A6]"; }
                          } else {
                             // Just some dummy historical/future variance for display
                             if (h > 15 && h < 19) { cat = "Padat"; col = "bg-red-500"; }
                             else if (h > 6 && h < 9) { cat = "Padat"; col = "bg-red-500"; }
                             else { cat = "Lancar"; col = "bg-[#14B8A6]"; }
                          }
                          
                          return { time: t, label: cat, color: col, active: act };
                        });
                        
                        return timeline.map((node, i) => (
                          <div key={i} className={`flex flex-col items-center gap-3 relative z-10 px-2 py-3 rounded-xl backdrop-blur-sm w-full max-w-[80px] transition-all duration-300 ${node.active ? 'bg-white/90 border border-white shadow-sm scale-110' : 'bg-white/40 border border-white/30'}`}>
                            <span className="text-xs font-bold text-[#0B1F3A]/50">{node.time}</span>
                            <div className={`w-3.5 h-3.5 rounded-full ${node.color} ${node.active ? `ring-4 ${node.color.replace('bg-', 'ring-')}/20 shadow-[0_0_12px_${node.color.replace('bg-', '')}]` : 'ring-4 ring-white shadow-sm'}`} />
                            <span className={`text-[10px] font-bold ${node.active ? 'text-[#0B1F3A]' : 'text-slate-400'}`}>{node.label}</span>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </ScrollRevealRow>
              </div>
            </section>
          </>
        )}

        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScrollRevealRow direction="left" delay={0.1}>
              <div className="flex flex-col sm:flex-row gap-4 p-6 sm:p-8 rounded-3xl bg-blue-50/50 border border-blue-100 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-[#1D4ED8]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#1D4ED8] font-bold text-lg">i</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-[#0B1F3A]">Imbauan Perjalanan</h3>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-2xl">
                    Jika perjalanan tidak mendesak, pertimbangkan berangkat setelah periode padat menurun. 
                    Tetap jaga jarak aman, hindari terburu-buru, dan ikuti rambu lalu lintas.
                  </p>
                </div>
              </div>
            </ScrollRevealRow>
          </div>
        </section>

        <section className="relative z-10 pb-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-8">
            <ScrollRevealRow direction="up" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1F3A]">
                Ingin melihat prediksi perjalanan?
              </h2>
            </ScrollRevealRow>
            
            <ScrollRevealRow direction="up" delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/congestion-prediction"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#0B1F3A] text-white text-sm font-semibold hover:bg-[#142d52] transition-colors shadow-md"
              >
                Prediksi Kemacetan
              </Link>
              <Link
                href="/departure-recommendation"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-[#0B1F3A] text-sm font-semibold hover:bg-white transition-colors shadow-sm"
              >
                Rekomendasi Berangkat
              </Link>
            </ScrollRevealRow>
          </div>
        </section>
      </div>
    </PublicPageShell>
  );
}
