---
order: 4
unit: boxes
moveId: box-model
reviews: [block-inline]
introduces: [box]
assumes: [div-span, display, heading, paragraph, image, style-block, css-rule, text-colour, class, class-selector]
title: Boxes
summary: See every element as a box with padding, a border and a margin, and find out that width sets only the content.
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
hook: "Cards, buttons, menus and photos on every website are boxes, sized and spaced with the same few parts."
---
Every element on a page is a **box**, and CSS sets how much room each box has inside it and around it.

## Predict

```step
stage: predict
code: page.html#card
insight: "Most students say 200; the card is 250 because padding and border are added to the width on both sides."
check:
  type: predict
  q: "How wide is the card on the page, from the outside of its border on the left to the outside on the right, in pixels?"
  kind: number
  fault: logic
  misconception: width-includes-padding
  actual: "250: 200 for the content, plus 20 padding on each side, plus 5 border on each side."
```

`width` sets how wide a box is, `padding` adds space inside its border, and `border` draws the line. Read the code. How wide is the whole card?

## Run

```step
stage: run
code: page.html#card
try: { playground: html, starter: "page.html#card", height: 400, boxmodel: true }
insight: "The Box model view measures each part: content, padding, border and margin."
check: { type: reflect, text: "I can say which part of the box is the padding, which is the border, and why the card is wider than its width." }
unlocks: [card-box]
```

The **Box model** view is on: point at the card. Blue is the content, green the padding, gold the border, and the label shows the sizes. Compare the width with your prediction. Then change `padding` to `40px` and point at it again, and add `margin: 20px;` to see the orange margin.

| Code | What it does | Why |
|---|---|---|
| `width: 200px;` | Sets how wide the content is | It sets only the words' area. Padding and border are added outside it, on both sides, so the card is wider than 200 |
| `padding: 20px;` | Adds room inside the border, around the content | It is part of the box, so the background colour fills it. 20 on each side adds 40 |
| `border: 5px solid navy;` | Draws a line around the padding | Thickness, style and colour in one line. 5 on each side adds 10 |
| `margin: 20px;` | Adds space outside the border, between boxes | It is outside the box, so it is not part of the card's width and has no background |
| `20px` with its `px` | Every size needs a unit | Without one, such as `padding: 20;`, the browser ignores the line and shows no error |

## Investigate

```step
stage: investigate
code: page.html#cards
picture: { ref: page.html#cards, inspect: ".card" }
insight: "The width is only the content: padding and border add to it on both sides, and margin is outside it."
tasks:
  - check:
      type: number
      q: "In the picture, how wide is the first card on the page, outside border to outside border, in pixels?"
      answer: 218
      fault: logic
      misconception: width-includes-padding
      feedback:
        - [180, "That is only the content. Add the padding and the border on both sides."]
        - [210, "That adds the padding (15 + 15) but not the border. The border has two sides too."]
        - [250, "That adds the margin. The margin is outside the card, so it is not part of its width."]
      explain: "180 for the content, plus 15 + 15 of padding, plus 4 + 4 of border: 218. The 16px margin is outside the card."
  - picture: { ref: page.html#cards, inspect: ".card" }
    check:
      type: question
      q: "The words touch the border of a card. Which property gives them room inside the border?"
      options: ["padding", "margin", "width", "background-color"]
      answer: 0
      explain: "Padding is the room between the words and the border. Margin is the space outside the border, between cards."
  - check:
      type: bug
      code: page.html#nounit
      answer: 3
      fault: syntax
      misconception: css-missing-unit
      text: "The border shows, but the words are squashed against it: the padding does nothing, and there is no error. Click the line that causes it."
      explain: "Line 3 has no unit. padding: 20 means nothing to the browser, so it ignores the whole line. It needs padding: 20px;."
```

The picture shows the first card in the **Box model** view: orange margin, gold border, green padding, blue content.

### Add up the width

The first card's rule is `width: 180px; padding: 15px; border: 4px solid teal; margin: 16px;`.

### Room for the words

The words are squashed against the border.

### The padding that does nothing

