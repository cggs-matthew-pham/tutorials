---
order: 1
unit: frames
title: Pull or push
assumes: [force-arrows, balanced-forces, free-body]
summary: "In a frame joined by pins, every member either pulls (tension) or pushes (compression). Students test a roof truss, read which members pull and push, find that a taller roof means smaller forces, and choose a roof height that keeps every member within its limit and the budget."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A roof holds up a load of tiles. Which of its beams are being stretched, and which are being squashed?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8536
  url: http://127.0.0.1:8536/index.html
  readySelector: ".trsvg"
  layout: full
explainPicture: { ref: forces.yml#run, caption: "A roof truss under 1000 N: the sloping members push (red), the bottom member pulls (blue)." }
explainClip:
  query: { code: "@forces.yml#run", fresh: 1, id: explain }
  caption: "Tension and compression"
  say: "A thousand newtons presses down on the top joint."
  clip:
    - caption: { text: "1000 N presses down on the top joint, C.", say: "The load presses down on the top." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(1)" }
    - wait: 600
    - caption: { text: "Red members push (compression): the sloping sides are squashed.", say: "The sloping sides are squashed." }
    - caption: { text: "Blue members pull (tension): the bottom stops the feet spreading apart.", say: "The bottom member stops the feet spreading." }
    - wait: 1200
---
A **structure** holds a load up without moving. A **truss** is a frame of straight **members** joined at **pins**, like a roof frame, a crane arm or a bridge. Because the joints are pins, each member can only **pull** or **push** along its length:

- **Tension**: the member is being stretched; it pulls on its joints (blue on the board).
- **Compression**: the member is being squashed; it pushes on its joints (red).

The roof truss here is 4 m wide. **A** sits on a fixed support (a pin), **B** on a roller that can slide sideways. A **1000 N** load presses on the top joint, **C**. Forces are in newtons; a minus sign means a push.

## Predict: which member pulls?

```step
stage: predict
insight: "Students expect every member under a load to be squashed. Committing first makes the tension in the bottom member a surprise worth explaining: it stops the feet spreading."
check:
  type: predict
  q: "The load presses down on C. Which member is being stretched (pulled)?"
  options: ["A-B, along the bottom", "A-C, a sloping side", "All three: the load stretches everything", "None: a load only squashes"]
  actual: "A-B. The sloping members push the feet A and B outwards; the bottom member holds them together, so it is stretched."
```

## Try: test the roof

```step
stage: run
insight: "Testing settles the prediction with colours and numbers; the number task makes students read the board."
try: { playground: board, starter: "forces.yml#run", height: 520 }
tasks:
  - check: { type: board, text: "Press Test it. Which members turn blue (pull) and which turn red (push)?", when: "tested = 1", explain: "A-B pulls (blue); A-C and B-C push (red)." }
  - check:
      type: number
      q: "How hard does A-B pull, in newtons?"
      answer: 500
      explain: "500 N. Each support holds up half the load, and the bottom member holds the feet together."
  - check:
      type: question
      q: "A-C pushes with 707 N, more than the 1000 N load shared between two sides (500 N each). Why more?"
      options: ["It pushes at a slant: only part of its push holds the load up, so it must push harder", "The board is wrong", "The load gets bigger as it goes down", "Pushes are always bigger than pulls"]
      answer: 0
      feedback: [null, "It is right: slanted members need more force.", "The load stays 1000 N.", "Not always: it depends on the angle."]
      explain: "Only the upward part of a slanted push holds the load up. The flatter the slope, the smaller that part, so the bigger the push."
```

### Test it

### The pull

### Why 707?

## Worked example: height changes the forces

```step
stage: investigate
insight: "The worked example turns board readings into a rule: for this roof, the bottom pull is load × span ÷ (4 × height). Taller means smaller forces but longer members."
tasks:
  - check:
      type: answer
      q: "Span 4 m, height 2 m, and a 2000 N load. How hard does the bottom member pull, in newtons?"
      answer: "1000"
      feedback:
        - ["500", "That is the 1000 N load. The load here is 2000 N."]
      explain: "2000 × 4 ÷ (4 × 2) = 1000 N."
  - check:
      type: question
      q: "A builder wants a flatter roof (lower C) to save timber. What happens to the forces?"
      options: ["They get bigger: flatter members must pull and push harder", "They get smaller: less timber, less force", "They stay the same: the load hasn't changed", "Only the bottom member changes"]
      answer: 0
      feedback: [null, "Shorter members, but bigger forces.", "The load is the same, but the angle changes the forces.", "The sloping members change too."]
      explain: "A flatter roof needs bigger forces in every member. That is the trade: less material, more force."
```

### Three heights

```worked
\text{height } 1 \text{ m: } A\text{-}B = 1000 \text{ N} :: Test the roof with C at 1 m: the bottom pulls 1000 N.
\text{height } 2 \text{ m: } A\text{-}B = 500 \text{ N} :: Twice as tall: half the pull.
\text{height } 4 \text{ m: } A\text{-}B = 250 \text{ N} :: Twice again: half again.
A\text{-}B = \frac{1000 \times 4}{4 \times \text{height}} :: The pull is load × span ÷ (4 × height).
```

Now a 2000 N load on the same 4 m roof, 2 m tall.

### Flatter

## Vary: raise the roof

```step
stage: modify
insight: "The slider lets students check the rule against the board."
try: { playground: board, starter: "forces.yml#vary", height: 560 }
check: { type: board, text: "Raise or lower C until the bottom member pulls exactly 250 N, then test it.", when: "f_ab = 250 and tested = 1", explain: "C at 4 m: 1000 × 4 ÷ (4 × 4) = 250 N." }
```

## Practise: forces in a roof

```step
stage: practise
insight: "Tension or compression by reasoning, and the rule with new numbers."
tasks:
  - check:
      type: answer
      q: "A roof 6 m wide and 3 m tall holds 1200 N at the top. How hard does the bottom member pull, in newtons?"
      answer: "600"
      explain: "1200 × 6 ÷ (4 × 3) = 600 N."
  - check:
      type: sort
      q: "Pull or push? Sort each member."
      options: ["Tension (pulls)", "Compression (pushes)"]
      items:
        - ["A rope holding up a swing", "Tension (pulls)"]
        - ["A table leg", "Compression (pushes)"]
        - ["The cable of a crane", "Tension (pulls)"]
        - ["A pillar holding up a roof", "Compression (pushes)"]
        - ["The bottom member of a roof truss", "Tension (pulls)"]
      explain: "Ropes and cables can only pull. Legs and pillars push back against the load."
```

### A wider roof

### Pull or push

## Make: a roof to a brief

```step
stage: make
insight: "Two criteria pull in opposite directions: a taller roof means smaller forces but costs more timber. Only one height meets both."
try: { playground: board, starter: "forces.yml#make", height: 560 }
tasks:
  - hint: ["Members here can only take 600 N, pulling or pushing.", "Taller makes the forces smaller, but the members longer and dearer.", "Test each height from 3 m up and watch both the forces and the cost."]
    check: { type: board, text: "Choose a height where every member is within 600 N and the roof costs $125 or less, then test it.", when: "fail = 0 and cost <= 125 and tested = 1", explain: "3.5 m: the biggest push is 576 N and the timber costs $120.62. At 3 m a side pushes 601 N; at 4 m it costs $129." }
  - check: { type: reflect, text: "In one or two sentences: the height you chose, and why lower and higher both failed." }
```

### A brief

### Evaluate
