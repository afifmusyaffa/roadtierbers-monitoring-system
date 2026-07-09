"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PUBLIC_ROUTES } from "@/lib/routes";

export function PublicNavbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 pointer-events-none">
      <header className="pointer-events-auto flex items-center justify-between h-[56px] w-full max-w-[1040px] px-5 sm:px-6 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_4px_32px_-8px_rgba(11,31,58,0.1),inset_0_1px_0_rgba(255,255,255,1)] transition-all">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-[15px] font-bold tracking-tight text-[#0B1F3A] drop-shadow-sm">
            RoadTierbers
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {PUBLIC_ROUTES.map((route) => {
            const isActive = pathname === route.path;
            return (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "px-4 py-2 rounded-full text-[13px] font-medium tracking-tight transition-all duration-300",
                  isActive
                    ? "text-[#1D4ED8] bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-md"
                    : "text-[#0B1F3A]/70 hover:text-[#0B1F3A] hover:bg-white/50"
                )}
              >
                {route.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="inline-flex items-center justify-center h-[36px] px-5 rounded-full text-[13px] font-semibold bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors shadow-[0_4px_12px_rgba(29,78,216,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]"
          >
            Masuk Sistem
          </Link>
        </div>
      </header>
    </div>
  );
}
