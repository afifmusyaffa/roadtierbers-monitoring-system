import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { PageHeader, EmptyState } from "@/components/common";

export default function ViolationMonitoringPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <PageHeader
          title="Violation Monitoring"
          description="Pantau statistik dan tren pelanggaran lalu lintas."
        />
        <EmptyState
          title="Monitoring Pelanggaran"
          description="Fitur pemantauan pelanggaran sedang dalam tahap pengembangan."
        />
      </div>
    </OfficerPageShell>
  );
}
