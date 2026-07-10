"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { OFFICER_ROUTE_GROUPS } from "@/lib/routes";

export function OfficerMobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile topbar — only visible on < lg */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between h-14 px-4 bg-white border-b border-slate-200 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-tight text-[#0B1F3A]">
            RoadTierbers
          </span>
          <span className="text-[10px] font-medium text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded">
            Petugas
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium bg-green-50 text-green-700 border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </span>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Buka navigasi"
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {/* Hamburger icon */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 z-[60] h-full w-64 bg-white shadow-xl flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-14 px-5 border-b border-slate-100 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-sm font-bold tracking-tight text-[#0B1F3A]">
              RoadTierbers
            </span>
            <span className="text-[10px] font-medium text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded">
              Petugas
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Tutup navigasi"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
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
                      onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
          >
            ← Kembali ke Area Publik
          </Link>
        </div>
      </aside>
    </>
  );
}
