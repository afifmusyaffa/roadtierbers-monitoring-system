import { PublicPageShell } from "@/components/layout/public-page-shell";
import { PageHeader, EmptyState } from "@/components/common";

export default function Home() {
  return (
    <PublicPageShell>
      <div className="container mx-auto max-w-5xl px-4 py-12 space-y-8">
        <PageHeader
          title="RoadTierbers"
          description="Smart Traffic Command Center for Safer and Smarter Roads."
        />
        <EmptyState
          title="Halaman Utama Publik"
          description="Halaman ini akan menampilkan informasi lalu lintas publik yang ringkas dan ramah masyarakat."
        />
      </div>
    </PublicPageShell>
  );
}
