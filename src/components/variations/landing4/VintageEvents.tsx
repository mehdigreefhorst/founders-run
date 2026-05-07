import { cn } from "@/lib/utils";
import { site, type EventEntry } from "@/config/site";

interface VintageEventsProps {
  readonly className?: string;
}

export function VintageEvents({ className }: VintageEventsProps) {
  const c = site.copy.landing4.events;
  return (
    <section
      id="events"
      className={cn(
        "relative bg-[var(--vintage-cream)] vintage-paper py-20 md:py-28",
        className,
      )}
    >
      <div className="overflow-hidden border-y-[3px] border-[var(--vintage-cocoa-deep)] bg-[var(--vintage-brick-deep)] py-3 text-[var(--vintage-cream)]">
        <div className="vintage-marquee flex w-max gap-12 whitespace-nowrap font-varsity text-base md:text-lg">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{c.marquee.text1}</span>
              <span aria-hidden>{c.marquee.divider}</span>
              <span>{c.marquee.text2}</span>
              <span aria-hidden>{c.marquee.divider}</span>
              <span>{c.marquee.text3}</span>
              <span aria-hidden>{c.marquee.divider}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-10 mt-16 md:mt-24">
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
              <span className="inline-block h-[2px] w-7 bg-[var(--vintage-brick)]" aria-hidden />
              {c.eyebrow}
            </span>
            <h2 className="mt-4 font-varsity text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.9] text-[var(--vintage-brick-deep)] vintage-ink-press">
              {c.headlineLine1}
              <br />
              {c.headlineLine2}
            </h2>
          </div>
          <p className="md:col-span-5 max-w-md font-sans text-base md:text-lg leading-relaxed text-[var(--vintage-cocoa-deep)]">
            {c.description}
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

function BadgeCard({ event, index }: BadgeCardProps) {
  const c = site.copy.landing4.events;
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
      <div className="flex items-center justify-between gap-3 border-b-[2px] border-[var(--vintage-cocoa-deep)]/40 px-5 py-4">
        <span className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
          {c.cardNumberPrefix}&nbsp;{number}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border-[2px] border-[var(--vintage-brick-deep)] bg-[var(--vintage-cream)] px-2.5 py-1 font-sans text-[0.6rem] font-black uppercase tracking-[0.18em] text-[var(--vintage-brick-deep)]">
          <span aria-hidden>{c.sealStar}</span>
          <span>{c.tagLabels[event.tag]}</span>
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

      <div className="border-t-[2px] border-dashed border-[var(--vintage-cocoa-deep)]/40 px-5 py-3 font-sans text-[0.6rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)] flex items-center justify-between">
        <span>{c.ticketLeftPrefix} {number}</span>
        <span>{c.ticketRight}</span>
      </div>
    </article>
  );
}
