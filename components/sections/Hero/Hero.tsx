import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

interface HeroProps {
  titleLines?: string[];
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  backgroundImageUrl?: string;
  overlayClassName?: string;
}

const defaultTitle = ["Care from doctors you can", "trust"];
const defaultDescription =
  "We listen. We examine. We treat with precision. Your health deserves nothing less than a physician who knows your history and respects your time.";

// Default: doctor/medical theme from Unsplash (high-res)
const defaultBackgroundImage =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1920&q=80";

export default function Hero({
  titleLines = defaultTitle,
  description = defaultDescription,
  primaryCtaLabel = "Book",
  primaryCtaHref = siteConfig.bookingUrl || "/#contact",
  secondaryCtaLabel = "Learn",
  secondaryCtaHref = "/#about",
  backgroundImageUrl = defaultBackgroundImage,
  overlayClassName = "bg-neutral-800/85",
}: HeroProps) {
  const { colors } = siteConfig.branding;
  return (
    <section
      aria-label="Hero"
      className="relative isolate min-h-screen w-full overflow-hidden"
    >
      {/* Background */}
      {backgroundImageUrl ? (
        <>
          <div
            className="absolute inset-0 origin-center bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
            aria-hidden="true"
          />
          <div
            className={`absolute inset-0 ${overlayClassName}`}
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: colors.text.primary }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <Container className="relative z-10 grid min-h-screen place-items-center py-24 text-center">
        <div className="flex max-w-3xl flex-col items-center gap-6">
          <h1
            className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ color: colors.text.inverse }}
          >
            <span className="block">{titleLines[0] ?? ""}</span>
            <span className="block">{titleLines[1] ?? ""}</span>
          </h1>

          <p
            className="max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: colors.text.inverse, opacity: 0.95 }}
          >
            {description}
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={primaryCtaHref}
              variant="highlight"
              className="h-11 min-w-[120px] px-6 text-base"
            >
              {primaryCtaLabel}
            </Button>
            <Button
              href={secondaryCtaHref}
              variant="highlightoutline"
              className="h-11 min-w-[120px] px-6 text-base"
            >
              {secondaryCtaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
