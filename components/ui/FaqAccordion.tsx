"use client";

import { siteConfig } from "@/config/site";

export interface FaqAccordionItemProps {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  headingId: string;
  panelId: string;
}

export default function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
  headingId,
  panelId,
}: FaqAccordionItemProps) {
  return (
    <div
      className="group border-b transition-colors last:border-b-0"
      style={{ borderColor: siteConfig.branding.colors.border }}
    >
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={headingId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold transition-colors hover:opacity-90 sm:py-6"
          style={{ color: siteConfig.branding.colors.text.primary }}
        >
          <span className="pr-4 text-base sm:text-lg">{item.question}</span>
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200"
            style={{
              backgroundColor: siteConfig.branding.colors.accent.primary,
              color: siteConfig.branding.colors.text.inverse,
            }}
            aria-hidden
          >
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <p
            className="pb-5 text-sm leading-relaxed sm:pb-6 sm:text-base"
            style={{ color: siteConfig.branding.colors.text.secondary }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}