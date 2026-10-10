---
order: 2
unit: cells
title: What does every cell have?
summary: "Plant and animal cells share three parts: the nucleus (the control centre, holding DNA), the cell membrane (controls what gets in and out) and the cytoplasm (where reactions happen)."
language: science
hook: "A cheek cell and a leaf cell look completely different. Look closer and they share three parts. Every job in a cell depends on them."
---
Every cell, from your skin to a gum leaf, is built on the same three parts.

## Engage: the cell's control centre

```step
stage: predict
insight: "Students often think the membrane or the whole cell 'controls' things; naming the nucleus as the DNA store prepares heredity later."
check:
  type: predict
  q: "Which part of a cell holds the instructions (DNA) that control what the cell does?"
  options: ["The cell membrane", "The nucleus", "The cytoplasm", "The cell wall"]
  actual: "The nucleus. It holds the DNA: the instructions for making the cell's proteins."
```

## Explore: find the shared parts

```step
stage: run
insight: "Finding the same three parts in both cells makes 'shared structures' a discovery rather than a list."
try: { playground: board, starter: "boards.yml#shared", height: 520 }
check: { type: board, text: "Find the nucleus, cell membrane and cytoplasm in both cells.", when: "n = k" }
```

Click each part to read what it does and where it's found.

## Explain: three shared parts

```step
stage: investigate
insight: "Matching each structure to its function, then a feature to the function, is the node's checkpoint."
tasks:
  - check:
      type: match
      q: "Match each part to its job."
      pairs:
        - ["Nucleus", "Holds the DNA: the instructions that control the cell"]
        - ["Cell membrane", "Controls what enters and leaves the cell"]
        - ["Cytoplasm", "Where most of the cell's chemical reactions happen"]
  - check:
      type: question
      q: "The cell membrane lets oxygen and food in but keeps most proteins in. What is it like?"
      options: ["A selective gate: some things pass, others don't", "A solid wall: nothing passes", "An open door: everything passes"]
      answer: 0
      feedback: [null, "Then the cell couldn't get food or oxygen.", "Then everything inside would leak out."]
      explain: "Scientists call the membrane selectively permeable."
  - check:
      type: question
      q: "Why must the cytoplasm be liquid (jelly-like)?"
      options: ["Substances can move and react in it", "It keeps the cell cold", "It stores the DNA"]
      answer: 0
      feedback: [null, "Temperature isn't its job.", "DNA is in the nucleus."]
  - check: { type: reflect, text: "I can name the nucleus, membrane and cytoplasm, say what each does, and say that plant and animal cells both have them." }
```

### Jobs

### The membrane

### The cytoplasm

### In your own words

In your book: draw a simple cell and label the three shared parts with what each does.

## Elaborate: what only plants have

```step
stage: modify
tier: typical
insight: "Finding the extra plant structures against the shared ones previews node 4 and checks the shared set is secure."
try: { playground: board, starter: "boards.yml#plantextra", height: 520 }
tasks:
  - check: { type: board, text: "Find the cell wall, chloroplasts, vacuole and mitochondria (wherever they are).", when: "n = k" }
  - check:
      type: sort
      q: "Where is each part found?"
      options: ["Both plant and animal cells", "Plant cells only"]
      items:
        - ["Nucleus", "Both plant and animal cells"]
        - ["Cell membrane", "Both plant and animal cells"]
        - ["Mitochondria", "Both plant and animal cells"]
        - ["Cell wall", "Plant cells only"]
        - ["Chloroplasts", "Plant cells only"]
        - ["Large vacuole", "Plant cells only"]
```

### Find them

### Sort them

## Elaborate: no nucleus

```step
stage: modify
tier: wider
insight: "Removing the nucleus tests the 'control centre' idea by its consequence."
check:
  type: question
  q: "Scientists removed the nucleus from a single-celled organism (an amoeba). It kept moving for a few days, then died and could not divide. What does this show?"
  options: ["The nucleus holds the instructions the cell needs to keep making what it needs and to reproduce", "The nucleus is needed to move", "The membrane is the control centre"]
  answer: 0
  feedback: [null, "It kept moving for a while without one.", "The membrane was still there, and the cell still died."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about the control centre with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Plant and animal cells share the **nucleus** (holds DNA, controls the cell), **cell membrane** (controls what gets in and out) and **cytoplasm** (where reactions happen).
- Both also have **mitochondria** (release energy).
- Plant cells also have a **cell wall**, **chloroplasts** and a large **vacuole**.
