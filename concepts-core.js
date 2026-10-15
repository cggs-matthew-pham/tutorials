// The pure part of the concept scan (tools/concepts.mjs): the CONCEPTS table and conceptsIn(). No Node imports,
// so build-playground copies it to the site (site/concepts-core.js) for project pages, which light up the skills a
// student's own code uses. Change concepts here; tools/concepts.mjs re-exports everything.
export const strip = (code) => code
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
  .replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`[^`]*`/g, '""');   // string contents never count
/** Python: drop comments and triple-quoted text; `code` has string contents emptied, `raw` keeps the strings. */
export function stripPy(code) {
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
export function splitHtml(chunks) {
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
    { id: 'box', label: 'the box (padding, border, margin, width, height)', raw: true, re: prop('padding(-\\w+)?|border(-(top|right|bottom|left|width|style|color))?|margin(-\\w+)?|width|height|max-width|min-width|min-height') },
    { id: 'rounded', label: 'rounded corners and shadows (border-radius, box-shadow)', raw: true, re: prop('border-radius|box-shadow') },
    { id: 'display', label: 'block or inline (display: block, inline, inline-block, none)', raw: true, re: /display\s*:\s*(block|inline|inline-block|none)\b/ },
    { id: 'flex', label: 'Flexbox (display: flex)', raw: true, re: /display\s*:\s*(inline-)?flex\b/ },
    { id: 'flex-options', label: 'Flexbox settings (flex-wrap, gap, justify-content, align-items, flex)', raw: true, re: prop('flex-wrap|flex-direction|gap|justify-content|align-items|flex') },
    { id: 'grid', label: 'Grid (display: grid, grid-template-columns)', raw: true, re: /display\s*:\s*grid\b|grid-template|grid-column|grid-row|grid-area/ },
    { id: 'css-units', label: 'units other than px and % (em, rem, vh, vw, fr)', raw: true, re: /\d(em|rem|vh|vw|fr)\b/ },
    { id: 'position', label: 'positioning (position, top, left)', raw: true, re: prop('position|z-index') },
    { id: 'media-query', label: 'screen-size rules (@media)', raw: true, re: /@media\b/ },
    { id: 'js-event', label: 'JavaScript events (addEventListener)', re: /addEventListener\s*\(/ },
    { id: 'text-content', label: 'changing text (textContent)', re: /\.(textContent|innerText)\b/ },
    { id: 'style-prop', label: 'changing style from JavaScript (el.style.color = …)', re: /\.style\.\w+\s*=/ },
    { id: 'class-list', label: 'classList (add, remove, toggle)', re: /\.classList\./ },
    { id: 'input-value', label: 'reading an input (.value)', re: /\.value\b/ },
    { id: 'console-log', label: 'console.log', re: /console\.(log|warn|error)\s*\(/ },
    { id: 'create-element', label: 'making an element (createElement)', re: /createElement\s*\(/ },
    { id: 'append-element', label: 'adding to the page (append, remove)', re: /\.(append|appendChild|prepend|remove)\s*\(/ },
    { id: 'js-query', label: 'JavaScript finding an element (querySelector, getElementById)', re: /querySelector(All)?\s*\(|getElementById\s*\(/ },
    // Bootstrap (code/bootstrap), Vue and the other frameworks (code/vue), and fetch (code/dom).
    { id: 'bootstrap', label: 'Bootstrap (its stylesheet and class names: btn, container, alert)', re: /bootstrap(\.min)?\.css/ },
    { id: 'bs-grid', label: "Bootstrap's grid (row, col)", re: /\sclass\s*=\s*["'](?:[^"']*\s)?(row|col(-[\w-]+)?)(\s[^"']*)?["']/ },
    { id: 'bs-component', label: 'Bootstrap components (navbar, card)', re: /\sclass\s*=\s*["'][^"']*\b(navbar-expand|navbar-brand|navbar-nav|nav-link|card-body|card-title|card-text)\b/ },
    { id: 'vue-app', label: 'a Vue app (createApp, setup, mount)', re: /\bcreateApp\s*\(/ },
    { id: 'vue-ref', label: 'data Vue watches (ref)', re: /\bref\s*\(/ },
    { id: 'vue-text', label: 'showing data ({{ score }})', re: /\{\{[^}]*\}\}/ },
    { id: 'vue-on', label: 'Vue events (@click)', re: /\s(@|v-on:)[a-z][\w.-]*\s*=/ },
    { id: 'vue-for', label: 'a tag for each item (v-for)', re: /\sv-for\s*=/ },
    { id: 'vue-if', label: 'a tag only when (v-if, v-else)', re: /\sv-(if|else-if|else|show)\b/ },
    { id: 'vue-model', label: 'a box joined to data (v-model)', re: /\sv-model\b/ },
    { id: 'vue-computed', label: 'a value worked out from data (computed)', re: /\bcomputed\s*\(/ },
    { id: 'vue-component', label: 'a component of your own (app.component)', re: /\.component\s*\(/ },
    { id: 'vue-props', label: 'props, and :name="value" to pass data in', re: /\bprops\s*:|\s:[a-z][\w-]*\s*=/ },
    { id: 'preact', label: 'Preact or React state (useState)', re: /\buseState\s*\(/ },
    { id: 'svelte', label: 'a Svelte component', re: /<textarea\b[^>]*\bdata-svelte\b/ },
    { id: 'fetch', label: 'loading data (fetch)', re: /\bfetch\s*\(/ },
    { id: 'async-await', label: 'async and await (waiting for something slow)', re: /\basync\s+function\b|\bawait\b/ },
    { id: 'json-data', label: 'JSON (response.json(), JSON.parse)', re: /\.json\s*\(\s*\)|\bJSON\.(parse|stringify)\b/ },
    { id: 'try-catch', label: 'try and catch (a plan B when something fails)', re: /\btry\s*\{/ },
    { id: 'local-storage', label: 'saving between visits (localStorage)', re: /\blocalStorage\./ },
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

/** Theory concepts (Digital systems): ideas, not syntax, so the scan never sees them. A Digital systems lesson
 *  `introduces:` one; a lesson in any subject or language that relies on it `assumes:` it. Across subjects there is
 *  no lesson order, so an introduction in another subject counts (the page links the two: "Builds on" and "Put to work
 *  in"). Within a subject the usual order applies. */
export const THEORY = [
  { id: 'text-as-numbers', label: 'text is stored as numbers (character codes)' },
  { id: 'rgb-colour', label: 'a colour is three numbers (red, green, blue, 0 to 255)' },
  { id: 'pixel-grid', label: 'an image is a grid of pixels' },
  { id: 'sound-samples', label: 'sound is stored as samples' },
  { id: 'binary', label: 'binary place value' },
  { id: 'bit-patterns', label: 'n bits make 2ⁿ patterns; overflow' },
  { id: 'logic-gates', label: 'logic gates (AND, OR, NOT)' },
  { id: 'run-length', label: 'run-length encoding' },
  { id: 'lossy-lossless', label: 'lossy and lossless compression' },
  { id: 'packets', label: 'data travels in packets' },
  { id: 'encryption-purpose', label: 'why data is encrypted on its way' },
  { id: 'ip-dns', label: 'IP addresses and DNS' },
  { id: 'permissions', label: 'authentication and permissions' },
  { id: 'hashing', label: 'hashes (one-way scrambles)' },
  { id: 'public-key', label: 'public and private keys' },
  { id: 'hardware-specs', label: 'hardware specifications (processor, RAM, storage)' },
  { id: 'fetch-execute', label: 'fetch, decode, execute' },
  { id: 'web-layers', label: 'content, structure (HTML) and presentation (CSS) are separate layers' },
  { id: 'vector-graphics', label: 'vector pictures and 3D models are stored as shapes and corners (numbers)' },
  { id: 'encoding', label: 'encoding (binary, hex, base64) is a public rule, not encryption' },
  // Science ideas that Engineering puts to work (introduced by Science lessons, or by an Engineering lesson where
  // Science has none, such as turning effects).
  { id: 'force-arrows', label: 'a force has a size (newtons) and a direction' },
  { id: 'balanced-forces', label: 'balanced forces: no change in motion' },
  { id: 'weight', label: 'weight is a force: mass × gravity' },
  { id: 'force-pairs', label: 'forces come in pairs (third law)' },
  { id: 'free-body', label: 'free body diagrams' },
  { id: 'energy-stores', label: 'kinetic and potential energy' },
  { id: 'energy-transfer', label: 'energy transfers and transformations' },
  { id: 'energy-conservation', label: 'energy is conserved' },
  { id: 'efficiency', label: 'efficiency: useful energy out ÷ energy in' },
  { id: 'electric-current', label: 'electric current is a flow of charge' },
  { id: 'turning-effect', label: 'turning effect (moment) = force × distance from the pivot' },
];
export const theoryIds = new Set(THEORY.map((c) => c.id));
export const conceptIds = (language) => new Set((CONCEPTS[language] || []).map((c) => c.id));
export const has = (c, code) => (c.test ? c.test(code) : c.re ? c.re.test(code) : false);

/** The concept ids a snippet of code uses (for tests and quick checks). */
export function conceptsIn(code, language = 'python') {
  const s = language === 'python' ? stripPy(code) : language === 'html' ? splitHtml([code]) : (() => { const x = strip(code); return { code: x, raw: x }; })();
  return new Set((CONCEPTS[language] || []).filter((c) => has(c, c.raw ? s.raw : s.code)).map((c) => c.id));
}

