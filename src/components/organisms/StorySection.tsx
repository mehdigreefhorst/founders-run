import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

interface StorySectionProps {
  readonly className?: string;
}

export function StorySection({ className }: StorySectionProps) {
  return (
    <section
      id="story"
      className={cn(
        "relative bg-cream py-24 md:py-32 lg:py-40",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="The story"
            title={
              <>
                Why this exists.<br />
                <span className="text-terracotta-deep italic">And why it&apos;s 7am.</span>
              </>
            }
            description="A short story about what San Francisco gets right, what Eindhoven is missing, and why a recurring run beats a one-off event every time."
          />
        </Reveal>

        <Stagger className="mt-16 md:mt-24 grid gap-12 md:gap-16">
          {site.story.map((beat, idx) => (
            <StaggerItem key={beat.id}>
              <article className="grid md:grid-cols-12 gap-6 md:gap-10 items-start">
                <div className="md:col-span-3 flex flex-col gap-2">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <Eyebrow>{beat.eyebrow}</Eyebrow>
                </div>
                <div className="md:col-span-9 flex flex-col gap-5">
                  <h3 className="font-display text-balance text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight">
                    {beat.title}
                  </h3>
                  <p className="text-lg md:text-xl text-ink-soft leading-relaxed text-balance max-w-3xl">
                    {beat.body}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
