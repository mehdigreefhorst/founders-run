"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { toast } from "sonner";
import { submitWhatsappSignup, type SignupPayload } from "@/lib/whatsapp-signup";

interface EditorialSignupProps {
  readonly className?: string;
}

const initialState: SignupPayload = {
  name: "",
  email: "",
  phone: "",
  what_you_do: "",
};

export function EditorialSignup({ className }: EditorialSignupProps) {
  const [state, setState] = useState<SignupPayload>(initialState);
  const [submitting, setSubmitting] = useState(false);

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
          result.error ?? `Request failed (${result.status || "network"})`,
        );
      }
      toast.success("You're on the list. Welcome aboard.", {
        description: "We'll send the WhatsApp invite by email shortly.",
      });
      setState(initialState);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error("Could not submit", { description: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="join"
      className={cn(
        "relative bg-editorial-ink text-editorial-paper py-24 md:py-32",
        className
      )}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 gap-y-12 items-start">
          {/* Left — masthead / pitch */}
          <Reveal direction="up" className="col-span-12 lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-blaze">
                Section 04 · Subscribe
              </span>
              <span className="font-display text-[3rem] md:text-[4.5rem] leading-none tracking-tight text-editorial-blaze font-light">
                04
              </span>
            </div>
            <h2 className="font-display font-medium leading-[0.92] tracking-[-0.025em] text-balance text-[clamp(2.25rem,5.5vw,4.5rem)] text-editorial-paper">
              Get on the{" "}
              <span className="italic font-light">subscriber list.</span>
            </h2>
            <p className="font-sans text-base md:text-lg leading-relaxed text-editorial-paper/70 max-w-md">
              The WhatsApp group is private — keeps it out of scrapers and lets us
              actually know each other. We&apos;ll send the invite by email after a
              quick check.
            </p>
            <ul className="border-t border-editorial-paper/15 divide-y divide-editorial-paper/15">
              <SubscriptionPerk
                index="A"
                title="Weekly run reminder"
                body="Every Tuesday night, the meeting point and route in your inbox."
              />
              <SubscriptionPerk
                index="B"
                title="Quarterly investor run"
                body="First dibs on the founders × investors session — capped at 30."
              />
              <SubscriptionPerk
                index="C"
                title="A small, real community"
                body="Fifty Eindhoven founders, vetted in person. No spam. No scraping."
              />
            </ul>
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-paper/50">
              Founded September · Eindhoven · {site.brand.domain}
            </div>
          </Reveal>

          {/* Right — form card */}
          <Reveal
            direction="up"
            delay={0.15}
            className="col-span-12 lg:col-span-7 lg:col-start-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-editorial-paper text-editorial-ink p-6 md:p-10 lg:p-12 flex flex-col gap-8"
            >
              {/* Form masthead */}
              <div className="flex items-baseline justify-between border-b-2 border-editorial-ink pb-4">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite">
                  Form / SUB-01
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-blaze">
                  4 fields
                </span>
              </div>

              <EditorialField
                id="ed-name"
                index="01"
                label="Your name"
                value={state.name}
                onChange={(v) => updateField("name", v)}
                placeholder="Mehdi Greefhorst"
                autoComplete="name"
                required
              />
              <EditorialField
                id="ed-email"
                index="02"
                label="Email"
                type="email"
                value={state.email}
                onChange={(v) => updateField("email", v)}
                placeholder="you@startup.com"
                autoComplete="email"
                required
              />
              <EditorialField
                id="ed-phone"
                index="03"
                label="Phone — for the WhatsApp invite"
                type="tel"
                value={state.phone}
                onChange={(v) => updateField("phone", v)}
                placeholder="+31 6 ..."
                autoComplete="tel"
                required
              />
              <EditorialField
                id="ed-what"
                index="04"
                label="What do you do?"
                value={state.what_you_do}
                onChange={(v) => updateField("what_you_do", v)}
                placeholder="Founder of … building … for …"
                multiline
                required
              />

              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="rounded-none w-full bg-editorial-ink text-editorial-paper hover:bg-editorial-blaze h-14 font-mono text-[0.72rem] uppercase tracking-[0.28em] disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit subscription →"}
              </Button>

              <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-editorial-graphite leading-relaxed">
                We keep the WhatsApp group out of public reach. Mehdi reviews each
                request manually.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface SubscriptionPerkProps {
  readonly index: string;
  readonly title: string;
  readonly body: string;
}

function SubscriptionPerk({ index, title, body }: SubscriptionPerkProps) {
  return (
    <li className="grid grid-cols-12 gap-4 py-4 items-start">
      <span className="col-span-2 md:col-span-1 font-display text-2xl text-editorial-blaze italic leading-none">
        {index}
      </span>
      <div className="col-span-10 md:col-span-11 flex flex-col gap-1">
        <span className="font-display text-lg md:text-xl text-editorial-paper leading-tight">
          {title}
        </span>
        <span className="font-sans text-sm text-editorial-paper/60 leading-relaxed">
          {body}
        </span>
      </div>
    </li>
  );
}

interface EditorialFieldProps {
  readonly id: string;
  readonly index: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly type?: "text" | "email" | "tel";
  readonly autoComplete?: string;
  readonly required?: boolean;
  readonly multiline?: boolean;
}

function EditorialField({
  id,
  index,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  required,
  multiline,
}: EditorialFieldProps) {
  const sharedClasses = cn(
    "w-full bg-transparent border-0 border-b border-editorial-ink/20 px-0 pb-3 pt-1 font-sans text-base md:text-lg text-editorial-ink",
    "placeholder:text-editorial-graphite/50",
    "focus:outline-none focus:border-editorial-blaze focus:ring-0"
  );

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-baseline gap-2 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-editorial-graphite"
      >
        <span className="text-editorial-blaze">{index}</span>
        <span>{label}</span>
        {required ? <span aria-hidden className="text-editorial-blaze">*</span> : null}
      </label>
      {multiline ? (
        <textarea
          id={id}
          required={required}
          value={value}
          rows={3}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(sharedClasses, "resize-none")}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={sharedClasses}
        />
      )}
    </div>
  );
}
