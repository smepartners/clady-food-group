import { sanityFetch } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { WHITE_LABEL_COFFEE_PAGE_QUERY } from "@/sanity/lib/queries";

export type SectorData = { name: string; body: string; icon: string; tone: "gold" | "green" | "olive" };
export type StepData = { title: string; body: string };
export type InnovationCardData = { title: string; body: string };

// Rebuilt Nov 2026 alongside the schema change that moved every page
// section (including the group-scale stats band, previously fixed) into
// one reorderable `sections` array - see the comment on
// schemaTypes/whiteLabelCoffeePage.ts.
export type IntroBlockSection = { _key: string; _type: "introBlock"; hidden?: boolean; paragraphs?: string[]; image?: string };
export type SectorsBlockSection = { _key: string; _type: "sectorsBlock"; hidden?: boolean; heading?: string; sectors?: SectorData[] };
export type OfferBlockSection = { _key: string; _type: "offerBlock"; hidden?: boolean; heading?: string; bullets?: string[]; image?: string };
export type HowItWorksBlockSection = { _key: string; _type: "howItWorksBlock"; hidden?: boolean; heading?: string; intro?: string; steps?: StepData[] };
export type ScaleStatsBlockSection = { _key: string; _type: "scaleStatsBlock"; hidden?: boolean };
export type InnovationBlockSection = { _key: string; _type: "innovationBlock"; hidden?: boolean; heading?: string; cards?: InnovationCardData[] };
export type FormatsBlockSection = { _key: string; _type: "formatsBlock"; hidden?: boolean; heading?: string; formats?: string[]; note?: string };
export type CrossSellBlockSection = { _key: string; _type: "crossSellBlock"; hidden?: boolean; heading?: string; body?: string; linkLabel?: string; href?: string };
export type ClosingCtaBlockSection = { _key: string; _type: "closingCtaBlock"; hidden?: boolean; heading?: string; body?: string; ctaLabel?: string };

export type WhiteLabelCoffeeSection =
  | IntroBlockSection
  | SectorsBlockSection
  | OfferBlockSection
  | HowItWorksBlockSection
  | ScaleStatsBlockSection
  | InnovationBlockSection
  | FormatsBlockSection
  | CrossSellBlockSection
  | ClosingCtaBlockSection;

export type WhiteLabelCoffeePageContent = {
  hero: { subtext?: string; image?: string; ctaLabel?: string };
  sections: WhiteLabelCoffeeSection[];
};

