"use client";

import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

interface GalleryMuxClipProps {
  readonly playbackId: string;
  readonly posterAlt: string;
  readonly aspect: string;
  /** Source filename shown in the placeholder when `playbackId` is empty. */
  readonly source: string;
  readonly className?: string;
}

/**
 * Lazy gallery video tile. Renders a vintage-styled placeholder until the
 * user clicks Play; only then does the Mux player mount and start fetching.
 * Keeps the gallery cheap on initial load even with many clips.
 *
 * If `playbackId` is empty (Mux upload pending) the tile shows a labelled
 * "clip coming soon" panel with the source .mov filename so it's clear
 * what's missing.
 */
export function GalleryMuxClip({
  playbackId,
  posterAlt,
  aspect,
  source,
  className,
}: GalleryMuxClipProps) {
  const [active, setActive] = useState(false);
  const c = site.copy.landing5.gallery;
  const ready = Boolean(playbackId);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "border-[3px] border-[var(--vintage-cocoa-deep)] bg-[var(--vintage-cocoa-deep)]",
        "shadow-[4px_4px_0_0_var(--vintage-brick-deep)]",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      {!ready ? (
        <PendingPanel source={source} />
      ) : active ? (
        <MuxPlayer
          streamType="on-demand"
          playbackId={playbackId}
          autoPlay="muted"
          muted={false}
          playsInline
          preload="auto"
          accentColor="#C8512F"
          className="h-full w-full [--media-object-fit:cover]"
          metadata={{ video_title: posterAlt }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play clip: ${posterAlt}`}
          className="group relative block h-full w-full bg-[var(--vintage-cocoa-deep)] hover:bg-[var(--vintage-cocoa)] transition-colors"
        >
          <PosterFrame playbackId={playbackId} alt={posterAlt} />
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "bg-[var(--vintage-cocoa-deep)]/30 group-hover:bg-[var(--vintage-cocoa-deep)]/10 transition-colors",
            )}
          >
            <span
              className={cn(
                "inline-flex h-16 w-16 items-center justify-center rounded-full",
                "border-[3px] border-[var(--vintage-cream)] bg-[var(--vintage-brick)] text-[var(--vintage-cream)]",
                "font-sans text-xl",
                "shadow-[3px_3px_0_0_var(--vintage-cocoa-deep)] transition-transform",
                "group-hover:scale-105 group-active:scale-95",
              )}
            >
              ▶
            </span>
          </span>
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-sm border-[2px] border-[var(--vintage-cream)] bg-[var(--vintage-cocoa-deep)]/85 px-2 py-1 font-sans text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[var(--vintage-cream)]">
            {c.clipChip}
          </span>
        </button>
      )}
    </div>
  );
}

interface PosterFrameProps {
  readonly playbackId: string;
  readonly alt: string;
}

function PosterFrame({ playbackId, alt }: PosterFrameProps) {
  // Mux serves a thumbnail JPEG via image.mux.com — used as the poster while
  // the player is dormant. width/fit-mode picked for a hero crop.
  const src = `https://image.mux.com/${playbackId}/thumbnail.jpg?width=900&fit_mode=smartcrop`;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />;
}

interface PendingPanelProps {
  readonly source: string;
}

function PendingPanel({ source }: PendingPanelProps) {
  const c = site.copy.landing5.gallery;
  return (
    <div className="flex h-full w-full flex-col items-start justify-between gap-4 bg-[var(--vintage-cream-soft)] p-4 text-[var(--vintage-cocoa-deep)] md:p-5">
      <span className="inline-flex items-center gap-1.5 rounded-sm border-[2px] border-[var(--vintage-cocoa-deep)] bg-[var(--vintage-cream)] px-2 py-1 font-sans text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[var(--vintage-cocoa-deep)]">
        {c.clipChip}
      </span>
      <span className="font-varsity text-2xl leading-tight text-[var(--vintage-brick-deep)]">
        {c.clipPlaceholder}
      </span>
      <span className="break-all font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--vintage-cocoa)]">
        {c.clipSourcePrefix} {source}
      </span>
    </div>
  );
}
