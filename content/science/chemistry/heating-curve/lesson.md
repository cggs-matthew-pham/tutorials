---
order: 4
node: AC9S7U05 n4
unit: particles
title: Where does the heat go?
summary: "Melting and boiling need energy put in: the particles move faster and pull free of each other. Freezing and condensing give energy out. While a substance is changing state, its temperature stays the same, because the energy goes into separating the particles, not speeding them up."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8276
  url: http://127.0.0.1:8276/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Ice: water particles held in fixed places, vibrating. Heat them and they move faster, then break free." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Energy and changes of state"
  say: "Melting and boiling take energy in; freezing and condensing give it out."
  clip:
    - caption: { text: "Ice: particles vibrate in fixed places.", say: "Ice: the particles vibrate in fixed places." }
    - wait: 3000
    - click: { selector: "input[type=range]" }
    - caption: { text: "Energy in: the particles move faster and break free of their places. Melting.", say: "Put energy in: the particles move faster and break free. Melting." }
    - wait: 3800
    - press: End
    - caption: { text: "More energy: they escape each other completely. Boiling.", say: "More energy, and they escape each other completely. Boiling." }
    - wait: 3400
    - caption: { text: "Cool it down and the energy comes back out: condensing, then freezing.", say: "Cool it, and the energy comes back out: condensing, then freezing." }
    - wait: 800
hook: "A pot of water on the stove climbs to 100 °C and then stops, even with the gas still on full. Where is all that heat going?"
---
You know how particles are arranged in solids, liquids and gases. This lesson asks what energy does when one changes into another.

## Engage: the stuck thermometer

```step
stage: predict
insight: "Students expect temperature to keep rising while heating continues; the plateau is the observation that needs the particle explanation."
check:
  type: predict
  q: "A pot of water is boiling on a stove. The stove stays on full. What does a thermometer in the water show over the next five minutes?"
  options: ["It stays at about 100 °C", "It keeps rising", "It drops, because the water is turning to steam", "It goes up and down"]
  actual: "It stays at about 100 °C. The energy from the stove is going into separating the water particles so they escape as steam, not into making them move faster, so the temperature stays the same until the water has all boiled away."
```

## Explore: ice to steam

```step
stage: run
insight: "Watching particles change through ice, water and steam shows what the energy does at each change of state."
try: { playground: science, starter: "boards.yml#heat", height: 520 }
check: { type: board, text: "Heat the water from ice to steam.", expect: { done: true } }
```

Drag the temperature slider and watch the particles. Where does the heat go?

## Explain: energy in, energy out

```step
stage: investigate
insight: "Reading a real heating curve, sorting the changes by energy in or out, then explaining a flat part of the curve with particles, is the node's success criterion."
try: { playground: board, starter: "boards.yml#curve", height: 560 }
tasks:
  - check: { type: board, text: "This is a heating curve for water. Move the cursor R along the whole curve, to 20 minutes. Where is the line flat?", when: "x(R) = 20" }
  - check:
      type: sort
      q: "Does the substance take energy in, or give energy out?"
      options: ["Energy in", "Energy out"]
      items:
        - ["Melting (solid to liquid)", "Energy in"]
        - ["Boiling or evaporating (liquid to gas)", "Energy in"]
        - ["Freezing (liquid to solid)", "Energy out"]
        - ["Condensing (gas to liquid)", "Energy out", "Steam on your skin burns badly because it gives out energy as it condenses."]
  - check:
      type: question
      q: "On the heating curve, the line is flat from 2 to 6 minutes. What is happening?"
      options: ["The ice is melting: energy goes into freeing the particles from their fixed places, so the temperature doesn't rise", "Nothing: the stove was turned off", "The water is boiling"]
      answer: 0
      feedback: [null, "The heat was on the whole time.", "Boiling is the second flat part, at 100 °C."]
      explain: "During a change of state, the energy goes into overcoming the attraction between particles, not into making them move faster, so the temperature stays constant."
  - check:
      type: number
      q: "At what temperature (°C) is the second flat part of water's heating curve?"
      answer: 100
      explain: "100 °C: water's boiling point (at sea level). The first flat part, at 0 °C, is its melting point."
  - check:
      type: question
      q: "What does adding energy do to the particles in a solid, before it melts?"
      options: ["They vibrate faster, so the temperature rises", "They get bigger", "They start to leave the solid straight away"]
      answer: 0
      feedback: [null, "Particles don't grow; their motion changes.", "They stay in place until the solid reaches its melting point."]
      explain: "Temperature is a measure of how fast particles move. Energy in, faster particles, higher temperature, until a change of state begins."
  - check: { type: reflect, text: "I can explain changes of state with particles and say whether energy goes in or out for each." }
```

### The heating curve

Move **R** with its slider or by clicking the graph.

### In or out

### The flat part

### The second flat part

### Before melting

### In your own words

In your book: sketch water's heating curve, label the solid, liquid and gas parts and the two flat parts. Beside each flat part, write what the particles are doing and why the temperature doesn't change.

## Elaborate: a cooling curve

```step
stage: modify
tier: typical
insight: "Reading a cooling curve applies the same idea in reverse: a flat part while the substance freezes and gives out energy."
try: { playground: board, starter: "boards.yml#cooling", height: 560 }
tasks:
  - check: { type: board, text: "Melted candle wax is cooling. Move R to where the wax starts to freeze (the line goes flat).", when: "x(R) = 4" }
  - check:
      type: question
      q: "Why does the wax's temperature stay at 52 °C for 8 minutes while it freezes?"
      options: ["As particles settle into fixed places they give out energy, which keeps the temperature steady", "The room warms the wax", "The thermometer stopped working"]
      answer: 0
      feedback: [null, "The room is cooler than the wax; it can't keep it warm.", "The flat part is real: it is the freezing point."]
      explain: "Freezing gives energy out. Until every particle has settled, that energy balances what is lost to the room."
```

### Freezing wax

### Why it stays flat

## Elaborate: sweating

```step
stage: modify
tier: wider
insight: "Evaporation taking energy from the skin connects 'energy in for a change of state' to everyday cooling."
check:
  type: question
  q: "Why does sweating cool you down, even on a hot day?"
  options: ["Evaporating sweat takes energy in, and it takes it from your skin", "Sweat is colder than your body", "The wind blows the heat away"]
  answer: 0
  feedback: [null, "Sweat starts at body temperature.", "A breeze helps, but the cooling comes from evaporation."]
  explain: "Changing liquid to gas needs energy. The fastest particles escape from the sweat, carrying energy away from your skin."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the boiling water with the heating curve." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Melting, boiling and evaporating take **energy in**; freezing and condensing give **energy out**.
- Adding energy to a substance makes its particles move faster (the temperature rises), until it reaches a change of state.
- During a change of state the temperature stays the same: the energy goes into separating the particles (or comes out as they settle).
- A **heating curve** shows this as flat parts at the melting and boiling points.
