---
order: 1
unit: cells
title: Is everything alive made of cells?
summary: "Cell theory: all living things, including plants, fungi and bacteria, are made of cells. Some organisms are a single cell; others are made of many."
language: science
hook: "A gum tree, a mushroom, the bacteria in yoghurt and you. One thing they share that a rock, a cloud and a robot don't."
---
In Year 3 you sorted living from non-living. This lesson gives the deeper reason.

## Engage: does a tree have cells?

```step
stage: predict
insight: "Students who think only animals have cells will say no; the board shows plants, fungi and bacteria as cells too."
check:
  type: predict
  q: "Which of these are made of cells?"
  options: ["Only animals", "Animals and plants", "Animals, plants, fungi and bacteria: every living thing", "Only things you can see moving"]
  actual: "Every living thing: animals, plants, fungi and bacteria. A bacterium is a single cell; you are trillions of cells."
```

## Explore: one cell or many?

```step
stage: run
insight: "Finding the same basic parts in a bacterium, a yeast cell, a plant cell and an animal cell makes 'all living things are cells' concrete."
try: { playground: board, starter: "boards.yml#single", height: 520 }
tasks:
  - starter: "boards.yml#single"
    check: { type: board, text: "Find the cell membrane and cytoplasm in the bacterium and the yeast.", when: "n = k" }
  - starter: "boards.yml#multi"
    check: { type: board, text: "Find the cell membrane and cytoplasm in the animal cell and the plant cell.", when: "n = k" }
```

### Single-celled organisms

Each of these is a whole living thing: one cell.

### Cells from bigger organisms

These are two cells out of the many that make up an animal and a plant.

## Explain: cell theory

```step
stage: investigate
insight: "Stating cell theory and sorting organisms explicitly includes the plants and microbes students don't expect."
tasks:
  - check:
      type: question
      q: "Which statement is cell theory?"
      options: ["All living things are made of one or more cells, and the cell is the smallest unit of life", "Only animals are made of cells", "Cells are found in living and non-living things", "Big organisms have big cells"]
      answer: 0
      feedback: [null, "Plants, fungi and bacteria are cells too: you found membranes in all of them.", "Rocks and air are not made of cells.", "An elephant's cells are about the same size as a mouse's; it just has more of them."]
  - check:
      type: sort
      q: "Single-celled or multicellular?"
      options: ["Single-celled", "Multicellular"]
      items:
        - ["Bacteria in yoghurt", "Single-celled"]
        - ["Yeast", "Single-celled"]
        - ["A gum tree", "Multicellular"]
        - ["A mushroom", "Multicellular", "A mushroom is made of many fungal cells."]
        - ["An amoeba", "Single-celled"]
        - ["You", "Multicellular"]
  - check:
      type: question
      q: "A single-celled yeast cell and one of your skin cells are both cells. What's the big difference?"
      options: ["The yeast cell does everything to stay alive on its own; your skin cell is one of trillions, each doing a job", "The yeast cell isn't really alive", "Your skin cell has no membrane"]
      answer: 0
      feedback: [null, "Yeast feeds, grows and reproduces: it's alive.", "Every cell has a membrane."]
  - check: { type: reflect, text: "I can state cell theory and give an example of a single-celled and a multicellular organism, including a plant or a microbe." }
```

### Cell theory

### One or many

### Doing everything

### In your own words

In your book: state cell theory, then explain why a mushroom and a bacterium are both living things.

## Elaborate: is it alive?

```step
stage: modify
tier: typical
insight: "Using cells as the test for living sharpens the Year 3 distinction."
check:
  type: sort
  q: "Made of cells (living, or once living) or not?"
  options: ["Made of cells", "Not made of cells"]
  items:
    - ["A slice of bread", "Made of cells", "Once living: wheat cells (and dead yeast)."]
    - ["A wooden table", "Made of cells", "Wood is dead plant cells, walls and all."]
    - ["A pebble", "Not made of cells"]
    - ["A cotton T-shirt", "Made of cells", "Cotton fibres are single plant cells."]
    - ["Plastic", "Not made of cells"]
```

## Elaborate: the smallest living thing

```step
stage: modify
tier: wider
insight: "Asking what the minimum for life is uses cell theory to reason about a boundary case."
check:
  type: question
  q: "A virus is far smaller than a bacterium. It has DNA (or RNA) in a protein coat, but no membrane or cytoplasm of its own, and it can only reproduce inside a living cell. Using cell theory, is a virus a living thing?"
  options: ["By cell theory, no: it isn't a cell, so scientists usually call it non-living", "Yes: it has DNA", "Yes: it is very small"]
  answer: 0
  feedback: [null, "Having DNA isn't enough: it can't carry out life processes on its own.", "Size doesn't decide it; being a cell does."]
  explain: "Viruses sit on the boundary. Most biologists say they are not alive, because they are not cells."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about what is made of cells with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Cell theory:** all living things are made of one or more cells; the cell is the smallest unit of life; cells come from other cells.
- That includes **plants, fungi and bacteria**, not only animals.
- **Single-celled** organisms (bacteria, yeast) are one cell doing everything; **multicellular** organisms are many cells working together.
