---
order: 1
node: AC9S9U03 n1
unit: carbon
title: What are Earth's spheres?
summary: "Earth can be described as four interacting spheres: the atmosphere (air), biosphere (living things), hydrosphere (water) and geosphere (rock, soil and magma). Many things sit where spheres meet."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8233
  url: http://127.0.0.1:8233/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "A landscape with things from all four spheres: air, living things, water and rock." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Earth's spheres"
  say: "Atmosphere, biosphere, hydrosphere and geosphere overlap and interact."
  clip:
    - caption: { text: "Air, living things, water and rock: Earth's four spheres.", say: "Air, living things, water and rock: Earth's four spheres." }
    - wait: 2620
    - click: { selector: "#board [fill=\"#3f8a3a\"]" }
    - click: "Biosphere"
    - caption: { text: "A tree is part of the biosphere.", say: "A tree is part of the biosphere." }
    - wait: 1960
    - click: { selector: "#board [fill=\"#2e6db8\"]" }
    - click: "Hydrosphere"
    - caption: { text: "The ocean is part of the hydrosphere.", say: "The ocean is part of the hydrosphere." }
    - wait: 1960
    - click: { selector: "#board [fill=\"#7a5636\"]" }
    - caption: { text: "Soil sits where spheres meet: rock, water, air and living things.", say: "Soil sits where spheres meet: rock, water, air and living things." }
    - wait: 600
hook: "A single bushfire involves all of Earth: burning trees, smoke in the air, ash washed into rivers and scorched soil. Scientists use four 'spheres' to keep track of it."
---
To follow carbon around the Earth, you first need a map of where it can be.

## Engage: which sphere?

```step
stage: predict
insight: "Students often treat the spheres as separate boxes; asking about soil shows things can belong to two."
check:
  type: predict
  q: "Soil is made of broken-down rock, water, air and living things. Which sphere is it part of?"
  options: ["Geosphere only", "Biosphere only", "More than one: it's where spheres meet", "None of them"]
  actual: "More than one. Soil is mostly broken rock (geosphere) full of living things and their remains (biosphere), with water and air in its gaps. The spheres overlap and interact."
```

## Explore: sort the landscape

```step
stage: run
insight: "Placing ten everyday things into spheres, some in two, builds the framework the carbon cycle hangs on."
try: { playground: board, starter: "boards.yml#scene", height: 640 }
check: { type: board, text: "Place all ten things in the picture into their sphere.", when: "n = k" }
```

Click something in the picture, then choose its sphere.

## Explain: four spheres, one system

```step
stage: investigate
insight: "Naming each sphere's contents and processes, and seeing that processes cross spheres, is the hinge for the carbon cycle."
tasks:
  - check:
      type: match
      q: "Match each sphere to what it contains."
      pairs:
        - ["Atmosphere", "The layer of gases around Earth"]
        - ["Biosphere", "All living things"]
        - ["Hydrosphere", "All water: oceans, rivers, ice, vapour"]
        - ["Geosphere", "Rock, soil, minerals and magma"]
  - check:
      type: question
      q: "A tree takes in carbon dioxide and water to grow. Which spheres does this connect?"
      options: ["Atmosphere (CO₂), hydrosphere (water) and biosphere (the tree)", "Only the biosphere", "Only the atmosphere", "Geosphere and atmosphere"]
      answer: 0
      feedback: [null, "Where do the CO₂ and water come from?", "The tree is part of it too.", "The tree is living: biosphere."]
  - check: { type: reflect, text: "I can name the four spheres, give an example from each, and describe a process that crosses between spheres." }
```

### Contents

### Interactions

### In your own words

In your book: draw a quick landscape and label one thing in each sphere, and one thing where two spheres meet.

## Elaborate: a rain event

```step
stage: modify
tier: typical
insight: "Following one event across spheres shows Earth working as a system."
check:
  type: sort
  q: "A storm rolls in over farmland. Which sphere is each part mainly about?"
  options: ["Atmosphere", "Biosphere", "Hydrosphere", "Geosphere"]
  items:
    - ["Wind and falling air pressure", "Atmosphere"]
    - ["Rain filling the creek", "Hydrosphere"]
    - ["Topsoil washed off a paddock", "Geosphere"]
    - ["Crops growing faster after the rain", "Biosphere"]
```

## Elaborate: managing interactions

```step
stage: modify
tier: wider
insight: "Seeing land management as deliberately changing sphere interactions extends the framework to people."
check:
  type: question
  q: "For tens of thousands of years, many First Nations peoples have used small, cool fires to manage Country. Which spheres does a cool burn involve?"
  options: ["All four: plants burn (biosphere), smoke and CO₂ enter the air (atmosphere), soil is warmed and enriched (geosphere), and later rain and regrowth (hydrosphere, biosphere)", "Only the biosphere", "Only the atmosphere", "None: fire isn't part of the spheres"]
  answer: 0
  feedback: [null, "What else happens besides the plants burning?", "The plants and soil are involved too.", "Fire moves matter between all of them."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about soil with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Atmosphere:** air. **Biosphere:** living things. **Hydrosphere:** water. **Geosphere:** rock, soil, magma.
- Many things sit where spheres meet (soil, clouds), and processes move matter between spheres.
- Earth works as one system of interacting spheres.
