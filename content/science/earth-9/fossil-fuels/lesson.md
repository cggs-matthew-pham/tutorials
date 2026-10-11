---
order: 4
node: AC9S9U03 n4
unit: carbon
title: What does burning fossil fuels do to the carbon cycle?
summary: "Fossil fuels are carbon taken out of the cycle and stored in the geosphere over millions of years. Burning them returns it to the atmosphere in years, faster than plants and oceans can take it back, so CO₂ in the air rises."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8232
  url: http://127.0.0.1:8232/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Burning fossil fuels"
  say: "Burning moves carbon stored over millions of years into the air in years."
  clip:
    - caption: { text: "Fossil fuels store carbon locked away over millions of years.", say: "Fossil fuels store carbon locked away over millions of years." }
    - wait: 2950
    - click: { selector: "#cbn" }
    - caption: { text: "Burning about 10 billion tonnes a year puts it back into the air.", say: "Burning about ten billion tonnes a year puts it back into the air." }
    - wait: 3940
    - click: "Run 50 years"
    - wait: 2000
    - caption: { text: "Oceans and plants take up part; the rest builds up, so CO₂ rises.", say: "Oceans and plants take up part; the rest builds up, so carbon dioxide rises." }
    - wait: 600
hook: "Coal is a forest from 300 million years ago. Burning it takes seconds."
---
Photosynthesis and respiration balance. This lesson: what happens when a new flow joins in.

## Engage: small next to big?

```step
stage: predict
insight: "Students who compare human emissions (about 10) with natural flows (about 120) conclude they can't matter; the board shows the natural flows balance and the extra accumulates."
check:
  type: predict
  q: "Plants take about 120 billion tonnes of carbon out of the air each year. Burning fossil fuels adds about 10. What do you predict happens to the CO₂ in the air?"
  options: ["Nothing: 10 is tiny next to 120", "It rises: the natural flows balance each other, so the extra 10 builds up", "It falls", "It rises by exactly 10 every year"]
  actual: "It rises. The 120 out is matched by about 120 back in, so the extra 10 has nowhere to go except partly into the oceans and plants. Roughly half stays in the air."
```

## Explore: burn for 50 years

```step
stage: run
insight: "Running decades of combustion against a balanced cycle shows the air's store growing, while oceans and plants take up only part."
try: { playground: board, starter: "boards.yml#burn", height: 800 }
check: { type: board, text: "Burn fossil fuels and run the years until CO₂ in the air passes 330 ppm.", when: "c >= 5 and a >= 330" }
```

Set **Burning** to about today's rate (10), then **Run 50 years**. Watch the fossil fuel store, the air, and the oceans and living things.

## Explain: from the geosphere to the air

```step
stage: investigate
insight: "Connecting the timescale of storage with the speed of release explains why combustion is a net addition."
tasks:
  - check:
      type: question
      q: "Where is the carbon in coal, oil and gas stored before it is burned?"
      options: ["In the geosphere: plants and tiny sea creatures buried millions of years ago", "In the atmosphere", "In the oceans", "Nowhere: burning creates carbon"]
      answer: 0
      feedback: [null, "It was taken out of the air long ago, then buried.", "It is dissolved there only after being released.", "Burning moves carbon; it never creates it."]
  - check:
      type: question
      q: "Why does burning fossil fuels raise CO₂ in the air, when natural flows are so much bigger?"
      options: ["It releases in years carbon that took millions of years to store, and the natural flows were already balanced", "Fossil fuel carbon is a different kind of carbon", "It stops photosynthesis", "It doesn't: the rise is natural"]
      answer: 0
      feedback: [null, "Carbon is carbon; the problem is the extra amount.", "Plants keep photosynthesising, even a little more.", "The board's rise started only when burning started."]
  - check:
      type: number
      q: "On the board, about what fraction of the carbon burned ended up staying in the air? (Enter a percentage.)"
      answer: 60
      tolerance: 20
      explain: "In the model, roughly 60%; the rest was taken up by the oceans and by plants. In the real world, about 45% of each year's emissions stays in the air."
  - check: { type: reflect, text: "I can explain how burning fossil fuels moves carbon from the geosphere to the air, and why it adds to the air's store." }
```

### Where it was

### Why it adds up

### Where it went

### In your own words

In your book: add a fossil fuels box and a burning arrow to your carbon cycle diagram, and write one sentence about the timescales.

## Elaborate: starting from today

```step
stage: modify
tier: typical
insight: "Trying lower burning rates from today's 420 ppm shows what would steady the air's CO₂."
try: { playground: board, starter: "boards.yml#today", height: 800 }
tasks:
  - check: { type: board, text: "Starting from today, find a burning rate that keeps CO₂ in the air steady (changing by less than 2.5 ppm in 10 years).", when: "s = 1" }
  - check:
      type: question
      q: "What did you have to do to keep the air's CO₂ steady?"
      options: ["Cut burning to only what the oceans and plants can take up: much less than today", "Nothing", "Burn more", "Switch off photosynthesis"]
      answer: 0
      feedback: [null, "At today's rate it kept rising.", "More burning made it rise faster.", "That makes CO₂ rise."]
```

### Steady

### What it took

## Elaborate: a cool burn and a coal fire

```step
stage: modify
tier: wider
insight: "Comparing a fire whose carbon regrows with one whose carbon was locked away for millions of years sharpens the idea of a net addition."
check:
  type: question
  q: "A cool burn of grassland and burning coal both release CO₂. Why do they affect the carbon cycle differently over decades?"
  options: ["Grass regrows within a year or two, taking the carbon back; coal's carbon was locked away for millions of years and won't return soon", "Grass smoke has no carbon", "Coal releases oxygen", "There's no difference"]
  answer: 0
  feedback: [null, "Grass smoke contains CO₂ too.", "Burning uses oxygen and releases CO₂.", "The timescales are very different."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first prediction about the extra 10 billion tonnes with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Fossil fuels** are carbon stored in the **geosphere** over millions of years.
- **Combustion** moves it to the **atmosphere** in years: a new flow added to a balanced cycle.
- Oceans and plants take up part of it (in the real world a bit over half); the rest builds up, so **CO₂ in the air rises** (280 ppm before 1800, about 420 ppm today).
