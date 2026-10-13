---
order: 12
unit: parts
moveId: labelled-input
reviews: [id-target, class-pick]
introduces: [form, button]
assumes: [attribute, id]
title: Forms
summary: Build a form from linked labels, boxes and a button, and find out that a form collects answers but does nothing with them on its own.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8132
  url: http://127.0.0.1:8132/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: { ref: page.html#explain, boxes: true }
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "", zoom: 1.7 }
  caption: "A label links to its box by id, and a form does nothing alone"
  clip:
    - caption: "A <form> holds the boxes people type in."
    - type: { into: HTML code, text: "<form>\n", append: true }
    - caption:
        text: "A <p> puts the label and its box on their own line."
        say: "A p tag puts the label and its box on their own line."
    - type: { into: HTML code, text: "  <p><label for=\"name\">Name</label>\n", append: true }
    - caption:
        text: "The label's for matches the box's id. That link joins them."
        say: "The label's for matches the box's I D. That joins them."
    - type: { into: HTML code, text: "  <input id=\"name\" type=\"text\"></p>\n", append: true }
    - caption: "A <button> is for sending the answers."
    - type: { into: HTML code, text: "  <button>Send</button>\n</form>", append: true }
    - expect: { selector: "#preview-text", contains: "Send" }
    - caption: "But nothing is connected to it. Code behind a form does the work."
    - wait: 2000
hook: "Every sign-up, search box, quiz and online order starts as a form like this."
---
A **form** collects what people type. Each field is a **label** that says what to type and a box to type in, and a **button** is for sending the answers.

## Predict

```step
stage: predict
code: page.html#signup
insight: "Students assume a button sends or saves the answers by itself; committing to an answer first makes 'nothing happens' land."
check:
  type: predict
  q: "Someone types their name and presses Send. What happens?"
  options:
    - "The name is emailed to the club"
    - "The page shows Thank you"
    - "The name is saved in a list of members"
    - "Nothing: the form is not connected to anything yet"
  fault: logic
  misconception: form-sends-itself
  actual: "Nothing. A form collects what was typed, but sending or saving it needs code behind the form, and this page has none."
```

`<form>`, `<label>`, `<input>` and `<button>` are new. Read the code. What happens when someone presses Send?

## Run

```step
stage: run
code: page.html#signup
try: { playground: html, starter: "page.html#signup", height: 360 }
insight: "A form is only the front of something. A linked label puts the cursor in its box."
check: { type: reflect, text: "I can explain why pressing Send did nothing." }
```

Type a name and press **Send**: a note says nothing was sent. Then click the word **Name**: the cursor jumps into the box, because the label is linked to it.

| Code | What it does | Why |
|---|---|---|
| `<form> … </form>` | Holds the fields and the button | Everything people fill in goes inside one form |
| `<p>` around a label and its box | Puts them together on their own line | Each `<p>` starts a new line, as in the first lesson |
| `<label for="name">Name</label>` | The words that say what to type | `for` names the box this label belongs to |
| `<input id="name" type="text">` | A box to type in | Its `id` matches the label's `for`, so clicking the label finds this box. It has no closing tag, and `type` sets the kind of box |
| `<button>Send</button>` | A button to press | Pressing it only shows a note. Code behind the form would have to collect the answers and do something with them |

## Investigate

```step
stage: investigate
code: page.html#parts
picture: page.html#parts
insight: "Each part of a form has one job, and a label finds its box only when for matches id exactly."
unlocks: [label-and-input]
tasks:
  - check:
      type: match
      q: "Match each part with its job."
      pairs:
        - ["<form>", "holds the fields and the button"]
        - ["<label for=\"name\">", "the words that say what to type"]
        - ["<input id=\"name\">", "a box to type in"]
        - ["type=\"email\"", "the kind of box (an email address)"]
        - ["<select>", "a drop-down list of choices"]
        - ["<button>", "a button to press"]
      explain: "Labels and boxes come in pairs. type changes the kind of box: text, email, number. A select is a drop-down, with one option for each choice."
  - check:
      type: question
      q: "Clicking the word Email puts the cursor in the email box. What makes that work?"
      options: ["for=\"email\" on the label matches id=\"email\" on the box", "The label sits next to the box", "type=\"email\" on the box", "Both are inside the same <p>"]
      answer: 0
      fault: logic
      misconception: label-not-linked
      explain: "for on the label and id on the box must match exactly. Sitting next to each other, or in the same <p>, links nothing. The link also tells screen readers which words belong to which box."
  - check:
      type: bug
      code: page.html#broken
      answer: 5
      fault: logic
      misconception: label-not-linked
      text: "Clicking Name puts the cursor in its box, but clicking Email does nothing, and there is no error. Click the line that breaks the link."
      explain: "Line 5 has id=\"mail\", but the label says for=\"email\". They must match exactly: change the id to email."
```

