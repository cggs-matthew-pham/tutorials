// Form checks for maths answers ("is it expanded? fully factorised? is d the subject?"), on Numbas's JME
// (vendor/numbas/, Apache-2.0, rebuilt by tools/numbas/build-jme.sh). An `answer` check with `form:` uses this for
// both equivalence and form; plain answer checks and board conditions keep WPM (math-expr.mjs).
//
// makeForms(Numbas) closes over nothing but its argument, because its source is inlined into lesson pages
// (FORMS_JS), as WPM's is: the same code marks in the browser and in validate (loadForms, Node).
//
// check(answer, expected, form) -> { ok, equivalent, why, unsure }
//   ok: equivalent and in the form. why: what to tell the student when not. unsure: equivalent, but the form could
//   not be judged (an unusual way of writing it): it passes, with a note, because a correct answer is never marked
//   wrong for its shape.
// Forms: expanded (no brackets, nothing left to collect), simplified (nothing left to collect; brackets allowed),
// factorised (a product, whole numbers, no common factor left in a bracket), subject x (x = ..., x only on the left),
// simplest (a number as a whole number, a fraction or a mixed numeral in lowest terms) and decimal (a decimal number).
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

export const FORMS = ['expanded', 'simplified', 'factorised', 'simplest', 'decimal'];
export const isForm = (f) => FORMS.includes(f) || /^subject [a-zA-Z]$/.test(String(f));

