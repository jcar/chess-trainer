// Catalog taxonomy + search for the Openings Trainer browse page. Kept here (not
// in the content files) so the section scheme is data-driven and easy to tweak.
//
// Layout: a "Start here" section (the curated Core openings) followed by the full
// catalog in refined sections — the large 1.d4 family is split into themed groups,
// and "Other 1.e4 Defences" is renamed to the clearer "Defences to 1.e4".

import type { Opening } from "@/content/openings/types";
import { allOpenings } from "./lines";

export interface CatalogSection {
  label: string;
  match: (o: Opening) => boolean;
}

const inIds =
  (...ids: string[]) =>
  (o: Opening) =>
    ids.includes(o.id);

/** Browse-all sections, in display order. Every opening matches exactly one. */
export const CATALOG_SECTIONS: CatalogSection[] = [
  { label: "1.e4 e5 — Open Games", match: (o) => o.family === "1e4-e5" },
  { label: "Defences to 1.e4", match: (o) => o.family === "1e4-other" },
  {
    label: "Queen's Gambit & Slav",
    match: inIds(
      "queens-gambit-declined",
      "queens-gambit-accepted",
      "slav-defence",
      "semi-slav",
      "queens-gambit",
    ),
  },
  {
    label: "Indian Defences",
    match: inIds(
      "kings-indian",
      "nimzo-indian",
      "queens-indian",
      "bogo-indian",
      "grunfeld",
      "benoni",
      "benko-gambit",
    ),
  },
  {
    label: "1.d4 systems — London & Dutch",
    match: inIds("london-system", "dutch-defence"),
  },
  { label: "Flank Openings", match: (o) => o.family === "flank" },
];

/** The curated starter openings, in registry order, for the "Start here" section. */
export function coreOpenings(): Opening[] {
  return allOpenings().filter((o) => o.tier === "core");
}

/** lowercase + strip diacritics, so "reti"/"grunfeld" match "Réti"/"Grünfeld". */
export function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Live search: normalized substring over name, eco, first moves, and aliases. */
export function matchesQuery(o: Opening, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;
  const hay = normalize(
    [o.name, o.eco ?? "", o.firstMoves, ...(o.aliases ?? [])].join(" "),
  );
  return hay.includes(q);
}