The picture shows this form: each label and its box share a line, the drop-down is a list of choices, and the button is last.

### Match the parts

What does each part of the form do?

### Linked labels

What joins a label to its box?

### The label that does nothing

One label is not linked to its box. Test each label by clicking it.

## Modify

```step
stage: modify
insight: "Building a form field by field, each label linked to its box, and testing each link by clicking."
try: { playground: html, starter: "page.html#modify", height: 480 }
tasks:
  - hint:
      - "Copy the Name paragraph, then change the words, the `for`, the `id` and the `type`."
      - "`<label for=\"email\">Email</label>` and `<input id=\"email\" type=\"email\">`, inside their own `<p>`."
    check: { type: code, text: "Add an email box with a linked label.", rules: { contains: ["for=\"email\"", "id=\"email\"", "type=\"email\""] } }
    expected: page.html#sol-email
  - hint:
      - "A drop-down is a `<select>` with one `<option>` for each choice. Its label links to it the same way as the other fields."
      - "A `<label for=\"house\">`, then `<select id=\"house\">` with an `<option>` for each house, in their own `<p>`."
    check: { type: code, text: "Add a house drop-down with a linked label.", rules: { tags: [select, option], contains: ["for=\"house\"", "id=\"house\""] } }
    expected: page.html#sol-house
  - check: { type: reflect, text: "I clicked every label and the cursor went to the right box each time." }
```

### Add an email box

Add an email field with a label linked to it.

### Add a drop-down

Add a `House` drop-down (Owls, Hawks, Kestrels) with a linked label.

### Test every label

Click each label in the preview. If the cursor does not jump, compare its `for` with the box's `id`.

## Mix it up

```step
stage: investigate
code: page.html#review
try: { playground: html, starter: "page.html#review", height: 460 }
insight: "An id names one element, so two boxes with the same id send a label to the wrong one; a class colours only the elements that carry it."
check:
  type: code
  text: "Link Friend's name to its own box, and colour the Join button with a class."
  rules: { contains: ["id=\"friend\"", "class=\"join\"", ".join {", "background-color:"] }
expected: page.html#sol-review
hint:
  - "Click each label. Which box does the cursor go to?"
  - "Every id names one element. Give the second box the id its label asks for."
  - "To colour only the button, give it a class, then write a rule with a dot for that class."
```

Click each label in this sign-up form and see where the cursor goes. Fix what you find, then make the **Join** button stand out with a colour of your choice.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 500 }
hint:
  - "Plan the fields first: what does the club need to know?"
  - "Every label needs a `for` that matches its box's `id`, and each label and box goes in a `<p>`. Click each label to test it."
check:
  type: code
  text: "Make a sign-up form with linked labels, a drop-down and a button."
  rules: { tags: [form, p, label, input, select, option, button], contains: ["for=\""] }
expected: page.html#sol-make
```

Make a sign-up form for a school club or event: a heading, at least two labelled fields (one a drop-down), and a button. Click every label to check it is linked.

```teacher
summary: Students build a form from linked labels, boxes and a button, and find out that a form collects answers but does nothing with them on its own.
time: 45
timing: "Predict and Run 10 min · Investigate 12 min · Modify 10 min · Mix it up 5 min · Make 8 min"
goals:
  - I can link a label to its box with a matching for and id.
  - I can build a form with labels, boxes, a drop-down and a button.
  - I can explain why a form on its own sends nowhere.
before: |
  Read the unit primer "Parts of a page in 5 minutes", then do the Make task yourself (about 5 minutes).

  The surprise for students: pressing **Send** does nothing. The playground shows a note saying so. A form is only the front: code behind it (JavaScript in the page, or a program on a server) has to collect what was typed and do something with it. That gap is the doorway to the JavaScript courses later. A **label** is linked to its box when the label's `for` matches the box's `id`: clicking the label then puts the cursor in the box, and screen readers read the label aloud for that box.

  Each label and its box sit in a `<p>` so that every field starts on its own line. Making a form look like a card is Course B.
running:
  - "Predict: most students expect the form to send or save something. Nothing happens. Ask: what would have to exist for the name to reach the club?"
  - "Run: click the label to see the cursor jump. That is the visible sign of a linked label."
  - "Investigate: the match task names each part. Then test every label by clicking it; the broken one has `id=\"mail\"` where the label says `email`."
  - "Modify: one field at a time, clicking each new label to test it."
  - "Mix it up: two boxes share an id, so the Friend label finds the first box. This is the id lesson again, in a form."
