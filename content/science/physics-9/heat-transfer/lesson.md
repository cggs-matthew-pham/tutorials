---
order: 1
unit: energy
title: How does heat get through?
summary: Conduction passes energy from particle to particle by collisions, with the particles staying in place. Convection carries energy as the heated fluid itself moves. The particle model explains both, and why metals conduct and trapped air insulates.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8255
  url: http://127.0.0.1:8255/index.html
  readySelector: "#board svg"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Conduction"
  say: "In conduction the particles stay in place and pass energy on by collisions."
  clip:
    - caption: { text: "A metal bar heated at one end. Blue is cool, red is hot.", say: "A metal bar heated at one end: blue is cool, red is hot." }
    - wait: 3000
    - caption: { text: "Particles vibrate harder and bump their neighbours. None of them move along.", say: "Particles vibrate harder and bump their neighbours; none of them move along." }
    - wait: 4000
    - caption: { text: "That's conduction. In liquids and gases, the warm fluid itself moves: convection.", say: "That is conduction; in liquids and gases the warm fluid itself moves." }
    - wait: 1500
hook: "Leave a metal spoon in hot soup and the handle soon burns your fingers. Heat a pot of water from the bottom and the top gets hot too. Two different journeys for the energy."
---
In Year 7 you used the particle model to explain solids, liquids and gases. This lesson uses it to explain how energy moves.

## Engage: the spoon

```step
stage: predict
insight: "Students who picture particles travelling up the spoon will choose that option; the bar shows energy moving while the particles stay put."
check:
  type: predict
  q: "A metal spoon stands in hot soup. Soon the handle is hot. What do you predict is happening in the spoon?"
  options: ["Hot particles travel up the handle", "Particles vibrate harder and pass the energy to their neighbours, staying in place", "Heat flows up like a liquid", "Cold leaves the spoon"]
  actual: "The particles stay in place. Those at the hot end vibrate harder and bump their neighbours, passing the energy along the handle. That is conduction."
```

## Explore: a heated bar, then heated water

```step
stage: run
insight: "The same particle colours in a solid and a liquid make the contrast clear: in the bar energy moves and particles don't; in the water both do."
try: { playground: science, starter: "boards.yml#bar", height: 520 }
tasks:
  - starter: "boards.yml#bar"
    check: { type: board, text: "Heat the bar until the far end warms up.", expect: { done: true } }
  - starter: "boards.yml#beaker"
    check: { type: board, text: "Follow a particle round one loop in the heated water.", expect: { done: true } }
```

### Conduction

Blue is cool, red is hot. Watch one particle: does it go anywhere?

### Convection

Follow the ringed particle (or click another).

## Explain: two ways to travel

```step
stage: investigate
insight: "Naming the mechanism in each case (collisions passing energy; the fluid itself moving) is what makes the terms explanations, not labels."
tasks:
  - check:
      type: question
      q: "In the bar, how did the energy reach the far end?"
      options: ["Particles vibrated harder and bumped their neighbours, passing the energy along", "Hot particles moved to the far end", "The heater's flame travelled along the bar"]
      answer: 0
      feedback: [null, "Watch a single particle: it stays in its place, just vibrating.", "Nothing but energy moved along."]
      explain: "Conduction: energy passes from particle to particle through collisions. The particles stay where they are."
  - check:
      type: question
      q: "In the water, how did the energy reach the top?"
      options: ["The heated water itself moved up, carrying the energy", "Particles passed energy up without moving", "The cold water went down and pushed heat up"]
      answer: 0
      feedback: [null, "That happens a little (conduction), but your particle travelled the whole way round.", "Cool water does sink, but the energy is carried up by the warm water rising."]
      explain: "Convection: the heated fluid rises, carrying its energy, and cooler fluid sinks to replace it."
  - check:
      type: question
      q: "Why does the heated water rise?"
      options: ["Its particles spread out, so it is less dense than the cooler water around it", "Heat always rises", "Hot particles are lighter than cold ones", "The heater pushes it up"]
      answer: 0
      feedback: [null, "Heat on its own does not go anywhere; something carries it. What moved up on the board?", "Each particle has the same mass hot or cold. What changes is how far apart they are.", "That is what the model does, to keep it simple. In real water nothing pushes: the warm water floats up, like a cork."]
      explain: "Heated water expands: the same particles take up more space, so it is less dense (density, from Year 7) and floats up through the cooler, denser water. The board pushes hot particles up directly; that part is a simplification."
  - check:
      type: sort
      q: "Conduction or convection?"
      options: ["Conduction", "Convection"]
      items:
        - ["A saucepan handle getting hot", "Conduction"]
        - ["Warm air from a heater spreading round a room", "Convection"]
        - ["Your hand warming up on a hot mug", "Conduction"]
        - ["Water in a kettle heating all the way through", "Convection"]
        - ["A sea breeze on a hot afternoon", "Convection", "Air over the warm land rises; cooler air from over the sea moves in."]
        - ["Ice cream melting on a metal spoon faster than on a plastic one", "Conduction"]
  - check:
      type: question
      q: "Why can't convection happen in a solid?"
      options: ["The particles are held in place, so the material can't flow", "Solids can't be heated", "Solids have no particles"]
      answer: 0
      feedback: [null, "The bar heated up, by conduction.", "Solids are made of particles, tightly held."]
      explain: "Convection needs the material to flow. Only liquids and gases can."
  - check: { type: reflect, text: "I explained the difference between conduction and convection, describing what the particles do in each." }
```

