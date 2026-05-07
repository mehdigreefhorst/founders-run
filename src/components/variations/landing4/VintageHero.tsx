import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { Poster } from "@/components/atoms/Poster";

interface VintageHeroProps {
  readonly className?: string;
}

export function VintageHero({ className }: VintageHeroProps) {
  const c = site.copy.landing4.hero;

  const sourceMap: Record<typeof c.nextRun.fields[number]["source"], string> = {
    weekday: site.nextRun.weekday,
    time: site.nextRun.time,
    distance: site.nextRun.distance,
    pace: site.nextRun.pace,
  };

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[var(--vintage-cream)] vintage-paper",
        className,
      )}
      id="top"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-12 pb-16 md:grid-cols-12 md:gap-12 md:px-10 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28">
        <div className="md:col-span-7 lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-4 font-sans text-[0.7rem] uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
            <span>{c.volume}</span>
            <span aria-hidden className="h-px flex-1 bg-[var(--vintage-cocoa)]/40" />
            <span>{site.brand.location.toUpperCase()}</span>
          </div>

          <h1 className="flex flex-col gap-1 leading-[0.85] tracking-tight text-[var(--vintage-brick-deep)]">
            <span className="font-varsity text-[clamp(3.25rem,11vw,8.5rem)] vintage-ink-press">
              {c.headlineLine1}
            </span>
            <span className="font-varsity text-[clamp(3.25rem,11vw,8.5rem)] vintage-ink-press">
              {c.headlineLine2}
            </span>
            <span className="mt-3 inline-flex items-center gap-3 font-display text-[clamp(1rem,2.4vw,1.5rem)] italic font-medium leading-none text-[var(--vintage-cocoa-deep)]">
              <span aria-hidden className="block h-px w-8 bg-[var(--vintage-cocoa-deep)]" />
              {c.headlineSlogan}
              <span aria-hidden className="block h-px w-8 bg-[var(--vintage-cocoa-deep)]" />
            </span>
          </h1>

          <p className="max-w-xl font-sans text-base md:text-lg leading-relaxed text-[var(--vintage-cocoa-deep)]">
            {site.hero.sub}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={site.hero.primaryCta.anchor}
              className={cn(
                "inline-flex items-center gap-3 rounded-sm px-6 py-3.5",
                "border-[3px] border-[var(--vintage-cocoa-deep)] bg-[var(--vintage-brick)] text-[var(--vintage-cream)]",
                "font-sans text-sm font-bold uppercase tracking-[0.22em]",
                "shadow-[4px_4px_0_0_var(--vintage-cocoa-deep)] transition-all",
                "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_var(--vintage-cocoa-deep)]",
                "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
              )}
            >
              <span aria-hidden>{c.ctaPrimaryIcon}</span>
              {site.hero.primaryCta.label.toUpperCase()}
            </a>
            <a
              href={site.hero.secondaryCta.anchor}
              className={cn(
                "inline-flex items-center gap-2 rounded-sm border-[2px] border-[var(--vintage-cocoa-deep)] bg-transparent px-5 py-3",
                "font-sans text-sm font-bold uppercase tracking-[0.22em] text-[var(--vintage-cocoa-deep)]",
                "transition-colors hover:bg-[var(--vintage-cocoa-deep)] hover:text-[var(--vintage-cream)]",
              )}
            >
              <span aria-hidden>{c.ctaSecondaryIcon}</span>
              {c.ctaSecondaryLabel}
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 overflow-hidden rounded-sm border-[3px] border-[var(--vintage-cocoa-deep)] bg-[var(--vintage-cream-soft)]">
            <div className="col-span-2 sm:col-span-1 flex items-center justify-center bg-[var(--vintage-brick-deep)] px-4 py-3 text-[var(--vintage-cream)]">
              <div className="flex flex-col items-center leading-none">
                <span className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.32em]">
                  {c.nextRun.eyebrow}
                </span>
                <span className="mt-1 font-varsity text-lg">{c.nextRun.label}</span>
              </div>
            </div>
            {c.nextRun.fields.map((field) => {
              const value = field.uppercase ? sourceMap[field.source].toUpperCase() : sourceMap[field.source];
              return (
                <div
                  key={field.label}
                  className="flex flex-col items-start justify-center gap-1 border-l-[2px] border-dashed border-[var(--vintage-cocoa-deep)]/30 px-4 py-3 first:border-l-0 sm:py-4"
                >
                  <span className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.28em] text-[var(--vintage-cocoa)]">
                    {field.label}
                  </span>
                  <span className="font-display text-base font-bold leading-tight text-[var(--vintage-cocoa-deep)] md:text-lg">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-5 lg:col-span-5">
          <div
            className={cn(
              "relative mx-auto max-w-md rounded-sm border-[4px] border-[var(--vintage-cocoa-deep)] bg-[var(--vintage-cream)]",
              "shadow-[8px_8px_0_0_var(--vintage-brick-deep)] md:shadow-[12px_12px_0_0_var(--vintage-brick-deep)]",
            )}
          >
            <Poster
              priority
              className="block w-full"
              sizes="(min-width: 1024px) 540px, (min-width: 768px) 40vw, 80vw"
            />
            <span
              aria-hidden
              className="absolute -top-3 -right-3 inline-flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[var(--vintage-cocoa-deep)] bg-[var(--vintage-brick)] font-sans text-[0.55rem] font-bold uppercase tracking-[0.15em] text-[var(--vintage-cream)]"
            >
              {c.posterStamp}
            </span>
            <span className="absolute bottom-2 left-3 right-3 flex items-center justify-between font-sans text-[0.55rem] font-bold uppercase tracking-[0.22em] text-[var(--vintage-cocoa-deep)]/80">
              <span>{c.posterCaptionLeft}</span>
              <span>{c.posterCaptionRight}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
