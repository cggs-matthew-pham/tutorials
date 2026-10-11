---
order: 3
node: [AC9S8U05 n5, AC9S8U05 n6]
woven: [AC9S7I04]
unit: energy
title: Follow the energy
summary: "Real systems pass energy through many steps. A flow diagram follows it from start to end: a box for each stage, an arrow for each transfer or transformation, and side arrows for every by-product. Tracing all the outputs, useful and not, is how you find out where energy goes."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8285
  url: http://127.0.0.1:8285/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "A roller coaster with friction: the red bar grows as some of the car's energy becomes heat and sound along the track." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Following energy through a system"
  say: "Follow the energy step by step, and don't forget the by-products."
  clip:
    - caption: { text: "A real coaster has friction and air resistance.", say: "A real coaster has friction and air resistance." }
    - wait: 2400
    - click: "Play"
    - caption: { text: "Potential becomes kinetic, but some becomes heat and sound along the way.", say: "Potential becomes kinetic, and some becomes heat and sound on the way." }
    - wait: 4000
    - caption: { text: "That is why later hills must be lower: some energy has gone to the surroundings.", say: "That's why later hills are lower: some energy has gone to the surroundings." }
    - wait: 3600
hook: "A coaster's second hill is always lower than its first. Designers have no choice. Why?"
---
You can tell transfers from transformations. This lesson follows energy through whole systems.

## Engage: the second hill

```step
stage: predict
insight: "Students who expect the car to reach the same height again haven't counted the by-products; tracing all outputs is the node."
check:
  type: predict
  q: "A real coaster car starts at the top of a 30 m hill with no engine. Could the next hill also be 30 m tall?"
  options: ["No: some energy becomes heat and sound along the track, so it can't climb as high", "Yes: it has the same energy", "Yes, if it goes fast enough", "No: energy is used up by going downhill"]
  actual: "No. Friction and air resistance turn some of the car's energy into heat and sound on the way, so it has less to turn back into height. The energy isn't used up: it's in the surroundings."
```

## Explore: a coaster and a fire

```step
stage: run
insight: "The coaster shows by-products growing over a run; the fire-drill chain traces a five-stage system with a by-product at nearly every step."
try: { playground: board, starter: "boards.yml#coaster", height: 640 }
tasks:
  - starter: "boards.yml#coaster"
    check: { type: board, text: "Run the coaster with friction to the end. Watch the red bar.", when: "r >= 1" }
  - starter: "boards.yml#fire"
    check: { type: board, text: "Lighting a fire with a fire drill: complete the flow diagram, then Check.", when: "c = 1" }
```

### Coaster with friction

### A fire drill

People have made fire by spinning a stick against a piece of wood for many thousands of years, including many First Peoples of Australia.

## Explain: tracing systems

```step
stage: investigate
insight: "Naming the useful output and every by-product at each stage, and judging a diagram for completeness, is what a flow diagram is for."
tasks:
  - check:
      type: question
      q: "On the coaster, what did the red bar show?"
      options: ["Energy that became heat and sound because of friction and air resistance", "Energy that was destroyed", "The car's speed"]
      answer: 0
      feedback: [null, "The total line didn't move: nothing was destroyed.", "Speed shows in the orange (kinetic) bar."]
      explain: "By-product energy builds up as the car moves. It is still there, in the track, wheels and air."
  - check:
      type: sort
      q: "In a torch (battery, wires, bulb), useful output or by-product?"
      options: ["Useful output", "By-product"]
      items:
        - ["Light from the bulb", "Useful output"]
        - ["Heat from the bulb", "By-product"]
        - ["Heat in the battery and wires", "By-product"]
  - check:
      type: question
      q: "A student's flow diagram for a car: fuel (chemical) → engine → moving car (kinetic). What is missing?"
      options: ["By-products: heat from the engine and sound", "Nothing: it's complete", "A transfer arrow from the car to the fuel"]
      answer: 0
      feedback: [null, "Car engines get very hot: where did that energy come from?", "Energy doesn't flow backwards to the fuel."]
      explain: "A complete flow diagram accounts for every output. In a car engine most of the energy becomes heat."
  - check: { type: reflect, text: "I can trace energy through a system and draw a flow diagram that includes every by-product." }
```

### The red bar

### Useful or by-product

### What's missing

### In your own words

In your book: draw a flow diagram for the fire drill, from food to flame. Mark each arrow transfer or transformation, and add a side arrow for every by-product.

## Elaborate: from a dam to your lights

```step
stage: modify
tier: typical
insight: "A hydro-electric system links four stages and two by-products, the full multi-step trace."
try: { playground: board, starter: "boards.yml#hydro", height: 620 }
tasks:
  - check: { type: board, text: "Complete the flow from a dam to the lights at home, then Check.", when: "c = 1" }
  - check:
      type: question
      q: "Where in this system does energy end up as by-product heat?"
      options: ["Spread across every stage: the generator, the wires and the lights all give some off", "Only in the falling water", "Nowhere: hydro power is perfect"]
      answer: 0
      feedback: [null, "Falling water mostly makes the turbine spin.", "No real system is perfect: every stage gives off some heat."]
      explain: "Every stage gives off some, and the lights often give off the most. Year 9 measures how much with efficiency and Sankey diagrams."
```

### Dam to lights

### Where the heat goes

## Elaborate: the coaster that stops

```step
stage: modify
tier: wider
insight: "Following a system to the end shows where all the energy finally goes: heat in the surroundings."
check:
  type: question
  q: "If a coaster had no brakes and no engine and just kept rolling back and forth, where would all its energy end up?"
  options: ["As heat (and sound) in the track, the wheels and the air: the car stops in a dip", "Back as potential energy at the top", "Destroyed by friction"]
  answer: 0
  feedback: [null, "It can never climb back to the start: some energy leaves at every pass.", "Friction transforms energy; it doesn't destroy it."]
  explain: "Each pass turns more into heat and sound until the car rests in the lowest dip. The energy is all still there, spread out."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the second hill with what the coaster did." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Real systems pass energy through many stages: trace it one step at a time.
- A **flow diagram** has a box for each stage, an arrow for each transfer or transformation, and side arrows for **by-products**.
- Count every output, useful and by-product. By-products (mostly heat and sound) go to the surroundings; they are never destroyed.
