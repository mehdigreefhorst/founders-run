"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { site } from "@/config/site";

interface SignupPayload {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly whatYouDo: string;
}

const initialState: SignupPayload = {
  name: "",
  email: "",
  phone: "",
  whatYouDo: "",
};

const fields: ReadonlyArray<{
  readonly id: keyof SignupPayload;
  readonly label: string;
  readonly placeholder: string;
  readonly type: "text" | "email" | "tel" | "textarea";
  readonly autoComplete?: string;
  readonly hint: string;
}> = [
  {
    id: "name",
    label: "NAME",
    placeholder: "Mehdi Greefhorst",
    type: "text",
    autoComplete: "name",
    hint: "// full name",
  },
  {
    id: "email",
    label: "EMAIL",
    placeholder: "you@startup.com",
    type: "email",
    autoComplete: "email",
    hint: "// for confirmation",
  },
  {
    id: "phone",
    label: "PHONE",
    placeholder: "+31 6 ...",
    type: "tel",
    autoComplete: "tel",
    hint: "// for whatsapp invite",
  },
  {
    id: "whatYouDo",
    label: "WHAT_YOU_DO",
    placeholder: "Founder of … building … for …",
    type: "textarea",
    hint: "// one line is fine",
  },
];

/**
 * Brutalist signup form — hard borders, mono labels, signal-green submit hover.
 * Posts to /api/apply (same endpoint the existing SignupForm uses).
 */
export function BrutalistSignup() {
  const [state, setState] = useState<SignupPayload>(initialState);
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof SignupPayload>(key: K, value: SignupPayload[K]) =>
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

      toast.success("ENTRY_ACCEPTED. Welcome aboard.", {
        description: "We'll send the WhatsApp invite by email shortly.",
      });
      setState(initialState);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error("REQUEST FAILED", { description: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="join" className="relative border-b-2 border-[var(--stamp)] bg-[var(--stamp)] text-[var(--paper)]">
      {/* Header strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--paper)]/20 px-6 py-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--paper)]/70 md:px-10">
        <span>FILE: signup.form</span>
        <span>METHOD: POST · /api/apply</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[var(--signal-green)] animate-pulse" aria-hidden />
          STATUS: <span className="text-[var(--signal-green)]">OPEN</span>
        </span>
      </div>

      <div className="grid lg:grid-cols-12">
        {/* Left: pitch */}
        <div className="lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--paper)]/20 px-6 py-12 md:px-10 md:py-16">
          <span className="inline-block border border-[var(--paper)]/40 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--paper)]/80">
            §3 / JOIN
          </span>

          <h2 className="mt-6 font-mono text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] tracking-tight">
            <span className="block">SHOW UP.</span>
            <span className="block">RUN.</span>
            <span className="block text-[var(--signal-green)]">REPEAT.</span>
          </h2>

          <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-[var(--paper)]/70">
            <span className="text-[var(--paper)]/40">{`>`}</span> Drop your details.
            We send the WhatsApp invite by email after a quick manual review by Mehdi.
            No spam, no list, no nonsense.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 font-mono text-xs">
            <div className="flex flex-col gap-1">
              <dt className="uppercase tracking-[0.22em] text-[var(--paper)]/50">When</dt>
              <dd>{site.nextRun.weekday} · {site.nextRun.time}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="uppercase tracking-[0.22em] text-[var(--paper)]/50">Where</dt>
              <dd>{site.nextRun.meetingPoint}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="uppercase tracking-[0.22em] text-[var(--paper)]/50">Distance</dt>
              <dd>{site.nextRun.distance} <span className="text-[var(--paper)]/40">// kilometres</span></dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="uppercase tracking-[0.22em] text-[var(--paper)]/50">Pace</dt>
              <dd>{site.nextRun.pace}</dd>
            </div>
          </dl>
        </div>

        {/* Right: form */}
        <form onSubmit={handleSubmit} noValidate className="lg:col-span-7 px-6 py-12 md:px-10 md:py-16">
          <div className="flex flex-col gap-7">
            {fields.map((field, i) => (
              <div key={field.id} className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[3rem_1fr] gap-3 items-start">
                <span className="pt-3 font-mono text-[0.7rem] text-[var(--paper)]/30 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <label
                      htmlFor={field.id}
                      className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--paper)]"
                    >
                      <span className="text-[var(--signal-green)]">{`>`}</span> {field.label}
                    </label>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--paper)]/40">
                      {field.hint}
                    </span>
                  </div>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      required
                      rows={3}
                      value={state[field.id]}
                      onChange={(e) => updateField(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full resize-none border-2 border-[var(--paper)]/40 bg-transparent px-3 py-2 font-mono text-sm text-[var(--paper)] placeholder:text-[var(--paper)]/30 focus:border-[var(--signal-green)] focus:outline-none focus:ring-0"
                    />
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      value={state[field.id]}
                      onChange={(e) => updateField(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      className="w-full border-2 border-[var(--paper)]/40 bg-transparent px-3 py-2 font-mono text-sm text-[var(--paper)] placeholder:text-[var(--paper)]/30 focus:border-[var(--signal-green)] focus:outline-none focus:ring-0"
                    />
                  )}
                </div>
              </div>
            ))}

            <div className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[3rem_1fr] gap-3 items-center pt-2">
              <span className="font-mono text-[0.7rem] text-[var(--paper)]/30 text-right">{`>>`}</span>
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center justify-between border-2 border-[var(--signal-green)] bg-[var(--signal-green)] px-6 py-4 font-mono text-sm uppercase tracking-[0.22em] text-[var(--stamp)] transition-colors hover:bg-[var(--paper)] hover:border-[var(--paper)] disabled:opacity-50"
              >
                <span className="flex items-center gap-3">
                  <span aria-hidden>{`>`}</span>
                  {submitting ? "SUBMITTING..." : "SUBMIT_REQUEST"}
                </span>
                <span aria-hidden className="opacity-60 group-hover:opacity-100">↗</span>
              </button>
            </div>

            <p className="pl-12 md:pl-14 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--paper)]/40">
              // manual review · no list rental · no spam · ever
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
