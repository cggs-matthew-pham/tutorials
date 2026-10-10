---
order: 5
unit: evolution
title: Why did the beetles change?
summary: "Natural selection: individuals vary; more are born than survive; those best suited to the environment are more likely to survive and reproduce, passing on their alleles. Over generations the population changes. Individuals don't change to suit the environment."
language: science
hook: "After a bushfire, the ground is black. A few years later, a beetle population on it is darker than before. No beetle changed colour."
---
Individuals vary. This lesson: what happens to that variation when some individuals are more likely to survive.

## Engage: who changes?

```step
stage: predict
insight: "Students who think individuals adapt because they need to will choose the 'beetles turn darker' answer; the board's beetles never change their own colour."
check:
  type: predict
  q: "Birds eat the beetles they can see most easily. Over many generations the population becomes better camouflaged. How?"
  options: ["Each beetle changes colour to hide, because it needs to", "Beetles that blend in survive more often and have more offspring, so the population's colours shift", "The birds teach the beetles", "Beetles choose a ground that matches"]
  actual: "Beetles that blend in survive and breed more, so their offspring (with similar colours) make up more of the next generation. Individuals never change; the population does."
```

## Explore: be the bird

```step
stage: run
insight: "Hunting as the bird, then watching the average colour shift over generations, makes selection something students caused."
try: { playground: science, starter: "boards.yml#hunt", height: 640 }
check: { type: board, text: "Hunt and breed for three generations.", expect: { done: true } }
```

You are a bird. Click beetles to eat them (as fast as you can, like a hungry bird). Then press **Survivors breed**. Compare the bar charts: the start and the latest generation.

## Explain: natural selection

```step
stage: investigate
insight: "Putting the steps of natural selection in order and rejecting the 'need' explanation is the hinge."
tasks:
  - check:
      type: sort
      q: "Put the steps of natural selection in order."
      options: ["1st", "2nd", "3rd", "4th", "5th"]
      items:
        - ["Beetles in the population vary in colour", "1st"]
        - ["Birds eat the beetles that stand out most", "2nd"]
        - ["Beetles that blend in are more likely to survive", "3rd"]
        - ["Survivors breed, passing on the alleles for their colour", "4th"]
        - ["Over generations, the population's average colour shifts", "5th"]
  - check:
      type: question
      q: "Did any single beetle on the board change its colour?"
      options: ["No: each beetle kept its colour; the population changed because of who survived and bred", "Yes, the survivors got paler", "Yes, the eaten ones got darker", "Only the babies changed"]
      answer: 0
      feedback: [null, "Survivors kept their colour.", "Eaten beetles were removed.", "Offspring were like their parents, plus a small random change."]
  - check:
      type: question
      q: "What would happen if every beetle started exactly the same colour?"
      options: ["Selection couldn't change the population: there would be no variation to select from", "They would still evolve the same way", "They would all be eaten", "They would turn the ground's colour"]
      answer: 0
      feedback: [null, "Selection needs variation to act on.", "If they're identical, any beetle is equally likely to be eaten.", "Individuals don't change colour."]
  - check: { type: reflect, text: "I can explain natural selection in steps without saying individuals change because they need to." }
```

### The steps

### Who changed

### No variation

### In your own words

In your book: explain natural selection for the beetles using the words variation, survive, reproduce, inherit and generations.

## Elaborate: after the bushfire

```step
stage: modify
tier: typical
insight: "Changing the environment and watching the direction of selection reverse shows 'fittest' depends on the environment."
try: { playground: science, starter: "boards.yml#fire", height: 680 }
tasks:
  - check: { type: board, text: "Let the birds hunt for a few generations, darken the ground, and keep going until six generations.", expect: { done: true } }
  - check:
      type: question
      q: "Before the fire, paler beetles survived best. After it, darker ones did. What does that tell you about 'survival of the fittest'?"
      options: ["Fittest means best suited to the current environment, which can change", "Fittest means strongest", "The darker beetles were always fitter", "Fitness doesn't depend on the environment"]
      answer: 0
      feedback: [null, "Strength wasn't involved: colour was.", "On pale ground they were eaten more.", "The board shows it depends on the ground."]
```

### Bushfire

### Fittest

## Elaborate: antibiotic resistance

```step
stage: modify
tier: wider
insight: "Applying natural selection to bacteria and antibiotics transfers the steps to a medical context."
check:
  type: question
  q: "Why does stopping a course of antibiotics early help resistant bacteria spread?"
  options: ["The most resistant bacteria are the last to die; stopping early leaves them to survive and multiply", "Antibiotics make bacteria resistant", "Bacteria learn to resist", "It doesn't make a difference"]
  answer: 0
  feedback: [null, "Antibiotics select for resistance that already exists; they don't create it.", "Bacteria don't learn; resistant ones survive.", "It matters: survivors are the most resistant."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about how the beetles changed with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Natural selection:** individuals **vary**; more are born than survive; those **best suited** to the environment are more likely to **survive and reproduce**; they pass on their **alleles**; over **generations**, the population changes.
- **Individuals don't change** to suit the environment; the population does.
- "Fittest" means best suited to the **current** environment. Selection needs **variation**.
