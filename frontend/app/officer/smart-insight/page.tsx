"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { OfficerPageHeader } from "@/components/officer/officer-page-header";
import { OfficerDisclaimer } from "@/components/officer/officer-disclaimer";
import { KpiCard } from "@/components/officer/kpi-card";
import { StatusBadge } from "@/components/common";
import { AreaRiskScoreChart, ActionPriorityChart } from "@/components/charts/officer-insight-charts";
import { apiUrl } from "@/lib/api";

export default function OfficerSmartInsightPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchData(isSilent = false) {
      try {
        const res = await fetch(apiUrl("/insights/summary"));
        const json = await res.json();
        if (json.status === "success") {
          setData(json.data);
          setLastUpdated(new Date());
          setError("");
        } else if (!isSilent) {
          setError(json.message || "Gagal mengambil data dari server");
        }
      } catch (err) {
        if (!isSilent) {
          setError("Koneksi ke backend gagal.");
        }
      } finally {
        if (!isSilent) {
          setLoading(false);
        }
      }
    }
    fetchData(false);
    const interval = setInterval(() => fetchData(true), 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <OfficerPageShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-medium animate-pulse">Menghubungkan ke server AI...</p>
          </div>
        </div>
      </OfficerPageShell>
    );
  }

  if (error || !data) {
    return (
      <OfficerPageShell>
        <div className="flex items-center justify-center min-h-[60vh] text-red-500">
          <p>{error || "Data kosong"}</p>
        </div>
      </OfficerPageShell>
    );
  }

  // Tailored text helper
  const riskLevel = data.risiko_tinggi_count > 1 ? "Tinggi" : "Sedang";
  const dominantViolationText = data.dominant_violation === "Tanpa Helm" 
    ? "Pelanggaran tanpa helm" 
    : data.dominant_violation === "Bonceng >2" 
    ? "Bonceng lebih dari 2" 
    : "Tidak terdeteksi pelanggaran dominan";

  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        
        <OfficerPageHeader
          title="Insight Operasional Petugas"
          description="Ringkasan analisis kondisi lalu lintas, risiko pelanggaran, area prioritas, dan rekomendasi tindakan untuk membantu petugas membaca situasi."
          badge={{ label: "Smart Insight", tone: "green" }}
          lastUpdated={lastUpdated}
          compact
        />

        {/* 2. Insight KPI Grid */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="Area Prioritas"
              value={`${data.area_prioritas_count}`}
              unit="Area"
              tone="blue"
              helper="Butuh pengawasan lebih"
            />
            <KpiCard
              title="Risiko Tinggi"
              value={`${data.risiko_tinggi_count}`}
              unit="Kategori"
              tone="red"
              helper="Perlu segera ditangani"
            />
            <KpiCard
              title="Pelanggaran Dominan"
              value={data.dominant_violation}
              isText
              tone="amber"
              helper="Berdasarkan data deteksi"
            />
            <KpiCard
              title="Rekomendasi Utama"
              value={`${data.rekomendasi_aktif_count}`}
              unit="Tindakan"
              tone="emerald"
              helper="Disarankan untuk petugas"
            />
          </div>
        </section>

        {/* 3. Charts Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col h-full">
              <h3 className="text-sm font-medium text-[#0B1F3A] mb-4">Skor Risiko Area</h3>
              <div className="h-44">
                <AreaRiskScoreChart data={data.risk_score_data} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col h-full">
              <h3 className="text-sm font-medium text-[#0B1F3A] mb-4">Prioritas Tindakan</h3>
              <div className="h-44">
                <ActionPriorityChart data={data.action_priority_data} />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Insight Workspace */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column (Analysis) */}
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Analisis Penyebab (Cause Analysis)</h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-teal-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Volume kendaraan meningkat secara konstan pada periode jam padat.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-teal-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Pelanggaran {data.dominant_violation} paling sering muncul sebagai akibat sekunder dari kepadatan di jalur pendek.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-teal-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Beberapa area persimpangan menunjukkan kombinasi bahaya kepadatan dan risiko pelanggaran marka.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Analisis Pola Risiko (Risk Patterns)</h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-amber-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Risiko pelanggaran meningkat pesat seiring menumpuknya antrean kendaraan.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Area yang padat menghasilkan jauh lebih banyak data ambigu yang memerlukan validasi visual petugas.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Pelanggaran tertentu (seperti tanpa helm) muncul secara sistematis di lokasi yang sama setiap hari.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Prioritas Validasi</h2>
              <div className="space-y-4">
                {[
                  { type: "Tanpa Helm", risk: "Tinggi", note: `${data.kasus_perlu_validasi} kasus perlu validasi` },
                  { type: "Plat Perlu Pemeriksaan", risk: "Sedang", note: "Beberapa data perlu dicek" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <p className="text-sm font-medium text-[#0B1F3A]">{item.type}</p>
                      <p className="text-sm font-normal text-slate-600">{item.note}</p>
                    </div>
                    <StatusBadge status={item.risk} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Action Plan & Prioritization) */}
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Peringkat Prioritas Area</h2>
              <div className="space-y-4">
                {[
                  { rank: "1", area: "Simpang SKA (Utara)", risk: "Tinggi", note: "Volume dan pelanggaran helm meningkat drastis." },
                  { rank: "2", area: "Simpang SKA (Timur)", risk: "Tinggi", note: "Pelanggaran marka area lampu merah perlu dipantau." },
                  { rank: "3", area: "Simpang SKA (Selatan)", risk: "Sedang", note: "Validasi plat tersamarkan perlu perhatian khusus." },
                  { rank: "4", area: "Simpang SKA (Barat)", risk: "Sedang", note: "Kepadatan antrean dekat area komersial mulai naik." },
                ].map((loc, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-700 shrink-0">
                      {loc.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-medium text-[#0B1F3A]">{loc.area}</p>
                        <StatusBadge status={loc.risk} />
                      </div>
                      <p className="text-sm font-normal text-slate-600">{loc.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Rencana Tindakan Petugas (Action Plan)</h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Prioritaskan pengerahan pengawasan di seluruh penjuru Simpang SKA.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Selesaikan validasi visual kasus tanpa helm terlebih dahulu di Pusat Deteksi AI.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Cek hasil Plate Monitoring untuk mencocokkan data indikasi administrasi simulasi.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Siapkan draf laporan akhir hari jika status risiko area tetap tinggi.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-3">Catatan Operasional</h2>
              <ul className="space-y-2">
                <li className="flex gap-2 text-sm font-normal text-slate-700">
                  <span className="text-blue-500">■</span> Insight semata-mata membantu petugas menentukan prioritas penanganan awal.
                </li>
                <li className="flex gap-2 text-sm font-normal text-slate-700">
                  <span className="text-blue-500">■</span> Seluruh rangkuman insight harus selalu dibandingkan ulang dengan kondisi lapangan riil.
                </li>
                <li className="flex gap-2 text-sm font-normal text-slate-700">
                  <span className="text-blue-500">■</span> Insight mesin ini tidak dapat dijadikan keputusan resmi sebelum divalidasi manual oleh petugas kepolisian.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Insight Detail Table */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col">
            <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Detail Matriks Insight Operasional</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Kategori Insight</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Temuan</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Dampak Operasional</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Prioritas</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Tindak Lanjut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.insight_matrix.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-sm font-medium text-[#0B1F3A]">{row.cat}</td>
                      <td className="p-4 text-sm font-medium text-slate-700">{row.found}</td>
                      <td className="p-4 text-sm font-normal text-slate-600">{row.impact}</td>
                      <td className="p-4">
                        <StatusBadge status={row.risk} />
                      </td>
                      <td className="p-4 text-sm font-normal text-slate-600">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <OfficerDisclaimer />

      </div>
    </OfficerPageShell>
  );
}
