"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { useEffect, useRef, useState } from "react";

type Stat = {
  label: string;
  value: string;
};

interface HeroV3Props {
  titleLines?: string[];
  description?: string;
  rating?: number;
  reviewCount?: number;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  stats?: Stat[];
  backgroundImageUrl?: string;
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const defaultTitle = ["Expert care for your", "health first"];

const defaultDescription =
  "Welcome to MD—your partner in health. Our team delivers trusted care and advanced medical solutions for your well-being.";

const defaultStats: Stat[] = [
  { label: "Patient care", value: "45+" },
  { label: "Medical team", value: "174" },
  { label: "Years in service", value: "22" },
  { label: "Care locations", value: "365+" },
];

const defaultBackgroundImage =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1920&q=80&auto=format&fit=crop";

const DURATION_MS = 1200;
const EASE_OUT = (t: number) => 1 - (1 - t) * (1 - t);

function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(\+?)$/);
  if (!match) return { num: 0, suffix: "" };
  return { num: parseInt(match[1], 10), suffix: match[2] ?? "" };
}

export default function HeroV3({
  titleLines = defaultTitle,
  description = defaultDescription,
  rating = siteConfig.rating ?? 4.9,
  reviewCount = siteConfig.reviewCount ?? 327,
  primaryCtaLabel = "Book a Visit",
  primaryCtaHref = siteConfig.bookingUrl || "/#contact",
  secondaryCtaLabel = "Our Services",
  secondaryCtaHref = "/#services",
  stats = defaultStats,
  backgroundImageUrl = defaultBackgroundImage,
}: HeroV3Props) {
  const { colors } = siteConfig.branding;
  const statsCardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [displayValues, setDisplayValues] = useState<number[]>([]);

  const statTargets = stats.slice(0, 4).map((s) => parseStatValue(s.value));

  useEffect(() => {
    const el = statsCardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { threshold: 0.2, rootMargin: "0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || displayValues.length > 0) return;
    const targets = statTargets.map((t) => t.num);
    setDisplayValues(targets.map(() => 0));
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION_MS, 1);
      const eased = EASE_OUT(t);
      setDisplayValues(targets.map((num) => Math.round(num * eased)));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView]);

  const showAnimated = inView && displayValues.length === statTargets.length;

  return (
    <section
      aria-label="Hero"
      className="relative isolate overflow-hidden min-h-screen"
    >
      {/* Full-bleed doctor background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        aria-hidden="true"
      />

      {/* Left-to-right dark gradient so content stays readable */}
      <div
        className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/70 to-slate-900/20"
        aria-hidden="true"
      />

      {/* Bottom vignette for grounding */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-slate-950/60 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex min-h-screen flex-col justify-center pb-28 pt-36 lg:pb-32 lg:pt-44">
        {/* Left content */}
        <div className="max-w-xl space-y-8">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium uppercase tracking-[0.2em]"
            style={{
              borderColor: "rgba(255,255,255,0.2)",
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <svg
              className="h-4 w-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ color: colors.accent.primary }}
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            {siteConfig.specialty} care
          </span>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block">{titleLines[0] ?? ""}</span>
            <span
              className="block"
              style={{ color: colors.accent.primary }}
            >
              {titleLines[1] ?? ""}
            </span>
            {titleLines[2] && (
              <span className="block text-white">{titleLines[2]}</span>
            )}
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            {description}
          </p>

          {/* Google review section */}
          {(rating != null || reviewCount != null) && (
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} className="h-5 w-5 text-amber-400 sm:h-6 sm:w-6" />
                ))}
              </div>
              <span className="text-sm font-medium text-white sm:text-base">
                {rating}
                {reviewCount != null && (
                  <span className="ml-1 font-normal text-white/60">
                    ({reviewCount}+ reviews)
                  </span>
                )}
              </span>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Button
              href={primaryCtaHref}
              variant="default"
              className="h-13 min-w-[160px] rounded-full px-9 text-base shadow-md shadow-black/30 sm:text-lg"
            >
              {primaryCtaLabel}
            </Button>
            <Button
              href={secondaryCtaHref}
              variant="highlight"
              className="h-13 min-w-[160px] rounded-full px-9 text-base shadow-md shadow-black/30 sm:text-lg"
            >
              {secondaryCtaLabel}
            </Button>
          </div>

          {/* Doctor office highlights */}
          <div className="flex flex-wrap items-center gap-6 gap-y-3 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-rose-500/90 text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </span>
              <span className="font-medium text-white/90">24/7 Emergency</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/90 text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <span className="font-medium text-white/90">Licensed & Insured</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-sky-500/90 text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span className="font-medium text-white/90">Patient-Centered Care</span>
            </span>
          </div>
        </div>

        {/* Stats card — pinned to bottom of section */}
        <div
          ref={statsCardRef}
          className="mt-16 w-full max-w-sm sm:max-w-md lg:absolute lg:bottom-20 lg:right-10 lg:mt-0 lg:max-w-[460px]"
        >
          <div className="grid grid-cols-2 gap-3">
            {stats.slice(0, 4).map((stat, i) => {
              const { suffix } = statTargets[i] ?? { suffix: "" };
              const value = showAnimated
                ? `${displayValues[i] ?? 0}${suffix}`
                : stat.value;
              return (
                <div
                  key={stat.label}
                  className="space-y-2 rounded-2xl bg-white px-6 py-5"
                >
                  <div
                    className="text-4xl font-bold tabular-nums sm:text-5xl"
                    style={{ color: colors.accent.primary }}
                  >
                    {value}
                  </div>
                  <div className="text-sm font-medium" style={{ color: colors.text.primary }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
