---
order: 5
node: AC9S7U03 n5
unit: moon
title: Why are there two high tides a day?
summary: "The moon's gravity pulls the oceans into two bulges, one facing the moon and one on the far side; the Earth spins through both, so most coasts get two high tides a day. Spring tides (biggest range) come at new and full moon, when the sun and moon pull in line; neap tides at the quarters."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8229
  url: http://127.0.0.1:8229/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "The oceans pulled into two bulges by the moon (and two smaller ones by the sun)." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Tides"
  say: "The moon pulls the oceans into two bulges; the Earth spins through both."
  clip:
    - caption: { text: "The moon's gravity pulls the oceans into two bulges.", say: "The moon's gravity pulls the oceans into two bulges." }
    - wait: 2620
    - click: "Play a day at the beach"
    - wait: 1500
    - caption: { text: "The Earth spins through both bulges: two high tides a day.", say: "The Earth spins through both bulges: two high tides a day." }
    - wait: 2500
    - click: "Moon: next quarter"
    - caption: { text: "At the quarters, sun and moon pull at right angles: small neap tides.", say: "At the quarters, sun and moon pull at right angles: small neap tides." }
    - wait: 800
hook: "At a beach the water creeps up the sand and back down about every 12 and a half hours, and the biggest tides of the month always arrive near a new or full moon."
---
You know the moon's phases and positions. This lesson connects them to the oceans.

## Engage: how many high tides?

```step
stage: predict
insight: "Students who picture one bulge under the moon predict one high tide a day; the board's two bulges and a played day correct it."
check:
  type: predict
  q: "On most coasts, how many high tides are there in a day?"
  options: ["One: when the moon is overhead", "Two: about 12½ hours apart", "Four", "It's random"]
  actual: "Two, about 12½ hours apart. The moon pulls the oceans into two bulges (one towards it and one on the far side) and the Earth spins through both each day."
```

## Explore: bulges and a month of tides

```step
stage: run
insight: "Playing a day at the beach shows two highs; moving the moon through its phases and watching the chart shows spring and neap tides follow the moon's position."
try: { playground: board, starter: "boards.yml#tides", height: 640 }
check: { type: board, text: "Play a day at the beach, then find both spring tides and both neap tides in the month.", when: "b >= 1 and s = 2 and q = 2" }
```

Press **Play a day at the beach** and count the high tides. Then press **Moon: next quarter** (or drag the moon) through a whole month. When are the tides biggest on the chart?

## Explain: the moon, the sun and the tides

```step
stage: investigate
insight: "Connecting the moon's gravity, the two bulges and the sun's lining up is the integration this node asks for."
tasks:
  - check:
      type: question
      q: "What mainly causes the tides?"
      options: ["The moon's gravity pulling on the oceans", "The wind", "The Earth's spin alone", "The moon's light"]
      answer: 0
      feedback: [null, "Wind makes waves, not tides.", "Spin carries the beach through the bulges, but the moon's pull makes them.", "Light has nothing to do with it."]
  - check:
      type: sort
      q: "Spring tides or neap tides?"
      options: ["Spring tides", "Neap tides"]
      items:
        - ["New moon", "Spring tides"]
        - ["Full moon", "Spring tides"]
        - ["First quarter", "Neap tides"]
        - ["Last quarter", "Neap tides"]
        - ["The sun and moon pull in line", "Spring tides"]
        - ["The sun pulls at right angles to the moon", "Neap tides"]
        - ["Smallest difference between high and low tide", "Neap tides"]
  - check:
      type: question
      q: "Do spring tides happen only in spring?"
      options: ["No: they happen about every two weeks all year, at new and full moon ('spring' as in springing up)", "Yes, only in September to November", "Only in the Northern Hemisphere's spring", "Only once a year"]
      answer: 0
      feedback: [null, "Check the chart: two a month.", "Twice a month, every month.", "Twice a month, every month."]
  - check: { type: reflect, text: "I can explain tides with the moon's gravity, and when spring and neap tides happen." }
```

### Cause

### Spring or neap

### The name

### In your own words

In your book: draw the Earth with its two bulges and the moon, then the sun in line (spring) and at right angles (neap).

## Elaborate: reading a tide chart

```step
stage: modify
tier: typical
insight: "Reading the period of spring tides from a chart connects the model to real data."
check:
  type: number
  q: "On the board's chart, about how many days are there between one spring tide and the next?"
  answer: 15
  tolerance: 1
  explain: "About 14.8 days: half the moon's 29.5-day cycle, from new moon to full moon."
```

## Elaborate: the best low tide

```step
stage: modify
tier: wider
insight: "Using the moon's phase to predict extreme low tides applies the model, as coastal people have for thousands of years."
check:
  type: question
  q: "Reef walking and gathering shellfish is best at the lowest low tides. When should you plan to go?"
  options: ["Near a new or full moon, at low tide: spring tides give the lowest lows", "At a quarter moon", "Any day: low tides are always the same", "At noon every day"]
  answer: 0
  feedback: [null, "Quarter moons give neap tides: the smallest range, so the lows are not very low.", "The chart shows the range changes through the month.", "Low tide moves about 50 minutes later each day."]
  explain: "Many coastal First Nations communities have long timed fishing and gathering by the moon and tides; ask local knowledge holders about your own coast."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about high tides with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- The moon's **gravity** pulls the oceans into **two bulges** (towards the moon and on the far side); the Earth spins through both: **two high tides a day** on most coasts.
- **Spring tides** (biggest range): new and full moon, sun and moon **in line**. **Neap tides** (smallest range): quarter moons, sun at **right angles**.
- Spring and neap tides each come about every two weeks, all year.
