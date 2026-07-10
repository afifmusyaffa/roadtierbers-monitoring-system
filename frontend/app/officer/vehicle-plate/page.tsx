"use client";

import { useEffect, useState } from "react";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { OfficerDisclaimer } from "@/components/officer/officer-disclaimer";
import { StatusBadge } from "@/components/common";
import { VehicleTrendChart, PlateStatusChart } from "@/components/charts/officer-vehicle-charts";
import { apiUrl } from "@/lib/api";

export default function OfficerVehiclePlatePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData(isSilent = false) {
      try {
        const res = await fetch(apiUrl("/vehicles/summary"));
        const json = await res.json();
        if (json.status === "success") {
          setData(json.data);
          setError("");
        } else if (!isSilent) {
          setError(json.message || "Gagal mengambil data dari server");
        }
      } catch (err) {
        if (!isSilent) {
          setError("Koneksi ke backend gagal.");
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

  // Breakdowns
  const platValidCount = data.plate_status_data.find((c: any) => c.name === "Valid")?.count || 0;
  const platTidakJelasCount = data.plate_status_data.find((c: any) => c.name === "Tidak jelas")?.count || 0;
  const adminBermasalahCount = data.plate_status_data.find((c: any) => c.name === "Perlu periksa adm")?.count || 0;



  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        
        {/* 1. Monitoring Header Bar */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-teal-200 bg-teal-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-teal-700">
              Vehicle & Plate Monitoring
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">
              Monitoring Kendaraan dan Plat
            </h1>
            <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
              Pantauan kendaraan, pembacaan plat, dan status administrasi simulasi untuk membantu petugas menentukan tindak lanjut.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-right bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl shrink-0">
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Mode:</span> Data Real-time (API)
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Area:</span> Pekanbaru
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Data:</span> Plat ditampilkan penuh
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              <div className="flex flex-col space-y-2 md:pr-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Kendaraan Terpantau</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-[#0B1F3A]">{data.total_vehicles} kendaraan</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Jumlah kendaraan dari data pemantauan hari ini.
                </p>
              </div>
              
              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Plat Terbaca</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-[#0B1F3A]">{data.total_plates} plat</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Plat yang berhasil terbaca oleh sistem dalam pemantauan.
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
              { label: "Perlu Pemeriksaan", value: adminBermasalahCount, unit: "Data", color: "text-red-600", helper: "Potensi pajak mati atau plat palsu." },
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



        {/* 6. Plate Monitoring Table */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col">
            <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Daftar Pantauan Plat</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
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
                      <td className="p-4 text-sm font-bold text-slate-800 tracking-wider bg-slate-100/50 rounded">{row.plate}</td>
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

        <OfficerDisclaimer />

      </div>
    </OfficerPageShell>
  );
}
