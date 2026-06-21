// Enumerates the trainable lines for a repertoire from the shared OPENINGS data,
// and computes mastery summaries / the due queue. A "trainable line" = one
// OpeningLine drilled from the opening's trainerColor. Sibling lines of the same
// opening (e.g. the Sicilian's Najdorf vs Alapin) cover different opponent
// decision points, so interleaving them gives real opponent-branch coverage.

import type { Opening, OpeningLine } from "@/content/openings/types";
import { OPENINGS, getOpening } from "@/content/openings";
import type { TrainerData } from "./store";
import { selectLineState } from "./store";

export interface TrainerLine {
  opening: Opening;
  line: OpeningLine;
  lineIdx: number;
  /** Stable key matching the store: `<openingId>:<color>:<lineSlug>`. */
  key: string;
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function lineKey(
  openingId: string,
  color: string,
  lineLabel: string,
): string {
  return `${openingId}:${color}:${slug(lineLabel)}`;
}

export function openingLines(o: Opening): TrainerLine[] {
  return o.lines.map((line, lineIdx) => ({
    opening: o,
    line,
    lineIdx,
    key: lineKey(o.id, o.trainerColor, line.label),
  }));
}

export function repertoireLines(openingIds: string[]): TrainerLine[] {
  return openingIds
    .map((id) => getOpening(id))
    .filter((o): o is Opening => !!o)
    .flatMap(openingLines);
}

/** Round-robin interleave so a session alternates between openings. */
export function interleave<T>(groups: T[][]): T[] {
  const out: T[] = [];
  const max = groups.reduce((m, g) => Math.max(m, g.length), 0);
  for (let i = 0; i < max; i++) {
    for (const g of groups) if (g[i] !== undefined) out.push(g[i]);
  }
  return out;
}

export interface MasteryCounts {
  mastered: number;
  learning: number;
  total: number;
  /** Lines not yet mastered. */
  due: number;
}

export function masteryCounts(data: TrainerData): MasteryCounts {
  const lines = repertoireLines(data.repertoire);
  let mastered = 0;
  let learning = 0;
  for (const l of lines) {
    const level = selectLineState(data, l.key).level;
    if (level === "mastered") mastered++;
    else if (level === "learning") learning++;
  }
  return {
    mastered,
    learning,
    total: lines.length,
    due: lines.length - mastered,
  };
}

/** The session queue: not-yet-mastered lines, interleaved across openings. */
export function dueQueue(data: TrainerData): TrainerLine[] {
  const byOpening = data.repertoire
    .map((id) => getOpening(id))
    .filter((o): o is Opening => !!o)
    .map((o) =>
      openingLines(o).filter(
        (l) => selectLineState(data, l.key).level !== "mastered",
      ),
    );
  return interleave(byOpening);
}

/** All openings available to add to a repertoire (registry order). */
export function allOpenings(): Opening[] {
  return OPENINGS;
}
