---
order: 6
unit: style
title: Boxes
summary: See every element as a box of content, padding, border and margin, and size and space boxes with CSS.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8129
  url: http://127.0.0.1:8129/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 40
explainPicture: { ref: page.html#explain, inspect: ".card" }
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "@page.html#explain-start", inspect: ".card", zoom: 1.4 }
  caption: "Every element is a box: content, padding, border, margin"
  clip:
    - caption:
        text: "Every element is a box. Box model view shows its parts. The words are the content (blue)."
        say: "Every element is a box. The words in the middle, in blue, are its content."
    - wait: 1800
    - caption: "padding (green) adds space inside, around the content."
    - type: { into: HTML code, text: "    padding: 20px;\n", after: ".card {\n" }
    - caption: "border (gold) is the line around the padding."
    - type: { into: HTML code, text: "    border: 5px solid navy;\n", after: "padding: 20px;\n" }
    - caption: "margin (orange) is space outside the border, between boxes."
    - type: { into: HTML code, text: "    margin: 20px;\n", after: "solid navy;\n" }
    - caption:
        text: "width sets the content only: 200 + 20 + 20 + 5 + 5 = 250 wide."
        say: "Width sets the content only, so with padding and border the box is 250 wide."
    - type: { into: HTML code, text: "    width: 200px;\n", after: "margin: 20px;\n" }
    - expect: { selector: "#preview-text", contains: "Owls: 12 points" }
    - wait: 2500
hook: "Cards, buttons, menus and photos on every website are boxes, sized and spaced with the same four parts."
---
Every element on a page is a **box**. CSS sets how big each box is and how much space it has inside and around it.

## Predict

```step
stage: predict
code: page.html#card
insight: "Most students say 200; the card is 250 because padding and border are added to the width on both sides."
check:
  type: predict
  q: "How wide is the card on the page, from the outside of its border on the left to the outside on the right, in pixels?"
  kind: number
  actual: "250: 200 for the content, plus 20 padding on each side, plus 5 border on each side."
```

`width` sets how wide a box is, `padding` adds space inside its border, and `border` draws the line. Read the code. How wide is the whole card?

## Run

```step
stage: run
code: page.html#card
try: { playground: html, starter: "page.html#card", height: 400, boxmodel: true }
insight: "The Box model view measures each part: content, padding, border and margin."
check: { type: reflect, text: "I can say which part of the box is the padding and which is the border." }
unlocks: [div-box, width, padding, border]
```

The **Box model** view is on: point at the card. Blue is the content, green the padding, gold the border, and the label shows the sizes. Compare the width with your prediction, then change `padding` to `40px` and point at it again.

## Investigate

```step
stage: investigate
code: page.html#cards
picture: { ref: page.html#cards, inspect: ".card" }
insight: "Padding is inside the border and takes the background; margin is outside and pushes boxes apart. Block boxes stack, inline ones sit in a line."
unlocks: [margin, background-color]
tasks:
  - check:
      type: match
      q: "Match each property with what it changes."
      pairs:
        - ["padding", "space inside the border, around the content"]
        - ["border", "the line around the padding"]
        - ["margin", "space outside the border, between boxes"]
        - ["width", "how wide the content is"]
        - ["background-color", "the colour behind the content and the padding"]
      explain: "From the inside out: content, padding, border, margin. The background colour fills the content and the padding, but not the margin."
  - check:
      type: trace
      text: "Fill in how much each part adds to the first card's width (both sides together)."
      table: |
        | part | pixels |
        | content (width) | 200 |
        | padding | [40] |
        | border | [10] |
        | whole card | [250] |
      explain: "Padding and border are added on the left and on the right: 200 + 40 + 10 = 250. The margin is outside the card, so it is not part of its width."
  - picture: { ref: page.html#inline, boxes: true }
    check:
      type: question
      q: "Why do the paragraphs stack, while the bold words and the link sit side by side?"
      options: ["Paragraphs are block boxes: each takes a whole line. strong and a are inline: they sit in a line of text.", "The paragraphs have a margin", "Bold words are smaller than paragraphs", "Links always sit next to bold words"]
      answer: 0
      explain: "Block elements (p, h1, div, ul, table) start on a new line and take the full width. Inline elements (strong, em, a, img) sit inside a line of text."
  - check:
      type: bug
      code: page.html#nounit
      answer: 3
      fault: syntax
      misconception: css-missing-unit
      text: "The border shows, but the words are squashed against it: the padding does nothing, and there is no error. Click the line that causes it."
      explain: "Line 3 has no unit. padding: 20 means nothing to the browser, so it ignores the whole declaration. It needs padding: 20px;."
  - picture: { ref: page.html#combos, inspect: ".card" }
    check:
      type: question
      q: "What keeps the two cards apart?"
      options: ["Their margin", "Their padding", "Their border", "The pictures"]
      answer: 0
      explain: "Margin is the space outside each card's border (orange in the Box model view). Inside, a card can hold any boxes: a heading, a picture, a paragraph."
```

