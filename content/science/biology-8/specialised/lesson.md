---
order: 4
node: AC9S8U02 n1
assumes: [AC9S8U01 n4, AC9S8U01 n5]   # plant-specific structures; additional organelles: taught in class (no tutorial yet)
unit: systems
title: Why are cells different shapes?
summary: "Almost all your cells have the same DNA, but they specialise: each develops a shape and contents that suit its job, like a red blood cell packed with haemoglobin or a nerve cell with a long axon."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8215
  url: http://127.0.0.1:8215/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "A red blood cell (no nucleus, biconcave) and a nerve cell (a long axon): shapes that suit their jobs." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Specialised cells"
  say: "Cells with the same DNA specialise: each shape suits its job."
  clip:
    - caption: { text: "Same DNA, different jobs: each cell's shape suits its job.", say: "Same DNA, different jobs: each cell's shape suits its job." }
    - wait: 2950
    - click: { selector: "#board [fill=\"#ea8f8f\"]" }
    - expect: { selector: "body", contains: "no nucleus" }
    - caption: { text: "A red blood cell has no nucleus, leaving room for haemoglobin.", say: "A red blood cell has no nucleus, leaving room for haemoglobin." }
    - wait: 3280
    - click: { selector: "#board [fill=\"#f1e3a6\"]" }
    - expect: { selector: "body", contains: "Axon." }
    - caption: { text: "A nerve cell's long axon carries signals a long way.", say: "A nerve cell's long axon carries signals a long way." }
hook: "A nerve cell in your leg can be a metre long. A red blood cell is a tiny squashed disc with no nucleus. Same DNA, same body. Why so different?"
---
Last unit: what all cells share. This one: why they differ.

## Engage: same DNA?

```step
stage: predict
insight: "Students who think different cells have different DNA will choose that; specialisation by using different instructions is the idea the node needs."
check:
  type: predict
  q: "A nerve cell and a muscle cell from the same person. How do you predict their DNA compares?"
  options: ["Completely different DNA", "The same DNA, but each cell uses different parts of it", "Muscle cells have more DNA", "Only nerve cells have DNA"]
  actual: "The same DNA. Each cell switches on the instructions it needs, so it grows the shape and parts that suit its job."
```

## Explore: four specialised cells

```step
stage: run
insight: "Clicking each feature and reading its purpose links structure to function cell by cell."
try: { playground: board, starter: "boards.yml#blood", height: 520 }
tasks:
  - starter: "boards.yml#blood"
    check: { type: board, text: "Find every part of the red blood cell and the nerve cell.", when: "n = k" }
  - starter: "boards.yml#muscle"
    check: { type: board, text: "Find every part of the muscle cell and the root hair cell.", when: "n = k" }
```

### Blood and nerves

### Muscle and roots

## Explain: shape suits job

```step
stage: investigate
insight: "Explaining features as adaptations, not labels, is the hinge for tissues and organs."
tasks:
  - check:
      type: match
      q: "Match each feature to how it helps."
      pairs:
        - ["Red blood cell: no nucleus", "More room for haemoglobin to carry oxygen"]
        - ["Nerve cell: long axon", "Carries signals a long way"]
        - ["Muscle cell: many mitochondria", "Releases lots of energy for contracting"]
        - ["Root hair cell: long extension", "Large surface for absorbing water"]
  - check:
      type: question
      q: "Why do root hair cells have no chloroplasts?"
      options: ["They are underground, where there is no light for photosynthesis", "Chloroplasts would make them too heavy", "Only leaves are allowed chloroplasts"]
      answer: 0
      feedback: [null, "Weight isn't the reason.", "The DNA for chloroplasts is there; root cells don't switch it on because there is no light."]
  - check:
      type: question
      q: "What does 'specialised' mean for a cell?"
      options: ["Its shape and parts suit one particular job", "It has different DNA", "It is bigger than other cells"]
      answer: 0
      feedback: [null, "Same DNA: different instructions used.", "Size varies; it's the match to the job that counts."]
  - check: { type: reflect, text: "I described two features of a specialised cell and explained how each helps it do its job." }
```

### Feature and function

### Root hairs

### Specialised

### In your own words

In your book: choose one specialised cell and explain two of its features and how each helps.

## Elaborate: design a cell

```step
stage: modify
tier: typical
insight: "Predicting the features a job needs reverses the reasoning: function to structure."
check:
  type: question
  q: "Cells lining your small intestine absorb digested food. Which feature would you expect them to have?"
  options: ["Tiny folds (microvilli) on the surface, for a much larger area", "No membrane, so food gets in easily", "A long tail to swim"]
  answer: 0
  feedback: [null, "Without a membrane, everything would leak out.", "They stay put; the food comes to them."]
  explain: "Like root hairs, intestine cells increase their surface area to absorb more."
```

## Elaborate: energy-hungry cells

```step
stage: modify
tier: wider
insight: "Comparing organelle numbers across cells extends specialisation from shape to contents."
check:
  type: question
  q: "Sperm cells and muscle cells both have many mitochondria. What do the two jobs have in common?"
  options: ["Both need lots of energy for movement", "Both make proteins", "Both store food"]
  answer: 0
  feedback: [null, "Ribosomes make proteins.", "Neither is a food store."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the DNA of nerve and muscle cells with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Nearly all your cells have the **same DNA**; each **specialised** cell uses different instructions.
- A specialised cell's **shape and parts suit its job**: red blood cells (no nucleus, haemoglobin), nerve cells (long axon), muscle cells (many mitochondria), root hair cells (long extension, no chloroplasts).
