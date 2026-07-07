import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { PageHeader, EmptyState } from "@/components/common";

export default function AIDetectionPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <PageHeader
          title="AI Detection Center"
          description="Jalankan deteksi AI pada sampel gambar atau video."
        />
        <EmptyState
          title="AI Detection"
          description="Modul analisis gambar dan video sedang dalam tahap integrasi model."
        />
      </div>
    </OfficerPageShell>
  );
}
