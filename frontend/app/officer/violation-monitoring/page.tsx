"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { StatusBadge } from "@/components/common";
import { ViolationTrendChart, ViolationCompositionChart } from "@/components/charts/officer-violation-charts";

export default function OfficerViolationMonitoringPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData(isSilent = false) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${apiUrl}/violations/summary`);
        const json = await res.json();
        if (json.status === "success") {
          setData(json.data);
          setError("");
        } else if (!isSilent) {
          setError(json.message || "Gagal mengambil data dari server");
        }
      } catch (err) {
        if (!isSilent) {
          setError("Koneksi ke backend gagal. Pastikan FastAPI berjalan di http://127.0.0.1:8000");
        }
      } finally {
        if (!isSilent) {
          setLoading(false);
        }
      }
    }
    fetchData(false);
    const interval = setInterval(() => fetchData(true), 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <OfficerPageShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-medium animate-pulse">Menghubungkan ke server AI...</p>
          </div>
        </div>
      </OfficerPageShell>
    );
  }

  if (error || !data) {
    return (
      <OfficerPageShell>
        <div className="flex items-center justify-center min-h-[60vh] text-red-500">
          <p>{error || "Data kosong"}</p>
        </div>
      </OfficerPageShell>
    );
  }

  const helmCount = data.composition_data.find((c: any) => c.name === "Tanpa helm")?.count || 0;
  const boncengCount = data.composition_data.find((c: any) => c.name === "Bonceng >2")?.count || 0;
  const platPajakCount = data.composition_data.find((c: any) => c.name === "Plat/Pajak Mati")?.count || 0;

  const dominantViolation = helmCount >= boncengCount ? "Tanpa Helm" : "Bonceng >2";

  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        
        {/* 1. Monitoring Header Bar */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-red-200 bg-red-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-red-700">
              Violation Monitoring
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">
              Monitoring Pelanggaran
            </h1>
            <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
              Pantauan pelanggaran lalu lintas dari sample pemantauan untuk membantu petugas membaca risiko dan menentukan tindak lanjut.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-right bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Mode:</span> Data Real-time (API)
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Area:</span> Pekanbaru
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Validasi:</span> Perlu pemeriksaan petugas
            </p>
          </div>
        </section>

        {/* 2. Violation Status Summary */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-red-500/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              <div className="flex flex-col space-y-2 md:pr-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Total Pelanggaran</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-[#0B1F3A]">{data.total_violations_today} Kasus</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Jumlah indikasi pelanggaran dari database hari ini.
                </p>
              </div>
              
              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Risiko Dominan</p>
                <div className="flex items-center pt-1 pb-2">
                  <StatusBadge status={data.total_violations_today > 30 ? "Tinggi" : "Sedang"} className="px-4 py-1.5 text-sm" />
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Beberapa kategori perlu diprioritaskan petugas.
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:pl-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Pelanggaran Terbanyak</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-[#0B1F3A]">{dominantViolation}</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Kategori ini paling sering muncul dalam sample database.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. KPI Monitoring Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Tanpa Helm", value: helmCount, unit: "Kasus", color: "text-amber-600", helper: "Mendominasi pelanggaran hari ini." },
              { label: "Bonceng Lebih Dari 2", value: boncengCount, unit: "Kasus", color: "text-teal-600", helper: "Mulai meningkat siang ini." },
              { label: "Plat/Pajak Mati", value: platPajakCount, unit: "Kasus", color: "text-[#1D4ED8]", helper: "Terdeteksi dari pemindaian ANPR." },
              { label: "Kasus Perlu Validasi", value: data.kasus_perlu_validasi, unit: "Kasus", color: "text-slate-700", helper: "Tunggu konfirmasi petugas." },
              { label: "Area Risiko Tinggi", value: data.area_risiko_tinggi, unit: "Area", color: "text-red-600", helper: "Titik pantau Simpang SKA." },
            ].map((kpi, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col justify-between">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">{kpi.label}</p>
                <div className="mb-4">
                  <span className={`text-4xl font-medium ${kpi.color} tracking-tight`}>
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

        {/* 4. Charts Section & Area Priority Panel */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Charts (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Grafik Pelanggaran</h2>
              
              <div className="space-y-10">
                <div>
                  <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Tren Pelanggaran per Jam</h3>
                  <ViolationTrendChart data={data.trend_data} />
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-normal text-slate-700 leading-relaxed">
                      Indikasi pelanggaran meningkat menuju siang. Petugas perlu memprioritaskan validasi pada jam padat.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Komposisi Jenis Pelanggaran</h3>
                  <ViolationCompositionChart data={data.composition_data} />
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-normal text-slate-700 leading-relaxed">
                      Tanpa helm mendominasi total indikasi pelanggaran. Area rawan seperti Simpang SKA perlu diawasi khusus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Area Priority Panel (Right Column) */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col h-full">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Prioritas Area</h2>
              <div className="space-y-4">
                {[
                  { area: "Simpang SKA (Utara)", risk: "Tinggi", note: "Tanpa helm dominan pada lajur kiri.", focus: "Fokus edukasi helm" },
                  { area: "Simpang SKA (Barat)", risk: "Sedang", note: "Kepadatan antrean lajur lambat dekat mall.", focus: "Pantau antrean" },
                  { area: "Simpang SKA (Selatan)", risk: "Sedang", note: "Boncengan lebih dari 2 orang meningkat.", focus: "Teguran visual" },
                ].map((loc, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-[#0B1F3A]">{loc.area}</p>
                      <StatusBadge status={loc.risk} />
                    </div>
                    <p className="text-sm font-normal text-slate-600 mb-2">{loc.note}</p>
                    <p className="text-xs font-medium text-blue-600">↳ {loc.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Violation Case Table */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col">
            <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Daftar Indikasi Kasus</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Waktu</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Lokasi Sample</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Jenis Pelanggaran</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Jumlah</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Risiko</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Status Validasi</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Catatan Petugas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.cases_list.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-sm font-medium text-slate-500">{row.time}</td>
                      <td className="p-4 text-sm font-medium text-[#0B1F3A]">{row.loc}</td>
                      <td className="p-4 text-sm font-normal text-slate-600">{row.type}</td>
                      <td className="p-4 text-sm font-normal text-slate-600">{row.count}</td>
                      <td className="p-4">
                        <StatusBadge status={row.risk} />
                      </td>
                      <td className="p-4 text-sm font-medium text-amber-600">{row.val}</td>
                      <td className="p-4 text-sm font-normal text-slate-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7 & 8. Validation Notice and Recommended Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Validation Notice */}
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm flex flex-col">
            <h2 className="text-base font-medium text-[#0B1F3A] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">!</span>
              Validasi Petugas Tetap Diperlukan
            </h2>
            <ul className="space-y-3 mt-2">
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1 text-[10px]">■</span>
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Sistem membantu mengelompokkan indikasi pelanggaran dari sample pemantauan.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1 text-[10px]">■</span>
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Petugas perlu memeriksa ulang konteks visual untuk konfirmasi akhir.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1 text-[10px]">■</span>
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Hasil belum menjadi keputusan resmi tanpa verifikasi petugas.
                </p>
              </li>
            </ul>
          </div>

          {/* Recommended Actions */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
            <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Rekomendasi Tindakan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Validasi Kasus Tanpa Helm", desc: "Prioritaskan kategori dominan hari ini." },
                { title: "Pantau Simpang SKA", desc: "Area dengan indikasi risiko tertinggi saat ini." },
                { title: "Cek Plate Monitoring", desc: "Arahkan pelanggaran plat/pajak ke modul spesifik.", link: "/officer/vehicle-plate" },
                { title: "Siapkan Laporan", desc: "Rekap data pelanggaran yang sudah tervalidasi.", link: "/officer/report" },
              ].map((action, i) => (
                <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
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

        {/* 9. Quick Navigation */}
        <section>
          <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Navigasi Operasional</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Pusat Deteksi AI", href: "/officer/ai-detection", helper: "Lihat hasil analisis deteksi visual" },
              { label: "Plate Monitoring", href: "/officer/vehicle-plate", helper: "Pantau indikasi pajak bermasalah" },
              { label: "Riwayat Deteksi", href: "/officer/history", helper: "Lihat log aktivitas sebelumnya" },
              { label: "Buat Laporan", href: "/officer/report", helper: "Unduh rekapitulasi data" },
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
