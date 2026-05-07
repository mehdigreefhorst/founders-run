import { site } from "@/config/site";

const asciiTrack = `
> 05:50  ALARM
> 06:30  SHOES_ON
> 06:55  STADHUISPLEIN
> 07:00  RUN.START()
> 07:35  COFFEE
> 08:30  FIRST_MEETING
`.trim();

const nextRunRows: ReadonlyArray<{ readonly label: string; readonly value: string }> = [
  { label: "DAY", value: site.nextRun.weekday.toUpperCase() },
  { label: "TIME", value: site.nextRun.time },
  { label: "MEET", value: site.nextRun.meetingPoint.toUpperCase() },
  { label: "DIST", value: site.nextRun.distance.toUpperCase() },
  { label: "PACE", value: site.nextRun.pace.toUpperCase() },
];

/**
 * Brutalist hero — typographic, no images.
 * Massive mono caps headline, ASCII-art schedule sidebar, hard-bordered next-run table.
 */
export function BrutalistHero() {
  return (
    <section id="top" className="relative border-b-2 border-[var(--stamp)] bg-[var(--paper)] grain isolate">
      {/* Faux file header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--stamp)]/30 px-6 py-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/70 md:px-10">
        <span>FILE: hero.txt</span>
        <span>VER 0.7.0 · {new Date().getFullYear()}</span>
        <span>STATUS: <span className="text-[var(--signal-green)]">ACTIVE</span></span>
      </div>

      <div className="grid lg:grid-cols-12">
        {/* Left: line numbers + headline + sub */}
        <div className="lg:col-span-8 border-b-2 border-[var(--stamp)] lg:border-b-0 lg:border-r-2">
          <div className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr]">
            {/* Line gutter */}
            <div className="flex flex-col items-end gap-3 border-r border-[var(--stamp)]/20 bg-[var(--paper-soft)] px-2 py-10 font-mono text-[0.7rem] text-[var(--stamp)]/40 md:py-14">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="leading-tight">
                  {String(i + 1).padStart(2, "0")}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-8 px-6 py-10 md:px-10 md:py-14">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--stamp)]">
                <span className="border border-[var(--stamp)] px-2 py-1">[07:00 WED]</span>
                <span className="border border-[var(--stamp)] px-2 py-1 bg-[var(--signal-green)] text-[var(--stamp)]">
                  EINDHOVEN
                </span>
                <span className="text-[var(--stamp)]/60">// every wednesday since september</span>
              </div>

              <h1 className="font-mono text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-[var(--stamp)] uppercase">
                <span className="block">WAKE</span>
                <span className="block">EARLY.</span>
                <span className="block">RUN_</span>
                <span className="block">TOGETHER.</span>
                <span className="block text-[var(--stamp)]/40">
                  BUILD<span className="text-[var(--signal-green)]">█</span>
                </span>
              </h1>

              <p className="max-w-xl font-mono text-sm md:text-base leading-relaxed text-[var(--stamp)]/80">
                <span className="text-[var(--stamp)]/40">{`>`}</span>{" "}
                {site.hero.sub}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={site.hero.primaryCta.anchor}
                  className="group inline-flex items-center gap-3 border-2 border-[var(--stamp)] bg-[var(--stamp)] px-6 py-3 font-mono text-xs md:text-sm uppercase tracking-[0.22em] text-[var(--paper)] transition-colors hover:bg-[var(--signal-green)] hover:text-[var(--stamp)]"
                >
                  <span aria-hidden>{`>`}</span>
                  <span>{site.hero.primaryCta.label}</span>
                  <span className="opacity-60 group-hover:opacity-100" aria-hidden>↗</span>
                </a>
                <a
                  href={site.hero.secondaryCta.anchor}
                  className="inline-flex items-center gap-3 border-2 border-[var(--stamp)] bg-[var(--paper)] px-6 py-3 font-mono text-xs md:text-sm uppercase tracking-[0.22em] text-[var(--stamp)] transition-colors hover:bg-[var(--stamp)] hover:text-[var(--paper)]"
                >
                  <span>{site.hero.secondaryCta.label}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: ASCII timetable card */}
        <aside className="lg:col-span-4 flex flex-col">
          <div className="flex items-center justify-between border-b border-[var(--stamp)]/30 px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/70 md:px-8">
            <span>// schedule.log</span>
            <span>WED 07:00</span>
          </div>
          <pre className="whitespace-pre overflow-x-auto px-6 py-6 font-mono text-[0.78rem] md:text-sm leading-[1.7] text-[var(--stamp)] md:px-8">
{asciiTrack}
          </pre>
          <div className="border-t-2 border-[var(--stamp)] bg-[var(--paper-soft)] px-6 py-4 md:px-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/60">
              Founder · Mehdi Greefhorst
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--stamp)]/80">
              {site.founder.note}
            </p>
          </div>
        </aside>
      </div>

      {/* NEXT RUN bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 border-t-2 border-[var(--stamp)]">
        <div className="col-span-2 sm:col-span-1 flex items-center gap-3 border-r-2 border-[var(--stamp)] bg-[var(--stamp)] px-5 py-4 font-mono text-xs uppercase tracking-[0.22em] text-[var(--paper)]">
          <span className="size-2 rounded-full bg-[var(--signal-green)] animate-pulse" aria-hidden />
          NEXT.RUN
        </div>
        {nextRunRows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 border-r-2 border-[var(--stamp)] last:border-r-0 px-5 py-4"
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--stamp)]/60">
              {row.label}
            </span>
            <span className="font-mono text-sm md:text-base font-bold text-[var(--stamp)] truncate">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
