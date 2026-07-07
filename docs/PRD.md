# PRD — RoadTierbers

## 1. Product Overview

RoadTierbers adalah website dan command center berbasis Deep Learning untuk membantu masyarakat dan petugas memahami kondisi lalu lintas, prediksi kemacetan, deteksi pelanggaran, dan insight operasional secara lebih mudah.

RoadTierbers bukan sekadar kumpulan demo model AI. RoadTierbers diposisikan sebagai:

**Smart Traffic Command Center for Safer and Smarter Roads**

Website ini memiliki dua area utama:

1. **Public Area**  
   Area publik untuk masyarakat umum agar dapat melihat ringkasan kondisi lalu lintas, prediksi kemacetan sederhana, rekomendasi waktu keberangkatan, dan edukasi rambu lalu lintas.

2. **Officer Area**  
   Area petugas untuk monitoring hasil deteksi, pelanggaran, kendaraan, plat, forecasting, smart insight, history, report, dan AI assistant.

Project ini dibuat untuk kebutuhan demo akademik/proyek Deep Learning, tetapi desain dan experience harus dibuat seperti produk profesional yang siap dipresentasikan.

---

## 2. Product Vision

RoadTierbers ingin menghadirkan pengalaman monitoring lalu lintas yang:

- Mudah dipahami masyarakat umum.
- Membantu petugas mengambil keputusan lebih cepat.
- Menyatukan banyak model Deep Learning dalam satu sistem yang rapi.
- Terlihat premium, modern, dan serius saat dipresentasikan.
- Tidak terasa seperti template AI generik.

---

## 3. Design Direction

### Main Design Reference

Desain RoadTierbers mengambil inspirasi dari gaya website Apple:

- Clean.
- Premium.
- Minimal.
- Banyak white space.
- Typography besar dan kuat.
- Visual hierarchy jelas.
- Copywriting singkat, tegas, dan elegan.
- Section terasa seperti product storytelling.
- Tidak ramai.
- Tidak terlalu banyak warna.
- Tidak terlalu dashboard-heavy pada public area.

RoadTierbers **tidak boleh meniru Apple secara identik**, tetapi mengambil prinsip desainnya:

- Simplicity.
- Clarity.
- Premium product feel.
- Focus on one message per section.
- Strong spacing.
- Smooth rounded cards.
- Soft shadows.
- Elegant transitions.
- High readability.

---

## 4. Visual Style

### Overall Style

RoadTierbers menggunakan gaya:

**Apple-inspired Modern Traffic Intelligence Platform**

Ciri visual:

- Background dominan putih, off-white, light gray.
- Aksen dark navy / police blue.
- Aksen cyan/teal digunakan secukupnya.
- Status menggunakan warna fungsional:
  - Green untuk aman/lancar/valid.
  - Yellow/amber untuk sedang/waspada/perlu perhatian.
  - Red untuk padat/tinggi/kritis/bermasalah.
- Card besar, bersih, dan bernapas.
- Layout tidak boleh terlalu padat.
- Hindari tampilan seperti dashboard admin murahan.
- Hindari gradient AI generic.
- Hindari neon/cyberpunk.
- Hindari emoji-heavy UI.
- Hindari blob background berlebihan.
- Hindari terlalu banyak badge dan icon yang tidak penting.

### Design Keywords

- Premium
- Clean
- Calm
- Intelligent
- Trustworthy
- Public-friendly
- Officer-ready
- Apple-inspired
- Traffic intelligence
- Decision support

---

## 5. Typography

Gunakan typography modern dan bersih.

Rekomendasi:

- Font utama: Geist / Inter / system sans-serif.
- Heading besar, bold, dan confident.
- Body text tidak terlalu kecil.
- Public area harus nyaman dibaca masyarakat.
- Officer area boleh lebih compact, tetapi tetap bersih.

Heading style:

- Hero title besar.
- Section title jelas.
- Paragraph pendek.
- Jangan gunakan paragraf terlalu panjang.

---

## 6. Color Direction

Gunakan palet warna berikut sebagai arahan:

### Core Colors

- Background: `#FFFFFF`
- Soft Background: `#F5F7FA`
- Card Background: `#FFFFFF`
- Main Text: `#0F172A`
- Muted Text: `#64748B`
- Border: `#E2E8F0`

