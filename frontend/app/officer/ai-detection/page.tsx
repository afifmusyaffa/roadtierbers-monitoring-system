"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { StatusBadge } from "@/components/common";
import { UploadCloud, Loader2, AlertTriangle, CheckCircle, Image as ImageIcon } from "lucide-react";

// Types for YOLO Response
interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
interface DetectionItem {
  name: string;
  class: number;
  confidence: number;
  box: BoundingBox;
}
interface ModelResult {
  status: string;
  message?: string;
  data?: DetectionItem[];
}
interface AnalyzeResponse {
  status: string;
  message: string;
  data: {
    history_id: number;
    detections: Record<string, ModelResult>;
  };
}

// Global state to persist data during client-side navigation
let globalAIDetectionState = {
  selectedFile: null as File | null,
  previewUrl: null as string | null,
  imgSize: { width: 0, height: 0 },
  results: null as AnalyzeResponse | null,
};

export default function OfficerAIDetectionPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(globalAIDetectionState.selectedFile);
  const [previewUrl, setPreviewUrl] = useState<string | null>(globalAIDetectionState.previewUrl);
  const [imgSize, setImgSize] = useState<{ width: number; height: number }>(globalAIDetectionState.imgSize);
  const [isDetecting, setIsDetecting] = useState(false);
  const [results, setResults] = useState<AnalyzeResponse | null>(globalAIDetectionState.results);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    globalAIDetectionState.selectedFile = selectedFile;
    globalAIDetectionState.previewUrl = previewUrl;
    globalAIDetectionState.imgSize = imgSize;
    globalAIDetectionState.results = results;
  }, [selectedFile, previewUrl, imgSize, results]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setResults(null);
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      const img = new Image();
      img.onload = () => {
        setImgSize({ width: img.width, height: img.height });
      };
      img.src = url;
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const runDetection = async () => {
    if (!selectedFile) return;
    setIsDetecting(true);
    setResults(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? (window.location.protocol === "https:" ? `https://${window.location.host}/api` : `http://${window.location.hostname}:8001`) : "http://127.0.0.1:8000");
      const res = await fetch(`${apiUrl}/detection/analyze-all`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("Failed to connect to backend API");
    } finally {
      setIsDetecting(false);
    }
  };

  // Render bounding boxes
  const renderBoundingBoxes = () => {
    if (!results || !results.data || !results.data.detections) return null;
    if (imgSize.width === 0 || imgSize.height === 0) return null;

    const allBoxes: React.ReactNode[] = [];
    const colors = {
      helm: "border-red-500 bg-red-500/10",
      boncengan: "border-orange-500 bg-orange-500/10",
      plat: "border-yellow-500 bg-yellow-500/10",
      pajak: "border-green-500 bg-green-500/10",
      kendaraan: "border-blue-500 bg-blue-500/10",
    };
    const textColors = {
      helm: "bg-red-500",
      boncengan: "bg-orange-500",
      plat: "bg-yellow-500",
      pajak: "bg-green-500",
      kendaraan: "bg-blue-500",
    };

    Object.entries(results.data.detections).forEach(([modelName, modelRes]) => {
      if (modelName === "edukasi") return;
      if (modelRes.status === "success" && modelRes.data) {
        modelRes.data.forEach((item, idx) => {
          const { x1, y1, x2, y2 } = item.box;
          const left = (x1 / imgSize.width) * 100;
          const top = (y1 / imgSize.height) * 100;
          const width = ((x2 - x1) / imgSize.width) * 100;
          const height = ((y2 - y1) / imgSize.height) * 100;
          
          const colorClass = colors[modelName as keyof typeof colors] || "border-purple-500 bg-purple-500/10";
          const bgClass = textColors[modelName as keyof typeof textColors] || "bg-purple-500";

          const isNearTop = top < 5;
          allBoxes.push(
            <div
              key={`${modelName}-${idx}`}
              className={`absolute border-[3px] shadow-sm ${colorClass}`}
              style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
            >
              <div className={`absolute left-[-3px] ${isNearTop ? 'top-[-3px]' : '-top-7'} ${bgClass} text-white text-[11px] font-semibold px-2 py-0.5 whitespace-nowrap z-10 shadow-sm`}>
                {item.name} ({(item.confidence * 100).toFixed(0)}%)
              </div>
            </div>
          );
        });
      }
    });
    return allBoxes;
  };

  // Build table data
  const buildTableData = () => {
    if (!results || !results.data || !results.data.detections) return [];
    
    let rows: any[] = [];
    Object.entries(results.data.detections).forEach(([modelName, modelRes]) => {
      if (modelName === "edukasi") return;
      if (modelRes.status === "success" && modelRes.data) {
        if (modelRes.data.length === 0) {
          rows.push({
             time: new Date().toLocaleString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/\./g, ':'),
             obj: modelName,
             res: "Tidak terdeteksi",
             count: "0",
             risk: "Aman",
             note: `Model ${modelName} aktif, hasil kosong`
          });
        } else {
          // Group by class name
          const counts: Record<string, number> = {};
          modelRes.data.forEach((item) => {
            counts[item.name] = (counts[item.name] || 0) + 1;
          });
          
          Object.entries(counts).forEach(([className, count]) => {
             rows.push({
               time: new Date().toLocaleString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/\./g, ':'),
               obj: modelName,
               res: className,
               count: count,
               risk: modelName === "helm" || modelName === "boncengan" ? "Sedang" : "Rendah",
               note: `Terdeteksi oleh model ${modelName}`
             });
          });
        }
      } else if (modelRes.status === "belum_tersedia") {
         rows.push({
             time: new Date().toLocaleString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/\./g, ':'),
             obj: modelName,
             res: "Model Belum Tersedia",
             count: "-",
             risk: "Rendah",
             note: modelRes.message
         });
      }
    });
    return rows;
  };

  const tableData = results ? buildTableData() : [];
  
  // Calculate Summaries
  let totalVehicles = 0;
  let totalViolations = 0;
  
  if (results && results.data && results.data.detections) {
      if (results.data.detections.kendaraan?.data) {
          totalVehicles = results.data.detections.kendaraan.data.length;
      }
      if (results.data.detections.helm?.data) totalViolations += results.data.detections.helm.data.length;
      if (results.data.detections.boncengan?.data) totalViolations += results.data.detections.boncengan.data.length;
  }

  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        {/* Header */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#1D4ED8]">
              Officer AI Detection
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">
              Pusat Deteksi AI
            </h1>
            <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
              Panel kerja interaktif untuk menguji dan mendeteksi kendaraan serta pelanggaran dari tangkapan gambar.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-right bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Mode:</span> Testing & Integrasi API
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Sumber:</span> Upload File Manual
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Status:</span> {results ? "Selesai" : (isDetecting ? "Proses..." : "Menunggu input")}
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Input Panel & Visual Preview */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Input Panel */}
            <section>
              <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-3">
                  <h2 className="text-lg font-medium text-[#0B1F3A]">Uji Gambar Deteksi</h2>
                  <p className="text-sm text-slate-500 max-w-md">Silakan upload gambar lalu klik "Deteksi API" untuk menjalankan kelima model AI YOLO secara paralel di backend FastAPI.</p>
                  {results && (
                     <div className="flex items-center gap-2 mt-2">
                       <span className="text-sm font-medium text-slate-400 w-24">Status DB:</span>
                       <StatusBadge status="Tersimpan" className="bg-green-50 text-green-700 border-green-200 ring-green-100" />
                       <span className="text-xs text-slate-400 ml-2">ID Riwayat: {results.data.history_id}</span>
                     </div>
                  )}
                </div>

                <div className="shrink-0 flex flex-col gap-3 min-w-[200px]">
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                  <button 
                    onClick={handleUploadClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0B1F3A] border border-slate-300 rounded-lg text-sm font-medium transition-colors"
                  >
                    <UploadCloud className="w-4 h-4" />
                    Pilih Gambar
                  </button>
                  <button 
                    onClick={runDetection}
                    disabled={!selectedFile || isDetecting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#1D4ED8] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {isDetecting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Proses API...</>
                    ) : (
                      "Deteksi API"
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* Visual Detection Preview */}
            <section>
              <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm">
                <h2 className="text-lg font-medium text-[#0B1F3A] mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-slate-400" /> Preview Deteksi Visual
                </h2>
                
                {previewUrl ? (
                  <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                    {/* The image itself */}
                    <img 
                      src={previewUrl} 
                      alt="Uploaded preview" 
                      className="w-full h-auto object-contain block" 
                    />
                    {/* Bounding Boxes Container absolutely positioned over the image */}
                    <div className="absolute inset-0 pointer-events-none">
                      {renderBoundingBoxes()}
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full aspect-video bg-slate-100 rounded-xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-slate-400 mb-4">
                     <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                     <p className="text-sm font-medium">Belum ada gambar</p>
                     <p className="text-xs">Upload gambar untuk melihat hasil deteksi</p>
                  </div>
                )}
              </div>
            </section>
            
            {/* Detection Result Table */}
            <section>
              <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col">
                <h2 className="text-lg font-medium text-[#0B1F3A] mb-4">Rincian Hasil Deteksi</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200">
                        <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Timestamp</th>
                        <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Model AI</th>
                        <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Class / Hasil</th>
                        <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Jumlah</th>
                        <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Risiko</th>
                        <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Catatan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {tableData.length > 0 ? (
                        tableData.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 text-sm font-medium text-slate-500">{row.time}</td>
                            <td className="p-4 text-sm font-medium text-[#0B1F3A] capitalize">{row.obj}</td>
                            <td className="p-4 text-sm font-normal text-slate-600">{row.res}</td>
                            <td className="p-4 text-sm font-normal text-slate-600">{row.count}</td>
                            <td className="p-4">
                              <StatusBadge status={row.risk} />
                            </td>
                            <td className="p-4 text-sm font-normal text-slate-600">{row.note}</td>
                          </tr>
                        ))
                      ) : (
                         <tr>
                            <td colSpan={6} className="p-8 text-center text-sm text-slate-500">
                               Belum ada data deteksi. Silakan upload gambar dan jalankan deteksi.
                            </td>
                         </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column: Summaries, Validation, Actions */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Detection Summary Cards */}
            <section>
              <h2 className="text-lg font-medium text-[#0B1F3A] mb-4">Rangkuman Deteksi</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col justify-between col-span-2">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">Total Kendaraan</p>
                  <p className="text-3xl font-medium text-[#1D4ED8] mb-2">{totalVehicles || "-"}</p>
                  <p className="text-xs font-normal text-slate-500">Berdasarkan model Kelompok 6</p>
                </div>
                <div className="p-4 rounded-xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col justify-between col-span-2">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">Indikasi Pelanggaran</p>
                  <p className="text-3xl font-medium text-red-500 mb-2">{totalViolations || "-"}</p>
                  <p className="text-xs font-normal text-slate-500">Helm & Boncengan</p>
                </div>
              </div>
            </section>

            {/* Officer Validation Panel */}
            <section>
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm">
                <h2 className="text-base font-medium text-[#0B1F3A] mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                  Validasi Petugas
                </h2>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-sm font-normal text-slate-700">AI membantu mempercepat pembacaan sample pemantauan.</p>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-sm font-normal text-slate-700">Petugas tetap perlu memeriksa konteks visual dari Bounding Box.</p>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-sm font-normal text-slate-700">Status "Belum Tersedia" berarti model belum dipasang di backend.</p>
                  </li>
                </ul>
              </div>
            </section>

            {/* Quick Navigation */}
            <section>
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Navigasi Terkait</h2>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Monitoring Pelanggaran", href: "/officer/violation-monitoring", helper: "Lihat tren pelanggaran" },
                  { label: "Plate Monitoring", href: "/officer/vehicle-plate", helper: "Pantau nopol kendaraan" },
                  { label: "Forecasting", href: "/officer/forecasting", helper: "Prediksi durasi kemacetan" },
                  { label: "Buat Laporan", href: "/officer/report", helper: "Unduh laporan deteksi" },
                ].map((action, i) => (
                  <Link
                    key={i}
                    href={action.href}
                    className="flex justify-between items-center p-4 rounded-xl bg-[#0B1F3A] border border-[#142d52] hover:bg-[#142d52] transition-colors shadow-sm group"
                  >
                    <div>
                      <h3 className="text-sm font-medium text-white mb-0.5">{action.label}</h3>
                      <p className="text-xs font-normal text-blue-200/70">{action.helper}</p>
                    </div>
                    <span className="text-white/50 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </OfficerPageShell>
  );
}
