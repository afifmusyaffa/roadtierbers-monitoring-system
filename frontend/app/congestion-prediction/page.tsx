"use client";

import Link from "next/link";
import { useState } from "react";
import { PublicPageShell } from "@/components/layout/public-page-shell";

interface ForecastData {
  data_available?: boolean;
  message?: string;
  target_arrival?: string;
  departure_time?: string;
  delay_minutes?: number;
  total_travel_time?: number;
  risk_level?: string;
  congestion_category?: string;
}

export default function CongestionPredictionPage() {
  const [day, setDay] = useState("Hari ini");
  const [time, setTime] = useState("07:00");
  const [weather, setWeather] = useState("Tidak diketahui");
  const [temp, setTemp] = useState("");
  
  const [data, setData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRunPrediction, setHasRunPrediction] = useState(false);

  const fetchPlan = async () => {
    setHasRunPrediction(true);
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      
      const queryParams = new URLSearchParams({
        origin: "Simpang SKA",
        destination: "Bandara SSK II", // Fallback destination since route is just Simpang SKA for now
        time_mode: "berangkat",
        target_time: time
      });
      
      if (weather !== "Tidak diketahui") {
        queryParams.append("weather", weather);
      }
      
      if (temp) {
        queryParams.append("temp_c", temp);
      }
      
      const response = await fetch(`${apiUrl}/forecasting/plan?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error("Gagal mengambil data");
      }
      
      const res = await response.json();
      if (res.status === "success") {
        setData(res.data);
      } else {
        throw new Error(res.message || "Data tidak valid");
      }
    } catch (err) {
      console.error(err);
      setError("Koneksi server terputus");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = (category: string) => {
    const cat = category.toLowerCase();
    
    if (cat.includes("macet total") || cat.includes("macet")) {
      return {
        color: "text-red-700",
        bgStatus: "bg-red-50",
        borderColor: "border-red-200",
        leftBorder: "border-l-red-500",
        badgeBg: "bg-red-600",
        risk: "Risiko tinggi",
        description: "Kondisi jalan macet. Risiko penundaan tinggi.",
        rekomendasiUtama: "Tunda perjalanan sementara",
      };
    } else if (cat.includes("agak padat") || cat.includes("sedang")) {
      return {
        color: "text-amber-700",
        bgStatus: "bg-amber-50",
        borderColor: "border-amber-200",
        leftBorder: "border-l-amber-500",
        badgeBg: "bg-amber-500",
        risk: "Risiko sedang",
        description: "Kepadatan mulai terlihat. Risiko kemacetan berada di tingkat sedang.",
        rekomendasiUtama: "Berangkat dengan waktu tambahan",
      };
    } else if (cat.includes("padat")) {
      return {
        color: "text-red-700",
        bgStatus: "bg-red-50",
        borderColor: "border-red-200",
        leftBorder: "border-l-red-500",
        badgeBg: "bg-red-600",
        risk: "Risiko tinggi",
        description: "Arus jalan terpantau padat. Perjalanan berisiko terhambat.",
        rekomendasiUtama: "Tunda perjalanan sementara",
      };
    } else if (cat.includes("lancar")) {
      return {
        color: "text-teal-800",
        bgStatus: "bg-teal-50",
        borderColor: "border-teal-200",
        leftBorder: "border-l-teal-500",
        badgeBg: "bg-teal-600",
        risk: "Risiko rendah",
        description: "Kondisi jalan saat ini terpantau lancar. Risiko kemacetan masih rendah.",
        rekomendasiUtama: "Berangkat sekarang",
      };
    }
    
    return {
      color: "text-slate-700",
      bgStatus: "bg-slate-50",
      borderColor: "border-slate-200",
      leftBorder: "border-l-slate-400",
      badgeBg: "bg-slate-400",
      risk: "Belum tersedia",
      description: "Sistem menunggu data monitoring dari hasil deteksi.",
      rekomendasiUtama: "Rekomendasi belum tersedia",
    };
  };

  const categoryStr = data?.congestion_category ?? "Belum tersedia";
  const riskStr = data?.risk_level ?? "Belum tersedia";
  const delayMinutes = data?.delay_minutes;
  const hasData = data?.data_available === true;
  const targetTime = data?.target_arrival || data?.departure_time || "Belum tersedia";
  
  const statusInfo = getStatusInfo(categoryStr);
  const displayRisk = riskStr !== "Belum tersedia" ? riskStr : statusInfo.risk;

  return (
    <PublicPageShell>
      <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* 1. Header Area */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold text-[#0B1F3A] tracking-tight">Prediksi Kemacetan</h1>
              <p className="text-base text-slate-500 mt-2">Masukkan waktu, cuaca, dan suhu untuk melihat estimasi risiko kemacetan pada rute pemantauan.</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 font-medium">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Area</span>
                <span className="text-[#0B1F3A] font-semibold">Pekanbaru</span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Rute Utama</span>
                <span className="text-[#0B1F3A] font-semibold">Simpang SKA</span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Status</span>
                <span className="text-[#1D4ED8] font-bold">Mode evaluasi</span>
              </div>
            </div>
          </div>

          {/* 2. Prediction Input Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-2/3 p-6 sm:p-8">
              <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-6">Parameter Prediksi</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Rute</label>
                  <input type="text" readOnly value="Simpang SKA" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-none cursor-not-allowed" />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Hari prediksi</label>
                    <select value={day} onChange={(e) => setDay(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <option value="Hari ini">Hari ini</option>
                      <option value="Besok">Besok</option>
                      <option value="Senin">Senin</option>
                      <option value="Selasa">Selasa</option>
                      <option value="Rabu">Rabu</option>
                      <option value="Kamis">Kamis</option>
                      <option value="Jumat">Jumat</option>
                      <option value="Sabtu">Sabtu</option>
                      <option value="Minggu">Minggu</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Jam prediksi</label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Cuaca <span className="text-slate-400 font-normal normal-case tracking-normal">(opsional jika tidak diketahui)</span></label>
                    <select value={weather} onChange={(e) => setWeather(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <option value="Tidak diketahui">Tidak diketahui</option>
                      <option value="Cerah">Cerah</option>
                      <option value="Berawan">Berawan</option>
                      <option value="Hujan ringan">Hujan ringan</option>
                      <option value="Hujan sedang">Hujan sedang</option>
                      <option value="Hujan lebat">Hujan lebat</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Suhu (°C) <span className="text-slate-400 font-normal normal-case tracking-normal">(opsional jika tidak diketahui)</span></label>
                    <input type="number" placeholder="Contoh: 30" value={temp} onChange={(e) => setTemp(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button 
                    onClick={fetchPlan}
                    disabled={isLoading}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Memproses...</>
                    ) : (
                      "Prediksi Kemacetan"
                    )}
                  </button>
                  
                  <Link href="/traffic-overview" className="text-sm font-semibold text-slate-500 hover:text-[#1D4ED8] transition-colors">
                    Kembali ke pantauan lalu lintas →
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3 p-6 sm:p-8 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-center">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Konteks Prediksi Saat Ini</h4>
              <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">
                Parameter ini menjadi konteks permintaan prediksi. Konteks prediksi mengikuti data yang tersedia dari sistem.
              </p>
              <ul className="space-y-4">
                <li className="flex justify-between items-center pb-3 border-b border-slate-200/60">
                  <span className="text-sm font-medium text-slate-500">Rute</span>
                  <span className="text-sm font-bold text-[#0B1F3A]">Simpang SKA</span>
                </li>
                <li className="flex justify-between items-center pb-3 border-b border-slate-200/60">
                  <span className="text-sm font-medium text-slate-500">Jadwal</span>
                  <span className="text-sm font-bold text-[#0B1F3A]">{day}, {time.replace(':', '.')} WIB</span>
                </li>
                <li className="flex justify-between items-center pb-3 border-b border-slate-200/60">
                  <span className="text-sm font-medium text-slate-500">Cuaca</span>
                  <span className="text-sm font-bold text-[#0B1F3A]">{weather}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">Suhu</span>
                  <span className="text-sm font-bold text-[#0B1F3A]">{temp ? `${temp}°C` : "-"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Prediction Result Area */}
          {!hasRunPrediction ? (
            <div className="py-12 px-6 bg-white border border-slate-200 border-dashed rounded-2xl text-center shadow-sm">
              <h2 className="text-base font-bold text-[#0B1F3A] mb-1">Prediksi belum dijalankan</h2>
              <p className="text-sm text-slate-500">Isi parameter prediksi, lalu tekan tombol Prediksi Kemacetan.</p>
            </div>
          ) : isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1D4ED8]"></div>
              <span className="text-slate-500 text-sm font-medium">Mengkalkulasi model prediksi...</span>
            </div>
          ) : error ? (
            <div className="py-16 px-6 bg-red-50 border border-red-200 rounded-2xl text-center shadow-sm">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-xl mx-auto">⚠️</div>
              <h2 className="text-lg font-bold text-red-800 mb-2">{error}</h2>
              <p className="text-sm text-red-600">Pastikan layanan backend RoadTierbers sedang berjalan.</p>
            </div>
          ) : !hasData ? (
            <div className="py-16 px-6 bg-white border border-slate-200 rounded-2xl text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4 text-2xl border border-slate-100 mx-auto">📊</div>
              <h2 className="text-lg font-bold text-[#0B1F3A] mb-2">Belum ada data monitoring</h2>
              <p className="text-sm text-slate-500 mb-6">Sistem menunggu data dari hasil deteksi.</p>
              <Link href="/officer/ai-detection" className="inline-flex items-center justify-center h-10 px-6 rounded-lg bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1e40af] transition-colors shadow-sm">
                Ke Pusat Deteksi AI →
              </Link>
            </div>
          ) : (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Main Result Panel */}
              <div className="flex flex-col lg:flex-row gap-8">
                <div className={`flex-1 bg-white border ${statusInfo.borderColor} border-l-[6px] ${statusInfo.leftBorder} rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row`}>
                  
                  <div className={`md:w-1/2 p-6 sm:p-8 ${statusInfo.bgStatus} flex flex-col justify-center`}>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Hasil Prediksi</p>
                    <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${statusInfo.color} mb-4 leading-tight capitalize`}>
                      {displayRisk}
                    </h2>
                    <p className={`text-base font-medium opacity-90 ${statusInfo.color}`}>
                      {statusInfo.description}
                    </p>
                  </div>
                  
                  <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center bg-white border-t md:border-t-0 md:border-l border-slate-100">
                    <div className="grid grid-cols-2 gap-y-8 gap-x-6">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Kondisi Jalan</p>
                        <p className={`text-xl sm:text-2xl font-extrabold capitalize ${statusInfo.color}`}>
                          {categoryStr}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Estimasi Keterlambatan</p>
                        <p className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A]">
                          {delayMinutes !== undefined ? `${delayMinutes} menit` : "Belum tersedia"}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Rekomendasi Perjalanan</p>
                        <p className="text-lg font-bold text-[#0B1F3A]">
                          {statusInfo.rekomendasiUtama}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Catatan membaca hasil */}
                <div className="lg:w-1/3 bg-blue-50/50 border border-blue-100 rounded-2xl p-6 shadow-sm flex flex-col justify-center">
                  <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-5 flex items-center gap-2">
                    <span className="text-[#1D4ED8]">🛡️</span> Catatan Membaca Hasil
                  </h3>
                  <ul className="space-y-4 text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-3">
                      <span className="text-[#1D4ED8] mt-0.5">•</span>
                      <span>Prediksi dapat berubah mengikuti kondisi lapangan.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1D4ED8] mt-0.5">•</span>
                      <span>Gunakan hasil ini sebagai pertimbangan sebelum berangkat.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1D4ED8] mt-0.5">•</span>
                      <span>Tetap ikuti rambu dan arahan petugas di jalan.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          )}

          {/* 6. Supporting Links */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-bold">
              <Link href="/departure-recommendation" className="text-[#1D4ED8] hover:text-blue-800 transition-colors inline-flex items-center gap-1.5">
                Rekomendasi waktu berangkat <span aria-hidden="true">→</span>
              </Link>
              <Link href="/traffic-sign-education" className="text-[#1D4ED8] hover:text-blue-800 transition-colors inline-flex items-center gap-1.5">
                Edukasi rambu <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </PublicPageShell>
  );
}
