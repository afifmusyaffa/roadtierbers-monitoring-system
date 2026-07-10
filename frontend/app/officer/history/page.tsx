'use client';
import { useEffect, useState } from "react";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import {
  FilterSummaryBar,
  MainHistoryTable
} from "@/components/officer/history/history-components";
import { OfficerPageHeader } from "@/components/officer/officer-page-header";
import { OfficerDisclaimer } from "@/components/officer/officer-disclaimer";
import { KpiCard } from "@/components/officer/kpi-card";

export default function OfficerHistoryPage() {
  const [data, setData] = useState<{ historyRows: any[], total_records: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua data");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchData(isSilent = false) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? (window.location.protocol === "https:" ? `https://${window.location.host}/api` : `http://${window.location.hostname}:8001`) : "http://127.0.0.1:8000");
        const res = await fetch(`${apiUrl}/history/list`);
        const json = await res.json();
        if (json.status === "success") {
          setData(json.data);
          setLastUpdated(new Date());
          setError("");
        } else if (!isSilent) {
          setError(json.message || "Gagal mengambil data riwayat");
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
    const interval = setInterval(() => fetchData(true), 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <OfficerPageShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-medium animate-pulse">Mengambil Riwayat AI...</p>
          </div>
        </div>
      </OfficerPageShell>
    );
  }

  if (error || !data) {
    return (
      <OfficerPageShell>
        <div className="flex items-center justify-center min-h-[60vh] text-red-500">
          <p>{error || "Data riwayat kosong"}</p>
        </div>
      </OfficerPageShell>
    );
  }

  const { historyRows, total_records } = data;
  
  // Calculate dynamic KPIs from the fetched rows
  const validationNeeded = historyRows.filter(r => r.val.toLowerCase().includes("perlu validasi")).length;
  const highRisk = historyRows.filter(r => r.risk === "Tinggi").length;

  const filteredRows = historyRows.filter(row => {
    if (activeFilter === "Semua data") return true;
    if (activeFilter === "Risiko tinggi") return row.risk === "Tinggi";
    if (activeFilter === "Perlu validasi") return row.val.toLowerCase() === "perlu validasi";
    if (activeFilter === "Pelanggaran") return row.cat.includes("Pelanggaran");
    if (activeFilter === "Plat") return row.cat.includes("Plat");
    if (activeFilter === "Forecasting") return row.cat === "Forecasting";
    return true;
  });

  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        
        <OfficerPageHeader
          title="Riwayat Deteksi Petugas"
          description="Daftar riwayat deteksi dari sample pemantauan untuk membantu petugas meninjau status risiko, validasi, dan tindak lanjut."
          badge={{ label: "Detection History", tone: "blue" }}
          lastUpdated={lastUpdated}
          compact
        />

        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="Total Riwayat"
              value={`${total_records}`}
              unit="Data"
              tone="blue"
              helper="Aktivitas sistem AI"
            />
            <KpiCard
              title="Risiko Tinggi"
              value={`${highRisk}`}
              unit="Data"
              tone="red"
              helper="Perlu diprioritaskan"
            />
            <KpiCard
              title="Perlu Validasi"
              value={`${validationNeeded}`}
              unit="Data"
              tone="amber"
              helper="Belum ditinjau"
            />
            <KpiCard
              title="Sudah Ditinjau"
              value={`${total_records - validationNeeded}`}
              unit="Data"
              tone="emerald"
              helper="Selesai diproses"
            />
          </div>
        </section>

        <FilterSummaryBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        
        <MainHistoryTable rows={filteredRows} />
        
        <OfficerDisclaimer />
        
      </div>
    </OfficerPageShell>
  );
}
