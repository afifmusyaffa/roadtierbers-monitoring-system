"use client";

import { useState } from "react";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import { 
  Cpu, 
  Eye, 
  Database,
  MonitorPlay,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Car,
  Video,
  BarChart,
  Users,
  Search,
  Activity,
  CheckCircle2,
  Settings2,
  Server,
  ArrowDown,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  const [selectedModel, setSelectedModel] = useState(0);
  const [activeUserPath, setActiveUserPath] = useState<"publik" | "petugas">("publik");

  const models = [
    { name: "Deteksi Rambu Lalu Lintas", group: "Kelompok 5", func: "Klasifikasi rambu jalan", input: "Gambar Visual", output: "Metadata Rambu", status: "Terhubung", icon: AlertTriangle },
    { name: "Deteksi Helm", group: "Kelompok 2", func: "Deteksi pengendara tanpa helm", input: "Stream Video", output: "Bounding Box", status: "Terhubung", icon: ShieldAlert },
    { name: "Deteksi Boncengan", group: "Kelompok 1", func: "Deteksi lebih dari 2 penumpang", input: "Stream Video", output: "Bounding Box", status: "Terhubung", icon: Users },
    { name: "Deteksi Plat Kendaraan", group: "Kelompok 4", func: "Membaca plat nomor polisi", input: "Stream Video", output: "Teks Plat", status: "Terhubung", icon: Search },
    { name: "Deteksi Pajak Kendaraan", group: "Kelompok 5", func: "Verifikasi status pajak", input: "Teks Plat", output: "Status Pajak", status: "Belum dicantumkan", icon: Activity },
    { name: "Deteksi Kendaraan", group: "Kelompok 6", func: "Menghitung jumlah kendaraan", input: "Stream Video", output: "Hitungan Kendaraan", status: "Terhubung", icon: Car },
    { name: "Prediksi Kemacetan", group: "Kelompok 9", func: "Forecasting kondisi lalu lintas", input: "Data Cuaca & Waktu", output: "Tingkat Kepadatan", status: "Terhubung", icon: BarChart },
    { name: "Prediksi Pelanggaran", group: "Kelompok 8", func: "Estimasi jumlah pelanggaran", input: "Data Cuaca & Waktu", output: "Jumlah Pelanggaran", status: "Terhubung", icon: Video },
  ];

  const steps = [
    { title: "Input Data", desc: "Kamera & Sensor", icon: Eye },
    { title: "Model Deep Learning", desc: "Analisis Visual & AI", icon: Cpu },
    { title: "Backend API", desc: "Agregasi Pusat", icon: Server },
    { title: "Rekap Data", desc: "Database & Riwayat", icon: Database },
    { title: "Frontend", desc: "Antarmuka Publik", icon: MonitorPlay },
    { title: "Monitoring", desc: "Validasi Petugas", icon: ShieldAlert },
  ];

  const technicalStrengths = [
    "Integrasi beberapa model deep learning",
    "Area publik dan area petugas",
    "Real-data-first",
    "Responsive desktop dan Android",
    "Backend API sebagai penghubung model",
    "Validasi petugas untuk hasil AI"
  ];

  const getStatusStyle = (status: string) => {
    if (status === "Terhubung") return "bg-teal-100 text-teal-700 border-teal-200";
    if (status === "Dalam evaluasi") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-slate-100 text-slate-600 border-slate-200";
  };

  const getStatusDot = (status: string) => {
    if (status === "Terhubung") return "bg-teal-500";
    if (status === "Dalam evaluasi") return "bg-amber-500";
    return "bg-slate-400";
  };

  return (
    <PublicPageShell>
      <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800 pb-24">
        
        {/* 1. Compact Feature Hero / Header */}
        <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-[#102A4C]">
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                Tentang RoadTierbers
              </h1>
              <p className="text-blue-100/80 text-lg leading-relaxed font-medium">
                RoadTierbers mengintegrasikan model deep learning, backend API, dan antarmuka publik-petugas untuk membantu pemantauan lalu lintas.
              </p>
            </div>
            
            {/* Right Context Panel */}
            <div className="bg-[#102A4C]/80 backdrop-blur-md border border-blue-800/50 rounded-2xl p-6 w-full lg:w-80 shrink-0">
              <div className="space-y-4">
                <div>
                  <p className="text-blue-300/60 uppercase tracking-wider text-[10px] font-bold mb-1">Fokus</p>
                  <p className="text-white font-bold text-sm">Pemantauan Lalu Lintas</p>
                </div>
                <div className="w-full h-px bg-blue-800/50" />
                <div>
                  <p className="text-blue-300/60 uppercase tracking-wider text-[10px] font-bold mb-1">Teknologi</p>
                  <p className="text-white font-bold text-sm">Deep Learning</p>
                </div>
                <div className="w-full h-px bg-blue-800/50" />
                <div>
                  <p className="text-blue-300/60 uppercase tracking-wider text-[10px] font-bold mb-1">Status</p>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-amber-400 font-bold text-xs">Mode evaluasi akademik</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-20">
          
          {/* 3. Model Deep Learning Section */}
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-[#0B1F3A] mb-2">Model Deep Learning</h2>
              <p className="text-sm font-medium text-slate-500">Integrasi berbagai model spesifik ke dalam satu sistem terpadu.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left List (Mobile Accordion / Desktop List) */}
              <div className="lg:col-span-5 flex flex-col gap-3 lg:max-h-[600px] lg:overflow-y-auto lg:pr-2 custom-scrollbar">
                {models.map((model, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <button
                      onClick={() => setSelectedModel(idx)}
                      className={`w-full text-left flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        selectedModel === idx 
                          ? "bg-white border-blue-400 shadow-[0_4px_20px_-4px_rgba(37,99,235,0.15)] ring-1 ring-blue-100" 
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          selectedModel === idx ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "bg-slate-100 text-slate-500"
                        }`}>
                          <model.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold ${selectedModel === idx ? "text-blue-900" : "text-[#0B1F3A]"}`}>
                            {model.name}
                          </h4>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{model.group}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${selectedModel === idx ? "text-blue-600 rotate-90 lg:rotate-0" : "text-slate-300"}`} />
                    </button>

                    {/* Mobile-only expanded detail */}
                    {selectedModel === idx && (
                      <div className="lg:hidden bg-white border border-slate-200 rounded-2xl p-5 shadow-sm ml-4">
                        <div className="grid gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Fungsi Utama</p>
                            <p className="text-sm font-bold text-slate-700">{model.func}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status Integrasi</p>
                            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-bold ${getStatusStyle(model.status)}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(model.status)}`} />
                              {model.status}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Input</p>
                              <p className="text-xs font-bold text-[#0B1F3A]">{model.input}</p>
                            </div>
                            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Output</p>
                              <p className="text-xs font-bold text-blue-900">{model.output}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Right - Details */}
              <div className="hidden lg:block lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 p-8 lg:p-10 lg:sticky lg:top-24">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                        {(() => {
                          const Icon = models[selectedModel].icon;
                          return <Icon className="w-5 h-5" />;
                        })()}
                      </div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                        {models[selectedModel].group}
                      </div>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-extrabold text-[#0B1F3A]">
                      {models[selectedModel].name}
                    </h3>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Fungsi Utama</p>
                    <p className="text-sm font-bold text-slate-700">{models[selectedModel].func}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Status Integrasi</p>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-bold ${getStatusStyle(models[selectedModel].status)}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(models[selectedModel].status)}`} />
                      {models[selectedModel].status}
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="grid grid-cols-[1fr,auto,1fr] gap-6 items-center text-center">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Input</p>
                      <div className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm text-sm font-bold text-[#0B1F3A]">
                        {models[selectedModel].input}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center pt-5">
                      <ArrowRight className="w-5 h-5 text-slate-300" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-2">Output</p>
                      <div className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-blue-50/50 border border-blue-200 text-blue-900 shadow-sm text-sm font-bold">
                        {models[selectedModel].output}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Architecture Flow */}
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-[#0B1F3A] mb-2">Arsitektur Sistem</h2>
              <p className="text-sm font-medium text-slate-500">Alur kerja pemrosesan data dari ujung ke ujung.</p>
            </div>
            
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-10">
              <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 relative">
                {/* Connecting Lines Desktop */}
                <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />
                
                {steps.map((step, idx) => (
                  <div key={idx} className="relative flex flex-row lg:flex-col items-center gap-4 lg:gap-0 lg:flex-1 group">
                    {/* Connecting Line Mobile */}
                    {idx < steps.length - 1 && (
                      <div className="lg:hidden absolute top-12 bottom-[-1rem] left-5 w-0.5 bg-slate-100 -z-10" />
                    )}
                    
                    <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center lg:mb-4 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors shrink-0">
                      <step.icon className="w-4 h-4 lg:w-5 lg:h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    
                    <div className="flex-1 lg:text-center pb-4 lg:pb-0 border-b border-slate-100 lg:border-0">
                      <h3 className="text-sm font-bold text-[#0B1F3A] mb-1">{step.title}</h3>
                      <p className="text-[11px] font-medium text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. User Path & 6. Tech Strengths */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* User Path Section */}
            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-6">Alur Penggunaan</h2>
              
              <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                <button 
                  onClick={() => setActiveUserPath("publik")}
                  className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition-all ${activeUserPath === "publik" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Masyarakat
                </button>
                <button 
                  onClick={() => setActiveUserPath("petugas")}
                  className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition-all ${activeUserPath === "petugas" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Petugas
                </button>
              </div>

              <div className="grid gap-3">
                {activeUserPath === "publik" ? (
                  <>
                    {[
                      "Pantauan lalu lintas visual",
                      "Prediksi status kemacetan",
                      "Rekomendasi waktu berangkat",
                      "Edukasi rambu otomatis"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                        <span className="text-sm font-medium text-slate-700">{feature}</span>
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
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span className="text-sm font-medium text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </section>

            {/* Technical Strengths */}
            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col">
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-6">Nilai Teknis</h2>
              <div className="grid gap-4 flex-1">
                {technicalStrengths.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 7. Evaluation Note */}
          <section className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200/50 flex items-center justify-center shrink-0">
                <Settings2 className="w-4 h-4 text-slate-500" />
              </div>
              <p className="text-slate-600 font-medium">
                <strong className="text-slate-800">Mode Evaluasi Akademik:</strong> RoadTierbers berjalan dalam mode evaluasi. Hasil prediksi digunakan untuk pembelajaran sistem, bukan keputusan resmi.
              </p>
            </div>
          </section>

        </div>

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
