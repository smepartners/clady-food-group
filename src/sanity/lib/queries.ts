import { defineQuery } from "next-sanity";

export const BRANDS_QUERY = defineQuery(`
  *[_type == "brand"] | order(order asc) {
    _id, name, "slug": slug.current, strapline, focusTags, heroImage, logo, accentColour
  }
`);

export const BRAND_BY_SLUG_QUERY = defineQuery(`
  *[_type == "brand" && slug.current == $slug][0] {
    _id, name, "slug": slug.current, strapline, bodyBlocks, focusTags, heroImage, logo, accentColour
  }
`);

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, sections, seoMeta
  }
`);

export const VALUE_PILLARS_QUERY = defineQuery(`
  *[_type == "valuePillar"] | order(order asc) { _id, name, description }
`);

export const STATS_QUERY = defineQuery(`
  *[_type == "stat"] | order(order asc) { _id, label, value }
`);

export const CSR_INITIATIVES_QUERY = defineQuery(`
  *[_type == "csrInitiative"] | order(order asc) { _id, title, description, icon }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    nav, footer, contactDetails, socialLinks
  }
`);
