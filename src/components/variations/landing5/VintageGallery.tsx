import Image from "next/image";
import { cn } from "@/lib/utils";
import { site, type GalleryItem, type GalleryRun } from "@/config/site";
import { GalleryMuxClip } from "@/components/molecules/GalleryMuxClip";

interface VintageGalleryProps {
  readonly className?: string;
}

/**
 * The "Film Roll" — a date-grouped scrap-book of every Wednesday run.
 * Pulls from `site.gallery` and renders one block per run date with a
 * race-bib eyebrow, a title, an optional note, and a polaroid-styled
 * grid mixing Next/Image photos with click-to-play Mux clips.
 */
export function VintageGallery({ className }: VintageGalleryProps) {
  const c = site.copy.landing5.gallery;
  return (
    <section
      id="gallery"
      className={cn(
        "relative bg-[var(--vintage-cream-soft)] vintage-paper",
        "border-y-[3px] border-[var(--vintage-cocoa-deep)]",
        "py-20 md:py-28 lg:py-32",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <header className="mb-14 grid gap-6 md:grid-cols-12 md:items-end md:gap-12">
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
              <span className="inline-block h-[2px] w-7 bg-[var(--vintage-brick)]" aria-hidden />
              {c.eyebrow}
            </span>
            <h2 className="mt-4 font-varsity text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-[var(--vintage-brick-deep)] vintage-ink-press">
              {c.headlineLine1}
              <br />
              {c.headlineLine2}
            </h2>
          </div>
          <p className="md:col-span-5 max-w-md font-sans text-base md:text-lg leading-relaxed text-[var(--vintage-cocoa-deep)]">
            {c.description}
          </p>
        </header>

        <div className="flex flex-col gap-20 md:gap-28">
          {site.gallery.map((run) => (
            <RunBlock key={run.id} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface RunBlockProps {
  readonly run: GalleryRun;
}

function RunBlock({ run }: RunBlockProps) {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-sm border-[3px] border-[var(--vintage-brick)] bg-[var(--vintage-cream)] px-3 py-1.5 font-sans text-[0.65rem] font-black uppercase tracking-[0.22em] text-[var(--vintage-brick-deep)]">
            {run.badge}
          </span>
          <h3 className="font-varsity text-2xl md:text-3xl leading-tight text-[var(--vintage-cocoa-deep)]">
            {run.label.toUpperCase()}
          </h3>
        </div>
        <div className="flex flex-col gap-1 font-sans text-[0.7rem] font-bold uppercase tracking-[0.28em] text-[var(--vintage-cocoa)] md:items-end md:text-right">
          <span>{run.date}</span>
          <span className="text-[var(--vintage-cocoa-deep)]/80">{run.location}</span>
        </div>
      </header>

      {run.note ? (
        <p className="font-display italic text-base md:text-lg text-[var(--vintage-cocoa-deep)]/85">
          {run.note}
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {run.items.map((item, idx) => (
          <GalleryTile key={`${run.id}-${idx}`} item={item} />
        ))}
      </div>
    </article>
  );
}

interface GalleryTileProps {
  readonly item: GalleryItem;
}

function GalleryTile({ item }: GalleryTileProps) {
  const c = site.copy.landing5.gallery;

  if (item.kind === "photo") {
    const aspect = item.aspect ?? "3/4";
    return (
      <figure
        className={cn(
          "relative overflow-hidden",
          "border-[3px] border-[var(--vintage-cocoa-deep)] bg-[var(--vintage-cream)]",
          "shadow-[4px_4px_0_0_var(--vintage-brick-deep)] transition-shadow",
          "hover:shadow-[6px_6px_0_0_var(--vintage-brick-deep)]",
        )}
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          loading="lazy"
          className="object-cover"
        />
        <span className="pointer-events-none absolute top-2 left-2 inline-flex items-center gap-1.5 rounded-sm border-[2px] border-[var(--vintage-cream)] bg-[var(--vintage-cocoa-deep)]/80 px-1.5 py-0.5 font-sans text-[0.55rem] font-bold uppercase tracking-[0.22em] text-[var(--vintage-cream)]">
          {c.photoChip}
        </span>
        {item.caption ? (
          <figcaption className="absolute bottom-0 left-0 right-0 bg-[var(--vintage-cocoa-deep)]/85 px-3 py-1.5 font-sans text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[var(--vintage-cream)]">
            {item.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <GalleryMuxClip
      playbackId={item.playbackId}
      posterAlt={item.posterAlt}
      aspect={item.aspect ?? "16/9"}
      source={item.source}
    />
  );
}
