import { PublicPageShell } from "@/components/layout/public-page-shell";
import { PageHeader, EmptyState } from "@/components/common";

export default function AboutPage() {
  return (
    <PublicPageShell>
      <div className="container mx-auto max-w-5xl px-4 py-12 space-y-8">
        <PageHeader
          title="Tentang RoadTierbers"
          description="Informasi mengenai project dan tim pengembang."
        />
        <EmptyState
          title="Tentang Sistem"
          description="Informasi latar belakang dan tujuan project sedang dipersiapkan."
        />
      </div>
    </PublicPageShell>
  );
}
