// Connects Skulpt (Python in the browser) to the CanvasTurtle renderer.
//
// Skulpt ships its own turtle module. We replace it with a small one whose
// commands call our renderer and suspend the Python program until each
// animated command finishes. Supports both styles students meet:
//   from turtle import *   ->  forward(100)
//   import turtle          ->  turtle.forward(100)   /   t = turtle.Turtle(); t.forward(100)
// Only one turtle exists: Turtle() returns handles to the same one.

const MODULE_SOURCE = String.raw`
var $builtinmodule = function (name) {
  var T = window.__wpTurtle;
  var mod = {};
  var js = Sk.ffi.remapToJs;
  var NONE = Sk.builtin.none.none$;
  var run = function (p) { return Sk.misceval.promiseToSuspension(Promise.resolve(p).then(function () { return NONE; })); };
  var num = function (v) { return new Sk.builtin.float_(v); };
  var colorOf = function (args) {
    if (args.length === 1) { var v = js(args[0]); if (Array.isArray(v)) return rgb(v); return String(v); }
    if (args.length === 3) return rgb(args.map(js));
    return null;
  };
  var rgb = function (v) {
    var max = v.every(function (n) { return n <= 1; }) ? 255 : 1;
    return 'rgb(' + v.map(function (n) { return Math.round(n * max); }).join(',') + ')';
  };
  var SPEEDS = { fastest: 0, fast: 10, normal: 6, slow: 3, slowest: 1 };

  // name -> implementation. Each takes JS-converted args and returns a promise/value.
  var defs = {
    forward: function (d) { return T.forward(d); },
    backward: function (d) { return T.backward(d); },
    right: function (d) { return T.right(d); },
    left: function (d) { return T.left(d); },
    goto: function (x, y) { if (Array.isArray(x)) { y = x[1]; x = x[0]; } return T.goto(x, y); },
    setheading: function (a) { return T.setheading(a); },
    home: function () { return T.home(); },
    circle: function (r, e) { return T.circle(r, e === undefined || e === null ? 360 : e); },
    penup: function () { T.penup(); },
    pendown: function () { T.pendown(); },
    hideturtle: function () { T.hide(); },
    showturtle: function () { T.show(); },
    begin_fill: function () { T.beginFill(); },
    end_fill: function () { T.endFill(); },
    pensize: function (w) { T.setPenWidth(w); },
    clear: function () { T.clear(); },
    reset: function () { T.reset(); },
    dot: function (s, c) { T.dot(s === undefined || s === null ? 10 : s, c); },
    write: function (t, move, align, font) { T.write(t, Array.isArray(font) && font[1] ? font[1] : 14); },
    shape: function (n) { if (typeof n === 'string') { T.shapeName = n === 'turtle' ? 'turtle' : 'classic'; T.draw(); } },
    title: function () {},
    tracer: function () {},
    update: function () {}
  };
  var aliases = {
    fd: 'forward', bk: 'backward', back: 'backward', rt: 'right', lt: 'left',
    setpos: 'goto', setposition: 'goto', seth: 'setheading',
    pu: 'penup', up: 'penup', pd: 'pendown', down: 'pendown', ht: 'hideturtle', st: 'showturtle', width: 'pensize'
  };

  // Python-callable wrappers. Functions that animate return a suspension.
  // Arguments that must be numbers, as in real Python: forward(None) raises TypeError rather than doing nothing.
  var NUMS = { forward: [0], backward: [0], right: [0], left: [0], setheading: [0], circle: [0], goto: [0, 1] };
  var typeName = function (v) { return v === NONE || v === undefined ? 'NoneType' : (v.tp$name || typeof v); };
  var needNumbers = function (name, raw) {
    var want = NUMS[name];
    if (!want) return;
    if (name === 'goto' && raw.length === 1 && raw[0] && raw[0].tp$name === 'tuple') return;
    want.forEach(function (i) {
      var v = raw[i];
      if (!(v instanceof Sk.builtin.int_ || v instanceof Sk.builtin.float_ || (Sk.builtin.lng && v instanceof Sk.builtin.lng) || v instanceof Sk.builtin.bool)) {
        throw new Sk.builtin.TypeError(name + '() needs a number, but got ' + typeName(v) + (v === NONE || v === undefined ? ' (a function that prints instead of returning gives None)' : ''));
      }
    });
  };
  var wrap = function (fn, animates, name) {
    return new Sk.builtin.func(function () {
      needNumbers(name, Array.prototype.slice.call(arguments));
      var args = Array.prototype.slice.call(arguments).map(js);
      var out = fn.apply(null, args);
      return animates || (out && typeof out.then === 'function') ? run(out) : NONE;
    });
  };
  Object.keys(defs).forEach(function (k) { mod[k] = wrap(defs[k], false, k); });
  Object.keys(aliases).forEach(function (a) { mod[a] = mod[aliases[a]]; });
  // Skulpt mangles Python names that are reserved JS words ("goto" is one) with a suffix.
  var pyName = function (k) { return k === 'goto' ? 'goto_$rw$' : k; };
  mod[pyName('goto')] = mod.goto;

  // ---- events and input: onscreenclick(fn), onkey(fn, key), ontimer(fn, ms), listen(), mainloop() ----
  var py = function (f) { return new Sk.builtin.func(f); };
  mod.onscreenclick = mod.onclick = py(function (fn) { T.ev.click = fn === NONE ? null : fn; return NONE; });
  mod.onkey = mod.onkeypress = py(function (fn, key) { var k = js(key); if (fn === NONE) delete T.ev.keys[k]; else T.ev.keys[k] = fn; return NONE; });
  mod.onkeyrelease = py(function () { return NONE; });
  mod.listen = py(function () { return NONE; });
  mod.ontimer = py(function (fn, ms) { T.addTimer(fn, ms === undefined ? 0 : js(ms)); return NONE; });
  // mainloop() / done(): if handlers exist, stay alive and run them one at a time until Stop is pressed.
  var pump = function () {
    var ev = T.ev;
    return (async function () {
      while (true) {
        if (T.stopped) throw new Error('Stopped');
        var item = ev.queue.shift();
        if (!item) {
          if (!T.hasEvents) return NONE;
          await new Promise(function (r) { ev.wake = r; setTimeout(r, 100); });
          ev.wake = null;
          continue;
        }
        await Sk.misceval.callsimAsync({ '*': function () { T.check(); } }, item.fn, ...item.args.map(num));
      }
    })();
  };
  var loop = py(function () {
    if (!T.hasEvents) return NONE;
    return Sk.misceval.promiseToSuspension(pump().then(function () { return NONE; }));
  });
  mod.mainloop = mod.done = mod.exitonclick = loop;
  var ask = function (kind) {
    return py(function (title, prompt) {
      var t = js(title), p = prompt === undefined ? t : js(prompt);
      var v = window.prompt(p);
      if (v === null) return NONE;
      if (kind === 'num') { var n = parseFloat(v); return isNaN(n) ? NONE : num(n); }
      return new Sk.builtin.str(v);
    });
  };
  mod.textinput = ask('text'); mod.numinput = ask('num');

  // colours: pencolor(c) / pencolor(r,g,b), fillcolor, color(pen[, fill])
  var colorFn = function (setter) {
    return new Sk.builtin.func(function () {
      var args = Array.prototype.slice.call(arguments);
      if (args.length) setter(colorOf(args));
      return NONE;
    });
  };
  mod.pencolor = colorFn(function (c) { T.setPenColor(c); });
  mod.fillcolor = colorFn(function (c) { T.setFillColor(c); });
  mod.bgcolor = colorFn(function (c) { T.setBackground(c); });
  mod.color = new Sk.builtin.func(function () {
    var args = Array.prototype.slice.call(arguments);
    if (args.length === 1 || args.length === 3) { var c = colorOf(args); T.setPenColor(c); T.setFillColor(c); }
    else if (args.length === 2) { T.setPenColor(colorOf([args[0]])); T.setFillColor(colorOf([args[1]])); }
    return NONE;
  });
  mod.speed = new Sk.builtin.func(function (s) {
    if (s === undefined) return num(T.speed);
    var v = js(s);
    T.speed = typeof v === 'string' ? (SPEEDS[v] === undefined ? T.speed : SPEEDS[v]) : v;
    return NONE;
  });

  // read-only queries
  mod.xcor = new Sk.builtin.func(function () { return num(T.state.x); });
  mod.ycor = new Sk.builtin.func(function () { return num(T.state.y); });
  mod.heading = new Sk.builtin.func(function () { return num(T.state.heading); });
  mod.position = mod.pos = new Sk.builtin.func(function () { return new Sk.builtin.tuple([num(T.state.x), num(T.state.y)]); });
  mod.isdown = new Sk.builtin.func(function () { return T.state.penDown ? Sk.builtin.bool.true$ : Sk.builtin.bool.false$; });
  mod.distance = new Sk.builtin.func(function (a, b) {
    var x = js(a), y = js(b); if (Array.isArray(x)) { y = x[1]; x = x[0]; }
    return num(Math.hypot(T.state.x - x, T.state.y - y));
  });

  // Screen() and Turtle() both hand back an object exposing the same functions.
  var handleClass = function (clsName) {
    return Sk.misceval.buildClass(mod, function ($gbl, $loc) {
      $loc.__init__ = new Sk.builtin.func(function (self) { return NONE; });
      var methods = {};
      Object.keys(defs).concat(Object.keys(aliases)).concat(['pencolor', 'fillcolor', 'bgcolor', 'color', 'speed', 'xcor', 'ycor', 'heading', 'position', 'pos', 'isdown', 'distance']).forEach(function (k) { methods[k] = mod[k]; });
      Object.keys(methods).forEach(function (k) {
        var f = methods[k];
        $loc[pyName(k)] = new Sk.builtin.func(function (self) {
          var rest = Array.prototype.slice.call(arguments, 1);
          return Sk.misceval.callsimOrSuspendArray(f, rest);
        });
      });
      ['onscreenclick', 'onclick', 'onkey', 'onkeypress', 'onkeyrelease', 'listen', 'ontimer', 'mainloop', 'done', 'exitonclick', 'textinput', 'numinput'].forEach(function (k) {
        $loc[k] = new Sk.builtin.func(function (self) { return Sk.misceval.callsimOrSuspendArray(mod[k], Array.prototype.slice.call(arguments, 1)); });
      });
    }, clsName, []);
  };
  mod.Turtle = handleClass('Turtle');
  mod.Screen = new Sk.builtin.func(function () { return Sk.misceval.callsimArray(mod.Turtle, []); });
  mod.Pen = mod.Turtle;
  return mod;
};
`;

