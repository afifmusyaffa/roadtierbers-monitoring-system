"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { PUBLIC_ROUTES } from "@/lib/routes";
import { Menu, X } from "lucide-react";

export function PublicNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const checkIsActive = (path: string) => {
    if (path === "/") return pathname === "/";
    if (path === "/traffic-overview") {
      return (
        pathname === "/traffic-overview" ||
        pathname === "/congestion-prediction" ||
        pathname === "/departure-recommendation"
      );
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        <header className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:shadow-blue-900/40 transition-all">
              <span className="text-white font-extrabold text-lg leading-none">R</span>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-lg font-extrabold tracking-tight transition-colors",
                isScrolled ? "text-[#0B1F3A]" : "text-white drop-shadow-md"
              )}>
                RoadTierbers
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {PUBLIC_ROUTES.map((route) => {
              const isActive = checkIsActive(route.path);
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold transition-all duration-200",
                    isActive
                      ? "text-blue-600 bg-blue-50/80 shadow-sm backdrop-blur-md"
                      : isScrolled
                        ? "text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100/80"
                        : "text-blue-50/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {route.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className={cn(
                "hidden sm:inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-bold transition-all shadow-lg",
                isScrolled
                  ? "bg-[#0B1F3A] text-white hover:bg-blue-800 shadow-blue-900/10"
                  : "bg-white text-[#0B1F3A] hover:bg-blue-50 shadow-black/10"
              )}
            >
              Masuk Sistem
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-xl transition-colors",
                isScrolled
                  ? "text-[#0B1F3A] hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              )}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#0B1F3A]/95 backdrop-blur-xl transition-all duration-300 lg:hidden flex flex-col pt-24 px-6 pb-8",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <div className="flex flex-col gap-2 flex-1">
          {PUBLIC_ROUTES.map((route) => {
            const isActive = checkIsActive(route.path);
            return (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "p-4 rounded-2xl text-lg font-extrabold transition-all",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                    : "text-blue-100/80 hover:text-white hover:bg-white/5"
                )}
              >
                {route.label}
              </Link>
            );
          })}
        </div>
        
        <div className="mt-8 pt-8 border-t border-blue-800/50">
          <Link
            href="/login"
            className="w-full inline-flex items-center justify-center h-14 rounded-2xl text-base font-extrabold bg-cyan-500 text-[#0B1F3A] hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
          >
            Masuk ke Area Petugas
          </Link>
        </div>
      </div>
    </>
  );
}
