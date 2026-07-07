import Link from "next/link";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import { GlassPanel, MotionSection, MouseSpotlight } from "@/components/common";

/* ─── Shared Components ──────────────────────────────────────────────── */
function MetricWidget({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "warn" | "danger";
}) {
  const dot =
    tone === "danger"
      ? "bg-red-400"
      : tone === "warn"
        ? "bg-amber-400"
        : "bg-green-400";

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 px-4 py-4 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
      <div className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dot} shadow-[0_0_8px_currentColor]`} />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
          {label}
        </span>
      </div>
      <span className="text-xl font-bold tracking-tight text-white leading-none">{value}</span>
    </div>
  );
}

function CapPill({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex flex-col justify-center gap-0.5 px-6 py-5 rounded-2xl border border-slate-200/70 bg-white/60 backdrop-blur-md hover:bg-white transition-colors shadow-sm">
      <span className="text-sm font-semibold text-slate-800 tracking-tight">{label}</span>
      <span className="text-xs text-slate-500">{sub}</span>
    </div>
  );
}

export default function Home() {
  return (
    <PublicPageShell>
      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center justify-center overflow-hidden bg-[#070E1B]">
        {/* Glow & Grid */}
        <MouseSpotlight />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(29,78,216,0.18) 0%, transparent 60%), " +
              "radial-gradient(circle at 50% -10%, rgba(6,182,212,0.12) 0%, transparent 50%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-7">
          <MotionSection direction="up" delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#06B6D4] backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
              Smart Traffic Intelligence
            </span>
          </MotionSection>

          <MotionSection direction="up" delay={0.15} className="space-y-4">
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.04em] text-white leading-none">
              RoadTierbers
            </h1>
            <p className="text-base sm:text-xl text-white/80 font-light tracking-tight max-w-lg mx-auto">
              Traffic command center untuk jalan yang lebih aman.
            </p>
          </MotionSection>

          <MotionSection direction="up" delay={0.2} className="w-full">
            <p className="max-w-sm mx-auto text-sm text-white/50 leading-relaxed">
              Pantau kondisi lalu lintas, prediksi kemacetan, dan dukung keputusan petugas dalam satu sistem terpadu.
            </p>
          </MotionSection>

          <MotionSection direction="up" delay={0.25} className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/traffic-overview"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-[#0B1F3A] text-[13px] font-semibold hover:bg-slate-100 transition-colors shadow-lg"
            >
              Lihat Lalu Lintas
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-white/20 bg-white/[0.05] text-white text-[13px] font-semibold hover:bg-white/10 transition-colors backdrop-blur-md shadow-lg"
            >
              Masuk Command Center
            </Link>
          </MotionSection>

          <MotionSection direction="up" delay={0.3} className="w-full mt-6">
            <GlassPanel
              intensity="strong"
              className="max-w-md mx-auto !bg-white/[0.03] !border-white/10 !backdrop-blur-2xl !rounded-3xl p-5 space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative"
            >
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] pointer-events-none" />
              <div className="grid grid-cols-3 gap-3">
                <MetricWidget label="Kondisi" value="Padat" tone="danger" />
                <MetricWidget label="Estimasi" value="32 mnt" tone="warn" />
                <MetricWidget label="Sistem" value="Waspada" tone="warn" />
              </div>
            </GlassPanel>
          </MotionSection>
        </div>

        {/* Smooth transition to next section (navy -> haze -> slate) */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-[#070E1B]/90 to-[#F5F7FA]" />
      </section>
      
      {/* ══════════════════════════════════════════════════
          2. CAPABILITY STRIP
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 bg-[#F5F7FA] pb-24">
        <MotionSection direction="up" delay={0} className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 -mt-12 relative z-20">
            <CapPill label="Traffic Overview" sub="Kondisi terkini" />
            <CapPill label="Prediction" sub="Estimasi perjalanan" />
            <CapPill label="Detection" sub="Analisis visual" />
            <CapPill label="Insight" sub="Dukungan keputusan" />
          </div>
        </MotionSection>
      </section>

      {/* ══════════════════════════════════════════════════
          3. PUBLIC JOURNEY
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#F5F7FA] pb-32 overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <MotionSection direction="up" delay={0} className="text-center mb-14 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B1F3A]">Untuk pengguna jalan.</h2>
            <p className="text-sm text-slate-500">Informasi singkat sebelum bergerak.</p>
          </MotionSection>

          <div className="relative mx-auto max-w-2xl">
            {/* Card stack effect */}
            <MotionSection direction="up" delay={0.05} className="relative z-40">
              <Link href="/traffic-overview" className="block">
                <GlassPanel intensity="medium" className="p-7 bg-white hover:border-[#1D4ED8]/30 transition-colors group cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-base font-semibold text-slate-800 group-hover:text-[#1D4ED8] transition-colors">Ringkasan Lalu Lintas</p>
                      <p className="text-sm text-slate-500 mt-1">Pantau kepadatan titik utama secara visual.</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-[#EFF6FF] flex items-center justify-center transition-colors">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]" />
                    </div>
                  </div>
                </GlassPanel>
              </Link>
            </MotionSection>
            
            <MotionSection direction="up" delay={0.1} className="relative z-30 -mt-5 mx-5">
              <Link href="/congestion-prediction" className="block">
                <GlassPanel intensity="medium" className="p-7 bg-white/95 hover:bg-white hover:border-[#1D4ED8]/30 transition-colors group cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-base font-semibold text-slate-800 group-hover:text-[#06B6D4] transition-colors">Prediksi Kemacetan</p>
                      <p className="text-sm text-slate-500 mt-1">Estimasi durasi hambatan perjalanan.</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-[#EFF6FF] flex items-center justify-center transition-colors">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]" />
                    </div>
                  </div>
                </GlassPanel>
              </Link>
            </MotionSection>

            <MotionSection direction="up" delay={0.15} className="relative z-20 -mt-5 mx-10">
              <Link href="/departure-recommendation" className="block">
                <GlassPanel intensity="medium" className="p-7 bg-white/90 hover:bg-white hover:border-[#1D4ED8]/30 transition-colors group cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-base font-semibold text-slate-800 group-hover:text-[#14B8A6] transition-colors">Rekomendasi Berangkat</p>
                      <p className="text-sm text-slate-500 mt-1">Saran waktu terbaik untuk mulai perjalanan.</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-[#EFF6FF] flex items-center justify-center transition-colors">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]" />
                    </div>
                  </div>
                </GlassPanel>
              </Link>
            </MotionSection>

            <MotionSection direction="up" delay={0.2} className="relative z-10 -mt-5 mx-16">
              <Link href="/traffic-sign-education" className="block">
                <GlassPanel intensity="medium" className="p-7 bg-white/80 hover:bg-white hover:border-[#1D4ED8]/30 transition-colors group cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-base font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">Edukasi Rambu</p>
                      <p className="text-sm text-slate-500 mt-1">Pahami arti rambu jalan secara interaktif.</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-[#EFF6FF] flex items-center justify-center transition-colors">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    </div>
                  </div>
                </GlassPanel>
              </Link>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. OFFICER COMMAND
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#0B1F3A] text-white py-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1D4ED8]/15 via-[#0B1F3A] to-[#0B1F3A] opacity-80 pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <MotionSection direction="up" delay={0} className="text-center mb-16 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Untuk petugas operasi.</h2>
            <p className="text-sm text-white/60">Command center untuk monitoring dan keputusan.</p>
          </MotionSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <MotionSection direction="up" delay={0.05}>
              <div className="flex flex-col gap-3 p-7 rounded-[2rem] bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:bg-white/[0.06] transition-colors h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                  <span className="w-3.5 h-3.5 rounded-sm bg-white/50" />
                </div>
                <p className="text-lg font-semibold tracking-tight">Dashboard Utama</p>
                <p className="text-sm text-white/50 leading-relaxed">Ringkasan titik pantau dan peringatan dini terpusat.</p>
              </div>
            </MotionSection>
            
            <MotionSection direction="up" delay={0.1}>
              <div className="flex flex-col gap-3 p-7 rounded-[2rem] bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:bg-white/[0.06] transition-colors h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3 relative">
                  <div className="absolute inset-0 bg-[#06B6D4]/20 rounded-2xl blur-md" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#06B6D4] relative z-10" />
                </div>
                <p className="text-lg font-semibold tracking-tight">Deteksi AI</p>
                <p className="text-sm text-white/50 leading-relaxed">Analisis visual real-time langsung dari CCTV.</p>
              </div>
            </MotionSection>

            <MotionSection direction="up" delay={0.15}>
              <div className="flex flex-col gap-3 p-7 rounded-[2rem] bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:bg-white/[0.06] transition-colors h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                  <span className="w-4 h-4 rounded-tl-xl rounded-br-xl bg-[#14B8A6]" />
                </div>
                <p className="text-lg font-semibold tracking-tight">Forecasting</p>
                <p className="text-sm text-white/50 leading-relaxed">Proyeksi beban dan tren volume lalu lintas.</p>
              </div>
            </MotionSection>

            <MotionSection direction="up" delay={0.2}>
              <div className="flex flex-col gap-3 p-7 rounded-[2rem] bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:bg-white/[0.06] transition-colors h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3 relative">
                   <div className="absolute inset-0 bg-[#1D4ED8]/20 rounded-2xl blur-md" />
                  <span className="w-4 h-4 rounded-md bg-[#1D4ED8] relative z-10" />
                </div>
                <p className="text-lg font-semibold tracking-tight">Smart Insight</p>
                <p className="text-sm text-white/50 leading-relaxed">Rekomendasi keputusan berbasis data cerdas.</p>
              </div>
            </MotionSection>

            <MotionSection direction="up" delay={0.25}>
              <div className="flex flex-col gap-3 p-7 rounded-[2rem] bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:bg-white/[0.06] transition-colors h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                  <span className="w-3.5 h-3.5 rounded-sm rotate-45 bg-amber-400" />
                </div>
                <p className="text-lg font-semibold tracking-tight">Report & Export</p>
                <p className="text-sm text-white/50 leading-relaxed">Unduh rekapitulasi data untuk pelaporan rutin.</p>
              </div>
            </MotionSection>

            <MotionSection direction="up" delay={0.3}>
              <div className="flex flex-col gap-3 p-7 rounded-[2rem] bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:bg-white/[0.06] transition-colors h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-white/50 animate-pulse" />
                </div>
                <p className="text-lg font-semibold tracking-tight">AI Assistant</p>
                <p className="text-sm text-white/50 leading-relaxed">Tanya jawab natural dengan sistem operasional.</p>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. DETECTION FLOW
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-32 border-b border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <MotionSection direction="up" delay={0} className="text-center mb-20 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B1F3A]">Alur deteksi otomatis.</h2>
            <p className="text-sm text-slate-500">Dari input visual hingga hasil terukur.</p>
          </MotionSection>

          <MotionSection direction="up" delay={0.1} className="flex flex-col sm:flex-row items-stretch justify-between gap-6">
            <div className="flex-1 w-full flex flex-col items-center gap-4 p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-sm font-bold text-slate-400">1</div>
              <div>
                <p className="text-base font-semibold text-slate-800">Sample Case</p>
                <p className="text-sm text-slate-500 mt-1">Input video atau gambar pantauan.</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center text-slate-300 hidden sm:flex">
              <span className="text-2xl">→</span>
            </div>

            <div className="flex-1 w-full flex flex-col items-center gap-4 p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#EFF6FF] shadow-sm flex items-center justify-center text-sm font-bold text-[#1D4ED8]">2</div>
              <div>
                <p className="text-base font-semibold text-slate-800">Analisis AI</p>
                <p className="text-sm text-slate-500 mt-1">Pemrosesan visual Deep Learning.</p>
              </div>
            </div>

            <div className="flex items-center justify-center text-slate-300 hidden sm:flex">
              <span className="text-2xl">→</span>
            </div>

            <div className="flex-1 w-full flex flex-col items-center gap-4 p-8 rounded-3xl bg-[#0B1F3A] border border-[#0B1F3A] text-center shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D4ED8]/20 to-transparent opacity-50" />
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white relative z-10">3</div>
              <div className="relative z-10">
                <p className="text-base font-semibold text-white">Rekomendasi</p>
                <p className="text-sm text-white/60 mt-1">Insight terstruktur otomatis.</p>
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. FORECASTING
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#F9FAFB] py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <MotionSection direction="up" delay={0} className="mb-14 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B1F3A]">Prediksi masa depan.</h2>
            <p className="text-sm text-slate-500">Persiapkan tindakan sebelum kepadatan terjadi.</p>
          </MotionSection>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* Volume */}
            <MotionSection direction="up" delay={0.05}>
              <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-6 h-full">
                <p className="text-base font-semibold text-slate-800">Volume Kendaraan</p>
                <div className="flex items-end gap-3 h-20 pt-2">
                  <div className="w-full bg-slate-100 rounded-sm h-[40%]" />
                  <div className="w-full bg-slate-100 rounded-sm h-[60%]" />
                  <div className="w-full bg-[#1D4ED8] rounded-sm h-[90%] shadow-md relative">
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0B1F3A] animate-pulse" />
                  </div>
                  <div className="w-full bg-slate-100 rounded-sm h-[70%]" />
                </div>
              </div>
            </MotionSection>

            {/* Durasi */}
            <MotionSection direction="up" delay={0.1}>
              <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-6 h-full">
                <p className="text-base font-semibold text-slate-800">Durasi Kemacetan</p>
                <div className="flex flex-col justify-center gap-4 h-20 pt-2">
                  <div className="w-[60%] h-3.5 rounded-full bg-slate-100" />
                  <div className="w-[90%] h-3.5 rounded-full bg-[#06B6D4] shadow-md relative">
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-[#0B1F3A]" />
                  </div>
                  <div className="w-[45%] h-3.5 rounded-full bg-slate-100" />
                </div>
              </div>
            </MotionSection>

            {/* Pelanggaran */}
            <MotionSection direction="up" delay={0.15}>
              <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-6 h-full">
                <p className="text-base font-semibold text-slate-800">Jumlah Pelanggaran</p>
                <div className="flex items-center justify-center h-20 pt-2">
                  <div className="relative w-16 h-16 rounded-full border-[4px] border-slate-100 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="none" className="text-[#14B8A6]" strokeDasharray="188" strokeDashoffset="45" />
                    </svg>
                  </div>
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. SMART INSIGHT
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <MotionSection direction="up" delay={0} className="text-center mb-16 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B1F3A]">Keputusan yang dibantu AI.</h2>
            <p className="text-sm text-slate-500">Bukan sekadar data mentah.</p>
          </MotionSection>

          <MotionSection direction="up" delay={0.1} className="relative mx-auto max-w-lg">
            <div className="absolute top-4 left-4 right-[-1rem] bottom-[-1rem] bg-slate-50 border border-slate-100 rounded-[2rem] z-0" />
            <div className="p-10 rounded-[2rem] border border-slate-200 shadow-2xl bg-white/95 backdrop-blur-xl relative z-10">
              <div className="flex items-start gap-5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8] mt-1.5 shrink-0 animate-pulse shadow-[0_0_12px_rgba(29,78,216,0.8)]" />
                <div className="space-y-4">
                  <p className="text-base font-semibold text-slate-900 tracking-tight">Rekomendasi Tindakan</p>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-center gap-3">
                      <span className="text-[#1D4ED8] font-bold text-lg leading-none">·</span> Kondisi jalan mulai padat.
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-[#1D4ED8] font-bold text-lg leading-none">·</span> Risiko stagnasi perlu dipantau.
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-[#1D4ED8] font-bold text-lg leading-none">·</span> Prioritaskan area simpang utara.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8. FINAL CTA
      ══════════════════════════════════════════════════ */}
      <MotionSection
        direction="up"
        delay={0}
        className="border-t border-slate-100 bg-[#F5F7FA]"
      >
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-32 text-center space-y-7">
          <h2 className="text-4xl font-bold tracking-[-0.03em] text-[#0B1F3A]">
            Satu sistem.<br />Dua pengalaman.
          </h2>
          <p className="text-base text-slate-500">
            Ringkas untuk publik, mendalam untuk petugas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
            <Link
              href="/traffic-overview"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#0B1F3A] text-white text-[13px] font-semibold hover:bg-[#142d52] transition-colors shadow-sm"
            >
              Cek Lalu Lintas
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-slate-200 bg-white text-slate-700 text-[13px] font-semibold hover:bg-slate-50 transition-colors shadow-sm"
            >
              Command Center
            </Link>
          </div>
        </div>
      </MotionSection>

    </PublicPageShell>
  );
}
