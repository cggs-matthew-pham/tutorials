// Friendly Python errors: Python's message plus a plain-language line that names the slip and the next move,
// never the answer to the task (AUTHORING › Effort and struggle). Pure: no DOM, no Skulpt, so the turtle playground
// (Skulpt), the Python playground (Pyodide) and `node tools/check-python-errors.mjs` all use the same code.
// build-playground copies this file into both playgrounds.
//
// explainError(errorText, source, { turtle }) → { line, hint } or null when there is nothing useful to add.
// turtle: false where there is no turtle (the Pyodide playground), so turtle names are never suggested.
// Skulpt says "SyntaxError: bad input on line N" for every syntax slip, so syntax errors are diagnosed by reading
// the student's code at and before that line (quotes, brackets, colons, = in a condition, indentation).

const TURTLE = ('forward fd back backward bk left lt right rt penup pu up pendown pd down goto setpos setposition setx sety ' +
  'setheading seth home circle dot stamp color pencolor fillcolor begin_fill end_fill pensize width speed hideturtle ht ' +
  'showturtle st shape write clear reset bgcolor onscreenclick onclick onkey onkeypress ontimer listen mainloop done ' +
  'textinput numinput position pos xcor ycor heading distance towards isdown tracer update Turtle Screen').split(' ');
const BUILTINS = ('print input int float str len range list dict set tuple abs round min max sum sorted reversed enumerate zip ' +
  'type bool isinstance open True False None').split(' ');
const KEYWORDS = new Set('False None True and as assert break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield'.split(' '));
const MODULE_ATTRS = { random: ['randint', 'choice', 'random', 'shuffle', 'uniform', 'randrange', 'sample'], math: ['sqrt', 'pi', 'floor', 'ceil', 'sin', 'cos', 'tan', 'radians', 'degrees'], time: ['sleep', 'time'] };
const HEADER = /^(for|while|if|elif|else|def|class|try|except|finally|with)\b/;

/** The line number Python reported: Skulpt "on line N", CPython the last `File "<exec>", line N`. */
export function errorLine(text) {
  const own = [...String(text).matchAll(/File "<(?:exec|stdin|string|main)[^"]*>", line (\d+)/g)];
  if (own.length) return Number(own.at(-1)[1]);
  const any = [...String(text).matchAll(/\bline (\d+)/g)];
  return any.length ? Number(any.at(-1)[1]) : null;
}

/** The last "XxxError: message" line (CPython puts it last, Skulpt first). */
function errorKind(text) {
  const lines = String(text).split('\n').map((l) => l.trim()).filter(Boolean);
  for (const l of lines.reverse()) { const m = l.match(/^(\w*(?:Error|Exception|Exit))\b:?\s*(.*)$/); if (m) return { kind: m[1], msg: m[2].replace(/\s+on line \d+$/, '') }; }
  return { kind: '', msg: lines[0] || '' };
}

const indentOf = (l) => l.match(/^[ \t]*/)[0].replace(/\t/g, '    ').length;
const blank = (l) => !l || !l.trim() || /^\s*#/.test(l);

/** One line's code with strings and comments blanked out; `open` is the quote left unclosed at the end, if any. */
function scan(line) {
  let out = '', q = null;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === '\\') { out += '  '; i++; continue; } if (c === q) q = null; out += q ? ' ' : c; continue; }
    if (c === '#') break;
    if (c === '"' || c === "'") { q = c; out += c; continue; }
    out += c;
  }
  return { code: out, open: q };
}

function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1); // swapped letters count once
  }
  return d[a.length][b.length];
}
const closest = (name, pool) => {
  let best = null, bd = 3;
  for (const p of pool) { const d = lev(name.toLowerCase(), p.toLowerCase()); if (d < bd && p !== name) { bd = d; best = p; } }
  return name.length >= 3 && bd <= (name.length > 5 ? 2 : 1) ? best : null;
};

