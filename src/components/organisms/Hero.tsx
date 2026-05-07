import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { SunMark } from "@/components/atoms/SunMark";
import { HeroCarousel } from "@/components/molecules/HeroCarousel";
import { HeroVideo } from "@/components/molecules/HeroVideo";
import { NextRunCard } from "@/components/molecules/NextRunCard";
import { Button } from "@/components/ui/button";

interface HeroProps {
  readonly className?: string;
  readonly media?: "carousel" | "video" | "split";
  /** Force placeholder gradients while real photos are pending. */
  readonly placeholderMedia?: boolean;
}

/**
 * The Hero organism. Above-the-fold — renders without scroll-reveal so it
 * appears immediately on first paint.
 */
export function Hero({ className, media = "carousel", placeholderMedia = true }: HeroProps) {
  const headlineLines = site.hero.title.split("\n");

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-dawn-radial grain isolate",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7 flex flex-col gap-7 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Eyebrow>{site.hero.eyebrow}</Eyebrow>
            <h1 className="font-display text-balance leading-[0.96] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-ink">
              {headlineLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-ink-soft leading-relaxed text-balance">
              {site.hero.sub}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                size="lg"
                nativeButton={false}
                render={<a href={site.hero.primaryCta.anchor} />}
                className="rounded-full bg-ink text-cream hover:bg-terracotta-deep px-7 h-12"
              >
                {site.hero.primaryCta.label}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                nativeButton={false}
                render={<a href={site.hero.secondaryCta.anchor} />}
                className="rounded-full border border-ink/15 hover:bg-cream/60 h-12 px-6"
              >
                {site.hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <SunMark className="size-12 text-terracotta-deep mb-6 lg:ml-auto" />
            <HeroMedia media={media} placeholder={placeholderMedia} />
          </div>
        </div>

        <div className="mt-14 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <NextRunCard />
        </div>
      </div>
    </section>
  );
}

function HeroMedia({ media, placeholder }: { media: HeroProps["media"]; placeholder: boolean }) {
  if (media === "video") {
    return (
      <HeroVideo
        src={site.video.src}
        poster={site.video.poster}
        className="aspect-[4/5] lg:aspect-[3/4]"
      />
    );
  }
  if (media === "split") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <HeroCarousel slides={site.carousel} aspect="square" forcePlaceholder={placeholder} />
        <HeroVideo src={site.video.src} poster={site.video.poster} className="aspect-square" />
      </div>
    );
  }
  return <HeroCarousel slides={site.carousel} aspect="wide" forcePlaceholder={placeholder} />;
}
