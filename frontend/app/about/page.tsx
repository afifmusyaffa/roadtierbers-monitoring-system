import { PublicPageShell } from "@/components/layout/public-page-shell";
import Link from "next/link";
import { 
  Network, 
  Cpu, 
  Eye, 
  Database,
  MonitorPlay,
  ArrowRight,
  AlertTriangle
} from "lucide-react";

export default function AboutPage() {
  const models = [
    { name: "Deteksi Rambu Lalu Lintas", group: "Kelompok 5", func: "Klasifikasi rambu jalan", input: "Gambar Visual", output: "Metadata Rambu", status: "Terhubung" },
    { name: "Deteksi Helm", group: "Kelompok 2", func: "Deteksi pengendara tanpa helm", input: "Stream Video", output: "Bounding Box", status: "Terhubung" },
    { name: "Deteksi Boncengan", group: "Kelompok 1", func: "Deteksi lebih dari 2 penumpang", input: "Stream Video", output: "Bounding Box", status: "Terhubung" },
    { name: "Deteksi Plat Kendaraan", group: "Kelompok 4", func: "Membaca plat nomor polisi", input: "Stream Video", output: "Teks Plat", status: "Terhubung" },
    { name: "Deteksi Pajak Kendaraan", group: "Kelompok 5", func: "Verifikasi status pajak", input: "Teks Plat", output: "Status Pajak", status: "Belum terhubung" },
    { name: "Deteksi Kendaraan", group: "Kelompok 6", func: "Menghitung jumlah kendaraan", input: "Stream Video", output: "Hitungan Kendaraan", status: "Terhubung" },
    { name: "Prediksi Kemacetan", group: "Kelompok 9", func: "Forecasting kondisi lalu lintas", input: "Data Cuaca & Waktu", output: "Tingkat Kepadatan", status: "Terhubung" },
    { name: "Prediksi Pelanggaran", group: "Kelompok 8", func: "Estimasi jumlah pelanggaran", input: "Data Cuaca & Waktu", output: "Jumlah Pelanggaran", status: "Terhubung" },
  ];

  return (
    <PublicPageShell>
      <div className="bg-[#F8FAFC] min-h-screen pb-24 font-sans text-slate-800">
        
        {/* 1. Compact Header */}
        <div className="bg-white border-b border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mb-4">
                  Tentang RoadTierbers
                </h1>
                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                  Sistem pemantauan lalu lintas berbasis deep learning yang menggabungkan deteksi visual, prediksi kondisi jalan, dan ringkasan operasional dalam satu platform.
                </p>
              </div>
              
              {/* Right-side meta block */}
              <div className="flex flex-col gap-2 p-4 bg-slate-50 border border-slate-200 rounded-xl min-w-[240px]">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                  <span>Status</span>
                  <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">Mode Evaluasi Akademik</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                  <span>Fokus</span>
                  <span className="text-[#0B1F3A]">Pemantauan Lalu Lintas</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                  <span>Teknologi</span>
                  <span className="text-[#1D4ED8]">Deep Learning + Web</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 space-y-12">
          
          {/* 2. System Summary Panel */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm">
            <h2 className="text-xl font-bold text-[#0B1F3A] mb-6 flex items-center gap-2">
              <MonitorPlay className="w-5 h-5 text-[#1D4ED8]" />
              Apa itu RoadTierbers?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  RoadTierbers adalah command center terpadu yang didesain untuk menjembatani informasi antara masyarakat dan petugas jalan raya. Sistem ini berfokus pada pengolahan data mentah dari kamera dan sensor jalan raya menjadi ringkasan yang mudah dipahami.
                </p>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Melalui pendekatan integrasi berbagai model, sistem ini tidak hanya mampu mengenali pelanggaran atau membaca objek secara visual, melainkan juga mengkalkulasi tren untuk meramalkan kepadatan di masa depan.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] mt-1.5 shrink-0" />
                  <span className="text-sm font-semibold text-[#0B1F3A]">Area Publik (Akses Terbuka)</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] mt-1.5 shrink-0" />
                  <span className="text-sm font-semibold text-[#0B1F3A]">Area Petugas (Command Center)</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] mt-1.5 shrink-0" />
                  <span className="text-sm font-semibold text-[#0B1F3A]">Integrasi Model Deep Learning</span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Deep Learning Model Section */}
          <section>
            <h2 className="text-xl font-bold text-[#0B1F3A] mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#1D4ED8]" />
              Model Deep Learning yang Digunakan
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Model / Modul</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Kelompok</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Fungsi</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Input</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Output</th>
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status Integrasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {models.map((m, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-bold text-[#0B1F3A]">{m.name}</td>
                      <td className="py-4 px-6 text-sm font-semibold text-slate-600">{m.group}</td>
                      <td className="py-4 px-6 text-sm font-medium text-slate-500">{m.func}</td>
                      <td className="py-4 px-6 text-sm font-medium text-slate-500">{m.input}</td>
                      <td className="py-4 px-6 text-sm font-medium text-slate-500">{m.output}</td>
                      <td className="py-4 px-6">
                        {m.status === "Terhubung" ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 tracking-wide uppercase">
                            {m.status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 tracking-wide uppercase">
                            {m.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. System Architecture Section */}
          <section>
            <h2 className="text-xl font-bold text-[#0B1F3A] mb-6 flex items-center gap-2">
              <Network className="w-5 h-5 text-[#1D4ED8]" />
              Arsitektur Sistem
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm overflow-x-auto">
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-2 min-w-[800px]">
                
                {/* Step 1 */}
                <div className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 mx-auto bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center mb-3">
                    <Eye className="w-5 h-5 text-slate-600" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0B1F3A] mb-2">1. Input Data</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">
                    Gambar, video, data cuaca, atau parameter historis.
                  </p>
                </div>
                
                <ArrowRight className="w-5 h-5 text-slate-300 hidden lg:block" />

                {/* Step 2 */}
                <div className="flex-1 w-full bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 mx-auto bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center mb-3">
                    <Cpu className="w-5 h-5 text-[#1D4ED8]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1D4ED8] mb-2">2. Deep Learning</h4>
                  <p className="text-xs font-medium text-blue-900/60 leading-relaxed">
                    Memproses deteksi visual atau prediksi kondisi lalu lintas.
                  </p>
                </div>

                <ArrowRight className="w-5 h-5 text-slate-300 hidden lg:block" />

                {/* Step 3 */}
                <div className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 mx-auto bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center mb-3">
                    <Database className="w-5 h-5 text-slate-600" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0B1F3A] mb-2">3. API & Penyimpanan</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">
                    Menyatukan hasil model, merekap, dan melayani requests.
                  </p>
                </div>

                <ArrowRight className="w-5 h-5 text-slate-300 hidden lg:block" />

                {/* Step 4 */}
                <div className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 mx-auto bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center mb-3">
                    <MonitorPlay className="w-5 h-5 text-slate-600" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0B1F3A] mb-2">4. Antarmuka (Web)</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">
                    Menyajikan data interaktif bagi petugas maupun masyarakat.
                  </p>
                </div>

              </div>
            </div>
          </section>

          {/* 5 & 6. User Flow & Tech Strength */}
          <div className="grid lg:grid-cols-2 gap-8">
            <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm">
              <h2 className="text-xl font-bold text-[#0B1F3A] mb-6">Alur Penggunaan Sistem</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-100">Untuk Masyarakat</h3>
                  <ul className="space-y-3">
                    <li className="text-sm font-semibold text-[#0B1F3A] flex items-center gap-2"><span className="text-[#1D4ED8]">•</span> Pantauan lalu lintas</li>
                    <li className="text-sm font-semibold text-[#0B1F3A] flex items-center gap-2"><span className="text-[#1D4ED8]">•</span> Prediksi kemacetan</li>
                    <li className="text-sm font-semibold text-[#0B1F3A] flex items-center gap-2"><span className="text-[#1D4ED8]">•</span> Rekomendasi berangkat</li>
                    <li className="text-sm font-semibold text-[#0B1F3A] flex items-center gap-2"><span className="text-[#1D4ED8]">•</span> Edukasi rambu AI</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-100">Untuk Petugas</h3>
                  <ul className="space-y-3">
                    <li className="text-sm font-semibold text-[#0B1F3A] flex items-center gap-2"><span className="text-teal-600">•</span> Pusat deteksi AI</li>
                    <li className="text-sm font-semibold text-[#0B1F3A] flex items-center gap-2"><span className="text-teal-600">•</span> Monitor pelanggaran</li>
                    <li className="text-sm font-semibold text-[#0B1F3A] flex items-center gap-2"><span className="text-teal-600">•</span> Analisis & forecasting</li>
                    <li className="text-sm font-semibold text-[#0B1F3A] flex items-center gap-2"><span className="text-teal-600">•</span> Asisten AI khusus</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-[#0B1F3A] rounded-2xl border border-slate-800 p-8 sm:p-10 shadow-sm text-white">
              <h2 className="text-xl font-bold text-white mb-6">Nilai Teknis yang Menonjol</h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><div className="w-2 h-2 rounded-full bg-white" /></div>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed"><strong className="text-white">Integrasi berbagai model</strong> deep learning dalam satu sistem API terpusat.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><div className="w-2 h-2 rounded-full bg-white" /></div>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed"><strong className="text-white">Pemisahan area</strong> secara ketat antara layar publik dan command center petugas.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><div className="w-2 h-2 rounded-full bg-white" /></div>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed"><strong className="text-white">Real-data-first</strong> tanpa manipulasi angka performa model di luar produksi aktual.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5"><div className="w-2 h-2 rounded-full bg-white" /></div>
                  <p className="text-sm font-medium text-slate-300 leading-relaxed"><strong className="text-white">Desain responsif</strong> untuk layar desktop command center maupun perangkat mobile warga.</p>
                </li>
              </ul>
            </section>
          </div>

          {/* 7. Class / Team Contribution Section */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm text-center max-w-4xl mx-auto">
            <h2 className="text-lg font-bold text-[#0B1F3A] mb-4">Kontribusi Pengembangan</h2>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              RoadTierbers dikembangkan sebagai integrasi kolaboratif dari beberapa modul deep learning spesifik. Setiap modul dilatih secara terpisah, lalu dihubungkan ke alur backend API bersama dan ditampilkan melalui sistem frontend web terpadu. Hasilnya adalah satu platform pemantauan lalu lintas yang utuh, profesional, dan kaya akan fitur deteksi.
            </p>
          </section>

          {/* 8. Evaluation Note */}
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4 p-5 rounded-xl bg-amber-50 border border-amber-100 items-start">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-900 mb-1">Catatan Mode Evaluasi Akademik</h4>
                <p className="text-xs font-medium text-amber-800 leading-relaxed">
                  Platform RoadTierbers saat ini berjalan dalam mode evaluasi akademik. Seluruh hasil deteksi objek dan prediksi lalu lintas digunakan untuk mendemonstrasikan kapabilitas teknologi AI—bukan sebagai instrumen penegakan hukum atau penentu status jalan raya secara real-time.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </PublicPageShell>
  );
}
