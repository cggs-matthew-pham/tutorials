---
order: 2
unit: board
title: Route the traces
summary: "Routing turns every ratsnest line into copper. Two traces of different nets can never touch, so where they must cross, one goes round or drops to the other side of the board. Students route the shield on one layer, then on two, and compare the copper."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Two wires on a breadboard can cross in the air. Two copper traces that touch are a short circuit. How does GND get past OUT?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8534
  url: http://127.0.0.1:8534/index.html
  readySelector: ".pcbsvg"
  layout: full
explainPicture: { ref: route.yml#explain, caption: "Top copper in orange, bottom copper in blue: GND passes under OUT on the other side of the board." }
explainClip:
  query: { code: "@route.yml#explain", fresh: 1, id: explain }
  caption: "Two sides of copper"
  say: "Orange copper is on the top of the board; blue is on the bottom."
  clip:
    - caption: { text: "Every net is joined. Orange traces are on top, blue on the bottom.", say: "Every net is joined." }
    - caption: { text: "GND runs on the bottom, so it can pass under OUT without touching it.", say: "The ground trace passes underneath." }
    - caption: { text: "The pads go right through the board, so the bottom trace reaches them too.", say: "The pads go right through the board." }
    - wait: 1500
---
**Routing** draws copper along each ratsnest line. Click a pad to start a trace, then click one cell at a time to the next pad of the same net. The board refuses a step that would touch another net: that would be a **short circuit**.

Most boards have copper on **two layers**: the top and the bottom. The pads of these parts go right through the board, so a trace on either side can reach them. A **via** is a small plated hole that takes a trace from one side to the other.

## Predict: crossing

```step
stage: predict
insight: "Students know wires can cross; copper can't. Committing to a plan for a crossing sets up the two answers routing gives: go round, or go under."
check:
  type: predict
  q: "GND must get from J1 to R2 and D1, but the OUT trace is in the way. On a board with copper on one side only, what can you do?"
  options: ["Take GND the long way round the other parts", "Let GND cross OUT: copper is insulated", "Join GND and OUT where they cross", "Leave GND unjoined"]
  actual: "Go round. Copper traces are bare metal, so touching joins them. With two layers there is a second answer: go under, on the bottom."
```

## Try: route on the top

```step
stage: run
insight: "Routing a simple net shows the mechanics; routing GND on the top only shows the cost of a crossing: a long detour."
try: { playground: board, starter: "route.yml#run", height: 520 }
tasks:
  - check: { type: board, text: "Route VCC: click J1's top pad, then step to S1's left pad.", when: "routed >= 1", explain: "One net done: its thin ratsnest line has gone." }
  - check: { type: board, text: "Route OUT (J1's third pad to R1's left pad), then try to route GND (J1's bottom pad) towards R2 on the top layer.", when: "routed >= 2", explain: "OUT blocks the direct way: GND must go round, or change layer." }
  - check:
      type: question
      q: "What happened when GND's trace reached OUT's copper?"
      options: ["The board refused: it would be a short circuit", "The two traces joined", "GND jumped over OUT", "Nothing: copper can overlap"]
      answer: 0
      explain: "Touching copper joins nets. Here that would short GND to OUT."
```

### VCC

### OUT, then GND

### What happened?

## Worked example: round or under?

```step
stage: investigate
insight: "The worked example compares the two answers by copper length and by layers. The tasks turn cells into millimetres and say when a via is needed."
tasks:
  - check:
      type: answer
      q: "A detour adds 9 cells of copper. How many extra mm is that, to 1 decimal place?"
      answer: "22.9"
      tolerance: 0.05
      explain: "9 × 2.54 = 22.86 ≈ 22.9 mm."
  - check:
      type: question
      q: "A trace on the bottom must end at a surface-mount pad, which is only on the top. What does it need?"
      options: ["A via near the pad, to come up to the top", "Nothing: copper reaches both sides", "A wider trace", "A second pad"]
      answer: 0
      feedback: [null, "Only through-hole pads go through the board.", "Width doesn't change the side.", "A via is the hole that does this job."]
      explain: "Through-hole pads go through both layers. Surface-mount pads sit on one side, so a trace on the other side needs a via."
```

### Two ways past OUT

```worked
\text{Round (one layer):} :: GND goes down J1's side, along the bottom edge, and back up to D1 and R2.
\approx 47 \text{ cells} \times 2.54 \approx 119 \text{ mm of copper} :: Long, but the board needs copper on one side only, which is cheaper.
\text{Under (two layers):} :: GND drops to the bottom layer at J1's pad and runs straight under OUT.
\approx 37 \text{ cells} \times 2.54 \approx 94 \text{ mm} :: Shorter and tidier; two-layer boards are standard and cost only a little more.
```

### When you need a via

## Vary: one side only

```step
stage: modify
insight: "Routing everything on one layer forces the detours, and makes the value of a second layer obvious."
try: { playground: board, starter: "route.yml#run", height: 520 }
hint: ["Route the short nets first: VCC, LEDA, OUT.", "IN can finish at S1's pad, then start again from it to reach R2.", "GND can run down J1's side, along the bottom row and up the right."]
check: { type: board, text: "Route every net on the top layer only.", when: "done = 1 and bot_mm = 0", explain: "Possible, with a long way round for GND: about 119 mm of copper." }
```


## Practise: routing

```step
stage: practise
insight: "What a short is, what a via does, and measuring copper."
tasks:
  - check:
      type: question
      q: "Two traces of different nets touch. What is it called?"
      options: ["A short circuit", "A via", "A net", "A ratsnest"]
      answer: 0
      explain: "Touching copper joins nets: a short circuit."
  - check:
      type: question
      q: "What is a via?"
      options: ["A plated hole that takes a trace from one layer to the other", "A gap between two parts", "A thin ratsnest line", "A pad for a connector"]
      answer: 0
      explain: "A via joins copper on the top to copper on the bottom."
  - check:
      type: answer
      q: "A board's traces are 52 cells long in all. How much copper is that, in mm, to the nearest mm?"
      answer: "132"
      tolerance: 0.5
      explain: "52 × 2.54 = 132.08 ≈ 132 mm."
```

### Short

### Via

### Copper

## Make: route it short

```step
stage: make
insight: "With both layers allowed, students aim for the shortest copper: the two answers to a crossing, chosen net by net."
try: { playground: board, starter: "route.yml#run", height: 520 }
tasks:
  - hint: ["Switch to bottom layer before you start GND.", "Keep each trace as straight as the parts allow.", "Undo removes the last step if a trace wanders."]
    check: { type: board, text: "Route every net, using both layers, with 100 mm of copper or less.", when: "done = 1 and len_mm <= 100", explain: "GND under OUT on the bottom saves the long way round." }
  - check: { type: reflect, text: "In one or two sentences: which net you put on the bottom and why, and how your copper compared with the one-layer board." }
```

### Short copper

### Evaluate
