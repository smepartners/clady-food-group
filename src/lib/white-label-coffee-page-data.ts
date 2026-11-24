import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { WHITE_LABEL_COFFEE_PAGE_QUERY } from "@/sanity/lib/queries";

export type SectorData = { name: string; body: string; icon: string; tone: "gold" | "green" | "olive" };
export type StepData = { title: string; body: string };
export type InnovationCardData = { title: string; body: string };

export type WhiteLabelCoffeePageContent = {
  hero: { subtext?: string; image?: string; ctaLabel?: string };
  introSection: { paragraphs?: string[]; image?: string };
  sectorsSection: { heading?: string; sectors?: SectorData[] };
  offerSection: { heading?: string; bullets?: string[]; image?: string };
  howItWorksSection: { heading?: string; intro?: string; steps?: StepData[] };
  innovationSection: { heading?: string; cards?: InnovationCardData[] };
  formatsSection: { heading?: string; formats?: string[]; note?: string };
  crossSellSection: { heading?: string; body?: string; linkLabel?: string; href?: string };
  closingCta: { heading?: string; body?: string; ctaLabel?: string };
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
  introSection: {
    paragraphs: [
      "We source, roast, blend and pack coffee to your specification, so you can put a product on shelf or behind the counter that carries your name and tastes the way you want it to.",
      "Built on more than a decade of roasting for our own brands such as Slumberjack, and across hundreds of partner brands, our coffee team handles every stage — from green bean selection to the finished, sealed pack.",
      "Choose a proven blend from our existing range for a fast, cost-effective launch, or work with us to build something entirely your own.",
    ],
    image: "/photo-produce-coffee.jpg",
  },
  sectorsSection: {
    heading: "If your customers drink coffee, we can make it for you",
    sectors: [
      { name: "Retailers & grocers", body: "Own-label range across price tiers", icon: "Storefront", tone: "gold" },
      { name: "Cafés & hospitality", body: "A signature house blend", icon: "Coffee", tone: "green" },
      { name: "Food service & caterers", body: "Consistent bulk supply", icon: "ForkKnife", tone: "olive" },
      { name: "Start-ups & challengers", body: "Launching a first coffee product", icon: "Rocket", tone: "gold" },
      { name: "Gift & subscription brands", body: "Quality product, no roastery needed", icon: "Gift", tone: "green" },
    ],
  },
  offerSection: {
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
  howItWorksSection: {
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
  innovationSection: {
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
  formatsSection: {
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
  crossSellSection: {
    heading: "We also make white label powdered drinks",
    body: "Hot chocolate, instant coffee mixes, toppings and functional blends, through Dutch Maid, Innainstant and Evolving State.",
    linkLabel: "See powdered drinks",
    href: "/private-label",
  },
  closingCta: {
    heading: "Talk to us about white label coffee",
    body: "Your brief, our roastery — a proven blend fast, or something entirely your own.",
    ctaLabel: "Get in touch",
  },
};

type SanityDoc = Partial<Record<keyof WhiteLabelCoffeePageContent, unknown>> & {
  hero?: { subtext?: string; image?: unknown; ctaLabel?: string };
  introSection?: { paragraphs?: string[]; image?: unknown };
};

export async function getWhiteLabelCoffeePageContent(): Promise<WhiteLabelCoffeePageContent> {
  try {
    const doc = await client.fetch<SanityDoc | null>(WHITE_LABEL_COFFEE_PAGE_QUERY);
    if (doc) {
      const hero = doc.hero as WhiteLabelCoffeePageContent["hero"] & { image?: unknown };
      const intro = doc.introSection as WhiteLabelCoffeePageContent["introSection"] & { image?: unknown };
      const offer = doc.offerSection as WhiteLabelCoffeePageContent["offerSection"] & { image?: unknown };
      return {
        hero: {
          ...FALLBACK.hero,
          ...hero,
          image: hero?.image ? urlForImage(hero.image).width(1800).url() : FALLBACK.hero.image,
        },
        introSection: {
          ...FALLBACK.introSection,
          ...intro,
          image: intro?.image ? urlForImage(intro.image).width(1200).url() : FALLBACK.introSection.image,
        },
        sectorsSection: {
          ...FALLBACK.sectorsSection,
          ...(doc.sectorsSection as WhiteLabelCoffeePageContent["sectorsSection"]),
        },
        offerSection: {
          ...FALLBACK.offerSection,
          ...offer,
          image: offer?.image ? urlForImage(offer.image).width(1200).url() : FALLBACK.offerSection.image,
        },
        howItWorksSection: {
          ...FALLBACK.howItWorksSection,
          ...(doc.howItWorksSection as WhiteLabelCoffeePageContent["howItWorksSection"]),
        },
        innovationSection: {
          ...FALLBACK.innovationSection,
          ...(doc.innovationSection as WhiteLabelCoffeePageContent["innovationSection"]),
        },
        formatsSection: {
          ...FALLBACK.formatsSection,
          ...(doc.formatsSection as WhiteLabelCoffeePageContent["formatsSection"]),
        },
        crossSellSection: {
          ...FALLBACK.crossSellSection,
          ...(doc.crossSellSection as WhiteLabelCoffeePageContent["crossSellSection"]),
        },
        closingCta: {
          ...FALLBACK.closingCta,
          ...(doc.closingCta as WhiteLabelCoffeePageContent["closingCta"]),
        },
      };
    }
  } catch {
    // fall through
  }
  return FALLBACK;
}
