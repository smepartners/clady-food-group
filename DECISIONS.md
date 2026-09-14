# Decisions

- **Next.js + Sanity + Tailwind, hosted on Vercel.** Vercel because DNS is
  already pointed there from the holding-page cutover. Sanity because Clady
  staff need to self-edit content post-launch (their explicit requirement).
- **Individual URLs per brand** (`/brands/[slug]`) rather than one page with
  four sections - each brand reads as a standalone profile in the source
  copy, and separate pages give each its own SEO footprint.
- **Static copy for now, Sanity wired but not yet fetched from.** See
  ARCHITECTURE.md - there's no Sanity project to fetch from yet, and no
  value in wiring a CMS with zero content in it.
- **`site-build` branch, not `main`.** `main` still serves the live holding
  page; this branch becomes the real site and gets merged in at cutover
  (Build Plan phase 7), not before.
