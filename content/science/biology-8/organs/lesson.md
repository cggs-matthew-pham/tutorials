---
order: 7
node: AC9S8U02 n3
unit: systems
title: What is an organ made of?
summary: "An organ is made of several different tissues working together. A leaf has epidermis, palisade and spongy mesophyll and vascular tissue; the heart has cardiac muscle, a lining, connective tissue and nervous tissue."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8214
  url: http://127.0.0.1:8214/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "A leaf in cross-section: epidermis, two kinds of mesophyll, xylem and phloem, each a tissue." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "A leaf is an organ"
  say: "An organ is several tissues working together."
  clip:
    - caption: { text: "A leaf is an organ: several tissues working together.", say: "A leaf is an organ: several tissues working together." }
    - wait: 2620
    - click: { selector: "#board [fill=\"#7cb860\"]" }
    - expect: { selector: "body", contains: "Palisade mesophyll." }
    - caption: { text: "Palisade mesophyll does most of the photosynthesis.", say: "Palisade mesophyll does most of the photosynthesis." }
    - wait: 1960
    - click: { selector: "#board [fill=\"#c8d6e8\"]" }
    - expect: { selector: "body", contains: "Xylem" }
    - caption: { text: "Xylem brings water in; phloem carries sugar away.", say: "Xylem brings water in; phloem carries sugar away." }
    - caption: { text: "Cells make tissues; tissues make organs; organs make systems.", say: "Cells make tissues; tissues make organs; organs make systems." }
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
  - check:
      type: question
      q: "A wilt disease blocks the xylem in a leaf. What happens to the leaf?"
      options: ["Its cells run short of water, so photosynthesis slows and the leaf wilts", "Nothing much: the other tissues still do their own jobs", "The palisade cells take in water from the air instead"]
      answer: 0
      feedback: [null, "The tissues depend on each other: the mesophyll needs the water that only the xylem brings.", "Leaves lose water vapour to the air; almost all their water arrives through the xylem from the roots."]
      explain: "A change in one tissue changes the whole organ, because its tissues depend on each other."
  - check: { type: reflect, text: "I named two tissues in an organ and explained how each helps the organ do its job." }
```

### Leaf tissues

### Why several

### Levels

### A blocked tissue

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
      options: ["No smooth lining (blood would clot), no valves (blood would flow backwards), no nerves to adjust how fast it beats", "Nothing: muscle does it all", "It would beat too slowly"]
      answer: 0
      feedback: [null, "Muscle pumps, but other tissues line it, hold it together and control it.", "Each beat starts in special muscle cells, so it would keep beating; nerves only speed it up or slow it down. Think about clotting and backflow."]
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
