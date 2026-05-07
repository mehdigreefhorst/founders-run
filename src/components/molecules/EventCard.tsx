import { cn } from "@/lib/utils";
import type { EventEntry } from "@/config/site";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  readonly event: EventEntry;
  readonly className?: string;
}

const tagLabel: Record<EventEntry["tag"], string> = {
  weekly: "Weekly",
  monthly: "Monthly",
  special: "Quarterly",
};

const tagColor: Record<EventEntry["tag"], string> = {
  weekly: "bg-terracotta-deep text-cream",
  monthly: "bg-peach text-ink",
  special: "bg-ink text-cream",
};

export function EventCard({ event, className }: EventCardProps) {
  return (
    <Card
      className={cn(
        "h-full flex flex-col gap-4 p-6 md:p-8 bg-card/70 backdrop-blur",
        "border-border/60 hover:border-terracotta/60 transition-colors",
        "shadow-[0_8px_40px_-24px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Badge className={cn("font-mono uppercase tracking-widest text-[0.65rem]", tagColor[event.tag])}>
          {tagLabel[event.tag]}
        </Badge>
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
          {event.cadence}
        </span>
      </div>
      <h3 className="font-display text-2xl md:text-3xl leading-tight">{event.title}</h3>
      <p className="font-mono text-sm text-terracotta-deep">{event.time}</p>
      <p className="text-ink-soft leading-relaxed text-balance">{event.description}</p>
    </Card>
  );
}
