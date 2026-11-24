import { sanityFetch } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { HOME_PAGE_QUERY, VALUE_PILLARS_QUERY } from "@/sanity/lib/queries";
import type { ValuePillarData } from "@/components/values-section";

// Rebuilt Nov 2026 alongside the schema change that moved every page
// section (including the two fixed, non-editable ones) into one
// reorderable `sections` array - see the comment on schemaTypes/homePage.ts.
// `sections` is now an ordered list of typed blocks; the page component
// maps over it and switches on `_type` to decide what to render, so the
// order the client drags them into in the Studio is the order they
// render in on the live site.
export type CapabilityBandSection = { _key: string; _type: "capabilityBand"; hidden?: boolean; heading?: string; paragraphs?: string[] };
export type ManufacturingBandSection = { _key: string; _type: "manufacturingBand"; hidden?: boolean; eyebrow?: string; heading?: string; body?: string; image?: string };
export type BrandCarouselSection = { _key: string; _type: "brandCarouselBlock"; hidden?: boolean };
export type ValuesSection = { _key: string; _type: "valuesBlock"; hidden?: boolean };
export type ClosingBandSection = { _key: string; _type: "closingBand"; hidden?: boolean; heading?: string; body?: string; ctaLabel?: string };

export type HomeSection =
  | CapabilityBandSection
  | ManufacturingBandSection
  | BrandCarouselSection
  | ValuesSection
  | ClosingBandSection;

export type HomePageContent = {
  hero: { eyebrow?: string; heading?: string; subtext?: string; ctaLabel?: string };
  sections: HomeSection[];
};

const FALLBACK: HomePageContent = {
  hero: {
    eyebrow: "Clady Group",
    subtext:
      "A group of specialist food, confectionery and beverage brands and capabilities, delivering quality, choice and flexibility to customers across B2B and B2C markets.",
    ctaLabel: "Explore our brands",
  },
  sections: [
    {
      _key: "fallback-capability-band",
      _type: "capabilityBand",
      heading: "One group. Multiple capabilities.",
      paragraphs: [
        "With manufacturing operations in Buxton and Belfast, Clady Group brings together a broad portfolio of complementary expertise across branded beverages, wellness, soluble drinks and private label manufacturing.",
        "Our scale, capabilities and breadth of experience enable us to support customers at every stage, from established brands and high-volume production to tailored private label solutions and the development of new products from the ground up.",
      ],
    },
    {
      _key: "fallback-manufacturing-band",
      _type: "manufacturingBand",
      eyebrow: "Our capability",
      heading: "Real manufacturing scale, behind every brand.",
      body:
        "From roasting and blending to packing and dispatch, our teams manufacture across two sites in England and Northern Ireland - built to support brands and private label customers at volume.",
      image: "/photo-production-packing.jpg",
    },
    { _key: "fallback-brand-carousel", _type: "brandCarouselBlock" },
    { _key: "fallback-values", _type: "valuesBlock" },
    {
      _key: "fallback-closing-band",
      _type: "closingBand",
      heading: "Built for better partnerships",
      body:
        "From established beverage brands to private label manufacturing, our businesses are designed to make working with us straightforward. We combine market knowledge, product expertise and a flexible approach to help customers respond to changing consumer expectations and commercial opportunities.",
      ctaLabel: "Discover what Clady Group can do for your business",
    },
  ],
};

const FALLBACK_VALUES: ValuePillarData[] = [];

type RawSection = Record<string, unknown> & { _key: string; _type: string };

function resolveSection(raw: RawSection): HomeSection {
  if (raw._type === "manufacturingBand") {
    const image = raw.image;
    return {
      ...(raw as unknown as ManufacturingBandSection),
      image: image ? urlForImage(image).width(1600).url() : "/photo-production-packing.jpg",
    };
  }
  return raw as unknown as HomeSection;
}

type SanityHomePageDoc = {
  hero?: HomePageContent["hero"];
  sections?: RawSection[];
};

export async function getHomePageContent(): Promise<HomePageContent> {
  try {
    const doc = await sanityFetch<SanityHomePageDoc | null>(HOME_PAGE_QUERY);
    if (doc?.sections?.length) {
      return {
        hero: { ...FALLBACK.hero, ...doc.hero },
        sections: doc.sections.map(resolveSection),
      };
    }
  } catch {
    // fall through
  }
  return FALLBACK;
}

export async function getHomeValuePillars(): Promise<ValuePillarData[]> {
  try {
    const docs = await sanityFetch<ValuePillarData[]>(VALUE_PILLARS_QUERY);
    if (docs?.length) return docs;
  } catch {
    // fall through
  }
  return FALLBACK_VALUES;
}
