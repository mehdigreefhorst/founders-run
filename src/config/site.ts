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

export interface Founder {
  readonly name: string;
  readonly role: string;
  readonly note: string;
  readonly linkedin: string;
}

/**
 * Aspect ratio expressed as a CSS `aspect-ratio` value (e.g. "4/5", "16/9").
 * Used directly in inline `style={{ aspectRatio }}` so any custom ratio works
 * without needing a corresponding Tailwind class.
 */
export type GalleryAspect = "1/1" | "3/4" | "4/3" | "4/5" | "5/4" | "16/9" | "9/16" | "21/9";

/**
 * One slot in a gallery run. Either a photo (Next/Image) or a Mux clip
 * placeholder. When `kind: "mux"` and `playbackId` is empty, the slot
 * renders a graceful "video coming" tile with the source filename listed
 * in the README upload checklist.
 */
export type GalleryItem =
  | {
      readonly kind: "photo";
      readonly src: string;
      readonly alt: string;
      readonly aspect?: GalleryAspect;
      readonly caption?: string;
    }
  | {
      readonly kind: "mux";
      /** Empty string until uploaded to Mux. README has the checklist. */
      readonly playbackId: string;
      readonly posterAlt: string;
      readonly aspect?: GalleryAspect;
      /** The .mov path under public/Pictures-foundersrun/ to upload to Mux. */
      readonly source: string;
      readonly caption?: string;
    };

/**
 * One run-day's worth of gallery content. Renders as a sub-section inside
 * `VintageGallery` with a race-bib eyebrow + title + grid of items.
 */
export interface GalleryRun {
  readonly id: string;
  readonly badge: string;
  readonly label: string;
  readonly date: string;
  readonly location: string;
  readonly note?: string;
  readonly items: readonly GalleryItem[];
}

