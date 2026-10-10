// Voiceover for clips: turns a line of text into a WAV file. Used by render.mjs for lessons with `voice:`.
//
// Engine: Kokoro (kokoro-js, the same model Waypoints Audio uses), run in Node on the CPU. It is not a site
// dependency: CI installs it only when a voiced clip needs recording (`npm install --no-save kokoro-js`), and the
// model (about 90 MB, q8) downloads from Hugging Face on first use.
// WP_VOICE_ENGINE=flite uses ffmpeg's built-in flite voice instead: robotic, but needs no download. For local tests
// of timing and mixing only; never publish flite clips.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
export const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX';
export const ENGINE = process.env.WP_VOICE_ENGINE || 'kokoro';
const LEXICON_FILE = join(here, 'voice-lexicon.json');
const lexicon = JSON.parse(readFileSync(LEXICON_FILE, 'utf8'));

export { VOICES, voiceSpec } from './lesson-core.mjs';

/** Everything that changes how a clip sounds: part of a voiced clip's hash. */
export function voiceHashInput(spec) {
  return JSON.stringify({ spec, ENGINE, MODEL_ID }) + readFileSync(fileURLToPath(import.meta.url), 'utf8') + readFileSync(LEXICON_FILE, 'utf8');
}

const spellTag = (t) => lexicon.tags[t.toLowerCase()] ?? t;

/**
 * Text as it should be heard. The caption and transcript keep the original; only the audio changes.
 * Kokoro reads dashes and colons with odd inflection (Waypoints Audio found this), so they become pauses.
 * Code is read the way a teacher would say it: "</ul>" -> "closing U L", "forward(100)" -> "forward 100".
 */
export function forSpeech(text) {
  let s = String(text);
  s = s.replace(/<\/\s*([a-z][a-z0-9]*)\s*>/gi, (_, t) => ` closing ${spellTag(t)} `);
  s = s.replace(/<\s*([a-z][a-z0-9]*)[^>]*>/gi, (_, t) => ` ${spellTag(t)} `);
  s = s.replace(/\b([a-z_]\w*)\(([^()]*)\)/gi, (_, f, a) => ` ${f} ${a.replace(/,/g, ' ')} `);
  s = s.replace(/(\d)(px|fr|em|rem|%)\b/g, (_, n, u) => `${n} ${{ px: 'pixels', fr: 'fraction', em: 'em', rem: 'rem', '%': 'percent' }[u]}`);
  // CSS "property: value" is said without the pause a colon would add: "display: flex" -> "display flex".
  s = s.replace(/\b(display|gap|width|height|color|background|padding|margin|border|font-size|text-align|grid-template-columns)\s*:\s*(?=[a-z0-9#])/g, '$1 ');
  s = s.replace(/\b([a-z]+)-(?=[a-z])/g, '$1 '); // grid-template-columns -> grid template columns
  for (const [w, say] of Object.entries(lexicon.words)) s = s.replace(new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'), say);
  return s
    .replace(/\s*(—|–|--)\s*/g, ', ')
    .replace(/\s*:\s*/g, ', ')
    .replace(/\s*,\s*,/g, ', ')
    .replace(/\s+([.,!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export const wordCount = (t) => String(t).trim().split(/\s+/).filter(Boolean).length;

let kokoro = null;
async function kokoroModel() {
  if (kokoro) return kokoro;
  let KokoroTTS;
  try { ({ KokoroTTS } = await import('kokoro-js')); }
  catch { throw new Error('voiced clips need kokoro-js: run `npm install --no-save kokoro-js` (or set WP_VOICE_ENGINE=flite to test locally)'); }
  kokoro = await KokoroTTS.from_pretrained(MODEL_ID, { dtype: 'q8', device: 'cpu' });
  return kokoro;
}

const seconds = (file) => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file]).toString().trim());

/**
 * Speak one line into dir. Returns { file, seconds, text }. Same text and voice give the same file name,
 * so a line repeated within a run is generated once.
 */
export async function synth(text, spec, dir) {
  mkdirSync(dir, { recursive: true });
  const spoken = forSpeech(text);
  const file = join(dir, createHash('sha1').update(`${ENGINE}|${spec.name}|${spec.speed}|${spoken}`).digest('hex').slice(0, 12) + '.wav');
  if (!existsSync(file)) {
    if (ENGINE === 'flite') {
      const tf = file.replace(/\.wav$/, '.txt');
      writeFileSync(tf, spoken);
      execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'lavfi', '-i', `flite=textfile=${tf}:voice=slt`, '-filter:a', `atempo=${spec.speed}`, file]);
    } else {
      const model = await kokoroModel();
      const audio = await model.generate(spoken, { voice: spec.name, speed: spec.speed });
      await audio.save(file);
    }
  }
  return { file, seconds: seconds(file), text: String(text), spoken };
}
