---
order: 2
unit: text
moveId: nesting
introduces: [emphasis]
assumes: [heading, paragraph]
title: Tags inside tags
summary: Put one tag inside another, close the last one opened first, and find out that the browser guesses when you get it wrong.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8126
  url: http://127.0.0.1:8126/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: { ref: page.html#explain, boxes: true }
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "", boxes: 1, zoom: 1.7 }
  caption: "A tag can go inside another tag, and the last one opened closes first"
  clip:
    - caption: "<strong> marks important words. It goes inside the paragraph."
    - type: { into: HTML code, text: "<p>Bring <strong>a hat</strong> today.</p>\n" }
    - caption: "Another tag can go inside it. <em> stresses a word."
    - type: { into: HTML code, text: "<p>Bring <strong>a hat and <em>water</em></strong> today.</p>\n" }
    - expect: { selector: "#preview-text", contains: "water" }
    - caption: "Close the last tag you opened first: </em>, then </strong>, then </p>."
    - wait: 2000
hook: "A news page puts a link inside a headline inside a box inside a page. Tags inside tags are how every page is built."
---
Last lesson each tag stood on its own. A tag can also go **inside** another tag. Two new ones to try: `<strong>` marks important words (the browser makes them bold) and `<em>` marks stressed words (the browser slants them).

## Predict

```step
stage: predict
code: page.html#nest
insight: "Students expect an inner tag to replace the outer one, or not to work; a nested tag adds its look to the outer one."
check:
  type: predict
  q: "Which words will look both bold and slanted?"
  options:
    - "Only water"
    - "a hat, water and sunscreen"
    - "Only water, and it loses its bold: the inner tag replaces the outer one"
    - "None: a tag cannot go inside another tag"
  fault: logic
  misconception: inner-tag-replaces
  actual: "Only water. The <em> is inside the <strong>, so water gets both looks. a hat and sunscreen are only inside <strong>, so they are bold but not slanted."
```

Read the code. The `<em>` sits inside the `<strong>`. Which words will look both bold and slanted?

## Run

```step
stage: run
code: page.html#nest
try: { playground: html, starter: "page.html#nest", height: 360, boxes: true }
insight: "A tag inside a tag adds to it, and the tag opened last must close first."
check: { type: reflect, text: "I can say which closing tag comes first when one tag is inside another." }
```

Compare the page with your prediction. The Boxes view draws each tag as a box: `<em>` sits inside `<strong>`, which sits inside `<p>`. Then wrap the word `Friday` in `<em>` and `</em>` yourself.

| Code | What it does | Why |
|---|---|---|
| `<strong>a hat</strong>` | Marks important words | The tag says the words matter; the browser picks bold |
| `<em>water</em>` | Marks stressed words | The browser picks slanted text |
| `<strong>a hat, <em>water</em> and sunscreen</strong>` | One tag inside another | The tag opened last closes first, like boxes inside boxes: `</em>`, then `</strong>`, then `</p>` |
| `<strong>a <em>hat</strong></em>` | Tags that cross | No error message appears. The browser makes its best guess, which may not be what you meant, so check the page |
| `<!-- a note -->` | A comment | The browser ignores it, so it is a note to yourself in the code |

## Investigate

```step
stage: investigate
code: page.html#overlap
insight: "Nesting means the last tag opened closes first; when it does not, the browser guesses and says nothing."
tasks:
  - check:
      type: bug
      code: page.html#overlap
      answer: 3
      fault: syntax
      misconception: tag-overlap
      text: "Sam wants a hat and water bold, with water also slanted. The end of the paragraph looks wrong, but nothing reports an error. Click the line where the tags cross."
      explain: "Line 3 closes </strong> while <em> is still open, so the two tags overlap. The last tag opened must close first: </em>, then </strong>."
  - check:
      type: trace
      text: "The first paragraph is missing its </strong>. Fill in whether each line of text looks bold."
      table: |
        | text | bold? |
        | Bring a | no |
        | hat. | yes |
        | Wear sunscreen. | [yes] |
        | Races start at 9 am. | [yes] |
      fault: syntax
      misconception: html-error-message
      explain: "The browser shows no error. It closes the tag at the end of the paragraph, then opens it again in the next ones, so the bold carries on to the end of the page. A missing closing tag changes the page without any warning."
```

### Sam's notice

The tags cross in one line.

### No error message

A closing tag is missing from this page.

```html
<p>Bring a <strong>hat.</p>
<p>Wear sunscreen.</p>
<p>Races start at 9 am.</p>
```

## Modify

```step
stage: modify
insight: "Fixing the order of closing tags, then nesting two tags yourself."
try: { playground: html, starter: "page.html#modify", height: 360, boxes: true }
tasks:
  - hint:
      - "`<em>` was opened last, so it must close first."
      - "Swap the two closing tags after `water`: `</em></strong>`."
    check: { type: code, text: "Close the tags in the right order.", rules: { contains: ["water</em></strong>"] } }
    expected: page.html#sol-fix
  - hint:
      - "Put one tag outside and the other inside, and close them in the reverse order."
      - "Close them in reverse order."
    check: { type: code, text: "Make Friday both important and stressed.", rules: { contains: ["<strong><em>Friday</em></strong>"] } }
    expected: page.html#sol-both
```

### Fix the order

Swap the closing tags so the last one opened closes first.

### Both at once

Make the word `Friday` important and stressed, with `<strong>` outside and `<em>` inside.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 400, boxes: true }
hint:
  - "Pick the words that matter most and wrap them in `<strong>` and `</strong>`."
  - "Inside those words, wrap one word in `<em>` and `</em>`. Close `</em>` before `</strong>`."
  - "Turn on Boxes: every `<em>` box should sit fully inside a `<strong>` box."
