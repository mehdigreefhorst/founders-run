"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { submitWhatsappSignup, type SignupPayload } from "@/lib/whatsapp-signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

export function SignupForm({ className }: SignupFormProps) {
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
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-5", className)}
      noValidate
    >
      <FormField
        id="name"
        label="Your name"
        required
        value={state.name}
        onChange={(v) => updateField("name", v)}
        placeholder="Mehdi Greefhorst"
        autoComplete="name"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          id="email"
          label="Email"
          type="email"
          required
          value={state.email}
          onChange={(v) => updateField("email", v)}
          placeholder="you@startup.com"
          autoComplete="email"
        />
        <FormField
          id="phone"
          label="Phone (for the WhatsApp invite)"
          type="tel"
          required
          value={state.phone}
          onChange={(v) => updateField("phone", v)}
          placeholder="+31 6 ..."
          autoComplete="tel"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="what" className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ink-soft">
          What do you do?
        </Label>
        <Textarea
          id="what"
          required
          value={state.what_you_do}
          rows={3}
          onChange={(e) => updateField("what_you_do", e.target.value)}
          placeholder="Founder of … building … for …"
          className="bg-card/80 border-border/60 focus-visible:ring-terracotta"
        />
      </div>
      <Button
        type="submit"
        disabled={submitting}
        size="lg"
        className="rounded-full bg-ink text-cream hover:bg-terracotta-deep disabled:opacity-60"
      >
        {submitting ? "Joining…" : "Join the WhatsApp group"}
      </Button>
      <p className="text-xs text-muted-foreground">
        We keep the WhatsApp group out of public reach. Mehdi reviews each request manually.
      </p>
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
