import { cn } from "@/lib/utils";

interface OfficerDisclaimerProps {
  className?: string;
}

/**
 * Small, subtle disclaimer replacing the large repeated "Validasi Petugas" panels.
 * Place once at the bottom of any officer page.
 */
export function OfficerDisclaimer({ className }: OfficerDisclaimerProps) {
  return (
    <p
      className={cn(
        "text-[11px] text-slate-400 text-center leading-relaxed py-3 border-t border-slate-100 mt-6",
        className
      )}
    >
      Hasil AI digunakan sebagai pendukung pemantauan. Validasi akhir tetap
      dilakukan oleh petugas.
    </p>
  );
}
