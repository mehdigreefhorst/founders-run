import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { SocialIcon } from "@/components/atoms/SocialIcon";

interface VintageFooterProps {
  readonly className?: string;
}

export function VintageFooter({ className }: VintageFooterProps) {
  const year = new Date().getFullYear();
  const c = site.copy.landing4.footer;
  return (
    <footer
      className={cn(
        "relative bg-[var(--vintage-cream)] vintage-paper border-t-[3px] border-[var(--vintage-cocoa-deep)]",
        className,
      )}
    >
      <div className="overflow-hidden border-b-[3px] border-[var(--vintage-cocoa-deep)] bg-[var(--vintage-cream-soft)]">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-10 md:py-14">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.5em] text-[var(--vintage-cocoa)]">
              {c.wordmarkEyebrow}
            </span>
            <span
              className="font-varsity text-[clamp(3rem,12vw,9rem)] leading-[0.85] text-[var(--vintage-brick-deep)] vintage-ink-press"
              aria-label={c.wordmarkAria}
            >
              {c.wordmark}
            </span>
            <span className="mt-2 font-display italic text-base md:text-lg text-[var(--vintage-cocoa-deep)]">
              {site.brand.tagline}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-10 py-10 md:py-12 grid gap-10 md:grid-cols-3 md:gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
            {c.patchesLabel}
          </span>
          <ul className="grid grid-cols-2 gap-3 max-w-xs">
            {site.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "group flex items-center gap-3 rounded-sm border-[2px] border-[var(--vintage-cocoa-deep)] bg-[var(--vintage-cream)] px-3 py-2",
                    "transition-all hover:bg-[var(--vintage-brick)] hover:text-[var(--vintage-cream)]",
                  )}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--vintage-brick)] text-[var(--vintage-cream)] group-hover:bg-[var(--vintage-cream)] group-hover:text-[var(--vintage-brick)]">
                    <SocialIcon id={s.id} className="size-3.5" />
                  </span>
                  <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--vintage-cocoa-deep)] group-hover:text-[var(--vintage-cream)]">
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <span className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
            {c.coachLabel}
          </span>
          {site.founders.map((f) => (
            <div key={f.linkedin} className="flex flex-col gap-1">
              <a
                href={f.linkedin}
                target="_blank"
                rel="noreferrer"
                className="font-display text-xl font-bold text-[var(--vintage-cocoa-deep)] hover:text-[var(--vintage-brick-deep)] transition-colors"
              >
                {f.name}
              </a>
              <span className="font-sans text-sm text-[var(--vintage-cocoa-deep)]/80">
                {f.role}
              </span>
              <span className="mt-0.5 font-sans text-xs italic text-[var(--vintage-cocoa)]">
                {f.note}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 md:items-end md:text-right">
          <span className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
            {c.colophonLabel}
          </span>
          <span
            className={cn(
              "inline-flex h-32 w-32 flex-col items-center justify-center rounded-full",
              "border-[3px] border-[var(--vintage-brick-deep)] text-[var(--vintage-brick-deep)]",
              "rotate-[-6deg] font-sans text-[0.6rem] font-black uppercase tracking-[0.12em] leading-tight",
            )}
          >
            <span>{c.colophonStamp.line1}</span>
            <span className="my-0.5 font-varsity text-base">{c.colophonStamp.line2}</span>
            <span>{c.colophonStamp.line3}</span>
          </span>
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.32em] text-[var(--vintage-cocoa-deep)]">
            {c.copyrightPrefix} {year} · {site.brand.domain}
          </span>
        </div>
      </div>
    </footer>
  );
}