const FRIENDLY = [
  [/name '(\w+)' is not defined/, (m) => `${m[0]}. Check the spelling, and that you created it before using it.`],
  [/unexpected indent|expected an indented block/i, () => 'Indentation problem: lines inside a loop or function must be indented by the same amount.'],
  [/SyntaxError: bad input/, () => 'Python could not read this line. Check for a missing colon (:), bracket or quote on this line or the one above.'],
];

export function friendlyError(err) {
  const text = err.toString();
  for (const [re, fn] of FRIENDLY) { const m = text.match(re); if (m) return `${text}\n${fn(m)}`; }
  return text;
}

export function createRunner({ turtle, onOutput }) {
  window.__wpTurtle = turtle;
  Sk.builtinFiles.files['src/lib/turtle.js'] = MODULE_SOURCE;

  const read = (file) => {
    if (!Sk.builtinFiles || !Sk.builtinFiles.files[file]) throw new Error(`File not found: '${file}'`);
    return Sk.builtinFiles.files[file];
  };

  // Lesson modules (name -> Python source), importable as `from name import ...`.
  let modules = {};
  run.setModules = (m) => { modules = m || {}; };
  function registerModules() {
    for (const [name, source] of Object.entries(modules)) {
      Sk.builtinFiles.files[`src/lib/${name}.py`] = source;
      try { Sk.sysmodules.mp$del_subscript(new Sk.builtin.str(name)); } catch { /* not imported yet */ }
    }
  }

  async function run(code) {
    registerModules();
    Sk.pre = 'output';
    Sk.configure({
      output: onOutput,
      read,
      __future__: Sk.python3,
      execLimit: 60000,
      yieldLimit: 200,
      inputfun: (prompt) => Promise.resolve(window.prompt(prompt) ?? ''),
      inputfunTakesPrompt: true,
    });
    return Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true), {
      '*': () => { turtle.check(); }, // runs on every Skulpt yield: lets Stop interrupt tight loops
    });
  }
  return run;
}
