---
order: 4
unit: foodwebs
title: Where does the energy go?
summary: "Energy enters a food web as sunlight captured by producers and flows one way along the arrows. At each step only about 10% is passed on; the rest is used for living or lost as heat. Matter is different: decomposers return it to be used again."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8210
  url: http://127.0.0.1:8210/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "About 10% of the energy passes to each level: 20,000 kJ in the phytoplankton, 20 kJ in the penguin." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Energy along a food chain"
  say: "Only about a tenth of the energy passes to each level."
  clip:
    - caption: { text: "Phytoplankton capture 20,000 kJ from sunlight.", say: "Phytoplankton capture twenty thousand kilojoules from sunlight." }
    - click: "Phytoplankton"
    - click: "Krill"
    - caption: { text: "Krill get about 10%: 2,000 kJ. The rest is used for living or lost as heat.", say: "Krill get about ten percent; the rest is used for living or lost as heat." }
    - click: "Fish"
    - click: "Penguin"
    - expect: { selector: "body", contains: "20 kJ" }
    - caption: { text: "Each step keeps about 10%: the penguin gets only 20 kJ.", say: "Each step keeps about ten percent, so the penguin gets only twenty kilojoules." }
    - wait: 800
hook: "A field of grass can feed many grasshoppers, which feed fewer lizards, which feed a couple of kookaburras, which feed perhaps one eagle. Why the shrinking numbers?"
---
Last lesson: the arrows. This lesson: what travels along them, and how much arrives.

## Engage: how much gets through?

```step
stage: predict
insight: "Students who think energy is passed on whole (or recycled) will choose those options; the trace makes the 90% loss visible."
check:
  type: predict
  q: "Grass captures 10 000 kJ of energy from sunlight. A grasshopper eats grass, a lizard eats grasshoppers, a kookaburra eats lizards. About how much of that energy reaches the kookaburra?"
  options: ["Almost all of it, 10 000 kJ", "About half", "About 10 kJ", "It goes round and comes back to the grass"]
  actual: "About 10 kJ. Roughly 90% is used or lost as heat at each step, so only about 10% passes on: 10 000 → 1 000 → 100 → 10."
```

## Explore: follow the energy

```step
stage: run
insight: "Tracing a chain click by click, with the energy shrinking at each level, connects arrows to energy flow and loss."
try: { playground: board, starter: "boards.yml#trace", height: 600 }
check: { type: board, text: "Trace a food chain of at least four organisms, from a producer to the top.", when: "l >= 4" }
```

Click a **producer**, then follow the arrows up, one organism at a time. Watch the energy under each organism.

## Explain: flow, loss and cycling

```step
stage: investigate
insight: "Stating the one-way flow with losses, then contrasting it with matter cycling, stops the 'energy is recycled' error that breaks node 4 predictions."
tasks:
  - check:
      type: number
      q: "A lizard gets 100 kJ from the grasshoppers it eats. About how much reaches a kookaburra that eats the lizard, in kJ?"
      answer: 10
      explain: "About 10% passes on: 100 × 0.1 = 10 kJ."
  - check:
      type: sort
      q: "Where does the other 90% go at each step?"
      options: ["Lost from the food web", "Passed to the next level"]
      items:
        - ["Heat given off by the animal's body", "Lost from the food web"]
        - ["Energy used for moving, breathing and keeping warm", "Lost from the food web"]
        - ["Parts not eaten (bones, fur, roots)", "Lost from the food web", "These go to decomposers, not up the chain."]
        - ["Energy stored in the eaten animal's body", "Passed to the next level"]
  - check:
      type: question
      q: "Which statement is true?"
      options: ["Energy flows one way through a web and is lost as heat; matter (the atoms) is recycled by decomposers", "Energy and matter are both recycled", "Energy is recycled by decomposers; matter is lost"]
      answer: 0
      feedback: [null, "Decomposers recycle the atoms (matter). Energy leaves as heat and must keep coming in as sunlight.", "It's the other way round."]
      explain: "That's why every food web needs a constant supply of sunlight, but no new atoms."
  - check: { type: reflect, text: "I explained why only a small part of the energy reaches the top of a food chain, and how energy differs from matter." }
```

### Down the levels

### Where it goes

### Energy and matter

### In your own words

In your book: explain why energy flows but matter cycles in an ecosystem.

## Elaborate: why so few eagles?

```step
stage: modify
tier: typical
insight: "Connecting energy loss to population size explains why top predators are rare, the link to node 4."
check:
  type: question
  q: "Why are there far fewer wedge-tailed eagles than grasshoppers in an ecosystem?"
  options: ["So little energy reaches the top of the food chain that it can only support a few large predators", "Eagles have fewer babies", "Grasshoppers are easier to see"]
  answer: 0
  feedback: [null, "Breeding matters, but the limit is the energy available at the top.", "That's about counting, not about how many there are."]
  explain: "Each level up gets about a tenth of the energy, so it can support far fewer organisms."
```

## Elaborate: a desert and a rainforest

```step
stage: modify
tier: wider
insight: "Comparing two ecosystems' energy input applies the flow principle to ecosystem structure."
check:
  type: question
  q: "A rainforest's plants capture far more energy each year than a desert's. What would you predict about their food webs?"
  options: ["The rainforest can support more organisms and more levels of consumers", "They would be the same size", "The desert would have more top predators"]
  answer: 0
  feedback: [null, "More energy captured at the bottom means more available at every level.", "Less energy at the bottom means less at the top."]
  explain: "Energy captured by producers sets the size of everything above them."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the kookaburra's energy with what the board showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Energy** enters as sunlight captured by producers and **flows one way** along the arrows.
- At each step only about **10%** is passed on; about **90%** is used for living or lost as **heat**.
- That's why there are **few top predators**.
- **Matter cycles**: decomposers return atoms to the soil and air, and producers use them again. Energy does not cycle.
