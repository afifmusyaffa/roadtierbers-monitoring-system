import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { PageHeader, EmptyState } from "@/components/common";

export default function SmartInsightPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <PageHeader
          title="Smart Insight"
          description="Rekomendasi keputusan berbasis data pemantauan."
        />
        <EmptyState
          title="Smart Insight"
          description="Fitur penyajian wawasan dan rekomendasi cerdas sedang dibangun."
        />
      </div>
    </OfficerPageShell>
  );
}
