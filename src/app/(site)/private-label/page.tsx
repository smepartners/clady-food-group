import type { Metadata } from "next";
import {
  Package,
  ChartLineUp,
  Lightning,
  CheckCircle,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { Section, ImageFrame, IconFeature, Pill, CTAButton, AccentRule, Lede } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";

export const metadata: Metadata = { title: "Private Label" };

const PILLARS = [
  { icon: Package, tone: "gold" as const, name: "Product expertise", body: "Knowledge across a broad range of beverage categories and formats." },
  { icon: ChartLineUp, tone: "green" as const, name: "Market awareness", body: "An understanding of changing consumer tastes and emerging beverage trends." },
  { icon: Lightning, tone: "olive" as const, name: "Flexibility", body: "Solutions developed around different customer requirements, channels and price points." },
  { icon: CheckCircle, tone: "gold" as const, name: "Consistency", body: "A focus on dependable product quality and reliable customer relationships." },
  { icon: UsersThree, tone: "green" as const, name: "Collaboration", body: "A partnership approach from initial brief through to finished product." },
];

const MARKETS = ["Vending", "Catering & foodservice", "Retail", "Wholesale", "Food manufacturing"];

export default function PrivateLabelPage() {
  return (
    <>
      <Section pad="pt-14 sm:pt-16 pb-12 sm:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h1 className="text-4xl font-semibold leading-[1.05] text-green-700 sm:text-5xl">
              Your brand. <em className="italic text-gold-700">Our expertise.</em>
            </h1>
            <AccentRule className="mt-7" />
            <div className="mt-7 space-y-4 text-ink-soft">
              <p>
                From concept to finished product, Clady Group provides private
                label beverage solutions designed around your requirements.
              </p>
              <p>
                Private label is more than putting a logo on a product. It is
                about creating the right proposition for your customers, your
                market and your commercial objectives.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageFrame
              seed="clady-private-label-bottling"
              alt="Private label beverage production line"
              src="/photo-private-label-bottling.jpg"
              aspect="aspect-[4/5]"
            />
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="mt-16 max-w-2xl space-y-4 border-t border-cream-200 pt-10">
            <Lede>
              Through our portfolio of specialist businesses, we bring together
              expertise across coffee, hot beverages, soluble drinks, functional
              products and beverage ingredients.
            </Lede>
            <p className="text-ink-soft">
              This gives our customers the flexibility to develop propositions
              across categories, formats, flavours and price points.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-green-700">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-semibold text-cream-100 sm:text-3xl">
            A flexible approach
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-center text-cream-100/75">
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
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">
            From idea to opportunity
          </h2>
        </Reveal>
        <RevealStagger className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {PILLARS.map((p, i) => (
            <IconFeature
              key={p.name}
              icon={<p.icon size={22} weight="bold" />}
              name={p.name}
              body={p.body}
              tone={p.tone}
              index={i + 1}
            />
          ))}
        </RevealStagger>
      </Section>

      <Section className="bg-cream-200/40">
        <Reveal>
          <h2 className="text-2xl font-semibold text-green-700 sm:text-3xl">
            Across multiple markets
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Our private label capabilities support customers across areas including:
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {MARKETS.map((m) => (
              <li key={m}>
                <Pill>{m}</Pill>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-ink-soft">
            From instant coffee and hot chocolate to functional and wellness
            products, we can help create beverage solutions that fit your brand
            and your market.
          </p>
          <div className="mt-6">
            <CTAButton href="/contact">
              Talk to us about your next private label opportunity
            </CTAButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
