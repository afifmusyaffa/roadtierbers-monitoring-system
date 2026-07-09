"use client";

import Link from "next/link";
import { useState, useEffect, useRef, ReactNode } from "react";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import { ArrowRight, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Clock, Map, MapPin, Database, Cloud, Thermometer, Activity } from "lucide-react";

interface ForecastData {
  data_available?: boolean;
  message?: string;
  target_arrival?: string;
  departure_time?: string;
  delay_minutes?: number;
  total_travel_time?: number;
  risk_level?: string;
  congestion_category?: string;
}

// Minimal Scroll Reveal Component for tasteful animations
function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = "up",
  className
}: { 
  children: ReactNode, 
  delay?: number,
  direction?: "up" | "left" | "right" | "none",
  className?: string
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { rootMargin: "0px 0px -20px 0px", threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const getTransform = () => {
    if (direction === "up") return "translateY(20px)";
    if (direction === "left") return "translateX(20px)";
    if (direction === "right") return "translateX(-20px)";
    return "none";
  };

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getTransform(),
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
}

export default function CongestionPredictionPage() {
  const [day, setDay] = useState("Hari ini");
  const [time, setTime] = useState("07:00");
  const [weather, setWeather] = useState("Tidak diketahui");
  const [temp, setTemp] = useState("");
  
  const [data, setData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRunPrediction, setHasRunPrediction] = useState(false);

  const fetchPlan = async () => {
    setHasRunPrediction(true);
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      
      const queryParams = new URLSearchParams({
        origin: "Simpang SKA",
        destination: "Bandara SSK II",
        time_mode: "berangkat",
        target_time: time
      });
      
      if (weather !== "Tidak diketahui") {
        queryParams.append("weather", weather);
      }
      
      if (temp) {
        queryParams.append("temp_c", temp);
      }
      
      const response = await fetch(`${apiUrl}/forecasting/plan?${queryParams.toString()}`);
      
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

  const getStatusInfo = (category: string) => {
    const cat = category.toLowerCase();
    
    if (cat.includes("macet total") || cat.includes("macet")) {
      return {
        color: "text-red-700",
        bgStatus: "bg-red-50",
        borderColor: "border-red-200",
        badgeBg: "bg-red-600",
        risk: "Risiko tinggi",
        description: "Kondisi jalan macet. Risiko penundaan tinggi.",
        rekomendasiUtama: "Tunda perjalanan sementara",
      };
    } else if (cat.includes("agak padat") || cat.includes("sedang")) {
      return {
        color: "text-amber-700",
        bgStatus: "bg-amber-50",
        borderColor: "border-amber-200",
        badgeBg: "bg-amber-500",
        risk: "Risiko sedang",
        description: "Kepadatan mulai terlihat. Risiko kemacetan berada di tingkat sedang.",
        rekomendasiUtama: "Berangkat dengan waktu tambahan",
      };
    } else if (cat.includes("padat")) {
      return {
        color: "text-red-700",
        bgStatus: "bg-red-50",
        borderColor: "border-red-200",
        badgeBg: "bg-red-600",
        risk: "Risiko tinggi",
        description: "Arus jalan terpantau padat. Perjalanan berisiko terhambat.",
        rekomendasiUtama: "Tunda perjalanan sementara",
      };
    } else if (cat.includes("lancar")) {
      return {
        color: "text-teal-800",
        bgStatus: "bg-teal-50",
        borderColor: "border-teal-200",
        badgeBg: "bg-teal-600",
        risk: "Risiko rendah",
        description: "Kondisi jalan saat ini terpantau lancar. Risiko kemacetan masih rendah.",
        rekomendasiUtama: "Berangkat sekarang",
      };
    }
    
    return {
      color: "text-slate-700",
      bgStatus: "bg-slate-50",
      borderColor: "border-slate-200",
      badgeBg: "bg-slate-400",
      risk: "Belum tersedia",
      description: "Sistem menunggu data monitoring dari hasil deteksi.",
      rekomendasiUtama: "Rekomendasi belum tersedia",
    };
  };

  const categoryStr = data?.congestion_category ?? "Belum tersedia";
  const riskStr = data?.risk_level ?? "Belum tersedia";
  const delayMinutes = data?.delay_minutes;
  const hasData = data?.data_available === true;
  const targetTime = data?.target_arrival || data?.departure_time || "Belum tersedia";
  
  const statusInfo = getStatusInfo(categoryStr);
  const displayRisk = riskStr !== "Belum tersedia" ? riskStr : statusInfo.risk;

  return (
    <PublicPageShell>
      <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900 pb-24">
        
        {/* 1. Compact Feature Header */}
        <section className="relative pt-24 pb-12 overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-[#102A4C]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              
              <div className="max-w-2xl">
                <ScrollReveal delay={0}>
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
                    Prediksi Kemacetan
                  </h1>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <p className="text-blue-100/80 font-medium text-base lg:text-lg">
                    Masukkan waktu, cuaca, dan suhu untuk melihat estimasi risiko kemacetan pada rute pemantauan.
                  </p>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.2} direction="left">
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium bg-[#0B1F3A]/40 backdrop-blur-md border border-blue-800/50 p-4 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-blue-300/60 uppercase tracking-wider text-[10px] font-bold">Area</p>
                      <p className="text-white font-bold">Pekanbaru</p>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-blue-800/50 hidden sm:block"></div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <div>
                      <p className="text-blue-300/60 uppercase tracking-wider text-[10px] font-bold">Sumber</p>
                      <p className="text-white font-bold">Hasil deteksi sistem</p>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-blue-800/50 hidden sm:block"></div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="text-blue-300/60 uppercase tracking-wider text-[10px] font-bold">Status</p>
                      <p className="text-white font-bold">Mode evaluasi</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
          
          {/* 2. Main Prediction Form Panel */}
          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col lg:flex-row">
              
              {/* Form Input Area */}
              <div className="flex-1 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-100">
                <h2 className="text-xl font-extrabold text-[#0B1F3A] mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" /> Parameter Prediksi
                </h2>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Rute</label>
                      <input 
                        type="text" 
                        value="Simpang SKA" 
                        disabled 
                        className="w-full bg-slate-50 border border-slate-200 text-slate-500 text-sm rounded-xl px-4 py-3 cursor-not-allowed font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hari Prediksi</label>
                      <select 
                        value={day} 
                        onChange={(e) => setDay(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-[#0B1F3A] text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                      >
                        <option>Hari ini</option>
                        <option>Besok</option>
                        <option>Senin</option>
                        <option>Selasa</option>
                        <option>Rabu</option>
                        <option>Kamis</option>
                        <option>Jumat</option>
                        <option>Sabtu</option>
                        <option>Minggu</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Jam Prediksi</label>
                      <input 
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-[#0B1F3A] text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cuaca (Opsional)</label>
                      <select 
                        value={weather} 
                        onChange={(e) => setWeather(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-[#0B1F3A] text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                      >
                        <option>Tidak diketahui</option>
                        <option>Cerah</option>
                        <option>Berawan</option>
                        <option>Hujan ringan</option>
                        <option>Hujan deras</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Suhu °C (Opsional)</label>
                      <input 
                        type="number" 
                        placeholder="Cth: 32"
                        value={temp}
                        onChange={(e) => setTemp(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-[#0B1F3A] text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-medium text-slate-400">
                      *Cuaca dan suhu boleh dikosongkan jika tidak diketahui.
                    </p>
                    <button
                      onClick={fetchPlan}
                      disabled={isLoading}
                      className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Memproses...
                        </>
                      ) : (
                        "Prediksi Kemacetan"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Context Area */}
              <div className="lg:w-80 p-8 lg:p-10 bg-slate-50 flex flex-col justify-center">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Konteks Prediksi</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Rute</span>
                    <span className="font-bold text-[#0B1F3A]">Simpang SKA</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Hari</span>
                    <span className="font-bold text-[#0B1F3A]">{day}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Jam</span>
                    <span className="font-bold text-[#0B1F3A]">{time}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200/60">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5"><Cloud className="w-4 h-4 text-slate-400"/> Cuaca</span>
                    <span className="font-bold text-[#0B1F3A]">{weather}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5"><Thermometer className="w-4 h-4 text-slate-400"/> Suhu</span>
                    <span className="font-bold text-[#0B1F3A]">{temp ? `${temp} °C` : "-"}</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-teal-700">Siap diprediksi</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 3. Prediction Result Area */}
          {hasRunPrediction && (
            <ScrollReveal delay={0.2}>
              {error ? (
                <div className="bg-red-50 p-8 rounded-3xl border border-red-200 shadow-sm mt-8">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <h3 className="font-bold text-red-900 text-lg">{error}</h3>
                  </div>
                  <p className="text-red-700 font-medium">Pastikan layanan backend RoadTierbers sedang berjalan.</p>
                </div>
              ) : !hasData ? (
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mt-8 text-center">
                  <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">Belum ada data monitoring</h3>
                  <p className="text-slate-500 font-medium">Sistem tidak memiliki data historis untuk parameter tersebut.</p>
                </div>
              ) : (
                <div className={`mt-8 bg-white rounded-3xl border ${statusInfo.borderColor} shadow-xl overflow-hidden`}>
                  <div className={`p-8 lg:p-10 ${statusInfo.bgStatus}`}>
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                      
                      <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                          <div className={`w-2 h-2 rounded-full ${statusInfo.badgeBg} animate-pulse`} />
                          <span className={`text-xs font-bold uppercase tracking-wider ${statusInfo.color}`}>{displayRisk}</span>
                        </div>
                        <h2 className={`text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight ${statusInfo.color}`}>
                          {statusInfo.rekomendasiUtama}
                        </h2>
                        <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-2xl">
                          {statusInfo.description}
                        </p>
                      </div>

                      <div className="lg:w-96 shrink-0 grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Kondisi Jalan</p>
                          <p className="text-xl font-extrabold text-[#0B1F3A] capitalize">
                            {categoryStr}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Keterlambatan</p>
                          <p className="text-xl font-extrabold text-[#0B1F3A]">
                            {delayMinutes !== undefined ? `${delayMinutes} mnt` : "-"}
                          </p>
                        </div>
                        <div className="col-span-2 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Estimasi Sampai</p>
                          <p className="text-2xl font-extrabold text-[#0B1F3A]">
                            {targetTime}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </ScrollReveal>
          )}

          {!hasRunPrediction && (
            <ScrollReveal delay={0.2}>
              <div className="mt-8 bg-slate-50 border border-slate-200 rounded-3xl p-10 text-center shadow-inner flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Activity className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">Prediksi belum dijalankan</h3>
                <p className="text-sm font-medium text-slate-500">Isi parameter prediksi, lalu tekan tombol Prediksi Kemacetan.</p>
              </div>
            </ScrollReveal>
          )}

          {/* 4 & 5. Info Sections */}
          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <ScrollReveal delay={0.3} className="h-full">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full">
                <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-600" /> Faktor yang Digunakan
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm pb-4 border-b border-slate-100">
                    <span className="font-medium text-slate-500">Rute, Hari & Waktu</span>
                    <span className="font-bold text-[#0B1F3A]">Input Form</span>
                  </div>
                  <div className="flex justify-between text-sm pb-4 border-b border-slate-100">
                    <span className="font-medium text-slate-500">Cuaca & Suhu</span>
                    <span className="font-bold text-[#0B1F3A]">Input Form</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-500">Volume Kendaraan Dasar</span>
                    <span className="font-bold text-[#0B1F3A]">Model AI & Deteksi</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} className="h-full">
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm h-full">
                <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-blue-600" /> Catatan Membaca Hasil
                </h3>
                <ul className="space-y-4 text-sm font-medium text-slate-700 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Prediksi dapat berubah mengikuti kondisi lapangan saat ini.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Gunakan hasil ini sebagai pertimbangan sebelum berangkat.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Tetap ikuti rambu dan arahan petugas di jalan.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* 6. Supporting Links */}
          <ScrollReveal delay={0.5}>
            <div className="pt-10">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Lanjutkan dengan fitur terkait</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/traffic-overview" className="group flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <span className="text-sm font-bold text-[#0B1F3A] group-hover:text-blue-600 transition-colors">Pantauan lalu lintas</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </Link>
                <Link href="/departure-recommendation" className="group flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <span className="text-sm font-bold text-[#0B1F3A] group-hover:text-blue-600 transition-colors">Rekomendasi berangkat</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </Link>
                <Link href="/traffic-sign-education" className="group flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <span className="text-sm font-bold text-[#0B1F3A] group-hover:text-blue-600 transition-colors">Edukasi rambu</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </PublicPageShell>
  );
}
