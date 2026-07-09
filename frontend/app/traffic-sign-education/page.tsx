"use client";

import Link from "next/link";
import { useState, useRef, useEffect, ReactNode, useMemo } from "react";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import { ArrowRight, AlertTriangle, Image as ImageIcon, Camera, Video, UploadCloud, X, RefreshCw, CheckCircle2, ShieldAlert, Navigation, Search, Filter, BookOpen, Layers } from "lucide-react";

// Source of Truth from backend/traffic_signs.json
const TRAFFIC_SIGN_DIRECTORY = [
  {
    "id": "sign-0-larangan-berhenti",
    "yolo_index": 0,
    "name": "Larangan Berhenti",
    "category": "Larangan",
    "description": "Melarang kendaraan berhenti di sepanjang jalan dengan rambu ini.",
    "function": "Mencegah kemacetan di area padat.",
    "rules": "Dilarang berhenti sama sekali.",
    "image": "/images/traffic-signs/sign-0-larangan-berhenti.svg"
  },
  {
    "id": "sign-1-larangan-masuk-bagi-kendaraan-",
    "yolo_index": 1,
    "name": "Larangan Masuk Bagi Kendaraan Bermotor dan Tidak Bermotor",
    "category": "Larangan",
    "description": "Melarang semua jenis kendaraan untuk masuk ke jalan tersebut.",
    "function": "Menjaga keamanan atau khusus pejalan kaki.",
    "rules": "Dilarang melintas/masuk.",
    "image": "/images/traffic-signs/sign-1-larangan-masuk-bagi-kendaraan-.svg"
  },
  {
    "id": "sign-2-peringatan-alat-pemberi-isyara",
    "yolo_index": 2,
    "name": "Peringatan Alat Pemberi Isyarat Lalu Lintas",
    "category": "Peringatan",
    "description": "Memberi tahu ada lampu lalu lintas di depan.",
    "function": "Agar pengemudi bersiap mengurangi kecepatan.",
    "rules": "Waspada lampu lalu lintas.",
    "image": "/images/traffic-signs/sign-2-peringatan-alat-pemberi-isyara.svg"
  },
  {
    "id": "sign-3-peringatan-banyak-pejalan-kaki",
    "yolo_index": 3,
    "name": "Peringatan Banyak Pejalan Kaki Menggunakan Zebra Cross",
    "category": "Peringatan",
    "description": "Banyak pejalan kaki yang menyeberang.",
    "function": "Melindungi pejalan kaki.",
    "rules": "Kurangi kecepatan, utamakan pejalan kaki.",
    "image": "/images/traffic-signs/sign-3-peringatan-banyak-pejalan-kaki.svg"
  },
  {
    "id": "sign-4-peringatan-pintu-perlintasan-k",
    "yolo_index": 4,
    "name": "Peringatan Pintu Perlintasan Kereta Api",
    "category": "Peringatan",
    "description": "Akan ada perlintasan kereta api.",
    "function": "Mencegah kecelakaan dengan kereta.",
    "rules": "Berhenti sejenak, tengok kanan-kiri.",
    "image": "/images/traffic-signs/sign-4-peringatan-pintu-perlintasan-k.svg"
  },
  {
    "id": "sign-5-peringatan-simpang-tiga-sisi-k",
    "yolo_index": 5,
    "name": "Peringatan Simpang Tiga Sisi Kiri",
    "category": "Peringatan",
    "description": "Ada persimpangan ke kiri di depan.",
    "function": "Antisipasi kendaraan dari kiri.",
    "rules": "Kurangi kecepatan.",
    "image": "/images/traffic-signs/sign-5-peringatan-simpang-tiga-sisi-k.svg"
  },
  {
    "id": "sign-6-peringatan-penegasan-rambu-tam",
    "yolo_index": 6,
    "name": "Peringatan Penegasan Rambu Tambahan",
    "category": "Peringatan",
    "description": "Rambu ini biasanya disertai papan tambahan di bawahnya.",
    "function": "Memberi peringatan khusus.",
    "rules": "Perhatikan papan tambahan.",
    "image": "/images/traffic-signs/sign-6-peringatan-penegasan-rambu-tam.svg"
  },
  {
    "id": "sign-7-perintah-masuk-jalur-kiri",
    "yolo_index": 7,
    "name": "Perintah Masuk Jalur Kiri",
    "category": "Kewajiban",
    "description": "Wajib mengambil lajur kiri.",
    "function": "Mengatur arus lalu lintas searah.",
    "rules": "Tetap di lajur kiri.",
    "image": "/images/traffic-signs/sign-7-perintah-masuk-jalur-kiri.svg"
  },
  {
    "id": "sign-8-perintah-pilihan-memasuki-sala",
    "yolo_index": 8,
    "name": "Perintah Pilihan Memasuki Salah Satu Jalur",
    "category": "Kewajiban",
    "description": "Kendaraan wajib memilih salah satu jalur yang ditunjuk.",
    "function": "Menghindari separator/pembatas jalan.",
    "rules": "Ikuti salah satu arah panah.",
    "image": "/images/traffic-signs/sign-8-perintah-pilihan-memasuki-sala.svg"
  },
  {
    "id": "sign-9-petunjuk-area-parkir",
    "yolo_index": 9,
    "name": "Petunjuk Area Parkir",
    "category": "Petunjuk",
    "description": "Menandakan area resmi untuk parkir.",
    "function": "Memberi info lokasi parkir.",
    "rules": "Boleh memarkirkan kendaraan di area ini.",
    "image": "/images/traffic-signs/sign-9-petunjuk-area-parkir.svg"
  },
  {
    "id": "sign-10-petunjuk-lokasi-pemberhentian-",
    "yolo_index": 10,
    "name": "Petunjuk Lokasi Pemberhentian Bus",
    "category": "Petunjuk",
    "description": "Tempat perhentian bus / halte.",
    "function": "Fasilitas angkutan umum.",
    "rules": "Selain bus dilarang berhenti di area ini.",
    "image": "/images/traffic-signs/sign-10-petunjuk-lokasi-pemberhentian-.svg"
  },
  {
    "id": "sign-11-petunjuk-lokasi-putar-balik",
    "yolo_index": 11,
    "name": "Petunjuk Lokasi Putar Balik",
    "category": "Petunjuk",
    "description": "Lokasi yang diizinkan untuk putar balik (U-turn).",
    "function": "Fasilitas putar arah.",
    "rules": "Lakukan putar balik dengan aman.",
    "image": "/images/traffic-signs/sign-11-petunjuk-lokasi-putar-balik.svg"
  },
  {
    "id": "sign-12-larangan-parkir",
    "yolo_index": 12,
    "name": "Larangan Parkir",
    "category": "Larangan",
    "description": "Melarang kendaraan parkir, namun boleh berhenti sejenak untuk turun/naik penumpang.",
    "function": "Mencegah penyempitan jalan.",
    "rules": "Dilarang parkir.",
    "image": "/images/traffic-signs/sign-12-larangan-parkir.svg"
  },
  {
    "id": "sign-13-petunjuk-penyeberangan-pejalan",
    "yolo_index": 13,
    "name": "Petunjuk Penyeberangan Pejalan Kaki",
    "category": "Petunjuk",
    "description": "Lokasi penyeberangan (Zebra Cross).",
    "function": "Menunjukkan area aman menyeberang.",
    "rules": "Beri jalan pada pejalan kaki.",
    "image": "/images/traffic-signs/sign-13-petunjuk-penyeberangan-pejalan.svg"
  },
  {
    "id": "sign-14-lampu-hijau",
    "yolo_index": 14,
    "name": "Lampu Hijau",
    "category": "Lampu Lalu Lintas",
    "description": "Lampu lalu lintas menyala hijau.",
    "function": "Kendaraan boleh jalan.",
    "rules": "Silakan jalan dengan hati-hati.",
    "image": "/images/traffic-signs/sign-14-lampu-hijau.svg"
  },
  {
    "id": "sign-15-lampu-kuning",
    "yolo_index": 15,
    "name": "Lampu Kuning",
    "category": "Lampu Lalu Lintas",
    "description": "Lampu lalu lintas menyala kuning.",
    "function": "Persiapan berhenti atau jalan.",
    "rules": "Hati-hati, kurangi kecepatan.",
    "image": "/images/traffic-signs/sign-15-lampu-kuning.svg"
  },
  {
    "id": "sign-16-lampu-merah",
    "yolo_index": 16,
    "name": "Lampu Merah",
    "category": "Lampu Lalu Lintas",
    "description": "Lampu lalu lintas menyala merah.",
    "function": "Kendaraan wajib berhenti.",
    "rules": "Berhenti di belakang garis.",
    "image": "/images/traffic-signs/sign-16-lampu-merah.svg"
  },
  {
    "id": "sign-17-larangan-belok-kanan",
    "yolo_index": 17,
    "name": "Larangan Belok Kanan",
    "category": "Larangan",
    "description": "Dilarang berbelok ke kanan di persimpangan.",
    "function": "Mengatur arus lalu lintas.",
    "rules": "Terus lurus atau belok kiri (sesuai arah lain).",
    "image": "/images/traffic-signs/sign-17-larangan-belok-kanan.svg"
  },
  {
    "id": "sign-18-larangan-belok-kiri",
    "yolo_index": 18,
    "name": "Larangan Belok Kiri",
    "category": "Larangan",
    "description": "Dilarang berbelok ke kiri di persimpangan.",
    "function": "Mengatur arus lalu lintas.",
    "rules": "Terus lurus atau belok kanan (sesuai arah lain).",
    "image": "/images/traffic-signs/sign-18-larangan-belok-kiri.svg"
  },
  {
    "id": "sign-19-larangan-berjalan-terus-wajib-",
    "yolo_index": 19,
    "name": "Larangan Berjalan Terus Wajib Berhenti Sesaat",
    "category": "Larangan",
    "description": "Wajib berhenti sejenak sebelum melanjutkan perjalanan (Rambu STOP).",
    "function": "Memastikan kondisi aman sebelum melintas.",
    "rules": "Berhenti total sejenak.",
    "image": "/images/traffic-signs/sign-19-larangan-berjalan-terus-wajib-.svg"
  },
  {
    "id": "sign-20-larangan-memutar-balik",
    "yolo_index": 20,
    "name": "Larangan Memutar Balik",
    "category": "Larangan",
    "description": "Dilarang melakukan manuver putar balik (U-turn).",
    "function": "Menghindari tabrakan atau kemacetan.",
    "rules": "Dilarang putar balik.",
    "image": "/images/traffic-signs/sign-20-larangan-memutar-balik.svg"
  }
];

