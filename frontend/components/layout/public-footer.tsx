import Link from "next/link";
import { APP_INFO } from "@/lib/constants";

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-800">
              {APP_INFO.name}
            </p>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Sistem pemantauan lalu lintas berbasis kecerdasan buatan untuk mendukung keputusan petugas dan informasi publik.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-xs text-slate-400 hover:text-slate-700 transition-colors"
            >
              Tentang Sistem
            </Link>
            <Link
              href="/login"
              className="text-xs text-slate-400 hover:text-slate-700 transition-colors"
            >
              Area Petugas
            </Link>
          </div>
        </div>
        <div className="mt-6 border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-300">
            &copy; {year} RoadTierbers. Sistem berjalan dalam mode evaluasi akademik.
          </p>
        </div>
      </div>
    </footer>
  );
}
