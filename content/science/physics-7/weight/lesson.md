---
order: 3
unit: forces
title: Would you weigh less on the Moon?
summary: "Mass is how much matter an object has, in kilograms, and it is the same everywhere. Weight is the force of gravity on that mass, in newtons, and depends on where you are: weight = mass × g."
language: science
hook: "Astronauts on the Moon bounce around like they're on a trampoline. Did they lose something on the way there?"
---
"Weight" in everyday talk and "weight" in science are different. This lesson sorts that out.

## Engage: an astronaut's mass

```step
stage: predict
insight: "Students who conflate mass and weight will predict mass changes on the Moon; the board shows mass staying put while weight changes."
check:
  type: predict
  q: "An astronaut has a mass of 60 kg on Earth. She flies to the Moon. What is her mass there?"
  options: ["60 kg: mass doesn't change", "About 10 kg", "0 kg: there's no gravity on the Moon", "More than 60 kg"]
  actual: "Still 60 kg: she is made of the same matter. Her weight (the pull of gravity on her) is what changes: about 96 N on the Moon instead of about 588 N on Earth."
```

## Explore: Earth, Moon, Mars

```step
stage: run
insight: "Switching place with mass fixed, then changing mass with place fixed, separates the two quantities that W = mg combines."
try: { playground: board, starter: "boards.yml#places", height: 580 }
check: { type: board, text: "Find the 60 kg astronaut's weight on the Moon.", when: "m = 60 and g = 1.6" }
```

Try each place. Then change the mass. Watch the weight arrow and the line under the board: **mass × g = weight**.

## Explain: mass and weight

```step
stage: investigate
insight: "Defining both quantities with units, then calculating weight, makes the distinction usable in Year 10's F = ma."
tasks:
  - check:
      type: sort
      q: "Mass or weight?"
      options: ["Mass", "Weight"]
      items:
        - ["Measured in kilograms (kg)", "Mass"]
        - ["Measured in newtons (N)", "Weight"]
        - ["The same on Earth and on the Moon", "Mass"]
        - ["A force, pulling towards the planet", "Weight"]
        - ["How much matter an object has", "Mass"]
        - ["Changes if g changes", "Weight"]
  - check:
      type: number
      q: "A 5 kg bag on Earth (g = 9.8 N/kg). What is its weight, in N?"
      answer: 49
      tolerance: 0.1
      explain: "Weight = mass × g = 5 × 9.8 = 49 N."
  - check:
      type: number
      q: "The same 5 kg bag on Mars (g = 3.7 N/kg). Its weight, in N?"
      answer: 18.5
      tolerance: 0.1
      explain: "5 × 3.7 = 18.5 N. Same mass, smaller weight."
  - check:
      type: question
      q: "Why is the astronaut's weight smaller on the Moon?"
      options: ["The Moon has much less mass than Earth, so its gravity pulls less (smaller g)", "There is no air on the Moon", "She has less mass there", "The Moon is further from the Sun"]
      answer: 0
      feedback: [null, "Air doesn't cause weight: things weigh the same in a vacuum chamber on Earth.", "Her mass hasn't changed: same matter.", "Distance from the Sun isn't it; the Moon's own gravity is."]
      explain: "Gravity depends on mass. The Moon has about 1/80 of Earth's mass, so its g is only 1.6 N/kg."
  - check: { type: reflect, text: "I explained the difference between mass and weight, with units, and showed how to work out weight." }
```

### Which is which

### Weight on Earth

### Weight on Mars

### Why the Moon pulls less

### In your own words

In your book: explain to a friend who says "I weigh 50 kilograms" what is wrong with that, and what they should say.

## Elaborate: a rover on Jupiter

```step
stage: modify
tier: typical
insight: "A heavier object on a stronger-gravity planet extends weight = mass × g to an unfamiliar case."
try: { playground: board, starter: "boards.yml#jupiter", height: 580 }
tasks:
  - check: { type: board, text: "Find the weight of a 900 kg rover on Jupiter.", when: "m = 900 and g = 24.8" }
  - check:
      type: question
      q: "A rover's wheels are designed for its weight on Mars. It is sent to Jupiter instead (if it could land). What is the problem?"
      options: ["Its weight would be over six times bigger, so its wheels and legs might collapse", "Its mass would be bigger, so it would need more fuel", "Nothing: weight is the same everywhere"]
      answer: 0
      feedback: [null, "Its mass stays the same; its weight is what changes.", "Weight depends on g: 24.8 N/kg on Jupiter, 3.7 N/kg on Mars."]
      explain: "24.8 ÷ 3.7 ≈ 6.7, so its weight would be nearly seven times bigger."
```

### Weigh the rover

### Built for Mars

## Elaborate: do heavy things fall faster?

```step
stage: modify
tier: wider
insight: "Refuting the 'heavier falls faster' misconception uses weight and mass together: double the mass, double the pull, but double the mass to move."
check:
  type: question
  q: "On the Moon (no air), an astronaut dropped a hammer and a feather together (Apollo 15, 1971). What happened?"
  options: ["They hit the ground together", "The hammer landed first", "The feather floated away"]
  answer: 0
  feedback: [null, "On Earth air slows the feather; on the Moon there's no air.", "With no air, there's nothing to make it float."]
  explain: "The heavier hammer is pulled harder, but it also has more mass to get moving, so both speed up at the same rate. Air resistance is what makes feathers fall slowly on Earth."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the astronaut's mass with what the board showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Mass** (kg): how much matter. The same everywhere.
- **Weight** (N): the force of gravity on an object. **Weight = mass × g.**
- **g** is the gravitational field strength: 9.8 N/kg on Earth (about 10), 1.6 on the Moon, 3.7 on Mars, 24.8 on Jupiter.
- A bigger planet (more mass) pulls harder: bigger g, bigger weight.
- Without air, all objects fall together, whatever their mass.
