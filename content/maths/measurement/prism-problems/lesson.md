---
order: 15
unit: volume
node: AC9M8M02 n2
uses: [AC9M8M02 n1]
title: Prism problems
summary: "The volume of any right prism is the area of its end (the cross-section) times its length: V = Ah. Work backwards to find a missing length: divide the volume by the area of the end. Give the answer in the units the problem needs."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A farmer needs a water trough that holds 500 L, a builder orders concrete in cubic metres, a pool needs filling. Each is a prism problem, often run backwards."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8306
  url: http://127.0.0.1:8306/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: prism.yml#explain-pic, caption: "A triangular prism: the end is ½ × 4 × 3 = 6 cm², so 5 layers make 30 cm³." }
explainClip:
  query: { code: "@prism.yml#explain", fresh: 1, id: explain }
  caption: "End area times length"
  say: "Any prism: the area of the end, times the length."
  clip:
    - caption: { text: "The end is a triangle: half of 4 by 3, so 6 cm².", say: "The end is a triangle, six square centimetres." }
    - wait: 900
    - caption: { text: "Each extra centimetre adds another 6 cm³.", say: "Each extra centimetre adds another six." }
    - click: Make the height bigger
    - click: Make the height bigger
    - click: Make the height bigger
    - click: Make the height bigger
    - expect: { selector: "#gsum", contains: "= 30" }
    - wait: 1500
---
A **right prism** has the same cross-section (its end, or base) all the way along. For every right prism,

$$V = A \times h$$

where $A$ is the area of the end and $h$ is the length (or height) of the prism. Find $A$ with the right area formula for the end: a rectangle, a triangle, or a composite shape.

To find a missing length, work backwards: $h = V \div A$. Convert units before you start, so every length is in the same unit.

## Predict: how deep?

```step
stage: predict
insight: "Committing to a depth from a capacity shows whether they convert litres to cubic metres and divide by the base area."
check:
  type: predict
  q: "A tank has a base 4 m by 3 m and holds 36 000 L when full. How deep is it?"
  options: ["3 m", "3000 m", "12 m", "0.3 m"]
  actual: "3 m. 36 000 L = 36 m³. The base is 4 × 3 = 12 m², so the depth is 36 ÷ 12 = 3 m."
```

Change the litres to cubic metres first.

## Run: build the tank

```step
stage: run
insight: "Building a tank to a capacity shows the depth that a base of 12 m² needs."
try: { playground: board, starter: "prism.yml#run", height: 600 }
check: { type: board, text: "Build the 4 m by 3 m tank that holds 36 000 L. Was your prediction right?", when: "l = 4 and w = 3 and c = 36000", explain: "36 000 L = 36 m³ = 12 m² × 3 m." }
```

## Investigate: the end, then the length

```step
stage: investigate
insight: "Any prism is end area times length (Mia uses l × w × h on a triangle); only the end's own measurements count."
tasks:
  - check:
      type: number
      q: "A triangular prism's end has legs 5 cm and 4 cm (a right angle between them). The prism is 9 cm long. What is its volume in cm³?"
      answer: 90
      tolerance: 0
      feedback:
        - ["180", "The end is a triangle: half of 5 × 4."]
      explain: "A = ½ × 5 × 4 = 10 cm², so V = 10 × 9 = 90 cm³."
  - check:
      type: bug
      code: "working.txt#mia"
      text: "Mia finds the volume of a triangular prism. Click the line where her working goes wrong."
      answer: 2
      fault: logic
      misconception: prism-lwh-always
      explain: "Line 2: l × w × h is for a rectangular box. Any prism is the area of its end times its length: ½ × 3 × 4 × 10 = 60 cm³."
  - check:
      type: question
      q: "The end of a triangular prism is a right triangle with sides 3 cm, 4 cm and 5 cm. Which do you need for its area?"
      options: ["The 3 cm and 4 cm sides (they meet at the right angle)", "All three sides", "The 5 cm side and the length", "Only the 5 cm side"]
      answer: 0
      feedback: [null, "The longest side is not used in ½ × base × height here.", "The 5 cm side is not a height.", "One side cannot give an area."]
      explain: "The two legs are a base and its perpendicular height: ½ × 3 × 4 = 6 cm²."
```

