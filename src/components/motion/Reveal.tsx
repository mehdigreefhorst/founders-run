import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  readonly children: ReactNode;
  /** No-op. Kept for API compatibility with the old Motion-based Reveal. */
  readonly delay?: number;
  /** No-op. Kept for API compatibility. */
  readonly duration?: number;
  /** No-op. Kept for API compatibility. */
  readonly direction?: RevealDirection;
  /** No-op. Kept for API compatibility. */
  readonly distance?: number;
  readonly className?: string;
  /** No-op. Kept for API compatibility. */
  readonly once?: boolean;
}

/**
 * Pure passthrough. Used to be a Motion-based scroll reveal — but
 * Motion's `whileInView` was unreliable in Next.js dev mode (Strict
 * Mode double-render breaks the IntersectionObserver) and `animate`
 * with `initial: opacity 0` made content disappear if Motion failed
 * to mount cleanly. Stability > flair: content is now always visible.
 *
 * The props are kept so callers don't need to be edited.
 */
export function Reveal({ children, className }: RevealProps) {
  return <div className={cn(className)}>{children}</div>;
}
