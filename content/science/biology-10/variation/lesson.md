---
order: 4
unit: evolution
title: How different are individuals?
summary: "Individuals in a population vary. Measuring one characteristic across a population gives a spread of values, often most near the middle. Some variation is inherited (genes) and some comes from the environment; inherited variation is what natural selection acts on."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8241
  url: http://127.0.0.1:8241/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "No two beetles quite the same colour: continuous variation in one population." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "Variation"
  say: "Individuals in a population differ; inherited variation is passed on."
  clip:
    - caption: { text: "No two beetles are quite the same colour: that's variation.", say: "No two beetles are quite the same colour: that's variation." }
    - wait: 1200
    - caption: { text: "Colour can take any value from pale to dark: continuous variation.", say: "Colour can take any value from pale to dark: continuous variation." }
    - wait: 3280
    - click: "Let the birds hunt"
    - wait: 2500
    - click: "Survivors breed"
    - wait: 1500
    - caption: { text: "Colour is inherited, so the survivors' colours are passed on.", say: "Colour is inherited, so the survivors' colours are passed on." }
    - wait: 800
hook: "Look closely at a patch of grass beetles, a school of fish or a class of Year 10s. No two are quite the same. That spread is the raw material of evolution."
---
Meiosis and fertilisation make every offspring different. This lesson: what that variation looks like across a whole population.

## Engage: all the same?

```step
stage: predict
insight: "Students who think a species is uniform ('beetles are brown') don't expect a spread; measuring produces one."
check:
  type: predict
  q: "You measure the colour of 20 beetles of one species from the same field. What do you predict?"
  options: ["They're all the same colour: same species", "A spread of colours, with most near the middle and a few very pale or very dark", "Two colours only", "Completely random: no pattern"]
  actual: "A spread, with most near the middle and fewer at the extremes. A characteristic controlled by many genes usually varies continuously like this."
```

## Explore: measure a population

```step
stage: run
insight: "Measuring twenty individuals and watching the bar chart grow turns 'individuals vary' into a distribution."
try: { playground: science, starter: "boards.yml#measure", height: 600 }
check: { type: board, text: "Measure the colour of 20 beetles.", expect: { done: true } }
```

Click beetles to measure their colour (0 is palest, 1 darkest). Watch the bar chart under the board as it fills.

## Explain: kinds of variation

```step
stage: investigate
insight: "Separating continuous from discontinuous and inherited from environmental gives students the language for selection."
tasks:
  - check:
      type: sort
      q: "Continuous (any value in a range) or discontinuous (a few distinct groups)?"
      options: ["Continuous", "Discontinuous"]
      items:
        - ["Height", "Continuous"]
        - ["Blood group (A, B, AB, O)", "Discontinuous"]
        - ["The beetles' colour", "Continuous"]
        - ["Pea flower colour (purple or white)", "Discontinuous"]
        - ["Hand span", "Continuous"]
  - check:
      type: sort
      q: "Mainly inherited, mainly environmental, or both?"
      options: ["Inherited", "Environmental", "Both"]
      items:
        - ["Blood group", "Inherited"]
        - ["A scar", "Environmental"]
        - ["Height", "Both", "Genes set a range; food and health affect where you end up."]
        - ["Natural eye colour", "Inherited"]
        - ["Speaking French", "Environmental"]
  - check:
      type: question
      q: "Why does only inherited variation matter for evolution?"
      options: ["Only inherited characteristics are passed to offspring through genes", "Environmental variation isn't real", "Inherited variation is bigger", "Environmental variation only happens in humans"]
      answer: 0
      feedback: [null, "It's real, but not passed on.", "Size isn't the reason.", "Every organism is affected by its environment."]
  - check: { type: reflect, text: "I can describe variation in a population and explain which kind is passed on." }
```

### Continuous or not

### Where it comes from

### What gets passed on

### In your own words

In your book: sketch your bar chart and describe its shape in one sentence.

## Elaborate: where variation comes from

```step
stage: modify
tier: typical
insight: "Naming the sources of new inherited variation links the genetics unit to this one."
check:
  type: question
  q: "Which of these makes new inherited variation in a population?"
  options: ["Mutations, plus new combinations of alleles from meiosis and fertilisation", "Animals trying hard to change", "The environment changing an animal's genes to suit it", "Eating different food"]
  answer: 0
  feedback: [null, "Effort doesn't change genes in gametes.", "The environment doesn't direct mutations.", "Food changes the body, not the genes passed on."]
```

## Elaborate: sampling

```step
stage: modify
tier: wider
insight: "Questioning a sample's size and fairness uses the board's measurements as data."
check:
  type: question
  q: "Someone measures only the 5 easiest-to-spot beetles and says the population is mostly dark. What's wrong?"
  options: ["The sample is small and biased: the easiest beetles to spot aren't typical", "Nothing: 5 is enough", "Beetles can't be measured", "They should have measured only pale beetles"]
  answer: 0
  feedback: [null, "A small, biased sample can mislead.", "They can; the problem is which ones and how many.", "That's biased the other way."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first prediction about the beetles' colours with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Individuals in a population **vary**; measuring a characteristic gives a **spread**.
- **Continuous** variation takes any value (height); **discontinuous** falls into groups (blood group).
- Variation can be **inherited**, **environmental** or both; only inherited variation is passed on, so only it matters for evolution.
- New inherited variation comes from **mutations** and from **meiosis and fertilisation**.
