import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { SocialIcon } from "@/components/atoms/SocialIcon";

interface SocialBarProps {
  readonly className?: string;
  readonly variant?: "icons" | "labels" | "list";
}

export function SocialBar({ className, variant = "icons" }: SocialBarProps) {
  if (variant === "list") {
    return (
      <ul className={cn("flex flex-col gap-3", className)}>
        {site.socials.map((s) => (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 text-ink hover:text-terracotta-deep transition-colors"
            >
              <SocialIcon id={s.id} className="size-4 text-ink-soft group-hover:text-terracotta-deep transition-colors" />
              <span className="font-mono text-sm">{s.handle}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                {s.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {site.socials.map((s) => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${s.label} — ${s.handle}`}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 backdrop-blur px-3 py-1.5 text-sm transition-colors",
            "hover:border-terracotta hover:text-terracotta-deep"
          )}
        >
          <SocialIcon id={s.id} className="size-4" />
          {variant === "labels" ? <span>{s.label}</span> : null}
        </a>
      ))}
    </div>
  );
}
