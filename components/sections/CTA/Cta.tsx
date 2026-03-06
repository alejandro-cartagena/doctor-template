import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const CARD_H = 260; // px — visible card height
const IMG_H = 520;  // px — doctor image height (overflows top by IMG_H - CARD_H)
const OVERFLOW = IMG_H - CARD_H; // ~260 px of head above card

export default function Cta() {
  const { branding, bookingUrl, phone } = siteConfig;
  const { colors } = branding;

  const ctaHref = bookingUrl || `tel:${phone}`;

  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: colors.background.primary }}
    >
      <div className="w-full">
        <div
          className="relative flex items-center overflow-visible"
          style={{
            backgroundColor: colors.accent.primary,
            minHeight: `${CARD_H}px`,
          }}
        >
          {/* Decorative dot grid — left half */}
          <svg
            className="absolute inset-0 h-full w-1/2 opacity-[0.12]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="cta-dots"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-dots)" />
          </svg>

          {/* Doctor image — pinned to bottom, head overflows above card */}
          <div
            className="pointer-events-none absolute bottom-0 left-6 hidden select-none md:block lg:left-10"
            style={{ height: `${IMG_H}px`, width: 360, marginTop: `-${OVERFLOW}px` }}
          >
            <Image
              src="/images/doctor-bg-remove.png"
              alt="Doctor"
              fill
              sizes="360px"
              className="object-contain object-bottom drop-shadow-lg"
              priority
            />
          </div>

          {/* CTA content — truly centered across the full site width */}
          <div className="relative z-10 flex w-full flex-col items-center gap-8 py-14 text-center">
            <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.35)" }}>
              Begin your path
              <br /> to better health today
            </h2>

            <Link
              href={ctaHref}
              className="shrink-0 rounded-full bg-white px-10 py-4 text-base font-semibold shadow-md transition-colors duration-200 hover:bg-slate-100"
              style={{ color: colors.accent.primary }}
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