stuck:
  - see: Clicking a label does nothing.
    ask: Does the label's for match the box's id exactly?
    fix: "Make them identical, for example for=\"email\" and id=\"email\"."
  - see: Two fields run together on one line.
    ask: Is each label and its box inside its own paragraph?
    fix: Wrap each label and its box in <p> and </p>.
  - see: The drop-down is empty or shows tags as text.
    ask: Is every choice between <option> and </option>, inside the select?
    fix: Put each choice in its own <option> inside <select> and </select>.
stretch: "Add a type=\"number\" box for age and a textarea for a message. Try type=\"date\" and type=\"color\" and see the boxes the browser builds."
support: "Give students the Modify starter and do the first task together: copy the name paragraph, then change four things (the words, for, id and type)."
leads: "Next is the Course A challenge: a club page with a jump-link menu, sections, a results table and a sign-up form. Course B lays the page out and styles the form as a card."
exit:
  q: "A sign-up form has a label Email and a box, but clicking Email does nothing. Give the likely cause and the fix."
  a: "The label's for does not match the box's id (or is missing). Make them the same, for example for=\"email\" and id=\"email\"."
explain: |
  The video and the picture show the same steps:

  1. A `<form>` holds the boxes people type in.
  2. A `<p>` puts a label and its box on their own line.
  3. The label's `for` matches the box's `id`, so clicking the label finds the box.
  4. A `<button>` is for sending the answers...
  5. ...but nothing is connected to it. Code behind a form does the work.

  A `<select>` with `<option>` items makes a drop-down list.
solutions:
  step-4#t1: page.html#sol-email
  step-4#t2: page.html#sol-house
  step-6: page.html#sol-make
struggle: "A form that does nothing, and labels linked by matching for and id. Let them click each label to test it, and ask which pair does not match."
class:
  activities:
    - at: predict
      kind: discussion
      title: Where does the name go?
      minutes: 3
      do: |
        With your partner, decide what happens to the name when someone presses Send.
        Hold up 1, 2, 3 or 4 fingers for your answer.
      notes: "Count the votes before running. Ask what would have to exist for the name to arrive anywhere: that is the code behind the form."
    - at: end
      kind: activity
      title: Click-test a neighbour's form
      minutes: 4
      do: |
        Swap forms with a partner. Click every label. For any that fail, say which `for` and `id` do not match.
      notes: "Listen for students who look at where the label sits instead of at the for and the id."
```

```code page.html#signup
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <button>Send</button>
</form>
```

```code page.html#parts
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <p><label for="email">Email</label>
  <input id="email" type="email"></p>
  <p><label for="house">House</label>
  <select id="house">
    <option>Owls</option>
    <option>Hawks</option>
  </select></p>
  <button>Send</button>
</form>
```

```code page.html#broken
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <p><label for="email">Email</label>
  <input id="mail" type="email"></p>
  <button>Send</button>
</form>
```

```code page.html#modify
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <button>Join</button>
</form>
```

```code page.html#sol-email
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <p><label for="email">Email</label>
  <input id="email" type="email"></p>
  <button>Join</button>
</form>
```

```code page.html#sol-house
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <p><label for="email">Email</label>
  <input id="email" type="email"></p>
  <p><label for="house">House</label>
  <select id="house">
    <option>Owls</option>
    <option>Hawks</option>
    <option>Kestrels</option>
  </select></p>
  <button>Join</button>
</form>
```

```code page.html#review
<style>
  h2 {
    color: navy;
  }
</style>
<h2>Bring a friend</h2>
<form>
  <p><label for="name">Your name</label>
  <input id="name" type="text"></p>
  <p><label for="friend">Friend's name</label>
  <input id="name" type="text"></p>
  <button>Join</button>
</form>
```

```code page.html#sol-review
<style>
  h2 {
    color: navy;
  }
  .join {
    background-color: gold;
  }
</style>
<h2>Bring a friend</h2>
<form>
  <p><label for="name">Your name</label>
  <input id="name" type="text"></p>
  <p><label for="friend">Friend's name</label>
  <input id="friend" type="text"></p>
  <button class="join">Join</button>
</form>
```

```code page.html#make
<!-- Your sign-up form: a heading, labelled fields (one of them a drop-down) and a button. -->
```

```code page.html#sol-make
<h2>Join the choir</h2>
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <p><label for="year">Year</label>
  <select id="year">
    <option>Year 7</option>
    <option>Year 8</option>
  </select></p>
  <p><label for="part">Voice part</label>
  <select id="part">
    <option>Soprano</option>
    <option>Alto</option>
    <option>Not sure yet</option>
  </select></p>
  <button>Join</button>
</form>
```

```code page.html#explain
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <button>Send</button>
</form>
```
