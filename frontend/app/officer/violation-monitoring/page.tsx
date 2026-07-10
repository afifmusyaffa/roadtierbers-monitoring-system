"use client";

import { useEffect, useState } from "react";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { OfficerPageHeader } from "@/components/officer/officer-page-header";
import { OfficerDisclaimer } from "@/components/officer/officer-disclaimer";
import { KpiCard } from "@/components/officer/kpi-card";
import { StatusBadge } from "@/components/common";
import { ViolationTrendChart, ViolationCompositionChart } from "@/components/charts/officer-violation-charts";
import { apiUrl } from "@/lib/api";

export default function OfficerViolationMonitoringPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchData(isSilent = false) {
      try {
        const res = await fetch(apiUrl("/violations/summary"));
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

  const helmCount = data.composition_data.find((c: any) => c.name === "Tanpa helm")?.count || 0;
  const boncengCount = data.composition_data.find((c: any) => c.name === "Bonceng >2")?.count || 0;
  const platPajakCount = data.composition_data.find((c: any) => c.name === "Plat/Pajak Mati")?.count || 0;

  const dominantViolation = helmCount >= boncengCount ? "Tanpa Helm" : "Bonceng >2";

  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        
        <OfficerPageHeader
          title="Monitoring Pelanggaran"
          description="Pantauan pelanggaran lalu lintas dari sample pemantauan untuk membantu petugas membaca risiko dan menentukan tindak lanjut."
          badge={{ label: "Violation Monitoring", tone: "red" }}
          lastUpdated={lastUpdated}
          compact
        />

        {/* 2. KPI Monitoring Grid */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <KpiCard
              title="Pelanggaran Hari Ini"
              value={`${data.total_violations_today} Kasus`}
              tone="red"
              helper="Total indikasi pelanggaran"
            />
            <KpiCard
              title="Kasus Perlu Validasi"
              value={`${data.kasus_perlu_validasi} Kasus`}
              tone="amber"
              helper="Pemeriksaan visual tertunda"
            />
            <KpiCard
              title="Area Risiko Tinggi"
              value={`${data.area_risiko_tinggi} Area`}
              tone="cyan"
              helper="Tingkat prioritas operasional"
              className="col-span-2 lg:col-span-1"
            />
          </div>
        </section>
        {/* 3. Charts Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col h-full">
              <h3 className="text-sm font-medium text-[#0B1F3A] mb-4">Tren Indikasi Pelanggaran</h3>
              <div className="h-44">
                <ViolationTrendChart data={data.trend_data} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col h-full">
              <h3 className="text-sm font-medium text-[#0B1F3A] mb-4">Komposisi Kasus (Hari Ini)</h3>
              <div className="h-44">
                <ViolationCompositionChart data={data.composition_data} />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Violation Case Table */}
        <section>
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
            <h2 className="text-sm font-medium text-[#0B1F3A] mb-4">Daftar Kasus Membutuhkan Validasi</h2>
            
            {/* Mobile View: Cards */}
            <div className="grid grid-cols-1 gap-3 md:hidden">
              {data.cases_list.slice(0, 5).map((row: any, i: number) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-slate-500">{row.time}</span>
                    <StatusBadge status={row.risk} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0B1F3A]">{row.type}</p>
                    <p className="text-xs text-slate-600">{row.loc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-xs font-medium text-amber-600">{row.val}</span>
                    <span className="text-xs font-medium text-slate-700">{row.count} kasus</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
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
                  {data.cases_list.slice(0, 10).map((row: any, i: number) => (
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

        <OfficerDisclaimer />

      </div>
    </OfficerPageShell>
  );
}
