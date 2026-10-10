---
order: 3
unit: changes
title: Is it a new substance?
summary: A chemical change makes a new substance, because atoms rearrange into new particles. A physical change only rearranges or spreads out the same particles. "Can it be reversed?" is not the test.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8243
  url: http://127.0.0.1:8243/index.html
  readySelector: "#board svg"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Chemical change"
  say: "A chemical change makes a new substance by rearranging atoms."
  clip:
    - caption: { text: "Hydrogen and chlorine molecules collide. A yellow ring marks a reaction.", say: "Hydrogen and chlorine molecules collide; a yellow ring marks each reaction." }
    - wait: 4000
    - caption: { text: "The atoms separate and join into new particles: hydrogen chloride.", say: "The atoms separate and join into new particles: hydrogen chloride." }
    - wait: 3000
    - caption: { text: "A new substance: a chemical change. Melting only moves the same particles.", say: "That makes a new substance; melting only moves the same particles." }
    - wait: 800
hook: "You can melt ice and freeze it again. You can't unburn toast. Is that how to tell a chemical change? Dissolved salt comes back when the water dries up…"
---
In Year 6 you may have learned that changes you can reverse are physical. This lesson tests that rule, and replaces it with a better one.

## Engage: is reversing the test?

```step
stage: predict
insight: "Most students hold the reversibility rule from primary school; committing to it first makes its failure (dissolving) memorable."
check:
  type: predict
  q: "Someone says: \"If a change can be reversed it is physical, and if it can't be reversed it is chemical.\" Is that a reliable test?"
  options: ["Yes, it always works", "It works for most changes but there are exceptions both ways", "No, it never works"]
  actual: "It has exceptions both ways. Dissolving salt can be reversed and is physical, but some chemical changes can be reversed too (recharging a battery). The reliable test is whether a new substance is made."
```

## Explore: watch the particles

```step
stage: run
insight: "Watching the particles in a chemical change and a physical change, side by side, shows the difference the new substance criterion names."
try: { playground: science, starter: "boards.yml#react", height: 560 }
tasks:
  - starter: "boards.yml#react"
    check: { type: board, text: "Let hydrogen and chlorine react until 10 hydrogen chloride particles have formed.", expect: { done: true } }
  - starter: "boards.yml#melt"
    check: { type: board, text: "Heat the water from ice to steam.", expect: { done: true } }
```

### A chemical change

Hydrogen chloride is a new substance: it dissolves in water to make hydrochloric acid. Watch where its atoms come from.

### A physical change

Ice, water and steam. Watch the particles themselves.

## Explain: the new substance test

```step
stage: investigate
insight: "Stating the new substance criterion as a replacement for reversibility, then applying it to cases that break the old rule, is the hinge."
tasks:
  - check:
      type: question
      q: "On the reaction board, what happened to the atoms?"
      options: ["They rearranged into new particles: hydrogen chloride", "Some atoms were destroyed", "New atoms were made", "They melted together"]
      answer: 0
      feedback: [null, "Check the panel: the number of H and Cl atoms is the same at the start and now.", "Check the panel: the atom counts never change.", "Nothing melted. The atoms separated and joined in new pairs."]
      explain: "The atoms are the same; they are arranged into different particles. A new particle means a new substance."
  - check:
      type: question
      q: "When the ice melted and boiled, what happened to the water particles?"
      options: ["They stayed water particles; only their spacing and motion changed", "They turned into hydrogen and oxygen", "They became steam particles, a new substance"]
      answer: 0
      feedback: [null, "Steam is still water. No atoms were rearranged.", "Steam is water in the gas state: the same particles, further apart."]
      explain: "A change of state is physical: the same particles, arranged and moving differently."
  - check:
      type: sort
      q: "Physical or chemical? Use the new substance test."
      options: ["Physical", "Chemical"]
      items:
        - ["Ice melting", "Physical", "Still water."]
        - ["Salt dissolving in water", "Physical", "The salt is still there: evaporate the water and you get it back."]
        - ["Paper burning", "Chemical", "New substances: carbon dioxide, water and ash."]
        - ["An iron nail rusting", "Chemical", "Rust (iron oxide) is a new substance."]
        - ["Cooking an egg", "Chemical", "The egg's proteins change into new substances: it can't go back to runny."]
        - ["Water boiling", "Physical", "The bubbles are steam: still water."]
        - ["Baking soda fizzing in vinegar", "Chemical", "The bubbles are carbon dioxide, a new gas."]
        - ["Chocolate melting", "Physical"]
  - check:
      type: question
      q: "Dissolving salt can be reversed, and it is physical. Which of these breaks the old \"can it be reversed?\" rule the other way?"
      options: ["Recharging a battery: a chemical change that can be reversed", "Freezing water", "Cutting paper"]
      answer: 0
      feedback: [null, "Freezing is physical and can be reversed, so it fits the old rule.", "Cutting is physical and can't easily be reversed, but no new substance is made."]
      explain: "Charging and using a battery runs chemical reactions forwards and backwards. Reversibility is a clue, not the test."
  - check: { type: reflect, text: "I explained why \"can it be reversed?\" is not a reliable test, using a counterexample, and stated the new substance test." }
```

### The reaction

### The change of state

### Physical or chemical

### When the old rule fails

### In your own words

In your book: explain the new substance test, then explain why dissolving salt shows that "can it be reversed?" is not the test.

## Elaborate: is dissolving chemical?

```step
stage: modify
tier: typical
insight: "Dissolving is the classic ambiguous case: the solid seems to disappear, but the particles are unchanged."
try: { playground: science, starter: "boards.yml#dissolve", height: 480 }
tasks:
  - check: { type: board, text: "Dissolve the salt in the water.", expect: { done: true } }
  - check:
      type: question
      q: "The salt disappeared. Is dissolving a chemical change?"
      options: ["No: the salt particles are still there, spread between the water particles", "Yes: the salt turned into water", "Yes: the salt was destroyed"]
      answer: 0
      feedback: [null, "Taste salty water: the salt is still there.", "Evaporate the water and you get the salt back, the same substance."]
      explain: "No new substance: physical. The salt particles spread out between the water particles."
```

### Dissolve

### Disappear, or spread out?

## Elaborate: burning

```step
stage: modify
tier: wider
insight: "Burning is the change students most often describe as 'destroying' the fuel; watching the atoms go into new products counters that."
try: { playground: science, starter: "boards.yml#burn", height: 560 }
tasks:
  - check: { type: board, text: "Burn the methane.", expect: { done: true } }
  - check:
      type: sort
      q: "When methane burns, what happens to its atoms?"
      options: ["True", "False"]
      items:
        - ["The carbon atoms end up in carbon dioxide", "True"]
        - ["The hydrogen atoms end up in water", "True"]
        - ["The methane is destroyed and turns into energy", "False", "The atoms are all still there, in new particles. The energy came from the rearrangement."]
        - ["The gas gets hotter", "True", "Burning releases energy: watch the temperature in the panel."]
```

### Burn it

### Where did the atoms go?

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about reversing with what I know now." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **chemical change** makes a **new substance**: atoms separate and join into new particles.
- A **physical change** (melting, boiling, dissolving) keeps the same particles.
- **"Is there a new substance?"** is the test. "Can it be reversed?" is only a clue: dissolving can be reversed and is physical.
- In a chemical change no atoms are made or destroyed; they are rearranged.
