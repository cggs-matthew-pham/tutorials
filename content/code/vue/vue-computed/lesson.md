---
order: 4
unit: build
introduces: [vue-computed]
title: "Values worked out from data: computed"
summary: "Work a value out from other data with computed, so it is worked out again whenever that data changes, and see why a plain calculation goes stale."
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
  caption: "computed works a value out again whenever the data it uses changes"
  clip:
    - caption: "Two adults, twelve dollars each."
    - wait: 1000
    - caption: "The total is worked out from adults, with computed."
    - type: {into: "HTML and JavaScript code", text: "      const total = computed(() => adults.value * 12);\n", after: "const adults = ref(2);\n"}
    - type: {into: "HTML and JavaScript code", text: ", total", after: "return { adults"}
    - caption: "Show it on the page."
    - type: {into: "HTML and JavaScript code", text: "  <p>Total: ${{ total }}</p>\n", after: "</button></p>\n"}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 600
    - caption: "Two adults: 24 dollars."
    - wait: 600
    - click: {selector: "button", preview: true}
    - expect: {selector: "#app", contains: "Total: $36", preview: true}
    - caption: "One more adult, and computed works the total out again: 36."
    - wait: 800
hook: "A basket total, a score out of ten, the number of unread messages: each is worked out from other data, and must never go stale."
---
Some values are not data of their own: they are **worked out** from other data. A ticket total comes from the numbers of adults and children. If the numbers change, the total must be worked out again.

```js
const total = computed(() => adults.value * 12 + children.value * 5);
```

`computed` takes a little function that works the value out. Vue runs it again whenever `adults` or `children` changes, so `{{ total }}` is always right. `() => …` is a short way to write a function that gives back what follows the arrow.

**The hard part:** a plain calculation, `const total = adults.value * 12 + …`, is worked out **once**, when the page starts, and then never again.

## Predict

```step
stage: predict
code: page.html#predict
insight: "Predicting the new total makes students say how it is worked out, and that it must be worked out again after each click."
check:
  type: predict
  q: "You press Adults + twice. What total does the page show?"
  options: ["$53", "$29: the total was worked out at the start", "$41", "$31"]
  actual: "$53: four adults at $12 is $48, plus one child at $5. computed works the total out again after each click."
```

The page starts at 2 adults and 1 child: $29.

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 440 }
check: { type: reflect, text: "I changed the tickets until the free programme message appeared." }
```

Press **Run** and change the numbers. Watch the total, and the message that appears at $50.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "computed values follow the data they use; a v-if can test a computed value; a plain calculation in setup is worked out once and goes stale."
tasks:
  - check:
      type: trace
      text: "Start with 2 adults and 1 child. Fill in the page after each click."
      table: |
        | after | adults | children | total ($) | free programme? |
        | the start | 2 | 1 | 29 | no |
        | Adults + | [3] | [1] | [41] | [no] |
        | Children + | [3] | [2] | [46] | [no] |
        | Adults + | [4] | [2] | [58] | [yes] |
      explain: "The total is worked out again after every click, and the v-if tests the new total each time."
  - check:
      type: question
      q: "Why is the total a computed and not a ref of its own?"
      options: ["It is worked out from adults and children, so it should follow them, never be set by hand", "Refs cannot hold numbers", "computed is faster to type", "A ref would show the wrong number at the start"]
      answer: 0
      explain: "A ref of its own would need every button to remember to change it too. A computed cannot go out of step: Vue works it out from the data."
  - check:
      type: bug
      code: page.html#bug
      text: "Clicking Adults + changes the number of adults, but the total stays at $29. There is no error. Click the line that is wrong."
      answer: 14
      fault: logic
      misconception: vue-derived-once
      explain: "This total is a plain calculation: it is worked out once, at the start, and never again. Wrap it in computed(() => …)."
```

### Trace the page

The total after each click.

### Why computed?

Worked out, not set.

### Spot the bug

The total goes stale.

## Modify

```step
stage: modify
insight: "A new computed is one line plus a return and a {{ }}; a computed can hold an if, as long as it returns the value."
try: { playground: dom, starter: "page.html#run", height: 440 }
tasks:
  - hint:
      - "The number of people is worked out from adults and children."
      - "`const people = computed(() => adults.value + children.value);` then return it and show `{{ people }}`."
    expected: page.html#sol-people
    check: { type: code, text: "Show the number of people, worked out with computed.", rules: { contains: ["people = computed("] } }
  - hint:
      - "A computed can have several lines, as long as it returns the value at the end."
      - "Inside computed(() => { … }): let sum = the old total; if 6 or more people, take 10 away; return sum;"
    expected: page.html#sol-deal
    check: { type: code, text: "Groups of 6 or more people get $10 off the total.", rules: { contains: ["- 10"] } }
```

### Count the people

A second computed.

### A group deal

An if inside computed.

## Make: a recipe scaler

```step
stage: make
insight: "Goals only: several computed values that all follow one piece of data."
try: { playground: dom, starter: "page.html#make", height: 440 }
check: { type: code, text: "Show at least two ingredients, each worked out from the number of pancakes with computed.", rules: { contains: ["= computed("] } }
```

One pancake needs **25 g of flour** and **40 ml of milk**. Show how much of each you need for any number of pancakes, each with `computed`. Add eggs too if you like (one for every four pancakes: `Math.ceil(pancakes.value / 4)`).

## Where this leads

```step
stage: info
check:
  type: question
  q: "A quiz page shows twenty question cards, each with a title, choices and a score. What would save repeating the card's code twenty times?"
  options: ["A card you make once, used twenty times with different data", "A longer v-for", "Twenty computed values", "Copy and paste"]
  answer: 0
  explain: "Next lesson: components. You make a tag of your own once, then use it as often as you like, each copy with its own data."
```

Next: **components**, tags of your own.
