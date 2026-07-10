import { cn } from "@/lib/utils";

interface OfficerPageHeaderProps {
  title: string;
  description?: string;
  badge?: {
    label: string;
    tone?: "blue" | "green" | "red" | "amber" | "slate";
  };
  lastUpdated?: string | null;
  /** Optional action element (button, link) on the right side */
  action?: React.ReactNode;
  /** Compact mode reduces vertical padding */
  compact?: boolean;
}

const BADGE_CLASSES: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
  red: "bg-red-50 text-red-700 border-red-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  slate: "bg-slate-50 text-slate-600 border-slate-200",
};

export function OfficerPageHeader({
  title,
  description,
  badge,
  lastUpdated,
  action,
  compact = false,
}: OfficerPageHeaderProps) {
  const badgeTone = badge?.tone ?? "blue";

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200",
        compact ? "pb-3 mb-4" : "pb-4 mb-6"
      )}
    >
      {/* Left: title + description */}
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2.5 flex-wrap">
          {badge && (
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
                BADGE_CLASSES[badgeTone]
              )}
            >
              {badge.label}
            </span>
          )}
          {lastUpdated && (
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
              {lastUpdated}
            </span>
          )}
        </div>
        <h1
          className={cn(
            "font-semibold tracking-tight text-[#0B1F3A] leading-tight",
            compact ? "text-lg" : "text-xl sm:text-2xl"
          )}
        >
          {title}
        </h1>
        {description && (
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {/* Right: action slot */}
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
