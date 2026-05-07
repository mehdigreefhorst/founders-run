import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { SocialBar } from "@/components/molecules/SocialBar";
import { SignupForm } from "@/components/molecules/SignupForm";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/card";

interface SignupSectionProps {
  readonly className?: string;
}

export function SignupSection({ className }: SignupSectionProps) {
  return (
    <section
      id="join"
      className={cn(
        "relative bg-dawn isolate overflow-hidden py-24 md:py-32",
        className
      )}
    >
      <div aria-hidden className="absolute inset-0 grain pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal direction="up" className="lg:col-span-5 flex flex-col gap-8">
            <SectionHeading
              eyebrow="Join"
              title={
                <>
                  Sign up for<br />
                  <span className="italic text-cream">the WhatsApp group.</span>
                </>
              }
              description="The group is private — keeps it out of scrapers and lets us actually know each other. We&apos;ll send you the invite by email after a quick check."
              className="text-ink"
            />
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ink/70">
                Follow along
              </span>
              <SocialBar variant="list" />
            </div>
            <p className="text-sm text-ink/70 max-w-md leading-relaxed">
              Built by {site.founder.name}. Started running in September. Every Wednesday since.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.15} className="lg:col-span-7">
            <Card className="p-6 md:p-10 bg-cream/95 backdrop-blur border-border/60 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.35)]">
              <SignupForm />
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
