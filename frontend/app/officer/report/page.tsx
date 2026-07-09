"use client";

import { useEffect, useState } from "react";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import {
  ReportHeaderBar,
  ReportStatusSummary,
  ReportKpiGrid,
  ReportControlPanel,
  ReportPreviewPanel,
  ReportDetailTable,
  ValidationChecklistPanel,
  ReportDisclaimerPanel,
  ReportQuickNavigation
} from "@/components/officer/report/report-components";

export default function OfficerReportPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${apiUrl}/reports/summary`);
        const json = await res.json();
        if (json.status === "success") {
          setData(json.data);
        } else {
          setError(json.message || "Gagal mengambil data laporan");
        }
      } catch (err) {
        setError("Koneksi ke backend gagal. Pastikan FastAPI berjalan di http://127.0.0.1:8000");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleExportCsv = () => {
    if (!data || !data.report_rows) return;

    // Generate CSV content
    const headers = ["Kategori", "Data Utama", "Jumlah", "Risiko", "Status Validasi", "Catatan Laporan"];
    const rows = data.report_rows.map((row: any) => [
      row.cat || "",
      row.res || "",
      row.count || "0",
      row.risk || "Rendah",
      row.val || "",
      row.note || ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r: any) => r.map((val: string) => `"${val}"`).join(","))
    ].join("\n");

    // Download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `roadtierbers_laporan_harian_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        <ReportHeaderBar data={data} />
        <ReportStatusSummary data={data} />
        <ReportKpiGrid kpis={data.kpi_list} />
        <ReportControlPanel onExportCsv={handleExportCsv} />
        <ReportPreviewPanel data={data} />
        <ReportDetailTable rows={data.report_rows} />
        <ValidationChecklistPanel />
        <ReportDisclaimerPanel />
        <ReportQuickNavigation />
      </div>
    </OfficerPageShell>
  );
}
