---
order: 3
node: AC9S7U05 n3
unit: particles
title: Why can you squash air but not water?
summary: Use particle theory to explain physical properties (how easily a substance squashes, its density, how it flows) by naming the arrangement, motion or attraction behind each one.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8249
  url: http://127.0.0.1:8249/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Wax in a syringe: its particles are already touching, so pushing the plunger can't squash it. Air, with space between its particles, squashes easily." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Properties from particles"
  say: "Every property comes from a particle feature."
  clip:
    - caption: { text: "A syringe of air. Push the plunger.", say: "Here is a syringe of air. Push the plunger." }
    - wait: 2620
    - click: "Air"
    - click: { selector: "input[type=range]" }
    - press: "End"
    - wait: 1500
    - caption: { text: "Air squashes: its particles have lots of empty space between them.", say: "Air squashes, because there is lots of empty space between its particles." }
    - wait: 3610
    - click: "Water"
    - click: { selector: "input[type=range]" }
    - press: "End"
    - wait: 1500
    - caption: { text: "Water barely squashes: its particles are already close together.", say: "Water barely squashes: its particles are already close together." }
    - wait: 800
hook: "Seal the end of a syringe full of air and you can push the plunger a long way in. Do the same with water and it barely moves. Particle theory explains why, and the same explanation works for density, runny honey and smells crossing a room."
---
This lesson moves from describing particles to **explaining properties** with them. Every explanation names a particle feature: arrangement, motion or attraction.

## Engage: three syringes

```step
stage: predict
insight: "Committing to a prediction exposes the idea that particles themselves squash or shrink."
check:
  type: predict
  q: "Three sealed syringes hold a solid plug of wax, water, and air. You push each plunger as hard as you can. Which plunger moves in the furthest?"
  options: ["Wax", "Water", "Air", "They all move the same amount"]
  actual: "Only the air squashes. Its particles are far apart, with empty space to move into. Wax and water particles are already close together."
```

## Explore: push the plunger, count the particles

```step
stage: run
insight: "The plunger tests compressibility; the fixed window turns density into something students can count."
try: { playground: science, starter: "boards.yml#syringe", height: 600 }
check: { type: board, text: "Push the plunger all the way for wax, water and air, and record the window count for each.", expect: { done: true } }
```

For each substance: push the plunger all the way in, then pull it back out and record how many particles sit in the dashed window. The window is the same size for every substance.

## Explain: use the particles

```step
stage: investigate
insight: "Two properties, each explained by spacing, with distractors built on the classic misconceptions."
tasks:
  - check:
      type: question
      q: "Why does the plunger stop in the water syringe?"
      options: ["The water particles are already close together, so there is almost no space to push them into", "The water particles are too hard to squash", "Water is heavier than air", "The water particles stop moving when pushed"]
      answer: 0
      feedback: [null, "Particles never squash, in any state. Air particles don't squash either: the difference is the space between them.", "Weight doesn't stop a plunger. The water particles are already touching.", "Particles never stop moving. They are already as close as they can get."]
      explain: "The particles stay the same size; there is just no empty space left."
  - check:
      type: question
      q: "Why is air much less dense than water?"
      options: ["Each air particle is lighter than a water particle", "Air particles are far apart, so there are far fewer in each cm³", "Air particles are smaller", "Air has no mass"]
      answer: 1
      feedback: ["Surprisingly, a water particle is lighter than an average air particle. The difference is spacing.", null, "Particles don't change size between states.", "Air does have mass, about 1.2 g in every litre."]
      explain: "Fewer particles in each cm³ means less mass in each cm³: lower density."
  - check: { type: reflect, text: "I explained why air can be squashed and why air is less dense than water, naming a particle feature for each, not just 'because it's a gas'." }
```

### The water syringe

### Density

### In your own words

In your book: explain **two** properties, why air can be squashed and why air is less dense than water. Check: did you name the arrangement, motion or attraction behind each one?

## Elaborate: three substances

