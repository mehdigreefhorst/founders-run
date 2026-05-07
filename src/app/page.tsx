import Link from "next/link";
import { site } from "@/config/site";
import { Wordmark } from "@/components/atoms/Wordmark";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { SunMark } from "@/components/atoms/SunMark";
import { Card } from "@/components/ui/card";

interface VariantEntry {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly status: "ready" | "coming";
}

const variants: ReadonlyArray<VariantEntry> = [
  {
    slug: "/landing-1",
    title: "Dawn / atmospheric (reference)",
    description:
      "Sunrise gradient hero, Fraunces serif, soft warm palette, scroll-revealed story beats.",
    status: "ready",
  },
  {
    slug: "/landing-2",
    title: "Variation 2",
    description: "Coming next — to be designed by a sub-agent.",
    status: "coming",
  },
  {
    slug: "/landing-3",
    title: "Variation 3",
    description: "Coming next — to be designed by a sub-agent.",
    status: "coming",
  },
];

export default function VariantIndex() {
  return (
    <main className="relative min-h-screen bg-cream">
      <div className="mx-auto max-w-5xl px-6 md:px-10 py-16 md:py-24 flex flex-col gap-12">
        <header className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-3">
            <Wordmark size="lg" />
            <Eyebrow>Internal — design variations</Eyebrow>
          </div>
          <SunMark className="size-10 text-terracotta-deep" />
        </header>

        <section className="flex flex-col gap-3 max-w-3xl">
          <h1 className="font-display text-balance text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Three takes on{" "}
            <span className="italic text-terracotta-deep">{site.brand.name} {site.brand.location}</span>.
          </h1>
          <p className="text-lg text-ink-soft">
            Pick a variation to preview. Each one consumes the same content from{" "}
            <code className="font-mono text-sm bg-cream-soft px-1.5 py-0.5 rounded">src/config/site.ts</code>{" "}
            and the same atomic component library, so swapping copy is a one-file change.
          </p>
        </section>

        <section className="grid gap-4 md:gap-5">
          {variants.map((v) => (
            <Card
              key={v.slug}
              className="p-6 md:p-7 flex items-center justify-between gap-6 bg-card/80 backdrop-blur border-border/60 hover:border-terracotta/60 transition-colors"
            >
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-terracotta-deep">
                    {v.slug}
                  </span>
                  {v.status === "coming" ? (
                    <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2 py-0.5">
                      Pending
                    </span>
                  ) : (
                    <span className="font-mono text-[0.65rem] uppercase tracking-widest text-cream bg-terracotta-deep rounded-full px-2 py-0.5">
                      Ready
                    </span>
                  )}
                </div>
                <h2 className="font-display text-2xl tracking-tight">{v.title}</h2>
                <p className="text-ink-soft text-sm md:text-base leading-relaxed max-w-2xl">
                  {v.description}
                </p>
              </div>
              {v.status === "ready" ? (
                <Link
                  href={v.slug as `/${string}`}
                  className="font-mono text-sm uppercase tracking-widest text-ink hover:text-terracotta-deep whitespace-nowrap"
                >
                  Open →
                </Link>
              ) : (
                <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  Soon
                </span>
              )}
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
