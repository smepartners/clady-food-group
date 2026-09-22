import type { Metadata } from "next";
import {
  Package,
  ChartLineUp,
  Lightning,
  CheckCircle,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { Section, IconFeature, Pill, CTAButton } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";
import { BRANDS } from "@/lib/brands";
import { PrivateLabelHero } from "@/components/private-label-hero";

export const metadata: Metadata = { title: "Private Label" };

// Same confirmed scale facts as the homepage and About page (see STATS /
// HOME_STATS there) - led with here too, since a procurement contact
// evaluating Clady for a white label programme needs to see this is a
// group with real manufacturing scale before reading about the approach.
const SCALE_STATS = [
  { value: "12+", label: "Years established, since 2014" },
  { value: "3", label: "Manufacturing sites across the UK & Ireland" },
  { value: `${BRANDS.length}`, label: "Specialist brands in the portfolio" },
];

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
      <PrivateLabelHero stats={SCALE_STATS} />

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
