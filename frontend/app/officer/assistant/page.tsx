import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { MessageSquare, Send, Bot, User, Info, ArrowUpRight } from "lucide-react";

export default function AssistantPage() {
  return (
    <OfficerPageShell>
      <div className="flex flex-col items-center max-w-5xl mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-80px)]">
        
        {/* 1. Chat Page Header */}
        <div className="w-full mb-6 text-center space-y-2">
          <h1 className="text-xl font-medium text-[#0B1F3A]">Asisten AI Petugas</h1>
          <p className="text-sm text-slate-600">
            Tanyakan ringkasan kondisi, risiko, prioritas area, atau bantuan penyusunan laporan.
          </p>
          <div className="flex justify-center items-center gap-2 pt-2">
            <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs font-medium border border-slate-200">Mode evaluasi</span>
            <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs font-medium border border-slate-200">Antarmuka asisten</span>
            <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs font-medium border border-slate-200">Data monitoring petugas</span>
          </div>
        </div>

        {/* 2. Main Chat Container */}
        <div className="w-full max-w-4xl flex-1 bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl flex flex-col overflow-hidden">
          
          <div className="flex-1 p-6 overflow-y-auto space-y-8 bg-slate-50/30">
            
            {/* 3. Welcome Assistant Message */}
            <div className="flex justify-start">
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 mt-1 border border-cyan-200/50">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-slate-500 ml-1">Asisten AI</span>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Halo, saya Asisten AI RoadTierbers. Saya dapat membantu membaca ringkasan monitoring, menjelaskan risiko, memberi saran prioritas area, dan membantu menyusun poin laporan petugas.
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-400 ml-1">Jawaban yang ditampilkan merupakan contoh tampilan. Modul AI belum terhubung.</p>
                </div>
              </div>
            </div>

            {/* 4. Suggested Prompt Area */}
            <div className="pl-12 pr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {[
                  "Ringkas kondisi lalu lintas saat ini",
                  "Area mana yang perlu diprioritaskan?",
                  "Pelanggaran apa yang paling dominan?",
                  "Apa tindak lanjut yang disarankan?",
                  "Bantu susun poin laporan",
                  "Data apa yang perlu divalidasi?"
                ].map((prompt, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-200/60 bg-white hover:bg-slate-50 hover:border-cyan-200/50 transition-colors text-left group">
                    <span className="text-sm text-slate-600 leading-snug">{prompt}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-cyan-500 shrink-0 ml-2 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Static Conversation Example */}
            {/* User Message 1 */}
            <div className="flex justify-end">
              <div className="flex gap-4 max-w-[85%] flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-1 border border-slate-300/50">
                  <User className="w-4 h-4" />
                </div>
                <div className="space-y-1.5 flex flex-col items-end">
                  <span className="text-xs font-medium text-slate-500 mr-1">Petugas</span>
                  <div className="bg-[#0B1F3A] text-white rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-sm">
                    <p className="text-sm leading-relaxed">Area mana yang perlu diprioritaskan?</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assistant Message 1 */}
            <div className="flex justify-start">
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 mt-1 border border-cyan-200/50">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-slate-500 ml-1">Asisten AI</span>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Berdasarkan ringkasan monitoring, area Simpang SKA dan Jl. Sudirman perlu diprioritaskan karena menunjukkan kombinasi volume kendaraan tinggi dan risiko pelanggaran yang meningkat. Petugas disarankan memeriksa Monitoring Pelanggaran dan Forecasting sebelum membuat laporan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Message 2 */}
            <div className="flex justify-end">
              <div className="flex gap-4 max-w-[85%] flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-1 border border-slate-300/50">
                  <User className="w-4 h-4" />
                </div>
                <div className="space-y-1.5 flex flex-col items-end">
                  <span className="text-xs font-medium text-slate-500 mr-1">Petugas</span>
                  <div className="bg-[#0B1F3A] text-white rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-sm">
                    <p className="text-sm leading-relaxed">Bantu buat poin laporan singkat.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assistant Message 2 */}
            <div className="flex justify-start">
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 mt-1 border border-cyan-200/50">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-slate-500 ml-1">Asisten AI</span>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Poin laporan: kondisi lalu lintas terpantau padat pada area prioritas, pelanggaran tanpa helm menjadi temuan dominan, beberapa data masih perlu validasi petugas, dan tindak lanjut disarankan setelah pengecekan lapangan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 6. Chat Input Visual */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
              <div className="relative flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-100/50 transition-all">
                <div className="flex-1 px-3 py-2 min-h-[44px] flex items-center">
                  <span className="text-sm text-slate-400">Tulis pertanyaan untuk Asisten AI...</span>
                </div>
                <div className="p-2.5 bg-cyan-600 text-white rounded-xl shadow-sm cursor-not-allowed opacity-90 flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <Info className="w-3 h-3" />
                Modul percakapan belum terhubung ke sistem AI.
              </div>
            </div>
          </div>

        </div>
      </div>
    </OfficerPageShell>
  );
}
