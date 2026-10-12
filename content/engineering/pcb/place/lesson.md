---
order: 1
unit: board
title: Place the parts
summary: "A printed circuit board starts as parts on a grid and a list of nets: pads that must end up joined. Thin ratsnest lines show the joins still to make. Students find nets, then move and turn parts so the joins are short and the connector sits at the edge."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Your breadboard circuit works. To make it a real board, every wire becomes copper, and the first decision is where each part goes."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8533
  url: http://127.0.0.1:8533/index.html
  readySelector: ".pcbsvg"
  layout: full
explainPicture: { ref: place.yml#explain, caption: "Parts placed in the order the signal flows: the ratsnest lines are short and hardly cross." }
explainClip:
  query: { code: "@place.yml#explain", fresh: 1, id: explain }
  caption: "Nets and the ratsnest"
  say: "Each dotted line is a join the copper must make."
  clip:
    - caption: { text: "Gold pads, grey outlines: the parts. Dotted lines: joins still to make (the ratsnest).", say: "The dotted lines are the ratsnest." }
    - caption: { text: "Clicking a pad lights its net: every pad that must be joined to it.", say: "Click a pad to light up its net." }
    - caption: { text: "Parts placed in the order the signal flows keep the lines short, so the copper will be too.", say: "Short lines now mean short copper later." }
    - wait: 1200
---
On a breadboard, wires go wherever you push them. On a **printed circuit board** (PCB), the wires are strips of copper called **traces**, printed onto the board. Before any copper, a designer **places** the parts.

The circuit is a button and an LED on a small shield. **J1** is the connector to the micro:bit or Arduino: VCC (power), IN (the button), OUT (the LED) and GND. A **net** is a set of pads that must end up joined. The thin **ratsnest** lines show the joins still to make. One grid step is **2.54 mm**, the gap between pins on most parts.

## Predict: where to put the parts

```step
stage: predict
insight: "Placement decides most of how hard routing will be. Committing first makes the point land: short, uncrossed ratsnest lines now mean short, easy copper later."
check:
  type: predict
  q: "Which placement will be easiest to join up with copper?"
  options: ["Parts that share nets close together, in the order the signal flows", "Parts spread out evenly, with space all round", "Parts in alphabetical order", "It makes no difference: the copper can go anywhere"]
  actual: "Close together, in signal order. Every ratsnest line becomes copper, and crossing lines become traces that must find a way round each other."
```

## Try: nets and moves

```step
stage: run
insight: "Clicking pads shows what a net is; moving one part and watching the total ratsnest drop shows what placement is for."
try: { playground: board, starter: "place.yml#run", height: 560 }
tasks:
  - check: { type: board, text: "Click any pad on the GND net (J1's bottom pin is one). Which pads light up?", when: "sel_k = 5", explain: "GND joins J1.4, R2 and D1: three pads that must end up joined." }
  - check:
      type: number
      q: "How many pads are on the GND net?"
      answer: 3
      explain: "J1.4, R2.2 and D1.2."
  - check: { type: board, text: "Click D1 to select it, then click an empty cell close to R1 to move it there. Watch the ratsnest total.", when: "moves >= 1 and rat_mm < 201", explain: "D1 shares a net with R1 (LEDA): closer together, a shorter line." }
```

### A net

### Count the pads

### Move a part

## Worked example: read the board

```step
stage: investigate
insight: "The facts line is the designer's checklist: ratsnest length, parts on the board, a gap between parts, connectors at the edge. Converting cells to millimetres keeps the grid honest."
tasks:
  - check:
      type: answer
      q: "A ratsnest line runs 10 cells straight across. How long is it, in mm?"
      answer: "25.4"
      feedback:
        - ["10", "That is in grid cells. One cell is 2.54 mm."]
      explain: "10 × 2.54 = 25.4 mm."
  - check:
      type: question
      q: "Why must J1 sit at the edge of the board?"
      options: ["A cable or a micro:bit plugs into it, so it must be reachable", "Connectors are the heaviest part", "The design rules forbid connectors in the middle", "So its ratsnest lines are longer"]
      answer: 0
      feedback: [null, "Weight is not the reason.", "It is a design choice for the user, not a rule of the copper.", "Longer lines are worse, not better."]
      explain: "Connectors, switches and LEDs go where people need them: at the edge, or facing out. Then the rest is placed around them."
```

### Placement, step by step

```worked
\text{1. Fix the connectors:} :: J1 goes at the edge, where a cable can reach it. Mark it fixed.
\text{2. Follow the signal:} :: Place parts in the order the signal flows: J1, then the button and its resistor, then R1 and the LED.
\text{3. Keep nets close:} :: A part with many nets (like GND) goes near the middle of the pads it joins.
\text{4. Leave a gap:} :: At least one cell between parts, so copper can pass and the parts can be soldered.
\text{5. Check the numbers:} :: Total ratsnest down, nothing off the board, nothing touching.
```

### Why the edge?

## Vary: meet the brief

```step
stage: modify
insight: "A target turns placement into a design problem with a measure: students move and turn parts until the board meets every criterion."
try: { playground: board, starter: "place.yml#vary", height: 600 }
hint: ["Bring S1 and R2 near J1's top pins: they share VCC and IN with it.", "Turn R2 upright (Rotate) so its ends reach IN and GND.", "Put R1 and D1 together near J1's OUT and GND pins."]
check: { type: board, text: "Get the total ratsnest to 100 mm or less, with every part on the board, none touching, and J1 at the edge.", when: "p = 1", explain: "Short joins, a gap between parts, J1 at the edge: the board is ready to route." }
```


## Practise: placement

```step
stage: practise
insight: "Millimetres from cells, why parts need a gap, and what a net is."
tasks:
  - check:
      type: answer
      q: "Two pads are 4 cells apart. How far apart are they, in mm?"
      answer: "10.16"
      tolerance: 0.01
      explain: "4 × 2.54 = 10.16 mm."
  - check:
      type: question
      q: "Three pads are on the same net. How many joins does the ratsnest need?"
      options: ["2", "3", "1", "6"]
      answer: 0
      shuffle: false
      explain: "Joining three things in a chain takes two links: the ratsnest uses the shortest two."
  - check:
      type: question
      q: "Why leave at least one empty cell between parts?"
      options: ["So traces can pass between them and the parts can be soldered", "To make the board bigger", "Because pads repel each other", "The ratsnest needs space to draw"]
      answer: 0
      feedback: [null, "Bigger boards cost more; space is for copper and soldering.", "They don't.", "The ratsnest is only a drawing."]
      explain: "Copper runs between parts, and a soldering iron needs room."
```

### Millimetres

### Joins

### Gaps

## Make: a smaller board

```step
stage: make
insight: "A smaller board forces real trade-offs: every part must still fit, with gaps, and the ratsnest must be shorter still."
try: { playground: board, starter: "place.yml#make", height: 560 }
tasks:
  - hint: ["Start with the parts that share the most nets with J1.", "Turn the resistors upright to save width.", "Check the facts line after every move."]
    check: { type: board, text: "On a board 12 × 8 cells (about 30 × 20 mm), get the ratsnest to 70 mm or less, with every part on the board, none touching, and J1 at the edge.", when: "p = 1", explain: "A small, tidy layout: cheaper to make, and easy to route." }
  - check: { type: reflect, text: "In one or two sentences: which part you placed first and why, and which move made the biggest difference." }
```

### A small board

### Evaluate
