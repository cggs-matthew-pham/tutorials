---
order: 5
unit: climate
title: How do greenhouse gases warm the Earth?
summary: "Earth gives off infrared. Greenhouse gases (water vapour, CO₂, methane, nitrous oxide) absorb some of it and send part back down, slowing the energy going out. Without them Earth would average about −18 °C. Adding more upsets the balance, and Earth warms until it is restored."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8236
  url: http://127.0.0.1:8236/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Sunlight in; infrared from the surface, part absorbed by greenhouse gases and sent back down." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "The greenhouse effect"
  say: "Greenhouse gases slow the loss of infrared, keeping Earth warmer."
  clip:
    - caption: { text: "Greenhouse gases absorb infrared and send some back down.", say: "Greenhouse gases absorb infrared from the surface and send some back down." }
    - wait: 3610
    - click: "Remove all greenhouse gases"
    - click: "Run 50 years"
    - wait: 2500
    - caption: { text: "Without them, Earth would cool to about −18 °C.", say: "Without them, Earth would cool to about minus eighteen degrees." }
    - caption: { text: "Extra greenhouse gases do the opposite: Earth warms.", say: "Extra greenhouse gases do the opposite, and Earth warms." }
    - wait: 600
hook: "The moon is the same distance from the sun as Earth, but its average surface temperature is far below freezing. Earth's thin blanket of gases makes the difference."
---
You know Earth balances energy in and out. This lesson: what the air does to the energy going out.

## Engage: what do greenhouse gases do?

```step
stage: predict
insight: "Students who think greenhouse gases trap incoming sunlight (or confuse them with the ozone hole) locate the mechanism wrongly; the board's arrows show it acts on outgoing infrared."
check:
  type: predict
  q: "How do greenhouse gases warm the Earth?"
  options: ["They let more sunlight in through a hole in the ozone layer", "They trap incoming sunlight", "They absorb infrared given off by Earth's surface and send some back down, slowing the energy going out", "They make the sun hotter"]
  actual: "They absorb outgoing infrared from the surface and send part of it back down, so energy leaves more slowly. Sunlight passes through them easily. The ozone hole is a different problem."
```

## Explore: remove them, then add more

```step
stage: run
insight: "Removing all greenhouse gases (about −18 °C), then doubling CO₂ (a few degrees warmer), shows both the natural and the enhanced effect in one model."
try: { playground: board, starter: "boards.yml#gh", height: 720 }
tasks:
  - check: { type: board, text: "Remove all greenhouse gases and run the years until the temperature settles.", when: "z = 1" }
  - check: { type: board, text: "Put them back, raise CO₂ to at least 560 ppm (double the pre-industrial level) and run until Earth is in balance again.", when: "g >= 560 and b = 1" }
```

### No greenhouse gases

Press **Remove all greenhouse gases**, then **Run 50 years**. Where does the temperature settle?

### Double the CO₂

Press **Put the greenhouse gases back**, drag **CO₂** to 560 ppm or more, then run until energy out equals energy in.

## Explain: natural and enhanced

```step
stage: investigate
insight: "Locating the mechanism on the outgoing flow, and separating natural from enhanced, is what explaining climate change requires."
tasks:
  - check:
      type: question
      q: "Greenhouse gases slow which flow of energy?"
      options: ["Infrared going out from Earth to space", "Sunlight coming in", "Heat from Earth's core", "Wind"]
      answer: 0
      feedback: [null, "Sunlight passes through them: watch the yellow arrow, it doesn't change.", "That's tiny compared with sunlight.", "Wind is moving air, not radiation."]
  - check:
      type: sort
      q: "Natural greenhouse effect or enhanced greenhouse effect?"
      options: ["Natural", "Enhanced"]
      items:
        - ["Keeps Earth about 33 °C warmer than it would be with no greenhouse gases", "Natural"]
        - ["Extra CO₂ from burning fossil fuels", "Enhanced"]
        - ["Water vapour and CO₂ that were in the air before 1800", "Natural"]
        - ["Methane from farming and landfill adding to the air", "Enhanced"]
  - check:
      type: question
      q: "When you raised CO₂, why did the temperature rise and then level off?"
      options: ["Less infrared escaped, so energy in exceeded energy out; the warmer surface then gave off more until out equalled in again", "The sun got hotter", "CO₂ is hot", "The ozone layer got thinner"]
      answer: 0
      feedback: [null, "Sunlight stayed the same.", "CO₂ isn't a heat source; it slows the escape of heat.", "Ozone isn't in this model and isn't the cause."]
  - check: { type: reflect, text: "I can explain how greenhouse gases slow outgoing infrared, the difference between the natural and enhanced greenhouse effect, and where this fits in the energy balance." }
```

### Which flow

### Natural or enhanced

### Rise and level off

### In your own words

In your book: draw the energy-balance diagram again and add greenhouse gases absorbing and re-emitting infrared. Label natural and enhanced.

## Elaborate: the greenhouse gases

```step
stage: modify
tier: typical
insight: "Naming the gases and separating them from other air pollutants prevents the ozone confusion."
check:
  type: sort
  q: "Greenhouse gas or not?"
  options: ["Greenhouse gas", "Not a greenhouse gas"]
  items:
    - ["Carbon dioxide (CO₂)", "Greenhouse gas"]
    - ["Methane (CH₄)", "Greenhouse gas"]
    - ["Water vapour", "Greenhouse gas"]
    - ["Nitrous oxide (N₂O)", "Greenhouse gas"]
    - ["Nitrogen (N₂), 78% of the air", "Not a greenhouse gas", "Molecules with only two identical atoms barely absorb infrared."]
    - ["Oxygen (O₂)", "Not a greenhouse gas"]
```

## Elaborate: methane

```step
stage: modify
tier: wider
insight: "Comparing gases by their warming power applies the mechanism quantitatively."
check:
  type: question
  q: "There is about 200 times less methane than CO₂ in the air, yet it causes about a quarter as much extra warming. Why?"
  options: ["Kilogram for kilogram, methane absorbs far more infrared than CO₂ (it traps about 80 times as much heat over 20 years)", "Methane is hotter", "Methane lets more sunlight in", "Methane lasts forever"]
  answer: 0
  feedback: [null, "Gases warm the Earth by absorbing infrared, not by being hot.", "Greenhouse gases don't change the sunlight coming in.", "Methane breaks down in about 10 years; CO₂ lasts much longer."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about greenhouse gases with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Earth's surface gives off **infrared**. **Greenhouse gases** (water vapour, CO₂, methane, nitrous oxide) absorb some and send part back down: they slow energy **going out**, not sunlight coming in.
- **Natural greenhouse effect:** keeps Earth about 15 °C on average instead of about −18 °C.
- **Enhanced greenhouse effect:** extra greenhouse gases from human activity reduce the outgoing infrared, so energy in exceeds energy out and Earth **warms** until balance is restored.
- It is not the ozone hole.
