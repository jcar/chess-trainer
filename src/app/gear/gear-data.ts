// Curated gear recommendations for the Gear Guide (/gear). This is NOT curriculum,
// so it lives with the route rather than in src/content/.
//
// Monetization: Amazon Associates. Everything account-specific is the single
// AMAZON_TAG below — fill it in after joining the program, then replace each
// item's "TODO" asin with a real product ASIN. Items still marked "TODO" render
// as plain text (no live link), so nothing ships as a dead/misleading link.

/** Your Amazon Associates store tag, e.g. "chesshall-20". Owner fills this in. */
export const AMAZON_TAG = "REPLACE-WITH-YOUR-TAG-20";

/** Build an affiliate product URL from an Amazon ASIN. */
export function amazonLink(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
}

export type GearItem = {
  name: string;
  /** One short line on why we like it / who it's for. */
  why: string;
  /** Amazon ASIN, or "TODO" until the owner picks a real product. */
  asin: string;
};

export type GearCategory = {
  title: string;
  blurb: string;
  items: GearItem[];
};

// Placeholder picks, grouped to match the modules' audience (kids/beginners →
// intermediate). Swap each "TODO" for a real ASIN once chosen.
export const GEAR_CATEGORIES: GearCategory[] = [
  {
    title: "First boards & sets",
    blurb: "A real board to play on away from the screen — start here.",
    items: [
      {
        name: "Kid-friendly starter set",
        why: "Chunky, durable pieces sized for small hands — perfect for the Chess for Kids journey.",
        asin: "TODO",
      },
      {
        name: "Standard tournament set (roll-up)",
        why: "The classic green-and-buff vinyl board with weighted plastic pieces. What clubs actually use.",
        asin: "TODO",
      },
      {
        name: "Wooden set for the home",
        why: "A handsome wooden board that looks at home on a shelf or coffee table.",
        asin: "TODO",
      },
    ],
  },
  {
    title: "Books to learn from",
    blurb: "Pairs nicely with the lessons here — from first moves to real tactics.",
    items: [
      {
        name: "A first chess book for kids",
        why: "Friendly, illustrated, and gentle — great alongside the kid modules.",
        asin: "TODO",
      },
      {
        name: "Beginner fundamentals guide",
        why: "Locks in the basics: opening principles, simple tactics, and basic checkmates.",
        asin: "TODO",
      },
      {
        name: "Tactics puzzle workbook",
        why: "Hundreds of puzzles to sharpen the pattern recognition you build in the Tactics room.",
        asin: "TODO",
      },
    ],
  },
  {
    title: "Accessories",
    blurb: "For when you're ready to play timed games like the clubs do.",
    items: [
      {
        name: "Digital chess clock",
        why: "Adds time controls to home games — a fun next step once the rules feel natural.",
        asin: "TODO",
      },
      {
        name: "Board & piece bag",
        why: "Keeps a tournament set together and ready to take to a club or a friend's house.",
        asin: "TODO",
      },
    ],
  },
];
