import Link from "next/link";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import {
  InteractiveGlassCard,
  ScrollRevealRow,
  MouseSpotlight,
  MotionSection,
} from "@/components/common";

export default function CongestionPredictionPage() {
  return (
    <PublicPageShell>
      <div className="rt-bright-stage relative overflow-hidden pb-32 min-h-screen pt-12">
        <MouseSpotlight />
        
        {/* Soft background radial glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* 1. Page Hero */}
        <section className="relative pt-32 pb-12 lg:pt-36 lg:pb-16 flex flex-col items-center justify-center z-10">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6">
            <MotionSection direction="up" delay={0.1}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B1F3A] backdrop-blur-md shadow-sm">
                Prediksi Publik
              </span>
            </MotionSection>

            <MotionSection direction="up" delay={0.15} className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B1F3A] leading-[1.1]">
                Prediksi kemacetan<br />sebelum perjalanan.
              </h1>
              <p className="text-base sm:text-lg text-[#0B1F3A]/70 font-medium leading-relaxed max-w-xl mx-auto">
                Lihat estimasi durasi kemacetan dari sample pemantauan agar perjalanan terasa lebih terencana.
              </p>
            </MotionSection>
            
            <MotionSection direction="up" delay={0.2}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-white/80 shadow-sm backdrop-blur-md mt-4">
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8] animate-pulse shadow-[0_0_8px_#1D4ED8]" />
                <span className="text-xs font-bold text-[#0B1F3A]/70">Sample pemantauan</span>
              </div>
            </MotionSection>
          </div>
        </section>

        {/* 2. Context & Result Panel */}
        <section className="relative z-20 pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <MotionSection direction="up" delay={0.3}>
              <div className="flex flex-col lg:flex-row gap-5 items-stretch">
                
                {/* Context Panel */}
                <InteractiveGlassCard intensity="medium" className="p-8 rounded-[2rem] border-white shadow-sm flex flex-col justify-between w-full lg:w-1/3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#14B8A6]/5 blur-[40px] rounded-full pointer-events-none" />
                  <div className="relative z-10 space-y-6">
                    <p className="text-xs font-bold text-[#0B1F3A]/60 uppercase tracking-widest">Konteks (Simulasi Prototype)</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Area / Rute</p>
                        <p className="text-base font-bold text-[#0B1F3A]">Pandau → Simpang Tiga</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Waktu</p>
                        <p className="text-base font-bold text-[#0B1F3A]">10:00 WIB</p>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Kondisi</p>
                          <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-100">Padat</span>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Trend</p>
                          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">Meningkat</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </InteractiveGlassCard>

                {/* Main Prediction Result */}
                <InteractiveGlassCard intensity="strong" glow className="p-8 sm:p-10 rounded-[2rem] border-white shadow-lg flex-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#1D4ED8]/5 blur-[80px] rounded-full pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
                    <div>
                      <p className="text-sm font-bold text-[#0B1F3A]/60 uppercase tracking-widest mb-2">Prediksi Durasi Kemacetan</p>
                      <h2 className="text-5xl sm:text-6xl font-extrabold text-[#0B1F3A] tracking-tight">32 <span className="text-3xl text-slate-400">menit</span></h2>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/60 border border-white/80 shadow-sm backdrop-blur-md">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse" />
                        </div>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed pt-2">
                          Durasi kemacetan diprediksi meningkat pada periode berikutnya. Pertimbangkan waktu tambahan sebelum berangkat.
                        </p>
                      </div>
                    </div>
                  </div>
                </InteractiveGlassCard>
                
              </div>
            </MotionSection>
          </div>
        </section>

        {/* 4. Forecast Timeline */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScrollRevealRow direction="up" delay={0.1}>
              <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/80 p-6 sm:p-8 shadow-sm overflow-x-auto">
                <h3 className="text-sm font-bold text-[#0B1F3A] mb-8">Prediksi Berjalan</h3>
                <div className="flex justify-between items-end gap-2 relative min-w-[500px]">
                  {/* Connecting Line */}
                  <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-slate-100 rounded-full -translate-y-1/2 z-0" />
                  
                  {[
                    { time: "08:00", dur: "13 mnt", label: "Lancar", color: "bg-[#14B8A6]", active: false },
                    { time: "09:00", dur: "17 mnt", label: "Sedang", color: "bg-amber-400", active: false },
                    { time: "10:00", dur: "20 mnt", label: "Sedang", color: "bg-amber-400", active: true },
                    { time: "11:00", dur: "25 mnt", label: "Padat", color: "bg-red-500", active: false },
                    { time: "12:00", dur: "32 mnt", label: "Padat", color: "bg-red-500", active: false },
                  ].map((node, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 relative z-10 bg-white/70 px-2 py-3 rounded-xl backdrop-blur-sm border border-white/50 w-full max-w-[80px]">
                      <span className="text-xs font-bold text-[#0B1F3A]/50">{node.time}</span>
                      <div className={`w-3.5 h-3.5 rounded-full ${node.color} ${node.active ? 'ring-4 ring-amber-500/20 shadow-[0_0_12px_#f59e0b]' : 'ring-4 ring-white shadow-sm'}`} />
                      <div className="text-center">
                        <span className={`block text-[11px] font-bold ${node.active ? 'text-[#0B1F3A]' : 'text-[#0B1F3A]/70'}`}>{node.dur}</span>
                        <span className="block text-[9px] font-bold text-slate-400 uppercase mt-0.5">{node.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollRevealRow>
          </div>
        </section>

        {/* 5. Public Interpretation Section */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { title: "Mulai meningkat", helper: "Kepadatan mulai naik pada periode siang.", delay: 0.1, iconColor: "text-amber-500", iconBg: "bg-amber-50" },
                { title: "Tambah waktu perjalanan", helper: "Siapkan waktu tambahan sekitar 20–30 menit.", delay: 0.15, iconColor: "text-[#1D4ED8]", iconBg: "bg-blue-50" },
                { title: "Hindari terburu-buru", helper: "Tetap jaga jarak dan ikuti rambu.", delay: 0.2, iconColor: "text-[#14B8A6]", iconBg: "bg-teal-50" },
              ].map((item, i) => (
                <ScrollRevealRow key={i} direction="up" delay={item.delay} className="h-full">
                  <InteractiveGlassCard intensity="medium" className="p-6 h-full border-white shadow-sm">
                    <div className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center mb-4`}>
                      <span className={`text-sm font-bold ${item.iconColor}`}>!</span>
                    </div>
                    <p className="text-sm font-bold text-[#0B1F3A] tracking-tight mb-1">{item.title}</p>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.helper}</p>
                  </InteractiveGlassCard>
                </ScrollRevealRow>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CTA Section */}
        <section className="relative z-10 pb-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-8">
            <ScrollRevealRow direction="up" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1F3A]">
                Butuh rekomendasi waktu berangkat?
              </h2>
            </ScrollRevealRow>
            
            <ScrollRevealRow direction="up" delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/departure-recommendation"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#0B1F3A] text-white text-sm font-semibold hover:bg-[#142d52] transition-colors shadow-md"
              >
                Rekomendasi Berangkat
              </Link>
              <Link
                href="/traffic-overview"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-[#0B1F3A] text-sm font-semibold hover:bg-white transition-colors shadow-sm"
              >
                Ringkasan Lalu Lintas
              </Link>
            </ScrollRevealRow>
          </div>
        </section>
      </div>
    </PublicPageShell>
  );
}
