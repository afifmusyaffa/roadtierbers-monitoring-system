import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/60 bg-white/70 backdrop-blur-sm shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
