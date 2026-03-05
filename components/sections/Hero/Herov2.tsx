"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { useEffect, useRef, useState } from "react";

type Stat = {
  label: string;
  value: string;
};

interface HeroV2Props {
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

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(\+?)$/);
  if (!match) return { num: 0, suffix: "" };
  return { num: parseInt(match[1], 10), suffix: match[2] ?? "" };
}

export default function HeroV2({
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
}: HeroV2Props) {
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
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: colors.background.primary }}
    >
      {/* Bottom-left accent gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to top right, ${hexToRgba(colors.accent.primary, 0.18)} 0%, ${hexToRgba(colors.accent.primary, 0)} 55%)`,
        }}
        aria-hidden="true"
      />

      <Container className="relative grid min-h-screen items-center gap-12 pb-16 pt-36 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] lg:pb-20 lg:pt-44">

        {/* Left content */}
        <div className="relative z-10 max-w-xl space-y-8 text-left">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium uppercase tracking-[0.2em]"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.background.secondary,
              color: colors.text.secondary,
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

          <h1
            className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ color: colors.text.primary }}
          >
            <span className="block">{titleLines[0] ?? ""}</span>
            <span className="block">{titleLines[1] ?? ""}</span>
            {titleLines[2] && (
              <span className="block">{titleLines[2] ?? ""}</span>
            )}
          </h1>

          <p
            className="max-w-lg text-base leading-relaxed sm:text-lg"
            style={{ color: colors.text.secondary }}
          >
            {description}
          </p>

          {/* Google review section */}
          {(rating != null || reviewCount != null) && (
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 text-amber-400 sm:h-6 sm:w-6"
                  />
                ))}
              </div>
              <span
                className="text-sm font-medium sm:text-base"
                style={{ color: colors.text.primary }}
              >
                {rating}
                {reviewCount != null && (
                  <span
                    className="ml-1 font-normal"
                    style={{ color: colors.text.secondary }}
                  >
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
              className="h-13 min-w-[160px] rounded-full px-9 text-base shadow-md shadow-black/20 sm:text-lg"
            >
              {primaryCtaLabel}
            </Button>
            <Button
              href={secondaryCtaHref}
              variant="highlight"
              className="h-13 min-w-[160px] rounded-full px-9 text-base shadow-md shadow-black/20 sm:text-lg"
            >
              {secondaryCtaLabel}
            </Button>
          </div>

          {/* Doctor office highlights */}
          <div
            className="flex flex-wrap items-center gap-6 gap-y-3 text-sm"
            style={{ color: colors.text.secondary }}
          >
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-rose-500/90 text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </span>
              <span className="font-medium">24/7 Emergency</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/90 text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <span className="font-medium">Licensed & Insured</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-sky-500/90 text-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span className="font-medium">Patient-Centered Care</span>
            </span>
          </div>
        </div>

        {/* Right visual column */}
        <div className="relative flex h-[380px] w-full items-stretch sm:h-[440px] md:h-[520px] lg:h-[560px]">
          {/* Main doctor image */}
          <div className="relative h-full w-full overflow-hidden rounded-3xl bg-slate-100 shadow-2xl ring-1 ring-black/5 lg:ml-auto lg:max-w-md">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImageUrl})` }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-slate-900/0 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Stats card cluster */}
          <div
            ref={statsCardRef}
            className="absolute -bottom-8 right-4 z-20 w-[300px] rounded-3xl bg-white/95 p-4 text-slate-900 shadow-2xl backdrop-blur sm:right-8 md:w-[300px]"
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
                    className="space-y-1 rounded-xl bg-slate-50 p-3"
                  >
                    <div className="text-lg font-semibold sm:text-3xl tabular-nums" style={{ color: colors.accent.primary }}>
                      {value}
                    </div>
                    <div className="text-xs font-medium uppercase tracking-wide" style={{ color: colors.text.primary }}>
                      {stat.label}
                    </div>
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