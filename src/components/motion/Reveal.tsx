"use client";

import { motion, type Transition, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly duration?: number;
  readonly direction?: RevealDirection;
  readonly distance?: number;
  readonly className?: string;
  readonly once?: boolean;
}

const offsets: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Apple-style scroll reveal. Wrap any block to fade + slide it in
 * the first time it enters the viewport.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance,
  className,
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = offsets[direction];
  const dx = direction === "left" || direction === "right" ? distance ?? offset.x : 0;
  const dy = direction === "up" || direction === "down" ? distance ?? offset.y : 0;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const transition: Transition = {
    duration,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: dx, y: dy }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
