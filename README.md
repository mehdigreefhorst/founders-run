# Founders Run Eindhoven

Marketing site for [foundersrun.nl](https://foundersrun.nl) — a weekly Wednesday 07:00 run for founders in Eindhoven and any passing through.

Co-founders: **Mehdi Greefhorst** ([Commitify](https://commitify.me)) · **Robin Dohmen** ([OWOW](https://www.owow.io))

---

## What's in here

Four design variations of the same single-page site, each consuming the same content from `src/config/site.ts`. Switching between them at:

| Route | Direction |
|---|---|
| `/landing-1` | **Dawn / atmospheric** — sunrise gradient hero, Fraunces serif, hero video |
| `/landing-2` | **Editorial / sport magazine** — paper white + electric orange, masthead header |
| `/landing-3` | **Brutalist / raw startup** — hard borders, all-mono, signal-green accents |
| `/landing-4` | **Vintage athletic** — built around the Founders Run × Coffee poster, varsity Bungee Inline |
| `/` | Internal index linking to all four |

The point of having four: each variation explores a different aesthetic on top of the same atomic component library, so we can pick a winner without rebuilding content.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with brand tokens defined in `src/app/globals.css`
- **shadcn/ui** primitives (Base UI under the hood, not Radix)
- **Motion** (`motion/react` v12) for fade-in animations
- **Supabase** Edge Function for the private WhatsApp signup
- **Vercel Analytics** + **Google Analytics 4**
- Hosted on **Vercel**

## Single source of truth: `src/config/site.ts`

Every word the user reads is in `site.ts` — including per-variation chrome (eyebrows, button labels, footer columns, ASCII strings, marquees, toast messages). Edit a phrase there → every variation updates. No hardcoded copy in components.

Top-level shape:

```ts
site = {
  brand:    { name, location, domain, tagline, shortPitch, poster }
  hero:     { eyebrow, title, sub, primaryCta, secondaryCta }
  video:    { src, poster, youtubeUrl }
  carousel: [ { src, alt }, … ]
  story:    [ { eyebrow, title, body }, … ]
  nextRun:  { weekday, time, meetingPoint, distance, pace }
  events:   [ { title, cadence, time, description, tag }, … ]
  socials:  [ { id, label, handle, url }, … ]
  founders: [ { name, role, note, linkedin }, … ]
  copy:     { shared, index, landing1, landing2, landing3, landing4 }
}
```

## Project layout

```
src/
  app/
    layout.tsx              ← root layout, fonts, GA, Vercel Analytics
    page.tsx                ← variation index
    landing-{1,2,3,4}/      ← each variation's route
  components/
    atoms/                  ← Wordmark, Eyebrow, SocialIcon, Poster, …
    molecules/              ← SignupForm, HeroCarousel, EventCard, …
    organisms/              ← Hero, StorySection, EventsSection, … (landing-1)
    variations/
      landing2/             ← Editorial-specific organisms
      landing3/             ← Brutalist-specific organisms
      landing4/             ← Vintage-specific organisms
    motion/                 ← Reveal, Stagger
    ui/                     ← shadcn primitives
  config/
    site.ts                 ← all copy + structured content
  lib/
    whatsapp-signup.ts      ← client → Supabase Edge Function call

supabase/
  functions/save_whatsapp_group_application/
                            ← Deno edge function
  migrations/               ← whatsapp_applications table
```

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values from Vercel + Supabase
npm run dev                  # starts on http://localhost:3010
```

> **Heads up on Node version**: `eslint-visitor-keys` warns on Node 23. Node 22 LTS is the cleanest setup. Doesn't break runtime, just an `npm warn EBADENGINE` at install time.

## Environment variables

See `.env.example` for the full list with safety notes. Quick summary:

**Vercel** (Production + Preview): all three are `NEXT_PUBLIC_*`, designed to ship to the client.

| Variable | Source |
|---|---|
| `NEXT_PUBLIC_GA_ID` | analytics.google.com → Data Streams |
| `NEXT_PUBLIC_SUPABASE_URL` | supabase.com → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | supabase.com → Project Settings → API |

**Supabase secrets** (Edge Function only, never `NEXT_PUBLIC_`):

| Variable | Notes |
|---|---|
| `DISCORD_WEBHOOK_URL` | `supabase secrets set DISCORD_WEBHOOK_URL=…` |
| `SUPABASE_URL` | Auto-injected by Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Auto-injected; **never** put in Vercel |

## WhatsApp signup flow

Client → `/api/apply` (Next.js proxy) → `save_whatsapp_group_application` (Supabase Edge) → 1) inserts into private `whatsapp_applications` table via service role, 2) POSTs Discord embed to your channel.

The function does Zod validation, IP+email rate-limiting (10-min window), and a `website` honeypot. The WhatsApp invite link itself is never exposed publicly — Mehdi reviews each request manually.

### Edge function deploy

```bash
# One-time
supabase link --project-ref <project-ref>

# Apply migration
supabase db push

# Set the Discord webhook secret
supabase secrets set DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Deploy the function (auth is enforced inside; --no-verify-jwt)
supabase functions deploy save_whatsapp_group_application --no-verify-jwt
```

### Local edge function serving

Put all three secrets in `supabase/functions/.env` (gitignored), then:

```bash
supabase functions serve save_whatsapp_group_application \
  --env-file supabase/functions/.env --no-verify-jwt
```

### The migration

`supabase/migrations/20260507000000_create_whatsapp_applications.sql` creates the table with RLS enabled, no policies, and revokes Data API access from `anon` / `authenticated`. Only the service role used by the edge function can read/write — the Supabase client lib running in the browser cannot touch this table.

## Brand assets

- **`public/logo-luma-founders-run.jpeg`** — the official illustrated poster used on every Luma event and the WhatsApp group. Featured prominently on `/landing-4`.
- **`public/video/hero.mp4`** — hero video used on `/landing-1`. ~38 MB; consider Vercel Blob or a CDN if this grows.
- **`public/images/run/01.jpg`–`06.jpg`** — placeholder run photo slots (the carousel falls back to gradient placeholders if the files are missing).

## Socials

- Instagram: [@foundersrun.nl](https://www.instagram.com/foundersrun.nl)
- TikTok: [@foundersrun](https://www.tiktok.com/@foundersrun)
- YouTube: [@mymehdimoments](https://www.youtube.com/@mymehdimoments)
- Commitify: [commitify.me](https://commitify.me) — for run reminder calls
- OWOW: [owow.io](https://www.owow.io) — Robin's company
