"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CarouselSlide {
  readonly src: string;
  readonly alt: string;
}

interface HeroCarouselProps {
  readonly slides: readonly CarouselSlide[];
  readonly className?: string;
  readonly intervalMs?: number;
  readonly aspect?: "video" | "wide" | "square";
  /**
   * Force placeholder gradients regardless of whether image files exist.
   * Useful while real photos are pending.
   */
  readonly forcePlaceholder?: boolean;
}

const aspectClass: Record<NonNullable<HeroCarouselProps["aspect"]>, string> = {
  video: "aspect-[16/9]",
  wide: "aspect-[21/9]",
  square: "aspect-square",
};

const placeholderGradients = [
  "from-peach via-terracotta to-terracotta-deep",
  "from-cream via-peach to-terracotta",
  "from-terracotta via-ember to-ink",
  "from-peach-soft via-peach to-terracotta-deep",
  "from-cream-soft via-peach-soft to-peach",
  "from-terracotta-deep via-ember to-peach",
];

/**
 * Auto-sliding image carousel. Transitions left-to-right with a fade,
 * pauses on hover. Renders a styled gradient placeholder when an image
 * file is missing (so the layout stays intact while we wait for real photos).
 */
export function HeroCarousel({
  slides,
  className,
  intervalMs = 4500,
  aspect = "wide",
  forcePlaceholder = false,
}: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, slides.length, intervalMs]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-3xl bg-peach-soft/60",
        aspectClass[aspect],
        className
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => {
        const isActive = i === activeIndex;
        const showPlaceholder = forcePlaceholder || failed[i] === true;
        return (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-out",
              isActive ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
            )}
            aria-hidden={!isActive}
          >
            {showPlaceholder ? (
              <PlaceholderSlide
                gradient={placeholderGradients[i % placeholderGradients.length]}
                label={slide.alt}
              />
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                priority={i === 0}
                onError={() => setFailed((prev) => ({ ...prev, [i]: true }))}
                className="object-cover"
              />
            )}
          </div>
        );
      })}

      {/* Dawn vignette overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none"
      />

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === activeIndex ? "w-6 bg-cream" : "w-1.5 bg-cream/50 hover:bg-cream/80"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function PlaceholderSlide({ gradient, label }: { gradient: string; label: string }) {
  return (
    <div
      className={cn(
        "size-full bg-gradient-to-br flex items-end p-8 md:p-10",
        gradient
      )}
    >
      <span className="font-mono text-xs md:text-sm uppercase tracking-[0.22em] text-cream/85 max-w-md leading-relaxed">
        {label}
      </span>
    </div>
  );
}
