"use client";

// "Pip's Chess Champion" diploma — printable. Pure inline SVG (Pip) + text, so it
// prints crisply with no assets. The print button and app chrome are hidden in
// print via `print:hidden` on the caller.

import { PipMascot } from "@/components/kids/PipMascot";

interface Props {
  name: string;
  stars: number;
  beltName: string;
  date: string;
}

export function Certificate({ name, stars, beltName, date }: Props) {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border-4 border-amber bg-card p-8 text-center shadow-lift print:shadow-none">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
        Pip&apos;s Chess Quest
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-primary-strong">
        Certificate of Chess Mastery
      </h1>
      <div className="my-6 flex justify-center">
        <PipMascot mood="cheer" size={96} />
      </div>
      <p className="text-lg text-ink-soft">This certifies that</p>
      <p className="my-2 font-display text-4xl font-bold text-primary-strong">{name}</p>
      <p className="mx-auto max-w-md text-lg leading-relaxed text-ink-soft">
        has journeyed across the kingdom, earned the{" "}
        <span className="font-bold text-primary-strong">{beltName}</span>, and collected{" "}
        <span className="font-bold text-amber">{stars} stars</span> — a real chess
        player! 👑
      </p>
      <p className="mt-6 text-sm text-ink-soft">{date}</p>
    </div>
  );
}
