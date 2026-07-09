import Link from "next/link";
import { StatusBadge } from "@/components/common";
import { 
  riskTimeline,
  quickLinks
} from "@/data/officer-history";

// New prop types
interface HistoryRow {
  time: string;
  loc: string;
  cat: string;
  res: string;
  count: string;
  risk: string;
  val: string;
  note: string;
  follow: string;
}

interface HistoryData {
  historyRows: HistoryRow[];
  total_records: number;
}

export function HistoryHeaderBar() {
  return (
    <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
      <div className="space-y-2">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-slate-700">
          Detection History
        </span>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">
          Riwayat Deteksi Petugas
        </h1>
        <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
          Daftar riwayat deteksi dari sample pemantauan untuk membantu petugas meninjau status risiko, validasi, dan tindak lanjut.
        </p>
      </div>
      <div className="flex flex-col gap-1.5 text-right bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl shrink-0">
        <p className="text-xs font-medium text-slate-500"><span className="text-slate-400">Mode:</span> Data simulasi prototype</p>
        <p className="text-xs font-medium text-slate-500"><span className="text-slate-400">Area:</span> Pekanbaru</p>
        <p className="text-xs font-medium text-slate-500"><span className="text-slate-400">Periode:</span> Hari ini</p>
        <p className="text-xs font-medium text-slate-500"><span className="text-slate-400">Validasi:</span> Perlu pemeriksaan petugas</p>
      </div>
    </section>
  );
}

