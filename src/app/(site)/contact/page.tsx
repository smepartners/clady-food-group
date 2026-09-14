import type { Metadata } from "next";
import { Section, Pending, AccentRule } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Section pad="pt-14 sm:pt-16 pb-20 sm:pb-28">
      <Reveal>
        <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] text-green-700 sm:text-5xl">
          Talk to us
        </h1>
        <AccentRule className="mt-6" />
        <div className="mt-8 max-w-xl">
          <Pending>
            No copy exists for this page in the source doc - it's only implied
            by two &ldquo;[LINK]&rdquo; call-outs on the Homepage and Private
            Label page (Build Plan §06, open question 05). Still needed: form
            fields, a destination inbox/CRM, and whether enquiries from
            different markets (Vending, Catering, Retail, Wholesale,
            Manufacturing) should route differently.
          </Pending>
        </div>
      </Reveal>
    </Section>
  );
}
