import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface StaggerProps {
  readonly children: ReactNode;
  readonly className?: string;
  /** No-op. Kept for API compatibility with the old Motion-based Stagger. */
  readonly stagger?: number;
  /** No-op. Kept for API compatibility. */
  readonly delay?: number;
}

interface StaggerItemProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * Pure passthrough. Used to be a Motion-based staggered reveal — but
 * Motion's `whileInView` was unreliable in Next.js dev mode and any
 * `initial: opacity 0` setup risked content disappearing if Motion
 * failed to mount. Stability > flair.
 *
 * Props kept so call sites don't need to change.
 */
export function Stagger({ children, className }: StaggerProps) {
  return <div className={cn(className)}>{children}</div>;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return <div className={cn(className)}>{children}</div>;
}
