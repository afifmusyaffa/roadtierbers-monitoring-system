import Link from "next/link";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  eyebrow?: string;
  href?: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  eyebrow,
  href,
  className,
}: FeatureCardProps) {
  const content = (
    <div
      className={cn(
        "group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm",
        "flex flex-col gap-3 transition-shadow duration-200",
        href && "hover:shadow-md cursor-pointer",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          {eyebrow}
        </p>
      )}
      <h3 className="text-base font-semibold tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
