---
order: 6
unit: challenge
title: "Final challenge: a to-do app"
summary: "Build a to-do app in three milestones: add tasks from a box, tick them off with a count of what is left, then make each task a component and clear the done ones."
language: html
voice: { name: af_heart, speed: 1.1 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-dom" 8131
  url: http://127.0.0.1:8131/index.html
  ready: HTML and JavaScript code
  layout: full
pacing:
  keyDelayMs: 20
explainPicture: page.html#finished
explainClip:
  query: {code: "@page.html#finished", zoom: 1.3}
  caption: "The finished to-do app: data, events, a computed count and a component"
  clip:
    - caption: "The finished app: a list of tasks."
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 600
    - caption: "Type a task and press Add."
    - type: {selector: "input", text: "Walk the dog", preview: true}
    - click: {selector: "button", preview: true}
    - expect: {selector: "ul", contains: "Walk the dog", preview: true}
    - caption: "Each task is a todo-item component, made by v-for."
    - wait: 200
    - caption: "Tick one, and the computed count follows."
    - click: {selector: "input[type=checkbox]", preview: true}
    - expect: {selector: "#app", contains: "1 left to do", preview: true}
    - caption: "You will build it in three milestones."
    - wait: 300
hook: "Every app you use is data, events and a page that keeps up. A to-do list is the classic first app for every framework."
---
Build a to-do app, one milestone at a time. Everything you need, you have met in this course: refs, `v-for`, `v-model`, functions on `@click`, `computed` and a component.

One small new thing: `v-model` on a tick box (`<input type="checkbox" v-model="t.done">`) joins it to true or false.

## Plan the app

```step
stage: investigate
code: page.html#finished
picture: page.html#finished
insight: "Seeing the finished app as the course's pieces turns a big task into small ones students have done before."
tasks:
  - check:
      type: match
      q: "Match each part of the app with how it is built."
      pairs:
        - ["The box", "an input with v-model on a ref"]
        - ["Add", "a button that runs a function, which pushes to the list"]
        - ["The tasks", "v-for over the list, one todo-item each"]
        - ["The tick boxes", "v-model on each task's done"]
        - ["1 left to do", "a computed that counts the tasks not done"]
        - ["Clear done", "a function that keeps only the tasks not done"]
      explain: "Six parts, five lessons. Build them in order: adding tasks, then ticking and counting, then the component and Clear done."
  - check:
      type: bug
      code: page.html#bug
      text: "Clicking Tick the first should show 1 left to do, but it still says 2. There is no error. Click the line that is wrong."
      answer: 12
      fault: logic
      misconception: vue-derived-once
      explain: "left is counted once, when the page starts. A count worked out from the list must be a computed, so it is counted again when the list changes."
```

This is the app you will build. The picture shows it finished.

### Name the parts

Which piece of Vue makes each part?

### Spot the bug

A count that goes stale.

## Build the app

```step
stage: modify
insight: "Three milestones with fading support: most of the code, then an outline in comments, then only the goals."
try: { playground: dom, starter: "page.html#start", height: 480 }
tasks:
  - starter: "page.html#start"
    hint:
      - "A function in setup, returned, and a button that names it with @click."
      - "Inside addTask: if newTask.value is not empty, push { text: newTask.value, done: false } onto tasks.value, then set newTask.value to empty text."
    expected: page.html#sol-m1
    check: { type: code, text: "Milestone 1: an Add button that adds what is in the box to the list.", rules: { contains: ["function addTask", "@click=\"addTask\""] } }
  - starter: "page.html#m2"
    hint:
      - "The tick box goes inside the li, and v-model joins it to that task's done."
      - "The count: let count = 0; a for loop over tasks.value; add 1 when !t.done; return count. Wrap it all in computed(() => { … }) and return left."
    expected: page.html#sol-m2
    check: { type: code, text: "Milestone 2: a tick box for each task, and a count of the tasks left.", rules: { contains: ["v-model=\"t.done\"", "left = computed("] } }
  - starter: "page.html#m3"
    hint:
      - "The component is the li, given a task as its prop. Then the v-for goes on the new tag."
      - "Clear done: make a new empty list, push in every task that is not done, then set tasks.value to it."
    expected: page.html#sol-m3
    check: { type: code, text: "Milestone 3: a todo-item component for each task, and a Clear done button.", rules: { contains: ["app.component(\"todo-item\"", "function clearDone"] } }
```

Each milestone starts from a working copy of the one before (**Reset to this task's start** loads it), so nobody is stuck behind.

### Milestone 1: add tasks

Most of the code is there.

### Milestone 2: tick and count

The comments give the outline.

### Milestone 3: a component and Clear done

Goals only.

## Make it yours

```step
stage: make
insight: "An open extension using only the course's pieces."
try: { playground: dom, starter: "page.html#make", height: 480 }
check: { type: reflect, text: "I added a feature of my own and can say which Vue pieces it uses." }
```

Add one feature of your own. Ideas: **All done! 🎉** when nothing is left; a **Delete** button on each task; a count of **done** tasks; tasks in two lists, to do and done; press **Enter** to add (`@keyup.enter`).

## Where this leads

```step
stage: info
check:
  type: question
  q: "React and Svelte are other frameworks for building apps. What do you expect they share with Vue?"
  options: ["Data the page follows, worked-out values, events and components, written differently", "Nothing: each is completely different", "Only the HTML", "The same code, word for word"]
  answer: 0
  explain: "The ideas carry over; the syntax and the update rules differ. The optional next lesson builds this same kind of app in Vue, Preact (React's small cousin) and Svelte."
```

You built an app with Vue. The optional last lesson shows the **same app in three frameworks**.
