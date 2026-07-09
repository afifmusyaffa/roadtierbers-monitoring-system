import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1F3A] to-[#102A4C] p-4 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[420px] relative z-10">
        
        {/* Brand Text */}
        <div className="text-center mb-8">
          <span className="text-xl font-semibold tracking-tight text-white drop-shadow-sm">
            RoadTierbers
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 sm:p-10 border border-slate-100">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-[#0B1F3A] mb-2 tracking-tight">
              Masuk Petugas
            </h1>
            <p className="text-sm font-medium text-slate-500 leading-relaxed">
              Gunakan akun petugas untuk mengakses area monitoring.
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Email atau username
              </label>
              <input 
                type="text" 
                placeholder="petugas@roadtierbers.go.id" 
                className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all"
                defaultValue="demo_petugas"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Kata sandi
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all"
                defaultValue="password"
              />
            </div>

            <div className="pt-2">
              <Link
                href="/officer/dashboard"
                className="w-full inline-flex items-center justify-center h-12 px-6 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20"
              >
                Masuk
              </Link>
            </div>
          </form>

          {/* Evaluation Note */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-center gap-2 text-amber-600 bg-amber-50 rounded-lg py-2 px-3">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wide">
                Mode evaluasi akademik
              </span>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  );
}
