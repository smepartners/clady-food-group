import type { Metadata } from "next";
import { Section, Pending } from "@/components/ui";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <Section className="pt-20 sm:pt-24">
        <h1 className="max-w-3xl text-4xl font-semibold text-green-700 sm:text-5xl">
          A group built around beverage expertise
        </h1>
        <div className="mt-6 max-w-2xl space-y-4 text-ink-soft">
          <p>
            Clady Group is the parent company behind a growing portfolio of
            specialist food and drink businesses, bringing together
            complementary brands, capabilities and expertise.
          </p>
          <p>
            Established in 2014 through Slumberjack, the group has developed
            from its family-business roots into a broader platform serving
            customers across branded and private label markets.
          </p>
          <p>
            Today, our portfolio spans coffee, tea, hot chocolate, functional
            beverages, wellness products, soluble drinks and beverage
            ingredients.
          </p>
          <p>
            Each business has its own identity and area of expertise. Together,
            they give our customers access to a broader range of products,
            capabilities and commercial opportunities.
          </p>
        </div>
      </Section>

      <Section className="bg-cream-200/40">
        <h2 className="text-2xl font-semibold text-green-700">At a glance</h2>
        <div className="mt-6">
          <Pending>
            Stats strip - years established, number of markets served,
            manufacturing locations, certifications, production capabilities,
            annual production volumes, customer sectors and team size (Build
            Plan, open question 01). Renders from the <code>stat</code> Sanity
            schema once populated.
          </Pending>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold text-green-700">
          From family business to group
        </h2>
        <div className="mt-4 max-w-2xl space-y-4 text-ink-soft">
          <p>Our heritage as a family business remains central to how we operate.</p>
          <p>
            From the beginning, our focus has been on building lasting
            relationships and creating products that deliver for our customers.
            As the group has grown, we have retained that approach while
            developing a broader portfolio and greater capability across the
            food and drink sector.
          </p>
          <p>
            Our ambition is to continue growing a group of specialist brands
            that can respond to changing markets while maintaining the
            personal approach and commercial focus that have shaped our
            business from the outset.
          </p>
        </div>
      </Section>

      <Section className="bg-cream-200/40">
        <h2 className="text-2xl font-semibold text-green-700">How we work</h2>
        <div className="mt-4 max-w-2xl space-y-4 text-ink-soft">
          <p>
            We combine the scale and breadth of an ambitious and capable group
            with the responsiveness of a family business.
          </p>
          <p>
            Our customers operate in fast-moving markets, where quality,
            reliability and the ability to respond quickly matter. We take a
            practical, collaborative approach, working closely with customers
            and partners to understand their requirements, identify
            opportunities and deliver solutions that work commercially.
          </p>
          <p>
            We stay close to changing consumer tastes and market trends, while
            maintaining a consistent focus on quality and service.
          </p>
          <p>
            The result is a business that is ambitious enough to grow, but
            agile enough to respond.
          </p>
        </div>
      </Section>
    </>
  );
}
