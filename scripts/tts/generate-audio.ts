// Render the extracted dialogue manifest to audio with Gemini TTS, one clip per
// line, into public/audio/dialogue/, and (re)write src/lib/audio/clipManifest.ts.
// Incremental: only lines whose audio file is missing are generated, so a re-run
// after editing content regenerates just the changed lines. Run:
//   GEMINI_API_KEY=... npm run tts:generate    (after `npm run tts:extract`)
//
// Needs a Gemini/Google AI Studio API key. If `ffmpeg` is on PATH, clips are
// transcoded WAV → MP3 (much smaller); otherwise WAV is kept. The clip filename
// (with its real extension) is recorded in clipManifest so the app is
// format-agnostic.

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { GoogleGenAI, Modality } from "@google/genai";

interface Entry {
  key: string;
  speaker: string;
  voice: string;
  mood: string;
  text: string;
}

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const manifestPath = join(here, "manifest.json");
const audioDir = join(repoRoot, "public", "audio", "dialogue");
const clipManifestPath = join(repoRoot, "src", "lib", "audio", "clipManifest.ts");

// Per-character base style + per-line mood → a natural-language delivery hint.
const STYLE: Record<string, string> = {
  pip: "warm, small and eager",
  rookwell: "deep, brave and steady",
  belle: "wise, calm and gentle",
  nim: "bouncy, fast and excitable",
  aurora: "regal, bright and kind",
  cedric: "grand, deep and a little sleepy",
  murk: "sly and mischievous, like a trickster",
  caller: "a warm storyteller",
};
const MOOD: Record<string, string> = {
  idle: "",
  happy: "cheerfully",
  worried: "in a worried voice",
  sly: "slyly",
};
function prompt(e: Entry): string {
  const hint = [STYLE[e.speaker], MOOD[e.mood]].filter(Boolean).join(", ");
  return hint ? `Say this for a children's chess story, ${hint}: ${e.text}` : e.text;
}

/** Wrap raw 24kHz/16-bit/mono PCM (what Gemini TTS returns) in a WAV container. */
function pcmToWav(pcm: Buffer, sampleRate = 24000): Buffer {
  const numCh = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numCh * bitsPerSample) / 8;
  const blockAlign = (numCh * bitsPerSample) / 8;
  const h = Buffer.alloc(44);
  h.write("RIFF", 0);
  h.writeUInt32LE(36 + pcm.length, 4);
  h.write("WAVE", 8);
  h.write("fmt ", 12);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(numCh, 22);
  h.writeUInt32LE(sampleRate, 24);
  h.writeUInt32LE(byteRate, 28);
  h.writeUInt16LE(blockAlign, 32);
  h.writeUInt16LE(bitsPerSample, 34);
  h.write("data", 36);
  h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

// Preview TTS model. Override with TTS_MODEL to use a different model (each model
// has its OWN per-day request quota, so the Pro model is a useful fallback once
// the Flash model's daily cap is spent): TTS_MODEL=gemini-2.5-pro-preview-tts.
const MODEL = process.env.TTS_MODEL ?? "gemini-2.5-flash-preview-tts";
const THROTTLE_MS = 6500; // stay under the ~10 requests/minute TTS quota
const MAX_RETRIES = 12;
const MAX_WAIT_S = 90; // a longer required wait means the DAILY quota is gone — stop and resume later
function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
function bar(pct: number): string {
  const filled = Math.max(0, Math.min(20, Math.round(pct / 5)));
  return "[" + "#".repeat(filled) + "-".repeat(20 - filled) + "]";
}

