---
order: 1
unit: parallel
node: AC9M7M04 n1
title: Angles at parallel lines
summary: "A line crossing two parallel lines makes eight angles. Pairs in the same place at each crossing are corresponding; between the lines on opposite sides, alternate; between the lines on the same side, co-interior."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Railway tracks, the lines on a car park, the rungs of a ladder: parallel lines crossed by another line. The angles they make come in pairs."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8169
  url: http://127.0.0.1:8169/index.html
  readySelector: ".pangles"
  layout: full
explainPicture: { ref: lines.yml#explain-pic, caption: "$c$ and $f$ are alternate angles: between the parallel lines, on opposite sides of the crossing line. Both are $60^\\circ$." }
explainClip:
  query: { code: "@lines.yml#explain", fresh: 1, id: explain }
  caption: "The angle pairs at parallel lines"
  say: "A line crossing two parallel lines makes eight angles, in pairs."
  clip:
    - caption: { text: "Corresponding: c and g, the same place at each crossing.", say: "Corresponding angles are in the same place at each crossing." }
    - click: "Angle c, 60°"
    - click: "Angle g, 60°"
    - wait: 800
    - caption: { text: "Alternate: c and f, between the lines, on opposite sides.", say: "Alternate angles are between the lines, on opposite sides." }
    - click: "Angle g, 60°"
    - click: "Angle f, 60°"
    - wait: 800
    - caption: { text: "Co-interior: c and e, between the lines, on the same side.", say: "Co-interior angles are between the lines, on the same side." }
    - click: "Angle f, 60°"
    - click: "Angle e, 120°"
    - expect: { selector: "#gsum", contains: "co-interior" }
    - wait: 1200
---
Two lines are **parallel** when they go the same way and never meet, like railway tracks. Arrows (>>) on the lines mark them as parallel. A third line that crosses them is a **transversal**.

The crossings make eight angles, named $a$ to $h$ here. In this lesson you learn the names of the pairs and how to spot them in any diagram.

## Predict: turning the crossing line

```step
stage: predict
insight: "Committing to what happens to a and e (the same place at each crossing) as the line turns tests whether they see the two crossings as copies of each other."
check:
  type: predict
  q: "$a$ is above the top line, on the left of the crossing line. $e$ is in the same place at the bottom crossing. If you turn the crossing line, what happens to $a$ and $e$?"
  options:
    - "They stay the same size as each other"
    - "One grows while the other shrinks"
    - "Nothing links them: they change separately"
  actual: "They stay the same size as each other. The parallel lines cross the transversal the same way, so the bottom crossing is a copy of the top one, slid along. a and e are corresponding angles."
```

Picture the two crossings. Is one a copy of the other?

## Run: turn the crossing line

```step
stage: run
insight: "Turning the transversal with a and e picked shows that the same place at each crossing gives the same size, whatever the angle."
try: { playground: board, starter: "lines.yml#run", height: 560 }
check: { type: board, text: "$a$ and $e$ are picked. Turn the crossing line ($t$) to $120^\\circ$ and watch both. Was your prediction right?", when: "t = 120 and r = 1" }
```

$t$ is the angle the crossing line makes with the parallel lines. Turn it both ways. You can pick other angles too: click them, or use the letters.

## Investigate: the three pairs

```step
stage: investigate
insight: "Corresponding (same place), alternate (between, opposite sides) and co-interior (between, same side) each take one angle from each crossing. Mia's mistake names a pair at one crossing, which is vertically opposite."
try: { playground: board, starter: "lines.yml#pick-a", height: 560 }
tasks:
  - starter: "lines.yml#pick-a"
    hint: ["Alternate angles are between the parallel lines.", "One on each side of the crossing line: c and f, or d and e."]
    check: { type: board, text: "This board does not name the pairs. Pick two alternate angles.", when: "r = 2", explain: "c and f, or d and e: between the lines, on opposite sides of the crossing line." }
  - check:
      type: bug
      code: "working.txt#mia"
      text: "Mia names a pair of angles. Click the line where her reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: vertically-opposite-pair
      explain: "Line 3: b and c are at the same crossing, opposite each other, so they are vertically opposite. Alternate angles are one at each crossing, between the parallel lines. (Vertically opposite angles are equal too, so line 4's b = c is true, for a different reason.)"
  - picture: { ref: lines.yml#letters, caption: "Two parallel lines crossed by a transversal, with the angles $a$ to $h$." }
    check:
      type: question
      q: "Which pair is co-interior?"
      options: ["$c$ and $e$", "$c$ and $f$", "$c$ and $g$", "$b$ and $c$"]
      answer: 0
      feedback: [null, "Those are on opposite sides: alternate.", "Those are in the same place at each crossing: corresponding.", "Those are at one crossing: vertically opposite."]
      explain: "c and e are both between the lines and both on the left of the crossing line: co-interior."
```

### Pick a pair

Here are the pairs. Each takes one angle from each crossing.

```worked
\text{corresponding: } a \text{ and } e :: The same place at each crossing: both above their line, on the left. (An F shape.)
\text{alternate: } c \text{ and } f :: Between the parallel lines, on opposite sides of the crossing line. (A Z shape.)
\text{co-interior: } c \text{ and } e :: Between the parallel lines, on the same side. (A C shape.)
\text{vertically opposite: } b \text{ and } c :: At one crossing, opposite each other. Not a parallel-lines pair: both are at the same crossing.
```

Then pick two alternate angles on the board.

### Find the mistake

Read Mia's reasoning one line at a time. Where are b and c?

### Co-interior

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: the crossing line leaning the other way (corresponding, co-interior, then vertically opposite to keep it apart), lines that are not parallel, then the edge case of a right angle."
try: { playground: board, starter: "lines.yml#pick-b", height: 560 }
tasks:
  - starter: "lines.yml#pick-b"
    hint: "The same place at each crossing: above the line and left, at the top and at the bottom."
    check: { type: board, text: "The crossing line leans the other way now. Pick two corresponding angles.", when: "r = 1", explain: "a and e, b and f, c and g, or d and h." }
  - starter: "lines.yml#pick-b"
    hint: "Between the lines, on the same side of the crossing line."
    check: { type: board, text: "Pick two co-interior angles.", when: "r = 3", explain: "c and e, or d and f." }
  - starter: "lines.yml#pick-b"
    hint: "Both at one crossing, opposite each other."
    check: { type: board, text: "Pick two vertically opposite angles.", when: "r = 4", explain: "a and d, b and c, e and h, or f and g: at one crossing, opposite each other." }
  - starter: "lines.yml#tilt"
    hint: "Move w back to 0, then away again. Watch c and f."
    check:
      type: question
      q: "The lower line is tilted by $w$, so the lines are not parallel. Are $c$ and $f$ still alternate angles?"
      options: ["Yes: they are in alternate places, but they need not be equal", "No: alternate angles need parallel lines", "Yes, and they are still equal"]
      answer: 0
      feedback: [null, "The name is about where the angles are. What parallel lines add is that they are equal.", "Look at the sizes: with w = 15°, c is 60° and f is 45°."]
      explain: "The names say where the angles are. Only when the lines are parallel are alternate (and corresponding) angles equal, and co-interior angles add to 180°."
  - starter: "lines.yml#turn"
    hint: "What angle does a crossing line make when it is square to the lines?"
    check: { type: board, text: "Edge case: turn the crossing line until all eight angles are the same size.", when: "t = 90", explain: "At t = 90° the crossing line is perpendicular to the parallel lines: all eight angles are right angles." }
```

### Corresponding

Each task changes one thing. This board does not name the pairs, so the check tells you.

### Co-interior

### Vertically opposite

### Not parallel

### A right angle

## Practise: name the pair

```step
stage: practise
insight: "Naming pairs from a fixed diagram, mixed, with vertically opposite as the planted mix-up; the review keeps angles on a straight line fresh."
tasks:
  - picture: { ref: lines.yml#letters, caption: "The angles $a$ to $h$." }
    check:
      type: question
      q: "$d$ and $e$ are"
      options: ["alternate", "corresponding", "co-interior", "vertically opposite"]
      answer: 0
      feedback: [null, "Are they in the same place at each crossing?", "Are they on the same side of the crossing line?", "They are at different crossings."]
      explain: "Between the lines, on opposite sides: alternate."
  - picture: { ref: lines.yml#letters, caption: "The angles $a$ to $h$." }
    check:
      type: question
      q: "$b$ and $f$ are"
      options: ["corresponding", "alternate", "co-interior", "vertically opposite"]
      answer: 0
      feedback: [null, "b is above the top line, not between the lines.", "b is above the top line, not between the lines.", "They are at different crossings."]
      explain: "Both above their line, on the right: the same place at each crossing, so corresponding."
  - picture: { ref: lines.yml#letters, caption: "The angles $a$ to $h$." }
    check:
      type: question
      q: "$a$ and $d$ are"
      options: ["vertically opposite", "alternate", "corresponding", "co-interior"]
      answer: 0
      feedback: [null, "Both are at the top crossing.", "Both are at the top crossing.", "Both are at the top crossing."]
      explain: "At one crossing, opposite each other: vertically opposite."
  - check:
      type: answer
      q: "Review: $a$ and $b$ are on a straight line. $a = 115^\\circ$. What is $b$?"
      answer: "65"
      feedback:
        - ["115", "a and b are not equal: they make a straight line together."]
        - ["245", "Angles on a straight line add to 180°, not 360°."]
      explain: "Angles on a straight line add to 180°: 180 − 115 = 65°."
```

### Name it

Use the picture: same place, between and opposite, between and same side, or one crossing?

### Name it again

### One crossing

### Review: a straight line

## Make: a pair that adds to 180°

```step
stage: make
insight: "Finding a pair between the lines that adds to 180° reverses the lesson: from what the angles do back to where they are."
try: { playground: board, starter: "lines.yml#make", height: 560 }
hint: ["Look only between the parallel lines: c, d, e and f.", "Which two of those add to 180°? Check with the sizes."]
check: { type: board, text: "Pick two angles between the parallel lines, at different crossings, that add to $180^\\circ$.", when: "u >= 3 and u <= 4 and v >= 5 and v <= 6 and s = 180", explain: "c and e, or d and f: co-interior angles. (At t = 90° the alternate pairs c and f, d and e add to 180° too, but co-interior pairs always do.)" }
```

Find a pair, then turn the crossing line. Do they still add to $180^\circ$?

Stretch: which pairs add to $180^\circ$ but are not between the lines?
