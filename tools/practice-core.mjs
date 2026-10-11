// Practice question templates: a question whose numbers change each time it is shown. Shared by validate (Node) and
// the course Practice page (the source of makePractice is inlined, like MATH_JS), so the page and the checks generate
// questions the same way. No imports: makePractice() closes over nothing.
//
// A template (in content/<course>/practice/<lesson>.yml, under `templates:`):
//   q: "A bag has {r} red and {b} blue counters. What is P(red)?"
//   vars: { r: "2..9", b: "2..9" }       whole-number ranges "lo..hi", "lo..hi by 0.5", or a list [2, 3, 5]
//   let: { t: "r + b" }                   values worked out from the others, in order
//   where: "r != b and t <= 12"           keep only these (and, or, not, = or ==, !=, <, >, <=, >=)
//   answer: "{r}/{t}"                     marked as any equivalent form (2/8 = 1/4 = 0.25); `tolerance: 0.05` for rounded
//                                         answers; `form: simplest | decimal | whole` to insist on a form; "{a} : {b}" is a ratio
//   feedback: [["{r}/{b}", "That compares red with blue..."]]   wrong answers to name, and what to say
//   explain: "{r} red out of {t} counters: {r}/{t}."
//   show: "${p|m}"                       how the answer is written when revealed (default: the answer)
// In text, {expression} is replaced by its value; {x|p} wraps a negative value in brackets, {x|s} writes "+ 3" or
// "− 3", {x|2} rounds to 2 places, {x|f1} always shows 1 place (30.0), {x|n} groups thousands ("45 000"), {x|m} writes money (2.5 → 2.50).
// In questions and explanations 2^3 shows as 2³ and 2^p as 2ᵖ. Functions: round, floor, ceil, abs, sqrt, min,
// max, pow, gcd, lcm, rd(x, places). Text in single quotes, for choosing words: {a > 0 ? 'positive' : 'negative'}.

