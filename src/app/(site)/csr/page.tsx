import type { Metadata } from "next";
import { UsersThree, Handshake, Leaf, SunHorizon, CloudCheck } from "@phosphor-icons/react/dist/ssr";
import { Section, ImageFrame, AccentRule, Lede, NumberMark, TextureOverlay } from "@/components/ui";
import { Reveal, RevealStagger } from "@/components/reveal";

export const metadata: Metadata = { title: "CSR" };

const PILLARS = [
  {
    icon: UsersThree,
    tone: "gold" as const,
    name: "Our people",
    body: "Our business is built by people. We want to create an environment where our teams can contribute, develop and take pride in what they do. We value collaboration, respect and accountability, and recognise the importance of strong relationships across our business.",
  },
  {
    icon: Handshake,
    tone: "green" as const,
    name: "Our customers and partners",
    body: "Responsible business starts with doing what we say we will do. We aim to build long-term relationships based on trust, transparency and consistent delivery. We work collaboratively with customers and partners to understand expectations and continually improve the way we operate.",
  },
  {
    icon: Leaf,
    tone: "olive" as const,
    name: "Our products",
    body: "Consumer expectations are changing, and we believe businesses have a responsibility to respond. Across our portfolio, we are exploring opportunities to develop products that reflect changing preferences, including growing interest in wellness, functionality, convenience and evolving taste profiles. We also recognise the importance of responsible sourcing, with a particular focus on ethical and responsible supply chains across key commodities such as coffee.",
  },
];

const TONE_ICON_BG = {
  gold: "bg-gold-500/15 text-gold-700",
  green: "bg-green-700/10 text-green-700",
  olive: "bg-olive-600/10 text-olive-600",
} as const;

// Green credentials confirmed by the client (Zoe, SME Partners). The wider
// list of sustainability initiatives is still being confirmed - these two
// are established facts, not part of that pending roadmap.
const GREEN_CREDENTIALS = [
  {
    icon: CloudCheck,
    name: "Carbon neutral",
    body: "As a company, and across our carbon neutral product range, we measure our emissions through My Emissions and offset them through verified projects on the Ecologi platform.",
  },
  {
    icon: SunHorizon,
    name: "Solar-powered manufacturing",
    body: "Solar panels on the roof of our Belfast factory generate green energy for our manufacturing operations.",
  },
];

export default function CsrPage() {
  return (
    <>
      <Section pad="pt-14 sm:pt-16 pb-12 sm:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h1 className="text-4xl font-semibold leading-[1.05] text-green-700 sm:text-5xl">
              Doing business <em className="italic text-gold-700">responsibly</em>
            </h1>
            <AccentRule className="mt-7" />
            <div className="mt-7 space-y-4">
              <Lede>
                At Clady Group, we believe responsible business is about making
                the right decisions for our people, our customers, our partners
                and the communities in which we operate.
              </Lede>
              <p className="text-ink-soft">
                As our group develops, we are committed to building responsible
                practices into the way we work, from the products we develop and
                the partners we work with to the way we support our people and
                manage our impact.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageFrame
              seed="clady-csr-responsible-sourcing"
              alt="Responsible sourcing at Clady Group"
              src="/photo-csr-sourcing.jpg"
              aspect="aspect-[4/5]"
            />
          </Reveal>
        </div>
      </Section>

      <Section className="bg-cream-200/40">
        <RevealStagger className="divide-y divide-cream-200">
          {PILLARS.map((p, i) => (
            <div key={p.name} className="grid gap-4 py-10 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_2fr] sm:gap-10">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${TONE_ICON_BG[p.tone]}`}>
                  <p.icon size={22} weight="bold" />
                </div>
                <h3 className="font-semibold text-ink">{p.name}</h3>
                <NumberMark index={i + 1} className="ml-auto" />
              </div>
              <p className="text-ink-soft">{p.body}</p>
            </div>
          ))}
        </RevealStagger>
      </Section>

      <Section>
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-semibold text-green-700 sm:text-3xl">
            Our impact
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">
            We recognise that every business has an impact. As Clady Group
            continues to grow, we are focused on understanding where we can
            make the greatest difference and building responsible practices
            into our future development. Our approach is one of continuous
            improvement: setting meaningful priorities, measuring progress and
            taking practical action.
          </p>
          <RevealStagger className="mx-auto mt-10 grid max-w-2xl gap-8 sm:grid-cols-2">
            {GREEN_CREDENTIALS.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700/10 text-green-700">
                  <c.icon size={22} weight="bold" />
                </div>
                <h3 className="font-semibold text-ink">{c.name}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{c.body}</p>
              </div>
            ))}
          </RevealStagger>
        </Reveal>
      </Section>

      <Section className="relative overflow-hidden bg-green-700">
        <TextureOverlay />
        <Reveal className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-cream-100 sm:text-3xl">
              Our responsibility
            </h2>
            <p className="mt-4 text-cream-100/75">
              For us, responsible business is not a standalone initiative. It
              is part of how we operate. Our values of excellence, innovation,
              consistency, agility and collaboration guide the way we work and
              provide the foundation for building a business that is
              successful for the long term.
            </p>
            <p className="mt-8 text-xl italic leading-snug text-gold-500 sm:text-2xl">
              Building better, responsibly.
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
