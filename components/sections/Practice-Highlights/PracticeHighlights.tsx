import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import {
  Stethoscope,
  GraduationCap,
  HeartPulse,
  Microscope,
  type LucideIcon,
} from "lucide-react";

type Highlight = {
  icon: LucideIcon;
  title: string;
  description: string;
};

interface PracticeHighlightsProps {
  eyebrow?: string;
  heading?: string;
  highlights?: Highlight[];
}

const defaultHighlights: Highlight[] = [
  {
    icon: Stethoscope,
    title: "Complete care",
    description: "We support your health with tailored medical care.",
  },
  {
    icon: GraduationCap,
    title: "Expert guidance",
    description: "Our doctors help you make smart health choices.",
  },
  {
    icon: HeartPulse,
    title: "Wellness blend",
    description: "We enhance lives by guiding your path to wellness.",
  },
  {
    icon: Microscope,
    title: "Modern tools",
    description: "Delivering advanced scans and lab work for quick results.",
  },
];

export default function PracticeHighlights({
  eyebrow = "Leading the way in patient care today",
  heading = "Your trusted partner\nin modern healthcare",
  highlights = defaultHighlights,
}: PracticeHighlightsProps) {
  const { colors } = siteConfig.branding;

  return (
    <section
      aria-labelledby="practice-highlights-heading"
      style={{ backgroundColor: colors.background.primary }}
      className="py-20 sm:py-24 lg:py-28"
    >
      <Container>
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          {eyebrow && (
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: colors.text.secondary }}
            >
              {eyebrow}
            </p>
          )}
          <h2
            id="practice-highlights-heading"
            className="whitespace-pre-line text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: colors.text.primary }}
          >
            {heading}
          </h2>
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="flex flex-col rounded-2xl border p-8 transition-shadow duration-200 shadow-sm hover:shadow-md"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.background.primary,
                }}
              >
                {/* Icon area — generous top space so it sits high in the card */}
                <div className="mb-10" aria-hidden="true">
                  <Icon
                    className="h-12 w-12 stroke-1"
                    style={{ color: colors.accent.primary }}
                  />
                </div>

                {/* Text — pinned to the bottom of the card naturally */}
                <div className="mt-auto space-y-2">
                  <h3
                    className="text-base font-semibold"
                    style={{ color: colors.text.primary }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: colors.text.secondary }}
                  >
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
