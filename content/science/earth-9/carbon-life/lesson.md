---
order: 2
unit: carbon
title: Where does the carbon in a tree go?
summary: "Photosynthesis moves carbon from the atmosphere into living things; respiration and decomposition move it back. These huge flows nearly balance, so the air's CO₂ stays steady until something upsets them."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8231
  url: http://127.0.0.1:8231/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Photosynthesis and respiration"
  say: "Photosynthesis takes carbon from the air; respiration and decomposition return it."
  clip:
    - caption: { text: "Carbon flows between the air, living things and the oceans.", say: "Carbon flows between the air, living things and the oceans." }
    - wait: 2950
    - click: "Run 10 years"
    - wait: 1500
    - caption: { text: "In balance, as much leaves the air as enters it: CO₂ stays steady.", say: "In balance, as much carbon leaves the air as enters it." }
    - wait: 3280
    - click: "Photosynthesis: on"
    - click: "Run 10 years"
    - wait: 1500
    - caption: { text: "Switch off photosynthesis, and CO₂ builds up in the air.", say: "Switch off photosynthesis, and carbon dioxide builds up in the air." }
    - wait: 600
hook: "A big gum tree can weigh many tonnes. Almost all of that mass came out of the air."
---
You know the four spheres. This lesson follows carbon between two of them.

## Engage: where does a tree's mass come from?

```step
stage: predict
insight: "Students who think plants are built from soil miss photosynthesis as a carbon flow; the board's arrows show it."
check:
  type: predict
  q: "Where does most of the mass of a tree come from?"
  options: ["The soil", "Water alone", "Carbon dioxide from the air (plus water)", "Sunlight"]
  actual: "Carbon dioxide from the air. Photosynthesis joins carbon from CO₂ with water to make sugars, and the tree builds itself from them. Sunlight provides the energy, not the mass."
```

## Explore: switch the flows

```step
stage: run
insight: "Switching photosynthesis or respiration off in turn, and watching CO₂ in the air fall or rise, shows each as a directional flow between spheres."
try: { playground: board, starter: "boards.yml#cycle", height: 780 }
check: { type: board, text: "Make the CO₂ in the air fall, then make it rise, by switching processes on and off.", when: "u = 1 and v = 1" }
```

First press **Run 10 years** with everything on. Then switch **Respiration and decomposition** off and run again. Then switch it back on, switch **Photosynthesis** off, and run again. Press **Start again** whenever you like.

## Explain: two flows, opposite directions

```step
stage: investigate
insight: "Stating each process as a flow from one sphere to another, and seeing balance, is what the carbon cycle diagram needs."
tasks:
  - check:
      type: sort
      q: "Which way does each process move carbon?"
      options: ["Atmosphere → biosphere", "Biosphere → atmosphere"]
      items:
        - ["Photosynthesis", "Atmosphere → biosphere"]
        - ["A kangaroo breathing out", "Biosphere → atmosphere"]
        - ["Fungi rotting a fallen log", "Biosphere → atmosphere", "Decomposers respire: decomposition returns carbon to the air."]
        - ["A tree respiring at night", "Biosphere → atmosphere", "Plants respire too, day and night."]
        - ["Grass growing", "Atmosphere → biosphere"]
  - check:
      type: question
      q: "With every process on, why did the CO₂ in the air stay steady?"
      options: ["Carbon leaving the air (photosynthesis, oceans) equalled carbon entering it (respiration, decomposition, oceans)", "Nothing was happening", "Plants stopped photosynthesising", "The ocean stopped working"]
      answer: 0
      feedback: [null, "Look at the arrows: about 120 a year each way.", "They were still working: just balanced.", "It was on, balanced by other flows."]
  - check:
      type: question
      q: "If a large forest is cleared and burned, what happens to the carbon flows?"
      options: ["Less photosynthesis takes carbon out of the air, and burning and rotting put more in: CO₂ in the air rises", "Nothing changes", "CO₂ in the air falls", "The carbon disappears"]
      answer: 0
      feedback: [null, "Fewer trees, less photosynthesis.", "Which flow got smaller?", "Carbon is never destroyed: it moves."]
  - check: { type: reflect, text: "I can explain how photosynthesis and respiration move carbon between the atmosphere and biosphere, and what balance means." }
```

### Directions

### Balance

### Clearing a forest

### In your own words

In your book: draw the atmosphere and biosphere as boxes, with arrows for photosynthesis, respiration and decomposition, labelled with their direction.

## Elaborate: a carbon atom's journey

```step
stage: modify
tier: typical
insight: "Tracing one atom through a food chain connects the carbon cycle to food webs."
check:
  type: sort
  q: "Put a carbon atom's journey in order."
  options: ["1st", "2nd", "3rd", "4th", "5th"]
  items:
    - ["CO₂ in the air", "1st"]
    - ["Taken in by a grass leaf in photosynthesis", "2nd"]
    - ["Eaten by a kangaroo, part of its body", "3rd"]
    - ["The kangaroo dies and fungi decompose it", "4th"]
    - ["Respired by the fungi back into the air as CO₂", "5th"]
```

## Elaborate: seasons in the air

```step
stage: modify
tier: wider
insight: "Reading a real pattern as evidence of the photosynthesis–respiration balance applies the model."
check:
  type: question
  q: "Measurements of CO₂ in the air in the Northern Hemisphere dip every northern summer and rise every winter. Why?"
  options: ["In summer the huge northern forests photosynthesise more than they respire; in winter respiration and decomposition win", "The sun burns CO₂ in summer", "People burn less fuel in summer", "Oceans freeze in summer"]
  answer: 0
  feedback: [null, "The sun doesn't destroy CO₂.", "The pattern is far bigger than any change in fuel use.", "Oceans don't freeze in summer."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about a tree's mass with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Photosynthesis:** carbon moves from the **atmosphere** (CO₂) into the **biosphere** (sugars, then wood, leaves and animals).
- **Respiration** (plants, animals, decomposers) and **decomposition** move carbon back to the atmosphere.
- When the flows balance, CO₂ in the air stays steady; change one and the store changes.
