// Hidden-assumptions scan (ROADMAP › Hidden assumptions audit; BUILDING › 1, step 4).
//
// Every lesson can say, in frontmatter, which concepts it teaches and which it relies on:
//   introduces: [remainder, text-char]   taught here (the lesson explains it; later lessons may use it)
//   assumes:    [radio-value]            relied on, taught in an earlier lesson (checked, not scanned)
//   recipes:    [bitwise]                on screen but not taught: the lesson labels it "copy this for now"
// The scan reads the code students see (every `file#region` the lesson names, except `sol-*` regions, and
// fenced makecode, python, html and css blocks), finds the constructs in CONCEPTS, and warns (never fails) when a lesson uses a
// concept that no earlier lesson introduces and the lesson neither introduces nor labels as a recipe.
// A recipe labelled in an earlier lesson counts as seen for later ones. "Earlier" means a lower `order` in the same course, or any lesson of a course it follows (`after:` in
// code/index.md, followed transitively). An optional lesson's concepts count only for later optional lessons.
//
//   node tools/concepts.mjs            lint (the same warnings `npm run validate` prints)
//   node tools/concepts.mjs --report   per course: each lesson's concepts, new ones marked, untagged first uses
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const strip = (code) => code
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
  .replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`[^`]*`/g, '""');   // string contents never count
/** Python: drop comments and triple-quoted text; `code` has string contents emptied, `raw` keeps the strings. */
function stripPy(code) {
  code = code.replace(/'''[\s\S]*?'''|"""[\s\S]*?"""/g, '""');
  const raw = [], clean = [];
  for (const line of code.split('\n')) {
    let out = '', q = '';
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) { out += ch; if (ch === '\\') out += line[++i] ?? ''; else if (ch === q) q = ''; continue; }
      if (ch === '"' || ch === "'") { q = ch; out += ch; continue; }
      if (ch === '#') break;
      out += ch;
    }
    raw.push(out); clean.push(out.replace(/(["'])(?:\\.|(?!\1).)*\1/g, '""'));
  }
  return { code: clean.join('\n'), raw: raw.join('\n') };
}
/** HTML and CSS: `code` is the markup (comments dropped, the inside of <style> removed, attribute values kept),
 *  `raw` is the CSS (every <style> block, every style="…" attribute, and any code with no tags, such as a region
 *  inside a <style> block), so CSS words in page text never count. */
function stripHtml(code) {
  code = code.replace(/<!--[\s\S]*?-->/g, '');
  const css = [];
  const markup = code
    .replace(/<style\b[^>]*>([\s\S]*?)(<\/style>|$)/gi, (_, c) => { css.push(c); return '<style></style>'; })
    .replace(/\sstyle\s*=\s*("[^"]*"|'[^']*')/gi, (m, v) => { css.push(`x{${v.slice(1, -1)}}`); return m; });
  return { code: markup, raw: css.join('\n').replace(/\/\*[\s\S]*?\*\//g, '') };
}
/** Split joined HTML lesson code into markup and CSS; a region with no tags at all is CSS (a region inside <style>). */
function splitHtml(chunks) {
  const parts = chunks.map((c) => (/<[a-zA-Z!/]/.test(c) ? stripHtml(c) : { code: '', raw: c.replace(/\/\*[\s\S]*?\*\//g, '') }));
  return { code: parts.map((p) => p.code).join('\n'), raw: parts.map((p) => p.raw).join('\n') };
}
const tag = (names) => new RegExp(`<(${names})\\b`, 'i');
const prop = (names) => new RegExp(`(^|[{;\\s])(${names})\\s*:`, 'im');

const FOR = /for\s*\(\s*let\s+(\w+)\s*=\s*([^;]+);\s*\1\s*(<=?)\s*([^;]+);[^)]*\)/g;
const noForHeaders = (c) => c.replace(FOR, 'for ()');

/** Python: the name in `for NAME in …` is read inside the loop's body (not after it). */
function usesLoopCounter(code) {
  const lines = code.split('\n'), ind = (l) => l.length - l.trimStart().length;
  return lines.some((l, i) => {
    const m = l.match(/^\s*for\s+(\w+)\s+in\b/);
    if (!m || m[1] === '_') return false;
    const re = new RegExp(`\\b${m[1]}\\b`);
    for (let j = i + 1; j < lines.length; j++) {
      if (!lines[j].trim()) continue;
      if (ind(lines[j]) <= ind(l)) return false;
      if (re.test(lines[j])) return true;
    }
    return false;
  });
}

/** MakeCode (the JavaScript that blocks compile to). Each concept: id, what students would call it, a test. A
 *  concept without a test is a fact, not syntax (such as the 8-character limit on sendValue names): it can be
 *  introduced and assumed, but the scan cannot see it. */
export const CONCEPTS = {
  makecode: [
    { id: 'variable', label: 'a variable (set)', re: /\blet\s+\w+\s*(:\s*[\w[\]]+\s*)?=/ },
    { id: 'variable-update', label: 'change a variable from itself (x = x + 1, change by)', test: (c) => /\b(\w+)\s*=\s*\1\s*[-+*/]|\+=|-=|\+\+|--/.test(noForHeaders(c)) },
    { id: 'if', label: 'if', re: /\bif\s*\(/ },
    { id: 'else', label: 'else / else if', re: /\belse\b/ },
    { id: 'and-or', label: 'and / or', re: /&&|\|\|/ },
    { id: 'not', label: 'not (!)', re: /!(?!=)/ },
    { id: 'random', label: 'pick random (randint)', re: /\brandint\s*\(|Math\.random/ },
    { id: 'repeat', label: 'repeat n times', test: (c) => [...c.matchAll(FOR)].some((m) => m[3] === '<' && /^\d+$/.test(m[4].trim()) && m[2].trim() === '0') },
    { id: 'loop-index', label: 'for index from … to … (a loop that uses its counter)', test: (c) => [...c.matchAll(FOR)].some((m) => !(m[3] === '<' && /^\d+$/.test(m[4].trim()) && m[2].trim() === '0')) },
    { id: 'for-of', label: 'for element of list', re: /\bfor\s*\(\s*let\s+\w+\s+of\b/ },
    { id: 'while', label: 'while', re: /\bwhile\s*\(/ },
    { id: 'list', label: 'a list (array)', re: /=\s*\[[^\]\n]*\]|:\s*\w+\[\]/ },
    { id: 'list-index', label: 'list[index] (get or set an item)', re: /\b\w+\s*\[\s*[^\]\s][^\]]*\]/ },
    { id: 'list-change', label: 'add or remove list items', re: /\.(push|pop|removeAt|insertAt|unshift|shift)\s*\(/ },
    { id: 'length', label: 'length of a list or text', re: /\.length\b/ },
    { id: 'function', label: 'a named function (define and call)', re: /^\s*function\s+\w+\s*\(/m },
    { id: 'param', label: 'a function with parameters', re: /^\s*function\s+\w+\s*\(\s*\w+/m },
    { id: 'return-value', label: 'a function that returns a value', re: /\breturn\s+[^\s;}]/ },
    { id: 'text-join', label: 'join text ("a" + b)', re: /""\s*\+|\+\s*""|\bconvertToText\s*\(/ },
    { id: 'text-compare', label: 'compare text (== "A")', re: /[!=]==?\s*""|""\s*[!=]==?/ },
    { id: 'text-char', label: 'the letter at a place (charAt)', re: /\.charAt\s*\(/ },
    { id: 'index-of', label: 'find a place (indexOf)', re: /\.indexOf\s*\(/ },
    { id: 'text-slice', label: 'part of a text (substr)', re: /\.(substr|substring|slice)\s*\(/ },
    { id: 'char-code', label: 'character codes (charCodeAt, fromCharCode)', re: /\.charCodeAt\s*\(|String\.fromCharCode/ },
    { id: 'parse-number', label: 'text to number (parseFloat)', re: /\bparse(Float|Int)\s*\(/ },
    { id: 'remainder', label: 'remainder (%)', re: /%/ },
    { id: 'int-divide', label: 'whole-number division (idiv, floor)', re: /Math\.(idiv|floor|trunc)\s*\(/ },
    { id: 'xor', label: 'XOR (^)', re: /\^/ },
    { id: 'bitwise', label: 'bit operations (&, |, <<, >>)', re: /[^&]&[^&=]|[^|]\|[^|=]|<<|>>/ },
    { id: 'math-fn', label: 'absolute value, min, max', re: /Math\.(abs|min|max)\s*\(/ },
    { id: 'bool-value', label: 'true / false stored in a variable', re: /(?<![=!<>])=\s*(true|false)\b/ },
    { id: 'running-time', label: 'running time (ms)', re: /input\.runningTime|control\.millis/ },
    { id: 'radio', label: 'radio group', re: /radio\.setGroup\s*\(/ },
    { id: 'radio-number', label: 'radio send / receive number', re: /radio\.(sendNumber|onReceivedNumber)\b/ },
    { id: 'radio-string', label: 'radio send / receive string', re: /radio\.(sendString|onReceivedString)\b/ },
    { id: 'radio-value', label: 'radio send / receive value (name and number)', re: /radio\.(sendValue|onReceivedValue)\b/ },
    { id: 'value-name-limit', label: 'sendValue names: 8 characters at most (longer names are cut)' },
    { id: 'serial-write', label: 'serial write', re: /serial\.write\w*\s*\(/ },
    { id: 'serial-read', label: 'serial read (on data received, read line)', re: /serial\.(onDataReceived|readLine|readUntil|readString|delimiters)\b/ },
  ],
  /** Python (the turtle course and its follow-ons). Line-anchored tests use the m flag; code has comments removed and
   *  string contents emptied, so words inside strings and comments never count. */
  python: [
    { id: 'import-star', label: 'from x import *', re: /^[ \t]*from[ \t]+\w+[ \t]+import[ \t]+\*/m },
    { id: 'import-from', label: 'from x import name', re: /^[ \t]*from[ \t]+\w+[ \t]+import[ \t]+(?!\*)/m },
    { id: 'import-module', label: 'import x', re: /^[ \t]*import[ \t]+\w+/m },
    { id: 'dotted-call', label: 'a call like x.f()', re: /\b[A-Za-z_]\w*\.[A-Za-z_]\w*\(/ },
    { id: 'random', label: 'the random module', re: /\brandom\b/ },
    { id: 'variable', label: 'naming a value (x = 5)', re: /^[ \t]*[A-Za-z_]\w*[ \t]*=(?!=)/m },
    { id: 'arithmetic', label: 'calculating (+ - * /)', re: /[\w)\]][ \t]*[-+*/][ \t]*[\w(]/ },
    { id: 'variable-update', label: 'change a variable from itself (x = x + 1, +=)', re: /^[ \t]*(\w+)[ \t]*=[ \t]*\1[ \t]*[-+*/%]|(?<![=!<>])[-+*/]=(?!=)/m },
    { id: 'string', label: 'text in quotes', raw: true, re: /["'][^"'\n]*["']/ },
    { id: 'text-join', label: 'join text ("a" + b, f-strings)', re: /""[ \t]*\+|\+[ \t]*""|\bf""/ },
    { id: 'to-text', label: 'str(), int(), float()', re: /\b(str|int|float)\(/ },
    { id: 'print', label: 'print()', re: /\bprint\(/ },
    { id: 'input', label: 'input(), textinput(), numinput()', re: /\b(input|textinput|numinput)\(/ },
    { id: 'write', label: 'write(text, move, align, font)', re: /\bwrite\(/ },
    { id: 'repeat', label: 'for i in range(n)', re: /^[ \t]*for[ \t]+\w+[ \t]+in[ \t]+range\(/m },
    { id: 'range-args', label: 'range(start, stop)', re: /range\([^)]*,/ },
    { id: 'loop-index', label: 'the loop counter used inside the loop', test: usesLoopCounter },
    { id: 'for-of', label: 'for item in a list', re: /^[ \t]*for[ \t]+\w+[ \t]+in[ \t]+(?!range\b)[\w.[\]()]+[ \t]*:/m },
    { id: 'while', label: 'while', re: /^[ \t]*while\b/m },
    { id: 'break', label: 'break', re: /\bbreak\b/ },
    { id: 'if', label: 'if', re: /^[ \t]*if\b/m },
    { id: 'else', label: 'else', re: /^[ \t]*else[ \t]*:/m },
    { id: 'elif', label: 'elif', re: /^[ \t]*elif\b/m },
    { id: 'compare', label: 'comparing (== != < >)', re: /==|!=|<=|>=|(?<![<>=-])[<>](?![=>])/ },
    { id: 'and-or', label: 'and / or', re: /\b(and|or)\b/ },
    { id: 'not', label: 'not', re: /\bnot\b/ },
    { id: 'bool-value', label: 'True / False as values', test: (c) => c.split('\n').some((l) => !/\bwrite\(/.test(l) && /\b(True|False)\b/.test(l)) },
    { id: 'none', label: 'None', re: /\bNone\b/ },
    { id: 'remainder', label: 'remainder (%)', re: /[ \t]%[ \t]/ },
    { id: 'int-divide', label: 'whole-number division (//)', re: /\/\// },
    { id: 'power', label: 'powers (**)', re: /\*\*/ },
    { id: 'function', label: 'def (a function)', re: /^[ \t]*def[ \t]+\w+\([ \t]*\)/m },
    { id: 'param', label: 'a function with parameters', re: /^[ \t]*def[ \t]+\w+\([^)]+\)/m },
    { id: 'default-arg', label: 'default values for parameters', re: /^[ \t]*def[ \t]+\w+\([^)]*=/m },
    { id: 'return-value', label: 'return', re: /^[ \t]*return\b/m },
    { id: 'global', label: 'global', re: /^[ \t]*global\b/m },
    { id: 'callback', label: 'passing a function to an event (onscreenclick(fn))', re: /\bon(screenclick|key|keypress|keyrelease|timer|click)\([ \t]*[A-Za-z_]\w*[ \t]*[,)]/ },
    { id: 'lambda', label: 'lambda', re: /\blambda\b/ },
    { id: 'list', label: 'a list ([1, 2])', re: /=[ \t]*\[/ },
    { id: 'list-index', label: 'a place in a list (a[0])', re: /[\w)\]]\[[^\]]+\]/ },
    { id: 'length', label: 'len()', re: /\blen\(/ },
    { id: 'list-change', label: '.append() and friends', re: /\.(append|remove|pop|insert)\(/ },
    { id: 'dict', label: 'a dictionary ({k: v})', re: /\{[^}]*:[^}]*\}/ },
    { id: 'tuple-assign', label: 'assigning two names at once', re: /^[ \t]*\w+[ \t]*,[ \t]*\w+[ \t]*=/m },
    { id: 'file', label: 'open() and with (reading and writing a file)', re: /\bopen\(/ },
    { id: 'json', label: 'json.dump() and json.load()', re: /\bjson\.(dump|load)s?\(/ },
    { id: 'csv', label: 'csv.DictReader (rows of a CSV file)', re: /\bcsv\.(DictReader|reader|DictWriter|writer)\(/ },
    { id: 'assert', label: 'assert (a test case)', re: /^[ \t]*assert\b/m },
    { id: 'pandas', label: 'pandas (pd.read_csv, filtering a table)', re: /\bpd\.\w+\(|\bimport[ \t]+pandas\b/ },
    { id: 'decorator', label: 'a decorator (@app.route above a function)', re: /^[ \t]*@[A-Za-z_][\w.]*/m },
    { id: 'try', label: 'try and except (catching an error)', re: /^[ \t]*(try|except\b[^:\n]*)[ \t]*:/m },
    { id: 'object', label: 'making an object (t = Turtle(), e = Enemy(5))', re: /=[ \t]*[A-Z]\w*\(|\.append\([ \t]*[A-Z]\w*\(/ },
    { id: 'attribute', label: "an object's own value (e.speed, self.speed)", re: /\b[a-z_]\w*\.[a-z_]\w*\b(?![ \t]*\()/ },
    { id: 'class', label: 'class (with __init__ and self)', re: /^[ \t]*class[ \t]+\w+/m },
    { id: 'method', label: 'a method (def inside a class, with self)', re: /^[ \t]+def[ \t]+(?!__init__)\w+\([ \t]*self\b/m },
  ],
  /** HTML and CSS (one language: `html`). Markup tests read tags and attributes; tests marked `raw` read only the
   *  CSS (style blocks and style attributes), so the same words in page text never count. */
  html: [
    { id: 'page-wrapper', label: 'the page wrapper (<!DOCTYPE>, <html>, <head>, <body>)', re: /<!doctype|<(html|head|body)\b/i },
    { id: 'heading', label: 'headings (<h1> to <h6>)', re: tag('h[1-6]') },
    { id: 'paragraph', label: 'paragraphs (<p>)', re: tag('p') },
    { id: 'emphasis', label: 'important and stressed words (<strong>, <em>)', re: tag('strong|em|b|i') },
    { id: 'line-break', label: 'a line break (<br>)', re: tag('br') },
    { id: 'list', label: 'lists (<ul>, <ol>, <li>)', re: tag('ul|ol|li') },
    { id: 'attribute', label: 'attributes (name="value" in a tag)', re: /<[a-zA-Z][\w-]*\s+[\w-]+\s*=/ },
    { id: 'link', label: 'links (<a href>)', re: /<a\s[^>]*href/i },
    { id: 'link-in-page', label: 'links to a place on the page (href="#name", id)', re: /href\s*=\s*["']#/i },
    { id: 'image', label: 'pictures (<img src alt>)', re: tag('img') },
    { id: 'table', label: 'tables (<table>, <tr>, <td>, <th>)', re: tag('table|tr|td|th') },
    { id: 'div-span', label: 'plain boxes (<div>, <span>)', re: tag('div|span') },
    { id: 'semantic', label: 'page sections (<header>, <nav>, <main>, <section>, <footer>)', re: tag('header|nav|main|section|article|aside|footer') },
    { id: 'form', label: 'forms (<form>, <label>, <input>, <select>, <textarea>)', re: tag('form|label|input|select|option|textarea') },
    { id: 'button', label: 'buttons (<button>)', re: tag('button') },
    { id: 'class', label: 'class="…" on a tag', re: /<[^>]*\sclass\s*=/i },
    { id: 'id', label: 'id="…" on a tag', re: /<[^>]*\sid\s*=/i },
    { id: 'script', label: 'JavaScript (<script>)', re: tag('script') },
    { id: 'style-block', label: 'a <style> block', re: tag('style') },
    { id: 'style-attr', label: 'style="…" on a tag', re: /<[^>]*\sstyle\s*=/i },
    { id: 'css-rule', label: 'a CSS rule (selector { property: value; })', raw: true, re: /[\w.#*\]-]\s*\{[^}]*:/ },
    { id: 'class-selector', label: 'class selectors (.name)', raw: true, re: /(^|[\s,}>])\.[a-zA-Z][\w-]*[^{};]*\{/m },
    { id: 'id-selector', label: 'id selectors (#name)', raw: true, re: /(^|[\s,}>])#[a-zA-Z][\w-]*[^{};:]*\{/m },
    { id: 'descendant-selector', label: 'a selector inside a selector (nav a)', raw: true, re: /(^|[},])\s*[\w.#-]+(\s+[\w.#-]+)+\s*\{/m },
    { id: 'group-selector', label: 'several selectors at once (h1, h2)', raw: true, re: /(^|[}])\s*[\w.#-]+\s*,\s*[\w.#-]+[^{};]*\{/m },
    { id: 'pseudo-class', label: 'states such as :hover', raw: true, re: /[\w.#)-]:(hover|focus|active|first-child|last-child|nth-child|visited)\b/ },
    { id: 'text-colour', label: 'colours (color, background)', raw: true, re: prop('color|background|background-color') },
    { id: 'hex-colour', label: 'colours as hex (#1e90ff)', raw: true, re: /:[^;{}]*#[0-9a-fA-F]{3,8}\b/ },
    { id: 'colour-function', label: 'colours as rgb() or hsl()', raw: true, re: /\b(rgba?|hsla?)\(/ },
    { id: 'font', label: 'text styles (font-size, font-family, font-weight, text-align)', raw: true, re: prop('font|font-size|font-family|font-weight|font-style|text-align|text-decoration|line-height') },
    { id: 'box', label: 'the box (padding, border, margin, width, height)', raw: true, re: prop('padding(-\\w+)?|border(-(top|right|bottom|left|width|style|color))?|margin(-\\w+)?|width|height|max-width|min-height') },
    { id: 'rounded', label: 'rounded corners and shadows (border-radius, box-shadow)', raw: true, re: prop('border-radius|box-shadow') },
    { id: 'display', label: 'block or inline (display: block, inline, inline-block, none)', raw: true, re: /display\s*:\s*(block|inline|inline-block|none)\b/ },
    { id: 'flex', label: 'Flexbox (display: flex)', raw: true, re: /display\s*:\s*(inline-)?flex\b/ },
    { id: 'flex-options', label: 'Flexbox settings (flex-wrap, gap, justify-content, align-items, flex)', raw: true, re: prop('flex-wrap|flex-direction|gap|justify-content|align-items|flex') },
    { id: 'grid', label: 'Grid (display: grid, grid-template-columns)', raw: true, re: /display\s*:\s*grid\b|grid-template|grid-column|grid-row|grid-area/ },
    { id: 'css-units', label: 'units other than px and % (em, rem, vh, vw, fr)', raw: true, re: /\d(em|rem|vh|vw|fr)\b/ },
    { id: 'position', label: 'positioning (position, top, left)', raw: true, re: prop('position|z-index') },
    { id: 'media-query', label: 'screen-size rules (@media)', raw: true, re: /@media\b/ },
    { id: 'js-event', label: 'JavaScript events (addEventListener)', re: /addEventListener\s*\(/ },
    { id: 'js-query', label: 'JavaScript finding an element (querySelector, getElementById)', re: /querySelector(All)?\s*\(|getElementById\s*\(/ },
  ],
  /** JavaScript for p5.js (content/code/p5). Code has comments removed and string contents emptied. p5's own hooks
   *  (setup, draw, mousePressed...) are not "a function of your own". */
  javascript: [
    { id: 'setup', label: 'function setup()', re: /\bfunction\s+setup\s*\(/ },
    { id: 'draw-loop', label: 'function draw() (runs again and again)', re: /\bfunction\s+draw\s*\(/ },
    { id: 'variable', label: 'making a variable (let x = 5)', re: /\b(let|const|var)\s+\w+\s*=/ },
    { id: 'variable-update', label: 'change a variable from itself (x = x + 1, +=)', re: /\b(\w+)\s*=\s*\1\s*[-+*\/%]|[-+*\/]=|\+\+|--/ },
    { id: 'arithmetic', label: 'calculating (+ - * /)', re: /[\w)\]]\s*[-+*\/%]\s*[\w(]/ },
    { id: 'text-join', label: 'join text ("Score: " + score)', re: /""\s*\+|\+\s*""/ },
    { id: 'if', label: 'if', re: /\bif\s*\(/ },
    { id: 'else', label: 'else', re: /\belse\b/ },
    { id: 'compare', label: 'comparing (>, <, ===)', re: /===|!==|[<>]/ },
    { id: 'and-or', label: '&& and ||', re: /&&|\|\|/ },
    { id: 'for-count', label: 'a counting loop (for (let i = 0; i < 6; i++))', re: /\bfor\s*\(\s*let\s+\w+\s*=/ },
    { id: 'for-of', label: 'a loop over a list (for (let x of list))', re: /\bfor\s*\(\s*(let|const)\s+\w+\s+of\b/ },
    { id: 'array', label: 'an array ([1, 2, 3])', re: /=\s*\[/ },
    { id: 'array-index', label: 'a place in an array (list[i])', re: /\w\[[^\]]+\]/ },
    { id: 'length', label: '.length', re: /\.length\b/ },
    { id: 'push', label: '.push()', re: /\.push\s*\(/ },
    { id: 'object', label: 'an object ({ x: 5, y: 8 })', re: /[=(,]\s*\{\s*\w+\s*:/ },
    { id: 'property', label: 'a property (star.y)', re: /\b[A-Za-z_]\w*\.(?!length\b)[A-Za-z_]\w*\b(?![\w(])/ },
    { id: 'random', label: 'random()', re: /\brandom\s*\(/ },
    { id: 'function', label: 'a function of your own', re: /\bfunction\s+(?!setup\b|draw\b|preload\b|mouse|key|window|touch|double)\w+\s*\(/ },
    { id: 'param', label: 'a function with parameters', re: /\bfunction\s+(?!setup\b|draw\b|preload\b|mouse|key|window|touch|double)\w+\s*\(\s*\w/ },
    { id: 'return', label: 'return', re: /\breturn\b/ },
    { id: 'event', label: 'events (mousePressed, keyPressed)', re: /\bfunction\s+(mouse|key|touch|double)\w*\s*\(/ },
    { id: 'math', label: 'sin, cos, map', re: /\b(sin|cos|map|noise|radians)\s*\(/ },
  ],
};

export const conceptIds = (language) => new Set((CONCEPTS[language] || []).map((c) => c.id));
const has = (c, code) => (c.test ? c.test(code) : c.re ? c.re.test(code) : false);

/** The concept ids a snippet of code uses (for tests and quick checks). */
export function conceptsIn(code, language = 'python') {
  const s = language === 'python' ? stripPy(code) : language === 'html' ? splitHtml([code]) : (() => { const x = strip(code); return { code: x, raw: x }; })();
  return new Set((CONCEPTS[language] || []).filter((c) => has(c, c.raw ? s.raw : s.code)).map((c) => c.id));
}

/** The code students see in a lesson, by section ("frontmatter", then each "## " step title): [where, code, raw] (raw keeps string contents; Python comments are dropped from both). */
export function visibleCode(lesson, read) {
  const raw = readFileSync(join(lesson.dir, 'lesson.md'), 'utf8').replace(/\r\n/g, '\n');
  const fm = raw.match(/^---\n[\s\S]*?\n---\n?/)?.[0] || '';
  const sections = [['frontmatter', fm], ...raw.slice(fm.length).split(/^## /m).slice(1).map((s) => [s.slice(0, s.indexOf('\n')).trim(), s])];
  return sections.map(([where, text]) => {
    const refs = [...text.matchAll(/([\w.-]+\.(?:ts|py|js|html|css))#([\w-]+)/g)].filter((m) => !m[2].startsWith('sol-'));
    const fenced = [...text.matchAll(/```(?:makecode|blocks|ts|typescript|python|py|js|javascript|html|css)\n([\s\S]*?)```/g)].map((m) => m[1]);
    const chunks = [...new Set(refs.map((m) => m[0]))].map((r) => read(lesson.dir, r) || '').concat(fenced);
    if (lesson.language === 'html') { const s = splitHtml(chunks); return [where, s.code, s.raw]; }
    const joined = chunks.join('\n');
    if (lesson.language === 'python') { const s = stripPy(joined); return [where, s.code, s.raw]; }
    const s = strip(joined);
    return [where, s, s];
  });
}

/** Concepts a lesson's visible code uses: Map id -> first section it appears in. */
export function scanLesson(lesson, read) {
  const out = new Map();
  for (const [where, code, raw] of visibleCode(lesson, read)) for (const c of CONCEPTS[lesson.language] || []) if (!out.has(c.id) && has(c, c.raw ? raw : code)) out.set(c.id, where);
  return out;
}

const list = (v) => (Array.isArray(v) ? v.map(String) : v ? [String(v)] : []);
const course = (slug) => slug.split('/').slice(0, -1).join('/');

/** Courses each course follows, transitively, from `after:` in every subject's index.md pathways (through planned courses too, by their `id`). */
export function prerequisites(loadDirMeta, root) {
  const after = {};
  const alias = {};   // a built course listed with both path and id: `after:` may name either
  for (const subj of ['code', 'maths', 'science']) {
    for (const p of loadDirMeta(join(root, subj)).pathways || []) for (const c of p.courses || []) {
      if (c.path && c.id) { alias[c.id] = c.path; alias[c.path] = c.id; }
      if (c.path || c.id) after[c.path || c.id] = c.after || [];   // planned courses (id:) pass their prerequisites on
    }
  }
  const all = (c, seen = new Set()) => { for (const a of after[c] || []) for (const k of [a, alias[a]].filter(Boolean)) if (!seen.has(k)) { seen.add(k); all(k, seen); } return seen; };
  return (c) => all(c);
}

/** Lint: { warnings: [string], report: [{ slug, title, optional, uses: Map, fresh: [ids], untagged: [ids] }] }. */
export function auditConcepts(lessons, read, prereqs) {
  const warnings = [];
  const report = [];
  const scoped = lessons.filter((l) => CONCEPTS[l.language]);
  const before = (a, b) => (course(a.slug) === course(b.slug) ? (a.order ?? 0) < (b.order ?? 0) : prereqs(course(b.slug)).has(course(a.slug)));
  for (const l of scoped) {
    const ids = conceptIds(l.language);
    const intro = list(l.introduces), assumes = list(l.assumes), recipes = list(l.recipes);
    for (const [k, v] of [['introduces', intro], ['assumes', assumes], ['recipes', recipes]]) for (const id of v) if (!ids.has(id)) warnings.push(`${l.slug} › ${k}: "${id}" is not a concept id (tools/concepts.mjs)`);
    const known = new Map();   // id -> slug of the earlier lesson that introduces it
    const shown = new Map();   // id -> slug of the earlier lesson that labelled it a recipe (the student has seen "copy this for now")
    for (const e of scoped) if (e !== l && e.language === l.language && before(e, l) && (!e.optional || l.optional)) {
      for (const id of list(e.introduces)) if (!known.has(id)) known.set(id, e.slug);
      for (const id of list(e.recipes)) if (!shown.has(id)) shown.set(id, e.slug);
    }
    const uses = scanLesson(l, read);
    const untagged = [];
    for (const [id, where] of uses) {
      if (known.has(id) || shown.has(id) || intro.includes(id) || recipes.includes(id)) continue;
      untagged.push(id);
      warnings.push(`${l.slug} › ${where}: uses ${id} [${CONCEPTS[l.language].find((c) => c.id === id).label}], which no earlier lesson introduces; teach it here (introduces), label it a recipe (recipes), or teach it earlier`);
    }
    for (const id of assumes) if (!known.has(id) && !shown.has(id)) warnings.push(`${l.slug} › assumes: ${id}, but no earlier lesson introduces it`);
    for (const id of intro) {
      const c = CONCEPTS[l.language].find((x) => x.id === id);
      if (c && (c.re || c.test) && !uses.has(id)) warnings.push(`${l.slug} › introduces: ${id}, but no code students see uses it`);
      if (known.has(id)) warnings.push(`${l.slug} › introduces: ${id}, already introduced in ${known.get(id)} (use assumes, or recap it without introduces)`);
    }
    report.push({ slug: l.slug, title: l.title, order: l.order, optional: l.optional, uses, fresh: [...uses.keys()].filter((id) => !known.has(id)), untagged });
  }
  // MakeCode radio value names are cut to 8 characters, so a longer name never matches on the receiver.
  // Checked in every code file (solutions too: students copy them) and in lesson.md (code-check rules).
  for (const l of lessons.filter((x) => x.language === 'makecode')) {
    for (const f of readdirSync(l.dir).filter((n) => /\.(ts|md)$/.test(n))) {
      const text = readFileSync(join(l.dir, f), 'utf8');
      for (const m of text.matchAll(/radio\.sendValue\(\s*\\?"([\w ]+)\\?"|\bname\s*===?\s*\\?"([\w ]+)\\?"/g)) {
        const name = m[1] ?? m[2];
        if (name.length > 8) warnings.push(`${l.slug} › ${f}: radio value name "${name}" has ${name.length} characters; names are cut to 8, so it never arrives as "${name}"`);
      }
    }
  }
  return { warnings, report };
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const { loadLessons, loadDirMeta, getSnippet, CONTENT_ROOT } = await import('./lesson.mjs');
  const lessons = loadLessons();
  const { warnings, report } = auditConcepts(lessons, getSnippet, prerequisites(loadDirMeta, CONTENT_ROOT));
  if (process.argv.includes('--report')) {
    let cur = '';
    for (const r of report.sort((a, b) => (course(a.slug) === course(b.slug) ? (a.order ?? 0) - (b.order ?? 0) : 0))) {
      if (course(r.slug) !== cur) { cur = course(r.slug); console.log(`\n## ${cur}\n`); }
      const mark = (id) => (r.untagged.includes(id) ? `**${id}**` : r.fresh.includes(id) ? `+${id}` : id);
      console.log(`- ${r.order}. ${r.title}${r.optional ? ' (optional)' : ''}: ${[...r.uses.keys()].map(mark).join(', ') || '(no code)'}`);
    }
    console.log('\n(+id: introduced here; **id**: used before any lesson introduces it)');
  } else {
    warnings.forEach((w) => console.warn('⚠ ' + w));
    console.log(warnings.length ? `${warnings.length} hidden-assumption warning(s)` : '✓ hidden assumptions: every construct is introduced, assumed or a recipe');
  }
}
