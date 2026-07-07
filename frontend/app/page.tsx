import Link from "next/link";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import {
  InteractiveGlassCard,
  ScrollRevealRow,
  MouseSpotlight,
  MotionSection,
} from "@/components/common";

/* ─── Local Helpers ────────────────────────────────────────────────── */
function MetricWidget({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "neutral" | "warn" | "danger" }) {
  const dot = tone === "danger" ? "bg-red-500" : tone === "warn" ? "bg-amber-400" : "bg-[#06B6D4]";
  return (
    <div className="flex flex-col items-start gap-1.5 px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.06] transition-colors">
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${dot} shadow-[0_0_8px_currentColor]`} />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">{label}</span>
      </div>
      <span className="text-2xl font-bold tracking-tight text-white leading-none">{value}</span>
    </div>
  );
}

function CapPill({ title, sub }: { title: string; sub: string }) {
  return (
    <InteractiveGlassCard intensity="dark" glow className="flex flex-col gap-1 px-6 py-6 h-full cursor-default border-t border-white/20">
      <span className="text-base font-semibold text-white tracking-tight">{title}</span>
      <span className="text-xs text-white/50 leading-relaxed">{sub}</span>
    </InteractiveGlassCard>
  );
}

export default function Home() {
  return (
    <PublicPageShell>
      {/* =====================================================================
          1. IMMERSIVE NAVY STAGE 
          ================================================================= */}
      <div className="rt-navy-stage relative overflow-hidden pb-16">
        <MouseSpotlight />
        
        {/* Soft radial blooms */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#1D4ED8]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-[#06B6D4]/10 blur-[100px] rounded-full pointer-events-none" />

        {/* HERO */}
        <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center justify-center z-10 min-h-[90vh]">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-10">
            
            <MotionSection direction="up" delay={0.1}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_12px_#06B6D4]" />
                Smart Traffic Intelligence
              </span>
            </MotionSection>

            <MotionSection direction="up" delay={0.15} className="space-y-6 max-w-3xl">
              <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-bold tracking-[-0.03em] text-white leading-[1.05]">
                RoadTierbers
              </h1>
              <p className="text-lg sm:text-2xl text-white/70 font-light tracking-tight max-w-2xl mx-auto leading-relaxed">
                Traffic command center untuk jalan yang lebih aman.
              </p>
              <p className="text-sm text-white/40 max-w-xl mx-auto">
                Pantau lalu lintas, prediksi kemacetan, dan dukung keputusan petugas dalam satu sistem terpadu.
              </p>
            </MotionSection>

            <MotionSection direction="up" delay={0.2} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/traffic-overview" className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-white text-[#0B1F3A] text-sm font-semibold hover:bg-slate-100 transition-colors shadow-[0_0_32px_rgba(255,255,255,0.15)]">
                Lihat Lalu Lintas
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-white/20 bg-white/[0.05] text-white text-sm font-semibold hover:bg-white/10 transition-colors backdrop-blur-lg">
                Masuk Command Center
              </Link>
            </MotionSection>

            {/* HERO VISUAL: Fill empty space with a beautiful abstract data row */}
            <MotionSection direction="up" delay={0.3} className="w-full mt-12">
              <InteractiveGlassCard intensity="dark" glow className="w-full p-4 sm:p-5 flex flex-col md:flex-row gap-4">
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <MetricWidget label="Kondisi" value="Padat" tone="danger" />
                  <MetricWidget label="Estimasi" value="32 mnt" tone="warn" />
                  <MetricWidget label="Volume" value="8.4K" tone="neutral" />
                </div>
                <div className="flex-1 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 p-5 flex flex-col justify-center relative overflow-hidden">
                   <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white/[0.03] to-transparent pointer-events-none" />
                   <p className="text-sm font-semibold text-white">Live Monitoring Active</p>
                   <p className="text-xs text-white/50 mt-1">Sistem deteksi AI berjalan di 42 titik persimpangan utama.</p>
                   <div className="flex items-center gap-2 mt-4">
                     <span className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                       <span className="block h-full w-[65%] bg-[#06B6D4] rounded-full" />
                     </span>
                     <span className="text-[10px] text-white/40">65%</span>
                   </div>
                </div>
              </InteractiveGlassCard>
            </MotionSection>
          </div>
        </section>

        {/* CAPABILITY BAND */}
        <section className="relative z-20 pb-32">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ScrollRevealRow direction="up" delay={0.1}>
                <CapPill title="Overview" sub="Kondisi terkini jalan" />
              </ScrollRevealRow>
              <ScrollRevealRow direction="up" delay={0.15}>
                <CapPill title="Prediction" sub="Estimasi perjalanan" />
              </ScrollRevealRow>
              <ScrollRevealRow direction="up" delay={0.2}>
                <CapPill title="Detection" sub="Analisis visual AI" />
              </ScrollRevealRow>
              <ScrollRevealRow direction="up" delay={0.25}>
                <CapPill title="Insight" sub="Dukungan keputusan" />
              </ScrollRevealRow>
            </div>
          </div>
        </section>

        {/* PUBLIC EXPERIENCE */}
        <section className="relative z-10 pb-32 pt-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <ScrollRevealRow direction="up" delay={0} className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Untuk publik.</h2>
                <p className="text-sm sm:text-base text-white/50">Akses ringkas sebelum memulai perjalanan.</p>
              </div>
              <Link href="/traffic-overview" className="text-[13px] text-[#06B6D4] hover:text-white transition-colors font-medium flex items-center gap-1">
                Jelajahi fitur <span aria-hidden>→</span>
              </Link>
            </ScrollRevealRow>

            <div className="grid sm:grid-cols-2 gap-5">
              <ScrollRevealRow direction="left" delay={0.1} className="h-full">
                <Link href="/traffic-overview" className="block h-full">
                  <InteractiveGlassCard intensity="dark" glow className="p-8 h-full flex flex-col justify-between group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-10 group-hover:bg-white/20 transition-colors">
                      <span className="w-3.5 h-3.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Ringkasan Lalu Lintas</h3>
                      <p className="text-sm text-white/50 leading-relaxed">Pantau visualisasi kepadatan di berbagai titik utama kota secara real-time.</p>
                    </div>
                  </InteractiveGlassCard>
                </Link>
              </ScrollRevealRow>
              
              <div className="flex flex-col gap-5">
                <ScrollRevealRow direction="right" delay={0.15}>
                  <Link href="/congestion-prediction" className="block">
                    <InteractiveGlassCard intensity="dark" glow className="p-7 group flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Prediksi Kemacetan</h3>
                        <p className="text-sm text-white/50">Estimasi durasi hambatan.</p>
                      </div>
                      <span className="text-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </InteractiveGlassCard>
                  </Link>
                </ScrollRevealRow>

                <ScrollRevealRow direction="right" delay={0.2}>
                  <Link href="/departure-recommendation" className="block">
                    <InteractiveGlassCard intensity="dark" glow className="p-7 group flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Rekomendasi Berangkat</h3>
                        <p className="text-sm text-white/50">Saran waktu perjalanan.</p>
                      </div>
                      <span className="text-[#14B8A6] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </InteractiveGlassCard>
                  </Link>
                </ScrollRevealRow>

                <ScrollRevealRow direction="right" delay={0.25}>
                  <Link href="/traffic-sign-education" className="block">
                    <InteractiveGlassCard intensity="dark" glow className="p-7 group flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Edukasi Rambu</h3>
                        <p className="text-sm text-white/50">Pahami rambu interaktif.</p>
                      </div>
                      <span className="text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </InteractiveGlassCard>
                  </Link>
                </ScrollRevealRow>
              </div>
            </div>
          </div>
        </section>

        {/* Smooth Light Transition element */}
        <div className="rt-smooth-light-transition h-64 w-full absolute bottom-0 left-0 right-0 pointer-events-none" />
      </div>

      {/* =====================================================================
          2. LIGHT & MIXED STAGE
          ================================================================= */}

      {/* OFFICER COMMAND */}
      <section className="bg-[#F5F7FA] pb-32 pt-20 overflow-hidden relative">
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <ScrollRevealRow direction="up" delay={0} className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A]">Untuk petugas.</h2>
              <p className="text-sm sm:text-base text-slate-500">Command center untuk monitoring dan keputusan presisi.</p>
            </div>
            <Link href="/login" className="text-[13px] text-[#1D4ED8] hover:text-[#0B1F3A] transition-colors font-medium flex items-center gap-1">
              Buka Command Center <span aria-hidden>→</span>
            </Link>
          </ScrollRevealRow>

          <ScrollRevealRow direction="up" delay={0.1}>
            <InteractiveGlassCard intensity="dark" glow className="p-8 sm:p-10 !bg-[#061426] !backdrop-blur-3xl shadow-2xl relative overflow-hidden rounded-[2.5rem]">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1D4ED8]/10 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
                {[
                  { title: "Dashboard Utama", sub: "Ringkasan titik pantau.", icon: "bg-white/50", iconBg: "bg-white/10" },
                  { title: "Deteksi AI", sub: "Analisis CCTV real-time.", icon: "bg-[#06B6D4] shadow-[0_0_12px_#06B6D4]", iconBg: "bg-[#06B6D4]/10" },
                  { title: "Forecasting", sub: "Proyeksi tren volume.", icon: "bg-[#14B8A6]", iconBg: "bg-[#14B8A6]/10" },
                  { title: "Smart Insight", sub: "Rekomendasi taktis.", icon: "bg-[#1D4ED8]", iconBg: "bg-[#1D4ED8]/10" },
                  { title: "Report & Export", sub: "Unduh data pelaporan.", icon: "bg-amber-400 rotate-45", iconBg: "bg-amber-400/10" },
                  { title: "AI Assistant", sub: "Tanya jawab sistem.", icon: "bg-white animate-pulse", iconBg: "bg-white/10" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-6 rounded-[1.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors h-full">
                    <div className={`w-12 h-12 rounded-xl shrink-0 ${item.iconBg} flex items-center justify-center`}>
                      <span className={`w-3.5 h-3.5 rounded-sm ${item.icon}`} />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-white tracking-tight">{item.title}</p>
                      <p className="text-xs text-white/50 leading-relaxed mt-1">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </InteractiveGlassCard>
          </ScrollRevealRow>
        </div>
      </section>

      {/* DETECTION FLOW */}
      <section className="bg-white py-32 border-y border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <ScrollRevealRow direction="up" delay={0} className="text-center mb-24 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A]">Alur cerdas otomatis.</h2>
            <p className="text-sm sm:text-base text-slate-500">Dari input visual hingga insight terukur dalam hitungan detik.</p>
          </ScrollRevealRow>

          <div className="flex flex-col sm:flex-row items-stretch justify-between gap-4 relative">
            {/* Connecting line for desktop */}
            <div className="hidden sm:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-slate-200 via-slate-300 to-[#1D4ED8]/30 -translate-y-1/2 z-0" />

            <ScrollRevealRow direction="right" delay={0.1} className="flex-1 w-full relative z-10">
              <InteractiveGlassCard intensity="subtle" className="flex flex-col items-center gap-5 p-10 bg-white border border-slate-100 text-center shadow-[0_8px_32px_rgba(0,0,0,0.02)] hover:shadow-lg transition-shadow rounded-[2rem]">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 shadow-inner flex items-center justify-center text-sm font-bold text-slate-400">1</div>
                <div>
                  <p className="text-lg font-semibold text-slate-800 tracking-tight">Input Visual</p>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">Kamera CCTV mengirimkan frame real-time.</p>
                </div>
              </InteractiveGlassCard>
            </ScrollRevealRow>

            <ScrollRevealRow direction="up" delay={0.2} className="flex-1 w-full relative z-10">
              <InteractiveGlassCard intensity="subtle" className="flex flex-col items-center gap-5 p-10 bg-white border border-slate-100 text-center shadow-[0_8px_32px_rgba(0,0,0,0.02)] hover:shadow-lg transition-shadow rounded-[2rem]">
                <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] shadow-inner flex items-center justify-center text-sm font-bold text-[#1D4ED8]">2</div>
                <div>
                  <p className="text-lg font-semibold text-slate-800 tracking-tight">Analisis AI</p>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">Model mendeteksi volume & jenis kendaraan.</p>
                </div>
              </InteractiveGlassCard>
            </ScrollRevealRow>

            <ScrollRevealRow direction="left" delay={0.3} className="flex-1 w-full relative z-10">
              <InteractiveGlassCard intensity="dark" glow className="flex flex-col items-center gap-5 p-10 !bg-[#061426] text-center shadow-2xl rounded-[2rem]">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-sm font-bold text-white shadow-inner">3</div>
                <div>
                  <p className="text-lg font-semibold text-white tracking-tight">Insight Terukur</p>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">Keputusan langsung disajikan di layar.</p>
                </div>
              </InteractiveGlassCard>
            </ScrollRevealRow>
          </div>
        </div>
      </section>

      {/* FORECASTING */}
      <section className="bg-[#F5F7FA] py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <ScrollRevealRow direction="up" delay={0} className="mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A]">Lihat melampaui saat ini.</h2>
            <p className="text-sm sm:text-base text-slate-500">Persiapkan tindakan sebelum kepadatan memuncak.</p>
          </ScrollRevealRow>

          <div className="grid sm:grid-cols-3 gap-6">
            <ScrollRevealRow direction="up" delay={0.1}>
              <InteractiveGlassCard intensity="subtle" className="bg-white p-8 shadow-sm space-y-8 h-full rounded-[2rem] border border-slate-200/60">
                <p className="text-lg font-semibold text-slate-800 tracking-tight">Tren Volume</p>
                <div className="flex items-end gap-3 h-24">
                  {[40, 55, 90, 65, 30].map((h, i) => (
                    <div key={i} className="w-full relative group" style={{ height: '100%' }}>
                      <div className={`absolute bottom-0 w-full rounded-md transition-all duration-500 ${h === 90 ? 'bg-[#1D4ED8] shadow-[0_4px_12px_rgba(29,78,216,0.2)]' : 'bg-slate-100'}`} style={{ height: `${h}%` }} />
                    </div>
                  ))}
                </div>
              </InteractiveGlassCard>
            </ScrollRevealRow>

            <ScrollRevealRow direction="up" delay={0.15}>
              <InteractiveGlassCard intensity="subtle" className="bg-white p-8 shadow-sm space-y-8 h-full rounded-[2rem] border border-slate-200/60">
                <p className="text-lg font-semibold text-slate-800 tracking-tight">Durasi Hambatan</p>
                <div className="flex flex-col justify-center gap-5 h-24">
                  <div className="w-[60%] h-4 rounded-full bg-slate-100" />
                  <div className="w-[90%] h-4 rounded-full bg-[#06B6D4] shadow-[0_4px_12px_rgba(6,182,212,0.2)] relative">
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="w-[45%] h-4 rounded-full bg-slate-100" />
                </div>
              </InteractiveGlassCard>
            </ScrollRevealRow>

            <ScrollRevealRow direction="up" delay={0.2}>
              <InteractiveGlassCard intensity="subtle" className="bg-white p-8 shadow-sm space-y-8 h-full rounded-[2rem] border border-slate-200/60 flex flex-col justify-between">
                <p className="text-lg font-semibold text-slate-800 tracking-tight">Status Area</p>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
                   <div>
                     <p className="text-sm font-bold text-slate-800">Perhatian Khusus</p>
                     <p className="text-xs text-slate-500">Lonjakan diprediksi pkl 17:00</p>
                   </div>
                </div>
              </InteractiveGlassCard>
            </ScrollRevealRow>
          </div>
        </div>
      </section>

      {/* SMART INSIGHT */}
      <section className="bg-white py-32 overflow-hidden relative">
        {/* Subtle background element */}
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <ScrollRevealRow direction="right" delay={0.1}>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1F3A] leading-[1.1]">
                Keputusan taktis<br />dalam detik.
              </h2>
            </ScrollRevealRow>
            <ScrollRevealRow direction="right" delay={0.2}>
              <p className="text-base text-slate-500 leading-relaxed max-w-md">
                Bukan sekadar data mentah. Smart Insight menerjemahkan kondisi jalan menjadi rekomendasi tindakan langsung untuk menekan angka kemacetan.
              </p>
            </ScrollRevealRow>
          </div>

          <div className="flex-1 w-full">
            <ScrollRevealRow direction="left" delay={0.3} className="relative">
              {/* Supporting visual layers */}
              <div className="absolute -top-6 -right-6 -left-6 bottom-10 bg-slate-100 rounded-[2.5rem] -rotate-3 z-0" />
              <div className="absolute -top-3 -right-3 -left-3 bottom-5 bg-slate-200/50 rounded-[2.5rem] rotate-1 z-0 backdrop-blur-sm" />
              
              <InteractiveGlassCard intensity="strong" className="p-10 rounded-[2rem] bg-white/95 backdrop-blur-3xl shadow-2xl relative z-10">
                <div className="flex items-start gap-5">
                  <div className="w-3 h-3 rounded-full bg-[#1D4ED8] mt-1.5 shrink-0 animate-pulse shadow-[0_0_16px_rgba(29,78,216,0.6)]" />
                  <div className="space-y-5 w-full">
                    <p className="text-lg font-semibold text-slate-900 tracking-tight">Rekomendasi Tindakan</p>
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                        <span className="text-[#1D4ED8] font-bold mt-0.5">1</span>
                        <p className="text-sm text-slate-600">Alihkan rute simpang utara karena penumpukan eksponensial.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                        <span className="text-[#1D4ED8] font-bold mt-0.5">2</span>
                        <p className="text-sm text-slate-600">Sesuaikan durasi lampu hijau koridor timur ke 45 detik.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </InteractiveGlassCard>
            </ScrollRevealRow>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#F5F7FA] py-32 px-4 sm:px-6">
        <ScrollRevealRow direction="up" delay={0} className="max-w-4xl mx-auto">
          <InteractiveGlassCard intensity="medium" className="bg-white rounded-[3rem] p-12 sm:p-20 text-center shadow-[0_8px_40px_rgba(0,0,0,0.03)] border border-slate-200/60 relative overflow-hidden">
            {/* Soft inner glow for final CTA */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#1D4ED8]/5 blur-[80px] pointer-events-none rounded-full" />
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-[#0B1F3A] leading-[1.1]">
                Satu sistem.<br />Dua pengalaman.
              </h2>
              <p className="text-base sm:text-lg text-slate-500 max-w-lg mx-auto">
                Eksplorasi kondisi jalan sebagai publik, atau kendalikan sistem secara penuh sebagai petugas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/traffic-overview"
                  className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-[#0B1F3A] text-white text-[14px] font-semibold hover:bg-[#142d52] transition-colors shadow-lg"
                >
                  Cek Lalu Lintas
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center h-14 px-10 rounded-full border border-slate-200 bg-white text-slate-700 text-[14px] font-semibold hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Masuk Command Center
                </Link>
              </div>
            </div>
          </InteractiveGlassCard>
        </ScrollRevealRow>
      </section>

    </PublicPageShell>
  );
}
