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
            eyebrow="Events"
            title={
              <>
                One weekly anchor.<br />
                <span className="text-terracotta-deep italic">A few special variations.</span>
              </>
            }
            description="The Wednesday run is the heartbeat. Once a month or quarter we mix it up — a Sunday walk, a founders × investors run, a sponsored variant with a proper lunch after."
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
