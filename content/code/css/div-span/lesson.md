---
order: 3
unit: boxes
moveId: block-inline
reviews: [rules-combine, class-pick]
introduces: [div-span, display]
assumes: [class-selector, css-rule, link, emphasis]
title: Block and inline boxes
summary: Find out why paragraphs stack while bold words sit in a line, and use div and span to group things you want to style.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8142
  url: http://127.0.0.1:8142/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: { ref: page.html#explain, boxes: true }
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.6 }
  caption: "A block takes the full width, an inline box sits in the line"
  clip:
    - caption: "The span's gold hugs its words. The div's gold runs across the page."
    - wait: 2000
    - caption: "A block starts a new line and takes the full width."
    - wait: 1500
    - caption: "An inline box sits inside the line of text."
    - wait: 1500
    - caption:
        text: "display: block makes the span act like a div."
        say: "Display block makes the span act like a div."
    - type: { into: HTML code, text: "  display: block;\n", after: "gold;\n" }
    - expect: { selector: "#preview-text", contains: "9 am" }
    - wait: 2500
hook: "Every menu, card and banner on a website is a plain box that someone decided should stack or sit in a line."
---
Some parts of a page start on a new line, like a paragraph. Others sit inside a line of text, like a bold word or a link. Which kind an element is decides how it fills the page.

## Predict

```step
stage: predict
code: page.html#banner
insight: "Students see a box as the size of its words; a block box takes the full width of the page, an inline box only its words."
check:
  type: predict
  q: "Look at the gold background. How wide is it behind 9 am, and behind Bring a hat and water.?"
  options:
    - "Behind 9 am, only its words. Behind the hat line, the full width of the page"
    - "Only the words, in both places"
    - "The full width of the page, in both places"
    - "Behind 9 am, the full width. Behind the hat line, only its words"
  fault: logic
  misconception: block-full-width
  actual: "Only the words behind 9 am, and the full width behind the hat line. A span sits inside the line of text. A div is a block: it starts on a new line and takes the full width."
```

`<span>` and `<div>` are tags you have not met. Both are plain boxes that the class `mark` colours gold. Read the code. How wide is the gold in each place?

## Run

```step
stage: run
code: page.html#banner-run
try: { playground: html, starter: "page.html#banner-run", height: 460, boxes: true }
insight: "Block boxes start a new line and take the full width; inline boxes sit in the line; display switches one into the other."
check: { type: reflect, text: "I can say why a div stacks and a span sits in a line." }
unlocks: [div-box]
```

Compare the page with your prediction. Then change `span` to `div` (in the opening and closing tag): `9 am` jumps onto its own line. Change it back. The last link is an inline `<a>`, yet it takes a whole line, because its class sets `display: block;`. Add `display: block;` to the `.mark` rule too: the span now stacks like a div.

| Code | What it does | Why |
|---|---|---|
| `<p>`, `<h2>`, `<div>` | Start on a new line and take the full width | These are **block** boxes. That is why the gold behind the div runs across the page |
| `<strong>`, `<a>`, `<span>` | Sit inside a line of text | These are **inline** boxes. They are only as wide as their words, and the gold stops there |
| `<span class="mark">9 am</span>` | A plain box inside a line | A `span` has no look of its own. It is for a few words you want to style |
| `<div class="mark">…</div>` | A plain block box | A `div` has no look of its own. It is for grouping several elements so you can style them as one |
| `display: block;` | Makes any element a block | `display` sets which kind of box an element is. `display: inline;` does the opposite |

## Investigate

```step
stage: investigate
code: page.html#wrap
insight: "A div and a span are plain boxes: they group things for styling and add no look; block or inline is about the line."
tasks:
  - check:
      type: question
      q: "A student wraps two paragraphs in a <div> and writes no CSS. What changes on the page?"
      options: ["Nothing you can see: a div has no look of its own", "A border appears around the two paragraphs", "The two paragraphs get a grey background", "The two paragraphs join into one line"]
      answer: 0
      fault: logic
      misconception: div-adds-look
      explain: "A div is a plain box. It changes nothing until a rule styles it. Its use is to group elements so that one rule, or one class, can style them together."
  - check:
      type: question
      q: "Which three tags sit inside a line of text, instead of starting a new line?"
      options: ["<strong>, <a> and <span>", "<p>, <h1> and <div>", "<h2>, <strong> and <ul>", "<span>, <div> and <a>"]
      answer: 0
      fault: logic
      misconception: block-full-width
      explain: "Inline: strong, em, a, img and span. Block: p, h1 to h6, ul, ol, table and div. A block starts on a new line and takes the full width."
```

