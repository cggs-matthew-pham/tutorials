---
order: 1
unit: universe
title: How did the universe begin?
summary: "The big bang theory: space, time, matter and energy began about 13.8 billion years ago in an extremely hot, dense state, and the universe has expanded and cooled ever since: from particles to atoms, stars, galaxies and planets."
language: science
hook: "Every hydrogen atom in the water you drink was made in the first few minutes of the universe. The carbon in you was made inside stars."
---
Before weighing the evidence for the big bang, you need a clear picture of what the theory says.

## Engage: an explosion?

```step
stage: predict
insight: "Students who picture an explosion at a point in empty space expect a centre; the board describes space itself expanding everywhere."
check:
  type: predict
  q: "What does the big bang theory say happened?"
  options: ["A huge explosion at one point in empty space, throwing matter outwards", "Space, time and matter began together in a hot, dense state, and space itself has been expanding ever since", "Stars collided to make the universe", "The universe has always looked the way it does now"]
  actual: "Space, time and matter began together, extremely hot and dense, and space itself has been expanding and cooling ever since. There was no empty space for it to explode into, and there is no centre."
```

## Explore: 13.8 billion years

```step
stage: run
insight: "Stepping through the stages with the temperature falling makes 'expanding and cooling' the thread that links them."
try: { playground: board, starter: "boards.yml#timeline", height: 640 }
check: { type: board, text: "Step through all ten stages from the big bang to today.", when: "n = k" }
```

Press **Later →** to move through time. Watch the temperature and what has formed at each stage.

## Explain: the model

```step
stage: investigate
insight: "Ordering the stages and linking each to cooling is the model all the evidence lessons test."
tasks:
  - check:
      type: parsons
      code: "timeline.txt#order"
      text: "Put the stages of the universe in order."
  - check:
      type: question
      q: "Why could atoms only form after about 380 000 years?"
      options: ["Before then the universe was too hot: electrons moved too fast to stay attached to nuclei", "There were no electrons", "Stars hadn't made them yet", "Gravity was too weak"]
      answer: 0
      feedback: [null, "Electrons were there, but too energetic.", "Hydrogen and helium atoms came first, before any stars.", "It's about temperature, not gravity."]
  - check:
      type: question
      q: "Where did the carbon and oxygen in your body come from?"
      options: ["Made inside stars and spread by supernovae, long after the big bang", "Made in the first three minutes", "Made on Earth", "They have always existed"]
      answer: 0
      feedback: [null, "Only hydrogen and helium (and a trace of lithium) were made then.", "Earth formed from material already containing them.", "They were made in stars."]
  - check: { type: reflect, text: "I can describe the big bang as the origin of space, time and matter 13.8 billion years ago, and outline the main stages as the universe expanded and cooled." }
```

### Order

### Atoms

### Your atoms

### In your own words

In your book: draw a timeline with at least five stages, the times and one thing that formed at each.

## Elaborate: stars as element factories

```step
stage: modify
tier: typical
insight: "Connecting the first stars to heavier elements explains why later stars and planets differ from the first ones."
check:
  type: question
  q: "The very first stars were made of hydrogen and helium only. The sun also contains carbon, oxygen and iron. What does that tell us?"
  options: ["The sun formed from material that earlier stars had made and spread out", "The sun is older than the first stars", "The sun makes all its elements from nothing", "Carbon was made in the big bang"]
  answer: 0
  feedback: [null, "The sun is 4.6 billion years old; the first stars formed about 13.6 billion years ago.", "Stars make heavier elements from lighter ones by fusion.", "The big bang made almost only hydrogen and helium."]
```

## Elaborate: open questions

```step
stage: modify
tier: wider
insight: "Recognising what the model doesn't yet explain shows how scientific theories grow."
check:
  type: question
  q: "Measurements show the universe's expansion is speeding up, and galaxies hold far more mass than we can see. How do scientists treat these findings?"
  options: ["They add new ideas (dark energy, dark matter) to the model and test them with new observations, from telescopes such as ASKAP in Western Australia", "They throw out the big bang theory", "They ignore them", "They prove the universe is shrinking"]
  answer: 0
  feedback: [null, "The core evidence (redshift, the microwave background, the hydrogen and helium proportions) still fits.", "Science follows the evidence.", "It's expanding, faster over time."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about the big bang with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- The **big bang theory**: space, time, matter and energy began about **13.8 billion years ago**, extremely hot and dense; the universe has been **expanding and cooling** ever since.
- Stages: inflation → protons and neutrons → hydrogen and helium nuclei (3 min) → atoms and free light (380 000 years) → first stars (about 200 million years) → galaxies → the sun and Earth (9.2 billion years).
- Heavier elements were made **in stars**.
