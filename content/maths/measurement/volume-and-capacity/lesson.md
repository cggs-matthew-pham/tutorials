---
order: 14
unit: volume
node: AC9M8M02 n1
title: Volume and capacity
summary: "Volume measures space in cubic units; capacity measures how much a container holds. 1 cm³ holds 1 mL, 1000 cm³ holds 1 L, and 1 m³ holds 1000 L. A cubic metre is 100 × 100 × 100 = 1 000 000 cm³, not 100."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A 1 L milk carton and a 10 cm cube hold exactly the same amount. A cubic metre of water is a tonne. Why do the units fit together so neatly?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8305
  url: http://127.0.0.1:8305/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: prism.yml#explain-pic, caption: "A 10 cm cube: 10 × 10 × 10 = 1000 cm³, which holds exactly 1 L." }
explainClip:
  query: { code: "@prism.yml#explain", fresh: 1, id: explain }
  caption: "A litre is a 10 cm cube"
  say: "Fill a ten centimetre cube, layer by layer."
  clip:
    - caption: { text: "A 10 cm by 10 cm base: each layer is 100 cm³, so 100 mL.", say: "Each layer is one hundred cubic centimetres: one hundred millilitres." }
    - wait: 1000
    - caption: { text: "Ten layers make 1000 cm³: exactly 1 litre.", say: "Ten layers make one thousand: exactly one litre." }
    - click: Make the height bigger
    - click: Make the height bigger
    - click: Make the height bigger
    - click: Make the height bigger
    - click: Make the height bigger
    - click: Make the height bigger
    - click: Make the height bigger
    - click: Make the height bigger
    - expect: { selector: "#gsum", contains: "1 L" }
    - wait: 1500
---
**Volume** is the space a solid takes up, in cubic units (cm³, m³). **Capacity** is how much a container holds, in millilitres (mL), litres (L) or kilolitres (kL). They link exactly:

| Volume | Capacity |
|---|---|
| 1 cm³ | 1 mL |
| 1000 cm³ (a 10 cm cube) | 1 L |
| 1 m³ | 1000 L = 1 kL |

A cubic metre is 100 cm × 100 cm × 100 cm = **1 000 000 cm³**: a length conversion is used three times, once for each direction.

## Predict: a 10 cm cube

```step
stage: predict
insight: "Committing to how much a 10 cm cube holds shows whether they link cm³ to mL, and the size of a litre."
check:
  type: predict
  q: "A box is 10 cm by 10 cm by 10 cm. How much water does it hold?"
  options: ["1 L", "100 mL", "10 L", "1000 L"]
  actual: "1 L. 10 × 10 × 10 = 1000 cm³, and each cm³ holds 1 mL: 1000 mL = 1 L."
```

How many cubic centimetres is it, and how many millilitres is that?

## Run: fill a box

```step
stage: run
insight: "Building boxes and reading their volume and capacity side by side shows cm³ and mL are the same number."
try: { playground: board, starter: "prism.yml#run", height: 600 }
check: { type: board, text: "Make a box that holds exactly 1 L. Was your prediction right? Could a box with different lengths also hold 1 L?", when: "v = 1000", explain: "10 × 10 × 10 = 1000 cm³. A 5 × 10 × 20 box (too long for this board) would hold 1 L too: any box of 1000 cm³ does." }
```

The panel gives the volume and the capacity together.

## Investigate: converting units

