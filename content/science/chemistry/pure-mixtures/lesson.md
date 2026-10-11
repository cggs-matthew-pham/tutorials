---
order: 6
node: AC9S7U06 n1
woven: [AC9S7I06]
unit: mixtures
title: Pure substance or mixture?
summary: A pure substance contains only one kind of particle; a mixture contains two or more. Classify familiar materials by their particles, not by how they look.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8250
  url: http://127.0.0.1:8250/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Distilled water: only one kind of particle, so it is a pure substance." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Pure substances and mixtures"
  say: "A pure substance has one kind of particle; a mixture has two or more."
  clip:
    - caption: { text: "Distilled water: only one kind of particle. A pure substance.", say: "Distilled water has only one kind of particle: a pure substance." }
    - wait: 3280
    - click: "Salt water"
    - caption: { text: "Salt water: two kinds of particle. A mixture.", say: "Salt water has two kinds of particle: a mixture." }
    - wait: 2620
    - click: "Air"
    - caption: { text: "Air is a mixture too: several kinds of particle.", say: "Air is a mixture too, of several kinds of particle." }
    - wait: 800
hook: "In the supermarket, \"100% pure\" orange juice means nothing has been added. In science, pure means something much stricter, and you can only check it by looking at the particles."
---
Before you can separate a mixture, you need to know whether you have one. That is a question about **particles**, not appearance.

## Engage: which one is pure?

```step
stage: predict
insight: "The shopping meaning of 'pure' and the idea that clear means pure are both exposed by this choice."
check:
  type: predict
  q: "Which one of these is a pure substance, as a scientist means it?"
  options: ["\"100% pure\" orange juice", "Clear, filtered seawater", "Distilled water", "Fresh mountain air"]
  actual: "Distilled water: it is the only one with a single kind of particle. Juice, seawater and air are all mixtures."
```

## Explore: zoom into five materials

```step
stage: run
insight: "Counting kinds of particles across liquids, gases and solids replaces judging by appearance."
try: { playground: science, starter: "boards.yml#zoom", height: 520 }
check: { type: board, text: "Zoom into all five materials.", expect: { done: true } }
```

Each colour or size is a different kind of particle. Count the kinds in each material.

## Explain: pure means one kind of particle

```step
stage: investigate
insight: "Classifying with a particle reason, then confronting salt water and juice, separates the science meaning from appearance and advertising."
tasks:
  - check:
      type: sort
      q: "Pure substance or mixture?"
      options: ["Pure substance", "Mixture"]
      items:
        - ["Distilled water", "Pure substance", "Only one kind of particle."]
        - ["Salt water", "Mixture", "Two kinds: water and salt."]
        - ["Sandy water", "Mixture", "Two kinds: water and sand."]
        - ["Air", "Mixture", "Mostly nitrogen and oxygen."]
        - ["Copper wire", "Pure substance", "Only copper particles."]
      explain: "Count the kinds of particles, not how the material looks."
  - check:
      type: question
      q: "Salt water looks exactly the same all the way through. Why is it still a mixture?"
      options: ["It contains two kinds of particles, even though they are evenly spread", "Because people added the salt", "It isn't: the salt has disappeared, so it is pure water", "Because it is slightly cloudy"]
      answer: 0
      feedback: [null, "Seawater is a mixture too, and nobody added its salt. It is about the particles.", "The salt is still there: you can taste it, and if you evaporate the water the salt is left behind.", "Salt water is perfectly clear. Looks can't tell you."]
      explain: "Evenly spread or not, two kinds of particles make a mixture."
  - check:
      type: question
      q: "So is \"100% pure\" orange juice a pure substance?"
      options: ["Yes, nothing has been added", "No: it contains water, sugars, acids and many other kinds of particles"]
      answer: 1
      feedback: ["That is the shopping meaning of pure.", null]
      explain: "\"Pure\" on the label only means nothing was added."
  - check: { type: reflect, text: "I wrote the difference between a pure substance and a mixture using particles, with salt water as an example." }
```

### Classify

### Salt water

### "Pure" juice

### In your own words

In your book: explain the difference between a pure substance and a mixture using particles. Use salt water as one example.

## Elaborate: even and uneven mixtures

