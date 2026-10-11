---
order: 5
node: AC9S8U02 n2
unit: systems
title: What is a tissue?
summary: "A tissue is a group of similar specialised cells working together to do one job. Muscle tissue contracts, epithelial tissue lines and protects, xylem carries water, phloem carries sugar. A tissue can do what a single cell can't do on its own."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8269
  url: http://127.0.0.1:8269/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "A section of the heart wall: layers of tissue, each a group of similar cells doing one job." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Tissues"
  say: "A tissue is a group of similar cells doing one job together."
  clip:
    - caption: { text: "One muscle cell can only pull a tiny amount.", say: "One muscle cell can only pull a tiny amount." }
    - wait: 2400
    - click: { selector: "#board [fill=\"#c95d5d\"]" }
    - expect: { selector: "body", contains: "Cardiac muscle tissue" }
    - caption: { text: "Millions of them together: cardiac muscle tissue, strong enough to pump blood.", say: "Millions together make muscle tissue, strong enough to pump blood." }
    - wait: 3600
    - click: { selector: "#board [fill=\"#f4d6d6\"]" }
    - expect: { selector: "body", contains: "Lining" }
    - caption: { text: "Lining cells together: epithelial tissue, a smooth layer for blood to flow over.", say: "Lining cells together make epithelial tissue, a smooth layer for blood." }
    - wait: 3400
hook: "One muscle cell is thinner than a hair and can pull with only a tiny force. Yet your heart beats about 100 000 times a day without a rest."
---
Last lesson: cells specialise. This lesson: what happens when similar specialised cells work together.

## Engage: one cell or many?

```step
stage: predict
insight: "Students who think one specialised cell can do an organ's job, or that a tissue is any mix of cells in one place, pick those options; the definition needs 'similar cells, one shared job'."
check:
  type: predict
  q: "Your heart pumps with a strong squeeze. What does the squeezing?"
  options: ["A layer of millions of muscle cells contracting together", "One very large muscle cell", "Every kind of cell in the heart, equally", "The blood pushing itself"]
  actual: "A layer of millions of muscle cells, all contracting together: muscle tissue. One muscle cell is tiny and weak; together they are strong."
```

## Explore: from cell to tissue

```step
stage: run
insight: "Finding the parts of one muscle cell, then the muscle, lining and nerve tissues in the heart wall, moves students from the cell to the group of cells."
try: { playground: board, starter: "boards.yml#muscle", height: 600 }
tasks:
  - starter: "boards.yml#muscle"
    check: { type: board, text: "Find every part of the muscle cell.", when: "n = k" }
  - starter: "boards.yml#heart"
    check: { type: board, text: "In the heart wall, find the muscle tissue, the lining and the nervous tissue.", when: "n = k" }
```

### One muscle cell

Click each part to see its name and job.

### The heart wall

Each layer is a tissue: many similar cells together.

## Explain: tissues

```step
stage: investigate
insight: "Defining a tissue by similar cells and a shared job, with plant and animal examples, is the node; the 'why not one cell' question gets at what a tissue adds."
tasks:
  - check:
      type: question
      q: "What is a tissue?"
      options: ["A group of similar specialised cells working together to do one job", "Any group of cells in the same place", "One very large specialised cell"]
      answer: 0
      feedback: [null, "A tissue's cells are similar and share a job; a mix of different cells doing different jobs is an organ.", "Tissues are made of many cells."]
      explain: "Similar cells, one job. Cells → tissues → organs → systems."
  - check:
      type: match
      q: "Match each tissue to its job."
      pairs:
        - ["Muscle tissue", "Contracts to move the body or pump blood"]
        - ["Epithelial tissue", "Lines and protects surfaces, inside and out"]
        - ["Nervous tissue", "Carries electrical signals"]
        - ["Xylem", "Carries water up a plant from the roots"]
        - ["Phloem", "Carries sugar around a plant"]
      explain: "Animals and plants both have tissues: each is a group of one kind of specialised cell."
  - check:
      type: sort
      q: "Animal tissue or plant tissue?"
      options: ["Animal", "Plant"]
      items:
        - ["Muscle", "Animal"]
        - ["Nervous tissue", "Animal"]
        - ["Blood", "Animal", "Blood is a liquid tissue: cells in plasma."]
        - ["Xylem", "Plant"]
        - ["Phloem", "Plant"]
        - ["Palisade mesophyll", "Plant"]
  - check:
      type: question
      q: "Why does the body use muscle tissue, not just single muscle cells?"
      options: ["Millions of cells pulling together can make a force no single cell could", "Single muscle cells can't contract", "Tissues don't need energy"]
      answer: 0
      feedback: [null, "Each cell does contract, but only a tiny amount.", "Tissues are made of living cells, which all need energy."]
      explain: "A tissue does a job at a scale no one cell can. That is why tissue function comes from the cells working together."
  - check: { type: reflect, text: "I can define a tissue and give an animal and a plant example with the job of each." }
```

### What a tissue is

### Tissue jobs

### Animal or plant

### Why a tissue

### In your own words

In your book: draw one muscle cell, then a block of muscle tissue made of many of them. Label each, and write the job they share. Do the same for xylem in a plant.

## Elaborate: tissues in a leaf

```step
stage: modify
tier: typical
insight: "Finding plant tissues by their jobs checks that the definition works beyond animals."
try: { playground: board, starter: "boards.yml#leaf", height: 600 }
tasks:
  - check: { type: board, text: "Find the palisade tissue, the xylem and the phloem.", when: "n = k" }
  - check:
      type: question
      q: "Xylem is made of long, hollow cells joined end to end. How does that suit its job?"
      options: ["Together they form tubes that water can flow through from the roots to the leaves", "Hollow cells are lighter, so the plant can grow taller", "Each hollow cell stores water for itself"]
      answer: 0
      feedback: [null, "Being light is not the main point; making a pipe is.", "Xylem moves water along; it doesn't store it."]
      explain: "No single cell could carry water up a tree. Joined end to end, xylem cells make a continuous pipe."
```

### Plant tissues

### Xylem tubes

## Elaborate: when a tissue goes wrong

```step
stage: modify
tier: wider
insight: "What happens when one tissue changes (scar tissue in the heart) shows that an organ's work depends on each tissue doing its job."
try: { playground: board, starter: "boards.yml#heart", height: 600 }
tasks:
  - check: { type: board, text: "Find the muscle tissue, the lining and the nervous tissue again.", when: "n = k" }
  - check:
      type: question
      q: "After a heart attack, part of the cardiac muscle can be replaced by tough scar tissue (connective tissue). Why does the heart pump less well?"
      options: ["Scar tissue's cells can't contract, so that part no longer helps squeeze", "Scar tissue is heavier than muscle", "The nervous tissue stops working everywhere"]
      answer: 0
      feedback: [null, "Weight is not the problem; the job is.", "The signal still spreads, but the scarred part can't respond by contracting."]
      explain: "A tissue's job comes from its cells. Replace muscle cells with connective tissue cells and that part of the wall can no longer contract."
```

### The heart wall again

### Scar tissue

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about what squeezes the heart with the tissues on the board." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **tissue** is a group of similar specialised cells working together to do one job.
- Animal tissues include muscle (contracts), epithelial (lines and protects), nervous (carries signals) and blood. Plant tissues include xylem (water), phloem (sugar) and palisade (photosynthesis).
- A tissue can do what one cell can't do alone.
- Next: **organs** are made of several tissues working together.
