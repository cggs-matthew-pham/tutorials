---
order: 6
unit: build
assumes: [js-event, text-content, input-value]
title: "A page that keeps score"
summary: "Keep a number between clicks in a variable made above the handler, and use an if to decide when something happens."
language: html
voice: { name: af_heart, speed: 1.1 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-dom" 8131
  url: http://127.0.0.1:8131/index.html
  ready: HTML and JavaScript code
  layout: full
pacing:
  keyDelayMs: 6
explainPicture: page.html#run
explainClip:
  query: {code: "", zoom: 1.4}
  caption: "A variable made above the handler keeps its value from click to click"
  clip:
    - caption: "The number on the page, and a button to raise it."
    - type: {into: "HTML and JavaScript code", text: "<p>Clicks: <span id=\"count\">0</span></p>\n<button id=\"click\">Click me</button>\n", append: true}
    - caption: "clicks is made above the handler, so it keeps its value between clicks."
    - type: {into: "HTML and JavaScript code", text: "<script>\n  let clicks = 0;\n  const countEl = document.querySelector(\"#count\");\n", append: true}
    - caption: "Each click: add one to clicks, then show it on the page."
    - type: {into: "HTML and JavaScript code", text: "  document.querySelector(\"#click\").addEventListener(\"click\", function () {\n    clicks = clicks + 1;\n    countEl.textContent = clicks;\n  });\n</script>\n", append: true}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 400
    - click: {selector: "#click", preview: true}
    - click: {selector: "#click", preview: true}
    - click: {selector: "#click", preview: true}
    - expect: {selector: "#count", contains: "3", preview: true}
    - caption: "Three clicks, and the variable remembered each one."
    - wait: 750
hook: "A score, a basket count and a \"5 likes\" all work the same way: a variable that lives between clicks."
---
A page can **remember** things in variables, as your p5 sketches did. The rule is where you make them:

```js
let clicks = 0;                       // made once, above the handler
button.addEventListener("click", function () {
  clicks = clicks + 1;                // changed on every click
  countEl.textContent = clicks;       // shown on the page
});
```

A variable made **above** the handler keeps its value between clicks. One made **inside** is made again on each click, so it starts over.

An `if` inside the handler decides when something happens, such as winning at 10.

**The hard part** is seeing that the number on the page is not the memory. The variable remembers; the page only shows it. Change the variable, then show it.

## Predict

```step
stage: predict
code: page.html#predict
check:
  type: predict
  q: "After 3 clicks, what does the page show?"
  options: ["Clicks: 3", "Clicks: 0", "Clicks: 1", "Clicks: 111"]
  actual: "Clicks: 3. clicks is made once, above the handler. Each click adds 1 to the same variable, and the page shows the new value."
```

Is `clicks` made once, or on every click?

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 430 }
check: { type: reflect, text: "I clicked ten times and won, and I saw the button stop working." }
```

Press **Run** and click the button ten times. The `if` inside the handler decides when you win, and `button.disabled = true` stops the button.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "A variable made above the handler remembers between clicks, a variable made inside starts over; the page only shows the variable, so change it first, then show it."
tasks:
  - check:
      type: match
      q: "Match each line with what it does."
      pairs:
        - ["let clicks = 0;", "makes the memory, once, above the handler"]
        - ["clicks = clicks + 1;", "changes the memory on every click"]
        - ["countEl.textContent = clicks;", "shows the memory on the page"]
        - ["if (clicks >= 10) { … }", "decides when to win"]
  - check:
      type: question
      q: "Why does the code change clicks first and then set the text?"
      options: ["The page only shows what the variable says, so the variable must change first", "JavaScript needs variables to be first", "The text would not change otherwise", "It is quicker"]
      answer: 0
      explain: "The page does not know about clicks. It shows whatever you put in it. Change the variable, then put the new value on the page."
  - check:
      type: bug
      code: page.html#bug
      text: "The page shows 1 on every click and never goes higher. There is no red error. Click the line that is wrong."
      answer: 6
      fault: logic
      misconception: state-in-handler
      explain: "let clicks = 0 is inside the handler, so each click makes a new clicks that starts at 0. Make it above the handler, once."
```

### Which line does what?

Memory, change and show.

### Variable first

The page is only a picture.

### Spot the bug

The count never gets past 1.

## Modify

```step
stage: modify
insight: "Reset puts the variable and the page back; a second if reacts to a different number."
try: { playground: dom, starter: "page.html#run", height: 430 }
tasks:
  - hint:
      - "A reset button needs to put back everything the game changed."
      - "Set clicks back to 0, show it on the page, and also put the message and the button back."
    expected: page.html#sol-reset
    check: { type: code, text: "Add a Reset button that starts the game again.", rules: { contains: ["clicks = 0"] } }
  - hint:
      - "The game already has one if. A second if can look for a different number."
      - "if (clicks === 5) { message.textContent = \"Halfway there!\"; } inside the handler."
    expected: page.html#sol-great
    check: { type: code, text: "Show Halfway there! when the count reaches 5.", rules: { contains: ["if (", "5"] } }
```

### Reset

Put everything back.

### Halfway

A second if.

## Make: a clicker game of your own

```step
stage: make
insight: "Goals only: a score that keeps its value, a goal, and a message when you win or lose."
try: { playground: dom, starter: "page.html#make", height: 430 }
check: { type: reflect, text: "I made a game with a score, a goal, and a message at the end." }
```

Make a small game: click a moving star, press as fast as you can, guess a number. It needs a **score variable** made above the handler, a **goal or a time limit**, and a **message** when you win or lose. The page on this lesson moves a star and stops after 10 seconds, using `setInterval`.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your quiz needs a list of questions, a score and a click handler. What does the quiz keep in variables?"
  options: ["The current question number and the score", "The text of the page", "The buttons", "The CSS"]
  answer: 0
  explain: "The quiz is a list of data plus a little memory: which question it is on, and how many were right. Next: the final challenge."
```

You can now keep a score. Next: **the final challenge**, a quiz page.
