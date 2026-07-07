import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { PageHeader, EmptyState } from "@/components/common";

export default function VehiclePlatePage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <PageHeader
          title="Vehicle & Plate Monitoring"
          description="Pantau jenis kendaraan, plat nomor, dan status pajak."
        />
        <EmptyState
          title="Kendaraan & Plat"
          description="Modul analisis plat nomor kendaraan sedang dipersiapkan."
        />
      </div>
    </OfficerPageShell>
  );
}
