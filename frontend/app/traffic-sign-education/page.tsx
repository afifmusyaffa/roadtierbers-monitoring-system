"use client";

import Link from "next/link";
import { useState, useRef, useEffect, ReactNode } from "react";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import { ArrowRight, AlertTriangle, Image as ImageIcon, Camera, Video, UploadCloud, X, RefreshCw, CheckCircle2, ShieldAlert, Navigation } from "lucide-react";

// Same mapping preserved as requested
const TRAFFIC_SIGN_INFO: Record<string, { name: string; kategori: string; arti: string; fungsi: string; tindakan: string }> = {
  "0": { "name": "Larangan Berhenti", "kategori": "Larangan", "arti": "Melarang kendaraan berhenti di sepanjang jalan dengan rambu ini.", "fungsi": "Mencegah kemacetan di area padat.", "tindakan": "Dilarang berhenti sama sekali." },
  "1": { "name": "Larangan Masuk Bagi Kendaraan Bermotor dan Tidak Bermotor", "kategori": "Larangan", "arti": "Melarang semua jenis kendaraan untuk masuk ke jalan tersebut.", "fungsi": "Menjaga keamanan atau khusus pejalan kaki.", "tindakan": "Dilarang melintas/masuk." },
  "2": { "name": "Peringatan Alat Pemberi Isyarat Lalu Lintas", "kategori": "Peringatan", "arti": "Memberi tahu ada lampu lalu lintas di depan.", "fungsi": "Agar pengemudi bersiap mengurangi kecepatan.", "tindakan": "Waspada lampu lalu lintas." },
  "3": { "name": "Peringatan Banyak Pejalan Kaki Menggunakan Zebra Cross", "kategori": "Peringatan", "arti": "Banyak pejalan kaki yang menyeberang.", "fungsi": "Melindungi pejalan kaki.", "tindakan": "Kurangi kecepatan, utamakan pejalan kaki." },
  "4": { "name": "Peringatan Pintu Perlintasan Kereta Api", "kategori": "Peringatan", "arti": "Akan ada perlintasan kereta api.", "fungsi": "Mencegah kecelakaan dengan kereta.", "tindakan": "Berhenti sejenak, tengok kanan-kiri." },
  "5": { "name": "Peringatan Simpang Tiga Sisi Kiri", "kategori": "Peringatan", "arti": "Ada persimpangan ke kiri di depan.", "fungsi": "Antisipasi kendaraan dari kiri.", "tindakan": "Kurangi kecepatan." },
  "6": { "name": "Peringatan Penegasan Rambu Tambahan", "kategori": "Peringatan", "arti": "Rambu ini biasanya disertai papan tambahan di bawahnya.", "fungsi": "Memberi peringatan khusus.", "tindakan": "Perhatikan papan tambahan." },
  "7": { "name": "Perintah Masuk Jalur Kiri", "kategori": "Kewajiban", "arti": "Wajib mengambil lajur kiri.", "fungsi": "Mengatur arus lalu lintas searah.", "tindakan": "Tetap di lajur kiri." },
  "8": { "name": "Perintah Pilihan Memasuki Salah Satu Jalur", "kategori": "Kewajiban", "arti": "Kendaraan wajib memilih salah satu jalur yang ditunjuk.", "fungsi": "Menghindari separator/pembatas jalan.", "tindakan": "Ikuti salah satu arah panah." },
  "9": { "name": "Petunjuk Area Parkir", "kategori": "Petunjuk", "arti": "Menandakan area resmi untuk parkir.", "fungsi": "Memberi info lokasi parkir.", "tindakan": "Boleh memarkirkan kendaraan di area ini." },
  "10": { "name": "Petunjuk Lokasi Pemberhentian Bus", "kategori": "Petunjuk", "arti": "Tempat perhentian bus / halte.", "fungsi": "Fasilitas angkutan umum.", "tindakan": "Selain bus dilarang berhenti di area ini." },
  "11": { "name": "Petunjuk Lokasi Putar Balik", "kategori": "Petunjuk", "arti": "Lokasi yang diizinkan untuk putar balik (U-turn).", "fungsi": "Fasilitas putar arah.", "tindakan": "Lakukan putar balik dengan aman." },
  "12": { "name": "Larangan Parkir", "kategori": "Larangan", "arti": "Melarang kendaraan parkir, namun boleh berhenti sejenak untuk turun/naik penumpang.", "fungsi": "Mencegah penyempitan jalan.", "tindakan": "Dilarang parkir." },
  "13": { "name": "Petunjuk Penyeberangan Pejalan Kaki", "kategori": "Petunjuk", "arti": "Lokasi penyeberangan (Zebra Cross).", "fungsi": "Menunjukkan area aman menyeberang.", "tindakan": "Beri jalan pada pejalan kaki." },
  "14": { "name": "Lampu Hijau", "kategori": "Lampu Lalu Lintas", "arti": "Lampu lalu lintas menyala hijau.", "fungsi": "Kendaraan boleh jalan.", "tindakan": "Silakan jalan dengan hati-hati." },
  "15": { "name": "Lampu Kuning", "kategori": "Lampu Lalu Lintas", "arti": "Lampu lalu lintas menyala kuning.", "fungsi": "Persiapan berhenti atau jalan.", "tindakan": "Hati-hati, kurangi kecepatan." },
  "16": { "name": "Lampu Merah", "kategori": "Lampu Lalu Lintas", "arti": "Lampu lalu lintas menyala merah.", "fungsi": "Kendaraan wajib berhenti.", "tindakan": "Berhenti di belakang garis." },
  "17": { "name": "Larangan Belok Kanan", "kategori": "Larangan", "arti": "Dilarang berbelok ke kanan di persimpangan.", "fungsi": "Mengatur arus lalu lintas.", "tindakan": "Terus lurus atau belok kiri (sesuai arah lain)." },
  "18": { "name": "Larangan Belok Kiri", "kategori": "Larangan", "arti": "Dilarang berbelok ke kiri di persimpangan.", "fungsi": "Mengatur arus lalu lintas.", "tindakan": "Terus lurus atau belok kanan (sesuai arah lain)." },
  "19": { "name": "Larangan Berjalan Terus Wajib Berhenti Sesaat", "kategori": "Larangan", "arti": "Wajib berhenti sejenak sebelum melanjutkan perjalanan (Rambu STOP).", "fungsi": "Memastikan kondisi aman sebelum melintas.", "tindakan": "Berhenti total sejenak." },
  "20": { "name": "Larangan Memutar Balik", "kategori": "Larangan", "arti": "Dilarang melakukan manuver putar balik (U-turn).", "fungsi": "Menghindari tabrakan atau kemacetan.", "tindakan": "Dilarang putar balik." }
};