check:
  type: code
  text: "Mark important words with <strong>, and one stressed word with <em> inside them."
  rules: { tags: [strong, em], contains: ["</em></strong>"] }
expected: page.html#sol-make
```

Finish this school trip notice. Mark the most important words with `<strong>`, and one word inside them with `<em>`, closing `</em>` right before `</strong>`.

```teacher
summary: Students put one tag inside another, close the last one opened first, and find out that the browser guesses silently when tags are missing or cross.
time: 40
timing: "Predict and Run 10 min · Investigate 12 min · Modify 8 min · Make 10 min"
goals:
  - I can put one tag inside another, such as <em> inside <strong>.
  - "I can close tags in the right order: the last one opened closes first."
  - I can explain that the browser shows no error for a wrong closing tag, only a best guess.
before: |
  Read the unit primer "HTML structure in 5 minutes" first, then do the Make task yourself in the playground (about 5 minutes).

  The idea: **nesting**. Tags go inside other tags like boxes inside boxes, so the tag opened last must be closed first. Turn on **Boxes** in the playground and every tag becomes a box, which shows the nesting.

  Unlike Python, HTML never stops with an error. A missing or crossed tag gives a page that looks wrong, and the browser says nothing.
running:
  - "Predict and Run: many students think only water changes, or that the inner tag cancels the outer one. Turn on Boxes and ask which boxes water sits in."
  - "Investigate: the crossing is on one line. Ask which tag was opened last and whether it closed first. The missing `</strong>` trace is the surprise: the bold runs on into the next paragraphs and no message appears."
  - "Modify and Make: one change at a time, check the page each time. In Boxes, a correct page has every box fully inside another."
stuck:
  - see: Everything after one word is bold or slanted.
    ask: Which closing tag is missing?
    fix: Add the missing </strong> or </em> straight after the words it should cover.
  - see: Bold and slanted words stop in the wrong places.
    ask: Which tag did you open last, and did it close first?
    fix: Close in reverse order of opening, </em> then </strong>.
  - see: A tag shows on the page as text.
    ask: Does it have both < and >, and a slash if it is a closing tag?
    fix: Every tag needs both brackets, and a closing tag needs the slash.
stretch: "Put <em> inside <strong> inside <p> inside nothing else, then draw the boxes on paper. Add a comment above each paragraph with <!-- -->."
support: "Give students the Modify starter and ask only for the first task: swap two closing tags. Use Boxes to show the boxes cross."
leads: "Next lesson adds CSS: a rule can style every tag of one kind at once, and nesting is what lets it colour just the important words. Class idea: show a news website with the page source open and spot tags inside tags."
exit:
  q: "A student writes <strong>Friday <em>night</strong></em>. What is wrong, and what will the browser say?"
  a: "The tags cross: <em> was opened last so </em> must come first. The browser says nothing; it makes a best guess and the page may look wrong."
explain: |
  The video and the picture show the same steps:

  1. `<strong>` marks important words and the browser makes them bold.
  2. `<em>` goes inside it and marks a stressed word, slanted.
  3. The tag opened last closes first: `</em>`, then `</strong>`, then `</p>`.
  4. If a tag is missing or crosses, the browser shows no error. It makes its best guess.

  In the picture, Boxes is on: `<em>` is a box inside the `<strong>` box, inside the `<p>` box. A comment, `<!-- a note -->`, is ignored by the browser.
solutions:
  step-4#t1: page.html#sol-fix
  step-4#t2: page.html#sol-both
  step-5: page.html#sol-make
struggle: "Closing tags in the right order. Turn on Boxes and ask which box is inside which, rather than correcting the tags."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner which words will look both bold and slanted.
        Hold up 1, 2, 3 or 4 fingers for your answer.
      notes: "Count the votes before anyone runs it. Ask the pairs who chose option 3 why they think the inner tag cancels the outer one."
    - at: investigate
      kind: activity
      title: Box it on paper
      minutes: 4
      do: |
        On paper, write <p>, <strong> and <em> for one sentence. Draw a box around each tag pair. Do any boxes cross?
      notes: "Boxes that cross are the bug. Ask which closing tag has to move so every box sits inside another."
```

```code page.html#nest
<h1>Sports day</h1>
<p>Bring <strong>a hat, <em>water</em> and sunscreen</strong> on Friday.</p>
```

```code page.html#overlap
<h1>Sports day</h1>
<p>Bring <strong>a hat and
<em>water</strong> on Friday</em>.</p>
```

```code page.html#modify
<h1>Sports day</h1>
<p>Bring <strong>a hat and <em>water</strong></em> on Friday.</p>
```

```code page.html#sol-fix
<h1>Sports day</h1>
<p>Bring <strong>a hat and <em>water</em></strong> on Friday.</p>
```

```code page.html#sol-both
<h1>Sports day</h1>
<p>Bring <strong>a hat and <em>water</em></strong> on <strong><em>Friday</em></strong>.</p>
```

```code page.html#make
<h1>School trip</h1>
<h2>When</h2>
<p>The trip is on Tuesday. The bus leaves at 8 am sharp.</p>
<h2>What to bring</h2>
<p>Bring lunch, a hat and a water bottle.</p>
```

```code page.html#sol-make
<h1>School trip</h1>
<h2>When</h2>
<p>The trip is on Tuesday. The bus leaves at <strong>8 am <em>sharp</em></strong>.</p>
<h2>What to bring</h2>
<p>Bring <strong>lunch</strong>, a hat and a <em>water</em> bottle.</p>
```

```code page.html#explain
<h1>Sports day</h1>
<p>Bring <strong>a hat and <em>water</em></strong> today.</p>
```
