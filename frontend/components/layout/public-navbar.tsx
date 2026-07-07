"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PUBLIC_ROUTES } from "@/lib/routes";

export function PublicNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
        >
          <span className="text-sm font-bold tracking-tight text-[#0B1F3A]">
            RoadTierbers
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {PUBLIC_ROUTES.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                pathname === route.path
                  ? "text-[#0B1F3A] bg-slate-100"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/login"
          className="hidden sm:inline-flex items-center h-8 px-4 rounded-lg text-sm font-semibold bg-[#0B1F3A] text-white hover:bg-[#142d52] transition-colors"
        >
          Command Center
        </Link>
      </div>
    </header>
  );
}