// Fallback copy drawn from the client's "White label copy" brief
// (Nov 2026) - carried over verbatim from the wireframe reviewed with
// George, used only if Sanity is unreachable/empty.
const FALLBACK: WhiteLabelCoffeePageContent = {
  hero: {
    subtext:
      "From a proven blend to something entirely your own, our roastery handles every stage so you can put a product on shelf or behind the counter that carries your name.",
    image: "/photo-roastery-floor.jpg",
    ctaLabel: "Talk to us about white label coffee",
  },
  sections: [
    {
      _key: "fallback-intro",
      _type: "introBlock",
      paragraphs: [
        "We source, roast, blend and pack coffee to your specification, so you can put a product on shelf or behind the counter that carries your name and tastes the way you want it to.",
        "Built on more than a decade of roasting for our own brands such as Slumberjack, and across hundreds of partner brands, our coffee team handles every stage — from green bean selection to the finished, sealed pack.",
        "Choose a proven blend from our existing range for a fast, cost-effective launch, or work with us to build something entirely your own.",
      ],
      image: "/photo-produce-coffee.jpg",
    },
    {
      _key: "fallback-sectors",
      _type: "sectorsBlock",
      heading: "If your customers drink coffee, we can make it for you",
      sectors: [
        { name: "Retailers & grocers", body: "Own-label range across price tiers", icon: "Storefront", tone: "gold" },
        { name: "Cafés & hospitality", body: "A signature house blend", icon: "Coffee", tone: "green" },
        { name: "Food service & caterers", body: "Consistent bulk supply", icon: "ForkKnife", tone: "olive" },
        { name: "Start-ups & challengers", body: "Launching a first coffee product", icon: "Rocket", tone: "gold" },
        { name: "Gift & subscription brands", body: "Quality product, no roastery needed", icon: "Gift", tone: "green" },
      ],
    },
    {
      _key: "fallback-offer",
      _type: "offerBlock",
      heading: "What we can offer",
      bullets: [
        "Whole bean, ground and instant coffee",
        "Roasted fresh to order, packed to suit your channel",
        "Single origins, signature blends, decaf, flavoured",
        "Fairtrade & Rainforest Alliance certified options",
        "Roast profiles light to dark",
        "Grinds for espresso, filter, cafetiere and more",
      ],
      image: "/photo-roastery-detail.jpg",
    },
    {
      _key: "fallback-how-it-works",
      _type: "howItWorksBlock",
      heading: "How it works",
      intro: "From first conversation to pallets on your dock — five steps, start to finish.",
      steps: [
        { title: "Your brief", body: "Customers, channels, volumes, taste, price, packaging" },
        { title: "Blend development", body: "Sample roasts built to match your brief" },
        { title: "Sampling", body: "You taste and feed back; we refine" },
        { title: "Commercials", body: "Volumes, formats, pricing, lead times" },
        { title: "Production & delivery", body: "Roasted, packed, dispatched on time, in full" },
      ],
    },
    { _key: "fallback-scale-stats", _type: "scaleStatsBlock" },
    {
      _key: "fallback-innovation",
      _type: "innovationBlock",
      heading: "New flavours, consistent taste",
      cards: [
        {
          title: "Creating new & on-trend flavours",
          body: "Seasonal & limited editions, dessert flavours, better-for-you options, functional & wellness drinks, iced & cold serve, flavoured matcha.",
        },
        {
          title: "Matching your existing flavour profile",
          body: "We match taste, colour, aroma and mouthfeel of your current product, lock it in as a fixed spec, and check it batch by batch.",
        },
      ],
    },
    {
      _key: "fallback-formats",
      _type: "formatsBlock",
      heading: "The right pack for every channel",
      formats: [
        "Pouches",
        "Cans & tins",
        "Tubes",
        "Boxes & cartons",
        "Single-portion sticks & sachets",
        "Consumer sizes",
        "Catering sizes",
      ],
      note: "Not sure which format is right? We'll recommend options based on channel, shelf life, price point and sustainability goals.",
    },
    {
      _key: "fallback-cross-sell",
      _type: "crossSellBlock",
      heading: "We also make white label powdered drinks",
      body: "Hot chocolate, instant coffee mixes, toppings and functional blends, through Dutch Maid, Innainstant and Evolving State.",
      linkLabel: "See powdered drinks",
      href: "/private-label",
    },
    {
      _key: "fallback-closing-cta",
      _type: "closingCtaBlock",
      heading: "Talk to us about white label coffee",
      body: "Your brief, our roastery — a proven blend fast, or something entirely your own.",
      ctaLabel: "Get in touch",
    },
  ],
};

type RawSection = Record<string, unknown> & { _key: string; _type: string };

type SanityDoc = {
  hero?: { subtext?: string; image?: unknown; ctaLabel?: string };
  sections?: RawSection[];
};

function resolveSection(raw: RawSection): WhiteLabelCoffeeSection {
  if (raw._type === "introBlock") {
    const image = raw.image;
    return { ...(raw as unknown as IntroBlockSection), image: image ? urlForImage(image).width(1200).url() : undefined };
  }
  if (raw._type === "offerBlock") {
    const image = raw.image;
    return { ...(raw as unknown as OfferBlockSection), image: image ? urlForImage(image).width(1200).url() : undefined };
  }
  return raw as unknown as WhiteLabelCoffeeSection;
}

export async function getWhiteLabelCoffeePageContent(): Promise<WhiteLabelCoffeePageContent> {
  try {
    const doc = await sanityFetch<SanityDoc | null>(WHITE_LABEL_COFFEE_PAGE_QUERY);
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
