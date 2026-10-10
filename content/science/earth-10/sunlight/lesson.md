---
order: 3
unit: climate
title: Where does the sunlight go?
summary: "The sun is Earth's main energy source. Some sunlight is reflected straight back to space and the rest is absorbed and warms the planet. How much is reflected (the albedo) depends on the surface: ice reflects most, oceans and forests absorb most."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8238
  url: http://127.0.0.1:8238/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "Surfaces under the sun: bright ones (ice) reflect most sunlight; dark ones (ocean, forest) absorb most." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Where sunlight goes"
  say: "Some sunlight is reflected; the rest is absorbed and warms the surface."
  clip:
    - caption: { text: "Sunlight reaches the surface. Bright surfaces reflect most of it.", say: "Sunlight reaches the surface. Bright surfaces reflect most of it." }
    - wait: 2950
    - click: "Melt the ice"
    - wait: 800
    - caption: { text: "Melt the ice: dark ocean absorbs more, so the surface warms more.", say: "Melt the ice, and darker ocean absorbs more, so the surface warms more." }
    - wait: 3940
    - click: "Freeze the oceans"
    - wait: 800
    - caption: { text: "Ice reflects most sunlight: about 80%.", say: "Ice reflects most sunlight, about eighty percent." }
    - wait: 600
hook: "Fresh snow reflects about 80% of the sunlight that hits it. The open ocean reflects about 6%. When sea ice melts, that difference matters for the whole planet."
---
To understand climate, start with the energy coming in.

## Engage: does all sunlight warm the Earth?

```step
stage: predict
insight: "Students who treat sunlight as uniformly heating Earth miss reflection; the board splits incoming light into reflected and absorbed for each surface."
check:
  type: predict
  q: "Sunlight reaches the Earth. What happens to it?"
  options: ["All of it warms the Earth", "Some is reflected straight back to space and the rest is absorbed: how much depends on the surface", "It all bounces off", "It is stored in the sun's rays"]
  actual: "Some is reflected and the rest is absorbed. On average Earth reflects about 30%, mostly from clouds, ice and bright surfaces. Dark surfaces like oceans absorb most of what hits them."
```

## Explore: change the surfaces

```step
stage: run
insight: "Changing surfaces and watching the reflected and absorbed amounts shift makes albedo a measurable property."
try: { playground: board, starter: "boards.yml#surfaces", height: 640 }
check: { type: board, text: "Change the surfaces until you have seen the percentage reflected change by at least 30 points.", when: "g >= 30" }
```

Click a surface to change it, or use the buttons. Watch the white reflected arrows and the absorbed energy.

## Explain: absorbed and reflected

```step
stage: investigate
insight: "Ranking surfaces and predicting the effect of change is the base the energy balance builds on."
tasks:
  - check:
      type: sort
      q: "Reflects most sunlight, or absorbs most?"
      options: ["Reflects most", "Absorbs most"]
      items:
        - ["Fresh snow", "Reflects most"]
        - ["Open ocean", "Absorbs most"]
        - ["Sea ice", "Reflects most"]
        - ["Dark forest", "Absorbs most"]
        - ["Thick white cloud", "Reflects most"]
  - check:
      type: question
      q: "Arctic sea ice melts and is replaced by open ocean. What happens to the energy absorbed there?"
      options: ["It increases, which warms the area and melts more ice", "It decreases", "It stays the same", "The ocean reflects more"]
      answer: 0
      feedback: [null, "Ocean reflects far less than ice.", "Ice reflects about 80%, ocean about 6%.", "The ocean is darker."]
  - check: { type: reflect, text: "I can explain that the sun is Earth's energy source, and why different surfaces reflect or absorb different amounts of sunlight." }
```

### Reflect or absorb

### Melting ice

### In your own words

In your book: draw sunlight hitting ice and ocean side by side, with reflected and absorbed arrows of the right sizes.

## Elaborate: the angle of the sun

```step
stage: modify
tier: typical
insight: "Angle of incidence explains why the poles get less energy, linking to Year 7 seasons."
check:
  type: question
  q: "The same sunlight hits the equator nearly straight on, but the poles at a low angle. Why do the poles get less energy per square metre?"
  options: ["The same beam is spread over a bigger area, and more is reflected at low angles", "The poles are farther from the sun", "The sun is dimmer there", "There is no sunlight at the poles"]
  answer: 0
  feedback: [null, "The difference in distance is tiny.", "It's the same sun.", "They get sunlight, at a low angle (and none in polar winter)."]
```

## Elaborate: land use

```step
stage: modify
tier: wider
insight: "Predicting the local energy effect of land-use change applies albedo to human decisions."
check:
  type: question
  q: "A city replaces grassland with dark roads and roofs. What happens to the local energy budget?"
  options: ["More sunlight is absorbed, so the city warms: an urban heat island", "Less is absorbed", "No change", "The city reflects more"]
  answer: 0
  feedback: [null, "Dark surfaces absorb more.", "Dark roads have a lower albedo than grass.", "Asphalt is darker than grass."]
  explain: "Light-coloured roofs and more trees are used to cool cities."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about sunlight with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- The **sun** is Earth's main energy source: about 340 W/m² on average at the top of the atmosphere.
- Some sunlight is **reflected** (about 30% on average: the **albedo**); the rest is **absorbed** and warms Earth.
- Bright surfaces (ice, snow, cloud) reflect most; dark ones (ocean, forest) absorb most. Melting ice means more absorbed.
