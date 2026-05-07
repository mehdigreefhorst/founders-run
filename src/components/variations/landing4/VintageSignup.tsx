"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface VintageSignupProps {
  readonly className?: string;
}

interface SignupState {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly what_you_do: string;
}

const initialState: SignupState = {
  name: "",
  email: "",
  phone: "",
  what_you_do: "",
};

/**
 * Vintage athletic signup — styled as a race-registration card.
 * Posts to the same /api/apply endpoint used by the other variations.
 */
export function VintageSignup({ className }: VintageSignupProps) {
  const [state, setState] = useState<SignupState>(initialState);
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof SignupState>(key: K, value: SignupState[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (!response.ok) {
        const message = await response.text().catch(() => "");
        throw new Error(message || `Request failed (${response.status})`);
      }
      toast.success("You're on the start line.", {
        description: "WhatsApp invite incoming by email shortly.",
      });
      setState(initialState);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error("Could not register", { description: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="join"
      className={cn(
        "relative bg-[var(--vintage-cocoa-deep)] vintage-paper text-[var(--vintage-cream)]",
        "border-y-[3px] border-[var(--vintage-cocoa-deep)] py-20 md:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left: pitch */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.32em] text-[var(--vintage-crema)]">
            <span className="inline-block h-[2px] w-7 bg-[var(--vintage-brick)]" aria-hidden />
            Race Registration
          </span>
          <h2 className="font-varsity text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-[var(--vintage-cream)]">
            JOIN THE
            <br />
            <span className="text-[var(--vintage-brick)] vintage-ink-press">START LIST.</span>
          </h2>
          <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--vintage-cream)]/85 max-w-md">
            The WhatsApp group is private — keeps it out of scrapers. We&apos;ll
            send the invite by email after a quick check.
          </p>
          <ul className="mt-2 flex flex-col gap-2 font-sans text-sm">
            {[
              "Wednesdays · 07:00 · Stadhuisplein",
              "Bring whoever you'd like to introduce",
              "Coffee after — every time",
            ].map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-[var(--vintage-cream)]/90">
                <span aria-hidden className="text-[var(--vintage-brick)]">★</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form card */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className={cn(
              "rounded-sm bg-[var(--vintage-cream)] text-[var(--vintage-cocoa-deep)]",
              "border-[3px] border-[var(--vintage-cream)] p-6 md:p-8",
              "shadow-[8px_8px_0_0_var(--vintage-brick)] md:shadow-[12px_12px_0_0_var(--vintage-brick)]",
            )}
          >
            <div className="flex items-center justify-between border-b-[2px] border-[var(--vintage-cocoa-deep)]/40 pb-4 mb-6">
              <span className="font-varsity text-lg text-[var(--vintage-brick-deep)]">
                ENTRY FORM
              </span>
              <span className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
                Class · Founder
              </span>
            </div>

            <Field
              id="vf-name"
              number="01"
              label="Full Name"
              value={state.name}
              onChange={(v) => updateField("name", v)}
              autoComplete="name"
              placeholder="Mehdi Greefhorst"
              required
            />
            <Field
              id="vf-email"
              number="02"
              label="Email"
              type="email"
              value={state.email}
              onChange={(v) => updateField("email", v)}
              autoComplete="email"
              placeholder="you@startup.com"
              required
            />
            <Field
              id="vf-phone"
              number="03"
              label="Phone — for the WhatsApp invite"
              type="tel"
              value={state.phone}
              onChange={(v) => updateField("phone", v)}
              autoComplete="tel"
              placeholder="+31 6 ..."
              required
            />

            <div className="mt-5">
              <label
                htmlFor="vf-what"
                className="flex items-baseline justify-between mb-2 font-sans text-[0.65rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]"
              >
                <span>04 · What do you build?</span>
                <span aria-hidden>★</span>
              </label>
              <textarea
                id="vf-what"
                rows={3}
                required
                value={state.what_you_do}
                onChange={(e) => updateField("what_you_do", e.target.value)}
                placeholder="Founder of … building … for …"
                className={cn(
                  "block w-full bg-transparent border-b-[2px] border-[var(--vintage-cocoa-deep)] py-2 px-0",
                  "font-display text-base text-[var(--vintage-cocoa-deep)] placeholder:text-[var(--vintage-cocoa)]/50",
                  "focus:outline-none focus:border-[var(--vintage-brick)]",
                  "resize-none",
                )}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={cn(
                "mt-8 inline-flex items-center justify-center gap-3 w-full md:w-auto rounded-sm px-7 py-3.5",
                "border-[3px] border-[var(--vintage-cocoa-deep)] bg-[var(--vintage-brick)] text-[var(--vintage-cream)]",
                "font-sans text-sm font-bold uppercase tracking-[0.22em]",
                "shadow-[4px_4px_0_0_var(--vintage-cocoa-deep)] transition-all",
                "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_var(--vintage-cocoa-deep)]",
                "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[4px_4px_0_0_var(--vintage-cocoa-deep)]",
              )}
            >
              <span aria-hidden>★</span>
              {submitting ? "REGISTERING…" : "REGISTER ME"}
            </button>

            <p className="mt-4 font-sans text-[0.7rem] uppercase tracking-[0.22em] text-[var(--vintage-cocoa)]">
              Reviewed manually · No spam · Coffee guaranteed
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  readonly id: string;
  readonly number: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (v: string) => void;
  readonly type?: "text" | "email" | "tel";
  readonly autoComplete?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
}

function Field({
  id,
  number,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
  required,
}: FieldProps) {
  return (
    <div className="mt-5 first:mt-0">
      <label
        htmlFor={id}
        className="flex items-baseline justify-between mb-2 font-sans text-[0.65rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]"
      >
        <span>
          {number} · {label}
        </span>
        <span aria-hidden>★</span>
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "block w-full bg-transparent border-b-[2px] border-[var(--vintage-cocoa-deep)] py-2 px-0",
          "font-display text-lg text-[var(--vintage-cocoa-deep)] placeholder:text-[var(--vintage-cocoa)]/50",
          "focus:outline-none focus:border-[var(--vintage-brick)]",
        )}
      />
    </div>
  );
}
