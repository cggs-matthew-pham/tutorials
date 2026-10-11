---
order: 2
unit: data
introduces: [vue-for, vue-if]
title: "Lists and choices: v-for and v-if"
summary: "Make one tag for each item in a list with v-for, show a tag only when it is needed with v-if, and watch both keep up as the list changes."
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
  query: {code: "@page.html#explain-start", zoom: 1.4}
  caption: "v-for makes a tag for each item, and keeps it in step with the list"
  clip:
    - caption: "The data is a list of three players. The page is empty."
    - wait: 1200
    - caption: "v-for on the li: one li for each name in the list."
    - type: {into: "HTML and JavaScript code", text: "  <ul>\n    <li v-for=\"name in players\">{{ name }}</li>\n  </ul>\n", after: "<div id=\"app\">\n"}
    - caption: "A button adds Kai to the list."
    - type: {into: "HTML and JavaScript code", text: "  <button @click=\"players.push('Kai')\">Add Kai</button>\n", after: "</ul>\n"}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 600
    - caption: "Three names, three li tags."
    - wait: 600
    - click: {selector: "button", preview: true}
    - expect: {selector: "ul", contains: "Kai", preview: true}
    - caption: "Change the list, and Vue adds the li for you."
    - wait: 1000
hook: "A chat, a playlist and a search page are all lists that change. v-for keeps the page in step with the list."
---
In the DOM course, a list on the page took a loop, `createElement` and `append`, and the page changed only when you made or removed elements. In Vue you write the tag **once**:

```html
<li v-for="name in players">{{ name }}</li>
```

`v-for` makes one `<li>` for each item in `players`, with `name` standing for the item each time. Change the list, and Vue adds or removes `<li>` tags to match.

`v-if` shows a tag only while something is true:

```html
<p v-if="players.length === 0">No players yet.</p>
```

## Predict

```step
stage: predict
code: page.html#predict
insight: "Students from the DOM course expect a changed array not to change the page; in Vue it does, which is the point of v-for."
check:
  type: predict
  q: "You click Add Kai once. How many names are on the page?"
  options: ["4", "3: changing the array does not change the page", "1", "6"]
  actual: "4. push adds Kai to players, and v-for makes an li for every item, so a fourth li appears."
```

In the DOM course, pushing to an array did not change the page. What about here?

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 440 }
check: { type: reflect, text: "I emptied the list and saw the No players yet message appear." }
```

Press **Run**. Add Kai, then remove players until none are left, and watch the message.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "v-for repeats the tag it is on, once per item; v-if adds or removes its tag as its condition changes; both follow the data."
tasks:
  - check:
      type: trace
      text: "Start with Ada, Sam and Lin. Fill in the page after each click."
      table: |
        | after | li tags on the page | No players yet shows? |
        | the start | 3 | no |
        | Add Kai | [4] | [no] |
        | Remove the last, four times | [0] | [yes] |
        | Add Kai | [1] | [no] |
      explain: "The page always matches the list: one li per item, and the message only while the list is empty."
  - check:
      type: match
      q: "Match each part with what it does."
      pairs:
        - ["v-for=\"name in players\"", "makes this tag once for each item"]
        - ["{{ name }}", "the item for this copy of the tag"]
        - ["v-if=\"players.length === 0\"", "shows this tag only while the list is empty"]
        - ["players.push('Kai')", "adds an item to the end of the list"]
      explain: "v-for and v-if go on the tag they control. The data decides how many copies there are and whether the tag shows."
  - check:
      type: bug
      code: page.html#bug
      text: "The page shows three separate lists, each with one name. There is no error. Click the line that is wrong."
      answer: 2
      fault: logic
      misconception: vue-for-parent
      explain: "v-for repeats the tag it is written on. On the ul, it makes three lists. Put it on the li: one list, three items."
```

### Trace the page

Count the tags.

### Which part does what?

v-for, v-if and the item.

### Spot the bug

Three lists instead of one.

## Modify

```step
stage: modify
insight: "A new button changes the list; a new v-if reacts to a new condition."
try: { playground: dom, starter: "page.html#run", height: 440 }
tasks:
  - hint:
      - "Emptying the list means giving players a new, empty list."
      - "`<button @click=\"players = []\">Clear</button>`"
    expected: page.html#sol-clear
    check: { type: code, text: "Add a Clear button that empties the list.", rules: { contains: ["Clear"] } }
  - hint:
      - "A second v-if can look for a different number."
      - "`<p v-if=\"players.length >= 5\">Team full!</p>`"
    expected: page.html#sol-full
    check: { type: code, text: "Show Team full! when there are 5 or more players.", rules: { contains: ["Team full"] } }
```

### Clear the list

One button, an empty list.

### Team full

A second v-if.

## Make: a playlist

```step
stage: make
insight: "Goals only: a v-for list, a v-if message, and buttons that change the list."
try: { playground: dom, starter: "page.html#make", height: 440 }
check: { type: code, text: "Show the songs with v-for, a message with v-if when there are none, and buttons that change the list.", rules: { contains: ["v-for", "v-if", "@click"] } }
```

Show the **songs** as a list with `v-for`, a message with `v-if` when there are none, and buttons that **add** a song and **remove** one (`push`, `pop`, or `shift`, which takes the first).

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your team page should add whatever name someone types, not always Kai. What does it need?"
  options: ["A box joined to some data, and a function that adds it", "A longer v-for", "A second list", "A v-if on the button"]
  answer: 0
  explain: "Next lesson: v-model joins a box to data, and a function in setup does the adding."
```

Next: **events and inputs**: functions on clicks, and boxes joined to data.
