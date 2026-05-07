"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { site } from "@/config/site";
import { submitWhatsappSignup, type SignupPayload } from "@/lib/whatsapp-signup";

interface VintageSignupProps {
  readonly className?: string;
}

const initialState: SignupPayload = {
  name: "",
  email: "",
  phone: "",
  what_you_do: "",
};

export function VintageSignup({ className }: VintageSignupProps) {
  const [state, setState] = useState<SignupPayload>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const c = site.copy.landing4.signup;
  const sharedToast = site.copy.shared.toast;

  const updateField = <K extends keyof SignupPayload>(key: K, value: SignupPayload[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const result = await submitWhatsappSignup(state);
      if (!result.ok) {
        throw new Error(
          result.error ?? `${sharedToast.requestFailedFallback} (${result.status || "network"})`,
        );
      }
      toast.success(c.toast.success.title, {
        description: c.toast.success.description,
      });
      setState(initialState);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : sharedToast.genericError;
      toast.error(c.toast.error.title, { description: message });
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
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.32em] text-[var(--vintage-crema)]">
            <span className="inline-block h-[2px] w-7 bg-[var(--vintage-brick)]" aria-hidden />
            {c.eyebrow}
          </span>
          <h2 className="font-varsity text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-[var(--vintage-cream)]">
            {c.headlineLine1}
            <br />
            <span className="text-[var(--vintage-brick)] vintage-ink-press">{c.headlineLine2}</span>
          </h2>
          <p className="font-sans text-base md:text-lg leading-relaxed text-[var(--vintage-cream)]/85 max-w-md">
            {c.description}
          </p>
          <ul className="mt-2 flex flex-col gap-2 font-sans text-sm">
            {c.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-[var(--vintage-cream)]/90">
                <span aria-hidden className="text-[var(--vintage-brick)]">{c.bulletStar}</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

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
                {c.formHeader}
              </span>
              <span className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]">
                {c.formClass}
              </span>
            </div>

            <Field
              id="vf-name"
              number="01"
              label={c.fieldLabels.name}
              star={c.fieldStar}
              value={state.name}
              onChange={(v) => updateField("name", v)}
              autoComplete="name"
              placeholder={site.copy.shared.form.name.placeholder}
              required
            />
            <Field
              id="vf-email"
              number="02"
              label={c.fieldLabels.email}
              star={c.fieldStar}
              type="email"
              value={state.email}
              onChange={(v) => updateField("email", v)}
              autoComplete="email"
              placeholder={site.copy.shared.form.email.placeholder}
              required
            />
            <Field
              id="vf-phone"
              number="03"
              label={c.fieldLabels.phone}
              star={c.fieldStar}
              type="tel"
              value={state.phone}
              onChange={(v) => updateField("phone", v)}
              autoComplete="tel"
              placeholder={site.copy.shared.form.phone.placeholder}
              required
            />

            <div className="mt-5">
              <label
                htmlFor="vf-what"
                className="flex items-baseline justify-between mb-2 font-sans text-[0.65rem] font-bold uppercase tracking-[0.32em] text-[var(--vintage-cocoa)]"
              >
                <span>04 · {c.fieldLabels.whatYouDo}</span>
                <span aria-hidden>{c.fieldStar}</span>
              </label>
              <textarea
                id="vf-what"
                rows={3}
                required
                value={state.what_you_do}
                onChange={(e) => updateField("what_you_do", e.target.value)}
                placeholder={site.copy.shared.form.whatYouDo.placeholder}
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
              <span aria-hidden>{c.submitIcon}</span>
              {submitting ? c.submit.busy : c.submit.idle}
            </button>

            <p className="mt-4 font-sans text-[0.7rem] uppercase tracking-[0.22em] text-[var(--vintage-cocoa)]">
              {c.helper}
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
  readonly star: string;
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
  star,
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
        <span aria-hidden>{star}</span>
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
