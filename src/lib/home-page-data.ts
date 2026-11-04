import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { HOME_PAGE_QUERY, VALUE_PILLARS_QUERY } from "@/sanity/lib/queries";
import type { ValuePillarData } from "@/components/values-section";

export type HomePageContent = {
  hero: { eyebrow?: string; heading?: string; subtext?: string; ctaLabel?: string };
  capabilityBand: { heading?: string; paragraphs?: string[] };
  manufacturingBand: { eyebrow?: string; heading?: string; body?: string; image?: string };
  closingBand: { heading?: string; body?: string; ctaLabel?: string };
};

const FALLBACK: HomePageContent = {
  hero: {
    eyebrow: "Clady Group",
    subtext:
      "A group of specialist food, confectionery and beverage brands and capabilities, delivering quality, choice and flexibility to customers across B2B and B2C markets.",
    ctaLabel: "Explore our brands",
  },
  capabilityBand: {
    heading: "One group. Multiple capabilities.",
    paragraphs: [
      "With manufacturing operations in Buxton and Belfast, Clady Group brings together a broad portfolio of complementary expertise across branded beverages, wellness, soluble drinks and private label manufacturing.",
      "Our scale, capabilities and breadth of experience enable us to support customers at every stage, from established brands and high-volume production to tailored private label solutions and the development of new products from the ground up.",
    ],
  },
  manufacturingBand: {
    eyebrow: "Our capability",
    heading: "Real manufacturing scale, behind every brand.",
    body:
      "From roasting and blending to packing and dispatch, our teams manufacture across two sites in England and Northern Ireland - built to support brands and private label customers at volume.",
    image: "/photo-production-packing.jpg",
  },
  closingBand: {
    heading: "Built for better partnerships",
    body:
      "From established beverage brands to private label manufacturing, our businesses are designed to make working with us straightforward. We combine market knowledge, product expertise and a flexible approach to help customers respond to changing consumer expectations and commercial opportunities.",
    ctaLabel: "Discover what Clady Group can do for your business",
  },
};

const FALLBACK_VALUES: ValuePillarData[] = [];

type SanityHomePageDoc = {
  hero?: HomePageContent["hero"];
  capabilityBand?: HomePageContent["capabilityBand"];
  manufacturingBand?: Omit<HomePageContent["manufacturingBand"], "image"> & { image?: unknown };
  closingBand?: HomePageContent["closingBand"];
};

export async function getHomePageContent(): Promise<HomePageContent> {
  try {
    const doc = await client.fetch<SanityHomePageDoc | null>(HOME_PAGE_QUERY);
    if (doc) {
      return {
        hero: { ...FALLBACK.hero, ...doc.hero },
        capabilityBand: { ...FALLBACK.capabilityBand, ...doc.capabilityBand },
        manufacturingBand: {
          ...FALLBACK.manufacturingBand,
          ...doc.manufacturingBand,
          image: doc.manufacturingBand?.image
            ? urlForImage(doc.manufacturingBand.image).width(1600).url()
            : FALLBACK.manufacturingBand.image,
        },
        closingBand: { ...FALLBACK.closingBand, ...doc.closingBand },
      };
    }
  } catch {
    // fall through
  }
  return FALLBACK;
}

export async function getHomeValuePillars(): Promise<ValuePillarData[]> {
  try {
    const docs = await client.fetch<ValuePillarData[]>(VALUE_PILLARS_QUERY);
    if (docs?.length) return docs;
  } catch {
    // fall through
  }
  return FALLBACK_VALUES;
}
