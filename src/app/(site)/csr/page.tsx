import type { Metadata } from "next";
import { Section, Pending } from "@/components/ui";

export const metadata: Metadata = { title: "CSR" };

export default function CsrPage() {
  return (
    <>
      <Section className="pt-20 sm:pt-24">
        <h1 className="max-w-3xl text-4xl font-semibold text-green-700 sm:text-5xl">
          Doing business responsibly
        </h1>
        <div className="mt-6 max-w-2xl space-y-4 text-ink-soft">
          <p>
            At Clady Group, we believe responsible business is about making
            the right decisions for our people, our customers, our partners
            and the communities in which we operate.
          </p>
          <p>
            As our group develops, we are committed to building responsible
            practices into the way we work, from the products we develop and
            the partners we work with to the way we support our people and
            manage our impact.
          </p>
        </div>
      </Section>

      <Section className="bg-cream-200/40">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h2 className="font-semibold text-green-700">Our people</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Our business is built by people. We want to create an
              environment where our teams can contribute, develop and take
              pride in what they do. We value collaboration, respect and
              accountability, and recognise the importance of strong
              relationships across our business.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-green-700">Our customers and partners</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Responsible business starts with doing what we say we will do.
              We aim to build long-term relationships based on trust,
              transparency and consistent delivery. We work collaboratively
              with customers and partners to understand expectations and
              continually improve the way we operate.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-green-700">Our products</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Consumer expectations are changing, and we believe businesses
              have a responsibility to respond. Across our portfolio, we are
              exploring opportunities to develop products that reflect
              changing preferences, including growing interest in wellness,
              functionality, convenience and evolving taste profiles. We also
              recognise the importance of responsible sourcing, with a
              particular focus on ethical and responsible supply chains
              across key commodities such as coffee.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold text-green-700">Our impact</h2>
        <p className="mt-4 max-w-2xl text-ink-soft">
          We recognise that every business has an impact. As Clady Group
          continues to grow, we are focused on understanding where we can
          make the greatest difference and building responsible practices
          into our future development. Our approach is one of continuous
          improvement: setting meaningful priorities, measuring progress and
          taking practical action.
        </p>
        <div className="mt-6">
          <Pending>
            Sustainability initiatives - the source copy literally says
            &ldquo;insert sustainability initiatives here&rdquo; (Build Plan
            §06, open question 02). Renders from the{" "}
            <code>csrInitiative</code> Sanity schema once populated.
          </Pending>
        </div>
      </Section>

      <Section className="bg-cream-200/40">
        <h2 className="text-2xl font-semibold text-green-700">Our responsibility</h2>
        <div className="mt-4 max-w-2xl space-y-4 text-ink-soft">
          <p>
            For us, responsible business is not a standalone initiative. It
            is part of how we operate. Our values of excellence, innovation,
            consistency, agility and collaboration guide the way we work and
            provide the foundation for building a business that is
            successful for the long term.
          </p>
          <p className="font-semibold text-green-700">Building better, responsibly.</p>
        </div>
      </Section>
    </>
  );
}
