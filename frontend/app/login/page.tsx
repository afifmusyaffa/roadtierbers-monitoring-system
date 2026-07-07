import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="rt-bright-stage relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">
      {/* Soft background radial glows */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#1D4ED8]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#06B6D4]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Login Container */}
      <div className="w-full max-w-lg z-10">
        <div className="flex flex-col items-center text-center mb-8 gap-4">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B1F3A] backdrop-blur-md shadow-sm">
            Akses Petugas
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1F3A] leading-[1.1]">
            Masuk ke Command Center
          </h1>
          <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-md mx-auto">
            Gunakan akses petugas untuk melihat monitoring, deteksi, forecasting, insight, dan laporan RoadTierbers.
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-[2.5rem] border border-white/80 shadow-xl relative overflow-hidden bg-white/70 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#14B8A6]/5 blur-[60px] rounded-full pointer-events-none" />
          
          <form className="relative z-10 flex flex-col gap-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#0B1F3A]/70 uppercase tracking-widest px-1">
                  Email / Username
                </label>
                <input 
                  type="text" 
                  placeholder="petugas@roadtierbers.go.id" 
                  className="w-full h-12 px-4 rounded-xl bg-white/50 border border-white/80 text-sm font-medium text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8]/50 transition-all backdrop-blur-sm shadow-inner"
                  defaultValue="demo_petugas"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#0B1F3A]/70 uppercase tracking-widest px-1">
                  Password
                </label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full h-12 px-4 rounded-xl bg-white/50 border border-white/80 text-sm font-medium text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8]/50 transition-all backdrop-blur-sm shadow-inner"
                  defaultValue="password"
                />
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/officer/dashboard"
                className="w-full inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#0B1F3A] text-white text-sm font-semibold hover:bg-[#142d52] transition-colors shadow-md group"
              >
                Masuk Command Center
              </Link>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3 backdrop-blur-sm">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[#1D4ED8] font-bold text-xs">i</span>
              </div>
              <p className="text-[11px] font-bold text-slate-600 leading-relaxed pt-0.5">
                Mode prototype: autentikasi masih disimulasikan untuk kebutuhan demo. Klik tombol masuk untuk melanjutkan.
              </p>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#0B1F3A] transition-colors">
            ← Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
