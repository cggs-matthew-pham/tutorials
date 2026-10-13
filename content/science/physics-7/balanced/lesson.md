---
order: 2
node: AC9S7U04 n2
unit: forces
title: Does balanced mean no forces?
introduces: [balanced-forces]
summary: Balanced forces cancel out (the net force is zero), so the motion doesn't change. The object stays still or keeps moving at a steady speed. Unbalanced forces change the motion.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8201
  url: http://127.0.0.1:8201/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "Push 4 N, friction 4 N: balanced, so the net force is 0 N and the motion doesn't change." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Balanced forces"
  say: "Balanced forces cancel out, but they are still there."
  clip:
    - caption: { text: "The box is already moving. Push 4 N forward, friction 4 N back.", say: "The moving box has four newtons of push forward and four of friction back." }
    - click: "Play"
    - wait: 1500
    - caption: { text: "Balanced: net force 0 N. The dots stay evenly spaced.", say: "The forces are balanced, so the dots stay evenly spaced." }
    - wait: 2500
    - expect: { selector: "body", contains: "speed 2 m/s" }
    - caption: { text: "Balanced doesn't mean no forces: it means no change in motion.", say: "Balanced doesn't mean no forces: it means the motion doesn't change." }
    - wait: 800
hook: "A car cruises down the highway at a steady 100 km/h, engine running. Is its engine pushing harder than the air and the road are holding it back?"
---
Last lesson: drawing forces. This lesson: what the diagram tells you about the motion.

## Engage: the cruising car

```step
stage: predict
insight: "Most students say the forward force must be bigger for a car to keep moving; the board shows balanced forces giving steady motion."
check:
  type: predict
  q: "A car drives along a straight road at a steady 100 km/h. Compare the forward force from the engine with the backward forces (air and road friction)."
  options: ["Forward force is bigger, or the car would stop", "They are equal: the forces are balanced", "There are no forces on it while it cruises", "Backward forces are bigger"]
  actual: "They are equal. At a steady speed the forces are balanced: the net force is zero, so the motion doesn't change."
```

## Explore: keep it moving

```step
stage: run
insight: "Finding the push that keeps the box at a steady speed shows balanced forces with motion, not without it."
try: { playground: board, starter: "boards.yml#steady", height: 640 }
check: { type: board, text: "Find a push that keeps the box moving at a steady speed for at least 3 seconds.", when: "t >= 3 and f = 0 and v > 0" }
```

The box starts moving at 3 m/s. Press **Play**, then try different pushes (**Reset** to start again). Watch the speed–time graph and the dots: evenly spaced dots mean a steady speed.

## Explain: balanced and unbalanced

```step
stage: investigate
insight: "Separating 'balanced' from 'no forces', then linking balance to unchanged motion, is the hinge for Newton's first law."
tasks:
  - check:
      type: question
      q: "When the box moved at a steady speed, what was true?"
      options: ["The push equalled friction: balanced, net force 0", "There were no forces on it", "The push was bigger than friction"]
      answer: 0
      feedback: [null, "Both arrows were there: push forward, friction back.", "If the push were bigger, the box would speed up: check the graph."]
      explain: "Balanced forces: equal and opposite. They are both still acting; they cancel out."
  - check:
      type: sort
      q: "What happens with each net force? (The box is already moving to the right.)"
      options: ["Speeds up", "Steady speed", "Slows down"]
      items:
        - ["Push 9 N, friction 6 N", "Speeds up"]
        - ["Push 6 N, friction 6 N", "Steady speed"]
        - ["Push 2 N, friction 6 N", "Slows down"]
        - ["Push 12 N, friction 6 N", "Speeds up"]
  - check:
      type: sort
      q: "Balanced or unbalanced?"
      options: ["Balanced", "Unbalanced"]
      items:
        - ["A book resting on a desk", "Balanced"]
        - ["A car cruising at a steady speed", "Balanced", "Steady speed in a straight line: balanced."]
        - ["A ball speeding up as it rolls down a slope", "Unbalanced"]
        - ["A skydiver falling at a steady speed", "Balanced", "Air resistance equals weight."]
        - ["A cyclist braking", "Unbalanced"]
        - ["A plane taking off down the runway", "Unbalanced"]
  - check: { type: reflect, text: "I explained why a car at a steady speed has balanced forces, even though its engine is running." }
```

### Steady speed

### What the net force does

### Balanced or not

### In your own words

In your book: explain why "balanced forces" doesn't mean "no forces", using the box on the board as your example.

## Mix it up

```step
stage: practise
insight: "Balanced forces are equal and opposite, which only makes sense once arrow length is read as the size of the force."
check:
  type: question
  q: "Looking back at force arrows: a diagram shows a 30 N push to the right and 10 N of friction to the left. How do the arrows look?"
  options: ["The push arrow is three times as long as the friction arrow, and they point opposite ways", "The two arrows are the same length", "Both arrows point to the right", "The friction arrow is longer, because friction is stronger"]
  answer: 0
  feedback: [null, "The forces are different sizes, so the arrows are different lengths.", "Friction acts against the push, so its arrow points the other way.", "The push is the bigger force (30 N against 10 N), so its arrow is longer."]
  explain: "The length of an arrow shows the size of the force, and it points the way the force acts. 30 N is three times 10 N."
```

## Elaborate: the falling skydiver

```step
stage: modify
tier: typical
insight: "A vertical case with motion (falling at a steady speed) tests whether students apply 'balanced means no change in motion' beyond the board's horizontal case."
try: { playground: board, starter: "boards.yml#skydiver", height: 560 }
tasks:
  - check: { type: board, text: "A skydiver and her gear, 100 kg (weight 980 N), fall at a steady speed. Set the air resistance.", when: "A = 980" }
  - check:
      type: question
      q: "Her forces are balanced. Is she still falling?"
      options: ["Yes, at a steady speed", "No, she has stopped in mid-air", "She is speeding up"]
      answer: 0
      feedback: [null, "Balanced forces don't stop motion; they stop it changing.", "Speeding up needs a net force downwards."]
      explain: "This steady speed is her terminal velocity: weight and air resistance cancel, so her speed stays the same."
```

### Set the air resistance

### Still falling?

## Elaborate: slowing down and stopping

```step
stage: modify
tier: wider
insight: "Making the box stop with friction connects unbalanced forces to slowing down and shows what friction does once motion has stopped."
try: { playground: board, starter: "boards.yml#stop", height: 640 }
tasks:
  - check: { type: board, text: "Make the moving box slow down and stop.", when: "t >= 1 and v = 0" }
  - check:
      type: question
      q: "Once the box has stopped, with a push of 2 N, the friction is shown as 2 N, not 6 N. Why?"
      options: ["Friction only resists as much as it needs to, up to its limit", "Friction disappears when things stop", "The board is wrong"]
      answer: 0
      feedback: [null, "There is still friction: it matches the push so the box stays put.", "Push gently on a heavy box that doesn't move: friction matches your push."]
      explain: "A stationary object's friction matches the push, up to a limit (6 N here). Beyond that, the object starts sliding."
```

### Stop it

### Friction at rest

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the cruising car with what the board showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Balanced** forces are equal and opposite: the **net force is zero**. They are still acting; they cancel.
- Balanced forces mean **no change in motion**: still objects stay still; moving objects keep a steady speed in a straight line.
- **Unbalanced** forces change the motion: the object speeds up, slows down or changes direction, the way the net force points.
- A car at a steady speed has balanced forces: the engine's push equals air resistance plus friction.
