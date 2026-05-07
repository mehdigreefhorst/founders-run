import { site } from "@/config/site";

const socialAscii: Record<string, string> = {
  youtube: "[YT]",
  instagram: "[IG]",
  tiktok: "[TT]",
  commitify: "[CM]",
};

/**
 * Brutalist footer — full-width grid columns separated by hard rules,
 * featuring socials with ASCII labels, the founder card, and a build stamp.
 */
export function BrutalistFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--paper)] text-[var(--stamp)]">
      {/* Big mark / oversized wordmark */}
      <div className="border-b-2 border-[var(--stamp)]">
        <div className="overflow-hidden px-6 md:px-10 py-10 md:py-14">
          <h3 className="font-mono text-[16vw] md:text-[12vw] lg:text-[10vw] font-bold uppercase leading-[0.85] tracking-tighter text-[var(--stamp)]">
            FOUNDERS_RUN
            <span className="text-[var(--signal-green)]">.</span>
          </h3>
          <p className="mt-3 font-mono text-xs md:text-sm uppercase tracking-[0.22em] text-[var(--stamp)]/50">
            EINDHOVEN · NL · WED 07:00 · {year}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 border-b-2 border-[var(--stamp)]">
        {/* Founder */}
        <div className="lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--stamp)] px-6 md:px-10 py-8">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/50">
            // FOUNDER
          </span>
          <p className="mt-3 font-mono text-lg md:text-xl font-bold uppercase text-[var(--stamp)]">
            {site.founder.name}
          </p>
          <p className="mt-1 font-mono text-sm text-[var(--stamp)]/70">
            {site.founder.role}
          </p>
          <a
            href={site.founder.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 border-2 border-[var(--stamp)] bg-[var(--paper)] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.22em] text-[var(--stamp)] transition-colors hover:bg-[var(--stamp)] hover:text-[var(--paper)]"
          >
            <span aria-hidden>↗</span> LINKEDIN
          </a>
        </div>

        {/* Socials */}
        <div className="lg:col-span-4 border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--stamp)] px-6 md:px-10 py-8">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/50">
            // CHANNELS
          </span>
          <ul className="mt-3 flex flex-col">
            {site.socials.map((s) => (
              <li key={s.id} className="border-b border-[var(--stamp)]/15 last:border-b-0">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 py-2 font-mono text-sm text-[var(--stamp)] transition-colors hover:text-[var(--signal-green)]"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[var(--stamp)]/40 group-hover:text-[var(--signal-green)]">
                      {socialAscii[s.id] ?? "[--]"}
                    </span>
                    <span className="font-bold uppercase tracking-tight">{s.label}</span>
                  </span>
                  <span className="text-[var(--stamp)]/60">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links / meta */}
        <div className="lg:col-span-3 px-6 md:px-10 py-8">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/50">
            // INDEX
          </span>
          <ul className="mt-3 flex flex-col gap-2 font-mono text-sm">
            <li>
              <a href="#story" className="hover:text-[var(--signal-green)]">{`> 01 STORY`}</a>
            </li>
            <li>
              <a href="#events" className="hover:text-[var(--signal-green)]">{`> 02 EVENTS`}</a>
            </li>
            <li>
              <a href="#join" className="hover:text-[var(--signal-green)]">{`> 03 JOIN`}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Stamp / build line */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-6 md:px-10 py-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/60">
        <span>
          BUILT BY <span className="text-[var(--stamp)]">FOUNDERS</span> FOR <span className="text-[var(--stamp)]">FOUNDERS</span>
        </span>
        <span>{site.brand.domain.toUpperCase()} · v0.7.0 · {year}</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[var(--signal-green)]" aria-hidden />
          <span>EOF</span>
        </span>
      </div>
    </footer>
  );
}