This card should have room inside its border.

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
```

### Room inside

Give the cards `12px` of padding.

### Space between

Space the cards apart with `16px` of margin.

### A set width

Make each card's content `200px` wide. How wide is each card now? Point at it to check.

## Mix it up

```step
stage: investigate
code: page.html#review
insight: "A span is inline, so its width is ignored until display: block makes it a block box."
check:
  type: question
  q: "Both tags should be boxes 120px wide, but each is only as wide as its word. The padding works, the width does not. What fixes the width?"
  options:
    - "Add display: block; to the .tag rule, because an inline box ignores its width"
    - "Add more padding, because padding sets the width of an inline box"
    - "Add a margin, because inline boxes need space around them"
    - "Change span to p in the CSS, because width belongs to paragraphs"
  answer: 0
  shuffle: false
  fault: logic
  misconception: inline-ignores-width
  feedback:
    - null
    - "Padding adds room around the words, but it does not set the width. The width is the part being ignored."
    - "A margin is space outside the box. It cannot give an inline box a width."
    - "The CSS rule is for the class .tag, and the tag in the HTML is the span. The span is inline, and that is what ignores the width."
  explain: "A span is an inline box: it sits in the line of text and ignores width. display: block makes it a block box, so the 120px applies (and each tag then starts a new line)."
```

Both tags are `span` elements in one line of text.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 460, boxmodel: true }
hint:
  - "A card is one box that holds the heading, the picture and the line of text. Build the box first, then style it."
  - "Start with a `<div class=\"card\">` holding an `<h2>`, an `<img>` and a `<p>`."
  - "Then a `<style>` block with a .card rule: padding, border, margin and width."
check:
  type: code
  text: "Make a card with a heading and a picture, styled with padding, a border and a width."
  rules: { tags: [style, div, h2, img], contains: ["padding:", "border:", "width:"] }
expected: page.html#sol-make
```

Make a card for a house or a club: a `<div>` with a heading, a picture and a line of text, styled with padding, a border, margin and a width. Point at it with Box model and work out its width before you check.

```teacher
summary: Students see every element as a box of content, padding, border and margin, and find out that width sets only the content, so padding and border make the box wider.
time: 45
timing: "Predict and Run 10 min · Investigate 12 min · Mix it up 4 min · Modify 8 min · Make 11 min"
goals:
  - "I can name the four parts of a box: content, padding, border and margin."
  - I can work out how wide a box is from its width, padding and border.
  - I can use padding and margin to space boxes inside and out.
  - I can explain why a value without a unit does nothing.
before: |
  Read the unit primer "CSS in 5 minutes" (the box paragraph), then make the Make task's card yourself and point at it with **Box model** on.

  The **Box model** view (a button in the HTML playground) works like the browser's developer tools: point at any box to see its margin (orange), border (gold), padding (green) and content (blue), with sizes. It never changes the page. The **Boxes** button is different: it adds space to show nesting, so use Box model in this lesson.

  The one idea: `width` sets the content only. The box on the page is the width plus the padding and border on both sides. Real sites often set `box-sizing: border-box` so that width includes padding and border; mention it once, after students are comfortable with the sums.
running:
  - "Predict: almost everyone says 200. The card is 250 wide: padding and border are added to the width on both sides. Let students check with Box model."
  - "Run: change the padding and point again. Ask: which number in the label changed, and which part of the card grew?"
  - "Investigate: the number task is the sum on paper (180 + 30 + 8). The wrong answers are the real slips: content only, one side only, margin included. The last task is `padding: 20` with no unit; the browser ignores it without an error."
  - "Mix it up: padding works on an inline span but width does not. Ask who remembers what block and inline meant."
  - "Modify: build the card one property at a time, checking each with Box model, and work out the width before pointing."
stuck:
  - see: Padding or margin does nothing, and there is no error.
    ask: Does the value have a unit, such as px?
    fix: "Write padding: 20px; not padding: 20;"
  - see: The card is wider than the width they set.
    ask: What else is added to the width?
    fix: Padding and border are added on both sides; take them into account, or reduce the width.
  - see: The cards touch each other.
    ask: Which property makes space outside a box?
    fix: Add margin to the card's rule (padding is inside the border).