### Brand / Command Colors

- Police Navy: `#0B1F3A`
- Command Blue: `#1D4ED8`
- Soft Blue: `#EFF6FF`
- Cyan Accent: `#06B6D4`
- Teal Accent: `#14B8A6`

### Status Colors

- Success Green: `#16A34A`
- Warning Amber: `#D97706`
- Danger Red: `#DC2626`
- Neutral Slate: `#475569`

---

## 7. Target Users

### 7.1 Public Users

Masyarakat umum yang ingin mengetahui:

- Kondisi lalu lintas secara ringkas.
- Prediksi durasi kemacetan.
- Rekomendasi waktu keberangkatan.
- Edukasi rambu lalu lintas.

Public user tidak membutuhkan informasi teknis model, confidence score, data plat, pajak, history, atau laporan petugas.

### 7.2 Officer Users

Petugas yang membutuhkan:

- Dashboard monitoring.
- Deteksi pelanggaran.
- Deteksi kendaraan.
- Deteksi plat dan pajak.
- Forecasting kondisi lalu lintas.
- Smart insight.
- History deteksi.
- Report dan export.
- AI assistant untuk membantu analisis.

### 7.3 Evaluator / Dosen

Evaluator melihat apakah website:

- Profesional.
- Fitur lengkap.
- Model terintegrasi dalam satu sistem.
- Alur demo jelas.
- Tampilan tidak seperti template biasa.
- Cocok dengan tema Deep Learning.

---

## 8. Product Areas

## 8.1 Public Area

Public Area adalah area ringan, premium, dan mudah dipahami.

Halaman public:

1. Landing Page
2. Public Traffic Overview
3. Congestion Prediction
4. Departure Recommendation
5. Traffic Sign Education
6. About Project

Public Area harus terasa seperti product website premium, bukan dashboard berat.

### Public Data Rules

Public Area tidak boleh menampilkan:

- Nomor plat kendaraan.
- Status pajak kendaraan.
- Riwayat deteksi detail.
- Confidence score.
- Detail pelanggaran petugas.
- Export report.
- AI assistant petugas.
- Data sensitif lainnya.

---

## 8.2 Officer Area

Officer Area adalah area command center untuk petugas.

Halaman officer:

1. Login Petugas
2. Command Center Dashboard
3. AI Detection Center
4. Violation Monitoring
5. Vehicle & Plate Monitoring
6. Forecasting Prediction Center
7. Smart Insight
8. Detection History
9. Report / Export
10. Officer AI Assistant

Officer Area boleh lebih dashboard-like, tetapi tetap harus premium, clean, dan tidak terlalu padat.

---

## 9. Core Features

## 9.1 Landing Page

Landing Page adalah halaman utama yang memperkenalkan RoadTierbers.

Tujuan:

- Menjelaskan apa itu RoadTierbers.
- Menampilkan positioning sebagai Smart Traffic Command Center.
- Mengarahkan user ke public area atau officer login.
- Menunjukkan fitur utama secara elegan.

Style:

- Apple-inspired hero.
- Big headline.
- Short supporting text.
- Large clean sections.
- Premium product feel.
- Minimal but impactful.

Konten utama:

- Hero section.
- Value proposition.
- Public feature preview.
- Officer command center preview.
- Model integration overview.
- Final CTA.

Hero copy direction:

Title:
**RoadTierbers**

Subtitle:
**Smart Traffic Command Center for Safer and Smarter Roads**

Description:
Sistem terpadu berbasis Deep Learning untuk membantu memahami kondisi lalu lintas, memprediksi kemacetan, mendeteksi pelanggaran, dan memberikan insight bagi petugas.

CTA:
- Lihat Kondisi Lalu Lintas
- Masuk Command Center

---

## 9.2 Public Traffic Overview

Halaman ini menampilkan ringkasan kondisi lalu lintas untuk masyarakat.

Konten:

- Status lalu lintas saat ini:
  - Lancar
  - Sedang
  - Padat
- Estimasi durasi kemacetan.
- Rekomendasi singkat.
- Pesan keselamatan.
- Area pemantauan umum.

Style:

- Clean.
- Public-friendly.
- Tidak terlalu teknis.
- Tidak menampilkan data sensitif.
- Gunakan card besar dan jelas.

