---
order: 7
unit: components
title: Flexbox
summary: Line boxes up in a row with Flexbox, space and centre them, and let a gallery wrap onto new lines.
language: html
introduces: [flex, flex-options]
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8130
  url: http://127.0.0.1:8130/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: page.html#explain
voice: true
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.6 }
  caption: "display: flex on the parent lines its children up in a row"
  clip:
    - caption: "A list stacks its items, one under another."
    - wait: 1600
    - caption: "display: flex goes on the box that holds them: the ul."
    - type: { into: HTML code, text: "    display: flex;\n", after: "list-style: none;\n" }
    - caption: "Its children, the li items, now sit side by side."
    - wait: 1600
    - caption: "gap puts space between them."
    - type: { into: HTML code, text: "    gap: 24px;\n", after: "display: flex;\n" }
    - expect: { selector: "#preview-text", contains: "Home" }
    - caption: "Flexbox goes on the parent. The children line up."
    - wait: 2000
hook: "Almost every menu bar, toolbar and photo gallery on the web is a Flexbox row."
---
So far, boxes stack down the page. **Flexbox** lines them up in a row.

## Predict

```step
stage: predict
code: page.html#menu
insight: "Students rarely guess that one property on the list rearranges all its items; seeing the row appear makes the parent-child idea concrete."
check:
  type: predict
  q: "How will the three menu items be placed?"
  options:
    - "One under another, as before"
    - "Side by side in a row"
    - "In a grid of two columns"
    - "Nothing shows"
  actual: "Side by side in a row. display: flex on the ul lines up its children, the li items. (list-style: none removes the bullets, as on real menus.)"
```

`display: flex` is new. `list-style: none` removes a list's bullets. Read the code. How will the menu items be placed?

## Run

```step
stage: run
code: page.html#menu
try: { playground: html, starter: "page.html#menu", height: 360 }
insight: "display: flex goes on the container; its children line up, and gap spaces them."
check: { type: reflect, text: "I can say which box gets display: flex, and what happens to its children." }
unlocks: [display-flex, gap, list-style]
```

Compare with your prediction. Then change `gap` to `40px`, and delete the `display: flex;` line to see the menu stack again. Put it back.

## Investigate

```step
stage: investigate
code: page.html#parts
picture: page.html#parts
insight: "Flexbox properties go on the parent: display: flex makes the row, gap spaces it, justify-content places it, and flex-wrap lets it wrap."
unlocks: [justify-content, flex-wrap]
tasks:
  - check:
      type: match
      q: "Match each property with what it does."
      pairs:
        - ["display: flex", "lines up the box's children in a row"]
        - ["gap: 16px", "puts space between the items"]
        - ["justify-content: center", "gathers the items in the middle of the row"]
        - ["flex-wrap: wrap", "lets items move to the next line when the row is full"]
      explain: "All four go on the box that holds the items. The items themselves need nothing."
  - check:
      type: question
      q: "To put the four pictures in a row, which box gets display: flex?"
      options: ["The div that holds them (class gallery)", "Each img", "The body", "The style block"]
      answer: 0
      explain: "display: flex goes on the parent: the box that holds the items. Its children line up."
  - check:
      type: bug
      code: page.html#items
      answer: 2
      fault: logic
      misconception: flex-on-items
      text: "This menu should be a row, but the items still stack, and there is no error. Click the line that causes it."
      explain: "Line 2 puts display: flex on each li, so each item lines up its own insides. It belongs on the ul that holds them: ul { display: flex; }."
  - picture: page.html#combos
    check:
      type: question
      q: "The menu and the row of cards both use Flexbox. What do they have in common?"
      options: ["display: flex is on the box that holds the items", "Every item has display: flex", "They both use flex-wrap", "They are both lists"]
      answer: 0
      explain: "A menu (a ul of links) and a row of cards (a div of divs) work the same way: the parent gets display: flex. A card can hold a picture and text, and still be one item in the row."
```

The picture shows this page: a centred menu, and a gallery that wraps onto a second line.

### Match the parts

What does each property do?

### Which box?

Look at the gallery.

### The menu that will not line up

This should be a row.

### Rows of anything

A menu and a row of cards, both with Flexbox.

```html
<style>
  .menu {
    display: flex;
    gap: 16px;
    list-style: none;
  }
  .cards {
    display: flex;
    gap: 12px;
  }
  .card {
    padding: 12px;
    border: 2px solid teal;
  }
</style>
```

## Modify

```step
stage: modify
insight: "Building a menu and a gallery one Flexbox property at a time, always on the parent."
try: { playground: html, starter: "page.html#modify", height: 480 }
tasks:
  - hint:
      - "Flexbox goes on the parent, the box that holds the items. Which rule is that?"
      - "Add `display: flex;` to the `.menu` rule."
    check: { type: code, text: "Put the menu in a row.", rules: { contains: [".menu {", "display: flex;"] } }
    expected: page.html#sol-row
  - hint: "`gap: 24px;` goes in the same rule."
    check: { type: code, text: "Space the menu items 24px apart.", rules: { contains: ["gap: 24px;"] } }
    expected: page.html#sol-gap
  - hint:
      - "Centring the items is another job for the parent's rule. Look for the Flexbox property that spreads items along the row."
      - "`justify-content: center;` in the `.menu` rule."
    check: { type: code, text: "Centre the menu.", rules: { contains: ["justify-content: center;"] } }
    expected: page.html#sol-centre
  - hint:
      - "Write a new `.gallery` rule: the gallery is the parent of the pictures."
      - "`display: flex;`, `flex-wrap: wrap;`, a `gap`, and a `width` such as `340px`."
    check: { type: code, text: "Make the gallery a row that wraps.", rules: { contains: [".gallery {", "flex-wrap: wrap;"] } }
    expected: page.html#sol-gallery
```

### A menu in a row

Put the menu items side by side.

### Space them out

Put `24px` between the menu items.

### Centre the menu

Move the menu to the middle of the row.

### A gallery that wraps

Make the six pictures a gallery: a row, `340px` wide, that wraps onto new lines.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 460 }
hint:
  - "A gallery is a parent box with the pictures inside it. Build the box, then make it a wrapping row."
  - "Start with a `<div class=\"gallery\">` holding your pictures, each with alt."
  - "Then a `.gallery` rule: `display: flex;`, `flex-wrap: wrap;`, a `gap` and a `width`."
check:
  type: code
  text: "Make a gallery of at least four pictures that wraps onto new lines."
  rules: { tags: [img], contains: ["display: flex;", "flex-wrap: wrap;"] }
expected: page.html#sol-make
```

Make a gallery for a school event: a heading and at least four pictures, with good alt text, in a row that wraps. Pictures you can use: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`.

## Put the club menu in a row

```step
stage: modify
try: { playground: html, starter: "page.html#club", height: 420 }
insight: "A real menu bar: a list of links made into a centred Flexbox row inside a coloured bar."
expected: page.html#sol-club
```

The club's menu is a bulleted list stacked inside a blue bar. Make it a real menu bar: a `.menu` rule that puts the links in a row, removes the bullets, spaces them `24px` apart and centres them. Add `margin: 0;` and `padding: 0;` to tidy the list's own spacing.
