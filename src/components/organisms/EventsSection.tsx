import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { EventCard } from "@/components/molecules/EventCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

interface EventsSectionProps {
  readonly className?: string;
}

export function EventsSection({ className }: EventsSectionProps) {
  const c = site.copy.landing1.events;
  return (
    <section
      id="events"
      className={cn(
        "relative bg-peach-soft/40 py-24 md:py-32 overflow-hidden",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow={c.eyebrow}
            title={
              <>
                {c.headlineLine1}<br />
                <span className="text-terracotta-deep italic">{c.headlineLine2}</span>
              </>
            }
            description={c.description}
          />
        </Reveal>

        <Stagger className="mt-14 md:mt-20 grid gap-6 md:grid-cols-3">
          {site.events.map((event) => (
            <StaggerItem key={event.id} className="h-full">
              <EventCard event={event} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