---

## 9.3 Congestion Prediction

Halaman ini membantu masyarakat memahami prediksi kemacetan.

Konten:

- Area/rute pemantauan contoh.
- Waktu pemantauan.
- Prediksi durasi kemacetan.
- Status kondisi:
  - Lancar
  - Sedang
  - Padat
- Trend:
  - meningkat
  - stabil
  - menurun
- Timeline sederhana.

Tidak boleh menampilkan:

- LSTM details.
- Confidence score.
- Data teknis model.
- Data petugas.

---

## 9.4 Departure Recommendation

Halaman ini memberi rekomendasi waktu keberangkatan sederhana.

Logic MVP:

- Jika durasi kemacetan rendah, user bisa berangkat sekarang.
- Jika sedang, user disarankan menyiapkan waktu tambahan.
- Jika tinggi, user disarankan menunda 20–30 menit jika tidak mendesak.

Konten:

- Estimasi kondisi perjalanan.
- Rekomendasi waktu.
- Alasan rekomendasi.
- Safety note.

---

## 9.5 Traffic Sign Education

Halaman edukasi rambu untuk masyarakat.

Fitur:

- Upload/sample gambar rambu.
- Hasil deteksi rambu.
- Nama rambu.
- Jenis rambu.
- Penjelasan sederhana.
- Pesan keselamatan.

Style:

- Edukatif.
- Bersih.
- Public-friendly.
- Tidak terlalu teknis.

---

## 9.6 About Project

Halaman tentang project.

Konten:

- Latar belakang.
- Tujuan project.
- Peran Deep Learning.
- Disclaimer akademik.
- Tim project jika diperlukan.

Disclaimer:

RoadTierbers merupakan prototype akademik berbasis Deep Learning untuk kebutuhan pembelajaran dan demonstrasi. Sistem ini belum ditujukan sebagai alat keputusan resmi tanpa validasi lanjutan.

Jangan tampilkan daftar teknologi terlalu berlebihan di halaman ini.

---

## 10. Officer Features

## 10.1 Login Petugas

Login MVP boleh frontend-only untuk demo.

Konten:

- Form email/username.
- Password.
- Tombol masuk.
- Demo credential note jika diperlukan.
- Setelah login diarahkan ke `/officer/dashboard`.

Style:

- Premium.
- Clean.
- Tidak seperti form admin biasa.
- Bisa menggunakan split layout.

---

## 10.2 Command Center Dashboard

Dashboard utama petugas.

Konten:

- System status:
  - Normal
  - Waspada
  - Kritis
- Traffic condition:
  - Lancar
  - Sedang
  - Padat
- Violation risk:
  - Rendah
  - Sedang
  - Tinggi
- Total deteksi hari ini.
- Total pelanggaran hari ini.
- Total kendaraan terdeteksi.
- Pelanggaran dominan.
- Forecasting snapshot.
- Smart insight ringkas.
- Quick actions.

Style:

- Command center clean.
- Lebih compact dari public area.
- Tetap premium.
- Tidak terlalu gelap.

---

## 10.3 AI Detection Center

Halaman untuk menjalankan deteksi AI.

Kategori deteksi:

1. Deteksi tanpa helm.
2. Deteksi motor berbonceng lebih dari 2.
3. Deteksi jumlah dan jenis kendaraan.
4. Deteksi plat kendaraan.
5. Deteksi status pajak kendaraan.
6. Deteksi rambu lalu lintas.

Workflow:

1. Pilih jenis deteksi.
2. Pilih sample case atau upload file.
3. Klik analisis.
4. Tampilkan hasil:
   - preview gambar/video,
   - bounding box mock/hasil,
   - label,
   - count,
   - status,
   - rekomendasi.

UI harus terasa seperti tool petugas, bukan demo notebook.

---

## 10.4 Violation Monitoring

Halaman monitoring pelanggaran.

Pelanggaran utama:

- Pengendara motor tidak menggunakan helm.
- Motor berbonceng lebih dari 2 orang.
- Plat/pajak kendaraan bermasalah.

Konten:

- Summary pelanggaran.
- Dominant violation.
- Risk status.
- Table ringkas.
- Recommendation.

---

## 10.5 Vehicle & Plate Monitoring

Halaman khusus kendaraan dan plat.

