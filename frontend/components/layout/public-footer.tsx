import Link from "next/link";
import { APP_INFO } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#0B1F3A] border-t border-[#102A4C] text-blue-50/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Block */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-900/20">
                <span className="text-white font-extrabold text-lg leading-none">R</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                RoadTierbers
              </span>
            </Link>
            <p className="text-sm text-blue-200/60 leading-relaxed max-w-sm">
              Sistem pemantauan lalu lintas berbasis deep learning untuk informasi publik dan monitoring petugas.
            </p>
          </div>

          {/* Nav Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Informasi Publik</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm font-medium hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-cyan-400" />
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/traffic-overview" className="text-sm font-medium hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-cyan-400" />
                  Pantauan Lalu Lintas
                </Link>
              </li>
              <li>
                <Link href="/congestion-prediction" className="text-sm font-medium hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-cyan-400" />
                  Prediksi Kemacetan
                </Link>
              </li>
              <li>
                <Link href="/departure-recommendation" className="text-sm font-medium hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-cyan-400" />
                  Rekomendasi Berangkat
                </Link>
              </li>
              <li>
                <Link href="/traffic-sign-education" className="text-sm font-medium hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-cyan-400" />
                  Edukasi Rambu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm font-medium hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-cyan-400" />
                  Tentang Sistem
                </Link>
              </li>
            </ul>
          </div>

          {/* Area Petugas */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Area Petugas</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/login" className="text-sm font-medium hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-cyan-400" />
                  Masuk Sistem
                </Link>
              </li>
              <li>
                <Link href="/officer/dashboard" className="text-sm font-medium hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-cyan-400" />
                  Dashboard Monitoring
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Note and Copyright */}
        <div className="pt-8 border-t border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-blue-300/50">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left max-w-2xl">
            <span className="font-bold text-blue-400 uppercase tracking-widest whitespace-nowrap px-3 py-1 bg-blue-900/30 rounded-full border border-blue-800/30">
              Mode Evaluasi
            </span>
            <p className="leading-relaxed">
              Hasil deteksi dan prediksi digunakan sebagai pendukung pembelajaran dan evaluasi sistem, bukan keputusan lalu lintas resmi.
            </p>
          </div>
          
          <div className="shrink-0 font-medium">
            &copy; {year} RoadTierbers.
          </div>
        </div>

      </div>
    </footer>
  );
}
