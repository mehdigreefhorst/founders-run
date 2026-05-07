import { BrutalistHeader } from "@/components/variations/landing3/BrutalistHeader";
import { BrutalistHero } from "@/components/variations/landing3/BrutalistHero";
import { BrutalistStory } from "@/components/variations/landing3/BrutalistStory";
import { BrutalistEvents } from "@/components/variations/landing3/BrutalistEvents";
import { BrutalistSignup } from "@/components/variations/landing3/BrutalistSignup";
import { BrutalistFooter } from "@/components/variations/landing3/BrutalistFooter";

/**
 * Landing variation 3 — Brutalist / raw startup.
 *
 * Paper-white background, hard black borders, JetBrains Mono everywhere,
 * signal-green accent. Inspired by terminal splash screens, Vercel docs,
 * and early-internet zines. Built by founders for founders.
 */
export default function LandingThree() {
  const buildId = `BUILD.${new Date().getFullYear()}.07`;

  return (
    <main className="flex min-h-screen flex-col bg-[var(--paper)] text-[var(--stamp)] font-mono selection:bg-[var(--signal-green)] selection:text-[var(--stamp)]">
      <BrutalistHeader buildId={buildId} />
      <BrutalistHero />
      <BrutalistStory />
      <BrutalistEvents />
      <BrutalistSignup />
      <BrutalistFooter />
    </main>
  );
}
