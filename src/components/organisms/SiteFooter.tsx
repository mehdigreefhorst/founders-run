import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { Wordmark } from "@/components/atoms/Wordmark";
import { SocialBar } from "@/components/molecules/SocialBar";

interface SiteFooterProps {
  readonly className?: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  const year = new Date().getFullYear();
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
            Follow
          </span>
          <SocialBar variant="list" />
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            Contact
          </span>
          <a
            href={site.founder.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-ink hover:text-terracotta-deep transition-colors"
          >
            {site.founder.name} · {site.founder.role}
          </a>
          <span className="text-xs text-muted-foreground font-mono">
            © {year} {site.brand.domain}
          </span>
        </div>
      </div>
    </footer>
  );
}
