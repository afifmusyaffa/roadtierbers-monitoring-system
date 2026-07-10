"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { KpiCard } from "@/components/officer/kpi-card";
import { OfficerPageHeader } from "@/components/officer/officer-page-header";
import { OfficerDisclaimer } from "@/components/officer/officer-disclaimer";
import { StatusBadge } from "@/components/common";
import { apiUrl } from "@/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// ── Type definitions ────────────────────────────────────────────────────────

interface VolumeDataPoint {
  time: string;
  "Volume Kendaraan": number;
}

interface ViolationDataPoint {
  name: string;
  count: number;
  color: string;
}

interface DashboardData {
  total_detections_today: number;
  total_violations_today: number;
  total_vehicles: number;
  dominant_violation: string;
  volume_data: VolumeDataPoint[];
  violation_data: ViolationDataPoint[];
  system_status: string;
  traffic_condition: string;
  violation_risk: string;
}

// ── Small inline chart components with compact heights ──────────────────────

function CompactVolumeChart({ data }: { data: VolumeDataPoint[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-44 text-sm text-slate-400">
        Belum ada data volume.
      </div>
    );
  }
  return (
    <div className="w-full h-44">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 4, right: 16, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            dy={6}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgb(0 0 0 / 0.08)",
              padding: "10px 14px",
              fontSize: "13px",
            }}
            labelStyle={{ fontWeight: 600, color: "#0f172a" }}
          />
          <Line
            type="monotone"
            dataKey="Volume Kendaraan"
            stroke="#1d4ed8"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: "#1d4ed8", stroke: "#fff", strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CompactViolationChart({ data }: { data: ViolationDataPoint[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-36 text-sm text-slate-400">
        Belum ada data pelanggaran.
      </div>
    );
  }
  return (
    <div className="w-full h-36">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 16, left: 4, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            stroke="#e2e8f0"
          />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#334155", fontSize: 11, fontWeight: 500 }}
            width={90}
          />
          <Tooltip
            cursor={{ fill: "#f1f5f9" }}
            contentStyle={{
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              padding: "10px 14px",
              fontSize: "13px",
            }}
            formatter={(value) => [`${value} Kasus`, "Jumlah"]}
          />
          <Bar
            dataKey="count"
            radius={[0, 4, 4, 0]}
            isAnimationActive={false}
            barSize={22}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Status row item ─────────────────────────────────────────────────────────

function StatusItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </span>
      <StatusBadge status={value} />
    </div>
  );
}

// ── Recent detections table/card ────────────────────────────────────────────

interface HistoryRow {
  time: string;
  loc: string;
  cat: string;
  res: string;
  count: string;
  risk: string;
  val: string;
}

