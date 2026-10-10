---
order: 2
unit: control
title: Who decides?
summary: "The central nervous system (brain and spinal cord) is the command centre: sensory neurons carry impulses in from receptors, motor neurons carry them out to effectors. Reflexes go through the spinal cord without waiting for the brain."
language: science
hook: "Step on a pin and your foot is off the floor before you've said 'ouch'. Your brain wasn't the one who decided."
---
Every response follows the same pathway. This lesson: building the pathway yourself, and which part of the nervous system decides.

## Engage: who moves your foot?

```step
stage: predict
insight: "Students who believe the brain makes every decision will choose it for the pin; the reflex arc goes through the spinal cord."
check:
  type: predict
  q: "You step on a drawing pin and lift your foot instantly. Which part decided to lift it?"
  options: ["The brain", "The spinal cord", "The foot itself", "The leg muscles"]
  actual: "The spinal cord. It's a reflex: the impulse goes from the receptor to the spinal cord and straight back out to the leg muscles. The brain finds out a moment later, which is when you feel the pain."
```

## Explore: build the pathway

```step
stage: run
insight: "Choosing each part, with feedback on the first wrong one, forces students to decide what detects, what decides and what acts."
try: { playground: board, starter: "boards.yml#build", height: 560 }
check: { type: board, text: "Build three pathways correctly, including the drawing pin.", when: "c >= 3" }
```

Pick a stimulus, then choose its receptor, command centre and effector, and send the signal.

## Explain: the nervous system

```step
stage: investigate
insight: "Mapping sensory neuron, CNS and motor neuron onto the pathway connects the boxes to the body."
tasks:
  - check:
      type: match
      q: "Match each part of the nervous system to its place in the pathway."
      pairs:
        - ["Sensory neuron", "Carries impulses from a receptor to the CNS"]
        - ["Brain and spinal cord (CNS)", "The command centre"]
        - ["Motor neuron", "Carries impulses from the CNS to an effector"]
        - ["Receptor", "Turns a stimulus into an impulse"]
  - check:
      type: question
      q: "Why is a reflex faster than catching a ball?"
      options: ["The impulse goes through the spinal cord only, with no time spent deciding in the brain", "Pain impulses travel faster than light impulses", "Leg muscles are faster than arm muscles", "Reflexes use hormones"]
      answer: 0
      feedback: [null, "Impulses travel at similar speeds; the route is shorter.", "The muscles aren't the difference.", "Reflexes use nerves only."]
  - check:
      type: question
      q: "In the chips pathway, the effector is a gland, not a muscle. What does an effector have to be?"
      options: ["A muscle or a gland: something that carries out the response", "Always a muscle", "A receptor", "A nerve"]
      answer: 0
      feedback: [null, "Glands are effectors too: they release saliva, sweat or hormones.", "Receptors detect; effectors act.", "Nerves carry the message; effectors act on it."]
  - check: { type: reflect, text: "I can describe a reflex arc and explain why it's faster than a response that needs the brain." }
```

### Neurons

### Reflexes

### Effectors

### In your own words

In your book: draw the reflex arc for the drawing pin, labelling the receptor, sensory neuron, spinal cord, motor neuron and effector.

## Elaborate: reflex or not?

```step
stage: modify
tier: typical
insight: "Sorting reflexes from decided responses uses the 'does it need the brain to decide?' test."
check:
  type: sort
  q: "Reflex (automatic, no decision) or a decided response?"
  options: ["Reflex", "Decided response"]
  items:
    - ["Blinking when something flies at your eye", "Reflex"]
    - ["Answering a question in class", "Decided response"]
    - ["Pupils narrowing in bright light", "Reflex"]
    - ["Choosing a snack", "Decided response"]
    - ["Knee jerking when tapped below the kneecap", "Reflex"]
    - ["Catching a ball", "Decided response", "Practice makes it fast, but the brain still judges where the ball will go."]
```

## Elaborate: damage to the pathway

```step
stage: modify
tier: wider
insight: "Predicting the effect of a break at one point shows the pathway is a chain."
check:
  type: question
  q: "A person's spinal cord is damaged in their lower back. A doctor taps below their knee. What would you expect?"
  options: ["The knee-jerk may still work if the reflex arc below the damage is intact, but the person may not feel the tap", "The knee can't jerk, but they feel the tap", "Nothing changes", "Both work normally"]
  answer: 0
  feedback: [null, "Feeling needs impulses to reach the brain, past the damage.", "Damage to the spinal cord changes something.", "The route to the brain is broken."]
  explain: "Doctors use reflex tests to find where along the spinal cord damage is."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about who moves my foot with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- The **central nervous system** (brain and spinal cord) is the command centre.
- **Sensory neurons** carry impulses from receptors to the CNS; **motor neurons** carry them to effectors (**muscles or glands**).
- A **reflex** is automatic and fast: the impulse goes through the spinal cord without waiting for the brain.