### A div with no rule

The two paragraphs are wrapped, and no rule mentions the div.

### Block or inline?

Pick the tags that sit inside a line.

## Modify

```step
stage: modify
insight: "display changes how an element fits in the line, and a div groups elements so one rule styles them together."
try: { playground: html, starter: "page.html#modify", height: 460 }
tasks:
  - hint:
      - "Labels are inline, so each one sits beside its box."
      - "Add `display: block;` to the `label` rule."
    check: { type: code, text: "Put each label on its own line, above its box.", rules: { contains: ["display: block;"] } }
    expected: page.html#sol-label
  - hint:
      - "Wrap both paragraphs in one div that has the class. The div needs a closing tag after the second paragraph."
      - "Then write a `.packing` rule with a `background-color`."
    check: { type: code, text: "Group the two paragraphs in a div with the class packing, and give it a background colour.", rules: { tags: [div], contains: ["class=\"packing\"", ".packing {", "background-color:"] } }
    expected: page.html#sol-div
```

### Labels on their own lines

Each label should sit above its box.

### Group the paragraphs

One `<div>` around both paragraphs, and one rule for it.

## Mix it up

```step
stage: investigate
code: page.html#review
try: { playground: html, starter: "page.html#review", height: 420 }
insight: "A class beats a group rule even when the group rule is written below it, and the group rule still adds what the class does not set."
check:
  type: code
  text: "Mark the div and the span with the class alert, and make both 20px."
  rules: { contains: ["<div class=\"alert\">", "<span class=\"alert\">", "font-size: 20px;"] }
expected: page.html#sol-review
```

The words in the div and in the span should both be crimson and 20px. Right now they are navy and normal size. Change the page so both are crimson and 20px.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 460 }
hint:
  - "A span goes around only the words you want to mark, and it takes the class you will style."
  - "Then a `<style>` block with a `.highlight` rule and a `background-color`."
check:
  type: code
  text: "Highlight a phrase with a span and a class."
  rules: { tags: [style, span], contains: ["class=\"highlight\"", ".highlight {", "background-color:"] }
expected: page.html#sol-make
```

Highlight the most important phrase in this concert notice. Put a `<span>` with the class `highlight` around just those words, and write a `.highlight` rule with a background colour.

```teacher
summary: Students find out that block elements start a new line and take the full width while inline ones sit in the line, that div and span are plain boxes for grouping, and that display switches between block and inline.
time: 40
timing: "Predict and Run 10 min · Investigate 8 min · Modify 8 min · Mix it up 5 min · Make 9 min"
goals:
  - I can say which elements are block and which are inline.
  - I can use a span for a few words and a div for a group of elements.
  - I can switch an element between block and inline with display.
before: |
  Read the unit primer "Layout and components" first, then do the Make task yourself in the playground (about 5 minutes).

  A **block** box starts on a new line and takes the full width of its container. An **inline** box sits inside a line of text and is only as wide as its content. `<div>` (block) and `<span>` (inline) are plain boxes: they have no look until a rule styles them. `display: block;` and `display: inline;` swap the kind. This lesson uses background colour to show the width, because box properties such as padding and borders come next lesson.
running:
  - "Predict and Run: most students say the gold hugs the words in both places. The full-width band behind the div is the surprise. Turn on Boxes to show each box."
  - "Investigate: the first question is the misconception, that a div changes the page by itself. Ask what a rule would have to say to see the div."
  - "Modify: labels are inline, so they run on beside their boxes. `display: block` puts each on its own line."
  - "Mix it up: the class and the group rule both set the colour. The class wins wherever it is written, and the size comes only from the group rule."
  - "Make: the check ticks on a span, a class, a rule for it and a background colour."
stuck:
  - see: The highlight runs across the whole page.
    ask: Is the element a span or a div?
    fix: Use a span for a few words in a line. A div is a block and takes the full width.
  - see: Nothing changes when the div is added.
    ask: Is there a rule that names the div or its class?
    fix: A div has no look of its own. Give it a class and write a rule for the class.
  - see: The span does not stack when display block is added.
    ask: Is the display line inside the rule for the span's class?
    fix: "Put display: block; between the braces of the class rule, with a semicolon."
stretch: "Make the three links in a nav stack on their own lines with display: block, then make three paragraphs sit in a line with display: inline. Which is easier to read?"
support: "Give students the Run page and ask them only to swap span and div and say what moved."
leads: "Next lesson gives each box padding, a border and a margin, and works out how wide the box is. Class idea: open a news site and find three block boxes and three inline ones."
exit:
  q: "Why does a gold background on a span reach only its words, and on a div the whole width?"
  a: "A span is inline, so it is only as wide as its words. A div is a block, so it takes the full width of the page."