export function makePractice() {
  var FN = {
    round: Math.round, floor: Math.floor, ceil: Math.ceil, abs: Math.abs, sqrt: Math.sqrt, min: Math.min, max: Math.max, pow: Math.pow,
    gcd: function g(a, b) { a = Math.abs(Math.round(a)); b = Math.abs(Math.round(b)); return b ? g(b, a % b) : a; },
    lcm: function (a, b) { return Math.abs(a * b) / FN.gcd(a, b); },
    rd: function (x, p) { var k = Math.pow(10, p || 0); return Math.round(x * k) / k; },
  };
  var cache = {};
  function compile(src, names) {
    var key = src + '|' + names.join(',');
    if (cache[key]) return cache[key];
    var re = /\s*('[^']*'|\d+(?:\.\d+)?|[A-Za-z_]\w*|==|!=|<=|>=|&&|\|\||[-+*\/%^()<>=!,?:])/g, out = '', m, pos = 0, s = String(src).trim();
    while (pos < s.length) {
      re.lastIndex = pos; m = re.exec(s);
      if (!m || m.index !== pos) throw new Error('cannot read "' + s.slice(pos) + '" in "' + src + '"');
      var t = m[1]; pos = re.lastIndex;
      if (t[0] === "'") out += JSON.stringify(t.slice(1, -1));
      else if (/^[A-Za-z_]/.test(t)) {
        var lw = t.toLowerCase();
        if (lw === 'and') out += '&&'; else if (lw === 'or') out += '||'; else if (lw === 'not') out += '!';
        else if (names.indexOf(t) >= 0) out += 'v.' + t;
        else if (FN[t]) out += 'F.' + t;
        else throw new Error('"' + t + '" is not a value or a function in "' + src + '"');
      } else if (t === '^') out += '**';
      else if (t === '=') out += '===';
      else if (t === '==') out += '===';
      else if (t === '!=') out += '!==';
      else out += t;
    }
    var f;
    try { f = new Function('v', 'F', 'return (' + out + ');'); } catch (e) { throw new Error('"' + src + '" is not an expression'); }
    cache[key] = function (v) { return f(v, FN); };
    return cache[key];
  }
  function clean(x) { return typeof x === 'number' ? Math.round(x * 1e9) / 1e9 : x; }
  function show(x, filter) {
    if (typeof x === 'boolean') return x ? 'yes' : 'no';
    if (typeof x === 'string') return x;
    x = clean(x);
    if (filter && /^\d$/.test(filter)) x = FN.rd(x, Number(filter));
    var neg = x < 0, a = Math.abs(x), t = String(a);
    if (filter === 'n') { var parts = t.split('.'); if (parts[0].length > 4) parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' '); t = parts.join('.'); }
    if (filter === 'm' && Math.round(a) !== a) t = a.toFixed(2);
    if (filter && /^f\d$/.test(filter)) t = a.toFixed(Number(filter[1]));
    if (filter === 's') return (neg ? '− ' : '+ ') + t;
    if (filter === 'c') return (neg ? '−' : '') + (t === '1' ? '' : t);
    if (filter === 'sc') return (neg ? '− ' : '+ ') + (t === '1' ? '' : t);
    var full = (neg ? '−' : '') + t;
    if (filter === 'p' && neg) return '(' + full + ')';
    return full;
  }
  // Powers in question and explanation text: 2^3 → 2³, 2^p → 2ᵖ (answers keep ^, which the checker reads).
  var SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', a: 'ᵃ', b: 'ᵇ', n: 'ⁿ', p: 'ᵖ', x: 'ˣ', m: 'ᵐ' };
  function sup(t) { return String(t).replace(/\^(-?\d+|[abnpxm]\b)/g, function (_, e) { return e.split('').map(function (c) { return SUP[c] || c; }).join(''); }); }
  function names(tpl) { return Object.keys(tpl.vars || {}).concat(Object.keys(tpl.let || {})); }
  function fill(text, v, nm) {
    return String(text).replace(/\{([^{}|]+)(?:\|([a-z0-9]{1,2}))?\}/g, function (_, e, f) { return show(compile(e, nm)(v), f); });
  }
  function choices(spec, where) {
    if (Array.isArray(spec)) return spec.map(Number);
    var m = /^\s*(-?\d+(?:\.\d+)?)\s*\.\.\s*(-?\d+(?:\.\d+)?)(?:\s+by\s+(\d+(?:\.\d+)?))?\s*$/.exec(String(spec));
    if (!m) throw new Error(where + ': "' + spec + '" should be a range like "2..9" or "1..5 by 0.5", or a list like [2, 3, 5]');
    var lo = Number(m[1]), hi = Number(m[2]), by = m[3] ? Number(m[3]) : 1, out = [];
    if (!(hi >= lo) || !(by > 0)) throw new Error(where + ': the range "' + spec + '" is empty');
    for (var x = lo; x <= hi + 1e-9; x += by) out.push(clean(x));
    return out;
  }
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var x = Math.imul(a ^ a >>> 15, 1 | a); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
  /** One question from a template: { q, answer, tolerance, feedback: [[answer, text]], explain, vars }, or null if no numbers fit. */
  function generate(tpl, rnd) {
    var nm = names(tpl), opts = {};
    Object.keys(tpl.vars || {}).forEach(function (k) { opts[k] = choices(tpl.vars[k], 'vars.' + k); });
    for (var tries = 0; tries < 400; tries++) {
      var v = {};
      Object.keys(opts).forEach(function (k) { v[k] = opts[k][Math.floor(rnd() * opts[k].length)]; });
      Object.keys(tpl.let || {}).forEach(function (k) { v[k] = clean(compile(tpl.let[k], nm)(v)); });
      if (tpl.where && !compile(tpl.where, nm)(v)) continue;
      return {
        q: sup(fill(tpl.q, v, nm)), answer: fill(tpl.answer, v, nm).replace(/−/g, '-'), tolerance: tpl.tolerance || 0, form: tpl.form || '',
        feedback: (tpl.feedback || []).map(function (f) { return [fill(f[0], v, nm).replace(/−/g, '-'), fill(f[1], v, nm)]; }),
        explain: tpl.explain ? sup(fill(tpl.explain, v, nm)) : '', show: tpl.show ? sup(fill(tpl.show, v, nm)) : '', vars: v,
      };
    }
    return null;
  }
  // Inequalities: "x > 3", "x <= -2" (also ≤ ≥, and the letter on the right: "3 < x"), as { x, op, n }; null if not one.
  var FLIP = { '<': '>', '>': '<', '<=': '>=', '>=': '<=' };
  function ineq(s, WPM) {
    s = String(s).replace(/[−–]/g, '-').replace(/≤|⩽|≦|=</g, '<=').replace(/≥|⩾|≧|=>/g, '>=').trim();
    var m = /^([a-zA-Z])\s*(<=|>=|<|>)\s*(.+)$/.exec(s), r = /^(.+?)\s*(<=|>=|<|>)\s*([a-zA-Z])$/.exec(s), o;
    try { if (m) o = { x: m[1], op: m[2], n: WPM.evaluate(m[3], {}) }; else if (r) o = { x: r[3], op: FLIP[r[2]], n: WPM.evaluate(r[1], {}) }; } catch (e) { return null; }
    return o && isFinite(o.n) ? o : null;
  }
  var ALG = { expanded: 1, factorised: 1, simplified: 1 };
  // Mark a typed answer against a generated question. WPM is the maths checker (tools/math-expr.mjs).
  // form: simplest (a whole number or a fraction in lowest terms), decimal, or whole. An answer with ":" is a ratio,
  // marked part by part (so 4 : 6 is not 2 : 3).
  function mark(g, raw, WPM, WPF) {
    var ie = ineq(g.answer, WPM);
    if (ie) {
      if (!String(raw).trim()) return { ok: false, msg: 'Type your answer first.' };
      var a = ineq(String(raw).replace(/²/g, '^2').replace(/³/g, '^3'), WPM);
      if (!a) return { ok: false, keep: true, msg: 'Write it as an inequality, such as ' + ie.x + ' > 3 or ' + ie.x + ' ≤ −2.' };
      if (a.x !== ie.x) return { ok: false, keep: true, msg: 'Use the letter ' + ie.x + '.' };
      if (a.op === ie.op && Math.abs(a.n - ie.n) < 1e-9) return { ok: true };
      var fi = g.feedback.filter(function (f) { var o = ineq(f[0], WPM); return o && o.op === a.op && Math.abs(o.n - a.n) < 1e-9; })[0];
      if (fi) return { ok: false, msg: 'Not quite. ' + fi[1] };
      return { ok: false, msg: Math.abs(a.n - ie.n) < 1e-9 ? 'The number is right. Check the inequality sign.' : 'Not quite. Check your working and try again.' };
    }
    var sub = /^subject ([a-zA-Z])$/.exec(g.form);
    if (sub) {
      var L = sub[1], parts = String(raw).replace(/[−–]/g, '-').replace(/²/g, '^2').replace(/³/g, '^3').split('='), rhs = g.answer.split('=')[1];
      if (!String(raw).trim()) return { ok: false, msg: 'Type your answer first.' };
      if (parts.length === 2 && parts[1].trim().toLowerCase() === L.toLowerCase()) parts = [parts[1], parts[0]];
      if (parts.length === 2 && /^[a-zA-Z]$/.test(parts[0].trim()) && parts[0].trim().toLowerCase() !== L.toLowerCase() && !/[a-zA-Z]/.test(rhs)) return { ok: false, msg: 'Not quite: check which letter is the same for every point.' };
      if (parts.length !== 2 || parts[0].trim().toLowerCase() !== L.toLowerCase()) return { ok: false, keep: true, msg: 'Write it as ' + L + ' = …' };
      if (!/[A-Z]/.test(g.answer)) parts[1] = parts[1].toLowerCase();   // Y for y: letters are compared as written
      var eqv;
      try { eqv = WPM.equivalent(parts[1], rhs); } catch (e) { return { ok: false, keep: true, msg: e.message }; }
      if (!eqv) { var fs = feedback(g, parts[1], WPM, true); return { ok: false, msg: fs || 'Not quite: check each step of your rearranging.' }; }
      if (WPM.vars(parts[1]).indexOf(L) >= 0) return { ok: false, keep: true, msg: 'Keep ' + L + ' only on the left.' };
      return { ok: true };
    }
    if (/^\s*\(.*,.*\)\s*$/.test(raw)) return { ok: false, keep: true, msg: 'Give just the number, not a point.' };
    raw = String(raw).replace(/^(.+?)\s*=\s*[a-zA-Z]\s*$/, '$1');   // 3n + 2 = s
    var v = WPM.splitAnswer(String(raw).trim()).value.trim().replace(/[−–]/g, '-').replace(/^(-?)\s*\$\s*/, '$1').replace(/^-\s+/, '-').replace(/(\d),(?=\d{3}(\D|$))/g, '$1');
    if (!v) return { ok: false, msg: 'Type your answer first.' };
    // Numeric answers: drop units or words after the number ("36 litres", "30 km/h", "−1°C", "12 dollars", "45%").
    if (!/[a-z]/i.test(g.answer)) v = v.replace(/\s*[A-Za-z°%\/](?:[A-Za-z°%\/\s.²³]|\^\d)*$/, '').trim() || v;
    v = v.replace(/²/g, '^2').replace(/³/g, '^3');
    // A mixed numeral (1 1/2) is read as 1 + 1/2, not 11/2.
    var mx = /^(-?)(\d+)\s+(\d+)\s*\/\s*(\d+)$/.exec(v), mixedOk = false;
    if (mx) { var wn = Number(mx[2]), nn = Number(mx[3]), dd = Number(mx[4]); mixedOk = nn < dd && FN.gcd(nn, dd) === 1; v = mx[1] + (wn * dd + nn) + '/' + dd; }
    var num = function (t) { return WPM.evaluate(t, {}); };
    if (g.answer.indexOf(':') >= 0) {
      var a = g.answer.split(':'), b = v.split(':');
      if (b.length !== a.length) return { ok: false, keep: true, msg: 'Write it as a ratio, such as 2 : 3.' };
      for (var i = 0; i < a.length; i++) { var x; try { x = num(b[i]); } catch (e) { return { ok: false, keep: true, msg: 'Write each part of the ratio as a number.' }; } if (Math.abs(x - num(a[i])) > 1e-9) return { ok: false, msg: feedback(g, v, WPM) || 'Not quite. Check each part of the ratio.' }; }
      return { ok: true };
    }
    if (/[a-z]/i.test(g.answer)) {
      if (!/[A-Z]/.test(g.answer)) v = v.toLowerCase();
      try { var want = WPM.vars(g.answer).sort(), got = WPM.vars(v); if (got.some(function (x) { return want.indexOf(x) < 0; })) return { ok: false, keep: true, msg: 'Use the letter' + (want.length > 1 ? 's ' + want.slice(0, -1).join(', ') + ' and ' + want[want.length - 1] : ' ' + want[0]) + '.' }; } catch (e) { /* read below */ }
    }
    var same;
    try { same = g.tolerance ? Math.abs(num(v) - num(g.answer)) <= g.tolerance + 1e-9 : WPM.equivalent(v, g.answer); } catch (e) { return { ok: false, keep: true, msg: e.message }; }
    if (same) {
      if (ALG[g.form]) {
        if (!WPF) return { ok: false, keep: true, msg: 'The checker is still loading. Try again in a moment.' };
        var r = WPF.check(v, g.answer, g.form);
        if (!r.ok && r.equivalent) return { ok: false, keep: true, msg: 'Equal to the answer, but not finished. ' + r.why };
        return r.unsure ? { ok: true, note: r.why } : { ok: true };
      }
      if (g.form === 'simplest' && !mixedOk) { var m = /^\s*(-?\d+)\s*(?:\/\s*(\d+)\s*)?$/.exec(v); if (!m || (m[2] && (FN.gcd(Number(m[1]), Number(m[2])) !== 1 || m[2] === '1'))) return { ok: false, keep: true, msg: 'Right value, but write it in simplest form (a whole number, or a fraction with no common factor).' }; }
      if (g.form === 'decimal' && !/^\s*-?\d*\.?\d+\s*$/.test(v)) return { ok: false, keep: true, msg: 'Right value, but write it as a decimal.' };
      if (g.form === 'whole' && !/^\s*-?\d+\s*$/.test(v)) return { ok: false, keep: true, msg: 'Write it as a whole number.' };
      return { ok: true };
    }
    return { ok: false, msg: feedback(g, v, WPM) || 'Not quite. Check your working and try again.' };
  }
  function feedback(g, v, WPM, rhsOnly) {
    for (var i = 0; i < g.feedback.length; i++) {
      var f = g.feedback[i];
      if (rhsOnly) { try { var fr = f[0].split('=').pop(); if (!WPM.equivalent(fr, g.answer.split('=')[1]) && WPM.equivalent(v, fr)) return 'Not quite. ' + f[1]; } catch (e) { /* not comparable */ } continue; }
      try { if (f[0].indexOf(':') >= 0 ? f[0].replace(/\s/g, '') === v.replace(/\s/g, '') && f[0].replace(/\s/g, '') !== g.answer.replace(/\s/g, '') : (!WPM.equivalent(f[0], g.answer) && WPM.equivalent(v, f[0]))) return 'Not quite. ' + f[1]; } catch (e) { /* not comparable */ }
    }
    return '';
  }
  return { generate: generate, fill: fill, compile: compile, choices: choices, names: names, rng: mulberry, mark: mark, ineq: ineq, sup: sup };
}

