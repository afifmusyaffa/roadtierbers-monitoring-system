import { OfficerSidebar } from "@/components/layout/officer-sidebar";
import { OfficerTopbar } from "@/components/layout/officer-topbar";
import { OfficerMobileNav } from "@/components/layout/officer-mobile-nav";
import { OfficerFloatingAssistant } from "@/components/layout/officer-floating-assistant";

interface OfficerPageShellProps {
  children: React.ReactNode;
}

export function OfficerPageShell({ children }: OfficerPageShellProps) {
  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      {/* Desktop sidebar — hidden on mobile */}
      <OfficerSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        {/* Mobile top nav — only renders on < lg */}
        <OfficerMobileNav />
        {/* Desktop topbar — hidden on mobile */}
        <OfficerTopbar />
        <main className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
      <OfficerFloatingAssistant />
    </div>
  );
}
