---
order: 1
node: AC9S9U01 n1
unit: control
title: What counts as a stimulus?
summary: "A stimulus is any change the body detects, outside it or inside it. Every response follows the same pathway: stimulus, receptor, command centre, effector, response."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8221
  url: http://127.0.0.1:8221/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Stimulus to response"
  say: "A stimulus is any change the body detects, inside or outside it."
  clip:
    - caption: { text: "A stimulus is any change the body detects.", say: "A stimulus is any change the body detects." }
    - wait: 2290
    - click: "Touching a hot pan"
    - expect: { selector: "body", contains: "Arm muscles" }
    - caption: { text: "A change outside: receptors detect it, and muscles respond.", say: "A change outside: receptors detect it, and muscles respond." }
    - wait: 2620
    - click: "Body getting too hot"
    - expect: { selector: "body", contains: "Sweat glands" }
    - caption: { text: "A change inside counts too: the brain detects it, and you sweat.", say: "A change inside counts too: the brain detects it, and you sweat." }
hook: "You pull your hand off a hot pan before you feel the pain. After lunch, your blood sugar is brought back down without you noticing at all. Both are responses to a stimulus."
---
Earlier you met body systems. This lesson: how the body detects change and responds.

## Engage: what is a stimulus?

```step
stage: predict
insight: "Students who think stimuli are only things outside the body (light, sound, touch) will pick the narrow answer; the board includes changes inside."
check:
  type: predict
  q: "Which of these is a stimulus?"
  options: ["Only things outside you: light, sound, touch, heat", "Any change your body detects, outside or inside", "Only things that hurt", "Only things you notice"]
  actual: "Any change your body detects, outside or inside: blood sugar rising and body water falling are stimuli too, though you don't notice them."
```

## Explore: follow the signal

```step
stage: run
insight: "Watching five different stimuli travel through the same five boxes makes the pathway a pattern, not a list to memorise."
try: { playground: board, starter: "boards.yml#pathways", height: 540 }
check: { type: board, text: "Follow at least four stimuli through the pathway, including two internal ones.", when: "n >= 4" }
```

Click a stimulus to send it through the pathway. Notice which ones are **internal** and which are **external**.

## Explain: the pathway

```step
stage: investigate
insight: "Naming the part each step plays, and sorting internal from external, are the two pieces of the hinge."
tasks:
  - check:
      type: sort
      q: "Internal or external stimulus?"
      options: ["Internal", "External"]
      items:
        - ["A loud bang", "External"]
        - ["Blood sugar rising", "Internal"]
        - ["The smell of toast", "External"]
        - ["Body temperature falling", "Internal"]
        - ["Too little water in the blood", "Internal"]
        - ["Cold wind on your skin", "External", "The wind is outside; your body temperature falling because of it is an internal change."]
  - check:
      type: match
      q: "Match each part of the pathway to what it does."
      pairs:
        - ["Stimulus", "A change inside or outside the body"]
        - ["Receptor", "Detects the change"]
        - ["Command centre", "Processes the information and decides"]
        - ["Effector", "A muscle or gland that carries out the response"]
        - ["Response", "What the body does"]
  - check:
      type: question
      q: "In the hot pan pathway, which is the effector?"
      options: ["The arm muscles", "The skin", "The spinal cord", "The heat"]
      answer: 0
      feedback: [null, "The skin holds the receptors: it detects.", "The spinal cord is the command centre in this reflex.", "The heat is the stimulus."]
  - check: { type: reflect, text: "I can trace a stimulus through receptor, command centre and effector to a response, for one external and one internal change." }
```

### Inside or outside

### The parts

### Hot pan

### In your own words

In your book: draw the pathway for one internal stimulus, labelling every box.

## Elaborate: a new pathway

```step
stage: modify
tier: typical
insight: "Applying the pathway to an unseen example shows the pattern has transferred."
check:
  type: sort
  q: "A runner's muscles use oxygen fast, so carbon dioxide in the blood rises. Breathing speeds up. Sort each into its part of the pathway."
  options: ["Stimulus", "Receptor", "Command centre", "Effector", "Response"]
  items:
    - ["Carbon dioxide in the blood rises", "Stimulus"]
    - ["Chemical receptors in blood vessels and the brain", "Receptor"]
    - ["Brain stem", "Command centre"]
    - ["Diaphragm and rib muscles", "Effector"]
    - ["Faster, deeper breathing", "Response"]
```

## Elaborate: plants respond too

```step
stage: modify
tier: wider
insight: "Plants detect and respond to stimuli without nerves, which separates the pathway idea from the nervous system."
check:
  type: question
  q: "A seedling on a windowsill bends towards the light. Which part of the pathway is missing compared with your body?"
  options: ["There are no nerves: the command is a plant hormone (auxin) carried in the plant, not an impulse", "There is no stimulus", "There is no response", "Nothing is different"]
  answer: 0
  feedback: [null, "Light from one side is the stimulus.", "Bending is the response.", "Plants have no nervous system."]
  explain: "Plants still detect a stimulus and respond, but they coordinate with hormones only."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about what a stimulus is with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **stimulus** is any change the body detects, **external** (light, heat, sound) or **internal** (blood sugar, temperature, water).
- **Stimulus → receptor → command centre → effector → response.**
- Receptors detect; the brain, spinal cord or a gland decides; muscles and glands are the effectors.
