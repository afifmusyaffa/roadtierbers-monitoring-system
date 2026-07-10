import { cn } from "@/lib/utils";
import Link from "next/link";

type KpiTone = "blue" | "cyan" | "emerald" | "amber" | "red" | "slate";

const TONE_CLASSES: Record<
  KpiTone,
  { value: string; bg: string; border: string; icon: string }
> = {
  blue: {
    value: "text-[#1D4ED8]",
    bg: "bg-blue-50/60",
    border: "border-blue-100",
    icon: "text-blue-300",
  },
  cyan: {
    value: "text-[#0891B2]",
    bg: "bg-cyan-50/60",
    border: "border-cyan-100",
    icon: "text-cyan-300",
  },
  emerald: {
    value: "text-emerald-700",
    bg: "bg-emerald-50/60",
    border: "border-emerald-100",
    icon: "text-emerald-300",
  },
  amber: {
    value: "text-amber-600",
    bg: "bg-amber-50/60",
    border: "border-amber-100",
    icon: "text-amber-300",
  },
  red: {
    value: "text-red-600",
    bg: "bg-red-50/60",
    border: "border-red-100",
    icon: "text-red-300",
  },
  slate: {
    value: "text-slate-700",
    bg: "bg-slate-50/60",
    border: "border-slate-200",
    icon: "text-slate-300",
  },
};

interface KpiCardProps {
  title: string;
  value: string | number;
  helper?: string;
  icon?: React.ReactNode;
  tone?: KpiTone;
  loading?: boolean;
  /** Optional small label rendered next to value, e.g. "kasus" */
  unit?: string;
  /** If provided, entire card becomes a link */
  href?: string;
  /** Whether the value is long text (smaller font) */
  isText?: boolean;
  className?: string;
}

function KpiCardContent({
  title,
  value,
  helper,
  icon,
  tone = "blue",
  loading = false,
  unit,
  isText = false,
}: Omit<KpiCardProps, "href">) {
  const t = TONE_CLASSES[tone];

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between h-full rounded-xl border p-4 bg-white shadow-sm",
        t.border
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 leading-tight">
          {title}
        </p>
        {icon && (
          <span className={cn("shrink-0 mt-0.5", t.icon)}>{icon}</span>
        )}
      </div>

      {/* Value */}
      {loading ? (
        <div className="h-8 w-20 rounded bg-slate-100 animate-pulse mb-3" />
      ) : (
        <div className="flex items-baseline gap-1.5 mb-3">
          <span
            className={cn(
              "font-semibold tracking-tight leading-none",
              isText ? "text-xl" : "text-3xl",
              t.value
            )}
          >
            {value}
          </span>
          {unit && (
            <span className="text-xs font-medium text-slate-400">{unit}</span>
          )}
        </div>
      )}

      {/* Helper */}
      {helper && (
        <p className="text-[11px] text-slate-400 leading-snug mt-auto">
          {helper}
        </p>
      )}
    </div>
  );
}

export function KpiCard({ href, className, ...props }: KpiCardProps) {
  if (href) {
    return (
      <Link href={href} className={cn("block h-full group", className)}>
        <div className="h-full transition-shadow group-hover:shadow-md">
          <KpiCardContent {...props} />
        </div>
      </Link>
    );
  }
  return (
    <div className={className}>
      <KpiCardContent {...props} />
    </div>
  );
}
