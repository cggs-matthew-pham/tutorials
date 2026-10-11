---
order: 12
unit: brackets
node: AC9M8A01 n3
title: Changing the subject
summary: "A formula gives one letter from the others. To get a different letter, undo the steps in reverse order, doing the same to both sides: y = 3x + 5 becomes x = (y − 5)/3. Check by substituting."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "P = 2l + 2w gives the fence around a garden. But you have 20 m of fence and a 6 m side. How wide can it be? Turn the formula around."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8168
  url: http://127.0.0.1:8168/index.html
  readySelector: "#sl-w"
  layout: full
explainPicture: { ref: formula.yml#explain-pic, caption: "$P = 2l + 2w$ rearranged: $w = (P - 2l) \\div 2$. With $P = 20$ and $l = 6$: $w = (20 - 12) \\div 2 = 4$." }
explainClip:
  query: { code: "@formula.yml#explain", fresh: 1, id: explain }
  caption: "Turn the formula around"
  say: "Changing the subject turns a formula around."
  clip:
    - caption: { text: "P = 2l + 2w gives P from l and w.", say: "This formula gives P from l and w." }
    - wait: 400
    - caption: { text: "Undo + 2l, then × 2: w = (P − 2l) ÷ 2.", say: "Undo the add, then the times: w is P take two l, halved." }
    - wait: 600
    - caption: { text: "P = 20, l = 6: w = (20 − 12) ÷ 2 = 4. The board agrees.", say: "Twenty take twelve is eight, halved is four. The board agrees." }
    - click: Make w bigger
    - click: Make w bigger
    - expect: { selector: "#gpanel", contains: "= 20" }
    - wait: 1200
---
A formula like $P = 2l + 2w$ gives $P$ when you know $l$ and $w$. $P$ is the **subject**: the letter on its own on one side.

Sometimes you know $P$ and want $w$. **Changing the subject** rearranges the formula so $w$ is on its own. You undo the steps, as when you solved equations, but with letters.

## Predict: which formula gives w?

```step
stage: predict
insight: "Committing to a rearrangement of P = 2l + 2w before testing it with numbers tests whether they undo the steps in reverse order and divide the whole side."
check:
  type: predict
  q: "Which formula gives $w$ from $P = 2l + 2w$?"
  options:
    - "$w = (P - 2l) \\div 2$"
    - "$w = P - 2l \\div 2$"
    - "$w = P \\div 2 - 2l$"
    - "$w = (P + 2l) \\div 2$"
  actual: "w = (P − 2l) ÷ 2. To get w on its own, undo + 2l (take 2l from both sides: P − 2l = 2w), then undo × 2 (halve both sides). With P = 20 and l = 6: (20 − 12) ÷ 2 = 4."
```

Test each option with numbers: if $l = 6$ and $w = 4$, then $P = 20$. Which option gives back 4?

## Run: check with numbers

```step
stage: run
insight: "Finding w on the board for P = 20 and l = 6, then working out the predicted formula, shows that a rearranged formula gives the same numbers as the original: substitution is the check."
try: { playground: board, starter: "formula.yml#run", height: 520 }
check: { type: board, text: "Set $l = 6$, then find the $w$ that makes $P = 20$. Does your formula from Predict give the same $w$?", when: "P = 20 and l = 6" }
```

The board works the formula forwards. Your rearranged formula should give the same $w$ without trying.

## Investigate: undo in reverse order

```step
stage: investigate
insight: "Changing the subject undoes the steps applied to the letter in reverse order, doing the same to the whole of both sides. Jo's mistake divides only one term."
tasks:
  - check:
      type: answer
      q: "Make $x$ the subject of $y = 2x + 7$."
      answer: "x = (y - 7)/2"
      form: subject x
      feedback:
        - ["x = y/2 - 7", "Halve the whole side: undo + 7 first, then halve."]
        - ["x = (y + 7)/2", "Undo + 7 by taking away 7."]
        - ["x = y - 7/2", "Halve all of y − 7, so (y − 7)/2."]
      explain: "y − 7 = 2x, then halve both sides: x = (y − 7)/2. Check: y = 17 gives x = 5, and 2 × 5 + 7 = 17."
  - check:
      type: bug
      code: "working.txt#jo"
      text: "Jo makes $x$ the subject of $y = 4x - 3$. Click the line where her working goes wrong."
      answer: 2
      fault: logic
      misconception: divide-one-term
      explain: "Line 2: dividing the right side by 4 divides both terms, so (4x − 3) ÷ 4 = x − 3/4, not x − 3. Undo − 3 first: y + 3 = 4x, so x = (y + 3)/4."
  - check:
      type: working
      q: "Make $x$ the subject of $y = 3x + 5$. Write one step per line."
      start: "y = 3x + 5"
      form: subject x
      example: ["y - 5 = 3x", "x = (y - 5)/3"]
      wrong: [["y/3 = x + 5", "x = y/3 - 5"], ["y - 5 = 3x"]]
      explain: "Undo + 5: y − 5 = 3x. Undo × 3: x = (y − 5)/3."
```

### Undo the last step first

$x$ was multiplied by 3, then 5 was added. Undo in reverse order: take away 5, then divide by 3.

```worked
y = 3x + 5 :: $x$ was multiplied by 3, then 5 was added.
y - 5 = 3x :: Undo the last step first: take 5 from both sides.
\frac{y - 5}{3} = x :: Undo $\times 3$: divide the whole of both sides by 3.
x = \frac{y - 5}{3} :: Write the subject on the left.
y = 11: x = \frac{11 - 5}{3} = 2 :: Check by substituting: $3 \times 2 + 5 = 11$. ✓
```

Try one: make $x$ the subject of $y = 2x + 7$.

### Find the mistake

Read Jo's working one line at a time. Which step did she do first?

### Your working

Write each step on its own line. The checker marks the first line that does not follow.

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a context checked on the board, one step, a minus sign, undoing a divide, a fraction in the formula, then the edge case of a subject that is subtracted."
try: { playground: board, starter: "formula.yml#vary", height: 520 }
tasks:
  - starter: "formula.yml#vary"
    hint: ["w = (P − 2l) ÷ 2.", "(26 − 16) ÷ 2."]
    check: { type: board, text: "Use $w = (P - 2l) \\div 2$ to find $w$ when $P = 26$ and $l = 8$. Set the board to check.", when: "P = 26 and l = 8", explain: "(26 − 16) ÷ 2 = 5, and 2 × 8 + 2 × 5 = 26." }
  - check:
      type: answer
      q: "One step: make $x$ the subject of $y = x + 9$."
      answer: "x = y - 9"
      form: subject x
      feedback:
        - ["x = y + 9", "Undo + 9 by taking away 9."]
      explain: "Take 9 from both sides: x = y − 9."
  - check:
      type: answer
      q: "A minus sign: make $x$ the subject of $y = 5x - 4$."
      answer: "x = (y + 4)/5"
      form: subject x
      feedback:
        - ["x = (y - 4)/5", "Undo − 4 by adding 4."]
        - ["x = y/5 + 4", "Undo − 4 first, then divide the whole side by 5."]
      explain: "Add 4: y + 4 = 5x. Divide by 5: x = (y + 4)/5."
  - check:
      type: answer
      q: "Undo a divide: make $d$ the subject of $v = \\dfrac{d}{t}$ (speed = distance ÷ time)."
      answer: "d = vt"
      form: subject d
      feedback:
        - ["d = v/t", "d was divided by t. Undo it by multiplying by t."]
      explain: "Multiply both sides by t: d = vt. Check: 60 km/h for 2 h is 120 km."
  - check:
      type: answer
      q: "A fraction: make $h$ the subject of $A = \\dfrac{bh}{2}$ (area of a triangle)."
      answer: "h = 2A/b"
      form: subject h
      feedback:
        - ["h = A/(2b)", "Undo ÷ 2 by multiplying by 2: 2A = bh."]
        - ["h = 2A - b", "h is multiplied by b, so divide by b."]
      explain: "Multiply by 2: 2A = bh. Divide by b: h = 2A/b."
  - check:
      type: answer
      q: "Edge case: make $x$ the subject of $y = 7 - x$."
      answer: "x = 7 - y"
      form: subject x
      feedback:
        - ["x = y - 7", "Check with numbers: x = 2 gives y = 5, and 5 − 7 is not 2."]
      explain: "Add x to both sides: y + x = 7. Take y away: x = 7 − y. Check: x = 2, y = 5, and 7 − 5 = 2."
```

### Check on the board

Each task changes one thing.

### One step

No board from here: undo the steps, then check with numbers.

### A minus sign

### Undo a divide

### A fraction

### The subject is subtracted

## Practise: rearrange and check

```step
stage: practise
insight: "Rearranging real formulas with full working, mixed; dividing only one term is the planted slip, and the review keeps factorising fresh."
tasks:
  - check:
      type: answer
      q: "A plumber charges $c = 50h + 80$ dollars for $h$ hours. Make $h$ the subject."
      answer: "h = (c - 80)/50"
      form: subject h
      feedback:
        - ["h = c/50 - 80", "Undo + 80 first, then divide the whole side by 50."]
        - ["h = (c + 80)/50", "Undo + 80 by taking away 80."]
      explain: "c − 80 = 50h, so h = (c − 80)/50. Check: h = 2 gives c = 180, and (180 − 80)/50 = 2."
  - check:
      type: working
      q: "Make $w$ the subject of $P = 2l + 2w$. Write one step per line."
      start: "P = 2l + 2w"
      form: subject w
      example: ["P - 2l = 2w", "w = (P - 2l)/2"]
      wrong: [["P - 2l = 2w", "w = P - 2l/2"], ["P/2 = l + 2w"]]
      explain: "Undo + 2l: P − 2l = 2w. Halve both sides: w = (P − 2l)/2."
  - check:
      type: answer
      q: "Use your formula: what is $w$ when $P = 30$ and $l = 9$?"
      answer: "6"
      feedback:
        - ["21", "Take 2l, not l: 30 − 18 = 12, then halve."]
        - ["12", "Halve as well: 12 ÷ 2."]
      explain: "(30 − 18) ÷ 2 = 6. Check: 2 × 9 + 2 × 6 = 30."
  - check:
      type: answer
      q: "Review: factorise $6x - 15$ fully."
      answer: "3(2x - 5)"
      form: factorised
      feedback:
        - ["3(2x + 5)", "The minus comes too: −15 ÷ 3 = −5."]
      explain: "HCF 3: 3(2x − 5)."
```

### A formula in context

### Full working

### Use it

### Review: factorising

## Make: work it backwards

```step
stage: make
insight: "Rearranging a cost formula and using it to answer a question, then checking on the board, puts the lesson's two moves together: change the subject, then substitute."
try: { playground: board, starter: "formula.yml#make", height: 460 }
hint: ["Undo + 6, then undo × 4: n = (T − 6)/4.", "(30 − 6) ÷ 4."]
check: { type: board, text: "Hiring a bike costs $T = 4n + 6$ dollars for $n$ hours. Make $n$ the subject, use it to find how many hours 30 dollars buys, then set the board to check.", when: "T = 30", explain: "n = (T − 6)/4 = (30 − 6)/4 = 6 hours. Check: 4 × 6 + 6 = 30." }
```

Write your formula for $n$ first. Then use it, and only then move the slider.

Stretch: make $l$ the subject of $P = 2l + 2w$, then make $r$ the subject of $C = 2\pi r$.
