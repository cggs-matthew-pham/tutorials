// `npm run check-python-errors`: every common beginner slip gets the right friendly line, from Skulpt's message
// (turtle playground) and from CPython's (Python playground). See tools/python-errors.mjs.
import { explainError } from './python-errors.mjs';

const T = 'from turtle import *\n';
const CASES = [
  // [name, source, Skulpt message, CPython message (or null), text the hint must contain, line]
  ['missing colon', T + 'for i in range(4)\n    forward(50)\n', 'SyntaxError: bad input on line 2', '  File "<exec>", line 2\n    for i in range(4)\n                     ^\nSyntaxError: expected \':\'', 'must end with a colon', 2],
  ['body not indented', T + 'for i in range(4):\nforward(50)\n', 'SyntaxError: bad input on line 3', '  File "<exec>", line 3\n    forward(50)\n    ^\nIndentationError: expected an indented block after \'for\' statement on line 2', 'need to be indented under it', 3],
  ['extra indent', T + 'forward(50)\n    left(90)\n', 'SyntaxError: bad input on line 3', '  File "<exec>", line 3\n    left(90)\nIndentationError: unexpected indent', 'nothing above starts a block', 3],
  ['bad dedent', T + 'for i in range(4):\n    forward(50)\n  left(90)\n', 'SyntaxError: bad input on line 4', '  File "<exec>", line 4\n    left(90)\nIndentationError: unindent does not match any outer indentation level', 'does not line up', 4],
  ['unclosed quote', 'print("hello)\n', 'SyntaxError: bad input on line 1', '  File "<exec>", line 1\n    print("hello)\n          ^\nSyntaxError: unterminated string literal (detected at line 1)', 'nothing closes it', 1],
  ['unclosed bracket', T + 'forward(50\nleft(90)\n', 'SyntaxError: bad input on line 3', '  File "<exec>", line 2\n    forward(50\n           ^\nSyntaxError: \'(\' was never closed', 'opens here but is not closed', 2],
  ['extra bracket', 'print("hi"))\n', 'SyntaxError: bad input on line 1', '  File "<exec>", line 1\n    print("hi"))\n               ^\nSyntaxError: unmatched \')\'', 'with no ( to match', 1],
  ['= in if', 'x = 3\nif x = 3:\n    print("yes")\n', 'SyntaxError: bad input on line 2', '  File "<exec>", line 2\n    if x = 3:\n       ^^^^^\nSyntaxError: invalid syntax. Maybe you meant \'==\' or \':=\' instead of \'=\'?', 'use == (two equals signs)', 2],
  ['no brackets', T + 'forward 50\n', 'SyntaxError: bad input on line 2', '  File "<exec>", line 2\n    forward 50\n    ^^^^^^^^^^\nSyntaxError: invalid syntax', 'forward(…)', 2],
  ['typo', T + 'foward(50)\n', "NameError: name 'foward' is not defined on line 2", 'Traceback (most recent call last):\n  File "<exec>", line 2, in <module>\nNameError: name \'foward\' is not defined. Did you mean: \'forward\'?', 'Did you mean forward?', 2],
  ['capitals', T + 'Forward(50)\n', "NameError: name 'Forward' is not defined on line 2", null, 'capital letters', 2],
  ['used before created', 'print(score)\nscore = 0\n', "NameError: name 'score' is not defined on line 1", null, 'only given a value on line 2', 1],
  ['no turtle import', 'forward(50)\n', "NameError: name 'forward' is not defined on line 1", null, 'from turtle import *', 1],
  ['unknown name', 'print(hello)\n', "NameError: name 'hello' is not defined on line 1", null, 'put it in quotes', 1],
  ['own function misspelt', 'def square(size):\n    print(size)\nsqaure(5)\n', "NameError: name 'sqaure' is not defined on line 3", null, 'Did you mean square?', 3],
  ['global', 'score = 0\ndef add():\n    score = score + 1\nadd()\n', "UnboundLocalError: local variable 'score' referenced before assignment on line 3", 'Traceback (most recent call last):\n  File "<exec>", line 4, in <module>\n  File "<exec>", line 3, in add\nUnboundLocalError: cannot access local variable \'score\' where it is not associated with a value', 'global score', 3],
  ['join text and number', 'score = 5\nprint("Score: " + score)\n', "TypeError: cannot concatenate 'str' and 'int' objects on line 2", 'Traceback (most recent call last):\n  File "<exec>", line 2, in <module>\nTypeError: can only concatenate str (not "int") to str', 'str(…)', 2],
  ['input not converted', 'n = input("Number? ")\nprint(n - 1)\n', "TypeError: unsupported operand type(s) for -: 'str' and 'int' on line 2", null, 'int(…) first', 2],
  ['int of words', 'x = int("five")\n', "ValueError: invalid literal for int() with base 10: 'five' on line 1", 'Traceback (most recent call last):\n  File "<exec>", line 1, in <module>\nValueError: invalid literal for int() with base 10: \'five\'', "given 'five'", 1],
  ['missing argument', T + 'def sq(size):\n    forward(size)\nsq()\n', 'TypeError: sq() missing 1 required argument: size on line 4', 'Traceback (most recent call last):\n  File "<exec>", line 4, in <module>\nTypeError: sq() missing 1 required positional argument: \'size\'', 'sq needs a value for size', 4],
  ['too many arguments', 'def hi():\n    print("hi")\nhi(3)\n', 'TypeError: hi() takes 0 positional arguments but 1 was given on line 3', null, 'hi takes 0 values', 3],
  ['index', 'a = [1, 2, 3]\nprint(a[3])\n', 'IndexError: list index out of range on line 2', 'Traceback (most recent call last):\n  File "<exec>", line 2, in <module>\nIndexError: list index out of range', 'Positions start at 0', 2],
  ['module attr', 'import random\nrandom.randInt(1, 5)\n', "AttributeError: module 'random' has no attribute 'randInt' on line 2", null, 'Did you mean randint?', 2],
  ['divide by zero', 'print(5 / 0)\n', 'ZeroDivisionError: integer division or modulo by zero on line 1', 'Traceback (most recent call last):\n  File "<exec>", line 1, in <module>\nZeroDivisionError: division by zero', 'divides by zero', 1],
  ['loop over a number', 'for i in 5:\n    print(i)\n', "TypeError: 'int' object is not iterable on line 1", null, 'range(n)', 1],
  ['time limit', 'x = 0\nwhile x < 5:\n    print(x)\n', 'TimeLimitError: Program exceeded run time limit. on line 3', null, 'runs forever', null],
];

let bad = 0;
// The Python playground has no turtle: never suggest the turtle import or a turtle name there.
{
  const r = explainError("NameError: name 'forward' is not defined on line 1", 'forward(50)\n', { turtle: false });
  if (!r || /turtle/.test(r.hint)) { bad++; console.error(`✗ no turtle: got ${r?.hint}`); }
  const p = explainError("NameError: name 'pirnt' is not defined on line 1", 'pirnt("hi")\n', { turtle: false });
  if (!p?.hint.includes('Did you mean print?')) { bad++; console.error(`✗ no turtle, builtin typo: got ${p?.hint}`); }
}
for (const [name, src, sk, py, want, line] of CASES) for (const [who, msg] of [['Skulpt', sk], ['CPython', py]]) {
  if (!msg) continue;
  const r = explainError(msg, src);
  if (!r || !r.hint.includes(want) || (line !== null && r.line !== line)) { bad++; console.error(`✗ ${name} (${who}): wanted "${want}" on line ${line}, got ${r ? `line ${r.line}: ${r.hint}` : 'nothing'}`); }
}
if (!bad) console.log(`✓ python errors: ${CASES.length} slips explained, from Skulpt and CPython messages`);
process.exit(bad ? 1 : 0);
