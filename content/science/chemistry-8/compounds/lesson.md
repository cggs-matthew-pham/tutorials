---
order: 2
node: AC9S8U06 n3
assumes: [AC9S8U06 n2]   # elements: taught in class (no tutorial yet)
unit: atoms
title: Why isn't salt poisonous?
summary: A compound is two or more types of atom chemically joined in a fixed ratio. It is a new substance with new properties, and a formula like H₂O tells you which atoms and how many.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8244
  url: http://127.0.0.1:8244/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Hydrogen and oxygen (elements: one type of atom each) mixed with water (a compound: H₂O, always two H to one O)." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Elements and compounds"
  say: "A compound is different atoms chemically joined in a fixed ratio."
  clip:
    - caption: { text: "Hydrogen, oxygen and water molecules, mixed together.", say: "Hydrogen, oxygen and water molecules, mixed together." }
    - wait: 1960
    - click: "Inspect next particle"
    - caption: { text: "Hydrogen: one type of atom, an element.", say: "Hydrogen: one type of atom, an element." }
    - wait: 1960
    - click: "Inspect next particle"
    - caption: { text: "Water: two hydrogens joined to one oxygen, always. A compound.", say: "Water is always two hydrogens joined to one oxygen: a compound." }
    - wait: 800
hook: "Sodium is a metal that bursts into flame in water. Chlorine is a poisonous gas. Put them together and you can sprinkle the result on your chips."
---
Last lesson: atoms come in types, one for each element. This lesson: what happens when different types join.

## Engage: sodium and chlorine

```step
stage: predict
insight: "Students who think a compound is its elements mixed will predict it keeps their properties; salt shows a compound is a new substance."
check:
  type: predict
  q: "Sodium is a soft metal that fizzes and catches fire in water. Chlorine is a poisonous green gas. When they react they make sodium chloride. What do you predict sodium chloride is like?"
  options: ["A poisonous metal", "A green gas that fizzes in water", "Something new, not like either of them", "Half metal and half gas"]
  actual: "Table salt: a white solid you can eat. When different atoms join, the new substance has new properties."
```

## Explore: mixed or joined?

```step
stage: run
insight: "The same two atom types, first mixed and then joined, separates 'compound' from 'mixture' at the particle level."
try: { playground: science, starter: "boards.yml#mixture", height: 520 }
tasks:
  - starter: "boards.yml#mixture"
    check: { type: board, text: "Inspect the particles in the mixture of hydrogen and oxygen.", expect: { done: true } }
  - starter: "boards.yml#compound"
    check: { type: board, text: "Inspect the particles of water.", expect: { done: true } }
```

### A mixture

Both boards contain only hydrogen and oxygen atoms. Look at how they are arranged.

### A compound

Same two atom types. What is different?

## Explain: compounds and formulas

```step
stage: investigate
insight: "Defining a compound by joining, fixed ratio and new properties, then reading formulas as atom counts, is the hinge for chemical change and equations."
tasks:
  - check:
      type: question
      q: "Both boards had hydrogen and oxygen atoms. What made water a compound and not a mixture?"
      options: ["Its hydrogen and oxygen atoms are chemically joined in each particle", "It has more atoms", "It is a liquid", "Its atoms are closer together"]
      answer: 0
      feedback: [null, "The number of atoms does not decide it. How they are arranged does.", "Being a liquid is a state, not what makes a compound. Steam is still water.", "The board's water particles were spread out like a gas. Joining is what matters, not spacing."]
      explain: "In a compound, different types of atom are chemically joined. In a mixture they are just together, not joined."
  - check:
      type: sort
      q: "Element, compound or mixture?"
      options: ["Element", "Compound", "Mixture"]
      items:
        - ["O₂", "Element", "One type of atom."]
        - ["H₂O", "Compound", "Hydrogen and oxygen atoms joined."]
        - ["CO₂", "Compound"]
        - ["He", "Element"]
        - ["Hydrogen gas and oxygen gas in one jar", "Mixture", "Two elements together, not joined."]
        - ["NaCl", "Compound"]
        - ["Air", "Mixture", "Several substances together, each with its own particles."]
        - ["N₂", "Element"]
  - check:
      type: match
      q: "Match each formula to the atoms in one particle."
      pairs:
        - ["H₂O", "2 hydrogen, 1 oxygen"]
        - ["CO₂", "1 carbon, 2 oxygen"]
        - ["NH₃", "1 nitrogen, 3 hydrogen"]
        - ["CH₄", "1 carbon, 4 hydrogen"]
      explain: "The small number belongs to the atom just before it. No number means one."
  - check:
      type: question
      q: "Water is always H₂O, never H₃O or HO. What does that tell you about compounds?"
      options: ["The atoms are joined in a fixed ratio", "Hydrogen is rarer than oxygen", "Water can be any mix of hydrogen and oxygen"]
      answer: 0
      feedback: [null, "There is more hydrogen than oxygen in water, by atom count. That isn't the point here.", "A mixture can be any ratio. A compound can't."]
      explain: "Every water particle has exactly 2 hydrogen atoms for each oxygen atom. A mixture of hydrogen and oxygen gases can be in any ratio."
  - check: { type: reflect, text: "I explained why sodium chloride is safe to eat when sodium and chlorine are not, using the word compound." }
```

### Joined or mixed

### Sort them

### Reading a formula

The small number belongs to the atom before it: H₂O has **2** H and **1** O.

### Fixed ratio

### In your own words

In your book: why can you eat sodium chloride when sodium and chlorine are both dangerous? Use "compound", "joined" and "new substance".

## Elaborate: find the compounds

```step
stage: modify
tier: typical
insight: "Reading formulas from particle pictures, and back, builds both directions of the representation."
try: { playground: science, starter: "boards.yml#many", height: 520 }
tasks:
  - check: { type: board, text: "Inspect all five gases.", expect: { done: true } }
  - check:
      type: number
      q: "How many atoms are in one particle of methane, CH₄?"
      answer: 5
      explain: "1 carbon + 4 hydrogen = 5 atoms."
  - check:
      type: number
      q: "Glucose is C₆H₁₂O₆. How many atoms are in one glucose particle?"
      answer: 24
      explain: "6 carbon + 12 hydrogen + 6 oxygen = 24 atoms."
```

### Inspect

### Count atoms

### A bigger formula

## Elaborate: making a compound

```step
stage: modify
tier: wider
insight: "Seeing elements join into a compound links this node to chemical change: the compound is a new substance made by rearranging atoms."
try: { playground: science, starter: "boards.yml#make", height: 560 }
tasks:
  - check: { type: board, text: "Watch hydrogen and oxygen react.", expect: { done: true } }
  - check:
      type: question
      q: "Hydrogen and oxygen are gases that let things burn. Water puts fires out. What does that show?"
      options: ["A compound has different properties from the elements it is made from", "Water is a mixture of hydrogen and oxygen", "The atoms changed type"]
      answer: 0
      feedback: [null, "If water were a mixture, it would still let things burn, like the gases do.", "Count the atoms in the panel: the same hydrogen and oxygen atoms, joined in a new way."]
```

### Watch

The panel shows the atoms at the start and now.

### New properties

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about sodium chloride with what it is really like, and can explain the difference." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **compound** is two or more **types** of atom **chemically joined** in a **fixed ratio**.
- A compound is a **new substance** with new properties (sodium chloride is not like sodium or chlorine).
- In a **mixture**, substances are together but not joined, and each keeps its properties.
- A **formula** gives the atoms in one particle: H₂O is 2 hydrogen and 1 oxygen.
