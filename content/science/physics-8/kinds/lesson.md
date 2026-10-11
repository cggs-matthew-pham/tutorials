---
order: 1
node: [AC9S8U05 n1, AC9S8U05 n2]
unit: energy
title: Moving or stored?
summary: "Energy comes in two big families. Kinetic energy is energy of activity: movement, heat, sound, light and electricity. Potential energy is stored, ready to be released: chemical (food, fuel, batteries), gravitational (things up high) and elastic (things stretched or squashed). Energy can change from one to the other and back."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8283
  url: http://127.0.0.1:8283/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "A roller coaster car at the top of the first hill: almost all of its energy is gravitational potential (blue). As it rolls down, that becomes kinetic (orange)." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Kinetic and potential energy"
  say: "Potential energy is stored; kinetic energy is energy of movement and activity."
  clip:
    - caption: { text: "At the top, the car is high and slow: its energy is stored, gravitational potential.", say: "At the top, the car's energy is stored: gravitational potential." }
    - wait: 3200
    - click: "Play"
    - caption: { text: "Rolling down, stored energy becomes kinetic energy: movement.", say: "Rolling down, the stored energy becomes kinetic energy: movement." }
    - wait: 3200
    - caption: { text: "Up the next hill, kinetic becomes potential again. The total never changes.", say: "Up the next hill, kinetic becomes potential again. The total stays the same." }
    - wait: 3600
hook: "A roller coaster has no engine after the first climb. Yet it races down, swoops up the next hill and keeps going for a minute or more. Where does its energy come from?"
---
In earlier years you met sound, heat, light and electricity one at a time. This lesson sorts them into two families.

## Engage: the book on the shelf

```step
stage: predict
insight: "Students link energy only to movement; a still book with stored energy is the case that needs the idea of potential energy."
check:
  type: predict
  q: "A heavy book sits still on a high shelf. Does it have any energy?"
  options: ["Yes: stored energy, because it is high up and could fall", "No: it isn't moving", "Only if someone pushes it", "No: energy is only in living things"]
  actual: "Yes. It has gravitational potential energy, stored because it is high up. Knock it off and that stored energy becomes kinetic energy as it falls."
```

## Explore: ride the coaster

```step
stage: run
insight: "Watching two bars trade places as the car goes down and up makes 'stored' and 'moving' energy two forms of one thing."
try: { playground: board, starter: "boards.yml#coaster", height: 640 }
check: { type: board, text: "Run the coaster to the end. Watch the blue (potential) and orange (kinetic) bars.", when: "r >= 1" }
```

Press **Play**. Where is the car when the orange bar is tallest? When is the blue bar tallest?

## Explain: two families

```step
stage: investigate
insight: "Sorting familiar energy forms into kinetic and potential, then naming what decides how much is stored, organises years of separate ideas into one framework."
tasks:
  - check:
      type: sort
      q: "Kinetic (active) or potential (stored)?"
      options: ["Kinetic", "Potential"]
      items:
        - ["A rolling ball", "Kinetic"]
        - ["The heat from a heater", "Kinetic", "Heat is the movement of particles."]
        - ["Music from a speaker", "Kinetic", "Sound is vibrating air."]
        - ["Light from a torch", "Kinetic"]
        - ["Food in your lunchbox", "Potential", "Stored as chemical energy, released when you digest it."]
        - ["A stretched rubber band", "Potential"]
        - ["A charged battery", "Potential"]
        - ["A diver on a high board", "Potential"]
  - check:
      type: question
      q: "On the coaster, where is the kinetic energy greatest?"
      options: ["At the bottom of the deepest dip, where the car is fastest", "At the top of the first hill", "It stays the same everywhere"]
      answer: 0
      feedback: [null, "At the top the car is slow: most of its energy is potential.", "The bars change all the time; only the total stays the same."]
      explain: "Lowest point, least potential energy, so the most kinetic energy: the car is fastest there."
  - check:
      type: question
      q: "What decides how much gravitational potential energy something has?"
      options: ["How heavy it is and how high it is", "How fast it is moving", "What colour it is"]
      answer: 0
      feedback: [null, "Speed decides kinetic energy.", "Colour has nothing to do with it."]
      explain: "Heavier and higher means more stored. Likewise, stretching a spring further stores more elastic energy, and different foods store different amounts of chemical energy."
  - check: { type: reflect, text: "I can sort energy into kinetic and potential, with examples of each." }
```

### Sort them

### Fastest point

### How much is stored

### In your own words

In your book: draw two columns, Kinetic and Potential, with at least three examples in each. Then draw the coaster with arrows showing where potential energy becomes kinetic.

## Elaborate: a higher hill

```step
stage: modify
tier: typical
insight: "Starting higher shows stored energy depends on height, and that a bigger store means more kinetic energy later."
try: { playground: board, starter: "boards.yml#higher", height: 640 }
tasks:
  - check: { type: board, text: "This coaster starts at 45 m instead of 30 m. Run it to the end.", when: "r >= 1" }
  - check:
      type: question
      q: "Compared with the 30 m start, what is different?"
      options: ["More total energy, so the car goes faster at the bottom", "The same total energy", "Less kinetic energy at the bottom"]
      answer: 0
      feedback: [null, "Higher means more stored energy to start with.", "More stored at the start means more to turn into movement."]
      explain: "More height, more gravitational potential energy, more kinetic energy when it comes down."
```

### Start higher

### What changed

## Elaborate: trampolines and bows

```step
stage: modify
tier: wider
insight: "Elastic potential energy completes the potential family and shows energy changing back and forth."
check:
  type: question
  q: "On a trampoline you land, sink down, and spring back up. Which energy is stored at the lowest point?"
  options: ["Elastic potential energy, in the stretched trampoline", "Kinetic energy, because you're moving fast", "No energy: you've stopped for an instant"]
  answer: 0
  feedback: [null, "At the lowest point you're still for an instant: no kinetic energy.", "The energy hasn't gone: it's stored in the stretched mat and springs."]
  explain: "Kinetic → elastic potential as the mat stretches, then back to kinetic and up to gravitational potential as you rise."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my answer about the book on the shelf with what I now know about stored energy." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Kinetic energy** is energy of activity: movement, heat (thermal), sound, light, electrical.
- **Potential energy** is stored: chemical (food, fuel, batteries), gravitational (height), elastic (stretched or squashed).
- How much is stored depends on height and mass, how far something is stretched, or what a substance is made of.
- Energy changes between kinetic and potential, as on a roller coaster. The total stays the same.
