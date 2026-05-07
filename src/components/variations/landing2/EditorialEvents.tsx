import { cn } from "@/lib/utils";
import { site, type EventEntry } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ArrowRight } from "lucide-react";

interface EditorialEventsProps {
  readonly className?: string;
}

export function EditorialEvents({ className }: EditorialEventsProps) {
  const c = site.copy.landing2.events;
  return (
    <section
      id="events"
      className={cn(
        "relative bg-editorial-paper-warm text-editorial-ink py-24 md:py-32",
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

        <Stagger className="mt-12 md:mt-16 flex flex-col">
          {site.events.map((event, idx) => (
            <StaggerItem key={event.id}>
              <a
                href="#join"
                className="group relative grid grid-cols-12 gap-x-4 md:gap-x-8 items-stretch border-b border-editorial-rule py-8 md:py-10 hover:bg-editorial-paper transition-colors"
              >
                <div className="col-span-2 md:col-span-1 flex items-start">
                  <span className="font-mono text-[0.7rem] md:text-[0.8rem] uppercase tracking-[0.22em] text-editorial-graphite group-hover:text-editorial-blaze transition-colors">
                    /{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="col-span-10 md:col-span-5 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.32em] text-editorial-paper bg-editorial-ink px-2 py-1 group-hover:bg-editorial-blaze transition-colors">
                      {tagLabel(c.tagLabels, event.tag)}
                    </span>
                  </div>
                  <h3 className="font-display font-medium text-3xl md:text-5xl leading-[0.95] tracking-[-0.02em] text-editorial-ink group-hover:text-editorial-blaze transition-colors">
                    {event.title}
                  </h3>
                </div>

                <div className="col-span-12 md:col-span-4 flex flex-col gap-2 md:pt-1">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
                    {event.cadence}
                  </span>
                  <span className="font-display text-lg md:text-xl text-editorial-ink leading-tight">
                    {event.time}
                  </span>
                  <p className="font-sans text-sm leading-relaxed text-editorial-graphite max-w-md mt-1">
                    {event.description}
                  </p>
                </div>

                <div className="col-span-12 md:col-span-2 flex md:items-start md:justify-end">
                  <span className="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-ink group-hover:text-editorial-blaze transition-colors">
                    {c.joinAction}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="border-t-2 border-editorial-ink mt-0" />
      </div>
    </section>
  );
}

function tagLabel(map: { weekly: string; monthly: string; special: string }, tag: EventEntry["tag"]) {
  return map[tag];
}
