---
order: 8
node: AC9S7U06 n3
woven: [AC9S7H02, AC9S7I05]
unit: mixtures
title: Filtration and evaporation
summary: Filtration separates a solid that hasn't dissolved; evaporation recovers a solid that has. Describe both, name the residue and filtrate, and choose the right one.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8248
  url: http://127.0.0.1:8248/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Sand and salt water above filter paper: the sand grains are too big to pass through." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Filtration"
  say: "Filtration separates an undissolved solid from a liquid."
  clip:
    - caption: { text: "Sand and salt water. The filter's holes are smaller than a sand grain.", say: "Sand and salt water. The filter's holes are smaller than a sand grain." }
    - wait: 3940
    - click: "Pour through the filter paper"
    - wait: 3500
    - caption: { text: "Sand stays behind: the residue. Water and dissolved salt pass: the filtrate.", say: "The sand stays behind as residue; water and dissolved salt pass through." }
    - wait: 1500
    - caption: { text: "To get the salt back, evaporate the water.", say: "To get the salt back, evaporate the water." }
    - wait: 800
hook: "How do you get clean salt back out of sandy salt water? Two techniques, in the right order: filtration takes out what didn't dissolve, and evaporation takes the water away from what did."
---
Both techniques use a property difference from the last lesson: **particle size** for filtration, **boiling point** for evaporation. This lesson is about doing them correctly.

## Engage: sandy salt water

```step
stage: predict
insight: "The common error is thinking the filter catches dissolved salt too."
check:
  type: predict
  q: "Sandy salt water is poured through filter paper. What stays in the paper?"
  options: ["Sand only", "Sand and salt", "Salt only", "Nothing"]
  actual: "Sand only. Dissolved salt particles are small enough to pass through with the water, and come back when the water evaporates."
```

## Explore: filter, then evaporate

```step
stage: run
insight: "Seeing the particles at each stage makes residue, filtrate and crystals concrete."
try: { playground: science, starter: "boards.yml#filter", height: 500 }
tasks:
  - starter: "boards.yml#filter"
    check: { type: board, text: "Pour the sandy salt water through the filter paper.", expect: { done: true } }
  - starter: "boards.yml#evaporate"
    check: { type: board, text: "Heat the filtrate until the water has gone.", expect: { done: true } }
  - check:
      type: sort
      q: "Name what you got."
      options: ["Residue", "Filtrate", "Salt crystals"]
      items:
        - ["The sand left in the filter paper", "Residue", "The solid left behind."]
        - ["The salty water that came through the paper", "Filtrate", "The liquid that passes through."]
        - ["What was left in the dish after evaporating", "Salt crystals", "The salt never left; only the water did."]
```

### Filtration

The dashed line is the filter paper. Its holes are smaller than a sand grain.

### Evaporation

The board loads the filtrate in an evaporating dish.

### Name the parts

## Explain: get the steps in order

```step
stage: investigate
insight: "The node's response mode is consolidation: procedural accuracy is the target, so order the steps exactly."
tasks:
  - check:
      type: parsons
      code: "steps.txt#filtration"
      text: "Put the filtration steps in order."
      explain: "Pouring slowly stops the mixture overflowing the paper."
  - check:
      type: parsons
      code: "steps.txt#evaporation"
      text: "Put the evaporation steps in order."
      explain: "Stopping before the dish is completely dry stops the salt spitting."
  - check:
      type: question
      q: "Filtration can't get the salt out of salt water, but evaporation can. Why?"
      options: ["Dissolved salt particles are small enough to pass through the paper, but when heated only the water particles escape, because water boils far below salt", "Salt is heavier than water, so it sinks while the lighter water rises away", "Heating destroys the water and leaves the salt", "Dissolved salt has disappeared, and heating makes it come back"]
      answer: 0
      feedback: [null, "Weight isn't the test. Water particles escape as a gas at a far lower temperature than salt particles.", "The water isn't destroyed: it escapes into the air as water vapour, and could be collected again.", "The salt never disappeared: it was spread out as single particles among the water particles all along."]
      explain: "Filtration sorts by particle size, and dissolved particles are tiny. Evaporation uses boiling point: the water leaves, the salt stays."
```

### Filtration

### Evaporation

### Why each works

## Practise: which technique?

```step
stage: practise
insight: "Choosing between filtration, evaporation, both or neither, with feedback, builds the habit of asking 'did it dissolve?'"
try: { playground: science, starter: "boards.yml#quiz", height: 320 }
check: { type: board, text: "Choose the right technique six times.", expect: { done: true } }
```

For each mixture, choose what you would use to get the part named. Start by asking: did it dissolve?

## Elaborate: design a procedure

