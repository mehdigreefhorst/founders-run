import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EditorialHeaderProps {
  readonly className?: string;
}

/**
 * Editorial / sport magazine header.
 *
 * Pure paper background, ink-black text, hairline rule below.
 * The wordmark is set with magazine-style tight tracking and a thin vertical
 * separator before the location and issue tagline.
 */
export function EditorialHeader({ className }: EditorialHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full bg-editorial-paper/90 backdrop-blur border-b border-editorial-rule",
        className
      )}
    >
      <div className="mx-auto max-w-[1400px] flex items-center justify-between gap-8 px-6 md:px-12 py-4">
        <Link
          href="/"
          aria-label="Founders Run home"
          className="inline-flex items-baseline gap-3"
        >
          <span className="font-display text-[1.35rem] md:text-[1.5rem] font-semibold tracking-[-0.02em] leading-none text-editorial-ink">
            Founders Run
          </span>
          <span aria-hidden className="hidden sm:block h-3 w-px bg-editorial-rule" />
          <span className="hidden sm:inline-block font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
            Eindhoven · Issue 01
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-editorial-ink">
          <a href="#story" className="relative hover:text-editorial-blaze transition-colors">
            <span className="text-editorial-graphite mr-2">01</span>Story
          </a>
          <a href="#events" className="relative hover:text-editorial-blaze transition-colors">
            <span className="text-editorial-graphite mr-2">02</span>Events
          </a>
          <a href="#join" className="relative hover:text-editorial-blaze transition-colors">
            <span className="text-editorial-graphite mr-2">03</span>Join
          </a>
        </nav>

        <Button
          size="sm"
          nativeButton={false}
          render={<a href="#join" />}
          className="rounded-none bg-editorial-ink text-editorial-paper hover:bg-editorial-blaze hover:text-editorial-paper px-5 h-9 font-mono text-[0.7rem] uppercase tracking-[0.22em]"
        >
          Subscribe →
        </Button>
      </div>
    </header>
  );
}
