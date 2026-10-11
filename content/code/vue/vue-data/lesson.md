---
order: 1
unit: data
introduces: [vue-app, vue-ref, vue-text]
recipes: [vue-on]
title: "Data on the page"
summary: "Make a Vue app, keep data in refs, show it on the page with {{ }}, and see the page change by itself when the data changes."
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
  caption: "Change the data, and Vue changes the page"
  clip:
    - caption: "The page shows the score in double curly brackets."
    - type: {into: "HTML and JavaScript code", text: "<div id=\"app\">\n  <p>Score: {{ score }}</p>\n  <button @click=\"score++\">Add a point</button>\n</div>\n", append: true}
    - caption: {text: "Load Vue, the file beside the page.", say: "Load view, the file beside the page."}
    - type: {into: "HTML and JavaScript code", text: "<script src=\"vue.js\"></script>\n<script>\n  const { createApp, ref } = Vue;\n", append: true}
    - caption: "The score is a ref: data that Vue watches."
    - type: {into: "HTML and JavaScript code", text: "  createApp({\n    setup() {\n      const score = ref(0);\n      return { score };\n    }\n  }).mount(\"#app\");\n</script>\n", append: true}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 300
    - click: {selector: "button", preview: true}
    - click: {selector: "button", preview: true}
    - click: {selector: "button", preview: true}
    - expect: {selector: "p", contains: "Score: 3", preview: true}
    - caption: "Each click changes the score; the page follows."
    - wait: 300
hook: "Apps like a basket, a chat or a scoreboard show data that keeps changing. Vue keeps the page in step with it for you."
---
In the DOM course, changing the page took two jobs: change the variable, then put it on the page with `textContent`. Vue does the second job for you:

```html
<p>Score: {{ score }}</p>
```

`{{ score }}` shows the data and keeps it up to date. The data lives in the app's `setup`, made with `ref` so that Vue **watches** it:

```js
const score = ref(0);
return { score };        // the names the page can use
```

`@click="score++"` on the button changes the score when it is clicked. Copy it for now; lesson 3 is all about events.

The console says you are running a **development build** of Vue: the version with extra warnings to help you. You can ignore that line.

## Predict

```step
stage: predict
code: page.html#predict
insight: "Students who learned textContent expect the page to stay at 0; seeing it follow the data is the whole idea of Vue."
check:
  type: predict
  q: "You click Add a point three times. What does the page show?"
  options: ["Score: 3", "Score: 0, because no line sets the text", "Score: {{ score }}", "Score: 111"]
  actual: "Score: 3. Each click changes score, and Vue changes every {{ score }} on the page to match."
```

There is no `textContent` anywhere in this code.

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 420 }
check: { type: reflect, text: "I clicked the button and saw the page follow the score." }
```

Press **Run** and click the button. Then change `"Quiz night"` to another title and run again.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "createApp looks after everything inside #app; ref makes data Vue watches; setup returns the names the page can use; {{ }} shows them and keeps them up to date."
tasks:
  - check:
      type: match
      q: "Match each part with what it does."
      pairs:
        - ["createApp({ … }).mount(\"#app\")", "Vue looks after everything inside the #app div"]
        - ["const score = ref(0);", "data that Vue watches, starting at 0"]
        - ["return { title, score };", "the names the page can use"]
        - ["{{ score }}", "shows the data, and keeps it up to date"]
        - ["@click=\"score++\"", "changes the data when the button is clicked"]
      explain: "Data in setup, the page in #app. Change the data, and Vue changes the page."
  - check:
      type: question
      q: "In the DOM course, which line would this page also need?"
      options: ["scoreEl.textContent = score;", "const score = ref(0);", "createApp(…)", "None: it would need fewer lines"]
      answer: 0
      explain: "Without Vue you change the variable, then put it on the page yourself. Vue does the second job."
  - check:
      type: bug
      code: page.html#bug
      text: "The page shows Score: 0, and clicking does nothing. There is no red error. Click the line that is wrong."
      answer: 11
      fault: logic
      misconception: vue-plain-variable
      explain: "let score = 0 is a plain variable, so Vue does not watch it. The click changes it, but Vue never knows. Make it with ref(0)."
```

### Which part does what?

Data, names and the page.

### Without Vue

What would you have to write?

### Spot the bug

The score never moves.

## Modify

```step
stage: modify
insight: "New data is a ref returned from setup; the page can show it anywhere with {{ }}."
try: { playground: dom, starter: "page.html#run", height: 420 }
tasks:
  - hint:
      - "A second button can change the same data the other way."
      - "Copy the button and change score++ to score--."
    expected: page.html#sol-minus
    check: { type: code, text: "Add a Take a point button.", rules: { contains: ["score--"] } }
  - hint:
      - "New data needs three things: a ref in setup, its name in the return, and {{ }} on the page."
      - "`const team = ref(\"Owls\");` then `return { title, team, score };` then `<p>Team: {{ team }}</p>`"
    expected: page.html#sol-team
    check: { type: code, text: "Show a team name, kept in a ref called team.", rules: { contains: ["team = ref(", "{{ team }}"] } }
```

### Take a point

The other direction.

### A team name

New data, start to finish.

## Make: a counter of your own

```step
stage: make
insight: "Goals only: two refs, shown with {{ }}, each changed by a button."
try: { playground: dom, starter: "page.html#make", height: 420 }
check: { type: code, text: "Show two pieces of data with {{ }}, each with a button that changes it.", rules: { contains: ["ref(", "{{", "@click"] } }
```

Lives and level, likes and dislikes, goals for two teams: make **two refs**, return them, show them with `{{ }}`, and give each a button.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your page needs to show a list of players, one line each. What would you rather write?"
  options: ["One line that says: one <li> for each player", "One <li> for each player by hand", "createElement in a loop, as in the DOM course", "A bigger {{ }}"]
  answer: 0
  explain: "Next lesson: v-for makes a tag for each item in a list, and keeps it in step as the list changes."
```

Next: **lists and choices**, with `v-for` and `v-if`.
