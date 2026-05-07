export interface SignupPayload {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly what_you_do: string;
}

interface SignupResult {
  readonly ok: boolean;
  readonly status: number;
  readonly error?: string;
  readonly fieldErrors?: Record<string, string[]>;
}

const FUNCTION_PATH = "/functions/v1/save_whatsapp_group_application";

export async function submitWhatsappSignup(
  payload: SignupPayload,
): Promise<SignupResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    return {
      ok: false,
      status: 0,
      error: "Signup is not configured (missing NEXT_PUBLIC_SUPABASE_*).",
    };
  }

  const response = await fetch(`${supabaseUrl}${FUNCTION_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify(payload),
  });

  const body: unknown = await response.json().catch(() => null);
  const parsed =
    body && typeof body === "object"
      ? (body as { success?: boolean; error?: string; fieldErrors?: Record<string, string[]> })
      : {};

  return {
    ok: response.ok && parsed.success !== false,
    status: response.status,
    error: parsed.error,
    fieldErrors: parsed.fieldErrors,
  };
}
