// Placement diagnostic — a short, graduated quiz that estimates a learner's level
// and flags weak areas, then points them at the right room. No backend; the result
// persists in localStorage (see placementStore) and feeds the Hall.
//
// Items are multiple-choice (some with a display board). Board FENs and their
// correct answers are reused from already-engine-verified module positions, so the
// chess is sound. Difficulty `level` 1 (basics) → 4 (advanced); `theme` drives the
// weak-area flags.

export type PlacementTheme =
  | "rules"
  | "tactics"
  | "mate"
  | "openings"
  | "endgames"
  | "strategy";

export interface DiagnosticItem {
  id: string;
  theme: PlacementTheme;
  /** 1 = basics … 4 = advanced. */
  level: 1 | 2 | 3 | 4;
  question: string;
  /** Optional display-only board. */
  board?: { fen: string; orientation: "white" | "black" };
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ~11 items spanning every theme and all four difficulty tiers. Board positions
// are lifted from verified module content.
export const PLACEMENT_ITEMS: DiagnosticItem[] = [
  {
    id: "p-rules",
    theme: "rules",
    level: 1,
    question: "Not counting the clock, how do you WIN a game of chess?",
    options: ["Checkmate — trap the king with no legal escape", "Capture the enemy king", "Capture the enemy queen"],
    correctIndex: 0,
    explanation: "You win by checkmate: the king is attacked and has no legal move. The king is never actually captured.",
  },
  {
    id: "p-values",
    theme: "tactics",
    level: 1,
    question: "Using the usual values (pawn 1, knight/bishop 3, rook 5, queen 9), which trade WINS material?",
    options: ["Give a knight (3) to take a rook (5)", "Give a rook (5) to take a bishop (3)", "Give a queen (9) to take a rook (5)"],
    correctIndex: 0,
    explanation: "Trading a knight for a rook wins 'the exchange' — a clear material gain. The others lose material.",
  },
  {
    id: "p-backrank",
    theme: "mate",
    level: 1,
    question: "White to play. What's the move?",
    board: { fen: "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1", orientation: "white" },
    options: ["Ra8 — checkmate on the back rank", "Kf2 — improve the king", "Ra7 — attack the pawns"],
    correctIndex: 0,
    explanation: "Ra8# is the back-rank mate — the king is fenced in by its own f7/g7/h7 pawns.",
  },
  {
    id: "p-openings",
    theme: "openings",
    level: 2,
    question: "Which trio best captures the goals of a good opening?",
    options: ["Control the centre, develop your pieces, castle", "Bring the queen out early, grab pawns, trade queens", "Push the h-pawn, fianchetto both bishops, double rooks"],
    correctIndex: 0,
    explanation: "Centre, develop, castle — the three opening principles every sound opening follows.",
  },
  {
    id: "p-fork",
    theme: "tactics",
    level: 2,
    question: "White to play and win material. What's the move?",
    board: { fen: "3q3k/ppp5/8/6N1/8/8/PPP5/6K1 w - - 0 1", orientation: "white" },
    options: ["Nf7+ — a knight fork of the king and queen", "Ne6 — centralise the knight", "Nh7 — attack the king"],
    correctIndex: 0,
    explanation: "Nf7+ forks the king and queen; after the king moves, Nxd8 wins the queen.",
  },
  {
    id: "p-kp",
    theme: "endgames",
    level: 2,
    question: "In a king-and-pawn endgame, the golden rule is to...",
    options: ["Lead with your KING in front of the pawn", "Push the pawn as fast as possible", "Keep the king back on its starting square"],
    correctIndex: 0,
    explanation: "Lead with the king and use the opposition to clear a path; a pawn that races ahead of its king gets blockaded.",
  },
  {
    id: "p-arabian",
    theme: "mate",
    level: 3,
    question: "White to play. The knight guards g8 and h7 — what's the move?",
    board: { fen: "7k/3R4/5N2/8/8/8/8/6K1 w - - 0 1", orientation: "white" },
    options: ["Rh7 — checkmate (the Arabian mate)", "Rd8+ — check the king", "Ng4 — reposition the knight"],
    correctIndex: 0,
    explanation: "Rh7# is the Arabian mate: the knight on f6 covers g8 and defends the rook, trapping the king in the corner.",
  },
  {
    id: "p-outpost",
    theme: "strategy",
    level: 3,
    question: "White's knight sits on d5, guarded by the e4-pawn, where no black pawn can attack it. That square is called...",
    board: { fen: "6k1/pp3ppp/8/3N4/4P3/8/PP3PPP/6K1 w - - 0 1", orientation: "white" },
    options: ["An outpost — a dream home for the knight", "A pin", "A fianchetto"],
    correctIndex: 0,
    explanation: "A pawn-protected advanced square the enemy can't challenge with a pawn is an outpost — ideal for a knight.",
  },
  {
    id: "p-ocb",
    theme: "endgames",
    level: 3,
    question: "White is a clean pawn up, but the bishops are on opposite colours and Black blockades. Won or drawn?",
    board: { fen: "8/8/4k3/8/3KP3/3B4/8/4b3 w - - 0 1", orientation: "white" },
    options: ["Drawn — opposite bishops are famously drawish", "Winning for White — an extra pawn always wins", "Winning for Black"],
    correctIndex: 0,
    explanation: "With opposite-coloured bishops the defender blockades on his own colour; an extra pawn (often two) usually can't break through.",
  },
  {
    id: "p-bishop-vs-knight",
    theme: "strategy",
    level: 4,
    question: "Open position, pawns on BOTH wings, an endgame down to one minor piece each. Which is usually better?",
    options: ["The bishop — long range covers both flanks", "The knight — it can fork", "They're always exactly equal"],
    correctIndex: 0,
    explanation: "On an open board with targets on both wings, the long-range bishop outclasses the short-stepping knight.",
  },
  {
    id: "p-remove-defender",
    theme: "tactics",
    level: 4,
    question: "White to play. Black's e5-bishop is defended by the d7-knight. What's the winning idea?",
    board: { fen: "3r2k1/3n1ppp/8/1B2b3/8/5N2/5PPP/R4K2 w - - 0 1", orientation: "white" },
    options: ["Bxd7 — remove the defender, then Nxe5 wins the bishop", "Nxe5 — take it at once", "Rd1 — pin the knight"],
    correctIndex: 0,
    explanation: "Bxd7 removes the only defender of e5; after Rxd7, Nxe5 wins the bishop — 'removing the defender'.",
  },
];

export type PlacementLevel = "Beginner" | "Improver" | "Intermediate" | "Advanced";

export interface PlacementResult {
  level: PlacementLevel;
  /** 0–100 weighted score. */
  scorePct: number;
  correct: number;
  total: number;
  /** Themes the learner answered below half-right — areas to shore up. */
  weakThemes: PlacementTheme[];
  /** Best module/tool to start in. */
  recommendedHref: string;
  recommendedLabel: string;
  takenAt: number;
}

const THEME_TARGET: Record<PlacementTheme, { href: string; label: string }> = {
  rules: { href: "/modules/fundamentals", label: "Chess Fundamentals" },
  tactics: { href: "/modules/checkmate-patterns", label: "Checkmating Patterns" },
  mate: { href: "/modules/checkmate-patterns", label: "Checkmating Patterns" },
  openings: { href: "/modules/openings", label: "Chess Openings" },
  endgames: { href: "/modules/essential-endgames", label: "Essential Endgames" },
  strategy: { href: "/modules/strategy", label: "Chess Strategy" },
};

const LEVEL_START: Record<PlacementLevel, { href: string; label: string }> = {
  Beginner: { href: "/modules/fundamentals", label: "Chess Fundamentals" },
  Improver: { href: "/modules/fundamentals", label: "Chess Fundamentals" },
  Intermediate: { href: "/modules/intermediate", label: "Intermediate Chess" },
  Advanced: { href: "/modules/strategy", label: "Chess Strategy" },
};

/** Score answers (index per item id) into a placement result. */
export function scorePlacement(answers: Record<string, number>, takenAt: number): PlacementResult {
  let points = 0;
  let maxPoints = 0;
  let correct = 0;
  const themeTotals: Partial<Record<PlacementTheme, { right: number; total: number }>> = {};

  for (const item of PLACEMENT_ITEMS) {
    maxPoints += item.level;
    const t = (themeTotals[item.theme] ??= { right: 0, total: 0 });
    t.total++;
    if (answers[item.id] === item.correctIndex) {
      points += item.level;
      correct++;
      t.right++;
    }
  }

  const scorePct = maxPoints ? Math.round((points / maxPoints) * 100) : 0;
  const level: PlacementLevel =
    scorePct < 35 ? "Beginner" : scorePct < 62 ? "Improver" : scorePct < 85 ? "Intermediate" : "Advanced";

  const weakThemes = (Object.keys(themeTotals) as PlacementTheme[]).filter((th) => {
    const t = themeTotals[th]!;
    return t.right / t.total < 0.5;
  });

  // Recommend the level's starting module — unless a clear weak theme suggests a
  // targeted room first.
  const start = LEVEL_START[level];
  let recommendedHref = start.href;
  let recommendedLabel = start.label;
  if (level !== "Beginner" && weakThemes.length) {
    const tgt = THEME_TARGET[weakThemes[0]];
    recommendedHref = tgt.href;
    recommendedLabel = tgt.label;
  }

  return {
    level,
    scorePct,
    correct,
    total: PLACEMENT_ITEMS.length,
    weakThemes,
    recommendedHref,
    recommendedLabel,
    takenAt,
  };
}

export const THEME_LABEL: Record<PlacementTheme, string> = {
  rules: "the rules",
  tactics: "tactics",
  mate: "checkmating patterns",
  openings: "openings",
  endgames: "endgames",
  strategy: "strategy",
};
