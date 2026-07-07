import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { PageHeader, EmptyState } from "@/components/common";

export default function ReportPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <PageHeader
          title="Report & Export"
          description="Laporan rekapitulasi data pelanggaran dan pemantauan."
        />
        <EmptyState
          title="Laporan & Ekspor"
          description="Modul pembuatan dan ekspor laporan sedang dipersiapkan."
        />
      </div>
    </OfficerPageShell>
  );
}
