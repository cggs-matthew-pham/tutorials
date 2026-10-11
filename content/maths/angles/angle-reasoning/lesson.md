---
order: 3
unit: parallel
node: AC9M7M04 n3
title: Reasoning with angles
summary: "Find unknown angles in steps, giving a reason for each: what you know, the rule that links it to the next angle, and the reason in words. Parallel-line rules join straight-line and vertically opposite angles."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A detective does not guess: every step has evidence. Finding an angle is the same. Each angle you find needs a reason, and the reasons are what make the answer trustworthy."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8171
  url: http://127.0.0.1:8171/index.html
  readySelector: ".pangles"
  layout: full
explainPicture: { ref: lines.yml#explain-pic, caption: "$b = 70^\\circ$. Then $f = 70^\\circ$ (corresponding to $b$) and $h = 110^\\circ$ ($f$ and $h$ are on a straight line)." }
explainClip:
  query: { code: "@lines.yml#explain", fresh: 1, id: explain }
  caption: "One step at a time, each with a reason"
  say: "Find angles one step at a time, with a reason for each."
  clip:
    - caption: { text: "b = 70°. Step 1: f = 70°, corresponding to b.", say: "Step one: f is corresponding to b, so seventy degrees." }
    - click: "Angle b, 70°"
    - click: "Angle f, 70°"
    - wait: 900
    - caption: { text: "Step 2: h = 180° − 70° = 110°, on a straight line with f.", say: "Step two: h and f make a straight line, so one hundred and ten." }
    - click: "Angle b, 70°"
    - click: "Angle h, 110°"
    - expect: { selector: "#gsum", contains: "straight line" }
    - wait: 1200
---
You know the rules: corresponding and alternate angles are equal, co-interior angles add to $180^\circ$, and from Year 6, vertically opposite angles are equal and angles on a straight line add to $180^\circ$.

Most problems need more than one rule. In this lesson you find angles **in steps**, and for each step you say which rule you used. Write your working your own way: short notes are fine. The checker marks your answer and the reason at the step that matters; you compare the rest with a model.

## Predict: two steps

```step
stage: predict
insight: "Committing to h when only b is known shows whether they look for a chain (b to f to h) or assume a link between b and h."
check:
  type: predict
  q: "Two parallel lines are crossed by a transversal. $b = 70^\\circ$. What is $h$?"
  options:
    - "$110^\\circ$"
    - "$70^\\circ$"
    - "$20^\\circ$"
    - "$250^\\circ$"
  actual: "110°. b and h are not a named pair, so it takes two steps: f = 70° (corresponding to b), then h = 180° − 70° = 110° (f and h are on a straight line)."
```

$b$ and $h$ are not one of the pairs. Which angle could you find first?

## Run: check the chain

```step
stage: run
insight: "Setting b to 70° and comparing h shows the two-step answer, and turning the line shows h is always 180° minus b: the chain works for every angle."
try: { playground: board, starter: "lines.yml#run", height: 560 }
check: { type: board, text: "Turn the crossing line until $b = 70^\\circ$, then pick $b$ and $h$. Was your prediction right?", when: "b = 70 and u = 2 and v = 8" }
```

Then turn the crossing line. Is $h$ always $180^\circ - b$? Which two rules make that true?

## Investigate: reasons for every step

```step
stage: investigate
insight: "Know, choose the rule, state the reason: each step links an angle you know to the next by a named rule. Kai's mistake links two angles that only look related."
tasks:
  - picture: { ref: lines.yml#given-b, caption: "Two parallel lines. $b = 70^\\circ$." }
    check:
      type: reasoning
      q: "Find $h$. Write each step with its reason."
      steps:
        - ["$f = 70^\\circ$", "corresponding to $b$: corresponding angles are equal"]
        - ["$h = 180^\\circ - 70^\\circ = 110^\\circ$", "$f$ and $h$ are on a straight line"]
      picks:
        - step: 1
          options: ["Corresponding angles are equal", "Alternate angles are equal", "Co-interior angles add to 180°"]
          answer: 0
          feedback: [null, "Alternate angles are between the lines. b is above the top line.", "b and f are not between the lines, and they are equal, not adding to 180°."]
      answer: "110"
      feedback:
        - ["70", "h is not in the same place as b. Find f first, then look at f and h."]
      explain: "f = 70° (corresponding to b), h = 110° (a straight line with f). Another route: d = 110° (a straight line with b), h = 110° (corresponding to d)."
  - check:
      type: bug
      code: "working.txt#kai"
      text: "Kai finds $e$ when $b = 70^\\circ$. Click the line where his reasoning goes wrong."
      answer: 2
      fault: logic
      misconception: assume-equal-angles
      explain: "Line 2: b and e are not a named pair (b is above the top line, e above the bottom line, on different sides). Looking related is not a reason. e = 110°: f = 70° (corresponding to b), then e = 180° − 70° (a straight line)."
  - picture: { ref: lines.yml#given-d, caption: "Two parallel lines. $d = 115^\\circ$." }
    check:
      type: reasoning
      q: "Find $g$. Write each step with its reason."
      steps:
        - ["$e = 115^\\circ$", "alternate to $d$: alternate angles are equal"]
        - ["$g = 180^\\circ - 115^\\circ = 65^\\circ$", "$e$ and $g$ are on a straight line"]
      picks:
        - step: 1
          options: ["Alternate angles are equal", "Corresponding angles are equal", "Co-interior angles add to 180°"]
          answer: 0
          feedback: [null, "d and e are not in the same place at each crossing.", "d and e are on opposite sides of the crossing line."]
      answer: "65"
      feedback:
        - ["115", "g is not alternate to d. Find e first."]
      explain: "e = 115° (alternate to d), g = 65° (a straight line with e). Or: f = 65° (co-interior with d), g = 65° (vertically opposite f)."
```

### Know, choose, say why

Here is the routine for every step: what you know, the rule that links it to a new angle, and the reason.

```worked
b = 70^\circ :: Know: the given angle.
f = 70^\circ :: Choose: $f$ is in the same place as $b$ at the other crossing. Say why: corresponding angles are equal.
h = 180^\circ - 70^\circ :: Choose: $h$ is next to $f$ on the bottom line. Say why: angles on a straight line add to $180^\circ$.
h = 110^\circ :: Done: two steps, two reasons.
```

Now find $h$ yourself. Write it your own way; the checker marks your answer and the reason for the first step, then shows you a model to compare.

### Find the mistake

Read Kai's reasoning one line at a time. Which step has no real rule behind it?

### Another chain

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a different starting angle, a different route, the reverse direction, then lines that are not parallel and showing lines are parallel from the angles."
try: { playground: board, starter: "lines.yml#converse", height: 560 }
tasks:
  - picture: { ref: lines.yml#given-a, caption: "Two parallel lines. $a = 130^\\circ$." }
    check:
      type: reasoning
      q: "Find $f$, with a reason for each step."
      steps:
        - ["$e = 130^\\circ$", "corresponding to $a$"]
        - ["$f = 180^\\circ - 130^\\circ = 50^\\circ$", "$e$ and $f$ are on a straight line"]
      picks:
        - step: 2
          options: ["Angles on a straight line add to 180°", "Co-interior angles add to 180°", "Vertically opposite angles are equal"]
          answer: 0
          feedback: [null, "e and f are at the same crossing, so they are not co-interior.", "e and f are next to each other, not opposite."]
      answer: "50"
      feedback:
        - ["130", "f is not in the same place as a."]
      explain: "e = 130° (corresponding to a), f = 50° (a straight line with e). Or b = 50° (a straight line with a), f = 50° (corresponding to b)."
  - picture: { ref: lines.yml#given-e, caption: "Two parallel lines. $e = 140^\\circ$." }
    check:
      type: reasoning
      q: "Find $b$, going up from the bottom line."
      steps:
        - ["$c = 180^\\circ - 140^\\circ = 40^\\circ$", "co-interior with $e$: co-interior angles add to $180^\\circ$"]
        - ["$b = 40^\\circ$", "vertically opposite $c$"]
      picks:
        - step: 1
          options: ["Co-interior angles add to 180°", "Alternate angles are equal", "Corresponding angles are equal"]
          answer: 0
          feedback: [null, "c and e are on the same side of the crossing line.", "c and e are not in the same place at each crossing."]
      answer: "40"
      feedback:
        - ["140", "b is not equal to e. Try c first: it is between the lines with e."]
      explain: "c = 40° (co-interior with e), b = 40° (vertically opposite c)."
  - picture: { ref: lines.yml#given-h, caption: "Two parallel lines. $h = 125^\\circ$." }
    check:
      type: answer
      q: "Find $c$. (Use your own steps; two are enough.)"
      answer: "55"
      feedback:
        - ["125", "c is not in the same place as h, and not alternate to it."]
      explain: "d = 125° (corresponding to h), then c = 55° (a straight line with d)."
  - picture: { ref: lines.yml#tilt-pic, caption: "$c = 60^\\circ$, $f = 45^\\circ$. No arrows on the lines." }
    check:
      type: question
      q: "Are these two lines parallel?"
      options: ["No: c and f are alternate angles, but they are not equal", "Yes: c and f are alternate angles", "You cannot tell from angles"]
      answer: 0
      feedback: [null, "Alternate angles are equal only when the lines are parallel. These are not equal.", "You can: if the lines were parallel, c and f would be equal."]
      explain: "If the lines were parallel, the alternate angles c and f would be equal. They are not, so the lines are not parallel."
  - starter: "lines.yml#converse"
    hint: ["Change w, the tilt of the lower line.", "Stop when c and f are equal."]
    check: { type: board, text: "Backwards: tilt the lower line until the alternate angles $c$ and $f$ are equal. What does that tell you about the lines?", when: "c = f", explain: "When alternate angles are equal, the lines are parallel (w = 0). Equal corresponding or alternate angles, or co-interior angles adding to 180°, show that lines are parallel." }
```

### A different start

Each task changes one thing. Your working is yours; the marked parts are the answer and one reason.

### Up from the bottom

### Your own route

### Not parallel

### Showing lines are parallel

## Practise: angle chains

```step
stage: practise
insight: "Two-step chains with each rule, mixed, with a reason named every time; the review keeps the pair names apart from vertically opposite angles."
tasks:
  - picture: { ref: lines.yml#given-g, caption: "Two parallel lines. $g = 75^\\circ$." }
    check:
      type: reasoning
      q: "Find $a$, with a reason for each step."
      steps:
        - ["$c = 75^\\circ$", "corresponding to $g$"]
        - ["$a = 180^\\circ - 75^\\circ = 105^\\circ$", "$a$ and $c$ are on a straight line"]
      answer: "105"
      feedback:
        - ["75", "a is not in the same place as g."]
      explain: "c = 75° (corresponding to g), a = 105° (a straight line with c)."
  - picture: { ref: lines.yml#given-c, caption: "Two parallel lines. $c = 80^\\circ$." }
    check:
      type: reasoning
      q: "Find $h$, with a reason for each step."
      steps:
        - ["$e = 180^\\circ - 80^\\circ = 100^\\circ$", "co-interior with $c$"]
        - ["$h = 100^\\circ$", "vertically opposite $e$"]
      picks:
        - step: 1
          options: ["Co-interior angles add to 180°", "Co-interior angles are equal", "Alternate angles are equal"]
          answer: 0
          feedback: [null, "Co-interior angles add to 180°: they are equal only when both are 90°.", "c and e are on the same side, so they are not alternate."]
      answer: "100"
      feedback:
        - ["80", "Check your first step: c and e are co-interior."]
      explain: "e = 100° (co-interior with c), h = 100° (vertically opposite e). Or g = 80° (corresponding to c), h = 100° (a straight line with g)."
  - picture: { ref: lines.yml#given-b, caption: "Two parallel lines. $b = 70^\\circ$." }
    check:
      type: question
      q: "Review: Tom says \"$b$ and $c$ are alternate angles\". Which is right?"
      options: ["They are vertically opposite: both at the top crossing", "Tom is right", "They are corresponding"]
      answer: 0
      feedback: [null, "Alternate angles are one at each crossing, between the lines.", "Corresponding angles are one at each crossing."]
      explain: "b and c are at the same crossing, opposite each other: vertically opposite (and equal for that reason)."
```

### Down the page

### Through the middle

### Review: one crossing

## Make: set it up

```step
stage: make
insight: "Working backwards from a target angle two steps away, then checking on the board, reverses the chain: reasoning first, the board only confirms."
try: { playground: board, starter: "lines.yml#make", height: 560 }
hint: ["h and f are on a straight line, so f = 180° − 125°.", "b is corresponding to f."]
check: { type: board, text: "Work out what $b$ must be for $h = 125^\\circ$. Then turn the crossing line until $b$ is that size: only $b$ is shown, and this ticks when $h = 125^\\circ$.", when: "h = 125", explain: "f = 55° (a straight line with h), so b = 55° (corresponding to f)." }
```

Write your two steps first, then turn the line.

Stretch: write your own two-step puzzle for a partner: give one angle, ask for one that is not a named pair with it, and write the model reasons.
