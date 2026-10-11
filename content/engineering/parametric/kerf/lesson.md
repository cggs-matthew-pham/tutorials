---
order: 2
unit: param
optional: true
title: Laser cutting and kerf
summary: "A laser beam burns away a thin strip as it cuts: the kerf. So a cut slot comes out wider than drawn (by the kerf) and a cut-out part a little smaller. Draw slots narrower than the board for a snug press fit."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A laser cutter is accurate to a tenth of a millimetre, yet your flat-pack box falls apart without glue. Where did the fit go?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8527
  url: http://127.0.0.1:8527/index.html
  readySelector: ".fbsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "A slot drawn 2.9 mm, cut 3.1 mm with a 0.2 mm kerf: 3 mm board slides in snugly." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "The beam has a width"
  say: "The laser burns away a thin strip."
  clip:
    - caption: { text: "Drawn 3 mm, the slot is cut 3.2 mm wide: the kerf adds 0.2 mm.", say: "The cut is wider than the line." }
    - wait: 2000
    - caption: { text: "For a snug fit, draw the slot narrower than the board.", say: "Draw it smaller to make up for the kerf." }
    - wait: 1600
    - expect: { selector: "#gsum", contains: "clearance 0.2" }
---
**Kerf** is the width of material the beam burns away, typically 0.1–0.3 mm on a school laser. A slot is cut on both edges, so it comes out **kerf wider** than drawn. The same fit classes as printing apply: under 0 won't go in, 0–0.15 mm press fit, 0.15–0.4 mm sliding, more is loose.

## Predict: a 3 mm slot

```step
stage: predict
insight: "Committing to how a same-size slot fits tests the 'cut exactly on the line' picture."
check:
  type: predict
  q: "A slot is drawn 3 mm wide for 3 mm plywood. The laser's kerf is 0.2 mm. The plywood…"
  options: ["Slides in with a little play", "Fits perfectly tight", "Won't go in", "Falls straight through"]
  actual: "It slides in with play: the slot is cut 3.2 mm wide, 0.2 mm more than the board."
```

## Try: make it snug

```step
stage: run
insight: "Narrowing the drawn slot on the board settles the prediction and finds the press fit."
try: { playground: board, starter: "board.yml#run", height: 560 }
check: { type: board, text: "Draw the slot narrower until the plywood is a press fit (snug, no glue needed).", when: "f = 1", explain: "A slot drawn about 2.85–2.9 mm: cut 3.05–3.1 mm." }
```

## Worked example: allow for the kerf

```step
stage: investigate
insight: "Working the drawn slot back from the board, the kerf and the fit wanted models the move. Sam's 'exactly on the line' is planted after the method."
tasks:
  - check:
      type: answer
      q: "3 mm board, 0.2 mm kerf, 0.05 mm clearance wanted. Draw the slot (mm)?"
      answer: "2.85"
      feedback:
        - ["3.05", "That is the cut slot. The laser adds the kerf: take it off."]
      explain: "Cut slot = 3 + 0.05 = 3.05; drawn = 3.05 − 0.2 = 2.85 mm."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam's joints all wobble. Click the line where Sam's reasoning first goes wrong."
      answer: 2
      fault: logic
      misconception: cut-on-the-line
      explain: "Line 2: the beam has a width. It burns away about the kerf, so a 3 mm slot is cut wider than 3 mm."
```

### Back from the board

```worked
\text{cut slot} = \text{drawn} + \text{kerf} :: Both edges of the slot lose half the kerf.
\text{want: board} + 0.05 = 3.05 :: A press fit.
\text{drawn} = 3.05 - 0.2 = 2.85 :: Take off the kerf.
\text{measure your kerf} :: Cut a 10 mm square, measure it: it is about a kerf smaller.
```

### Find the mistake

## Vary: a finer beam

```step
stage: modify
insight: "A different kerf changes the drawn size for the same fit: measure your own cutter."
try: { playground: board, starter: "board.yml#vary", height: 560 }
check: { type: board, text: "This cutter's kerf is 0.1 mm. Find a press fit for the same 3 mm board.", when: "k = 0.1 and f = 1", explain: "Drawn about 2.9–3.0 mm: less to take off." }
```

## Cut a test comb

```step
stage: modify
tier: typical
insight: "A kerf test comb (slots stepping by 0.05 mm) gives the school cutter's real numbers."
check: { type: reflect, text: "With the teacher, we cut a test comb in our 3 mm sheet (slots 2.8 to 3.1 mm in 0.05 mm steps), found which slot was a press fit, and recorded our kerf." }
```

## Practise: kerf

```step
stage: practise
insight: "Kerf on slots and on parts."
tasks:
  - check:
      type: answer
      q: "A 50 mm square is cut with a 0.2 mm kerf. About how wide is the cut square (mm)?"
      answer: "49.8"
      feedback:
        - ["50.2", "The beam removes material from the part's edges: it comes out smaller."]
      explain: "Half the kerf off each edge: 50 − 0.2 = 49.8 mm."
  - check:
      type: question
      q: "Finger joints come out loose. What do you change?"
      options: ["Make the fingers wider and the gaps narrower by about the kerf", "Cut slower", "Use thicker sheet", "Glue them"]
      answer: 0
      feedback: [null, "Speed changes the burn, not the plan.", "Then nothing fits at all.", "That hides the problem."]
      explain: "Allow for the kerf in the drawing: wider fingers, narrower gaps."
```

### A square

### Finger joints

## Make: thicker board

```step
stage: make
insight: "A new board and kerf needs the whole calculation again."
try: { playground: board, starter: "board.yml#make", height: 560 }
hint: ["Cut slot = drawn + 0.25; you want 6.0 to 6.15.", "Drawn 5.75 to 5.9."]
check: { type: board, text: "6 mm MDF, kerf 0.25 mm. Find a press fit.", when: "f = 1", explain: "Drawn about 5.8–5.85 mm." }
```