export const site = {
  brand: {
    name: "Founders Run",
    location: "Eindhoven",
    domain: "foundersrun.nl",
    tagline: "Wake early. Run together. Build something.",
    shortPitch:
      "Every Wednesday at 07:00, founders in Eindhoven meet to run, talk, and build. Coffee after.",
    /**
     * The official illustrated poster used across every Luma event and the
     * WhatsApp group. Featured prominently on /landing-4 (Vintage Athletic).
     * Replace the file at this path to update the asset everywhere.
     */
    poster: {
      src: "/logo-luma-founders-run.jpeg",
      alt: "Founders Run and Coffee — Eindhoven",
      width: 540,
      height: 810,
    },
  },

  hero: {
    eyebrow: "Eindhoven · Every Wednesday · 07:00",
    title: "Wake early.\nRun together.\nBuild something.",
    sub: "For founders in Eindhoven and any passing through. Build a tight community, care for your body, sharpen your mind. Healthy body, healthy mind, great founder.",
    primaryCta: { label: "Join the WhatsApp group", anchor: "#join" },
    secondaryCta: { label: "Read the story", anchor: "#story" },
  },

  // Hero video — the user wants a video on the first page.
  // Drop your file at /public/video/hero.mp4 (and a poster at /public/video/hero-poster.jpg).
  video: {
    src: "/video/hero.mp4",
    poster: "/video/hero-poster.jpg",
    youtubeUrl: "https://www.youtube.com/@mymehdimoments",
  },

  /**
   * Mux playback for the landing-5 hero. When `playbackId` is empty the
   * hero falls back to the static `Poster` atom (the WhatsApp/Luma poster).
   * Upload your hero loop to Mux and paste the public Playback ID here —
   * see the "Mux upload checklist" section in the README.
   */
  heroMux: {
    playbackId: "",
    /** Seconds into the clip used as the still-frame poster. */
    posterTime: 1.5,
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
      body: "I went to a Founders Run there. The same simple idea: show up, run, talk. Inside thirty minutes I had three conversations I'd been chasing for months. The format works because it's quiet, repetitive, and real.",
    },
    {
      id: "why-eindhoven",
      eyebrow: "The density",
      title: "What San Francisco gets right.",
      body: "In San Francisco, the magic is density — a small group of people who see each other often enough that introductions become trust. That's exactly what we're building in Eindhoven: a tight circle of founders who keep showing up for each other.",
    },
    {
      id: "why-7am",
      eyebrow: "Wednesdays · 07:00",
      title: "07:00 fits every founder's calendar.",
      body: "Meetings start at 08:30 at the earliest. So 07:00 fits, every week, forever. We've been running every Wednesday since September. It always happens.",
    },
  ] as const satisfies readonly StoryBeat[],

  nextRun: {
    weekday: "Wednesday",
    time: "07:00",
    meetingPoint: "Stadhuisplein, Eindhoven",
    distance: "6 km",
    pace: "Conversational",
  } satisfies NextRun,

  events: [
    {
      id: "weekly",
      title: "The weekly run",
      cadence: "Every Wednesday",
      time: "07:00 · 6 km · conversational pace",
      description:
        "Show up at Stadhuisplein. We run together and grab coffee after. Bring whoever you'd like to introduce.",
      tag: "weekly",
    },
    {
      id: "walk",
      title: "Founders Walk",
      cadence: "Once per month",
      time: "Sunday · 11:00 · followed by lunch",
      description:
        "Slower pace. An hour to walk, talk, and meet the rest of the community.",
      tag: "monthly",
    },
    {
      id: "investor",
      title: "Founders × Investors Run",
      cadence: "Once per quarter",
      time: "Sunday · 10:00 · followed by lunch",
      description:
        "A relaxed Sunday run for founders and investors who actually run. Open conversation, kilometres, and lunch after.",
      tag: "special",
    },
  ] as const satisfies readonly EventEntry[],

  /**
   * Date-grouped run gallery — rendered by `VintageGallery` on `/landing-5`.
   * Files live under `public/Pictures-foundersrun/<folder>`. Mux clip slots
   * have empty `playbackId` until the user uploads to Mux (see README).
   * Order is reverse-chronological (newest run on top).
   */
  gallery: [
    {
      id: "ehv-2026-04-29",
      badge: "No. 14",
      label: "Spring stride",
      date: "Wed 29 April 2026",
      location: "Eindhoven",
      items: [
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 29 April 2026/IMG_4521.jpeg", alt: "Founders Run Eindhoven, 29 April 2026", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 29 April 2026/IMG_4522.jpeg", alt: "Founders Run Eindhoven, 29 April 2026", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 29 April 2026/IMG_4523.jpeg", alt: "Founders Run Eindhoven, 29 April 2026", aspect: "3/4" },
      ],
    },
    {
      id: "ehv-2026-04-22",
      badge: "No. 13",
      label: "Five-photo run",
      date: "Wed 22 April 2026",
      location: "Eindhoven",
      items: [
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 22 April 2026/IMG_4468.jpeg", alt: "Founders Run Eindhoven, 22 April 2026", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 22 April 2026/IMG_4472.jpeg", alt: "Founders Run Eindhoven, 22 April 2026", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 22 April 2026/IMG_4473.jpeg", alt: "Founders Run Eindhoven, 22 April 2026", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 22 April 2026/IMG_4474.jpeg", alt: "Founders Run Eindhoven, 22 April 2026", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 22 April 2026/IMG_4475.jpeg", alt: "Founders Run Eindhoven, 22 April 2026", aspect: "3/4" },
      ],
    },
    {
      id: "ehv-2026-04-08",
      badge: "No. 12",
      label: "April morning",
      date: "Wed 8 April 2026",
      location: "Eindhoven",
      items: [
        { kind: "mux", playbackId: "", posterAlt: "8 April 2026 run clip", aspect: "9/16", source: "Eindhoven, 8 April 2026/IMG_4279.mov" },
      ],
    },
    {
      id: "ehv-2026-03-04",
      badge: "No. 11",
      label: "March return",
      date: "Wed 4 March 2026",
      location: "Eindhoven",
      items: [
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 4 March 2026/IMG_4096.jpeg", alt: "Founders Run Eindhoven, 4 March 2026", aspect: "3/4" },
        { kind: "mux", playbackId: "", posterAlt: "4 March 2026 run clip", aspect: "9/16", source: "Eindhoven, 4 March 2026/IMG_4097.mov" },
      ],
    },
    {
      id: "ehv-2026-02-25",
      badge: "No. 10",
      label: "Late winter",
      date: "Wed 25 February 2026",
      location: "Eindhoven",
      items: [
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 25 February 2026/IMG_4073.jpeg", alt: "Founders Run Eindhoven, 25 February 2026", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 25 February 2026/IMG_4074.jpeg", alt: "Founders Run Eindhoven, 25 February 2026", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 25 February 2026/IMG_4075.jpeg", alt: "Founders Run Eindhoven, 25 February 2026", aspect: "3/4" },
      ],
    },
    {
      id: "ehv-2026-01-21",
      badge: "No. 09",
      label: "Mid-winter",
      date: "Wed 21 January 2026",
      location: "Eindhoven",
      items: [
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 21 January 2026/IMG_3806.jpeg", alt: "Founders Run Eindhoven, 21 January 2026", aspect: "3/4" },
      ],
    },
    {
      id: "ehv-2026-01-07",
      badge: "No. 08",
      label: "First run of the year",
      date: "Wed 7 January 2026",
      location: "Eindhoven",
      items: [
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 7 January 2026/IMG_3673.jpeg", alt: "First run of 2026, Eindhoven", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 7 January 2026/IMG_3675.jpeg", alt: "First run of 2026, Eindhoven", aspect: "3/4" },
        { kind: "mux", playbackId: "", posterAlt: "7 January 2026 run clip", aspect: "9/16", source: "Eindhoven, 7 January 2026/IMG_3674.mov" },
      ],
    },
    {
      id: "ehv-2025-12-17",
      badge: "No. 07",
      label: "Pre-Christmas",
      date: "Wed 17 December 2025",
      location: "Eindhoven",
      items: [
        { kind: "mux", playbackId: "", posterAlt: "17 December 2025 run clip", aspect: "9/16", source: "Eindhoven, 17 December 2025/IMG_3480.mov" },
      ],
    },
    {
      id: "ehv-2025-11-26",
      badge: "No. 06",
      label: "Late November",
      date: "Wed 26 November 2025",
      location: "Eindhoven",
      items: [
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 26 November 2025/IMG_3266.jpeg", alt: "Founders Run Eindhoven, 26 November 2025", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 26 November 2025/IMG_3270.jpeg", alt: "Founders Run Eindhoven, 26 November 2025", aspect: "3/4" },
        { kind: "mux", playbackId: "", posterAlt: "26 November 2025 run clip", aspect: "9/16", source: "Eindhoven, 26 November 2025/IMG_3260.mov" },
      ],
    },
    {
      id: "ehv-2025-11-12",
      badge: "No. 05",
      label: "Mid-November",
      date: "Wed 12 November 2025",
      location: "Eindhoven",
      items: [
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 12 November 2025/IMG_3090.jpeg", alt: "Founders Run Eindhoven, 12 November 2025", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 12 November 2025/IMG_3091.jpeg", alt: "Founders Run Eindhoven, 12 November 2025", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Eindhoven, 12 November 2025/IMG_3092.jpeg", alt: "Founders Run Eindhoven, 12 November 2025", aspect: "3/4" },
        { kind: "mux", playbackId: "", posterAlt: "12 November 2025 run clip", aspect: "9/16", source: "Eindhoven, 12 November 2025/IMG_3093.mov" },
      ],
    },
    {
      id: "ehv-2025-10-22",
      badge: "No. 04",
      label: "Late October",
      date: "Wed 22 October 2025",
      location: "Eindhoven",
      items: [
        { kind: "mux", playbackId: "", posterAlt: "22 October 2025 run clip", aspect: "9/16", source: "Eindhoven, 22 October 2025/IMG_2954.mov" },
      ],
    },
    {
      id: "ehv-2025-10-15",
      badge: "No. 03",
      label: "Mid-October",
      date: "Wed 15 October 2025",
      location: "Eindhoven",
      items: [
        { kind: "mux", playbackId: "", posterAlt: "15 October 2025 run clip", aspect: "9/16", source: "Eindhoven, 15 October 2025/IMG_2883.mov" },
      ],
    },
    {
      id: "bas-de-beer",
      badge: "FT.",
      label: "Photos by Bas de Beer",
      date: "Captured spring 2026",
      location: "Eindhoven",
      note: "A small set shot by Bas during one of the morning runs.",
      items: [
        { kind: "photo", src: "/Pictures-foundersrun/Pictures-bas-de-beer/WhatsApp Image 2026-05-08 at 11.53.59.jpeg", alt: "Founders Run morning, photo by Bas de Beer", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Pictures-bas-de-beer/WhatsApp Image 2026-05-08 at 11.53.59 (1).jpeg", alt: "Founders Run morning, photo by Bas de Beer", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Pictures-bas-de-beer/WhatsApp Image 2026-05-08 at 11.53.59 (2).jpeg", alt: "Founders Run morning, photo by Bas de Beer", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Pictures-bas-de-beer/WhatsApp Image 2026-05-08 at 11.54.00.jpeg", alt: "Founders Run morning, photo by Bas de Beer", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/Pictures-bas-de-beer/WhatsApp Image 2026-05-08 at 11.54.01.jpeg", alt: "Founders Run morning, photo by Bas de Beer", aspect: "3/4" },
      ],
    },
    {
      id: "first-edition",
      badge: "VOL. 01",
      label: "First edition",
      date: "Wed 17 September 2025",
      location: "WoensXL · Eindhoven",
      note: "Where it all started.",
      items: [
        { kind: "photo", src: "/Pictures-foundersrun/WoensXL, 17 September 2025/IMG_5045.jpeg", alt: "First Founders Run, WoensXL Eindhoven, 17 September 2025", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/WoensXL, 17 September 2025/IMG_5046.jpeg", alt: "First Founders Run, WoensXL Eindhoven, 17 September 2025", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/WoensXL, 17 September 2025/IMG_5047.jpeg", alt: "First Founders Run, WoensXL Eindhoven, 17 September 2025", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/WoensXL, 17 September 2025/IMG_5049.jpeg", alt: "First Founders Run, WoensXL Eindhoven, 17 September 2025", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/WoensXL, 17 September 2025/IMG_5050.jpeg", alt: "First Founders Run, WoensXL Eindhoven, 17 September 2025", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/WoensXL, 17 September 2025/IMG_5054.jpeg", alt: "First Founders Run, WoensXL Eindhoven, 17 September 2025", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/WoensXL, 17 September 2025/IMG_5055.jpeg", alt: "First Founders Run, WoensXL Eindhoven, 17 September 2025", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/WoensXL, 17 September 2025/IMG_5056.jpeg", alt: "First Founders Run, WoensXL Eindhoven, 17 September 2025", aspect: "3/4" },
        { kind: "photo", src: "/Pictures-foundersrun/16 September 2025/IMG_2679.jpeg", alt: "Day before the first Founders Run, Eindhoven, 16 September 2025", aspect: "3/4" },
        { kind: "mux", playbackId: "", posterAlt: "DJI drone footage of the first run, WoensXL", aspect: "16/9", source: "WoensXL, 17 September 2025/dji_export_20250917_092222_1758093742132_compose_0.mov" },
        { kind: "mux", playbackId: "", posterAlt: "DJI drone footage of the first run", aspect: "16/9", source: "17 September 2025/dji_export_20250917_092508_1758093908990_compose_0.mov" },
        { kind: "mux", playbackId: "", posterAlt: "Founders running group, first edition", aspect: "16/9", source: "WoensXL, 17 September 2025/Founders running group first edition.mov" },
      ],
    },
  ] as const satisfies readonly GalleryRun[],

  socials: [

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
    {
      id: "owow",
      label: "OWOW",
      handle: "owow.io",
      url: "https://www.owow.io",
    },
  ] as const satisfies readonly SocialLink[],

  /**
   * The two founders of Founders Run Eindhoven. Both render side-by-side in
   * footers and credit blocks. The first entry (Mehdi) is the canonical
   * "voice" used for singular attributions like the editorial pull-quote.
   */
  founders: [
    {
      name: "Mehdi Greefhorst",
      role: "Founder Commitify.me",
      note: "Helps people to push themselves and support where needed.",
      linkedin: "https://www.linkedin.com/in/mehdi-greefhorst",
    },
    {
      name: "Robin Dohmen",
      role: "Co-founder OWOW",
      note: "Helps other founders fulfill their dreams.",
      linkedin: "https://www.linkedin.com/in/robindohmen/",
    },
  ] as const satisfies readonly Founder[],

  /**
   * All user-visible copy that doesn't already live elsewhere in this file.
   * Each landing variation pulls its strings from `site.copy.landingN`.
   * Shared strings (nav, toast messages, default form labels) live under
   * `site.copy.shared`.
   *
   * The schema is intentionally flat per-section and slightly verbose so
   * non-technical edits are obvious. Edit any value here and the site updates.
   */
  copy: {
    shared: {
      nav: {
        story: "Story",
        events: "Events",
        join: "Join",
      },
      header: {
        homeAria: "Founders Run home",
        signupCta: "Sign up",
      },
      toast: {
        success: {
          title: "You're on the list. Welcome aboard.",
          description: "We'll send the WhatsApp invite by email shortly.",
        },
        error: {
          title: "Could not submit",
        },
        genericError: "Something went wrong",
        requestFailedFallback: "Request failed",
      },
      form: {
        name: { label: "Your name", placeholder: "Mehdi Greefhorst" },
        email: { label: "Email", placeholder: "you@startup.com" },
        phone: {
          label: "Phone (for the WhatsApp invite)",
          placeholder: "+31 6 ...",
        },
        whatYouDo: {
          label: "What do you do?",
          placeholder: "Founder of … building … for …",
        },
        submit: {
          idle: "Join the WhatsApp group",
          busy: "Joining…",
        },
        helper:
          "The WhatsApp group is invite-only. Mehdi reviews each request manually.",
      },
    },

    index: {
      eyebrow: "Internal — design variations",
      titleLead: "Four takes on",
      titleSubject: "Founders Run Eindhoven",
      description:
        "Pick a variation to preview. Each one consumes the same content from src/config/site.ts and the same atomic component library, so swapping copy is a one-file change.",
      configFilePath: "src/config/site.ts",
      badgeReady: "Ready",
      badgePending: "Pending",
      openLabel: "Open →",
      soonLabel: "Soon",
    },

    landing1: {
      header: {
        signupCta: "Sign up",
      },
      story: {
        eyebrow: "The story",
        headlineLine1: "Why this exists.",
        headlineLine2: "And why it's 7am.",
        description:
          "A short story about what San Francisco gets right, why Eindhoven is ready for the same energy, and what makes a recurring 7am Wednesday work.",
      },
      events: {
        eyebrow: "Events",
        headlineLine1: "One weekly anchor.",
        headlineLine2: "A few special variations.",
        description:
          "The Wednesday run is the heartbeat. Once a month or quarter we mix it up — a Sunday walk, a founders × investors run, a sponsored variant with a proper lunch after.",
      },
      signup: {
        eyebrow: "Join",
        headlineLine1: "Sign up for",
        headlineLine2: "the WhatsApp group.",
        description:
          "The group is private — for people we've actually met or talked to. We'll send you the invite by email after a quick check.",
        followLabel: "Follow along",
        founderCredit: "Built by",
        founderNote: "Started running in September. Every Wednesday since.",
      },
      footer: {
        followLabel: "Follow",
        contactLabel: "Contact",
        copyrightPrefix: "©",
      },
    },

    landing4: {
      header: {
        bibPrefix: "No.",
        bibNumber: "07",
        brandSuffix: "EST. SEPT 2025",
        navItems: [
          { href: "#story" as const, label: "STORY" },
          { href: "#events" as const, label: "EVENTS" },
          { href: "#join" as const, label: "JOIN" },
        ],
        ctaIcon: "★",
        ctaLabel: "SIGN ME UP",
      },
      hero: {
        volume: "VOL. 01",
        headlineLine1: "FOUNDERS",
        headlineLine2: "RUN CLUB",
        headlineSlogan: "and good coffee, every Wednesday",
        ctaPrimaryIcon: "★",
        ctaSecondaryIcon: "↓",
        ctaSecondaryLabel: "READ THE STORY",
        nextRun: {
          eyebrow: "NEXT",
          label: "RUN",
          fields: [
            { label: "DAY", source: "weekday" as const, uppercase: true },
            { label: "TIME", source: "time" as const, uppercase: false },
            { label: "DIST", source: "distance" as const, uppercase: true },
          ],
        },
        posterStamp: "✶ EHV",
        posterCaptionLeft: "OFFICIAL POSTER",
        posterCaptionRight: "VOL. 01",
      },
      story: {
        eyebrow: "The Training Log",
        headlineLine1: "WHY WE",
        headlineLine2: "SHOW UP.",
        description:
          "A short story about what San Francisco gets right, what Eindhoven is missing, and why a 7am Wednesday run beats a one-off event every time.",
        beatBullet: "·",
        closingStamp: { line1: "EVERY", line2: "WED", line3: "07:00", caption: "Since September" },
      },
      events: {
        marquee: { text1: "FOUNDERS RUN CLUB", text2: "EINDHOVEN", text3: "EST. SEPTEMBER 2025", divider: "★" },
        eyebrow: "The Calendar",
        headlineLine1: "ONE WEEKLY ANCHOR.",
        headlineLine2: "A FEW SPECIAL HEATS.",
        description:
          "Wednesday is the heartbeat. Once a month or quarter we host a variation — a Sunday walk, an investors run, a sponsored heat with lunch after.",
        cardNumberPrefix: "No.",
        sealStar: "★",
        tagLabels: { weekly: "WEEKLY", monthly: "MONTHLY", special: "QUARTERLY" },
        ticketLeftPrefix: "BIB ·",
        ticketRight: "FREE TO JOIN",
      },
      signup: {
        eyebrow: "Race Registration",
        headlineLine1: "JOIN THE",
        headlineLine2: "START LIST.",
        description:
          "The WhatsApp group is private. We'll send the invite by email after a quick check.",
        bullets: [
          "Wednesdays · 07:00 · Stadhuisplein",
          "Bring whoever you'd like to introduce",
          "Coffee after — every time",
        ],
        bulletStar: "★",
        formHeader: "ENTRY FORM",
        formClass: "Class · Founder",
        fieldLabels: {
          name: "Full Name",
          email: "Email",
          phone: "Phone — for the WhatsApp invite",
          whatYouDo: "What do you build?",
        },
        fieldStar: "★",
        submit: { idle: "REGISTER ME", busy: "REGISTERING…" },
        submitIcon: "★",
        helper: "Reviewed manually · Invite-only · Coffee guaranteed",
        toast: {
          success: {
            title: "You're on the start line.",
            description: "WhatsApp invite incoming by email shortly.",
          },
          error: { title: "Could not register" },
        },
      },
      footer: {
        wordmarkEyebrow: "Eindhoven · Est. September 2025",
        wordmark: "FOUNDERS · RUN · CLUB",
        wordmarkAria: "Founders Run Club",
        patchesLabel: "Patches · Follow",
        coachLabel: "Coaches",
        colophonLabel: "Colophon",
        colophonStamp: { line1: "EST.", line2: "SEPT", line3: "2025" },
        copyrightPrefix: "©",
      },
    },

    landing5: {
      gallery: {
        eyebrow: "The Film Roll",
        headlineLine1: "EVERY",
        headlineLine2: "WEDNESDAY.",
        description:
          "A scrap-book of every Wednesday morning since September 2025 — phones up, drone overhead, coffee after.",
        runEyebrowPrefix: "RUN",
        clipChip: "▶ FILM",
        clipPlaceholder: "Clip coming soon",
        clipSourcePrefix: "src ·",
        photoChip: "PHOTO",
      },
    },
  },
} as const;

export type SiteConfig = typeof site;
