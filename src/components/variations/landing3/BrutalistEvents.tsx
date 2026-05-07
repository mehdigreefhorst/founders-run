import { site } from "@/config/site";

export function BrutalistEvents() {
  const c = site.copy.landing3.events;
  return (
    <section id="events" className="border-b-2 border-[var(--stamp)] bg-[var(--paper)]">
      <div className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr] border-b-2 border-[var(--stamp)]">
        <div className="border-r border-[var(--stamp)]/20 bg-[var(--paper-soft)] px-2 py-3 md:py-4 text-right font-mono text-[0.7rem] text-[var(--stamp)]/40">
          {c.sectionMarker}
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-4 px-6 py-4 md:px-10">
          <h2 className="font-mono text-2xl md:text-3xl font-bold uppercase tracking-tight text-[var(--stamp)]">
            {c.sectionTitle}
          </h2>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/60">
            {site.events.length} {c.sectionMetaSuffix}
          </span>
        </div>
      </div>

      <div className="hidden md:grid grid-cols-[6rem_14rem_1fr_10rem] border-b-2 border-[var(--stamp)] bg-[var(--paper-soft)] font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/60">
        <div className="border-r border-[var(--stamp)]/20 px-4 py-2">{c.columnLabels.id}</div>
        <div className="border-r border-[var(--stamp)]/20 px-4 py-2">{c.columnLabels.cadence}</div>
        <div className="border-r border-[var(--stamp)]/20 px-4 py-2">{c.columnLabels.title}</div>
        <div className="px-4 py-2">{c.columnLabels.schedule}</div>
      </div>

      <ol className="divide-y-2 divide-[var(--stamp)]">
        {site.events.map((event, i) => (
          <li
            key={event.id}
            className="grid gap-4 px-6 py-8 md:grid-cols-[6rem_14rem_1fr_10rem] md:gap-0 md:px-0 md:py-0"
          >
            <div className="flex items-baseline gap-3 md:items-start md:border-r-2 md:border-[var(--stamp)] md:px-4 md:py-6">
              <span className="font-mono text-3xl md:text-4xl font-bold text-[var(--stamp)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--stamp)]/40">
                /{event.id}
              </span>
            </div>

            <div className="flex flex-col gap-2 md:border-r-2 md:border-[var(--stamp)] md:px-4 md:py-6">
              <span className="inline-flex items-center self-start border border-[var(--stamp)] bg-[var(--signal-green)] px-2 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[var(--stamp)]">
                {c.tagLabels[event.tag]}
              </span>
              <span className="font-mono text-sm font-bold uppercase text-[var(--stamp)]">
                {event.cadence}
              </span>
            </div>

            <div className="flex flex-col gap-2 md:border-r-2 md:border-[var(--stamp)] md:px-4 md:py-6">
              <h3 className="font-mono text-lg md:text-xl font-bold uppercase tracking-tight text-[var(--stamp)]">
                <span className="text-[var(--stamp)]/40">{c.beatPromptArrow}</span> {event.title}
              </h3>
              <p className="font-mono text-sm leading-relaxed text-[var(--stamp)]/80">
                {event.description}
              </p>
            </div>

            <div className="flex flex-col gap-1 md:px-4 md:py-6">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--stamp)]/60 md:hidden">
                {c.mobileScheduleLabel}
              </span>
              <span className="font-mono text-xs leading-relaxed text-[var(--stamp)]">
                {event.time}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
