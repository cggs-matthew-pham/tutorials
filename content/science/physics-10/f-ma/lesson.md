---
order: 3
node: AC9S10U05 n4
unit: newton
title: How hard do you need to push?
summary: "Newton's second law: the net force on an object equals its mass times its acceleration, F = ma. Double the net force and the acceleration doubles; double the mass and the acceleration halves."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8206
  url: http://127.0.0.1:8206/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "F = ma: the same 8 N on twice the mass (4 kg) gives half the acceleration, 2 m/s²." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "F = ma"
  say: "Newton's second law: net force equals mass times acceleration."
  clip:
    - caption: { text: "8 N on 2 kg: a = F ÷ m = 4 m/s².", say: "Eight newtons on two kilograms gives four metres per second squared." }
    - click: "Play"
    - wait: 2000
    - expect: { selector: "body", contains: "acceleration 4 m/s²" }
    - wait: 1200
    - caption: { text: "Same force, double the mass: 4 kg.", say: "Same force, but double the mass: four kilograms." }
    - click: "Reset"
    - click: "Mass: more"
    - click: "Mass: more"
    - click: "Play"
    - wait: 2000
    - expect: { selector: "body", contains: "acceleration 2 m/s²" }
    - caption: { text: "Half the acceleration: 2 m/s². F = ma.", say: "Double the mass, half the acceleration: F equals m a." }
    - wait: 600
hook: "Push an empty shopping trolley and it shoots off. Push a full one just as hard and it barely gets going. Same push, different result: by exactly how much?"
---
You know a net force makes things accelerate. This lesson finds the exact rule.

## Engage: double the mass

```step
stage: predict
insight: "Students' guesses about the mass-acceleration relationship (no effect, half, a little less) surface before the board makes it exact."
check:
  type: predict
  q: "A push gives an empty trolley an acceleration of 4 m/s². You load it until its mass is doubled and push exactly as hard. Predict its acceleration."
  options: ["4 m/s²: the push is the same", "2 m/s²: half as much", "A little less, maybe 3.5 m/s²", "8 m/s²"]
  actual: "2 m/s². Doubling the mass halves the acceleration for the same net force: a = F ÷ m."
```

## Explore: hit a target acceleration

```step
stage: run
insight: "Tuning the push to hit a target acceleration for a given mass makes students find F = ma by doing it."
try: { playground: board, starter: "boards.yml#fma", height: 660 }
tasks:
  - check: { type: board, text: "Give the 4 kg trolley an acceleration of 2 m/s².", when: "m = 4 and a = 2" }
  - check: { type: board, text: "Now double the mass to 8 kg and get the same acceleration, 2 m/s².", when: "m = 8 and a = 2" }
```

### Target 1

Change the **Push** until the acceleration reading is 2 m/s². (You can press Play to see it, but the reading shows before you play.)

### Target 2

What did you have to do to the push?

## Explain: F = ma

```step
stage: investigate
insight: "Stating the law with units and the word net, then solving for each variable, gives the procedural fluency the later multi-force nodes need."
tasks:
  - check:
      type: question
      q: "For 4 kg you needed 8 N; for 8 kg, 16 N. What rule links force, mass and acceleration?"
      options: ["Force = mass × acceleration (F = ma)", "Force = mass + acceleration", "Force = mass ÷ acceleration"]
      answer: 0
      feedback: [null, "4 + 2 = 6, not 8.", "4 ÷ 2 = 2, not 8."]
      explain: "8 = 4 × 2 and 16 = 8 × 2. F is the net force in N, m the mass in kg, a the acceleration in m/s²."
  - check:
      type: number
      q: "What net force gives a 1200 kg car an acceleration of 3 m/s², in N?"
      answer: 3600
      explain: "F = ma = 1200 × 3 = 3600 N."
  - check:
      type: number
      q: "A net force of 50 N acts on a 10 kg box. Its acceleration, in m/s²?"
      answer: 5
      explain: "a = F ÷ m = 50 ÷ 10 = 5 m/s²."
  - check:
      type: number
      q: "A net force of 600 N gives a sprinter an acceleration of 10 m/s². Her mass, in kg?"
      answer: 60
      explain: "m = F ÷ a = 600 ÷ 10 = 60 kg."
  - check:
      type: question
      q: "A 2 kg box is pushed with 10 N against 4 N of friction. What force goes into F = ma?"
      options: ["The net force, 6 N", "The push, 10 N", "The friction, 4 N", "14 N"]
      answer: 0
      feedback: [null, "F = ma uses the net force: the push minus the friction.", "Friction alone isn't the net force.", "Opposite forces subtract."]
      explain: "Net force 10 − 4 = 6 N, so a = 6 ÷ 2 = 3 m/s²."
  - check: { type: reflect, text: "I can use F = ma to find any of force, mass or acceleration, with units, using the net force." }
```

