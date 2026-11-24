import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Camera, FacebookLogo, InstagramLogo, TiktokLogo, LinkedinLogo, Globe } from "@phosphor-icons/react/dist/ssr";
import { Section, Pill, CTAButton, TextureOverlay } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { BrandDetailHero } from "@/components/brand-detail-hero";
import { BrandCarousel } from "@/components/brand-carousel";
import { BrandInstagramSection } from "@/components/instagram-feed";
import { getBrand, getBrandSlugs } from "@/lib/brands-data";

// Nov 2026: this page now fetches from Sanity (getBrand/getBrandSlugs,
// src/lib/brands-data.ts - BRAND_BY_SLUG_QUERY under the hood) instead of
// the static BRANDS map that used to live in this file. The static
// content is kept as a fallback inside brands-data.ts itself (not here)
// in case Sanity is briefly unreachable. Galway Roast remains removed
// from the group portfolio (George, Oct 2026) - it has no brand document
// in Sanity, so /brands/galway-roast still 404s via notFound() below.

export async function generateStaticParams() {
  const slugs = await getBrandSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrand(slug);
  return { title: brand?.name ?? "Brand" };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) notFound();

  return (
    <>
      <BrandDetailHero brand={brand} slug={slug} />

      {/* Round 5 feedback: overview copy now sits beside a product-range
          image instead of running full-width alone, and closes with a
          "get in touch" CTA. The image is a real supplied photo where
          Zoe's provided one (Evolving State so far) and the standard
          "photography pending" placeholder everywhere else, ready to swap
          in once the rest are supplied. */}
      <Section pad="pt-14 sm:pt-20 pb-10 sm:pb-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="max-w-2xl space-y-4 text-ink-soft">
              {brand.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {/* Sonia, Oct 2026: "make the social and website icons more
                prominent/obvious" - were a faint cream-bordered outline
                that nearly disappeared against the cream page background;
                now solid green-700 discs (matching the CTA button's own
                fill) at a larger size, so they read as their own small
                row of buttons rather than optional fine print. */}
            {brand.social ? (
              <ul className="mt-6 flex flex-wrap items-center gap-3">
                {brand.social.website ? (
                  <li>
                    <a
                      href={brand.social.website}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${brand.name} website`}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-cream-100 shadow-md shadow-green-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-lg"
                    >
                      <Globe size={20} weight="bold" />
                    </a>
                  </li>
                ) : null}
                {brand.social.facebook ? (
                  <li>
                    <a
                      href={brand.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${brand.name} on Facebook`}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-cream-100 shadow-md shadow-green-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-lg"
                    >
                      <FacebookLogo size={20} weight="bold" />
                    </a>
                  </li>
                ) : null}
                {brand.social.instagram ? (
                  <li>
                    <a
                      href={brand.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${brand.name} on Instagram`}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-cream-100 shadow-md shadow-green-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-lg"
                    >
                      <InstagramLogo size={20} weight="bold" />
                    </a>
                  </li>
                ) : null}
                {brand.social.tiktok ? (
                  <li>
                    <a
                      href={brand.social.tiktok}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${brand.name} on TikTok`}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-cream-100 shadow-md shadow-green-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-lg"
                    >
                      <TiktokLogo size={20} weight="bold" />
                    </a>
                  </li>
                ) : null}
                {brand.social.linkedin ? (
                  <li>
                    <a
                      href={brand.social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${brand.name} on LinkedIn`}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-cream-100 shadow-md shadow-green-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-lg"
                    >
                      <LinkedinLogo size={20} weight="bold" />
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : null}
            {brand.websiteComingSoon ? (
              <p className="mt-6 text-sm font-medium uppercase tracking-wide text-olive-600">
                Website coming soon
              </p>
            ) : null}
            {brand.certification ? (
              <div className="mt-8 flex items-center gap-4 border-t border-cream-200 pt-6">
                <div className="relative h-10 w-32 shrink-0">
                  <Image
                    src={brand.certification.logo}
                    alt={brand.certification.logoAlt}
                    fill
                    sizes="128px"
                    className="object-contain object-left"
                  />
                </div>
                <p className="text-sm leading-relaxed text-ink-soft">{brand.certification.body}</p>
              </div>
            ) : null}
            <div className="mt-8">
              {/* George, Nov 2026 (WhatsApp): this was routing to the
                  group-wide contact details even on a brand's own page -
                  linking with ?brand=<slug> lets the contact page show
                  that brand's own email/phone (brand.contactEmail/
                  contactPhone) instead of falling back to Site settings. */}
              <CTAButton href={`/contact?brand=${slug}`}>Get in touch about {brand.name}</CTAButton>
            </div>
            {/* Round (Sonia, Oct 2026): moved down from above the social
                icons/CTA to sit under "Get in touch" instead - and now
                genuinely clickable (each pill already had a hover state
                suggesting it was interactive, it just didn't go anywhere).
                Links through to the contact page, same destination as the
                CTA button just above, since there's no dedicated page per
                product area to send a visitor to. */}
            <ul className="mt-8 flex flex-wrap gap-2 border-t border-cream-200 pt-6">
              {brand.focus.split("·").map((f) => (
                <li key={f}>
                  <Pill href={`/contact?brand=${slug}`}>{f.trim()}</Pill>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            {brand.productsImage ? (
              // Round 7 feedback: "can the frame be square/images set to
              // fit please? It's clipping parts of the images" - object-cover
              // in a 4/5 box was cropping the supplied product shots.
              // Square frame + object-contain shows the whole image, with
              // the cream background filling any letterboxing.
              <div className="relative aspect-square overflow-hidden bg-cream-200">
                <Image
                  src={brand.productsImage}
                  alt={brand.productsImageAlt ?? `The ${brand.name} product range`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="relative flex aspect-square items-center justify-center overflow-hidden border border-cream-200 bg-gradient-to-br from-green-700/25 via-gold-500/20 to-olive-400/25">
                <div className="flex flex-col items-center gap-2 px-6 text-center text-green-700/60">
                  <Camera size={28} weight="light" />
                  <p className="text-xs font-medium uppercase tracking-wide">
                    Product range photography pending
                  </p>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      {/* Instagram: a follow teaser/post grid for brands with a confirmed
          handle (just Evolving State for now). Round 7 asked for less gap
          above this and a light background so it reads clearly as its own
          section rather than floating against the overview block above.
          BrandInstagramSection itself renders nothing for a brand with no
          confirmed handle, so no extra guard is needed here. */}
      <Section pad="pt-10 pb-10 sm:pt-14 sm:pb-14" className="bg-cream-200/40">
        <BrandInstagramSection slug={slug} />
      </Section>

      {/* Round 5 feedback: swapped the static BrandGrid for the same
          carousel used on the homepage's "Our brands" band, so this
          closing section reads as the identical brand-portfolio moment
          wherever it appears on the site rather than a smaller, separate
          treatment. */}
      <Section className="relative overflow-hidden bg-green-900">
        <TextureOverlay texture="/texture-leather-gold.jpg" watermark="/logo-icon-watermark-gold.png" />
        <div className="relative">
          <BrandCarousel />
        </div>
      </Section>
    </>
  );
}
