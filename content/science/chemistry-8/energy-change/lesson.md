---
order: 9
node: [AC9S8U07 n4, AC9S8U07 n5]
unit: changes
title: Hotter or colder?
summary: "Some reactions give out energy to their surroundings, so the surroundings get hotter: they are exothermic (burning, respiration, hand warmers). Others take in energy, so the surroundings get colder: they are endothermic (instant ice packs, photosynthesis, cooking)."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8280
  url: http://127.0.0.1:8280/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Hydrogen and oxygen reacting: each reaction gives out energy, so the particles speed up and the temperature rises. Exothermic." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Exothermic and endothermic"
  say: "Exothermic reactions give out energy; endothermic reactions take it in."
  clip:
    - caption: { text: "Hydrogen and oxygen react to make water. Watch the temperature.", say: "Hydrogen and oxygen react to make water. Watch the temperature." }
    - wait: 3200
    - caption: { text: "Each reaction gives out energy: the particles speed up and it gets hotter.", say: "Each reaction gives out energy, so the particles speed up: hotter." }
    - wait: 3800
    - caption: { text: "Energy out to the surroundings: exothermic. Energy in: endothermic, and it gets colder.", say: "Energy out is exothermic. Energy in is endothermic, and it gets colder." }
    - wait: 1200
hook: "Snap an instant ice pack and it goes freezing cold. Shake a hand warmer and it gets hot. Neither is plugged in. Where does the heat go, and where does it come from?"
---
A temperature change is one sign of a chemical change. This lesson asks which way, and why.

## Engage: the ice pack

```step
stage: predict
insight: "Students often think cold is something added ('cold energy'); the endothermic idea needs energy taken in from the surroundings."
check:
  type: predict
  q: "An instant ice pack contains two chemicals that react when you snap it. It goes cold. What is happening?"
  options: ["The reaction takes in energy from the pack and your hand", "The reaction makes 'cold', which flows into your hand", "The chemicals were stored in a freezer", "The reaction gives out energy, so the pack cools down"]
  actual: "The reaction takes in energy from its surroundings (the pack, the air, your hand), so they get colder. A reaction that takes in energy is endothermic. There is no 'cold energy': cold just means less thermal energy."
```

## Explore: hotter and colder

```step
stage: run
insight: "Watching the temperature rise in one reaction and fall in another, with the same kind of particle model, makes the direction of energy transfer the difference."
try: { playground: science, starter: "boards.yml#exo", height: 520 }
tasks:
  - starter: "boards.yml#exo"
    check: { type: board, text: "Run the hydrogen and oxygen reaction. Note the temperature before and after.", expect: { done: true } }
  - starter: "boards.yml#endo"
    check: { type: board, text: "Now nitrogen and oxygen at 600 K (inside a hot engine). Note the temperature before and after.", expect: { done: true } }
```

### Energy out

The temperature is under the board.

### Energy in

This reaction only goes when it's hot already: it needs energy to keep going.

## Explain: exothermic and endothermic

