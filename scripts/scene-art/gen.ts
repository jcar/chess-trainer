// Shared Nano Banana Pro image client for the scene-art generators. Wraps
// @google/genai with the same resilience the TTS generator uses: multiple keys
// (GEMINI_API_KEYS, comma-separated) rotated when one is daily-capped, a throttle
// between requests, and 429 retry honoring the API's retryDelay. Returns the raw
// image bytes + mime type for one prompt (text + optional reference images).

import { GoogleGenAI, Modality } from "@google/genai";

// Nano Banana Pro. Override with IMAGE_MODEL (the original "Nano Banana" is
// gemini-2.5-flash-image). Preview ids can change — smoke-test before a bulk run.
export const IMAGE_MODEL = process.env.IMAGE_MODEL ?? "gemini-3-pro-image-preview";
const THROTTLE_MS = Number(process.env.IMAGE_THROTTLE_MS ?? 4000);
const MAX_RETRIES = 10;
const MAX_WAIT_S = 90; // longer required wait ⇒ daily quota gone ⇒ rotate/stop

export interface RefImage {
  mime: string;
  base64: string;
}
export interface GenResult {
  bytes: Buffer;
  mime: string;
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export class ImageGen {
  private keys: string[];
  private ki = 0;
  private ai: GoogleGenAI;
  /** Set true once every key is daily-capped — caller should stop and resume later. */
  capped = false;

  constructor() {
    this.keys = (process.env.GEMINI_API_KEYS ?? process.env.GEMINI_API_KEY ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!this.keys.length) {
      throw new Error("Set GEMINI_API_KEY or GEMINI_API_KEYS before running image generation.");
    }
    this.ai = new GoogleGenAI({ apiKey: this.keys[0] });
  }

  get keyCount(): number {
    return this.keys.length;
  }
  get keyLabel(): string {
    return `key#${this.ki + 1}/${this.keys.length}`;
  }

  /** Generate one image. `refs` are reference images for character/style
   *  consistency; `aspectRatio` defaults to wide 16:9 (scenes), pass "1:1" etc.
   *  for portraits. */
  async generate(
    promptText: string,
    refs: RefImage[] = [],
    aspectRatio = "16:9",
  ): Promise<GenResult | null> {
    const parts: Array<Record<string, unknown>> = refs.map((r) => ({
      inlineData: { mimeType: r.mime, data: r.base64 },
    }));
    parts.push({ text: promptText });

    for (let attempt = 1; ; attempt++) {
      try {
        const resp = await this.ai.models.generateContent({
          model: IMAGE_MODEL,
          contents: [{ role: "user", parts }],
          config: {
            responseModalities: [Modality.IMAGE],
            imageConfig: { aspectRatio },
          },
        });
        const out = resp.candidates?.[0]?.content?.parts ?? [];
        const img = out.find((p) => p.inlineData?.data);
        if (!img?.inlineData?.data) return null;
        await sleep(THROTTLE_MS);
        return {
          bytes: Buffer.from(img.inlineData.data, "base64"),
          mime: img.inlineData.mimeType ?? "image/png",
        };
      } catch (err) {
        const msg = (err as Error).message ?? "";
        const rateLimited = /\b429\b|RESOURCE_EXHAUSTED|quota/i.test(msg);
        // A billing/plan 429 means this key has NO image quota at all (not a
        // transient per-minute limit) — don't burn 10 retries; rotate or stop now.
        const noQuota = /check your plan and billing|billing details|free tier|FreeTier/i.test(msg);
        if (rateLimited) {
          const m = msg.match(/retry in ([\d.]+)s/i) ?? msg.match(/"retryDelay":\s*"(\d+)s"/);
          const waitS = m ? Math.ceil(parseFloat(m[1])) + 2 : 20;
          if (noQuota || waitS > MAX_WAIT_S) {
            if (this.ki + 1 < this.keys.length) {
              this.ki++;
              this.ai = new GoogleGenAI({ apiKey: this.keys[this.ki] });
              console.log(`  key daily-capped — switching to ${this.keyLabel}`);
              continue;
            }
            console.error(`✗ all ${this.keys.length} key(s) daily-capped. Stopping; re-run to resume.`);
            this.capped = true;
            return null;
          }
          if (attempt <= MAX_RETRIES) {
            console.log(`  ⏳ rate-limited, waiting ${waitS}s (try ${attempt})`);
            await sleep(waitS * 1000);
            continue;
          }
        }
        console.error(`✗ ${msg.slice(0, 160)}`);
        return null;
      }
    }
  }
}

/** Map an image mime type to a file extension. */
export function extFor(mime: string): string {
  if (mime.includes("webp")) return "webp";
  if (mime.includes("jpeg") || mime.includes("jpg")) return "jpg";
  return "png";
}
