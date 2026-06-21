// Enumerates the trainable lines for a repertoire from the shared OPENINGS data,
// and computes mastery summaries / the due queue. A "trainable line" = one
// OpeningLine drilled from the opening's trainerColor. Sibling lines of the same
// opening (e.g. the Sicilian's Najdorf vs Alapin) cover different opponent
// decision points, so interleaving them gives real opponent-branch coverage.

import type { Opening, OpeningLine } from "@/content/openings/types";
import { OPENINGS, getOpening } from "@/content/openings";
import type { SrsData } from "../srs/store";
import { isDue } from "../srs/store";

/** SRS namespace for opening lines (kept distinct from tactics-puzzle ids). */
export const srsKey = (lineKey: string): string => `ol:${lineKey}`;
/** Leitner box at which a line counts as "mastered" (retained over ~weeks). */
const MASTER_BOX = 3;

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

export function masteryCounts(srs: SrsData, openingIds: string[]): MasteryCounts {
  const lines = repertoireLines(openingIds);
  const now = Date.now();
  let mastered = 0;
  let learning = 0;
  let due = 0;
  for (const l of lines) {
    const it = srs[srsKey(l.key)];
    if (it && it.box >= MASTER_BOX) mastered++;
    else if (it) learning++;
    if (isDue(srs, srsKey(l.key), now)) due++;
  }
  return { mastered, learning, total: lines.length, due };
}

/** The session queue (true spaced repetition): lines whose review is DUE now
 *  (most-overdue / missed first via the SRS), then never-seen lines, interleaved
 *  across openings so a session mixes them. */
export function dueQueue(srs: SrsData, openingIds: string[]): TrainerLine[] {
  const now = Date.now();
  const byOpening = openingIds
    .map((id) => getOpening(id))
    .filter((o): o is Opening => !!o)
    .map((o) => {
      const ls = openingLines(o);
      const dueLines = ls
        .filter((l) => {
          const it = srs[srsKey(l.key)];
          return !!it && it.due <= now;
        })
        .sort((a, b) => {
          const A = srs[srsKey(a.key)]!;
          const B = srs[srsKey(b.key)]!;
          if (B.lapses !== A.lapses) return B.lapses - A.lapses; // mistakes first
          return A.due - B.due;
        });
      const fresh = ls.filter((l) => !srs[srsKey(l.key)]);
      return [...dueLines, ...fresh];
    });
  return interleave(byOpening);
}

/** All openings available to add to a repertoire (registry order). */
export function allOpenings(): Opening[] {
  return OPENINGS;
}
