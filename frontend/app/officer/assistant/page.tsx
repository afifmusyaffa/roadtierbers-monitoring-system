import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import Link from "next/link";
import { MessageSquare, AlertCircle, FileText, Map, Navigation, CheckCircle2, ChevronRight, Info } from "lucide-react";

export default function AssistantPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* 1. Assistant Header Bar */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div>
              <p className="text-sm font-medium text-cyan-600 mb-1 tracking-wide uppercase">Officer AI Assistant</p>
              <h1 className="text-2xl font-medium text-[#0B1F3A] mb-2 tracking-tight">Asisten Petugas</h1>
              <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                Tampilan bantuan operasional untuk membaca ringkasan monitoring, memahami risiko, dan menyiapkan tindak lanjut petugas.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-col px-4 py-2 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Mode</span>
                <span className="text-sm font-medium text-slate-700">Frontend prototype</span>
              </div>
              <div className="flex flex-col px-4 py-2 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Status</span>
                <span className="text-sm font-medium text-slate-700">Simulasi tampilan</span>
              </div>
              <div className="flex flex-col px-4 py-2 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Area</span>
                <span className="text-sm font-medium text-slate-700">Pekanbaru</span>
              </div>
              <div className="flex flex-col px-4 py-2 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Sumber</span>
                <span className="text-sm font-medium text-slate-700">Data monitoring</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Assistant Capability Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/60 backdrop-blur-md border border-white rounded-2xl p-5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center mb-4 text-cyan-600">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Ringkas Situasi</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Membantu membaca kondisi lalu lintas dan risiko utama.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-md border border-white rounded-2xl p-5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4 text-amber-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Bantu Prioritas</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Mengarahkan petugas ke area dan kasus yang perlu didahulukan.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-md border border-white rounded-2xl p-5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4 text-indigo-600">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Jelaskan Insight</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Membantu menjelaskan pola pelanggaran dan forecasting.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-md border border-white rounded-2xl p-5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-4 text-teal-600">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Siapkan Laporan</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Membantu menyusun poin tindak lanjut sebelum laporan dibuat.</p>
          </div>
        </div>

        {/* 3. Monitoring Context Panel */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-6">
          <h2 className="text-lg font-medium text-[#0B1F3A] mb-4">Konteks Monitoring Saat Ini</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Kondisi Lalu Lintas</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200/50 w-fit">Padat</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Risiko Pelanggaran</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-red-50 text-red-700 text-xs font-medium border border-red-200/50 w-fit">Tinggi</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Area Prioritas</span>
              <span className="text-sm font-medium text-slate-700">Simpang SKA, Jl. Sudirman</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Pelanggaran Dominan</span>
              <span className="text-sm font-medium text-slate-700">Tanpa helm</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Status Data</span>
              <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                Perlu validasi petugas
              </span>
            </div>
          </div>
        </div>

        {/* 4. Assistant Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Chat Workspace */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* 5. Chat Preview Panel */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl overflow-hidden flex flex-col h-[600px]">
              <div className="px-6 py-4 border-b border-slate-100 bg-white/50 flex justify-between items-center">
                <h2 className="text-base font-medium text-[#0B1F3A]">Percakapan Simulasi</h2>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Sistem Aktif
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/30">
                {/* Officer Message 1 */}
                <div className="flex justify-end">
                  <div className="bg-[#0B1F3A] text-white rounded-2xl rounded-tr-sm px-5 py-3.5 max-w-[85%] shadow-sm">
                    <p className="text-sm leading-relaxed">Area mana yang perlu diprioritaskan saat ini?</p>
                  </div>
                </div>
                
                {/* Assistant Message 1 */}
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[90%] shadow-sm space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center">
                        <MessageSquare className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-medium text-slate-500">Asisten Petugas</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Berdasarkan ringkasan monitoring, <span className="font-medium text-[#0B1F3A]">Simpang SKA</span> dan <span className="font-medium text-[#0B1F3A]">Jl. Sudirman</span> perlu diprioritaskan karena memiliki kombinasi volume kendaraan tinggi dan risiko pelanggaran yang meningkat.
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Petugas disarankan memeriksa Monitoring Pelanggaran dan Forecasting sebelum membuat laporan.
                    </p>
                  </div>
                </div>

                {/* Officer Message 2 */}
                <div className="flex justify-end">
                  <div className="bg-[#0B1F3A] text-white rounded-2xl rounded-tr-sm px-5 py-3.5 max-w-[85%] shadow-sm">
                    <p className="text-sm leading-relaxed">Apa tindak lanjut yang disarankan?</p>
                  </div>
                </div>

                {/* Assistant Message 2 */}
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[90%] shadow-sm space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center">
                        <MessageSquare className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-medium text-slate-500">Asisten Petugas</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Prioritaskan validasi kasus tanpa helm, periksa data plat tersamarkan yang membutuhkan pemeriksaan, lalu siapkan draft laporan jika risiko tetap tinggi setelah validasi lapangan.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. Static Input Visual */}
              <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                    <p className="text-sm text-slate-400">Tanyakan ringkasan kondisi, risiko, atau tindak lanjut...</p>
                  </div>
                  <div className="bg-slate-200 text-slate-400 px-5 py-3 rounded-xl text-sm font-medium cursor-not-allowed">
                    Kirim
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <Info className="w-3 h-3" />
                  Mode prototype: percakapan belum terhubung ke model AI.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Context & Prompts */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* 7. Suggested Prompts Panel */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-6">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Saran Pertanyaan</h2>
              <div className="flex flex-col gap-2">
                {[
                  { text: "Ringkas kondisi lalu lintas saat ini", helper: "Minta ringkasan singkat" },
                  { text: "Area mana yang perlu diprioritaskan?", helper: "Tinjau prioritas lokasi" },
                  { text: "Pelanggaran apa yang paling dominan?", helper: "Analisis jenis pelanggaran" },
                  { text: "Apa rekomendasi tindakan petugas?", helper: "Arahan tindak lanjut" },
                  { text: "Data apa yang perlu divalidasi?", helper: "Cek antrean validasi" },
                  { text: "Bantu susun poin laporan", helper: "Persiapan laporan harian" }
                ].map((prompt, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white/50 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700">{prompt.text}</span>
                      <span className="text-xs text-slate-500">{prompt.helper}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Quick Context Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-xl p-4">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1 block">Prioritas Area</span>
                <span className="text-sm font-medium text-[#0B1F3A] block mb-1">Simpang SKA</span>
                <span className="text-[11px] text-slate-500 leading-tight">Risiko dan volume meningkat.</span>
              </div>
              <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-xl p-4">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1 block">Validasi Utama</span>
                <span className="text-sm font-medium text-[#0B1F3A] block mb-1">Tanpa helm</span>
                <span className="text-[11px] text-slate-500 leading-tight">Kategori pelanggaran dominan.</span>
              </div>
              <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-xl p-4">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1 block">Forecasting</span>
                <span className="text-sm font-medium text-[#0B1F3A] block mb-1">Periode siang</span>
                <span className="text-[11px] text-slate-500 leading-tight">Kepadatan perlu diantisipasi.</span>
              </div>
              <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-xl p-4">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1 block">Laporan</span>
                <span className="text-sm font-medium text-[#0B1F3A] block mb-1">Draft</span>
                <span className="text-[11px] text-slate-500 leading-tight">Gunakan setelah validasi petugas.</span>
              </div>
            </div>

            {/* 9. Recommended Navigation */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-6">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Rekomendasi Halaman Terkait</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/officer/violation-monitoring" className="flex flex-col p-3 rounded-xl border border-slate-100 bg-white/50 hover:bg-white hover:border-cyan-200 transition-colors group">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Navigation className="w-3.5 h-3.5 text-cyan-600" />
                    <span className="text-sm font-medium text-[#0B1F3A] group-hover:text-cyan-600 transition-colors">Monitoring</span>
                  </div>
                  <span className="text-[11px] text-slate-500 leading-tight">Lihat kategori pelanggaran dan status validasi.</span>
                </Link>
                <Link href="/officer/forecasting" className="flex flex-col p-3 rounded-xl border border-slate-100 bg-white/50 hover:bg-white hover:border-cyan-200 transition-colors group">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Navigation className="w-3.5 h-3.5 text-cyan-600" />
                    <span className="text-sm font-medium text-[#0B1F3A] group-hover:text-cyan-600 transition-colors">Forecasting</span>
                  </div>
                  <span className="text-[11px] text-slate-500 leading-tight">Periksa prediksi volume, pelanggaran, dan kemacetan.</span>
                </Link>
                <Link href="/officer/smart-insight" className="flex flex-col p-3 rounded-xl border border-slate-100 bg-white/50 hover:bg-white hover:border-cyan-200 transition-colors group">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Navigation className="w-3.5 h-3.5 text-cyan-600" />
                    <span className="text-sm font-medium text-[#0B1F3A] group-hover:text-cyan-600 transition-colors">Smart Insight</span>
                  </div>
                  <span className="text-[11px] text-slate-500 leading-tight">Baca analisis risiko dan prioritas area.</span>
                </Link>
                <Link href="/officer/report" className="flex flex-col p-3 rounded-xl border border-slate-100 bg-white/50 hover:bg-white hover:border-cyan-200 transition-colors group">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Navigation className="w-3.5 h-3.5 text-cyan-600" />
                    <span className="text-sm font-medium text-[#0B1F3A] group-hover:text-cyan-600 transition-colors">Buat Laporan</span>
                  </div>
                  <span className="text-[11px] text-slate-500 leading-tight">Susun laporan setelah data divalidasi.</span>
                </Link>
              </div>
            </div>

            {/* 11. Operational Action Checklist */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-6">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Daftar Tindakan Operasional</h2>
              <div className="space-y-3">
                {[
                  "Cek ringkasan dashboard.",
                  "Tinjau monitoring pelanggaran.",
                  "Periksa data plat tersamarkan jika diperlukan.",
                  "Baca forecasting sebelum periode sibuk.",
                  "Buat laporan setelah validasi."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 10. Assistant Usage Notice */}
        <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-base font-medium text-amber-900 mb-3 flex items-center gap-2 relative z-10">
            <AlertCircle className="w-4 h-4" />
            Catatan Penggunaan Asisten
          </h2>
          <ul className="space-y-2 relative z-10">
            <li className="flex items-start gap-2 text-sm text-amber-800/80">
              <span className="text-amber-400 mt-0.5">•</span>
              Asisten ini merupakan tampilan prototype frontend.
            </li>
            <li className="flex items-start gap-2 text-sm text-amber-800/80">
              <span className="text-amber-400 mt-0.5">•</span>
              Jawaban yang ditampilkan masih berupa simulasi.
            </li>
            <li className="flex items-start gap-2 text-sm text-amber-800/80">
              <span className="text-amber-400 mt-0.5">•</span>
              Petugas tetap perlu memeriksa data monitoring, hasil deteksi, dan kondisi lapangan.
            </li>
            <li className="flex items-start gap-2 text-sm text-amber-800/80">
              <span className="text-amber-400 mt-0.5">•</span>
              Asisten tidak menggantikan keputusan resmi petugas.
            </li>
          </ul>
        </div>

      </div>
    </OfficerPageShell>
  );
}
