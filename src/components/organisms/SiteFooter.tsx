import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { Wordmark } from "@/components/atoms/Wordmark";
import { SocialBar } from "@/components/molecules/SocialBar";

interface SiteFooterProps {
  readonly className?: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const c = site.copy.landing1.footer;
  return (
    <footer
      className={cn(
        "border-t border-border/60 bg-cream py-12 md:py-16",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid gap-8 md:grid-cols-3 items-start">
        <div className="flex flex-col gap-3">
          <Wordmark size="lg" />
          <p className="text-sm text-ink-soft max-w-xs leading-relaxed">
            {site.brand.shortPitch}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            {c.followLabel}
          </span>
          <SocialBar variant="list" />
        </div>
        <div className="flex flex-col gap-3 md:items-end md:text-right">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            {c.contactLabel}
          </span>
          {site.founders.map((f) => (
            <a
              key={f.linkedin}
              href={f.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-ink hover:text-terracotta-deep transition-colors"
            >
              {f.name} · {f.role}
            </a>
          ))}
          <span className="text-xs text-muted-foreground font-mono">
            {c.copyrightPrefix} {year} {site.brand.domain}
          </span>
        </div>
      </div>
    </footer>
  );
}