explain: |
  The video and the picture show the same steps:

  1. The span's gold hugs its words. The div's gold runs across the page.
  2. A block starts a new line and takes the full width.
  3. An inline box sits inside the line of text.
  4. `display: block` makes the span act like a div.

  In the picture, Boxes is on: the div's box fills the width, and the span's box is only as wide as its words.
solutions:
  step-4#t1: page.html#sol-label
  step-4#t2: page.html#sol-div
  step-6: page.html#sol-make
struggle: "Believing a div adds a look. Ask what the div would have to be told before anything on the page looked different."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner how wide the gold is behind each marked part.
        Hold up 1, 2, 3 or 4 fingers for the option you chose.
      notes: "Count the votes before anyone runs it. Ask someone who chose the words in both places what the page would look like if the div were only as wide as its words. The idea to land: block means the full width."
    - at: end
      kind: activity
      title: Block or inline hunt
      minutes: 4
      do: |
        Open a news page. Find three block boxes and three inline ones, and say how you know which is which.
      notes: "Listen for students who sort by size instead of by whether the box starts a new line. Ask what happens to a word in the middle of a sentence when it is bold."
```

```code page.html#banner
<style>
  .mark {
    background-color: gold;
  }
</style>
<h2>Sports day</h2>
<p>Races start at <span class="mark">9 am</span> on the oval.</p>
<div class="mark">Bring a hat and water.</div>
<p>Read the <a href="https://example.com/rules">rules</a> first.</p>
```

```code page.html#banner-run
<style>
  .mark {
    background-color: gold;
  }
  .stack {
    display: block;
  }
</style>
<h2>Sports day</h2>
<p>Races start at <span class="mark">9 am</span> on the oval.</p>
<div class="mark">Bring a hat and water.</div>
<p>Read the <a href="https://example.com/rules">rules</a> first.</p>
<a class="stack" href="https://example.com/join">Join the club</a>
```

```code page.html#wrap
<div>
  <p>Bring a hat.</p>
  <p>Bring water.</p>
</div>
```

```code page.html#modify
<style>
  label {
    color: navy;
  }
</style>
<form>
  <label for="name">Name</label>
  <input id="name">
  <label for="year">Year</label>
  <input id="year">
</form>
<p>Bring a hat.</p>
<p>Bring water.</p>
```

```code page.html#sol-label
<style>
  label {
    color: navy;
    display: block;
  }
</style>
<form>
  <label for="name">Name</label>
  <input id="name">
  <label for="year">Year</label>
  <input id="year">
</form>
<p>Bring a hat.</p>
<p>Bring water.</p>
```

```code page.html#sol-div
<style>
  label {
    color: navy;
    display: block;
  }
  .packing {
    background-color: lightyellow;
  }
</style>
<form>
  <label for="name">Name</label>
  <input id="name">
  <label for="year">Year</label>
  <input id="year">
</form>
<div class="packing">
  <p>Bring a hat.</p>
  <p>Bring water.</p>
</div>
```

```code page.html#review
<style>
  .alert {
    color: crimson;
  }
  span, div {
    color: navy;
  }
</style>
<div>Bring a hat and water.</div>
<p>Races start at <span>9 am</span> sharp.</p>
```

```code page.html#sol-review
<style>
  .alert {
    color: crimson;
  }
  span, div {
    color: navy;
    font-size: 20px;
  }
</style>
<div class="alert">Bring a hat and water.</div>
<p>Races start at <span class="alert">9 am</span> sharp.</p>
```

```code page.html#make
<h1>Spring concert</h1>
<p>The concert is on Wednesday at 6 pm in the hall.</p>
<p>Tickets are free. Bring a friend!</p>
```

```code page.html#sol-make
<style>
  .highlight {
    background-color: lightyellow;
  }
</style>
<h1>Spring concert</h1>
<p>The concert is on <span class="highlight">Wednesday at 6 pm</span> in the hall.</p>
<p>Tickets are free. Bring a friend!</p>
```

```code page.html#explain-start
<style>
  .mark {
    background-color: gold;
  }
</style>
<p>Races start at <span class="mark">9 am</span> on the oval.</p>
<div class="mark">Bring a hat and water.</div>
```

```code page.html#explain
<style>
  .mark {
    background-color: gold;
  }
</style>
<p>Races start at <span class="mark">9 am</span> on the oval.</p>
<div class="mark">Bring a hat and water.</div>
```