```step
stage: modify
insight: "Homogeneous mixtures are where students most often mistake a mixture for a pure substance."
try: { playground: science, starter: "boards.yml#abc", height: 420 }
check:
  type: sort
  q: "A **homogeneous** mixture is evenly mixed: every part is the same. A **heterogeneous** mixture is uneven: you can find different parts. Name each diagram."
  options: ["Pure substance", "Homogeneous mixture", "Heterogeneous mixture"]
  items:
    - ["Diagram A", "Heterogeneous mixture", "Two kinds, unevenly spread: the big particles sit in a clump."]
    - ["Diagram B", "Pure substance", "Only one kind of particle."]
    - ["Diagram C", "Homogeneous mixture", "Two kinds, evenly spread through each other."]
  explain: "A and C are both mixtures; the difference is how evenly the particles are spread."
```

On paper: draw your own particle diagram for each type and label the key difference.

## Elaborate: around the house

```step
stage: modify
tier: wider
insight: "Everyday materials, labels and alloys force the particle definition over appearance."
check:
  type: sort
  q: "Pure substance or mixture? Think about the particles, not the label or the look."
  options: ["Pure substance", "Mixture"]
  items:
    - ["Table sugar from the packet", "Pure substance", "One kind of particle: sucrose."]
    - ["Milk", "Mixture", "Water, fats, proteins, sugars and more."]
    - ["A gold ring stamped 24 carat", "Pure substance", "24-carat gold is pure gold; lower carats are mixed with other metals."]
    - ["Concrete", "Mixture", "Cement, sand, gravel and water."]
    - ["A cup of tea", "Mixture", "Water plus many dissolved substances from the tea leaves."]
    - ["A diamond", "Pure substance", "Only carbon."]
    - ["Tap water", "Mixture", "Water with small amounts of dissolved minerals and chlorine: clean, but not pure."]
```

## Elaborate: solvents and solutes

```step
stage: modify
tier: wider
insight: "Watching the solute's particles spread between the solvent's shows why a solution is a mixture even though it looks like one substance."
try: { playground: science, starter: "boards.yml#dissolve", height: 480 }
tasks:
  - check: { type: board, text: "Add salt to the water and watch where its particles go.", expect: { done: true } }
  - check:
      type: question
      q: "In salt water, what is the solvent?"
      options: ["Water", "Salt"]
      answer: 0
      feedback: [null, "The salt is what dissolves: the solute. The solvent is what does the dissolving."]
      explain: "The solvent does the dissolving: water."
  - check:
      type: question
      q: "In a soft drink, what are the solutes?"
      options: ["Water", "Sugar and carbon dioxide gas"]
      answer: 1
      feedback: ["Water does the dissolving, so it is the solvent. The solutes are what dissolve in it.", null]
      explain: "A gas can be a solute too: that's the fizz."
```

A **solution** is a homogeneous mixture. The **solute** dissolves; the **solvent** does the dissolving.

### Dissolve

### Solvent

### Solutes

## Elaborate: borderline cases

```step
stage: modify
tier: wider
insight: "Alloys and variable mixtures test whether the definition is understood or just memorised."
tasks:
  - check:
      type: question
      q: "Stainless steel looks like a single shiny metal. It is mostly iron, with chromium and nickel particles spread evenly through it. Pure substance or mixture?"
      options: ["Pure substance", "Mixture"]
      answer: 1
      feedback: ["Looking like one metal isn't the test. Count the kinds of particle: iron, chromium and nickel.", null]
      explain: "Alloys are mixtures, even though they look like one metal."
  - check:
      type: question
      q: "Seawater can contain more or less salt depending on where it is collected. Is seawater with extra salt still the same mixture?"
      options: ["Yes: the same mixture with different amounts", "No: it becomes a new pure substance"]
      answer: 0
      feedback: [null, "It still has two or more kinds of particle, so it is still a mixture."]
      explain: "Mixtures can vary in how much of each part they contain."
  - check:
      type: question
      q: "Which statement is true of every pure substance?"
      options: ["It always has the same make-up, with one kind of particle", "It looks shiny and even", "It occurs naturally"]
      answer: 0
      feedback: [null, "Salt water looks even all the way through and is a mixture. Looks can't tell you.", "Distilled water is made by people and is pure; seawater is natural and is a mixture."]
      explain: "That is what makes the definition useful: a pure substance's make-up can't vary."
```

### Stainless steel

### Seawater

### The definition

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first prediction with what I found and can say what changed in my thinking." }
```

Which did you think was pure, and what made you think so? Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A pure substance contains only one kind of particle. A mixture contains two or more.
- You can't tell by looking: salt water and air look the same all the way through, but both are mixtures.
- "Pure" on a food label means nothing added. It does not mean a pure substance.
