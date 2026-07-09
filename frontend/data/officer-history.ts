export const historyKpis = [
  { label: "Deteksi Kendaraan", value: "86", unit: "Data", color: "text-[#1D4ED8]", helper: "Identifikasi jenis kendaraan." },
  { label: "Deteksi Pelanggaran", value: "37", unit: "Data", color: "text-amber-600", helper: "Indikasi kasat mata AI." },
  { label: "Deteksi Rambu", value: "12", unit: "Data", color: "text-blue-600", helper: "Kondisi area sekitar." },
  { label: "Plat Tersamarkan", value: "74", unit: "Data", color: "text-teal-600", helper: "Pembacaan plat disensor." },
  { label: "Perlu Validasi", value: "34", unit: "Data", color: "text-amber-600", helper: "Tunggu review manual." },
  { label: "Risiko Tinggi", value: "18", unit: "Data", color: "text-red-600", helper: "Prioritas tindak lanjut." },
];

export const validationQueue = [
  { type: "Tanpa helm", count: "3 data perlu validasi", risk: "Tinggi" },
  { type: "Plat tidak jelas", count: "2 data perlu cek ulang", risk: "Sedang" },
  { type: "Boncengan > 2", count: "1 data perlu verifikasi", risk: "Tinggi" },
];

export const historyRows = [
  { time: "10:15", loc: "Simpang SKA (Utara)", cat: "Pelanggaran", res: "Tanpa helm", count: "1", risk: "Tinggi", val: "Perlu validasi", note: "Cek ulang frame sample", follow: "Monitoring Pelanggaran" },
  { time: "10:18", loc: "Simpang SKA (Utara)", cat: "Kendaraan", res: "Motor terpantau", count: "8", risk: "Rendah", val: "Ditinjau", note: "Arus normal", follow: "Forecasting" },
  { time: "10:22", loc: "Simpang SKA (Selatan)", cat: "Plat", res: "BM 2*** CD", count: "1", risk: "Sedang", val: "Perlu validasi", note: "Plat terhalang", follow: "Plate Monitoring" },
  { time: "10:25", loc: "Simpang SKA (Timur)", cat: "Kendaraan", res: "Mobil terpantau", count: "4", risk: "Rendah", val: "Ditinjau", note: "Arus lancar", follow: "Dashboard" },
  { time: "10:35", loc: "Simpang SKA (Utara)", cat: "Pelanggaran", res: "Boncengan Tiga", count: "1", risk: "Tinggi", val: "Perlu validasi", note: "Verifikasi visual", follow: "Monitoring Pelanggaran" },
  { time: "10:40", loc: "Simpang SKA (Selatan)", cat: "Forecasting", res: "Estimasi Normal", count: "1", risk: "Rendah", val: "Ditinjau", note: "Berdasarkan volume", follow: "Forecasting" },
  { time: "10:45", loc: "Simpang SKA (Barat)", cat: "Pelanggaran", res: "Tanpa helm", count: "2", risk: "Tinggi", val: "Perlu validasi", note: "Pengendara dan penumpang", follow: "Dashboard" },
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
