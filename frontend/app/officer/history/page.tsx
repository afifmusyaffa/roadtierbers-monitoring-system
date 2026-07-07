import Link from "next/link";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { StatusBadge } from "@/components/common";

export default function OfficerHistoryPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        
        {/* 1. History Header Bar */}
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
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Mode:</span> Data simulasi prototype
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Area:</span> Pekanbaru
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Periode:</span> Hari ini
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Validasi:</span> Perlu pemeriksaan petugas
            </p>
          </div>
        </section>

        {/* 2. History Status Summary */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              <div className="flex flex-col space-y-2 md:pr-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Total Riwayat</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-[#0B1F3A]">128 data</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Jumlah data deteksi yang tercatat pada sample hari ini.
                </p>
              </div>
              
              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Perlu Validasi</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-amber-600">34 data</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Data yang masih perlu diperiksa ulang oleh petugas.
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Risiko Tinggi</p>
                <div className="flex items-center pt-1 pb-2">
                  <StatusBadge status="Tinggi" className="px-4 py-1.5 text-sm" />
                  <span className="text-2xl font-medium text-red-600 ml-3">18 data</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Data yang perlu diprioritaskan untuk validasi.
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:pl-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Sudah Ditinjau</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-teal-600">94 data</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Data yang sudah memiliki catatan tinjauan awal.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Filter Summary Bar (Static) */}
        <section>
          <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-1.5 rounded-full bg-[#0B1F3A] text-white text-xs font-medium border border-[#0B1F3A]">Semua data</span>
              <span className="px-4 py-1.5 rounded-full bg-white text-slate-600 text-xs font-medium border border-slate-200 cursor-not-allowed opacity-70">Risiko tinggi</span>
              <span className="px-4 py-1.5 rounded-full bg-white text-slate-600 text-xs font-medium border border-slate-200 cursor-not-allowed opacity-70">Perlu validasi</span>
              <span className="px-4 py-1.5 rounded-full bg-white text-slate-600 text-xs font-medium border border-slate-200 cursor-not-allowed opacity-70">Pelanggaran</span>
              <span className="px-4 py-1.5 rounded-full bg-white text-slate-600 text-xs font-medium border border-slate-200 cursor-not-allowed opacity-70">Plat tersamarkan</span>
              <span className="px-4 py-1.5 rounded-full bg-white text-slate-600 text-xs font-medium border border-slate-200 cursor-not-allowed opacity-70">Forecasting</span>
            </div>
            <div className="flex gap-4 text-xs font-medium text-slate-500 shrink-0 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-4 w-full md:w-auto">
              <span>Rentang waktu: <span className="text-slate-700">Hari ini</span></span>
              <span>Area: <span className="text-slate-700">Semua area sample</span></span>
            </div>
          </div>
        </section>

        {/* 4. History KPI Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Deteksi Kendaraan", value: "86", unit: "Data", color: "text-[#1D4ED8]", helper: "Identifikasi jenis kendaraan." },
              { label: "Deteksi Pelanggaran", value: "37", unit: "Data", color: "text-amber-600", helper: "Indikasi kasat mata AI." },
              { label: "Deteksi Rambu", value: "12", unit: "Data", color: "text-blue-600", helper: "Kondisi area sekitar." },
              { label: "Plat Tersamarkan", value: "74", unit: "Data", color: "text-teal-600", helper: "Pembacaan plat disensor." },
              { label: "Perlu Validasi", value: "34", unit: "Data", color: "text-amber-600", helper: "Tunggu review manual." },
              { label: "Risiko Tinggi", value: "18", unit: "Data", color: "text-red-600", helper: "Prioritas tindak lanjut." },
            ].map((kpi, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col justify-between">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">{kpi.label}</p>
                <div className="mb-4">
                  <span className={`text-3xl font-medium ${kpi.color} tracking-tight`}>
                    {kpi.value}
                  </span>
                  {kpi.unit && <span className="text-base font-medium text-slate-500 ml-2">{kpi.unit}</span>}
                </div>
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <p className="text-sm font-normal text-slate-500">{kpi.helper}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Main History Table */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col">
            <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Log Riwayat Deteksi (Data Simulasi)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1100px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Waktu</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Lokasi Sample</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Kategori</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Hasil Deteksi</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Jumlah</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Risiko</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Status Validasi</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Catatan Petugas</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Tindak Lanjut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { time: "10:15", loc: "Simpang SKA", cat: "Pelanggaran", res: "Tanpa helm", count: "5", risk: "Tinggi", val: "Perlu validasi", note: "Cek ulang frame sample", follow: "Monitoring Pelanggaran" },
                    { time: "10:18", loc: "Panam (UNRI)", cat: "Kendaraan", res: "Motor terpantau", count: "24", risk: "Sedang", val: "Ditinjau", note: "Kepadatan mulai naik", follow: "Forecasting" },
                    { time: "10:22", loc: "Jl. Sudirman", cat: "Plat", res: "BM 2*** CD", count: "1", risk: "Sedang", val: "Perlu validasi", note: "Plat tidak jelas", follow: "Plate Monitoring" },
                    { time: "10:25", loc: "Harapan Raya", cat: "Plat", res: "BM 9*** RS", count: "1", risk: "Tinggi", val: "Perlu validasi", note: "Administrasi simulasi perlu pemeriksaan", follow: "Plate Monitoring" },
                    { time: "10:30", loc: "Simpang SKA", cat: "Rambu", res: "Dilarang berhenti", count: "1", risk: "Sedang", val: "Ditinjau", note: "Perhatikan area sekitar rambu", follow: "AI Detection" },
                    { time: "10:35", loc: "Jl. Sudirman", cat: "Pelanggaran", res: "Area berhenti", count: "1", risk: "Sedang", val: "Perlu validasi", note: "Cocokkan dengan rambu sekitar", follow: "Monitoring Pelanggaran" },
                    { time: "10:40", loc: "Simpang SKA", cat: "Forecasting", res: "Kemacetan 32 menit", count: "1", risk: "Tinggi", val: "Ditinjau", note: "Antisipasi periode siang", follow: "Forecasting" },
                    { time: "10:45", loc: "Harapan Raya", cat: "Kendaraan", res: "Volume meningkat", count: "1", risk: "Sedang", val: "Ditinjau", note: "Perlu pemantauan lanjutan", follow: "Dashboard" },
                  ].map((row, i) => (
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
                      <td className="p-4 whitespace-nowrap">
                        <StatusBadge status={row.risk} />
                      </td>
                      <td className="p-4 text-sm font-normal text-slate-600 whitespace-nowrap">{row.val}</td>
                      <td className="p-4 text-sm font-normal text-slate-600 min-w-[200px]">{row.note}</td>
                      <td className="p-4 text-sm font-medium text-blue-600 whitespace-nowrap">{row.follow}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 6 & 7. Queue and Timeline */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Validation Queue Panel */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
            <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Antrean Validasi Petugas</h2>
            <div className="space-y-4">
              {[
                { type: "Tanpa helm", count: "14 data perlu validasi", risk: "Tinggi" },
                { type: "Administrasi simulasi", count: "5 data perlu pemeriksaan", risk: "Tinggi" },
                { type: "Plat tidak jelas", count: "7 data perlu cek ulang", risk: "Sedang" },
                { type: "Area berhenti", count: "4 data perlu verifikasi", risk: "Sedang" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <p className="text-sm font-medium text-[#0B1F3A]">{item.type}</p>
                    <p className="text-sm font-normal text-slate-600">{item.count}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={item.risk} className="text-[10px] px-2 py-0.5" />
                    <span className="text-xs font-medium text-slate-400">Prioritas {item.risk}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Timeline / Activity Flow */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
            <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Alur Aktivitas Risiko (Hari Ini)</h2>
            <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 pb-4">
              {[
                { time: "08:00", risk: "Rendah", color: "bg-slate-300", note: "Data masuk normal. Volume kendaraan lancar." },
                { time: "09:00", risk: "Sedang", color: "bg-amber-400", note: "Volume mulai naik di beberapa persimpangan utama." },
                { time: "10:00", risk: "Sedang", color: "bg-amber-400", note: "Indikasi pelanggaran kasat mata mulai bermunculan." },
                { time: "11:00", risk: "Tinggi", color: "bg-red-500", note: "Validasi pelanggaran dan plat perlu diprioritaskan segera." },
                { time: "12:00", risk: "Tinggi", color: "bg-red-500", note: "Antisipasi lonjakan kepadatan puncak periode siang." },
              ].map((event, i) => (
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

        {/* 8 & 9. Review Notes and Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Officer Review Notes */}
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

          {/* Recommended Officer Actions */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
            <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Rekomendasi Tindakan Petugas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Validasi Risiko Tinggi", desc: "Selesaikan antrean prioritas.", link: "/officer/violation-monitoring" },
                { title: "Tinjau Plat Buram", desc: "Cek frame sample plat.", link: "/officer/vehicle-plate" },
                { title: "Konteks Visual AI", desc: "Cocokkan dengan deteksi AI.", link: "/officer/ai-detection" },
                { title: "Susun Pelaporan", desc: "Dokumentasi akhir harian.", link: "/officer/report" },
              ].map((action, i) => (
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

        {/* 10. Quick Navigation */}
        <section>
          <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Navigasi Operasional Lanjutan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Pusat Deteksi AI", href: "/officer/ai-detection", helper: "Lihat hasil analisis visual" },
              { label: "Monitoring Pelanggaran", href: "/officer/violation-monitoring", helper: "Lihat tren real-time" },
              { label: "Plate Monitoring", href: "/officer/vehicle-plate", helper: "Pantau indikasi administrasi" },
              { label: "Buat Laporan", href: "/officer/report", helper: "Unduh evaluasi harian" },
            ].map((action, i) => (
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

      </div>
    </OfficerPageShell>
  );
}
