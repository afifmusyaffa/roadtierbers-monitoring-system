"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { PublicPageShell } from "@/components/layout/public-page-shell";

const TRAFFIC_SIGN_INFO: Record<string, { name: string; kategori: string; arti: string; fungsi: string; tindakan: string }> = {
  "0": {
    "name": "Larangan Berhenti",
    "kategori": "Larangan",
    "arti": "Melarang kendaraan berhenti di sepanjang jalan dengan rambu ini.",
    "fungsi": "Mencegah kemacetan di area padat.",
    "tindakan": "Dilarang berhenti sama sekali."
  },
  "1": {
    "name": "Larangan Masuk Bagi Kendaraan Bermotor dan Tidak Bermotor",
    "kategori": "Larangan",
    "arti": "Melarang semua jenis kendaraan untuk masuk ke jalan tersebut.",
    "fungsi": "Menjaga keamanan atau khusus pejalan kaki.",
    "tindakan": "Dilarang melintas/masuk."
  },
  "2": {
    "name": "Peringatan Alat Pemberi Isyarat Lalu Lintas",
    "kategori": "Peringatan",
    "arti": "Memberi tahu ada lampu lalu lintas di depan.",
    "fungsi": "Agar pengemudi bersiap mengurangi kecepatan.",
    "tindakan": "Waspada lampu lalu lintas."
  },
  "3": {
    "name": "Peringatan Banyak Pejalan Kaki Menggunakan Zebra Cross",
    "kategori": "Peringatan",
    "arti": "Banyak pejalan kaki yang menyeberang.",
    "fungsi": "Melindungi pejalan kaki.",
    "tindakan": "Kurangi kecepatan, utamakan pejalan kaki."
  },
  "4": {
    "name": "Peringatan Pintu Perlintasan Kereta Api",
    "kategori": "Peringatan",
    "arti": "Akan ada perlintasan kereta api.",
    "fungsi": "Mencegah kecelakaan dengan kereta.",
    "tindakan": "Berhenti sejenak, tengok kanan-kiri."
  },
  "5": {
    "name": "Peringatan Simpang Tiga Sisi Kiri",
    "kategori": "Peringatan",
    "arti": "Ada persimpangan ke kiri di depan.",
    "fungsi": "Antisipasi kendaraan dari kiri.",
    "tindakan": "Kurangi kecepatan."
  },
  "6": {
    "name": "Peringatan Penegasan Rambu Tambahan",
    "kategori": "Peringatan",
    "arti": "Rambu ini biasanya disertai papan tambahan di bawahnya.",
    "fungsi": "Memberi peringatan khusus.",
    "tindakan": "Perhatikan papan tambahan."
  },
  "7": {
    "name": "Perintah Masuk Jalur Kiri",
    "kategori": "Kewajiban",
    "arti": "Wajib mengambil lajur kiri.",
    "fungsi": "Mengatur arus lalu lintas searah.",
    "tindakan": "Tetap di lajur kiri."
  },
  "8": {
    "name": "Perintah Pilihan Memasuki Salah Satu Jalur",
    "kategori": "Kewajiban",
    "arti": "Kendaraan wajib memilih salah satu jalur yang ditunjuk.",
    "fungsi": "Menghindari separator/pembatas jalan.",
    "tindakan": "Ikuti salah satu arah panah."
  },
  "9": {
    "name": "Petunjuk Area Parkir",
    "kategori": "Petunjuk",
    "arti": "Menandakan area resmi untuk parkir.",
    "fungsi": "Memberi info lokasi parkir.",
    "tindakan": "Boleh memarkirkan kendaraan di area ini."
  },
  "10": {
    "name": "Petunjuk Lokasi Pemberhentian Bus",
    "kategori": "Petunjuk",
    "arti": "Tempat perhentian bus / halte.",
    "fungsi": "Fasilitas angkutan umum.",
    "tindakan": "Selain bus dilarang berhenti di area ini."
  },
  "11": {
    "name": "Petunjuk Lokasi Putar Balik",
    "kategori": "Petunjuk",
    "arti": "Lokasi yang diizinkan untuk putar balik (U-turn).",
    "fungsi": "Fasilitas putar arah.",
    "tindakan": "Lakukan putar balik dengan aman."
  },
  "12": {
    "name": "Larangan Parkir",
    "kategori": "Larangan",
    "arti": "Melarang kendaraan parkir, namun boleh berhenti sejenak untuk turun/naik penumpang.",
    "fungsi": "Mencegah penyempitan jalan.",
    "tindakan": "Dilarang parkir."
  },
  "13": {
    "name": "Petunjuk Penyeberangan Pejalan Kaki",
    "kategori": "Petunjuk",
    "arti": "Lokasi penyeberangan (Zebra Cross).",
    "fungsi": "Menunjukkan area aman menyeberang.",
    "tindakan": "Beri jalan pada pejalan kaki."
  },
  "14": {
    "name": "Lampu Hijau",
    "kategori": "Lampu Lalu Lintas",
    "arti": "Lampu lalu lintas menyala hijau.",
    "fungsi": "Kendaraan boleh jalan.",
    "tindakan": "Silakan jalan dengan hati-hati."
  },
  "15": {
    "name": "Lampu Kuning",
    "kategori": "Lampu Lalu Lintas",
    "arti": "Lampu lalu lintas menyala kuning.",
    "fungsi": "Persiapan berhenti atau jalan.",
    "tindakan": "Hati-hati, kurangi kecepatan."
  },
  "16": {
    "name": "Lampu Merah",
    "kategori": "Lampu Lalu Lintas",
    "arti": "Lampu lalu lintas menyala merah.",
    "fungsi": "Kendaraan wajib berhenti.",
    "tindakan": "Berhenti di belakang garis."
  },
  "17": {
    "name": "Larangan Belok Kanan",
    "kategori": "Larangan",
    "arti": "Dilarang berbelok ke kanan di persimpangan.",
    "fungsi": "Mengatur arus lalu lintas.",
    "tindakan": "Terus lurus atau belok kiri (sesuai arah lain)."
  },
  "18": {
    "name": "Larangan Belok Kiri",
    "kategori": "Larangan",
    "arti": "Dilarang berbelok ke kiri di persimpangan.",
    "fungsi": "Mengatur arus lalu lintas.",
    "tindakan": "Terus lurus atau belok kanan (sesuai arah lain)."
  },
  "19": {
    "name": "Larangan Berjalan Terus Wajib Berhenti Sesaat",
    "kategori": "Larangan",
    "arti": "Wajib berhenti sejenak sebelum melanjutkan perjalanan (Rambu STOP).",
    "fungsi": "Memastikan kondisi aman sebelum melintas.",
    "tindakan": "Berhenti total sejenak."
  },
  "20": {
    "name": "Larangan Memutar Balik",
    "kategori": "Larangan",
    "arti": "Dilarang melakukan manuver putar balik (U-turn).",
    "fungsi": "Menghindari tabrakan atau kemacetan.",
    "tindakan": "Dilarang putar balik."
  }
};