### The rule

### Find the force

### Find the acceleration

### Find the mass

### Net force

### In your own words

In your book: explain what happens to the acceleration when you double the force, and when you double the mass, using F = ma.

## Practise: proportions

```step
stage: practise
insight: "Reasoning with proportions, not just substitution, shows students understand the relationship rather than the formula."
tasks:
  - check:
      type: sort
      q: "What happens to the acceleration?"
      options: ["Doubles", "Halves", "Stays the same"]
      items:
        - ["The net force doubles, same mass", "Doubles"]
        - ["The mass doubles, same net force", "Halves"]
        - ["Both force and mass double", "Stays the same", "2F ÷ 2m = F ÷ m."]
        - ["The net force halves, same mass", "Halves"]
  - check:
      type: number
      q: "A trolley accelerates at 6 m/s². The net force is tripled and the mass stays the same. New acceleration, in m/s²?"
      answer: 18
      explain: "Three times the force, three times the acceleration: 18 m/s²."
```

### Double, half or same

### Triple the force

## Elaborate: stopping a car

```step
stage: modify
tier: typical
insight: "Braking applies F = ma to a real stopping problem, the context named in the curriculum."
tasks:
  - check:
      type: number
      q: "A 1500 kg car brakes from 20 m/s to rest in 4 s. What is the size of its deceleration, in m/s²?"
      answer: 5
      explain: "Δv ÷ Δt = 20 ÷ 4 = 5 m/s² (backwards)."
  - check:
      type: number
      q: "What braking force does that need, in N?"
      answer: 7500
      explain: "F = ma = 1500 × 5 = 7500 N, backwards."
  - check:
      type: question
      q: "The same car is loaded with people and luggage (more mass). To stop in the same time, the braking force must be…"
      options: ["bigger", "the same", "smaller"]
      answer: 0
      feedback: [null, "Same deceleration with more mass needs more force: F = ma.", "More mass needs more force, not less."]
      explain: "This is one reason heavier vehicles take longer to stop, and why speed limits near schools are low."
```

### Deceleration

### Braking force

### A loaded car

## Elaborate: is it really a straight line?

```step
stage: modify
tier: wider
insight: "Predicting the shape of an F–a graph before seeing data prepares students to assess linearity in a trolley practical."
check:
  type: question
  q: "You measure a trolley's acceleration for several pulling forces, keeping the mass the same. What graph of acceleration against force does F = ma predict?"
  options: ["A straight line through the origin (gradient 1 ÷ mass)", "A curve that levels off", "A horizontal line"]
  answer: 0
  feedback: [null, "In a real practical friction can bend it a little near zero, but F = ma predicts a straight line.", "That would mean force has no effect."]
  explain: "a = F ÷ m, so a is proportional to F: a straight line through the origin with gradient 1/m. Real data that misses the origin usually points to friction."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about doubling the mass with the board." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Newton's second law:** **F = ma**. F is the **net** force (N), m the mass (kg), a the acceleration (m/s²).
- Rearranged: a = F ÷ m and m = F ÷ a.
- Double the net force, double the acceleration. Double the mass, half the acceleration.
- The acceleration points the same way as the net force.
