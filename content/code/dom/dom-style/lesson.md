---
order: 3
unit: page
introduces: [class-list]
assumes: [js-event, style-prop, class-selector]
title: "Classes and themes"
summary: "Switch a whole look on and off with classList.toggle, so CSS does the styling and JavaScript only flips a class."
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-dom" 8131
  url: http://127.0.0.1:8131/index.html
  ready: HTML and JavaScript code
  layout: full
pacing:
  keyDelayMs: 12
explainPicture: page.html#run
explainClip:
  query: {code: "", zoom: 1.4}
  caption: "JavaScript flips a class, and CSS changes the look"
  clip:
    - caption: "CSS decides what the dark look is. It is only a class."
    - type: {into: "HTML and JavaScript code", text: "<style>\n  .dark { background: midnightblue; color: white; }\n</style>\n<h1>Night mode</h1>\n<button id=\"theme\">Switch theme</button>\n", append: true}
    - caption: "The script only has to add or remove that class. toggle adds it if missing, and removes it if there."
    - type: {into: "HTML and JavaScript code", text: "<script>\n  document.querySelector(\"#theme\").addEventListener(\"click\", function () {\n    document.body.classList.toggle(\"dark\");\n  });\n</script>\n", append: true}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 1500
    - click: {selector: "#theme", preview: true}
    - wait: 1000
    - caption: "One click added the class dark to the body, and the CSS did the rest."
    - click: {selector: "#theme", preview: true}
    - wait: 1000
    - caption: "Another click removed it. The names go in classList without a dot."
    - wait: 1200
hook: "Dark mode, open menus and highlighted rows are all the same trick: JavaScript adds or removes a class, and CSS does the rest."
---
You already know CSS: a **class** such as `.dark` says how something looks. JavaScript can switch a class on and off:

```js
document.body.classList.toggle("dark");
```

`toggle` adds the class if the element has not got it, and removes it if it has. `add("dark")` and `remove("dark")` do one or the other. In `classList`, the class name is written **without the dot**.

This is the neatest way to change a look: the CSS stays in `<style>`, and JavaScript only decides **when**.

**The hard part** is the dot. In CSS the rule is `.dark`, but `classList.toggle(".dark")` makes a class actually called `.dark` that nothing styles, so nothing happens and there is no error.

## Predict

```step
stage: predict
code: page.html#predict
check:
  type: predict
  q: "What happens the first time the button is clicked?"
  options: ["The page goes dark", "Nothing: the class dark does not exist yet", "The button disappears", "The page reloads"]
  actual: "The page goes dark. The CSS already has a .dark rule. toggle adds the class dark to the body, and the rule applies."
```

Where does the dark look come from: the script or the style?

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 430 }
check: { type: reflect, text: "I toggled the dark theme and the tip, and each button flipped its own class." }
```

Press **Run**. One button flips `dark` on the body; the other flips `hidden` on the tip. Click each one twice.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "classList.toggle switches a CSS class on and off; the look lives in the CSS, and the script only decides when. The class name goes in quotes without the dot."
tasks:
  - check:
      type: match
      q: "Match each piece with what it does."
      pairs:
        - [".dark { background: midnightblue; }", "CSS: what the dark look is"]
        - ["document.body.classList.toggle(\"dark\");", "adds dark to the body if missing, removes it if there"]
        - ["classList.add(\"dark\")", "adds the class, even if it is already there"]
        - ["classList.remove(\"dark\")", "takes the class away"]
  - check:
      type: question
      q: "Why is hidden good for a tip that starts out of sight?"
      options: ["The CSS rule .hidden { display: none; } hides it, and removing the class shows it", "JavaScript deletes the tip", "The tip is made when clicked", "hidden is a special word in JavaScript"]
      answer: 0
      explain: "The class hidden has a CSS rule that hides the element. The tip is always in the page; toggling the class shows or hides it."
  - check:
      type: bug
      code: page.html#bug
      text: "Clicking the button does nothing, and there is no red error. Click the line that is wrong."
      answer: 11
      fault: logic
      misconception: class-dot
      explain: "classList takes the plain class name: toggle(\"dark\"). With the dot, it toggles a class called \".dark\", which no CSS rule matches."
```

### Which part does what?

CSS, add, remove and toggle.

### Why a class?

What hides the tip.

### Spot the bug

Nothing happens, and nothing is wrong... except one dot.

## Modify

```step
stage: modify
insight: "A new look is a new class in the CSS and one classList line; add and remove give you separate buttons."
try: { playground: dom, starter: "page.html#run", height: 430 }
tasks:
  - hint:
      - "The CSS already has a class called big. Which element should get it?"
      - "Give the heading an id, add a button, and toggle big on the heading with classList."
    expected: page.html#sol-big
    check: { type: code, text: "Add a button that toggles the class big on the heading.", rules: { contains: ["classList", "big"] } }
  - hint:
      - "toggle flips; add and remove do one job each."
      - "Make a Light button that removes dark and a Dark button that adds it."
    expected: page.html#sol-two
    try: { playground: dom, starter: "page.html#sol-big", height: 430 }
    check: { type: code, text: "Replace the one toggle button with a Light button and a Dark button.", rules: { contains: ["classList.add", "classList.remove"] } }
```

### A bigger heading

Reuse a class.

### Two buttons

add and remove.

## Make: your own themes

```step
stage: make
insight: "Goals only: at least two classes in the CSS, each switched with classList by its own button."
try: { playground: dom, starter: "page.html#make", height: 430 }
check: { type: reflect, text: "I made a page with my own CSS classes, switched with classList by buttons." }
```

Write **two or more classes** of your own in the CSS (an ocean theme, spaced-out letters, a card style, something hidden), and give each its own button. The page on this lesson uses three.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A page needs to show a different message depending on what someone typed. What does the script need to read?"
  options: ["The value of the input", "The class of the input", "The tag name of the input", "The id of the button"]
  answer: 0
  explain: "An input holds what the person typed in its value. Next lesson."
```

You can now change a whole page with one line. Next: **read what someone types**.
