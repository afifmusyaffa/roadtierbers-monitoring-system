"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const riskScoreData = [
  { area: "Simpang SKA", score: 88, color: "#ef4444" },
  { area: "Jl. Sudirman", score: 82, color: "#ef4444" },
  { area: "Harapan Raya", score: 67, color: "#f59e0b" },
  { area: "Panam (UNRI)", score: 61, color: "#f59e0b" },
];

const actionPriorityData = [
  { name: "Validasi tanpa helm", count: 14, color: "#1d4ed8" },
  { name: "Pantau area padat", count: 12, color: "#2563eb" },
  { name: "Cek plat perlu validasi", count: 7, color: "#3b82f6" },
  { name: "Siapkan laporan", count: 4, color: "#60a5fa" },
];

export function AreaRiskScoreChart({ data }: { data?: any[] }) {
  const chartData = data && data.length > 0 ? data : riskScoreData;
  return (
    <div className="w-full h-72 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="area" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            type="number"
            domain={[0, 100]}
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
          />
          <Tooltip 
            cursor={{ fill: "#f1f5f9" }}
            contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", padding: "12px" }}
            labelStyle={{ fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}
            itemStyle={{ fontWeight: 500, color: "#0f172a", fontSize: "14px" }}
            formatter={(value) => [`${value}`, "Skor Risiko"]}
          />
          <Bar dataKey="score" name="Skor Risiko" radius={[6, 6, 0, 0]} isAnimationActive={false} barSize={40}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || "#1d4ed8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ActionPriorityChart({ data }: { data?: any[] }) {
  const chartData = data && data.length > 0 ? data : actionPriorityData;
  return (
    <div className="w-full h-72 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
          <XAxis 
            type="number"
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
          />
          <YAxis 
            dataKey="name" 
            type="category"
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#0B1F3A", fontSize: 13, fontWeight: 500 }}
            width={160}
          />
          <Tooltip 
            cursor={{ fill: "#f1f5f9" }}
            contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", padding: "12px" }}
            labelStyle={{ fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}
            itemStyle={{ fontWeight: 500, color: "#0f172a", fontSize: "14px" }}
            formatter={(value) => [`${value} Kasus`, "Jumlah Prioritas"]}
          />
          <Bar dataKey="count" name="Jumlah Kasus" radius={[0, 6, 6, 0]} isAnimationActive={false} barSize={32}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || "#1d4ed8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
