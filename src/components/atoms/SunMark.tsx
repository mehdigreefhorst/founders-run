import { cn } from "@/lib/utils";

interface SunMarkProps {
  readonly className?: string;
}

/**
 * Decorative dawn sun mark — used as a visual accent in headers and dividers.
 * Pure SVG, scales with current color via stroke + fill currentColor.
 */
export function SunMark({ className }: SunMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-8", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="32" cy="40" r="12" fill="currentColor" stroke="none" opacity="0.15" />
      <path d="M32 40 m-12 0 a12 12 0 0 1 24 0" fill="currentColor" />
      <line x1="4" y1="56" x2="60" y2="56" />
      <line x1="32" y1="6" x2="32" y2="14" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <line x1="50" y1="14" x2="44" y2="20" />
      <line x1="6" y1="32" x2="14" y2="32" />
      <line x1="58" y1="32" x2="50" y2="32" />
    </svg>
  );
}