const DEFAULT_INFO = {
  name: "Rambu belum terdaftar",
  kategori: "Umum",
  arti: "Sistem mendeteksi ID kelas, tetapi informasi nama rambu belum tersedia di frontend.",
  fungsi: "Fungsi rambu ini belum tersedia dalam sistem.",
  tindakan: "Ikuti arahan rambu di sekitar Anda dan tetap berhati-hati."
};

function ScrollReveal({ children, delay = 0, direction = "up", className }: { children: ReactNode, delay?: number, direction?: "up" | "left" | "right" | "none", className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { rootMargin: "0px 0px -20px 0px", threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const getTransform = () => {
    if (direction === "up") return "translateY(20px)";
    if (direction === "left") return "translateX(20px)";
    if (direction === "right") return "translateX(-20px)";
    return "none";
  };

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getTransform(),
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
}

type MediaMode = "upload" | "camera" | "video";

export default function TrafficSignEducationPage() {
  const [mode, setMode] = useState<MediaMode>("upload");
  const [file, setFile] = useState<File | Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Camera state
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Start camera
  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setCameraActive(true);
    } catch (err) {
      console.error(err);
      setCameraError("Akses kamera ditolak. Periksa izin kamera atau gunakan unggah foto.");
    }
  };

  // Mode switch cleanup
  useEffect(() => {
    if (mode === "camera") {
      if (!isPhotoTaken) {
        startCamera();
      }
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [mode, isPhotoTaken]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setDetectionResult(null);
      setErrorMessage(null);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            setFile(blob);
            setPreviewUrl(URL.createObjectURL(blob));
            setIsPhotoTaken(true);
            setDetectionResult(null);
            setErrorMessage(null);
            stopCamera();
          }
        }, "image/jpeg", 0.9);
      }
    }
  };

  const retakePhoto = () => {
    setIsPhotoTaken(false);
    clearSelection();
    startCamera();
  };

  const clearSelection = () => {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setDetectionResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (mode === "camera") {
      setIsPhotoTaken(false);
      if (!cameraActive) startCamera();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setErrorMessage(null);
    setDetectionResult(null);

    const formData = new FormData();
    // if blob from camera, name it
    const fileObj = file instanceof File ? file : new File([file], "camera_capture.jpg", { type: "image/jpeg" });
    formData.append("file", fileObj);

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
           setDetectionResult(edukasiData.data[0]);
         } else {
           setErrorMessage("Tidak ada rambu terdeteksi. Gunakan gambar yang lebih jelas dan pastikan rambu terlihat penuh.");
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

  // Safe ID mapping logic preserved
  const rawDetectionName = detectionResult?.class ?? detectionResult?.class_id ?? detectionResult?.name ?? detectionResult?.id ?? detectionResult?.label ?? detectionResult?.class_name ?? detectionResult?.className;
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
      return { bg: "bg-emerald-50", borderColor: "border-emerald-200", leftBorder: "border-l-emerald-500", text: "text-emerald-700", badge: "bg-emerald-600", icon: <Navigation className="w-5 h-5" /> };
    } else if (k.includes("peringatan")) {
      return { bg: "bg-amber-50", borderColor: "border-amber-200", leftBorder: "border-l-amber-500", text: "text-amber-700", badge: "bg-amber-500", icon: <AlertTriangle className="w-5 h-5" /> };
    } else if (k.includes("larangan")) {
      return { bg: "bg-red-50", borderColor: "border-red-200", leftBorder: "border-l-red-500", text: "text-red-700", badge: "bg-red-600", icon: <ShieldAlert className="w-5 h-5" /> };
    } else if (k.includes("petunjuk")) {
      return { bg: "bg-blue-50", borderColor: "border-blue-200", leftBorder: "border-l-blue-500", text: "text-blue-700", badge: "bg-blue-600", icon: <Navigation className="w-5 h-5" /> };
    } else if (k.includes("kewajiban")) {
      return { bg: "bg-indigo-50", borderColor: "border-indigo-200", leftBorder: "border-l-indigo-500", text: "text-indigo-700", badge: "bg-indigo-600", icon: <CheckCircle2 className="w-5 h-5" /> };
    }
    return { bg: "bg-slate-50", borderColor: "border-slate-200", leftBorder: "border-l-slate-500", text: "text-slate-700", badge: "bg-slate-600", icon: <Navigation className="w-5 h-5" /> };
  };

  const meta = currentInfo ? getCategoryMeta(currentInfo.kategori) : null;

  return (
    <PublicPageShell>
      <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900 pb-24">
        
        {/* 1. Compact Feature Header */}
        <section className="relative pt-24 pb-12 overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-[#102A4C]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <ScrollReveal delay={0}>
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
                    Edukasi Rambu Lalu Lintas
                  </h1>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <p className="text-blue-100/80 font-medium text-base lg:text-lg">
                    Pelajari arti, kategori, dan fungsi rambu di sekitar Anda menggunakan deteksi gambar AI cerdas.
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-6 relative z-20">
          <ScrollReveal delay={0.2}>
            
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden flex flex-col lg:flex-row">
              
              {/* Left Column: Media Input */}
              <div className="lg:w-5/12 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50 flex flex-col">
                
                {/* Tabs */}
                <div className="flex border-b border-slate-200">
                  <button 
                    onClick={() => { setMode("upload"); clearSelection(); }} 
                    className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${mode === "upload" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    <ImageIcon className="w-4 h-4" /> Unggah Foto
                  </button>
                  <button 
                    onClick={() => { setMode("camera"); clearSelection(); }} 
                    className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${mode === "camera" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    <Camera className="w-4 h-4" /> Kamera
                  </button>
                  <button 
                    disabled 
                    className="flex-1 py-4 text-sm font-bold flex flex-col items-center justify-center text-slate-300 cursor-not-allowed group relative"
                  >
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" /> Video
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-10 whitespace-nowrap bg-slate-800 text-white px-2 py-1 rounded">Menunggu dukungan backend</span>
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col items-center justify-center min-h-[400px]">
                  
                  {/* UPLOAD MODE */}
                  {mode === "upload" && (
                    <div className="w-full h-full flex flex-col">
                      <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                      
                      {!previewUrl ? (
                        <div 
                          onClick={triggerFileInput}
                          className="flex-1 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer p-6"
                        >
                          <UploadCloud className="w-12 h-12 mb-4 text-slate-400" />
                          <p className="font-bold mb-1">Klik untuk mengunggah foto</p>
                          <p className="text-sm font-medium opacity-75 text-center">Format didukung: JPG, PNG, WEBP.</p>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col">
                          <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-slate-900 rounded-2xl overflow-hidden shadow-inner mb-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                            <button 
                              onClick={clearSelection}
                              className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md transition-colors"
                              title="Hapus foto"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={triggerFileInput}
                              className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                              Pilih foto lain
                            </button>
                            <button 
                              onClick={handleUpload}
                              disabled={isLoading}
                              className="flex-1 py-3 text-sm font-bold text-white bg-[#0B1F3A] rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-900/20"
                            >
                              {isLoading ? "Memproses..." : "Analisis Rambu"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CAMERA MODE */}
                  {mode === "camera" && (
                    <div className="w-full h-full flex flex-col">
                      {cameraError ? (
                        <div className="flex-1 bg-red-50 border border-red-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-red-600">
                          <AlertTriangle className="w-10 h-10 mb-4 text-red-500" />
                          <p className="font-bold mb-2">{cameraError}</p>
                          <button onClick={() => setMode("upload")} className="mt-4 px-4 py-2 bg-white rounded-lg border border-red-200 text-sm font-bold hover:bg-red-100 transition-colors">
                            Kembali ke Unggah Foto
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col">
                          <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-black rounded-2xl overflow-hidden shadow-inner mb-4">
                            {!isPhotoTaken ? (
                              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                            ) : (
                              previewUrl && <img src={previewUrl} alt="Captured" className="w-full h-full object-contain" /> // eslint-disable-line @next/next/no-img-element
                            )}
                            <canvas ref={canvasRef} className="hidden" />
                          </div>
                          
                          {!isPhotoTaken ? (
                            <button 
                              onClick={takePhoto}
                              className="w-full py-4 text-sm font-bold text-white bg-[#0B1F3A] rounded-xl hover:bg-blue-800 transition-colors shadow-md flex items-center justify-center gap-2"
                            >
                              <Camera className="w-5 h-5" /> Ambil Foto
                            </button>
                          ) : (
                            <div className="flex flex-col gap-2">
                              <div className="flex gap-2">
                                <button 
                                  onClick={retakePhoto}
                                  className="flex-1 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                                >
                                  <RefreshCw className="w-4 h-4" /> Foto ulang
                                </button>
                                <button 
                                  onClick={clearSelection}
                                  className="py-3 px-4 text-sm font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors"
                                >
                                  Hapus
                                </button>
                              </div>
                              <button 
                                onClick={handleUpload}
                                disabled={isLoading}
                                className="w-full py-3 text-sm font-bold text-white bg-[#0B1F3A] rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-900/20"
                              >
                                {isLoading ? "Memproses..." : "Gunakan & Analisis Rambu"}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>

              {/* Right Column: Results */}
              <div className="lg:w-7/12 p-8 lg:p-10 flex flex-col justify-center">
                
                {isLoading && (
                  <div className="flex flex-col items-center justify-center text-slate-400 py-12">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="font-bold text-slate-600">AI Sedang Menganalisis...</p>
                  </div>
                )}

                {!isLoading && errorMessage && (
                  <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                      <h3 className="font-bold text-red-900">Deteksi Gagal</h3>
                    </div>
                    <p className="text-red-700 font-medium text-sm">{errorMessage}</p>
                  </div>
                )}

                {!isLoading && !errorMessage && !currentInfo && (
                  <div className="text-center py-12 px-6">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ImageIcon className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#0B1F3A] mb-2">Belum ada gambar dianalisis</h3>
                    <p className="text-slate-500 font-medium">Pilih foto rambu atau ambil foto dari kamera untuk memulai analisis.</p>
                  </div>
                )}

                {!isLoading && !errorMessage && currentInfo && meta && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-2 mb-6">
                      <div className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2 ${meta.bg} ${meta.text} ${meta.borderColor}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${meta.badge}`} />
                        Kategori: {currentInfo.kategori}
                      </div>
                      {detectionResult?.confidence && (
                        <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          Akurasi: {Math.round(detectionResult.confidence * 100)}%
                        </div>
                      )}
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] mb-8 leading-tight tracking-tight">
                      {currentInfo.name}
                    </h2>

                    <div className={`border-l-4 ${meta.leftBorder} pl-6 mb-8`}>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Arti Rambu</h4>
                      <p className="text-lg font-medium text-slate-700 leading-relaxed">{currentInfo.arti}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Fungsi Utama
                        </h4>
                        <p className="text-sm font-bold text-slate-700">{currentInfo.fungsi}</p>
                      </div>
                      <div className={`${meta.bg} border ${meta.borderColor} p-5 rounded-2xl`}>
                        <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 opacity-80 ${meta.text}`}>
                          {meta.icon} Tindakan Pengguna
                        </h4>
                        <p className={`text-sm font-bold ${meta.text}`}>{currentInfo.tindakan}</p>
                      </div>
                    </div>

                    {currentInfo.rawId && (
                      <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                        <span className="text-[10px] text-slate-400 font-mono">ID Rambu: {currentInfo.rawId}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4} className="mt-12 text-center pb-12">
             <Link href="/traffic-overview" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
               <ArrowRight className="w-4 h-4" /> Kembali ke Pantauan Lalu Lintas
             </Link>
          </ScrollReveal>
        </div>
      </div>
    </PublicPageShell>
  );
}
