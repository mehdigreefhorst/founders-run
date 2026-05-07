import { NextResponse } from "next/server";

const FUNCTION_PATH = "/functions/v1/save_whatsapp_group_application";

export async function POST(request: Request): Promise<Response> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    return NextResponse.json(
      { success: false, error: "Server is not configured" },
      { status: 500 },
    );
  }

  const headers = new Headers({
    "Content-Type": "application/json",
    apikey: anonKey,
    Authorization: `Bearer ${anonKey}`,
  });

  // Forward client metadata so the edge function can record it and rate-limit
  // accurately. The service role key NEVER leaves the server.
  const xff = request.headers.get("x-forwarded-for");
  if (xff) headers.set("x-forwarded-for", xff);
  const ua = request.headers.get("user-agent");
  if (ua) headers.set("user-agent", ua);

  const body = await request.text();

  const upstream = await fetch(`${supabaseUrl}${FUNCTION_PATH}`, {
    method: "POST",
    headers,
    body,
  });

  const respBody = await upstream.text();
  return new Response(respBody, {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/json",
    },
  });
}
