---
order: 3
unit: control
title: Nerve or hormone?
summary: "The nervous system sends fast, short-lived electrical impulses along nerves to one place. The endocrine system releases hormones into the blood: slower, longer-lasting, and they reach every cell but act only on target cells."
language: science
hook: "A fright makes you jump in a fraction of a second. Your heart is still pounding a few minutes later. Two different systems are at work."
---
The nervous system is one way the body sends messages. This lesson: the other way, and how they compare.

## Engage: how do hormones travel?

```step
stage: predict
insight: "Students who think hormones travel along nerves won't expect the slow rise and long tail; the race shows the difference."
check:
  type: predict
  q: "Adrenaline is a hormone released when you get a fright. How does it reach your heart?"
  options: ["Along a nerve, like an impulse", "In the blood, carried all round the body", "It is made in the heart", "Through the air you breathe"]
  actual: "In the blood. The adrenal glands release it into the bloodstream, which carries it everywhere; cells with the right receptors (heart, liver, muscles) respond."
```

## Explore: race them

```step
stage: run
insight: "Seeing the same fright as two curves, one a sharp spike and one a slow rise and long tail, makes speed and duration visible."
try: { playground: board, starter: "boards.yml#race", height: 520 }
check: { type: board, text: "Run the race and compare the nerve with the hormone.", when: "r >= 1" }
```

Press **Race** and watch both responses to the same fright. Which starts sooner? Which lasts longer?

## Explain: comparing the two

```step
stage: investigate
insight: "Sorting features into the two systems and linking each to its job is the hinge comparison."
tasks:
  - check:
      type: sort
      q: "Nervous system or endocrine system?"
      options: ["Nervous system", "Endocrine system"]
      items:
        - ["Electrical impulses", "Nervous system"]
        - ["Chemical messages in the blood", "Endocrine system"]
        - ["Very fast", "Nervous system"]
        - ["Effects last minutes to years", "Endocrine system"]
        - ["Goes to one exact place", "Nervous system"]
        - ["Reaches the whole body; target cells respond", "Endocrine system"]
  - check:
      type: question
      q: "Every cell in the body gets the same adrenaline in the blood. Why do only some cells respond?"
      options: ["Only target cells have receptors that fit adrenaline", "Adrenaline only flows to the heart", "Other cells destroy it", "The brain tells the other cells to ignore it"]
      answer: 0
      feedback: [null, "Blood carries it everywhere.", "Cells without the receptor just don't respond.", "No nerve is involved in which cells respond."]
  - check:
      type: question
      q: "Growth over years is controlled by growth hormone, not nerves. Why is a hormone better for this job?"
      options: ["The effect needs to last a long time and reach cells all over the body", "Hormones are faster", "Nerves can't reach bones", "Growth is a reflex"]
      answer: 0
      feedback: [null, "Hormones are slower.", "Nerves reach bones; the point is duration and reach.", "A reflex is a quick nervous response."]
  - check: { type: reflect, text: "I can compare nerves and hormones by speed, how long the effect lasts, how the message travels and where it acts." }
```

### Which system

### Target cells

### The right tool

### In your own words

In your book: make a comparison table (nerves, hormones) with rows for message, route, speed, duration and where it acts.

## Elaborate: both at once

```step
stage: modify
tier: typical
insight: "A real response often uses both systems, each for what it does best."
check:
  type: sort
  q: "A car swerves towards you on your bike. Which part of your response is nervous and which is hormonal?"
  options: ["Nervous", "Hormonal"]
  items:
    - ["You brake and steer away", "Nervous"]
    - ["Your heart is still racing five minutes later", "Hormonal"]
    - ["Your hands are shaky as you ride home", "Hormonal"]
    - ["You flinch", "Nervous"]
```

## Elaborate: insulin

```step
stage: modify
tier: wider
insight: "A hormone with a clear target links this lesson to blood sugar control in the next."
check:
  type: question
  q: "After a meal, the pancreas releases insulin. Liver and muscle cells take up glucose from the blood. Which describes it?"
  options: ["The pancreas is the gland, insulin is the hormone, liver and muscle cells are targets", "The liver is the gland, insulin is the target", "Insulin is a nerve impulse from the pancreas", "Glucose is the hormone"]
  answer: 0
  feedback: [null, "The liver responds; it doesn't release insulin.", "Insulin travels in the blood.", "Glucose is the sugar being controlled."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about how hormones travel with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Nervous system:** electrical impulses along neurons; very fast; short-lived; to one exact place.
- **Endocrine system:** **hormones** released by **glands** into the **blood**; slower; longer-lasting; reach every cell but act only on **target cells** with matching receptors.
- Many responses use both.
