---
order: 10
node: AC9S8U07 n6
unit: changes
title: Physical or chemical? Use all the clues
summary: "To classify an unfamiliar change, ask the main question first: is a new substance made? Then check the clues: colour, gas, solid forming, light, and temperature or energy change. One clue can mislead (boiling makes bubbles and ice melting takes in heat, yet both are physical), so several clues pointing the same way give more confidence."
language: science
voice: { name: bf_emma, speed: 1.05 }
hook: "A pot of water boils: bubbles, steam, heat. A pot of milk 'boils' and then turns to a skin. Both look dramatic. Only one is a chemical change. How do you tell?"
---
A short lesson with no simulation. You have the new-substance test, the clues and energy change. Now use them together.

## Engage: two kinds of bubbles

```step
stage: predict
insight: "Students treat bubbles as proof of a chemical change. The new-substance test comes first; indicators only support it."
check:
  type: predict
  q: "Water in a pot is heated and bubbles all through it. An antacid tablet dropped into water also bubbles. Which is a chemical change?"
  options: ["Only the antacid: it makes a new gas, while the bubbles in boiling water are just water vapour", "Both: bubbles always mean a chemical change", "Only the water: it takes in heat", "Neither"]
  actual: "Only the antacid. The bubbles in boiling water are water as a gas (a physical change). The tablet reacts to make carbon dioxide, a new substance. A clue like bubbles only counts if it points to a new substance."
```

## Explain: classify with evidence

```step
stage: investigate
insight: "Applying the new-substance criterion, indicators and energy change to unfamiliar cases, and spotting a misleading clue, meets all three success criteria."
tasks:
  - check:
      type: sort
      q: "Physical or chemical change?"
      options: ["Physical", "Chemical"]
      items:
        - ["Butter melting in a pan", "Physical", "Same substance, new state."]
        - ["An egg cooking and turning solid and white", "Chemical", "The proteins change into new substances."]
        - ["Sugar dissolving in tea", "Physical", "The sugar can be recovered by evaporating the water."]
        - ["Iron nails going orange-brown and flaky in damp air", "Chemical", "Rust is a new substance."]
        - ["Dry ice (solid carbon dioxide) turning straight into a gas", "Physical", "Still carbon dioxide, now a gas. (The white fog is water from the air, condensed by the cold.)"]
        - ["Milk going sour", "Chemical", "New substances (acids) are made."]
  - check:
      type: question
      q: "Ice melts and the water around it gets colder. Does a temperature change show a chemical change here?"
      options: ["No: melting is a physical change that takes in energy, so a temperature change alone does not prove a new substance", "Yes: any temperature change means a chemical change", "Yes, because ice is a different substance from water"]
      answer: 0
      feedback: [null, "Changes of state also take in or give out energy.", "Ice and water are the same substance in two states."]
      explain: "Temperature changes happen in both kinds of change, so you need the new-substance test too."
  - check:
      type: question
      q: "A liquid in a test tube changes colour, fizzes, gets hot and leaves a solid at the bottom. Why is this more convincing than a colour change alone?"
      options: ["Several different clues point the same way, so a new substance is very likely", "Fizzing is always a chemical change", "More clues make it physical"]
      answer: 0
      feedback: [null, "Boiling also fizzes. The point is the clues agree.", "More converging clues point towards a chemical change."]
      explain: "No single clue is certain. Several agreeing clues make a classification much more reliable."
  - check:
      type: question
      q: "Pouring vinegar on baking soda fizzes and gets cold, the mixture is left as a different liquid, and the gas puts out a flame. How should you classify it?"
      options: ["Chemical: a new gas and new substances were made, even though it got colder", "Physical, because it got colder", "Physical, because it looks like a liquid before and after"]
      answer: 0
      feedback: [null, "Some chemical changes take in energy (endothermic).", "Look at the substances, not just the look of the liquid."]
      explain: "A gas that behaves differently from air, and new substances, show a chemical change. Taking in energy fits, because some reactions are endothermic."
  - check: { type: reflect, text: "I can classify an unfamiliar change using the new-substance test and the clues, and I know a single clue can mislead." }
```

### Sort

### Colder

### Many clues

### A cold reaction

### In your own words

In your book: choose one change from your kitchen. Write what you see, say whether it is physical or chemical, and give two clues and the new-substance reason.

## Elaborate: a whole recipe

```step
stage: modify
tier: typical
insight: "A multi-step process makes students classify each stage separately and see that one process can include both kinds of change."
check:
  type: question
  q: "Bread making: flour and water are mixed, the yeast makes gas, the dough rises, and the loaf is baked brown. Which stages are chemical?"
  options: ["Yeast making gas, and baking to a brown crust; mixing is physical", "Only the baking", "All of it, because it ends up as bread", "None of it"]
  answer: 0
  feedback: [null, "The yeast makes a new gas too.", "Mixing flour and water doesn't make a new substance by itself.", "Gas from yeast and browning are new substances."]
  explain: "Mixing is physical, while the yeast making carbon dioxide and the baking and browning are chemical changes. Most real processes have both."
```

## Elaborate: testing

```step
stage: modify
tier: wider
insight: "Indicators are used in the real world for detection, and false positives are a design problem."
check:
  type: question
  q: "A water test kit changes colour to show chlorine. Why might a good kit use a clue that is hard to fake, such as a very specific colour change?"
  options: ["Other substances might cause a weaker or different clue, so a specific one reduces false positives", "A colour change is always chemical, so one is enough", "Colour doesn't matter"]
  answer: 0
  feedback: [null, "A change of colour can come from other things too, such as dilution.", "It does: the clue must match the substance."]
  explain: "A test is reliable when its clue points to one substance and nothing else. That is the same idea as using several clues together."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the bubbles with how I now classify changes." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- First ask: **is a new substance made?** That is what makes a change chemical.
- The clues (colour, gas, solid, light, temperature or energy change) support the answer, but **one clue can mislead**.
- **Several clues pointing the same way** give more confidence.
- Real processes, such as cooking, often include both physical and chemical changes.
