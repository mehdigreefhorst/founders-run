import { site } from "@/config/site";

interface BrutalistHeaderProps {
  readonly buildId: string;
}

const navItems: ReadonlyArray<{ readonly href: string; readonly label: string; readonly index: string }> = [
  { href: "#story", label: "STORY", index: "01" },
  { href: "#events", label: "EVENTS", index: "02" },
  { href: "#join", label: "JOIN", index: "03" },
];

/**
 * Brutalist site header — paper background, hard black borders, mono everything.
 * Top utility bar shows build metadata; main row shows wordmark + nav + CTA.
 */
export function BrutalistHeader({ buildId }: BrutalistHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--stamp)] bg-[var(--paper)]">
      {/* Utility / metadata strip */}
      <div className="hidden md:flex items-center justify-between border-b border-[var(--stamp)]/30 px-6 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--stamp)]/70">
        <span>{`// ${site.brand.domain}`}</span>
        <span className="flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-[var(--signal-green)] animate-pulse" aria-hidden />
          <span>SYS.OK · {buildId}</span>
        </span>
        <span>{site.hero.eyebrow.toUpperCase()}</span>
      </div>

      {/* Main row */}
      <div className="flex items-stretch justify-between">
        <a
          href="#top"
          className="flex flex-col justify-center border-r-2 border-[var(--stamp)] px-5 py-3 md:px-6 md:py-4"
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--stamp)]/60">
            FR/EHV
          </span>
          <span className="font-mono text-base md:text-lg font-bold tracking-tight text-[var(--stamp)]">
            FOUNDERS_RUN
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
          <span aria-hidden>{`>`}</span>
          <span>SHOW UP</span>
        </a>
      </div>
    </header>
  );
}
