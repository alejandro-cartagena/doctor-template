"use client";

import { siteConfig } from "@/config/site";

// ── Types ─────────────────────────────────────────────────────────────────────

interface GoogleReview {
  id: string;
  name: string;
  initials: string;
  rating: number;
  timeAgo: string;
  text: string;
}

// ── Review data ───────────────────────────────────────────────────────────────

const reviewsRow1: GoogleReview[] = [
  {
    id: "1",
    name: "Jennifer S.",
    initials: "JS",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "Dr. Mitchell was incredibly thorough and attentive. She took the time to explain everything clearly and I felt genuinely cared for. My skin has improved dramatically since starting treatment.",
  },
  {
    id: "2",
    name: "Marcus T.",
    initials: "MT",
    rating: 5,
    timeAgo: "1 month ago",
    text: "Best dermatology practice I've ever visited. The staff is welcoming from the moment you walk in. Dr. Carter diagnosed my condition quickly and the treatment worked perfectly.",
  },
  {
    id: "3",
    name: "Priya R.",
    initials: "PR",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "I came in for a cosmetic consultation and left feeling so confident about my treatment plan. The team is honest, knowledgeable, and never pushy. The results have been amazing.",
  },
  {
    id: "4",
    name: "Daniel F.",
    initials: "DF",
    rating: 5,
    timeAgo: "2 months ago",
    text: "Incredible experience from start to finish. Scheduling was easy, wait time was minimal, and Dr. Mitchell was extremely professional. She caught something on my skin I had been ignoring for years. Grateful.",
  },
  {
    id: "5",
    name: "Camille V.",
    initials: "CV",
    rating: 5,
    timeAgo: "5 weeks ago",
    text: "I've been coming here for two years and every single visit has been exceptional. The staff remembers you and genuinely cares about your progress. I wouldn't trust my skin to anyone else.",
  },
];

const reviewsRow2: GoogleReview[] = [
  {
    id: "6",
    name: "Omar H.",
    initials: "OH",
    rating: 5,
    timeAgo: "1 week ago",
    text: "Very professional team with a warm bedside manner. My teenage son had severe acne and after just a few months the improvement has been remarkable. The whole family now comes here.",
  },
  {
    id: "7",
    name: "Sophia L.",
    initials: "SL",
    rating: 5,
    timeAgo: "3 months ago",
    text: "Went in for a full-body skin check and was blown away by how thorough and reassuring the experience was. Dr. Mitchell walked me through every step. I left with total peace of mind.",
  },
  {
    id: "8",
    name: "Rafael M.",
    initials: "RM",
    rating: 5,
    timeAgo: "6 weeks ago",
    text: "Struggled with rosacea for years before finding this practice. After two visits I had a real diagnosis and a treatment plan that's actually working. Can't recommend them enough.",
  },
  {
    id: "9",
    name: "Aisha K.",
    initials: "AK",
    rating: 5,
    timeAgo: "2 months ago",
    text: "The front desk staff is so kind and the office is spotless. Dr. Carter has an amazing way of making you feel comfortable. My eczema is finally under control after years of trying other clinics.",
  },
  {
    id: "10",
    name: "Thomas B.",
    initials: "TB",
    rating: 5,
    timeAgo: "4 weeks ago",
    text: "Same-day appointment was available when I needed it most. Turns out I had a minor lesion that needed attention — they caught it early. This team is the reason I stay on top of my skin health.",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function GoogleLogo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google"
      role="img"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          // biome-ignore lint/suspicious/noArrayIndexKey: static list
          key={i}
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill={i < rating ? "#FBBC04" : "#E5E7EB"}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  const { colors } = siteConfig.branding;
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
      style={{
        backgroundColor: `${colors.accent.primary}22`,
        color: colors.accent.primary,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const { colors } = siteConfig.branding;
  return (
    <article
      className="flex w-[280px] shrink-0 flex-col rounded-2xl p-5 sm:w-[320px]"
      style={{
        backgroundColor: colors.background.primary,
        border: `1px solid ${colors.border}`,
        boxShadow:
          "0 1px 4px rgba(0,0,0,0.06), 0 4px 14px rgba(0,0,0,0.04)",
      }}
      aria-label={`Review by ${review.name}`}
    >
      {/* Stars + Google logo */}
      <div className="mb-3 flex items-center justify-between gap-4">
        <StarRating rating={review.rating} />
        <GoogleLogo />
      </div>

      {/* Review text */}
      <p
        className="mb-4 line-clamp-4 flex-1 text-sm leading-relaxed"
        style={{ color: colors.text.secondary }}
      >
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Divider */}
      <div
        className="mb-3 h-px"
        style={{ backgroundColor: colors.border }}
        aria-hidden="true"
      />

      {/* Reviewer */}
      <div className="flex items-center gap-3">
        <Avatar initials={review.initials} />
        <div className="min-w-0">
          <p
            className="truncate text-sm font-semibold"
            style={{ color: colors.text.primary }}
          >
            {review.name}
          </p>
          <p className="text-xs" style={{ color: colors.text.secondary }}>
            {review.timeAgo} · Google Review
          </p>
        </div>
      </div>
    </article>
  );
}

function MarqueeTrack({
  reviews,
  direction,
}: {
  reviews: GoogleReview[];
  direction: "rtl" | "ltr";
}) {
  return (
    <div className="relative w-full overflow-hidden py-3">
      <div
        className={`flex w-max min-w-max gap-5 pr-5 will-change-transform ${
          direction === "rtl" ? "animate-marquee-rtl" : "animate-marquee-ltr"
        }`}
      >
        {[...reviews, ...reviews].map((review, index) => (
          <ReviewCard
            key={`${review.id}-${index}`}
            review={review}
          />
        ))}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Marquee() {
  const { branding, businessName, locationName, rating, reviewCount } =
    siteConfig;
  const { colors } = branding;

  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-20"
      style={{ backgroundColor: colors.background.secondary }}
    >
      {/* Heading */}
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span
          className="inline-block text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: colors.accent.primary }}
        >
          Patient Reviews
        </span>
        <h2
          className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          style={{ color: colors.text.primary }}
        >
          Trusted by Patients in {locationName}
        </h2>
        <p
          className="mx-auto mt-3 max-w-xl text-base leading-relaxed sm:text-lg"
          style={{ color: colors.text.secondary }}
        >
          See why patients choose {businessName} for their skin care — straight
          from Google Reviews.
        </p>

        {/* Aggregate rating badge */}
        {rating !== undefined && reviewCount !== undefined && (
          <div className="mt-6 inline-flex items-center gap-3 rounded-full px-5 py-2.5 shadow-sm"
            style={{
              backgroundColor: colors.background.primary,
              border: `1px solid ${colors.border}`,
            }}
          >
            <GoogleLogo />
            <div className="flex items-center gap-1.5">
              <StarRating rating={Math.round(rating)} />
              <span
                className="text-sm font-bold"
                style={{ color: colors.text.primary }}
              >
                {rating.toFixed(1)}
              </span>
            </div>
            <span
              className="text-sm"
              style={{ color: colors.text.secondary }}
            >
              {reviewCount}+ reviews
            </span>
          </div>
        )}
      </div>

      {/* Row 1 — right to left */}
      <div className="mt-10 w-full">
        <MarqueeTrack reviews={reviewsRow1} direction="rtl" />
      </div>

      {/* Row 2 — left to right */}
      <div className="w-full">
        <MarqueeTrack reviews={reviewsRow2} direction="ltr" />
      </div>
    </section>
  );
}
