import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { SocialIcon } from "@/components/atoms/SocialIcon";

interface EditorialFooterProps {
  readonly className?: string;
}

export function EditorialFooter({ className }: EditorialFooterProps) {
  const year = new Date().getFullYear();
  const c = site.copy.landing2.footer;
  const sharedNav = site.copy.shared.nav;
  const navPrefix = site.copy.landing2.header.navPrefix;

  return (
    <footer
      className={cn(
        "relative bg-editorial-paper text-editorial-ink border-t-2 border-editorial-ink",
        className
      )}
    >
      <div className="border-b border-editorial-rule overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-12 md:py-16">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display font-medium leading-[0.85] tracking-[-0.04em] text-[clamp(3.5rem,15vw,14rem)]">
              {c.wordmarkPart1}
              <span className="italic font-light text-editorial-blaze">{c.wordmarkSeparator}</span>
              {c.wordmarkPart2}
            </h2>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite pb-3">
              {c.wordmarkLocation}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-12 md:py-16 grid grid-cols-12 gap-x-6 md:gap-x-8 gap-y-10">
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
            {c.aboutLabel}
          </span>
          <p className="font-sans text-sm md:text-base leading-relaxed text-editorial-ink/80 max-w-sm">
            {site.brand.shortPitch}
          </p>
          <ul className="flex flex-col gap-3 mt-2">
            {site.founders.map((f) => (
              <li key={f.linkedin} className="flex flex-col gap-1">
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-ink hover:text-editorial-blaze transition-colors"
                >
                  {f.name} — {f.role} {c.founderArrow}
                </a>
                <p className="font-sans text-xs text-editorial-graphite max-w-sm leading-relaxed">
                  {f.note}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 md:col-span-2 flex flex-col gap-4">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
            {c.sectionsLabel}
          </span>
          <ul className="flex flex-col gap-3 font-display text-lg md:text-xl">
            <li>
              <a href="#story" className="hover:text-editorial-blaze transition-colors">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-editorial-graphite mr-2">
                  {navPrefix.story}
                </span>
                {sharedNav.story}
              </a>
            </li>
            <li>
              <a href="#events" className="hover:text-editorial-blaze transition-colors">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-editorial-graphite mr-2">
                  {navPrefix.events}
                </span>
                {sharedNav.events}
              </a>
            </li>
            <li>
              <a href="#join" className="hover:text-editorial-blaze transition-colors">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-editorial-graphite mr-2">
                  {navPrefix.join}
                </span>
                {sharedNav.join}
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-3 flex flex-col gap-4">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
            {c.socialsLabel}
          </span>
          <ul className="flex flex-col gap-3">
            {site.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 hover:text-editorial-blaze transition-colors"
                >
                  <SocialIcon
                    id={s.id}
                    className="size-4 text-editorial-graphite group-hover:text-editorial-blaze transition-colors"
                  />
                  <span className="font-display text-base">{s.handle}</span>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-editorial-graphite">
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
            {c.issueLabel}
          </span>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
            {c.issueRows.map((row) => (
              <div key={row.label} className="contents">
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-editorial-graphite">
                  {row.label}
                </dt>
                <dd className="font-display text-base">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-editorial-ink">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-5 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-editorial-graphite">
          <span>{c.copyrightPrefix} {year} {site.brand.domain}</span>
          <span className="hidden sm:inline">{c.colophonSet}</span>
          <span>{c.colophonTagline}</span>
        </div>
      </div>
    </footer>
  );
}
