import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

interface SectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly align?: "start" | "center";
  readonly className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl flex flex-col gap-4",
        align === "center" && "items-center text-center mx-auto",
        className
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display text-balance text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
        {title}
      </h2>
      {description ? (
        <p className="text-lg text-ink-soft text-balance leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
