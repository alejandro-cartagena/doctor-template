/**
 * Home page section configuration for the medical practice template.
 * Swap sections per clinic by reordering/omitting IDs from HOME_SECTION_IDS,
 * or override via siteConfig.homeSections in site.ts.
 *
 * Layout (navbar & footer): set headerVariant and footerVariant below to choose which Header and Footer render.
 *
 * Hero options: use exactly one of "hero" | "hero-v2" | "hero-v3" | "hero-v4" in your
 * section list for different pitch styles (full-bleed, split, minimal, minimal V4 theme).
 *
 * FAQ options: use "faq" (default) or "faq-v2" | "faq-v3" | "faq-v4" for alternate layouts.
 *
 * Featured testimonial options: use "featured-testimonial" (default) or
 * "featured-testimonial-v2" | "featured-testimonial-v3" | "featured-testimonial-v4".
 *
 * Education/insights options: use "patient-resources" (default) or "patient-resources-v2" | "patient-resources-v3" | "patient-resources-v4".
 *
 * Sections like "services-preview", "why-choose-us", "what-to-expect", "meet-the-doctors",
 * "insurance", "visit-us", and "short-testimonials" each support "section-id" (default)
 * or "section-id-v2" | "section-id-v3" | "section-id-v4" for alternate layouts.
 */

// ——— Navbar & footer (layout) ———
/** Valid header variant IDs. Options: "default" (utility + nav), "v2" (light/centered), "v3" (minimal/compact). */
export const HEADER_VARIANT_IDS = ["default", "v2", "v3"] as const;

export type HeaderVariantId = (typeof HEADER_VARIANT_IDS)[number];

/** Which navbar to use. Change this to swap the header. */
export const headerVariant: HeaderVariantId = "default";

/** Valid footer variant IDs. Options: "default" (dark), "v2" (light/centered), "v3" (minimal), "v4" (minimal V4 theme). */
export const FOOTER_VARIANT_IDS = ["default", "v2", "v3", "v4"] as const;

export type FooterVariantId = (typeof FOOTER_VARIANT_IDS)[number];

/** Which footer to use. Change this to swap the footer. */
export const footerVariant: FooterVariantId = "default";

export function getHeaderVariant(): HeaderVariantId {
  return headerVariant;
}

export function getFooterVariant(): FooterVariantId {
  return footerVariant;
}

// ——— Home page sections ———
/** All valid section IDs (including all variants). Keep this list in sync with built components. */
export const ALL_HOME_SECTION_IDS = [
  // Hero (pick exactly one)
  "hero",
  "hero-v2",
  "hero-v3",
  "hero-v4",

  // Trust + conversion
  "insurance",
  "insurance-v2",
  "insurance-v3",
  "insurance-v4",

  "meet-the-doctors",
  "meet-the-doctors-v2",
  "meet-the-doctors-v3",
  "meet-the-doctors-v4",

  "services-preview",
  "services-preview-v2",
  "services-preview-v3",
  "services-preview-v4",

  "why-choose-us",
  "why-choose-us-v2",
  "why-choose-us-v3",
  "why-choose-us-v4",

  // Patient journey
  "what-to-expect",
  "what-to-expect-v2",
  "what-to-expect-v3",
  "what-to-expect-v4",

  // Patient education / blog-style strip
  "patient-resources",
  "patient-resources-v2",
  "patient-resources-v3",
  "patient-resources-v4",

  // Proof
  "featured-testimonial",
  "featured-testimonial-v2",
  "featured-testimonial-v3",
  "featured-testimonial-v4",

  "short-testimonials",
  "short-testimonials-v2",
  "short-testimonials-v3",
  "short-testimonials-v4",

  // Clinic details
  "visit-us",
  "visit-us-v2",
  "visit-us-v3",
  "visit-us-v4",

  // FAQs
  "faq",
  "faq-v2",
  "faq-v3",
  "faq-v4",

  // Common utilities / promos
  "stats-and-services",
  "promo-banner",
] as const;

export type HomeSectionId = (typeof ALL_HOME_SECTION_IDS)[number];

/**
 * Default section order (single hero).
 * Use hero-v2 or hero-v3 in siteConfig.homeSections to swap the hero layout.
 *
 * Rationale:
 * - Lead with appointment CTA + trust
 * - Show services early
 * - Add providers + proof
 * - Close with logistics + FAQ
 */
export const HOME_SECTION_IDS: readonly HomeSectionId[] = [
  "hero",
  "insurance-v3",
  "services-preview-v3",
  "meet-the-doctors-v3",
  "why-choose-us-v3",
  "what-to-expect-v3",
  "patient-resources-v3",
  "featured-testimonial-v3",
  "short-testimonials-v2",
  "visit-us-v3",
  "faq-v3",
  "promo-banner",
];

/** Default order of home sections. Use this or override in siteConfig.homeSections. */
export function getHomeSectionIds(
  override?: readonly HomeSectionId[]
): readonly HomeSectionId[] {
  if (override && override.length > 0) return override;
  return HOME_SECTION_IDS;
}