import type { Metadata } from "next";
import { Section, AccentRule, BrandStrip } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Contact" };

// Field set and destination confirmed with the client (Zoe, SME Partners):
// name, company, phone, email, message, all routing to one inbox with no
// per-market split. hello@cladyfoodgroup.co.uk is not live yet, so the form
// posts as a mailto: for now - swap the <form> action for a proper handler
// (API route + email provider) once the inbox is set up, before launch.
const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
];

export default function ContactPage() {
  return (
    <Section pad="pt-14 sm:pt-16 pb-12 sm:pb-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] text-green-700 sm:text-5xl">
            Talk to <em className="italic text-gold-700">us</em>
          </h1>
          <AccentRule className="mt-7" />
          <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
            Whether you&apos;re exploring a private label opportunity or want
            to know more about one of our brands, we&apos;d like to hear from
            you.
          </p>
          <p className="mt-6 max-w-md text-sm text-ink-soft">
            Prefer email? Reach us directly at{" "}
            <a
              href="mailto:hello@cladyfoodgroup.co.uk"
              className="font-medium text-green-700 underline underline-offset-2 hover:text-green-900"
            >
              hello@cladyfoodgroup.co.uk
            </a>
            .
          </p>
          <BrandStrip className="mt-12 border-t border-cream-200 pt-8" />
        </Reveal>

        <Reveal delay={0.1}>
          <form
            action="mailto:hello@cladyfoodgroup.co.uk"
            method="post"
            encType="text/plain"
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
                    className="mt-1.5 w-full rounded-lg border border-cream-200 bg-cream-100 px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-green-700"
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
                className="mt-1.5 w-full resize-none rounded-lg border border-cream-200 bg-cream-100 px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-green-700"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-fit items-center justify-center rounded-full bg-green-700 px-6 py-3 text-sm font-medium text-cream-100 shadow-lg shadow-green-700/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-xl hover:shadow-green-700/30 active:translate-y-0 active:scale-[0.98]"
            >
              Send message
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