### In the bar

### In the water

### Why it rises

### Which is which

### Solids

### In your own words

In your book: explain the difference between conduction and convection. For each, say what the particles do.

## Elaborate: turn the heat off

```step
stage: modify
tier: typical
insight: "Removing the heat source shows the current depends on a temperature difference: it slows and stops as the water evens out."
try: { playground: science, starter: "boards.yml#noheat", height: 560 }
check:
  type: question
  q: "Turn the heat off once the current is going and watch for a while. What happens to the current?"
  options: ["It slows down and stops as the water ends up the same temperature all through", "It keeps going forever", "It reverses direction"]
  answer: 0
  feedback: [null, "Watch the colours: once they even out, nothing is hotter or less dense than its surroundings.", "Nothing pushes it the other way: with no heat, the top still cools, and differences fade."]
  explain: "A convection current needs one part of the fluid to be hotter (less dense) than another. With no heater, the difference fades and the current stops."
```

## Elaborate: conductors and insulators

```step
stage: modify
tier: wider
insight: "Explaining insulators with both mechanisms (poor conduction, trapped air that can't convect) applies the model to real materials."
tasks:
  - check:
      type: question
      q: "Saucepans are metal with plastic or wooden handles. Why?"
      options: ["Metal conducts heat well to cook the food; plastic and wood conduct poorly, so the handle stays cool", "Plastic handles are lighter", "Metal handles would melt"]
      answer: 0
      feedback: [null, "Weight is not why: a metal handle would burn your hand.", "Metal melts at a far higher temperature than a stove reaches."]
      explain: "Metals are good conductors; plastic and wood are insulators."
  - check:
      type: question
      q: "Wool, fur and feathers keep animals warm mostly because they trap air. Why does trapped air insulate so well?"
      options: ["Air conducts poorly, and trapped in small pockets it can't form convection currents", "Air is warm", "Air reflects heat back"]
      answer: 0
      feedback: [null, "Air is not warm in itself: it is good at not passing energy on.", "Reflecting is radiation, which shiny surfaces do. Fibres work by trapping air."]
      explain: "Gas particles are far apart, so conduction is poor; in tiny pockets the air can't circulate, so convection is blocked too. Possum-skin cloaks, made and worn by many First Nations peoples of south-eastern Australia, use the same idea: dense fur trapping air."
```

### Saucepans

### Trapped air

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the spoon with what the bar showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Conduction:** particles vibrate harder and pass energy to their neighbours by collisions. **The particles stay in place.** Mostly in solids; metals conduct well.
- **Convection:** heated fluid becomes less dense and rises, cooler fluid sinks: a **convection current**. **The particles move**, carrying the energy. Only in liquids and gases.
- **Insulators** (wood, plastic, trapped air) pass energy on poorly. Trapped air blocks convection too.
- It is the hot fluid that rises, not "heat".
