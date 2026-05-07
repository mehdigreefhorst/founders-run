"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { submitWhatsappSignup, type SignupPayload } from "@/lib/whatsapp-signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { site } from "@/config/site";

export type { SignupPayload };

interface SignupFormProps {
  readonly className?: string;
}

const initialState: SignupPayload = {
  name: "",
  email: "",
  phone: "",
  what_you_do: "",
};

/**
 * Sign-up form for the WhatsApp group. Copy comes from
 * `site.copy.shared.form` + `site.copy.shared.toast`.
 */
export function SignupForm({ className }: SignupFormProps) {
  const [state, setState] = useState<SignupPayload>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const c = site.copy.shared;

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
          result.error ?? `${c.toast.requestFailedFallback} (${result.status || "network"})`,
        );
      }

      toast.success(c.toast.success.title, {
        description: c.toast.success.description,
      });
      setState(initialState);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : c.toast.genericError;
      toast.error(c.toast.error.title, { description: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-5", className)}
      noValidate
    >
      <FormField
        id="name"
        label={c.form.name.label}
        required
        value={state.name}
        onChange={(v) => updateField("name", v)}
        placeholder={c.form.name.placeholder}
        autoComplete="name"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id="email"
          label={c.form.email.label}
          type="email"
          required
          value={state.email}
          onChange={(v) => updateField("email", v)}
          placeholder={c.form.email.placeholder}
          autoComplete="email"
        />
        <FormField
          id="phone"
          label={c.form.phone.label}
          type="tel"
          required
          value={state.phone}
          onChange={(v) => updateField("phone", v)}
          placeholder={c.form.phone.placeholder}
          autoComplete="tel"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="what" className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ink-soft">
          {c.form.whatYouDo.label}
        </Label>
        <Textarea
          id="what"
          required
          value={state.what_you_do}
          rows={3}
          onChange={(e) => updateField("what_you_do", e.target.value)}
          placeholder={c.form.whatYouDo.placeholder}
          className="bg-card/80 border-border/60 focus-visible:ring-terracotta"
        />
      </div>
      <Button
        type="submit"
        disabled={submitting}
        size="lg"
        className="rounded-full bg-ink text-cream hover:bg-terracotta-deep disabled:opacity-60"
      >
        {submitting ? c.form.submit.busy : c.form.submit.idle}
      </Button>
      <p className="text-xs text-muted-foreground">{c.form.helper}</p>
    </form>
  );
}

interface FormFieldProps {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly type?: "text" | "email" | "tel";
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly autoComplete?: string;
}

function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  autoComplete,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={id}
        className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ink-soft"
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="bg-card/80 border-border/60 focus-visible:ring-terracotta"
      />
    </div>
  );
}
