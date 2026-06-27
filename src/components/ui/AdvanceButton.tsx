"use client";

// The "make your move" forward control. Every place that moves the learner
// forward (Next / Got it / Finish / replay Next) uses this instead of a plain
// primary button, so advancing feels like committing a move rather than
// submitting a form: a chess-piece token sits on the button, the chevron glides
// forward on hover, and pressing "sets the piece down" (a deeper depress).
// `kind="finish"` swaps in a crown and a one-shot flourish so completing a
// lesson lands as a moment. Renders a <Link> when `href` is given, else a
// <button> (covers the replay step button, which can be disabled).

import Link from "next/link";
import type { ReactNode } from "react";
import { PawnGlyph, CrownGlyph, ChevronRightIcon, CheckIcon } from "@/components/icons";
import { playSound } from "@/lib/audio/sounds";

type Kind = "next" | "finish";
type Size = "lg" | "kid";

interface Props {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  kind?: Kind;
  size?: Size;
  disabled?: boolean;
  /** Play a soft move-tick on press. Off by default (adults have no click SFX). */
  sound?: boolean;
  testId?: string;
  className?: string;
}

const SIZE: Record<Size, { btn: string; token: string; glyph: string; chev: string }> = {
  lg: { btn: "gap-2.5 rounded-xl py-2 pl-2 pr-5 text-base", token: "h-9 w-9 rounded-lg", glyph: "h-5 w-5", chev: "h-5 w-5" },
  kid: { btn: "gap-3 rounded-2xl py-2.5 pl-2.5 pr-7 text-xl font-bold", token: "h-12 w-12 rounded-xl", glyph: "h-7 w-7", chev: "h-6 w-6" },
};

// The carved sapphire CTA (same family as Button.tsx `primary`), but the press
// state swaps the cast shadow for an inner one — the piece "settling".
const BASE =
  "group relative inline-flex items-center font-semibold tracking-tight text-on-accent " +
  "bg-[linear-gradient(180deg,var(--primary-strong),var(--primary))] " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_22px_-8px_rgba(79,143,247,0.55),0_2px_0_var(--accent-deep)] " +
  "transition-[filter,transform,box-shadow] duration-150 hover:brightness-[1.07] " +
  "active:translate-y-px active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.35),0_1px_0_var(--accent-deep)] " +
  "disabled:opacity-40 disabled:active:translate-y-0 disabled:active:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_22px_-8px_rgba(79,143,247,0.55),0_2px_0_var(--accent-deep)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function AdvanceButton({
  label,
  href,
  onClick,
  kind = "next",
  size = "lg",
  disabled = false,
  sound = false,
  testId,
  className = "",
}: Props) {
  const cfg = SIZE[size];
  const Glyph = kind === "finish" ? CrownGlyph : PawnGlyph;
  const Trailing = kind === "finish" ? CheckIcon : ChevronRightIcon;

  function press() {
    if (sound) playSound("move");
    onClick?.();
  }

  const cls = `${BASE} ${cfg.btn} ${kind === "finish" ? "pop" : ""} ${className}`;
  const inner = (
    <>
      {kind === "finish" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] motion-safe:animate-[accentPulse_0.7s_ease-out]"
        />
      )}
      <span
        aria-hidden
        className={`grid shrink-0 place-items-center bg-[var(--accent-deep)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 ${cfg.token}`}
      >
        <Glyph className={cfg.glyph} />
      </span>
      <span className="px-1">{label}</span>
      <Trailing className={`${cfg.chev} transition-transform duration-150 motion-safe:group-hover:translate-x-1`} />
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={press} data-testid={testId} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={press} disabled={disabled} data-testid={testId} className={cls}>
      {inner}
    </button>
  );
}
