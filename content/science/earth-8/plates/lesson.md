---
order: 3
unit: plates
title: What moves the plates?
summary: The lithosphere is broken into rigid plates that move a few centimetres a year. Slow convection currents in the hot mantle, driven by heat from the core, carry them.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8254
  url: http://127.0.0.1:8254/index.html
  readySelector: "#board svg"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "What moves the plates"
  say: "Slow convection currents in the mantle carry the plates."
  clip:
    - caption: { text: "Heat from the core warms the mantle rock at the bottom.", say: "Heat from the core warms the mantle rock at the bottom." }
    - wait: 3000
    - caption: { text: "Warm rock is less dense and rises; it cools and sinks again.", say: "Warm rock is less dense and rises; it cools at the top and sinks." }
    - wait: 4000
    - caption: { text: "The current drags the plates: apart above rising rock.", say: "The current drags the plates with it, apart above the rising rock." }
    - wait: 3000
hook: "Australia is moving north about 7 centimetres a year, roughly as fast as your fingernails grow. A whole continent. What could possibly push it?"
---
Earth's surface is not fixed. This lesson is about the engine underneath.

## Engage: what pushes a continent?

```step
stage: predict
insight: "Students' engines (wind, oceans, the Moon, earthquakes) show whether they have any mechanism; the board supplies one."
check:
  type: predict
  q: "Earth's surface is broken into huge plates that move a few centimetres a year. What do you predict moves them?"
  options: ["Ocean currents and waves", "The pull of the Moon", "Slow currents in the hot rock below them", "Earthquakes pushing them along"]
  actual: "Slow currents in the hot mantle below: heat from the core makes the rock rise, spread under the plates, cool and sink, carrying the plates with it."
```

## Explore: a model of the mantle

```step
stage: run
insight: "Following one particle round the loop makes the convection current a path, not an arrow on a diagram."
try: { playground: science, starter: "boards.yml#mantle", height: 600 }
tasks:
  - check:
      type: question
      q: "First, a recap. A pot of soup is heated from below. What does the soup at the bottom do, and why?"
      options: ["It rises, because warm soup has spread out and is less dense than the cooler soup above", "It rises, because heat always rises", "It stays put: only the heat moves up", "It sinks, because hot soup is heavier"]
      answer: 0
      feedback: [null, "Heat on its own does not rise; something has to carry it. What is moving up?", "In a liquid the warm part itself moves. Watch the particles on the board.", "Heating makes the particles spread out, so the same mass takes more space: it gets less dense, not heavier."]
      explain: "Warm fluid expands, so it is less dense and rises; cooler, denser fluid sinks to take its place. This loop is a convection current. The mantle does the same, only in solid rock and very slowly."
  - check: { type: board, text: "Follow a particle round one full loop of the current.", expect: { done: true } }
```

### Recap: warm rises, cool sinks

Convection is how heat moves through a fluid: the warm part rises because it is less dense, then cools and sinks. You may have met it in a pot on the stove or a heater in a room.

### Follow a particle

Follow the ringed particle (or click another). Blue is cooler, red is hotter. Watch the plates on top too.

## Explain: plates and convection

