import { VintageHeader } from "@/components/variations/landing4/VintageHeader";
import { VintageHero } from "@/components/variations/landing4/VintageHero";
import { VintageStory } from "@/components/variations/landing4/VintageStory";
import { VintageEvents } from "@/components/variations/landing4/VintageEvents";
import { VintageSignup } from "@/components/variations/landing4/VintageSignup";
import { VintageFooter } from "@/components/variations/landing4/VintageFooter";

/**
 * Landing variation 4 — Vintage Athletic Running Poster.
 *
 * Built around the Founders Run × Coffee Luma poster as the full-bleed
 * hero centerpiece. Cream + brick orange + cocoa palette, varsity
 * typography (Bungee Inline), merit-badge event cards, race-bib
 * registration form.
 */
export default function LandingFour() {
  return (
    <main className="flex flex-col bg-[var(--vintage-cream)] text-[var(--vintage-cocoa-deep)]">
      <VintageHeader />
      <VintageHero />
      <VintageStory />
      <VintageEvents />
      <VintageSignup />
      <VintageFooter />
    </main>
  );
}
