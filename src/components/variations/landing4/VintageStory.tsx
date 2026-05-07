import { cn } from "@/lib/utils";
import { site } from "@/config/site";

interface VintageStoryProps {
  readonly className?: string;
}

/**
 * Three numbered "training-log" entries. Big varsity numerals on the left,
 * eyebrow + headline + body on the right, with hand-stamped seal marks.
 */
export function VintageStory({ className }: VintageStoryProps) {
  return (
    <section
      id="story"
      className={cn(
        "relative bg-[var(--vintage-cream-soft)] vintage-paper",
        "border-y-[3px] border-[var(--vintage-cocoa-deep)]",
        "py-20 md:py-28 lg:py-32",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Section header */}
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
          <div className="md:col-span-5">
            <span className="inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
              <span className="inline-block h-[2px] w-7 bg-[var(--vintage-brick)]" aria-hidden />
              The Training Log
            </span>
            <h2 className="mt-4 font-varsity text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-[var(--vintage-brick-deep)] vintage-ink-press">
              WHY WE
              <br />
              SHOW UP.
            </h2>
          </div>
          <p className="md:col-span-6 md:col-start-7 max-w-xl font-sans text-base md:text-lg leading-relaxed text-[var(--vintage-cocoa-deep)]">
            A short story about what San Francisco gets right, what Eindhoven is
            missing, and why a 7am Wednesday run beats a one-off event every time.
          </p>
        </div>

        <ol className="flex flex-col gap-12 md:gap-20">
          {site.story.map((beat, idx) => {
            const number = String(idx + 1).padStart(2, "0");
            return (
              <li
                key={beat.id}
                className="grid gap-6 md:grid-cols-12 md:gap-10"
              >
                {/* Big varsity numeral */}
                <div className="md:col-span-3 flex items-start gap-4">
                  <span
                    className="font-varsity text-[clamp(4rem,9vw,7.5rem)] leading-none text-[var(--vintage-brick)]"
                    aria-hidden
                  >
                    {number}
                  </span>
                  <span className="hidden md:inline-flex h-2 w-12 mt-7 bg-[var(--vintage-cocoa-deep)]" aria-hidden />
                </div>

                {/* Body */}
                <div className="md:col-span-8 md:col-start-5 flex flex-col gap-4">
                  <span className="inline-flex items-center gap-2 font-sans text-[0.7rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-brick-deep)]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--vintage-brick)]" aria-hidden />
                    {beat.eyebrow}
                  </span>
                  <h3 className="font-display text-balance text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-[var(--vintage-cocoa-deep)]">
                    {beat.title}
                  </h3>
                  <p className="font-sans text-lg leading-relaxed text-[var(--vintage-cocoa-deep)]/85 max-w-3xl">
                    {beat.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Closing stamp */}
        <div className="mt-20 flex flex-col items-center gap-3 md:mt-28">
          <span
            className={cn(
              "inline-flex h-24 w-24 flex-col items-center justify-center rounded-full",
              "border-[3px] border-[var(--vintage-brick-deep)] text-[var(--vintage-brick-deep)]",
              "rotate-[-8deg] font-sans text-[0.62rem] font-black uppercase tracking-[0.18em] leading-tight",
            )}
          >
            <span>EVERY</span>
            <span className="my-0.5 font-varsity text-base">WED</span>
            <span>07:00</span>
          </span>
          <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
            Since September
          </span>
        </div>
      </div>
    </section>
  );
}