const DEFAULT_INFO = {
  name: "Rambu belum terdaftar",
  category: "Umum",
  description: "Sistem mendeteksi ID kelas, tetapi informasi nama rambu belum tersedia di frontend.",
  function: "Fungsi rambu ini belum tersedia dalam sistem.",
  rules: "Ikuti arahan rambu di sekitar Anda dan tetap berhati-hati."
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

const getCategoryMeta = (kategori: string) => {
  const k = (kategori || "").toLowerCase();
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

type MediaMode = "upload" | "camera" | "video";
type PageSection = "deteksi" | "direktori" | "panduan";

export default function TrafficSignEducationPage() {
  const [activeSection, setActiveSection] = useState<PageSection>("deteksi");

  // --- DETEKSI RAMBU STATE ---
  const [mode, setMode] = useState<MediaMode>("upload");
  const [file, setFile] = useState<File | Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);

  // --- DIREKTORI RAMBU STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedSign, setSelectedSign] = useState<any | null>(null);

  // Filter logic
  const filteredSigns = useMemo(() => {
    return TRAFFIC_SIGN_DIRECTORY.filter(sign => {
      const matchSearch = sign.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sign.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === "Semua" || sign.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = ["Semua", ...Array.from(new Set(TRAFFIC_SIGN_DIRECTORY.map(s => s.category)))];

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

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

  useEffect(() => {
    if (activeSection === "deteksi" && mode === "camera") {
      if (!isPhotoTaken) startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [mode, isPhotoTaken, activeSection]);

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
      if (!cameraActive && activeSection === "deteksi") startCamera();
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
    const fileObj = file instanceof File ? file : new File([file], "camera_capture.jpg", { type: "image/jpeg" });
    formData.append("file", fileObj);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? `http://${window.location.hostname}:8001` : "http://127.0.0.1:8000");
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

  // True class mapping preserved securely
  const rawDetectionName = detectionResult?.class ?? detectionResult?.class_id ?? detectionResult?.name ?? detectionResult?.id ?? detectionResult?.label ?? detectionResult?.class_name ?? detectionResult?.className;
  const signId = rawDetectionName != null ? String(rawDetectionName) : null;
  const currentInfo = signId 
    ? TRAFFIC_SIGN_DIRECTORY.find(s => String(s.yolo_index) === signId) 
    : null;

  const displayInfo = signId && currentInfo 
    ? { ...currentInfo, rawId: signId } 
    : (signId ? { ...DEFAULT_INFO, description: `Sistem mendeteksi ID kelas ${signId}, tetapi informasi nama rambu belum tersedia.`, rawId: signId } : null);

  const meta = displayInfo ? getCategoryMeta(displayInfo.category) : null;

  return (
    <PublicPageShell>
      <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900 pb-24">
        
        {/* Compact Feature Header */}
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
                    Deteksi rambu, pahami artinya, dan pelajari tindakan yang perlu dilakukan saat berkendara.
                  </p>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.2} direction="left">
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium bg-[#0B1F3A]/40 backdrop-blur-md border border-blue-800/50 p-4 rounded-2xl shadow-lg">
                  <div className="flex flex-col">
                    <span className="text-blue-300/60 uppercase tracking-wider text-[10px] font-bold">Sumber</span>
                    <span className="text-white font-bold">Model Deteksi & DB</span>
                  </div>
                  <div className="w-px h-8 bg-blue-800/50 hidden sm:block"></div>
                  <div className="flex flex-col">
                    <span className="text-blue-300/60 uppercase tracking-wider text-[10px] font-bold">Status</span>
                    <span className="text-white font-bold">Mode Evaluasi</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Section Navigation Tabs */}
        <div className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex overflow-x-auto no-scrollbar gap-8">
              <button 
                onClick={() => setActiveSection("deteksi")}
                className={`py-4 font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${activeSection === "deteksi" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-900"}`}
              >
                <ImageIcon className="w-4 h-4" /> Deteksi Rambu
              </button>
              <button 
                onClick={() => setActiveSection("direktori")}
                className={`py-4 font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${activeSection === "direktori" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-900"}`}
              >
                <Layers className="w-4 h-4" /> Direktori Rambu
              </button>
              <button 
                onClick={() => setActiveSection("panduan")}
                className={`py-4 font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${activeSection === "panduan" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-900"}`}
              >
                <BookOpen className="w-4 h-4" /> Panduan Warna
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 relative z-20">
          
          {/* SECTION 1: DETEKSI RAMBU */}
          {activeSection === "deteksi" && (
            <ScrollReveal delay={0}>
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
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-10 whitespace-nowrap bg-slate-800 text-white px-2 py-1 rounded z-50">Menunggu dukungan backend</span>
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
                            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-slate-900 rounded-2xl overflow-hidden shadow-inner mb-4 flex items-center justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
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
                            <div className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-black rounded-2xl overflow-hidden shadow-inner mb-4 flex items-center justify-center">
                              {!isPhotoTaken ? (
                                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                              ) : (
                                previewUrl && <img src={previewUrl} alt="Captured" className="max-w-full max-h-full object-contain" /> // eslint-disable-line @next/next/no-img-element
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
                                  {isLoading ? "Memproses..." : "Gunakan & Analisis"}
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
                <div className="lg:w-7/12 p-8 lg:p-10 flex flex-col justify-center bg-white">
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

                  {!isLoading && !errorMessage && !displayInfo && (
                    <div className="text-center py-12 px-6">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="w-10 h-10 text-slate-300" />
                      </div>
                      <h3 className="text-xl font-extrabold text-[#0B1F3A] mb-2">Belum ada gambar dianalisis</h3>
                      <p className="text-slate-500 font-medium">Pilih foto rambu atau ambil foto dari kamera untuk memulai analisis.</p>
                    </div>
                  )}

                  {!isLoading && !errorMessage && displayInfo && meta && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center gap-2 mb-6">
                        <div className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2 ${meta.bg} ${meta.text} ${meta.borderColor}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${meta.badge}`} />
                          Kategori: {displayInfo.category}
                        </div>
                        {detectionResult?.confidence && (
                          <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            Akurasi: {Math.round(detectionResult.confidence * 100)}%
                          </div>
                        )}
                      </div>

                      <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] mb-8 leading-tight tracking-tight">
                        {displayInfo.name}
                      </h2>

                      <div className={`border-l-4 ${meta.leftBorder} pl-6 mb-8`}>
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Arti Rambu</h4>
                        <p className="text-lg font-medium text-slate-700 leading-relaxed">{displayInfo.description}</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Fungsi Utama
                          </h4>
                          <p className="text-sm font-bold text-slate-700">{displayInfo.function}</p>
                        </div>
                        <div className={`${meta.bg} border ${meta.borderColor} p-5 rounded-2xl`}>
                          <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 opacity-80 ${meta.text}`}>
                            {meta.icon} Tindakan Pengguna
                          </h4>
                          <p className={`text-sm font-bold ${meta.text}`}>{displayInfo.rules}</p>
                        </div>
                      </div>

                      {displayInfo.rawId && (
                        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                          <span className="text-[10px] text-slate-400 font-mono">ID Rambu: {displayInfo.rawId}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* SECTION 2: DIREKTORI RAMBU */}
          {activeSection === "direktori" && (
            <ScrollReveal delay={0}>
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Cari rambu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                  <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[#0B1F3A]">Daftar Rambu dalam Database</h2>
                <span className="text-sm font-medium text-slate-500">Menampilkan {filteredSigns.length} dari {TRAFFIC_SIGN_DIRECTORY.length} rambu</span>
              </div>

              {filteredSigns.length === 0 ? (
                <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl">
                  <p className="text-slate-500 font-medium">Tidak ada rambu yang cocok dengan pencarian Anda.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSigns.map(sign => {
                    const catMeta = getCategoryMeta(sign.category);
                    return (
                      <div key={sign.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex gap-4" onClick={() => setSelectedSign(sign)}>
                        <div className="w-16 h-16 shrink-0 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-2">
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img src={sign.image} alt={sign.name} className="max-w-full max-h-full" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTRhM2I4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIyIDE5YTIgMiAw MCAxLTIgMmgtNGwtMyAzaC0ybC0zLTNIMmEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmgxOGEyIDIgMCAwIDEgMiAydjE0eiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiLz48cGF0aCBkPSJNNyAyMXYtMmEyIDIgMCAwIDEgMi0yaDZhMiAyIDAgMCAxIDIgMnYyIi8+PC9zdmc+'; }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${catMeta.bg} ${catMeta.text}`}>
                            {sign.category}
                          </div>
                          <h3 className="font-bold text-[#0B1F3A] text-sm leading-tight line-clamp-2 mb-1">{sign.name}</h3>
                          <p className="text-xs text-slate-500 line-clamp-1">{sign.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </ScrollReveal>
          )}

          {/* SECTION 3: PANDUAN WARNA */}
          {activeSection === "panduan" && (
            <ScrollReveal delay={0}>
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="bg-red-50/50 border border-red-200 rounded-3xl p-8 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <ShieldAlert className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-extrabold text-red-900 mb-3">Warna Merah: Larangan</h3>
                  <p className="text-red-800 font-medium mb-6">Menandakan tindakan yang tidak boleh dilakukan oleh pengguna jalan demi keselamatan dan kelancaran arus lalu lintas.</p>
                  <div className="flex gap-2">
                    <span className="text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">Dilarang Masuk</span>
                    <span className="text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">Dilarang Parkir</span>
                  </div>
                </div>

                <div className="bg-amber-50/50 border border-amber-200 rounded-3xl p-8 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-extrabold text-amber-900 mb-3">Warna Kuning: Peringatan</h3>
                  <p className="text-amber-800 font-medium mb-6">Memberi peringatan terhadap potensi bahaya di depan atau area yang membutuhkan kewaspadaan tinggi.</p>
                  <div className="flex gap-2">
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">Zebra Cross</span>
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">Perlintasan KA</span>
                  </div>
                </div>

                <div className="bg-indigo-50/50 border border-indigo-200 rounded-3xl p-8 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-extrabold text-indigo-900 mb-3">Warna Biru: Kewajiban</h3>
                  <p className="text-indigo-800 font-medium mb-6">Memberi instruksi atau perintah wajib yang harus diikuti oleh pengguna jalan pada jalur tertentu.</p>
                  <div className="flex gap-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">Wajib Lajur Kiri</span>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">Pilih Jalur</span>
                  </div>
                </div>

                <div className="bg-blue-50/50 border border-blue-200 rounded-3xl p-8 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <Navigation className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-extrabold text-blue-900 mb-3">Warna Biru/Lainnya: Petunjuk</h3>
                  <p className="text-blue-800 font-medium mb-6">Memberi informasi mengenai fasilitas jalan, lokasi penting, atau area khusus untuk memudahkan perjalanan.</p>
                  <div className="flex gap-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">Area Parkir</span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">Halte Bus</span>
                  </div>
                </div>

              </div>

              <div className="mt-8 bg-white border border-slate-200 rounded-3xl p-8">
                <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-6">Catatan untuk pengguna jalan</h3>
                <ul className="space-y-4 text-sm font-medium text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>Pahami warna dan bentuk rambu sebelum mengambil keputusan berkendara.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>Patuhi rambu larangan dan perintah di area jalan untuk menghindari penalti dan kecelakaan.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>Selalu ikuti arahan petugas lalu lintas secara langsung apabila terjadi rekayasa lalu lintas atau kondisi darurat di lapangan.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          )}

          {/* Supporting Links Footer */}
          <div className="mt-16 pt-8 border-t border-slate-200">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Lanjutkan dengan fitur terkait</p>
             <div className="flex flex-wrap gap-4">
               <Link href="/traffic-overview" className="group flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                 <span className="text-sm font-bold text-[#0B1F3A] group-hover:text-blue-600 transition-colors">Pantauan lalu lintas</span>
                 <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
               </Link>
               <Link href="/congestion-prediction" className="group flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                 <span className="text-sm font-bold text-[#0B1F3A] group-hover:text-blue-600 transition-colors">Prediksi kemacetan</span>
                 <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
               </Link>
               <Link href="/departure-recommendation" className="group flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                 <span className="text-sm font-bold text-[#0B1F3A] group-hover:text-blue-600 transition-colors">Rekomendasi berangkat</span>
                 <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
               </Link>
             </div>
          </div>
        </div>
      </div>

      {/* Directory Sign Detail Modal */}
      {selectedSign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-full animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detail Rambu</span>
              <button onClick={() => setSelectedSign(null)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="w-32 h-32 shrink-0 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center p-4 mx-auto sm:mx-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedSign.image} alt={selectedSign.name} className="max-w-full max-h-full" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${getCategoryMeta(selectedSign.category).bg} ${getCategoryMeta(selectedSign.category).text}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${getCategoryMeta(selectedSign.category).badge}`} />
                    Kategori: {selectedSign.category}
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#0B1F3A] leading-tight mb-2">{selectedSign.name}</h2>
                  <p className="text-slate-600 text-sm">{selectedSign.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Fungsi</span>
                  <p className="text-sm font-bold text-slate-700">{selectedSign.function}</p>
                </div>
                <div className={`${getCategoryMeta(selectedSign.category).bg} p-4 rounded-xl border ${getCategoryMeta(selectedSign.category).borderColor}`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${getCategoryMeta(selectedSign.category).text} opacity-80`}>Aturan / Tindakan Pengguna</span>
                  <p className={`text-sm font-bold ${getCategoryMeta(selectedSign.category).text}`}>{selectedSign.rules}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PublicPageShell>
  );
}
