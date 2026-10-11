---
order: 1
node: AC9S7U05 n1
unit: particles
title: What is everything made of?
summary: All matter is made of tiny particles with empty space between them, always moving and attracting each other. Match particle diagrams to solids, liquids and gases.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8239
  url: http://127.0.0.1:8239/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Ice, zoomed in: particles packed in a fixed pattern, with empty space between them." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "The particle model"
  say: "Everything is made of tiny particles, with empty space between them."
  clip:
    - caption: { text: "Zoom in on ice: particles packed in a pattern, vibrating in place.", say: "Zoom in on ice: particles packed in a pattern, vibrating in place." }
    - wait: 3200
    - click: "Liquid water"
    - caption: { text: "Water: still close, but sliding past each other.", say: "In water they are still close, but slide past each other." }
    - wait: 3000
    - click: "Steam"
    - caption: { text: "Steam: far apart and fast. Between them is empty space, not air.", say: "In steam they are far apart and fast, with empty space between." }
    - wait: 2500
    - caption: { text: "Same particles in all three. Only their arrangement and motion change.", say: "The particles are the same in all three; only arrangement and motion change." }
    - wait: 800
hook: "Water looks smooth and continuous. Zoom in about a billion times and the picture changes completely: that picture is the particle model, and the rest of chemistry is built on it."
---
Scientists explain how substances behave with a **model**: a simplified picture that is good at explaining and predicting. This lesson builds the particle model and its four key ideas.

## Engage: zoom into a drop of water

```step
stage: predict
insight: "Committing to a picture of matter first exposes the idea that matter is continuous, or that particles float in something."
check:
  type: predict
  q: "Zoom into a drop of water a billion times. What would you see?"
  options: ["Smooth water, all the way down", "Lots of tiny drops of water", "Tiny particles floating in water", "Tiny particles with empty space between them"]
  actual: "Tiny particles with empty space between them, always moving. There is nothing between them, not even air."
```

Decide before you look. There is no penalty for being wrong: the point is to find out what you think now.

## Explore: the zoom lens

```step
stage: run
insight: "Seeing ice, water and steam as the same particles in different arrangements sets up the whole model."
try: { playground: science, starter: "boards.yml#zoom", height: 500 }
check: { type: board, text: "Look at all three samples: ice, liquid water and steam.", expect: { done: true } }
```

Look at each sample for a few seconds. Watch how the particles are spaced, and how they move.

## Explain: what the model says

```step
stage: investigate
insight: "The four key ideas (particles, space, motion, attraction) are what students must be able to reproduce before they can use diagrams to reason."
tasks:
  - check:
      type: question
      q: "What is between the particles?"
      options: ["Air", "Water", "Nothing: empty space"]
      answer: 2
      feedback: ["Air is made of particles too. Between particles there is nothing at all.", "The particles are the water. There is no water between them.", null]
      explain: "There is nothing between particles, not even air."
  - check:
      type: question
      q: "Do the particles in ice ever stop moving?"
      options: ["Yes, ice is frozen still", "No, they vibrate in place"]
      answer: 1
      feedback: ["Watch the ice sample again: every particle jiggles in its place.", null]
      explain: "Even in a solid, particles vibrate. They never stop."
  - check:
      type: question
      q: "Ice, liquid water and steam: are their particles the same?"
      options: ["Yes: only the arrangement and motion change", "No: ice particles are bigger", "No: steam particles are smaller"]
      answer: 0
      feedback: [null, "Particles never change size. Ice particles are the same water particles, held in a pattern.", "Particles never change size. Steam particles are the same, just far apart."]
      explain: "All three are made of the same water particles."
  - check:
      type: sort
      q: "Which statements are part of particle theory?"
      options: ["Part of particle theory", "Not true"]
      items:
        - ["All matter is made of tiny particles.", "Part of particle theory", "Key idea 1."]
        - ["There is empty space between particles.", "Part of particle theory", "Key idea 2."]
        - ["Particles are always moving.", "Part of particle theory", "Key idea 3. Even in solids they vibrate."]
        - ["Particles attract each other.", "Part of particle theory", "Key idea 4. Strongest in solids, weakest in gases."]
        - ["Particles expand when they are heated.", "Not true", "Particles never change size. They move faster and spread out."]
        - ["There is air between the particles.", "Not true", "Air is made of particles too."]
        - ["Particles in a solid do not move.", "Not true", "They vibrate in place."]
      explain: "Remember the four key ideas as: particles, space, motion, attraction."
  - check:
      type: match
      q: "Match each state to its particles: arrangement, motion and attraction."
      pairs:
        - ["Solid", "Close together in a fixed pattern, vibrating in place, strong attraction"]
        - ["Liquid", "Close together with no pattern, sliding past each other, weaker attraction"]
        - ["Gas", "Far apart, moving fast in all directions, very weak attraction"]
      explain: "The three states differ in the same three ways: arrangement, motion and attraction."
```

### Between the particles

Look at any sample. What fills the gaps?

### Ice

Watch the ice sample closely.

### Same particles?

Think about what changed between the three samples, and what did not.

