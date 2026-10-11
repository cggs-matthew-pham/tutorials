---
order: 4
node: [AC9S8U01 n4, AC9S8U01 n5]
unit: cells
title: What makes a plant cell different?
summary: "Plant cells have three parts animal cells don't: a cell wall for support, chloroplasts for photosynthesis and a large vacuole that keeps the cell firm. Both kinds have mitochondria (for energy) and ribosomes (for making proteins), and how many of each a cell has depends on its job."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8271
  url: http://127.0.0.1:8271/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "An animal cell and a plant cell. Only the plant cell has a cell wall (green outline), chloroplasts and a large vacuole (pale blue); both have mitochondria (orange)." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Plant and animal cells"
  say: "Plant cells have a wall, chloroplasts and a big vacuole; animal cells don't."
  clip:
    - caption: { text: "Both cells have a nucleus, membrane, cytoplasm and mitochondria.", say: "Both cells have a nucleus, a membrane, cytoplasm and mitochondria." }
    - wait: 3400
    - click: { selector: "#board [fill=\"#4f9a3c\"]" }
    - expect: { selector: "body", contains: "Chloroplasts" }
    - caption: { text: "Only the plant cell has chloroplasts: it makes its own food.", say: "Only the plant cell has chloroplasts: it makes its own food." }
    - wait: 3200
    - caption: { text: "A large vacuole and a rigid wall keep it firm, without a skeleton.", say: "A large vacuole and a rigid wall keep it firm, with no skeleton." }
    - wait: 3200
hook: "A tree can stand 80 metres tall without a single bone. A lettuce leaf goes limp in the fridge, then crisp again in cold water. Both come down to parts that only plant cells have."
---
Every cell has a nucleus, membrane and cytoplasm. This lesson finds the parts that are different, and why.

## Engage: what's missing?

```step
stage: predict
insight: "Students often think animal cells have walls, or that plants don't need mitochondria because they make their own food; the options test both."
check:
  type: predict
  q: "Which of these does a plant leaf cell have that a cheek cell does not?"
  options: ["A cell wall, chloroplasts and a large vacuole", "Mitochondria", "A nucleus", "A cell membrane"]
  actual: "A cell wall, chloroplasts and a large vacuole. Both cells have mitochondria, a nucleus and a membrane: plants release energy from food just as animals do."
```

## Explore: compare the cells

```step
stage: run
insight: "Finding the plant-only parts side by side with an animal cell, then the mitochondria in both, separates 'plant-specific' from 'every cell'."
try: { playground: board, starter: "boards.yml#compare", height: 600 }
tasks:
  - starter: "boards.yml#compare"
    check: { type: board, text: "Find the three parts that only the plant cell has.", when: "n = k" }
  - starter: "boards.yml#mito"
    check: { type: board, text: "Now find the mitochondria in both cells.", when: "n = k" }
```

### Plant only

Click a part to see what it is and where it is found.

### In both

## Explain: what each part is for

