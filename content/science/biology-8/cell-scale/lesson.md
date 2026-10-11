---
order: 1
node: AC9S8U01 n1
unit: cells
title: How small is a cell?
summary: "Most cells are about a hundredth to a tenth of a millimetre across, too small to see without a microscope: your body has about 37 trillion of them. Cells were only discovered once microscopes could magnify enough."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8268
  url: http://127.0.0.1:8268/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "An animal cell and a plant cell, drawn about 1000 times bigger than life. Real ones are about 0.02 to 0.1 mm across." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Cellular scale"
  say: "Cells are far too small to see without a microscope."
  clip:
    - caption: { text: "A person: about 37 trillion cells.", say: "A person is made of about thirty seven trillion cells." }
    - wait: 3000
    - click: "Zoom in"
    - caption: { text: "One cell: about 0.02 mm across. Fifty side by side span a millimetre.", say: "One cell is about a fiftieth of a millimetre across." }
    - wait: 3800
    - caption: { text: "Your eye can't see anything smaller than about 0.1 mm: you need a microscope.", say: "Your eye can't see anything smaller than a tenth of a millimetre." }
    - wait: 3600
hook: "For thousands of years nobody knew that every living thing is made of cells. Then, in the 1660s, someone looked at a thin slice of cork through an early microscope."
---
You have studied whole living things. This lesson zooms in.

## Engage: how many cells?

```step
stage: predict
insight: "Students' sense of scale is the barrier: guesses in the thousands or millions show cells imagined at about the size of a grain of sand."
check:
  type: predict
  q: "About how many cells are in your body?"
  options: ["About 37 trillion (37 000 000 000 000)", "About 37 thousand", "About 37 million", "Just a few, very large ones"]
  actual: "About 37 trillion. A typical human cell is about 0.02 mm across, so even a speck of skin you can just see holds dozens of cells."
```

## Explore: zoom in

```step
stage: run
insight: "Stepping from a person to one cell, then looking inside cells drawn a thousand times life size, connects the familiar scale to the microscopic one."
try: { playground: board, starter: "boards.yml#zoom", height: 640 }
tasks:
  - starter: "boards.yml#zoom"
    check: { type: board, text: "Zoom in from the person to one cell.", when: "l >= 1" }
  - starter: "boards.yml#cells"
    check: { type: board, text: "These cells are drawn about 1000 times life size. Find the nucleus in each.", when: "n = k" }
```

### A person to a cell

Press **Zoom in** once. (You can keep zooming: the later levels are for Year 10.)

### Cells, enlarged

Click a part of a cell to see its name.

## Explain: too small to see

```step
stage: investigate
insight: "Comparing cell sizes with the smallest thing the eye can see, then using magnification, makes 'microscopic' a measured idea and explains why cells were found so late."
tasks:
  - check:
      type: question
      q: "Why can't you see your own skin cells?"
      options: ["Each is about 0.02 mm across, smaller than the 0.1 mm or so the eye can see", "They are see-through", "They are hidden under a layer of dead skin"]
      answer: 0
      feedback: [null, "Many cells are pale, but the real reason is size.", "The outer skin is itself made of cells, and you can't see those either."]
      explain: "Your eye can just make out things about 0.1 mm across (the width of a hair). Most cells are about 2 to 10 times smaller, and bacteria about 50 times smaller."
  - check:
      type: number
      q: "A cell is 0.02 mm wide. How many cells, side by side, would stretch across 1 mm?"
      answer: 50
      explain: "1 ÷ 0.02 = 50 cells in one millimetre."
  - check:
      type: number
      q: "A microscope magnifies 400 times. A cell 0.02 mm wide looks how many millimetres wide?"
      answer: 8
      explain: "0.02 × 400 = 8 mm: big enough to see clearly."
  - check:
      type: sort
      q: "Can you see it without a microscope?"
      options: ["Yes", "No: you need a microscope"]
      items:
        - ["An ant (about 3 mm)", "Yes"]
        - ["A grain of sand (about 0.5 mm)", "Yes"]
        - ["A human hair's width (about 0.1 mm)", "Yes", "Just: about the smallest thing the eye can see."]
        - ["A human cheek cell (about 0.05 mm)", "No: you need a microscope"]
        - ["A red blood cell (about 0.008 mm)", "No: you need a microscope"]
        - ["A bacterium (about 0.002 mm)", "No: you need a microscope"]
  - check:
      type: question
      q: "Why were cells only discovered in the 1600s?"
      options: ["Microscopes good enough to magnify them were only made then", "Living things didn't have cells before then", "People weren't interested before then"]
      answer: 0
      feedback: [null, "Living things have always been made of cells.", "People had studied living things for thousands of years; the tool was missing."]
      explain: "Robert Hooke saw tiny boxes in cork in 1665 and called them cells; Antonie van Leeuwenhoek saw living single cells soon after. New technology made new evidence possible."
  - check: { type: reflect, text: "I can explain why cells need a microscope to be seen, and compare a cell's size with something familiar." }
```

### Too small to see

### Fifty in a millimetre

### Magnification

### With or without

### Why the 1600s

### In your own words

In your book: draw a 1 mm line and mark how many cells would fit across it. Add a hair's width and a bacterium for comparison, and write one sentence on why a microscope is needed.

## Elaborate: a whole living thing in one cell

```step
stage: modify
tier: typical
insight: "Single-celled organisms are complete living things at microscopic scale; finding their parts prepares the cell theory lesson."
try: { playground: board, starter: "boards.yml#single", height: 640 }
tasks:
  - check: { type: board, text: "Find the membrane of the bacterium and the yeast cell.", when: "n = k" }
  - check:
      type: question
      q: "A bacterium is about 0.002 mm long and is a whole living thing. How does it compare with one of your cells?"
      options: ["About ten times smaller, yet it feeds, grows and reproduces on its own", "Bigger, because it is a whole organism", "The same size, because all cells are the same size"]
      answer: 0
      feedback: [null, "Being a whole organism doesn't make it big.", "Cells vary a lot in size."]
      explain: "Bacteria are among the smallest living things. Next lesson: every living thing, from bacteria to you, is made of cells."
```

### Single cells

### Smaller still

## Elaborate: Hooke and Leeuwenhoek

```step
stage: modify
tier: wider
insight: "The history of cell discovery shows evidence waiting on technology, and how a word (cell) can come from what the first observer saw."
try: { playground: board, starter: "boards.yml#cells", height: 640 }
tasks:
  - check: { type: board, text: "Find the nucleus in each cell again. Hooke's cork cells were dead: just the walls were left.", when: "n = k" }
  - check:
      type: question
      q: "Hooke called the boxes in cork 'cells' after small rooms. Leeuwenhoek's better lenses showed living things moving in pond water. What did the two discoveries together suggest?"
      options: ["Living things are made of tiny units, and some living things are just one of them", "Only plants are made of cells", "Cells are only found in dead things"]
      answer: 0
      feedback: [null, "Leeuwenhoek also saw animal cells, such as blood cells.", "Leeuwenhoek's 'animalcules' were alive and moving."]
      explain: "Later scientists (Schleiden, Schwann and others, in the 1800s) brought this evidence together as cell theory."
```

### Cork cells

### Two discoveries

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my guess about how many cells are in my body with what I found." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Most cells are about 0.01 to 0.1 mm across; bacteria are smaller still. The eye can't see anything smaller than about 0.1 mm.
- Your body has about 37 trillion cells.
- A microscope **magnifies**: a cell 0.02 mm wide magnified 400 times looks 8 mm wide.
- Cells were discovered only when microscopes were invented (Hooke, 1665; Leeuwenhoek soon after).
