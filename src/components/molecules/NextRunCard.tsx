import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { Card } from "@/components/ui/card";

interface NextRunCardProps {
  readonly className?: string;
}

const fields: ReadonlyArray<{ label: string; key: keyof typeof site.nextRun }> = [
  { label: "Day", key: "weekday" },
  { label: "Time", key: "time" },
  { label: "Meet", key: "meetingPoint" },
  { label: "Distance", key: "distance" },
  { label: "Pace", key: "pace" },
];

export function NextRunCard({ className }: NextRunCardProps) {
  return (
    <Card
      className={cn(
        "p-6 md:p-8 bg-card/80 backdrop-blur border-border/60 shadow-[0_8px_40px_-20px_rgba(0,0,0,0.18)]",
        className
      )}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-terracotta-deep">
            Next run
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            Eindhoven
          </span>
        </div>
        <dl className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-4">
          {fields.map((f) => (
            <div key={f.key} className="flex flex-col gap-1">
              <dt className="text-[0.65rem] font-mono uppercase tracking-widest text-muted-foreground">
                {f.label}
              </dt>
              <dd className="font-display text-lg leading-tight">{site.nextRun[f.key]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
}