/** Names the student's own code creates, with the first line each is created on. */
function definedNames(lines) {
  const at = new Map();
  const add = (n, i) => { if (n && !KEYWORDS.has(n) && !at.has(n)) at.set(n, i + 1); };
  lines.forEach((raw, i) => {
    const l = scan(raw).code;
    let m;
    if ((m = l.match(/^\s*(?:def|class)\s+(\w+)\s*\(?([^)]*)/))) { add(m[1], i); m[2]?.split(',').forEach((p) => add(p.split('=')[0].trim(), i)); }
    if ((m = l.match(/^\s*for\s+([\w\s,]+?)\s+in\b/))) m[1].split(',').forEach((n) => add(n.trim(), i));
    if ((m = l.match(/^\s*([\w\s,]+?)\s*(?:[-+*/%]?=)(?!=)/))) m[1].split(',').forEach((n) => add(n.trim(), i));
    if ((m = l.match(/^\s*import\s+(.+)/))) m[1].split(',').forEach((n) => add(n.trim().split(/\s+as\s+/).pop(), i));
    if ((m = l.match(/^\s*from\s+\S+\s+import\s+(.+)/)) && !/\*/.test(m[1])) m[1].split(',').forEach((n) => add(n.trim().split(/\s+as\s+/).pop(), i));
    if ((m = l.match(/\bglobal\s+([\w\s,]+)/))) m[1].split(',').forEach((n) => add(n.trim(), i));
  });
  return at;
}

