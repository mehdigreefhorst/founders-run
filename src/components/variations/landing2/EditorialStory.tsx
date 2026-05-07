import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

interface EditorialStoryProps {
  readonly className?: string;
}

const placeholderGradients: ReadonlyArray<string> = [
  "linear-gradient(160deg, oklch(0.92 0 0) 0%, oklch(0.65 0 0) 50%, oklch(0.28 0 0) 100%)",
  "radial-gradient(ellipse at 30% 25%, oklch(0.88 0 0) 0%, oklch(0.45 0 0) 60%, oklch(0.16 0 0) 100%)",
  "linear-gradient(200deg, oklch(0.78 0 0) 0%, oklch(0.40 0 0) 60%, oklch(0.14 0 0) 100%)",
];

export function EditorialStory({ className }: EditorialStoryProps) {
  const c = site.copy.landing2.story;
  return (
    <section
      id="story"
      className={cn(
        "relative bg-editorial-paper text-editorial-ink py-24 md:py-32 lg:py-40",
        className
      )}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 items-end border-b border-editorial-ink pb-8">
            <div className="col-span-12 md:col-span-3 flex flex-col gap-3">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
                {c.sectionLabel}
              </span>
              <span className="font-display text-[3rem] md:text-[4.5rem] leading-none tracking-tight text-editorial-blaze font-light">
                {c.sectionNumber}
              </span>
            </div>
            <div className="col-span-12 md:col-span-9 flex flex-col gap-4">
              <h2 className="font-display font-medium leading-[0.92] tracking-[-0.025em] text-balance text-[clamp(2.25rem,6vw,5rem)] text-editorial-ink">
                {c.headlineLead}{" "}
                <span className="italic font-light">{c.headlineFollow}</span>
              </h2>
              <p className="max-w-2xl font-sans text-base md:text-lg text-editorial-graphite leading-relaxed">
                {c.description}
              </p>
            </div>
          </div>
        </Reveal>

        <Stagger className="mt-20 md:mt-28 flex flex-col gap-24 md:gap-32">
          {site.story.map((beat, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <StaggerItem key={beat.id}>
                <article className="grid grid-cols-12 gap-x-6 md:gap-x-8 gap-y-8 items-start">
                  <div className="col-span-12 md:col-span-2">
                    <div className="flex md:flex-col items-baseline md:items-start gap-4">
                      <span className="font-display text-[5rem] md:text-[7rem] leading-[0.8] tracking-tight text-editorial-ink font-light">
                        {num}
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-editorial-blaze">
                          {beat.eyebrow}
                        </span>
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-editorial-graphite">
                          {c.chapterPrefix} {idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-6 md:col-start-3 flex flex-col gap-5">
                    <h3 className="font-display text-balance font-medium text-3xl md:text-4xl lg:text-5xl leading-[0.98] tracking-[-0.02em] text-editorial-ink">
                      {beat.title}
                    </h3>
                    <p className="font-sans text-base md:text-lg leading-[1.7] text-editorial-ink/85 max-w-prose first-letter:font-display first-letter:text-5xl first-letter:font-medium first-letter:leading-[0.85] first-letter:float-left first-letter:pr-2 first-letter:pt-1 first-letter:text-editorial-blaze">
                      {beat.body}
                    </p>
                  </div>

                  <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-4">
                    <div
                      className="relative overflow-hidden aspect-[4/5] w-full"
                      style={{
                        background:
                          placeholderGradients[idx % placeholderGradients.length],
                      }}
                    >
                      <StoryGrain />
                      <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3 z-10">
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/80 max-w-[70%] leading-snug">
                          {c.platePrefix} {num} — {beat.eyebrow}
                        </span>
                        <span className="font-display text-2xl text-white/95 leading-none italic">
                          ¶
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-editorial-graphite">
                      {c.figPrefix} {num} — {beat.eyebrow}
                    </span>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal direction="up" className="mt-24 md:mt-32">
          <figure className="border-t border-b border-editorial-ink py-12 md:py-16 flex flex-col items-center gap-6 text-center">
            <span className="font-display text-[5rem] md:text-[7rem] leading-[0.6] text-editorial-blaze italic">
              &ldquo;
            </span>
            <blockquote className="font-display text-balance text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] max-w-4xl text-editorial-ink">
              {c.pullQuoteLead}{" "}
              <span className="italic">{c.pullQuoteEmphasis}</span>
            </blockquote>
            <figcaption className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
              — {site.founders[0].name}, {c.pullQuoteAttribSuffix}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function StoryGrain() {
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
