"use client";

import Link from "next/link";
import { useState, useEffect, useRef, ReactNode } from "react";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import { ArrowRight, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Clock, Map, MapPin, Database, Activity, CalendarClock, ShieldCheck } from "lucide-react";
import { TrafficModuleNav } from "@/components/traffic/traffic-module-nav";

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

export default function DepartureRecommendationPage() {
  const [data, setData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlan = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      // Keep defaults to preserve API compatibility
      const response = await fetch(`${apiUrl}/forecasting/plan?origin=Simpang SKA&destination=Bandara SSK II&time_mode=berangkat&target_time=08:00&weather=Cerah`);
      
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

  useEffect(() => {
    fetchPlan();
  }, []);

  const getStatusInfo = (data: ForecastData | null) => {
    const cat = data?.congestion_category?.toLowerCase() || "";
    const risk = data?.risk_level || "Belum tersedia";

    if (cat.includes("macet total") || cat.includes("macet")) {
      return {
        color: "text-red-700",
        bgStatus: "bg-red-50",
        borderColor: "border-red-200",
        badgeBg: "bg-red-600",
        statusText: "Macet",
        rekomendasiUtama: "Tunda perjalanan sementara",
        alasanSingkat: "Kondisi jalan macet. Sebaiknya hindari keberangkatan saat ini untuk menghindari penundaan yang signifikan.",
        riskLevel: risk,
      };
    } else if (cat.includes("agak padat") || cat.includes("sedang")) {
      return {
        color: "text-amber-700",
        bgStatus: "bg-amber-50",
        borderColor: "border-amber-200",
        badgeBg: "bg-amber-500",
        statusText: "Sedang",
        rekomendasiUtama: "Berangkat dengan waktu tambahan",
        alasanSingkat: "Kepadatan mulai terlihat. Siapkan waktu ekstra agar perjalanan lebih aman dan tenang.",
        riskLevel: risk,
      };
    } else if (cat.includes("padat")) {
      return {
        color: "text-red-700",
        bgStatus: "bg-red-50",
        borderColor: "border-red-200",
        badgeBg: "bg-red-600",
        statusText: "Padat",
        rekomendasiUtama: "Tunda perjalanan sementara",
        alasanSingkat: "Arus jalan terpantau lambat. Perjalanan Anda berisiko terhambat.",
        riskLevel: risk,
      };
    } else if (cat.includes("lancar")) {
      return {
        color: "text-teal-800",
        bgStatus: "bg-teal-50",
        borderColor: "border-teal-200",
        badgeBg: "bg-teal-600",
        statusText: "Lancar",
        rekomendasiUtama: "Berangkat sekarang",
        alasanSingkat: "Kondisi sangat ideal. Tidak ada antrean yang berarti, aman untuk memulai perjalanan.",
        riskLevel: risk,
      };
    }
    
    return {
      color: "text-slate-700",
      bgStatus: "bg-slate-50",
      borderColor: "border-slate-200",
      badgeBg: "bg-slate-400",
      statusText: "Belum tersedia",
      rekomendasiUtama: "Rekomendasi belum tersedia",
      alasanSingkat: "Sistem menunggu data monitoring dari hasil deteksi.",
      riskLevel: "Belum tersedia",
    };
  };

  const statusInfo = getStatusInfo(data);
  const delayMinutes = data?.delay_minutes;
  const hasData = data?.data_available === true;

  // Simple current time string logic for table display
  const getDisplayTime = (offsetMinutes: number) => {
    if (!hasData) return "Belum tersedia";
    if (offsetMinutes === 0) return data?.departure_time || "Sekarang";
    // Usually API returns full predictions. If not, we just write the offset.
    return `+${offsetMinutes} menit`;
  };

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
                    Rekomendasi Waktu Berangkat
                  </h1>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <p className="text-blue-100/80 font-medium text-base lg:text-lg">
                    Lihat saran waktu perjalanan berdasarkan kondisi lalu lintas dan estimasi keterlambatan terkini.
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

        <TrafficModuleNav />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 relative z-20 space-y-8">
          
          {/* Status Loading/Error */}
          {isLoading && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl flex items-center gap-4 text-slate-600">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="font-bold">Mengambil rekomendasi waktu berangkat...</span>
            </div>
          )}

          {error && !isLoading && (
            <div className="bg-red-50 p-8 rounded-3xl border border-red-200 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="font-bold text-red-900 text-lg">{error}</h3>
              </div>
              <p className="text-red-700 font-medium">Pastikan layanan backend RoadTierbers sedang berjalan.</p>
            </div>
          )}

          {!isLoading && !error && !hasData && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">Belum ada data monitoring</h3>
              <p className="text-slate-500 font-medium">Sistem menunggu data dari hasil deteksi.</p>
            </div>
          )}

          {/* 2. Main Departure Recommendation Panel */}
          {!isLoading && !error && hasData && (
            <ScrollReveal delay={0.1}>
              <div className={`bg-white rounded-3xl border ${statusInfo.borderColor} shadow-xl shadow-slate-200/50 overflow-hidden`}>
                <div className={`p-8 lg:p-10 ${statusInfo.bgStatus}`}>
                  <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
                    
                    {/* Recommendation Focus Area */}
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                        <div className={`w-2 h-2 rounded-full ${statusInfo.badgeBg} animate-pulse`} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${statusInfo.color}`}>{statusInfo.statusText}</span>
                      </div>
                      <h2 className={`text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight ${statusInfo.color}`}>
                        {statusInfo.rekomendasiUtama}
                      </h2>
                      <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-2xl">
                        {statusInfo.alasanSingkat}
                      </p>
                    </div>

                    {/* Quick Metrics Grid */}
                    <div className="lg:w-[400px] shrink-0 grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Kondisi Jalan</p>
                        <p className="text-xl font-extrabold text-[#0B1F3A] capitalize">
                          {data?.congestion_category || "Belum tersedia"}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Keterlambatan</p>
                        <p className="text-xl font-extrabold text-[#0B1F3A]">
                          {delayMinutes !== undefined ? `${delayMinutes} menit` : "Belum tersedia"}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Risiko</p>
                        <p className={`text-lg font-extrabold ${statusInfo.color}`}>
                          {statusInfo.riskLevel}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pembaruan</p>
                        <p className="text-lg font-extrabold text-[#0B1F3A] truncate">
                          {data?.departure_time || "Belum tersedia"}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* 3. Departure Options Section */}
          {!isLoading && !error && hasData && (
            <ScrollReveal delay={0.2}>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">
                <h3 className="text-lg font-extrabold text-[#0B1F3A] mb-6 flex items-center gap-2">
                  <CalendarClock className="w-5 h-5 text-blue-600" /> Pilihan waktu perjalanan
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b-2 border-slate-100">
                        <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-[20%]">Waktu</th>
                        <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-[25%]">Status</th>
                        <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-[20%]">Est. Keterlambatan</th>
                        <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-[35%]">Rekomendasi Singkat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[0, 15, 30, 45].map((offset, i) => {
                        const isNow = offset === 0;
                        const timeStr = getDisplayTime(offset);
                        // If current offset, use real status. Otherwise show "Belum tersedia" to avoid faking data.
                        const rowCat = isNow ? (data?.congestion_category || "Belum tersedia") : "Belum tersedia";
                        const rowDelay = isNow ? (delayMinutes !== undefined ? `${delayMinutes} menit` : "Belum tersedia") : "Belum tersedia";
                        const rowRec = isNow ? statusInfo.rekomendasiUtama : "Belum tersedia";
                        const rowStyle = isNow ? statusInfo : getStatusInfo(null);
                        
                        return (
                          <tr key={offset} className={`hover:bg-slate-50 transition-colors ${isNow ? 'bg-blue-50/30' : ''}`}>
                            <td className="py-5 px-4">
                              <span className={`font-bold ${isNow ? 'text-blue-700' : 'text-slate-700'}`}>{timeStr}</span>
                            </td>
                            <td className="py-5 px-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold capitalize bg-slate-50 border border-slate-200 ${rowStyle.color}`}>
                                {rowCat}
                              </span>
                            </td>
                            <td className="py-5 px-4 font-bold text-[#0B1F3A] text-sm">
                              {rowDelay}
                            </td>
                            <td className="py-5 px-4 text-sm font-medium text-slate-600">
                              {rowRec}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* 4 & 5. Info Sections */}
          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <ScrollReveal delay={0.3} className="h-full">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full">
                <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Konteks perjalanan
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm pb-4 border-b border-slate-100">
                    <span className="font-medium text-slate-500">Area & Rute</span>
                    <span className="font-bold text-[#0B1F3A]">Pekanbaru (Simpang SKA)</span>
                  </div>
                  <div className="flex justify-between text-sm pb-4 border-b border-slate-100">
                    <span className="font-medium text-slate-500">Sumber data</span>
                    <span className="font-bold text-[#0B1F3A]">Backend Prediksi AI</span>
                  </div>
                  <div className="flex justify-between text-sm pb-4 border-b border-slate-100">
                    <span className="font-medium text-slate-500">Status sistem</span>
                    <span className="font-bold text-teal-600">Online</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-500">Pembaruan terakhir</span>
                    <span className="font-bold text-[#0B1F3A]">{hasData && data?.departure_time ? data.departure_time : "Belum tersedia"}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} className="h-full">
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm h-full">
                <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-blue-600" /> Catatan Sebelum Berangkat
                </h3>
                <ul className="space-y-4 text-sm font-medium text-slate-700 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Periksa kondisi jalan beberapa menit sebelum berangkat.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Siapkan waktu tambahan jika melewati area padat.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Tetap ikuti rambu dan arahan petugas di lapangan.</span>
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
                <Link href="/congestion-prediction" className="group flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <span className="text-sm font-bold text-[#0B1F3A] group-hover:text-blue-600 transition-colors">Prediksi kemacetan</span>
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
