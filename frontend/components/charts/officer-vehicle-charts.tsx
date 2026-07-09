"use client";

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
  Legend
} from "recharts";

const trendData = [
  { time: "08:00", "Kendaraan Terpantau": 42 },
  { time: "09:00", "Kendaraan Terpantau": 56 },
  { time: "10:00", "Kendaraan Terpantau": 68 },
  { time: "11:00", "Kendaraan Terpantau": 79 },
  { time: "12:00", "Kendaraan Terpantau": 86 },
];

const plateStatusData = [
  { name: "Valid", count: 69, color: "#10b981" },
  { name: "Tidak jelas", count: 7, color: "#f59e0b" },
  { name: "Perlu validasi", count: 12, color: "#f97316" },
  { name: "Perlu periksa adm", count: 5, color: "#ef4444" },
];

export function VehicleTrendChart({ data }: { data?: any[] }) {
  const chartData = data && data.length > 0 ? data : trendData;
  return (
    <div className="w-full h-72 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", padding: "12px" }}
            labelStyle={{ fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}
            itemStyle={{ fontWeight: 500, color: "#1d4ed8", fontSize: "14px" }}
          />
          <Legend 
            verticalAlign="top" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}
          />
          <Line 
            type="monotone" 
            dataKey="Kendaraan Terpantau" 
            stroke="#1d4ed8" 
            strokeWidth={4} 
            dot={{ r: 5, strokeWidth: 2, fill: "#ffffff", stroke: "#1d4ed8" }}
            activeDot={{ r: 8, fill: "#1d4ed8", stroke: "#ffffff", strokeWidth: 3 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PlateStatusChart({ data }: { data?: any[] }) {
  const chartData = data && data.length > 0 ? data : plateStatusData;
  return (
    <div className="w-full h-72 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
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
            width={130}
          />
          <Tooltip 
            cursor={{ fill: "#f1f5f9" }}
            contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", padding: "12px" }}
            labelStyle={{ fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}
            itemStyle={{ fontWeight: 500, color: "#0f172a", fontSize: "14px" }}
            formatter={(value) => [`${value} Data`, "Jumlah"]}
          />
          <Bar dataKey="count" name="Jumlah Data" radius={[0, 6, 6, 0]} isAnimationActive={false} barSize={32}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || "#1d4ed8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
