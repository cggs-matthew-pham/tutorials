---
order: 5
unit: mixtures
title: How do you separate a mixture?
summary: Every separation technique uses a difference in a physical property between the parts of a mixture. Match property differences to techniques, and choose the order.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8251
  url: http://127.0.0.1:8251/index.html
  readySelector: "#board svg"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Separating mixtures"
  say: "Each separation technique uses a difference in a property."
  clip:
    - caption: { text: "Water, salt, sand and iron filings. Each tool uses a different property.", say: "Water, salt, sand and iron: each tool uses a different property." }
    - wait: 3280
    - click: "Magnet"
    - wait: 1500
    - caption: { text: "A magnet pulls out the iron: it's magnetic.", say: "A magnet pulls out the iron, because it's magnetic." }
    - wait: 2620
    - click: "Filter paper"
    - wait: 2000
    - caption: { text: "Filter paper keeps the sand: its grains are too big.", say: "Filter paper keeps the sand: its grains are too big to pass." }
    - wait: 3610
    - click: "Evaporate"
    - wait: 2500
    - caption: { text: "Evaporating leaves the dissolved salt.", say: "Evaporating the water leaves the dissolved salt behind." }
    - wait: 800
hook: "A recycling plant lifts steel cans out of the rubbish with a giant magnet and leaves everything else behind. Every way of separating a mixture works like that: it uses a difference between the parts."
---
Separating doesn't change the particles: you get back the same substances you mixed. The trick is to find a **property** where the parts differ.

## Engage: the recycling magnet

```step
stage: predict
insight: "Students often explain separation by weight or size by default; magnetism is a clean property that exposes this."
check:
  type: predict
  q: "A magnet lifts steel cans but leaves aluminium cans behind. Why?"
  options: ["The magnet only lifts heavier things", "Steel is attracted to magnets and aluminium isn't", "Aluminium cans are too light to be picked up", "Steel cans are bigger"]
  actual: "Magnetism: steel is attracted to magnets and aluminium isn't. Every separation uses a difference in a property like this."
```

## Explore: the separation bench

```step
stage: run
insight: "Choosing tools on a real mixture, where order matters, turns property-technique pairs into reasoning instead of a list."
try: { playground: science, starter: "boards.yml#bench", height: 560 }
check: { type: board, text: "Get iron, sand and salt each on its own.", expect: { done: true } }
```

The beaker holds water with dissolved salt, sand and iron filings. Use the tools to get **iron, sand and salt each on its own**. The order matters, and you can start again.

## Explain: why each technique works

```step
stage: investigate
insight: "Naming the property behind each technique, and why the order mattered, is the node's checkpoint."
tasks:
  - check:
      type: sort
      q: "Which technique uses each property difference?"
      options: ["Magnet", "Filtration", "Evaporation", "Sieving", "Letting it settle, then pouring off"]
      items:
        - ["Iron is magnetic; sand isn't.", "Magnet", "Magnetism."]
        - ["Sand grains are too big to pass through filter paper; water and dissolved salt pass through.", "Filtration", "Particle size."]
        - ["Water boils at 100 °C; salt doesn't boil until 1413 °C.", "Evaporation", "Boiling point."]
        - ["Pebbles are much bigger than grains of rice.", "Sieving", "Particle size, with bigger holes."]
        - ["Oil is less dense than water, so it floats on top.", "Letting it settle, then pouring off", "Density."]
      explain: "Each technique uses one property difference."
  - check:
      type: question
      q: "Why does filter paper catch the sand but not the salt?"
      options: ["Salt is lighter than sand", "Sand grains are too big for the tiny holes; dissolved salt is spread out as single particles small enough to pass through", "The salt has disappeared", "Sand sticks to the paper"]
      answer: 1
      feedback: ["Weight isn't what the filter tests. The holes test size.", null, "The salt is still in the water. Evaporate it and the salt comes back.", "The sand is held back because it can't fit through the holes."]
      explain: "Filter paper sorts by particle size."
  - check:
      type: question
      q: "Why did the magnet have to come before the filter paper?"
      options: ["Iron and sand are both too big for the filter, so filtering first would trap them together", "Magnets don't work underwater", "It's the rule for separating"]
      answer: 0
      feedback: [null, "Magnets work fine through water.", "There is no fixed rule. The order depends on the mixture and the properties."]
      explain: "The magnet picks out just the iron first; then the filter only catches sand."
  - check: { type: reflect, text: "I explained how I separated the iron, sand and salt, naming the property difference for each step." }
```

