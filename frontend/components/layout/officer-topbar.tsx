"use client";

import { usePathname } from "next/navigation";
import { OFFICER_ROUTES } from "@/lib/routes";

function getPageTitle(pathname: string): string {
  const route = OFFICER_ROUTES.find(
    (r) => pathname === r.path || pathname.startsWith(r.path + "/")
  );
  return route?.label ?? "Command Center";
}

export function OfficerTopbar() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-40 w-full h-14 flex items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 shrink-0">
      {/* Left: page title */}
      <div className="flex items-center gap-3">
        <p className="text-sm font-semibold text-slate-800 tracking-tight">
          {pageTitle}
        </p>
        <span className="hidden sm:inline text-xs text-slate-300">|</span>
        <p className="hidden sm:block text-xs text-slate-400">{dateStr}</p>
      </div>

      {/* Right: status indicator */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-green-50 text-green-700 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Sistem Normal
        </span>
      </div>
    </header>
  );
}