export const PRACTICE = makePractice();
export const PRACTICE_JS = `var WPP=(${makePractice.toString()})();`;

/** Problems with one lesson's practice file, found by generating many questions. WPM is the maths checker (MATH). */
export function checkPractice(data, where, WPM, n = 300, WPF = null) {
  const errors = [], warnings = [];
  if (!data || !Array.isArray(data.templates) || !data.templates.length) return { errors: [`${where}: needs templates: a list of at least one`], warnings };
  data.templates.forEach((t, i) => {
    const w = `${where} template ${i + 1}`;
    for (const k of ['q', 'answer']) if (typeof t[k] !== 'string' || !t[k].trim()) errors.push(`${w}: needs ${k} (text)`);
    for (const k of Object.keys(t)) if (!['q', 'vars', 'let', 'where', 'answer', 'show', 'tolerance', 'form', 'feedback', 'explain'].includes(k)) errors.push(`${w}: unknown field ${k}`);
    if (t.feedback !== undefined && !(Array.isArray(t.feedback) && t.feedback.every((f) => Array.isArray(f) && f.length === 2))) errors.push(`${w}: feedback is a list of [wrong answer, message] pairs`);
    if (!t.explain) warnings.push(`${w}: no explain (students see it after answering)`);
    if (errors.length) return;
    let made = 0, clash = 0, seen = new Set();
    const rnd = PRACTICE.rng(12345 + i);
    try {
      for (let k = 0; k < n; k++) {
        const g = PRACTICE.generate(t, rnd);
        if (!g) continue;
        made++; seen.add(g.q);
        if (/\{|\}|NaN|Infinity|undefined/.test(g.q + g.answer + g.explain)) { errors.push(`${w}: a question came out as "${g.q}" with answer "${g.answer}"`); break; }
        const sub = /^subject ([a-zA-Z])$/.exec(g.form), algebra = sub || /[a-zA-Z]/.test(g.answer);
        if (g.form && !['simplest', 'decimal', 'whole', 'expanded', 'factorised', 'simplified'].includes(g.form) && !sub) { errors.push(`${w}: form "${g.form}" is not one of simplest, decimal, whole, expanded, factorised, simplified or subject x`); break; }
        if (['expanded', 'factorised', 'simplified'].includes(g.form) && !WPF) { errors.push(`${w}: form ${g.form} needs the form checker (Numbas)`); break; }
        if (sub && !new RegExp('^\\s*' + sub[1] + '\\s*=').test(g.answer)) { errors.push(`${w}: with form "subject ${sub[1]}" the answer starts "${sub[1]} =", not "${g.answer}"`); break; }
        if (algebra) { try { if (!PRACTICE.ineq(g.answer, WPM)) WPM.parse(sub ? g.answer.split('=')[1] : g.answer); } catch (e) { errors.push(`${w}: the answer "${g.answer}" cannot be read (${e.message}) for "${g.q}"`); break; } }
        else for (const part of g.answer.split(':')) { let a; try { a = WPM.evaluate(part, {}); } catch (e) { a = null; } if (a === null || !Number.isFinite(a)) { errors.push(`${w}: the answer "${g.answer}" is not a number for "${g.q}"`); break; } }
        if (errors.length) break;
        const self = PRACTICE.mark(g, g.answer.replace(/:/g, ' : '), WPM, WPF);
        if (!self.ok) { errors.push(`${w}: its own answer "${g.answer}" is marked wrong for "${g.q}" (${self.msg})`); break; }
        for (const [fa] of g.feedback) { try { if (fa.includes(':') ? fa.replace(/\s/g, '') === g.answer.replace(/\s/g, '') : WPM.equivalent(fa, g.answer)) clash++; } catch (e) { /* not comparable */ } }
      }
    } catch (e) { errors.push(`${w}: ${e.message}`); return; }
    const before = errors.length;
    if (made < n * 0.5 && !errors.some((e) => e.startsWith(w))) errors.push(`${w}: only ${made} of ${n} tries found numbers that fit "where"; loosen it or the ranges`);
    else if (seen.size < 6) warnings.push(`${w}: only ${seen.size} different questions; widen the ranges`);
    // A feedback answer that sometimes equals the right one is skipped for those questions (rounding down when no rounding
    // up is needed, say). Warn only when it is nearly always skipped, so it hardly ever helps.
    if (clash > made * 0.9) warnings.push(`${w}: a feedback answer equals the right answer in ${clash} of ${made} questions, so it almost never shows`);
  });
  return { errors, warnings };
}
