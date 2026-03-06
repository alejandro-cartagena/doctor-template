"use client";

import { Phone, Mail, Calendar } from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";

const c = siteConfig.branding.colors;
const { address, phone, email, hours, bookingUrl, businessName } = siteConfig;

const addressString = `${address.line1}, ${address.city}, ${address.state} ${address.zip}`;
const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(addressString)}&t=m&z=15&output=embed&iwloc=near`;

const hoursRows = [
  { label: "Mon – Thu", value: hours.monday },
  { label: "Fri", value: hours.friday },
  { label: "Sat – Sun", value: hours.saturday },
];

const contactRows = [
  { icon: Phone, label: phone, href: `tel:${phone.replace(/\D/g, "")}` },
  { icon: Mail, label: email, href: `mailto:${email}` },
  { icon: Calendar, label: "Book appointment", href: bookingUrl || "/#contact" },
];

export default function Location() {
  return (
    <section id="location" aria-label="Office location and hours" style={{ background: c.background.primary }}>
      {/* Section heading */}
      <Container>
        <div className="py-14 text-center max-w-2xl mx-auto">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: c.accent.primary }}
          >
            Visit Our Office
          </p>
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: c.text.primary }}
          >
            Our Hours & Location
          </h2>
          <p
            className="mt-3 text-base leading-relaxed"
            style={{ color: c.text.secondary }}
          >
            {`${siteConfig.address.line1}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`}
          </p>
        </div>
      </Container>

      {/* Map + panel — stacked on mobile/tablet, overlay on desktop */}
      <div className="flex flex-col lg:relative lg:h-[460px]">

        {/* Map — sits below card on mobile, full-bleed bg on desktop */}
        <div className="order-2 lg:order-0 lg:absolute lg:inset-0 h-[320px] sm:h-[380px] lg:h-auto">
          <iframe
            src={mapSrc}
            title={`${businessName} location`}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Panel — card above map on mobile/tablet, overlay on desktop */}
        <div className="order-1 lg:order-0 z-10
          px-4 sm:px-6 pt-6 pb-0
          lg:absolute lg:inset-0 lg:p-0 mb-10 lg:mb-0">
          {/* max-w-7xl aligner — relative so the card can use inset-y-0 */}
          <div className="lg:w-full lg:max-w-7xl lg:mx-auto lg:h-full lg:relative">

            {/* Panel card */}
            <div
              className="flex flex-col justify-center px-8 py-8 lg:py-10 gap-8
                w-full max-w-sm mx-auto
                rounded-2xl shadow-xl
                lg:absolute lg:inset-y-0 lg:left-8
                lg:w-[340px] lg:max-w-none lg:mx-0
                lg:rounded-none lg:shadow-none"
              style={{
                background: c.accent.primary,
                color: c.text.inverse,
              }}
            >
              {/* Working Hours */}
              <div>
                <h3
                  className="text-sm font-bold tracking-widest uppercase mb-4"
                  style={{ color: c.text.inverse }}
                >
                  Working Hours
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {hoursRows.map(({ label, value }) => (
                    <li key={label} className="flex justify-between gap-4 text-sm">
                      <span className="font-semibold">{label}</span>
                      <span className="opacity-80">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.25)" }} />

              {/* Contact Details */}
              <div>
                <h3
                  className="text-sm font-bold tracking-widest uppercase mb-4"
                  style={{ color: c.text.inverse }}
                >
                  Contact Details
                </h3>
                <ul className="flex flex-col gap-3">
                  {contactRows.map(({ icon: Icon, label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="flex items-center gap-3 text-sm transition-opacity hover:opacity-100 opacity-85"
                        style={{ color: c.text.inverse, textDecoration: "none" }}
                      >
                        <span
                          className="flex items-center justify-center rounded-full shrink-0"
                          style={{
                            width: 30,
                            height: 30,
                            background: "rgba(255,255,255,0.18)",
                          }}
                        >
                          <Icon size={14} strokeWidth={2} />
                        </span>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
