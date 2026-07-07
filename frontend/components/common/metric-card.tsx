import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/common/status-badge";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  helperText?: string;
  status?: string;
  trend?: "meningkat" | "stabil" | "menurun";
  className?: string;
}

const TREND_LABEL: Record<string, string> = {
  meningkat: "Meningkat",
  stabil: "Stabil",
  menurun: "Menurun",
};

const TREND_COLOR: Record<string, string> = {
  meningkat: "text-red-500",
  stabil: "text-slate-400",
  menurun: "text-green-600",
};

export function MetricCard({
  label,
  value,
  unit,
  helperText,
  status,
  trend,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-3 shadow-sm",
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <div className="flex items-end gap-1.5">
        <span className="text-3xl font-bold tracking-tight text-slate-900 leading-none">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-slate-400 mb-0.5 leading-none">
            {unit}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {status && <StatusBadge status={status} />}
        {trend && (
          <span
            className={cn("text-xs font-medium", TREND_COLOR[trend])}
          >
            {TREND_LABEL[trend]}
          </span>
        )}
        {helperText && (
          <span className="text-xs text-slate-400">{helperText}</span>
        )}
      </div>
    </div>
  );
}
