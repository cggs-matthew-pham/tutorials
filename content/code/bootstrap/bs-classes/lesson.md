---
order: 1
unit: parts
title: "Style by class names"
summary: "Link Bootstrap's stylesheet, then style buttons, text and messages by adding its class names instead of writing CSS."
language: html
introduces: [bootstrap]
voice: { name: af_heart, speed: 1.1 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8130
  url: http://127.0.0.1:8130/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: page.html#explain
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.6 }
  caption: "Link Bootstrap, then style by adding its class names"
  clip:
    - caption: "A plain page, with the browser's own button."
    - wait: 1400
    - caption: "Link Bootstrap's stylesheet: CSS that someone else wrote."
    - type: { into: HTML code, text: "<link rel=\"stylesheet\" href=\"bootstrap.min.css\">\n", after: "<!-- Bootstrap -->\n" }
    - caption: "Its rules apply at once: the heading's font changes."
    - wait: 1400
    - caption:
        text: "Now add its class names: btn for the shape, btn-primary for the colour."
        say: "Now add two class names: one for the shape, one for the colour."
    - type: { into: HTML code, text: " class=\"btn btn-primary\"", after: "<button" }
    - expect: { selector: "#preview-text", contains: "Join" }
    - caption: "No CSS of your own. The class names did the styling."
    - wait: 1800
hook: "Thousands of school, club and company websites use Bootstrap, so their buttons and forms look tidy on phones and computers without much CSS of their own."
---
You built every part of the club page with your own CSS. **Bootstrap** is a big stylesheet that someone else wrote, full of ready-made rules. You link it with one line, then style a tag by adding its **class names**:

```html
<link rel="stylesheet" href="bootstrap.min.css">
<button class="btn btn-primary">Join</button>
```

`bootstrap.min.css` sits beside the page here. On your own site, you download it from getbootstrap.com and put it beside your page.

## Predict

```step
stage: predict
code: page.html#predict
insight: "Students expect class names to need a rule they wrote; seeing the styled button appear shows that the linked stylesheet brought the rules."
check:
  type: predict
  q: "There is no CSS rule for btn anywhere in this code. How will the two buttons look?"
  options:
    - "The first is a blue Bootstrap button, the second a plain browser button"
    - "Both are plain browser buttons: nobody wrote a rule for btn"
    - "Both are blue Bootstrap buttons"
    - "The first one does not show"
  actual: "The first is a blue Bootstrap button. The rules for btn and btn-primary are in bootstrap.min.css, which the first line links. The second button has no class, so it keeps the browser's look."
```

The first line links Bootstrap. Neither button has a `<style>` rule of its own.

## Run

```step
stage: run
code: page.html#run
try: { playground: html, starter: "page.html#run", height: 420 }
insight: "One link brings a whole stylesheet; each class name switches on one of its rules."
check: { type: reflect, text: "I can point to the class name that makes each part of the page look the way it does." }
unlocks: [bootstrap-link, container, btn-button, alert, spacing-and-text-classes]
```

Compare with your prediction. Then delete the `<link>` line and watch everything go plain, though every class name is still there. Put it back.

## Investigate

```step
stage: investigate
code: page.html#run
picture: page.html#run
insight: "A Bootstrap look comes from a base class (btn, alert) plus a class that picks the colour or size; the names are fixed, so you look them up."
tasks:
  - check:
      type: match
      q: "Match each class name with what it does."
      pairs:
        - ["container", "a centred column with space at the sides"]
        - ["mt-3", "a space above (margin top, size 3)"]
        - ["lead", "a larger paragraph for the opening line"]
        - ["alert alert-warning", "a yellow message box"]
        - ["btn", "the button shape: padding, rounded corners, no border"]
        - ["btn-primary", "the button's colour: blue"]
      explain: "Most Bootstrap looks come in two parts: a base class for the shape (btn, alert) and a second class for the colour (btn-primary, alert-warning)."
  - check:
      type: question
      q: "You delete the <link> line. What happens to class=\"btn btn-primary\"?"
      options: ["It stays in the code but does nothing, so the button looks plain", "The browser shows an error", "The button disappears", "The button stays blue, because the class is still there"]
      answer: 0
      explain: "A class name is only a label. It looks like something only when a stylesheet has a rule for it, and the rules are in bootstrap.min.css."
  - check:
      type: bug
      code: page.html#bug
      text: "Join should be a blue Bootstrap button, but it looks like a plain browser button. There is no error. Click the line that is wrong."
      answer: 5
      fault: logic
      misconception: bs-modifier-alone
      explain: "btn-primary only picks the colour. The shape and the colour itself come with btn, so the button needs class=\"btn btn-primary\"."
```

### Which class does what?

Shape, colour and spacing.

### No link

What is a class name on its own?

### Spot the bug

One button is plain.

## Modify

```step
stage: modify
insight: "Changing a look is choosing a different class name from the set, not writing a new rule."
try: { playground: html, starter: "page.html#run", height: 420 }
tasks:
  - hint:
      - "Bootstrap names its colours: primary, secondary, success, danger, warning, info."
      - "Swap btn-primary for btn-success, and add btn-lg for a large button. Keep btn."
    expected: page.html#sol-colour
    check: { type: code, text: "Make Join a large green button.", rules: { contains: ["btn-success", "btn-lg"] } }
  - hint:
      - "There is already a yellow alert. A red one has the same base class with a different colour class."
      - "A div with class=\"alert alert-danger\" under the heading."
    expected: page.html#sol-alert
    check: { type: code, text: "Add a red alert under the heading: The tournament is full.", rules: { contains: ["alert-danger"] } }
```

Look the names up in the **Reference** drawer: Bootstrap's class names are fixed, so nobody remembers them all.

### Green and large

Choose different classes.

### A red alert

Same base class, new colour.

## Make: a notice for your own event

```step
stage: make
insight: "Goals only: a whole page styled by class names, with no CSS of its own."
try: { playground: html, starter: "page.html#make", height: 420 }
check: { type: code, text: "Style the notice with Bootstrap: a container, a lead paragraph, an alert and two buttons.", rules: { contains: ["class=\"container", "lead", "alert alert-", "btn btn-"] } }
```

A concert, a bake sale, a match: use a **container**, a **lead** paragraph, an **alert** and two **buttons** in different colours. No `<style>` block: Bootstrap's classes only.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your club page had about 40 lines of CSS for the menu, cards and form. With Bootstrap, where does that CSS live?"
  options: ["In bootstrap.min.css, which someone else wrote; the page only names its classes", "Nowhere: Bootstrap pages need no CSS", "In the class names themselves", "In the browser"]
  answer: 0
  explain: "The CSS still exists, thousands of lines of it. You borrow it by name. Next: the navbar, cards and grid, the club page's parts rebuilt."
```

Next: the club page's **navbar, cards and grid**, rebuilt with Bootstrap.
