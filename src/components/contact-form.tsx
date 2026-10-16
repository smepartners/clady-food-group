"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { gtagEvent } from "@/lib/gtag";

/**
 * The Contact page's enquiry form (src/app/(site)/contact/page.tsx). Posts
 * to /api/contact (src/app/api/contact/route.ts), which sends via Resend to
 * sales@cladyfoodgroup.com, cc'd to hello@thesmepartners.co.uk - replacing
 * the previous `action="mailto:..."` form, which only worked if the
 * visitor's own device had an email client configured.
 *
 * Needs a client component (the mailto version didn't) since submitting now
 * means an async fetch with loading/success/error state, rather than the
 * browser handing off to a mailto: link.
 *
 * GA4 tracking (George, Oct 2026 - "make sure form submissions are tracked
 * as events"): fires on a confirmed successful send (not on every click of
 * Send, which would also count failed/retried attempts) -
 * - `generate_lead`: GA4's own recommended event name for a contact/lead
 *   form, so it's picked up by any "Lead" conversion/goal set up in GA4
 *   without extra configuration.
 * - `form_submit`: a plainer, non-reserved event carrying the same detail,
 *   in case reporting is built around a custom event name instead.
 */
const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      gtagEvent("generate_lead", { form_name: "contact" });
      gtagEvent("form_submit", { form_name: "contact" });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-cream-200 bg-cream-100 p-6 text-center sm:p-8">
        <CheckCircle size={32} weight="fill" className="text-green-700" />
        <p className="font-semibold text-ink">Thanks - your message is on its way.</p>
        <p className="text-sm text-ink-soft">We&apos;ll get back to you as soon as we can.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-cream-200 bg-cream-100 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name} className="text-sm font-medium text-ink">
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              required={f.name === "name" || f.name === "email"}
              disabled={status === "submitting"}
              className="mt-1.5 w-full rounded-lg border border-cream-200 bg-cream-100 px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-green-700 disabled:opacity-60"
            />
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={status === "submitting"}
          className="mt-1.5 w-full resize-none rounded-lg border border-cream-200 bg-cream-100 px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-green-700 disabled:opacity-60"
        />
      </div>

      {status === "error" ? (
        <p className="flex items-start gap-2 text-sm text-ink-soft">
          <WarningCircle size={18} weight="bold" className="mt-0.5 shrink-0 text-gold-700" />
          Something went wrong sending that. Please try again, or email us directly at{" "}
          <a
            href="mailto:sales@cladyfoodgroup.com"
            className="font-medium text-green-700 underline underline-offset-2 hover:text-green-900"
          >
            sales@cladyfoodgroup.com
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-fit items-center justify-center rounded-full bg-green-700 px-6 py-3 text-sm font-medium text-cream-100 shadow-lg shadow-green-700/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-xl hover:shadow-green-700/30 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
