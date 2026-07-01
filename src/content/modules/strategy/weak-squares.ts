// Chess Strategy — Lesson 10: Weak Squares & Outposts. Original prose.
//
// FLAGSHIP masterclass lesson (the template for the rest of the module): the full
// Learn → See → Try → Apply → Review arc.
//   • Learn   — concept + annotated "See" boards (the hole, and the route to it).
//   • See      — a Strategy Lab: the Sveshnikov d5-hole line, with a live eval bar,
//                key-idea callouts, and arrows. Real opening theory (moves = facts).
//   • Try      — Guess the Move on the knight's journey + a themed outpost puzzle.
//   • Apply    — Find the Plan, then convert the win against the engine.
//   • Review   — a judgment call that names the imbalance honestly.
// Every position is engine-verified by `npm run validate`.

import type { Lesson } from "../../types";

export const weakSquaresLesson: Lesson = {
  id: "weak-squares",
  title: "Weak Squares & Outposts",
  summary:
    "A square no pawn can ever defend is a permanent home for an enemy piece — learn to spot one, occupy it, and convert.",
  activities: [
    // ── LEARN ────────────────────────────────────────────────────────────────
    {
      type: "concept",
      id: "weak-squares-concept",
      title: "Weak squares & outposts",
      blurb: "A square no pawn can ever guard.",
      body:
        "A hole is a square one side's pawns have permanently given up. Once a pawn advances past a square, no pawn can ever guard it again — pawns don't move backward, so the weakness never heals. A piece (especially a knight) parked on that square becomes an outpost: it can't be chased by a pawn, and from a central hole like d5 it radiates pressure across the whole board.\n\nThe Imbalance Scan: when you size up a position, hunt for holes in the enemy camp. A central hole that you can occupy and the opponent can't undermine is a lasting trump — often worth steering the whole game toward, even when the material is level.",
      points: [
        "A hole is a square the opponent's pawns can never control again.",
        "Holes appear when a pawn advances (or is traded) and leaves squares behind.",
        "An outpost = a piece on a hole, supported and unkickable. Knights love them.",
        "A permanent outpost is a long-term advantage — don't trade the piece that wants it.",
      ],
      diagrams: [
        {
          // A knight on the d5 hole — the "octopus" reach. Legal display board.
          fen: "6k1/pp3ppp/3p4/3Np3/8/8/PPP2PPP/6K1 w - - 0 1",
          orientation: "white",
          arrows: [
            { from: "d5", to: "e7" },
            { from: "d5", to: "f6" },
            { from: "d5", to: "c7" },
            { from: "d5", to: "b6" },
          ],
          caption:
            "The knight on d5 sits on a hole — Black has no c- or e-pawn to evict it. From there it stabs at e7, f6, c7 and b6 at once.",
        },
        {
          // Where the hole comes from: the Sveshnikov structure (no c-pawn, pawn on
          // e5) means d5 can never be guarded by a Black pawn. Route: Nc3–d5.
          fen: "r1bq1rk1/pp2bppp/2np1n2/4p3/4P3/2NP1N2/PPP1BPPP/R1BQ1RK1 w - - 0 8",
          orientation: "white",
          arrows: [{ from: "c3", to: "d5" }],
          caption:
            "Black's missing c-pawn plus the pawn on e5 leave d5 permanently weak. White's knight heads for it: Nc3–d5 (or the scenic f3–e1–c2–e3–d5).",
        },
      ],
      check: {
        question: "What makes a square a true 'hole' for the opponent?",
        options: [
          "An enemy piece is standing on it right now.",
          "No enemy pawn can ever guard it again.",
          "It is somewhere in the centre of the board.",
        ],
        correctIndex: 1,
        explanation:
          "A hole is defined by pawns, not pieces: it's a square the opponent's pawns have permanently surrendered. That permanence is what makes an outpost there so strong.",
      },
    },

    // ── SEE: Strategy Lab ──────────────────────────────────────────────────────
    {
      type: "replay",
      id: "ws-lab",
      title: "Strategy Lab: the eternal knight",
      blurb: "Watch a permanent outpost appear — with the engine's read alongside.",
      orientation: "white",
      eval: true,
      source: "Open Sicilian — the Sveshnikov d5 structure",
      intro:
        "One of theory's clearest holes. Black accepts a permanent weakness on d5 in return for active piece play. Step through and watch how the outpost is built — and notice the eval bar: the position stays roughly balanced, because a structural trump and dynamic compensation can be worth the same.",
      steps: [
        { san: "e4", note: "A standard opening move." },
        { san: "c5", note: "The Sicilian — Black fights for the centre asymmetrically." },
        { san: "Nf3", note: "Developing toward the centre." },
        { san: "Nc6", note: "Black develops in turn." },
        { san: "d4", note: "Opening the centre." },
        { san: "cxd4", note: "Black trades the c-pawn — note it: that missing c-pawn is the seed of the d5 hole." },
        { san: "Nxd4", note: "Recapturing — the knight reaches a fine central post." },
        { san: "Nf6", note: "Black develops and hits e4." },
        { san: "Nc3", note: "Defending e4 and eyeing d5." },
        {
          san: "e5",
          keyIdea: "The hole is born",
          note: "Black kicks the d4-knight and grabs space — but the moment this pawn passes d5, no Black pawn can ever guard d5 again. The weakness is now permanent.",
          highlights: ["d5"],
        },
        { san: "Ndb5", note: "The knight steps to b5, threatening the d6-square and heading toward the hole." },
        { san: "d6", note: "Black plugs d6 and prepares to develop. The structure is set." },
        { san: "Bg5", note: "Pinning the f6-knight — the knight that guards d5. White chips away at the square's defender." },
        { san: "a6", note: "Kicking the b5-knight, which simply reroutes." },
        { san: "Na3", note: "Retreating with purpose — the knight will swing back via c2/c4, while its partner takes d5." },
        { san: "b5", note: "Black grabs queenside space and eyes the c4-square in return." },
        {
          san: "Nd5",
          keyIdea: "An eternal knight",
          note: "Home at last. The knight on d5 can never be chased by a pawn. Even if Black trades it, recapturing with exd5 hands White a protected passed pawn and the same square. This is the lasting trump the whole line is about.",
          highlights: ["d5"],
          arrows: [
            { from: "d5", to: "f6" },
            { from: "d5", to: "e7" },
          ],
        },
        { san: "Be7", note: "Black unpins and prepares to challenge the knight." },
        { san: "Bxf6", note: "Removing a defender of d5 before Black can play ...Bxd5 cleanly." },
        { san: "Bxf6", note: "Recapturing. Black has the bishop pair and ...f5 breaks coming — that's the dynamic compensation. The struggle is real, but White's outpost is forever." },
      ],
    },

    // ── TRY: Guess the Move ────────────────────────────────────────────────────
    {
      type: "guessMove",
      id: "ws-guess",
      title: "Guess the Move: route the knight",
      blurb: "Predict the moves that steer a knight toward its outpost.",
      orientation: "white",
      source: "Open Sicilian — Sveshnikov",
      intro:
        "You're White. Play the opening forward; at two points you'll predict the move before it's revealed, and the engine will score your choice. Think about the centre and the d5-square.",
      moves: [
        "e4", "c5", "Nf3", "Nc6", "d4", "cxd4", "Nxd4", "Nf6",
        "Nc3", "e5", "Ndb5", "d6", "Nd5",
      ],
      guessAt: [6, 10],
      notes: [
        undefined, undefined, undefined, undefined, undefined, undefined,
        "Recapture toward the centre — the knight lands on a strong central post.",
        undefined, undefined, undefined,
        "Black's ...e5 kicked the knight but created the d5 hole forever. Reroute via b5 — the knight is heading for d5, not retreating in fear.",
        undefined,
        "The knight settles on the hole. No Black pawn can ever evict it.",
      ],
      successText:
        "That's the idea: meet the centre head-on, then march a knight to the permanent square. The outpost is the point of the whole line.",
    },

    // ── TRY: themed puzzle ─────────────────────────────────────────────────────
    {
      type: "puzzle",
      id: "ws-royal-fork",
      title: "The outpost strikes",
      blurb: "Cash in the knight on its home square.",
      fen: "2q3k1/ppp2ppp/8/3N4/8/8/PPP2PPP/6K1 w - - 0 1",
      orientation: "white",
      goal: { type: "win-material", minGain: 3 },
      prompt: "The knight on its d5 outpost has a killing leap — White to play and win material.",
      hints: ["A knight check that also hits the queen.", "Jump into e7."],
      successText:
        "Ne7+ forks king and queen from the outpost — after the king steps aside, Nxc8 wins the queen. That's the outpost converting into material.",
      solution: ["d5e7", "g8f8", "e7c8"],
    },

    // ── APPLY: Find the Plan → convert ─────────────────────────────────────────
    {
      type: "plan",
      id: "ws-plan",
      title: "Find the plan, then convert",
      blurb: "Read the position, choose the plan, and play it out.",
      fen: "2b3k1/pp3ppp/3p4/3Np3/4P3/8/PPP2PP1/3R2K1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "Your knight dominates the d5 hole and you're ahead in material. What's the right plan?",
      options: [
        "Use the outpost's power: leap to e7, win the bishop, then convert the extra material.",
        "Trade the d5-knight for Black's bishop to simplify into an easy ending.",
        "Ignore the knight and push the e-pawn up the board.",
      ],
      correctIndex: 0,
      explanation:
        "The d5-knight is your best piece — never trade it for a passive bishop. Ne7+ forks the king and the c8-bishop; after the king moves, Nxc8 wins it, and with a rook and knight extra the win is straightforward.",
      convert: {
        kind: "drill",
        drill: {
          fen: "2b3k1/pp3ppp/3p4/3Np3/4P3/8/PPP2PP1/3R2K1 w - - 0 1",
          orientation: "white",
          objective: "checkmate",
          engineSkill: 2,
          instructions:
            "White to play. Win the bishop with the outpost knight (Ne7+ then Nxc8), then convert the extra material into checkmate.",
          successText: "Converted. The outpost won material, and the extra force did the rest.",
        },
      },
    },
  ],
};
