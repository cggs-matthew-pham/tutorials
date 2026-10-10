---
order: 9
unit: components
title: Forms
summary: Build a form from labels, input boxes, a drop-down and a button, link each label to its box, and find out what a form does on its own.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8132
  url: http://127.0.0.1:8132/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 40
explainPicture: page.html#explain
voice: true
explainClip:
  query: { code: "", zoom: 1.6 }
  caption: "A form is labels, boxes and a button, with nothing behind it yet"
  clip:
    - caption: "<form> holds the fields and the button."
    - type: { into: HTML code, text: "<form>\n", append: true }
    - caption:
        text: "A label says what to type. for=\"name\" links it to the box with id=\"name\"."
        say: "A label says what to type and links to its box by I D."
    - type: { into: HTML code, text: "  <label for=\"name\">Name</label>\n", append: true }
    - caption: "<input> is the box to type in. It has no closing tag."
    - type: { into: HTML code, text: "  <input id=\"name\" type=\"text\">\n", append: true }
    - caption: "A button sends the form..."
    - type: { into: HTML code, text: "  <button>Send</button>\n</form>", append: true }
    - expect: { selector: "#preview-text", contains: "Send" }
    - caption:
        text: "...but nothing is connected to it yet. Code behind a form does the work."
        say: "But nothing is connected to it yet. Code behind the form does the work."
    - wait: 2500
hook: "Every sign-up, search box, quiz and online order starts as a form like this."
---
A **form** collects what people type. Every field has a **label** that says what to type, and a box to type in.

## Predict

```step
stage: predict
code: page.html#signup
insight: "Students assume forms send themselves somewhere; discovering that nothing happens sets up why code is needed behind a page."
check:
  type: predict
  q: "Someone types their name and presses Send. What happens?"
  options:
    - "The name is emailed to the club"
    - "The page shows Thank you"
    - "Nothing: the form is not connected to anything yet"
    - "An error message"
  actual: "Nothing. A form on its own sends nowhere: code behind it has to collect what was typed and do something with it."
```

`<form>`, `<label>`, `<input>` and `<button>` are new. Read the code. What happens when someone presses Send?

## Run

```step
stage: run
code: page.html#signup
try: { playground: html, starter: "page.html#signup", height: 360 }
insight: "A form is the front of something; the code behind it is missing. A linked label puts the cursor in its box."
check: { type: reflect, text: "I can explain why pressing Send did nothing." }
unlocks: [form, label-and-input]
```

Type a name and press **Send**: a note explains that nothing was sent. Then click the word **Name**: the cursor jumps into the box, because the label is linked to it.

## Investigate

```step
stage: investigate
code: page.html#parts
picture: page.html#parts
insight: "Each part of a form has one job, and a label links to its box when for matches id."
unlocks: [select-drop-down, button]
tasks:
  - check:
      type: match
      q: "Match each part with its job."
      pairs:
        - ["<form>", "holds the fields and the button"]
        - ["<label for=\"name\">", "the words that say what to type"]
        - ["<input id=\"name\">", "a box to type in"]
        - ["type=\"email\"", "the kind of box (an email address)"]
        - ["<select>", "a drop-down list of options"]
        - ["<button>", "sends the form"]
      explain: "Labels and boxes come in pairs. type changes the kind of box: text, email, number. A select is a drop-down with one option to choose."
  - check:
      type: question
      q: "Clicking the word Email puts the cursor in the email box. What makes that work?"
      options: ["for=\"email\" on the label matches id=\"email\" on the box", "The label sits next to the box", "type=\"email\"", "The form does it for every label"]
      answer: 0
      explain: "for on the label and id on the box must match exactly. That link also tells screen readers which words belong to which box."
  - check:
      type: bug
      code: page.html#broken
      answer: 5
      fault: logic
      misconception: label-not-linked
      text: "Clicking Name puts the cursor in its box, but clicking Email does nothing, and there is no error. Click the box whose id does not match its label."
      explain: "Line 5 has id=\"mail\", but the label says for=\"email\". They must match exactly: change the id to email."
  - picture: page.html#combos
    check:
      type: question
      q: "In this form, why does each label sit on its own line?"
      options: ["label { display: block; } makes each label a block box", "Labels always start a new line", "The form has padding", "The boxes push the labels down"]
      answer: 0
      explain: "Labels and inputs are inline, so they sit in a line of text. display: block makes each label a block box, which starts a new line, like a paragraph. The form itself is styled like a card."
```

The picture shows this form with no styling: labels, boxes, a drop-down and a button, all in one line of text.

### Match the parts

What does each part of the form do?

### Linked labels

Click a label to test it.

### The label that does nothing

One label is not linked to its box.

### A form as a card

A form is a box like any other: padding, a border and a width make it a card. `display: block;` puts each label on its own line.

```html
<style>
  .signup {
    width: 240px;
    padding: 16px;
    border: 2px solid teal;
  }
  label {
    display: block;
    margin-top: 8px;
  }
</style>
```

## Modify

```step
stage: modify
insight: "Building a form field by field, each label linked to its box, then styling it as a card."
try: { playground: html, starter: "page.html#modify", height: 480 }
tasks:
  - hint:
      - "Copy the Name label and input, then change the words, the for, the id and the type."
      - "`<label for=\"email\">Email</label>` and `<input id=\"email\" type=\"email\">`"
    check: { type: code, text: "Add an email box with a linked label.", rules: { contains: ["for=\"email\"", "id=\"email\"", "type=\"email\""] } }
    expected: page.html#sol-email
  - hint:
      - "A `<label for=\"house\">`, then `<select id=\"house\">` with an `<option>` for each house."
    check: { type: code, text: "Add a house drop-down with a linked label.", rules: { tags: [select, option], contains: ["for=\"house\"", "id=\"house\""] } }
    expected: page.html#sol-house
  - hint:
      - "Give the form a class: `<form class=\"signup\">`."
      - "Then a `.signup` rule with a width, padding and a border."
    check: { type: code, text: "Style the form as a card.", rules: { contains: ["class=\"signup\"", ".signup {", "padding:"] } }
    expected: page.html#sol-card
  - hint: "A `label` rule with `display: block;` and a little `margin-top`."
    check: { type: code, text: "Put each label on its own line.", rules: { contains: ["label {", "display: block;"] } }
    expected: page.html#sol-labels
```

### Add an email box

Add an email field with a label linked to it.

### Add a drop-down

Add a `House` drop-down (Owls, Hawks, Kestrels) with a linked label.

### Make it a card

Give the form the class `signup`, and style it with a width, padding and a border.

### One field per line

Put each label on its own line.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 500 }
hint:
  - "Plan the fields first: what does the club need to know?"
  - "Every label needs a `for` that matches its box's `id`. Click each label to test it."
check:
  type: code
  text: "Make a sign-up form with linked labels, a drop-down and a button."
  rules: { tags: [form, label, input, select, button], contains: ["for=\""] }
expected: page.html#sol-make
```

Make a sign-up form for a school club or event: a heading, at least two labelled fields (one a drop-down), and a button, styled as a card. Click every label to check it is linked.

## Fix the sign-up form

```step
stage: modify
try: { playground: html, starter: "page.html#fix", height: 480 }
insight: "A real form with three faults: a label with no for, a mismatched id, and a button outside the form."
expected: page.html#sol-fix
```

This sign-up form has three problems. Clicking `Name` does nothing (its label has no `for`). Clicking `Email` does nothing either (check the box's `id`). And the button is outside the form, so pressing it does nothing at all. Fix all three.
