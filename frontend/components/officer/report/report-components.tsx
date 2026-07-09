import Link from "next/link";
import { StatusBadge } from "@/components/common";
import { 
  reportKpis, 
  reportRows, 
  recommendedReportActions, 
  reportQuickLinks 
} from "@/data/officer-report";

export function ReportHeaderBar({ data }: { data?: any }) {
  return (
    <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
      <div className="space-y-2">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-slate-700">
          Officer Report
        </span>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">
          Laporan Monitoring Petugas
        </h1>
        <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
          Rangkuman hasil pemantauan lalu lintas, pelanggaran, plat tersamarkan, forecasting, dan rekomendasi tindak lanjut untuk kebutuhan dokumentasi petugas.
        </p>
      </div>
      <div className="flex flex-col gap-1.5 text-right bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl shrink-0">
        <p className="text-xs font-medium text-slate-500"><span className="text-slate-400">Mode:</span> Data Real-time (API)</p>
        <p className="text-xs font-medium text-slate-500"><span className="text-slate-400">Area:</span> Pekanbaru</p>
        <p className="text-xs font-medium text-slate-500"><span className="text-slate-400">Periode:</span> Hari ini</p>
        <p className="text-xs font-medium text-slate-500"><span className="text-slate-400">Status:</span> Draft laporan</p>
      </div>
    </section>
  );
}

