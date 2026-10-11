---
order: 3
node: AC9S9U04 n3
unit: models
title: Where does static charge come from?
summary: "Everything is made of atoms with positive protons that stay put and negative electrons that can move. Rubbing two materials moves electrons from one to the other, leaving one positive and one negative. Opposite charges attract, like charges repel, and a spark is the extra electrons rushing back to even things out."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8290
  url: http://127.0.0.1:8290/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "After rubbing, three electrons have moved from the wool to the balloon: the wool is +3 and the balloon −3, so they attract." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Charging by rubbing"
  say: "Rubbing moves electrons from one material to the other."
  clip:
    - caption: { text: "Both materials start neutral: each atom has a + and a − that cancel.", say: "Both start neutral: every atom has a plus and a minus that cancel." }
    - wait: 1800
    - click: "Rub"
    - click: "Rub"
    - click: "Rub"
    - caption: { text: "Electrons move from the wool to the balloon. The + charges can't move.", say: "Electrons move from the wool to the balloon. The positives stay put." }
    - wait: 3200
    - caption: { text: "Wool: +3. Balloon: −3. Unlike charges attract.", say: "Wool is plus three, balloon is minus three. They attract." }
    - wait: 2400
    - click: "Touch metal"
    - caption: { text: "Touch metal and the extra electrons rush back: a spark.", say: "Touch metal and the extra electrons rush back: a spark." }
    - wait: 2800
hook: "Pull a woolly jumper over your head in the dark and you can see tiny sparks. Where does a spark come from?"
---
You know the balloon-and-hair trick. This lesson says what actually moved.

## Engage: the balloon

```step
stage: predict
insight: "Students say the balloon 'picks up' positive charge, or that charge is made by rubbing. Only electrons are free to move, and they come from somewhere."
check:
  type: predict
  q: "You rub a balloon on wool, and now the balloon is charged. What moved from one to the other?"
  options: ["Electrons, from one material to the other", "Protons, from one material to the other", "Nothing moved: rubbing made new charge", "Whole atoms"]
  actual: "Electrons. They are the only charges free to move. Protons are locked inside the nuclei. The material that gains electrons becomes negative; the one that loses them becomes positive."
```

## Explore: rub and discharge

```step
stage: run
insight: "Watching one electron at a time leave the atoms of one material and arrive at the other makes 'charge by transfer' concrete, and shows the two net charges are equal and opposite."
try: { playground: board, starter: "boards.yml#rub", height: 680 }
tasks:
  - starter: "boards.yml#rub"
    check: { type: board, text: "Press Rub until the wool has charge +3. What does the balloon have?", when: "a = 3" }
  - starter: "boards.yml#rub"
    check: { type: board, text: "Rub a few times, then press Touch metal. Watch what happens to the charges.", when: "d >= 1 and a = 0" }
```

### Charge it up

Each press moves one electron. Look at the atoms in the wool: which ones now show only a +?

### Discharge

## Explain: charge and force

```step
stage: investigate
insight: "Explaining charging as electron transfer, then using it for attraction, repulsion and sparks, meets the node's first success criterion and its static-electricity application."
tasks:
  - check:
      type: question
      q: "The wool ends up positively charged. Why?"
      options: ["It lost electrons, so it has more + than − charge", "It gained protons", "It made positive charge when rubbed"]
      answer: 0
      feedback: [null, "Protons are fixed in the nuclei and cannot be rubbed off.", "Charge isn't made by rubbing: it is moved."]
      explain: "Losing negative electrons leaves a surplus of positive charge from the protons that stayed behind."
  - check:
      type: question
      q: "The balloon gained 3 electrons from the wool. What is the wool's charge?"
      options: ["+3: it lost the 3 electrons the balloon gained", "−3, the same as the balloon", "0, because charge cancels"]
      answer: 0
      feedback: [null, "It lost electrons, so it is positive.", "The two charges are equal and opposite, but each object is not neutral."]
      explain: "No charge is created or destroyed: the balloon's −3 is balanced by the wool's +3, so the total is still zero."
  - check:
      type: sort
      q: "Do the two charged objects attract or repel?"
      options: ["Attract", "Repel"]
      items:
        - ["A positive and a negative", "Attract"]
        - ["Two negatives", "Repel", "Like charges repel."]
        - ["Two positives", "Repel", "Like charges repel."]
  - check:
      type: question
      q: "What is a spark, in terms of electrons?"
      options: ["Extra electrons rushing across to neutralise a charge imbalance", "Protons jumping across a gap", "Heat from friction"]
      answer: 0
      feedback: [null, "Protons don't move in this way.", "Friction charged the objects; the spark is the discharge."]
      explain: "When the charge imbalance is big enough, electrons jump the gap all at once to even things out: a spark, or on a huge scale, lightning."
  - check: { type: reflect, text: "I can explain static electricity as electron transfer, and say which charges attract and which repel." }
```

### Why positive

### Equal and opposite

### Attract or repel

### A spark

### In your own words

In your book: draw a neutral balloon and a neutral wool cloth as atoms with + and −. Then draw them after rubbing, with arrows showing which way the electrons went and the net charge of each.

## Elaborate: push and pull

```step
stage: modify
tier: typical
insight: "Making the balls repel and attract with charges the student sets turns the rule into something they can predict and test."
try: { playground: board, starter: "boards.yml#pair", height: 680 }
tasks:
  - check: { type: board, text: "Set the charges so the balls push each other apart.", when: "f > 0" }
  - check: { type: board, text: "Now make them pull together.", when: "f < 0" }
  - check:
      type: question
      q: "Ball 1 is +3 and ball 2 is +1. What happens, and which ball feels the bigger force?"
      options: ["They repel, and the force on each is the same size", "They attract, and ball 1 feels more", "They repel, and ball 1 feels more"]
      answer: 0
      feedback: [null, "Two positives repel.", "The forces are equal and opposite on the two balls."]
      explain: "Like charges repel. The two forces are equal in size and opposite in direction, whatever the sizes of the charges."
```

### Push apart

### Pull together

### Which feels more

## Elaborate: lightning

```step
stage: modify
tier: wider
insight: "Lightning applies electron transfer and discharge at a scale the student cannot reproduce."
check:
  type: question
  q: "In a thunderstorm, ice and water particles rub past each other and charge builds up in the cloud. What is lightning?"
  options: ["A huge discharge: electrons rushing between the cloud and the ground (or another cloud) to neutralise the charge imbalance", "Positive charge falling from the cloud", "Heat energy escaping from the cloud"]
  answer: 0
  feedback: [null, "Protons aren't the charges that move; electrons are.", "The heat and light come from the discharge, not the other way round."]
  explain: "It is the same idea as the spark from the balloon, with far more charge and a much longer path."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about what moves when you rub the balloon with what the board showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Atoms have **positive protons** that stay put and **negative electrons** that can move.
- Rubbing moves **electrons** from one material to the other: one becomes positive, the other negative, by equal amounts.
- **Unlike charges attract; like charges repel.**
- A **spark** is the extra electrons rushing across to neutralise the imbalance.
