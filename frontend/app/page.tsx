"use client";

import Link from "next/link";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import { 
  ArrowRight, 
  Map, 
  TrendingUp, 
  AlertTriangle, 
  ShieldAlert, 
  Car, 
  Cpu, 
  Database, 
  MonitorPlay,
  Users,
  Eye,
  CheckCircle2,
  Video,
  Search,
  Activity,
  BarChart
} from "lucide-react";

export default function HomePage() {
  return (
    <PublicPageShell>
      <div className="bg-white min-h-screen font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900">
        
        {/* 1. Hero Section With Gradient Fallback */}
        {/* Hero background currently uses gradient fallback because /images/roadtierbers-hero.jpg was not found. */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-[#0B1F3A]">
          {/* Elegant Gradient Background (Fallback for missing image) */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#102A4C] to-[#0B1F3A]" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              
              {/* Left Side: Copy & CTA */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/50 border border-blue-700/50 text-blue-200 font-bold text-xs uppercase tracking-widest mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  Mode Evaluasi Akademik
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
                  RoadTierbers — Sistem Cerdas untuk Pantauan Lalu Lintas
                </h1>
                
                <p className="text-lg text-blue-100/80 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
                  RoadTierbers menggabungkan deteksi visual, prediksi kemacetan, edukasi rambu, dan monitoring petugas dalam satu platform berbasis deep learning.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link
                    href="/traffic-overview"
                    className="flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-white text-[#0B1F3A] font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    Lihat Pantauan Lalu Lintas <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/login"
                    className="flex items-center justify-center h-14 px-8 rounded-full border border-blue-800 bg-[#0B1F3A]/50 backdrop-blur-sm text-blue-100 font-bold text-sm hover:bg-blue-900/50 hover:border-blue-700 transition-colors"
                  >
                    Masuk Area Petugas
                  </Link>
                </div>
              </div>

              {/* Right Side: Floating System Preview Panel */}
              <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:ml-auto">
                <div className="relative bg-[#102A4C]/80 backdrop-blur-xl border border-blue-800/50 rounded-3xl p-6 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-800">
                        <Activity className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-sm font-bold text-white">Live System Preview</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300/60 bg-blue-900/30 px-2 py-1 rounded">Data Simulasi</span>
                  </div>

                  <div className="space-y-3">
                    {/* Status Item */}
                    <div className="bg-[#0B1F3A]/60 p-4 rounded-2xl border border-blue-900/50 flex items-center justify-between hover:bg-[#0B1F3A] transition-colors">
                      <div className="flex items-center gap-3">
                        <Map className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-xs font-medium text-blue-200/70">Status Jalan Utama</p>
                          <p className="text-sm font-bold text-white">Lancar / Terpantau</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
                    </div>

                    {/* Status Item */}
                    <div className="bg-[#0B1F3A]/60 p-4 rounded-2xl border border-blue-900/50 flex items-center justify-between hover:bg-[#0B1F3A] transition-colors">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-amber-400" />
                        <div>
                          <p className="text-xs font-medium text-blue-200/70">Prediksi Kemacetan</p>
                          <p className="text-sm font-bold text-white">Potensi Kepadatan 17:00</p>
                        </div>
                      </div>
                    </div>

                    {/* Status Item */}
                    <div className="bg-[#0B1F3A]/60 p-4 rounded-2xl border border-blue-900/50 flex items-center justify-between hover:bg-[#0B1F3A] transition-colors">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <div>
                          <p className="text-xs font-medium text-blue-200/70">Deteksi Rambu</p>
                          <p className="text-sm font-bold text-white">Dilarang Berhenti</p>
                        </div>
                      </div>
                      <div className="px-2 py-0.5 rounded bg-blue-900/50 text-[10px] font-bold text-blue-300 border border-blue-800">
                        AI Aktif
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl -z-10" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl -z-10" />
              </div>

            </div>
          </div>
        </section>

        {/* 2. Quick Value Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] mb-4">Satu sistem untuk dua kebutuhan</h2>
              <p className="text-slate-500 font-medium max-w-2xl mx-auto">Platform terintegrasi yang memisahkan area akses informasi publik dan area operasional tertutup bagi petugas berwenang.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Masyarakat Panel */}
              <div className="bg-white p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 border border-blue-100 group-hover:bg-blue-600 transition-colors duration-300">
                  <Users className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0B1F3A] mb-6">Untuk Masyarakat</h3>
                <ul className="space-y-4">
                  {[
                    "Pantauan kondisi jalan secara visual",
                    "Prediksi tingkat kemacetan harian",
                    "Rekomendasi waktu berangkat optimal",
                    "Edukasi pengenalan rambu lalu lintas"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Petugas Panel */}
              <div className="bg-white p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-[#0B1F3A] transition-colors duration-300">
                  <ShieldAlert className="w-7 h-7 text-slate-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0B1F3A] mb-6">Untuk Petugas</h3>
                <ul className="space-y-4">
                  {[
                    "Pusat deteksi AI terpadu (Helm, Boncengan, Plat)",
                    "Monitoring pelanggaran lapangan",
                    "Analisis & forecasting prediktif",
                    "Riwayat, laporan lengkap, dan asisten AI"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Feature Highlights Section */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#0B1F3A] mb-12">Fitur Utama</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Pantauan Lalu Lintas", desc: "Lihat kondisi jalan real-time dari kamera.", icon: Map, href: "/traffic-overview", color: "text-blue-600", bg: "bg-blue-50" },
                { title: "Prediksi Kemacetan", desc: "Forecasting kepadatan berdasarkan waktu.", icon: TrendingUp, href: "/congestion-prediction", color: "text-amber-600", bg: "bg-amber-50" },
                { title: "Edukasi Rambu", desc: "Klasifikasi dan makna rambu jalan.", icon: AlertTriangle, href: "/traffic-sign-education", color: "text-teal-600", bg: "bg-teal-50" },
                { title: "Command Center Petugas", desc: "Akses tertutup deteksi pelanggaran.", icon: ShieldAlert, href: "/login", color: "text-slate-700", bg: "bg-slate-100" }
              ].map((feature, i) => (
                <Link key={i} href={feature.href} className="group block p-6 rounded-3xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${feature.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1F3A] mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-sm text-slate-500 font-medium mb-4">{feature.desc}</p>
                  <div className="flex items-center text-xs font-bold text-blue-600">
                    Masuk Fitur <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. System Flow Section */}
        <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
          {/* Subtle background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl font-extrabold text-white text-center mb-16">Bagaimana Sistem Bekerja</h2>

            <div className="relative">
              {/* Desktop Horizontal Line */}
              <div className="hidden lg:block absolute top-8 left-12 right-12 h-0.5 bg-blue-800/50" />
              {/* Mobile Vertical Line */}
              <div className="lg:hidden absolute top-8 bottom-8 left-8 w-0.5 bg-blue-800/50" />

              <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-4 relative">
                {[
                  { step: "1", title: "Data Masuk", desc: "Kamera & sensor mengumpulkan data lapangan", icon: Eye },
                  { step: "2", title: "Model Deep Learning", desc: "AI melakukan deteksi visual & prediksi", icon: Cpu },
                  { step: "3", title: "Backend API", desc: "Agregasi data menjadi insight terstruktur", icon: Database },
                  { step: "4", title: "Frontend Sistem", desc: "Distribusi ke layar publik & petugas", icon: MonitorPlay },
                  { step: "5", title: "Monitoring", desc: "Rekomendasi tindakan & pantauan langsung", icon: Activity }
                ].map((item, i) => (
                  <div key={i} className="flex lg:flex-col items-center lg:text-center gap-6 lg:gap-4 group relative z-10">
                    <div className="w-16 h-16 rounded-full bg-[#0B1F3A] border-4 border-blue-900/50 flex items-center justify-center shrink-0 group-hover:border-cyan-500 transition-colors duration-300 shadow-xl">
                      <item.icon className="w-6 h-6 text-blue-300 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-blue-200/70 font-medium max-w-[180px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Deep Learning Showcase Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-[#0B1F3A] mb-4">Dibangun dengan Integrasi Model Deep Learning</h2>
            <p className="text-slate-500 font-medium mb-12 max-w-2xl mx-auto">Sistem ini menggabungkan berbagai model deteksi dan klasifikasi ke dalam satu layanan terpadu.</p>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-12">
              {[
                { name: "Deteksi Rambu Lalu Lintas", icon: AlertTriangle },
                { name: "Prediksi Kemacetan", icon: BarChart },
                { name: "Deteksi Pelanggaran Helm", icon: ShieldAlert },
                { name: "Deteksi Boncengan", icon: Users },
                { name: "Deteksi & OCR Plat Nomor", icon: Search },
                { name: "Verifikasi Pajak Kendaraan", icon: Activity },
                { name: "Deteksi Jumlah Kendaraan", icon: Car },
                { name: "Prediksi Pelanggaran Harian", icon: Video }
              ].map((model, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-default">
                  <model.icon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-bold text-slate-700">{model.name}</span>
                </div>
              ))}
            </div>

            <Link href="/about" className="inline-flex items-center justify-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors group">
              Lihat detail arsitektur sistem <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* 6. Final CTA Section */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="bg-white p-10 lg:p-16 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] mb-4">Mulai dari pantauan jalan terdekat</h2>
              <p className="text-slate-500 font-medium mb-10 max-w-xl mx-auto text-lg">
                Cek kondisi lalu lintas, baca risiko kepadatan, dan gunakan hasil sistem sebagai bahan pertimbangan sebelum berangkat.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/traffic-overview"
                  className="flex items-center justify-center h-14 px-8 rounded-full bg-[#0B1F3A] text-white font-bold text-sm hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Buka Pantauan Lalu Lintas
                </Link>
                <Link
                  href="/about"
                  className="flex items-center justify-center h-14 px-8 rounded-full bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors"
                >
                  Pelajari Sistem
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Evaluation Note */}
        <section className="py-8 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-xs text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
              RoadTierbers berjalan dalam mode evaluasi akademik. Hasil deteksi dan prediksi digunakan untuk pembelajaran dan demonstrasi sistem, bukan sebagai keputusan lalu lintas resmi.
            </p>
          </div>
        </section>

      </div>
    </PublicPageShell>
  );
}
