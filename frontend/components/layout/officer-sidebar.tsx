"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { OFFICER_ROUTES } from "@/lib/routes";

const ROUTE_ICONS: Record<string, string> = {
  "/officer/dashboard": "▪",
  "/officer/ai-detection": "▪",
  "/officer/violation-monitoring": "▪",
  "/officer/vehicle-plate": "▪",
  "/officer/forecasting": "▪",
  "/officer/smart-insight": "▪",
  "/officer/history": "▪",
  "/officer/report": "▪",
  "/officer/assistant": "▪",
};

export function OfficerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-slate-200 bg-white min-h-screen sticky top-0 h-screen overflow-y-auto">
      {/* Brand area */}
      <div className="flex items-center h-14 px-5 border-b border-slate-100 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-tight text-[#0B1F3A]">
            RoadTierbers
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Navigasi
        </p>
        {OFFICER_ROUTES.map((route) => {
          const isActive =
            pathname === route.path ||
            (route.path !== "/officer/dashboard" &&
              pathname.startsWith(route.path));
          return (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#EFF6FF] text-[#1D4ED8]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )}
            >
              <span
                className={cn(
                  "text-[8px] shrink-0",
                  isActive ? "text-[#1D4ED8]" : "text-slate-400"
                )}
              >
                {ROUTE_ICONS[route.path]}
              </span>
              {route.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="shrink-0 border-t border-slate-100 px-3 py-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Kembali ke Publik
        </Link>
      </div>
    </aside>
  );
}
