---
order: 5
unit: foodwebs
title: What if the dingo disappeared?
summary: A biotic factor is a living part of an ecosystem. When one population changes, the effect ripples along the food web, beyond the species directly linked to it. Tracing the links lets you predict the cascade.
language: science
hook: "Where dingoes were removed to protect sheep, kangaroos and foxes boomed, and some small native animals nearly vanished. How could removing one predator harm small animals it rarely ate?"
---
You can build a web and follow its energy. This lesson uses the web to predict.

## Engage: remove the dingo

```step
stage: predict
insight: "Students usually predict only the immediate effect (prey increase); the cascade to bandicoots is the reasoning the node targets."
check:
  type: predict
  q: "In a web where dingoes eat kangaroos, rabbits and foxes, and foxes eat rabbits and bandicoots, the dingoes are removed. What do you predict happens to the bandicoots?"
  options: ["They increase: one less predator in the area", "They decrease", "No change: dingoes didn't eat them", "They disappear immediately"]
  actual: "They decrease. Without dingoes, foxes increase, and foxes eat bandicoots. The effect travels along the web, two links away."
```

## Explore: predict, then check

```step
stage: run
insight: "Committing to a prediction for every population before seeing the model's reasons makes students trace each link themselves."
try: { playground: board, starter: "boards.yml#dingo", height: 620 }
check: { type: board, text: "Remove the dingo, predict every other population, then check.", when: "h = 1" }
```

Press **Remove the dingo**. Then click each organism to choose **↑ more**, **↓ fewer** or **– little change**. When you have predicted all of them, press **Check my predictions** and read the reason for each.

## Explain: tracing a cascade

```step
stage: investigate
insight: "Naming biotic factors and tracing a cascade step by step turns the board's reasons into the student's own reasoning."
tasks:
  - check:
      type: sort
      q: "Biotic or abiotic?"
      options: ["Biotic (living)", "Abiotic (non-living)"]
      items:
        - ["A new predator arriving", "Biotic (living)"]
        - ["A disease spreading through rabbits", "Biotic (living)"]
        - ["A drought", "Abiotic (non-living)"]
        - ["Competition between kangaroos and rabbits for grass", "Biotic (living)"]
        - ["The temperature dropping", "Abiotic (non-living)"]
        - ["A plant species dying out", "Biotic (living)"]
  - check:
      type: parsons
      code: "steps.txt#cascade"
      text: "Put the cascade in order."
      explain: "Each step follows one link in the web: that's how an effect reaches species that never met the dingo."
  - check:
      type: question
      q: "On the board, the insects could go either way. Why?"
      options: ["Two effects pull opposite ways: less grass (their food) but fewer bandicoots (which eat them)", "Insects aren't in the food web", "The board can't tell"]
      answer: 0
      feedback: [null, "They are: they eat grass and bandicoots eat them.", "It can: it shows that two effects disagree, and which ones."]
      explain: "Real outcomes depend on which effect is stronger. Scientists would need to measure."
  - check: { type: reflect, text: "I traced one cascade, link by link, from the dingo to a species it never ate." }
```

### Biotic factors

### The chain of effects

### Either way

### In your own words

In your book: explain why removing dingoes can lead to fewer bandicoots, one link at a time.

## Elaborate: wolves in Yellowstone

```step
stage: modify
tier: typical
insight: "A famous real cascade, with evidence, connects the model to observed ecology."
check:
  type: question
  q: "Wolves were returned to Yellowstone National Park (USA) in 1995. Elk numbers fell and elk stopped grazing near rivers. Willow and aspen trees then grew back along the rivers, and beavers returned. Which explains the beavers?"
  options: ["Fewer elk eating young trees meant more trees, which beavers use for food and dams", "Wolves eat beavers' predators", "Beavers followed the wolves"]
  answer: 0
  feedback: [null, "Wolves do eat some beaver predators, but the main link scientists describe is through the trees.", "Beavers depend on trees, not on wolves directly."]
  explain: "Wolves → fewer elk → more trees → more beavers: a three-link cascade, observed in the field. (Scientists still debate how strong each link was.)"
```

## Elaborate: your own removal

```step
stage: modify
tier: wider
insight: "Choosing which species to remove and predicting the whole web tests transfer to an unfamiliar web."
try: { playground: board, starter: "boards.yml#choose", height: 620 }
check: { type: board, text: "Choose a species to remove, predict every other population, then check.", when: "h = 1" }
```

Pick any plant or animal to remove. Which removal do you think changes the most populations? Try a producer and a top predator.

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the bandicoots with the model's reasons." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **biotic factor** is a living part of an ecosystem: predators, prey, competitors, disease.
- Changing one population affects the species linked to it, and then the species linked to those: a **cascade**.
- Trace it **one link at a time**: fewer predators → more prey → less of what the prey eats…
- When two effects pull opposite ways, the result could go either way; scientists measure to find out.
