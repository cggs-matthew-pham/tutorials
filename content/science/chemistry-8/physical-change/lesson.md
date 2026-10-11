---
order: 6
node: AC9S8U07 n1
unit: changes
title: Same particles, new look?
summary: "In a physical change (melting, boiling, dissolving) the particles move, spread out or pack together, but every particle stays the same: no new substance is made. Steam is still made of water particles."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8266
  url: http://127.0.0.1:8266/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "Steam: the same water particles (H₂O) as ice and liquid water, just moving fast and far apart." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Physical change"
  say: "In a physical change the particles move, but stay the same particles."
  clip:
    - caption: { text: "Ice: water particles vibrating in fixed places.", say: "Ice: water particles vibrating in fixed places." }
    - wait: 3200
    - click: { selector: "input[type=range]" }
    - caption: { text: "Warmer: the same particles slide past each other. Liquid water.", say: "Warmer, the same particles slide past each other. Liquid water." }
    - wait: 3400
    - press: End
    - caption: { text: "Hotter still: the same particles fly apart. Steam.", say: "Hotter still, the same particles fly apart. Steam." }
    - wait: 3000
    - caption: { text: "No new particles, no new substance: a physical change.", say: "No new particles, so no new substance: a physical change." }
    - wait: 800
hook: "A puddle disappears on a hot day. A sugar cube vanishes in tea. Has anything actually gone?"
---
You know particles are atoms, alone or joined. This lesson asks what happens to them when something melts, boils or dissolves.

## Engage: the bubbles in boiling water

```step
stage: predict
insight: "Students who think boiling breaks water into hydrogen and oxygen, or that the particles themselves expand, pick those options; the board keeps every particle the same."
check:
  type: predict
  q: "Water boils in a kettle and bubbles rise. What are the bubbles made of?"
  options: ["Water particles (steam), far apart", "Hydrogen and oxygen, split off from the water", "Air that was hiding in the water", "Water particles that have grown bigger"]
  actual: "Water particles, as steam. Boiling only gives the particles enough energy to escape each other and spread out; each one is still H₂O. Nothing new is made, so boiling is a physical change."
```

## Explore: melt, boil, dissolve

```step
stage: run
insight: "Watching the same particles rearrange through three changes builds the particle test for a physical change: same particles, new arrangement."
try: { playground: science, starter: "boards.yml#melt", height: 520 }
tasks:
  - starter: "boards.yml#melt"
    check: { type: board, text: "Heat the water from ice to steam.", expect: { done: true } }
  - starter: "boards.yml#dissolve"
    check: { type: board, text: "Dissolve some salt in the water.", expect: { done: true } }
```

### Ice to steam

Drag the temperature slider. Watch how the particles are arranged and how they move. Do any new kinds of particle appear?

### Dissolving

Add salt. Where do the salt particles go?

## Explain: what a physical change is

