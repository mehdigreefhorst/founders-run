This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Important links: 
Instagram: `https://www.instagram.com/foundersrunandcoffee`
TikTok: `https://www.tiktok.com/@foundersrunandcoffee`
Commitify: `https://www.commitify.me`


# Event ideas:

---

## WhatsApp signup edge function

The `/api/apply` route is a thin server-side proxy that forwards JSON to the Supabase Edge Function `save_whatsapp_group_application`. The function validates with Zod, rate-limits by email/IP (10-min window), respects a `website` honeypot, inserts into the private `whatsapp_applications` table via the service role, and posts a Discord embed (best-effort).

### Env vars

Next.js (`.env.local`, server-only — never `NEXT_PUBLIC_`):

```
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<anon-key>
```

Edge function secrets (set via `supabase secrets set`, **not** in source). `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are auto-injected by the platform — only the Discord webhook needs to be set explicitly:

```bash
supabase secrets set DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

For local `supabase functions serve`, put all three in `supabase/functions/.env`:

```
SUPABASE_URL=http://host.docker.internal:54321
SUPABASE_SERVICE_ROLE_KEY=<local-service-role-key>
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

### Local dev

```bash
# One-time, if not yet initialized
supabase init
supabase link --project-ref <project-ref>

# Run the migration locally
supabase db push                                         # against linked remote
# or apply to a local stack
supabase migration up

# Scaffold (already done in this repo, kept for reference)
supabase functions new save_whatsapp_group_application

# Serve locally with the env file above
supabase functions serve save_whatsapp_group_application --env-file supabase/functions/.env --no-verify-jwt
```

### Deploy

```bash
# Push the migration to the remote DB
supabase db push

# Deploy the edge function (publicly callable; auth is enforced inside)
supabase functions deploy save_whatsapp_group_application --no-verify-jwt
```

### Migration file

`supabase/migrations/20260507000000_create_whatsapp_applications.sql` creates the table with RLS enabled, no policies, and revokes Data API access from `anon` / `authenticated`. Only the service role used by the edge function can read/write.

