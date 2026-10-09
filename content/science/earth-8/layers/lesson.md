---
order: 2
unit: plates
title: What's inside the Earth?
summary: "Earth has layers: a thin solid crust, a thick solid mantle that flows very slowly, a liquid outer core and a solid inner core. Temperature and pressure rise with depth. The lithosphere (crust plus the rigid top of the mantle) is the rigid outer shell that breaks into plates."
language: science
hook: "The deepest hole ever drilled reached about 12 km. The centre of the Earth is 6371 km down. Everything we know about the rest comes from earthquakes."
---
Before plates can make sense, you need a picture of what they sit on.

## Engage: solid or liquid?

```step
stage: predict
insight: "Students who picture a molten mantle under the crust can't explain rigid plates; the board shows the mantle is solid rock that flows very slowly."
check:
  type: predict
  q: "Under the crust is the mantle, almost 3000 km thick. What do you predict it is like?"
  options: ["A sea of liquid magma", "Solid rock that is so hot it can flow very slowly", "Hollow", "Ice"]
  actual: "Solid rock, hot enough to flow very slowly over millions of years, like extremely stiff putty. Only small pockets melt into magma. The only liquid layer is the outer core."
```

## Explore: cut a wedge

```step
stage: run
insight: "Clicking each layer and probing temperature and pressure with depth builds the layered model; seeing it to scale shows how thin the crust really is."
try: { playground: board, starter: "boards.yml#wedge", height: 660 }
check: { type: board, text: "Find all six layers and probe down to the centre.", when: "n = k and m >= 6000" }
```

Click each layer to find out what it is. Drag the **Depth** slider down to the centre: watch the temperature and pressure. Then press **Show it to scale**.

## Explain: layers and the lithosphere

```step
stage: investigate
insight: "Separating the rigid lithosphere from the soft asthenosphere below is the idea the plate model needs."
tasks:
  - check:
      type: sort
      q: "Solid or liquid?"
      options: ["Solid", "Liquid"]
      items:
        - ["Crust", "Solid"]
        - ["Mantle", "Solid", "Solid, but it flows very slowly over millions of years."]
        - ["Outer core", "Liquid"]
        - ["Inner core", "Solid", "Hotter than the outer core, but the enormous pressure keeps it solid."]
  - check:
      type: question
      q: "What is the lithosphere?"
      options: ["The crust plus the rigid top of the mantle: Earth's rigid outer shell", "Another name for the crust", "The liquid layer the plates float on", "The core"]
      answer: 0
      feedback: [null, "It includes the top of the mantle as well as the crust.", "The asthenosphere below it is solid but soft, not liquid.", "It's the outermost layer."]
  - check:
      type: question
      q: "What happens to temperature and pressure as you go deeper?"
      options: ["Both increase", "Both decrease", "Temperature increases, pressure stays the same", "They stay the same"]
      answer: 0
      feedback: [null, "Probe deeper on the board.", "The weight of all the rock above presses down harder the deeper you go.", "Probe deeper on the board."]
  - check: { type: reflect, text: "I can name Earth's layers with their states, and explain what the lithosphere is." }
```

### Solid or liquid

### Lithosphere

### Deeper

### In your own words

In your book: draw a labelled cross-section of the Earth, mark the lithosphere and asthenosphere, and write the state of each layer.

## Elaborate: the skin of an apple

```step
stage: modify
tier: typical
insight: "The to-scale view makes the thinness of the crust concrete."
check:
  type: question
  q: "If the Earth were an apple, the crust would be about as thick as the apple's skin. What does that tell you?"
  options: ["The crust is extremely thin compared with the whole Earth", "The crust is the thickest layer", "The Earth is hollow", "The crust is soft"]
  answer: 0
  feedback: [null, "Compare: 35 km of crust against 6371 km to the centre.", "The mantle is thickest.", "It's solid all the way, except the liquid outer core."]
```

## Elaborate: how do we know?

```step
stage: modify
tier: wider
insight: "Reasoning from seismic evidence shows how a model of something unseen is built."
check:
  type: question
  q: "One kind of earthquake wave (S-waves) can't travel through liquids. On the far side of the Earth from a big earthquake, no S-waves arrive. What does that suggest?"
  options: ["Part of the Earth's interior (the outer core) is liquid", "The Earth is hollow", "The waves get tired", "The crust is liquid"]
  answer: 0
  feedback: [null, "Something blocks them: a liquid layer would.", "A hollow Earth would collapse under its own gravity.", "Waves don't tire; they are blocked or bent."]
  explain: "This 'S-wave shadow' is how the liquid outer core was discovered."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about the mantle with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Crust** (thin, solid) → **mantle** (thick, solid but flows very slowly) → **outer core** (liquid iron and nickel) → **inner core** (solid iron and nickel).
- **Temperature and pressure increase** with depth.
- The **lithosphere** (crust + rigid top of the mantle) is the rigid outer shell, broken into plates; it rests on the soft, slowly flowing **asthenosphere**.
