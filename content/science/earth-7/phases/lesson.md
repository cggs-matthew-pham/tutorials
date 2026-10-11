---
order: 3
node: AC9S7U03 n2
unit: moon
title: Why does the moon change shape?
summary: "The sun always lights half of the moon. As the moon goes round the Earth (29.5 days from new moon to new moon), we see more or less of that lit half: the phases. They are not caused by Earth's shadow."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8226
  url: http://127.0.0.1:8226/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "The moon orbiting the Earth, lit on one side by the sun, and how it looks from Earth." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "The moon's phases"
  say: "The sun always lights half the moon; we see different amounts of that half."
  clip:
    - caption: { text: "The sun always lights half the moon.", say: "The sun always lights half the moon." }
    - wait: 1960
    - click: "Next phase"
    - click: "Next phase"
    - caption: { text: "As it orbits, we see more or less of that lit half.", say: "As it orbits, we see more or less of that lit half." }
    - wait: 3610
    - click: "Next phase"
    - caption: { text: "Full moon: we see the whole lit half. A cycle takes 29.5 days.", say: "At full moon we see the whole lit half; a cycle takes a month." }
    - wait: 600
hook: "The moon looks like a thin smile one week and a bright full disc two weeks later. Nothing about the moon itself has changed."
---
You have watched the moon's phases. This lesson explains them.

## Engage: what causes the phases?

```step
stage: predict
insight: "The shadow misconception is the hinge; students who hold it will choose 'Earth's shadow', and the board shows the shadow is nowhere near the moon at most phases."
check:
  type: predict
  q: "What causes the moon's phases?"
  options: ["Earth's shadow covering part of the moon", "Clouds covering part of the moon", "How much of the moon's sunlit half we can see from Earth, as it goes round us", "The moon changing shape"]
  actual: "How much of the sunlit half we can see. The sun always lights half the moon; as the moon goes round the Earth, we see more or less of that half. Earth's shadow is only involved in a lunar eclipse."
```

## Explore: send the moon round

```step
stage: run
insight: "Linking each orbit position to its appearance from Earth builds the position-based explanation."
try: { playground: board, starter: "boards.yml#orbit", height: 600 }
check: { type: board, text: "Take the moon through all eight phases.", when: "n = 8" }
```

Drag the moon round its orbit, or press **Next phase** or **Play a month**. Watch the lit half of the moon (from above) and what we see from Earth. Then press **Show Earth's shadow**: where is the shadow at a quarter moon?

## Explain: positions and phases

```step
stage: investigate
insight: "Sequencing all eight and rejecting the shadow explanation with evidence is the precision the node needs."
tasks:
  - check:
      type: parsons
      code: "phases.txt#order"
      text: "Put the phases in order, starting from new moon."
  - check:
      type: question
      q: "At first quarter, where is Earth's shadow?"
      options: ["Pointing away from the sun, nowhere near the moon: half the moon is dark only because we see half of its lit side", "Covering half the moon", "Covering the whole moon", "In front of the sun"]
      answer: 0
      feedback: [null, "Turn the shadow on with the moon at first quarter: it is far away.", "That's the shadow explanation; the board shows otherwise.", "The shadow always points away from the sun."]
  - check:
      type: question
      q: "At full moon, where is the moon?"
      options: ["On the far side of the Earth from the sun, so we see its whole lit half", "Between the Earth and the sun", "At a right angle to the sun", "Closest to the sun"]
      answer: 0
      feedback: [null, "That's new moon: we see only the dark half.", "That's a quarter moon.", "It's the farthest from the sun of any phase."]
  - check: { type: reflect, text: "I can sequence the eight phases and explain them by the moon's position, not Earth's shadow." }
```

### Order

### The shadow

### Full moon

### In your own words

In your book: draw the Earth, the sun's direction and the moon at four positions. Shade the lit half of each moon and draw what we see from Earth.

## Practise: name the phase

```step
stage: practise
insight: "Predicting the phase from a position, many times with feedback, makes the model reliable."
try: { playground: board, starter: "boards.yml#quiz", height: 640 }
check: { type: board, text: "Name the phase correctly for five moons.", when: "c >= 5" }
```

The moon is placed for you and the view from Earth is hidden. Where is it compared with the sun? Name the phase.

## Elaborate: a month of evidence

```step
stage: modify
tier: typical
insight: "Reading the cycle's period from evidence connects the model to observation."
check:
  type: number
  q: "A student sees a full moon on 1 March. On about what day of March will the next full moon be?"
  answer: 30
  tolerance: 1
  explain: "About 29.5 days later: 30 or 31 March."
```

## Elaborate: the view from Japan

```step
stage: modify
tier: wider
insight: "Seeing the same phase lit on the other side from the Northern Hemisphere shows the phase depends on position, and the view depends on where you stand."
try: { playground: board, starter: "boards.yml#north", height: 600 }
check:
  type: question
  q: "From Australia a waxing crescent is lit on the left. From Japan it is lit on the right. Why?"
  options: ["People in the Northern Hemisphere see the moon 'upside down' compared with us, so left and right swap", "Japan sees a different moon", "The moon's phase is different in Japan", "It's lit on the left everywhere"]
  answer: 0
  feedback: [null, "Everyone sees the same moon.", "The phase is the same everywhere on the same night: only the way up changes.", "Compare this board with the first one."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about what causes the phases with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- The sun always lights **half** the moon. The **phase** is how much of that lit half we can see, which depends on where the moon is in its orbit.
- New moon → waxing crescent → first quarter → waxing gibbous → full moon → waning gibbous → last quarter → waning crescent (about 29.5 days).
- Phases are **not** caused by Earth's shadow. From Australia a waxing moon is lit on the left.
