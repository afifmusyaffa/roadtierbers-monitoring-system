"use client";

import Link from "next/link";
import { useState, useEffect, useRef, ReactNode } from "react";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import { ArrowRight, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Clock, Map, MapPin, Database } from "lucide-react";
import { TrafficModuleNav } from "@/components/traffic/traffic-module-nav";

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
        trendIcon: TrendingUp,
        trendColor: "text-red-600",
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
        trendIcon: TrendingUp,
        trendColor: "text-amber-500",
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
        trendIcon: TrendingUp,
        trendColor: "text-red-600",
        decision: "Pertimbangkan menunda perjalanan",
        decisionSub: "Arus jalan terpantau lambat. Perjalanan Anda berisiko terhambat."
      };
    } else if (cat.includes("lancar")) {
      return {
        color: "text-teal-800",
        bgStatus: "bg-teal-50",
        borderColor: "border-teal-200",
        badgeBg: "bg-teal-600", 
        trend: "Menurun",
        trendIcon: TrendingDown,
        trendColor: "text-teal-600",
        decision: "Berangkat sekarang",
        decisionSub: "Jalan terpantau lancar. Kondisi masih aman untuk perjalanan."
      };
    }
    
    return {
      color: "text-slate-700",
      bgStatus: "bg-slate-50",
      borderColor: "border-slate-200",
      badgeBg: "bg-slate-400",
      trend: "-",
      trendIcon: TrendingUp,
      trendColor: "text-slate-400",
      decision: "Rekomendasi belum tersedia",
      decisionSub: "Sistem menunggu data monitoring dari hasil deteksi."
    };
  };

  const statusInfo = getStatusInfo(categoryStr);

  return (
    <PublicPageShell>
      <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900 pb-24">
        
        {/* 1. Compact Feature Hero / Header */}
        <section className="relative pt-24 pb-12 overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-[#102A4C]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              
              <div className="max-w-2xl">
                <ScrollReveal delay={0}>
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
                    Pantauan Lalu Lintas
                  </h1>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <p className="text-blue-100/80 font-medium text-base lg:text-lg">
                    Cek kondisi jalan, estimasi kepadatan, dan rekomendasi perjalanan sebelum berangkat.
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
                    <Clock className="w-4 h-4 text-amber-400" />
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
              <span className="font-bold">Mengambil pantauan lalu lintas...</span>
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
              <p className="text-slate-500 font-medium mb-6 max-w-md mx-auto">Sistem menunggu data dari hasil deteksi.</p>
              <Link href="/officer/ai-detection" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors">
                Ke Pusat Deteksi AI <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* 2. Main Traffic Brief Panel */}
          {!isLoading && !error && hasData && (
            <ScrollReveal delay={0.1}>
              <div className={`bg-white rounded-3xl border ${statusInfo.borderColor} shadow-xl shadow-slate-200/50 overflow-hidden`}>
                <div className={`p-8 lg:p-10 ${statusInfo.bgStatus}`}>
                  <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
                    
                    {/* Primary Decision Area */}
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                        <div className={`w-2 h-2 rounded-full ${statusInfo.badgeBg} animate-pulse`} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${statusInfo.color}`}>{categoryStr}</span>
                      </div>
                      <h2 className={`text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight ${statusInfo.color}`}>
                        {statusInfo.decision}
                      </h2>
                      <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-2xl">
                        {statusInfo.decisionSub}
                      </p>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="lg:w-[400px] shrink-0 grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Kepadatan</p>
                        <p className="text-2xl font-extrabold text-[#0B1F3A]">
                          {congestion?.volume_pred !== undefined ? `${congestion.volume_pred} kend` : "Belum tersedia"}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Keterlambatan</p>
                        <p className="text-2xl font-extrabold text-[#0B1F3A]">
                          {delayMinutes !== undefined ? `${delayMinutes} menit` : "Belum tersedia"}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Risiko Perjalanan</p>
                        <div className="flex items-center gap-2">
                          <statusInfo.trendIcon className={`w-5 h-5 ${statusInfo.trendColor}`} />
                          <p className={`text-xl font-extrabold ${statusInfo.trendColor}`}>
                            {statusInfo.trend}
                          </p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pembaruan</p>
                        <p className="text-lg font-extrabold text-[#0B1F3A] truncate">
                          {data?.target_hour ? data.target_hour : "Belum tersedia"}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* 3. Monitoring Detail Section */}
          {!isLoading && !error && hasData && (
            <div className="grid lg:grid-cols-3 gap-6">
              
              <ScrollReveal delay={0.2} className="h-full">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full">
                  <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-6 flex items-center gap-2">
                    <Map className="w-4 h-4 text-blue-600" /> Area Pemantauan
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <div>
                        <p className="font-bold text-[#0B1F3A] text-sm">Simpang SKA</p>
                        <p className="text-xs font-medium text-slate-400">Area utama</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md capitalize bg-slate-50 border border-slate-200 ${statusInfo.color}`}>{categoryStr}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <div>
                        <p className="font-bold text-slate-600 text-sm">Jl. Sudirman</p>
                        <p className="text-xs font-medium text-slate-400">Menunggu sinkronisasi</p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">Belum tersedia</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <div>
                        <p className="font-bold text-slate-600 text-sm">Panam</p>
                        <p className="text-xs font-medium text-slate-400">Menunggu sinkronisasi</p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">Belum tersedia</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-600 text-sm">Harapan Raya</p>
                        <p className="text-xs font-medium text-slate-400">Menunggu sinkronisasi</p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">Belum tersedia</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3} className="h-full">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-full">
                  <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-6 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" /> Estimasi Waktu
                  </h3>
                  <div className="space-y-4">
                    {[0, 15, 30, 45].map((offset, i, arr) => {
                      const isNow = offset === 0;
                      const timeStr = isNow ? "Sekarang" : `+${offset} menit`;
                      const label = isNow ? categoryStr : "Belum tersedia";
                      const isLast = i === arr.length - 1;
                      const dotColor = isNow ? statusInfo.badgeBg : "bg-slate-200";
                      
                      return (
                        <div key={offset} className={`flex items-center justify-between ${!isLast ? 'pb-4 border-b border-slate-100' : ''}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></div>
                            <span className={isNow ? "font-bold text-[#0B1F3A] text-sm" : "font-medium text-slate-600 text-sm"}>{timeStr}</span>
                          </div>
                          <span className={`text-[10px] font-bold capitalize ${isNow ? statusInfo.color + " bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200" : 'text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100'}`}>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4} className="h-full">
                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm h-full">
                  <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-blue-600" /> Catatan Perjalanan
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700 leading-relaxed">Periksa kondisi jalan sebelum berangkat.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700 leading-relaxed">Siapkan waktu tambahan jika area tujuan padat.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700 leading-relaxed">Ikuti rambu dan arahan petugas di lapangan.</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

            </div>
          )}

          {/* 4. Supporting Feature Links */}
          {!isLoading && !error && (
            <ScrollReveal delay={0.5}>
              <div className="pt-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Lanjutkan dengan fitur terkait</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/congestion-prediction" className="group flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <span className="text-sm font-bold text-[#0B1F3A] group-hover:text-blue-600 transition-colors">Prediksi kemacetan</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href="/departure-recommendation" className="group flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <span className="text-sm font-bold text-[#0B1F3A] group-hover:text-blue-600 transition-colors">Rekomendasi waktu berangkat</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href="/traffic-sign-education" className="group flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <span className="text-sm font-bold text-[#0B1F3A] group-hover:text-blue-600 transition-colors">Edukasi rambu</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          )}

        </div>
      </div>
    </PublicPageShell>
  );
}
