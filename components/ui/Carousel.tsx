"use client";

import { useRef, useCallback } from "react";
import { siteConfig } from "@/config/site";

const DEFAULT_GAP = 24;

export interface CarouselProps {
  children: React.ReactNode;
  /** Gap between slides in px. */
  gap?: number;
  /** Scroll container aria-label. */
  ariaLabel?: string;
  /** Previous button aria-label. */
  prevAriaLabel?: string;
  /** Next button aria-label. */
  nextAriaLabel?: string;
  /** Optional extra classes for prev/next buttons. */
  buttonClassName?: string;
  /** Optional style override for prev/next buttons. */
  buttonStyle?: React.CSSProperties;
  /** Optional class for the scrollable track. */
  trackClassName?: string;
}

export default function Carousel({
  children,
  gap = DEFAULT_GAP,
  ariaLabel = "Carousel",
  prevAriaLabel = "Previous",
  nextAriaLabel = "Next",
  buttonClassName = "flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition hover:opacity-90 active:scale-95 disabled:opacity-40",
  buttonStyle,
  trackClassName,
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback(
    (direction: "prev" | "next") => {
      const el = scrollRef.current;
      if (!el) return;
      const slideWidth =
        el
          .querySelector("[data-carousel-slide]")
          ?.getBoundingClientRect().width ?? el.clientWidth;
      el.scrollBy({
        left: direction === "next" ? slideWidth + gap : -(slideWidth + gap),
        behavior: "smooth",
      });
    },
    [gap],
  );

  const trackClasses =
    trackClassName ??
    "flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2";

  return (
    <div className="relative">
      <style>{`.carousel-hide-scrollbar::-webkit-scrollbar{display:none}`}</style>

      <div
        ref={scrollRef}
        className={`${trackClasses} carousel-hide-scrollbar`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        aria-label={ariaLabel}
        role="region"
      >
        {children}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scroll("prev")}
          aria-label={prevAriaLabel}
          className={buttonClassName}
          style={
            buttonStyle ?? {
              backgroundColor: siteConfig.branding.colors.accent.primary,
            }
          }
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => scroll("next")}
          aria-label={nextAriaLabel}
          className={buttonClassName}
          style={
            buttonStyle ?? {
              backgroundColor: siteConfig.branding.colors.accent.primary,
            }
          }
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/** Wrapper for a single carousel slide. Must be a direct child of Carousel. */
export function CarouselSlide({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-carousel-slide className={className}>
      {children}
    </div>
  );
}
