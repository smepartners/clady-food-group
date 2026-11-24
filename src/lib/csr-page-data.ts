import { sanityFetch } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { CSR_PAGE_QUERY, CSR_INITIATIVES_QUERY } from "@/sanity/lib/queries";

export type PillarData = { name: string; body: string; icon: string; tone: "gold" | "green" | "olive" };
export type InitiativeData = { name: string; body: string; icon: string };

// Rebuilt Nov 2026 alongside the schema change that moved every page
// section (including the intro statement and the pillars row, both
// previously fixed top-level fields) into one reorderable `sections`
// array - see the comment on schemaTypes/csrPage.ts.
export type IntroBlockSection = { _key: string; _type: "introBlock"; hidden?: boolean; intro?: string };
export type PillarsBlockSection = { _key: string; _type: "pillarsBlock"; hidden?: boolean; pillars?: PillarData[] };
export type ResponsibilityBandSection = { _key: string; _type: "responsibilityBand"; hidden?: boolean; body?: string; quote?: string };
export type ImpactBandSection = { _key: string; _type: "impactBand"; hidden?: boolean; body?: string };

export type CsrSection = IntroBlockSection | PillarsBlockSection | ResponsibilityBandSection | ImpactBandSection;

export type CsrPageContent = {
  hero: { subtext?: string; image?: string };
  sections: CsrSection[];
};

const FALLBACK_PILLARS: PillarData[] = [
  {
    icon: "UsersThree",
    tone: "gold",
    name: "Our people",
    body: "Our business is built by people. We want to create an environment where our teams can contribute, develop and take pride in what they do. We value collaboration, respect and accountability, and recognise the importance of strong relationships across our business.",
  },
  {
    icon: "Handshake",
    tone: "green",
    name: "Our customers and partners",
    body: "Responsible business starts with doing what we say we will do. We aim to build long-term relationships based on trust, transparency and consistent delivery. We work collaboratively with customers and partners to understand expectations and continually improve the way we operate.",
  },
  {
    icon: "Leaf",
    tone: "olive",
    name: "Our products",
    body: "Consumer expectations are changing, and we believe businesses have a responsibility to respond. Across our portfolio, we are exploring opportunities to develop products that reflect changing preferences, including growing interest in wellness, functionality, convenience and evolving taste profiles. We also recognise the importance of responsible sourcing, with a particular focus on ethical and responsible supply chains across key commodities such as coffee.",
  },
];

const FALLBACK: CsrPageContent = {
  hero: {
    subtext:
      "At Clady Group, we believe responsible business is about making the right decisions for our people, our customers, our partners and the communities in which we operate.",
    image: "/photo-csr-sourcing.jpg",
  },
  sections: [
    {
      _key: "fallback-intro",
      _type: "introBlock",
      intro:
        "As our group develops, we are committed to building responsible practices into the way we work, from the products we develop and the partners we work with to the way we support our people and manage our impact.",
    },
    { _key: "fallback-pillars", _type: "pillarsBlock", pillars: FALLBACK_PILLARS },
    {
      _key: "fallback-responsibility",
      _type: "responsibilityBand",
      body:
        "For us, responsible business is not a standalone initiative. It is part of how we operate. Our values of excellence, innovation, consistency, agility and collaboration guide the way we work and provide the foundation for building a business that is successful for the long term.",
      quote: "Building better, responsibly.",
    },
    {
      _key: "fallback-impact",
      _type: "impactBand",
      body:
        "We recognise that every business has an impact. As Clady Food Group continues to grow, we are focused on understanding where we can make the greatest difference and building responsible practices into our future development. Our approach is one of continuous improvement: setting meaningful priorities, measuring progress and taking practical action.",
    },
  ],
};

type RawSection = Record<string, unknown> & { _key: string; _type: string };

type SanityCsrPageDoc = {
  hero?: { subtext?: string; image?: unknown };
  sections?: RawSection[];
};

export async function getCsrPageContent(): Promise<CsrPageContent> {
  try {
    const doc = await sanityFetch<SanityCsrPageDoc | null>(CSR_PAGE_QUERY);
    if (doc?.sections?.length) {
      return {
        hero: {
          ...FALLBACK.hero,
          ...doc.hero,
          image: doc.hero?.image ? urlForImage(doc.hero.image).width(1800).url() : FALLBACK.hero.image,
        },
        sections: doc.sections as CsrSection[],
      };
    }
  } catch {
    // fall through
  }
  return FALLBACK;
}

export async function getCsrInitiatives(): Promise<InitiativeData[]> {
  try {
    const docs = await sanityFetch<InitiativeData[]>(CSR_INITIATIVES_QUERY);
    if (docs?.length) return docs;
  } catch {
    // fall through
  }
  return [];
}
