---
order: 4
node: AC9S8U06 n4
unit: atoms
title: Mixed, not joined?
summary: "A mixture is two or more substances mingled together but not chemically joined. Each keeps its own properties, the amounts can vary, and the parts can be separated by physical means. A compound is the opposite: atoms joined in a fixed ratio, with new properties."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8272
  url: http://127.0.0.1:8272/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#air, caption: "Air: nitrogen, oxygen, argon and carbon dioxide particles mixed together, not joined. A mixture." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Mixtures"
  say: "A mixture is different substances mingled together, not chemically joined."
  clip:
    - caption: { text: "Air, enlarged millions of times.", say: "Air, enlarged millions of times." }
    - wait: 1800
    - click: "Inspect next particle"
    - caption: { text: "Nitrogen: its own particles, unchanged.", say: "Nitrogen: its own particles, unchanged." }
    - wait: 2800
    - click: "Inspect next particle"
    - caption: { text: "Oxygen: also its own particles. Not joined to the nitrogen.", say: "Oxygen: also its own particles, not joined to the nitrogen." }
    - wait: 3400
    - click: "Inspect next particle"
    - caption: { text: "Different substances, mingled but not joined: a mixture. Each keeps its properties.", say: "Different substances, mingled but not joined, make a mixture." }
    - wait: 800
hook: "You breathe in oxygen and nitrogen with every breath, yet only the oxygen keeps you alive. In air, oxygen still behaves exactly like oxygen."
---
Elements are one type of atom; compounds are different atoms joined. This lesson looks at substances that are only mixed.

## Engage: oxygen in air

```step
stage: predict
insight: "Students who think air is a compound (or that mixing makes a new substance) pick those options; 'each keeps its properties' is the idea to build."
check:
  type: predict
  q: "Air is about one fifth oxygen. Is the oxygen in air still oxygen, with oxygen's properties?"
  options: ["Yes: in a mixture each substance keeps its own particles and properties", "No: mixing with nitrogen turned it into a new substance", "No: air is one compound called 'air'", "Only some of it"]
  actual: "Yes. Air is a mixture: the oxygen particles are mingled with nitrogen and others, but not joined to them. That is why your lungs can take oxygen out of air."
```

## Explore: what's in a mixture?

```step
stage: run
insight: "Inspecting air, then dissolving salt, shows mixtures at the particle level: different particles side by side, none changed."
try: { playground: science, starter: "boards.yml#air", height: 520 }
tasks:
  - starter: "boards.yml#air"
    check: { type: board, text: "Inspect every kind of particle in air.", expect: { done: true } }
  - starter: "boards.yml#dissolve"
    check: { type: board, text: "Make a mixture: dissolve some salt in water.", expect: { done: true } }
```

### Air

Click particles, or press **Inspect next particle**. Are any of them joined to each other?

### Salt water

Salt water is a mixture too. Are the salt particles changed, or just spread out?

## Explain: mixtures and compounds

```step
stage: investigate
insight: "Contrasting mixtures with compounds on three tests (properties kept, amounts vary, separate physically) makes the distinction a reasoned one."
tasks:
  - check:
      type: question
      q: "What is a mixture?"
      options: ["Two or more substances mingled together but not chemically joined", "Two or more types of atom joined in a fixed ratio", "Any substance with more than one atom in each particle"]
      answer: 0
      feedback: [null, "That is a compound.", "O₂ has two atoms per particle and it is an element."]
      explain: "In a mixture each substance keeps its own particles."
  - check:
      type: sort
      q: "Mixture or compound?"
      options: ["Mixture", "Compound"]
      items:
        - ["Each part keeps its own properties", "Mixture"]
        - ["New properties, unlike its elements", "Compound", "Salt is not poisonous like chlorine."]
        - ["The amounts can be anything", "Mixture", "Weak or strong cordial is still cordial."]
        - ["A fixed ratio of atoms", "Compound", "Water is always H₂O."]
        - ["Separated by filtering, evaporating or distilling", "Mixture"]
        - ["Separated only by a chemical reaction", "Compound"]
  - check:
      type: sort
      q: "Element, compound or mixture?"
      options: ["Element", "Compound", "Mixture"]
      items:
        - ["Oxygen", "Element"]
        - ["Water", "Compound"]
        - ["Air", "Mixture"]
        - ["Salt water", "Mixture"]
        - ["Carbon dioxide", "Compound"]
        - ["Copper", "Element"]
  - check:
      type: question
      q: "How could you get the salt back from salt water?"
      options: ["Evaporate the water: the salt is left", "Filter it", "You can't: salt and water have joined"]
      answer: 0
      feedback: [null, "Dissolved salt passes through filter paper.", "They are mixed, not joined, so a physical method works."]
      explain: "Mixtures can be separated by physical means (Year 7: filtering, evaporating, distilling, chromatography)."
  - check: { type: reflect, text: "I can define a mixture and tell it apart from a compound." }
```

### What a mixture is

### Mixture or compound

### Three kinds

### Getting it back

### In your own words

In your book: draw particle diagrams of an element, a compound and a mixture. Under the mixture, write two ways it differs from the compound.

## Elaborate: any amount

```step
stage: modify
tier: typical
insight: "Two mixtures of the same gases in different proportions show variable composition, the clearest contrast with a compound's fixed ratio."
try: { playground: science, starter: "boards.yml#rich", height: 520 }
tasks:
  - starter: "boards.yml#rich"
    check: { type: board, text: "Inspect the mixture with lots of hydrogen.", expect: { done: true } }
  - starter: "boards.yml#lean"
    check: { type: board, text: "Now the mixture with lots of oxygen.", expect: { done: true } }
  - check:
      type: question
      q: "Both boxes hold hydrogen and oxygen in very different amounts. Are they both mixtures of hydrogen and oxygen?"
      options: ["Yes: a mixture can have its parts in any amounts", "No: only one of them has the right amounts", "No: they are two different compounds"]
      answer: 0
      feedback: [null, "There is no 'right' amount for a mixture.", "Nothing is joined, so neither is a compound."]
      explain: "A mixture's make-up can vary. Water, the compound, is always 2 hydrogen to 1 oxygen."
```

### Lots of hydrogen

### Lots of oxygen

### Both mixtures?

## Elaborate: humid air

```step
stage: modify
tier: wider
insight: "A mixture that includes a compound (water vapour in air) checks that 'mixture' is about how substances are combined, not what they are."
try: { playground: science, starter: "boards.yml#humid", height: 520 }
tasks:
  - check: { type: board, text: "Inspect every kind of particle in humid air.", expect: { done: true } }
  - check:
      type: question
      q: "Humid air has water vapour in it. Water is a compound. Is humid air a compound?"
      options: ["No: it is a mixture of elements and a compound, none joined to each other", "Yes: it contains a compound", "It is an element"]
      answer: 0
      feedback: [null, "A mixture can contain compounds; the water particles are not joined to the nitrogen or oxygen.", "It has several kinds of particle."]
      explain: "A mixture can hold elements, compounds or both, as long as the different substances aren't joined."
```

### Humid air

### Compound or mixture

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about oxygen in air with the particles on the board." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **mixture** is two or more substances mingled together but not chemically joined. Each keeps its own particles and properties.
- A mixture's parts can be in any amounts; a **compound** always has a fixed ratio (H₂O).
- Mixtures can be separated by physical means (filtering, evaporating, distilling); compounds only by chemical reactions.
- Air and salt water are mixtures; water and carbon dioxide are compounds.
