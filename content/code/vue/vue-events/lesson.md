---
order: 3
unit: data
introduces: [vue-on, vue-model]
assumes: [input-value]
title: "Events and inputs"
summary: "Run a function of your own when something is clicked, join a box to data with v-model, and change a ref's .value in the script."
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
  caption: "A function in setup changes the data; in the script, the value is in .value"
  clip:
    - caption: "A score, made with ref."
    - wait: 400
    - caption: {text: "A function in setup adds a point to score.value.", say: "A function in setup adds a point to score dot value."}
    - type: {into: "HTML and JavaScript code", text: "      function addPoint() {\n        score.value++;\n      }\n", after: "const score = ref(0);\n"}
    - type: {into: "HTML and JavaScript code", text: ", addPoint", after: "return { score"}
    - caption: "The button runs the function."
    - type: {into: "HTML and JavaScript code", text: "  <button @click=\"addPoint\">Add a point</button>\n", after: "</p>\n"}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 600
    - click: {selector: "button", preview: true}
    - click: {selector: "button", preview: true}
    - expect: {selector: "p", contains: "Score: 2", preview: true}
    - caption: "Page: score. Script: score.value."
    - wait: 300
hook: "Every sign-up form, search box and Add button is an event and some data. Vue joins them up for you."
---
Two new pieces join the page to the data.

**Events:** `@click="addPlayer"` runs a function when the button is clicked. The function lives in `setup` and is returned like the data:

```js
function addPlayer() {
  players.value.push(newName.value);
  newName.value = "";
}
return { players, newName, addPlayer };
```

**Inputs:** `v-model="newName"` joins a box to a ref, both ways: typing changes the data, and changing the data changes the box. No `.value` of the box and no `"input"` event, as in the DOM course.

**The hard part:** on the page you write `newName`; in the script you write `newName.value`. A ref is a box, and in the script you open it yourself.

## Predict

```step
stage: predict
code: page.html#predict
insight: "Students from the DOM course expect to need an input event; seeing the paragraph follow each letter shows that v-model joins box and data."
check:
  type: predict
  q: "You clear the box and type Kai. What does the paragraph show while you type?"
  options: ["It changes with every letter, ending Hello, Kai!", "Hello, friend! until you press Enter", "Hello, friend! all along: nothing listens to the box", "Hello, {{ name }}!"]
  actual: "It changes with every letter. v-model puts what you type into name straight away, and {{ name }} shows it."
```

There is no event and no `.value` here, only `v-model`.

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 440 }
check: { type: reflect, text: "I added two names and saw the box empty itself after each one." }
```

Press **Run**, type a name and press **Add**. Then press Add with the box empty: nothing happens, because of the `if`.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "v-model joins box and data both ways; @click runs a returned function; in the script a ref's value is in .value."
tasks:
  - check:
      type: match
      q: "Match each part with what it does."
      pairs:
        - ["v-model=\"newName\"", "joins the box and newName, both ways"]
        - ["@click=\"addPlayer\"", "runs addPlayer when the button is clicked"]
        - ["players.value.push(newName.value);", "adds the typed name to the list"]
        - ["newName.value = \"\";", "empties the data, and so the box"]
        - ["return { players, newName, addPlayer };", "lets the page use the data and the function"]
      explain: "Setting newName.value to empty text also empties the box: v-model works in both directions."
  - check:
      type: question
      q: "Why does the function write newName.value, but the page writes newName?"
      options: ["The page opens refs for you; in the script you open them yourself with .value", "They are two different variables", ".value is only for inputs", "It is a mistake: both should be the same"]
      answer: 0
      explain: "newName is a ref, a box Vue watches. The page unwraps it for you; the script reaches the value inside with .value."
  - check:
      type: bug
      code: page.html#bug
      text: "Clicking Add a point shows a red error, and the score stays at 0. Click the line that is wrong."
      answer: 13
      fault: runtime
      misconception: vue-value-in-script
      explain: "score is a ref, made with const. score++ tries to change the box itself. The number is score.value, so write score.value++."
```

### Which part does what?

Box, button and function.

### Two ways to write it

The page and the script.

### Spot the bug

The score will not change.

## Modify

```step
stage: modify
insight: "A new function is written in setup, returned, and named in @click; a new box is one v-model on a new ref."
try: { playground: dom, starter: "page.html#run", height: 440 }
tasks:
  - hint:
      - "A function in setup, returned, and a button that names it."
      - "`function reset() { players.value = [\"Ada\", \"Sam\"]; newName.value = \"\"; }` then add reset to the return, and `<button @click=\"reset\">Reset</button>`."
    expected: page.html#sol-reset
    check: { type: code, text: "Add a Reset button that puts the list back to Ada and Sam.", rules: { contains: ["function reset", "@click=\"reset\""] } }
  - hint:
      - "A new box needs a new ref, returned, and v-model on the box."
      - "`const club = ref(\"Chess\");`, club in the return, `<input v-model=\"club\">`, and `{{ club }}` in the heading."
    expected: page.html#sol-club
    check: { type: code, text: "Add a box for the club's name, and show it in the heading.", rules: { contains: ["v-model=\"club\"", "{{ club }}"] } }
```

### Reset

A function of your own.

### The club's name

A second box.

## Make: a badge maker

```step
stage: make
insight: "Goals only: boxes joined with v-model, the result shown with {{ }}, and a button that runs a function which changes .value."
try: { playground: dom, starter: "page.html#make", height: 440 }
check: { type: code, text: "Make boxes with v-model, show them on a badge, and add a button that runs a function of your own.", rules: { contains: ["v-model", "function", "@click"] } }
```

Make a **name badge**: boxes for a name and a role joined with `v-model`, the badge shown with `{{ }}` in a bordered box, and a button that runs a function (make the name shout in capitals with `toUpperCase()`, or swap the two).

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your page should show how many players there are, and say Team full at 5. Where should the count come from?"
  options: ["Worked out from the list, so it is always right", "A second ref you change by hand in every function", "Counted by the page", "Typed in a box"]
  answer: 0
  explain: "A value worked out from other data should be worked out again whenever that data changes. Next: computed."
```

Next: **values worked out from data**, with `computed`.
