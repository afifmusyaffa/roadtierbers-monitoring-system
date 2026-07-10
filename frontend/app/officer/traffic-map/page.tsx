"use client";

import React, { useEffect, useState } from "react";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import dynamic from 'next/dynamic';
import { globalAIDetectionState } from "@/app/officer/ai-detection/page";

const TrafficMap = dynamic(() => import('@/components/map/traffic-map'), { 
  ssr: false, 
  loading: () => <div className="h-[600px] w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-400">Memuat Peta...</div> 
});

export default function OfficerTrafficMapPage() {
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  
  // State for interactive slider
  const [sliderValue, setSliderValue] = useState(0);
  const [isManualMode, setIsManualMode] = useState(false);

  useEffect(() => {
    // Read the global state from AI detection periodically to allow real-time updates
    const interval = setInterval(() => {
      const results = globalAIDetectionState.results;
      if (results && results.data && results.data.detections) {
        if (results.data.detections.kendaraan?.data) {
          setTotalVehicles(results.data.detections.kendaraan.data.length);
        }
        setLastUpdate(new Date().toLocaleString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/\./g, ':'));
      }
    }, 1000); // Poll every second

    return () => clearInterval(interval);
  }, []);

  // Update slider automatically if not in manual mode
  useEffect(() => {
    if (!isManualMode) {
      if (lastUpdate) {
        const timePart = lastUpdate.split(' ')[1]; // assumes "DD/MM/YYYY HH:mm:ss"
        if (timePart) {
          const [h, m] = timePart.split(':');
          setSliderValue(parseInt(h) * 60 + parseInt(m));
        }
      } else {
        const now = new Date();
        setSliderValue(now.getHours() * 60 + now.getMinutes());
      }
    }
  }, [lastUpdate, isManualMode]);

  // Derived display time from slider value
  const displayHours = Math.floor(sliderValue / 60).toString().padStart(2, '0');
  const displayMinutes = (sliderValue % 60).toString().padStart(2, '0');
  const displayTime = `${displayHours}:${displayMinutes}`;


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
              Peta Arus Lalu Lintas (Live)
            </h1>
            <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
              Peta interaktif untuk memantau kepadatan lalu lintas secara real-time berdasarkan hasil deteksi AI terakhir Anda.
            </p>
          </div>
        </section>

        {/* Live Traffic Map */}
        <section>
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
            {/* Timeline Slider Section */}
            <div className="mb-6 space-y-4 border-b border-slate-100 pb-6">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                LIVE HEATMAP AREA PEKANBARU
              </h2>
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Pilih Jam Pantauan (Live Heatmap):</p>
                <p className="text-sm font-medium text-red-500">{displayTime}</p>
                
                <input 
                  type="range" 
                  min="0" 
                  max="1439" 
                  value={sliderValue} 
                  onChange={(e) => {
                    setIsManualMode(true);
                    setSliderValue(parseInt(e.target.value));
                  }}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
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
