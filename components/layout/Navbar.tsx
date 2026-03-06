"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/Button";

const SCROLL_THRESHOLD = 24;

const bookHref = siteConfig.bookingUrl || "/#contact";

const servicesDropdown = [
  { label: "Service 1", href: "/#services" },
  { label: "Service 2", href: "/#services" },
  { label: "Service 3", href: "/#services" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setIsOpen(false);
    if (pathname !== "/" || !href.startsWith("/#")) return;
    const id = href.replace("/#", "");
    if (!id) return;
    e.preventDefault();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isApplyPage = pathname === "/apply";

  useEffect(() => {
    if (isApplyPage) return;
    function handleScroll() {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isApplyPage]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow || "";
    }
    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [isOpen]);

  const showSolidNav = isScrolled || isApplyPage;
  const isFixed = !isApplyPage;
  const { colors } = siteConfig.branding;

  const navBg = showSolidNav
    ? "backdrop-blur-md border-b shadow-sm"
    : "bg-transparent border-b border-transparent";
  const navBgStyle = showSolidNav
    ? {
        backgroundColor: `${colors.background.secondary}ee`,
        borderColor: colors.border,
      }
    : undefined;
  const textStyle = 
  showSolidNav
    ? { color: colors.text.primary }
    : { color: colors.text.inverse };
  const burgerClass = showSolidNav
    ? "border-current"
    : "border-white/30 bg-white/10 text-white hover:bg-white/20";
  const burgerStyle = {
    backgroundColor: colors.background.secondary,
    borderColor: colors.border,
    color: colors.text.primary,
  };

  return (
    <>
      <nav
        className={`z-50 h-20 transition-all duration-300 ${isFixed ? "fixed inset-x-0 top-9" : "sticky top-9"} ${navBg}`}
        style={{
          ...navBgStyle,
          ["--accent" as string]: colors.accent.primary,
        } as React.CSSProperties}
        aria-label="Main navigation"
      >
        <Container className="flex h-full w-full items-center justify-between">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="relative z-50 flex cursor-pointer select-none items-center transition-opacity hover:opacity-90"
            aria-label={siteConfig.businessName}
          >
            {siteConfig.logoUrl ? (
              <Image
                src={siteConfig.logoUrl}
                alt={siteConfig.businessName}
                width={180}
                height={56}
                className="h-12 w-auto object-contain md:h-14"
                priority
              />
            ) : (
              <span
                className="text-xl font-semibold tracking-tight"
                style={textStyle}
              >
                {siteConfig.businessName}
              </span>
            )}
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {siteConfig.navigation.map((item) =>
              item.label === "Services" ? (
                <li key={item.href} className="group relative">
                  {/* Trigger */}
                  <button
                    style={textStyle}
                    className={`flex cursor-pointer items-center gap-1 text-sm font-semibold uppercase tracking-wider transition-colors ${showSolidNav ? "hover:[color:var(--accent)]" : "hover:opacity-80"}`}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      strokeWidth={2.5}
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                  </button>

                  {/* Dropdown panel */}
                  <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                    <div
                      className="min-w-[180px] overflow-hidden rounded-xl border shadow-lg"
                      style={{
                        background: colors.background.primary,
                        borderColor: colors.border,
                      }}
                    >
                      {servicesDropdown.map((s) => (
                        <Link
                          key={s.label}
                          href={s.href}
                          onClick={(e) => handleNavClick(e, s.href)}
                          className="block px-4 py-2.5 text-sm transition-colors hover:opacity-70"
                          style={{
                            color: colors.text.primary,
                          }}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    style={textStyle}
                    className={`text-sm font-semibold uppercase tracking-wider transition-colors ${showSolidNav ? "hover:[color:var(--accent)]" : "hover:opacity-80"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
            <Button
              href={bookHref}
              variant="default"
              className="h-10 cursor-pointer px-5"
            >
              Book
            </Button>
          </ul>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-sidebar"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            style={burgerStyle}
            className={`relative z-50 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border transition active:scale-95 md:hidden ${burgerClass}`}
          >
            <span className="sr-only">Toggle menu</span>
            <span
              className={`absolute block h-0.5 w-5 rounded bg-current transition-all duration-300 ease-in-out ${
                isOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5 rotate-0"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 rounded bg-current transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 rounded bg-current transition-all duration-300 ease-in-out ${
                isOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5 rotate-0"
              }`}
            />
          </button>
        </Container>
      </nav>

      <div
        role="presentation"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/50 opacity-0 transition-opacity duration-300 ease-in-out md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="mobile-sidebar"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-[70] h-full w-[75%] max-w-sm shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: siteConfig.branding.colors.background.secondary,
          borderLeft: `1px solid ${siteConfig.branding.colors.border}`,
        }}
      >
        <div
          className="flex h-16 items-center justify-between border-b px-4"
          style={{ borderColor: siteConfig.branding.colors.border }}
        >
          <span
            className="text-base font-semibold"
            style={{ color: siteConfig.branding.colors.text.primary }}
          >
            {siteConfig.businessName}
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border transition hover:opacity-90 active:scale-95"
            style={{
              borderColor: siteConfig.branding.colors.border,
              backgroundColor: siteConfig.branding.colors.background.primary,
              color: siteConfig.branding.colors.text.primary,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>

        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {siteConfig.navigation.map((item) =>
              item.label === "Services" ? (
                <li key={item.href}>
                  {/* Accordion trigger */}
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium tracking-wide transition-colors hover:opacity-90"
                    style={{ color: siteConfig.branding.colors.text.primary }}
                  >
                    {item.label}
                    <ChevronDown
                      size={15}
                      strokeWidth={2}
                      className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                      style={{ color: siteConfig.branding.colors.accent.primary }}
                    />
                  </button>

                  {/* Accordion body */}
                  <ul
                    className={`mt-1 ml-3 overflow-hidden border-l pl-3 transition-all duration-200 ${mobileServicesOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                    style={{ borderColor: siteConfig.branding.colors.border }}
                  >
                    {servicesDropdown.map((s) => (
                      <li key={s.label}>
                        <Link
                          href={s.href}
                          onClick={(e) => handleNavClick(e, s.href)}
                          className="block rounded-md px-3 py-2 text-sm transition-colors hover:opacity-70"
                          style={{ color: siteConfig.branding.colors.text.secondary }}
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block rounded-md px-3 py-2 text-sm font-medium tracking-wide transition-colors hover:opacity-90"
                    style={{ color: siteConfig.branding.colors.text.primary }}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
            <li className="pt-2">
              <Button href={bookHref} variant="default" className="h-10 w-full">
                Book
              </Button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
