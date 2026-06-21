// Button styles for the design system. `buttonClasses` is exported so Next
// <Link> elements can share the exact same look as real <button>s.

import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg" | "kid";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50";

const VARIANT: Record<ButtonVariant, string> = {
  // Solid blue main CTA.
  primary: "bg-primary text-on-accent shadow-soft hover:bg-primary-strong",
  // Soft-blue secondary CTA (same hue family, readable in both themes).
  accent: "bg-primary/12 text-primary-strong border border-primary/30 hover:bg-primary/20",
  secondary: "bg-card text-ink border border-line hover:border-primary/40",
  ghost: "text-ink-soft hover:text-ink",
};

const SIZE: Record<ButtonSize, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
  kid: "rounded-2xl px-7 py-4 text-xl font-bold",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = "",
): string {
  return `${BASE} ${VARIANT[variant]} ${SIZE[size]} ${extra}`;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}
