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

    landing2: {
      header: {
        brandName: "Founders Run",
        issueLine: "Eindhoven · Issue 01",
        navPrefix: { story: "01", events: "02", join: "03" },
        ctaSubscribe: "Subscribe →",
      },
      hero: {
        topStripVolume: "Vol. 01 / Issue 01",
        coverNumber: "01",
        coverEyebrow: "The Cover Story",
        ledeLabel: "Lede —",
        nextRunLabels: {
          day: "Day",
          time: "Time",
          meetingPoint: "Meeting Point",
          distance: "Distance",
          pace: "Pace",
        },
        photoCaption: "Stadhuisplein, 06:58 — boots on, breath visible.",
        photoNumber: "/01",
        photoFooterLeft: "Photograph — Founders Run Eindhoven",
        photoFooterRight: "Frame 01/06",
        marqueePhrase: "Founders Run · Eindhoven · Wednesdays · 07:00 · ",
      },
      story: {
        sectionLabel: "Section 02",
        sectionNumber: "02",
        headlineLead: "Why this exists.",
        headlineFollow: "And why it's 7am.",
        description:
          "A short feature on what San Francisco gets right, what Eindhoven is missing, and why a recurring run beats a one-off event every time.",
        chapterPrefix: "Chapter",
        platePrefix: "Plate",
        figPrefix: "Fig.",
        pullQuoteLead: "Healthy body. Healthy mind.",
        pullQuoteEmphasis: "Great founder.",
        pullQuoteAttribSuffix: "founder",
      },
      events: {
        sectionLabel: "Section 03",
        sectionNumber: "03",
        headlineLead: "The fixture list.",
        headlineFollow: "One weekly anchor. A few specials.",
        description:
          "The Wednesday run is the heartbeat. Once a month or quarter we mix it up — a Sunday walk, a founders × investors run, a longer route with a proper lunch after.",
        joinAction: "Join",
        tagLabels: { weekly: "Recurring", monthly: "Monthly", special: "Quarterly" },
      },
      signup: {
        sectionLabel: "Section 04 · Subscribe",
        sectionNumber: "04",
        headlineLead: "Get on the",
        headlineFollow: "subscriber list.",
        description:
          "The WhatsApp group is private — for people we've actually met or talked to. We'll send the invite by email after a quick check.",
        perks: [
          {
            index: "A",
            title: "Weekly run reminder",
            body: "Every Tuesday night, the meeting point and route in your inbox.",
          },
          {
            index: "B",
            title: "Quarterly investor run",
            body: "First dibs on the founders × investors session — capped at 30.",
          },
          {
            index: "C",
            title: "A small, real community",
            body: "Eindhoven founders who actually keep showing up. Invite-only, run by hand.",
          },
        ],
        colophonPrefix: "Founded September · Eindhoven ·",
        formMastheadLeft: "Form / SUB-01",
        formMastheadRight: "4 fields",
        fieldLabels: {
          name: "Your name",
          email: "Email",
          phone: "Phone — for the WhatsApp invite",
          whatYouDo: "What do you do?",
        },
        submit: { idle: "Submit subscription →", busy: "Submitting…" },
        helper:
          "The WhatsApp group is invite-only. Mehdi reviews each request manually.",
      },
      footer: {
        wordmarkPart1: "Founders",
        wordmarkSeparator: "/",
        wordmarkPart2: "Run",
        wordmarkLocation: "Eindhoven",
        aboutLabel: "About",
        founderArrow: "→",
        sectionsLabel: "Sections",
        socialsLabel: "Off the page",
        issueLabel: "This issue",
        issueRows: [
          { label: "Volume", value: "01" },
          { label: "Issue", value: "01" },
          { label: "City", value: "Eindhoven" },
          { label: "Cadence", value: "Weekly" },
        ],
        colophonSet: "Set in Fraunces & Inter Tight",
        colophonTagline: "Wake early. Run together. Build something.",
        copyrightPrefix: "©",
      },
    },

    landing3: {
      header: {
        domainPrefix: "//",
        statusLabel: "SYS.OK ·",
        ctaShowUp: "SHOW UP",
        ctaArrow: ">",
      },
      hero: {
        fileLabel: "FILE: hero.txt",
        version: "VER 0.7.0 ·",
        statusLabel: "STATUS:",
        statusValue: "ACTIVE",
        timeTag: "[07:00 WED]",
        locationTag: "EINDHOVEN",
        comment: "// every wednesday since september",
        headlineLines: ["WAKE", "EARLY.", "RUN_", "TOGETHER.", "BUILD"],
        cursorChar: "█",
        promptArrow: ">",
        ctaArrowExt: "↗",
        scheduleLabel: "// schedule.log",
        scheduleDay: "WED 07:00",
        asciiTrack: `> 05:50  ALARM
> 06:30  SHOES_ON
> 06:55  STADHUISPLEIN
> 07:00  RUN.START()
> 07:35  COFFEE
> 08:30  FIRST_MEETING`,
        founderLabel: "Founder ·",
        nextRunLabel: "NEXT.RUN",
        nextRunRows: [
          { label: "DAY", source: "weekday" as const },
          { label: "TIME", source: "time" as const },
          { label: "MEET", source: "meetingPoint" as const },
          { label: "DIST", source: "distance" as const },
          { label: "PACE", source: "pace" as const },
        ],
      },
      story: {
        sectionMarker: "§1",
        sectionTitle: "// ORIGIN_STORY",
        sectionMeta: "03 ENTRIES · CHRONOLOGICAL",
        endEntryPrefix: "END.ENTRY[",
        endEntrySuffix: "]",
        beatPromptArrow: ">",
      },
      events: {
        sectionMarker: "§2",
        sectionTitle: "// EVENTS.LOG",
        sectionMetaSuffix: "EVENTS · OPEN_INVITE",
        columnLabels: { id: "ID", cadence: "CADENCE", title: "TITLE / DESCRIPTION", schedule: "SCHEDULE" },
        mobileScheduleLabel: "SCHEDULE",
        beatPromptArrow: ">",
        tagLabels: { weekly: "RECURRING", monthly: "MONTHLY", special: "QUARTERLY" },
      },
      signup: {
        fileLabel: "FILE: signup.form",
        method: "METHOD: POST · supabase.fn",
        statusLabel: "STATUS:",
        statusValue: "OPEN",
        sectionMarker: "§3 / JOIN",
        headlineLines: ["SHOW UP.", "RUN.", "REPEAT."],
        pitchPromptArrow: ">",
        pitch:
          "Drop your details. We send the WhatsApp invite by email after a quick manual review by Mehdi. Real, manual, invite-only.",
        dlLabels: {
          when: "When",
          where: "Where",
          distance: "Distance",
          distanceUnit: "// kilometres",
          pace: "Pace",
        },
        fields: [
          {
            id: "name" as const,
            label: "NAME",
            placeholder: "Mehdi Greefhorst",
            type: "text" as const,
            autoComplete: "name",
            hint: "// full name",
          },
          {
            id: "email" as const,
            label: "EMAIL",
            placeholder: "you@startup.com",
            type: "email" as const,
            autoComplete: "email",
            hint: "// for confirmation",
          },
          {
            id: "phone" as const,
            label: "PHONE",
            placeholder: "+31 6 ...",
            type: "tel" as const,
            autoComplete: "tel",
            hint: "// for whatsapp invite",
          },
          {
            id: "what_you_do" as const,
            label: "WHAT_YOU_DO",
            placeholder: "Founder of … building … for …",
            type: "textarea" as const,
            hint: "// one line is fine",
          },
        ],
        fieldPromptArrow: ">",
        submit: { idle: "SUBMIT_REQUEST", busy: "SUBMITTING..." },
        submitArrow: "↗",
        submitPrefix: ">>",
        helper: "// manual review · invite-only · run by hand",
        toast: {
          success: { title: "ENTRY_ACCEPTED. Welcome aboard.", description: "We'll send the WhatsApp invite by email shortly." },
          error: { title: "REQUEST FAILED" },
        },
      },
      footer: {
        wordmark: "FOUNDERS_RUN",
        wordmarkAccent: ".",
        wordmarkLocation: "EINDHOVEN · NL · WED 07:00",
        founderLabel: "// FOUNDER",
        founderArrow: "↗",
        founderLink: "LINKEDIN",
        channelsLabel: "// CHANNELS",
        socialAscii: { youtube: "[YT]", instagram: "[IG]", tiktok: "[TT]", commitify: "[CM]" },
        socialFallback: "[--]",
        indexLabel: "// INDEX",
        indexLinks: [
          { href: "#story", label: "> 01 STORY" },
          { href: "#events", label: "> 02 EVENTS" },
          { href: "#join", label: "> 03 JOIN" },
        ],
        builtByLead: "BUILT BY",
        builtBySubject: "FOUNDERS",
        builtByConnector: "FOR",
        builtByObject: "FOUNDERS",
        version: "v0.7.0",
        eofLabel: "EOF",
      },
    },

    landing4: {
      header: {
        bibPrefix: "No.",
        bibNumber: "07",
        brandSuffix: "EST. SEPT",
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
            { label: "PACE", source: "pace" as const, uppercase: true },
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
        marquee: { text1: "FOUNDERS RUN CLUB", text2: "EINDHOVEN", text3: "EST. SEPTEMBER", divider: "★" },
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
        wordmarkEyebrow: "Eindhoven · Est. September",
        wordmark: "FOUNDERS · RUN · CLUB",
        wordmarkAria: "Founders Run Club",
        patchesLabel: "Patches · Follow",
        coachLabel: "Coach",
        colophonLabel: "Colophon",
        colophonStamp: { line1: "EST.", line2: "SEPT", line3: "2025" },
        copyrightPrefix: "©",
      },
    },
  },
} as const;

export type SiteConfig = typeof site;
