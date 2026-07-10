"use client";

import { useEffect, useState } from "react";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { OfficerPageHeader } from "@/components/officer/officer-page-header";
import { OfficerDisclaimer } from "@/components/officer/officer-disclaimer";
import { KpiCard } from "@/components/officer/kpi-card";
import { StatusBadge } from "@/components/common";
import { VehicleTrendChart, PlateStatusChart } from "@/components/charts/officer-vehicle-charts";
import { apiUrl } from "@/lib/api";

export default function OfficerVehiclePlatePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchData(isSilent = false) {
      try {
        const res = await fetch(apiUrl("/vehicles/summary"));
        const json = await res.json();
        if (json.status === "success") {
          setData(json.data);
          setError("");
          setLastUpdated(new Date());
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
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        
        <OfficerPageHeader
          title="Monitoring Kendaraan dan Plat"
          description="Pantauan kendaraan, pembacaan plat, dan status administrasi simulasi untuk membantu petugas menentukan tindak lanjut."
          badge={{ label: "Vehicle & Plate", tone: "blue" }}
          lastUpdated={lastUpdated}
          compact
        />

        {/* 2. KPI Grid */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="Kendaraan Terpantau"
              value={`${data.total_vehicles}`}
              tone="blue"
              helper="Total kendaraan hari ini"
            />
            <KpiCard
              title="Plat Terbaca"
              value={`${data.total_plates}`}
              tone="emerald"
              helper="Plat berhasil teridentifikasi"
            />
            <KpiCard
              title="Perlu Validasi"
              value={`${platTidakJelasCount}`}
              tone="amber"
              helper="Pembacaan plat buram/tertutup"
            />
            <KpiCard
              title="Indikasi Bermasalah"
              value={`${adminBermasalahCount}`}
              tone="red"
              helper="Status administrasi simulasi"
            />
          </div>
          <p className="text-[11px] text-slate-500 text-right mt-2 italic">
            * Data administrasi pajak merupakan indikasi/simulasi sistem pendukung.
          </p>
        </section>

        {/* 3. Charts Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col h-full">
              <h3 className="text-sm font-medium text-[#0B1F3A] mb-4">Tren Kendaraan Terpantau</h3>
              <div className="h-44">
                <VehicleTrendChart data={data.trend_data} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col h-full">
              <h3 className="text-sm font-medium text-[#0B1F3A] mb-4">Status Pembacaan Plat</h3>
              <div className="h-44">
                <PlateStatusChart data={data.plate_status_data} />
              </div>
            </div>
          </div>
        </section>



        {/* 4. Plate Monitoring Table */}
        <section>
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
            <h2 className="text-sm font-medium text-[#0B1F3A] mb-4">Daftar Pantauan Plat</h2>
            
            {/* Mobile View: Cards */}
            <div className="grid grid-cols-1 gap-3 md:hidden">
              {data.plates_list.slice(0, 4).map((row: any, i: number) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-slate-500">{row.time}</span>
                    <StatusBadge status={row.risk} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 tracking-wider mb-1">{row.plate}</p>
                    <p className="text-xs text-slate-600">{row.type} - {row.loc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Baca:</span>
                      <span className="text-xs font-medium text-slate-700">{row.read}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Adm:</span>
                      <span className="text-xs font-medium text-amber-600">{row.adm}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
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
                  {data.plates_list.slice(0, 8).map((row: any, i: number) => (
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
