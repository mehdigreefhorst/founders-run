import { cn } from "@/lib/utils";
import Link from "next/link";
import { Wordmark } from "@/components/atoms/Wordmark";
import { SocialBar } from "@/components/molecules/SocialBar";
import { Button } from "@/components/ui/button";

interface SiteHeaderProps {
  readonly className?: string;
  readonly variant?: "transparent" | "solid";
}

export function SiteHeader({ className, variant = "transparent" }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full border-b border-transparent",
        variant === "solid" && "bg-cream/85 backdrop-blur border-border/60",
        className
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-6 px-6 md:px-10 py-5">
        <Link href="/" aria-label="Founders Run home">
          <Wordmark size="md" />
        </Link>
        <nav className="hidden md:flex items-center gap-7 font-mono text-[0.78rem] uppercase tracking-[0.18em]">
          <a href="#story" className="text-ink-soft hover:text-ink transition-colors">Story</a>
          <a href="#events" className="text-ink-soft hover:text-ink transition-colors">Events</a>
          <a href="#join" className="text-ink-soft hover:text-ink transition-colors">Join</a>
        </nav>
        <div className="flex items-center gap-4">
          <SocialBar variant="icons" className="hidden sm:flex" />
          <Button
            size="sm"
            nativeButton={false}
            render={<a href="#join" />}
            className="rounded-full bg-ink text-cream hover:bg-terracotta-deep"
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
}
