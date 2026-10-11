---
order: 2
unit: parts
title: "Navbar, cards and a grid"
summary: "Rebuild the club page's menu, cards and form with Bootstrap: each part is a fixed shape of nested tags with class names, and the grid's row and col line the cards up."
language: html
introduces: [bs-component, bs-grid]
voice: { name: af_heart, speed: 1.1 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8130
  url: http://127.0.0.1:8130/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 18
explainPicture: page.html#explain
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.5 }
  caption: "A row holds cols; each col shares the width; a card goes inside a col"
  clip:
    - caption: "A row is Bootstrap's line of columns. It is empty."
    - wait: 1200
    - caption: "A col inside it, and a card inside the col: the shape from the cards."
    - type: { into: HTML code, text: "    <div class=\"col\">\n      <div class=\"card\"><div class=\"card-body\">Beginners</div></div>\n    </div>\n", after: "<div class=\"row\">\n" }
    - caption: "One col takes the whole row."
    - wait: 600
    - caption: "A second col, and the two share the row equally."
    - type: { into: HTML code, text: "    <div class=\"col\">\n      <div class=\"card\"><div class=\"card-body\">Players</div></div>\n    </div>\n", after: "Beginners</div></div>\n    </div>\n" }
    - expect: { selector: "#preview-text", contains: "Players" }
    - caption: "No Flexbox rules of your own. Row and col did the layout."
    - wait: 1200
hook: "A navbar, a row of cards and a sign-up form: most websites you visit are built from these same few parts."
---
In the club page you built the menu, the cards and the form from tags and your own CSS. Bootstrap has each of them ready-made. A Bootstrap part is a **shape**: tags nested in a fixed way, each with its class name. Copy the shape, then change the words.

The cards sit in Bootstrap's **grid**: a `row` holds `col`s, and the cols share the row's width.

## Predict

```step
stage: predict
code: page.html#predict
insight: "The grid is the part a wrong guess is likely on; seeing equal columns appear from class names alone sets up the idea of copying a shape."
check:
  type: predict
  q: "How will the three cards be placed?"
  options:
    - "Side by side, sharing the width equally"
    - "One under another, each the full width"
    - "Side by side, each only as wide as its word"
    - "On top of each other, in the same place"
  actual: "Side by side, sharing the width equally. The row lines up what is inside it, and each col takes an equal share, so three cols take a third each."
```

`row` and `col` are new. Each card sits inside a `col`, and the cols sit inside a `row`.

## Run

```step
stage: run
code: page.html#run
try: { playground: html, starter: "page.html#run", height: 460 }
insight: "Each part is a shape of nested tags: navbar > container > brand and nav links; row > col > card > card-body."
check: { type: reflect, text: "I can find the navbar, a row, a col and a card in the code." }
unlocks: [navbar, card, row-and-col]
```

Compare with your prediction. Switch on **Boxes** to see the shapes nest. Then delete one whole `col` (from `<div class="col">` to its closing `</div>`) and watch the other two share the row.

## Investigate

```step
stage: investigate
code: page.html#run
picture: page.html#run
insight: "Bootstrap's parts are fixed shapes with fixed names, and they replace the CSS students wrote by hand."
tasks:
  - check:
      type: match
      q: "Match each class with its job in the shape."
      pairs:
        - ["navbar", "the bar across the top"]
        - ["navbar-brand", "the club's name, on the left of the bar"]
        - ["nav-link", "one link in the menu"]
        - ["row", "holds cols in a line"]
        - ["col", "one equal share of the row"]
        - ["card-body", "the padding inside a card"]
      explain: "The nesting matters: a col goes straight inside a row, a card-body straight inside a card. Copy the whole shape from the Reference card."
  - check:
      type: number
      q: "Your hand-built club page needed about 40 lines of CSS for its header, menu and cards. How many lines of CSS of its own does this page have?"
      answer: 0
      explain: "None. The CSS is in bootstrap.min.css. That is the trade: no rules to write, but class names to look up, and a page that looks like many other Bootstrap pages."
  - check:
      type: bug
      code: page.html#bug
      text: "Beginners fills the whole width, and the other two cards sit on a line underneath. There is no error. Click the line that is wrong."
      answer: 5
      fault: logic
      misconception: bs-made-up-class
      explain: "Bootstrap has no class called column, so the browser ignores it and that box takes the whole row. The name is col."
```

### Name the parts

Each class has a job.

### Count the CSS

Compare with your club page.

### Spot the bug

One card is too wide.

## Modify

```step
stage: modify
insight: "Adding a part is copying its shape into the right place."
try: { playground: html, starter: "page.html#run", height: 460 }
tasks:
  - hint:
      - "A button in a card goes inside its card-body, after the text."
      - "A link can look like a button: a class=\"btn btn-primary\" with href=\"#join\". Put one in each card-body."
    expected: page.html#sol-buttons
    check: { type: code, text: "Put a Join button in each card.", rules: { contains: ["btn btn-"] } }
  - hint:
      - "Bootstrap styles a form when each part has its class: form-label, form-control, form-select."
      - "Add a container with id=\"join\" under the cards: a heading, a label and box for the name, a select for the group, and a button. Look up form-control on the Reference cards."
    expected: page.html#sol-form
    check: { type: code, text: "Add a sign-up form under the cards, with Bootstrap's form classes.", rules: { contains: ["form-label", "form-control"] } }
unlocks: [form-control]
```

### A button in each card

Inside the card's body.

### A sign-up form

Labels and boxes with Bootstrap's form classes.

## Make: results and a footer

```step
stage: make
insight: "Looking up a part students have not used before and fitting it into the page is the everyday Bootstrap skill."
try: { playground: html, starter: "page.html#make", height: 420 }
check: { type: code, text: "Add a Bootstrap table of results and a footer.", rules: { contains: ["class=\"table", "<footer"] } }
unlocks: [table-class]
```

Finish the club page: a **results table** styled by Bootstrap (look up its class on the Reference cards) and a **footer** with your club's contact details, using a spacing class and a background colour class.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Every Bootstrap club page has the same blue buttons and grey bar. What would make yours look like your club?"
  options: ["Your own CSS rules, added after Bootstrap", "A different Bootstrap file", "More class names", "Nothing: Bootstrap pages all look the same"]
  answer: 0
  explain: "Bootstrap is a starting point. Next lesson: your own rules on top of it, and when it is better to write the CSS yourself."
```

Next: make Bootstrap look like **yours**, and compare it with the page you built by hand.
