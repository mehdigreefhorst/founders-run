/**
 * Single source of truth for all copy, links, and structured content.
 * All landing page variations consume from here so swapping copy or
 * a social link only requires editing one file.
 */

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly handle: string;
  readonly url: string;
}

export interface StoryBeat {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
}

export interface EventEntry {
  readonly id: string;
  readonly title: string;
  readonly cadence: string;
  readonly time: string;
  readonly description: string;
  readonly tag: "weekly" | "monthly" | "special";
}

export interface NextRun {
  readonly weekday: string;
  readonly time: string;
  readonly meetingPoint: string;
  readonly distance: string;
  readonly pace: string;
}

export const site = {
  brand: {
    name: "Founders Run",
    location: "Eindhoven",
    domain: "foundersrun.nl",
    tagline: "Wake early. Run together. Build something.",
    shortPitch:
      "Every Wednesday at 07:00, founders in Eindhoven meet to run, talk, and build. Coffee after.",
  },

  hero: {
    eyebrow: "Eindhoven · Every Wednesday · 07:00",
    title: "Wake early.\nRun together.\nBuild something.",
    sub: "A weekly run for founders in Eindhoven. Inspired by the morning runs that bind the founder community in San Francisco — now happening here.",
    primaryCta: { label: "Join the WhatsApp group", anchor: "#join" },
    secondaryCta: { label: "Watch the story", anchor: "#story" },
  },

  // Hero video — the user wants a video on the first page.
  // Drop your file at /public/video/hero.mp4 (and a poster at /public/video/hero-poster.jpg).
  video: {
    src: "/video/hero.mp4",
    poster: "/video/hero-poster.jpg",
    youtubeUrl: "https://www.youtube.com/@foundersrun",
  },

  // Carousel images — drop files into /public/images/run/01.jpg ... 06.jpg
  carousel: [
    { src: "/images/run/01.jpg", alt: "Founders running through Eindhoven at dawn" },
    { src: "/images/run/02.jpg", alt: "The group setting off from the meeting point" },
    { src: "/images/run/03.jpg", alt: "Conversation mid-run" },
    { src: "/images/run/04.jpg", alt: "Coffee after the run" },
    { src: "/images/run/05.jpg", alt: "Mehdi at Founders Run San Francisco, September" },
    { src: "/images/run/06.jpg", alt: "Group photo after the Wednesday run" },
  ],

  story: [
    {
      id: "spark",
      eyebrow: "September",
      title: "It started in San Francisco.",
      body: "I went to a Founders Run there. The same simple idea: show up, run, talk. Inside thirty minutes I had three conversations I'd been chasing for months. The format works because it's quiet, repetitive, and impossible to fake.",
    },
    {
      id: "why-eindhoven",
      eyebrow: "The gap",
      title: "Eindhoven has events. The timing is broken.",
      body: "The best events here happen at 11 on a Tuesday — when nobody can show up. We don't need 100,000 founders around us. We need fifty real ones. The kind you bump into often enough that introductions become trust.",
    },
    {
      id: "why-7am",
      eyebrow: "Wednesdays · 07:00",
      title: "07:00 is the only time that doesn't fight your calendar.",
      body: "Meetings start at 08:30 at the earliest. So 07:00 is free, every week, forever. No rescheduling, no negotiation. Just show up. We've been doing it every Wednesday since September — sometimes two of us, sometimes eleven. It always happens.",
    },
  ] as const satisfies readonly StoryBeat[],

  nextRun: {
    weekday: "Wednesday",
    time: "07:00",
    meetingPoint: "Stadhuisplein, Eindhoven",
    distance: "5 km",
    pace: "Conversational",
  } satisfies NextRun,

  events: [
    {
      id: "weekly",
      title: "The weekly run",
      cadence: "Every Wednesday",
      time: "07:00 · 5 km · conversational pace",
      description:
        "Show up at Stadhuisplein. We run together and grab coffee after. Bring whoever you'd like to introduce.",
      tag: "weekly",
    },
    {
      id: "investor",
      title: "Founders × Investors Run",
      cadence: "Once per quarter",
      time: "Sunday · 10:00 · followed by lunch",
      description:
        "A relaxed Sunday run that pairs founders with investors who actually run. No pitches — just kilometres and conversation.",
      tag: "special",
    },
    {
      id: "walk",
      title: "Founders Walk",
      cadence: "Once per month",
      time: "Sunday · 11:00 · followed by lunch",
      description:
        "Same idea, slower pace. For people who'd rather walk and talk for an hour and meet the rest of the community.",
      tag: "monthly",
    },
  ] as const satisfies readonly EventEntry[],

  socials: [
    {
      id: "youtube",
      label: "YouTube",
      handle: "@foundersrun",
      url: "https://www.youtube.com/@foundersrun",
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "@foundersrun.nl",
      url: "https://www.instagram.com/foundersrun.nl",
    },
    {
      id: "tiktok",
      label: "TikTok",
      handle: "@foundersrun",
      url: "https://www.tiktok.com/@foundersrun",
    },
    {
      id: "commitify",
      label: "Commitify",
      handle: "commitify.me",
      url: "https://commitify.me",
    },
  ] as const satisfies readonly SocialLink[],

  founder: {
    name: "Mehdi Greefhorst",
    role: "Founder of Founders Run Eindhoven",
    note: "Started this in September. Runs every Wednesday since.",
    linkedin: "https://www.linkedin.com/in/mehdigreefhorst",
  },
} as const;

export type SiteConfig = typeof site;