function syntax(lines, L, kind, msg, turtle) {
  const at = (n, text) => ({ line: n, hint: `Line ${n}: ${text}` });
  const last = Math.min(L || lines.length, lines.length);
  if (lines.some((l) => /"""|'''/.test(l))) return null; // triple-quoted text: the line-by-line scan would mislead
  // 1. A quote opened and not closed.
  for (let i = 0; i < last; i++) { const s = scan(lines[i]); if (s.open) return at(i + 1, `a quote (${s.open}) opens some text but nothing closes it. Add the closing ${s.open} at the end of the text.`); }
  // 2. Brackets: one closed that was never opened, or one still open when Python gave up.
  const stack = [], pair = { ')': '(', ']': '[', '}': '{' };
  for (let i = 0; i < last; i++) for (const c of scan(lines[i]).code) {
    if ('([{'.includes(c)) stack.push([c, i + 1]);
    else if (pair[c]) { const top = stack.pop(); if (!top || top[0] !== pair[c]) return at(i + 1, `there is a ${c} with no ${pair[c]} to match it. Check the brackets on this line pair up.`); }
  }
  if (stack.length) { const [c, n] = stack.at(-1); const shut = { '(': ')', '[': ']', '{': '}' }[c]; return at(n, `a bracket ${c} opens here but is not closed. Add the ${shut} where it should end.`); }
  // 3. A for, if, def… line without its colon (Python reports the line itself or the one after).
  for (const n of [last, last - 1].filter((n) => n >= 1)) {
    const code = scan(lines[n - 1]).code.trim(), m = code.match(HEADER);
    if (m && !code.endsWith(':')) return at(n, `a line that starts with ${m[1]} must end with a colon (:).`);
  }
  // 4. One = in a condition.
  for (const n of [last, last - 1].filter((n) => n >= 1)) {
    const code = scan(lines[n - 1]).code.trim();
    if (/^(if|elif|while)\b/.test(code) && /(^|[^=<>!])=($|[^=])/.test(code)) return at(n, 'to compare two values, use == (two equals signs). One = stores a value in a variable.');
  }
  // 5. Indentation, against the nearest line above that has code.
  if (last >= 1 && !blank(lines[last - 1])) {
    let p = last - 1; while (p >= 1 && blank(lines[p - 1])) p--;
    const here = indentOf(lines[last - 1]);
    if (p >= 1) {
      const above = lines[p - 1], opens = scan(above).code.trim().endsWith(':');
      if (opens && here <= indentOf(above)) return at(last, `the lines inside the ${(scan(above).code.trim().match(HEADER) || [, 'block'])[1]} on line ${p} need to be indented under it. Add 4 spaces at the start of this line.`);
      if (!opens && here > indentOf(above)) return at(last, `this line is indented more than line ${p}, but nothing above starts a block. Line it up with line ${p}.`);
      if (!opens && here < indentOf(above)) {
        const levels = lines.slice(0, last - 1).filter((l) => !blank(l)).map(indentOf);
        if (!levels.includes(here)) return at(last, 'this line does not line up with any line above it. Use the same number of spaces as the lines it belongs with.');
      }
    } else if (here > 0) return at(last, 'the first line of a program starts at the left edge, with no spaces before it.');
  }
  // 6. A command without brackets: forward 50
  if (last >= 1) {
    const m = scan(lines[last - 1]).code.match(/^\s*([A-Za-z_]\w*)\s+[\w"'(-]/);
    if (m && !KEYWORDS.has(m[1]) && ((turtle && TURTLE.includes(m[1])) || BUILTINS.includes(m[1]) || definedNames(lines).has(m[1]))) return at(last, `to use ${m[1]}, put what it needs in brackets straight after it: ${m[1]}(…).`);
  }
  if (/IndentationError/.test(kind) || /indent/i.test(msg)) return at(last, 'check the indentation: lines inside a loop, if or function are indented by the same amount, and other lines line up with the line above.');
  return L ? at(L, 'Python could not read this line. Check for a missing colon (:), bracket or quote on this line or the one above.') : null;
}

export function explainError(text, source = '', { turtle = true } = {}) {
  const raw = String(text || '');
  const { kind, msg } = errorKind(raw);
  const L = errorLine(raw);
  const lines = String(source).replace(/\r\n?/g, '\n').split('\n');
  const out = (hint, line = L) => ({ line, hint: (line ? `Line ${line}: ` : '') + hint });
  let m;

  if (/SyntaxError|IndentationError|TabError/.test(kind)) return source ? syntax(lines, L, kind, msg, turtle) : (L ? out('Python could not read this line. Check for a missing colon (:), bracket or quote on this line or the one above.') : null);

  if (/TimeLimitError/.test(kind) || /exceeded run time limit/i.test(raw)) return { line: null, hint: 'The program ran for too long, so it was stopped. A while loop whose condition never becomes False runs forever: check that something inside the loop changes it.' };

  if (kind === 'NameError' && (m = msg.match(/name '(\w+)' is not defined/))) {
    const name = m[1], defs = definedNames(lines);
    const hasTurtle = /^\s*(from\s+turtle\s+import|import\s+turtle)/m.test(source);
    if (turtle && TURTLE.includes(name) && !hasTurtle) return out(`${name} is a turtle command, and turtle commands need from turtle import * as the first line of the program.`);
    const known = [...(turtle ? TURTLE : []), ...BUILTINS, ...defs.keys()];
    const sameButCase = known.find((k) => k !== name && k.toLowerCase() === name.toLowerCase());
    if (sameButCase) return out(`Python cares about capital letters, so ${name} and ${sameButCase} are different names. Did you mean ${sameButCase}?`);
    if (defs.has(name) && L && defs.get(name) > L) return out(`${name} is used here, but it is only given a value on line ${defs.get(name)}. Python runs from the top, so create ${name} before this line.`);
    const near = closest(name, known);
    if (near) return out(`Python does not know ${name}. Did you mean ${near}?`);
    return out(`Python does not know ${name}. If it is a variable, give it a value first (${name} = …). If it is meant to be text, put it in quotes.`);
  }

  if (kind === 'UnboundLocalError' || /cannot access local variable/.test(msg)) {
    const name = (msg.match(/variable '(\w+)'/) || [])[1] || 'it';
    let fn = null; if (L) for (let i = L - 1; i >= 0; i--) { const d = lines[i]?.match(/^\s*def\s+(\w+)/); if (d) { fn = d[1]; break; } }
    return out(`this function changes ${name}, so Python treats ${name} as the function's own new variable, which has no value yet. To change the ${name} outside the function, add global ${name} as the first line inside ${fn ? `def ${fn}` : 'the function'}.`);
  }

  if (/cannot concatenate 'str' and '(int|float)'|can only concatenate str \(not "(int|float)"\)|unsupported operand type\(s\) for \+: '(int|float)' and 'str'/.test(raw)) {
    const fromInput = L && /input\s*\(/.test(source);
    return out(`+ cannot join text and a number. To show a number inside text, wrap the number in str(…).${fromInput ? ' If the text came from input() and you want to do maths with it, turn it into a number with int(…) first.' : ''}`);
  }
  if ((m = raw.match(/unsupported operand type\(s\) for ([-*/%]|\*\*|\/\/): '(\w+)' and '(\w+)'/)) && (m[2] === 'str' || m[3] === 'str')) return out(`you cannot do ${m[1]} with text. If the text came from input(), turn it into a number with int(…) first.`);
  if ((m = raw.match(/invalid literal for int\(\)[^:]*: (.*)$/m))) return out(`int() can only turn digits such as "12" into a number, but it was given ${m[1].trim()}. Check what was typed, or test it with .isdigit() before turning it into a number.`);
  if ((m = raw.match(/could not convert string to float: (.*)$/m))) return out(`float() can only turn a number written as text, such as "2.5", into a number, but it was given ${m[1].trim()}.`);

  if ((m = msg.match(/(\w+)\(\) missing (\d+) required (?:positional )?arguments?: '?([\w', and]+?)'?$/))) {
    const names = m[3].replace(/'/g, '');
    return out(`${m[1]} needs a value for ${names}. Put ${m[2] === '1' ? 'it' : 'them'} in the brackets when you call ${m[1]}(…).`);
  }
  if ((m = msg.match(/(\w+)\(\) takes (\d+) positional arguments? but (\d+) (?:were|was) given/))) return out(`${m[1]} takes ${m[2]} value${m[2] === '1' ? '' : 's'} in its brackets, but this call gives ${m[3]}. Look at the def ${m[1]} line to see what it expects.`);

  if (/list index out of range/.test(msg)) return out('that position is past the end of the list. Positions start at 0, so a list of 3 items has positions 0, 1 and 2. len() tells you how many items there are.');
  if (/string index out of range/.test(msg)) return out('that position is past the end of the text. Positions start at 0, so the last letter of "cat" is at 2.');
  if (kind === 'ZeroDivisionError') return out('this divides by zero, which has no answer. Check the number on the bottom of the division: a variable may still be 0.');

  if (kind === 'AttributeError') {
    if ((m = msg.match(/module '(\w+)' has no attribute '(\w+)'/))) {
      const near = closest(m[2], MODULE_ATTRS[m[1]] || []);
      return out(`${m[1]} has nothing called ${m[2]}.${near ? ` Did you mean ${near}? Names care about capitals and spelling.` : ' Check the spelling and capitals.'}`);
    }
    if (/'NoneType' object has no attribute/.test(msg)) return out('this value is None. That often means a function printed its result instead of returning it: check the function has a return line.');
    if ((m = msg.match(/'(\w+)' object has no attribute '(\w+)'/))) return out(`a ${m[1]} does not have ${m[2]}. Check the spelling, and that this is the variable you meant.`);
  }
  if ((m = msg.match(/'(\w+)' object is not callable/))) return out(`a ${m[1]} is being used like a function, with brackets after it. Has a variable been given the same name as a function? Or is a * missing before a bracket?`);
  if ((m = msg.match(/'(int|float)' object is not iterable/))) return out('a for loop goes through a list or a range. To repeat something n times, loop over range(n).');
  if (kind === 'KeyError') return out(`the dictionary has no key ${msg}. Keys must match exactly, including capitals.`);
  if (kind === 'RecursionError' || /maximum recursion depth/.test(raw)) return out('a function keeps calling itself and never stops. Check it has a case that returns without calling itself again.');
  return null;
}
