import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PRIVATE_LABEL_PAGE_QUERY, PRODUCE_CATEGORIES_QUERY, STATS_QUERY } from "@/sanity/lib/queries";

export type PillarData = { name: string; body: string; icon: string; tone: "gold" | "green" | "olive" };

export type PrivateLabelPageContent = {
  hero: { subtext?: string; image?: string; ctaLabel?: string };
  moreThanALogoSection: { paragraphs?: string[]; image?: string };
  flexibleApproachSection: { body?: string; ctaLabel?: string };
  pillars?: PillarData[];
};

const FALLBACK: PrivateLabelPageContent = {
  hero: {
    subtext:
      "From concept to finished product, Clady Group provides private label beverage solutions designed around your requirements.",
    image: "/photo-production-packing.jpg",
    ctaLabel: "Talk to us about private label",
  },
  moreThanALogoSection: {
    paragraphs: [
      "Private label is about creating the right proposition for your customers, your market and your commercial objectives - backed by real manufacturing scale.",
      "Through our portfolio of specialist businesses, we bring together expertise across coffee, hot beverages, soluble drinks, functional products and beverage ingredients, giving customers the flexibility to develop propositions across categories, formats, flavours and price points.",
    ],
    image: "/photo-roastery-row.jpg",
  },
  flexibleApproachSection: {
    body:
      "We work collaboratively with customers to understand the opportunity and develop solutions around their needs. Whether you are looking to launch a new proposition, extend an existing range or source a proven product under your own brand, our capabilities can support you.",
    ctaLabel: "Talk to us about your opportunity",
  },
};

export type StatData = { label: string; value: string; icon?: string };
export type ProduceCategoryData = { name: string; icon: string; photo?: string; seed?: string };

type SanityPrivateLabelDoc = {
  hero?: { subtext?: string; image?: unknown; ctaLabel?: string };
  moreThanALogoSection?: { paragraphs?: string[]; image?: unknown };
  flexibleApproachSection?: PrivateLabelPageContent["flexibleApproachSection"];
  pillars?: PillarData[];
};

export async function getPrivateLabelPageContent(): Promise<PrivateLabelPageContent> {
  try {
    const doc = await client.fetch<SanityPrivateLabelDoc | null>(PRIVATE_LABEL_PAGE_QUERY);
    if (doc) {
      return {
        hero: {
          ...FALLBACK.hero,
          ...doc.hero,
          image: doc.hero?.image ? urlForImage(doc.hero.image).width(1800).url() : FALLBACK.hero.image,
        },
        moreThanALogoSection: {
          ...FALLBACK.moreThanALogoSection,
          ...doc.moreThanALogoSection,
          image: doc.moreThanALogoSection?.image
            ? urlForImage(doc.moreThanALogoSection.image).width(1200).url()
            : FALLBACK.moreThanALogoSection.image,
        },
        flexibleApproachSection: { ...FALLBACK.flexibleApproachSection, ...doc.flexibleApproachSection },
        pillars: doc.pillars?.length ? doc.pillars : undefined,
      };
    }
  } catch {
    // fall through
  }
  return FALLBACK;
}

export async function getProduceCategories(): Promise<ProduceCategoryData[]> {
  try {
    const docs = await client.fetch<
      { name: string; icon: string; photo?: unknown; seed?: string }[]
    >(PRODUCE_CATEGORIES_QUERY);
    if (docs?.length) {
      return docs.map((d) => ({
        name: d.name,
        icon: d.icon,
        photo: d.photo ? urlForImage(d.photo).width(900).url() : undefined,
        seed: d.seed,
      }));
    }
  } catch {
    // fall through
  }
  return [];
}

export async function getScaleStats(): Promise<StatData[]> {
  try {
    const docs = await client.fetch<StatData[]>(STATS_QUERY);
    if (docs?.length) return docs;
  } catch {
    // fall through
  }
  return [];
}
