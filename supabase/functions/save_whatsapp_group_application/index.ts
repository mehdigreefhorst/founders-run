import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const ALLOWED_ORIGINS = new Set([
  "https://foundersrun.nl",
  "http://localhost:3010",
]);

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const payloadSchema = z.object({
  name: z.string().trim().min(1, "name is required").max(120),
  email: z.string().trim().toLowerCase().email("invalid email").max(254),
  phone: z.string().trim().min(5, "phone is too short").max(40),
  what_you_do: z.string().trim().min(2, "tell us what you do").max(500),
  // Honeypot field — never rendered to humans. Real submissions leave it empty.
  website: z.string().optional(),
});

type Payload = z.infer<typeof payloadSchema>;

function corsHeaders(origin: string | null): Record<string, string> {
  const allowOrigin =
    origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://foundersrun.nl";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function jsonResponse(
  body: unknown,
  status: number,
  origin: string | null,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
      ...extraHeaders,
    },
  });
}

function clientIp(req: Request): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (!xff) return null;
  const first = xff.split(",")[0]?.trim();
  if (!first) return null;
  // Only forward to PostgREST if it parses as a plausible IP — guards against
  // header-injected garbage breaking the inet equality filter.
  const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6 = /^[0-9a-f:]+$/i;
  return ipv4.test(first) || ipv6.test(first) ? first : null;
}

function projectRef(supabaseUrl: string): string | null {
  const m = supabaseUrl.match(/^https:\/\/([a-z0-9]+)\.supabase\.(co|in)/i);
  return m ? m[1] : null;
}

async function notifyDiscord(
  webhook: string,
  row: {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    what_you_do: string;
    dashboardUrl: string;
  },
): Promise<void> {
  const embed = {
    title: "New WhatsApp group application",
    url: row.dashboardUrl,
    color: 0xc44b3c,
    timestamp: row.created_at,
    fields: [
      { name: "Name", value: row.name, inline: true },
      { name: "Email", value: row.email, inline: true },
      { name: "Phone", value: row.phone, inline: true },
      { name: "What they do", value: row.what_you_do, inline: false },
    ],
    footer: { text: `id: ${row.id}` },
  };

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ embeds: [embed] }),
  });
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (req.method !== "POST") {
    return jsonResponse(
      { success: false, error: "Method not allowed" },
      405,
      origin,
      { Allow: "POST, OPTIONS" },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return jsonResponse(
      { success: false, error: "Invalid JSON body" },
      400,
      origin,
    );
  }

  const parsed = payloadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "_root";
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return jsonResponse(
      { success: false, error: "Validation failed", fieldErrors },
      400,
      origin,
    );
  }

  const data: Payload = parsed.data;

  // Honeypot: bots will fill the hidden `website` field. Return a clean 200
  // so the bot doesn't learn we filtered them, but skip the insert + notify.
  if (data.website && data.website.trim().length > 0) {
    return jsonResponse({ success: true }, 200, origin);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const discordWebhook = Deno.env.get("DISCORD_WEBHOOK_URL");

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return jsonResponse(
      { success: false, error: "Server not configured" },
      500,
      origin,
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const ip = clientIp(req);
  const userAgent = req.headers.get("user-agent");

  // Rate limit: any insert from the same email or IP inside the trailing
  // 10-minute window blocks the new submission. Cheap thanks to the email
  // index; ip uses inet equality.
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const orFilter = ip
    ? `email.eq.${data.email},ip_address.eq.${ip}`
    : `email.eq.${data.email}`;

  const { count, error: rateErr } = await supabase
    .from("whatsapp_applications")
    .select("id", { count: "exact", head: true })
    .gte("created_at", since)
    .or(orFilter);

  if (rateErr) {
    console.error("Rate-limit check failed", rateErr);
    return jsonResponse(
      { success: false, error: "Internal error" },
      500,
      origin,
    );
  }

  if ((count ?? 0) > 0) {
    return jsonResponse(
      { success: false, error: "Too many requests, try again later" },
      429,
      origin,
      { "Retry-After": "600" },
    );
  }

  const { data: inserted, error: insertErr } = await supabase
    .from("whatsapp_applications")
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      what_you_do: data.what_you_do,
      ip_address: ip,
      user_agent: userAgent,
    })
    .select("id, created_at")
    .single();

  if (insertErr || !inserted) {
    console.error("Insert failed", insertErr);
    return jsonResponse(
      { success: false, error: "Could not save application" },
      500,
      origin,
    );
  }

  if (discordWebhook) {
    const ref = projectRef(supabaseUrl);
    const dashboardUrl = ref
      ? `https://supabase.com/dashboard/project/${ref}/editor`
      : supabaseUrl;
    try {
      await notifyDiscord(discordWebhook, {
        id: inserted.id,
        created_at: inserted.created_at,
        name: data.name,
        email: data.email,
        phone: data.phone,
        what_you_do: data.what_you_do,
        dashboardUrl,
      });
    } catch (err) {
      // Discord must never break the request — applicant is already saved
      // and we can reconcile from the table later.
      console.error("Discord notify failed", err);
    }
  }

  return jsonResponse({ success: true }, 200, origin);
});