```step
stage: investigate
insight: "Naming the two directions of energy transfer and sorting everyday reactions by them is the node; 'the surroundings' is the word that makes it precise."
tasks:
  - check:
      type: question
      q: "In an exothermic reaction, where does the energy go?"
      options: ["Out to the surroundings, so they get hotter", "Into the reaction mixture, so it gets colder", "It is destroyed"]
      answer: 0
      feedback: [null, "That's endothermic.", "Energy is never destroyed; it moves."]
      explain: "Exo = out. Energy stored in the reactants is released to the surroundings."
  - check:
      type: sort
      q: "Exothermic or endothermic?"
      options: ["Exothermic (gets hotter)", "Endothermic (gets colder)"]
      items:
        - ["Wood burning", "Exothermic (gets hotter)"]
        - ["Respiration in your cells", "Exothermic (gets hotter)", "That's how you stay at 37 °C."]
        - ["A hand warmer (iron rusting quickly)", "Exothermic (gets hotter)"]
        - ["An instant ice pack", "Endothermic (gets colder)"]
        - ["Photosynthesis (taking in light energy)", "Endothermic (gets colder)", "It takes in energy from sunlight to make glucose."]
        - ["Bicarb soda reacting with vinegar and fizzing", "Endothermic (gets colder)", "Feel the cup: it cools a little."]
  - check:
      type: question
      q: "On the board, the nitrogen and oxygen only reacted at 600 K, and the temperature fell. Why might an endothermic reaction stop on its own?"
      options: ["It takes in energy and cools its surroundings, so fewer collisions have enough energy to react", "It runs out of atoms", "Endothermic reactions are always slow"]
      answer: 0
      feedback: [null, "The atoms are all still there.", "Some endothermic reactions are fast; it's the cooling that slows them."]
      explain: "Unless energy keeps coming in (a hot engine, sunlight for photosynthesis), an endothermic reaction cools itself down."
  - check:
      type: question
      q: "Burning gas in a stove gives out a lot of energy. Where was that energy before?"
      options: ["Stored in the gas and oxygen (chemical energy), released as their atoms rearrange into new particles", "In the match or spark that lit it", "In the air around the flame", "Nowhere: burning makes new energy"]
      answer: 0
      feedback: [null, "The spark only starts it. The flame goes on giving out far more energy than the spark ever had.", "The air gets hotter: it receives the energy, it isn't where the energy came from.", "Energy is never made or destroyed. It was stored in the chemicals all along."]
      explain: "A fuel and oxygen together store chemical energy. In an exothermic reaction their atoms rearrange into new particles that store less, and the difference is given out to the surroundings."
  - check: { type: reflect, text: "I can explain exothermic and endothermic reactions as energy given out or taken in, with an example of each." }
```

### Energy out

### Sort them

### Stopping on its own

### Where the energy comes from

### In your own words

In your book: draw two thermometers, one for an exothermic and one for an endothermic reaction, with arrows showing which way energy moves between the reaction and its surroundings. Add an example under each.

## Elaborate: hand warmers and ice packs

```step
stage: modify
tier: typical
insight: "Matching a reaction's energy direction to a product's job turns the idea into design reasoning."
try: { playground: science, starter: "boards.yml#exo", height: 520 }
tasks:
  - check: { type: board, text: "Run the exothermic reaction again.", expect: { done: true } }
  - check:
      type: question
      q: "A sports trainer needs something to reduce swelling on a sprained ankle, at a game far from a freezer. Which product, and why?"
      options: ["An instant ice pack: its endothermic reaction takes energy from the ankle", "A hand warmer: its reaction is exothermic", "Either: both change temperature"]
      answer: 0
      feedback: [null, "Warming would increase swelling.", "Their energy goes opposite ways."]
      explain: "Endothermic for cooling, exothermic for warming: the direction of energy transfer is the design choice."
```

### Run it again

### Which product

## Elaborate: why burning keeps going

```step
stage: modify
tier: wider
insight: "Activation energy explains why exothermic reactions need a start (a match) and then keep themselves going."
check:
  type: question
  q: "Wood is exothermic when it burns, yet a log doesn't catch fire on its own. You need a match. Why, and why does it keep burning once lit?"
  options: ["Reactions need enough energy to start; once lit, the energy given out heats the next bit enough to react", "The match adds fuel", "Wood is endothermic until it is hot"]
  answer: 0
  feedback: [null, "A match flame is tiny compared with the log.", "Burning wood gives out energy throughout."]
  explain: "Collisions need enough energy to react (activation energy, Year 10). An exothermic reaction supplies that energy to its own next steps, so it keeps going."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the ice pack with what endothermic means." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Exothermic** reactions give out energy to their surroundings, so the surroundings get hotter: burning, respiration, hand warmers.
- **Endothermic** reactions take in energy from their surroundings, so the surroundings get colder: instant ice packs, photosynthesis, bicarb and vinegar.
- Energy is never made or destroyed; it moves between the reaction and its surroundings.
- There is no "cold energy": colder means less thermal energy.
