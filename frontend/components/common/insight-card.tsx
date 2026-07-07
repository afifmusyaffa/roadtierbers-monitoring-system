import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/common/status-badge";

interface InsightCardProps {
  title: string;
  insight: string;
  recommendation?: string;
  status?: string;
  className?: string;
}

export function InsightCard({
  title,
  insight,
  recommendation,
  status,
  className,
}: InsightCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold text-slate-800 leading-snug">
          {title}
        </h3>
        {status && <StatusBadge status={status} className="shrink-0" />}
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{insight}</p>
      {recommendation && (
        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
            Rekomendasi
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {recommendation}
          </p>
        </div>
      )}
    </div>
  );
}
