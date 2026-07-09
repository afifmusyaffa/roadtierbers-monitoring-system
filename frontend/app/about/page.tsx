import Link from "next/link";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import {
  InteractiveGlassCard,
  ScrollRevealRow,
  MouseSpotlight,
  MotionSection,
} from "@/components/common";

export default function AboutPage() {
  return (
    <PublicPageShell>
      <div className="rt-bright-stage relative overflow-hidden pb-32 min-h-screen pt-12">
        <MouseSpotlight />
        
        {/* Soft background radial glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* 1. Page Hero */}
        <section className="relative pt-32 pb-12 lg:pt-36 lg:pb-16 flex flex-col items-center justify-center z-10">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6">
            <MotionSection direction="up" delay={0.1}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B1F3A] backdrop-blur-md shadow-sm">
                Tentang Project
              </span>
            </MotionSection>

            <MotionSection direction="up" delay={0.15} className="space-y-6 max-w-4xl">
              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold tracking-tight text-[#0B1F3A] leading-[1.1]">
                RoadTierbers menyatukan informasi lalu lintas dan command center dalam satu pengalaman.
              </h1>
              <p className="text-base sm:text-xl text-[#0B1F3A]/70 font-medium leading-relaxed max-w-2xl mx-auto">
                Sistem terpadu berbasis kecerdasan buatan yang membantu memahami kondisi jalan, mendeteksi pola lalu lintas, dan mendukung keputusan petugas.
              </p>
            </MotionSection>
          </div>
        </section>

        {/* 2. Project Purpose Section */}
        <section className="relative z-20 pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <MotionSection direction="up" delay={0.3}>
              <InteractiveGlassCard intensity="strong" className="p-8 sm:p-12 rounded-[2.5rem] border-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#1D4ED8]/5 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-[#0B1F3A] mb-8">Tujuan Sistem</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { icon: "Users", title: "Untuk Publik", desc: "Memudahkan masyarakat memahami kondisi lalu lintas." },
                      { icon: "Monitor", title: "Untuk Petugas", desc: "Membantu petugas membaca hasil monitoring." },
                      { icon: "Layers", title: "Satu Platform", desc: "Menyatukan deteksi, prediksi, insight, dan laporan." },
                      { icon: "Cpu", title: "Produk Nyata", desc: "Menampilkan model Deep Learning dalam produk yang mudah digunakan." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/60 border border-white/80 shadow-sm backdrop-blur-md items-start">
                        <div className="w-8 h-8 rounded-full bg-[#1D4ED8]/10 flex items-center justify-center shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#0B1F3A] mb-1">{item.title}</p>
                          <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </InteractiveGlassCard>
            </MotionSection>
          </div>
        </section>

        {/* 3. Two Experience Cards */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <ScrollRevealRow direction="up" delay={0.1} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1F3A]">Dua pengalaman fokus.</h2>
            </ScrollRevealRow>
            
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {/* Public Area */}
              <ScrollRevealRow direction="right" delay={0.2} className="h-full">
                <InteractiveGlassCard intensity="medium" className="p-8 sm:p-10 h-full rounded-[2.5rem] border-white shadow-sm flex flex-col relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#14B8A6]/5 blur-[40px] rounded-full pointer-events-none" />
                  <div className="relative z-10 flex-1 flex flex-col">
                    <p className="text-sm font-bold text-[#14B8A6] uppercase tracking-widest mb-3">Area 1</p>
                    <h3 className="text-3xl font-extrabold text-[#0B1F3A] mb-4">Public Area</h3>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
                      Informasi lalu lintas yang ringkas, aman, dan mudah dipahami.
                    </p>
                    
                    <div className="mt-auto space-y-3">
                      {["Ringkasan lalu lintas", "Prediksi kemacetan", "Rekomendasi berangkat", "Edukasi rambu"].map((feat, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                          <span className="text-sm font-bold text-[#0B1F3A]">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </InteractiveGlassCard>
              </ScrollRevealRow>

              {/* Officer Area */}
              <ScrollRevealRow direction="left" delay={0.3} className="h-full">
                <InteractiveGlassCard intensity="medium" glow className="p-8 sm:p-10 h-full rounded-[2.5rem] border-white shadow-sm flex flex-col relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#1D4ED8]/5 blur-[40px] rounded-full pointer-events-none" />
                  <div className="relative z-10 flex-1 flex flex-col">
                    <p className="text-sm font-bold text-[#1D4ED8] uppercase tracking-widest mb-3">Area 2</p>
                    <h3 className="text-3xl font-extrabold text-[#0B1F3A] mb-4">Officer Area</h3>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
                      Command center untuk monitoring, deteksi, forecasting, insight, dan laporan.
                    </p>
                    
                    <div className="mt-auto grid grid-cols-2 gap-3">
                      {["Dashboard", "AI Detection", "Forecasting", "Smart Insight", "Report", "Assistant"].map((feat, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
                          <span className="text-sm font-bold text-[#0B1F3A]">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </InteractiveGlassCard>
              </ScrollRevealRow>
            </div>
          </div>
        </section>

        {/* 4. Deep Learning Role Section */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScrollRevealRow direction="up" delay={0.1}>
              <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/80 p-8 sm:p-12 shadow-sm text-center">
                <h3 className="text-2xl font-bold text-[#0B1F3A] mb-4">Peran Deep Learning</h3>
                <p className="text-sm sm:text-base font-medium text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10">
                  Model AI memproses data visual dari kamera untuk memberikan analisis yang berguna bagi keputusan petugas dan rekomendasi publik.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Deteksi visual", "Forecasting", "Monitoring", "Insight", "Report support"].map((role, i) => (
                    <div key={i} className="px-5 py-2.5 rounded-full bg-[#F8FAFC] border border-slate-200 text-sm font-bold text-[#0B1F3A]">
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollRevealRow>
          </div>
        </section>

        {/* 5. Academic Disclaimer Section */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScrollRevealRow direction="up" delay={0.1}>
              <div className="flex gap-5 p-6 sm:p-8 rounded-3xl bg-amber-50/50 border border-amber-100 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <span className="text-amber-600 font-bold text-lg">i</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1F3A] mb-2">Catatan Penggunaan</h3>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    RoadTierbers dikembangkan untuk keperluan akademik dan evaluasi sistem berbasis Deep Learning. 
                    Sistem ini belum ditujukan sebagai alat keputusan resmi tanpa validasi lanjutan.
                  </p>
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
                Mulai dari ringkasan publik atau masuk ke command center.
              </h2>
            </ScrollRevealRow>
            
            <ScrollRevealRow direction="up" delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/traffic-overview"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#0B1F3A] text-white text-sm font-semibold hover:bg-[#142d52] transition-colors shadow-md"
              >
                Lihat Lalu Lintas
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-[#0B1F3A] text-sm font-semibold hover:bg-white transition-colors shadow-sm"
              >
                Login Petugas
              </Link>
            </ScrollRevealRow>
          </div>
        </section>
      </div>
    </PublicPageShell>
  );
}