```step
stage: investigate
insight: "Naming what changes (arrangement, spacing, motion) and what doesn't (the particles themselves) makes 'no new substance' a particle-level statement, ready for chemical change."
tasks:
  - check:
      type: question
      q: "In melting, boiling and dissolving, what happens to the particles?"
      options: ["They change how they are arranged and how they move, but stay the same particles", "They turn into new particles", "They get bigger as they warm up"]
      answer: 0
      feedback: [null, "No new kinds of particle appeared on the board.", "Particles don't grow; the gaps between them do."]
      explain: "A physical change rearranges the same particles. Nothing new is made."
  - check:
      type: sort
      q: "Physical change: what changes, and what stays the same?"
      options: ["Changes", "Stays the same"]
      items:
        - ["How the particles are arranged", "Changes"]
        - ["How fast the particles move", "Changes"]
        - ["The spaces between the particles", "Changes"]
        - ["The atoms inside each particle", "Stays the same"]
        - ["The number of particles", "Stays the same"]
        - ["The substance", "Stays the same", "Ice, water and steam are all water."]
  - check:
      type: sort
      q: "Physical change or not?"
      options: ["Physical change", "Not physical: a new substance forms"]
      items:
        - ["Butter melting", "Physical change"]
        - ["Water vapour forming drops on a cold window", "Physical change"]
        - ["Sugar dissolving in tea", "Physical change", "The sugar particles are still there, spread through the tea."]
        - ["Cutting paper into pieces", "Physical change"]
        - ["Toast burning", "Not physical: a new substance forms"]
        - ["An iron nail rusting", "Not physical: a new substance forms"]
  - check:
      type: question
      q: "Salt dissolved in water seems to disappear. How could you show it is still there?"
      options: ["Evaporate the water: the salt is left behind", "You can't: dissolved salt is destroyed", "Filter it out with filter paper"]
      answer: 0
      feedback: [null, "Particles aren't destroyed in a physical change.", "Dissolved particles are far too small to be caught by filter paper."]
      explain: "The salt particles are spread between the water particles. Evaporating the water leaves them behind as crystals."
  - check:
      type: question
      q: "Melting, boiling and dissolving can usually be reversed. Why?"
      options: ["The same particles are still there, so they can be brought back to how they were", "Being reversible is what makes a change physical", "Any change can be reversed if you try hard enough", "No energy goes in or out, so nothing is lost"]
      answer: 0
      feedback: [null, "That's the wrong way round. A change is physical because no new substance is made; being reversible follows from that. Some physical changes, like shattering a glass, are hard to undo.", "Burnt toast can't be turned back into bread: its particles have changed. Undoing a change only works when the original particles are still there.", "Melting and boiling take in energy, and freezing gives it out. Reversing is possible because the particles haven't changed."]
      explain: "No new substance is made, so the original particles are all still there to rearrange back. Being reversible is a result of a physical change, not what defines it."
  - check: { type: reflect, text: "I can explain a physical change as the same particles rearranged, with no new substance made." }
```

### The particles

### What changes

### Physical or not

### Where the salt went

### Why it can be reversed

### In your own words

In your book: draw the particles of ice, liquid water and steam in three boxes, using the same symbol for each water particle. Under them, explain why melting and boiling are physical changes.

## Elaborate: inside the steam

```step
stage: modify
tier: typical
insight: "Inspecting the atoms of steam particles answers the bubbles question directly: still H₂O, not hydrogen and oxygen."
try: { playground: science, starter: "boards.yml#steam", height: 520 }
tasks:
  - check: { type: board, text: "Inspect the particles in the steam.", expect: { done: true } }
  - check:
      type: question
      q: "What is in each steam particle?"
      options: ["Two hydrogen atoms joined to one oxygen atom: H₂O, the same as liquid water", "Separate hydrogen and oxygen atoms", "Air"]
      answer: 0
      feedback: [null, "Boiling doesn't split the particles; that would be a chemical change.", "The particles came out of the water, so they are water."]
      explain: "Steam is water as a gas: the same H₂O particles, moving fast and far apart."
```

### Steam

### What's inside

## Elaborate: does mass change?

```step
stage: modify
tier: wider
insight: "Keeping track of the particles explains why mass stays the same in a physical change, even when volume changes."
try: { playground: science, starter: "boards.yml#melt", height: 520 }
tasks:
  - check: { type: board, text: "Heat the ice to steam again. Does the number of particles change?", expect: { done: true } }
  - check:
      type: question
      q: "100 g of ice melts in a sealed bag. What is the mass of the water?"
      options: ["100 g: the same particles, so the same mass", "Less than 100 g: water takes up less space", "More than 100 g: liquids are heavier"]
      answer: 0
      feedback: [null, "Volume can change a little, but mass depends on the particles, and they are all still there.", "The same particles have the same mass in any state."]
      explain: "No particles are made or lost in a physical change, so the mass stays the same. (Ice is actually a little less dense than water, which is why it floats.)"
```

### Count them

### The mass

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the bubbles in boiling water with the particles on the board." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- In a **physical change** (melting, freezing, boiling, condensing, dissolving, cutting) the particles change how they are arranged, how far apart they are and how fast they move.
- The particles themselves stay the same, so **no new substance** is made. Steam is still water; dissolved salt is still salt.
- The number of particles stays the same, so the **mass** stays the same.
- Next lesson: a **chemical change**, where atoms rearrange into new particles.
