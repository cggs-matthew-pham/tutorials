---
order: 9
node: AC9S9U05 n2
unit: conservation
title: How much is useful?
summary: "Efficiency is the share of the energy put in that comes out as useful energy: efficiency = useful energy out ÷ total energy in × 100%. No real device is 100% efficient, because some energy always becomes by-products, usually heat. A device can give out more useful energy and still be less efficient."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8287
  url: http://127.0.0.1:8287/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "A filament bulb: of 100 J of electrical energy in, only 10 J comes out as light. 90 J becomes heat. Efficiency 10%." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Efficiency"
  say: "Efficiency is the useful energy out divided by the total energy in."
  clip:
    - caption: { text: "A filament bulb: 100 J of electrical energy in.", say: "A filament bulb takes in one hundred joules of electrical energy." }
    - wait: 3200
    - caption: { text: "Only 10 J comes out as light, the useful output. 90 J becomes heat.", say: "Only ten joules come out as light. Ninety joules become heat." }
    - wait: 3600
    - caption: { text: "Efficiency = 10 ÷ 100 = 10%. An LED bulb is about 40%.", say: "Efficiency is ten out of a hundred: ten percent. An LED is about forty." }
    - wait: 3200
hook: "Old filament light bulbs were banned in Australia from 2009. They worked fine. So why ban them?"
---
Energy is never lost. This lesson asks how much of it does what you want.

## Engage: two bulbs

```step
stage: predict
insight: "Students who judge efficiency by the amount of useful output, not the proportion, pick the big bulb; the ratio is the hinge."
check:
  type: predict
  q: "Bulb A takes in 100 J and gives out 10 J of light. Bulb B takes in 20 J and gives out 8 J of light. Which is more efficient?"
  options: ["Bulb B: 40% of its energy becomes light, against 10% for A", "Bulb A: it gives out more light", "They are the same", "You can't tell without knowing the heat"]
  actual: "Bulb B. Efficiency is a proportion: 8 ÷ 20 = 40% for B, 10 ÷ 100 = 10% for A. A gives out more light but wastes far more energy doing it."
```

## Explore: build the diagrams

```step
stage: run
insight: "Setting each output so the diagram balances makes students account for all the energy before the efficiency appears."
try: { playground: board, starter: "boards.yml#filament", height: 680 }
tasks:
  - starter: "boards.yml#filament"
    check: { type: board, text: "A filament bulb takes in 100 J and gives out 10 J of light. Set the outputs so every joule is accounted for.", when: "u = 10 and b = 1" }
  - starter: "boards.yml#led"
    check: { type: board, text: "An LED bulb takes in 100 J and gives out 40 J of light. Set its outputs.", when: "u = 40 and b = 1" }
```

### Filament bulb

Use the sliders or + and −. The board tells you when the outputs add up to the input.

### LED bulb

## Explain: calculating efficiency

```step
stage: investigate
insight: "Applying the formula in several contexts, then explaining why it can't reach 100% and why it's a proportion, is the node."
tasks:
  - check:
      type: question
      q: "Which is the formula for efficiency?"
      options: ["Useful energy out ÷ total energy in × 100%", "Total energy in ÷ useful energy out", "Useful energy out − wasted energy"]
      answer: 0
      feedback: [null, "That would give more than 100%.", "That's not a proportion."]
      explain: "Efficiency is the useful share of what goes in."
  - check:
      type: number
      q: "A kettle takes in 2000 J and 1800 J goes into heating the water. What is its efficiency (%)?"
      answer: 90
      explain: "1800 ÷ 2000 × 100% = 90%."
  - check:
      type: number
      q: "An electric motor takes in 500 J and does 150 J of useful work lifting a load. What is its efficiency (%)?"
      answer: 30
      explain: "150 ÷ 500 × 100% = 30%. The other 350 J becomes heat and sound."
  - check:
      type: question
      q: "Why can no real device be 100% efficient?"
      options: ["Some energy always becomes by-products, usually heat from friction and resistance", "Energy is destroyed in every device", "Devices wear out"]
      answer: 0
      feedback: [null, "Energy is never destroyed: it is transferred somewhere not useful.", "Wearing out is a different problem."]
      explain: "Every moving part and every wire turns a little energy into heat. Better design reduces it, but never to zero."
  - check: { type: reflect, text: "I can calculate efficiency and explain why it is always less than 100%." }
```

### The formula

### The kettle

### The motor

### Never 100%

### In your own words

In your book: work out the efficiency of each bulb you built. Then write one sentence explaining why a bulb that gives out more light can still be less efficient.

## Elaborate: a car engine

```step
stage: modify
tier: typical
insight: "A device with two by-products checks that every output is counted and that efficiency uses only the useful one."
try: { playground: board, starter: "boards.yml#engine", height: 680 }
tasks:
  - check: { type: board, text: "A car engine: 100 J of chemical energy in fuel gives 25 J of movement, 65 J of heat and 10 J of sound. Build its diagram.", when: "u = 25 and b = 1" }
  - check:
      type: number
      q: "What is the engine's efficiency (%)?"
      answer: 25
      explain: "25 ÷ 100 × 100% = 25%. Three quarters of the fuel's energy heats the engine, the exhaust and the air."
```

### The engine

### Its efficiency

## Elaborate: energy star ratings

```step
stage: modify
tier: wider
insight: "Energy ratings turn efficiency into a buying decision and connect it to cost and emissions."
check:
  type: question
  q: "Two fridges keep food equally cold. One has a 6-star energy rating and the other 3 stars. What does the extra efficiency mean?"
  options: ["The 6-star fridge needs less electrical energy for the same cooling, so it costs less to run and needs less electricity generated", "The 6-star fridge makes food colder", "Nothing: stars are about size"]
  answer: 0
  feedback: [null, "The cooling is the same; the energy needed is not.", "Energy ratings are about how much energy a model uses."]
  explain: "More efficient devices waste less energy as heat, so less energy has to be generated in the first place."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the two bulbs with the efficiencies I calculated." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Efficiency** = useful energy out ÷ total energy in × 100%.
- It is a **proportion**: a device that gives out more useful energy can still be less efficient.
- No real device is 100% efficient: some energy always becomes by-products, usually heat.
- More efficient devices need less energy input for the same job.