Konten:

- Vehicle count.
- Vehicle type.
- Plate detection.
- Plate/tax status.

Status:

- Valid
- Perlu Pemeriksaan
- Bermasalah

Karena data ini sensitif, hanya tampil di Officer Area.

---

## 10.6 Forecasting Prediction Center

Satu halaman dengan tiga kategori forecasting:

1. Volume kendaraan.
2. Jumlah pelanggaran.
3. Durasi kemacetan.

UI:

- Tab atau segmented control.
- Filter area sederhana.
- Prediction summary.
- Chart.
- Detail table.
- Smart insight.

Rute contoh:

- Pandau → Simpang Tiga
- Simpang SKA → Bandara SSK II
- Panam (UNRI) → Simpang SKA
- Pasar Pusat → Rumbai
- Jl. Sudirman (MTQ) → Kantor Gubernur
- Harapan Raya → Sudirman

---

## 10.7 Smart Insight

Smart Insight mengubah data monitoring menjadi narasi keputusan.

Konten:

- Kesimpulan kondisi lalu lintas.
- Pelanggaran dominan.
- Risk status.
- Prediksi beberapa jam ke depan.
- Rekomendasi tindakan petugas.
- Catatan prioritas monitoring.
- Kesimpulan singkat untuk laporan.

Style:

- Decision-support card.
- Clean.
- Tidak terlalu panjang.
- Terasa membantu petugas.

---

## 10.8 Detection History

Tabel riwayat deteksi.

Kolom:

- Timestamp.
- Jenis model/deteksi.
- Sumber input:
  - upload
  - sample case
  - preloaded case
- Jenis pelanggaran/objek.
- Jumlah terdeteksi.
- Confidence rata-rata.
- Status risiko.
- Aksi lihat detail.

---

## 10.9 Report / Export

Halaman laporan.

Fokus:

- Laporan pelanggaran.
- Preview table.
- Smart conclusion.
- Export Excel.

MVP:

- Export boleh simulasi atau generate client-side.
- Tidak perlu filter kompleks.
- Fokus demo.

---

## 10.10 Officer AI Assistant

AI Assistant hanya untuk Officer Area.

Fungsi:

- Merangkum kondisi dashboard.
- Menjelaskan hasil deteksi.
- Membantu membaca forecasting.
- Memberi rekomendasi tindakan.
- Membantu membuat conclusion laporan.

Aturan:

- Tidak muncul di Public Area.
- Menjawab hanya dalam konteks RoadTierbers.
- Jika API LLM belum tersedia, gunakan fallback template response.
- Tidak mengarang data di luar mock/backend data.

---

## 11. Integrated Deep Learning Models

RoadTierbers mengintegrasikan beberapa model:

1. Deteksi berbonceng lebih dari 2 — YOLOv8.
2. Forecasting volume kendaraan — LSTM.
3. Deteksi plat kendaraan — YOLOv8s.
4. Deteksi status pajak — YOLO + OCR.
5. Deteksi rambu Indonesia — YOLOv8.
6. Deteksi jumlah dan jenis kendaraan — YOLO/ONNX.
7. Deteksi tanpa helm — YOLOv8.
8. Forecasting jumlah pelanggaran — LSTM.
9. Forecasting durasi kemacetan — LSTM.

Catatan:

Public Area tidak perlu menyebut model secara teknis.  
Officer/About boleh menyebut secara umum bahwa sistem berbasis Deep Learning.

---

## 12. Data Strategy

Pada tahap frontend-first, gunakan data:

- Sample case.
- Preloaded case.
- Mock data realistis.
- Struktur data harus backend-compatible.

Jangan menggunakan istilah "dummy data" di UI.

Gunakan istilah:

- Sample pemantauan.
- Contoh area pemantauan.
- Preloaded case.
- Data simulasi prototype.
- Sample case.

---

## 13. Backend Integration Direction

Backend nantinya menggunakan FastAPI sebagai orchestrator.

Frontend harus siap menerima REST API.

Expected backend areas:

- Dashboard summary.
- Detection analyze.
- Forecasting result.
- Detection history.
- Report data.
- Assistant chat.

Namun pada fase awal, frontend boleh menggunakan mock data lokal.

---

## 14. Tech Stack

