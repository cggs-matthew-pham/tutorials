---
order: 1
node: AC9S8U04 n2
woven: [AC9S7I07]
assumes: [AC9S8U04 n1]   # sedimentary rocks: taught in class (no tutorial yet)
unit: rocks
title: Why do some rocks have big crystals?
summary: Igneous rock forms when magma or lava cools. Slow cooling underground gives large crystals (granite); fast cooling at the surface gives small crystals (basalt) or glass (obsidian). Crystal size is a record of cooling rate.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8253
  url: http://127.0.0.1:8253/index.html
  readySelector: "#board svg"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Crystal size and cooling"
  say: "Slow cooling makes large crystals; fast cooling makes small ones."
  clip:
    - caption: { text: "Magma cooling slowly, underground.", say: "Magma cooling slowly, underground." }
    - wait: 1630
    - click: "Cool the magma"
    - expect: { selector: "body", contains: "Solid rock" }
    - caption: { text: "Slow cooling: fewer, larger crystals, like granite.", say: "Slow cooling gives fewer, larger crystals, like granite." }
    - wait: 2950
    - click: "Very fast"
    - click: "Cool the magma"
    - wait: 4000
    - caption: { text: "Very fast cooling at the surface: many tiny crystals, like basalt.", say: "Very fast cooling at the surface gives many tiny crystals, like basalt." }
    - wait: 800
hook: "Granite kitchen benches have crystals you can see from across the room. Basalt has crystals too small to see. Both crystallised from molten rock: what was different?"
---
Rocks keep a record of how they formed. This lesson teaches you to read one part of it.

## Engage: big crystals or small?

```step
stage: predict
insight: "Students often link crystal size to the amount of magma or to time 'growing' without a mechanism; the board shows the competition between starting and growing crystals."
check:
  type: predict
  q: "Molten rock cools and sets into solid rock full of crystals. Which do you predict gives bigger crystals?"
  options: ["Cooling slowly, deep underground", "Cooling quickly, at the surface", "It makes no difference", "It depends only on how much molten rock there is"]
  actual: "Cooling slowly. Few crystals start, and they have time to grow large. Fast cooling starts many crystals at once and none can grow."
```

## Explore: cool the magma

```step
stage: run
insight: "Running the same melt at two cooling speeds and reading the results table makes the cause visible: number of crystals started, not time alone."
try: { playground: science, starter: "boards.yml#cool", height: 620 }
check: { type: board, text: "Cool the magma at two different speeds and compare the crystals.", expect: { done: true } }
```

Choose a cooling speed, then press **Cool the magma**. Each colour is one crystal. Do it again at a very different speed.

## Explain: crystal size records cooling rate

```step
stage: investigate
insight: "Explaining the mechanism (few crystals start, particles join them) lets students infer formation from crystal size instead of memorising rock names."
tasks:
  - check:
      type: question
      q: "Why did slow cooling give bigger crystals?"
      options: ["Only a few crystals started, and the particles had time to join them", "Slow cooling makes each particle bigger", "There was more magma", "Slow cooling melts the small crystals"]
      answer: 0
      feedback: [null, "The particles were the same size every time. Look at how many crystals there were.", "Every run started with the same amount of melt.", "Nothing melted again: the temperature only went down."]
      explain: "With little time below the melting point, few crystals start. Each one has time to collect particles from the melt and grow large."
  - check:
      type: question
      q: "Why did fast cooling give small crystals?"
      options: ["Many crystals started at once, and the melt set before any could grow large", "The particles shrank as they cooled", "Fast cooling breaks crystals apart"]
      answer: 0
      feedback: [null, "The particles were the same size every time.", "The crystals were never broken: many small ones grew side by side."]
      explain: "Cooling fast, the melt is soon far below its melting point and crystals start everywhere. They share out the particles and the rock sets before any gets big."
  - check:
      type: sort
      q: "Where did each rock form?"
      options: ["Intrusive (underground, slow cooling)", "Extrusive (at the surface, fast cooling)"]
      items:
        - ["Granite: large crystals you can see", "Intrusive (underground, slow cooling)"]
        - ["Basalt: crystals too small to see", "Extrusive (at the surface, fast cooling)"]
        - ["Obsidian: glass, no crystals", "Extrusive (at the surface, fast cooling)", "Cooled almost instantly: lava into water or air."]
        - ["Gabbro: large crystals, dark", "Intrusive (underground, slow cooling)", "Same make-up as basalt, but it cooled slowly underground."]
  - check: { type: reflect, text: "I explained why crystal size tells you how fast a rock cooled, using what the particles do." }
```

### Slow cooling

### Fast cooling

### Intrusive or extrusive

**Intrusive** rocks cool underground, inside other rock. **Extrusive** rocks cool after lava erupts onto the surface.

### In your own words

In your book: explain why granite has large crystals and basalt small ones. Use "cooling", "crystals start" and "time to grow".

## Elaborate: the extremes

```step
stage: modify
tier: typical
insight: "Pushing to instant cooling produces glass, which shows the limit of the mechanism: no time for any pattern."
try: { playground: science, starter: "boards.yml#extremes", height: 620 }
tasks:
  - check: { type: board, text: "Cool the magma very slowly, then instantly.", expect: { done: true } }
  - check:
      type: question
      q: "With instant cooling, most of the rock was glass. What does glass mean at the particle level?"
      options: ["The particles froze where they were, with no pattern", "The particles made one giant crystal", "The particles evaporated"]
      answer: 0
      feedback: [null, "A crystal has particles in a repeating pattern. Glass has none.", "Nothing left the melt: all the particles are still there."]
      explain: "Obsidian forms when lava cools so fast that particles can't move into a pattern at all."
```

### Two extremes

### Glass

## Elaborate: read a rock

```step
stage: modify
tier: wider
insight: "Applying the crystal size rule to unfamiliar samples is the transfer the node asks for."
tasks:
  - check:
      type: question
      q: "A rock has large crystals surrounded by tiny ones (geologists call it porphyry). What is the most likely history?"
      options: ["It cooled slowly underground for a while, then erupted and cooled quickly", "It cooled quickly and then slowly", "Two different rocks were glued together"]
      answer: 0
      feedback: [null, "Big crystals need slow cooling first: they had to grow before the rest set quickly.", "The large crystals grew inside the melt, so they belong to the same rock."]
      explain: "Two stages: slow cooling grew the big crystals, then fast cooling set the rest as tiny crystals around them."
  - check:
      type: question
      q: "Pumice is a glassy rock full of holes, so light it can float. What can you infer about how it formed?"
      options: ["It cooled very fast, while gas bubbles were still escaping", "It cooled slowly deep underground", "It was worn into shape by water"]
      answer: 0
      feedback: [null, "Slow cooling gives crystals, and pumice is glassy.", "Pumice's holes are gas bubbles, frozen in place."]
      explain: "Frothy lava blasted out of a volcano: cooled almost instantly, trapping gas bubbles in glass."
```

### Big and small together

### Pumice

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction with the results table and can say what I now think causes crystal size." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Igneous** rock forms when magma (underground) or lava (at the surface) cools and sets.
- **Slow cooling** (intrusive, underground): few crystals start and grow large. Granite, gabbro.
- **Fast cooling** (extrusive, at the surface): many crystals start, all stay small. Basalt.
- **Instant cooling**: no time for a pattern, so glass. Obsidian, pumice.
- **Crystal size is a record of cooling rate.**
