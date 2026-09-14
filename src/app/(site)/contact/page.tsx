import type { Metadata } from "next";
import { Section, Pending } from "@/components/ui";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Section className="pt-20 sm:pt-24">
      <h1 className="max-w-3xl text-4xl font-semibold text-green-700 sm:text-5xl">
        Talk to us
      </h1>
      <div className="mt-6 max-w-xl">
        <Pending>
          No copy exists for this page in the source doc - it's only implied
          by two &ldquo;[LINK]&rdquo; call-outs on the Homepage and Private
          Label page (Build Plan §06, open question 05). Still needed: form
          fields, a destination inbox/CRM, and whether enquiries from
          different markets (Vending, Catering, Retail, Wholesale,
          Manufacturing) should route differently.
        </Pending>
      </div>
    </Section>
  );
}
