import { cn } from "@/lib/utils";

type StatusTone = "success" | "warning" | "danger" | "neutral" | "info";

const STATUS_MAP: Record<string, StatusTone> = {
  // Traffic condition
  Lancar: "success",
  Padat: "danger",
  // Violation risk / system status shared key
  Rendah: "success",
  Tinggi: "danger",
  // System status
  Normal: "success",
  Waspada: "warning",
  Kritis: "danger",
  // Vehicle / plate
  Valid: "success",
  "Perlu Pemeriksaan": "warning",
  Bermasalah: "danger",
  // Detection
  Aman: "success",
  "Perlu Perhatian": "warning",
  "Pelanggaran Terdeteksi": "danger",
  "Risiko Tinggi": "danger",
  // Ambiguous "Sedang" defaults to warning
  Sedang: "warning",
};

const TONE_CLASSES: Record<StatusTone, string> = {
  success:
    "bg-green-50 text-green-700 border border-green-200 ring-green-100",
  warning:
    "bg-amber-50 text-amber-700 border border-amber-200 ring-amber-100",
  danger: "bg-red-50 text-red-700 border border-red-200 ring-red-100",
  neutral:
    "bg-slate-50 text-slate-600 border border-slate-200 ring-slate-100",
  info: "bg-blue-50 text-blue-700 border border-blue-200 ring-blue-100",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const tone: StatusTone = STATUS_MAP[status] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium leading-none tracking-wide",
        TONE_CLASSES[tone],
        className
      )}
    >
      {status}
    </span>
  );
}
