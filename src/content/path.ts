// The learning PATH — how the curriculum reads as a journey on the home page.
// This is a home-layer view over the module registry: it references modules by
// id and does NOT change `MODULES`, the `Module` type, or any content. The path
// is a SOFT recommendation (everything stays openable; nothing is gated).
//
// Chess for Kids is intentionally NOT part of the staged adult path — it's a
// separate young-learners on-ramp (see `KIDS_MODULE_ID`).

export interface PathStage {
  id: string;
  /** Short stage name shown on the band header. */
  label: string;
  /** One-line description of what this stage gets you. */
  blurb: string;
  /** Module ids, in recommended order within the stage. */
  moduleIds: string[];
}

/** The kid module — surfaced on its own, apart from the adult stages. */
export const KIDS_MODULE_ID = "chess-for-kids";

/** First room of the adult path — the default starting room for a new adult. */
export const PATH_START_MODULE_ID = "fundamentals";

// Stages map 1:1 to the four difficulty tiers (Beginner → Improver →
// Intermediate → Advanced), so the band label and each room's level chip agree.
export const LEARNING_PATH: PathStage[] = [
  {
    id: "learn",
    label: "Learn the Game",
    blurb:
      "The rules, the goal, and how to stop losing pieces — everything you need to play a real game.",
    moduleIds: ["fundamentals"],
  },
  {
    id: "build",
    label: "Build Your Skills",
    blurb:
      "Recognize the mating patterns on sight and watch great ideas play out in full games.",
    moduleIds: ["checkmate-patterns", "master-games"],
  },
  {
    id: "level-up",
    label: "Level Up",
    blurb:
      "Attacking play, a real opening repertoire, and the calculation that starts winning games.",
    moduleIds: ["intermediate", "attacking-king", "openings"],
  },
  {
    id: "go-deep",
    label: "Go Deep",
    blurb:
      "Judge tricky endgames and think positionally, like a strong club player.",
    moduleIds: ["essential-endgames", "strategy"],
  },
];
