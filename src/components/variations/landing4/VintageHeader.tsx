import { cn } from "@/lib/utils";
import { site } from "@/config/site";

interface VintageHeaderProps {
  readonly bibNumber?: string;
  readonly className?: string;
}

export function VintageHeader({ bibNumber, className }: VintageHeaderProps) {
  const c = site.copy.landing4.header;
  const number = bibNumber ?? c.bibNumber;
  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-[var(--vintage-cream)]",
        "border-b-[3px] border-[var(--vintage-cocoa-deep)]",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-stretch justify-between gap-6 px-5 md:px-10">
        <div className="flex items-center gap-4 py-3 md:py-4">
          <div className="flex h-12 w-12 flex-col items-center justify-center rounded-sm border-[3px] border-[var(--vintage-brick)] bg-[var(--vintage-cream-soft)] text-[var(--vintage-brick-deep)] md:h-14 md:w-14">
            <span className="font-sans text-[0.55rem] font-semibold uppercase leading-none tracking-[0.15em] text-[var(--vintage-cocoa)]">
              {c.bibPrefix}
            </span>
            <span className="font-display text-2xl font-black leading-none tracking-tight md:text-3xl">
              {number}
            </span>
          </div>
          <div className="hidden flex-col leading-none sm:flex">
            <span className="font-varsity text-base text-[var(--vintage-brick-deep)] md:text-lg">
              {site.brand.name.toUpperCase()}
            </span>
            <span className="mt-1 font-sans text-[0.62rem] uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
              {site.brand.location} · {c.brandSuffix}
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          {c.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative font-sans text-xs font-bold uppercase tracking-[0.28em] text-[var(--vintage-cocoa-deep)] transition-colors hover:text-[var(--vintage-brick-deep)]"
            >
              {item.label}
              <span className="absolute -bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-[var(--vintage-brick)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center py-3 md:py-4">
          <a
            href="#join"
            className={cn(
              "inline-flex items-center gap-2 rounded-sm px-4 py-2.5 md:px-5 md:py-3",
              "border-[3px] border-[var(--vintage-cocoa-deep)] bg-[var(--vintage-brick)] text-[var(--vintage-cream)]",
              "font-sans text-[0.7rem] font-bold uppercase tracking-[0.22em] md:text-xs",
              "shadow-[3px_3px_0_0_var(--vintage-cocoa-deep)] transition-all",
              "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_var(--vintage-cocoa-deep)]",
              "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
            )}
          >
            <span aria-hidden>{c.ctaIcon}</span>
            <span>{c.ctaLabel}</span>
          </a>
        </div>
      </div>

      <div className="text-[var(--vintage-brick)]">
        <div className="vintage-double-rule" />
      </div>
    </header>
  );
}
