---
order: 8
node: AC9S8U07 n3
unit: changes
title: How can you tell a reaction happened?
summary: "You can't see atoms rearrange, but you can see the signs: a colour change, a gas given off, a solid forming in a liquid, light, a smell, or a temperature change. Each is a clue that a new substance formed, not proof: boiling water bubbles too. The test is still a new substance."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8279
  url: http://127.0.0.1:8279/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Methane and oxygen reacting. The signs you could observe: a gas given off, heat and light." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Signs of a chemical change"
  say: "Signs of a reaction are clues that a new substance formed."
  clip:
    - caption: { text: "Methane burns. You can't see the atoms rearrange.", say: "Methane burns. You can't see the atoms rearrange." }
    - wait: 2600
    - caption: { text: "But you can see the signs: the temperature rises, and new gases form.", say: "But you can see the signs: the temperature rises, and new gases form." }
    - wait: 4200
    - caption: { text: "Signs are clues. The real test: is there a new substance?", say: "Signs are clues; the real test is whether there's a new substance." }
    - wait: 1200
hook: "Bake a cake and it rises, browns and smells wonderful. Leave a nail outside and it turns orange. In each case, how do you know something new was made?"
---
Last lesson: a chemical change makes a new substance. This lesson: how to spot one without seeing the atoms.

## Engage: fizz or no fizz

```step
stage: predict
insight: "Students often treat any bubbles or any temperature change as proof of a reaction; boiling water separates 'sign' from 'proof'."
check:
  type: predict
  q: "Which of these shows a chemical change has happened for certain?"
  options: ["None of them on its own: each is a clue, and the test is whether a new substance formed", "Bubbles appear", "It gets warmer", "It changes colour"]
  actual: "None of them on its own. Bubbles, warmth and colour change are all signs, but boiling water bubbles, a radiator warms things, and mixing paints changes colour, with no new substance. Signs are clues; the test is a new substance."
```

## Explore: signs on the board

```step
stage: run
insight: "Comparing a reaction (temperature rises, new particles) with dissolving (no new particles) shows which observations point to a new substance."
try: { playground: science, starter: "boards.yml#burn", height: 520 }
tasks:
  - starter: "boards.yml#burn"
    check: { type: board, text: "Burn the methane. Note the temperature at the start and the end.", expect: { done: true } }
  - starter: "boards.yml#dissolve"
    check: { type: board, text: "Now dissolve some salt. Any new kinds of particle?", expect: { done: true } }
```

### Burning

### Dissolving

## Explain: signs and the test

```step
stage: investigate
insight: "Listing the signs, then sorting cases where a sign misleads, keeps 'new substance' as the test and the signs as evidence for it."
tasks:
  - check:
      type: sort
      q: "Is it a sign of a chemical change?"
      options: ["A sign", "Not a sign"]
      items:
        - ["A colour change when two substances mix", "A sign"]
        - ["Bubbles of a new gas", "A sign"]
        - ["A solid forming when two clear liquids mix (a precipitate)", "A sign"]
        - ["Light or heat given out, or the mixture getting colder", "A sign"]
        - ["A new smell", "A sign"]
        - ["The substance changing shape", "Not a sign", "Cutting or bending changes the shape, not the substance."]
  - check:
      type: sort
      q: "Chemical change, or a sign that misleads?"
      options: ["Chemical change", "Misleading sign: physical change"]
      items:
        - ["A cake browning in the oven", "Chemical change"]
        - ["Vinegar and bicarb fizzing", "Chemical change"]
        - ["Water boiling and bubbling", "Misleading sign: physical change", "The bubbles are steam: still water."]
        - ["Blue and yellow paint mixing to green", "Misleading sign: physical change", "The paints are mixed, not changed."]
        - ["A nail rusting orange", "Chemical change"]
        - ["A hot drink cooling down", "Misleading sign: physical change"]
  - check:
      type: question
      q: "When magnesium burns there is a bright light, and a white powder is left. Which is the strongest evidence of a chemical change?"
      options: ["The white powder: a new substance with different properties from the shiny metal", "The bright light", "The magnesium getting hot"]
      answer: 0
      feedback: [null, "Light is a sign, but a light bulb glows without any new substance.", "Heating alone doesn't make a new substance."]
      explain: "A new substance with new properties is the test; the light and heat are signs that go with it."
  - check: { type: reflect, text: "I can list signs of a chemical change and explain why a sign is a clue, not proof." }
```

### Signs

### Clue or trap

### The strongest evidence

### In your own words

In your book: list five signs of a chemical change. Next to each, give one example where the sign appears without a chemical change, if you can.

## Elaborate: melting gives signs too

```step
stage: modify
tier: typical
insight: "Melting and boiling show a temperature change and bubbles with no new substance, the clearest misleading signs."
try: { playground: science, starter: "boards.yml#melt", height: 520 }
tasks:
  - check: { type: board, text: "Heat the water from ice to steam.", expect: { done: true } }
  - check:
      type: question
      q: "As the water boils, it bubbles. Why isn't this a chemical change?"
      options: ["The particles are still water: no new substance forms", "Because it can be reversed", "Because no light is given out"]
      answer: 0
      feedback: [null, "Reversibility is not the test (dissolving salt can be reversed, and it's physical; so can some reactions).", "Lots of reactions give out no light."]
      explain: "The same particles, more spread out. Bubbles are a clue that misleads here."
```

### Boiling

### Not a reaction

## Elaborate: a precipitate

```step
stage: modify
tier: wider
insight: "A precipitate is a sign students meet less often; reasoning about it with particles checks the idea transfers."
check:
  type: question
  q: "Two clear solutions are mixed and the liquid goes cloudy with a fine yellow solid that settles. What does this suggest, and how could you check?"
  options: ["A new insoluble substance (a precipitate) formed; filter it out and test its properties", "One of the solutions has frozen", "The solutions have evaporated"]
  answer: 0
  feedback: [null, "Nothing has cooled enough to freeze.", "Evaporation would leave less liquid, not a cloudy one."]
  explain: "A solid forming from two clear solutions is a strong sign of a new substance. Filtering it out and testing it is how a chemist would confirm it."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the signs with the boards and examples." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Signs of a chemical change: a colour change, a gas given off, a precipitate, light, a smell, a temperature change.
- Each sign is a **clue**, not proof: boiling water bubbles and paint mixing changes colour, with no new substance.
- The **test** is whether a new substance formed, with new properties.
