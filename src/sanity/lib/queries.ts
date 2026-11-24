import { defineQuery } from "next-sanity";

// Rewritten Nov 2026 alongside the schema rebuild - field names now match
// the real `Brand` type and friends (see schemaTypes/brand.ts and the
// other new/updated schemas) instead of the stale original scaffold.

export const BRANDS_QUERY = defineQuery(`
  *[_type == "brand"] | order(order asc) {
    _id, name, "slug": slug.current, strap, focus, photo, logo, order
  }
`);

export const BRAND_BY_SLUG_QUERY = defineQuery(`
  *[_type == "brand" && slug.current == $slug][0] {
    _id, name, "slug": slug.current, strap, focus, paragraphs, photo, logo,
    productsImage, productsImageAlt, social, websiteComingSoon, certification, seed,
    contactEmail, contactPhone
  }
`);

export const FACILITIES_QUERY = defineQuery(`
  *[_type == "facility"] | order(order asc) { _id, name, region }
`);

export const PRODUCE_CATEGORIES_QUERY = defineQuery(`
  *[_type == "produceCategory"] | order(order asc) { _id, name, icon, photo, seed }
`);

export const ACCREDITATIONS_QUERY = defineQuery(`
  *[_type == "accreditation"] | order(order asc) { _id, name, note, logo }
`);

export const VALUE_PILLARS_QUERY = defineQuery(`
  *[_type == "valuePillar"] | order(order asc) { _id, name, body, icon, tone }
`);

export const STATS_QUERY = defineQuery(`
  *[_type == "stat"] | order(order asc) { _id, label, value, icon }
`);

export const CSR_INITIATIVES_QUERY = defineQuery(`
  *[_type == "csrInitiative"] | order(order asc) { _id, name, body, icon }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    nav, footer, contactDetails, socialLinks
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] { hero, sections }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0] { hero, sections }
`);

export const PRIVATE_LABEL_PAGE_QUERY = defineQuery(`
  *[_type == "privateLabelPage"][0] { hero, sections }
`);

export const WHITE_LABEL_COFFEE_PAGE_QUERY = defineQuery(`
  *[_type == "whiteLabelCoffeePage"][0] { hero, sections }
`);

export const CSR_PAGE_QUERY = defineQuery(`
  *[_type == "csrPage"][0] { hero, sections }
`);

export const FLEXIBLE_PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "flexiblePage" && defined(slug.current)].slug.current
`);

export const FLEXIBLE_PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "flexiblePage" && slug.current == $slug][0] {
    title, seoDescription, hero, sections
  }
`);

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage"][0] { hero, emailPrompt }
`);
