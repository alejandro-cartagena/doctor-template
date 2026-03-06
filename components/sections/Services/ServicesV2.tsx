"use client";

import Link from "next/link";
import {
  Stethoscope,
  Syringe,
  Ribbon,
  HeartPulse,
  FlaskConical,
  Bandage,
  Check,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

const c = siteConfig.branding.colors;

const SECTION_BG = "#EDF5FB";
const ICON_BG = "#E4EEF6";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  href: string;
}

const defaultServices: ServiceItem[] = [
  {
    icon: Stethoscope,
    title: "General checkups",
    description: "Routine health assessments for prevention and early diagnosis.",
    features: ["Blood pressure checks", "Cholesterol screening", "Weight management"],
    href: "/#services",
  },
  {
    icon: Syringe,
    title: "Pediatric care",
    description: "Medical services tailored for infants, children, and adolescents.",
    features: ["Growth tracking", "Nutrition guidance", "Parental support"],
    href: "/#services",
  },
  {
    icon: Ribbon,
    title: "Women's health",
    description: "Care for women's health needs, from routine exams to specialized support.",
    features: ["Family planning", "Hormonal testing", "Breast exams"],
    href: "/#services",
  },
  {
    icon: HeartPulse,
    title: "Men's health",
    description: "Preventative and diagnostic care for men's unique health needs.",
    features: ["Heart screening", "Stress management", "Fitness advice"],
    href: "/#services",
  },
  {
    icon: FlaskConical,
    title: "Diagnostic testing",
    description: "Fast, accurate results for informed medical decisions.",
    features: ["Full blood tests", "Imaging referrals", "Allergy tests"],
    href: "/#services",
  },
  {
    icon: Bandage,
    title: "Minor procedures",
    description: "On-site treatments that don't require hospital visits.",
    features: ["Wound care", "Skin biopsies", "Wart removal"],
    href: "/#services",
  },
];

interface ServicesV2Props {
  sectionLabel?: string;
  headingAccent?: string;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  items?: ServiceItem[];
}

export default function ServicesV2({
  sectionLabel = "What We Do",
  headingAccent = "General",
  heading = "health services",
  subheading =
    "We offer a complete range of medical services designed to support your health, from routine checkups to specialized treatments.",
  ctaLabel = "View all services",
  ctaHref = "/#services",
  items = defaultServices,
}: ServicesV2Props) {
  return (
    <section
      id="services-v2"
      aria-labelledby="services-v2-heading"
      style={{ backgroundColor: SECTION_BG }}
      className="py-16 sm:py-20 lg:py-24"
    >
      <Container>
        {/* ── Header row ── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-12 lg:mb-16">
          {/* Left: label + heading */}
          <div className="shrink-0">
            <p
              className="text-center sm:text-left text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: c.accent.primary }}
            >
              {sectionLabel}
            </p>
            <h2
              id="services-v2-heading"
              className="text-center sm:text-left text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: c.text.primary }}
            >
              <span style={{ color: c.accent.primary }}>{headingAccent}</span>{" "}
              {heading}
            </h2>
          </div>

          {/* Right: CTA */}
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-semibold rounded transition-colors whitespace-nowrap shrink-0 self-center lg:self-auto"
            style={{ backgroundColor: c.accent.primary, color: c.text.inverse }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = c.accent.hover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = c.accent.primary;
            }}
          >
            {ctaLabel}
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="flex flex-col gap-5 rounded-xl p-6"
                style={{
                  backgroundColor: c.background.primary,
                  border: `1px solid ${c.border}`,
                  transition: "box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = `0 8px 32px 0 ${c.accent.primary}33, 0 2px 8px 0 ${c.accent.primary}1A`;
                  el.style.borderColor = `${c.accent.primary}66`;
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "none";
                  el.style.borderColor = c.border;
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-20 h-20 rounded-lg"
                  style={{ backgroundColor: ICON_BG }}
                >
                  <Icon
                    size={40}
                    strokeWidth={1.5}
                    style={{ color: c.accent.primary }}
                  />
                </div>

                {/* Title + description */}
                <div>
                  <h3
                    className="text-xl font-bold mb-1.5"
                    style={{ color: c.text.primary }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: c.text.secondary }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Feature checklist */}
                <ul className="flex flex-col gap-2">
                  {service.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2 text-base font-semibold"
                      style={{ color: c.text.secondary }}
                    >
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        style={{ color: c.accent.primary, flexShrink: 0 }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Learn more link */}
                <div
                  className="mt-auto pt-4"
                  style={{ borderTop: `1px solid ${c.border}` }}
                >
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors"
                    style={{
                      color: c.accent.primary,
                      borderColor: c.border,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.backgroundColor = ICON_BG;
                      el.style.borderColor = c.accent.primary;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.backgroundColor = "transparent";
                      el.style.borderColor = c.border;
                    }}
                  >
                    Learn more
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
