"use client";

import { Section, AccentRule, BrandGrid, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { useSiteStyle } from "@/components/site-theme";

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
];

/** Contact's hero. Unlike the other heroes the right column is a form, not
 * an image, so it needs its own bold-aware card and input styling rather
 * than reusing ImageFrame - on the dark/textured background the form card
 * switches to a translucent cream panel so its border and inputs stay
 * legible instead of rendering as a light card floating on dark green. */
export function ContactHero() {
  const { style } = useSiteStyle();
  const bold = style === "bold";

  return (
    <Section
      pad="pt-14 sm:pt-16 pb-12 sm:pb-16"
      className={bold ? "relative overflow-hidden bg-green-900" : ""}
    >
      {bold ? <TextureOverlay /> : null}
      <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h1
            className={`max-w-xl text-4xl font-semibold leading-[1.05] sm:text-5xl ${
              bold ? "text-cream-100" : "text-green-700"
            }`}
          >
            Talk to <em className={`italic ${bold ? "text-gold-500" : "text-gold-700"}`}>us</em>
          </h1>
          <AccentRule className="mt-7" />
          <p
            className={`mt-7 max-w-md text-lg leading-relaxed ${
              bold ? "text-cream-100/80" : "text-ink-soft"
            }`}
          >
            Whether you&apos;re exploring a private label opportunity or want
            to know more about one of our brands, we&apos;d like to hear from
            you.
          </p>
          <p className={`mt-6 max-w-md text-sm ${bold ? "text-cream-100/70" : "text-ink-soft"}`}>
            Prefer email? Reach us directly at{" "}
            <a
              href="mailto:hello@cladyfoodgroup.co.uk"
              className={`font-medium underline underline-offset-2 ${
                bold ? "text-gold-500 hover:text-cream-100" : "text-green-700 hover:text-green-900"
              }`}
            >
              hello@cladyfoodgroup.co.uk
            </a>
            .
          </p>
          <BrandGrid
            cols={2}
            className={`mt-12 border-t pt-8 ${bold ? "border-cream-100/15" : "border-cream-200"}`}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <form
            action="mailto:hello@cladyfoodgroup.co.uk"
            method="post"
            encType="text/plain"
            className={`space-y-5 rounded-2xl border p-6 sm:p-8 ${
              bold
                ? "border-cream-100/15 bg-cream-100/10 backdrop-blur-sm"
                : "border-cream-200 bg-cream-100"
            }`}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.name}>
                  <label
                    htmlFor={f.name}
                    className={`text-sm font-medium ${bold ? "text-cream-100" : "text-ink"}`}
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    required={f.name === "name" || f.name === "email"}
                    className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition ${
                      bold
                        ? "border-cream-100/20 bg-cream-100/10 text-cream-100 placeholder:text-cream-100/40 focus:border-gold-500"
                        : "border-cream-200 bg-cream-100 text-ink focus:border-green-700"
                    }`}
                  />
                </div>
              ))}
            </div>
            <div>
              <label
                htmlFor="message"
                className={`text-sm font-medium ${bold ? "text-cream-100" : "text-ink"}`}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className={`mt-1.5 w-full resize-none rounded-lg border px-3.5 py-2.5 text-sm outline-none transition ${
                  bold
                    ? "border-cream-100/20 bg-cream-100/10 text-cream-100 placeholder:text-cream-100/40 focus:border-gold-500"
                    : "border-cream-200 bg-cream-100 text-ink focus:border-green-700"
                }`}
              />
            </div>
            <button
              type="submit"
              className={`inline-flex w-fit items-center justify-center rounded-full px-6 py-3 text-sm font-medium shadow-lg transition duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${
                bold
                  ? "bg-gold-500 text-green-900 shadow-gold-500/20 hover:bg-gold-700 hover:shadow-xl hover:shadow-gold-500/30"
                  : "bg-green-700 text-cream-100 shadow-green-700/20 hover:bg-green-900 hover:shadow-xl hover:shadow-green-700/30"
              }`}
            >
              Send message
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
