---
order: 3
unit: foodwebs
title: Who eats whom?
summary: A food web joins all the food chains in an ecosystem. Arrows point the way energy flows, from the food to the eater. Every organism is a producer, a consumer or a decomposer, and decomposers include microorganisms.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8209
  url: http://127.0.0.1:8209/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Arrows in a food web"
  say: "Arrows in a food web point the way energy flows, from food to eater."
  clip:
    - caption: { text: "A kangaroo eats grass. Click the food, then the eater.", say: "A kangaroo eats grass. Click the food first, then the eater." }
    - click: "Grass"
    - click: "Kangaroo"
    - caption: { text: "The arrow points from grass to kangaroo: the energy goes into the kangaroo.", say: "The arrow points from the grass to the kangaroo, the way the energy goes." }
    - click: "Kangaroo"
    - click: "Dingo"
    - caption: { text: "A dingo eats kangaroos: kangaroo → dingo.", say: "A dingo eats kangaroos, so the next arrow points from kangaroo to dingo." }
    - wait: 1000
hook: "A kookaburra eats lizards, grasshoppers, even small snakes. A food chain can only show one of those meals. How do you show all of them?"
---
Food chains are a start. This lesson builds the whole web.

## Engage: which way do arrows go?

```step
stage: predict
insight: "Students often draw arrows from eater to food ('eats'); committing first makes the energy-flow convention stick."
check:
  type: predict
  q: "In a food web, grass is eaten by a grasshopper. Which way should the arrow point?"
  options: ["From the grasshopper to the grass (the grasshopper eats it)", "From the grass to the grasshopper (energy goes into the grasshopper)", "Either way, as long as it's labelled"]
  actual: "From the grass to the grasshopper. Arrows show the way energy flows: from the food into the eater."
```

## Explore: build a bush food web

```step
stage: run
insight: "Drawing each link, with wrong-way arrows flagged, builds the web structure and the arrow convention together."
try: { playground: board, starter: "boards.yml#bush", height: 600 }
check: { type: board, text: "Draw every feeding link, each arrow from the food to the eater.", when: "c = k and x = 0" }
```

Click a **food**, then the organism that **eats** it. The board tells you how many links there are. Don't forget the **decomposers**: what do fungi and bacteria feed on?

## Explain: roles in the web

```step
stage: investigate
insight: "Assigning every organism a role, including microorganisms as decomposers, is the node's checkpoint."
tasks:
  - check:
      type: sort
      q: "What is each organism's role in the bush web?"
      options: ["Producer", "Primary consumer", "Secondary consumer", "Decomposer"]
      items:
        - ["Grass", "Producer", "It makes its own food using sunlight."]
        - ["Grasshopper", "Primary consumer", "It eats a producer."]
        - ["Kangaroo", "Primary consumer"]
        - ["Lizard", "Secondary consumer", "It eats a primary consumer."]
        - ["Dingo", "Secondary consumer"]
        - ["Fungi and bacteria", "Decomposer", "They break down dead grass, dead dingoes and droppings."]
  - check:
      type: question
      q: "The kookaburra eats both lizards and grasshoppers. What does that make it?"
      options: ["A secondary consumer when it eats grasshoppers, and a tertiary consumer when it eats lizards", "A producer", "A primary consumer"]
      answer: 0
      feedback: [null, "It can't make its own food.", "It doesn't eat plants."]
      explain: "In a web, one animal can feed at more than one level."
  - check:
      type: question
      q: "Why do decomposers belong in a food web?"
      options: ["They feed on dead organisms and wastes from every level, returning nutrients to the soil", "They don't; only animals that hunt belong", "They make food from sunlight"]
      answer: 0
      feedback: [null, "Without decomposers, dead matter would pile up and plants would run out of nutrients.", "That's what producers do."]
  - check: { type: reflect, text: "I can name the producer, consumers and decomposers in a food web, and say which way the arrows point and why." }
```

### Roles

### More than one level

### Decomposers

### In your own words

In your book: copy the bush web, with every arrow, and label each organism's role.

## Elaborate: chain or web?

```step
stage: modify
tier: typical
insight: "Comparing the simpler model with the fuller one shows what each representation keeps and loses."
check:
  type: question
  q: "The food chain grass → grasshopper → lizard → kookaburra is part of the web. What does the chain leave out?"
  options: ["Other foods each animal eats, and other animals that eat the same food", "Nothing: a chain and a web show the same thing", "The direction of energy flow"]
  answer: 0
  feedback: [null, "The web shows the kookaburra eating grasshoppers too, and kangaroos eating grass.", "Chains have arrows too."]
  explain: "A chain shows one path. A web shows every path, which is why it can predict what happens when one population changes."
```

## Elaborate: an Antarctic web

```step
stage: modify
tier: wider
insight: "Building a second, unfamiliar web (marine) tests the structure rather than a memorised example."
try: { playground: board, starter: "boards.yml#sea", height: 600 }
check: { type: board, text: "Build the Antarctic food web. Phytoplankton are tiny drifting producers; krill eat them; the rest you can work out from the list.", when: "c = k and x = 0" }
```

Krill eat phytoplankton. Small fish eat krill. Squid eat small fish and krill. Penguins eat small fish, krill and squid. Leopard seals eat penguins and small fish. Bacteria break down dead phytoplankton and dead leopard seals.

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about arrow direction with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **food web** joins all the food chains in an ecosystem.
- **Arrows point the way energy flows**: from the food to the eater.
- **Producers** make their own food; **consumers** eat other organisms (primary, secondary…); **decomposers** (fungi and bacteria, microorganisms) break down dead matter and wastes.
- One animal can feed at more than one level.
