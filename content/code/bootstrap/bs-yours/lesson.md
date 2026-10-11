---
order: 3
unit: parts
title: "Make Bootstrap yours"
summary: "Put your own CSS after the Bootstrap link so your rules win, compare Bootstrap with the page you built by hand, and meet the other ways of styling: Bulma, Tailwind, daisyUI and Pico."
language: html
recipes: [script]
voice: { name: af_heart, speed: 1.1 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8130
  url: http://127.0.0.1:8130/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 40
explainPicture: page.html#explain
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.6 }
  caption: "Your own rules go after the Bootstrap link, so they win"
  clip:
    - caption: "A Bootstrap card, with Bootstrap's grey border."
    - wait: 1400
    - caption: "Your style block comes after the link."
    - wait: 1000
    - caption: "A rule for the same class: a thicker teal border."
    - type: { into: HTML code, text: "  .card { border: 2px solid teal; }\n", after: "<style>\n" }
    - caption: "Both rules match the card, and the later one wins: yours."
    - wait: 1400
    - caption: "One more rule, and the title is teal too."
    - type: { into: HTML code, text: "  .card-title { color: teal; }\n", after: "teal; }\n" }
    - expect: { selector: "#preview-text", contains: "Beginners" }
    - caption: "Bootstrap gives the shapes. Your rules give the look."
    - wait: 1800
hook: "Big sites often start from a framework, then add their own colours and fonts so they don't look like everyone else."
---
A Bootstrap page looks like every other Bootstrap page until you add rules of your own. When your rule and Bootstrap's match the same tag equally, **the later one wins**. So the order is:

```html
<link rel="stylesheet" href="bootstrap.min.css">   <!-- Bootstrap first -->
<style>
  .card { border: 2px solid teal; }                 /* then yours */
</style>
```

## Predict

```step
stage: predict
code: page.html#predict
insight: "Students often think a framework's rules always win, or that theirs always do; predicting this case sets up the rule that order decides."
check:
  type: predict
  q: "Bootstrap gives every card a thin grey border. What border will this card have?"
  options:
    - "Teal"
    - "Grey: Bootstrap's rules always win"
    - "Both, one inside the other"
    - "No border at all"
  actual: "Teal. Both rules match the card, and yours comes after the link, so it wins."
```

Both rules are for `.card`. Which one comes later?

## Run

```step
stage: run
code: page.html#run
try: { playground: html, starter: "page.html#run", height: 440 }
insight: "Own rules after the link change Bootstrap's look; the parts and the grid stay Bootstrap's."
check: { type: reflect, text: "I can say which parts of the page come from Bootstrap and which from my own rules." }
```

Compare with your prediction. Then move the whole `<style>` block above the `<link>` line and watch what changes. Put it back.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "Order decides between equal rules; and Bootstrap and hand-built CSS each suit some pages better."
tasks:
  - check:
      type: sort
      q: "Which way of making the page suits each job better?"
      options: ["Bootstrap", "Your own CSS"]
      items:
        - ["A tidy sign-up page in ten minutes", "Bootstrap"]
        - ["Buttons, cards and forms that all match", "Bootstrap"]
        - ["A page that works well on a phone without extra work", "Bootstrap"]
        - ["A page that does not look like every other site", "Your own CSS"]
        - ["Knowing what every rule on your page does", "Your own CSS"]
        - ["A tiny page with one heading (no 230 KB file to load)", "Your own CSS"]
      explain: "Neither is better everywhere. Bootstrap is quick and consistent; your own CSS is lighter and looks like nobody else's. Many sites use both: Bootstrap for the parts, their own rules for the look."
  - check:
      type: bug
      code: page.html#bug
      text: "The heading should be teal, but it is black. There is no error. Click the line that is in the wrong place."
      answer: 4
      fault: logic
      misconception: bs-order
      explain: "Bootstrap's rule for h1 comes after yours, so it wins. Move the link line to the top, above the style block."