```step
stage: modify
tier: typical
insight: "Designing the procedure for a dry mixture needs the dissolving step first, which students often miss."
tasks:
  - check:
      type: parsons
      code: "steps.txt#design"
      text: "You have a dry mixture of sand and salt. Order the steps to end up with dry sand and salt crystals, separately."
      explain: "Dissolving first is the key move: the salt has to be in solution before the filter can separate it from the sand."
  - check:
      type: question
      q: "During filtering, which particles pass through the paper?"
      options: ["Water and salt particles", "All the particles", "Only water particles"]
      answer: 0
      feedback: [null, "The sand grains are too big for the holes, so they stay in the paper.", "Dissolved salt particles are tiny, so they pass through with the water."]
      explain: "Dissolved salt particles are small enough to fit through with the water."
  - check:
      type: question
      q: "During evaporation, which particles leave the dish?"
      options: ["Only water particles", "Water and salt", "Only salt"]
      answer: 0
      feedback: [null, "Salt doesn't boil until well over 1000 °C, far hotter than the dish gets, so it stays behind.", "The salt is what is left in the dish. The water is what leaves."]
      explain: "Water boils far below salt."
```

### The procedure

### Through the paper

### Out of the dish

## Elaborate: out in the world

```step
stage: modify
tier: wider
insight: "Spotting filtration and evaporation in everyday settings checks the techniques are understood, not memorised."
check:
  type: sort
  q: "Filtration or evaporation?"
  options: ["Filtration", "Evaporation"]
  items:
    - ["A coffee machine holds the grounds in a paper cone.", "Filtration", "Grounds don't dissolve; the coffee is the filtrate."]
    - ["Shallow sea-salt ponds are left in the sun for weeks.", "Evaporation", "Sun and wind evaporate the water, leaving salt."]
    - ["A pool pump pushes water through a sand or cartridge filter.", "Filtration", "Leaves, dirt and hair are trapped."]
    - ["Wet clothes on a washing line dry out.", "Evaporation", "Water particles escape into the air."]
```

## Elaborate: First Nations separation techniques

```step
stage: modify
tier: wider
insight: "Traditional techniques use the same property differences as lab methods."
check:
  type: sort
  q: "Which property difference does each technique use?"
  options: ["Some parts are lighter than others", "Some parts are bigger or look different", "Different boiling points"]
  items:
    - ["Winnowing: seeds are tossed in a coolamon so the breeze carries the husks away.", "Some parts are lighter than others", "Husks are lighter for their size than seeds."]
    - ["Yandying: the coolamon is rocked in a rhythm so seeds and heavier grit move to different parts of the dish.", "Some parts are lighter than others", "Grit is heavier than seed, so it moves differently when shaken."]
    - ["Hand-picking: sticks and stones are picked out of the seeds by hand.", "Some parts are bigger or look different", "They are easy to see and grab."]
```

Many Aboriginal communities have long processed grass seeds into flour. A coolamon, a shallow wooden dish, is one of the tools used.

## Elaborate: does the filter paper matter?

```step
stage: modify
tier: wider
insight: "A variable investigation (filter paper grade) shows the trade-off between clarity and time, explained by particle size."
tasks:
  - check:
      type: question
      q: "What is the pattern in the results?"
      options: ["Finer paper gives a clearer filtrate but takes longer", "Coarser paper is better in every way", "There is no pattern"]
      answer: 0
      feedback: [null, "Coarse paper is fastest, but look at the filtrate column: it is cloudy.", "Read down both columns: as the paper gets finer, the time goes up and the filtrate gets clearer."]
      explain: "Clarity and speed trade off."
  - check:
      type: question
      q: "Why is the fine paper's filtrate clearer?"
      options: ["Its smaller holes trap smaller mud particles", "It soaks up the mud", "The water goes slower, so the mud is lighter"]
      answer: 0
      feedback: [null, "The mud sits on top of the paper because it can't fit through the holes, not because the paper soaks it up.", "Speed doesn't change the mud. What matters is the size of the mud particles compared with the holes."]
      explain: "Particle size versus hole size."
  - check:
      type: question
      q: "Why does the fine paper take longer?"
      options: ["Smaller holes let less water through each second", "The fine paper soaks up more of the water", "The water gets heavier"]
      answer: 0
      feedback: [null, "The paper holds only a little water. The time goes on squeezing water through the tiny holes.", "It is the same water. What changes is how easily it gets through the holes."]
      explain: "Less space to flow through, and trapped mud blocks holes too."
```

A class filtered 100 mL of the same muddy water through three grades of filter paper. (Sample results, not measured.)

| Filter paper | Time to filter | Filtrate |
|---|---|---|
| Coarse | 30 s | Cloudy |
| Medium | 75 s | Slightly cloudy |
| Fine | 180 s | Clear |

### Pattern

### Clearer

### Slower

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first prediction with what happened and can say what changed in my thinking." }
```

What did you think would stay in the filter paper? Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Filtration separates an undissolved solid from a liquid. The solid left in the paper is the **residue**; the liquid that passes through is the **filtrate**.
- It works because the solid's particles are too big for the holes. Dissolved particles pass straight through.
- Evaporation separates a dissolved solid from the liquid: the liquid's particles escape as a gas; the solid's particles stay and form crystals.
- For a solid that dissolves plus one that doesn't: filter first, then evaporate the filtrate.