```step
stage: investigate
insight: "Naming each part of the mechanism (heat source, rising, spreading, cooling, sinking) and connecting it to plate motion is the hinge for the boundary types."
tasks:
  - check:
      type: sort
      q: "Put each description with its part of the Earth."
      options: ["Lithosphere (the plates)", "Mantle", "Core"]
      items:
        - ["Rigid pieces that move a few centimetres a year", "Lithosphere (the plates)"]
        - ["Hot solid rock that flows very slowly", "Mantle", "Solid, yet it flows over millions of years."]
        - ["The source of the heat", "Core"]
        - ["Where the convection currents are", "Mantle"]
        - ["The crust and the top of the mantle", "Lithosphere (the plates)"]
  - check:
      type: question
      q: "Why does hot rock above the core rise?"
      options: ["It is less dense than the cooler rock around it", "Hot things always go up because heat rises", "The core pushes it out", "It becomes a gas"]
      answer: 0
      feedback: [null, "It is the hot rock that rises, because it is less dense, not the heat on its own.", "The core heats it; nothing pushes it.", "Mantle rock stays solid, flowing very slowly."]
      explain: "Heated rock expands a little, so it is less dense and rises. Cooled rock is denser and sinks."
  - check:
      type: question
      q: "On the board, where did the two plates move apart?"
      options: ["Above the rising current", "Above the sinking currents", "Where the board was coolest"]
      answer: 0
      feedback: [null, "Above sinking currents, plates are dragged towards each other.", "Look at where the red rock rises in the middle."]
      explain: "Rising rock spreads out sideways under the plates, dragging them apart. This is a divergent boundary, like the Mid-Atlantic Ridge."
  - check:
      type: number
      q: "Australia moves about 7 cm north each year. How many kilometres is that in a million years? (100,000 cm = 1 km)"
      answer: 70
      explain: "7 cm × 1,000,000 = 7,000,000 cm = 70 km. Slow, but over 50 million years that is 3,500 km."
  - check: { type: reflect, text: "I explained, step by step, how heat from the core ends up moving a plate." }
```

### The layers

### Why rock rises

### Plates move apart

### How fast

### In your own words

In your book: explain how heat from the core makes a plate move. Use "heated", "less dense", "rises", "cools", "sinks" and "current".

## Elaborate: the same idea in water

```step
stage: modify
tier: typical
insight: "Seeing the same mechanism in a familiar fluid shows convection is general, and makes the mantle's difference (solid, very slow) stand out."
try: { playground: science, starter: "boards.yml#beaker", height: 560 }
tasks:
  - check: { type: board, text: "Follow a particle round one loop in the heated water.", expect: { done: true } }
  - check:
      type: question
      q: "What is the biggest difference between the water and the mantle?"
      options: ["Mantle rock is solid and flows millions of times more slowly", "Mantle rock rises when it cools", "There is no heat source under the mantle"]
      answer: 0
      feedback: [null, "Both rise when heated and sink when cooled.", "The core heats the mantle from below."]
      explain: "The mechanism is the same; the timescale is not. A loop in the beaker takes seconds; in the mantle, tens of millions of years."
```

### Heated water

### Water and rock

## Elaborate: pushes and pulls

```step
stage: modify
tier: wider
insight: "Slab pull and ridge push refine the convection model; weighing them shows how scientific explanations change with evidence."
tasks:
  - check:
      type: match
      q: "Match each force to how it moves a plate."
      pairs:
        - ["Slab pull", "Old, cold, dense plate sinks into the mantle and drags the rest of the plate behind it"]
        - ["Ridge push", "A plate slides away, downhill, from a high mid-ocean ridge"]
        - ["Mantle drag", "Flowing mantle carries the plate above it along"]
  - check:
      type: question
      q: "The fastest plates (like the Pacific plate) are the ones with long edges sinking into the mantle. Which force does that suggest matters most?"
      options: ["Slab pull", "Ridge push", "Neither: plate speed is random"]
      answer: 0
      feedback: [null, "Plates with ridges but no sinking edges move more slowly.", "There is a pattern: sinking edges go with fast plates."]
      explain: "Most geologists now think slab pull is the biggest force. All three are parts of the same convection system."
```

### Three forces

### Which matters most?

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about what moves the plates with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- The **lithosphere** (crust and top of the mantle) is broken into rigid **tectonic plates**, moving a few centimetres a year.
- Heat from the **core** drives **convection currents** in the **mantle**: hot rock is less dense and rises, spreads, cools and sinks.
- The currents carry the plates: apart above rising rock, together above sinking rock.
- The mantle is solid rock that flows extremely slowly, not liquid magma.