function RecentDetectionsDesktop({ rows }: { rows: HistoryRow[] }) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-slate-400 py-6 text-center">
        Belum ada data deteksi terbaru.
      </p>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            {["Waktu", "Kategori", "Hasil", "Jumlah", "Risiko", "Status"].map(
              (h) => (
                <th
                  key={h}
                  className="pb-2 pr-4 text-[11px] font-semibold uppercase tracking-widest text-slate-400 whitespace-nowrap"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {rows.slice(0, 5).map((row, i) => (
            <tr key={i} className="hover:bg-slate-50/60 transition-colors">
              <td className="py-2.5 pr-4 text-[12px] text-slate-500 whitespace-nowrap">
                {row.time}
              </td>
              <td className="py-2.5 pr-4 text-[12px] font-medium text-slate-700 whitespace-nowrap">
                {row.cat}
              </td>
              <td className="py-2.5 pr-4 text-[12px] text-slate-600 whitespace-nowrap">
                {row.res}
              </td>
              <td className="py-2.5 pr-4 text-[12px] text-slate-600">
                {row.count}
              </td>
              <td className="py-2.5 pr-4">
                <StatusBadge status={row.risk} />
              </td>
              <td className="py-2.5 text-[12px] text-slate-500">
                {row.val}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RecentDetectionsMobile({ rows }: { rows: HistoryRow[] }) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-slate-400 py-4 text-center">
        Belum ada data deteksi terbaru.
      </p>
    );
  }
  return (
    <div className="space-y-2">
      {rows.slice(0, 3).map((row, i) => (
        <div
          key={i}
          className="flex items-start justify-between gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
        >
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-slate-700 truncate">
              {row.cat}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {row.time} · {row.count}
            </p>
          </div>
          <StatusBadge status={row.risk} />
        </div>
      ))}
    </div>
  );
}

// ── Main Page Component ─────────────────────────────────────────────────────

export default function OfficerDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [recentRows, setRecentRows] = useState<HistoryRow[]>([]);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch(apiUrl("/history/list?limit=5"));
      const json = await res.json();
      if (json.status === "success" && Array.isArray(json.data?.historyRows)) {
        setRecentRows(json.data.historyRows.slice(0, 5));
      }
    } catch {
      // Non-critical — don't block dashboard on history failure
    }
  }, []);

  useEffect(() => {
    async function fetchDashboard(isSilent = false) {
      try {
        const res = await fetch(apiUrl("/dashboard/summary"));
        const json = await res.json();
        if (json.status === "success") {
          setData(json.data);
          setError("");
          setLastUpdated(
            new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          );
        } else if (!isSilent) {
          setError(json.message || "Gagal mengambil data dari server.");
        }
      } catch {
        if (!isSilent) {
          setError("Koneksi ke backend gagal.");
        }
      } finally {
        if (!isSilent) {
          setLoading(false);
        }
      }
    }

    fetchDashboard(false);
    fetchHistory();
    const interval = setInterval(() => fetchDashboard(true), 5000);
    return () => clearInterval(interval);
  }, [fetchHistory]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <OfficerPageShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-7 h-7 border-4 border-[#1D4ED8] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-400 animate-pulse">
              Menghubungkan ke server…
            </p>
          </div>
        </div>
      </OfficerPageShell>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error || !data) {
    return (
      <OfficerPageShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <p className="text-sm font-medium text-red-600">
              {error || "Data tidak tersedia."}
            </p>
            <p className="text-xs text-slate-400">
              Pastikan backend FastAPI berjalan di port 8000.
            </p>
          </div>
        </div>
      </OfficerPageShell>
    );
  }

  const lastUpdatedLabel = lastUpdated
    ? `Diperbarui ${lastUpdated}`
    : undefined;

  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-5 pb-10">

        {/* ── Page Header ─────────────────────────────────────────────── */}
        <OfficerPageHeader
          title="Dashboard Monitoring"
          badge={{ label: "Operasional", tone: "blue" }}
          lastUpdated={lastUpdatedLabel}
          description="Pantauan KPI real-time lalu lintas dan pelanggaran hari ini."
          compact
        />

        {/* ── Row 1: 4 Primary KPI Cards ──────────────────────────────── */}
        <section
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          aria-label="KPI Utama"
        >
          <KpiCard
            title="Total Deteksi"
            value={data.total_detections_today.toLocaleString("id-ID")}
            helper="Analisis CCTV hari ini"
            tone="blue"
            unit="kali"
          />
          <KpiCard
            title="Total Pelanggaran"
            value={data.total_violations_today.toLocaleString("id-ID")}
            helper="Kasus terkonfirmasi"
            tone="red"
            unit="kasus"
            href="/officer/violation-monitoring"
          />
          <KpiCard
            title="Kendaraan Terpantau"
            value={data.total_vehicles.toLocaleString("id-ID")}
            helper="Volume terdeteksi hari ini"
            tone="cyan"
            unit="unit"
          />
          <KpiCard
            title="Pelanggaran Dominan"
            value={data.dominant_violation || "—"}
            helper="Jenis paling sering"
            tone="amber"
            isText
          />
        </section>

        {/* ── Row 2: Status strip ─────────────────────────────────────── */}
        <section
          className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 rounded-xl bg-white border border-slate-100 shadow-sm"
          aria-label="Status Operasional"
        >
          <StatusItem label="Sistem" value={data.system_status} />
          <span className="hidden sm:block w-px h-4 bg-slate-200" />
          <StatusItem label="Kondisi Lalu Lintas" value={data.traffic_condition} />
          <span className="hidden sm:block w-px h-4 bg-slate-200" />
          <StatusItem label="Risiko Pelanggaran" value={data.violation_risk} />
          <span className="hidden sm:block w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Area
            </span>
            <span className="text-[12px] font-medium text-slate-600">
              Simpang SKA, Pekanbaru
            </span>
          </div>
        </section>

        {/* ── Row 3: Charts (2/3) + Side Panel (1/3) ─────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Charts column */}
          <div className="lg:col-span-2 space-y-4">

            {/* Traffic volume chart */}
            <div className="rounded-xl bg-white border border-slate-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-[#0B1F3A]">
                  Tren Volume Kendaraan
                </h2>
                <span className="text-[11px] text-slate-400">Per jam hari ini</span>
              </div>
              <CompactVolumeChart data={data.volume_data} />
            </div>

            {/* Violation distribution chart */}
            <div className="rounded-xl bg-white border border-slate-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-[#0B1F3A]">
                  Komposisi Pelanggaran
                </h2>
                <Link
                  href="/officer/violation-monitoring"
                  className="text-[11px] text-[#1D4ED8] hover:underline"
                >
                  Detail →
                </Link>
              </div>
              <CompactViolationChart data={data.violation_data} />
            </div>
          </div>

          {/* Side panel column */}
          <div className="lg:col-span-1 space-y-4">

            {/* Area priority */}
            <div className="rounded-xl bg-white border border-slate-100 shadow-sm p-4">
              <h2 className="text-sm font-semibold text-[#0B1F3A] mb-3">
                Prioritas Area Pantauan
              </h2>
              <div className="space-y-2">
                {[
                  {
                    area: "Kamera Utama (Tengah)",
                    status: data.traffic_condition,
                  },
                  { area: "Kamera Utara (Jl. Tuanku Tambusai)", status: "Lancar" },
                  { area: "Kamera Selatan (Jl. Soekarno Hatta)", status: "Lancar" },
                  { area: "Kamera Timur (Arah Sudirman)", status: "Lancar" },
                ].map((loc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 py-1.5 border-b border-slate-50 last:border-0"
                  >
                    <p className="text-[12px] text-slate-600 leading-tight min-w-0 truncate">
                      {loc.area}
                    </p>
                    <StatusBadge status={loc.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Operational focus */}
            <div className="rounded-xl bg-[#0B1F3A] border border-[#142d52] shadow-sm p-4">
              <h2 className="text-sm font-semibold text-white mb-3">
                Fokus Operasional
              </h2>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <p className="text-[12px] text-blue-200/80 leading-snug">
                    Pantau dominasi{" "}
                    <span className="text-white font-medium">
                      {data.dominant_violation}
                    </span>{" "}
                    hari ini.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <p className="text-[12px] text-blue-200/80 leading-snug">
                    Validasi visual riwayat deteksi terbaru.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <p className="text-[12px] text-blue-200/80 leading-snug">
                    Cek forecasting untuk antisipasi jam padat.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex gap-2 flex-wrap">
                <Link
                  href="/officer/ai-detection"
                  className="text-[11px] font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  Buka Deteksi AI →
                </Link>
                <Link
                  href="/officer/forecasting"
                  className="text-[11px] font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  Forecasting →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Row 4: Recent Detections ─────────────────────────────────── */}
        <section className="rounded-xl bg-white border border-slate-100 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#0B1F3A]">
              Deteksi Terbaru
            </h2>
            <Link
              href="/officer/history"
              className="text-[11px] text-[#1D4ED8] hover:underline"
            >
              Lihat semua →
            </Link>
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block">
            <RecentDetectionsDesktop rows={recentRows} />
          </div>

          {/* Mobile card stack */}
          <div className="sm:hidden">
            <RecentDetectionsMobile rows={recentRows} />
          </div>
        </section>

        {/* ── Disclaimer ───────────────────────────────────────────────── */}
        <OfficerDisclaimer />
      </div>
    </OfficerPageShell>
  );
}
