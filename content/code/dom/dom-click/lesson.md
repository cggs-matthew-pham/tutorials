---
order: 2
unit: page
introduces: [js-event]
assumes: [js-query, text-content, style-prop]
title: "Click events"
summary: "Run a function when someone clicks a button: addEventListener, and the difference between handing over a function and running it."
language: html
voice: { name: af_heart, speed: 1.1 }
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
  caption: "A click runs a function you hand to addEventListener"
  say: "A click runs a function you hand to add Event Listener."
  clip:
    - caption: "A heading to change, and a button to click."
    - type: {into: "HTML and JavaScript code", text: "<h1 id=\"message\">Ready?</h1>\n<button id=\"go\">Start</button>\n", append: true}
    - caption: "A function holds the change. Writing it does not run it."
    - type: {into: "HTML and JavaScript code", text: "<script>\n  const message = document.querySelector(\"#message\");\n  function start() {\n    message.textContent = \"Go!\";\n  }\n", append: true}
    - caption:
        text: "addEventListener says: when this button is clicked, run start. No brackets: we hand over the function, we do not run it."
        say: "add Event Listener runs start on a click. No brackets: we hand it over."
    - type: {into: "HTML and JavaScript code", text: "  document.querySelector(\"#go\").addEventListener(\"click\", start);\n</script>\n", append: true}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 750
    - caption: "Nothing has changed: the page is waiting for a click."
    - wait: 400
    - click: {selector: "#go", preview: true}
    - expect: {selector: "#message", contains: "Go!", preview: true}
    - caption: "The click ran start, and the heading changed."
    - wait: 750
hook: "A page that only changes when it loads is a poster. A page that changes when you click is an app."
---
Until now your script ran once, as the page loaded. To react to a click you give the button a **function** and say when to run it:

```js
button.addEventListener("click", start);
```

Read it as "when this button is clicked, run `start`". `"click"` is the **event**. The function after it is the **handler**.

**The hard part** is the brackets. `start` hands the function over to be run later, on each click. `start()` runs it **right now**, once, and hands over whatever it returned, so the click does nothing.

## Predict

```step
stage: predict
code: page.html#predict
check:
  type: predict
  q: "What does the heading say when the page first loads, before anyone clicks?"
  options: ["Ready?", "Go!", "Nothing", "An error"]
  actual: "Ready? The function start is only run when the button is clicked. Loading the page just tells the button what to do later."
```

Which line decides when `start` runs?

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 430 }
check: { type: reflect, text: "I clicked both buttons and saw the heading change each time." }
```

Press **Run**, then click **Start** and **Pause**. The heading changes only when you click.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "addEventListener hands a function to the browser to run later, on each event; writing the function name with brackets runs it now instead."
tasks:
  - check:
      type: match
      q: "Match each piece with what it does."
      pairs:
        - ["function start() { … }", "a recipe for the change: nothing happens until it is run"]
        - ["goButton.addEventListener(\"click\", start);", "when the button is clicked, run start"]
        - ["\"click\"", "the event: what the browser waits for"]
        - ["message.textContent = \"Go!\";", "the change itself, inside the handler"]
  - check:
      type: question
      q: "Which line makes start run on every click?"
      options: ["goButton.addEventListener(\"click\", start);", "function start() {", "const goButton = document.querySelector(\"#go\");", "message.textContent = \"Go!\";"]
      answer: 0
      explain: "The listener line tells the browser to run start on each click. The function on its own is just a recipe."
  - check:
      type: bug
      code: page.html#bug
      text: "This page says Go! as soon as it loads, and clicking does nothing. There is no red error. Click the line that is wrong."
      answer: 9
      fault: logic
      misconception: call-not-pass
      explain: "start() has brackets, so it runs at once, when the page loads. Hand the function over without brackets: addEventListener(\"click\", start)."
```

### Which part does what?

Match code with meaning.

### What makes it run?

One line decides.

### Spot the bug

No error, and nothing works.

## Modify

```step
stage: modify
insight: "Each button needs its own function and its own listener; a handler can change more than one thing."
try: { playground: dom, starter: "page.html#run", height: 430 }
tasks:
  - hint:
      - "A third button needs three things: the button in the HTML, a function, and a listener."
      - "Add `<button id=\"reset\">Reset</button>`, a function reset that puts back \"Ready?\", and resetButton.addEventListener(\"click\", reset)."
    expected: page.html#sol-reset
    check: { type: code, text: "Add a Reset button that puts the heading back to Ready?", rules: { contains: ["id=\"reset\"", "Ready?"] } }
  - hint:
      - "A handler can change more than one thing. What else about the heading can you change?"
      - "Add message.style.color = \"green\"; inside start, and another colour inside pause."
    expected: page.html#sol-colour
    check: { type: code, text: "Make Start turn the heading green and Pause make it orange.", rules: { contains: [".style.color"] } }
```

### A reset button

Back to the beginning.

### Colours

A handler can change two things.

## Make: buttons of your own

```step
stage: make
insight: "Goals only: at least two buttons that change different things, each with its own function."
try: { playground: dom, starter: "page.html#make", height: 430 }
check: { type: reflect, text: "I made a page with at least two buttons that each change something different." }
```

Start from the two buttons and make a page where each button changes something different: size, colour, words, or a picture. The page on this lesson makes a heading bigger, smaller or purple.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A page needs to count clicks. What does the handler need to keep between clicks?"
  options: ["A variable made outside the function", "A new variable made inside the function each time", "A second button", "Nothing: the browser counts"]
  answer: 0
  explain: "A variable made inside the function starts over each click. A variable made above it keeps its value. Lesson 6."
```

You can now run code on a click. Next: change how the **whole page looks** with classes.