Frontend:

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Recharts.
- TanStack Table.
- TanStack Query.
- React Hook Form.
- Zod.
- Lucide React.
- Framer Motion minimal.

Backend:

- FastAPI.
- SQLite.
- REST API.
- Python model inference wrapper.

Development:

- Antigravity as primary editor.
- Git for version control.
- Step-by-step commit workflow.

---

## 15. Routing Plan

Public routes:

- `/`
- `/traffic-overview`
- `/congestion-prediction`
- `/departure-recommendation`
- `/traffic-sign-education`
- `/about`

Officer routes:

- `/login`
- `/officer/dashboard`
- `/officer/ai-detection`
- `/officer/violation-monitoring`
- `/officer/vehicle-plate`
- `/officer/forecasting`
- `/officer/smart-insight`
- `/officer/history`
- `/officer/report`
- `/officer/assistant`

---

## 16. Responsive Rules

Desktop:

- Primary target for demo.
- Must look good on laptop and projector.
- Officer area optimized for desktop.

Mobile:

- Public area must be responsive.
- Officer area can be usable but does not need to be perfect for mobile.

---

## 17. Loading, Empty, and Error States

Every important data feature should eventually have:

- Loading state.
- Empty state.
- Error state.
- Retry action if needed.
- Fallback sample case.

Text must be friendly and in Bahasa Indonesia.

---

## 18. UI Copywriting Rules

Use short, professional Bahasa Indonesia.

Avoid:

- Terlalu promosi.
- Terlalu teknis.
- Terlalu panjang.
- Kata-kata template AI.
- Emoji berlebihan.
- "Powered by AI" terlalu sering.

Good tone:

- Tenang.
- Profesional.
- Jelas.
- Seperti produk serius.

Examples:

- "Pantau kondisi lalu lintas dengan ringkas dan mudah dipahami."
- "Estimasi kemacetan membantu Anda memilih waktu perjalanan yang lebih aman."
- "Prioritaskan pengawasan pada area dengan risiko pelanggaran meningkat."
- "Sistem membaca pola dari sample pemantauan yang tersedia."

---

## 19. Demo Strategy

Demo harus mengalir seperti cerita produk:

1. Landing page.
2. Public traffic overview.
3. Congestion prediction.
4. Departure recommendation.
5. Traffic sign education.
6. Login petugas.
7. Command center dashboard.
8. AI detection center.
9. Violation monitoring.
10. Forecasting.
11. Smart insight.
12. History.
13. Report.
14. AI Assistant.

Presenter harus bisa menjelaskan:

- Apa masalahnya.
- Bagaimana RoadTierbers membantu.
- Bagaimana model-model Deep Learning disatukan.
- Bagaimana public dan officer area dipisahkan.
- Bagaimana sistem membantu keputusan petugas.

---

## 20. Build Strategy

Development dilakukan bertahap.

Urutan build:

1. Project setup.
2. Documentation setup.
3. Base design system.
4. Public layout.
5. Officer layout.
6. Mock data foundation.
7. Landing page.
8. Public pages.
9. Officer dashboard.
10. Detection center.
11. Forecasting.
12. Smart insight.
13. History.
14. Report.
15. Assistant.
16. Polish.
17. Demo testing.

Setiap task harus:

- Kecil.
- Jelas.
- Bisa dites.
- Lulus lint.
- Lulus build.
- Di-commit sebelum lanjut.

---

## 21. Definition of Done

Sebuah fitur dianggap selesai jika:

- Sesuai PRD.
- UI terlihat premium dan rapi.
- Tidak terasa generic AI template.
- Responsive minimal desktop dan public mobile.
- Tidak ada error lint.
- Tidak ada error build.
- Copywriting Bahasa Indonesia.
- Data public dan officer tidak tercampur.
- Sudah di-commit.

---

## 22. Final Product Expectation

RoadTierbers harus terlihat seperti:

- Website produk modern.
- Traffic intelligence platform.
- Command center petugas.
- Prototype akademik yang serius.
- Sistem yang mengintegrasikan banyak model Deep Learning.

RoadTierbers tidak boleh terlihat seperti:

- Template admin biasa.
- Landing page AI generic.
- Dashboard penuh warna tanpa arah.
- Website tugas kuliah yang asal jadi.
- Demo notebook yang dipindahkan ke web.