export function HistoryStatusSummary({ total, validationNeeded, highRisk }: { total: number, validationNeeded: number, highRisk: number }) {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const dateString = today.toLocaleDateString('id-ID', options);

  return (
    <section>
      <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/5 blur-[60px] rounded-full pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="flex flex-col space-y-2 md:pr-6">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Total Riwayat</p>
            <div className="flex items-center pt-1 pb-2">
              <span className="text-2xl font-medium text-[#0B1F3A]">{total} data</span>
            </div>
            <p className="text-sm font-normal text-slate-600 leading-relaxed">
              Jumlah data deteksi yang tercatat pada tanggal hari ini, {dateString}.
            </p>
          </div>
          <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Risiko Tinggi</p>
            <div className="flex items-center pt-1 pb-2">
              <StatusBadge status="Tinggi" className="px-4 py-1.5 text-sm" />
              <span className="text-2xl font-medium text-red-600 ml-3">{highRisk} data</span>
            </div>
            <p className="text-sm font-normal text-slate-600 leading-relaxed">
              Data yang perlu diprioritaskan untuk penanganan.
            </p>
          </div>
          <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:pl-6">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Sudah Ditinjau</p>
            <div className="flex items-center pt-1 pb-2">
              <span className="text-2xl font-medium text-teal-600">{total - validationNeeded} data</span>
            </div>
            <p className="text-sm font-normal text-slate-600 leading-relaxed">
              Data yang sudah memiliki catatan tinjauan awal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FilterSummaryBar({ activeFilter, setActiveFilter }: { activeFilter?: string, setActiveFilter?: (f: string) => void }) {
  const filters = ["Semua data", "Risiko tinggi", "Pelanggaran", "Plat", "Forecasting"];
  return (
    <section>
      <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter && setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border ${
                activeFilter === f 
                  ? "bg-[#0B1F3A] text-white border-[#0B1F3A]" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-4 text-xs font-medium text-slate-500 shrink-0 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-4 w-full md:w-auto">
          <span>Rentang waktu: <span className="text-slate-700">Hari ini</span></span>
          <span>Area: <span className="text-slate-700">Simpang SKA (All)</span></span>
        </div>
      </div>
    </section>
  );
}

export function HistoryKpiGrid({ data }: { data: HistoryData }) {
  const kpis = [
    { label: "Total Data Deteksi", value: data.total_records, color: "text-[#1D4ED8]" },
    { label: "Anomali Pelanggaran", value: data.historyRows.filter(r => r.risk === "Tinggi").length, color: "text-amber-600" },
  ];
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col justify-between">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">{kpi.label}</p>
            <div className="mb-4">
              <span className={`text-3xl font-medium ${kpi.color} tracking-tight`}>{kpi.value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MainHistoryTable({ rows }: { rows: HistoryRow[] }) {
  return (
    <section>
      <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col">
        <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Log Riwayat Deteksi Asli</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Waktu</th>
                <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Lokasi Sample</th>
                <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Kategori</th>
                <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Hasil Deteksi</th>
                <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Jumlah</th>
                <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Risiko</th>
                <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Catatan Petugas</th>
                <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Tindak Lanjut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-slate-500 whitespace-nowrap">{row.time}</td>
                  <td className="p-4 text-sm font-medium text-[#0B1F3A] whitespace-nowrap">{row.loc}</td>
                  <td className="p-4 text-sm font-medium text-slate-700 whitespace-nowrap">{row.cat}</td>
                  <td className="p-4 text-sm font-normal text-slate-600">
                    {row.cat === 'Plat' ? (
                      <span className="font-medium tracking-wider bg-slate-100/70 px-1.5 py-0.5 rounded">{row.res}</span>
                    ) : (
                      row.res
                    )}
                  </td>
                  <td className="p-4 text-sm font-medium text-[#0B1F3A] text-center">{row.count}</td>
                  <td className="p-4 text-sm font-medium text-slate-700 whitespace-nowrap">
                    <StatusBadge status={row.risk} />
                  </td>
                  <td className="p-4 text-sm font-normal text-slate-600 min-w-[200px]">{row.note}</td>
                  <td className="p-4 text-sm font-medium text-blue-600 whitespace-nowrap">{row.follow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function ValidationAndTimeline() {
  return (
    <section>
      <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
        <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Alur Aktivitas Risiko (Hari Ini)</h2>
        <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 pb-4">
          {riskTimeline.map((event, i) => (
            <div key={i} className="relative pl-6">
              <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${event.color}`} />
              <div className="flex items-center gap-3 mb-1">
                <span className="text-sm font-medium text-[#0B1F3A]">{event.time}</span>
                <span className="text-xs font-medium text-slate-500 uppercase">Risiko {event.risk}</span>
              </div>
              <p className="text-sm font-normal text-slate-600 leading-relaxed">{event.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NotesAndActions({ rows }: { rows: HistoryRow[] }) {
  // Generate dynamic recommendations based on history data
  const dynamicActions = [];
  
  if (rows.some(r => r.cat === 'Pelanggaran' && r.risk === 'Tinggi')) {
    dynamicActions.push({ title: "Prioritas Pelanggaran Tinggi", desc: "Ada pelanggaran kasatmata (seperti tanpa helm / boncengan 3) yang harus divalidasi.", link: "/officer/violation-monitoring" });
  }
  if (rows.some(r => r.cat === 'Plat')) {
    dynamicActions.push({ title: "Tinjau Kualitas Plat", desc: "Terdeteksi plat buram atau masalah pembacaan administrasi.", link: "/officer/vehicle-plate" });
  }
  if (rows.some(r => r.cat === 'Forecasting')) {
    dynamicActions.push({ title: "Tinjau Estimasi Kemacetan", desc: "Periksa hasil forecasting berdasarkan deteksi volume kendaraan.", link: "/officer/forecasting" });
  }
  if (rows.some(r => r.cat === 'Kendaraan' || r.cat === 'Rambu')) {
    dynamicActions.push({ title: "Verifikasi Visual AI", desc: "Cocokkan dengan tangkapan kamera langsung.", link: "/officer/ai-detection" });
  }
  
  // Jika masih ada slot kosong (maksimal 4)
  if (dynamicActions.length < 4) {
    dynamicActions.push({ title: "Susun Laporan Harian", desc: "Rekap data tervalidasi ke dalam dokumen laporan.", link: "/officer/report" });
  }

  const actionsToShow = dynamicActions.slice(0, 4);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
        <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Catatan Review Petugas</h2>
        <ul className="space-y-3 mt-2">
          <li className="flex gap-3">
            <span className="text-blue-500 mt-1 text-[10px]">■</span>
            <p className="text-sm font-normal text-slate-700 leading-relaxed">
              Riwayat deteksi membantu petugas menelusuri data mentah yang sudah terekam sistem hari ini.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500 mt-1 text-[10px]">■</span>
            <p className="text-sm font-normal text-slate-700 leading-relaxed">
              Data berisiko tinggi wajib diprioritaskan dalam proses validasi visual.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-500 mt-1 text-[10px]">■</span>
            <p className="text-sm font-normal text-slate-700 leading-relaxed">
              Hasil pada riwayat ini <strong>belum</strong> menjadi keputusan resmi tanpa pemeriksaan langsung dari petugas operasional.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500 mt-1 text-[10px]">■</span>
            <p className="text-sm font-normal text-slate-700 leading-relaxed">
              Gunakan halaman laporan setelah data di riwayat ini telah divalidasi dan siap didokumentasikan.
            </p>
          </li>
        </ul>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
        <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Rekomendasi Tindakan Petugas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actionsToShow.map((action, i) => (
            <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
              <div>
                <p className="text-sm font-medium text-[#0B1F3A] mb-1">{action.title}</p>
                <p className="text-sm font-normal text-slate-600 mb-3">{action.desc}</p>
              </div>
              {action.link && (
                <Link href={action.link} className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors mt-auto">
                  Buka Halaman →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuickNavigation() {
  return (
    <section>
      <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Navigasi Operasional Lanjutan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className="flex flex-col p-5 rounded-2xl bg-[#0B1F3A] border border-[#142d52] hover:bg-[#142d52] transition-colors shadow-sm group h-full"
          >
            <h3 className="text-sm font-medium text-white mb-2">{action.label}</h3>
            <p className="text-xs font-normal text-blue-200/70 leading-relaxed mb-6 flex-1">{action.helper}</p>
            <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center text-xs font-medium text-white/50 group-hover:text-blue-400 transition-colors">
              <span>Buka Menu</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
