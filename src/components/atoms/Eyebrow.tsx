import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EyebrowProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.72rem] font-mono uppercase tracking-[0.22em] text-terracotta-deep",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-terracotta" aria-hidden />
      {children}
    </span>
  );
}
