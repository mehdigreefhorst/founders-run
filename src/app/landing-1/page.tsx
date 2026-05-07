import { SiteHeader } from "@/components/organisms/SiteHeader";
import { Hero } from "@/components/organisms/Hero";
import { StorySection } from "@/components/organisms/StorySection";
import { EventsSection } from "@/components/organisms/EventsSection";
import { SignupSection } from "@/components/organisms/SignupSection";
import { SiteFooter } from "@/components/organisms/SiteFooter";

/**
 * Landing variation 1 — Dawn / atmospheric (reference build).
 *
 * Sunrise-gradient hero with auto-sliding carousel, Apple-style
 * scroll reveals on the story beats, event cards, and a wrap-up
 * sign-up section against a dawn gradient.
 */
export default function LandingOne() {
  return (
    <main className="flex flex-col">
      <SiteHeader variant="transparent" />
      <Hero media="video" />
      <StorySection />
      <EventsSection />
      <SignupSection />
      <SiteFooter />
    </main>
  );
}