```step
stage: investigate
insight: "Tying each plant-only part to something plants need and animals don't (support without a skeleton, making food, staying firm) explains the differences instead of listing them."
tasks:
  - check:
      type: match
      q: "Match each part to its job."
      pairs:
        - ["Cell wall", "Rigid support, so the plant holds its shape without a skeleton"]
        - ["Chloroplast", "Photosynthesis: captures light to make glucose"]
        - ["Large vacuole", "Holds cell sap and keeps the cell firm"]
        - ["Mitochondria", "Release energy from food (respiration)"]
        - ["Ribosomes", "Make proteins"]
      explain: "The first three are only in plant cells (walls also in fungi and bacteria). Mitochondria and ribosomes are in both."
  - check:
      type: sort
      q: "Plant cells only, or both plant and animal cells?"
      options: ["Plant only", "Both"]
      items:
        - ["Cell wall", "Plant only"]
        - ["Chloroplasts", "Plant only"]
        - ["Large permanent vacuole", "Plant only"]
        - ["Mitochondria", "Both", "Plants respire too, day and night."]
        - ["Ribosomes", "Both"]
        - ["Nucleus", "Both"]
  - check:
      type: question
      q: "Why don't animal cells need chloroplasts?"
      options: ["Animals get their food by eating, so they don't make it from light", "Animals live where there is no light", "Animal cells are too small for chloroplasts"]
      answer: 0
      feedback: [null, "Most animals live in light; it is how they get food that differs.", "Size is not the reason."]
      explain: "Plants make their own food by photosynthesis; animals eat. Each cell's parts match how the organism lives."
  - check:
      type: question
      q: "A lettuce leaf goes limp when it loses water. Which part explains this?"
      options: ["The vacuoles shrink, so the cells push less against their walls", "The chloroplasts stop working", "The cell walls dissolve"]
      answer: 0
      feedback: [null, "Chloroplasts make food; they don't hold the leaf up.", "Walls stay; it's the pressure inside that drops."]
      explain: "A full vacuole presses the cell against its wall and keeps it firm. Lose water and the cell goes soft: the leaf wilts. Put it in water and it firms up again."
  - check:
      type: question
      q: "A muscle cell has far more mitochondria than a skin cell. Why?"
      options: ["Contracting needs a lot of energy, and mitochondria release it", "Muscle cells are bigger", "Mitochondria make muscles strong"]
      answer: 0
      feedback: [null, "Size alone doesn't explain it; the job does.", "They supply energy; the protein fibres do the pulling."]
      explain: "Cells have the parts their job needs, in the numbers it needs: same DNA, different organelles."
  - check: { type: reflect, text: "I can name the parts only plant cells have and explain what each is for, and say which parts all these cells share." }
```

### Jobs

### Plant only or both

### No chloroplasts

### A limp lettuce

### Many mitochondria

### In your own words

In your book: draw a plant cell and an animal cell side by side. Label every part, colour the plant-only parts, and write one line on what each plant-only part is for.

## Elaborate: a root hair cell

```step
stage: modify
tier: typical
insight: "A plant cell without chloroplasts shows that parts depend on the cell's job, not just on being a plant."
try: { playground: board, starter: "boards.yml#roothair", height: 600 }
tasks:
  - check: { type: board, text: "Find every part of the root hair cell and the leaf cell.", when: "n = k" }
  - check:
      type: question
      q: "Root hair cells have no chloroplasts. Why not?"
      options: ["They are underground, with no light to photosynthesise; their job is taking in water", "They are not plant cells", "Chloroplasts would make them too heavy"]
      answer: 0
      feedback: [null, "They are plant cells: they have walls and vacuoles.", "Weight is not the reason."]
      explain: "A cell has the parts its job needs. Chloroplasts in the dark would be useless."
```

### Root hair

### No chloroplasts

## Elaborate: energy for movement

```step
stage: modify
tier: wider
insight: "Linking organelle numbers to a cell's work extends 'specialisation' from shape to what is inside."
try: { playground: board, starter: "boards.yml#muscle", height: 600 }
tasks:
  - check: { type: board, text: "Find every part of the muscle cell.", when: "n = k" }
  - check:
      type: question
      q: "Cells in a gland that makes digestive enzymes (proteins) are packed with one organelle. Which?"
      options: ["Ribosomes, which make proteins", "Chloroplasts", "Vacuoles"]
      answer: 0
      feedback: [null, "Animal gland cells have no chloroplasts.", "Large vacuoles are a plant cell feature."]
      explain: "Enzymes are proteins, and ribosomes make proteins. Like mitochondria in muscle, the number of an organelle follows the job."
```

### Muscle parts

### Protein factories

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about plant and animal cells with the cells on the board." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Only plant cells have a **cell wall** (support), **chloroplasts** (photosynthesis) and a **large vacuole** (keeps the cell firm, stores sap).
- Plant and animal cells both have a nucleus, membrane, cytoplasm, **mitochondria** (release energy from food) and **ribosomes** (make proteins).
- How many of each part a cell has depends on its job: muscle cells have many mitochondria; root hair cells have no chloroplasts.
