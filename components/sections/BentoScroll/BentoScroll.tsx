"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

// ── Types ──────────────────────────────────────────────────────────────────────

type ScrollBlock = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  /** Short phrase shown in the accent card while this block is active */
  accentPhrase: string;
};

// ── Data ───────────────────────────────────────────────────────────────────────

const scrollBlocks: ScrollBlock[] = [
  {
    id: "medical",
    eyebrow: "Medical Dermatology",
    heading: "Diagnosis and treatment you can trust",
    body: `Our board-certified dermatologists diagnose and treat over 3,000 skin conditions—from acne and eczema to complex inflammatory disorders. Every treatment plan is tailored to your unique skin type, lifestyle, and health history.`,
    accentPhrase: "We guide your path\nto better skin health",
  },
  {
    id: "cosmetic",
    eyebrow: "Cosmetic Treatments",
    heading: "Look and feel your best",
    body: `From Botox and fillers to laser resurfacing and chemical peels, ${siteConfig.businessName} offers a full suite of aesthetic procedures. Our providers blend clinical expertise with an eye for natural-looking results.`,
    accentPhrase: "Natural results\nyou'll love",
  },
  {
    id: "surgical",
    eyebrow: "Dermatologic Surgery",
    heading: "Precision care for skin health",
    body: `Skin cancer screenings, biopsy analysis, and surgical excisions performed right in our office. When time-sensitive, we move fast—our team provides same-week evaluations for suspicious lesions.`,
    accentPhrase: "Precision care\nat every step",
  },
  {
    id: "preventive",
    eyebrow: "Preventive Care",
    heading: "Catch problems before they start",
    body: `Annual full-body skin checks are the cornerstone of melanoma prevention. We use dermoscopy and digital imaging to monitor moles and lesions over time, giving you peace of mind year after year.`,
    accentPhrase: "Prevention is\nthe best medicine",
  },
];

// Stable ref callbacks created once — avoids repeated mount/unmount cycles
const stableRefCallbacks = scrollBlocks.map(
  (_, i) =>
    (blockRefs: React.MutableRefObject<(HTMLDivElement | null)[]>) =>
    (el: HTMLDivElement | null) => {
      blockRefs.current[i] = el;
    },
);

// ── Main Component ─────────────────────────────────────────────────────────────

export interface StickyBentoScrollSectionProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  topPhotoUrl?: string;
  bottomPhotoUrl?: string;
}

