---
order: 2
node: AC9S9U03 n2
unit: carbon
title: Where is all the carbon?
summary: "Carbon is stored in every one of Earth's spheres: as carbon dioxide in the air, dissolved in the oceans, in living things and soil, and in fossil fuels and rocks. Carbon is never made or destroyed; it moves between these stores, and the carbon cycle is the map of those moves."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8275
  url: http://127.0.0.1:8275/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Carbon stores"
  say: "Carbon is stored in every sphere and moves between the stores."
  clip:
    - caption: { text: "Four stores of carbon: the air, living things and soil, the oceans, fossil fuels.", say: "Four stores: the air, living things and soil, the oceans, and fossil fuels." }
    - wait: 3600
    - caption: { text: "The arrows are flows: carbon moving between stores each year.", say: "The arrows are flows: carbon moving between stores each year." }
    - wait: 2600
    - click: "Run 10 years"
    - caption: { text: "Carbon moves, but none is made or destroyed. The total stays the same.", say: "Carbon moves around, but none is made or destroyed." }
    - wait: 4200
hook: "The carbon atoms in your body have been in dinosaurs, in ocean water and in the air, many times over. They are billions of years old and still in use."
---
Last lesson: Earth has four spheres. This lesson follows one substance through all of them: carbon.

## Engage: the biggest store

```step
stage: predict
insight: "Students picture carbon mostly in the air (because of climate news) or in living things; the oceans and rocks are the surprise."
check:
  type: predict
  q: "Which of these holds the most carbon?"
  options: ["The oceans", "The air", "All living things on land", "Coal, oil and gas"]
  actual: "The oceans, by far: about 38 000 billion tonnes, roughly 50 times what is in the air. (Rocks such as limestone hold even more, but that carbon moves very slowly.)"
```

## Explore: the stores and the flows

```step
stage: run
insight: "Running the cycle and seeing stores barely change while large flows move carbon each year separates 'store' from 'flow' and shows carbon is conserved."
try: { playground: board, starter: "boards.yml#cycle", height: 720 }
check: { type: board, text: "Run 10 years with every process on. Does the carbon in the air change much?", when: "y >= 10 and s = 1" }
```

Each box is a **store** (how much carbon is there); each arrow is a **flow** (how much moves each year). Press **Run 10 years** and watch the stores.

## Explain: stores in every sphere

```step
stage: investigate
insight: "Placing each store in a sphere and naming its form (gas, dissolved, living, fossil, rock), then stating conservation, is the node."
tasks:
  - check:
      type: sort
      q: "Which sphere is each carbon store in?"
      options: ["Atmosphere", "Hydrosphere", "Biosphere", "Geosphere"]
      items:
        - ["Carbon dioxide in the air", "Atmosphere"]
        - ["Carbon dioxide dissolved in sea water", "Hydrosphere"]
        - ["Carbon in trees and animals", "Biosphere"]
        - ["Dead leaves and roots in soil", "Biosphere", "Soil is where biosphere and geosphere meet; the dead plant matter counts as biosphere here."]
        - ["Coal, oil and natural gas", "Geosphere"]
        - ["Limestone (calcium carbonate) rock", "Geosphere"]
  - check:
      type: question
      q: "What is the difference between a carbon store and a carbon flow?"
      options: ["A store is where carbon is kept; a flow is carbon moving from one store to another each year", "They mean the same thing", "Stores are in the air; flows are in the ocean"]
      answer: 0
      feedback: [null, "One is an amount, the other is a movement.", "Every sphere has stores, and flows join them."]
      explain: "Stores are measured in tonnes of carbon; flows in tonnes a year. Photosynthesis is a flow from air to living things."
  - check:
      type: question
      q: "When a log burns, what happens to its carbon?"
      options: ["It moves into the air as carbon dioxide: the same atoms, in a different store", "It is destroyed by the fire", "It turns into energy"]
      answer: 0
      feedback: [null, "Atoms aren't destroyed in reactions.", "Energy is released, but the carbon atoms stay as carbon atoms."]
      explain: "Carbon is never made or destroyed. Burning moves it from the biosphere to the atmosphere."
  - check:
      type: question
      q: "The air's carbon stayed steady on the board, even though more than a hundred billion tonnes moved in and out each year. Why?"
      options: ["The flows into the air and out of it were balanced", "Nothing was really moving", "The board stops the air changing"]
      answer: 0
      feedback: [null, "The arrows show large yearly flows.", "Switch a process off and it changes (next lesson)."]
      explain: "A store stays the same when what flows in equals what flows out, like a bath with the tap on and the plug out."
  - check: { type: reflect, text: "I can name carbon stores in each of Earth's spheres and explain that carbon moves between them without being made or destroyed." }
```

### Which sphere

### Store or flow

### A burning log

### Steady

### In your own words

In your book: draw the four spheres as four boxes. In each, write at least one carbon store. Draw arrows for two flows you know, and label each.

## Elaborate: carbon in the landscape

```step
stage: modify
tier: typical
insight: "Placing real things into spheres checks that students can find carbon stores in a familiar scene."
try: { playground: board, starter: "boards.yml#spheres", height: 720 }
tasks:
  - check: { type: board, text: "Place everything in the landscape into its sphere.", when: "n = k" }
  - check:
      type: question
      q: "Which of these things in a landscape store carbon?"
      options: ["Trees, soil, the sea, the air and limestone cliffs: every sphere", "Only the trees", "Only the air"]
      answer: 0
      feedback: [null, "The sea, soil, air and rocks store carbon too.", "Carbon is in all four spheres."]
      explain: "Carbon is everywhere: it is part of every living thing, dissolved in water, in the air, and locked in rocks."
```

### The landscape

### Carbon everywhere

## Elaborate: shells to stone

```step
stage: modify
tier: wider
insight: "Limestone made from shells links the biosphere, hydrosphere and geosphere and shows a store that changes over millions of years."
try: { playground: board, starter: "boards.yml#cycle", height: 720 }
tasks:
  - check: { type: board, text: "Run 50 years with every process on.", when: "y >= 50" }
  - check:
      type: question
      q: "Sea creatures take carbon dissolved in water to build shells of calcium carbonate. When they die, the shells pile up and, over millions of years, become limestone. Which stores has that carbon moved through?"
      options: ["Hydrosphere → biosphere → geosphere", "Atmosphere → atmosphere", "Geosphere → hydrosphere → biosphere"]
      answer: 0
      feedback: [null, "It started dissolved in sea water.", "That's the reverse order."]
      explain: "Rocks such as limestone are the largest carbon store of all, but their carbon moves out very slowly, mostly over millions of years."
```

### Fifty years

### Shells to stone

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my guess about the biggest carbon store with the board." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Carbon is stored in every sphere: **atmosphere** (carbon dioxide), **hydrosphere** (dissolved in the oceans), **biosphere** (living things, dead matter, soil) and **geosphere** (fossil fuels, limestone and other rocks).
- The oceans hold far more than the air; rocks hold the most of all.
- Carbon is never made or destroyed. It **flows** between stores: the **carbon cycle** is the map of those flows.
- A store stays steady when the flows into it balance the flows out.
