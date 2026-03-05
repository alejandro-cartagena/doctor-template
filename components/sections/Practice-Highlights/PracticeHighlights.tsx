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

        {/* Connected card strip */}
        {/* Border classes per index: mobile=1-col, sm=2-col, lg=4-col */}
        <ul
          className="grid grid-cols-1 overflow-hidden rounded-2xl border-2 shadow-sm sm:grid-cols-2 lg:grid-cols-4"
          style={{
            borderColor: colors.accent.primary,
            backgroundColor: colors.background.primary,
          }}
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            // Divider borders per breakpoint so the outer border is never doubled
            const borderClass = [
              "border-b-2 sm:border-r-2 lg:border-b-0",
              "border-b-2 lg:border-b-0 lg:border-r-2",
              "border-b-2 sm:border-r-2 sm:border-b-0",
              "",
            ][index] ?? "border-b-2";

            return (
              <li
                key={item.title}
                className={`flex flex-col p-10 ${borderClass}`}
                style={{ borderColor: colors.accent.primary }}
              >
                {/* Fixed-height icon slot keeps text baseline aligned across all cards */}
                <div
                  className="mb-8 flex h-24 items-start"
                  aria-hidden="true"
                >
                  <Icon
                    className="h-20 w-20 stroke-[0.75]"
                    style={{ color: colors.accent.primary }}
                  />
                </div>

                <div className="space-y-3">
                  <h3
                    className="text-2xl font-semibold"
                    style={{ color: colors.text.primary }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-lg leading-relaxed"
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
