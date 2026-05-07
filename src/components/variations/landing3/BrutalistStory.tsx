import { site } from "@/config/site";

/**
 * Brutalist story section — story beats rendered as numbered terminal entries
 * with monospace, hard borders, and signal-green accents on key tags.
 */
export function BrutalistStory() {
  return (
    <section id="story" className="border-b-2 border-[var(--stamp)] bg-[var(--paper)]">
      {/* Section header */}
      <div className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr] border-b-2 border-[var(--stamp)]">
        <div className="border-r border-[var(--stamp)]/20 bg-[var(--paper-soft)] px-2 py-3 md:py-4 text-right font-mono text-[0.7rem] text-[var(--stamp)]/40">
          §1
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-4 px-6 py-4 md:px-10">
          <h2 className="font-mono text-2xl md:text-3xl font-bold uppercase tracking-tight text-[var(--stamp)]">
            // ORIGIN_STORY
          </h2>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/60">
            03 ENTRIES · CHRONOLOGICAL
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr]">
        {/* Line gutter */}
        <div className="flex flex-col gap-0 border-r border-[var(--stamp)]/20 bg-[var(--paper-soft)]" aria-hidden />

        <ol className="divide-y-2 divide-[var(--stamp)]">
          {site.story.map((beat, i) => (
            <li
              key={beat.id}
              className="grid gap-6 px-6 py-10 md:grid-cols-[12rem_1fr] md:gap-12 md:px-10 md:py-14"
            >
              <div className="flex flex-col gap-3">
                <span className="font-mono text-6xl md:text-7xl font-bold leading-none text-[var(--stamp)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-2 self-start border border-[var(--stamp)] bg-[var(--paper)] px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]">
                  <span className="size-1.5 rounded-full bg-[var(--signal-green)]" aria-hidden />
                  {beat.eyebrow.toUpperCase()}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-mono text-xl md:text-2xl font-bold uppercase leading-tight tracking-tight text-[var(--stamp)]">
                  <span className="text-[var(--stamp)]/40">{`>`}</span> {beat.title}
                </h3>
                <p className="max-w-2xl font-mono text-sm md:text-[0.95rem] leading-relaxed text-[var(--stamp)]/80">
                  {beat.body}
                </p>
                <div className="mt-2 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--stamp)]/40">
                  <span className="h-px flex-1 bg-[var(--stamp)]/20" aria-hidden />
                  <span>END.ENTRY[{String(i + 1).padStart(2, "0")}]</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
