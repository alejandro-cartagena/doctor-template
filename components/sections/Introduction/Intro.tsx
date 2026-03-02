import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80";

const features = [
  {
    icon: CheckCircleIcon,
    text: "Board-certified physicians with decades of combined experience",
  },
  {
    icon: BrainIcon,
    text: "Evidence-based treatments tailored to your individual needs",
  },
  {
    icon: HandshakeIcon,
    text: "Compassionate care that respects your time and concerns",
  },
];

function CheckCircleIcon({ className }: { className?: string }) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function BrainIcon({ className }: { className?: string }) {
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
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.74 2.5 2.5 0 0 1-2.96-3.23A2.5 2.5 0 0 1 5.5 17H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h1.5" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.74 2.5 2.5 0 0 0 2.96-3.23 2.5 2.5 0 0 0 2.58-3.57H20a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1.5" />
    </svg>
  );
}

function HandshakeIcon({ className }: { className?: string }) {
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
      <path d="M11 8v4a2 2 0 0 0 2 2h4" />
      <path d="M15 10h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4" />
      <path d="M9 16v-4a2 2 0 0 1-2-2H3a2 2 0 0 1 2-2h4" />
      <path d="M13 16h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4" />
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

interface IntroProps {
  welcomeLabel?: string;
  heading?: string;
  description?: string;
  aboutHref?: string;
  aboutLabel?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export default function Intro({
  welcomeLabel = "Welcome",
  heading = "A practice built on experience and integrity",
  description,
  aboutHref = "/#about",
  aboutLabel = "About",
  imageUrl = DEFAULT_IMAGE,
  imageAlt,
}: IntroProps) {
  const c = siteConfig.branding.colors;
  const copy =
    description ||
    "We've spent years refining our approach to medicine. It starts with listening to what matters most to you, then applying our expertise to find the right path forward.";

  return (
    <section
      id="about"
      aria-labelledby="intro-heading"
      className="py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: c.background.primary }}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left: content */}
          <div className="flex flex-col">
            <p
              className="mb-3 text-sm font-semibold uppercase tracking-wider"
              style={{ color: c.accent.primary }}
            >
              {welcomeLabel}
            </p>
            <h2
              id="intro-heading"
              className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl"
              style={{ color: c.text.primary }}
            >
              {heading}
            </h2>
            <p
              className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: c.text.secondary }}
            >
              {copy}
            </p>

            <ul className="mt-8 space-y-4" role="list">
              {features.map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center"
                    style={{ color: c.accent.primary }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className="text-base leading-snug"
                    style={{ color: c.text.secondary }}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={aboutHref}
                className="inline-flex h-11 items-center justify-center rounded-md border px-5 font-semibold transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  borderColor: c.border,
                  backgroundColor: c.background.primary,
                  color: c.text.primary,
                }}
              >
                {aboutLabel}
              </Link>
              <Link
                href={aboutHref}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ color: c.accent.primary }}
              >
                <span className="sr-only">Learn more</span>
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-square lg:min-h-[400px]">
            <Image
              src={imageUrl}
              alt={imageAlt ?? `${siteConfig.businessName} – ${siteConfig.specialty}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
