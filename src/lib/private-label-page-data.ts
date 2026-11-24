import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PRIVATE_LABEL_PAGE_QUERY, PRODUCE_CATEGORIES_QUERY, STATS_QUERY } from "@/sanity/lib/queries";

export type PillarData = { name: string; body: string; icon: string; tone: "gold" | "green" | "olive" };

// Rebuilt Nov 2026 alongside the schema change that moved every page
// section (including "What we produce", previously fixed, and the
// pillars band, previously a fixed top-level field) into one
// reorderable `sections` array - see the comment on
// schemaTypes/privateLabelPage.ts.
export type MoreThanALogoBandSection = { _key: string; _type: "moreThanALogoBand"; hidden?: boolean; paragraphs?: string[]; image?: string };
export type ProduceBlockSection = { _key: string; _type: "produceBlock"; hidden?: boolean };
export type FlexibleApproachBandSection = { _key: string; _type: "flexibleApproachBand"; hidden?: boolean; body?: string; ctaLabel?: string };
export type PillarsBlockSection = { _key: string; _type: "pillarsBlock"; hidden?: boolean; pillars?: PillarData[] };

export type PrivateLabelSection =
  | MoreThanALogoBandSection
  | ProduceBlockSection
  | FlexibleApproachBandSection
  | PillarsBlockSection;

export type PrivateLabelPageContent = {
  hero: { subtext?: string; image?: string; ctaLabel?: string };
  sections: PrivateLabelSection[];
};

const FALLBACK_PILLARS: PillarData[] = [
  { icon: "Package", tone: "gold", name: "Product expertise", body: "Knowledge across a broad range of beverage categories and formats." },
  { icon: "ChartLineUp", tone: "green", name: "Market awareness", body: "An understanding of changing consumer tastes and emerging beverage trends." },
  { icon: "Lightning", tone: "olive", name: "Flexibility", body: "Solutions developed around different customer requirements, channels and price points." },
  { icon: "CheckCircle", tone: "gold", name: "Consistency", body: "A focus on dependable product quality and reliable customer relationships." },
  { icon: "UsersThree", tone: "green", name: "Collaboration", body: "A partnership approach from initial brief through to finished product." },
];

const FALLBACK: PrivateLabelPageContent = {
  hero: {
    subtext:
      "From concept to finished product, Clady Group provides private label beverage solutions designed around your requirements.",
    image: "/photo-production-packing.jpg",
    ctaLabel: "Talk to us about private label",
  },
  sections: [
    {
      _key: "fallback-more-than-a-logo",
      _type: "moreThanALogoBand",
      paragraphs: [
        "Private label is about creating the right proposition for your customers, your market and your commercial objectives - backed by real manufacturing scale.",
        "Through our portfolio of specialist businesses, we bring together expertise across coffee, hot beverages, soluble drinks, functional products and beverage ingredients, giving customers the flexibility to develop propositions across categories, formats, flavours and price points.",
      ],
      image: "/photo-roastery-row.jpg",
    },
    { _key: "fallback-produce", _type: "produceBlock" },
    {
      _key: "fallback-flexible-approach",
      _type: "flexibleApproachBand",
      body:
        "We work collaboratively with customers to understand the opportunity and develop solutions around their needs. Whether you are looking to launch a new proposition, extend an existing range or source a proven product under your own brand, our capabilities can support you.",
      ctaLabel: "Talk to us about your opportunity",
    },
    { _key: "fallback-pillars", _type: "pillarsBlock", pillars: FALLBACK_PILLARS },
  ],
};

export type StatData = { label: string; value: string; icon?: string };
export type ProduceCategoryData = { name: string; icon: string; photo?: string; seed?: string };

type RawSection = Record<string, unknown> & { _key: string; _type: string };

type SanityPrivateLabelDoc = {
  hero?: { subtext?: string; image?: unknown; ctaLabel?: string };
  sections?: RawSection[];
};

function resolveSection(raw: RawSection): PrivateLabelSection {
  if (raw._type === "moreThanALogoBand") {
    const image = raw.image;
    return {
      ...(raw as unknown as MoreThanALogoBandSection),
      image: image ? urlForImage(image).width(1200).url() : "/photo-roastery-row.jpg",
    };
  }
  return raw as unknown as PrivateLabelSection;
}

export async function getPrivateLabelPageContent(): Promise<PrivateLabelPageContent> {
  try {
    const doc = await client.fetch<SanityPrivateLabelDoc | null>(PRIVATE_LABEL_PAGE_QUERY);
    if (doc?.sections?.length) {
      return {
        hero: {
          ...FALLBACK.hero,
          ...doc.hero,
          image: doc.hero?.image ? urlForImage(doc.hero.image).width(1800).url() : FALLBACK.hero.image,
        },
        sections: doc.sections.map(resolveSection),
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
