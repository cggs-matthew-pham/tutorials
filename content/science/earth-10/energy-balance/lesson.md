---
order: 4
node: AC9S10U04 n2
unit: climate
title: What keeps Earth's temperature steady?
summary: "Earth is in energy balance when the energy it absorbs from the sun equals the energy it gives off to space as infrared. Energy moves between the spheres by radiation, conduction and convection, and the oceans store heat. Upset the balance and Earth warms or cools until it is restored."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8235
  url: http://127.0.0.1:8235/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Sunlight in, some reflected, the rest absorbed; infrared given off to space." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Energy balance"
  say: "Earth's temperature settles where energy out equals energy in."
  clip:
    - caption: { text: "Energy in equals energy out, so the temperature stays steady.", say: "Energy in equals energy out, so the temperature stays steady." }
    - wait: 2950
    - click: { selector: "#csun" }
    - press: "End"
    - caption: { text: "More sunlight: now energy in is bigger than energy out.", say: "With more sunlight, energy in is bigger than energy out." }
    - wait: 2950
    - click: "Run 50 years"
    - wait: 2500
    - caption: { text: "Earth warms until the infrared it gives off catches up: a new balance.", say: "Earth warms until the infrared it gives off catches up: a new balance." }
    - wait: 600
hook: "Every second, the sun pours more energy onto Earth than humanity uses in a year. Yet, year to year, Earth's average temperature barely changes. Where does it all go?"
---
Sunlight comes in and some is absorbed. This lesson: where that energy goes.

## Engage: why doesn't Earth keep heating up?

```step
stage: predict
insight: "Students who see Earth only receiving energy can't explain a steady temperature; the board shows equal outgoing infrared."
check:
  type: predict
  q: "Earth absorbs sunlight all the time. Why doesn't it keep getting hotter and hotter?"
  options: ["It gives off just as much energy to space, as infrared", "The sun switches off at night everywhere", "The energy is destroyed", "It does keep getting hotter, by the same amount each year"]
  actual: "It gives off energy to space as infrared radiation. When the energy out equals the energy in, the temperature stays steady: energy balance."
```

## Explore: upset the balance

```step
stage: run
insight: "Changing the energy in and watching the temperature move until out equals in again makes balance a process, not a fixed state."
try: { playground: board, starter: "boards.yml#balance", height: 720 }
check: { type: board, text: "Change the sunlight or the reflection, then run the years until Earth is in balance again.", when: "b = 1" }
```

Move the **Sunlight** or **Reflected** slider. Then press **Run 10 years** or **Run 50 years** and watch the temperature, energy in and energy out.

## Explain: energy in, energy out

```step
stage: investigate
insight: "Defining balance, and locating the flows between the spheres, is the model the greenhouse effect will change."
tasks:
  - check:
      type: question
      q: "What does energy balance mean?"
      options: ["Energy absorbed from the sun equals energy given off to space, over time", "No energy is moving", "The sun and Earth are the same temperature", "Earth stores all the energy it receives"]
      answer: 0
      feedback: [null, "Huge flows are moving: in and out are just equal.", "The sun is far hotter.", "If it stored all of it, it would keep warming."]
  - check:
      type: question
      q: "After you increased the sunlight, why did the temperature stop rising?"
      options: ["A warmer surface gives off more infrared, until energy out matched energy in again", "The sunlight ran out", "The ocean got full", "The model stopped"]
      answer: 0
      feedback: [null, "The sunlight stayed at the new level.", "The ocean took heat while warming; it is a store, not a limit.", "It kept running: out caught up with in."]
  - check:
      type: match
      q: "Match each energy flow to how it moves."
      pairs:
        - ["Sunlight reaching the surface", "Radiation (visible light)"]
        - ["Infrared leaving Earth for space", "Radiation (infrared)"]
        - ["Warm air rising from hot ground", "Convection"]
        - ["Heat passing from warm ground into the air touching it", "Conduction"]
  - check: { type: reflect, text: "I can explain energy balance and describe how energy moves between Earth's spheres." }
```

### Balance

### Restored

### How energy moves

### In your own words

In your book: draw a simple energy-flow diagram (sun, atmosphere, surface, ocean, space) with arrows for energy in and out.

## Elaborate: the ocean as a store

```step
stage: modify
tier: typical
insight: "The ocean's heat capacity explains why climate responds slowly."
check:
  type: question
  q: "Why does Earth take decades, not days, to reach a new balance after a change?"
  options: ["The oceans can store a huge amount of heat, so they warm slowly", "Sunlight takes years to arrive", "Infrared is slow", "Nothing changes for 50 years"]
  answer: 0
  feedback: [null, "Sunlight takes about 8 minutes to arrive.", "Infrared travels at the speed of light.", "The temperature starts changing straight away, just slowly."]
```

## Elaborate: moving heat around

```step
stage: modify
tier: wider
insight: "Ocean currents redistribute heat, explaining regional climates within the global balance."
check:
  type: question
  q: "Western Europe is much milder than parts of Canada at the same latitude. What helps explain it?"
  options: ["Warm ocean currents carry heat from the tropics across the Atlantic", "Europe is closer to the sun", "Canada has no sunlight in winter", "Europe has more greenhouse gases"]
  answer: 0
  feedback: [null, "Distance to the sun is the same.", "Both get winter sun.", "The air's gases mix around the whole world."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about why Earth doesn't keep heating up with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Energy balance:** energy absorbed from the sun = energy given off to space as infrared, over time. Then temperature is steady.
- Upset it (more in or less out) and Earth warms or cools until **out = in** again.
- Energy moves between the spheres by **radiation, conduction and convection**; the **oceans store** heat and carry it around the world.
