import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

interface EditorialHeaderProps {
  readonly className?: string;
}

/**
 * Editorial / sport magazine header — copy from `site.copy.landing2.header`.
 */
export function EditorialHeader({ className }: EditorialHeaderProps) {
  const shared = site.copy.shared;
  const c = site.copy.landing2.header;
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
          aria-label={shared.header.homeAria}
          className="inline-flex items-baseline gap-3"
        >
          <span className="font-display text-[1.35rem] md:text-[1.5rem] font-semibold tracking-[-0.02em] leading-none text-editorial-ink">
            {c.brandName}
          </span>
          <span aria-hidden className="hidden sm:block h-3 w-px bg-editorial-rule" />
          <span className="hidden sm:inline-block font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
            {c.issueLine}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-editorial-ink">
          <a href="#story" className="relative hover:text-editorial-blaze transition-colors">
            <span className="text-editorial-graphite mr-2">{c.navPrefix.story}</span>{shared.nav.story}
          </a>
          <a href="#events" className="relative hover:text-editorial-blaze transition-colors">
            <span className="text-editorial-graphite mr-2">{c.navPrefix.events}</span>{shared.nav.events}
          </a>
          <a href="#join" className="relative hover:text-editorial-blaze transition-colors">
            <span className="text-editorial-graphite mr-2">{c.navPrefix.join}</span>{shared.nav.join}
          </a>
        </nav>

        <Button
          size="sm"
          nativeButton={false}
          render={<a href="#join" />}
          className="rounded-none bg-editorial-ink text-editorial-paper hover:bg-editorial-blaze hover:text-editorial-paper px-5 h-9 font-mono text-[0.7rem] uppercase tracking-[0.22em]"
        >
          {c.ctaSubscribe}
        </Button>
      </div>
    </header>
  );
}
