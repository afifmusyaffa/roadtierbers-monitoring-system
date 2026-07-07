import { cn } from "@/lib/utils";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-4 bg-slate-200 rounded animate-pulse", className)}
    />
  );
}

export function LoadingState({
  message = "Memuat data...",
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "w-full py-12 flex flex-col items-center gap-6",
        className
      )}
    >
      <div className="w-full max-w-sm space-y-3">
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-4/5" />
        <SkeletonLine className="w-3/5" />
      </div>
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  );
}
