export const reportKpis = [
  { label: "Kendaraan Terpantau", value: "86", unit: "Kendaraan", color: "text-[#1D4ED8]", helper: "Total dari data pemantauan." },
  { label: "Plat Tersamarkan", value: "74", unit: "Data", color: "text-teal-600", helper: "Data plat yang disensor." },
  { label: "Pelanggaran Dominan", value: "Tanpa helm", unit: "", color: "text-amber-600", helper: "Kategori tertinggi pada sistem." },
  { label: "Area Risiko Tinggi", value: "3", unit: "Area", color: "text-red-600", helper: "Perlu prioritas tindak lanjut." },
  { label: "Prediksi Kemacetan", value: "32", unit: "Menit", color: "text-blue-600", helper: "Estimasi di Simpang SKA." },
  { label: "Rekomendasi Aktif", value: "4", unit: "Tindakan", color: "text-[#0B1F3A]", helper: "Tindakan operasional petugas." },
];

export const reportRows = [
  { cat: "Kendaraan", res: "Kendaraan terpantau", count: "86", risk: "Sedang", val: "Ditinjau", note: "Volume meningkat menuju siang" },
  { cat: "Pelanggaran", res: "Tanpa helm", count: "24", risk: "Tinggi", val: "Ditinjau", note: "Kategori dominan sistem" },
  { cat: "Pelanggaran", res: "Bonceng >2", count: "8", risk: "Sedang", val: "Ditinjau", note: "Periksa konteks visual" },
  { cat: "Plat", res: "Plat tersamarkan perlu pemeriksaan", count: "5", risk: "Tinggi", val: "Ditinjau", note: "Tidak menampilkan data asli" },
  { cat: "Forecasting", res: "Kemacetan 32 menit", count: "1", risk: "Tinggi", val: "Ditinjau", note: "Antisipasi periode siang" },
  { cat: "Area", res: "Simpang SKA", count: "1", risk: "Tinggi", val: "Ditinjau", note: "Area prioritas petugas" },
];

export const validationChecklist = [
  { task: "Data pelanggaran sudah ditinjau petugas.", status: "Perlu validasi", color: "bg-amber-100 text-amber-700" },
  { task: "Plat tersamarkan sudah diperiksa ulang.", status: "Belum selesai", color: "bg-slate-100 text-slate-600" },
  { task: "Area prioritas sudah dicocokkan dengan kondisi lapangan.", status: "Ditinjau", color: "bg-teal-100 text-teal-700" },
  { task: "Prediksi sudah dibandingkan dengan hasil monitoring.", status: "Ditinjau", color: "bg-teal-100 text-teal-700" },
  { task: "Catatan laporan sudah disiapkan.", status: "Belum selesai", color: "bg-slate-100 text-slate-600" },
];

export const recommendedReportActions = [
  { title: "Validasi Risiko Tinggi", desc: "Validasi data risiko tinggi sebelum finalisasi.", link: "/officer/violation-monitoring" },
  { title: "Periksa Plat Buram", desc: "Periksa kembali plat tersamarkan yang bermasalah.", link: "/officer/vehicle-plate" },
  { title: "Konteks Riwayat", desc: "Cocokkan laporan dengan halaman Riwayat Deteksi.", link: "/officer/history" },
  { title: "Keputusan Operasional", desc: "Gunakan laporan sebagai draft dokumentasi, bukan keputusan final.", link: "/officer/smart-insight" },
];

export const reportQuickLinks = [
  { label: "Riwayat Deteksi", href: "/officer/history", helper: "Lihat log deteksi harian" },
  { label: "Monitoring Pelanggaran", href: "/officer/violation-monitoring", helper: "Lihat tren real-time" },
  { label: "Plate Monitoring", href: "/officer/vehicle-plate", helper: "Pantau indikasi administrasi" },
  { label: "Smart Insight", href: "/officer/smart-insight", helper: "Analisis prioritas area" },
];