```step
stage: modify
tier: typical
insight: "Honey and water share an arrangement but not an attraction: comparing three substances makes students choose the feature."
check:
  type: sort
  q: "Honey, water and air. Which particle feature best explains each observation?"
  options: ["Arrangement: how close and ordered the particles are", "Motion: how fast the particles move", "Attraction: how strongly particles pull on each other"]
  items:
    - ["Honey pours much more slowly than water.", "Attraction: how strongly particles pull on each other", "Honey particles attract each other more strongly, so they don't slide past each other easily."]
    - ["Air can be squashed but water can't.", "Arrangement: how close and ordered the particles are", "Air particles are far apart; water particles are already close."]
    - ["Water is about 800 times denser than air.", "Arrangement: how close and ordered the particles are", "Water packs far more particles into each cm³."]
    - ["The smell of honey spreads through a whole room.", "Motion: how fast the particles move", "Smell particles keep moving and spread out between the moving air particles."]
    - ["Warm honey pours faster than cold honey.", "Motion: how fast the particles move", "Faster particles overcome the attraction more easily."]
  explain: "Honey and water have the same arrangement but behave differently: attraction makes the difference."
```

## Elaborate: float or sink

```step
stage: modify
tier: wider
insight: "Packing per cm³ links node 3's density to floating, a new context for the same idea."
try: { playground: science, starter: "boards.yml#floatsink", height: 420 }
tasks:
  - check:
      type: question
      q: "Will a block of foam float on water?"
      options: ["Floats", "Sinks"]
      answer: 0
      feedback: [null, "Count the particles: each cm³ of foam holds far fewer than water."]
      explain: "Foam is mostly trapped air: less mass in each cm³ than water, so it floats."
  - check:
      type: question
      q: "Will a block of iron float on water?"
      options: ["Floats", "Sinks"]
      answer: 1
      feedback: ["Its particles are packed tightly, and each one is heavier than a water particle.", null]
      explain: "Iron packs far more mass into each cm³ than water, so it sinks."
```

Each window is 1 cm³. Iron particles are packed tightly and each one is heavier. Foam is mostly trapped air, so a window of foam holds very few particles.

### Foam

### Iron

## Elaborate: diffusion

```step
stage: modify
tier: wider
insight: "Diffusion is motion plus space: the same model predicts which state mixes faster."
try: { playground: science, starter: "boards.yml#diffusion", height: 540 }
tasks:
  - check: { type: board, text: "Time the mixing in the gas and in the liquid.", expect: { done: true } }
  - check:
      type: question
      q: "Why did the gas mix faster?"
      options: ["Gas particles move fast and have lots of space to move into", "Gas particles are smaller", "The liquid particles stop moving"]
      answer: 0
      feedback: [null, "The particles are the same size; it is speed and space that differ.", "Liquid particles keep moving, but they keep bumping into their neighbours."]
      explain: "In the liquid, particles keep bumping into close neighbours, so they spread slowly."
```

Two colours of the same substance start on opposite sides of a barrier. When it lifts, they mix: this is **diffusion**. Predict first: will the gas or the liquid mix faster? Then time both.

### Time both

### Why?

## Elaborate: mystery substance X

```step
stage: modify
tier: wider
insight: "Predicting properties from a diagram, then checking real data, is the strongest test that students can use the model."
try: { playground: science, starter: "boards.yml#mystery", height: 420 }
tasks:
  - check:
      type: question
      q: "Can X be squashed easily?"
      options: ["Yes, easily", "No, hardly at all"]
      answer: 1
      feedback: ["Look at the diagram: the particles are already close together, with no space to push them into.", null]
      explain: "Its particles are already close together."
  - check:
      type: question
      q: "Does X flow?"
      options: ["No, it holds its shape", "Yes, easily like water", "Yes, but slowly"]
      answer: 2
      feedback: ["There is no fixed pattern, so the particles can slide past each other.", "The particles attract strongly, which holds them back as they slide.", null]
      explain: "No fixed pattern, so it flows; strong attraction makes it slow."
  - check:
      type: question
      q: "If you warm X, how does its flow change?"
      options: ["It flows faster", "It flows slower", "No change"]
      answer: 0
      feedback: [null, "Warming makes the particles move faster, which helps them overcome the attraction.", "Warming changes how fast the particles move, and that changes how easily they slide."]
      explain: "X is glycerol, a syrupy liquid used in soap and cough syrup. It barely compresses, pours roughly a thousand times more slowly than water at room temperature, and runs much more freely when warm."
```

### Squashing

### Flowing

### Warming

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first prediction with what happened and can say what changed in my thinking." }
```

Which syringe did you predict would move furthest, and why? Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Gases can be squashed because their particles are far apart, with lots of empty space between them.
- Solids and liquids hardly squash at all: their particles are already close together.
- Gases are much less dense because there are far fewer particles in each cm³. The same substance as a solid or a liquid has a similar density: its particles are close together in both.
- The particles themselves never shrink or squash. Only the spaces between them change.