export function makeForms(Numbas) {
  var jme = Numbas.jme, scope = jme.builtinScope;
  var MSG = {
    brackets: 'Expand the brackets: none should be left in your answer.',
    terms: 'Collect the like terms: some of your terms can still be added together.',
    powers: 'Combine the powers of the same letter into one power.',
    numbers: 'Work out the numbers: some can still be multiplied or added.',
    product: 'Write it as a product: a number or letter times a bracket.',
    whole: 'Use whole numbers in a factorised answer.',
    hcf: 'Take out the highest common factor: the bracket still has a common factor.',
    lowest: 'Simplify: the top and bottom still have a common factor.',
    fraction: 'Write it as a fraction, such as 3/4.',
    decimal: 'Write it as a decimal, such as 0.75.',
  };
  var clean = function (s) { return String(s).replace(/[−–]/g, '-').replace(/[×·]/g, '*').replace(/÷/g, '/').trim(); };
  // what students mean: 2xy is 2 × x × y and x(x + 3) is x × (x + 3); sin, ln, pi and e stay as they are
  var tree = function (s) { return scope.expandJuxtapositions(jme.compile(clean(s))); };
  var text = function (t) { return jme.display.treeToJME(t, {}, scope); };
  var simp = function (s, rules) { return jme.display.simplifyExpression(s, rules, scope); };
  var has = function (s, pat) { return !!jme.rules.matchExpression(pat, s, { allowOtherTerms: true }); };
  var is = function (s, pat, opts) { return !!jme.rules.matchExpression(pat, s, Object.assign({ allowOtherTerms: false }, opts || {})); };
  var same = function (a, b) { return jme.compare(a, b, {}, scope); };
  var TIDY = 'unitFactor,unitPower,zeroTerm,zeroFactor';
  // Nothing left to collect: simplifying with each rule set changes nothing beyond the tidy-up. Returns a MSG key.
  function uncollected(s) {
    var base = simp(s, TIDY);
    if (simp(s, TIDY + ',cancelFactors') !== base) return 'powers';
    if (simp(s, TIDY + ',cancelTerms') !== base) return 'terms';
    if (simp(s, TIDY + ',collectNumbers') !== base) return 'numbers';
    return null;
  }
  function brackets(s) { return has(s, 'm_anywhere(?*(? + ?`+))') || has(s, 'm_anywhere((? + ?`+)^?)') || has(s, 'm_anywhere(-(? + ?`+))'); }
  // The letters in every term of a sum (a letter common to all terms can still be taken out: x^2 + 2x)
  function commonLetters(s) {
    var terms = [], walk = function (t) { var o = t.tok.type === 'op' && t.tok.name; if (o === '+' || o === '-') { walk(t.args[0]); walk(t.args[1]); } else if (o === '-u') walk(t.args[0]); else terms.push(t); };
    walk(jme.compile(s));
    var letters = function (t) { var o = t.tok.type === 'op' && t.tok.name, out = {};
      if (t.tok.type === 'name') out[t.tok.name] = 1;
      else if (o === '*') { Object.assign(out, letters(t.args[0]), letters(t.args[1])); }
      else if (o === '^' && t.args[0].tok.type === 'name') out[t.args[0].tok.name] = 1;
      else if (o === '-u') return letters(t.args[0]);
      return out; };
    var common = null;
    terms.forEach(function (t) { var l = letters(t); common = common === null ? l : Object.keys(common).reduce(function (c, k) { if (l[k]) c[k] = 1; return c; }, {}); });
    return terms.length > 1 && common && Object.keys(common).length > 0;
  }
  function fullyOut(s) { return simp(s, 'unitFactor') === simp(s, 'unitFactor,collectIntegerFactors') && !commonLetters(s); }
  function form(s, f) {
    if (f === 'expanded') { if (brackets(s)) return 'brackets'; return uncollected(s); }
    if (f === 'simplified') return uncollected(s);
    if (f === 'factorised') {
      if (has(s, 'm_anywhere(decimal:$n)') || has(s, 'm_anywhere($n/$n)')) return 'whole';
      if (is(s, '(? + ?`+)^$n')) return fullyOut(text(jme.compile(s).args[0])) ? null : 'hcf';
      if (is(s, '-(? + ?`+)') || is(s, '-(? - ?)')) return fullyOut(text(jme.compile(s).args[0])) ? null : 'hcf';
      var m = jme.rules.matchExpression('m_nogather(`+-(?;f*?`+;f))', s, { allowOtherTerms: false, gatherList: true });
      if (!m) return 'product';
      var fs = (m.f && m.f.args ? m.f.args : [m.f]).map(text);
      var sums = fs.filter(function (x) { return is(x, '? + ?`+') || is(x, '? - ?') || is(x, '(? + ?`+)^?'); });
      if (!sums.length) return 'product';
      for (var i = 0; i < sums.length; i++) {
        var inner = is(sums[i], '(? + ?`+)^?') ? text(jme.compile(sums[i]).args[0]) : sums[i];
        var u = uncollected(inner); if (u) return u;
        if (!fullyOut(inner)) return 'hcf';
      }
      if (fs.length === 1 || (sums.length === 1 && fs.every(function (x) { return x === sums[0] || /^-?1$/.test(x); }))) return 'hcf';
      return null;
    }
    throw new Error('unknown form ' + f);
  }
  // A number as written: a whole number, a decimal, a fraction a/b or a mixed numeral "1 1/2"; null if none of those.
  var gcd = function (a, b) { return b ? gcd(b, a % b) : a; };
  function rat(s0) {
    var s = clean(s0).replace(/\s+/g, ' '), m;
    if ((m = /^(-?)(\d+) (\d+) ?\/ ?(\d+)$/.exec(s)) && +m[4]) return { v: (+m[2] + +m[3] / +m[4]) * (m[1] ? -1 : 1), kind: 'mixed', n: +m[3], d: +m[4] };
    if ((m = /^(-?)(\d+) ?\/ ?(\d+)$/.exec(s)) && +m[3]) return { v: +m[2] / +m[3] * (m[1] ? -1 : 1), kind: 'fraction', n: +m[2], d: +m[3] };
    if (/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return { v: Number(s), kind: /\./.test(s) ? 'decimal' : 'whole' };
    return null;
  }
  function numberForm(answer, expected, f) {
    var A = rat(answer), E = rat(expected);
    if (!E) throw new Error('form ' + f + ': the expected answer "' + expected + '" is not a number, fraction or mixed numeral');
    if (!A) return { ok: false, equivalent: false, why: f === 'decimal' ? MSG.decimal : 'Write one number: a fraction such as 3/4, or a mixed numeral such as 1 1/2.' };
    if (Math.abs(A.v - E.v) > 1e-9) return { ok: false, equivalent: false, why: 'Not quite. Check your working and try again.' };
    if (f === 'decimal') return A.kind === 'decimal' || A.kind === 'whole' ? { ok: true, equivalent: true, why: '' } : { ok: false, equivalent: true, why: MSG.decimal };
    if (A.kind === 'decimal') return { ok: false, equivalent: true, why: MSG.fraction };
    if (A.kind === 'whole' || (A.n === 0)) return { ok: true, equivalent: true, why: '' };
    if (A.d === 1 || gcd(A.n, A.d) > 1) return { ok: false, equivalent: true, why: MSG.lowest };
    return { ok: true, equivalent: true, why: '' };
  }
  function check(answer, expected, f) {
    if (f === 'simplest' || f === 'decimal') return numberForm(answer, expected, f);
    var sub = /^subject ([a-zA-Z])$/.exec(f || '');
    if (sub) {
      var v = sub[1], a = clean(answer).split('='), e = clean(expected).split('=');
      if (a.length !== 2) return { ok: false, equivalent: false, why: 'Write an equation that starts ' + v + ' =.' };
      var eq = false;
      try { eq = same(tree(a[1]), tree(e[1])) || same(tree(a[0]), tree(e[1])); } catch (err) { return { ok: false, equivalent: false, why: err.message }; }
      var lhs = clean(a[0]), rhsHas = has(text(tree(a[1])), 'm_anywhere(' + v + ')');
      if (lhs.toLowerCase() !== v.toLowerCase() || rhsHas)   // either case: Numbas compares letters case-insensitively too
       return { ok: false, equivalent: eq, why: 'Write it as ' + v + ' = …, with ' + v + ' only on the left.' };
      return { ok: eq, equivalent: eq, why: eq ? '' : 'Not quite: check each step of your rearranging.' };
    }
    var ta, te;
    try { ta = tree(answer); te = tree(expected); } catch (err) { return { ok: false, equivalent: false, why: 'I could not read that: check the brackets and signs.' }; }
    var eqv = same(ta, te);
    if (!eqv || !f) return { ok: eqv, equivalent: eqv, why: eqv ? '' : 'Not quite. Check your working and try again.' };
    try {
      var k = form(text(ta), f);
      return k ? { ok: false, equivalent: true, why: MSG[k] } : { ok: true, equivalent: true, why: '' };
    } catch (err) {
      return { ok: true, equivalent: true, unsure: true, why: 'That is equivalent. I could not check how it is written, so ask your teacher whether it is in the form they want.' };
    }
  }
  // Working: each line equal to the one before (expressions), or with the same solutions (equations: one line is a
  // non-zero multiple of the other, as left − right), and the last line in the form. Lines are checked at sample values.
  var PTS = [0.37, 1.21, -0.83, 2.17, -1.6, 0.59, 3.3];
  function sides(s) { return clean(s).split('='); }
  function diff(s) { var p = sides(s); return p.length === 2 ? tree('(' + text(tree(p[0])) + ')-(' + text(tree(p[1])) + ')') : tree(s); }
  function values(t, names, shift) {
    return PTS.map(function (x, i) { var v = {}; names.forEach(function (n, j) { v[n] = PTS[(i + j * 3 + shift) % PTS.length] + j * 0.11; }); var r = scope.evaluate(t, v); return r && typeof r.value === 'number' ? r.value : NaN; });
  }
  function stepSame(a, b) {
    var pa = sides(a), pb = sides(b);
    if (pa.length > 2 || pb.length > 2) return 'one';
    if (pa.length !== pb.length) return pa.length === 2 ? 'equation' : 'expression';
    var ta = diff(a), tb = diff(b);
    if (pa.length === 1) return same(ta, tb) ? null : 'step';
    var EQ = 'stepEq';
    var names = Object.keys([ta, tb].reduce(function (o, t) { jme.findvars(t, [], scope).forEach(function (n) { o[n] = 1; }); return o; }, {}));
    var va = values(ta, names, 0), vb = values(tb, names, 0), ratio = null;
    for (var i = 0; i < va.length; i++) {
      if (!isFinite(va[i]) || !isFinite(vb[i])) return EQ;
      if (Math.abs(va[i]) < 1e-9) { if (Math.abs(vb[i]) > 1e-7) return EQ; continue; }
      var r = vb[i] / va[i];
      if (Math.abs(r) < 1e-12) return EQ;
      if (ratio === null) ratio = r; else if (Math.abs(r - ratio) > 1e-7 * Math.max(1, Math.abs(ratio))) return EQ;
    }
    return null;
  }
  var LINE = {
    step: function (n) { return 'Line ' + n + ' is not equal to the line before it. Check that step.'; },
    stepEq: function (n) { return 'Line ' + n + ' does not follow from the line before it: check that you did the same to both sides.'; },
    one: function (n) { return 'Line ' + n + ' has more than one = sign: write one step per line.'; },
    equation: function (n) { return 'Line ' + n + ' should be an equation, like the lines before it.'; },
    expression: function (n) { return 'Line ' + n + ' should be an expression, like the lines before it (no = sign).'; },
  };
  // working(lines, start, f) -> { ok, lines: [{ ok, why }], why }
  function working(lines, start, f) {
    lines = lines.map(function (l) { return String(l).trim(); }).filter(Boolean);
    if (!lines.length) return { ok: false, lines: [], why: 'Write your working, one step per line.' };
    var out = [], prev = start, bad = null;
    for (var i = 0; i < lines.length; i++) {
      var k;
      try { k = stepSame(prev, lines[i]); } catch (err) { k = 'read'; }
      if (k) { var why = k === 'read' ? 'I could not read line ' + (i + 1) + ': check the brackets and signs.' : LINE[k](i + 1); out.push({ ok: false, why: why }); bad = bad || why; break; }
      out.push({ ok: true, why: '' }); prev = lines[i];
    }
    if (bad) return { ok: false, lines: out, why: bad };
    var last = lines[lines.length - 1];
    if (f) {
      var sub = /^subject ([a-zA-Z])$/.exec(f);
      if (sub) { var p = sides(last); if (clean(p[0]).toLowerCase() !== sub[1].toLowerCase() || has(text(tree(p[1] || '')), 'm_anywhere(' + sub[1] + ')')) return { ok: false, lines: out, why: 'Your last line should be ' + sub[1] + ' = …, with ' + sub[1] + ' only on the left.' }; }
      else { var fk = null; try { fk = form(text(diff(last)), f); } catch (err) { fk = null; } if (fk) return { ok: false, lines: out, why: 'Every step is right. To finish: ' + MSG[fk].charAt(0).toLowerCase() + MSG[fk].slice(1) }; }
    }
    return { ok: true, lines: out, why: '' };
  }
  return { check: check, working: working, form: function (answer, f) { try { return form(text(tree(answer)), f); } catch (e) { return 'unsure'; } }, MSG: MSG };
}

const START = `Numbas.queueScript('base',[],function(){});Numbas.queueScript('wp-forms',['jme','jme-rules','jme-display','localisation'],function(){Numbas.locale.set_preferred_locale('en-GB');Numbas.locale.init();DONE(MAKE(Numbas));});`;

/** Inline page script: window.WPF_READY resolves to the checker once vendor/numbas has loaded (a deferred script). */
export const FORMS_JS = `window.WPF_READY=new Promise(function(res){var go=function(){if(!window.Numbas)return;${START.replace('DONE(MAKE(Numbas))', `window.WPF=(${makeForms.toString()})(Numbas);res(window.WPF)`)}};if(window.Numbas)go();else document.addEventListener('DOMContentLoaded',go)});`;

export const NUMBAS_FILE = 'vendor/numbas/numbas-jme.min.js';
export const NUMBAS_VERSION = () => readFileSync('vendor/numbas/VERSION', 'utf8').trim();

let cached = null;
/** The checker in Node (validate, tests): Numbas runs in a plain vm context, no browser needed. */
export async function loadForms() {
  if (cached) return cached;
  const ctx = { console, setTimeout, clearTimeout, Promise };
  ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
  vm.createContext(ctx);
  vm.runInContext(readFileSync(NUMBAS_FILE, 'utf8'), ctx, { filename: NUMBAS_FILE });
  cached = await new Promise((res, rej) => {
    ctx.MAKE = makeForms; ctx.DONE = res;
    setTimeout(() => rej(new Error('Numbas did not start (' + NUMBAS_FILE + ')')), 10000);
    vm.runInContext(START, ctx);
  });
  return cached;
}
