---
order: 8
unit: challenge
optional: true
introduces: [math]
assumes: [draw-loop, for-count, variable, arithmetic]
title: Moving art
summary: "Use sin and cos to move things in circles, map to turn one range into another, and make a pattern of your own."
language: javascript
hook: "A few lines of maths can make a spinning ring of colour, with no pictures drawn by hand."
---
`cos(angle)` and `sin(angle)` give the x and y of a point going round a circle, and `map(value, a, b, c, d)` turns a number in the range a to b into the matching number in the range c to d. Together with a loop, they make patterns that move.

**The hard part** is the loop variable. Each circle gets its own `i`, and that `i` changes its angle and its colour, so every circle is different.

## Predict

```step
stage: predict
code: sketch.js#predict
check:
  type: predict
  q: "What shape do the 12 circles make?"
  options: ["A ring of 12 circles", "A straight row", "One circle in the middle", "A zigzag"]
  actual: "A ring. Each circle is placed at 100 pixels from the middle (150, 150), at an angle 30 degrees further round than the last."
```

Twelve angles of 30 degrees make a full turn.

## Run

```step
stage: run
code: sketch.js#run
try: { playground: p5, starter: "sketch.js#run", height: 430 }
check: { type: reflect, text: "I can see the ring of circles turning, with a colour that changes along it." }
```

`frameCount` goes up every frame, so each angle grows and the ring turns.

## Investigate

```step
stage: investigate
code: sketch.js#run
insight: "i gives each circle its own angle and colour; frameCount makes every angle grow, so the whole ring turns."
tasks:
  - check:
      type: question
      q: "What makes the ring turn?"
      options: ["frameCount grows every frame, so every angle grows", "i changes every frame", "map changes the colours", "background clears the canvas"]
      answer: 0
      explain: "angle = frameCount * 0.02 + i * 0.5. i never changes inside one frame, but frameCount goes up by 1 each frame."
  - check:
      type: match
      q: "Match each piece with what it does."
      pairs:
        - ["cos(angle) * 100", "how far right or left of the middle, up to 100"]
        - ["150 + ...", "moves the middle of the ring to the middle of the canvas"]
        - ["map(i, 0, 11, 255, 120)", "turns i from 0 to 11 into a number from 255 down to 120"]
        - ["frameCount * 0.02", "an angle that grows a little every frame"]
```

### What makes it turn?

The one number that changes.

### Which piece does what?

Maths in the loop.

## Modify

```step
stage: modify
insight: "A background with low opacity leaves trails; a radius that depends on i makes a spiral."
try: { playground: p5, starter: "sketch.js#run", height: 430 }
tasks:
  - hint:
      - "background takes a fourth number for how solid it is, up to 255."
      - "Try background(20, 30, 60, 30) so old circles fade slowly."
    check: { type: code, text: "Leave trails behind the circles.", rules: { contains: ["background(20, 30, 60,"] } }
  - hint:
      - "Use a radius that grows with i instead of the fixed 100."
      - "let radius = 10 + i * 5; and use radius in place of 100."
    check: { type: code, text: "Make the circles spiral outwards.", rules: { uses: ["radius"] } }
```

### Trails

Leave **trails** behind the circles.

### A spiral

Spread the circles into a **spiral**.

## Make: your own pattern

```step
stage: make
insight: "Goals only: a moving pattern using a loop, sin or cos, and map."
try: { playground: p5, starter: "sketch.js#make", height: 430 }
check: { type: reflect, text: "I made a moving pattern of my own using a loop, sin or cos, and map." }
```

Make a moving pattern of your own: a wave, a spiral, a spinning flower. Use a loop, `sin` or `cos`, and `map` to change a colour or size. The sketch on this page is one wave.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A friend's sketch uses sin(frameCount * 0.05). What does it do over time?"
  options: ["Goes up and down smoothly between -1 and 1", "Counts up forever", "Jumps randomly", "Stays at 0"]
  answer: 0
  explain: "sin repeats a smooth wave between -1 and 1. Multiply it by a number to make the wave bigger."
```

Maths makes motion smooth. Artists use the same ideas for waves, orbits and growing plants.
