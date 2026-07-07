import { PublicPageShell } from "@/components/layout/public-page-shell";
import { PageHeader, EmptyState } from "@/components/common";

export default function TrafficSignEducationPage() {
  return (
    <PublicPageShell>
      <div className="container mx-auto max-w-5xl px-4 py-12 space-y-8">
        <PageHeader
          title="Edukasi Rambu Lalu Lintas"
          description="Kenali dan pelajari arti dari berbagai rambu lalu lintas."
        />
        <EmptyState
          title="Edukasi Rambu"
          description="Fitur pembelajaran rambu berbasis deteksi gambar sedang dipersiapkan."
        />
      </div>
    </PublicPageShell>
  );
}
