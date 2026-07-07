import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

interface PublicPageShellProps {
  children: React.ReactNode;
}

export function PublicPageShell({ children }: PublicPageShellProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
