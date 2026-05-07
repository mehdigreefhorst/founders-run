import { cn } from "@/lib/utils";
import { site } from "@/config/site";

interface WordmarkProps {
  readonly className?: string;
  readonly size?: "sm" | "md" | "lg";
  readonly showLocation?: boolean;
}

const sizeClass: Record<NonNullable<WordmarkProps["size"]>, string> = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
};

export function Wordmark({ className, size = "md", showLocation = true }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2 font-display tracking-tight",
        sizeClass[size],
        className
      )}
    >
      <span className="font-medium">{site.brand.name}</span>
      {showLocation ? (
        <span className="text-muted-foreground text-[0.7em] uppercase tracking-[0.18em]">
          {site.brand.location}
        </span>
      ) : null}
    </span>
  );
}
