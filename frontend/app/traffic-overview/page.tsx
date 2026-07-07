import { PublicPageShell } from "@/components/layout/public-page-shell";
import { PageHeader, EmptyState } from "@/components/common";

export default function TrafficOverviewPage() {
  return (
    <PublicPageShell>
      <div className="container mx-auto max-w-5xl px-4 py-12 space-y-8">
        <PageHeader
          title="Ringkasan Lalu Lintas Publik"
          description="Informasi kondisi lalu lintas terkini secara real-time."
        />
        <EmptyState
          title="Kondisi Lalu Lintas"
          description="Fitur ringkasan kondisi lalu lintas publik sedang dalam tahap pengembangan."
        />
      </div>
    </PublicPageShell>
  );
}
