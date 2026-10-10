---
order: 2
unit: rates
title: Why does heat speed up reactions?
summary: Particles react only when they collide with enough energy (the activation energy). Collision theory explains why temperature, concentration, surface area and catalysts change the rate of a reaction.
language: science
hook: "Milk goes off in days on the bench but lasts a week in the fridge. A glow stick in hot water glows brighter but fades sooner. Same idea: how often, and how hard, particles collide."
---
Reactions go at different speeds. This lesson gives one model that explains every way to change the speed.

## Engage: hotter and faster?

```step
stage: predict
insight: "Students' reasons for 'faster' (particles want to react, get bigger) surface here; the board's collision count replaces them with frequency and energy."
check:
  type: predict
  q: "A reaction takes 30 seconds at room temperature. You heat it by 100 °C. How long do you predict it takes?"
  options: ["About the same", "A little faster, maybe 25 seconds", "Much faster, a few seconds", "Slower"]
  actual: "Much faster. Particles move faster, so they collide more often and, more importantly, far more of the collisions have enough energy to react."
```

## Explore: two temperatures

```step
stage: run
insight: "Comparing times and the percentage of collisions that react shows energy, not just frequency, driving the change."
try: { playground: science, starter: "boards.yml#compare", height: 600 }
check: { type: board, text: "Run the reaction at two different temperatures and compare.", expect: { done: true } }
```

Run it at 300 K first. Then press **Reset**, move the temperature (try 500 K) and run it again. Watch two numbers in the panel: **collisions** and **reactions**.

## Explain: collisions and energy

```step
stage: investigate
insight: "Separating 'how often' from 'how hard' is the model; every rate factor is one or both."
tasks:
  - check:
      type: question
      q: "Most collisions on the board did not make a reaction. Why not?"
      options: ["They didn't have enough energy: they were below the activation energy", "The particles were the wrong colour", "Only the first collision of each particle counts", "The particles were too far apart"]
      answer: 0
      feedback: [null, "Colour is just a code for atom type.", "Particles can collide many times before one collision reacts.", "They touched: that is what a collision is."]
      explain: "A collision reacts only if it has at least the activation energy. The rest bounce off."
  - check:
      type: sort
      q: "What happens when the temperature goes up?"
      options: ["True", "False"]
      items:
        - ["Particles move faster", "True"]
        - ["Collisions happen more often", "True"]
        - ["A larger share of collisions has enough energy", "True", "This is the bigger effect: see the percentage in the panel."]
        - ["Particles get bigger", "False", "Particles never change size."]
        - ["The activation energy gets smaller", "False", "The energy needed stays the same; more collisions reach it."]
  - check:
      type: question
      q: "A 100 °C rise doesn't make the particles collide 10 times more often, yet the reaction can go 10 times faster. What explains the rest?"
      options: ["Many more collisions have enough energy to react", "The particles stick together for longer", "The container gets bigger"]
      answer: 0
      feedback: [null, "Particles bounce or react on contact; they don't linger.", "The container stays the same size."]
      explain: "Temperature changes how hard particles hit far more than how often. That is why heat has such a big effect."
  - check: { type: reflect, text: "I explained, using collisions and activation energy, why heating makes a reaction faster." }
```

### Why most collisions fail

### What heating does

### The bigger effect

### In your own words

In your book: explain why a reaction is faster at a higher temperature. Use "collide", "more often" and "activation energy".

## Elaborate: concentration

```step
stage: modify
tier: typical
insight: "Changing only the number of particles isolates collision frequency: the same share of collisions reacts, but there are more of them."
try: { playground: science, starter: "boards.yml#dilute", height: 580 }
tasks:
  - starter: "boards.yml#dilute"
    check: { type: board, text: "Run the low-concentration reaction to the target.", expect: { done: true } }
  - starter: "boards.yml#concentrated"
    check: { type: board, text: "Run the high-concentration reaction to the same target.", expect: { done: true } }
  - check:
      type: question
      q: "The concentrated reaction reached the target faster. Why?"
      options: ["More particles in the same space collide more often", "Each collision had more energy", "The activation energy was lower"]
      answer: 0
      feedback: [null, "Same temperature, so the same energies: compare the percentage of collisions that react on the two boards.", "Same reaction, same activation energy."]
      explain: "Concentration changes how often particles collide, not how hard."
  - check:
      type: question
      q: "A lump of chalk reacts slowly with acid; chalk powder fizzes fast. Which explanation fits collision theory?"
      options: ["Powder exposes far more particles to the acid, so there are more collisions each second", "Powder particles have more energy", "Powder is a different substance"]
      answer: 0
      feedback: [null, "Same temperature, same energy. The difference is how many particles can be hit.", "It is the same chalk, in smaller pieces."]
      explain: "Surface area, like concentration, changes collision frequency."
```

### Low concentration

### High concentration

### Why faster

### Surface area

## Elaborate: a catalyst

```step
stage: modify
tier: wider
insight: "A catalyst changes the threshold, not the particles' energy; comparing with heating shows two different routes to more successful collisions."
try: { playground: science, starter: "boards.yml#catalyst", height: 580 }
tasks:
  - check: { type: board, text: "Compare the reaction with and without the catalyst.", expect: { done: true } }
  - check:
      type: question
      q: "With the catalyst, the reaction sped up but the temperature didn't change. How?"
      options: ["The catalyst lowered the activation energy, so more collisions had enough energy", "The catalyst gave the particles extra energy", "The catalyst reacted and was used up"]
      answer: 0
      feedback: [null, "The temperature in the panel didn't change, so the particles' energies didn't either.", "A catalyst is not used up: the same amount is there at the end."]
      explain: "A catalyst provides a route with a lower activation energy. (In the model it simply halves the threshold; real catalysts often work on their surface.)"
```

### Compare

### How a catalyst works

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about heating with the results, and can explain any difference." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Particles react only when they **collide** with at least the **activation energy**. Most collisions just bounce.
- **Temperature:** faster particles collide more often and, much more importantly, harder. Biggest effect.
- **Concentration** and **surface area:** more collisions each second.
- **Catalyst:** a lower activation energy, so more collisions succeed. It is not used up.
