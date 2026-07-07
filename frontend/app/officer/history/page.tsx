import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { PageHeader, EmptyState } from "@/components/common";

export default function HistoryPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <PageHeader
          title="Detection History"
          description="Riwayat hasil deteksi dari seluruh model analitik."
        />
        <EmptyState
          title="Riwayat Deteksi"
          description="Tabel riwayat hasil deteksi sedang dalam tahap pengembangan."
        />
      </div>
    </OfficerPageShell>
  );
}
