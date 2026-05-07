import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { SocialIcon } from "@/components/atoms/SocialIcon";

interface EditorialFooterProps {
  readonly className?: string;
}

/**
 * Editorial footer — masthead colophon.
 *
 * Mimics a print magazine masthead: oversized wordmark, columns of links and
 * meta, fine rules between sections, and a colophon strip at the bottom.
 */
export function EditorialFooter({ className }: EditorialFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative bg-editorial-paper text-editorial-ink border-t-2 border-editorial-ink",
        className
      )}
    >
      {/* Oversized wordmark band */}
      <div className="border-b border-editorial-rule overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-12 md:py-16">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display font-medium leading-[0.85] tracking-[-0.04em] text-[clamp(3.5rem,15vw,14rem)]">
              Founders<span className="italic font-light text-editorial-blaze">/</span>Run
            </h2>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite pb-3">
              Eindhoven
            </span>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-12 md:py-16 grid grid-cols-12 gap-x-6 md:gap-x-8 gap-y-10">
        {/* About */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
            About
          </span>
          <p className="font-sans text-sm md:text-base leading-relaxed text-editorial-ink/80 max-w-sm">
            {site.brand.shortPitch}
          </p>
          <a
            href={site.founder.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-ink hover:text-editorial-blaze transition-colors mt-2"
          >
            {site.founder.name} — {site.founder.role} →
          </a>
          <p className="font-sans text-xs text-editorial-graphite max-w-sm leading-relaxed">
            {site.founder.note}
          </p>
        </div>

        {/* Navigation */}
        <div className="col-span-6 md:col-span-2 flex flex-col gap-4">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
            Sections
          </span>
          <ul className="flex flex-col gap-3 font-display text-lg md:text-xl">
            <li>
              <a href="#story" className="hover:text-editorial-blaze transition-colors">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-editorial-graphite mr-2">
                  01
                </span>
                Story
              </a>
            </li>
            <li>
              <a href="#events" className="hover:text-editorial-blaze transition-colors">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-editorial-graphite mr-2">
                  02
                </span>
                Events
              </a>
            </li>
            <li>
              <a href="#join" className="hover:text-editorial-blaze transition-colors">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-editorial-graphite mr-2">
                  03
                </span>
                Join
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="col-span-6 md:col-span-3 flex flex-col gap-4">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
            Off the page
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

        {/* Issue / colophon */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
            This issue
          </span>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
            <dt className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-editorial-graphite">
              Volume
            </dt>
            <dd className="font-display text-base">01</dd>
            <dt className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-editorial-graphite">
              Issue
            </dt>
            <dd className="font-display text-base">01</dd>
            <dt className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-editorial-graphite">
              City
            </dt>
            <dd className="font-display text-base">Eindhoven</dd>
            <dt className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-editorial-graphite">
              Cadence
            </dt>
            <dd className="font-display text-base">Weekly</dd>
          </dl>
        </div>
      </div>

      {/* Colophon strip */}
      <div className="border-t border-editorial-ink">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-5 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-editorial-graphite">
          <span>© {year} {site.brand.domain}</span>
          <span className="hidden sm:inline">Set in Fraunces & Inter Tight</span>
          <span>Wake early. Run together. Build something.</span>
        </div>
      </div>
    </footer>
  );
}
