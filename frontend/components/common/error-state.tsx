"use client";

import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Gagal memuat data",
  description = "Terjadi kesalahan saat memuat data. Silakan coba lagi.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "w-full py-16 flex flex-col items-center justify-center text-center gap-4",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
        <div className="w-5 h-0.5 bg-red-400 rounded-full" />
      </div>
      <div className="space-y-1.5 max-w-xs">
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900 transition-colors"
        >
          Coba lagi
        </button>
      )}
    </div>
  );
}
