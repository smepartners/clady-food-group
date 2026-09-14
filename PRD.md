# Clady Group website - PRD

## What it does
Corporate marketing site for Clady Group, a UK/NI food & beverage manufacturing
group. Nine pages: Home, About, Our Brands (+4 brand profile pages), Private
Label, CSR, Contact. B2B-facing - the audience is buyers/procurement at
vending, catering, retail, wholesale and food manufacturing companies, not
consumers.

## Who it's for
Clady Group staff need to edit copy/images themselves post-launch (agreed
requirement - hence Sanity, not a static build).

## Content source
`Clady Group Website copy_v2` (client-approved first draft), mapped page by
page in the Build Plan artifact. Copy in this repo's page components is
lifted verbatim from that doc.

## Out of scope (v1)
- E-commerce / product ordering - this is a corporate site, not a shop.
- Blog / news - not in the copy doc or sitemap; revisit if requested.
- Multi-language - no requirement raised.
- Login/gated content - none of the pages need auth.

## Open content gaps
Tracked as `[PENDING]` badges directly on the pages that need them, and in
full in the Build Plan artifact §06:
1. About "At a glance" stats
2. CSR "Our impact" sustainability initiatives
3. Home "Collaboration" value - two copy options in the source doc, unresolved
4. Brand imagery/logos for all four sub-brands
5. Contact page copy - not drafted anywhere in the source doc
6. Footer legal (company name, number, address)
7. Sanity project ownership (Clady's account vs. ours with editor seats)

## Definition of done
- All nine routes build and deploy on Vercel.
- Sanity Studio live at `/studio`, editors can update every page without a
  developer.
- No `[PENDING]` badges left in production.
- Pre-launch checklist (Build Plan §08) cleared.
- `web-design-guidelines` skill audit passed.
