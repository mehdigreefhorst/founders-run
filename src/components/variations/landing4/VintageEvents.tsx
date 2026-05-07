import { cn } from "@/lib/utils";
import { site, type EventEntry } from "@/config/site";

interface VintageEventsProps {
  readonly className?: string;
}

/**
 * Three merit-badge style event cards. Circle seal up top, varsity title,
 * cadence + description below, hard double-bordered card.
 */
export function VintageEvents({ className }: VintageEventsProps) {
  return (
    <section
      id="events"
      className={cn(
        "relative bg-[var(--vintage-cream)] vintage-paper py-20 md:py-28",
        className,
      )}
    >
      {/* Marquee strip */}
      <div className="overflow-hidden border-y-[3px] border-[var(--vintage-cocoa-deep)] bg-[var(--vintage-brick-deep)] py-3 text-[var(--vintage-cream)]">
        <div className="vintage-marquee flex w-max gap-12 whitespace-nowrap font-varsity text-base md:text-lg">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>FOUNDERS RUN CLUB</span>
              <span aria-hidden>★</span>
              <span>EINDHOVEN</span>
              <span aria-hidden>★</span>
              <span>EST. SEPTEMBER</span>
              <span aria-hidden>★</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-10 mt-16 md:mt-24">
        {/* Header */}
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
              <span className="inline-block h-[2px] w-7 bg-[var(--vintage-brick)]" aria-hidden />
              The Calendar
            </span>
            <h2 className="mt-4 font-varsity text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.9] text-[var(--vintage-brick-deep)] vintage-ink-press">
              ONE WEEKLY ANCHOR.
              <br />
              A FEW SPECIAL HEATS.
            </h2>
          </div>
          <p className="md:col-span-5 max-w-md font-sans text-base md:text-lg leading-relaxed text-[var(--vintage-cocoa-deep)]">
            Wednesday is the heartbeat. Once a month or quarter we host a
            variation — a Sunday walk, an investors run, a sponsored heat with
            lunch after.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-7">
          {site.events.map((event, idx) => (
            <BadgeCard key={event.id} event={event} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface BadgeCardProps {
  readonly event: EventEntry;
  readonly index: number;
}

const badgeLabel: Record<EventEntry["tag"], string> = {
  weekly: "WEEKLY",
  monthly: "MONTHLY",
  special: "QUARTERLY",
};

function BadgeCard({ event, index }: BadgeCardProps) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-sm bg-[var(--vintage-cream-soft)]",
        "border-[3px] border-[var(--vintage-cocoa-deep)]",
        "shadow-[6px_6px_0_0_var(--vintage-brick-deep)] transition-shadow",
        "hover:shadow-[8px_8px_0_0_var(--vintage-brick-deep)]",
      )}
    >
      {/* Seal up top */}
      <div className="flex items-start justify-between gap-3 border-b-[2px] border-[var(--vintage-cocoa-deep)]/40 px-5 py-4">
        <span className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
          No.&nbsp;{number}
        </span>
        <span className="inline-flex h-12 w-12 flex-col items-center justify-center rounded-full border-[2px] border-[var(--vintage-brick-deep)] text-[var(--vintage-brick-deep)] font-sans text-[0.55rem] font-black uppercase leading-tight tracking-[0.12em]">
          <span aria-hidden className="text-[0.55rem]">★</span>
          <span>{badgeLabel[event.tag]}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <h3 className="font-varsity text-2xl leading-tight text-[var(--vintage-brick-deep)]">
          {event.title.toUpperCase()}
        </h3>
        <span className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[var(--vintage-cocoa-deep)]">
          {event.cadence}
        </span>
        <span className="font-display text-base italic font-medium text-[var(--vintage-cocoa-deep)]">
          {event.time}
        </span>
        <p className="mt-1 font-sans text-sm leading-relaxed text-[var(--vintage-cocoa-deep)]/85">
          {event.description}
        </p>
      </div>

      {/* Tear-off ticket bottom */}
      <div className="border-t-[2px] border-dashed border-[var(--vintage-cocoa-deep)]/40 px-5 py-3 font-sans text-[0.6rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)] flex items-center justify-between">
        <span>BIB · {number}</span>
        <span>FREE TO JOIN</span>
      </div>
    </article>
  );
}
