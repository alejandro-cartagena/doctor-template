import type { HomeSectionId } from "@/config/sections";

/**
 * AJILE Development — Medical Practice Template
 * BUSINESS INFO ONLY: Edit this file per client.
 * Update practice name, specialty, services, address, hours, and providers.
 *
 * To override home section order: set homeSections to an array of section IDs.
 * To change navbar/footer variants: edit src/config/sections.ts.
 */

export const siteConfig = {
  /**
   * Optional: override default home page sections.
   */
  homeSections: undefined as readonly HomeSectionId[] | undefined,

  /** Practice name */
  businessName: "Miami Medical",

  /**
   * Medical specialty (used in hero + meta)
   * Examples: Dermatology, Psychiatry, Urology, Primary Care, Pediatrics
   */
  specialty: "Dermatology",

  /**
   * Logo path from public/ or full URL.
   * Leave empty to display practice name as text.
   */
  logoUrl: "" as string,

  /** City or service area */
  locationName: "Miami Beach",

  /** Optional review badge */
  rating: 4.9 as number | undefined,
  reviewCount: 214 as number | undefined,

  /** Short tagline (hero section) */
  tagline:
    "Comprehensive, patient-centered dermatology care in Miami Beach.",

  /** Meta description / About preview */
  shortDescription:
    "Board-certified dermatology clinic providing medical, surgical, and cosmetic skin care in Miami Beach, Florida.",

  /** Year established */
  foundedYear: 2012 as number | undefined,

  /** Years of combined provider experience */
  yearsExperience: 35 as number | undefined,

  /** Physical address */
  address: {
    line1: "123 Biscayne Blvd",
    city: "Miami Beach",
    state: "FL",
    zip: "33141",
  },

  /** Contact information */
  phone: "(305) 555-4821",
  email: "info@coastalmedicalgroup.com",

  /** Optional parking info */
  parkingInfo: "Free parking available behind the building.",

  /** Navigation */
  navigation: [
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Providers", href: "/#providers" },
    { label: "New Patients", href: "/#new-patients" },
    { label: "Contact", href: "/#contact" },
  ],

  /** Office hours */
  hours: {
    monday: "8:00 AM – 5:00 PM",
    tuesday: "8:00 AM – 5:00 PM",
    wednesday: "8:00 AM – 5:00 PM",
    thursday: "8:00 AM – 5:00 PM",
    friday: "8:00 AM – 4:00 PM",
    saturday: "Closed",
    sunday: "Closed",
  },

  /** Insurance accepted preview (optional — show on home page) */
  acceptedInsurance: [
    "Aetna",
    "Blue Cross Blue Shield",
    "Cigna",
    "UnitedHealthcare",
    "Medicare",
  ] as string[],

  /** Social links */
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  },

  /**
   * Online booking URL.
   * If empty, site will default to contact form / call CTA.
   */
  bookingUrl: "",

  /** Optional embed calendar */
  calendarEmbedUrl: "",

  branding: {
    colors: {
      background: {
        primary: "#FFFFFF",
        secondary: "#F3FBFC", // very light teal tint (for subtle section bg)
      },
      text: {
        primary: "#0F172A",   // slate-900
        secondary: "#475569", // slate-600
        inverse: "#FFFFFF",
      },
      accent: {
        primary: "#2AA6B6",   // teal similar to screenshot buttons/icons
        hover: "#238D9B",     // darker teal for hover
      },
      border: "#DCECF0", // slightly teal-leaning border
    },
  },

  /**
   * Providers / Doctors
   * Add or remove as needed.
   */
  team: [
    {
      name: "Dr. Sarah Mitchell",
      role: "Board-Certified Dermatologist",
      credentials: "MD, FAAD",
      imageUrl: "",
    },
    {
      name: "Dr. James Carter",
      role: "Dermatologist",
      credentials: "MD",
      imageUrl: "",
    },
  ] as {
    name: string;
    role: string;
    credentials?: string;
    imageUrl?: string;
  }[],
} as const;

/**
 * Service IDs
 * Must match keys in messages > services.
 * Keep these generic so template works across specialties.
 */
export const serviceIds = [
  "general-consultation",
  "preventive-care",
  "diagnostic-testing",
  "chronic-condition-management",
  "minor-procedures",
  "follow-up-visits",
] as const;



export type ServiceId = (typeof serviceIds)[number];
export type SiteConfig = typeof siteConfig;