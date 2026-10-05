"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/reveal";

/**
 * Full-bleed image band with a scroll-linked parallax drift - the effect
 * unilever.co.uk uses on its homepage (a background image that moves
 * slower than the page as you scroll past it). Built with Motion's
 * `useScroll`/`useTransform` against this section's own scroll progress
 * rather than CSS `background-attachment: fixed`, which Safari/iOS ignores
 * - this way the drift is small, smooth and works on every device.
 * The image sits in a wrapper 24% taller than the section (12% overhang
 * top and bottom) so it still fully covers the section at the extremes of
 * its translate range.
 */
export function ParallaxBand({
  image,
  alt,
  eyebrow,
  heading,
  body,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  heading: ReactNode;
  body: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-green-900 py-28 sm:py-36">
      <motion.div className="absolute -top-[12%] -bottom-[12%] left-0 right-0" style={{ y }}>
        <Image src={image} alt={alt} fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-green-900/60" />
      <Container>
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-500">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold text-cream-100 sm:text-4xl">{heading}</h2>
          <p className="mt-5 text-lg leading-relaxed text-cream-100/85">{body}</p>
        </Reveal>
      </Container>
    </section>
  );
}