```

### Bootstrap or by hand?

Sort the jobs.

### Spot the bug

The heading stays black.

## Other frameworks

```step
stage: investigate
insight: "Frameworks differ in one big way: component classes (one name for the whole button), utility classes (one class per CSS property), or no classes at all."
tasks:
  - picture: page.html#fw-bulma
    check:
      type: question
      q: "Bulma's button is class=\"button is-primary\". How is it like Bootstrap's btn btn-primary?"
      options: ["A base class for the shape and a second class for the colour", "It needs a style block", "It uses one class per CSS property", "It has no classes"]
      answer: 0
      explain: "Bulma works the same way as Bootstrap with different names: button for the shape, is-primary for the colour."
  - picture: page.html#fw-tailwind
    check:
      type: match
      q: "Tailwind has no ready-made button. Match each of its classes with the one CSS property it sets."
      pairs:
        - ["bg-blue-600", "background-color: a blue"]
        - ["text-white", "color: white"]
        - ["px-4", "padding left and right"]
        - ["py-2", "padding top and bottom"]
        - ["rounded-lg", "border-radius"]
      explain: "Tailwind's classes are utilities: each one is a single CSS property. You build the button's look from them, right in the HTML."
  - picture: page.html#fw-daisy
    check:
      type: sort
      q: "Sort the frameworks by how they style a button."
      options: ["A class for the whole button", "A class for each property", "No classes: plain tags are styled"]
      items:
        - ["Bootstrap: btn btn-primary", "A class for the whole button"]
        - ["Bulma: button is-primary", "A class for the whole button"]
        - ["daisyUI: btn btn-primary (on top of Tailwind)", "A class for the whole button"]
        - ["Tailwind: bg-blue-600 text-white px-4 py-2", "A class for each property"]
        - ["Pico: just <button>", "No classes: plain tags are styled"]
      explain: "daisyUI adds Bootstrap-style names on top of Tailwind; Pico styles plain tags, so the page has no classes at all."
```

The same **Join** button in other frameworks. Each page links a different stylesheet; Tailwind uses a script that writes the CSS for the classes the page uses (here, its version for trying things out).

### Bulma

Same idea, new names.

```html
<link rel="stylesheet" href="bulma.min.css">
<button class="button is-primary">Join</button>
```

### Tailwind

One class, one property.

```html
<script src="tailwind.js"></script>
<button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Join</button>
```

### Sort them

daisyUI (in the picture) puts whole-part names on top of Tailwind. Pico needs no class at all.

```html
<link rel="stylesheet" href="daisyui.css">
<script src="tailwind.js"></script>
<button class="btn btn-primary">Join</button>
```

```html
<link rel="stylesheet" href="pico.classless.min.css">
<button>Join</button>
```

## Modify

```step
stage: modify
insight: "Own rules change one thing each; swapping the link line swaps the whole framework, and the class names with it."
try: { playground: html, starter: "page.html#run", height: 440 }
tasks:
  - hint:
      - "The club's name has the class navbar-brand. A rule for that class, in your style block."
      - ".navbar-brand { color: white; font-weight: bold; } after the other rules."
    expected: page.html#sol-brand
    check: { type: code, text: "Make the club's name in the navbar white and bold.", rules: { contains: [".navbar-brand {"] } }
  - hint:
      - "Bootstrap rounds a card's corners with border-radius. Your .card rule can set it again."
      - "Add border-radius: 0; to the .card rule."
    expected: page.html#sol-corners
    check: { type: code, text: "Give the cards square corners.", rules: { contains: ["border-radius"] } }
  - starter: "page.html#fw-bulma"
    hint:
      - "Bulma's colour classes start with is-: is-primary, is-success, is-danger. Sizes too."
      - "class=\"button is-success is-large\""
    expected: page.html#sol-bulma
    check: { type: code, text: "In Bulma, make the button green and large.", rules: { contains: ["is-success", "is-large"] } }
```

### The club's name

A rule for one more class.

### Square corners

Change one of Bootstrap's choices.

### Try Bulma

Its own class names.

## Make: your own look

```step
stage: make
insight: "Goals only: Bootstrap's parts with a look that belongs to the student's club."
try: { playground: html, starter: "page.html#make", height: 440 }
check: { type: code, text: "Add your own style block after the link that changes at least three things.", rules: { contains: ["</style>"] } }
```

Make the page look like **your** club: at least three rules of your own, after the link (colours, a font, borders, the navbar). Keep Bootstrap's parts and grid. Finished early? Rebuild one card in Bulma or Tailwind.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Bootstrap's class names make a page look a certain way. What makes a page do things when people click?"
  options: ["JavaScript, as in the DOM course", "More Bootstrap classes", "A second stylesheet", "The navbar"]
  answer: 0
  explain: "Frameworks for the look are CSS. To make a page react, you need JavaScript: the DOM course, then Vue, a framework for that."
```

You can now build pages from ready-made parts and make them your own. The **DOM** course makes pages react; **Vue** then does for JavaScript what Bootstrap does for CSS.