```step
stage: investigate
insight: "1 m³ = 1000 L; converting cubic units uses the length factor three times (Ravi uses it once); the unit should suit the context."
tasks:
  - check:
      type: number
      q: "How many litres does 1 m³ hold?"
      answer: 1000
      tolerance: 0
      explain: "1 m³ = 100 × 100 × 100 = 1 000 000 cm³ = 1 000 000 mL = 1000 L."
  - check:
      type: bug
      code: "working.txt#ravi"
      text: "Ravi works out how much a 2 m³ tank holds. Click the line where his working goes wrong."
      answer: 2
      fault: logic
      misconception: cube-conversion
      explain: "Line 2: a cubic metre is 100 cm in each of three directions: 100 × 100 × 100 = 1 000 000 cm³. The tank holds 2000 L."
  - check:
      type: question
      q: "Which unit suits the capacity of a backyard swimming pool?"
      options: ["Kilolitres (or cubic metres)", "Millilitres", "Cubic centimetres", "Litres, to the nearest millilitre"]
      answer: 0
      feedback: [null, "Millions of them: far too small a unit.", "Tens of millions: far too small.", "A pool cannot be measured that precisely."]
      explain: "A pool holds tens of kilolitres (tens of cubic metres)."
```

### Cubic metres

### Find the mistake

Read Ravi's working. How many cm are in each direction of a cubic metre?

### Choosing units

## Modify: tanks and cartons

```step
stage: modify
insight: "Building a tank in metres, converting both ways, and the difference between cm and cm³."
try: { playground: board, starter: "prism.yml#tank", height: 600 }
tasks:
  - starter: "prism.yml#tank"
    hint: ["24 000 L is 24 m³.", "Try a base of 4 m by 3 m."]
    check: { type: board, text: "Make a water tank that holds 24 000 L.", when: "c = 24000", explain: "24 000 L = 24 m³: for example 4 m × 3 m × 2 m." }
  - check:
      type: number
      q: "A jug holds 2.5 L. How many cm³ is that?"
      answer: 2500
      tolerance: 0
      explain: "1 L = 1000 cm³, so 2.5 L = 2500 cm³."
  - check:
      type: number
      q: "A cup holds 350 mL. How many cm³ is that?"
      answer: 350
      tolerance: 0
      explain: "1 mL = 1 cm³, so 350 cm³."
  - check:
      type: question
      q: "Which of these is a volume?"
      options: ["12 cm³", "12 cm", "12 cm²", "12 kg"]
      answer: 0
      feedback: [null, "A length.", "An area.", "A mass."]
      explain: "Volume is in cubic units: cm³."
```

### A tank

### Litres to cm³

### Millilitres to cm³

### Which is a volume?

## Practise: volume and capacity

```step
stage: practise
insight: "Conversions both ways and a box's capacity, mixed; using 100 instead of 1 000 000 for m³ is the planted slip; the triangular prism review keeps base times height fresh."
tasks:
  - check:
      type: number
      q: "Write 4500 mL in litres."
      answer: 4.5
      tolerance: 0
      explain: "4500 ÷ 1000 = 4.5 L."
  - check:
      type: number
      q: "A container holds 0.6 m³. How many litres is that?"
      answer: 600
      tolerance: 0
      explain: "0.6 × 1000 = 600 L."
  - check:
      type: number
      q: "A box is 20 cm by 15 cm by 10 cm. How many litres does it hold?"
      answer: 3
      tolerance: 0
      explain: "20 × 15 × 10 = 3000 cm³ = 3000 mL = 3 L."
  - check:
      type: number
      q: "Review: a triangular prism has a right-triangle end with legs 3 cm and 4 cm, and is 10 cm long. What is its volume in cm³?"
      answer: 60
      tolerance: 0
      explain: "Base area ½ × 3 × 4 = 6 cm², times 10 = 60 cm³."
```

### mL to L

### m³ to L

### A box

### Review: triangular prisms

## Make: a juice carton

```step
stage: make
insight: "Designing to a capacity with a constraint uses volume and capacity together."
try: { playground: board, starter: "prism.yml#carton", height: 600 }
hint: ["600 mL = 600 cm³.", "Try a base of 10 cm by 6 cm."]
check: { type: board, text: "Design a carton that holds 600 mL, with a base that is not square (l more than w).", when: "c = 600 and l > w", explain: "For example 10 × 6 × 10, or 12 × 5 × 10." }
```

Then say which of your designs would fit best in a lunch box, and why.
