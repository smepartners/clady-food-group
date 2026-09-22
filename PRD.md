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
8. Named client/retailer trust content - per client feedback (Sept 2026) that
   the site reads smaller than the business actually is, comparable sites
   (HW Group, Queensland Bakery Co.) lean on a named client/retailer logo
   bar and testimonials to signal scale. Clady has neither on file yet.
   Homepage/Private Label/About were strengthened in the meantime with the
   scale facts already confirmed (years established, manufacturing sites,
   brand count - see `StatTile`/`FacilityStrip` in `components/ui.tsx`), but
   no client names or logos have been added anywhere on the site - doing so
   without a confirmed, permitted list from the client would misrepresent
   who Clady actually supplies. Needs from Zoe: (a) which customers Clady is
   permitted to name publicly, with usable logo files, and (b) any real
   testimonial quotes. Build a `ClientLogoBar` component (same pattern as
   `AccreditationGrid`) once that list exists.
9. Homepage hero style decision - client felt the scale-stat pass (item 8's
   workaround) was too minor a visual change. A "Classic / Bold" preview
   toggle was added to the live homepage (bottom-right pill, see
   `components/home-theme.tsx` + `home-hero.tsx`) so the team can compare
   the current light hero against a bolder deep-green, textured variant
   before committing. It's a review tool, not a shipped feature - it
   defaults to "Classic" for every visitor and the choice is stored per
   browser only (localStorage), never sent anywhere. Once a direction is
   picked: delete `home-theme.tsx`, remove `<HomeStyleToggle />` from
   `page.tsx`, and hardcode the winning branch's classes from `home-hero.tsx`
   back into the section (or keep bold as the permanent style and drop the
   classic branch instead). If the bold direction is preferred, the same
   toggle pattern can extend to other sections/pages next.

## Definition of done
- All nine routes build and deploy on Vercel.
- Sanity Studio live at `/studio`, editors can update every page without a
  developer.
- No `[PENDING]` badges left in production.
- Pre-launch checklist (Build Plan §08) cleared.
- `web-design-guidelines` skill audit passed.
