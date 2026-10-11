---
order: 5
unit: build
introduces: [create-element, append-element]
assumes: [input-value, js-event, text-content]
title: "Building a list"
summary: "Make new elements with createElement and add them to the page, so a list can grow, one click at a time."
language: html
voice: { name: af_heart, speed: 1.1 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-dom" 8131
  url: http://127.0.0.1:8131/index.html
  ready: HTML and JavaScript code
  layout: full
pacing:
  keyDelayMs: 30
explainPicture: page.html#run
explainClip:
  query: {code: "", zoom: 1.4}
  caption: "createElement makes an element, and append puts it on the page"
  say: "create Element makes an element, and append puts it on the page."
  clip:
    - caption: "An empty list on the page, and an array of items in the script."
    - type: {into: "HTML and JavaScript code", text: "<ul id=\"list\"></ul>\n<script>\n  const items = [\"apples\", \"bread\", \"milk\"];\n  const list = document.querySelector(\"#list\");\n", append: true}
    - caption:
        text: "For each item: make a new li, give it the item as text, and add it to the list."
        say: "For each item: make an L I, give it the text, and add it."
    - type: {into: "HTML and JavaScript code", text: "  for (const item of items) {\n    const li = document.createElement(\"li\");\n    li.textContent = item;\n    list.append(li);\n  }\n</script>\n", append: true}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 750
    - caption: "Three items in the array, three bullet points on the page."
    - wait: 750
hook: "A feed, a shopping basket and a chat are all lists that grow: the code makes a new element and puts it on the page."
---
A page changes only when your code changes it. To add a line to a list you do three things:

```js
const li = document.createElement("li");   // make a new <li>
li.textContent = "milk";                   // give it text
list.append(li);                           // put it into the list
```

`createElement("li")` makes an element that is **not on the page yet**. `append` is what puts it there. `li.remove()` takes one off again.

**The hard part** is the difference between a list in your script (an array) and the list people see. Pushing to an array changes nothing on the page: the page only changes when you make or remove elements.

## Predict

```step
stage: predict
code: page.html#predict
check:
  type: predict
  q: "How many bullet points does the page show?"
  options: ["3", "1", "0", "4"]
  actual: "3. The loop runs once for each of the three items. Each time it makes a new li, gives it the item as text, and appends it to the list."
```

How many times does the loop run, and what happens each time?

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 430 }
check: { type: reflect, text: "I added several items to the list with the box and button." }
```

Press **Run**. Type something and click **Add**: each click makes a new `<li>` and puts it on the page.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "A new element is made with createElement and only appears once it is appended; changing an array does not change the page, so update both."
tasks:
  - check:
      type: match
      q: "Match each line with what it does."
      pairs:
        - ["document.createElement(\"li\")", "makes a new li that is not on the page yet"]
        - ["li.textContent = input.value;", "gives the new li the typed words"]
        - ["list.append(li);", "puts the li at the end of the list on the page"]
        - ["input.value = \"\";", "empties the box ready for the next item"]
  - check:
      type: question
      q: "What makes the new item appear on the page?"
      options: ["list.append(li)", "document.createElement(\"li\")", "li.textContent = …", "input.value = \"\""]
      answer: 0
      explain: "createElement only makes the element, in memory. append puts it into the page; before that, nobody can see it."
  - check:
      type: bug
      code: page.html#bug
      text: "Clicking Add changes nothing on the page, and there is no red error. Click the line that is the problem."
      answer: 8
      fault: logic
      misconception: list-is-live
      explain: "items.push changes the array in the script only. The page changes when the code makes an li and appends it to the list."
```

### Which line does what?

Match code with meaning.

### What shows it?

Made is not the same as shown.

### Spot the bug

The array grows, but the page does not.

## Modify

```step
stage: modify
insight: "A handler can be added to every new element, and an if with return stops a handler early."
try: { playground: dom, starter: "page.html#run", height: 430 }
tasks:
  - hint:
      - "Each new li can have its own listener, made at the same time as the li."
      - "Inside the Add handler, li.addEventListener(\"click\", function () { li.remove(); });"
    expected: page.html#sol-remove
    check: { type: code, text: "Click an item to remove it.", rules: { contains: [".remove("] } }
  - hint:
      - "Check the box before you make anything."
      - "if (input.value === \"\") { return; } at the top of the handler stops an empty item."
    expected: page.html#sol-notempty
    check: { type: code, text: "Do not add an item when the box is empty.", rules: { contains: ["if (", "return"] } }
```

### Click to remove

Each li gets its own listener.

### No empty items

Stop early.

## Make: a list of your own

```step
stage: make
insight: "Goals only: a list that grows from what someone types, with one more feature of your own."
try: { playground: dom, starter: "page.html#make", height: 430 }
check: { type: reflect, text: "I made a list that grows from what someone types, and added a feature of my own." }
```

Make a list of your own that grows as someone types: a shopping list, a homework tracker, a playlist, a scoreboard. Add **one more feature**: remove on click, a counter of items, a limit. The page on this lesson counts tasks left.

## Where this leads

```step
stage: info
check:
  type: question
  q: "You want your page to keep a score that goes up as you click. Where must the score variable be made?"
  options: ["Above the function, so it keeps its value between clicks", "Inside the function, so it is fresh each time", "In the HTML", "Inside the loop"]
  answer: 0
  explain: "A variable made inside a handler starts over on each click. One made above it keeps its value. Next lesson."
```

You can now grow a page. Next: a page that **keeps a score** between clicks.
