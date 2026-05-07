import { site } from "@/config/site";

export function BrutalistFooter() {
  const year = new Date().getFullYear();
  const c = site.copy.landing3.footer;

  return (
    <footer className="bg-[var(--paper)] text-[var(--stamp)]">
      <div className="border-b-2 border-[var(--stamp)]">
        <div className="overflow-hidden px-6 md:px-10 py-10 md:py-14">
          <h3 className="font-mono text-[16vw] md:text-[12vw] lg:text-[10vw] font-bold uppercase leading-[0.85] tracking-tighter text-[var(--stamp)]">
            {c.wordmark}
            <span className="text-[var(--signal-green)]">{c.wordmarkAccent}</span>
          </h3>
          <p className="mt-3 font-mono text-xs md:text-sm uppercase tracking-[0.22em] text-[var(--stamp)]/50">
            {c.wordmarkLocation} · {year}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 border-b-2 border-[var(--stamp)]">
        <div className="lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--stamp)] px-6 md:px-10 py-8">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/50">
            {c.founderLabel}
          </span>
          <ul className="mt-3 flex flex-col divide-y-2 divide-[var(--stamp)]/15">
            {site.founders.map((f, i) => (
              <li key={f.linkedin} className={i === 0 ? "pb-4" : "pt-4"}>
                <p className="font-mono text-lg md:text-xl font-bold uppercase text-[var(--stamp)]">
                  {f.name}
                </p>
                <p className="mt-1 font-mono text-sm text-[var(--stamp)]/70">
                  {f.role}
                </p>
                <p className="mt-1 font-mono text-xs text-[var(--stamp)]/60">
                  {f.note}
                </p>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 border-2 border-[var(--stamp)] bg-[var(--paper)] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.22em] text-[var(--stamp)] transition-colors hover:bg-[var(--stamp)] hover:text-[var(--paper)]"
                >
                  <span aria-hidden>{c.founderArrow}</span> {c.founderLink}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4 border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--stamp)] px-6 md:px-10 py-8">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/50">
            {c.channelsLabel}
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
                      {asciiFor(c.socialAscii, s.id, c.socialFallback)}
                    </span>
                    <span className="font-bold uppercase tracking-tight">{s.label}</span>
                  </span>
                  <span className="text-[var(--stamp)]/60">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3 px-6 md:px-10 py-8">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/50">
            {c.indexLabel}
          </span>
          <ul className="mt-3 flex flex-col gap-2 font-mono text-sm">
            {c.indexLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-[var(--signal-green)]">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-6 md:px-10 py-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/60">
        <span>
          {c.builtByLead} <span className="text-[var(--stamp)]">{c.builtBySubject}</span> {c.builtByConnector} <span className="text-[var(--stamp)]">{c.builtByObject}</span>
        </span>
        <span>{site.brand.domain.toUpperCase()} · {c.version} · {year}</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[var(--signal-green)]" aria-hidden />
          <span>{c.eofLabel}</span>
        </span>
      </div>
    </footer>
  );
}

function asciiFor(map: Record<string, string>, id: string, fallback: string): string {
  return map[id] ?? fallback;
}
