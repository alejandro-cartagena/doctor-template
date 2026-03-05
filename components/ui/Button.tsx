import Link from "next/link";
import { type ReactNode } from "react";
import { siteConfig } from "@/config/site";

type ButtonVariant = "default" | "highlight" | "highlightoutline";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const baseClass =
  "inline-flex items-center justify-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent";

const variantHoverClass: Record<ButtonVariant, string> = {
  default: "hover:opacity-90",
  highlight: "hover:!bg-slate-100 hover:!border-slate-100",
  highlightoutline: "hover:opacity-90",
};

export default function Button({
  children,
  href,
  variant = "default",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const c = siteConfig.branding.colors;
  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    default: {
      borderColor: c.accent.primary,
      backgroundColor: c.accent.primary,
      color: c.text.inverse,
    },
    highlight: {
      borderColor: c.background.primary,
      backgroundColor: c.background.primary,
      color: c.text.primary,
    },
    highlightoutline: {
      borderColor: c.text.inverse,
      backgroundColor: "transparent",
      color: c.text.inverse,
    },
  };
  const style = variantStyles[variant];
  const combined = `${baseClass} ${variantHoverClass[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combined} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combined} style={style}>
      {children}
    </button>
  );
}
