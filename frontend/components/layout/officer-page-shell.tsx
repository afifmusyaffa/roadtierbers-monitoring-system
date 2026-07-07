import { OfficerSidebar } from "@/components/layout/officer-sidebar";
import { OfficerTopbar } from "@/components/layout/officer-topbar";
import { OfficerFloatingAssistant } from "@/components/layout/officer-floating-assistant";

interface OfficerPageShellProps {
  children: React.ReactNode;
}

export function OfficerPageShell({ children }: OfficerPageShellProps) {
  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <OfficerSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <OfficerTopbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <OfficerFloatingAssistant />
    </div>
  );
}
