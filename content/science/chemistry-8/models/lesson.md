---
order: 5
node: AC9S8U06 n5
unit: atoms
title: Symbols, formulas or models?
summary: "Chemists show the same substance in different ways. A symbol names an element; a formula (H₂O) gives the types and numbers of atoms; a structural formula shows which atoms are joined; a 3D model shows the shape. Each shows something the others don't, so you pick the one that suits the job."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8273
  url: http://127.0.0.1:8273/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#three, caption: "Water (H₂O), carbon dioxide (CO₂) and methane (CH₄) as ball models: each formula tells you which atoms, and how many." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Representations"
  say: "Symbols, formulas and models each show something different."
  clip:
    - caption: { text: "Ball models: each ball is an atom.", say: "In these ball models, each ball is an atom." }
    - wait: 1800
    - click: "Inspect next particle"
    - caption: { text: "Water. The formula H₂O says: 2 hydrogen atoms, 1 oxygen atom.", say: "Water. The formula H two O says: two hydrogen atoms, one oxygen." }
    - wait: 3600
    - click: "Inspect next particle"
    - caption: { text: "CO₂: 1 carbon, 2 oxygen. The model also shows which atoms are joined.", say: "C O two: one carbon and two oxygen. The model shows how they join." }
    - wait: 3800
    - caption: { text: "A formula is quick to write; a model shows the arrangement.", say: "A formula is quick to write; a model shows the arrangement." }
    - wait: 800
hook: "H₂O, a drawing of three balls, and the word 'water' all mean the same thing. Why do chemists need so many ways to say it?"
---
You can tell elements, compounds and mixtures apart by their particles. This lesson asks how to show them.

## Engage: what does H₂O tell you?

```step
stage: predict
insight: "Students often read the small 2 as applying to both symbols, or think the formula shows the shape; the options separate those readings."
check:
  type: predict
  q: "What does the formula H₂O tell you about a water particle?"
  options: ["It has 2 hydrogen atoms and 1 oxygen atom", "It has 2 hydrogen atoms and 2 oxygen atoms", "It is a bent shape with the oxygen in the middle", "It is a mixture of hydrogen and oxygen"]
  actual: "2 hydrogen atoms and 1 oxygen atom. The small number belongs to the symbol just before it; no number means 1. A formula tells you which atoms and how many, but not the shape: for that you need a model."
```

## Explore: models and formulas

```step
stage: run
insight: "Inspecting ball models beside their formulas, then reading models without symbols, shows what each representation carries."
try: { playground: science, starter: "boards.yml#three", height: 520 }
tasks:
  - starter: "boards.yml#three"
    check: { type: board, text: "Inspect each compound and compare its model with its formula.", expect: { done: true } }
  - starter: "boards.yml#nolabels"
    check: { type: board, text: "These models have no symbols. Inspect them: what can you work out from the colours and the number of balls?", expect: { done: true } }
```

### Formulas and models

The table gives each particle's formula and number of atoms.

### No symbols

Colours stand for elements here (red oxygen, white hydrogen, blue nitrogen), as in a model kit.

## Explain: what each one shows

```step
stage: investigate
insight: "Matching each representation to what it does and doesn't show, then choosing one for a purpose, meets the node's 'no single representation captures everything'."
tasks:
  - check:
      type: match
      q: "Match each representation to what it shows best."
      pairs:
        - ["Symbol (O)", "Which element"]
        - ["Formula (CO₂)", "Which atoms, and how many of each"]
        - ["Structural formula (O=C=O)", "Which atoms are joined to which"]
        - ["3D model", "The shape of the particle"]
        - ["Particle diagram of a box", "Whether it is an element, compound or mixture, and how much of each"]
      explain: "Each shows something; none shows everything."
  - check:
      type: number
      q: "How many atoms are in one particle of methane, CH₄?"
      answer: 5
      explain: "1 carbon and 4 hydrogen: 5 atoms."
  - check:
      type: number
      q: "How many oxygen atoms are in 3CO₂ (three carbon dioxide particles)?"
      answer: 6
      explain: "Each CO₂ has 2 oxygen atoms; 3 × 2 = 6. The big number in front counts particles; the small one counts atoms in each."
  - check:
      type: question
      q: "You want to show a friend that air is a mixture of nitrogen and oxygen. Which is best?"
      options: ["A particle diagram of a box with separate N₂ and O₂ particles", "The formulas N₂ and O₂", "A 3D model of one oxygen particle"]
      answer: 0
      feedback: [null, "Formulas name the substances but don't show that they are mixed, not joined.", "One particle can't show a mixture."]
      explain: "Pick the representation that shows what matters for the job: here, separate particles side by side."
  - check: { type: reflect, text: "I can read a formula, and say what symbols, formulas and models each show." }
```

### Which shows what

### Atoms in methane

### Big and small numbers

### Choosing one

### In your own words

In your book: show carbon dioxide four ways (name, formula, structural formula, a ball drawing). Under each, write one thing it shows and one thing it doesn't.

## Elaborate: three more

```step
stage: modify
tier: typical
insight: "Reading formulas for less familiar substances, with the model to check, builds fluency."
try: { playground: science, starter: "boards.yml#more", height: 520 }
tasks:
  - check: { type: board, text: "Inspect all three substances.", expect: { done: true } }
  - check:
      type: question
      q: "Hydrogen peroxide is H₂O₂ and water is H₂O. What is the difference?"
      options: ["H₂O₂ has one more oxygen atom in each particle, so it is a different compound", "None: both are water", "H₂O₂ is a mixture of water and oxygen"]
      answer: 0
      feedback: [null, "The formulas are different, so the substances are different (hydrogen peroxide is a bleach).", "The atoms are all joined in one particle: a compound."]
      explain: "Change one small number and you have a new substance with new properties."
```

### Three substances

### One more oxygen

## Elaborate: where models mislead

```step
stage: modify
tier: wider
insight: "Knowing what a model leaves out (size, motion, the real shape in 3D) is part of using it well."
try: { playground: science, starter: "boards.yml#three", height: 520 }
tasks:
  - check: { type: board, text: "Inspect the compounds again, this time looking for what the model can't show.", expect: { done: true } }
  - check:
      type: question
      q: "Which of these does this flat ball model NOT show truthfully?"
      options: ["The real 3D shape, the real sizes and the huge empty space between particles", "Which atoms are in each particle", "How many atoms are in each particle"]
      answer: 0
      feedback: [null, "It shows the atoms correctly.", "The atom counts are right."]
      explain: "It is flat, the atoms aren't to scale, and real gas particles are much further apart. Every model simplifies; a good scientist knows how."
```

### Look again

### What it leaves out

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my reading of H₂O with the model on the board." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **symbol** (O, Na) names an element.
- A **formula** (H₂O, CO₂) gives the types of atom and how many of each. The small number counts the atom before it; a big number in front counts particles (3CO₂).
- A **structural formula** shows which atoms are joined; a **3D model** shows the shape; a **particle diagram** shows elements, compounds and mixtures.
- No single representation shows everything: choose the one that suits the job.
