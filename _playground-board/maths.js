var WPM=(function makeMath() {
  function tokens(s) {
    s = String(s).replace(/[−–]/g, '-').replace(/×|·/g, '*').replace(/÷/g, '/').replace(/\s+/g, '');
    var out = [], i = 0;
    while (i < s.length) {
      var c = s[i], m;
      if ((m = /^\d+(\.\d+)?|^\.\d+/.exec(s.slice(i)))) { out.push({ t: 'n', v: parseFloat(m[0]) }); i += m[0].length; }
      // A name with an underscore is one variable (acc_messy, has_neither): board values with long names. Students
      // never type "_" in algebra, so 2xy is still 2 × x × y.
      else if ((m = /^[a-zA-Z]\w*_\w*/.exec(s.slice(i)))) { out.push({ t: 'v', v: m[0] }); i += m[0].length; }
      else if (/[a-zA-Z]/.test(c)) { out.push({ t: 'v', v: c }); i++; }
      else if ('+-*/^()='.indexOf(c) >= 0) { out.push({ t: c }); i++; }
      else throw new Error('I do not understand "' + c + '".');
    }
    // Implicit multiplication: 2x, 2(x + 1), (x + 1)(x - 1), x(3), xy
    var r = [];
    for (var k = 0; k < out.length; k++) {
      var a = r[r.length - 1], b = out[k];
      if (a && (a.t === 'n' || a.t === 'v' || a.t === ')') && (b.t === 'n' || b.t === 'v' || b.t === '(') && !(a.t === 'n' && b.t === 'n')) r.push({ t: '*' });
      r.push(b);
    }
    return r;
  }
  // Recursive descent: expr = term (+|- term)*, term = unary (*|/ unary)*, unary = -unary | power, power = atom (^ unary)?
  function parse(s) {
    var tk = tokens(s), p = 0;
    function peek() { return tk[p] && tk[p].t; }
    function expr() { var n = term(); while (peek() === '+' || peek() === '-') { var o = tk[p++].t; n = { o: o, a: n, b: term() }; } return n; }
    function term() { var n = unary(); while (peek() === '*' || peek() === '/') { var o = tk[p++].t; n = { o: o, a: n, b: unary() }; } return n; }
    function unary() { if (peek() === '-') { p++; return { o: 'neg', a: unary() }; } if (peek() === '+') { p++; return unary(); } return power(); }
    function power() { var n = atom(); if (peek() === '^') { p++; n = { o: '^', a: n, b: unary() }; } return n; }
    function atom() {
      var t = tk[p++];
      if (!t) throw new Error('Something is missing at the end.');
      if (t.t === 'n') return { n: t.v };
      if (t.t === 'v') return { v: t.v };
      if (t.t === '(') { var n = expr(); if (peek() !== ')') throw new Error('A bracket is not closed.'); p++; return n; }
      throw new Error('Something is missing before "' + t.t + '".');
    }
    if (!tk.length) throw new Error('Type an answer first.');
    var tree = expr();
    if (p < tk.length) throw new Error(tk[p].t === '=' ? 'Use only one = sign.' : 'Check the end of your answer.');
    return tree;
  }
  function ev(n, vars) {
    if (n.n !== undefined) return n.n;
    if (n.v !== undefined) { if (!(n.v in vars)) throw new Error('What is ' + n.v + '?'); return vars[n.v]; }
    var a = ev(n.a, vars);
    if (n.o === 'neg') return -a;
    var b = ev(n.b, vars);
    return n.o === '+' ? a + b : n.o === '-' ? a - b : n.o === '*' ? a * b : n.o === '/' ? a / b : Math.pow(a, b);
  }
  function names(n, set) { set = set || {}; if (n.v !== undefined) set[n.v] = 1; if (n.a) names(n.a, set); if (n.b) names(n.b, set); return set; }
  function evaluate(s, vars) { return ev(parse(s), vars || {}); }
  var close = function (a, b) { return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b)); };
  // Same value for every tested value of each variable (both directions, so extra variables are caught).
  function equivalent(a, b) {
    var ta = parse(a), tb = parse(b), vs = Object.keys(Object.assign(names(ta), names(tb)));
    var pts = [-2.5, -1, 0.5, 1.75, 3, 7.25];
    for (var i = 0; i < pts.length; i++) {
      var vars = {};
      vs.forEach(function (v, j) { vars[v] = pts[(i + j * 2) % pts.length] + j * 0.37; });
      var x = ev(ta, vars), y = ev(tb, vars);
      if (!isFinite(x) || !isFinite(y)) continue;
      if (!close(x, y)) return false;
    }
    return true;
  }
  // "x = 4" -> { name: 'x', value: '4' }; "4" -> { name: null, value: '4' }
  function splitAnswer(s) { var m = /^\s*([a-zA-Z])\s*=\s*(.+)$/.exec(String(s)); return m ? { name: m[1], value: m[2] } : { name: null, value: String(s) }; }
  // An equation's two sides, or null if there is not exactly one "=".
  function sides(s) { var parts = String(s).split('='); return parts.length === 2 && parts[0].trim() && parts[1].trim() ? parts : null; }
  // Does this value make the equation true?
  function satisfies(eq, vars) { var sd = sides(eq); if (!sd) throw new Error('An equation needs one = sign with something on each side.'); return close(evaluate(sd[0], vars), evaluate(sd[1], vars)); }
  // A parsed expression as a function of its variables: compile("mx + c")({ m: 2, c: 1, x: 3 }) = 7.
  function compile(s) { var t = parse(s); return function (vars) { return ev(t, vars || {}); }; }
  // Conditions on a board's scope ({ vars: { m: 2 }, points: { A: [1, 3] } }), for board checks:
  //   "m = 2", "c > 0", "2m + c <= 7"          compare two expressions (= is equal, within rounding)
  //   "A on y = 2x + 1"                        the point's coordinates make the equation true
  //   "x(A) = 3", "y(B) > y(A)"                a point's coordinates in an expression
  //   clause and clause                        all must hold
  var CMP = /<=|>=|≤|≥|<|>|=/;
  function clauses(cond) {
    var cs = String(cond).split(/\band\b/i).map(function (c) { return c.trim(); });
    if (!cs.every(Boolean)) throw new Error('Something is missing next to "and".');
    return cs.map(function (c) {
      var on = /^([A-Z])\s+on\s+(.+)$/.exec(c);
      if (on) { if (!sides(on[2])) throw new Error('"' + c + '": after "on", write an equation, such as y = 2x + 1.'); return { on: on[1], eq: on[2] }; }
      var m = CMP.exec(c);
      if (!m) throw new Error('"' + c + '" needs a comparison (=, <, >, <= or >=), or "A on y = ...".');
      var a = c.slice(0, m.index), b = c.slice(m.index + m[0].length);
      if (CMP.test(b)) throw new Error('"' + c + '": use one comparison per part (join parts with "and").');
      return { a: a, op: { '≤': '<=', '≥': '>=' }[m[0]] || m[0], b: b };
    });
  }
  // x(A), y(A) -> numbers from the scope (or a placeholder when only checking that it parses)
  function coords(s, points) {
    return String(s).replace(/\b([xy])\(([A-Z])\)/g, function (m, k, n) {
      if (!points) return '1';
      if (!points[n]) throw new Error('There is no point ' + n + '.');
      var v = points[n][k === 'x' ? 0 : 1]; return '(' + v + ')';
    });
  }
  // Throws a message when the condition cannot be read; returns the point and variable names it uses.
  function checkCondition(cond) {
    var used = { vars: {}, points: {} };
    clauses(cond).forEach(function (c) {
      String(c.on ? c.eq : c.a + ' ' + c.b).replace(/\b[xy]\(([A-Z])\)/g, function (m, n) { used.points[n] = 1; return m; });
      if (c.on) { used.points[c.on] = 1; var sd = sides(c.eq); parse(sd[0]); parse(sd[1]); Object.assign(used.vars, names(parse(sd[0])), names(parse(sd[1]))); delete used.vars.x; delete used.vars.y; }
      else { var ta = parse(coords(c.a)), tb = parse(coords(c.b)); Object.assign(used.vars, names(ta), names(tb)); }
    });
    return { vars: Object.keys(used.vars), points: Object.keys(used.points) };
  }
  function holds(cond, scope) {
    scope = scope || {};
    var vars = scope.vars || {}, points = scope.points || {};
    return clauses(cond).every(function (c) {
      if (c.on) {
        var P = points[c.on];
        if (!P) throw new Error('There is no point ' + c.on + '.');
        return satisfies(c.eq, Object.assign({}, vars, { x: P[0], y: P[1] }));
      }
      var a = evaluate(coords(c.a, points), vars), b = evaluate(coords(c.b, points), vars), eq = close(a, b);
      return c.op === '=' ? eq : c.op === '<' ? a < b && !eq : c.op === '>' ? a > b && !eq : c.op === '<=' ? a < b || eq : a > b || eq;
    });
  }
  return { parse: parse, evaluate: evaluate, compile: compile, equivalent: equivalent, splitAnswer: splitAnswer, sides: sides, satisfies: satisfies, holds: holds, checkCondition: checkCondition, vars: function (s) { return Object.keys(names(parse(s))); } };
})();
