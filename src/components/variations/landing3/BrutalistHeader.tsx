import { site } from "@/config/site";

interface BrutalistHeaderProps {
  readonly buildId: string;
}

/**
 * Brutalist site header — copy from `site.copy.landing3.header`.
 */
export function BrutalistHeader({ buildId }: BrutalistHeaderProps) {
  const c = site.copy.landing3.header;
  const sharedNav = site.copy.shared.nav;

  const navItems: ReadonlyArray<{ readonly href: string; readonly label: string; readonly index: string }> = [
    { href: "#story", label: sharedNav.story.toUpperCase(), index: "01" },
    { href: "#events", label: sharedNav.events.toUpperCase(), index: "02" },
    { href: "#join", label: sharedNav.join.toUpperCase(), index: "03" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--stamp)] bg-[var(--paper)]">
      <div className="hidden md:flex items-center justify-between border-b border-[var(--stamp)]/30 px-6 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--stamp)]/70">
        <span>{`${c.domainPrefix} ${site.brand.domain}`}</span>
        <span className="flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-[var(--signal-green)] animate-pulse" aria-hidden />
          <span>{c.statusLabel} {buildId}</span>
        </span>
        <span>{site.hero.eyebrow.toUpperCase()}</span>
      </div>

      <div className="flex items-stretch justify-between">
        <a
          href="#top"
          className="flex flex-col justify-center border-r-2 border-[var(--stamp)] px-5 py-3 md:px-6 md:py-4"
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--stamp)]/60">
            FR/EHV
          </span>
          <span className="font-mono text-base md:text-lg font-bold tracking-tight text-[var(--stamp)]">
            {site.brand.name.toUpperCase().replace(/\s+/g, "_")}
          </span>
        </a>

        <nav className="hidden md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center gap-2 border-r-2 border-[var(--stamp)] px-6 font-mono text-xs uppercase tracking-[0.22em] text-[var(--stamp)] transition-colors hover:bg-[var(--stamp)] hover:text-[var(--paper)]"
            >
              <span className="text-[var(--stamp)]/40 group-hover:text-[var(--signal-green)]">
                {item.index}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <a
          href="#join"
          className="flex items-center gap-3 bg-[var(--stamp)] px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--paper)] transition-colors hover:bg-[var(--signal-green)] hover:text-[var(--stamp)] md:px-7 md:text-sm"
        >
          <span aria-hidden>{c.ctaArrow}</span>
          <span>{c.ctaShowUp}</span>
        </a>
      </div>
    </header>
  );
}
