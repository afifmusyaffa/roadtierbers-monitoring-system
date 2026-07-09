"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, TrendingUp, Clock, Navigation } from "lucide-react";

export function TrafficModuleNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Ringkasan",
      href: "/traffic-overview",
      icon: <Map className="w-4 h-4" />
    },
    {
      name: "Prediksi Kemacetan",
      href: "/congestion-prediction",
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      name: "Rekomendasi Berangkat",
      href: "/departure-recommendation",
      icon: <Clock className="w-4 h-4" />
    }
  ];

  return (
    <div className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center">
          <div className="hidden md:flex items-center gap-2 mr-6 text-slate-400 font-bold text-xs uppercase tracking-wider">
            <Navigation className="w-3.5 h-3.5" />
            Pantauan Lalu Lintas
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-6 md:gap-8 flex-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-4 font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
                    isActive 
                      ? "text-blue-600 border-b-2 border-blue-600" 
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
