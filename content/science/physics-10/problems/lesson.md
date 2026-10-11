---
order: 7
node: AC9S10U05 n7
woven: [AC9S9I04, AC9S9I06, AC9S9I07]
unit: newton
title: Solving force and motion problems
summary: "A multi-step problem becomes manageable with a routine: list what you know, work out the net force, find the acceleration with F = ma, use a = Δv ÷ t to link it to speed and time, then check the answer makes sense. Keep units (N, kg, m/s², m/s, s) with every number."
language: science
voice: { name: bf_emma, speed: 1.05 }
hook: "A car travelling at 25 m/s brakes. How long does it take to stop, and how big is the force? The answer takes three steps, and the hardest part is knowing which one comes first."
---
A short practice lesson with no simulation. You know F = ma, a = Δv ÷ t and the three laws. Now use them together.

## Engage: which step first?

```step
stage: predict
insight: "Students jump to a formula. The routine (net force first, then acceleration, then the motion) is the thing to build."
check:
  type: predict
  q: "A 1500 kg car has an engine force of 4000 N forwards and a resistance of 1000 N backwards. You are asked how fast its speed is changing. What do you work out first?"
  options: ["The net force: 4000 − 1000 = 3000 N", "The acceleration, using 4000 N", "The speed, from the mass", "Nothing: you need the time first"]
  actual: "The net force, 3000 N. Acceleration depends on the net (unbalanced) force, not the engine force alone. Then a = F ÷ m = 3000 ÷ 1500 = 2 m/s²."
```

## Explain: practise the routine

```step
stage: investigate
insight: "Each problem has two or three steps and asks for units, a check on reasonableness and a use of a graph: the node's three success criteria."
tasks:
  - check:
      type: number
      q: "A 1500 kg car has an engine force of 4000 N and a resistance of 1000 N. What is its acceleration (m/s²)?"
      answer: 2
      explain: "Net force = 4000 − 1000 = 3000 N. a = F ÷ m = 3000 ÷ 1500 = 2 m/s²."
  - check:
      type: number
      q: "It accelerates at 2 m/s² from rest. What is its speed after 6 s (m/s)?"
      answer: 12
      explain: "Δv = a × t = 2 × 6 = 12 m/s."
  - check:
      type: number
      q: "A 1200 kg car travelling at 20 m/s brakes to a stop in 8 s. What is its acceleration (m/s²)? Use a negative sign for slowing down."
      answer: -2.5
      explain: "a = Δv ÷ t = (0 − 20) ÷ 8 = −2.5 m/s²."
  - check:
      type: number
      q: "What braking force does the 1200 kg car need (N)? Give the size only."
      answer: 3000
      explain: "F = ma = 1200 × 2.5 = 3000 N."
  - check:
      type: question
      q: "A student calculates the braking force of a car as 3 000 000 N. What should they do?"
      options: ["Check the working: a force that large is not reasonable for a family car", "Report it: the calculation was careful", "Divide by 10 to make it look sensible"]
      answer: 0
      feedback: [null, "A careful method can still contain a slip, such as mixing grams and kilograms.", "Don't change a number without finding the slip."]
      explain: "Compare the answer with what you know: a family car's braking force is a few thousand newtons. A huge number suggests a unit slip (grams for kilograms, for example)."
  - check:
      type: question
      q: "A speed–time graph for a trolley is a straight line rising from 0 m/s at 0 s to 6 m/s at 3 s. What is the acceleration, and what does the gradient show?"
      options: ["2 m/s²: the gradient of a speed–time graph is the acceleration", "6 m/s²", "3 m/s²: the gradient is the time"]
      answer: 0
      feedback: [null, "Divide the change in speed by the time taken.", "The gradient is rise over run: 6 ÷ 3."]
      explain: "Gradient = change in speed ÷ change in time = acceleration. Steeper means a bigger acceleration."
  - check: { type: reflect, text: "I can solve a multi-step force and motion problem with units, and check the answer is reasonable." }
```

### Net force

### Speed after 6 s

### Braking

### Braking force

### Is it reasonable

### The graph

### In your own words

In your book: write the routine in your own words as five steps, then solve this: a 400 kg motorbike (with its rider) has a driving force of 2400 N and 400 N of resistance. Find its acceleration and its speed after 5 s from rest.

## Elaborate: two-step problem

```step
stage: modify
tier: typical
insight: "Connecting a graph to the formulas in a third context checks the transfer."
check:
  type: number
  q: "A 60 kg sprinter reaches 9 m/s from rest in 3 s. What net force acts on the sprinter (N)?"
  answer: 180
  explain: "a = 9 ÷ 3 = 3 m/s². F = ma = 60 × 3 = 180 N."
```

## Elaborate: school zones

```step
stage: modify
tier: wider
insight: "A quantitative argument from stopping distances connects the laws to a real decision."
check:
  type: question
  q: "A car's stopping distance at 60 km/h is about 36 m, and at 40 km/h about 20 m. What is the best argument for a 40 km/h school-zone limit?"
  options: ["At the lower speed the car stops in much less distance, and the force on anyone it hits is smaller", "Cars go slowly so it is quieter", "Stopping distance goes down in proportion to speed, so the lower limit saves only a third of the distance"]
  answer: 0
  feedback: [null, "Noise isn't the safety argument.", "Check the numbers: 20 m is well under two thirds of 36 m. Stopping distance grows faster than speed."]
  explain: "A quantitative argument uses numbers: going 50% faster (60 instead of 40 km/h) takes nearly twice the distance to stop, and a faster car has more energy to lose."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the first step with the routine I used." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A routine: **list what you know, find the net force, use F = ma for acceleration, use a = Δv ÷ t for speed and time, then check** the answer is reasonable.
- Keep **units** with every number: N, kg, m/s², m/s, s.
- On a **speed–time graph**, the gradient is the acceleration.
- A negative acceleration means slowing down.
