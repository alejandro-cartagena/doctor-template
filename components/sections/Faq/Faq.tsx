"use client";

import { useState, useId } from "react";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import FaqAccordionItem from "@/components/ui/FaqAccordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const defaultFaqs: FaqItem[] = [
  {
    id: "1",
    question: "Do I need a referral to schedule an appointment?",
    answer:
      "No referral is required for most visits. You can book directly online or by calling our office. If your insurance requires a referral for specialist visits, we recommend checking with your plan beforehand.",
  },
  {
    id: "2",
    question: "What should I bring to my first appointment?",
    answer:
      "Please bring a valid photo ID, your insurance card, a list of current medications, and any prior records or lab results relevant to your visit. Arriving 10–15 minutes early gives you time to complete any remaining paperwork.",
  },
  {
    id: "3",
    question: "Which insurance plans do you accept?",
    answer: `We accept most major insurance plans, including ${siteConfig.acceptedInsurance.join(", ")}. Coverage varies by plan, so we recommend confirming your benefits before your visit. Our front desk is happy to assist with any questions.`,
  },
  {
    id: "4",
    question: "How do I request a prescription refill?",
    answer:
      "Refill requests can be submitted through our patient portal or by calling the office. Please allow up to 2 business days for processing. For controlled substances, an in-person or telehealth visit may be required.",
  },
  {
    id: "5",
    question: "Do you offer telehealth appointments?",
    answer:
      "Yes. Many follow-up visits and consultations can be handled via telehealth. When scheduling, select the virtual option and you will receive a secure link before your appointment time.",
  },
  {
    id: "6",
    question: "What is your cancellation policy?",
    answer:
      "We ask that you cancel or reschedule at least 24 hours in advance so we can offer the slot to another patient. Late cancellations or no-shows may be subject to a fee as outlined during registration.",
  },
];

interface FaqProps {
  eyebrow?: string;
}

export default function Faq({ eyebrow = "Support" }: FaqProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultFaqs[0]?.id ?? null
  );
  const baseId = useId();

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="w-full py-16 sm:py-20 lg:py-24"
      style={{
        backgroundColor: siteConfig.branding.colors.background.secondary,
      }}
      aria-labelledby="faq-heading"
    >
        <Container className="max-w-3xl">
        <header className="text-center">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: siteConfig.branding.colors.accent.primary }}
          >
            {eyebrow}
          </span>
          <h2
            id="faq-heading"
            className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
            style={{ color: siteConfig.branding.colors.text.primary }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="mx-auto mt-3 max-w-lg text-base sm:text-lg"
            style={{ color: siteConfig.branding.colors.text.secondary }}
          >
            Quick answers to common questions. Still have one?{" "}
            <a
              href={`tel:${siteConfig.phone}`}
              className="font-medium underline underline-offset-2 transition-opacity hover:opacity-75"
              style={{ color: siteConfig.branding.colors.accent.primary }}
            >
              Give us a call.
            </a>
          </p>
        </header>

        <div
          className="mt-10 overflow-hidden rounded-2xl border shadow-sm sm:mt-12"
          style={{
            borderColor: siteConfig.branding.colors.border,
            backgroundColor: siteConfig.branding.colors.background.primary,
          }}
        >
          <div className="px-4 sm:px-6">
            {defaultFaqs.map((item, index) => (
              <FaqAccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
                headingId={`${baseId}-faq-${index}`}
                panelId={`${baseId}-panel-${index}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
