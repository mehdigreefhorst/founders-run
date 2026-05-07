import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

interface EditorialHeroProps {
  readonly className?: string;
}

/**
 * Editorial hero — magazine cover treatment.
 *
 * - Pure paper background
 * - Massive Fraunces display headline with tight tracking
 * - Issue / volume metadata in mono caps along the side
 * - Black & white photo block (gradient placeholder)
 * - One electric-orange accent only (subhead lead-in + CTA hover)
 */
export function EditorialHero({ className }: EditorialHeroProps) {
  const headlineLines = site.hero.title.split("\n");

  return (
    <section
      className={cn(
        "relative bg-editorial-paper text-editorial-ink overflow-hidden",
        className
      )}
    >
      {/* Top metadata strip */}
      <div className="border-b border-editorial-rule">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-3 flex items-center justify-between gap-6 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
          <span className="hidden sm:inline">Vol. 01 / Issue 01</span>
          <span className="text-editorial-ink">{site.hero.eyebrow}</span>
          <span className="hidden sm:inline">{site.brand.domain}</span>
        </div>
      </div>

      {/* Main spread */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 pt-10 md:pt-14 pb-16 md:pb-20">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 gap-y-10">
          {/* Left rail — large numeral & section marker */}
          <div className="col-span-12 md:col-span-1 flex md:flex-col items-start gap-4">
            <span className="font-display text-[3rem] md:text-[4.5rem] leading-none tracking-tight text-editorial-blaze font-light">
              01
            </span>
            <span className="md:[writing-mode:vertical-rl] md:rotate-180 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
              The Cover Story
            </span>
          </div>

          {/* Headline column */}
          <div className="col-span-12 md:col-span-11 lg:col-span-7 flex flex-col gap-8">
            <h1 className="font-display font-medium leading-[0.88] tracking-[-0.035em] text-balance text-[clamp(3rem,9vw,8rem)] text-editorial-ink">
              {headlineLines.map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="italic font-light text-editorial-ink">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <div className="flex items-start gap-5 max-w-2xl">
              <span
                aria-hidden
                className="mt-3 inline-block h-px w-10 bg-editorial-blaze shrink-0"
              />
              <p className="font-sans text-base md:text-lg leading-relaxed text-editorial-graphite">
                <span className="font-display italic text-editorial-ink not-italic font-medium uppercase tracking-[0.12em] text-[0.78rem] mr-2">
                  Lede —
                </span>
                {site.hero.sub}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                size="lg"
                nativeButton={false}
                render={<a href={site.hero.primaryCta.anchor} />}
                className="rounded-none bg-editorial-ink text-editorial-paper hover:bg-editorial-blaze h-12 px-6 font-mono text-[0.72rem] uppercase tracking-[0.22em] gap-3"
              >
                {site.hero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                nativeButton={false}
                render={<a href={site.hero.secondaryCta.anchor} />}
                className="rounded-none border border-editorial-ink/15 hover:bg-editorial-paper-warm hover:border-editorial-ink h-12 px-6 font-mono text-[0.72rem] uppercase tracking-[0.22em] gap-3 text-editorial-ink"
              >
                <Play className="size-3.5" />
                {site.hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          {/* Photo column (B&W placeholder) */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col gap-3">
            <div
              className="relative overflow-hidden aspect-[3/4] w-full"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.85 0 0) 0%, oklch(0.55 0 0) 55%, oklch(0.20 0 0) 100%)",
              }}
            >
              <GrainOverlay />
              {/* Caption label burned into the bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3 z-10">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/80 max-w-[70%] leading-snug">
                  Stadhuisplein, 06:58 — boots on, breath visible.
                </span>
                <span className="font-display text-3xl text-white/95 leading-none">
                  /01
                </span>
              </div>
              {/* corner crop marks */}
              <CropMarks />
            </div>
            <div className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-[0.28em] text-editorial-graphite">
              <span>Photograph — Founders Run Eindhoven</span>
              <span>Frame 01/06</span>
            </div>
          </div>
        </div>

        {/* Next run strip — ledger-style */}
        <div className="mt-16 md:mt-20 border-y-2 border-editorial-ink">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-editorial-rule">
            <NextRunCell label="Day" value={site.nextRun.weekday} />
            <NextRunCell label="Time" value={site.nextRun.time} accent />
            <NextRunCell label="Meeting Point" value={site.nextRun.meetingPoint} />
            <NextRunCell label="Distance" value={site.nextRun.distance} />
            <NextRunCell label="Pace" value={site.nextRun.pace} />
          </div>
        </div>
      </div>

      {/* Marquee strip — repeating brand line */}
      <MarqueeStrip />
    </section>
  );
}

interface NextRunCellProps {
  readonly label: string;
  readonly value: string;
  readonly accent?: boolean;
}

function NextRunCell({ label, value, accent }: NextRunCellProps) {
  return (
    <div className="px-5 md:px-6 py-5 md:py-6 flex flex-col gap-2 min-w-0">
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-editorial-graphite">
        {label}
      </span>
      <span
        className={cn(
          "font-display text-xl md:text-2xl leading-[1.05] tracking-tight break-words",
          accent ? "text-editorial-blaze" : "text-editorial-ink"
        )}
      >
        {value}
      </span>
    </div>
  );
}

function GrainOverlay() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.08,
        mixBlendMode: "multiply",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

function CropMarks() {
  return (
    <>
      <span aria-hidden className="absolute top-2 left-2 size-3 border-t border-l border-white/60" />
      <span aria-hidden className="absolute top-2 right-2 size-3 border-t border-r border-white/60" />
      <span aria-hidden className="absolute bottom-2 left-2 size-3 border-b border-l border-white/60" />
      <span aria-hidden className="absolute bottom-2 right-2 size-3 border-b border-r border-white/60" />
    </>
  );
}

function MarqueeStrip() {
  const phrase = "Founders Run · Eindhoven · Wednesdays · 07:00 · ";
  // Render the phrase enough times to comfortably overfill any viewport.
  const repeated = Array.from({ length: 12 }).map((_, i) => (
    <span key={i} className="inline-block px-6">
      {phrase}
    </span>
  ));

  return (
    <div className="border-t border-editorial-ink bg-editorial-ink text-editorial-paper overflow-hidden">
      <div className="py-4 whitespace-nowrap">
        <div className="inline-flex editorial-marquee font-display italic text-2xl md:text-3xl tracking-tight">
          <div className="inline-flex">{repeated}</div>
          <div aria-hidden className="inline-flex">{repeated}</div>
        </div>
      </div>
    </div>
  );
}
