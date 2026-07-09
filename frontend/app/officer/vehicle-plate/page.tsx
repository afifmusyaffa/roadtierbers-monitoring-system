"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { StatusBadge } from "@/components/common";
import { VehicleTrendChart, PlateStatusChart } from "@/components/charts/officer-vehicle-charts";

export default function OfficerVehiclePlatePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${apiUrl}/vehicles/summary`);
        const json = await res.json();
        if (json.status === "success") {
          setData(json.data);
        } else {
          setError(json.message || "Gagal mengambil data dari server");
        }
      } catch (err) {
        setError("Koneksi ke backend gagal. Pastikan FastAPI berjalan di http://127.0.0.1:8000");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
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

  // Breakdowns
  const platValidCount = data.plate_status_data.find((c: any) => c.name === "Valid")?.count || 0;
  const platTidakJelasCount = data.plate_status_data.find((c: any) => c.name === "Tidak jelas")?.count || 0;
  const adminBermasalahCount = data.plate_status_data.find((c: any) => c.name === "Perlu periksa adm")?.count || 0;

  // Latest mock items for visual preview based on actual first rows
  const latestPlate1 = data.plates_list[0]?.plate || "BM ****";
  const latestPlateType1 = data.plates_list[0]?.type || "Motor";
  const latestPlate2 = data.plates_list[1]?.plate || "BM ****";
  const latestPlateType2 = data.plates_list[1]?.type || "Mobil";

  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        
        {/* 1. Monitoring Header Bar */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-teal-200 bg-teal-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-teal-700">
              Vehicle & Plate Monitoring
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">
              Monitoring Kendaraan dan Plat
            </h1>
            <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
              Pantauan kendaraan, pembacaan plat tersamarkan, dan status administrasi simulasi untuk membantu petugas menentukan tindak lanjut.
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
              <span className="text-slate-400">Data:</span> Plat tersamarkan
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Validasi:</span> Perlu pemeriksaan petugas
            </p>
          </div>
        </section>

        {/* 2. Vehicle & Plate Status Summary */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-teal-500/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              <div className="flex flex-col space-y-2 md:pr-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Kendaraan Terpantau</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-[#0B1F3A]">{data.total_vehicles} kendaraan</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Jumlah kendaraan dari database hari ini.
                </p>
              </div>
              
              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Plat Terbaca</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-[#0B1F3A]">{data.total_plates} plat</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Plat yang berhasil terbaca oleh sistem dalam sample database.
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Perlu Validasi</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-amber-600">{data.perlu_validasi} data</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Data yang perlu diperiksa kembali oleh petugas secara manual.
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:pl-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Indikasi Bermasalah</p>
                <div className="flex items-center pt-1 pb-2">
                  <StatusBadge status={adminBermasalahCount > 5 ? "Tinggi" : "Sedang"} className="px-4 py-1.5 text-sm" />
                  <span className="text-2xl font-medium text-red-600 ml-3">{adminBermasalahCount} data</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Status administrasi simulasi perlu diperhatikan.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. KPI Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Motor Terpantau", value: data.motor_count, unit: "Kendaraan", color: "text-[#1D4ED8]", helper: "Roda dua melintas hari ini." },
              { label: "Mobil Terpantau", value: data.mobil_count, unit: "Kendaraan", color: "text-blue-600", helper: "Roda empat+ melintas hari ini." },
              { label: "Plat Valid", value: platValidCount, unit: "Data", color: "text-teal-600", helper: "Pembacaan sistem jelas." },
              { label: "Plat Tidak Jelas", value: platTidakJelasCount, unit: "Data", color: "text-amber-600", helper: "Buram atau tertutup objek lain." },
              { label: "Administrasi Aktif", value: platValidCount, unit: "Data", color: "text-green-600", helper: "Status pajak & plat berlaku." },
              { label: "Administrasi Perlu Pemeriksaan", value: adminBermasalahCount, unit: "Data", color: "text-red-600", helper: "Potensi pajak mati atau plat palsu." },
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

        {/* 4. Charts Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Tren Kendaraan Terpantau</h3>
              <VehicleTrendChart data={data.trend_data} />
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Jumlah kendaraan terpantau konsisten meningkat menuju siang. Antisipasi kepadatan di persimpangan utama.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Status Pembacaan Plat</h3>
              <PlateStatusChart data={data.plate_status_data} />
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Petugas perlu memperhatikan data plat yang tidak jelas dan membutuhkan validasi visual secara manual.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Plate Reading Workspace */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col lg:flex-row gap-8">
            
            {/* Visual Plate Preview (CSS) */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Preview Pembacaan (Tersamarkan)</h2>
              <div className="relative w-full aspect-video bg-slate-100 rounded-xl border border-slate-200 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#e2e8f0_0%,#cbd5e1_100%)] opacity-30" />
                
                {/* Simulated Road */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-full border-x-2 border-dashed border-white/80 transform perspective-[800px] rotateX-[65deg]" />
                
                {/* Motor Bbox */}
                <div className="absolute top-[35%] left-[25%] w-[18%] h-[35%] border-2 border-blue-500 bg-blue-500/10 rounded-sm">
                  <div className="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] font-medium px-1.5 py-0.5 whitespace-nowrap">
                    {latestPlateType1}
                  </div>
                  {/* Plate Bbox */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-1/4 border-2 border-green-500 bg-white/90 rounded flex items-center justify-center">
                    <span className="text-[10px] font-medium text-slate-800 tracking-wider">{latestPlate1}</span>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-medium px-1.5 py-0.5 whitespace-nowrap rounded">
                    Plat terbaca
                  </div>
                </div>

                {/* Mobil Bbox */}
                <div className="absolute top-[45%] left-[60%] w-[28%] h-[30%] border-2 border-blue-500 bg-blue-500/10 rounded-sm">
                  <div className="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] font-medium px-1.5 py-0.5 whitespace-nowrap">
                    {latestPlateType2}
                  </div>
                  {/* Plate Bbox (Needs validation) */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1/2 h-1/4 border-2 border-amber-500 bg-white/90 rounded flex items-center justify-center">
                    <span className="text-[10px] font-medium text-slate-800 tracking-wider">{latestPlate2}</span>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-medium px-1.5 py-0.5 whitespace-nowrap rounded">
                    Perlu validasi
                  </div>
                </div>
              </div>
            </div>

            {/* Current Reading Summary */}
            <div className="w-full lg:w-1/3 flex flex-col justify-center">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 h-full flex flex-col justify-center space-y-4">
                <h3 className="text-base font-medium text-[#0B1F3A] mb-2 border-b border-slate-200 pb-2">Rangkuman Kamera</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase">Sumber</p>
                    <p className="text-sm font-medium text-[#0B1F3A]">Kamera Simpang SKA</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase">Waktu Sample</p>
                    <p className="text-sm font-medium text-[#0B1F3A]">Terbaru dari database</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase">Kualitas Pembacaan</p>
                    <p className="text-sm font-medium text-amber-600">Cukup jelas</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase">Status Validasi</p>
                    <p className="text-sm font-medium text-amber-600">Perlu pemeriksaan petugas</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <p className="text-sm font-normal text-slate-600 leading-relaxed">
                      Catatan: Beberapa plat masih perlu dicek ulang secara visual karena terpengaruh sudut kamera dan kondisi jalan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. Plate Monitoring Table */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col">
            <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Daftar Pantauan Plat (Tersamarkan)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Waktu</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Lokasi Sample</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Kendaraan</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Plat</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Status Baca</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Administrasi</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Risiko</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Catatan Petugas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.plates_list.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-sm font-medium text-slate-500">{row.time}</td>
                      <td className="p-4 text-sm font-medium text-[#0B1F3A]">{row.loc}</td>
                      <td className="p-4 text-sm font-normal text-slate-600">{row.type}</td>
                      <td className="p-4 text-sm font-medium text-slate-700 tracking-wider bg-slate-100/50 rounded">{row.plate}</td>
                      <td className="p-4 text-sm font-normal text-slate-600">{row.read}</td>
                      <td className="p-4 text-sm font-normal text-slate-600">{row.adm}</td>
                      <td className="p-4">
                        <StatusBadge status={row.risk} />
                      </td>
                      <td className="p-4 text-sm font-normal text-slate-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7. Area Priority Panel & 8. Validation Notice */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Area Priority Panel */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
            <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Prioritas Area</h2>
            <div className="space-y-4">
              {[
                { area: "Simpang SKA", risk: "Tinggi", note: "Banyak kendaraan dan validasi plat.", focus: "Validasi visual plat" },
                { area: "Harapan Raya", risk: "Tinggi", note: "Administrasi perlu pemeriksaan.", focus: "Periksa status pajak" },
                { area: "Panam (UNRI)", risk: "Sedang", note: "Kepadatan meningkat.", focus: "Pantau antrean kendaraan" },
                { area: "Jl. Sudirman", risk: "Sedang", note: "Beberapa plat tidak jelas.", focus: "Cek kualitas frame" },
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

          {/* Validation Notice & 9. Recommended Actions */}
          <div className="space-y-8 flex flex-col">
            
            {/* Validation Notice */}
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">!</span>
                Validasi Petugas Tetap Diperlukan
              </h2>
              <ul className="space-y-3 mt-2">
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Sistem membantu membaca plat dari sample pemantauan.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Plat ditampilkan dalam bentuk <strong>tersamarkan</strong> untuk menjaga keamanan data.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Status administrasi pada halaman ini merupakan simulasi prototype.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Petugas tetap perlu melakukan verifikasi sebelum tindak lanjut resmi.
                  </p>
                </li>
              </ul>
            </div>

            {/* Recommended Officer Actions */}
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col flex-1">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Rekomendasi Tindakan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Validasi Plat Buram", desc: "Periksa visual plat yang tidak jelas." },
                  { title: "Prioritaskan Administrasi", desc: "Cek data yang perlu pemeriksaan." },
                  { title: "Konteks Visual", desc: "Cocokkan pembacaan dengan kondisi asli.", link: "/officer/violation-monitoring" },
                  { title: "Buat Laporan", desc: "Jika data sudah terverifikasi valid.", link: "/officer/report" },
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

          </div>
        </section>

        {/* 10. Quick Navigation */}
        <section>
          <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Navigasi Operasional</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Monitoring Pelanggaran", href: "/officer/violation-monitoring", helper: "Lihat tren pelanggaran umum" },
              { label: "Pusat Deteksi AI", href: "/officer/ai-detection", helper: "Lihat hasil analisis visual AI" },
              { label: "Riwayat Deteksi", href: "/officer/history", helper: "Lihat log aktivitas sebelumnya" },
              { label: "Buat Laporan", href: "/officer/report", helper: "Unduh rekapitulasi data pantauan" },
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
