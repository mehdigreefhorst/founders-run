"use client";

import MuxPlayer from "@mux/mux-player-react";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { Poster } from "@/components/atoms/Poster";

interface PosterMuxProps {
  readonly playbackId?: string;
  readonly posterTime?: number;
  readonly className?: string;
  readonly sizes?: string;
}

/**
 * Hero slot that renders a Mux loop when `playbackId` is provided, or
 * falls back to the static `Poster` atom when it isn't yet — so the page
 * works before the user uploads to Mux.
 *
 * Aspect is locked to the poster's intrinsic 540×810 so the framed slot
 * doesn't reflow when the player swaps in for the still image.
 */
export function PosterMux({ playbackId, posterTime, className, sizes }: PosterMuxProps) {
  if (!playbackId) {
    return (
      <Poster
        priority
        className={cn("block w-full", className)}
        sizes={sizes ?? "(min-width: 1024px) 540px, (min-width: 768px) 40vw, 80vw"}
      />
    );
  }
  const { width, height } = site.brand.poster;
  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
      autoPlay="muted"
      muted
      loop
      playsInline
      preload="metadata"
      thumbnailTime={posterTime ?? 0}
      accentColor="#C8512F"
      style={{ aspectRatio: `${width} / ${height}` }}
      className={cn("block w-full [--media-object-fit:cover]", className)}
      metadata={{ video_title: "Founders Run hero loop" }}
    />
  );
}
