---
order: 3
unit: frames
title: Design a bridge
assumes: [balanced-forces, force-pairs]
summary: "Long members buckle under a push long before they snap under a pull, so good bridges keep pushed members short. Students find a deck on pins collapses, a big triangle buckles, then design a bridge that holds 1000 N within a budget and test it to failure."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "An 8 m gap, a 1000 N load in the middle, and $10 a metre for members. What is the cheapest bridge that won't fail?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8539
  url: http://127.0.0.1:8539/index.html
  readySelector: ".trsvg"
  layout: full
explainPicture: { ref: bridge.yml#explain, caption: "A Pratt truss: short panels, diagonals that pull, and a top chord that pushes." }
explainClip:
  query: { code: "@bridge.yml#explain", fresh: 1, id: explain }
  caption: "Short pushes, long pulls"
  say: "This bridge is a row of triangles, two metres wide."
  clip:
    - caption: { text: "A Pratt truss: four panels of triangles.", say: "Four panels of triangles." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(1)" }
    - wait: 600
    - caption: { text: "The top pushes (red), the deck and the inner diagonals pull (blue).", say: "The top pushes; the deck and the diagonals pull." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(2)" }
    - wait: 800
    - caption: { text: "Loaded until it fails: about 1414 N, at an end post.", say: "It holds until about fourteen hundred newtons." }
    - wait: 1200
---
A bridge must hold its load, stay within its **budget**, and fail at a load well above what it will carry (a **safety margin**).

The span is **8 m**. Deck joints A to E sit along the bottom; F, G and H are above. **A** is on a pin, **E** on a roller, and **1000 N** hangs from **C**. Members cost **$10 a metre**. Any member can **pull** 2000 N. A **push** is different: a long thin member **buckles** (bows sideways) under a much smaller push. Here a member L metres long buckles under 8000 ÷ L² newtons: 2000 N for a 2 m member, but only about 400 N for a 4.5 m one.

## Predict: just a deck

```step
stage: predict
insight: "A row of members along the bottom looks like a bridge. Committing first makes the collapse instructive: pinned joints need members in two directions."
check:
  type: predict
  q: "The bridge is only its deck: A-B, B-C, C-D, D-E, joined by pins. With 1000 N at C, it…"
  options: ["Collapses: the pins let it fold at C", "Holds: 1000 N is less than 2000 N", "Bends but holds", "Holds, because the supports are strong"]
  actual: "It collapses. Pins let each joint turn, so a straight row of members folds at C like a chain. Every joint needs members in two directions."
```

## Try: deck, then a big triangle

```step
stage: run
insight: "The deck collapses; a single big triangle holds its shape but its long sides buckle. Two failures, two different reasons."
try: { playground: board, starter: "bridge.yml#run", height: 600 }
tasks:
  - check: { type: board, text: "Press Test it.", when: "stable = 0 and tested = 1", explain: "It collapses: the deck folds at its pins." }
  - check: { type: board, text: "Build one big triangle: add A-G, G-E and C-G, then B-G and D-G so B and D are held too. Test it.", when: "stable = 1 and fail >= 1 and tested = 1", explain: "It holds its shape, but A-G and G-E, 4.5 m long, buckle under the push." }
  - check:
      type: question
      q: "Why did A-G fail when no member pulls more than 2000 N?"
      options: ["It is long and pushed: a long member buckles under a much smaller push", "It is pulled too hard", "Triangles are weak", "The pin at A broke"]
      answer: 0
      feedback: [null, "Look at its colour: red means it pushes.", "Triangles are rigid; this one's sides are too long for their push.", "Pins don't fail on this board."]
      explain: "A 4.5 m member buckles at about 400 N. Long members should pull, or be cut into short ones."
```

### The deck

### A big triangle

### Why A-G?

## Worked example: short pushes, long pulls

```step
stage: investigate
insight: "Buckling falls with the length squared, so halving a pushed member's length makes it four times stronger. That is why trusses are panels of short triangles, with diagonals arranged to pull."
tasks:
  - check:
      type: answer
      q: "On this board, at what push does a 2.83 m member buckle, to the nearest 10 N?"
      answer: "1000"
      tolerance: 10
      explain: "8000 ÷ 2.83² = 8000 ÷ 8 = 1000 N."
  - check:
      type: question
      q: "A pushed member is cut in half by bracing it at its middle. How much bigger a push can each half take?"
      options: ["4 times", "2 times", "The same", "Half as much"]
      answer: 0
      shuffle: false
      explain: "Buckling goes with 1 ÷ length², so half the length takes 2² = 4 times the push."
```

### Buckling

```worked
\text{buckles at } \frac{8000}{L^2} :: Long pushed members are the weak spot.
L = 4.47 \text{ m: } \frac{8000}{20} = 400 \text{ N} :: The big triangle's sides push about 1118 N: they buckle.
L = 2 \text{ m: } \frac{8000}{4} = 2000 \text{ N} :: Short members take five times the push.
\text{pulls don't buckle} :: So long diagonals should pull; pushed members should be short: a Pratt truss does both.
```

### Shorter

## Vary: a bridge that holds

```step
stage: modify
insight: "Students apply both rules (every joint held, short pushes) to build any bridge that holds."
try: { playground: board, starter: "bridge.yml#run", height: 600 }
hint: ["Make every panel a triangle: top members F-G and G-H, end posts A-F and H-E.", "Hold B, C and D with members going up (verticals) or across (diagonals).", "Put the inner diagonals so they slope down towards C (F-C and H-C): they pull."]
check: { type: board, text: "Build a bridge that holds 1000 N with every member within its limit. Test it.", when: "stable = 1 and fail = 0 and tested = 1", explain: "A row of short triangles: every joint is held and the long members pull." }
```

## Practise: bridges

```step
stage: practise
insight: "Buckling numbers, safety margins and cost."
tasks:
  - check:
      type: answer
      q: "On this board, at what push does a 4 m member buckle, in newtons?"
      answer: "500"
      explain: "8000 ÷ 16 = 500 N."
  - check:
      type: answer
      q: "A bridge carries 1000 N and fails at 1400 N. What is its safety factor (failure load ÷ working load)?"
      answer: "1.4"
      explain: "1400 ÷ 1000 = 1.4."
  - check:
      type: answer
      q: "A bridge uses 14 members of 2 m and 4 of 2.83 m, at $10 a metre. What does it cost, in dollars, to the nearest dollar?"
      answer: "393"
      tolerance: 0.5
      explain: "28 + 11.32 = 39.32 m, × $10 = $393."
```

### Buckling

### Safety

### Cost

## Make: the cheapest safe bridge

```step
stage: make
insight: "Three criteria at once: hold the load, cost no more than $300, and keep a safety margin (fail at 1400 N or more). Students build, test, and test to failure."
try: { playground: board, starter: "bridge.yml#make", height: 600 }
tasks:
  - hint: ["Start from the bridge you built in Vary.", "Take out any member that isn't needed: every joint still needs members in two directions.", "Press Load until it fails: it must hold 1400 N or more."]
    check: { type: board, text: "Build a bridge that holds 1000 N, costs $300 or less, and gives way only at 1400 N or more. Test it, then load it until it fails.", when: "stable = 1 and fail = 0 and cost <= 300 and fail_load >= 1400", explain: "A Pratt (or Howe) truss: 13 members, $293, failing at about 1414 N." }
  - check: { type: reflect, text: "In one or two sentences: which member failed first when you loaded it to failure, and how you would make the bridge stronger for the least money." }
```

### The cheapest safe bridge

### Evaluate
