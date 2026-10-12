---
order: 3
unit: board
title: Design rules and ordering
summary: "A trace that carries a motor's current must be wider than one that carries a signal, or it heats up. Students set trace widths against current, meet a trace too wide to pass between pins, then work out what an order of boards costs."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The motor board works on the bench, then a trace turns brown and lifts off. Why that trace, and not the others?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8535
  url: http://127.0.0.1:8535/index.html
  readySelector: ".pcbsvg"
  layout: full
explainPicture: { ref: rules.yml#run, caption: "A motor driver: VM, GND and the motor lines carry 1.5 A; SIG carries a tiny signal." }
explainClip:
  query: { code: "@rules.yml#run", fresh: 1, id: explain }
  caption: "Width for current"
  say: "Every trace starts at the thinnest width, 0.25 millimetres."
  clip:
    - caption: { text: "Every trace starts 0.25 mm wide: fine for SIG, far too thin for 1.5 A.", say: "Thin traces are fine for signals." }
    - caption: { text: "A thin trace carrying a big current heats up, like a fuse.", say: "But a big current heats a thin trace." }
    - caption: { text: "Each net's current sets its width: 1.5 A needs 1 mm.", say: "So the current sets the width." }
    - wait: 1500
---
A trace is a strip of copper, so it has **resistance**: the more current through it, and the thinner it is, the hotter it gets. **Design rules** are the limits a board must meet before it is made: trace width for current, gaps between copper, hole sizes. The design tool checks them all (a **design rule check**, DRC).

This board drives a motor. **VM** brings the motor's power in from J1, **U1** switches it, and **MA** and **MB** go out to the motor on J2. **SIG** is the control signal from J3.

## Predict: which trace burns?

```step
stage: predict
insight: "Students think of all wires as the same. Committing to which trace overheats ties width to current before the table appears."
check:
  type: predict
  q: "Every trace is 0.25 mm wide. The motor draws 1.5 A. Which trace is most likely to overheat?"
  options: ["VM, the motor's power", "SIG, the control signal", "They all heat the same", "None: copper never overheats"]
  actual: "VM (and GND, MA, MB): they carry 1.5 A. SIG carries a few thousandths of an amp, so a thin trace is fine for it."
```

## Try: set the widths

```step
stage: run
insight: "Students use the table (in the board's note) to choose each width, and see SIG stay thin."
try: { playground: board, starter: "rules.yml#run", height: 600 }
tasks:
  - check: { type: board, text: "Set each net's width so every trace passes. Use the table under the board.", when: "n_fail = 0", explain: "1.5 A needs 1 mm (safe to 2.4 A); 0.5 mm only carries 1.4 A. SIG stays at 0.25 mm." }
  - check:
      type: question
      q: "Why not just make every trace 2 mm wide?"
      options: ["Wide traces take room: they can't pass between close pins, and the board grows", "2 mm traces carry less current", "Wide traces are not allowed", "There is no reason not to"]
      answer: 0
      feedback: [null, "Wider carries more, not less.", "They are allowed; they just take space.", "Space is the cost."]
      explain: "Width costs space. Use what the current needs, with some margin, and keep signals thin."
```

### Widths

### Why not wide?

## Worked example: width from current

```step
stage: investigate
insight: "The worked example reads the table with a margin, then checks the second rule: a trace between two header pins has only 0.4 mm of room."
tasks:
  - check:
      type: question
      q: "A heater trace carries 2.8 A. Which is the narrowest width that passes?"
      options: ["1.5 mm", "1 mm", "2 mm", "0.5 mm"]
      answer: 0
      shuffle: false
      feedback: [null, "1 mm is safe to 2.4 A, less than 2.8 A.", "It passes, but 1.5 mm is narrower and still safe (3.2 A).", "0.5 mm is safe only to 1.4 A."]
      explain: "1.5 mm is safe to 3.2 A, which is at least 2.8 A."
  - check:
      type: question
      q: "MA must carry 1.5 A, and its shortest path squeezes between two header pins (0.4 mm of room). What should the designer do?"
      options: ["Route MA around the header, at 1 mm wide", "Make MA 0.4 mm and squeeze it through", "Make MA 1 mm and squeeze it through anyway", "Lower the motor's current"]
      answer: 0
      feedback: [null, "0.4 mm carries less than 0.8 A: it would overheat.", "It would touch the pins: a short circuit.", "The motor's current is not the designer's to change."]
      explain: "Two rules meet: width for current, and room between pins. The longer route around satisfies both."
```

### Choose the width

```worked
\text{VM carries } 1.5 \text{ A} :: Find the current each net carries (the motor's datasheet gives it).
0.5 \text{ mm} \to 1.4 \text{ A} < 1.5 \;\times :: Too thin: it would run hot.
1 \text{ mm} \to 2.4 \text{ A} \ge 1.5 \;\checkmark :: The narrowest width that passes, with a margin.
\text{between header pins: } \le 0.4 \text{ mm} :: A second rule: the gap between pins leaves room for 0.4 mm only.
1 \text{ mm} > 0.4 \text{ mm} \Rightarrow \text{route around} :: A trace that needs 1 mm can't squeeze between pins, so it takes the long way.
```

### Two rules meet

## Vary: a squeeze

```step
stage: modify
insight: "Two rules in one board: students set widths and choose a path for the squeezed net."
try: { playground: board, starter: "rules.yml#vary", height: 620 }
check: { type: board, text: "In this version, MA's path squeezes between header pins. Make every trace pass: widths, and a path for MA.", when: "n_fail = 0 and w_ma >= 1", explain: "MA at 1 mm, routed around the header; SIG stays thin and can squeeze through." }
```


## Practise: rules and orders

```step
stage: practise
insight: "Width from the table, and the cost of an order: a fixed setup cost plus a cost per board."
tasks:
  - check:
      type: question
      q: "A trace carries 0.9 A. Which is the narrowest width that passes? (0.25 mm 0.8 A · 0.5 mm 1.4 A · 1 mm 2.4 A)"
      options: ["0.5 mm", "0.25 mm", "1 mm"]
      answer: 0
      shuffle: false
      explain: "0.25 mm is safe only to 0.8 A; 0.5 mm to 1.4 A."
  - check:
      type: answer
      q: "A board maker charges $20 to set up an order and $1.50 a board. What do 10 boards cost, in dollars?"
      answer: "35"
      explain: "20 + 10 × 1.50 = $35."
  - check:
      type: answer
      q: "Same prices: what does each board cost when you order 40, in dollars?"
      answer: "2"
      feedback:
        - ["80", "That is the whole order: 20 + 40 × 1.50 = 80. Divide by 40."]
      explain: "20 + 40 × 1.50 = $80, and 80 ÷ 40 = $2 a board. The setup cost is shared by more boards."
```

### Width

### An order

### Per board

## Make: ready to order

```step
stage: make
insight: "Students fix every rule on the board, then reason about the order: the full move from design to manufacture."
try: { playground: board, starter: "rules.yml#vary", height: 620 }
tasks:
  - check: { type: board, text: "Make every trace pass the design rules.", when: "n_fail = 0", explain: "Ready for the design rule check in a real tool, then the files the maker needs (Gerbers)." }
  - check:
      type: answer
      q: "Your class needs 24 boards. The maker charges $20 to set up and $1.50 a board. What is the cost per board, in dollars?"
      answer: "2.33"
      tolerance: 0.01
      explain: "20 + 24 × 1.50 = $56, and 56 ÷ 24 ≈ $2.33 a board."
  - check: { type: reflect, text: "In one or two sentences: which traces you widened and why, and one rule you would check before ordering that this board did not test." }
```

### Pass the rules

### Order

### Evaluate