export default function StickyBentoScrollSection({
  eyebrow = "Patient-focused care vision",
  heading = `We provide & enhance medical journeys`,
  description = `${siteConfig.businessName} leads the way in ${siteConfig.specialty.toLowerCase()} with a full range of medical services, focusing on each patient's needs and wellness.`,
  topPhotoUrl = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&auto=format&fit=crop",
  bottomPhotoUrl = "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80&auto=format&fit=crop",
}: StickyBentoScrollSectionProps) {
  const { colors } = siteConfig.branding;

  const [activeIndex, setActiveIndex] = useState(0);
  // Separate display index so we can crossfade the accent text
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [accentVisible, setAccentVisible] = useState(true);

  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fade accent card text out → swap text → fade back in
  useEffect(() => {
    setAccentVisible(false);
    const t = setTimeout(() => {
      setDisplayedIndex(activeIndex);
      setAccentVisible(true);
    }, 180);
    return () => clearTimeout(t);
  }, [activeIndex]);

  // One IntersectionObserver per scroll block
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    blockRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { rootMargin: "-25% 0px -25% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section
      aria-labelledby="bento-scroll-heading"
      style={{ backgroundColor: colors.background.primary }}
      className="py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">

          {/* ── LEFT — sticky bento panel ─────────────────────────────────── */}
          <div className="mb-16 lg:col-span-6 lg:mb-0">
            <div className="lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-6rem)] lg:flex-col lg:pt-8">

              {/* Bento: 5-col grid — accent card (2) | photo (3) / wide photo (5) */}
              {/* lg:grid-rows-[2fr_3fr] fills the sticky height proportionally */}
              <div className="grid grid-cols-5 gap-3 sm:gap-4 lg:min-h-0 lg:flex-1 lg:grid-rows-[2fr_3fr]">

                {/* Accent card — top left, shows active phrase */}
                <div
                  className="col-span-2 flex min-h-44 flex-col justify-end rounded-2xl p-6 lg:min-h-0"
                  style={{ backgroundColor: colors.accent.primary }}
                  aria-hidden="true"
                >
                  <p
                    className="whitespace-pre-line text-xl font-bold leading-snug"
                    style={{
                      color: colors.text.inverse,
                      opacity: accentVisible ? 1 : 0,
                      transition: "opacity 0.18s ease",
                    }}
                  >
                    {scrollBlocks[displayedIndex].accentPhrase}
                  </p>
                </div>

                {/* Photo card — top right */}
                <div className="relative col-span-3 min-h-44 overflow-hidden rounded-2xl lg:min-h-0">
                  <Image
                    src={topPhotoUrl}
                    alt="Dermatologist providing attentive patient care"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 60vw, 30vw"
                    priority
                  />
                </div>

                {/* Wide photo — bottom, full bento width */}
                <div className="relative col-span-5 min-h-60 overflow-hidden rounded-2xl lg:min-h-0">
                  <Image
                    src={bottomPhotoUrl}
                    alt="Advanced dermatology technology and equipment"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Scroll progress pill indicator */}
              <div
                className="mt-5 flex shrink-0 items-center gap-2"
                aria-hidden="true"
              >
                {scrollBlocks.map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 rounded-full"
                    style={{
                      width: activeIndex === i ? "2rem" : "0.375rem",
                      backgroundColor:
                        activeIndex === i
                          ? colors.accent.primary
                          : colors.border,
                      transition:
                        "width 0.35s ease, background-color 0.35s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT — heading + scrolling narrative blocks ───────────────── */}
          <div className="lg:col-span-6">

            {/* Static section heading at the top of the right column */}
            <header className="mb-12">
              {eyebrow && (
                <p
                  className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: colors.accent.primary }}
                >
                  {eyebrow}
                </p>
              )}
              <h2
                id="bento-scroll-heading"
                className="mb-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                style={{ color: colors.text.primary }}
              >
                {heading}
              </h2>
              {description && (
                <p
                  className="text-base leading-relaxed sm:text-lg"
                  style={{ color: colors.text.secondary }}
                >
                  {description}
                </p>
              )}
            </header>

            {/* Scrolling sub-blocks observed by IntersectionObserver */}
            <div aria-live="polite" aria-atomic="false">
              {scrollBlocks.map((block, i) => {
                const isActive = activeIndex === i;
                // Blocks already scrolled past or currently active stay fully visible;
                // only upcoming blocks are dimmed.
                const isVisible = i <= activeIndex;
                // Use a stable callback that closes over blockRefs
                const refCb = stableRefCallbacks[i](blockRefs);

                return (
                  <div
                    key={block.id}
                    ref={refCb}
                    data-scroll-index={i}
                    aria-current={isActive ? "true" : undefined}
                    style={{
                      borderTopColor: colors.border,
                      borderTopWidth: "1px",
                      borderTopStyle: "solid",
                    }}
                    className="scroll-mt-28 py-10 first:border-t-0 first:pt-0"
                  >
                    {/* Eyebrow pill */}
                    <div
                      className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                      style={{
                        backgroundColor: isActive
                          ? `${colors.accent.primary}18`
                          : colors.background.secondary,
                        color: colors.accent.primary,
                        transition: "background-color 0.35s ease",
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          backgroundColor: colors.accent.primary,
                          opacity: isVisible ? 1 : 0.3,
                          transition: "opacity 0.35s ease",
                        }}
                        aria-hidden="true"
                      />
                      {block.eyebrow}
                    </div>

                    <h3
                      className="mb-3 text-xl font-bold leading-snug tracking-tight sm:text-2xl"
                      style={{
                        color: colors.text.primary,
                        opacity: isVisible ? 1 : 0.4,
                        transition: "opacity 0.35s ease",
                      }}
                    >
                      {block.heading}
                    </h3>

                    <p
                      className="text-base leading-relaxed"
                      style={{
                        color: colors.text.secondary,
                        opacity: isVisible ? 1 : 0.4,
                        transition: "opacity 0.35s ease",
                      }}
                    >
                      {block.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
