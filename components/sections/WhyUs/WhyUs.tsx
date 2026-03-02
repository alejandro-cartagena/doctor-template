import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80";

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

const defaultPoints = [
  {
    title: "Physicians who listen",
    description:
      "We take time to understand your concerns before reaching conclusions.",
  },
  {
    title: "Credentials that matter",
    description:
      "Board certification and ongoing training keep our practice current.",
  },
  {
    title: "Medicine without the rush",
    description:
      "Appointments scheduled so we can give you the attention you need.",
  },
];

interface WhyUsProps {
  label?: string;
  heading?: string;
  subheading?: string;
  imageUrl?: string;
  points?: Array<{ title: string; description: string }>;
  learnHref?: string;
  learnLabel?: string;
  linkLabel?: string;
  linkHref?: string;
}

export default function WhyUs({
  label = "Why choose us",
  heading = "Why choose us",
  subheading = "Experience, credentials, and a care approach that puts you first.",
  imageUrl = DEFAULT_IMAGE,
  points = defaultPoints,
  learnHref = "/#about",
  learnLabel = "Learn",
  linkLabel = "About us",
  linkHref = "/#about",
}: WhyUsProps) {
  const c = siteConfig.branding.colors;

  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className=""
      style={{ backgroundColor: c.background.secondary }}
    >
      {/* Mobile: flex column (heading → image → content). LG: grid 2 cols, image full height left, header+content right */}
      <div className="flex flex-col lg:grid lg:min-h-[420px] lg:grid-cols-2 lg:grid-rows-[auto_1fr]">
        {/* 1. Header — mobile first, lg: top of right column */}
        <div className="order-1 py-8 sm:py-10 lg:col-start-2 lg:row-start-1 lg:py-12 lg:pt-14 lg:pb-0">
          <Container className="px-6 sm:px-10 lg:px-14">
            <p
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: c.text.secondary }}
            >
              {label}
            </p>
            <h2
              id="why-choose-us-heading"
              className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: c.text.primary }}
            >
              {heading}
            </h2>
            <p
              className="mt-3 text-base leading-relaxed sm:text-lg"
              style={{ color: c.text.secondary }}
            >
              {subheading}
            </p>
          </Container>
        </div>

        {/* 2. Image — mobile second, lg: left column, full height of section */}
        <div className="relative order-2 aspect-[4/3] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:min-h-0 lg:h-full bg-neutral-300">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 60vw"
            priority={false}
          />
        </div>

        {/* 3. Points + CTAs — mobile third, lg: bottom of right column */}
        <div className="order-3 flex flex-col justify-center py-8 sm:py-10 lg:col-start-2 lg:row-start-2 lg:max-w-2xl lg:py-12 lg:pt-6 lg:pb-14">
          <Container className="px-6 sm:px-10 lg:px-14">
            <ul className="mt-10 space-y-8 lg:mt-6" role="list">
              {points.map((point) => (
                <li key={point.title} className="flex gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center text-black"
                    aria-hidden
                  >
                    <CubeIcon className="h-8 w-8" />
                  </span>
                  <div>
                    <h3
                      className="text-lg font-bold leading-snug sm:text-xl"
                      style={{ color: c.text.primary }}
                    >
                      {point.title}
                    </h3>
                    <p
                      className="mt-2 text-base leading-relaxed"
                      style={{ color: c.text.secondary }}
                    >
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={learnHref}
                className="inline-flex items-center justify-center rounded-md border-2 px-5 py-2.5 text-sm font-semibold transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
                style={{
                  borderColor: c.text.primary,
                  backgroundColor: c.background.primary,
                  color: c.text.primary,
                }}
              >
                {learnLabel}
              </Link>
              <Link
                href={linkHref}
                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
                style={{ color: c.text.primary }}
              >
                {linkLabel}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
