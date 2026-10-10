---
order: 12
unit: challenge
optional: true
title: Page layout with Grid
summary: Arrange a page and a gallery in rows and columns with CSS Grid, and choose between Grid and Flexbox.
language: html
introduces: [grid, css-units]
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8134
  url: http://127.0.0.1:8134/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 40
explainPicture: page.html#explain
voice: true
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.6 }
  caption: "display: grid on the parent, then list the columns"
  clip:
    - caption: "A menu and the main content, one under the other."
    - wait: 1500
    - caption: "display: grid goes on the box that holds them, like Flexbox."
    - type: { into: HTML code, text: "    display: grid;\n", after: ".page {\n" }
    - caption:
        text: "grid-template-columns lists the columns: 150px, then 1fr, the rest of the width."
        say: "Grid template columns lists them: 150 pixels, then one fraction, the rest."
    - type: { into: HTML code, text: "    grid-template-columns: 150px 1fr;\n", after: "display: grid;\n" }
    - caption: "gap puts space between the columns."
    - type: { into: HTML code, text: "    gap: 16px;\n", after: "150px 1fr;\n" }
    - expect: { selector: "#preview-text", contains: "Menu" }
    - caption: "Grid lines things up in columns and rows. Flexbox is for one row."
    - wait: 2200
hook: "News sites, shops and photo galleries line everything up in columns and rows: that is CSS Grid."
---
Flexbox lines items up in one row. **Grid** lines them up in **columns and rows** at once, which suits whole page layouts and galleries.

## Predict

```step
stage: predict
code: page.html#layout
insight: "Students meet 1fr for the first time; predicting where main goes, and how wide, makes the column list concrete."
check:
  type: predict
  q: "Where does the main content go?"
  options:
    - "Under the menu, as before"
    - "To the right of the menu, filling the rest of the width"
    - "Side by side, both 150 pixels wide"
    - "On top of the menu"
  actual: "To the right of the menu, filling the rest of the width. The first column is 150px; 1fr means one share of the space left over."
```

`display: grid` and `grid-template-columns` are new. Read the code. Where does the main content go?

## Run

```step
stage: run
code: page.html#layout
try: { playground: html, starter: "page.html#layout", height: 360 }
insight: "grid-template-columns lists each column's width; fr shares out the space that is left."
check: { type: reflect, text: "I can say what 150px 1fr means." }
unlocks: [display-grid, grid-template-columns]
```

Compare with your prediction. Change `150px` to `250px`. Then try `1fr 1fr` (two equal columns) and `1fr 2fr` (the second twice as wide).

## Investigate

```step
stage: investigate
code: page.html#layout
insight: "Grid goes on the parent like Flexbox; its columns are listed, and items fill them in order, row after row."
tasks:
  - check:
      type: match
      q: "Match each part with what it does."
      pairs:
        - ["display: grid", "arranges the box's children in columns and rows"]
        - ["grid-template-columns: 150px 1fr", "two columns: 150 pixels, then the rest"]
        - ["1fr", "one share of the space left over"]
        - ["repeat(3, 1fr)", "three equal columns"]
        - ["gap: 16px", "space between the columns and rows"]
      explain: "Grid goes on the box that holds the items. The items fill the columns in order, starting a new row when a row is full."
  - picture: page.html#gallery
    check:
      type: number
      q: "This gallery has three columns and seven pictures. How many rows does it fill?"
      answer: 3
      explain: "Three per row: 3 + 3 + 1. The seventh picture starts a third row, in the first column."
  - check:
      type: bug
      code: page.html#gridbad
      answer: 2
      fault: logic
      misconception: grid-on-items
      text: "The menu and the main content should be two columns, but they stack, with no error. Click the line that causes it."
      explain: "Line 2 gives the grid to the nav and the main themselves. Grid, like Flexbox, goes on the box that holds them: .page { display: grid; ... }."
  - check:
      type: question
      q: "When is Grid a better choice than Flexbox?"
      options: ["When items must line up in columns and rows, such as a page layout or a gallery", "For a single row, such as a menu", "Only for tables", "Never: they do the same thing"]
      answer: 0
      explain: "Flexbox is for one direction (a menu, a toolbar). Grid is for two (rows and columns that line up). Many pages use both: Grid for the page, Flexbox inside each part."
```

### Match the parts

What does each part do?

### Count the rows

Seven pictures in three columns.

```html
<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    width: 240px;
  }
</style>
```

### Columns that will not form

Two columns that stack instead.

### Grid or Flexbox?

Two tools, two jobs.

## Modify

```step
stage: modify
insight: "Laying out a real page with Grid: two columns for the page, then three for the cards."
try: { playground: html, starter: "page.html#modify", height: 500 }
tasks:
  - hint:
      - "The `.page` box holds the nav and the main: give it `display: grid;`."
      - "Then `grid-template-columns: 160px 1fr;`"
    check: { type: code, text: "Make the menu and the main content two columns.", rules: { contains: [".page {", "display: grid;", "grid-template-columns:"] } }
    expected: page.html#sol-columns
  - hint: "`gap: 16px;` in the `.page` rule."
    check: { type: code, text: "Put space between the columns.", rules: { contains: ["gap:"] } }
    expected: page.html#sol-gap
  - hint: "A `.cards` rule: `display: grid;`, `grid-template-columns: repeat(3, 1fr);` and a gap."
    check: { type: code, text: "Lay the six cards out in three columns.", rules: { contains: [".cards {", "repeat(3, 1fr)"] } }
    expected: page.html#sol-cards
```

### Two columns

Put the menu on the left (`160px`) and the main content on the right.

### Some space

Put a gap between the two columns.

### Cards in three columns

Lay the six cards out in three equal columns, with a gap.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 440 }
hint:
  - "A `<div class=\"page\">` holding two parts, such as a `<main>` and a side box."
  - "A `.page` rule with `display: grid;`, `grid-template-columns` and a `gap`."
check:
  type: code
  text: "Make a page layout with Grid: at least two columns."
  rules: { contains: ["display: grid;", "grid-template-columns:"] }
expected: page.html#sol-make
```

Make a page for an event with two columns: the main information, and a side box (tickets, times or a map). Choose the column widths: a fixed width and `1fr`, or two shares such as `2fr 1fr`.

## Lay out the photo gallery

```step
stage: modify
try: { playground: html, starter: "page.html#photos", height: 520 }
insight: "A real gallery where every row lines up: the job Grid does better than Flexbox."
expected: page.html#sol-photos
```

These six photos stack one under another. Lay them out in three equal columns with a gap, `420px` wide, so every row lines up.
