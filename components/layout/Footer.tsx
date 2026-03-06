import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

const primaryNav = [
  { label: "Home", href: "/" },
  ...siteConfig.navigation,
];

const secondaryNav = [
  { label: "Book appointment", href: siteConfig.bookingUrl || "/#contact" },
  { label: "Insurance", href: "/#insurance" },
  { label: "Policies", href: "/policies" },
  { label: "FAQ", href: "/#faq" },
];

const legalNav = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Cookies settings", href: "/cookies" },
];

const addressLine = [
  siteConfig.address.line1,
  `${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`,
]
  .filter(Boolean)
  .join(", ");

const socialLinks = [
  { key: "facebook", href: siteConfig.social.facebook, label: "Facebook", icon: FacebookIcon },
  { key: "instagram", href: siteConfig.social.instagram, label: "Instagram", icon: InstagramIcon },
  { key: "twitter", href: siteConfig.social.twitter, label: "X", icon: XIcon },
  { key: "linkedin", href: siteConfig.social.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { key: "youtube", href: (siteConfig.social as { youtube?: string }).youtube ?? "", label: "YouTube", icon: YouTubeIcon },
];

const hoursRows = [
  { days: "Mon – Thu", time: siteConfig.hours.monday },
  { days: "Friday",    time: siteConfig.hours.friday },
  { days: "Sat – Sun", time: siteConfig.hours.saturday },
];

const currentYear = new Date().getFullYear();

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C8.333.014 8.741 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  const c = siteConfig.branding.colors;

  return (
    <footer
      className="w-full border-t"
      style={{ backgroundColor: c.background.primary, borderColor: c.border, color: c.text.primary }}
      aria-label="Site footer"
    >
      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight transition-opacity hover:opacity-90 w-fit"
              style={{ color: c.text.primary }}
            >
              {siteConfig.logoUrl ? (
                <Image
                  src={siteConfig.logoUrl}
                  alt={siteConfig.businessName}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                siteConfig.businessName
              )}
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: c.text.secondary }}>
              {siteConfig.tagline}
            </p>
          </div>

          {/* Col 2 — Contact */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold" style={{ color: c.text.primary }}>
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: c.text.secondary }}>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-opacity hover:opacity-70"
                  style={{ color: c.text.secondary }}
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                  className="transition-opacity hover:opacity-70"
                  style={{ color: c.text.secondary }}
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <span>
                  {siteConfig.address.city} —<br />
                  {siteConfig.address.line1},<br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                </span>
              </li>
              <li className="pt-1">
                <ul className="flex flex-col gap-1">
                  {hoursRows.map(({ days, time }) => (
                    <li key={days}>
                      <span className="font-medium" style={{ color: c.text.primary }}>{days}</span>
                      {" · "}
                      {time}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          {/* Col 3 — Links */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold" style={{ color: c.text.primary }}>
              Links
            </h3>
            <nav aria-label="Footer links">
              <ul className="flex flex-col gap-3">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm transition-opacity hover:opacity-70"
                      style={{ color: c.text.secondary }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 4 — Get in Touch */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold" style={{ color: c.text.primary }}>
              Get in Touch
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map(({ key, href, label, icon: Icon }) => {
                const shared = {
                  style: { color: c.text.primary, borderColor: c.border },
                  className: "flex h-9 w-9 items-center justify-center rounded-lg border transition-opacity",
                };
                return href ? (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    {...shared}
                    className={`${shared.className} hover:opacity-60`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : (
                  <span key={key} aria-hidden {...shared}>
                    <Icon className="h-4 w-4" />
                  </span>
                );
              })}
            </div>
          </div>

        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t py-4" style={{ borderColor: c.border }}>
        <Container className="flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
          <p style={{ color: c.text.secondary }}>
            © {currentYear} {siteConfig.businessName}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-opacity hover:opacity-70"
                style={{ color: c.text.secondary }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
