import Image from "next/image";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

const c = siteConfig.branding.colors;

interface MainDoctorProps {
  eyebrow?: string;
  headingWord?: string;
  headingAccent?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export default function MainDoctor({
  eyebrow,
  headingWord = "OUR",
  headingAccent = "DOCTOR",
  description,
  imageUrl = "/images/doctor-ka.png",
  imageAlt,
}: MainDoctorProps) {
  const doctor = siteConfig.team[0];
  const resolvedEyebrow = eyebrow ?? doctor?.name ?? "Our Lead Physician";
  const resolvedAlt = imageAlt ?? resolvedEyebrow;
  const resolvedDescription =
    description ??
    `${resolvedEyebrow} is dedicated to providing patients with the best possible care. At ${siteConfig.businessName} we are focused on helping you. After years of delivering successful outcomes for ${siteConfig.specialty.toLowerCase()} conditions, ${doctor?.name.split(" ")[1] ?? "our doctor"} found a calling to help others achieve lasting health and confidence.`;

  return (
    <section
      id="main-doctor"
      aria-labelledby="main-doctor-heading"
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: "#e8f4f7" }}
    >
      {/* Left-to-right gradient — same layering as HeroV3, light palette */}
      <div
        className="absolute inset-0 bg-linear-to-r from-sky-100/95 via-sky-50/75 to-transparent"
        aria-hidden="true"
      />

      {/* Bottom vignette — mirrors HeroV3 */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-sky-100/70 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid min-h-[420px] items-end lg:grid-cols-[1fr_auto]">
          {/* ── Left: text content ── */}
          <div className="flex flex-col justify-center py-16 pr-8 sm:py-20 lg:py-24">
            {/* Eyebrow */}
            <p
              className="text-sm font-medium tracking-wide"
              style={{ color: c.text.secondary }}
            >
              {resolvedEyebrow}
            </p>

            {/* Decorative divider */}
            <div
              className="mt-2 mb-5 h-px w-10"
              style={{ backgroundColor: c.accent.primary }}
              aria-hidden="true"
            />

            {/* Heading */}
            <h2
              id="main-doctor-heading"
              className="text-5xl font-black uppercase tracking-wide sm:text-6xl lg:text-7xl"
              style={{ color: c.text.primary }}
            >
              {headingWord}{" "}
              <span style={{ color: c.accent.primary }}>{headingAccent}</span>
            </h2>

            {/* Description */}
            <p
              className="mt-6 max-w-md text-base leading-relaxed sm:text-lg"
              style={{ color: c.text.secondary }}
            >
              {resolvedDescription}
            </p>

            {/* Signature */}
            <div className="mt-8" aria-hidden="true">
              <SignatureSvg />
            </div>
          </div>

          {/* ── Right: doctor image ── */}
          <div className="hidden self-end lg:block">
            <div className="relative" style={{ width: 440, height: 500 }}>
              <Image
                src={imageUrl}
                alt={resolvedAlt}
                fill
                className="object-contain object-bottom"
                sizes="440px"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SignatureSvg() {
  return (
    <svg
      width="140"
      height="56"
      viewBox="0 0 140 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 42 C8 30 14 18 22 24 C30 30 27 44 36 38 C45 32 42 16 52 20 C62 24 58 40 68 34 C78 28 74 14 84 18 C94 22 96 36 106 30 C116 24 118 14 128 18 C134 21 136 30 138 26"
        stroke="rgba(15,23,42,0.65)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 50 C28 47 54 49 78 47"
        stroke="rgba(15,23,42,0.35)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
