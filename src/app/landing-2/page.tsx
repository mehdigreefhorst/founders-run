import { EditorialHeader } from "@/components/variations/landing2/EditorialHeader";
import { EditorialHero } from "@/components/variations/landing2/EditorialHero";
import { EditorialStory } from "@/components/variations/landing2/EditorialStory";
import { EditorialEvents } from "@/components/variations/landing2/EditorialEvents";
import { EditorialSignup } from "@/components/variations/landing2/EditorialSignup";
import { EditorialFooter } from "@/components/variations/landing2/EditorialFooter";

/**
 * Landing variation 2 — Editorial / sport magazine.
 *
 * Pure paper white background, ink-black type, electric-orange single accent.
 * Massive Fraunces display headlines, asymmetric editorial grids, magazine
 * pull-quotes, B&W gradient placeholders for photography, ledger-style
 * Next Run strip and a print-style fixture list for events.
 */
export default function LandingTwo() {
  return (
    <main className="flex flex-col bg-editorial-paper">
      <EditorialHeader />
      <EditorialHero />
      <EditorialStory />
      <EditorialEvents />
      <EditorialSignup />
      <EditorialFooter />
    </main>
  );
}
