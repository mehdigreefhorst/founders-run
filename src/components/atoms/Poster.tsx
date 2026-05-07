import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

interface PosterProps {
  readonly className?: string;
  readonly priority?: boolean;
  readonly sizes?: string;
}

/**
 * The Founders Run × Coffee illustrated poster.
 *
 * Single wrapper around `next/image` so every variation that wants the
 * poster shares the same intrinsic dimensions and alt text. Override
 * sizing/positioning via `className`.
 */
export function Poster({ className, priority, sizes }: PosterProps) {
  const { poster } = site.brand;
  return (
    <Image
      src={poster.src}
      alt={poster.alt}
      width={poster.width}
      height={poster.height}
      priority={priority}
      sizes={sizes ?? "(min-width: 1024px) 540px, 80vw"}
      className={cn("h-auto w-full select-none", className)}
    />
  );
}
