import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

function CubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const defaultServices = [
  {
    title: "Comprehensive primary care for all ages",
    description:
      "From routine checkups to chronic disease management, we handle the foundation of your health.",
    ctaLabel: "Explore",
    href: "/#services",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
  {
    title: "Specialized diagnostics and advanced treatment options",
    description:
      "When you need more than routine care, we have the expertise.",
    ctaLabel: "Learn more",
    href: "/#services",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
  },
  {
    title: "Preventive health screenings and wellness planning",
    description:
      "Staying healthy beats treating illness. We help you get ahead.",
    ctaLabel: "Explore",
    href: "/#services",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
  },
  {
    title: "Thorough evaluation and accurate diagnosis",
    description:
      "We start by understanding what brought you in, then conduct a careful examination to identify the real problem.",
    ctaLabel: "Learn",
    href: "/#services",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80",
  },
  {
    title: "Chronic condition management",
    description:
      "Ongoing support and evidence-based plans to keep you at your best.",
    ctaLabel: "Explore",
    href: "/#services",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&q=80",
  },
  {
    title: "Minor procedures and in-office care",
    description:
      "Many treatments can be done in the office with minimal downtime.",
    ctaLabel: "Learn more",
    href: "/#services",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
  },
  {
    title: "Follow-up visits and care coordination",
    description:
      "We stay with you through recovery and coordinate with specialists when needed.",
    ctaLabel: "Explore",
    href: "/#services",
    image: "https://images.unsplash.com/photo-1579154204200-7d1f28b3d2b2?w=800&q=80",
  },
  {
    title: "Skin conditions and cosmetic care",
    description:
      "Medical and cosmetic dermatology tailored to your skin and goals.",
    ctaLabel: "Learn",
    href: "/#services",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
  },
];

interface ServiceCardProps {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  image?: string;
}

function ServiceCard({ title, description, ctaLabel, href, image }: ServiceCardProps) {
  const c = siteConfig.branding.colors;
  return (
    <article
      className="relative flex flex-col overflow-hidden rounded-lg p-6 transition-opacity hover:opacity-95 focus-within:opacity-95 sm:p-7 min-h-[280px]"
      style={{ color: c.text.inverse }}
    >
      {/* Background image */}
      {image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden
          />
          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}
            aria-hidden
          />
        </>
      )}
      {/* Fallback when no image: use accent color */}
      {!image && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: c.accent.primary }}
          aria-hidden
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col">
        <span
          className="mb-4 flex h-10 w-10 items-center justify-center opacity-90"
          style={{ color: c.text.inverse }}
        >
          <CubeIcon className="h-8 w-8" />
        </span>
        <h3 className="text-lg font-bold leading-snug sm:text-xl">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed opacity-95 sm:text-base">
          {description}
        </p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold opacity-95 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50 rounded"
          style={{ color: c.text.inverse }}
        >
          {ctaLabel}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

interface ServicesProps {
  label?: string;
  heading?: string;
  subheading?: string;
  services?: Array<{
    title: string;
    description: string;
    ctaLabel: string;
    href: string;
    image?: string;
  }>;
}

export default function Services({
  label = "Services",
  heading = "What we treat",
  subheading = "Comprehensive care across multiple specialties",
  services = defaultServices,
}: ServicesProps) {
  const c = siteConfig.branding.colors;
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: c.background.primary }}
    >
      <Container>
        <header className="mx-auto max-w-2xl text-center">
          <p
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: c.text.secondary }}
          >
            {label}
          </p>
          <h2
            id="services-heading"
            className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
            style={{ color: c.text.primary }}
          >
            {heading}
          </h2>
          <p
            className="mt-3 text-base sm:text-lg"
            style={{ color: c.text.secondary }}
          >
            {subheading}
          </p>
        </header>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {services.slice(0, 8).map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              ctaLabel={service.ctaLabel}
              href={service.href}
              image={service.image}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