### Any prism

Here is the routine.

```worked
A = \tfrac{1}{2} \times 6 \times 4 = 12\ \text{cm}^2 :: Find the area of the end with its own formula.
V = A \times h = 12 \times 10 = 120\ \text{cm}^3 :: Times the length of the prism.
h = V \div A :: To find a missing length, divide the volume by the end's area.
```

Now try one.

### Find the mistake

Read Mia's working. What shape is the end?

### What you need

## Modify: work backwards

```step
stage: modify
insight: "Missing lengths from volumes and capacities, and a prism whose end is a composite shape."
try: { playground: board, starter: "prism.yml#triangle", height: 600 }
tasks:
  - starter: "prism.yml#triangle"
    hint: ["The end's area times the length must be 60.", "Try legs 3 and 4 (end area 6)."]
    check: { type: board, text: "Make a triangular prism with a volume of 60 cm³.", when: "v = 60", explain: "For example legs 3 and 4 (6 cm²) and length 10, or legs 4 and 5 (10 cm²) and length 6." }
  - check:
      type: number
      q: "A box has a volume of 240 cm³ and a base 8 cm by 6 cm. How tall is it, in cm?"
      answer: 5
      tolerance: 0
      explain: "A = 8 × 6 = 48 cm², so h = 240 ÷ 48 = 5 cm."
  - starter: "prism.yml#pool"
    hint: ["48 000 L = 48 m³.", "The base is 6 × 4 = 24 m²."]
    check: { type: board, text: "A pool is 6 m by 4 m and must hold 48 000 L. Set its depth.", when: "c = 48000", explain: "48 m³ ÷ 24 m² = 2 m." }
  - check:
      type: number
      q: "A concrete step is 2 m long. Its end is an L made of two rectangles: 0.6 m by 0.3 m and 0.3 m by 0.5 m. How many m³ of concrete does it need?"
      answer: 0.66
      tolerance: 0
      explain: "The end is 0.18 + 0.15 = 0.33 m², so V = 0.33 × 2 = 0.66 m³."
```

### A volume of 60

### Find the height

### Fill a pool

### A composite end

## Practise: prism problems

```step
stage: practise
insight: "Volume, capacity and a missing length, mixed; using l × w × h on a triangle is the planted slip; the conversion review keeps litres fresh."
tasks:
  - check:
      type: number
      q: "A prism's end has an area of 15 cm² and it is 8 cm long. What is its volume in cm³?"
      answer: 120
      tolerance: 0
      explain: "15 × 8 = 120 cm³."
  - check:
      type: number
      q: "A fish tank is 50 cm by 40 cm by 30 cm. How many litres does it hold?"
      answer: 60
      tolerance: 0
      explain: "50 × 40 × 30 = 60 000 cm³ = 60 L."
  - check:
      type: number
      q: "A trough is 2 m long, 1 m wide and 0.5 m deep. How many 10 L buckets fill it?"
      answer: 100
      tolerance: 0
      explain: "2 × 1 × 0.5 = 1 m³ = 1000 L, and 1000 ÷ 10 = 100 buckets."
  - check:
      type: number
      q: "Review: how many mL does 1.25 L hold?"
      answer: 1250
      tolerance: 0
      explain: "1.25 × 1000 = 1250 mL."
```

### End area times length

### A fish tank

### Buckets

### Review: litres

## Make: a box to order

```step
stage: make
insight: "Designing to both a base area and a capacity makes the student plan the length from V = Ah."
try: { playground: board, starter: "prism.yml#box", height: 600 }
hint: ["960 mL = 960 cm³.", "With a base of 80 cm², the height is 960 ÷ 80."]
check: { type: board, text: "Design a box with a base area of 80 cm² that holds 960 mL.", when: "A = 80 and c = 960", explain: "The base can be 10 × 8 or 8 × 10, and the height 960 ÷ 80 = 12 cm." }
```

Then explain how you found the height before you moved the slider.
