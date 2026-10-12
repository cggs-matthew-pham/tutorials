---
order: 4
unit: beams
title: Beams and shapes
assumes: [turning-effect, balanced-forces]
summary: "A beam's supports share its load like a lever, and its stiffness depends on its shape far more than on how much material it has: depth counts cubed. Students compare a strip flat and on its edge, an I-beam and a tube, work out support forces, and choose a section to a brief."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A ruler laid flat between two books sags under a pencil case. Turn it on its edge and it barely moves. It's the same ruler. Why?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8538
  url: http://127.0.0.1:8538/index.html
  readySelector: ".trsvg"
  layout: full
explainPicture: { ref: beams.yml#explain, caption: "The same strip on its edge: a hundred times stiffer than flat." }
explainClip:
  query: { code: "@beams.yml#explain", fresh: 1, id: explain }
  caption: "Depth counts"
  say: "A strip of pine, thirty millimetres by three, standing on its edge."
  clip:
    - caption: { text: "Laid flat, this strip sagged 38.6 mm under 10 N. On its edge it sags 0.39 mm.", say: "On its edge, it hardly sags at all." }
    - caption: { text: "On its edge, the same wood is 30 mm deep instead of 3.", say: "The same wood, ten times deeper." }
    - caption: { text: "Ten times deeper is 10 × 10 × 10 = 1000 times stiffer, a tenth as wide: 100 times stiffer.", say: "Depth counts three times over." }
    - wait: 1200
---
A **beam** is a member that carries a load across a gap, sitting on **supports**. Two questions matter: how much does each support hold, and how much does the beam **sag**?

The beams here are pine, **500 mm** between supports. Each **cross-section** (the shape you'd see if you sawed through it) uses about the same amount of wood.

## Predict: flat or on edge?

```step
stage: predict
insight: "Students expect the same material to sag the same way. Committing first makes the hundredfold difference land."
check:
  type: predict
  q: "A 30 × 3 mm strip is turned from flat onto its edge. Same wood, same load. Its sag…"
  options: ["Drops to about a hundredth", "Halves", "Stays the same: same wood", "Gets bigger: it might tip over"]
  actual: "About a hundredth. Stiffness grows with the depth cubed: 10 times deeper is 1000 times stiffer, and a tenth as wide is a tenth of that: 100 times."
```

## Try: four shapes

```step
stage: run
insight: "Switching shapes and reading the sag builds the idea that where the material is matters more than how much there is."
try: { playground: board, starter: "beams.yml#run", height: 520 }
tasks:
  - check: { type: board, text: "Switch the shape to the strip on its edge.", when: "s = 2", explain: "It sags 0.39 mm instead of 38.6 mm." }
  - check:
      type: number
      q: "About how many times less does it sag on its edge?"
      answer: 100
      tolerance: 3
      explain: "38.6 ÷ 0.39 ≈ 100."
  - check: { type: board, text: "Try the I-beam and the tube. Which sags least?", when: "s = 3", explain: "The I-beam: it puts most of its wood at the top and bottom, as far from the middle as it can." }
```

### On its edge

### How many times?

### I-beam and tube

## Worked example: supports and stiffness

```step
stage: investigate
insight: "Two rules: the supports share the load like a lever (the nearer support holds more), and stiffness depends on depth cubed (the I value)."
tasks:
  - check:
      type: answer
      q: "A 10 N load sits 0.1 m from the left support of a 0.5 m beam. How much does the left support hold, in newtons?"
      answer: "8"
      feedback:
        - ["2", "That is the right support. The nearer support holds more."]
      explain: "10 × 0.4 ÷ 0.5 = 8 N (and the right holds 2 N)."
  - check:
      type: answer
      q: "A beam is made twice as deep (same width). How many times stiffer is it?"
      answer: "8"
      feedback:
        - ["2", "Depth counts cubed: 2 × 2 × 2."]
        - ["4", "Cubed, not squared."]
      explain: "2³ = 8 times stiffer: it sags an eighth as much."
```

### Two rules

```worked
R_\text{left} = P \times \frac{b}{L} :: The load P is a away from the left support and b from the right. The far distance decides each share (as on a lever).
10 \times \frac{0.25}{0.5} = 5 \text{ N each} :: In the middle, the supports share it equally.
I = \frac{\text{width} \times \text{depth}^3}{12} :: Stiffness of a rectangle (in mm⁴): depth counts cubed.
\text{flat: } \frac{30 \times 3^3}{12} = 67.5 \quad \text{edge: } \frac{3 \times 30^3}{12} = 6750 :: Same wood, a hundred times the stiffness on its edge.
```

### Deeper

## Vary: move the load, choose the shape

```step
stage: modify
insight: "First the support shares on the board, then a brief: the least wood that keeps the sag within a limit."
try: { playground: board, starter: "beams.yml#vary-move", height: 520 }
tasks:
  - starter: "beams.yml#vary-move"
    check: { type: board, text: "Move the load until the left support holds 8 N.", when: "r_a = 8", explain: "0.1 m from the left support: 10 × 0.4 ÷ 0.5 = 8 N." }
  - starter: "beams.yml#vary"
    check: { type: board, text: "The sag must be 0.5 mm or less, using the least wood (90 mm² or less). Choose the shape.", when: "ok = 1 and area_mm2 <= 90", explain: "The strip on its edge: 0.39 mm with 90 mm² of wood. The tube also passes the sag, but uses 90.2 mm²." }
```

### Shares

### Least wood

## Practise: beams

```step
stage: practise
insight: "Support shares, the depth-cubed rule, and why real beams are I-shaped."
tasks:
  - check:
      type: answer
      q: "A 60 N load sits 1 m from the left support of a 4 m beam. How much does the left support hold, in newtons?"
      answer: "45"
      explain: "60 × 3 ÷ 4 = 45 N."
  - check:
      type: answer
      q: "A plank is made three times as deep (same width). How many times stiffer is it?"
      answer: "27"
      explain: "3³ = 27."
  - check:
      type: question
      q: "Why are steel beams in buildings I-shaped?"
      options: ["Most of the steel is at the top and bottom, far from the middle, where it adds most stiffness", "I-shapes are easier to paint", "They weigh more", "The middle of a beam does all the work"]
      answer: 0
      feedback: [null, "Not the reason.", "They weigh less for their stiffness.", "The middle does least: that is why the web is thin."]
      explain: "Stiffness comes from material far from the middle. An I-beam puts its flanges there and keeps a thin web between them."
```

### Shares

### Deeper

### I-beams

## Make: a shelf

```step
stage: make
insight: "A heavier load narrows the choice to one shape: students use the facts line to decide and justify."
try: { playground: board, starter: "beams.yml#make", height: 520 }
tasks:
  - check: { type: board, text: "A shelf holds 25 N in the middle and may sag at most 0.5 mm. Choose the shape that meets the brief.", when: "ok = 1", explain: "Only the I-beam: 0.44 mm. The strip on its edge sags 0.96 mm and the tube 1.22 mm." }
  - check: { type: reflect, text: "In one or two sentences: which shape you chose, why it is stiffer, and one reason a builder might still choose another shape." }
```

### A shelf

### Evaluate
