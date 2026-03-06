"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";

const c = siteConfig.branding.colors;
const { address, phone, email, hours, businessName, specialty } = siteConfig;

const reasonOptions = [
  "New Patient Appointment",
  "Follow-Up Visit",
  "Prescription Refill",
  "Test Results Inquiry",
  "Insurance Question",
  "General Inquiry",
  "Other",
];

const infoItems = [
  {
    icon: Phone,
    label: "Phone",
    value: phone,
    href: `tel:${phone.replace(/\D/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: email,
    href: `mailto:${email}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: `${address.line1}, ${address.city}, ${address.state} ${address.zip}`,
    href: `https://maps.google.com/?q=${encodeURIComponent(`${address.line1}, ${address.city}, ${address.state} ${address.zip}`)}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: `Mon–Thu ${hours.monday} · Fri ${hours.friday}`,
    href: undefined,
  },
];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
}

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  reason: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1.5px solid ${c.border}`,
    borderRadius: 0,
    padding: "10px 0",
    fontSize: "0.925rem",
    color: c.text.primary,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const inputFocused: React.CSSProperties = {
    borderBottomColor: c.accent.primary,
  };

  function fieldStyle(name: string): React.CSSProperties {
    return focused === name
      ? { ...inputBase, ...inputFocused }
      : inputBase;
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ background: c.background.secondary }}
      className="py-20 sm:py-28"
    >
      <Container>
        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: c.accent.primary }}
          >
            Get In Touch
          </p>
          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: c.text.primary }}
          >
            Contact{" "}
            <span style={{ color: c.accent.primary }}>{businessName}</span>
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: c.text.secondary }}
          >
            Have a question or ready to schedule your visit? Our {specialty}{" "}
            team is here to help. Reach out and we'll respond within one
            business day.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.55fr] lg:gap-12 items-center">

          {/* ── Left: Info panel ── */}
          <div
            className="rounded-2xl overflow-hidden shadow-sm"
            style={{ border: `1px solid ${c.border}` }}
          >
            {/* Accent header strip */}
            <div
              className="px-8 py-7"
              style={{ background: c.accent.primary }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {specialty} Practice
              </p>
              <h3
                className="text-xl font-bold"
                style={{ color: c.text.inverse }}
              >
                We&apos;re Here for You
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Feel free to call, email, or stop by our office. We look
                forward to caring for you.
              </p>
            </div>

            {/* Info items */}
            <div
              className="px-8 py-8 flex flex-col gap-6"
              style={{ background: c.background.primary }}
            >
              {infoItems.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <span
                    className="flex items-center justify-center rounded-xl shrink-0 mt-0.5"
                    style={{
                      width: 40,
                      height: 40,
                      background: c.background.secondary,
                      color: c.accent.primary,
                      border: `1px solid ${c.border}`,
                    }}
                  >
                    <Icon size={17} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                      style={{ color: c.accent.primary }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm leading-snug transition-opacity hover:opacity-70"
                        style={{ color: c.text.primary, textDecoration: "none" }}
                        target={label === "Address" ? "_blank" : undefined}
                        rel={
                          label === "Address"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {value}
                      </a>
                    ) : (
                      <p
                        className="text-sm leading-snug"
                        style={{ color: c.text.primary }}
                      >
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom accent bar */}
            <div
              className="h-1 w-full"
              style={{
                background: `linear-gradient(90deg, ${c.accent.primary}, transparent)`,
              }}
            />
          </div>

          {/* ── Right: Form card ── */}
          <div
            className="rounded-2xl shadow-sm overflow-hidden"
            style={{
              background: c.background.primary,
              border: `1px solid ${c.border}`,
            }}
          >
            {submitted ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center justify-center text-center px-10 py-20 gap-5">
                <span
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 64,
                    height: 64,
                    background: c.background.secondary,
                    color: c.accent.primary,
                  }}
                >
                  <CheckCircle size={30} strokeWidth={1.75} />
                </span>
                <h3
                  className="text-xl font-bold"
                  style={{ color: c.text.primary }}
                >
                  Message Received
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-xs"
                  style={{ color: c.text.secondary }}
                >
                  Thank you for reaching out. A member of our team will get
                  back to you within one business day.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm(emptyForm);
                  }}
                  className="mt-2 text-sm font-medium underline underline-offset-2 transition-opacity hover:opacity-70"
                  style={{ color: c.accent.primary }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>

                {/* Form header */}
                <div
                  className="px-8 py-6"
                  style={{
                    background: c.background.secondary,
                    borderBottom: `1px solid ${c.border}`,
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: c.accent.primary }}
                  >
                    Contact Form
                  </p>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: c.text.primary }}
                  >
                    Send Us a Message
                  </h3>
                  <div
                    className="mt-3 h-0.5 w-10 rounded-full"
                    style={{ background: c.accent.primary }}
                    aria-hidden="true"
                  />
                </div>

                <div className="px-8 pb-10 flex flex-col gap-8">

                {/* Name row */}
                <div className="grid grid-cols-2 gap-6">
                  <FieldGroup label="First Name">
                    <input
                      name="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={handleChange}
                      onFocus={() => setFocused("firstName")}
                      onBlur={() => setFocused(null)}
                      style={fieldStyle("firstName")}
                      placeholder="Jane"
                    />
                  </FieldGroup>
                  <FieldGroup label="Last Name">
                    <input
                      name="lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={handleChange}
                      onFocus={() => setFocused("lastName")}
                      onBlur={() => setFocused(null)}
                      style={fieldStyle("lastName")}
                      placeholder="Smith"
                    />
                  </FieldGroup>
                </div>

                {/* Email + Phone row */}
                <div className="grid grid-cols-2 gap-6">
                  <FieldGroup label="Email Address">
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={fieldStyle("email")}
                      placeholder="jane@email.com"
                    />
                  </FieldGroup>
                  <FieldGroup label="Phone Number">
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      style={fieldStyle("phone")}
                      placeholder="(305) 555-0000"
                    />
                  </FieldGroup>
                </div>

                {/* Reason */}
                <FieldGroup label="Reason for Contact">
                  <select
                    name="reason"
                    required
                    value={form.reason}
                    onChange={handleChange}
                    onFocus={() => setFocused("reason")}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...fieldStyle("reason"),
                      cursor: "pointer",
                      appearance: "none",
                      WebkitAppearance: "none",
                      color: form.reason ? c.text.primary : c.text.secondary,
                    }}
                  >
                    <option value="" disabled>
                      Select a reason…
                    </option>
                    {reasonOptions.map((r) => (
                      <option key={r} value={r} style={{ color: c.text.primary }}>
                        {r}
                      </option>
                    ))}
                  </select>
                </FieldGroup>

                {/* Message */}
                <FieldGroup label="Message">
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...fieldStyle("message"),
                      resize: "vertical",
                      minHeight: 96,
                      fontFamily: "inherit",
                    }}
                    placeholder="Tell us how we can help you…"
                  />
                </FieldGroup>

                {/* Submit */}
                <div className="pt-1">
                  <SubmitButton accentColor={c.accent.primary} hoverColor={c.accent.hover} />
                  <p
                    className="mt-4 text-xs leading-relaxed"
                    style={{ color: c.text.secondary }}
                  >
                    Your information is kept strictly confidential and used
                    only to respond to your inquiry.
                  </p>
                </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const c = siteConfig.branding.colors;
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: c.text.secondary }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function SubmitButton({
  accentColor,
  hoverColor,
}: {
  accentColor: string;
  hoverColor: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="submit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all"
      style={{
        background: hovered ? hoverColor : accentColor,
        color: "#fff",
        border: "none",
        cursor: "pointer",
        boxShadow: hovered
          ? `0 6px 24px 0 ${accentColor}55`
          : `0 2px 10px 0 ${accentColor}33`,
        transform: hovered ? "translateY(-1px)" : "none",
      }}
    >
      <Send size={15} strokeWidth={2} />
      Send Message
    </button>
  );
}
