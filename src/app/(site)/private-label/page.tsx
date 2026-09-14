import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui";

export const metadata: Metadata = { title: "Private Label" };

const PILLARS = [
  { name: "Product expertise", body: "Knowledge across a broad range of beverage categories and formats." },
  { name: "Market awareness", body: "An understanding of changing consumer tastes and emerging beverage trends." },
  { name: "Flexibility", body: "Solutions developed around different customer requirements, channels and price points." },
  { name: "Consistency", body: "A focus on dependable product quality and reliable customer relationships." },
  { name: "Collaboration", body: "A partnership approach from initial brief through to finished product." },
];

const MARKETS = ["Vending", "Catering & foodservice", "Retail", "Wholesale", "Food manufacturing"];

export default function PrivateLabelPage() {
  return (
    <>
      <Section className="pt-20 sm:pt-24">
        <h1 className="max-w-3xl text-4xl font-semibold text-green-700 sm:text-5xl">
          Your brand. Our expertise.
        </h1>
        <div className="mt-6 max-w-2xl space-y-4 text-ink-soft">
          <p>
            From concept to finished product, Clady Group provides private
            label beverage solutions designed around your requirements.
          </p>
          <p>
            Private label is more than putting a logo on a product. It is
            about creating the right proposition for your customers, your
            market and your commercial objectives.
          </p>
          <p>
            Through our portfolio of specialist businesses, we bring together
            expertise across coffee, hot beverages, soluble drinks, functional
            products and beverage ingredients.
          </p>
          <p>
            This gives our customers the flexibility to develop propositions
            across categories, formats, flavours and price points.
          </p>
        </div>
      </Section>

      <Section className="bg-cream-200/40">
        <h2 className="text-2xl font-semibold text-green-700">A flexible approach</h2>
        <div className="mt-4 max-w-2xl space-y-4 text-ink-soft">
          <p>
            We work collaboratively with customers to understand the
            opportunity and develop solutions around their needs.
          </p>
          <p>
            Whether you are looking to launch a new proposition, extend an
            existing range or source a proven product under your own brand,
            our capabilities can support you.
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold text-green-700">From idea to opportunity</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <div key={p.name}>
              <h3 className="font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-cream-200/40">
        <h2 className="text-2xl font-semibold text-green-700">Across multiple markets</h2>
        <p className="mt-4 max-w-2xl text-ink-soft">
          Our private label capabilities support customers across areas including:
        </p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {MARKETS.map((m) => (
            <li
              key={m}
              className="rounded-full border border-olive-600/30 bg-cream-100 px-4 py-1.5 text-sm text-olive-600"
            >
              {m}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-ink-soft">
          From instant coffee and hot chocolate to functional and wellness
          products, we can help create beverage solutions that fit your brand
          and your market.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-md bg-green-700 px-5 py-2.5 text-sm font-medium text-cream-100 hover:bg-green-900"
        >
          Talk to us about your next private label opportunity
        </Link>
      </Section>
    </>
  );
}
