import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "Tidak ada data",
  description = "Belum ada data yang tersedia untuk ditampilkan.",
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "w-full py-16 flex flex-col items-center justify-center text-center gap-4",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
        <div className="w-5 h-5 rounded bg-slate-300" />
      </div>
      <div className="space-y-1.5 max-w-xs">
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  );
}
