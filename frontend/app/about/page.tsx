"use client";

import { useState } from "react";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import Link from "next/link";
import { 
  Network, 
  Cpu, 
  Eye, 
  Database,
  MonitorPlay,
  ArrowRight,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Car,
  Video,
  BarChart,
  Users,
  Search,
  Activity
} from "lucide-react";

export default function AboutPage() {
  const [selectedModel, setSelectedModel] = useState(0);
  const [activeUserPath, setActiveUserPath] = useState<"publik" | "petugas">("publik");

  const models = [
    { name: "Deteksi Rambu Lalu Lintas", group: "Kelompok 5", func: "Klasifikasi rambu jalan", input: "Gambar Visual", output: "Metadata Rambu", status: "Terhubung", icon: AlertTriangle },
    { name: "Deteksi Helm", group: "Kelompok 2", func: "Deteksi pengendara tanpa helm", input: "Stream Video", output: "Bounding Box", status: "Terhubung", icon: ShieldAlert },
    { name: "Deteksi Boncengan", group: "Kelompok 1", func: "Deteksi lebih dari 2 penumpang", input: "Stream Video", output: "Bounding Box", status: "Terhubung", icon: Users },
    { name: "Deteksi Plat Kendaraan", group: "Kelompok 4", func: "Membaca plat nomor polisi", input: "Stream Video", output: "Teks Plat", status: "Terhubung", icon: Search },
    { name: "Deteksi Pajak Kendaraan", group: "Kelompok 5", func: "Verifikasi status pajak", input: "Teks Plat", output: "Status Pajak", status: "Belum terhubung", icon: Activity },
    { name: "Deteksi Kendaraan", group: "Kelompok 6", func: "Menghitung jumlah kendaraan", input: "Stream Video", output: "Hitungan Kendaraan", status: "Terhubung", icon: Car },
    { name: "Prediksi Kemacetan", group: "Kelompok 9", func: "Forecasting kondisi lalu lintas", input: "Data Cuaca & Waktu", output: "Tingkat Kepadatan", status: "Terhubung", icon: BarChart },
    { name: "Prediksi Pelanggaran", group: "Kelompok 8", func: "Estimasi jumlah pelanggaran", input: "Data Cuaca & Waktu", output: "Jumlah Pelanggaran", status: "Terhubung", icon: Video },
  ];

  const steps = [
    { title: "Input Data", desc: "Kamera, sensor cuaca, histori", icon: Eye },
    { title: "Deep Learning", desc: "Model AI analisis visual", icon: Cpu },
    { title: "Backend API", desc: "Sistem agregasi data pusat", icon: Database },
    { title: "Antarmuka Web", desc: "Layar ringkasan publik & petugas", icon: MonitorPlay },
  ];

  return (
    <PublicPageShell>
      {/* Container with bright aesthetic background */}
      <div className="bg-white min-h-screen font-sans text-slate-800 relative overflow-hidden pb-24">
        
        {/* Subtle background glow inspired by landing page */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-cyan-50/50 rounded-full blur-[80px] -z-10 pointer-events-none" />

        {/* 1. Showcase Header */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Sistem Pemantauan Terpadu
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1F3A] tracking-tight mb-6 leading-[1.1]">
                Tentang <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">RoadTierbers</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
                Sistem pemantauan lalu lintas berbasis deep learning yang menggabungkan deteksi visual, prediksi kondisi jalan, dan ringkasan operasional dalam satu platform modern.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/traffic-overview"
                  className="flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-[#0B1F3A] text-white font-bold text-sm hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Lihat Pantauan <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  className="flex items-center justify-center h-14 px-8 rounded-full bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:border-blue-200 hover:bg-blue-50 transition-colors shadow-sm"
                >
                  Masuk Area Petugas
                </Link>
              </div>
            </div>

            {/* Right Visual Preview */}
            <div className="flex-1 w-full max-w-md lg:max-w-none relative">
              <div className="relative z-10 grid gap-4 p-6 bg-white/60 backdrop-blur-2xl rounded-[2rem] border border-white shadow-xl shadow-blue-900/5">
                {[
                  { title: "Deteksi AI", desc: "Identifikasi objek & rambu", icon: Cpu },
                  { title: "Prediksi Kemacetan", desc: "Forecasting kondisi jalan", icon: BarChart },
                  { title: "Command Center", desc: "Pusat operasi petugas", icon: ShieldAlert }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0B1F3A]">{item.title}</h3>
                      <p className="text-xs font-medium text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Decorative elements behind the visual preview */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-100 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-100 rounded-full blur-2xl -z-10" />
            </div>

          </div>
        </section>

        {/* 2. Quick System Highlights */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Area Publik", desc: "Akses terbuka untuk masyarakat.", icon: Users },
              { title: "Area Petugas", desc: "Dashboard kendali tertutup.", icon: ShieldAlert },
              { title: "Deep Learning", desc: "Integrasi model AI terkini.", icon: Cpu },
            ].map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-blue-100 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                  <highlight.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A]">{highlight.title}</h3>
                  <p className="text-xs font-medium text-slate-500">{highlight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Interactive Model Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] mb-3">Model Deep Learning</h2>
            <p className="text-sm font-medium text-slate-500">Integrasi berbagai model spesifik ke dalam satu sistem terpadu.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left List (Mobile Accordion / Desktop List) */}
            <div className="lg:col-span-5 grid gap-3 lg:max-h-[600px] lg:overflow-y-auto lg:pr-2 custom-scrollbar">
              {models.map((model, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedModel(idx)}
                    className={`w-full text-left flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      selectedModel === idx 
                        ? "bg-blue-50 border-blue-200 shadow-sm" 
                        : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        selectedModel === idx ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        <model.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${selectedModel === idx ? "text-blue-900" : "text-[#0B1F3A]"}`}>
                          {model.name}
                        </h4>
                        <p className="text-xs font-medium text-slate-500">{model.group}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedModel === idx ? "text-blue-600 rotate-90 lg:rotate-0" : "text-slate-300"}`} />
                  </button>

                  {/* Mobile-only expanded detail */}
                  {selectedModel === idx && (
                    <div className="lg:hidden bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-inner">
                      <div className="grid gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Fungsi Utama</p>
                          <p className="text-sm font-bold text-slate-700">{model.func}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status Integrasi</p>
                          <div className="inline-flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${model.status === "Terhubung" ? "bg-teal-500" : "bg-slate-400"}`} />
                            <span className="text-sm font-bold text-slate-700">{model.status}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-center">
                          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Input</p>
                            <p className="text-xs font-bold text-[#0B1F3A]">{model.input}</p>
                          </div>
                          <div className="bg-blue-600 p-3 rounded-xl shadow-md text-white border border-blue-700">
                            <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider mb-1">Output</p>
                            <p className="text-xs font-bold">{model.output}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Right - Details */}
            <div className="hidden lg:block lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-8 lg:p-10 lg:sticky lg:top-24">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6">
                Detail Model
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] mb-8">
                {models[selectedModel].name}
              </h3>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Fungsi Utama</p>
                  <p className="text-sm font-bold text-slate-700">{models[selectedModel].func}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Status Integrasi</p>
                  <div className="inline-flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${models[selectedModel].status === "Terhubung" ? "bg-teal-500" : "bg-slate-400"}`} />
                    <span className="text-sm font-bold text-slate-700">{models[selectedModel].status}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="grid grid-cols-2 gap-8 items-center text-center">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Input</p>
                    <div className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm font-bold text-[#0B1F3A]">
                      {models[selectedModel].input}
                    </div>
                  </div>
                  
                  <div className="relative">
                    {/* Arrow connecting input to output */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-300 -translate-y-1/2 -z-10 hidden sm:block" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Output</p>
                    <div className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20 text-sm font-bold">
                      {models[selectedModel].output}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Interactive Architecture Flow */}
        <section className="bg-[#0B1F3A] py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3">Arsitektur Sistem</h2>
              <p className="text-sm font-medium text-blue-200">Alur kerja pemrosesan data dari ujung ke ujung.</p>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 relative">
              {/* Horizontal Line for Desktop */}
              <div className="hidden lg:block absolute top-1/2 left-6 right-6 h-0.5 bg-blue-900/50 -translate-y-1/2 -z-10" />

              {steps.map((step, idx) => (
                <div key={idx} className="flex-1 bg-[#102A4C]/80 backdrop-blur-md border border-blue-900/50 p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-[#15345E] hover:border-blue-500/50 transition-all cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-blue-900/30 border border-blue-800/50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
                    <step.icon className="w-6 h-6 text-blue-300 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs font-medium text-blue-200/80">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. User Path Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] mb-3">Alur Penggunaan</h2>
            <p className="text-sm font-medium text-slate-500">Pemisahan fungsionalitas antara masyarakat umum dan petugas.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
              <button 
                onClick={() => setActiveUserPath("publik")}
                className={`flex-1 py-3 px-6 text-sm font-bold rounded-xl transition-all ${activeUserPath === "publik" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                Masyarakat
              </button>
              <button 
                onClick={() => setActiveUserPath("petugas")}
                className={`flex-1 py-3 px-6 text-sm font-bold rounded-xl transition-all ${activeUserPath === "petugas" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                Petugas
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                {activeUserPath === "publik" ? (
                  <>
                    {[
                      "Pantauan lalu lintas visual",
                      "Prediksi status kemacetan",
                      "Rekomendasi waktu berangkat",
                      "Edukasi rambu otomatis"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-sm font-bold text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {[
                      "Pusat deteksi AI terpadu",
                      "Monitoring pelanggaran harian",
                      "Analisis forecasting operasional",
                      "Asisten AI khusus komando"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">
                        <div className="w-2 h-2 rounded-full bg-cyan-500" />
                        <span className="text-sm font-bold text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Technical Strength & 7. Evaluation Note */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Tech Strengths */}
            <div className="lg:col-span-2 bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-6">Yang Menonjol dari Sistem Ini</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Integrasi banyak model AI",
                  "Pemisahan area aman",
                  "Real-data-first, anti fabrikasi",
                  "Desain adaptif mobile & desktop"
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Note */}
            <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h2 className="text-sm font-bold text-amber-900">Mode Evaluasi Akademik</h2>
              </div>
              <p className="text-xs font-medium text-amber-800/80 leading-relaxed">
                Platform ini berjalan sebagai proyek evaluasi akademik. Hasil AI digunakan murni untuk demonstrasi sistem, bukan keputusan operasional resmi.
              </p>
            </div>

          </div>
        </section>

        {/* CSS for custom scrollbar in model list */}
        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 20px;
          }
        `}} />

      </div>
    </PublicPageShell>
  );
}
