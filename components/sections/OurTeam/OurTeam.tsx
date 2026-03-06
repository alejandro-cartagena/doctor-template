"use client";

import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { Linkedin, Twitter, Facebook, UserRound, Search } from "lucide-react";

const c = siteConfig.branding.colors;

interface TeamMember {
  name: string;
  role: string;
  credentials?: string;
  imageUrl?: string;
  bio?: string;
}

const defaultTeam: TeamMember[] = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Board-Certified Dermatologist",
    credentials: "MD, FAAD",
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=700&fit=crop&crop=top",
    bio: "Specializing in medical and cosmetic dermatology with over 15 years of combined experience.",
  },
  {
    name: "Dr. James Carter",
    role: "Dermatologist",
    credentials: "MD",
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=700&fit=crop&crop=top",
    bio: "Focused on preventive care and the long-term management of chronic skin conditions.",
  },
  {
    name: "Dr. Emily Reyes",
    role: "Cosmetic Specialist",
    credentials: "MD",
    imageUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=700&fit=crop&crop=top",
    bio: "Expert in aesthetic procedures, laser treatments, and non-invasive rejuvenation.",
  },
  {
    name: "Dr. Michael Torres",
    role: "Pediatric Dermatologist",
    credentials: "MD, FAAP",
    imageUrl:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=700&fit=crop&crop=top",
    bio: "Dedicated to caring for children's skin conditions with a gentle, family-centered approach.",
  },
];

interface OurTeamProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  members?: TeamMember[];
}

function getInitials(name: string) {
  return name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const AVATAR_GRADIENTS = [
  ["#2AA6B6", "#1A7A87"],
  ["#3B82F6", "#1D4ED8"],
  ["#8B5CF6", "#6D28D9"],
  ["#10B981", "#047857"],
];

export default function OurTeam({
  eyebrow = "Meet The Professionals",
  heading = "Our Team",
  subheading = "Our experienced team of board-certified physicians is dedicated to delivering the highest standard of care for every patient.",
  members = defaultTeam,
}: OurTeamProps) {
  return (
    <section
      id="our-team"
      aria-labelledby="our-team-heading"
      style={{ backgroundColor: c.background.secondary }}
      className="py-20 sm:py-24 lg:py-28"
    >
      <style>{`
        .ot-card {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .ot-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px 0 ${c.accent.primary}2E, 0 4px 16px 0 ${c.accent.primary}18;
        }
        .ot-img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(0.2px);
          opacity: 0;
          transition: opacity 0.35s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .ot-img-wrap:hover .ot-img-overlay {
          opacity: 1;
        }
        .ot-search-icon {
          color: ${c.accent.primary};
          transition: transform 0.25s ease;
        }
        .ot-img-wrap:hover .ot-search-icon {
          transform: scale(1.15);
        }
        .ot-bottom-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          border: 1.5px solid ${c.border};
          color: ${c.text.secondary};
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        .ot-bottom-icon:hover {
          border-color: ${c.accent.primary};
          color: ${c.accent.primary};
          background: ${c.background.secondary};
        }
      `}</style>

      <Container>
        {/* ── Section header ── */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: c.accent.primary }}
          >
            {eyebrow}
          </p>
          <h2
            id="our-team-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: c.text.primary }}
          >
            {heading}
          </h2>
          {subheading && (
            <p
              className="mt-4 text-base leading-relaxed sm:text-lg"
              style={{ color: c.text.secondary }}
            >
              {subheading}
            </p>
          )}
        </div>

        {/* ── Team grid ── */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, i) => {
            const [gradFrom, gradTo] = AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length];
            const initials = getInitials(member.name);

            return (
              <article
                key={member.name}
                className="ot-card flex flex-col overflow-hidden rounded-2xl"
                style={{
                  backgroundColor: c.background.primary,
                  border: `1px solid ${c.border}`,
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
                }}
              >
                {/* ── Image / avatar with hover overlay ── */}
                <div className="ot-img-wrap relative overflow-hidden" style={{ height: "260px" }}>
                  {member.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${gradFrom} 0%, ${gradTo} 100%)`,
                      }}
                      aria-hidden="true"
                    >
                      <UserRound
                        size={88}
                        strokeWidth={1}
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      />
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="ot-img-overlay" aria-hidden="true">
                    <Search size={52} strokeWidth={1.5} className="ot-search-icon" />
                  </div>
                </div>

                {/* ── Card body ── */}
                <div className="flex flex-1 flex-col px-5 py-5">
                  <p
                    className="mb-1 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: c.accent.primary }}
                  >
                    {member.role}
                  </p>
                  <h3
                    className="text-lg font-bold leading-snug"
                    style={{ color: c.text.primary }}
                  >
                    {member.name}
                    {member.credentials && (
                      <span
                        className="ml-1.5 text-xs font-medium"
                        style={{ color: c.text.secondary }}
                      >
                        {member.credentials}
                      </span>
                    )}
                  </h3>

                  {member.bio && (
                    <p
                      className="mt-2.5 text-sm leading-relaxed"
                      style={{ color: c.text.secondary }}
                    >
                      {member.bio}
                    </p>
                  )}

                  {/* ── Bottom social icons ── */}
                  <div
                    className="mt-auto flex items-center gap-2 pt-4"
                    style={{ borderTop: `1px solid ${c.border}`, marginTop: "16px" }}
                  >
                    <a href="#" className="ot-bottom-icon" aria-label={`Facebook for ${member.name}`}>
                      <Facebook size={14} strokeWidth={1.75} />
                    </a>
                    <a href="#" className="ot-bottom-icon" aria-label={`Twitter for ${member.name}`}>
                      <Twitter size={14} strokeWidth={1.75} />
                    </a>
                    <a href="#" className="ot-bottom-icon" aria-label={`LinkedIn for ${member.name}`}>
                      <Linkedin size={14} strokeWidth={1.75} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