### The four key ideas

Sort each statement.

### Across the states

Compare the three samples on the board.

## Practise: name that state

```step
stage: practise
insight: "Reliable matching of diagrams to states needs practice with feedback that names the particle feature every time."
try: { playground: science, starter: "boards.yml#identify", height: 500 }
check: { type: board, text: "Name the state of six substances correctly.", expect: { done: true } }
```

Each round shows a new substance through the zoom lens. Is it a solid, a liquid or a gas?

## Elaborate: explain three things about ice

```step
stage: modify
tier: typical
insight: "Explaining properties in particle language is the move from describing the model to using it."
check:
  type: sort
  q: "For each property of ice, choose the particle explanation."
  options:
    - "Its particles are held in fixed positions by strong attraction"
    - "Its particles are packed closely, with very little space between them"
    - "Its particles vibrate more as they warm, until they break free of their positions"
    - "Its particles are far apart and move freely"
    - "Its particles get bigger when warmed"
  items:
    - ["Ice keeps its shape on a plate.", "Its particles are held in fixed positions by strong attraction", "Strong attraction holds each particle in place."]
    - ["You can't squash an ice cube.", "Its particles are packed closely, with very little space between them", "There is almost no empty space to push the particles into."]
    - ["An ice cube held in your hand starts to melt.", "Its particles vibrate more as they warm, until they break free of their positions", "Warming makes particles vibrate more until they slide past each other."]
  explain: "Each property comes from one particle feature: arrangement, motion or attraction."
```

On paper: draw a particle diagram of ice and label it with these three explanations.

## Elaborate: build a state

```step
stage: modify
tier: wider
insight: "Spacing and motion go together: building the states from the two features shows why some combinations never happen."
try: { playground: science, starter: "boards.yml#build", height: 520 }
check: { type: board, text: "Build a solid, a liquid and a gas.", expect: { done: true } }
```

Choose how close the particles are and how they move. Try the combinations that don't make a real state too, and read what the board says.

## Elaborate: how good is the model?

```step
stage: modify
tier: wider
insight: "Every model has limits; Brownian motion is the classic evidence that particles exist and move."
tasks:
  - check:
      type: sort
      q: "Does the particle model explain it?"
      options: ["Explained by the model", "Not explained"]
      items:
        - ["Why a gas spreads to fill its container", "Explained by the model", "Gas particles move fast in all directions."]
        - ["Why you can smell perfume from across a room", "Explained by the model", "Perfume particles move and spread between the air particles."]
        - ["Why copper is orange-brown", "Not explained", "Colour depends on what the particles are made of."]
        - ["Why solids keep their shape", "Explained by the model", "Strong attraction holds particles in place."]
        - ["What particles themselves are made of", "Not explained", "The model treats particles as tiny balls. Atoms come later."]
        - ["Why some substances are poisonous", "Not explained", "That depends on chemistry, not on arrangement or motion."]
      explain: "The model explains how substances behave, not everything about them."
  - check:
      type: question
      q: "In 1827 the botanist Robert Brown saw tiny grains from pollen jiggling in water under a microscope, in random directions, with nothing stirring the water. In 1905 Albert Einstein explained it with particles. What causes the jiggling?"
      options: ["The grains are alive and swimming", "Water particles are always moving and keep bumping into the grains", "The water is flowing slowly"]
      answer: 1
      feedback: ["Brown checked this: grains from long-dead plants, and even specks of dust, jiggled the same way.", null, "The jiggling goes in random directions, not along with a flow."]
      explain: "This is Brownian motion: millions of tiny bumps from moving water particles. It was early strong evidence that particles are real and always moving."
```

### What it explains

### The evidence

## Elaborate: designing with materials

```step
stage: modify
tier: wider
insight: "Designers in Design and Technologies choose solids, liquids and gases for exactly these particle reasons."
check:
  type: sort
  q: "Match each design choice to the particle reason."
  options:
    - "A gas can be squashed, so it cushions bumps"
    - "A liquid hardly squashes, so a push at one end moves the other end straight away"
    - "Solid particles are held in fixed positions, so the shape stays under a load"
    - "Its particles are lighter"
  items:
    - ["Bike tyres are filled with air, not water.", "A gas can be squashed, so it cushions bumps", "Air particles have space to move closer when you hit a bump."]
    - ["Car brakes use a liquid in the pipes to push the brake pads.", "A liquid hardly squashes, so a push at one end moves the other end straight away", "A gas would just squash."]
    - ["Bridge beams are made of solid steel.", "Solid particles are held in fixed positions, so the shape stays under a load", "Strong attraction keeps the steel particles in place."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first prediction with the particle model and can say what changed in my thinking." }
```

Go back to your prediction in Engage. Was matter smooth, drops, particles in water, or particles with empty space? Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- All matter is made of tiny particles; there is empty space between them; they are always moving; they attract each other.
- **Solid:** close together in a fixed pattern, vibrating in place.
- **Liquid:** close together with no pattern, sliding past each other.
- **Gas:** far apart, moving fast in all directions.
- There is nothing between particles: not air, not water.
