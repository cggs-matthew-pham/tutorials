---
order: 7
unit: challenge
optional: true
introduces: [preact, svelte]
title: "Same app, three frameworks"
summary: "The same small app in Vue, Preact (React's small cousin) and Svelte: state, worked-out values, events and showing data are the same ideas in all three; only the syntax and the update rules differ."
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
  query: {code: "@page.html#run", zoom: 1.2}
  caption: "Three frameworks, one app: the same ideas, written three ways"
  clip:
    - caption: {text: "One app, three times: Vue, Preact and Svelte.", say: "One app, three times: view, pree-act and svelt."}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 900
    - caption: "Each keeps a list of stars and counts them."
    - click: {selector: "#vue-app button", preview: true}
    - click: {selector: "#preact-app button", preview: true}
    - click: {selector: ".svelte-app button", preview: true}
    - expect: {selector: ".svelte-app", contains: "Stars: 1", preview: true}
    - caption: "Each button changes its list, and each page follows."
    - wait: 800
    - caption: "Same ideas. Only the spelling differs."
    - wait: 300
hook: "Job adverts ask for React, Vue or Svelte. Learn the ideas once, and each framework is a new way of writing them."
---
Vue is one of several frameworks that keep a page in step with its data. The best known is **React**; here we use **Preact**, a small version of React with the same way of writing (about 15 KB, served beside the page). **Svelte** works differently: its compiler turns your component into plain JavaScript before it runs.

The same app, three ways:

| Idea | Vue | Preact (like React) | Svelte |
|---|---|---|---|
| Data that changes | `ref([])` | `useState([])` | `$state([])` |
| A worked-out value | `computed(() => …)` | a plain line, `stars.length` | `$derived(…)` |
| An event | `@click="add"` | ``onClick=${add}`` | `onclick={add}` |
| Showing data | `{{ count }}` | `${count}` | `{count}` |

Two recipes to copy, not to learn: Preact's page is written inside ``html`…` `` (htm, a way to write HTML-like tags in JavaScript), and the Svelte component sits in a hidden `<textarea data-svelte>`, where `svelte.js` finds it. In a real project a Svelte component is its own file, `App.svelte`. `stars.join("")` puts the list's items together as one piece of text.

## Predict

```step
stage: predict
code: page.html#predict
insight: "Students who learned that a plain calculation goes stale in Vue may expect Preact's plain count to go stale too; seeing all three agree shows the ideas are shared and the update rules differ."
check:
  type: predict
  q: "You click Add a star twice in each app. What do they show?"
  options:
    - "All three show Stars: 2"
    - "Only Vue shows 2: the others have no ref"
    - "Preact shows 0: its count is a plain line, which goes stale"
    - "Svelte shows nothing: its code is in a textarea"
  actual: "All three show Stars: 2. Preact runs its whole App function again after each change, so its plain count line runs again too."
```

Read all three panels. Which lines keep the data, work out the count, and handle the click?

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 520 }
check: { type: reflect, text: "I clicked each app's button and saw all three behave the same way." }
```

Press **Run**. Svelte takes a moment longer to start: its compiler (about 1 MB) turns the component into JavaScript first.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "State, worked-out values, events and showing data appear in all three; React and Preact replace data rather than change it, and run the whole component again."
tasks:
  - check:
      type: sort
      q: "Sort each piece of code by the idea it is."
      options: ["Data that changes", "A worked-out value", "An event", "Showing data"]
      items:
        - ["Vue: ref([])", "Data that changes"]
        - ["Preact: useState([])", "Data that changes"]
        - ["Svelte: $state([])", "Data that changes"]
        - ["Vue: computed(() => stars.value.length)", "A worked-out value"]
        - ["Preact: const count = stars.length", "A worked-out value"]
        - ["Svelte: $derived(stars.length)", "A worked-out value"]
        - ["Vue: @click=\"add\"", "An event"]
        - ["Preact: onClick=${add}", "An event"]
        - ["Svelte: onclick={add}", "An event"]
        - ["Vue: {{ count }}", "Showing data"]
        - ["Preact: ${count}", "Showing data"]
        - ["Svelte: {count}", "Showing data"]
      explain: "Four ideas, three ways to write each. Learn the ideas once; each framework is new spelling."
  - check:
      type: question
      q: "In Vue, a total worked out with a plain line went stale. Why is Preact's plain line, const count = stars.length, always right?"
      options: ["Preact runs the whole App function again after every change, so the line runs again", "Preact is newer", "stars.length is special", "It is not: Preact's count goes stale too"]
      answer: 0
      explain: "Vue runs setup once and watches refs; Preact (and React) run the component function again each time. Different update rules, the same result on the page."
  - check:
      type: bug
      code: page.html#bug
      text: "In this Preact app, Add a star does nothing: the count stays at 0. There is no error. Click the two lines that are wrong."
      answer: [8, 9]
      fault: logic
      misconception: react-mutate
      explain: "push changes the old list, then setStars is given that same list, so Preact sees nothing new and skips the update. Give it a new list: setStars([...stars, \"⭐\"])."
```

### Sort the ideas

Twelve pieces, four ideas.

### Why no computed?

A different update rule.

### Spot the bug

The catch in React and Preact.

## Modify

```step
stage: modify
insight: "Each framework has its own spelling for the same moves: a choice in Svelte is an {#if} block; changing data in Preact is always giving it a new value."
try: { playground: dom, starter: "page.html#svelte", height: 440 }
tasks:
  - starter: "page.html#svelte"
    hint:
      - "Svelte's v-if is a block: {#if …} at the start and {/if} at the end."
      - "`{#if count >= 5}` then a paragraph, then `{/if}`, under the count."
    expected: page.html#sol-svelte-if
    check: { type: code, text: "In Svelte, show That's a lot of stars! when there are 5 or more.", rules: { contains: ["{#if", "{/if}"] } }
  - starter: "page.html#preact"
    hint:
      - "In Preact you never change the list: you give setStars a new one."
      - "A clear function that runs setStars([]), and a button with onClick=${clear}."
    expected: page.html#sol-preact-clear
    check: { type: code, text: "In Preact, add a Clear button.", rules: { contains: ["setStars([])"] } }
```

### An if in Svelte

Its own way to write v-if.

### Clear in Preact

A new, empty list.

## Make: the same feature three times

```step
stage: make
insight: "Goals only: one feature added to all three apps, so the differences show."
try: { playground: dom, starter: "page.html#make", height: 520 }
check: { type: reflect, text: "I added a Remove one button to all three apps and can say what was different in each." }
```

Add a **Remove one** button to all three apps. In Vue and Svelte, `pop()` takes the last item off the list. In Preact, give `setStars` a new list without the last item: `stars.slice(0, -1)`. Which was easiest? Which was clearest to read?

## Where this leads

```step
stage: info
check:
  type: question
  q: "A school website team asks which framework to learn. What is the best advice?"
  options: ["Learn the ideas (state, worked-out values, events, components) well in one; the others are new spelling", "Learn all three at once", "Only React matters", "Frameworks will all be gone soon"]
  answer: 0
  explain: "The ideas outlast any one framework. Real projects add a build tool (npm create vue, Vite) and one file per component; your ideas carry straight over."
```

You have seen the same ideas in three frameworks. Real projects use a **build tool** and one file per component; the ideas stay the same.
