---
order: 9
unit: challenge
optional: true
introduces: [fetch, async-await, json-data, try-catch]
assumes: [create-element, append-element, text-content, js-query]
title: "Data from the web: fetch"
summary: "Load JSON data with fetch, wait for it with await, show it on the page, and fall back to a saved copy when the network fails."
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
  caption: "fetch takes time: await it, turn the reply into data, then show it"
  clip:
    - caption: "The page says Loading while it waits."
    - wait: 800
    - caption: "fetch asks for the file; await waits for the reply."
    - type: {into: "HTML and JavaScript code", text: "    const response = await fetch(\"weather.json\");\n", after: "async function load() {\n"}
    - caption: {text: "json turns the reply into data; await waits again.", say: "Jason turns the reply into data; await waits again."}
    - type: {into: "HTML and JavaScript code", text: "    const data = await response.json();\n", after: "fetch(\"weather.json\");\n"}
    - caption: "Then show part of it on the page."
    - type: {into: "HTML and JavaScript code", text: "    document.querySelector(\"#out\").textContent = data.daily.temperature_2m_max[0] + \" °C\";\n", after: "response.json();\n"}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 600
    - expect: {selector: "#out", contains: "19.4", preview: true}
    - caption: "Loading, then the data, once it has arrived."
    - wait: 600
hook: "Weather apps, maps and live scores all ask a server for data while the page is open, then show it."
---
So far every page had its data written in it. **`fetch`** asks for data from a file or a server while the page is open. The reply takes time to arrive, so the code **waits** for it:

```js
async function load() {
  const response = await fetch("weather.json");   // ask, and wait for the reply
  const data = await response.json();             // turn the reply into data, and wait
  // now use data
}
load();
```

- **JSON** is data written as text, with the same `{ }` objects and `[ ]` arrays as JavaScript. `weather.json` sits beside the page here: a saved forecast for Canberra from Open-Meteo.
- **`await`** waits for something slow; it only works inside a function marked **`async`**.
- **`try { … } catch (error) { … }`** runs a plan B when something in `try` fails, such as no network.

This is the same idea as Data detective's weather lesson in Python, if you have done it.

## Predict

```step
stage: predict
code: page.html#predict
insight: "Students expect a page to have its data at once; seeing Loading first shows that fetched data arrives later."
check:
  type: predict
  q: "What does the page show when it opens, and a moment later?"
  options:
    - "Loading…, then Top on the first day: 19.4 °C"
    - "Top on the first day: 19.4 °C straight away"
    - "Loading… for ever: a page can't read a file"
    - "A red error: the data is not there yet"
  actual: "Loading… first: the page is drawn before the data arrives. Then await gets the reply, the line after it runs, and the text changes."
```

`weather.json` holds a week of temperatures. The page starts with `Loading…`.

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 460 }
check: { type: reflect, text: "I saw the week's forecast appear, made from the JSON data." }
```

Press **Run**. The list is made with the `createElement` and `append` you already know, one item per day.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "Ask with fetch, wait with await, turn the reply into data with .json(), and only then use the data; each step waits for the one before."
tasks:
  - check:
      type: parsons
      code: page.html#parsons
      text: "Put the lines in order: ask for the file, turn the reply into data, then show the first day."
      explain: "Each line needs the one before it: you cannot use data before it has arrived and been turned from text into data."
  - check:
      type: question
      q: "Why is there an await before fetch and before response.json()?"
      options: ["Each one takes time, and await waits for it before the next line runs", "await makes fetch faster", "It tells the browser the file is JSON", "It is only needed for big files"]
      answer: 0
      explain: "Without await, the next line runs at once, before the reply is there, and gets a promise (a value that arrives later) instead of the data."
  - check:
      type: bug
      code: page.html#bug
      text: "The page stays on Loading… and shows a red error: Cannot read properties of undefined. Click the line that is wrong."
      answer: 6
      fault: runtime
      misconception: fetch-no-await
      explain: "response.json() also takes time. Without await, data is a promise, not the data, so data.daily is undefined. Write await response.json()."
```

### Put it in order

Ask, turn into data, show.

### Why await?

Things that take time.

### Spot the bug

Data that has not arrived.

## Modify

```step
stage: modify
insight: "More of the data is one more name from the JSON; a live source needs a plan B, so try the live one and catch the failure."
try: { playground: dom, starter: "page.html#run", height: 460 }
tasks:
  - hint:
      - "weather.json has a third list beside the temperatures: precipitation_sum, the rain in mm."
      - "Add + \", rain \" + days.precipitation_sum[i] + \" mm\" to the end of each line's text."
    expected: page.html#sol-rain
    check: { type: code, text: "Show each day's rain too.", rules: { contains: ["precipitation_sum"] } }
  - starter: "page.html#live"
    hint:
      - "Wrap the live fetch in try. In catch, fetch weather.json instead. Either way, data ends up holding the forecast."
      - "let data; try { const response = await fetch(URL); data = await response.json(); } catch (error) { … the same two lines with \"weather.json\" … }"
    check: { type: code, text: "Load the live forecast from URL, and fall back to weather.json when that fails.", rules: { contains: ["try {", "catch", "fetch(URL)"] } }
```

The live forecast comes from **Open-Meteo**, a free weather service with no sign-up. If your school's network blocks it, the page should still work: that is what the saved copy is for.

```html
<script>
  try {
    // fetch the live forecast from URL
  } catch (error) {
    // plan B: fetch the saved copy, weather.json
  }
</script>
```

### Rain

One more list from the data.

### Live, with a plan B

Try, and catch.

## Make: the hottest day

```step
stage: make
insight: "Goals only: use the loaded data with a loop and an if."
try: { playground: dom, starter: "page.html#make", height: 460 }
check: { type: code, text: "Show the hottest day of the week, found with a loop and an if.", rules: { contains: ["if ("] } }
```

Find the **hottest day** in the data (a loop that remembers the best so far, and an `if` that checks each day against it) and show it in the status line, with its date and temperature.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A Vue app needs data from the web. Where would the fetch go?"
  options: ["In a function in setup, which puts the data into a ref when it arrives", "In {{ }} on the page", "In the CSS", "Vue cannot load data"]
  answer: 0
  explain: "Load it with fetch, then set a ref's .value; the page follows by itself. Apps with Vue shows refs and functions in setup."
```

You can now load data while the page is open. **Apps with Vue** builds pages that follow their data; **Data detective** does the same in Python.
