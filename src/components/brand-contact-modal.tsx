"use client";

import { useEffect, useId, useState } from "react";
import { EnvelopeSimple, Phone, X } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/contact-form";

/**
 * Nov 2026 (George & Zoe Regroup call - "Adoption of Pop-up Form for Brand
 * Contact": agreed to implement a pop-up form on brand pages instead of
 * listing contact details for each brand): replaces the brand page's old
 * "Get in touch about X" CTA + focus-area pills, which both linked out to
 * /contact?brand=<slug> (brands/[slug]/page.tsx), with a single standalone
 * popup holding the brand's email, phone and the same enquiry form used on
 * the main Contact page (contact-form.tsx, reused as-is) - "keep the
 * website and social links as they are, but change the contact button to
 * a standalone popup that has the email address, the phone number, and a
 * form" per the call.
 *
 * Deliberately one modal shared by both triggers (the CTA button and every
 * focus pill) rather than a separate instance per pill, so there's only
 * ever one dialog in the DOM/open at once. email/phone are resolved
 * server-side in the brand page (brand.contactEmail/contactPhone, falling
 * back to the group's Site settings default) and passed in as plain
 * strings, same precedence the Contact page itself already used for a
 * brand referral.
 */
export function BrandContactSection({
  brandName,
  email,
  phone,
  focusItems,
}: {
  brandName: string;
  email?: string;
  phone?: string;
  focusItems: string[];
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <div className="mt-8">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex w-fit items-center justify-center rounded-full bg-green-700 px-6 py-3 text-sm font-medium text-cream-100 shadow-lg shadow-green-700/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-xl hover:shadow-green-700/30 active:translate-y-0 active:scale-[0.98]"
        >
          Get in touch about {brandName}
        </button>
      </div>

      {/* Round (Sonia, Oct 2026): sits under "Get in touch" rather than
          above the social icons/CTA - unchanged by this round's rebuild,
          still opens the same popup as the main CTA rather than its own
          destination. */}
      <ul className="mt-8 flex flex-wrap gap-2 border-t border-cream-200 pt-6">
        {focusItems.map((f) => (
          <li key={f}>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full border border-olive-600/30 bg-cream-100 px-4 py-1.5 text-sm text-olive-600 transition hover:border-olive-600 hover:bg-olive-600/10"
            >
              {f}
            </button>
          </li>
        ))}
      </ul>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cream-100 p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-cream-200 hover:text-ink"
            >
              <X size={18} weight="bold" />
            </button>
            <h2 id={titleId} className="pr-10 text-xl font-semibold text-green-700">
              Get in touch about {brandName}
            </h2>
            {email || phone ? (
              <div className="mt-4 flex flex-col gap-2 border-b border-cream-200 pb-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="flex w-fit items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900"
                  >
                    <EnvelopeSimple size={16} weight="bold" />
                    {email}
                  </a>
                ) : null}
                {phone ? (
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="flex w-fit items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900"
                  >
                    <Phone size={16} weight="bold" />
                    {phone}
                  </a>
                ) : null}
              </div>
            ) : null}
            <div className="mt-6">
              <ContactForm brand={brandName} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
