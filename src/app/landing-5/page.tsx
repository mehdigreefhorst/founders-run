import { VintageHeader } from "@/components/variations/landing4/VintageHeader";
import { VintageHeroVideo } from "@/components/variations/landing5/VintageHeroVideo";
import { VintageStory } from "@/components/variations/landing4/VintageStory";
import { VintageGallery } from "@/components/variations/landing5/VintageGallery";
import { VintageEvents } from "@/components/variations/landing4/VintageEvents";
import { VintageSignup } from "@/components/variations/landing4/VintageSignup";
import { VintageFooter } from "@/components/variations/landing4/VintageFooter";

/**
 * Landing variation 5 — production candidate.
 *
 * Vintage Athletic palette + typography (reuses 5 of 6 landing-4 sections),
 * with two new pieces: `VintageHeroVideo` swaps the static poster for a
 * Mux-powered loop, and `VintageGallery` adds a date-grouped run scrap-book
 * mixing photos and Mux video clips. Falls back gracefully when Mux
 * playback IDs are not yet configured.
 */
export default function LandingFive() {
  return (
    <main className="flex flex-col overflow-x-clip bg-[var(--vintage-cream)] text-[var(--vintage-cocoa-deep)]">
      <VintageHeader />
      <VintageHeroVideo />
      <VintageStory />
      <VintageGallery />
      <VintageEvents />
      <VintageSignup />
      <VintageFooter />
    </main>
  );
}
