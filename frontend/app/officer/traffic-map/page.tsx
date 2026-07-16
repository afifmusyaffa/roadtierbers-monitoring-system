"use client";

import React, { useEffect, useState } from "react";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import dynamic from 'next/dynamic';

const TrafficMap = dynamic(() => import('@/components/map/traffic-map'), { 
  ssr: false, 
  loading: () => <div className="h-[600px] w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-400">Memuat Peta...</div> 
});

export default function OfficerTrafficMapPage() {
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [congestionLabel, setCongestionLabel] = useState<string>("");
  
  // Slider starts at current time
  const [sliderValue, setSliderValue] = useState(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  });

  // Derived display time from slider value
  const displayHours = Math.floor(sliderValue / 60).toString().padStart(2, '0');
  const displayMinutes = (sliderValue % 60).toString().padStart(2, '0');
  const displayTime = `${displayHours}:${displayMinutes}`;

  // ALWAYS fetch forecasting data from Kelompok 9 model whenever displayTime changes
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? (window.location.protocol === "https:" ? `https://${window.location.host}/api` : `http://${window.location.hostname}:8001`) : "http://127.0.0.1:8001");
        const url = new URL(`${apiUrl}/forecasting/plan`);
        url.searchParams.append("origin", "Simpang SKA");
        url.searchParams.append("destination", "Bandara SSK II");
        url.searchParams.append("target_time", displayTime);
        
        const res = await fetch(url.toString());
        const json = await res.json();
        if (json.status === "success" && json.data) {
          const cat = (json.data.congestion_category || "").toLowerCase();
          setCongestionLabel(json.data.congestion_category || "Lancar");
          if (cat.includes("padat")) {
            setTotalVehicles(20);
          } else if (cat.includes("sedang")) {
            setTotalVehicles(10);
          } else {
            setTotalVehicles(2); // Lancar
          }
          setLastUpdate(displayTime);
        }
      } catch (e) {
        console.error("Failed to fetch forecast map data", e);
      }
    };
    
    const timeoutId = setTimeout(fetchForecast, 300);
    return () => clearTimeout(timeoutId);
  }, [displayTime]);

  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        {/* Header */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#1D4ED8]">
              Peta Pantauan
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">
              Peta Arus Lalu Lintas
            </h1>
            <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
              Peta interaktif kepadatan lalu lintas berdasarkan hasil prediksi model forecasting (Kelompok 9).
            </p>
          </div>
        </section>

        {/* Live Traffic Map */}
        <section>
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
            {/* Timeline Slider Section */}
            <div className="mb-6 space-y-4 border-b border-slate-100 pb-6">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                HEATMAP PREDIKSI AREA PEKANBARU
              </h2>
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Pilih Jam Prediksi Kepadatan:</p>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-bold text-red-500 tabular-nums">{displayTime}</p>
                  {congestionLabel && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      congestionLabel.toLowerCase().includes("padat") ? "bg-red-100 text-red-700" :
                      congestionLabel.toLowerCase().includes("sedang") ? "bg-yellow-100 text-yellow-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {congestionLabel}
                    </span>
                  )}
                </div>
                
                <input 
                  type="range" 
                  min="0" 
                  max="1439" 
                  value={sliderValue} 
                  onChange={(e) => {
                    setSliderValue(parseInt(e.target.value));
                  }}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:59</span>
                </div>
              </div>
            </div>

            <TrafficMap 
               totalVehicles={totalVehicles} 
               lastUpdate={lastUpdate} 
            />
          </div>
        </section>
      </div>
    </OfficerPageShell>
  );
}
