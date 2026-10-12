---
order: 2
unit: frames
title: Triangles hold their shape
summary: "A square frame on pins folds flat when pushed sideways; a triangle can't change shape without a member stretching. Students brace frames with diagonals, use the counting rule (members = 2 × joints − 3) to find how many they need, and brace a tower with the fewest members."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Why are bridges, cranes and towers full of triangles, and not squares?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8537
  url: http://127.0.0.1:8537/index.html
  readySelector: ".trsvg"
  layout: full
explainPicture: { ref: triangles.yml#explain, caption: "One diagonal turns a square into two triangles, and the frame holds its shape." }
explainClip:
  query: { code: "@triangles.yml#explain", fresh: 1, id: explain }
  caption: "One brace"
  say: "The wind pushes the top corner sideways."
  clip:
    - caption: { text: "A square frame on pins, pushed sideways at D.", say: "A square on pins would fold over." }
    - caption: { text: "The diagonal A-C splits it into two triangles.", say: "One diagonal makes two triangles." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(1)" }
    - wait: 600
    - caption: { text: "Now it holds: the diagonal pulls, two sides push.", say: "Now the frame holds its shape." }
    - wait: 1200
---
A frame on **pins** can only stay in shape if its members stop the joints moving. A **triangle** can't change shape unless a side changes length. A **square** can: it leans over into a diamond, with every side the same length.

Engineers **brace** frames with **diagonals** that turn them into triangles. Here a square frame stands on a pin (A) and a roller (B); a **500 N** sideways push (the wind) acts at D.

## Predict: the square

```step
stage: predict
insight: "Students trust a square of strong members. Committing first makes the collapse memorable: strength isn't the issue, shape is."
check:
  type: predict
  q: "Each member of the square can take 5000 N. The wind pushes 500 N sideways at D. The frame…"
  options: ["Folds over: it changes shape without any member stretching", "Holds easily: 500 N is small", "Breaks one member", "Slides off the roller"]
  actual: "It folds over. The members are strong enough, but a square on pins can lean without any member changing length, so nothing resists."
```

## Try: brace it

```step
stage: run
insight: "Watching the square collapse, then adding one diagonal and seeing it hold, makes triangulation concrete."
try: { playground: board, starter: "triangles.yml#run", height: 540 }
tasks:
  - check: { type: board, text: "Press Test it.", when: "stable = 0 and tested = 1", explain: "It collapses: nothing stops it leaning." }
  - check: { type: board, text: "Add one diagonal (click A then C, or B then D), then test it again.", when: "stable = 1 and tested = 1 and n_m = 5", explain: "It holds: two triangles can't change shape." }
  - check:
      type: question
      q: "Does it matter which diagonal you added?"
      options: ["No: either makes triangles; one pulls, the other would push", "Yes: only A-C works", "Yes: only B-D works", "You need both"]
      answer: 0
      feedback: [null, "Try B-D: it works too.", "Try A-C: it works too.", "One is enough; the second is spare."]
      explain: "Either diagonal makes two triangles. With the wind from the left, A-C is stretched (pulls) while B-D would be squashed (pushes)."
```

### Test the square

### Add a diagonal

### Which diagonal?

## Worked example: count the members

```step
stage: investigate
insight: "The counting rule (for a flat frame on a pin and a roller) gives the number of members a frame needs to be rigid with none spare. Zoe adds 3 instead of taking it away, planted after the method."
tasks:
  - check:
      type: answer
      q: "A frame has 8 joints, on a pin and a roller. How many members does it need to be rigid with none spare?"
      answer: "13"
      feedback:
        - ["19", "Take 3 away: 2 × 8 − 3."]
        - ["16", "That is 2 × 8. Take away 3."]
      explain: "2 × 8 − 3 = 13."
  - check:
      type: bug
      code: "working.txt#zoe"
      text: "Zoe thinks she needs 15 members. Click the line where her working first goes wrong."
      answer: 3
      fault: logic
      misconception: truss-count-add
      explain: "Line 3: members + 3 = 2 × joints, so members = 2 × 6 − 3 = 9. She added 3 instead of taking it away."
```

### The rule

```worked
\text{joints } j = 4,\; \text{members } m = 4 :: The square: 4 joints, 4 members.
m + 3 = 2j :: Each joint gives 2 ways to move (sideways and up); the pin and roller hold 3 of them. Each member holds one.
4 + 3 = 7 \ne 8 :: One short: the square can move one way (it leans).
5 + 3 = 8 = 2 \times 4 \;\checkmark :: Add one diagonal: rigid, with none spare.
```

### Find the mistake

## Vary: a taller tower

```step
stage: modify
insight: "The rule predicts the number before students build: two panels, two diagonals."
try: { playground: board, starter: "triangles.yml#vary", height: 600 }
tasks:
  - hint: ["Count: 6 joints, so 2 × 6 − 3 = 9 members. You have 7.", "One diagonal in each square."]
    check: { type: board, text: "Brace the two-storey tower with as few members as you can, so it holds when you test it.", when: "stable = 1 and n_m = 9 and tested = 1", explain: "Two diagonals, one per panel: 9 members, as the rule says." }
  - check:
      type: question
      q: "What happens if you add both diagonals to one square?"
      options: ["It still holds, with a spare member that shares the load and costs more", "It collapses", "The rule breaks and nothing can be worked out", "It gets weaker"]
      answer: 0
      feedback: [null, "A spare member can't make it collapse.", "Real structures often have spare members; the board still works them out.", "It can only help, at a cost."]
      explain: "A spare (redundant) member isn't needed for the shape, but it shares the load and keeps the frame standing if another member fails."
```

### Two storeys

### Both diagonals

## Practise: rigid or not?

```step
stage: practise
insight: "The rule both ways, and real braced structures."
tasks:
  - check:
      type: answer
      q: "A crane arm has 10 joints, on a pin and a roller. How many members does it need?"
      answer: "17"
      explain: "2 × 10 − 3 = 17."
  - check:
      type: question
      q: "A frame has 7 joints and 10 members, on a pin and a roller. Is it rigid?"
      options: ["No: it needs 11", "Yes", "It has a spare member"]
      answer: 0
      shuffle: false
      explain: "2 × 7 − 3 = 11, so with 10 it can change shape one way."
  - check:
      type: question
      q: "A wooden gate sags at the corner away from its hinges. What should you add?"
      options: ["A diagonal brace across the gate", "Thicker rails", "A third hinge on the same side", "Paint"]
      answer: 0
      feedback: [null, "Thicker rails still make a square that can lean.", "The gate still leans between them.", "Not structural."]
      explain: "A diagonal turns the gate's rectangle into triangles, so it can't lean."
```

### A crane arm

### Rigid?

### A gate

## Make: brace a tower

```step
stage: make
insight: "Three storeys: students use the rule to plan, then build with the fewest members."
try: { playground: board, starter: "triangles.yml#make", height: 640 }
tasks:
  - check: { type: board, text: "Brace the three-storey tower with as few members as you can, so it holds when you test it.", when: "stable = 1 and n_m = 13 and tested = 1", explain: "8 joints: 2 × 8 − 3 = 13 members. One diagonal per panel." }
  - check: { type: reflect, text: "In one or two sentences: how you knew how many members to add, and where you put them." }
```

### Three storeys

### Evaluate
