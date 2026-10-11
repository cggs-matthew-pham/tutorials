---
order: 7
node: AC9S9U07 n2
unit: equations
title: Where do the atoms go?
summary: In a chemical reaction atoms are rearranged into new particles, never made or destroyed. Counting atoms before and after shows why mass is conserved and why equations must balance.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8246
  url: http://127.0.0.1:8246/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Hydrogen and oxygen before they react: the same atoms will be rearranged into water." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Rearranging atoms"
  say: "In a reaction atoms are rearranged; none are made or destroyed."
  clip:
    - caption: { text: "Hydrogen and oxygen react to make water.", say: "Hydrogen and oxygen react to make water." }
    - wait: 4500
    - caption: { text: "Check the atom tally: the same atoms before and now.", say: "Check the atom tally: the same atoms before and now." }
    - wait: 2500
    - caption: { text: "Atoms are rearranged, not made or destroyed, so mass is conserved.", say: "Atoms are rearranged, not made or destroyed, so mass is conserved." }
    - wait: 800
hook: "A log burns down to a handful of ash. Where did the rest of the log go?"
---
You know a chemical change makes a new substance. This lesson follows the atoms.

## Engage: burning methane

```step
stage: predict
insight: "Students who think burning destroys matter or turns it into energy will pick those options; the atom tally answers them directly."
check:
  type: predict
  q: "Methane (natural gas, CH₄) burns in a gas stove. What happens to the carbon and hydrogen atoms in the methane?"
  options: ["They are destroyed by the flame", "They turn into heat and light", "They join oxygen atoms to make new particles", "They float away as smoke, still as methane"]
  actual: "They join oxygen atoms: carbon ends up in carbon dioxide (CO₂) and hydrogen in water (H₂O). Every atom is still there."
```

## Explore: count the atoms

```step
stage: run
insight: "The live atom tally makes 'same atoms, new arrangement' visible while the reaction runs."
try: { playground: science, starter: "boards.yml#burn", height: 580 }
check: { type: board, text: "Burn the methane until the target is reached.", expect: { done: true } }
```

Watch the line under the counts: **atoms at the start** and **now**. Do the numbers ever change?

## Explain: rearranged, not destroyed

```step
stage: investigate
insight: "Counting atoms on both sides, then connecting the count to mass, makes conservation a consequence rather than a rule to memorise."
tasks:
  - check:
      type: question
      q: "What happened to the number of each type of atom during the reaction?"
      options: ["It stayed the same", "It went down as the methane was used up", "It went up as new particles formed"]
      answer: 0
      feedback: [null, "The methane particles were used up, but their atoms are in the new particles.", "There are more particles at the end, but the same atoms."]
      explain: "Particles change; atoms don't. Bonds break and new bonds form."
  - check:
      type: number
      q: "In CH₄ + 2O₂ → CO₂ + 2H₂O, how many oxygen atoms are on the left side?"
      answer: 4
      explain: "2O₂ is two oxygen particles, each with 2 atoms: 4 oxygen atoms."
  - check:
      type: number
      q: "How many oxygen atoms are on the right side?"
      answer: 4
      explain: "CO₂ has 2, and 2H₂O has 2 (one in each water): 4."
  - check:
      type: question
      q: "Why must the mass of the products equal the mass of the reactants?"
      options: ["The same atoms are there, just rearranged, and each atom keeps its mass", "Energy is conserved", "The products are the same substances as the reactants"]
      answer: 0
      feedback: [null, "Energy is conserved too, but mass is about the atoms.", "The products are new substances. Only the atoms are the same."]
      explain: "Same atoms, same mass. This is the law of conservation of mass."
  - check: { type: reflect, text: "I explained why the mass doesn't change in a reaction, using atoms." }
```

### The atom count

### Count one side

### Count the other side

### Why mass is conserved

### In your own words

In your book: draw CH₄ + 2O₂ → CO₂ + 2H₂O as particles before and after, with each atom as a labelled circle. Then explain, using atoms, why the total mass is the same before and after a reaction.

