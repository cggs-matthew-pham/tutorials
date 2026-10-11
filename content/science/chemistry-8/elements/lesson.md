---
order: 2
node: AC9S8U06 n2
unit: atoms
title: What is an element?
summary: "An element is a pure substance made of only one type of atom. Its particles can be single atoms (helium) or atoms joined together (O₂), but every atom is the same type. Each element has a symbol of one or two letters, and the periodic table lists them all."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8265
  url: http://127.0.0.1:8265/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Oxygen (O₂) and helium (He): one type of atom each, so elements. Water (H₂O) has two types: a compound." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Elements"
  say: "An element is made of only one type of atom."
  clip:
    - caption: { text: "Oxygen, helium and water particles, mixed together.", say: "Oxygen, helium and water particles, mixed together." }
    - wait: 2000
    - click: "Inspect next particle"
    - caption: { text: "Oxygen: two atoms joined, but both oxygen. One type: an element.", say: "Oxygen: two atoms joined, but both are oxygen. An element." }
    - wait: 3800
    - click: "Inspect next particle"
    - caption: { text: "Helium: single atoms, one type. Also an element.", say: "Helium: single atoms, all one type. Also an element." }
    - wait: 3600
    - click: "Inspect next particle"
    - caption: { text: "Water: hydrogen and oxygen atoms. Two types: not an element.", say: "Water has hydrogen and oxygen atoms: two types, so not an element." }
    - wait: 800
hook: "Everything around you, from your phone to your fingernails, is built from fewer than a hundred kinds of atom. Each kind is an element."
---
Last lesson: atoms come in types. This lesson: substances made of just one type.

## Engage: pure oxygen, pure water

```step
stage: predict
insight: "Students often think 'pure' means 'element', or that an element's particles must be single atoms; the options separate both ideas."
check:
  type: predict
  q: "A jar of pure oxygen and a jar of pure water. Both are pure substances. Which is an element?"
  options: ["Only the oxygen", "Only the water", "Both: they are pure", "Neither: oxygen particles have two atoms"]
  actual: "Only the oxygen. Every oxygen particle (O₂) is two oxygen atoms: one type of atom, so oxygen is an element. Water is pure too, but each particle has hydrogen and oxygen atoms: two types, so water is a compound."
```

## Explore: one type of atom?

```step
stage: run
insight: "Inspecting the particles of two pure substances side by side makes 'one type of atom' the test, not 'pure' or 'single atoms'."
try: { playground: science, starter: "boards.yml#oxygen", height: 520 }
tasks:
  - starter: "boards.yml#oxygen"
    check: { type: board, text: "Inspect the particles in pure oxygen.", expect: { done: true } }
  - starter: "boards.yml#water"
    check: { type: board, text: "Now inspect pure water vapour.", expect: { done: true } }
```

### Oxygen

Click a particle, or press **Inspect next particle**, to see which atoms it is made of.

### Water

The board names each kind of particle: element or compound.

## Explain: elements and symbols

