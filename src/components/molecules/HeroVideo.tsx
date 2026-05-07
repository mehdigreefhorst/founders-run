"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Play, Volume2, VolumeX } from "lucide-react";

interface HeroVideoProps {
  readonly src: string;
  readonly poster?: string;
  readonly className?: string;
  readonly autoPlay?: boolean;
}

/**
 * Hero video player. Defaults to muted+autoplay so it doubles as a
 * living background. Renders a styled placeholder when the video
 * file is missing (so the layout stays intact pre-asset).
 */
export function HeroVideo({ src, poster, className, autoPlay = true }: HeroVideoProps) {
  const [muted, setMuted] = useState(true);
  const [errored, setErrored] = useState(false);

  return (
    <div className={cn("relative w-full overflow-hidden rounded-3xl bg-ink", className)}>
      {errored ? (
        <VideoPlaceholder />
      ) : (
        <video
          className="size-full object-cover"
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop
          muted={muted}
          playsInline
          onError={() => setErrored(true)}
        />
      )}

      {!errored ? (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className={cn(
            "absolute bottom-4 right-4 inline-flex items-center gap-2",
            "rounded-full bg-cream/90 text-ink px-3 py-1.5 text-xs font-mono uppercase tracking-widest",
            "backdrop-blur transition-colors hover:bg-cream"
          )}
        >
          {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
          {muted ? "Unmute" : "Mute"}
        </button>
      ) : null}
    </div>
  );
}

function VideoPlaceholder() {
  return (
    <div className="size-full bg-gradient-to-br from-terracotta-deep via-ember to-peach flex flex-col items-center justify-center gap-3 text-cream">
      <Play className="size-10" />
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em]">
        Hero video — drop in /public/video/hero.mp4
      </span>
    </div>
  );
}
