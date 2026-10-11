---
order: 3
node: AC9S9U01 n3
unit: control
title: Nerves or hormones?
summary: "The body runs the same stimulus–receptor–command centre–effector pathway in two ways. The nervous system sends electrical signals along nerves: fast, short and to one place. The endocrine system sends hormones from glands in the blood: slower, longer-lasting and to target organs anywhere."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8274
  url: http://127.0.0.1:8274/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Two ways to send a message"
  say: "Nerves carry fast electrical signals; hormones travel slowly in the blood."
  clip:
    - caption: { text: "The same five steps, two ways of sending the message.", say: "The same five steps, with two ways of sending the message." }
    - wait: 2000
    - click: "Touching a hot pan"
    - expect: { selector: "body", contains: "Spinal cord" }
    - caption: { text: "Nervous: electrical signals along nerves, to the arm muscles, in a split second.", say: "Nervous system: electrical signals along nerves, in a split second." }
    - wait: 3600
    - click: "Blood glucose rises after a meal"
    - expect: { selector: "body", contains: "Pancreas" }
    - caption: { text: "Endocrine: the pancreas, a gland, releases insulin into the blood. It reaches the liver in minutes.", say: "Endocrine system: a gland releases a hormone, carried in the blood." }
    - wait: 3800
hook: "Pull your hand off a hot pan and you've done it in a fraction of a second. After lunch, your body brings your blood sugar back down too, but that takes an hour. Same job, different messengers."
---
Last lesson: every response runs stimulus → receptor → command centre → effector → response. This lesson: the two ways the message is sent.

## Engage: how does insulin get there?

```step
stage: predict
insight: "Students who think all control runs through nerves, or that hormones travel along nerves, pick those options; the blood as the carrier is the idea to build."
check:
  type: predict
  q: "After a meal, your pancreas releases insulin, which tells your liver to store glucose. How does the insulin get from the pancreas to the liver?"
  options: ["In the blood", "Along a nerve", "It is made in the liver", "Through the stomach"]
  actual: "In the blood. Insulin is a hormone: a chemical message released by a gland into the blood, which carries it everywhere; only target organs, such as the liver, respond."
```

## Explore: two pathways

```step
stage: run
insight: "Sending a nervous and a hormonal response through the same five boxes, then building four pathways, shows one model with two messengers."
try: { playground: board, starter: "boards.yml#pathway", height: 640 }
tasks:
  - starter: "boards.yml#pathway"
    check: { type: board, text: "Send both stimuli through the pathway. What is different about the command centre?", when: "n >= 2" }
  - starter: "boards.yml#build"
    check: { type: board, text: "Build all four pathways: two nervous, two hormonal.", when: "c >= 4" }
```

### Two stimuli

Click a stimulus to send it through the five boxes.

### Build them

Choose the receptor, command centre and effector for each. Glands are command centres too: they release hormones.

## Explain: comparing the two systems

```step
stage: investigate
insight: "Sorting by signal, speed, duration and reach, then naming glands and target organs, gives students the comparison framework the next lesson uses."
tasks:
  - check:
      type: sort
      q: "Nervous system or endocrine (hormone) system?"
      options: ["Nervous", "Endocrine"]
      items:
        - ["Electrical signals along nerves", "Nervous"]
        - ["Chemical messages carried in the blood", "Endocrine"]
        - ["Very fast: a fraction of a second", "Nervous"]
        - ["Slower: seconds to hours", "Endocrine"]
        - ["Short-lived: stops when the signal stops", "Nervous"]
        - ["Lasts longer: until the hormone is broken down", "Endocrine"]
        - ["Goes to one precise place", "Nervous"]
        - ["Reaches the whole body; only target organs respond", "Endocrine", "Every cell gets the insulin; only cells with the right receptors respond."]
  - check:
      type: question
      q: "In a hormonal pathway, what is the command centre?"
      options: ["A gland, such as the pancreas, which releases the hormone", "The blood", "The target organ"]
      answer: 0
      feedback: [null, "The blood carries the message; it doesn't decide anything.", "The target organ is the effector."]
      explain: "Glands (pancreas, adrenal glands, pituitary) act as command centres: they detect or are told of a change and release a hormone."
  - check:
      type: question
      q: "Why do electrical signals reach their effector faster than hormones?"
      options: ["They travel along nerves directly to one place; hormones drift around the body in the blood", "Electricity is stronger than chemicals", "Hormones have further to go because glands are far away"]
      answer: 0
      feedback: [null, "Strength isn't the point; the route is.", "Distance matters less than how the message travels."]
      explain: "Nerve signals travel at up to about 100 m/s along a wired route. Hormones go wherever the blood goes, which takes about a minute for one lap of the body, and then must build up."
  - check:
      type: question
      q: "A fright makes you jump (nerves) and your heart keep pounding for minutes (adrenaline). Why use both?"
      options: ["Nerves give the instant reaction; the hormone keeps the whole body ready for longer", "The nerves stop working after a fright", "Adrenaline is a nerve signal"]
      answer: 0
      feedback: [null, "Both systems work together.", "Adrenaline is a hormone, released by the adrenal glands into the blood."]
      explain: "Fast and short, plus slow and lasting: many responses use both systems."
  - check: { type: reflect, text: "I can describe how the nervous and endocrine systems each carry a message, and compare their speed and how long they last." }
```

### Nervous or endocrine

### Glands

### Why faster

### Both at once

### In your own words

In your book: draw the five-box pathway twice, once for touching a hot pan and once for blood glucose after a meal. Label the messenger between the command centre and the effector in each.

## Elaborate: race them

```step
stage: modify
tier: typical
insight: "Seeing the two responses to one fright on a time graph turns 'faster' and 'lasts longer' into shapes to read."
try: { playground: board, starter: "boards.yml#race", height: 640 }
tasks:
  - check: { type: board, text: "Run the race.", when: "r >= 1" }
  - check:
      type: question
      q: "On the graph, which response starts first, and which lasts longer?"
      options: ["The nerve response starts first; the hormone response lasts longer", "The hormone response starts first and lasts longer", "They start and stop together"]
      answer: 0
      feedback: [null, "Hormones take time to travel and build up in the blood.", "They have very different timescales."]
      explain: "Nerves: fast and brief. Hormones: slow to start, slow to fade."
```

### The race

### Reading the graph

## Elaborate: when water is short

```step
stage: modify
tier: wider
insight: "A second hormone pathway (ADH and the kidneys) checks that students can apply the model to an unfamiliar case."
try: { playground: board, starter: "boards.yml#build", height: 640 }
tasks:
  - check: { type: board, text: "Build all four pathways again, quickly this time.", when: "c >= 4" }
  - check:
      type: question
      q: "On a hot day with little to drink, the pituitary gland releases ADH, and the kidneys keep more water. Which is the effector?"
      options: ["The kidneys", "The pituitary gland", "ADH"]
      answer: 0
      feedback: [null, "The pituitary is the command centre: it releases the hormone.", "ADH is the messenger, not the effector."]
      explain: "Gland (command centre) → hormone in the blood (messenger) → kidneys (effector) → less water lost (response)."
```

### Build again

### ADH

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about how insulin travels with the pathways I built." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Both systems follow stimulus → receptor → command centre → effector → response.
- **Nervous system**: electrical signals along nerves, from the brain or spinal cord. Very fast, short-lived, to one place.
- **Endocrine system**: hormones released by **glands** (pancreas, adrenal glands, pituitary) into the blood. Slower, longer-lasting, reaching target organs anywhere.
- Many responses use both (a fright: a jump from nerves, a pounding heart from adrenaline).