```step
stage: investigate
insight: "Defining an element by atom type, then using symbols and their two-letter rule, sets up formulas for compounds next lesson."
tasks:
  - check:
      type: question
      q: "What is an element?"
      options: ["A pure substance made of only one type of atom", "Any substance made of single atoms", "Any pure substance"]
      answer: 0
      feedback: [null, "Oxygen (O₂) is an element, though its atoms come in pairs.", "Water is pure but it is a compound."]
      explain: "One type of atom, and nothing else. The atoms may be single (helium) or joined (oxygen, O₂)."
  - check:
      type: sort
      q: "Element or compound?"
      options: ["Element", "Compound"]
      items:
        - ["O₂ (oxygen)", "Element"]
        - ["He (helium)", "Element"]
        - ["N₂ (nitrogen)", "Element"]
        - ["O₃ (ozone)", "Element", "Three oxygen atoms: still one type."]
        - ["H₂O (water)", "Compound"]
        - ["CO₂ (carbon dioxide)", "Compound"]
        - ["NaCl (salt)", "Compound"]
  - check:
      type: match
      q: "Match each symbol to its element."
      pairs:
        - ["O", "Oxygen"]
        - ["C", "Carbon"]
        - ["Fe", "Iron"]
        - ["Na", "Sodium"]
        - ["Cu", "Copper"]
        - ["Au", "Gold"]
      explain: "Some symbols come from Latin names: Fe from ferrum (iron), Na from natrium (sodium), Cu from cuprum (copper), Au from aurum (gold)."
  - check:
      type: question
      q: "Why is the symbol for cobalt written Co, not CO?"
      options: ["A symbol is one capital letter, or a capital and a small letter; CO means a carbon atom joined to an oxygen atom", "It doesn't matter how you write it", "CO is the symbol for cobalt gas"]
      answer: 0
      feedback: [null, "It matters: CO and Co are different substances.", "There is no such gas; CO is carbon monoxide, a compound."]
      explain: "Each symbol starts with a capital. Co is one element (cobalt); CO is two symbols, C and O: carbon monoxide."
  - check:
      type: question
      q: "What does the periodic table show?"
      options: ["Every element, one box each, in order of atomic number, with similar elements in columns", "Every substance, including compounds", "Only the elements found in living things"]
      answer: 0
      feedback: [null, "Compounds aren't on it: only elements.", "It lists all 118 known elements."]
      explain: "About 118 elements are known; around 90 occur naturally. Everything else is made from them."
  - check: { type: reflect, text: "I can define an element, tell an element from a compound by its atoms, and use chemical symbols." }
```

### What an element is

### Element or compound

### Symbols

### Co or CO

### The periodic table

### In your own words

In your book: draw particles of an element made of single atoms, an element made of pairs of atoms, and a compound. Label each, and write the symbols you used.

## Elaborate: Co or CO?

```step
stage: modify
tier: typical
insight: "Inspecting carbon monoxide makes the capital-letter rule concrete: two capitals, two elements, a compound."
try: { playground: science, starter: "boards.yml#monoxide", height: 520 }
tasks:
  - check: { type: board, text: "Inspect the particles of CO.", expect: { done: true } }
  - check:
      type: question
      q: "CO is a poisonous gas from faulty heaters. Cobalt (Co) is a hard, shiny metal. How does the board show CO is not an element?"
      options: ["Each particle has a carbon atom and an oxygen atom: two types", "The particles are moving", "It has two letters"]
      answer: 0
      feedback: [null, "All gas particles move.", "Co has two letters too, and it is an element."]
      explain: "Two types of atom joined: a compound. Two capital letters in a formula mean two elements."
```

### Carbon monoxide

### Two capitals

## Elaborate: two forms of oxygen

```step
stage: modify
tier: wider
insight: "Ozone and oxygen are the same element in two forms, which breaks the idea that one element means one substance."
try: { playground: science, starter: "boards.yml#ozone", height: 520 }
tasks:
  - check: { type: board, text: "Inspect both kinds of particle.", expect: { done: true } }
  - check:
      type: question
      q: "Ozone (O₃) and oxygen (O₂) are both made of only oxygen atoms, but ozone protects us from ultraviolet light high in the atmosphere and is harmful to breathe. What does this show?"
      options: ["One element can form different substances when its atoms join in different ways", "Ozone must be a compound", "O₃ contains a different type of oxygen atom"]
      answer: 0
      feedback: [null, "Only one type of atom: it is an element.", "All the atoms are ordinary oxygen atoms."]
      explain: "Carbon does the same: diamond and graphite are both pure carbon. How the atoms are joined changes the properties."
```

### Oxygen and ozone

### One element, two substances

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about oxygen and water with the particles on the board." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- An **element** is a pure substance made of only one type of atom. Its particles can be single atoms (He) or atoms joined together (O₂, O₃).
- A **compound** has two or more types of atom joined (H₂O, CO₂).
- Each element has a **symbol**: one capital letter, or a capital and a small letter (C, Co, Na). Some come from Latin names (Fe, Na, Cu, Au).
- The **periodic table** lists all the elements, about 118.