### Property to technique

### Filter paper

### The order

### In your own words

In your book: explain how you separated the iron, sand and salt. For each step, name the property difference you used.

## Elaborate: choose, and rule out

```step
stage: modify
tier: typical
insight: "Justifying a choice includes saying why the other techniques would not work."
check:
  type: sort
  q: "You need to get chalk dust back out of chalky water. Chalk doesn't dissolve. Judge each technique."
  options: ["Best choice", "Works, but not the best", "Won't work"]
  items:
    - ["Filtration", "Best choice", "Chalk particles don't dissolve and are too big for the filter paper."]
    - ["Evaporation", "Works, but not the best", "It leaves the chalk, but takes a lot of energy and also leaves any dissolved minerals mixed in."]
    - ["A magnet", "Won't work", "Chalk isn't magnetic."]
    - ["A kitchen sieve", "Won't work", "Chalk dust is far smaller than the holes."]
  explain: "Name the property difference, then rule out techniques that can't use it."
```

## Elaborate: size, density and boiling point

```step
stage: modify
tier: wider
insight: "The same few properties sit behind techniques students already know from home."
check:
  type: sort
  q: "Which property difference does each one use?"
  options: ["Particle size", "Density", "Boiling point", "Magnetism"]
  items:
    - ["Panning for gold: swirling water washes away gravel and leaves gold flakes in the pan.", "Density", "Gold is very dense, so it stays at the bottom."]
    - ["Making fresh water from seawater by boiling it and cooling the steam.", "Boiling point", "Water boils far below salt, so only water turns to steam."]
    - ["Sifting flour to remove lumps.", "Particle size", "Lumps are too big for the mesh."]
    - ["Leaving fresh milk to stand so the cream rises to the top.", "Density", "Cream is less dense than the rest of the milk."]
```

## Elaborate: home, recycling and clean water

```step
stage: modify
tier: wider
insight: "Recognising the property in industrial and environmental contexts shows the principle transfers."
check:
  type: sort
  q: "Which property difference does each one use?"
  options: ["Particle size", "Density", "Boiling point", "Magnetism"]
  items:
    - ["Home: a tea bag keeps the leaves out of your cup.", "Particle size", "The leaves are too big for the bag's tiny holes."]
    - ["Recycling: overhead magnets pull steel cans off the conveyor belt.", "Magnetism", "Steel is magnetic."]
    - ["Recycling: air jets blow light paper and plastic film off heavier glass and metal.", "Density", "Light, thin materials are carried by the air."]
    - ["Water treatment: water sits in big tanks so mud sinks to the bottom.", "Density", "Mud particles are denser than water."]
    - ["Water treatment: water trickles through deep beds of sand.", "Particle size", "Small particles get trapped between the sand grains."]
```

## Elaborate: muddy creek water

```step
stage: modify
tier: wider
insight: "Real choices weigh effectiveness and practicality, and often combine techniques."
check:
  type: parsons
  code: "creek.txt#order"
  text: "On a camping trip, the only water is from a muddy creek, and it may contain germs. Order these plans from most effective to least effective at making it safe to drink."
  explain: "Filtering removes the mud (particle size) and boiling kills germs, so combining them is best. Boiling alone makes it safer but leaves mud. A cloth alone removes some mud but not germs."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first prediction with what I found and can say what changed in my thinking." }
```

Why did you think the magnet worked? Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Every separation technique uses a difference in a physical property between the parts of a mixture.
- Magnetism → magnet. Particle size → sieving or filtration. Boiling point → evaporation. Density → letting it settle and pouring off.
- Separating doesn't change the particles: you get back the same substances you mixed.
- Order matters: use the technique that picks out one part before one that traps several together.
