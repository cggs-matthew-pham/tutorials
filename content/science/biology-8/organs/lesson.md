---
order: 4
unit: systems
title: What is an organ made of?
summary: "An organ is made of several different tissues working together. A leaf has epidermis, palisade and spongy mesophyll and vascular tissue; the heart has cardiac muscle, a lining, connective tissue and nervous tissue."
language: science
hook: "A leaf looks like one green sheet. Slice it thinly and look through a microscope, and you find at least five different layers, each doing a different job."
---
Cells specialise; similar cells form tissues. This lesson: tissues build organs.

## Engage: one tissue or many?

```step
stage: predict
insight: "Students who see an organ as one tissue ('the heart is muscle') will choose that; the leaf section shows several tissues."
check:
  type: predict
  q: "A leaf is an organ. What do you predict it is made of?"
  options: ["One kind of green cell", "Several different tissues, each with its own job", "Only veins", "Chlorophyll and water"]
  actual: "Several different tissues: a protective epidermis, two kinds of mesophyll for photosynthesis and gas exchange, and xylem and phloem for transport."
```

## Explore: inside a leaf

```step
stage: run
insight: "Clicking each tissue in the section shows how many jobs one organ needs."
try: { playground: board, starter: "boards.yml#leaf", height: 520 }
check: { type: board, text: "Find every tissue in the leaf section.", when: "n = k" }
```

## Explain: tissues working together

```step
stage: investigate
insight: "Explaining why one tissue couldn't do an organ's whole job is the hinge to organ systems."
tasks:
  - check:
      type: match
      q: "Match each leaf tissue to its job."
      pairs:
        - ["Palisade mesophyll", "Most photosynthesis, near the light"]
        - ["Spongy mesophyll", "Air spaces let gases reach every cell"]
        - ["Xylem", "Brings water from the roots"]
        - ["Phloem", "Carries sugar to the rest of the plant"]
        - ["Epidermis", "Protects the leaf"]
  - check:
      type: question
      q: "Why does a leaf need more than one tissue?"
      options: ["Photosynthesis needs light, water, gas exchange, protection and transport: no single tissue can do all of them", "More tissues make it greener", "It doesn't; the extra tissues are spare"]
      answer: 0
      feedback: [null, "Colour isn't the reason.", "Each tissue has a job the others can't do."]
  - check:
      type: parsons
      code: "levels.txt#order"
      text: "Put the levels of organisation in order, smallest first."
  - check: { type: reflect, text: "I named two tissues in an organ and explained how each helps the organ do its job." }
```

### Leaf tissues

### Why several

### Levels

### In your own words

In your book: choose the leaf or the heart, name two of its tissues and explain how each helps the organ work.

## Elaborate: the heart wall

```step
stage: modify
tier: typical
insight: "A second organ, an animal one, shows the same multi-tissue pattern."
try: { playground: board, starter: "boards.yml#heart", height: 480 }
tasks:
  - check: { type: board, text: "Find every tissue in the heart wall.", when: "n = k" }
  - check:
      type: question
      q: "If the heart were made only of cardiac muscle, what would go wrong?"
      options: ["No smooth lining (blood would clot), no valves (blood would flow backwards), no pacemaker signal", "Nothing: muscle does it all", "It would beat too slowly"]
      answer: 0
      feedback: [null, "Muscle pumps, but other tissues line, hold and time it.", "Timing comes from nervous tissue, which would be missing."]
```

### Find the tissues

### Only muscle?

## Elaborate: when a tissue fails

```step
stage: modify
tier: wider
insight: "Tracing a tissue disorder to organ failure shows why organ function depends on every tissue."
check:
  type: question
  q: "In atherosclerosis, fatty deposits and thickened tissue build up in artery walls. How does this affect the circulatory system?"
  options: ["Arteries narrow, so less blood reaches organs like the heart muscle, which can cause a heart attack", "Arteries get wider and blood flows faster", "It only affects the blood, not the organs"]
  answer: 0
  feedback: [null, "The deposits narrow them.", "Organs fed by narrowed arteries get less oxygen."]
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about what a leaf is made of with the section." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Cells → tissues → organs → organ systems → organism.**
- A **tissue** is a group of similar cells doing one job; an **organ** is several tissues working together.
- A leaf: epidermis, palisade and spongy mesophyll, xylem and phloem. The heart: cardiac muscle, lining, connective tissue, nervous tissue.
- No single tissue can do everything an organ needs.
