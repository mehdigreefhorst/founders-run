"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { site } from "@/config/site";
import { submitWhatsappSignup, type SignupPayload } from "@/lib/whatsapp-signup";

const initialState: SignupPayload = {
  name: "",
  email: "",
  phone: "",
  what_you_do: "",
};

export function BrutalistSignup() {
  const [state, setState] = useState<SignupPayload>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const c = site.copy.landing3.signup;
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
    <section id="join" className="relative border-b-2 border-[var(--stamp)] bg-[var(--stamp)] text-[var(--paper)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--paper)]/20 px-6 py-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--paper)]/70 md:px-10">
        <span>{c.fileLabel}</span>
        <span>{c.method}</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[var(--signal-green)] animate-pulse" aria-hidden />
          {c.statusLabel} <span className="text-[var(--signal-green)]">{c.statusValue}</span>
        </span>
      </div>

      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--paper)]/20 px-6 py-12 md:px-10 md:py-16">
          <span className="inline-block border border-[var(--paper)]/40 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--paper)]/80">
            {c.sectionMarker}
          </span>

          <h2 className="mt-6 font-mono text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] tracking-tight">
            {c.headlineLines.slice(0, 2).map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
            <span className="block text-[var(--signal-green)]">{c.headlineLines[2]}</span>
          </h2>

          <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-[var(--paper)]/70">
            <span className="text-[var(--paper)]/40">{c.pitchPromptArrow}</span> {c.pitch}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 font-mono text-xs">
            <div className="flex flex-col gap-1">
              <dt className="uppercase tracking-[0.22em] text-[var(--paper)]/50">{c.dlLabels.when}</dt>
              <dd>{site.nextRun.weekday} · {site.nextRun.time}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="uppercase tracking-[0.22em] text-[var(--paper)]/50">{c.dlLabels.where}</dt>
              <dd>{site.nextRun.meetingPoint}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="uppercase tracking-[0.22em] text-[var(--paper)]/50">{c.dlLabels.distance}</dt>
              <dd>{site.nextRun.distance} <span className="text-[var(--paper)]/40">{c.dlLabels.distanceUnit}</span></dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="uppercase tracking-[0.22em] text-[var(--paper)]/50">{c.dlLabels.pace}</dt>
              <dd>{site.nextRun.pace}</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={handleSubmit} noValidate className="lg:col-span-7 px-6 py-12 md:px-10 md:py-16">
          <div className="flex flex-col gap-7">
            {c.fields.map((field, i) => (
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
                      <span className="text-[var(--signal-green)]">{c.fieldPromptArrow}</span> {field.label}
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
              <span className="font-mono text-[0.7rem] text-[var(--paper)]/30 text-right">{c.submitPrefix}</span>
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center justify-between border-2 border-[var(--signal-green)] bg-[var(--signal-green)] px-6 py-4 font-mono text-sm uppercase tracking-[0.22em] text-[var(--stamp)] transition-colors hover:bg-[var(--paper)] hover:border-[var(--paper)] disabled:opacity-50"
              >
                <span className="flex items-center gap-3">
                  <span aria-hidden>{c.fieldPromptArrow}</span>
                  {submitting ? c.submit.busy : c.submit.idle}
                </span>
                <span aria-hidden className="opacity-60 group-hover:opacity-100">{c.submitArrow}</span>
              </button>
            </div>

            <p className="pl-12 md:pl-14 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--paper)]/40">
              {c.helper}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
