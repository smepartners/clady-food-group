import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { CSR_PAGE_QUERY, CSR_INITIATIVES_QUERY } from "@/sanity/lib/queries";

export type PillarData = { name: string; body: string; icon: string; tone: "gold" | "green" | "olive" };
export type InitiativeData = { name: string; body: string; icon: string };

export type CsrPageContent = {
  hero: { subtext?: string; image?: string };
  intro?: string;
  pillars?: PillarData[];
  responsibilitySection: { body?: string; quote?: string };
  impactSection: { body?: string };
};

const FALLBACK: CsrPageContent = {
  hero: {
    subtext:
      "At Clady Group, we believe responsible business is about making the right decisions for our people, our customers, our partners and the communities in which we operate.",
    image: "/photo-csr-sourcing.jpg",
  },
  intro:
    "As our group develops, we are committed to building responsible practices into the way we work, from the products we develop and the partners we work with to the way we support our people and manage our impact.",
  responsibilitySection: {
    body:
      "For us, responsible business is not a standalone initiative. It is part of how we operate. Our values of excellence, innovation, consistency, agility and collaboration guide the way we work and provide the foundation for building a business that is successful for the long term.",
    quote: "Building better, responsibly.",
  },
  impactSection: {
    body:
      "We recognise that every business has an impact. As Clady Food Group continues to grow, we are focused on understanding where we can make the greatest difference and building responsible practices into our future development. Our approach is one of continuous improvement: setting meaningful priorities, measuring progress and taking practical action.",
  },
};

type SanityCsrPageDoc = {
  hero?: { subtext?: string; image?: unknown };
  intro?: string;
  pillars?: PillarData[];
  responsibilitySection?: CsrPageContent["responsibilitySection"];
  impactSection?: CsrPageContent["impactSection"];
};

export async function getCsrPageContent(): Promise<CsrPageContent> {
  try {
    const doc = await client.fetch<SanityCsrPageDoc | null>(CSR_PAGE_QUERY);
    if (doc) {
      return {
        hero: {
          ...FALLBACK.hero,
          ...doc.hero,
          image: doc.hero?.image ? urlForImage(doc.hero.image).width(1800).url() : FALLBACK.hero.image,
        },
        intro: doc.intro ?? FALLBACK.intro,
        pillars: doc.pillars?.length ? doc.pillars : undefined,
        responsibilitySection: { ...FALLBACK.responsibilitySection, ...doc.responsibilitySection },
        impactSection: { ...FALLBACK.impactSection, ...doc.impactSection },
      };
    }
  } catch {
    // fall through
  }
  return FALLBACK;
}

export async function getCsrInitiatives(): Promise<InitiativeData[]> {
  try {
    const docs = await client.fetch<InitiativeData[]>(CSR_INITIATIVES_QUERY);
    if (docs?.length) return docs;
  } catch {
    // fall through
  }
  return [];
}
