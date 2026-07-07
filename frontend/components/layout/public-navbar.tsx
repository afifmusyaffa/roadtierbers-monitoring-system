"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Using shortened labels for the landing page public navbar as requested
const NAV_LINKS = [
  { label: "Beranda", path: "/" },
  { label: "Kondisi", path: "/traffic-overview" },
  { label: "Prediksi", path: "/congestion-prediction" },
  { label: "Rekomendasi", path: "/departure-recommendation" },
  { label: "Rambu", path: "/traffic-sign-education" },
  { label: "Tentang", path: "/about" },
];

export function PublicNavbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <header className="pointer-events-auto flex items-center justify-between h-[52px] w-full max-w-[1100px] px-4 sm:px-5 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_4px_32px_-8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1)] transition-all">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
        >
          <span className="text-[14px] font-bold tracking-tight text-[#0B1F3A]">
            RoadTierbers
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((route) => {
            const isActive = pathname === route.path;
            return (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[13px] font-medium tracking-tight transition-all",
                  isActive
                    ? "text-white bg-[#0B1F3A] shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                )}
              >
                {route.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          {/* Mobile minimal nav (just to Command Center) */}
          <Link
            href="/login"
            className="inline-flex items-center justify-center h-8 px-4 rounded-full text-[12px] sm:text-[13px] font-semibold bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors shadow-sm"
          >
            Command Center
          </Link>
        </div>
      </header>
    </div>
  );
}
