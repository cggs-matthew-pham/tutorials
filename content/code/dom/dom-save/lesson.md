---
order: 10
unit: challenge
optional: true
introduces: [local-storage]
assumes: [json-data, create-element, append-element, text-content, js-query, js-event, input-value]
title: "Saving between visits"
summary: "Keep data when the page is closed with localStorage: save text when something changes, load it when the page opens, and save lists as JSON."
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
  query: {code: "@page.html#predict", zoom: 1.4}
  caption: "Variables start over each time the page opens; localStorage keeps what you saved"
  clip:
    - caption: "The page reads a saved number, adds one, and saves it again."
    - wait: 1200
    - click: "Run ▶"
    - expect: {selector: "#count", contains: "1", preview: true}
    - caption: "The first visit: nothing was saved, so it starts at 1."
    - wait: 600
    - click: "Run again ▶"
    - wait: 500
    - click: "Run again ▶"
    - expect: {selector: "#count", contains: "3", preview: true}
    - caption: "Each run is a new visit. The variable starts over; the saved number does not."
    - wait: 800
hook: "A game that remembers your best score, a to-do list that is still there tomorrow: the browser keeps a little data for each site."
---
Every time a page opens, its variables start from nothing. **`localStorage`** is a small store the browser keeps for each website, so data survives a reload and a visit next week:

```js
localStorage.setItem("visits", visits);              // save, under a name
let visits = Number(localStorage.getItem("visits")); // load (null if nothing was saved)
localStorage.removeItem("visits");                   // forget it
```

It only keeps **text**. To save a list, turn it into JSON text first, and turn it back when you load it:

```js
localStorage.setItem("books", JSON.stringify(books));
books = JSON.parse(localStorage.getItem("books"));
```

Here, each **Run** is a new visit to the page. The playground keeps your saved data for each step, as a browser keeps it for a website.

## Predict

```step
stage: predict
code: page.html#predict
insight: "Students expect each run to start at 1, as variables do; seeing the count grow shows that localStorage outlives the page."
check:
  type: predict
  q: "You press Run three times. What does the page show after the third?"
  options: ["Visits: 3", "Visits: 1: variables start over every time", "Visits: 0", "Visits: 111"]
  actual: "Visits: 3. Each run reads the saved number, adds one and saves it. The variable starts over; the saved text does not."
```

`Number(...)` turns the saved text into a number; when nothing is saved yet it gives 0.

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 460 }
check: { type: reflect, text: "I added books, pressed Run again, and they were still there." }
```

Press **Run**, add two books, then press **Run again**. Then try **Start again** and Run once more: what comes back?

## Investigate

```step
stage: investigate
code: page.html#run
insight: "Load when the page opens, save whenever the data changes; lists go in and out as JSON text."
tasks:
  - check:
      type: match
      q: "Match each line with what it does."
      pairs:
        - ["const saved = localStorage.getItem(\"books\");", "loads the saved text, or null if there is none"]
        - ["books = JSON.parse(saved);", "turns the saved text back into a list"]
        - ["localStorage.setItem(\"books\", JSON.stringify(books));", "saves the list as text, every time it changes"]
        - ["if (saved !== null) { … }", "keeps the empty list on the very first visit"]
      explain: "Load once, when the page opens; save every time the data changes. JSON is the bridge between a list and text."
  - check:
      type: question
      q: "Start again empties the list on the page. After you press Run, the books are back. Why?"
      options: ["Start again never changed what was saved, so the next visit loads the old list", "localStorage can't be emptied", "Run undoes Start again", "The books were in the code"]
      answer: 0
      explain: "The page and the saved copy are separate. Start again must also save the empty list, or remove the saved one."
  - check:
      type: bug
      code: page.html#bug
      text: "The first Run shows 1 books. The next Run shows a red error: \"Book 1\" is not valid JSON. Click the line that is wrong."
      answer: 9
      fault: logic
      misconception: storage-text-only
      explain: "setItem saved the list as plain text (Book 1), not as JSON, so JSON.parse can't read it next time. Save it with JSON.stringify(books)."
```

### Which line does what?

Load, turn back, save.

### Start again

Two copies of the list.

### Spot the bug

Saved the wrong way.

## Modify

```step
stage: modify
insight: "Forgetting is part of saving; any input can be remembered by saving it when it changes and putting it back when the page opens."
try: { playground: dom, starter: "page.html#run", height: 460 }
tasks:
  - hint:
      - "Start again empties the list on the page, but the saved copy is still there."
      - "Add localStorage.removeItem(\"books\"); inside the Start again handler."
    expected: page.html#sol-clear
    check: { type: code, text: "Make Start again forget the saved list too.", rules: { contains: ["removeItem(\"books\")"] } }
  - hint:
      - "A box for the reader's name: save its value whenever it changes, and put the saved value back when the page opens."
      - "An \"input\" event that runs localStorage.setItem(\"reader\", reader.value); and, at the start, if getItem(\"reader\") is not null, set reader.value to it."
    expected: page.html#sol-name
    check: { type: code, text: "Add a box for the reader's name that is remembered between visits.", rules: { contains: ["setItem(\"reader\""] } }
```

### Really start again

Forget the saved copy.

### Remember a name

Save on every change.

## Make: a best score that lasts

```step
stage: make
insight: "Goals only: load at the start, save when it changes."
try: { playground: dom, starter: "page.html#make", height: 420 }
check: { type: code, text: "Save the best score so it is still there after Run.", rules: { contains: ["setItem(\"best\"", "getItem(\"best\")"] } }
```

The clicker keeps a **best score**, but it is lost on every visit. Make it last: load it when the page opens and save it whenever it goes up.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your to-do app saves its list with localStorage. A friend opens the same page on their own computer. What do they see?"
  options: ["Their own list (empty at first): each browser keeps its own data", "Your list", "Everyone's lists", "An error"]
  answer: 0
  explain: "localStorage stays in one browser on one computer. Sharing data between people needs a server, as in Web apps with Flask."
```

For Vue: save inside `watch(tasks, …, { deep: true })` and load in `setup`. Next on the pathway: **Your site, for real**, where your page goes online.