export function ReportStatusSummary({ data }: { data?: any }) {
  const totalDetections = data ? data.total_data_masuk : 128;
  const totalViolations = data ? data.total_violations : 37;

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const dateString = today.toLocaleDateString('id-ID', options);

  return (
    <section>
      <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/5 blur-[60px] rounded-full pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="flex flex-col space-y-2 md:pr-6">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Total Data Masuk</p>
            <div className="flex items-center pt-1 pb-2">
              <span className="text-2xl font-medium text-[#0B1F3A]">{totalDetections} data</span>
            </div>
            <p className="text-sm font-normal text-slate-600 leading-relaxed">
              Jumlah data dari data pemantauan pada tanggal hari ini, {dateString}.
            </p>
          </div>
          <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Pelanggaran Terdeteksi</p>
            <div className="flex items-center pt-1 pb-2">
              <span className="text-2xl font-medium text-amber-600">{totalViolations} kasus</span>
            </div>
            <p className="text-sm font-normal text-slate-600 leading-relaxed">
              Indikasi pelanggaran yang masuk ke sistem.
            </p>
          </div>
          <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:pl-6">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Status Laporan</p>
            <div className="flex items-center pt-1 pb-2">
              <span className="text-2xl font-medium text-slate-600">Draft</span>
            </div>
            <p className="text-sm font-normal text-slate-600 leading-relaxed">
              Laporan masih perlu pemeriksaan petugas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReportKpiGrid({ kpis }: { kpis?: any[] }) {
  const gridKpis = kpis || reportKpis;
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridKpis.map((kpi, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col justify-between">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">{kpi.label}</p>
            <div className="mb-4">
              <span className={`text-3xl font-medium ${kpi.color} tracking-tight`}>{kpi.value}</span>
              {kpi.unit && <span className="text-base font-medium text-slate-500 ml-2">{kpi.unit}</span>}
            </div>
            <div className="mt-auto pt-4 border-t border-slate-100">
              <p className="text-sm font-normal text-slate-500">{kpi.helper}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ReportControlPanel({ 
  onExportCsv, 
  onExportExcel, 
  onExportPdf 
}: { 
  onExportCsv?: () => void; 
  onExportExcel?: () => void; 
  onExportPdf?: () => void; 
}) {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const dateString = today.toLocaleDateString('id-ID', options);

  return (
    <section>
      <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col lg:flex-row gap-6 justify-between items-center">
        <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-600">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider">Jenis Laporan</span>
            <span className="text-[#0B1F3A]">Laporan harian</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider">Tanggal</span>
            <span className="text-[#0B1F3A]">{dateString}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider">Area</span>
            <span className="text-[#0B1F3A]">Semua area pemantauan</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0 w-full lg:w-auto">
          <button 
            onClick={onExportCsv}
            className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl bg-white text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            Export CSV
          </button>
          <button 
            onClick={onExportExcel}
            className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl bg-white text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            Export Excel
          </button>
          <button 
            onClick={onExportPdf}
            className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl bg-white text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            Export PDF
          </button>
          <button className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl bg-[#0B1F3A] text-white text-sm font-medium border border-[#0B1F3A] hover:bg-[#142d52] transition-colors shadow-sm">
            Simpan Draft Prototype
          </button>
        </div>
      </div>
    </section>
  );
}

export function ReportPreviewPanel({ data }: { data?: any }) {
  const totalViolations = data ? data.total_violations : 37;
  const dominantText = totalViolations > 20 
    ? "Pelanggaran tanpa helm menjadi kategori dominan, sementara beberapa plat tersamarkan membutuhkan validasi petugas."
    : "Kondisi pelanggaran terpantau minimal dengan sebaran kasus normal.";

  return (
    <section>
      <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col max-w-4xl mx-auto">
        <div className="border-b-2 border-[#0B1F3A] pb-6 mb-8">
          <h2 className="text-2xl font-medium text-[#0B1F3A] uppercase tracking-wide text-center">
            Laporan Monitoring Lalu Lintas RoadTierbers
          </h2>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-3 border-l-2 border-blue-500 pl-3">
              Ringkasan Kondisi
            </h3>
            <p className="text-sm font-normal text-slate-700 leading-relaxed pl-3.5">
              Kondisi lalu lintas terpantau padat pada beberapa area sample dengan risiko pelanggaran meningkat berdasarkan database riil.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-3 border-l-2 border-amber-500 pl-3">
              Temuan Utama
            </h3>
            <p className="text-sm font-normal text-slate-700 leading-relaxed pl-3.5">
              {dominantText}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-3 border-l-2 border-red-500 pl-3">
              Area Prioritas
            </h3>
            <p className="text-sm font-normal text-slate-700 leading-relaxed pl-3.5">
              Simpang SKA, Jl. Sudirman, dan Harapan Raya menjadi area yang perlu diprioritaskan.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-3 border-l-2 border-teal-500 pl-3">
              Rekomendasi
            </h3>
            <p className="text-sm font-normal text-slate-700 leading-relaxed pl-3.5">
              Petugas disarankan melakukan validasi manual sebelum laporan digunakan sebagai dasar tindak lanjut penilangan.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between text-xs font-medium text-slate-400 uppercase tracking-widest">
          <span>Dokumen Internal</span>
          <span>Prototype Simulasi API</span>
        </div>
      </div>
    </section>
  );
}

export function ReportDetailTable({ rows }: { rows?: any[] }) {
  const tableRows = rows || reportRows;
  return (
    <section>
      <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col">
        <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Detail Data Monitoring Laporan</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Kategori</th>
                <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Data Utama</th>
                <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider text-center">Jumlah</th>
                <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Risiko</th>
                <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Catatan Laporan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableRows.map((row: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-slate-700 whitespace-nowrap">{row.cat}</td>
                  <td className="p-4 text-sm font-normal text-[#0B1F3A]">{row.res}</td>
                  <td className="p-4 text-sm font-medium text-[#0B1F3A] text-center">{row.count}</td>
                  <td className="p-4 whitespace-nowrap"><StatusBadge status={row.risk} /></td>
                  <td className="p-4 text-sm font-normal text-slate-600 min-w-[200px]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function ValidationChecklistPanel() {
  return (
    <section>
      <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
        <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Rekomendasi Tindak Lanjut</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendedReportActions.map((action, i) => (
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

export function ReportDisclaimerPanel() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="col-span-1 lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-slate-100/80 border border-slate-200 flex flex-col justify-center">
        <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Catatan Penggunaan Laporan</h2>
        <ul className="space-y-2">
          <li className="flex gap-3">
            <span className="text-slate-400 mt-1 text-[10px]">■</span>
            <p className="text-sm font-normal text-slate-600">Laporan ini merupakan output prototype berbasis data simulasi API database.</p>
          </li>
          <li className="flex gap-3">
            <span className="text-slate-400 mt-1 text-[10px]">■</span>
            <p className="text-sm font-normal text-slate-600">Data yang tampil belum menjadi keputusan resmi.</p>
          </li>
          <li className="flex gap-3">
            <span className="text-slate-400 mt-1 text-[10px]">■</span>
            <p className="text-sm font-normal text-slate-600">Petugas tetap perlu memvalidasi hasil monitoring sebelum tindak lanjut.</p>
          </li>
          <li className="flex gap-3">
            <span className="text-slate-400 mt-1 text-[10px]">■</span>
            <p className="text-sm font-normal text-slate-600">Data plat ditampilkan dalam bentuk tersamarkan untuk menjaga keamanan informasi.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function ReportQuickNavigation() {
  return (
    <section>
      <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Navigasi Laporan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportQuickLinks.map((action, i) => (
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