stretch: "Use different padding on each side (padding: 10px 30px;) and predict the width before pointing at it. Then add border-radius: 12px; for rounded corners."
support: "Give students the Modify starter with Box model on and ask them only to add padding, then margin, pointing at the card after each."
leads: "Next lesson is a review of the unit on a whole newsletter page: reading a longer stylesheet and turning the articles into cards. Class idea: measure a real website's buttons with the browser's developer tools (right-click, Inspect)."
exit:
  q: "A box has width: 300px; padding: 10px; border: 2px solid; How wide is it on the page, and why?"
  a: "324 pixels: 300 for the content, plus 10 padding on each side (20) and 2 border on each side (4)."
explain: |
  The video and the picture show the same steps, in the **Box model** view:

  1. Every element is a box. The words are the **content** (blue).
  2. `padding` (green) adds space inside, around the content.
  3. `border` (gold) is the line around the padding.
  4. `margin` (orange) is space outside the border, between boxes.
  5. `width` sets the content only, so this card is 200 + 20 + 20 + 5 + 5 = 250 pixels wide.

  Every size needs a unit, such as `20px`. Without one, the browser ignores it, with no error message.
solutions:
  step-4#t1: page.html#sol-padding
  step-4#t2: page.html#sol-margin
  step-4#t3: page.html#sol-width
  step-6: page.html#sol-make
struggle: "Working out that padding and border add to the width. Ask for the sum on paper first (200 + 20 + 20 + 5 + 5), then check it with Box model."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then measure
      minutes: 3
      do: |
        Decide with your partner how wide the whole card is.
        Write your number on a mini whiteboard and hold it up.
      notes: "Count the votes before anyone runs it. Most will say 200. Ask what the 20 and the 5 in the rule are for, then let them point at the card with Box model."
    - at: end
      kind: activity
      title: Measure a neighbour's card
      minutes: 4
      do: |
        Swap cards with a partner. Without running them, add up the width of the card on paper, then point at it with Box model to check.
      notes: "Listen for students who add only one side of the padding or border. Ask how many sides a box has left and right."
```

```code page.html#card
<style>
  .card {
    width: 200px;
    padding: 20px;
    border: 5px solid navy;
  }
</style>
<div class="card">Owls: 12 points</div>
```

```code page.html#cards
<style>
  .card {
    width: 180px;
    padding: 15px;
    border: 4px solid teal;
    margin: 16px;
    background-color: lightyellow;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

```code page.html#nounit
<style>
  .card {
    padding: 20;
    border: 5px solid navy;
  }
</style>
<div class="card">Owls: 12 points</div>
```

```code page.html#review
<style>
  .tag {
    width: 120px;
    padding: 8px;
    border: 2px solid teal;
  }
</style>
<p>Today: <span class="tag">Owls</span> <span class="tag">Hawks</span></p>
```

```code page.html#modify
<style>
  .card {
    border: 2px solid navy;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

```code page.html#sol-padding
<style>
  .card {
    border: 2px solid navy;
    padding: 12px;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

```code page.html#sol-margin
<style>
  .card {
    border: 2px solid navy;
    padding: 12px;
    margin: 16px;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

```code page.html#sol-width
<style>
  .card {
    border: 2px solid navy;
    padding: 12px;
    margin: 16px;
    width: 200px;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

```code page.html#make
<!-- Make a card for a house or a club. Pictures you can use: trophy.svg, medal.svg, book.svg, ball.svg -->
```

```code page.html#sol-make
<style>
  .card {
    width: 220px;
    padding: 16px;
    border: 4px solid darkorange;
    margin: 16px;
    background-color: lightyellow;
  }
</style>
<div class="card">
  <h2>Soccer club</h2>
  <img src="ball.svg" alt="A soccer ball" width="80">
  <p>Thursdays after school on the top oval.</p>
</div>
```

```code page.html#explain-start
<style>
  .card {
  }
</style>
<div class="card">Owls: 12 points</div>
```

```code page.html#explain
<style>
  .card {
    padding: 20px;
    border: 5px solid navy;
    margin: 20px;
    width: 200px;
  }
</style>
<div class="card">Owls: 12 points</div>
```
