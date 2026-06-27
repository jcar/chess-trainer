// Art direction for "Pip & the Grey" bespoke scene illustrations (Nano Banana
// Pro). One cohesive storybook style, the six land settings, and a locked
// appearance for each cast member. Both generators import this so the cast and
// style stay identical across the character model sheets (refs) and every scene.
//
// NOTE on color: images are always generated in FULL color. The app drains color
// per-scene at runtime via a CSS grayscale() filter (SceneArt.colorAmount), so we
// never bake the "Grey" into a render — that would double-desaturate.

/** The shared style preamble — the single most important consistency lever. */
export const STYLE_BIBLE =
  "Children's picture-book illustration in a warm, cozy painterly storybook style: " +
  "soft gouache and colored-pencil textures, rounded friendly shapes, gentle warm " +
  "lighting, rich but soft saturated colors, clean uncluttered composition with one " +
  "clear focal character, expressive and heartwarming, suitable for ages 5-8, " +
  "whimsical fairy-tale mood. Characters are charming anthropomorphic chess pieces. " +
  "Absolutely NO text, letters, numbers, words, captions, or logos anywhere in the image.";

/** The six story settings (SceneActivity.backdrop → environment description). */
export const SETTINGS: Record<string, string> = {
  kingdom:
    "the Square Kingdom: a grand fairy-tale castle of pale stone rising above a vast " +
    "checkerboard plaza of 64 squares, soft blue sky and a warm round sun, red pennants on the towers",
  meadow:
    "the Battle Meadow: rolling green hills dotted with little wildflowers (red, yellow, pink) " +
    "under a wide bright sky, a gentle sun, distant soft horizon",
  heights:
    "Castle Heights: towering blue-grey mountain ramparts reaching above fluffy white clouds, " +
    "a small bright banner planted at the windswept peak, crisp high-altitude air",
  road:
    "the Champions' Road: a sunlit winding road climbing through golden rolling hills, " +
    "lined with tall colorful tournament banners, warm late-afternoon light",
  forest:
    "the Trickster Forest: a deep mossy enchanted woodland of layered leafy trees, dappled light, " +
    "and mysterious friendly glowing eyes peeking from the soft shadows",
  throne:
    "Pip's Arena, the royal throne hall: a warm regal chamber with a golden throne on a checkerboard " +
    "floor, a rich red carpet, tall windows and sparkling motes of golden light",
};

/** Locked visual description per character (CharacterId → appearance). The
 *  "caller" is the child/viewer and is never depicted. */
export const APPEARANCES: Record<string, string> = {
  pip:
    "Pip, a small round friendly chess PAWN character, smooth teal-turquoise body (#16959c), " +
    "a round ball head, big eager hopeful eyes, tiny arms — the brave little hero, the smallest piece",
  rookwell:
    "Sir Rookwell, a sturdy brave chess ROOK (castle-tower) character, warm terracotta-brown stone (#b45309), " +
    "crenellated battlement top, kind steady eyes, a noble knightly bearing",
  belle:
    "Bishop Belle, a wise gentle chess BISHOP character, soft purple (#7c3aed), a tall smooth mitre hat " +
    "with the classic diagonal slit, calm caring eyes, a serene mentor",
  nim:
    "Nim, an excitable chess KNIGHT character shaped like a spirited horse-head, bright sky-blue (#0ea5e9), " +
    "a flowing mane, big bouncy grin, full of leaping energy",
  aurora:
    "Queen Aurora, a radiant chess QUEEN character, hot-pink rose (#db2777), an elegant beaded crown with " +
    "rounded points, a warm regal glow, graceful and kind",
  cedric:
    "King Cedric, a grand chess KING character, golden-brown (#a16207), a tall crown topped with a small cross, " +
    "a big gentle beard-like base, a sleepy good-natured face",
  murk:
    "Murk, a sly trickster MAGPIE bird, slate blue-grey plumage (#475569) with a white belly, a glossy black " +
    "head, one gleaming yellow eye, a sharp orange beak, a mischievous crooked grin",
};

/** Per-line mood → a face/posture hint for the focal character. */
export const MOOD_HINT: Record<string, string> = {
  idle: "calm and curious",
  happy: "joyful and smiling",
  worried: "wide-eyed and worried",
  sly: "sly and scheming",
};