const DEFAULT_INFO = {
  name: "Rambu belum terdaftar",
  kategori: "Umum",
  arti: "Sistem mendeteksi ID kelas, tetapi informasi nama rambu belum tersedia di frontend.",
  fungsi: "Fungsi rambu ini belum tersedia dalam sistem.",
  tindakan: "Ikuti arahan rambu di sekitar Anda dan tetap berhati-hati."
};

export default function TrafficSignEducationPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setDetectionResult(null);
      setErrorMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${apiUrl}/detection/analyze-all`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      
      if (res.status === "success" || res.status === "error") {
         const edukasiData = res.data?.detections?.edukasi;
         if (edukasiData && edukasiData.status === "success" && edukasiData.data && edukasiData.data.length > 0) {
           setDetectionResult(edukasiData.data[0]); // ambil deteksi pertama
         } else {
           setErrorMessage("Rambu tidak terdeteksi dari gambar ini.");
           setDetectionResult(null);
         }
      } else {
         setErrorMessage("Gagal memproses gambar.");
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      setErrorMessage("Koneksi server terputus. Pastikan layanan backend RoadTierbers sedang berjalan.");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Get info based on detection result or use default
  const rawDetectionName = detectionResult?.name ?? detectionResult?.class_id ?? detectionResult?.id ?? detectionResult?.label ?? detectionResult?.class_name ?? detectionResult?.className;
  const signId = rawDetectionName != null ? String(rawDetectionName) : null;
  const currentInfo = signId && TRAFFIC_SIGN_INFO[signId] 
    ? { ...TRAFFIC_SIGN_INFO[signId], rawId: signId } 
    : (signId ? { 
        ...DEFAULT_INFO, 
        arti: `Sistem mendeteksi ID kelas ${signId}, tetapi informasi nama rambu belum tersedia di frontend.`,
        rawId: signId 
      } : null);

  const getCategoryMeta = (kategori: string) => {
    const k = kategori.toLowerCase();
    if (k.includes("lampu lalu lintas")) {
      return {
        bg: "bg-emerald-50",
        borderColor: "border-emerald-200",
        leftBorder: "border-l-emerald-500",
        text: "text-emerald-700",
        badge: "bg-emerald-600"
      };
    } else if (k.includes("peringatan")) {
      return {
        bg: "bg-amber-50",
        borderColor: "border-amber-200",
        leftBorder: "border-l-amber-500",
        text: "text-amber-700",
        badge: "bg-amber-500"
      };
    } else if (k.includes("larangan")) {
      return {
        bg: "bg-red-50",
        borderColor: "border-red-200",
        leftBorder: "border-l-red-500",
        text: "text-red-700",
        badge: "bg-red-600"
      };
    } else if (k.includes("perintah")) {
      return {
        bg: "bg-blue-50",
        borderColor: "border-blue-200",
        leftBorder: "border-l-blue-500",
        text: "text-blue-700",
        badge: "bg-blue-600"
      };
    } else if (k.includes("petunjuk")) {
      return {
        bg: "bg-teal-50",
        borderColor: "border-teal-200",
        leftBorder: "border-l-teal-500",
        text: "text-teal-700",
        badge: "bg-teal-600"
      };
    }
    
    return {
      bg: "bg-slate-50",
      borderColor: "border-slate-200",
      leftBorder: "border-l-slate-400",
      text: "text-slate-700",
      badge: "bg-slate-400"
    };
  };

  return (
    <PublicPageShell>
      <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* 1. Compact Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold text-[#0B1F3A] tracking-tight">Edukasi Rambu Lalu Lintas</h1>
              <p className="text-base text-slate-500 mt-2">Pahami arti rambu dan tindakan yang perlu dilakukan saat berkendara.</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 font-medium">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Area</span>
                <span className="text-[#0B1F3A] font-semibold">Pekanbaru</span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Sumber</span>
                <span className="text-[#0B1F3A] font-semibold">Panduan & Deteksi Sistem</span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Status</span>
                <span className="text-[#1D4ED8] font-bold">Mode evaluasi</span>
              </div>
            </div>
          </div>

          {/* 2. Main Feature Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row min-h-[440px]">
            
            {/* Left: Upload Area */}
            <div className="lg:w-[45%] p-6 sm:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-100">
              <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-2">Deteksi Rambu</h3>
              <p className="text-sm text-slate-500 mb-6">Unggah gambar rambu untuk membantu mengenali jenis dan arti rambu.</p>
              
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
              />
              
              <div 
                onClick={triggerFileInput}
                className="flex-1 min-h-[240px] flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 mb-6 hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer relative overflow-hidden group"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
                ) : (
                  <div className="text-center space-y-3 px-4">
                    <div className="w-12 h-12 mx-auto rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 group-hover:text-[#1D4ED8] transition-colors">
                      <span className="font-bold text-2xl leading-none mb-1">+</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-600">Klik untuk mengunggah gambar</p>
                      <p className="text-xs text-slate-400 mt-1">Format: JPG, PNG</p>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                type="button" 
                onClick={handleUpload}
                disabled={!file || isLoading}
                className="w-full inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#1D4ED8] text-white text-sm font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-800"
              >
                {isLoading ? (
                  <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span> Memproses...</>
                ) : (
                  "Analisis Rambu"
                )}
              </button>
            </div>
            
            {/* Right: Result Area */}
            <div className="lg:w-[55%] p-6 sm:p-8 bg-slate-50 flex flex-col justify-center relative">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1D4ED8]"></div>
                  <p className="text-sm font-medium text-slate-500">Menganalisis gambar menggunakan model deteksi AI...</p>
                </div>
              ) : errorMessage ? (
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl shadow-sm border border-red-200">⚠️</div>
                  <div>
                    <h4 className="text-base font-bold text-red-800 mb-1">Gagal Menganalisis</h4>
                    <p className="text-sm text-red-600 max-w-sm mx-auto">{errorMessage}</p>
                  </div>
                </div>
              ) : currentInfo ? (
                <div className="flex flex-col h-full w-full justify-center space-y-6">
                  {detectionResult?.annotated_image && (
                    <div className="w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                      <div className="bg-slate-200/50 py-1.5 px-3 border-b border-slate-200 flex items-center">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hasil Anotasi</span>
                      </div>
                      <div className="relative aspect-video w-full bg-slate-800 flex items-center justify-center overflow-hidden">
                        <img 
                          src={detectionResult.annotated_image.startsWith('data:image') ? detectionResult.annotated_image : `data:image/jpeg;base64,${detectionResult.annotated_image}`} 
                          alt="Annotated Result" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}

                  <div className={`w-full flex flex-col p-6 sm:p-8 bg-white border ${getCategoryMeta(currentInfo.kategori).borderColor} border-l-[6px] ${getCategoryMeta(currentInfo.kategori).leftBorder} rounded-xl shadow-sm`}>
                    <div className="mb-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${getCategoryMeta(currentInfo.kategori).bg} ${getCategoryMeta(currentInfo.kategori).text} border ${getCategoryMeta(currentInfo.kategori).borderColor}`}>
                            {currentInfo.kategori}
                          </span>
                          {currentInfo.rawId && (
                            <span className="text-[10px] font-medium text-slate-400">ID Kelas: {currentInfo.rawId}</span>
                          )}
                        </div>
                        {detectionResult?.confidence && (
                          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                            Akurasi: {(detectionResult.confidence * 100).toFixed(1)}%
                          </span>
                        )}
                      </div>
                      <h3 className={`text-2xl sm:text-3xl font-extrabold ${getCategoryMeta(currentInfo.kategori).text} leading-tight`}>
                        {currentInfo.name}
                      </h3>
                    </div>
                    
                    <div className="space-y-5 mt-2 pt-5 border-t border-slate-100">
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Arti Rambu</p>
                        <p className="text-sm font-semibold text-[#0B1F3A] leading-relaxed">{currentInfo.arti}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Fungsi Rambu</p>
                        <p className="text-sm font-semibold text-[#0B1F3A] leading-relaxed">{currentInfo.fungsi}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Tindakan Pengguna Jalan</p>
                        <p className="text-sm font-semibold text-[#0B1F3A] leading-relaxed">{currentInfo.tindakan}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-white text-slate-400 flex items-center justify-center text-2xl shadow-sm border border-slate-200">🖼️</div>
                  <div>
                    <h4 className="text-base font-bold text-[#0B1F3A] mb-1">Belum ada gambar dianalisis</h4>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto">Unggah gambar rambu lalu lintas untuk melihat hasil deteksi dan maknanya.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 3. Kategori Rambu */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-6">Kategori Rambu</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm"></span>
                    <h4 className="text-sm font-bold text-amber-900">Rambu Peringatan</h4>
                  </div>
                  <p className="text-xs text-amber-800 font-medium leading-relaxed">Memperingatkan kemungkinan bahaya di jalan depan. Berwarna dasar kuning dengan lambang hitam.</p>
                </div>
                <div className="p-4 rounded-xl bg-red-50 border border-red-100/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-red-600 shadow-sm"></span>
                    <h4 className="text-sm font-bold text-red-900">Rambu Larangan</h4>
                  </div>
                  <p className="text-xs text-red-800 font-medium leading-relaxed">Menyatakan larangan bagi pengguna jalan. Berwarna dasar putih, garis tepi merah, lambang hitam.</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600 shadow-sm"></span>
                    <h4 className="text-sm font-bold text-blue-900">Rambu Perintah</h4>
                  </div>
                  <p className="text-xs text-blue-800 font-medium leading-relaxed">Menyatakan perintah wajib yang harus diikuti. Biasanya berbentuk bundar dengan latar biru dan lambang putih.</p>
                </div>
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-100/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-teal-600 shadow-sm"></span>
                    <h4 className="text-sm font-bold text-teal-900">Rambu Petunjuk</h4>
                  </div>
                  <p className="text-xs text-teal-800 font-medium leading-relaxed">Memberikan petunjuk arah, jarak, atau informasi fasilitas umum. Biasanya berbentuk segi empat berwarna hijau/biru.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* 4. Panduan Membaca Rambu */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-5">Panduan Cepat</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-slate-500">1</div>
                    <div>
                      <p className="text-sm font-bold text-[#0B1F3A]">Lihat warna & bentuk</p>
                      <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">Beda warna berarti beda instruksi keselamatan (contoh: merah berarti dilarang).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-slate-500">2</div>
                    <div>
                      <p className="text-sm font-bold text-[#0B1F3A]">Amati lambang</p>
                      <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">Pahami arah, angka batas kecepatan, atau objek yang ditunjukkan.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-slate-500">3</div>
                    <div>
                      <p className="text-sm font-bold text-[#0B1F3A]">Segera bertindak</p>
                      <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">Lakukan penyesuaian laju atau arah perjalanan Anda sebelum batas rambu.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* 5. Catatan untuk pengguna jalan */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 shadow-sm flex flex-col justify-center">
                <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-[#1D4ED8]">🛡️</span> Catatan Pengguna Jalan
                </h3>
                <ul className="space-y-3 text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#1D4ED8] mt-0.5 text-lg leading-none">•</span>
                    <span>Kurangi kecepatan saat melihat rambu peringatan.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#1D4ED8] mt-0.5 text-lg leading-none">•</span>
                    <span>Patuhi rambu larangan dan perintah di area jalan.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#1D4ED8] mt-0.5 text-lg leading-none">•</span>
                    <span>Ikuti arahan petugas jika kondisi lapangan berbeda.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* 6. Supporting Links */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-bold">
              <Link href="/traffic-overview" className="text-[#1D4ED8] hover:text-blue-800 transition-colors inline-flex items-center gap-1.5">
                Pantauan lalu lintas <span aria-hidden="true">→</span>
              </Link>
              <Link href="/congestion-prediction" className="text-[#1D4ED8] hover:text-blue-800 transition-colors inline-flex items-center gap-1.5">
                Prediksi kemacetan <span aria-hidden="true">→</span>
              </Link>
              <Link href="/departure-recommendation" className="text-[#1D4ED8] hover:text-blue-800 transition-colors inline-flex items-center gap-1.5">
                Rekomendasi waktu berangkat <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </PublicPageShell>
  );
}