The picture shows the first card in the **Box model** view: orange margin, gold border, green padding, blue content.

### Match the parts

What does each property change?

### Add up the width

Use the first card's rule.

### Block and inline

Some boxes stack; some sit in a line.

```html
<p>One paragraph.</p>
<p>Another paragraph.</p>
<strong>Bold</strong> <strong>bold</strong> and <a href="https://example.com">a link</a>
```

### The padding that does nothing

This card should have room inside its border.

### Boxes inside boxes

A card is a box that holds other boxes: a heading, a picture and a paragraph.

```html
<div class="card">
  <h2>Owls</h2>
  <img src="trophy.svg" alt="A gold trophy" width="60">
  <p>12 points</p>
</div>
```

## Modify

```step
stage: modify
insight: "Building a card one property at a time, checking each change with the Box model view."
try: { playground: html, starter: "page.html#modify", height: 440, boxmodel: true }
tasks:
  - hint: "Add padding: 12px; inside the .card rule."
    check: { type: code, text: "Give the cards 12px of padding.", rules: { contains: ["padding: 12px;"] } }
    expected: page.html#sol-padding
  - hint: "Margin is outside the border: margin: 16px;"
    check: { type: code, text: "Space the cards apart with 16px of margin.", rules: { contains: ["margin: 16px;"] } }
    expected: page.html#sol-margin
  - hint: "width: 200px; Remember that padding and border are added to it."
    check: { type: code, text: "Make each card's content 200px wide.", rules: { contains: ["width: 200px;"] } }
    expected: page.html#sol-width
  - hint: "background-color: lightyellow; Notice it fills the padding too."
    check: { type: code, text: "Give the cards a background colour.", rules: { contains: ["background-color:"] } }
    expected: page.html#sol-background
```

### Room inside

Give the cards `12px` of padding.

### Space between

Space the cards apart with `16px` of margin.

### A set width

Make each card's content `200px` wide. How wide is each card now? Point at it to check.

### A background

Give the cards a background colour, and notice where it stops.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 460, boxmodel: true }
hint:
  - "Start with a `<div class=\"card\">` holding an `<h2>`, an `<img>` and a `<p>`."
  - "Then a `<style>` block with a .card rule: padding, border, margin, width and a background colour."
check:
  type: code
  text: "Make a card with a heading and a picture, styled with padding and a border."
  rules: { tags: [style, div, h2, img], contains: ["padding:", "border:"] }
expected: page.html#sol-make
```

Make a card for a house or a club: a `<div>` with a heading, a picture and a line of text, styled with padding, a border, margin, a width and a background colour.

## Turn the newsletter into cards

```step
stage: modify
try: { playground: html, starter: "page.html#newsletter", height: 480 }
insight: "Real pages group content into boxes: a div with a class around each article, styled once."
expected: page.html#sol-newsletter
```

Wrap each article (its `<h2>` and `<p>`) in `<div class="article">`, then style `.article` with padding, a border, margin and a background colour, so each article looks like a card. (The `body` rule already sets a font for the whole page.)
