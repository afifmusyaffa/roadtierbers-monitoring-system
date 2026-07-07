export const historyKpis = [
  { label: "Deteksi Kendaraan", value: "86", unit: "Data", color: "text-[#1D4ED8]", helper: "Identifikasi jenis kendaraan." },
  { label: "Deteksi Pelanggaran", value: "37", unit: "Data", color: "text-amber-600", helper: "Indikasi kasat mata AI." },
  { label: "Deteksi Rambu", value: "12", unit: "Data", color: "text-blue-600", helper: "Kondisi area sekitar." },
  { label: "Plat Tersamarkan", value: "74", unit: "Data", color: "text-teal-600", helper: "Pembacaan plat disensor." },
  { label: "Perlu Validasi", value: "34", unit: "Data", color: "text-amber-600", helper: "Tunggu review manual." },
  { label: "Risiko Tinggi", value: "18", unit: "Data", color: "text-red-600", helper: "Prioritas tindak lanjut." },
];

export const historyRows = [
  { time: "10:15", loc: "Simpang SKA", cat: "Pelanggaran", res: "Tanpa helm", count: "5", risk: "Tinggi", val: "Perlu validasi", note: "Cek ulang frame sample", follow: "Monitoring Pelanggaran" },
  { time: "10:18", loc: "Panam (UNRI)", cat: "Kendaraan", res: "Motor terpantau", count: "24", risk: "Sedang", val: "Ditinjau", note: "Kepadatan mulai naik", follow: "Forecasting" },
  { time: "10:22", loc: "Jl. Sudirman", cat: "Plat", res: "BM 2*** CD", count: "1", risk: "Sedang", val: "Perlu validasi", note: "Plat tidak jelas", follow: "Plate Monitoring" },
  { time: "10:25", loc: "Harapan Raya", cat: "Plat", res: "BM 9*** RS", count: "1", risk: "Tinggi", val: "Perlu validasi", note: "Administrasi simulasi perlu pemeriksaan", follow: "Plate Monitoring" },
  { time: "10:30", loc: "Simpang SKA", cat: "Rambu", res: "Dilarang berhenti", count: "1", risk: "Sedang", val: "Ditinjau", note: "Perhatikan area sekitar rambu", follow: "AI Detection" },
  { time: "10:35", loc: "Jl. Sudirman", cat: "Pelanggaran", res: "Area berhenti", count: "1", risk: "Sedang", val: "Perlu validasi", note: "Cocokkan dengan rambu sekitar", follow: "Monitoring Pelanggaran" },
  { time: "10:40", loc: "Simpang SKA", cat: "Forecasting", res: "Kemacetan 32 menit", count: "1", risk: "Tinggi", val: "Ditinjau", note: "Antisipasi periode siang", follow: "Forecasting" },
  { time: "10:45", loc: "Harapan Raya", cat: "Kendaraan", res: "Volume meningkat", count: "1", risk: "Sedang", val: "Ditinjau", note: "Perlu pemantauan lanjutan", follow: "Dashboard" },
];

export const validationQueue = [
  { type: "Tanpa helm", count: "14 data perlu validasi", risk: "Tinggi" },
  { type: "Administrasi simulasi", count: "5 data perlu pemeriksaan", risk: "Tinggi" },
  { type: "Plat tidak jelas", count: "7 data perlu cek ulang", risk: "Sedang" },
  { type: "Area berhenti", count: "4 data perlu verifikasi", risk: "Sedang" },
];

export const riskTimeline = [
  { time: "08:00", risk: "Rendah", color: "bg-slate-300", note: "Data masuk normal. Volume kendaraan lancar." },
  { time: "09:00", risk: "Sedang", color: "bg-amber-400", note: "Volume mulai naik di beberapa persimpangan utama." },
  { time: "10:00", risk: "Sedang", color: "bg-amber-400", note: "Indikasi pelanggaran kasat mata mulai bermunculan." },
  { time: "11:00", risk: "Tinggi", color: "bg-red-500", note: "Validasi pelanggaran dan plat perlu diprioritaskan segera." },
  { time: "12:00", risk: "Tinggi", color: "bg-red-500", note: "Antisipasi lonjakan kepadatan puncak periode siang." },
];

export const recommendedActions = [
  { title: "Validasi Risiko Tinggi", desc: "Selesaikan antrean prioritas.", link: "/officer/violation-monitoring" },
  { title: "Tinjau Plat Buram", desc: "Cek frame sample plat.", link: "/officer/vehicle-plate" },
  { title: "Konteks Visual AI", desc: "Cocokkan dengan deteksi AI.", link: "/officer/ai-detection" },
  { title: "Susun Pelaporan", desc: "Dokumentasi akhir harian.", link: "/officer/report" },
];

export const quickLinks = [
  { label: "Pusat Deteksi AI", href: "/officer/ai-detection", helper: "Lihat hasil analisis visual" },
  { label: "Monitoring Pelanggaran", href: "/officer/violation-monitoring", helper: "Lihat tren real-time" },
  { label: "Plate Monitoring", href: "/officer/vehicle-plate", helper: "Pantau indikasi administrasi" },
  { label: "Buat Laporan", href: "/officer/report", helper: "Unduh evaluasi harian" },
];
