---
order: 2
node: [AC9S8U05 n3, AC9S8U05 n4]
unit: energy
title: Transfer or transformation?
summary: "In a transfer, the same type of energy moves from one place to another (heat from a hot drink into your hands). In a transformation, energy changes type (chemical energy in a battery becomes electrical, then light). Almost every transformation also makes some heat that isn't wanted: a by-product."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8284
  url: http://127.0.0.1:8284/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Transfer and transformation"
  say: "A transfer moves energy; a transformation changes its type."
  clip:
    - caption: { text: "A torch. The battery stores chemical energy.", say: "A torch. The battery stores chemical energy." }
    - wait: 2600
    - caption: { text: "Chemical becomes electrical in the wires: the type changes, a transformation.", say: "Chemical becomes electrical: the type changes. That's a transformation." }
    - wait: 3800
    - caption: { text: "Electrical becomes light in the bulb, with heat as a by-product.", say: "Electrical becomes light in the bulb, with some heat as a by-product." }
    - wait: 3400
    - caption: { text: "A transfer keeps the same type, just in a new place, like heat into your hands.", say: "A transfer keeps the same type, just in a new place." }
    - wait: 1200
hook: "Touch an old-style light bulb that has been on for a minute and it burns your finger, even though it was only meant to make light."
---
Energy comes in two families, kinetic and potential. This lesson follows it as it moves and changes.

## Engage: the hot bulb

```step
stage: predict
insight: "Students expect a device to produce only its useful output; by-product heat is the hinge idea for efficiency in Year 9."
check:
  type: predict
  q: "A torch bulb is switched on. What kinds of energy come out of it?"
  options: ["Light, and some heat", "Only light: that's its job", "Only heat", "Electricity"]
  actual: "Light, and some heat. Almost every time energy changes type, some of it becomes heat that isn't wanted: a by-product. Old filament bulbs turned most of their energy into heat."
```

## Explore: build the flow

```step
stage: run
insight: "Filling in a flow diagram stage by stage, and deciding for each arrow whether the type changed, makes 'transfer' and 'transformation' a rule students apply."
try: { playground: board, starter: "boards.yml#torch", height: 620 }
tasks:
  - starter: "boards.yml#torch"
    check: { type: board, text: "Complete the torch: choose the useful energy at each stage and whether each arrow is a transfer or a transformation, then Check.", when: "c = 1" }
  - starter: "boards.yml#cocoa"
    check: { type: board, text: "Now a hot chocolate warming your hands.", when: "c = 1" }
```

### The torch

### Hot chocolate

## Explain: transfer, transformation, by-products

```step
stage: investigate
insight: "Defining the two processes, sorting examples, and naming by-product heat (not lost, just not useful) prepares conservation and efficiency."
tasks:
  - check:
      type: sort
      q: "Transfer (same type, new place) or transformation (type changes)?"
      options: ["Transfer", "Transformation"]
      items:
        - ["Heat from a hot pan into the handle", "Transfer"]
        - ["A moving cue ball hitting another ball and making it move", "Transfer", "Kinetic to kinetic: same type, new place."]
        - ["Sound travelling from a speaker to your ear", "Transfer"]
        - ["A battery lighting a bulb", "Transformation"]
        - ["A ball falling from a shelf", "Transformation", "Gravitational potential becomes kinetic."]
        - ["Burning wood", "Transformation", "Chemical becomes heat and light."]
  - check:
      type: question
      q: "A bulb makes light and heat. Which is the by-product?"
      options: ["The heat: it isn't the job the bulb is for", "The light", "Neither"]
      answer: 0
      feedback: [null, "Light is the useful output of a bulb.", "Most energy changes make some by-product heat."]
      explain: "The useful output is what the device is for; by-products are the rest, usually heat and sometimes sound."
  - check:
      type: question
      q: "Is the by-product heat from a bulb destroyed?"
      options: ["No: it spreads into the room, where it is hard to use", "Yes: by-products are destroyed", "It turns back into electricity"]
      answer: 0
      feedback: [null, "Energy is never destroyed (Year 9 makes this a law).", "It doesn't flow back by itself."]
      explain: "The heat warms the air a little. It isn't lost, just spread out and not useful."
  - check: { type: reflect, text: "I can tell a transfer from a transformation and name by-product heat." }
```

### Transfer or transformation

### By-products

### Not destroyed

### In your own words

In your book: draw the torch as a flow diagram (boxes and arrows). Label each arrow "transfer" or "transformation", and add the by-product heat with a side arrow.

## Elaborate: a speaker

```step
stage: modify
tier: typical
insight: "A four-stage chain with a by-product in the middle checks the rule on an unfamiliar device."
try: { playground: board, starter: "boards.yml#speaker", height: 620 }
tasks:
  - check: { type: board, text: "Complete the phone speaker, then Check.", when: "c = 1" }
  - check:
      type: question
      q: "The speaker cone gets slightly warm. Where in the flow does that heat come from?"
      options: ["A by-product when electrical energy becomes movement of the cone", "From the sound", "From the battery directly"]
      answer: 0
      feedback: [null, "Sound is the useful output, at the end.", "The battery's energy goes through the circuit first."]
      explain: "Each transformation tends to give off a little heat: here, in the speaker's coil and cone."
```

### The speaker

### Where the heat comes from

## Elaborate: a bow and arrow

```step
stage: modify
tier: wider
insight: "Elastic potential in a bent bow shows a transformation into stored energy and back out again."
try: { playground: board, starter: "boards.yml#bow", height: 620 }
tasks:
  - check: { type: board, text: "Complete the bow and arrow, then Check.", when: "c = 1" }
  - check:
      type: question
      q: "Why does a bow need to be drawn back before the arrow can fly?"
      options: ["Drawing it stores elastic potential energy, which becomes the arrow's kinetic energy", "To aim it", "To warm it up"]
      answer: 0
      feedback: [null, "Aiming matters, but the energy comes from bending the bow.", "Warming has nothing to do with it."]
      explain: "The archer's chemical energy is stored as elastic potential in the bow, then released as the arrow's kinetic energy."
```

### The bow

### Drawing it back

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the torch bulb with the flow diagram." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Transfer**: the same type of energy moves to a new place (heat into your hands, sound to your ear).
- **Transformation**: energy changes type (chemical → electrical → light in a torch).
- Almost every transformation also makes **by-product** heat (and sometimes sound) that isn't the useful output.
- By-product energy isn't destroyed: it spreads into the surroundings.
