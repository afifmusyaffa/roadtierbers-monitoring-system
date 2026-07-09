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
import { MapPin, Clock, CloudRain, Navigation } from "lucide-react";

export default function DepartureRecommendationPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [origin, setOrigin] = useState("Simpang SKA");
  const [destination, setDestination] = useState("Bandara SSK II");
  const [timeMode, setTimeMode] = useState("berangkat");
  const [targetTime, setTargetTime] = useState("08:00");
  const [weather, setWeather] = useState("Cerah");

  const fetchPlan = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${apiUrl}/forecasting/plan?origin=${origin}&destination=${destination}&time_mode=${timeMode}&target_time=${targetTime}&weather=${weather}`);
      
      if (!response.ok) {
        throw new Error("Gagal mengambil data");
      }
      
      const res = await response.json();
      if (res.status === "success" && res.data) {
        setData(res.data);
      } else {
        throw new Error(res.message || "Data tidak valid");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal memuat rekomendasi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const getStatusInfo = (data: any) => {
    const cat = data?.congestion_category?.toLowerCase() || "";
    const delay = data?.delay_minutes || 0;
    const hour = data?.target_arrival || data?.departure_time || targetTime;
    const risk = data?.risk_level || "Sedang";

    if (cat.includes("macet total") || cat.includes("macet")) {
      return {
        color: "text-red-600",
        bgStatus: "bg-red-50",
        borderColor: "border-red-100",
        statusText: "Macet",
        rekomendasiUtama: "Tunda Perjalanan",
        alasanSingkat: `Antrean kendaraan terpantau panjang. Perjalanan Anda berpotensi tertunda hingga ${delay} menit.`,
        polaWaktu: [
          { time: "Sekarang", label: "Macet", color: "bg-red-600", ring: "ring-red-600/20" },
          { time: "+15 menit", label: "Padat", color: "bg-red-500", ring: "ring-red-500/20" },
          { time: "+30 menit", label: "Mulai terurai", color: "bg-amber-400", ring: "ring-amber-400/20" },
          { time: "+45 menit", label: "Lancar", color: "bg-[#14B8A6]", ring: "ring-teal-500/20" },
        ],
        decisions: [
          { title: "Berangkat sekarang", status: "TIDAK DISARANKAN", helper: `Menyebabkan delay ${delay} menit. Hindari berangkat sekarang.`, delay: 0.1, statusColor: "text-red-500", bgStatus: "bg-red-50", borderColor: "border-red-100" },
          { title: "Waktu Tunggu", status: "TUNDA 30-45 MNT", helper: `Tunggu hingga kemacetan terurai melewati jam puncak (pukul ${hour}).`, delay: 0.15, statusColor: "text-[#1D4ED8]", bgStatus: "bg-blue-50", borderColor: "border-blue-100" },
          { title: "Analisis Risiko", status: `RISIKO ${risk.toUpperCase()}`, helper: `Kondisi jalan macet dengan cuaca ${weather} meningkatkan risiko perjalanan.`, delay: 0.2, statusColor: "text-amber-600", bgStatus: "bg-amber-50", borderColor: "border-amber-100" }
        ]
      };
    } else if (cat.includes("agak padat")) {
      return {
        color: "text-amber-500",
        bgStatus: "bg-amber-50",
        borderColor: "border-amber-100",
        statusText: "Mulai Padat",
        rekomendasiUtama: "Cari Rute Alternatif",
        alasanSingkat: `Arus lalu lintas mulai melambat. Terdapat potensi delay perjalanan sekitar ${delay} menit.`,
        polaWaktu: [
          { time: "Sekarang", label: "Agak Padat", color: "bg-amber-500", ring: "ring-amber-500/20" },
          { time: "+15 menit", label: "Menurun", color: "bg-amber-400", ring: "ring-amber-400/20" },
          { time: "+30 menit", label: "Stabil", color: "bg-[#14B8A6]", ring: "ring-teal-500/20" },
          { time: "+45 menit", label: "Lancar", color: "bg-[#14B8A6]", ring: "ring-teal-500/20" },
        ],
        decisions: [
          { title: "Berangkat sekarang", status: "BISA DILAKUKAN", helper: `Lalu lintas melambat (estimasi delay ${delay} menit), namun masih bisa dilewati.`, delay: 0.1, statusColor: "text-amber-500", bgStatus: "bg-amber-50", borderColor: "border-amber-100" },
          { title: "Rekomendasi Rute", status: "CARI ALTERNATIF", helper: `Gunakan rute alternatif jika memungkinkan untuk menghindari kepadatan.`, delay: 0.15, statusColor: "text-[#1D4ED8]", bgStatus: "bg-blue-50", borderColor: "border-blue-100" },
          { title: "Analisis Risiko", status: `RISIKO ${risk.toUpperCase()}`, helper: `Kecepatan kendaraan perlu diturunkan. Cuaca ${weather} saat ini.`, delay: 0.2, statusColor: "text-[#14B8A6]", bgStatus: "bg-teal-50", borderColor: "border-teal-100" }
        ]
      };
    } else if (cat.includes("padat")) {
      return {
        color: "text-red-500",
        bgStatus: "bg-red-50",
        borderColor: "border-red-100",
        statusText: "Padat",
        rekomendasiUtama: "Tunda 20–30 menit",
        alasanSingkat: `Kepadatan cukup tinggi. Perjalanan Anda akan tertunda kira-kira ${delay} menit.`,
        polaWaktu: [
          { time: "Sekarang", label: "Padat", color: "bg-red-500", ring: "ring-red-500/20" },
          { time: "+15 menit", label: "Masih padat", color: "bg-red-400", ring: "ring-red-400/20" },
          { time: "+30 menit", label: "Mulai menurun", color: "bg-amber-400", ring: "ring-amber-400/20" },
          { time: "+45 menit", label: "Lebih stabil", color: "bg-[#14B8A6]", ring: "ring-teal-500/20" },
        ],
        decisions: [
          { title: "Berangkat sekarang", status: "TIDAK DISARANKAN", helper: `Tundaan hingga ${delay} menit. Perjalanan akan memakan waktu lebih lambat dari biasanya.`, delay: 0.1, statusColor: "text-red-500", bgStatus: "bg-red-50", borderColor: "border-red-100" },
          { title: "Waktu Tunggu", status: "TUNDA 20-30 MNT", helper: `Tunggu antrean sedikit mereda sebelum berangkat.`, delay: 0.15, statusColor: "text-[#1D4ED8]", bgStatus: "bg-blue-50", borderColor: "border-blue-100" },
          { title: "Analisis Risiko", status: `RISIKO ${risk.toUpperCase()}`, helper: `Patuhi jarak aman kendaraan di jam ${hour} ini dengan cuaca ${weather}.`, delay: 0.2, statusColor: "text-amber-600", bgStatus: "bg-amber-50", borderColor: "border-amber-100" }
        ]
      };
    }
    // Lancar
    return {
      color: "text-[#14B8A6]",
      bgStatus: "bg-teal-50",
      borderColor: "border-teal-100",
      statusText: "Lancar",
      rekomendasiUtama: "Jalan Terus",
      alasanSingkat: `Kondisi sangat ideal. Tidak ada antrean yang berarti.`,
      polaWaktu: [
        { time: "Sekarang", label: "Lancar", color: "bg-[#14B8A6]", ring: "ring-teal-500/20" },
        { time: "+15 menit", label: "Tetap stabil", color: "bg-[#14B8A6]", ring: "ring-teal-500/20" },
        { time: "+30 menit", label: "Lancar", color: "bg-[#14B8A6]", ring: "ring-teal-500/20" },
        { time: "+45 menit", label: "Lancar", color: "bg-[#14B8A6]", ring: "ring-teal-500/20" },
      ],
      decisions: [
        { title: "Berangkat sekarang", status: "SANGAT DISARANKAN", helper: `Estimasi delay hanya ${delay} menit pada pukul ${hour}. Waktu ideal untuk perjalanan.`, delay: 0.1, statusColor: "text-[#14B8A6]", bgStatus: "bg-teal-50", borderColor: "border-teal-100" },
        { title: "Prediksi Volume", status: "TERKENDALI", helper: `Arus lalu lintas mengalir lancar.`, delay: 0.15, statusColor: "text-[#1D4ED8]", bgStatus: "bg-blue-50", borderColor: "border-blue-100" },
        { title: "Analisis Risiko", status: `RISIKO ${risk.toUpperCase()}`, helper: `Cuaca ${weather} dan jalan lengang. Tetap kendalikan batas kecepatan Anda.`, delay: 0.2, statusColor: "text-[#0B1F3A]", bgStatus: "bg-slate-100", borderColor: "border-slate-200" }
      ]
    };
  };

  const statusInfo = getStatusInfo(data);
  const delayMinutes = data?.delay_minutes ?? 0;
  const totalTravelTime = data?.total_travel_time ?? 0;
  const recommendedTime = data?.recommended_departure || data?.estimated_arrival || "--:--";

  return (
    <PublicPageShell>
      <div className="rt-bright-stage relative overflow-hidden pb-32 min-h-screen pt-12">
        <MouseSpotlight />
        
        {/* Soft background radial glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* 1. Page Hero */}
        <section className="relative pt-32 pb-6 lg:pt-36 lg:pb-8 flex flex-col items-center justify-center z-10">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6">
            <MotionSection direction="up" delay={0.1}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B1F3A] backdrop-blur-md shadow-sm">
                Rekomendasi Publik
              </span>
            </MotionSection>

            <MotionSection direction="up" delay={0.15} className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B1F3A] leading-[1.1]">
                Pilih waktu berangkat<br />dengan lebih tenang.
              </h1>
              <p className="text-base sm:text-lg text-[#0B1F3A]/70 font-medium leading-relaxed max-w-xl mx-auto">
                Gunakan estimasi kemacetan AI untuk menentukan waktu perjalanan yang lebih nyaman dan aman.
              </p>
            </MotionSection>
          </div>
        </section>

        {/* 1.5. Trip Planner Form */}
        <section className="relative z-20 pb-8">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
             <InteractiveGlassCard intensity="strong" glow className="w-full p-6 md:p-8 bg-white/80 backdrop-blur-xl border border-white/80 shadow-md rounded-[2rem]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Lokasi Asal</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <select 
                            value={origin} 
                            onChange={e => setOrigin(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none text-sm font-medium"
                          >
                             <option value="Simpang SKA">Simpang SKA</option>
                             <option value="Pasar Pagi">Pasar Pagi</option>
                             <option value="Bandara SSK II">Bandara SSK II</option>
                             <option value="Panam">Panam</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tujuan</label>
                        <div className="relative">
                          <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <select 
                            value={destination} 
                            onChange={e => setDestination(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none text-sm font-medium"
                          >
                             <option value="Bandara SSK II">Bandara SSK II</option>
                             <option value="Simpang SKA">Simpang SKA</option>
                             <option value="Pasar Pagi">Pasar Pagi</option>
                             <option value="Panam">Panam</option>
                          </select>
                        </div>
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mode Waktu</label>
                         <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button 
                              onClick={() => setTimeMode("berangkat")}
                              className={`flex-1 text-xs font-bold py-2 rounded-lg transition-colors ${timeMode === "berangkat" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                               Berangkat Pukul
                            </button>
                            <button 
                              onClick={() => setTimeMode("tiba")}
                              className={`flex-1 text-xs font-bold py-2 rounded-lg transition-colors ${timeMode === "tiba" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                               Harus Tiba Pukul
                            </button>
                         </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Jam</label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                              type="time" 
                              value={targetTime}
                              onChange={e => setTargetTime(e.target.value)}
                              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-medium"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cuaca</label>
                          <div className="relative">
                            <CloudRain className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <select 
                              value={weather}
                              onChange={e => setWeather(e.target.value)}
                              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none text-sm font-medium"
                            >
                               <option value="Cerah">Cerah</option>
                               <option value="Hujan">Hujan Ringan</option>
                               <option value="Hujan Lebat">Hujan Lebat</option>
                            </select>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={fetchPlan}
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Kalkulasi...</>
                    ) : (
                      "Rencanakan Perjalanan"
                    )}
                  </button>
                </div>
             </InteractiveGlassCard>
          </div>
        </section>

        {isLoading ? (
          <section className="relative z-20 pb-16 min-h-[20vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-500 font-medium animate-pulse">Menyiapkan rekomendasi rute...</p>
            </div>
          </section>
        ) : error ? (
          <section className="relative z-20 pb-16 min-h-[20vh] flex items-center justify-center">
            <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-center">
              <p className="text-red-500 font-medium">{error}</p>
            </div>
          </section>
        ) : data ? (
          <>
            {/* 2. Main Recommendation Panel */}
            <section className="relative z-20 pb-16">
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <MotionSection direction="up" delay={0.3}>
                  <InteractiveGlassCard intensity="strong" glow className="w-full p-8 sm:p-12 flex flex-col md:flex-row items-center gap-10 justify-between border-white rounded-[2.5rem] shadow-lg relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#14B8A6]/5 blur-[80px] rounded-full pointer-events-none" />
                    
                    <div className="flex-1 space-y-8 relative z-10 w-full">
                      <div>
                        <p className="text-sm font-bold text-[#0B1F3A]/60 uppercase tracking-widest mb-3">Rekomendasi Utama</p>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1D4ED8] tracking-tight">{statusInfo.rekomendasiUtama}</h2>
                      </div>
                      
                      <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 shadow-sm backdrop-blur-md flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[#1D4ED8] font-bold text-sm">i</span>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Alasan Singkat</p>
                          <p className="text-sm font-medium text-slate-600 leading-relaxed">
                            {statusInfo.alasanSingkat}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 relative z-10 w-full md:w-auto min-w-[280px]">
                      <div className="p-5 rounded-2xl bg-blue-600 text-white shadow-lg flex justify-between items-center">
                        <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">
                          {timeMode === "tiba" ? "Jam Keberangkatan" : "Estimasi Tiba"}
                        </p>
                        <span className="text-2xl font-extrabold">{recommendedTime}</span>
                      </div>
                      <div className="p-5 rounded-2xl bg-white/80 border border-white/80 shadow-sm backdrop-blur-md flex justify-between items-center">
                        <p className="text-xs font-bold text-[#0B1F3A]/60 uppercase tracking-widest">Total Waktu Tempuh</p>
                        <span className="text-sm font-extrabold text-[#0B1F3A]">{totalTravelTime} menit</span>
                      </div>
                      <div className="p-5 rounded-2xl bg-white/80 border border-white/80 shadow-sm backdrop-blur-md flex justify-between items-center">
                        <p className="text-xs font-bold text-[#0B1F3A]/60 uppercase tracking-widest">Estimasi Kemacetan</p>
                        <span className="text-sm font-extrabold text-[#0B1F3A]">{delayMinutes} menit</span>
                      </div>
                      <div className="p-5 rounded-2xl bg-white/80 border border-white/80 shadow-sm backdrop-blur-md flex justify-between items-center">
                        <p className="text-xs font-bold text-[#0B1F3A]/60 uppercase tracking-widest">Status Perjalanan</p>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full border ${statusInfo.color} ${statusInfo.bgStatus} ${statusInfo.borderColor}`}>{statusInfo.statusText}</span>
                      </div>
                    </div>
                  </InteractiveGlassCard>
                </MotionSection>
              </div>
            </section>

            {/* 3. Decision Cards */}
            <section className="relative z-10 pb-20">
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {statusInfo.decisions.map((item, i) => (
                    <ScrollRevealRow key={i} direction="up" delay={item.delay} className="h-full">
                      <InteractiveGlassCard intensity="medium" className="p-6 h-full border-white shadow-sm flex flex-col">
                        <div className="flex-1">
                          <p className="text-[11px] font-bold text-[#0B1F3A]/50 uppercase tracking-widest mb-3">{item.title}</p>
                          <div className={`inline-flex items-center px-2.5 py-1 rounded-md border ${item.bgStatus} ${item.borderColor} mb-4`}>
                            <span className={`text-[11px] font-bold uppercase tracking-widest ${item.statusColor}`}>{item.status}</span>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed mt-2">{item.helper}</p>
                      </InteractiveGlassCard>
                    </ScrollRevealRow>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Simple Time Option Flow */}
            <section className="relative z-10 pb-20">
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <ScrollRevealRow direction="up" delay={0.1}>
                  <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/80 p-8 shadow-sm">
                    <h3 className="text-sm font-bold text-[#0B1F3A] mb-8 text-center sm:text-left">Pola Waktu Kedepan (Simulasi AI)</h3>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-6 relative">
                      {/* Connecting Line (Desktop) */}
                      <div className="hidden sm:block absolute top-1/2 left-6 right-6 h-[2px] bg-slate-100 rounded-full -translate-y-1/2 z-0" />
                      
                      {/* Connecting Line (Mobile) */}
                      <div className="sm:hidden absolute top-6 bottom-6 left-[22px] w-[2px] bg-slate-100 rounded-full z-0" />
                      
                      {statusInfo.polaWaktu.map((node, i) => (
                        <div key={i} className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3 relative z-10 bg-white/70 sm:bg-white/60 p-3 sm:px-4 sm:py-5 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/50 w-full sm:max-w-[140px] shadow-sm sm:shadow-none hover:shadow-md transition-shadow">
                          <div className={`w-3.5 h-3.5 rounded-full ${node.color} ring-4 ${node.ring} shadow-sm shrink-0`} />
                          <div className="flex flex-col sm:items-center w-full">
                            <span className="text-xs font-bold text-[#0B1F3A]/60 sm:mb-1">{node.time}</span>
                            <span className="text-sm sm:text-[11px] font-bold text-[#0B1F3A] sm:uppercase sm:tracking-widest">{node.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollRevealRow>
              </div>
            </section>
          </>
        ) : null}

        {/* 5. Safety Guidance Section */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScrollRevealRow direction="left" delay={0.1}>
              <div className="flex flex-col sm:flex-row gap-5 p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <span className="text-slate-600 font-bold text-lg">!</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-[#0B1F3A]">Imbauan Keselamatan</h3>
                  <div className="space-y-2 text-sm font-medium text-slate-600 leading-relaxed max-w-2xl">
                    <p>Jika tetap harus berangkat, siapkan waktu tambahan dan hindari mengambil keputusan mendadak.</p>
                    <p>Tetap patuhi rambu, jaga jarak aman, dan perhatikan kondisi sekitar.</p>
                  </div>
                </div>
              </div>
            </ScrollRevealRow>
          </div>
        </section>

        {/* 6. CTA Section */}
        <section className="relative z-10 pb-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-8">
            <ScrollRevealRow direction="up" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1F3A]">
                Ingin memahami kondisi jalan lebih lengkap?
              </h2>
            </ScrollRevealRow>
            
            <ScrollRevealRow direction="up" delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/traffic-overview"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#0B1F3A] text-white text-sm font-semibold hover:bg-[#142d52] transition-colors shadow-md"
              >
                Ringkasan Lalu Lintas
              </Link>
              <Link
                href="/congestion-prediction"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-[#0B1F3A] text-sm font-semibold hover:bg-white transition-colors shadow-sm"
              >
                Prediksi Kemacetan
              </Link>
            </ScrollRevealRow>
          </div>
        </section>
      </div>
    </PublicPageShell>
  );
}
