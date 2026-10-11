---
order: 5
unit: build
introduces: [vue-component, vue-props]
recipes: [style-attr]
title: "Components and props"
summary: "Make a tag of your own once with app.component, use it many times, and pass each copy its own data with props and :name=\"value\"."
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
  caption: "Make a tag once with a component; props give each copy its own data"
  clip:
    - caption: "An empty app."
    - wait: 800
    - caption: "A component: a tag of our own called player-card."
    - type: {into: "HTML and JavaScript code", text: "  app.component(\"player-card\", {\n    props: [\"name\"],\n    template: `<p>Player: {{ name }}</p>`\n  });\n", after: "createApp({});\n"}
    - caption: "Its prop, name, is the data each copy is given."
    - wait: 800
    - caption: "Use the tag twice, with a different name each time."
    - type: {into: "HTML and JavaScript code", text: "  <player-card name=\"Ada\"></player-card>\n  <player-card name=\"Sam\"></player-card>\n", after: "<div id=\"app\">\n"}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 600
    - expect: {selector: "#app", contains: "Player: Sam", preview: true}
    - caption: "Written once, used twice, each copy with its own name."
    - wait: 1000
hook: "A feed of posts, a shop of products and a ladder of players are each one card used many times, with different data."
---
A **component** is a tag of your own. You write it once, then use it as often as you like:

```js
app.component("player-card", {
  props: ["name", "wins"],
  template: `<div><h2>{{ name }}</h2><p>Wins: {{ wins }}</p></div>`
});
```

`props` lists the data each copy is given; the `template` (between back-ticks) is its HTML. Using it looks like any tag:

```html
<player-card v-for="p in players" :name="p.name" :wins="p.wins"></player-card>
```

The **colon** in `:name="p.name"` means "the value of": without it, the component is given the words `p.name`. Component names have a dash, and their tags need a closing tag.

The app is now made in three steps: `createApp(...)`, then `app.component(...)`, then `app.mount("#app")`.

## Predict

```step
stage: predict
code: page.html#predict
insight: "Students doubt that a made-up tag works at all; seeing three cards, each with its own name, shows that a component is a reusable tag and props give each copy its data."
check:
  type: predict
  q: "player-card is not an HTML tag. What does the page show?"
  options: ["Three boxes: Player: Ada, Player: Sam, Player: Lin", "Nothing: the browser does not know player-card", "Three boxes that all say Player: Ada", "One box with all three names"]
  actual: "Three boxes, each with its own name. Vue turns each player-card tag into the component's template, with that tag's name prop."
```

There is no tag called `player-card` in HTML. Vue has been told about one.

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 460 }
check: { type: reflect, text: "I changed one player's wins in the data and saw only their card change." }
```

Press **Run**. Change Sam's wins to 9 in the list and run again.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "app.component makes the tag; props are its inputs; :prop=\"value\" passes a value in, and v-for makes one copy per item."
tasks:
  - check:
      type: match
      q: "Match each part with what it does."
      pairs:
        - ["app.component(\"player-card\", { … })", "makes a new tag, player-card"]
        - ["props: [\"name\", \"wins\"]", "the data each copy is given"]
        - ["template: `…`", "the HTML each copy shows"]
        - [":wins=\"p.wins\"", "gives this copy the value of p.wins"]
        - ["v-for=\"p in players\"", "one player-card for each player"]
      explain: "The parent app holds the data and hands each card its part through props."
  - check:
      type: question
      q: "Inside the component, where do name and wins come from?"
      options: ["From the tag that uses it, through props", "From the players list directly", "From setup in the component", "From the browser"]
      answer: 0
      explain: "The card does not know about the list. Each copy is given its own name and wins by the tag that makes it."
  - check:
      type: bug
      code: page.html#bug
      text: "Each card says p.wins wins instead of a number. There is no error. Click the line that is wrong."
      answer: 2
      fault: logic
      misconception: vue-prop-colon
      explain: "wins=\"p.wins\" passes the words p.wins. :wins=\"p.wins\", with the colon, passes the value."
```

### Which part does what?

Component, props and template.

### Where does the data come from?

Follow it in.

### Spot the bug

Words instead of numbers.

## Modify

```step
stage: modify
insight: "Changing the template changes every copy; changing the data adds a copy."
try: { playground: dom, starter: "page.html#run", height: 460 }
tasks:
  - hint:
      - "The template is the HTML for every card. A v-if in it can use the wins prop."
      - "`<p v-if=\"wins >= 5\">🏅 Top player</p>` inside the template's div."
    expected: page.html#sol-medal
    check: { type: code, text: "Show 🏅 Top player on the cards of players with 5 or more wins.", rules: { contains: ["v-if"] } }
  - hint:
      - "Each card comes from one item in the players list."
      - "Add { name: \"Kai\", wins: 3 } to the list."
    expected: page.html#sol-kai
    check: { type: code, text: "Add Kai, with 3 wins, to the ladder.", rules: { contains: ["Kai"] } }
```

### A medal

Every card, one change.

### A new player

Data, not HTML.

## Make: pet cards

```step
stage: make
insight: "Goals only: a component of their own with two props, used with v-for."
try: { playground: dom, starter: "page.html#make", height: 460 }
check: { type: code, text: "Make a pet-card component with two props and show every pet with v-for.", rules: { contains: ["app.component(", "props:", "v-for"] } }
```

Make a **pet-card** component with two props (`name` and `kind`) and a template of your own design, then show every pet with `v-for`.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A to-do app has a box, an Add button, a list of tasks to tick off and a count of what is left. Which part would be a computed value?"
  options: ["The count of what is left", "The box", "The list of tasks", "The Add button"]
  answer: 0
  explain: "The count is worked out from the list. Next: the final challenge, a to-do app that uses everything in this course."
```

Next: **the final challenge**, a to-do app.
