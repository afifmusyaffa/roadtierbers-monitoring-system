'use client';
import { useEffect, useState } from "react";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import {
  HistoryHeaderBar,
  HistoryStatusSummary,
  FilterSummaryBar,
  HistoryKpiGrid,
  MainHistoryTable,
  ValidationAndTimeline,
  NotesAndActions,
  QuickNavigation
} from "@/components/officer/history/history-components";

export default function OfficerHistoryPage() {
  const [data, setData] = useState<{ historyRows: any[], total_records: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua data");

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${apiUrl}/history/list`);
        const json = await res.json();
        if (json.status === "success") {
          setData(json.data);
        } else {
          setError(json.message || "Gagal mengambil data riwayat");
        }
      } catch (err) {
        setError("Koneksi ke backend gagal.");
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
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        <HistoryHeaderBar />
        <HistoryStatusSummary 
          total={total_records} 
          validationNeeded={validationNeeded} 
          highRisk={highRisk} 
        />
        <FilterSummaryBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <HistoryKpiGrid data={{ historyRows, total_records }} />
        <MainHistoryTable rows={filteredRows} />
        <ValidationAndTimeline />
        <NotesAndActions rows={filteredRows} />
        <QuickNavigation />
      </div>
    </OfficerPageShell>
  );
}
