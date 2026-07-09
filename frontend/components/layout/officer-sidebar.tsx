"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { OFFICER_ROUTE_GROUPS } from "@/lib/routes";

export function OfficerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-slate-200 bg-white min-h-screen sticky top-0 h-screen overflow-y-auto">
      {/* Brand area */}
      <div className="flex items-center h-14 px-5 border-b border-slate-100 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-tight text-[#0B1F3A]">
            RoadTierbers
          </span>
          <span className="text-[10px] font-medium text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded">
            Petugas
          </span>
        </Link>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 py-4 px-3 space-y-5 overflow-y-auto">
        {OFFICER_ROUTE_GROUPS.map((group) => (
          <div key={group.groupLabel}>
            <p className="mb-1.5 px-2 text-[9px] font-semibold uppercase tracking-widest text-slate-400">
              {group.groupLabel}
            </p>
            <div className="space-y-0.5">
              {group.routes.map((route) => {
                const isActive =
                  pathname === route.path ||
                  (route.path !== "/officer/dashboard" &&
                    pathname.startsWith(route.path));
                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors",
                      isActive
                        ? "bg-[#EFF6FF] text-[#1D4ED8]"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    )}
                  >
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full shrink-0",
                        isActive ? "bg-[#1D4ED8]" : "bg-slate-300"
                      )}
                    />
                    {route.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="shrink-0 border-t border-slate-100 px-3 py-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
        >
          ← Kembali ke Area Publik
        </Link>
      </div>
    </aside>
  );
}
