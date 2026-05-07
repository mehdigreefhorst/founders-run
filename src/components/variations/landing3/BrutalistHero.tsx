import { site } from "@/config/site";

export function BrutalistHero() {
  const c = site.copy.landing3.hero;

  const sourceMap: Record<typeof c.nextRunRows[number]["source"], string> = {
    weekday: site.nextRun.weekday.toUpperCase(),
    time: site.nextRun.time,
    meetingPoint: site.nextRun.meetingPoint.toUpperCase(),
    distance: site.nextRun.distance.toUpperCase(),
    pace: site.nextRun.pace.toUpperCase(),
  };

  return (
    <section id="top" className="relative border-b-2 border-[var(--stamp)] bg-[var(--paper)] grain isolate">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--stamp)]/30 px-6 py-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/70 md:px-10">
        <span>{c.fileLabel}</span>
        <span>{c.version} {new Date().getFullYear()}</span>
        <span>
          {c.statusLabel} <span className="text-[var(--signal-green)]">{c.statusValue}</span>
        </span>
      </div>

      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-8 border-b-2 border-[var(--stamp)] lg:border-b-0 lg:border-r-2">
          <div className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr]">
            <div className="flex flex-col items-end gap-3 border-r border-[var(--stamp)]/20 bg-[var(--paper-soft)] px-2 py-10 font-mono text-[0.7rem] text-[var(--stamp)]/40 md:py-14">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="leading-tight">
                  {String(i + 1).padStart(2, "0")}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-8 px-6 py-10 md:px-10 md:py-14">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--stamp)]">
                <span className="border border-[var(--stamp)] px-2 py-1">{c.timeTag}</span>
                <span className="border border-[var(--stamp)] px-2 py-1 bg-[var(--signal-green)] text-[var(--stamp)]">
                  {c.locationTag}
                </span>
                <span className="text-[var(--stamp)]/60">{c.comment}</span>
              </div>

              <h1 className="font-mono text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-[var(--stamp)] uppercase">
                {c.headlineLines.slice(0, 4).map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
                <span className="block text-[var(--stamp)]/40">
                  {c.headlineLines[4]}
                  <span className="text-[var(--signal-green)]">{c.cursorChar}</span>
                </span>
              </h1>

              <p className="max-w-xl font-mono text-sm md:text-base leading-relaxed text-[var(--stamp)]/80">
                <span className="text-[var(--stamp)]/40">{c.promptArrow}</span>{" "}
                {site.hero.sub}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={site.hero.primaryCta.anchor}
                  className="group inline-flex items-center gap-3 border-2 border-[var(--stamp)] bg-[var(--stamp)] px-6 py-3 font-mono text-xs md:text-sm uppercase tracking-[0.22em] text-[var(--paper)] transition-colors hover:bg-[var(--signal-green)] hover:text-[var(--stamp)]"
                >
                  <span aria-hidden>{c.promptArrow}</span>
                  <span>{site.hero.primaryCta.label}</span>
                  <span className="opacity-60 group-hover:opacity-100" aria-hidden>{c.ctaArrowExt}</span>
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

        <aside className="lg:col-span-4 flex flex-col">
          <div className="flex items-center justify-between border-b border-[var(--stamp)]/30 px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/70 md:px-8">
            <span>{c.scheduleLabel}</span>
            <span>{c.scheduleDay}</span>
          </div>
          <pre className="whitespace-pre overflow-x-auto px-6 py-6 font-mono text-[0.78rem] md:text-sm leading-[1.7] text-[var(--stamp)] md:px-8">
{c.asciiTrack}
          </pre>
          <div className="border-t-2 border-[var(--stamp)] bg-[var(--paper-soft)] px-6 py-4 md:px-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/60">
              {c.founderLabel} {site.founders.map((f) => f.name).join(" & ")}
            </p>
            <ul className="mt-1 flex flex-col gap-0.5 font-mono text-xs text-[var(--stamp)]/80">
              {site.founders.map((f) => (
                <li key={f.linkedin}>
                  <span className="text-[var(--stamp)]/40">{`>`}</span> {f.name.split(" ")[0]} — {f.note}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 border-t-2 border-[var(--stamp)]">
        <div className="col-span-2 sm:col-span-1 flex items-center gap-3 border-r-2 border-[var(--stamp)] bg-[var(--stamp)] px-5 py-4 font-mono text-xs uppercase tracking-[0.22em] text-[var(--paper)]">
          <span className="size-2 rounded-full bg-[var(--signal-green)] animate-pulse" aria-hidden />
          {c.nextRunLabel}
        </div>
        {c.nextRunRows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 border-r-2 border-[var(--stamp)] last:border-r-0 px-5 py-4"
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--stamp)]/60">
              {row.label}
            </span>
            <span className="font-mono text-sm md:text-base font-bold text-[var(--stamp)] truncate">
              {sourceMap[row.source]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
