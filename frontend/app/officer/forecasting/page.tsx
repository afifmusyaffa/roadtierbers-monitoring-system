import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { PageHeader, EmptyState } from "@/components/common";

export default function ForecastingPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <PageHeader
          title="Forecasting Prediction Center"
          description="Analisis prediksi volume, pelanggaran, dan durasi kemacetan."
        />
        <EmptyState
          title="Forecasting"
          description="Fitur prediksi berbasis time-series sedang dalam tahap pengembangan."
        />
      </div>
    </OfficerPageShell>
  );
}
