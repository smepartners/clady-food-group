# Architecture

Next.js 16 (App Router) + Tailwind v4 + Sanity, on Vercel.

```
src/
  app/
    (site)/            marketing pages - share SiteHeader/SiteFooter via layout.tsx
      page.tsx          /
      about/page.tsx     /about
      brands/
        page.tsx          /brands
        [slug]/page.tsx   /brands/evolving-state etc.
      private-label/page.tsx
      csr/page.tsx
      contact/page.tsx
    studio/[[...tool]]/page.tsx   embedded Sanity Studio at /studio
    layout.tsx          root layout - fonts only, no header/footer (Studio needs its own chrome)
    globals.css          brand tokens as CSS vars, mapped into Tailwind's @theme
  components/            SiteHeader, SiteFooter, Container/Section/Pending
  sanity/
    schemaTypes/          brand, page, valuePillar, stat, csrInitiative, siteSettings
    lib/                  client.ts, image.ts, queries.ts (GROQ, via next-sanity's defineQuery)
    env.ts                 reads the three NEXT_PUBLIC_SANITY_* vars
    structure.ts           Studio desk structure (siteSettings pinned as a singleton)
sanity.config.ts          root-level Studio config, imported by the /studio route
```

## Why static copy right now, not live Sanity fetches
The Sanity project doesn't exist yet (open question 07 - whose org it sits
under). Wiring page components to GROQ queries against a project with zero
documents would either crash the build or render blank pages, and there'd be
no meaningful editing experience for Clady staff to test. Pages currently
render the approved copy from the source doc directly, with `[PENDING]`
placeholders where content is genuinely missing (see PRD).

**Once the Sanity project exists:** create it (`npx sanity init` from repo
root, or point `.env.local` at an existing one), run `npm run dev`, visit
`/studio`, and start populating documents. Then swap each page's hardcoded
content for a `client.fetch(QUERY)` call using the queries already defined
in `src/sanity/lib/queries.ts` - the shape of every query already matches
the schema, this is a mechanical swap, not new design work.

## Brand tokens
Colour and type tokens live in `src/app/globals.css` as CSS custom
properties, pulled from the Clady brand pack (`CladyFoodGroup_v1.pdf`):
`green-700` #32533a (primary), `olive-600` #7c7f3d, `gold-500` #f4bf44,
`cream-100` #f5f4e5. Typeface: Poppins (`next/font/google`), used for both
display and body for now - revisit during the design-direction pass
(Build Plan phase 3) once brand assets are in.