async function main() {
  // One or more keys (comma-separated GEMINI_API_KEYS, or a single GEMINI_API_KEY).
  // Each project has its own per-day TTS quota, so we rotate to the next key when
  // one is daily-capped — finishing in a single run.
  const keys = (process.env.GEMINI_API_KEYS ?? process.env.GEMINI_API_KEY ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!keys.length) {
    console.error("Set GEMINI_API_KEY or GEMINI_API_KEYS (see .env.example) before tts:generate.");
    process.exit(1);
  }
  if (!existsSync(manifestPath)) {
    console.error("No manifest.json — run `npm run tts:extract` first.");
    process.exit(1);
  }

  const manifest: Entry[] = JSON.parse(readFileSync(manifestPath, "utf8"));
  mkdirSync(audioDir, { recursive: true });
  let ki = 0;
  let ai = new GoogleGenAI({ apiKey: keys[ki] });
  const haveFfmpeg = spawnSync("ffmpeg", ["-version"]).status === 0;

  const startedAt = Date.now();
  const todo = manifest.filter(
    (e) =>
      !existsSync(join(audioDir, `${e.key}.mp3`)) &&
      !existsSync(join(audioDir, `${e.key}.wav`)),
  ).length;
  const etaMin = Math.ceil((todo * (THROTTLE_MS + 1500)) / 60000);
  console.log(
    `Rendering ${todo} clip(s) on ${MODEL} ` +
      `(${manifest.length - todo} already done · ${manifest.length} total · ${keys.length} key(s)). ` +
      `~${etaMin} min if quota holds.\n`,
  );

  const clipFiles: Record<string, string> = {};
  let generated = 0;
  let reused = 0;
  let stop = false; // set when the daily quota is exhausted — finish up gracefully

  for (const e of manifest) {
  const mp3 = `${e.key}.mp3`;
  const wav = `${e.key}.wav`;
  if (existsSync(join(audioDir, mp3))) {
    clipFiles[e.key] = mp3;
    reused++;
    continue;
  }
  if (existsSync(join(audioDir, wav))) {
    clipFiles[e.key] = wav;
    reused++;
    continue;
  }

  // Generate, retrying on 429 (rate limit) honoring the API's retryDelay.
  let b64: string | undefined;
  for (let attempt = 1; ; attempt++) {
    try {
      const resp = await ai.models.generateContent({
        model: MODEL,
        contents: prompt(e),
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: e.voice } } },
        },
      });
      b64 = resp.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      break;
    } catch (err) {
      const msg = (err as Error).message ?? "";
      const rateLimited = /\b429\b|RESOURCE_EXHAUSTED|quota/i.test(msg);
      if (rateLimited) {
        const m = msg.match(/retry in ([\d.]+)s/i) ?? msg.match(/"retryDelay":\s*"(\d+)s"/);
        const waitS = m ? Math.ceil(parseFloat(m[1])) + 2 : 20;
        if (waitS > MAX_WAIT_S) {
          // Daily quota on this key is gone — rotate to the next key if we have one.
          if (ki + 1 < keys.length) {
            ki++;
            ai = new GoogleGenAI({ apiKey: keys[ki] });
            console.log(`  key #${ki} daily-capped — switching to key #${ki + 1} of ${keys.length}`);
            continue; // retry this line on the fresh key
          }
          console.error(
            `✗ ${e.key}: all ${keys.length} key(s) daily-capped. Stopping; re-run later ` +
              `(it resumes incrementally).`,
          );
          stop = true;
          break;
        }
        if (attempt <= MAX_RETRIES) {
          console.log(`  ⏳ ${e.key}: rate-limited, waiting ${waitS}s (try ${attempt})`);
          await sleep(waitS * 1000);
          continue;
        }
      }
      console.error(`✗ ${e.key}: ${msg.slice(0, 140)}`);
      break;
    }
  }
  if (stop) break;
  if (!b64) continue;

  writeFileSync(join(audioDir, wav), pcmToWav(Buffer.from(b64, "base64")));
  let file = wav;
  if (haveFfmpeg) {
    const r = spawnSync("ffmpeg", [
      "-y", "-i", join(audioDir, wav),
      "-codec:a", "libmp3lame", "-qscale:a", "6",
      join(audioDir, mp3),
    ]);
    if (r.status === 0) {
      rmSync(join(audioDir, wav));
      file = mp3;
    }
  }
  clipFiles[e.key] = file;
  generated++;
  const done = generated + reused;
  const pct = Math.round((done / manifest.length) * 100);
  console.log(
    `[${String(done).padStart(3)}/${manifest.length}] ${String(pct).padStart(3)}% ` +
      `${bar(pct)} key#${ki + 1}/${keys.length} ✓ ${e.key} (${e.voice})`,
  );
  await sleep(THROTTLE_MS);
}

// Prune any audio files no longer referenced by the manifest.
const valid = new Set(Object.values(clipFiles));
for (const f of readdirSync(audioDir)) {
  if (!valid.has(f)) {
    rmSync(join(audioDir, f));
    console.log(`· pruned stale ${f}`);
  }
}

// Rewrite the committed clip manifest the app reads.
const body = Object.keys(clipFiles)
  .sort()
  .map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(clipFiles[k])},`)
  .join("\n");
writeFileSync(
  clipManifestPath,
  `// AUTO-GENERATED by scripts/tts/generate-audio.ts — do not edit by hand.\n` +
    `// Maps a dialogue clip key (see dialogueKey.ts) to its audio filename under\n` +
    `// public/audio/dialogue/. Empty until \`npm run tts:generate\` has rendered clips;\n` +
    `// while empty, speakAs() falls back to the Web Speech voice for every line.\n` +
    `export const CLIP_FILES: Record<string, string> = {\n${body}\n};\n`,
);

  const elapsed = Math.round((Date.now() - startedAt) / 1000);
  const mm = Math.floor(elapsed / 60);
  const ss = elapsed % 60;
  console.log(
    `\nDone in ${mm}m${ss}s: ${generated} generated, ${reused} reused, ` +
      `${Object.keys(clipFiles).length}/${manifest.length} total clips.`,
  );
}

void main();