## Practise: balanced or not?

```step
stage: practise
insight: "Checking balance by counting atoms is the skill equations depend on; doing it for several reactions builds the habit."
tasks:
  - check:
      type: sort
      q: "Is each equation balanced (the same atoms on both sides)?"
      options: ["Balanced", "Not balanced"]
      items:
        - ["H₂ + Cl₂ → 2HCl", "Balanced", "2 H and 2 Cl on each side."]
        - ["H₂ + O₂ → H₂O", "Not balanced", "2 O on the left, 1 on the right."]
        - ["2H₂ + O₂ → 2H₂O", "Balanced", "4 H and 2 O on each side."]
        - ["C + O₂ → CO₂", "Balanced"]
        - ["N₂ + H₂ → NH₃", "Not balanced", "2 N on the left, 1 on the right; 2 H on the left, 3 on the right."]
        - ["CH₄ + O₂ → CO₂ + H₂O", "Not balanced", "4 H on the left, 2 on the right; 2 O on the left, 3 on the right."]
  - check:
      type: question
      q: "To balance H₂ + O₂ → H₂O, a student changes it to H₂ + O₂ → H₂O₂. What is wrong?"
      options: ["H₂O₂ is a different substance (hydrogen peroxide), not water", "Nothing: it balances now", "You can't put a 2 after O"]
      answer: 0
      feedback: [null, "It balances, but it describes a different reaction.", "You can, but it changes the substance."]
      explain: "Balance by changing how many particles (the big numbers in front), never the formulas: 2H₂ + O₂ → 2H₂O."
```

### Balanced or not

### Changing the formula

## Elaborate: making water

```step
stage: modify
tier: typical
insight: "A second reaction, with a ratio to reason about, extends counting to predicting how much product forms."
try: { playground: science, starter: "boards.yml#water", height: 580 }
tasks:
  - check: { type: board, text: "React the hydrogen and oxygen.", expect: { done: true } }
  - check:
      type: number
      q: "In 2H₂ + O₂ → 2H₂O, 12 hydrogen particles react with 6 oxygen particles. How many water particles can form?"
      answer: 12
      explain: "Every 2 H₂ and 1 O₂ make 2 H₂O. Six times over: 12 H₂O, with 24 H and 12 O atoms, the same as at the start."
```

### React

### Predict the amount

## Elaborate: open and closed

```step
stage: modify
tier: wider
insight: "Apparent mass loss in open containers is the main evidence students cite against conservation; explaining it with the atom model completes the idea."
tasks:
  - check:
      type: question
      q: "Wood burned on an open fire leaves ash that weighs much less than the wood. Does that break conservation of mass?"
      options: ["No: carbon dioxide and water vapour went into the air, carrying atoms away", "Yes: the burnt atoms were destroyed", "Yes: the energy given out had mass"]
      answer: 0
      feedback: [null, "Weigh it in a sealed container and the mass stays the same.", "The energy given out does not account for the missing mass; the gases do."]
      explain: "In an open container, gaseous products escape. In a sealed one, the mass doesn't change."
  - check:
      type: question
      q: "An iron nail gets heavier as it rusts. Where does the extra mass come from?"
      options: ["Oxygen atoms from the air join the iron", "Rust is a heavier kind of iron", "Water makes it heavier"]
      answer: 0
      feedback: [null, "The iron atoms don't change; new atoms join them.", "Water helps rusting happen, but the extra mass is mostly oxygen locked into iron oxide."]
      explain: "Iron + oxygen → iron oxide. The mass gained is the mass of the oxygen atoms."
```

### An open fire

### A rusting nail

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about methane's atoms with the atom count, and can say what changed in my thinking." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- In a chemical reaction, **atoms are rearranged**: bonds break and new bonds form. No atom is made or destroyed.
- The same atoms means the **same mass**: the law of **conservation of mass**.
- A **balanced equation** has the same number of each type of atom on both sides. Balance it by changing the numbers in front, never the formulas.
- Mass seems to change only when a gas escapes or joins from the air.
