"use client";

// A comic-style chapter cover for a land in "Pip & the Grey": the land's
// illustrated backdrop (bloomed by progress) with a chapter number, title, and
// the friend Pip wakes there. Used on the "Story so far" page.

import type { Land } from "@/content/kids/story";
import { CHARACTERS } from "@/content/kids/characters";
import { SceneArt } from "@/components/kids/SceneArt";
import { CharacterPortrait } from "@/components/kids/CharacterPortrait";

interface Props {
  land: Land;
  chapter: number;
  /** 0 grey … 1 full color. */
  colorAmount: number;
}

export function ChapterCover({ land, chapter, colorAmount }: Props) {
  const friend = CHARACTERS[land.wakes];
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-soft">
      <SceneArt backdrop={land.backdrop} sceneId={land.heroScene} colorAmount={colorAmount} className="!rounded-3xl" />
      <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-ink/65 via-ink/10 to-transparent p-4">
        <span className="self-start rounded-full bg-white/85 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-ink">
          Chapter {chapter}
        </span>
        <div className="flex items-center gap-3">
          <CharacterPortrait id={land.wakes} size={48} colorAmount={colorAmount} />
          <div>
            <h2 className="font-display text-2xl font-bold leading-tight text-white drop-shadow">
              {land.name}
            </h2>
            <p className="text-sm font-medium text-white/85">
              {colorAmount >= 1 ? `${friend.name} is awake!` : land.tagline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
