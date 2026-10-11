---
order: 4
unit: build
introduces: [input-value]
assumes: [js-event, text-content, js-query]
title: "Inputs"
summary: "Read what someone types with .value, react as they type, and turn text into a number with Number()."
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
  caption: ".value is what the person typed, and it is always text"
  say: "Dot value is what the person typed, and it is always text."
  clip:
    - caption: "An input box, a button, and a place for the answer."
    - type: {into: "HTML and JavaScript code", text: "<input id=\"name\" placeholder=\"Your name\">\n<button id=\"greet\">Greet</button>\n<p id=\"out\"></p>\n", append: true}
    - caption:
        text: "nameBox.value is whatever is typed in the box right now."
        say: "name Box dot value is whatever is typed in the box right now."
    - type: {into: "HTML and JavaScript code", text: "<script>\n  const nameBox = document.querySelector(\"#name\");\n  const out = document.querySelector(\"#out\");\n  document.querySelector(\"#greet\").addEventListener(\"click\", function () {\n    out.textContent = \"Hello, \" + nameBox.value + \"!\";\n  });\n</script>\n", append: true}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 750
    - caption: "Type a name, then click Greet."
    - wait: 750
hook: "Search boxes, sign-up forms and calculators all do the same two things: read what you typed, and answer."
---
An input box has a **value**: whatever is typed in it right now. Read it inside a handler:

```js
out.textContent = "Hello, " + nameBox.value + "!";
```

Two events are useful: `"click"` on a button, and `"input"` on the box itself, which fires on **every keystroke**.

**The hard part** is that `.value` is always **text**, even when someone types a number. `"4" + "5"` is `"45"`, not 9. Turn it into a number first: `Number(a.value)`.

## Predict

```step
stage: predict
code: page.html#predict
check:
  type: predict
  q: "You type Sam in the box and click Greet. What does the paragraph say?"
  options: ["Hello, Sam!", "Hello, nameBox.value!", "Hello, !", "Nothing: a script cannot read a box"]
  actual: "Hello, Sam! nameBox.value is read at the moment of the click, and + joins the three pieces of text."
```

When is `nameBox.value` read: when the page loads, or when the button is clicked?

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 430 }
check: { type: reflect, text: "I typed in the box and watched the character count change on every keystroke." }
```

Press **Run**, then type in the box. The count changes on every keystroke, because the listener is on the `"input"` event.

## Investigate

```step
stage: investigate
code: page.html#run
insight: ".value is the text typed so far, and an input event fires on every keystroke; because it is text, turn it into a number with Number() before doing sums."
tasks:
  - check:
      type: match
      q: "Match each piece with what it does."
      pairs:
        - ["msg.addEventListener(\"input\", …)", "runs on every keystroke in the box"]
        - ["msg.value", "the text in the box right now"]
        - ["msg.value.length", "how many characters are in the box"]
        - ["Number(a.value)", "turns the typed text into a number"]
  - check:
      type: question
      q: "Someone types 4 and 5 in two boxes, and you write a.value + b.value. What do you get?"
      options: ["\"45\", because the values are text", "9", "An error", "0"]
      answer: 0
      explain: "The value of an input is always text, so + joins the two pieces of text: \"4\" + \"5\" is \"45\". Number(a.value) + Number(b.value) is 9."
  - check:
      type: bug
      code: page.html#bug
      text: "The page shows 45 instead of 9. There is no red error. Click the line that is wrong."
      answer: 9
      fault: logic
      misconception: value-is-text
      explain: "a.value and b.value are text, so + joins them. Turn each into a number first: Number(a.value) + Number(b.value)."
```

### Which part does what?

Match code with meaning.

### 4 and 5

What + does to text.

### Spot the bug

The sum is wrong, and nothing complains.

## Modify

```step
stage: modify
insight: "Number() turns typed text into a number so sums work; an if inside the handler reacts to what was typed."
try: { playground: dom, starter: "page.html#run", height: 430 }
tasks:
  - hint:
      - "The page is adding text. What does + do with text?"
      - "Wrap each value in Number(...): Number(a.value) + Number(b.value)."
    expected: page.html#sol-add
    try: { playground: dom, starter: "page.html#bug", height: 430 }
    check: { type: code, text: "Make the Add button show 9 for 4 + 5.", rules: { contains: ["Number("] } }
  - hint:
      - "An if inside the handler can look at how many characters there are."
      - "Add a paragraph for the warning, and if (msg.value.length > 20) { … } to fill it."
    expected: page.html#sol-limit
    check: { type: code, text: "Show Too long! in red when the message has more than 20 characters.", rules: { contains: ["if (", "20"] } }
```

### Make Add add

Numbers, not text.

### A length limit

Decide as they type.

## Make: a calculator of your own

```step
stage: make
insight: "Goals only: read an input, turn it into a number, work something out and show it on the page."
try: { playground: dom, starter: "page.html#make", height: 430 }
check: { type: reflect, text: "I made a calculator or converter that reads a box, uses Number(), and shows the answer." }
```

Make a small tool that reads a **number** from a box and shows an answer: a tip calculator, a temperature converter (°C to °F), an age-in-days counter, a unit converter. Check for a bad number with `isNaN(...)`, as the page on this lesson does.

## Where this leads

```step
stage: info
check:
  type: question
  q: "You want to add a new line to a list every time someone clicks Add. What must your code make?"
  options: ["A new element, then put it into the page", "A new variable called list", "A new input", "A new class"]
  answer: 0
  explain: "The page only changes when your code changes it. To add a line, make a new element and add it to the list. Next lesson."
```

You can now read what people type. Next: **build a list on the page**.
