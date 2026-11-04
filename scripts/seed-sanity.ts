/**
 * Seeds the current hardcoded site copy into Sanity as real documents, so
 * the CMS launches with the live site's actual content rather than an
 * empty dataset (per George's "seed from current copy" answer, Nov 2026).
 *
 * This is a ONE-OFF script, not part of the Next.js app - it talks to the
 * Sanity API directly via @sanity/client, using the write token in
 * .env.local (SANITY_API_WRITE_TOKEN, Editor permission). Safe to re-run:
 * every document below has a fixed, deterministic `_id` and is written
 * with `createOrReplace`, so running it again just re-seeds the same
 * documents rather than duplicating them - handy while the schema is
 * still being iterated on, but it also means any edits made *in* the
 * Studio to a seeded document will be overwritten if this is run again
 * after that. Don't re-run it once real editing has started.
 *
 * Usage (from the repo root, with .env.local populated):
 *   npx tsx scripts/seed-sanity.ts
 *
 * What it does:
 *   1. Uploads every referenced /public image as a Sanity asset (cached by
 *      path so the same file is never uploaded twice in one run).
 *   2. Writes one document per brand/facility/produce category/
 *      accreditation/value pillar/stat/CSR initiative.
 *   3. Writes the five singleton page documents and the siteSettings
 *      singleton.
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync, readFileSync } from "fs";
import path from "path";

// --- tiny .env.local loader (no dotenv dependency in this project) ---
function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local - see the Sanity setup notes in the chat/ARCHITECTURE.md."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const PUBLIC_DIR = path.join(process.cwd(), "public");
const assetCache = new Map<string, { _type: "image"; asset: { _type: "reference"; _ref: string } }>();

async function image(publicPath: string) {
  if (!publicPath) return undefined;
  const cached = assetCache.get(publicPath);
  if (cached) return cached;
  const filePath = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ""));
  if (!existsSync(filePath)) {
    console.warn(`  (skipping missing image: ${publicPath})`);
    return undefined;
  }
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  const ref = { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
  assetCache.set(publicPath, ref);
  console.log(`  uploaded ${publicPath}`);
  return ref;
}

async function seed() {
  console.log(`Seeding Sanity project ${projectId}/${dataset}...`);

  // --- Brands --------------------------------------------------------
  const brands = [
    {
      _id: "brand-evolving-state",
      _type: "brand",
      name: "Evolving State",
      slug: { _type: "slug", current: "evolving-state" },
      strap: "Everyday wellness made easy.",
      focus: "Functional drinks · Supplements · Natural wellness · Performance",
      paragraphs: [
        "Evolving State is focused on natural and functional products designed to enhance everyday health and wellbeing.",
        "Its portfolio spans functional drinks, supplements, natural wellness and performance, bringing together products that fit naturally into modern lifestyles.",
      ],
      photo: await image("/photo-brand-evolving-state.jpg"),
      logo: await image("/logo-evolving-state.png"),
      productsImage: await image("/photo-evolving-state-products.avif"),
      productsImageAlt: "The Evolving State product range",
      social: {
        website: "https://evolvingstate.co",
        facebook: "https://www.facebook.com/profile.php?id=61590720360603",
        instagram: "https://www.instagram.com/evolvingstate/",
        tiktok: "https://www.tiktok.com/@evolving.state",
      },
      seed: "clady-evolving-state-wellness",
      order: 1,
    },
    {
      _id: "brand-dutch-maid",
      _type: "brand",
      name: "Dutch Maid",
      slug: { _type: "slug", current: "dutch-maid" },
      strap: "Convenience made simple.",
      focus:
        "Instant coffee · Hot chocolate · Milk & whitener · Cappuccino topping · Soluble ingredients · Private label",
      paragraphs: [
        "Dutch Maid brings ease, convenience and on-trend flavours together in a versatile range of soluble drinks and ingredients.",
        "As a private label manufacturer, Dutch Maid supplies premium soluble beverage solutions across a wide range of industries and channels, including vending, catering and foodservice, retail, wholesale and food manufacturing.",
        "The portfolio includes instant coffee, hot chocolate powder, granulated milk, whitener, cappuccino topping and more.",
      ],
      photo: await image("/photo-brand-dutch-maid.jpg"),
      logo: await image("/logo-dutch-maid.png"),
      productsImage: await image("/photo-dutch-maid-products.png"),
      productsImageAlt: "The Dutch Maid product range",
      websiteComingSoon: true,
      seed: "clady-dutch-maid-soluble",
      order: 2,
    },
    {
      _id: "brand-slumberjack",
      _type: "brand",
      name: "Slumberjack",
      slug: { _type: "slug", current: "slumberjack" },
      strap: "Our signature beverage brand.",
      focus: "Coffee · Tea · Private label",
      paragraphs: [
        "Our signature beverage brand. Slumberjack is the brand from which the Clady Group story began.",
        "Established in 2014, Slumberjack has grown from its family-business roots to offer a broad range of high-quality hot and cold beverage products.",
        "The range spans coffee, tea and hot chocolate, with products designed to serve the needs of customers across different channels and applications.",
        "Slumberjack continues to be guided by three simple principles: remain a family business, stay close to the latest taste trends, and offer breadth and variety across formats, flavours and price points.",
      ],
      photo: await image("/photo-brand-slumberjack.jpg"),
      logo: await image("/logo-slumberjack.svg"),
      productsImage: await image("/photo-slumberjack-products.webp"),
      productsImageAlt: "The Slumberjack product range",
      social: {
        website: "https://www.slumberjackcoffee.com/",
        linkedin: "https://www.linkedin.com/company/slumberjack-coffee/posts/",
      },
      certification: {
        logo: await image("/logo-brcgs-start.png"),
        logoAlt: "BRCGS Start certification mark",
        body:
          "Slumberjack Coffee is BRCGS Start certified (Basic level) for roasted and ground coffee and instant powder drink blends.",
      },
      seed: "clady-slumberjack-coffee",
      order: 3,
    },
  ];

  // --- Facilities ------------------------------------------------------
  const facilities = [
    { _id: "facility-buxton", _type: "facility", name: "Buxton", region: "England", order: 1 },
    { _id: "facility-belfast", _type: "facility", name: "Belfast", region: "Northern Ireland", order: 2 },
  ];

  // --- Produce categories (Private Label "What we produce") -----------
  const produceCategories = [
    {
      _id: "produce-coffee",
      _type: "produceCategory",
      name: "Coffee",
      icon: "Coffee",
      photo: await image("/photo-produce-coffee.jpg"),
      seed: "clady-produce-coffee",
      order: 1,
    },
    {
      _id: "produce-powdered",
      _type: "produceCategory",
      name: "Powdered drinks",
      icon: "Drop",
      photo: await image("/photo-produce-powdered.jpg"),
      seed: "clady-produce-powdered",
      order: 2,
    },
    {
      _id: "produce-functional",
      _type: "produceCategory",
      name: "Functional drinks",
      icon: "Lightning",
      photo: await image("/photo-brand-evolving-state.jpg"),
      seed: "clady-produce-functional",
      order: 3,
    },
    {
      _id: "produce-tea",
      _type: "produceCategory",
      name: "Tea",
      icon: "TeaBag",
      photo: await image("/photo-produce-tea.jpg"),
      seed: "clady-produce-tea",
      order: 4,
    },
  ];

  // --- Accreditations (About - group-wide) -----------------------------
  const accreditations = [
    {
      _id: "accreditation-rainforest-alliance",
      _type: "accreditation",
      name: "Rainforest Alliance",
      note: "Certified sustainable and responsible sourcing",
      logo: await image("/logo-rainforest-alliance.png"),
      order: 1,
    },
    {
      _id: "accreditation-fairtrade",
      _type: "accreditation",
      name: "Fairtrade",
      note: "Certified fair trading practices across our supply chain",
      logo: await image("/logo-fairtrade.png"),
      order: 2,
    },
    {
      _id: "accreditation-brcgs-start",
      _type: "accreditation",
      name: "BRCGS Start Basic",
      note: "Independently audited food safety standard, held by Slumberjack Coffee",
      logo: await image("/logo-brcgs-start.png"),
      order: 3,
    },
  ];

  // --- Value pillars (Home - "What drives us") -------------------------
  const valuePillars = [
    { _id: "value-excellence", _type: "valuePillar", name: "Excellence", icon: "Sparkle", tone: "gold", body: "High standards in everything we do, whether that's branded or white labelled.", order: 1 },
    { _id: "value-innovation", _type: "valuePillar", name: "Innovation", icon: "Lightbulb", tone: "green", body: "Looking ahead to what's next, keeping our customers ahead of the trends.", order: 2 },
    { _id: "value-consistency", _type: "valuePillar", name: "Consistency", icon: "CheckCircle", tone: "olive", body: "Reliable quality, flavours and product profiles, every time.", order: 3 },
    { _id: "value-agility", _type: "valuePillar", name: "Agility", icon: "Lightning", tone: "gold", body: "The world and consumers move fast; that's why we respond quickly to changing needs.", order: 4 },
    { _id: "value-collaboration", _type: "valuePillar", name: "Collaboration", icon: "UsersThree", tone: "green", body: "A partnership approach with our customers, from brief through to finished product.", order: 5 },
  ];

  // --- Group scale stats (Home / About / Private Label) ----------------
  const stats = [
    { _id: "stat-years", _type: "stat", value: "12+", label: "Years established, since 2014", icon: "CalendarBlank", order: 1 },
    { _id: "stat-sites", _type: "stat", value: "2", label: "Manufacturing sites across the UK", icon: "Buildings", order: 2 },
    { _id: "stat-brands", _type: "stat", value: "100s", label: "Specialist and private label brands produced", icon: "Package", order: 3 },
  ];

  // --- CSR initiatives ("Our impact" green credentials) ----------------
  const csrInitiatives = [
    {
      _id: "csr-carbon-neutral",
      _type: "csrInitiative",
      name: "Carbon neutral",
      icon: "CloudCheck",
      body: "As a company, and across our carbon neutral product range, we measure our emissions through My Emissions and offset them through verified projects on the Ecologi platform.",
      order: 1,
    },
    {
      _id: "csr-solar",
      _type: "csrInitiative",
      name: "Solar-powered manufacturing",
      icon: "SunHorizon",
      body: "Solar panels on the roof of our Belfast factory generate green energy for our manufacturing operations.",
      order: 2,
    },
  ];

  // --- Site settings (singleton) ---------------------------------------
  const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    nav: [
      { _type: "navLink", _key: "home", label: "Home", href: "/" },
      { _type: "navLink", _key: "brands", label: "Brands", href: "/brands" },
      { _type: "navLink", _key: "private-label", label: "Private Label", href: "/private-label" },
      { _type: "navLink", _key: "about", label: "About", href: "/about" },
      { _type: "navLink", _key: "csr", label: "CSR", href: "/csr" },
      { _type: "navLink", _key: "contact", label: "Contact", href: "/contact" },
    ],
    footer: {
      companyName: "Clady Food Group",
      companyNumber: "",
      registeredAddress: "",
    },
    contactDetails: {
      email: "sales@cladyfoodgroup.com",
      phone: "028 9442 9555",
      address: "",
    },
    socialLinks: [],
  };

  // --- Home page (singleton) -------------------------------------------
  const homePage = {
    _id: "homePage",
    _type: "homePage",
    hero: {
      eyebrow: "Clady Group",
      heading: "Built around your business.",
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
      image: await image("/photo-production-packing.jpg"),
    },
    closingBand: {
      heading: "Built for better partnerships",
      body:
        "From established beverage brands to private label manufacturing, our businesses are designed to make working with us straightforward. We combine market knowledge, product expertise and a flexible approach to help customers respond to changing consumer expectations and commercial opportunities.",
      ctaLabel: "Discover what Clady Group can do for your business",
    },
  };

  // --- About page (singleton) -------------------------------------------
  const aboutPage = {
    _id: "aboutPage",
    _type: "aboutPage",
    hero: {
      eyebrow: "",
      heading: "A group built around beverage expertise",
      subtext:
        "Clady Group is the parent company behind a growing portfolio of specialist food and drink businesses, bringing together complementary brands, capabilities and expertise.",
      image: await image("/photo-about-team.jpg"),
      ctaLabel: "Explore our brands",
    },
    portfolioSection: {
      heading: "Today, our portfolio spans coffee to wellness.",
      paragraphs: [
        "Established in 2014 through Slumberjack, the group has developed from its family-business roots into a broader platform serving customers across branded and private label markets.",
        "Our portfolio spans coffee, tea, hot chocolate, functional beverages, wellness products, soluble drinks and beverage ingredients. Each business has its own identity and area of expertise, giving our customers access to a broader range of products, capabilities and commercial opportunities.",
      ],
    },
    heritageSection: {
      heading: "From family business to group",
      paragraphs: [
        "Our heritage as a family business remains central to how we operate.",
        "From the beginning, our focus has been on building lasting relationships and creating products that deliver for our customers. As the group has grown, we have retained that approach while developing a broader portfolio and greater capability across the food and drink sector.",
        "Our ambition is to continue growing a group of specialist brands that can respond to changing markets while maintaining the personal approach and commercial focus that have shaped our business from the outset.",
      ],
    },
    manufacturingSection: {
      heading: "",
      body: "",
      image: await image("/photo-roastery-detail.jpg"),
    },
    howWeWorkSection: {
      heading: "How we work",
      paragraphs: [
        "We combine the scale and breadth of an ambitious and capable group with the responsiveness of a family business.",
        "Our customers operate in fast-moving markets, where quality, reliability and the ability to respond quickly matter. We take a practical, collaborative approach, working closely with customers and partners to understand their requirements, identify opportunities and deliver solutions that work commercially.",
        "We stay close to changing consumer tastes and market trends, while maintaining a consistent focus on quality and service.",
        "The result is a business that is ambitious enough to grow, but agile enough to respond.",
      ],
    },
  };

  // --- Private Label page (singleton) -----------------------------------
  const privateLabelPage = {
    _id: "privateLabelPage",
    _type: "privateLabelPage",
    hero: {
      eyebrow: "",
      heading: "Your brand. Our expertise.",
      subtext:
        "From concept to finished product, Clady Group provides private label beverage solutions designed around your requirements.",
      image: await image("/photo-production-packing.jpg"),
      ctaLabel: "Talk to us about private label",
    },
    moreThanALogoSection: {
      heading: "More than a logo on a product.",
      paragraphs: [
        "Private label is about creating the right proposition for your customers, your market and your commercial objectives - backed by real manufacturing scale.",
        "Through our portfolio of specialist businesses, we bring together expertise across coffee, hot beverages, soluble drinks, functional products and beverage ingredients, giving customers the flexibility to develop propositions across categories, formats, flavours and price points.",
      ],
      image: await image("/photo-roastery-row.jpg"),
    },
    flexibleApproachSection: {
      heading: "A flexible approach",
      body:
        "We work collaboratively with customers to understand the opportunity and develop solutions around their needs. Whether you are looking to launch a new proposition, extend an existing range or source a proven product under your own brand, our capabilities can support you.",
      ctaLabel: "Talk to us about your opportunity",
    },
    pillars: [
      { _type: "pillar", _key: "product-expertise", name: "Product expertise", icon: "Package", tone: "gold", body: "Knowledge across a broad range of beverage categories and formats." },
      { _type: "pillar", _key: "market-awareness", name: "Market awareness", icon: "ChartLineUp", tone: "green", body: "An understanding of changing consumer tastes and emerging beverage trends." },
      { _type: "pillar", _key: "flexibility", name: "Flexibility", icon: "Lightning", tone: "olive", body: "Solutions developed around different customer requirements, channels and price points." },
      { _type: "pillar", _key: "consistency", name: "Consistency", icon: "CheckCircle", tone: "gold", body: "A focus on dependable product quality and reliable customer relationships." },
      { _type: "pillar", _key: "collaboration", name: "Collaboration", icon: "UsersThree", tone: "green", body: "A partnership approach from initial brief through to finished product." },
    ],
  };

  // --- CSR page (singleton) ----------------------------------------------
  const csrPage = {
    _id: "csrPage",
    _type: "csrPage",
    hero: {
      eyebrow: "",
      heading: "Doing business responsibly",
      subtext:
        "At Clady Group, we believe responsible business is about making the right decisions for our people, our customers, our partners and the communities in which we operate.",
      image: await image("/photo-csr-sourcing.jpg"),
    },
    intro:
      "As our group develops, we are committed to building responsible practices into the way we work, from the products we develop and the partners we work with to the way we support our people and manage our impact.",
    pillars: [
      { _type: "pillar", _key: "our-people", name: "Our people", icon: "UsersThree", tone: "gold", body: "Our business is built by people. We want to create an environment where our teams can contribute, develop and take pride in what they do. We value collaboration, respect and accountability, and recognise the importance of strong relationships across our business." },
      { _type: "pillar", _key: "our-customers", name: "Our customers and partners", icon: "Handshake", tone: "green", body: "Responsible business starts with doing what we say we will do. We aim to build long-term relationships based on trust, transparency and consistent delivery. We work collaboratively with customers and partners to understand expectations and continually improve the way we operate." },
      { _type: "pillar", _key: "our-products", name: "Our products", icon: "Leaf", tone: "olive", body: "Consumer expectations are changing, and we believe businesses have a responsibility to respond. Across our portfolio, we are exploring opportunities to develop products that reflect changing preferences, including growing interest in wellness, functionality, convenience and evolving taste profiles. We also recognise the importance of responsible sourcing, with a particular focus on ethical and responsible supply chains across key commodities such as coffee." },
    ],
    responsibilitySection: {
      heading: "Our responsibility",
      body:
        "For us, responsible business is not a standalone initiative. It is part of how we operate. Our values of excellence, innovation, consistency, agility and collaboration guide the way we work and provide the foundation for building a business that is successful for the long term.",
      quote: "Building better, responsibly.",
    },
    impactSection: {
      heading: "Our impact",
      body:
        "We recognise that every business has an impact. As Clady Food Group continues to grow, we are focused on understanding where we can make the greatest difference and building responsible practices into our future development. Our approach is one of continuous improvement: setting meaningful priorities, measuring progress and taking practical action.",
    },
  };

  // --- Contact page (singleton) -------------------------------------------
  const contactPage = {
    _id: "contactPage",
    _type: "contactPage",
    hero: {
      eyebrow: "",
      heading: "Talk to us",
      subtext:
        "Whether you're exploring a private label opportunity or want to know more about one of our brands, we'd like to hear from you.",
    },
    emailPrompt: "Prefer email? Reach us directly at",
  };

  const docs = [
    ...brands,
    ...facilities,
    ...produceCategories,
    ...accreditations,
    ...valuePillars,
    ...stats,
    ...csrInitiatives,
    siteSettings,
    homePage,
    aboutPage,
    privateLabelPage,
    csrPage,
    contactPage,
  ];

  console.log(`Writing ${docs.length} documents...`);
  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc as never);
  await tx.commit();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
