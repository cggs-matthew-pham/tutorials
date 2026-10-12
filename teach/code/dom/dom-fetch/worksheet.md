---
title: "Data from the web: fetch"
subtitle: "The DOM and the browser console · Final challenge: a quiz page · Lesson 9"
---

# Data from the web: fetch

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Weather apps, maps and live scores all ask a server for data while the page is open, then show it.


:::teacher-note

**In one sentence:** Students predict that a page shows Loading before fetched data arrives, order the lines that load JSON, find a missing await, add rain to the forecast, load the live forecast with a saved copy as plan B, and find the week's hottest day.

**Students should be able to say:** I can load JSON data with fetch and show it on the page. I can explain why fetch needs await inside an async function. I can fall back to a saved copy with try and catch when the network fails.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`weather.json` holds a week of temperatures. The page starts with `Loading…`.

```html
<h1>Canberra this week</h1>
<p id="out">Loading…</p>

<script>
  async function load() {
    const response = await fetch("weather.json");
    const data = await response.json();
    document.querySelector("#out").textContent = "Top on the first day: " + data.daily.temperature_2m_max[0] + " °C";
  }
  load();
</script>
```

:::keep-together

**What does the page show when it opens, and a moment later?**

☐ A red error: the data is not there yet

☐ Top on the first day: 19.4 °C straight away

☐ Loading…, then Top on the first day: 19.4 °C

☐ Loading… for ever: a page can't read a file

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Loading… first: the page is drawn before the data arrives. Then await gets the reply, the line after it runs, and the text changes.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<h1>Canberra this week</h1>
<p id="status">Loading…</p>
<ul id="days"></ul>
<p><small>Weather data by Open-Meteo.com (CC BY 4.0)</small></p>

<script>
  async function load() {
    const response = await fetch("weather.json");
    const data = await response.json();
    const days = data.daily;
    for (let i = 0; i < days.time.length; i++) {
      const li = document.createElement("li");
      li.textContent = days.time[i] + ": " + days.temperature_2m_min[i] + " to " + days.temperature_2m_max[i] + " °C";
      document.querySelector("#days").append(li);
    }
    document.querySelector("#status").textContent = "The saved forecast";
  }
  load();
</script>
```

:::keep-together

### Put it in order

**Put the lines in order: ask for the file, turn the reply into data, then show the first day.**

A. `const data = await response.json();`

B. `document.querySelector("#out").textContent = data.daily.time[0];`

C. `const response = await fetch("weather.json");`

D. `load();`

E. `}`

F. `async function load() {`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

Each line needs the one before it: you cannot use data before it has arrived and been turned from text into data.

```html
  async function load() {
    const response = await fetch("weather.json");
    const data = await response.json();
    document.querySelector("#out").textContent = data.daily.time[0];
  }
  load();
```

:::


:::keep-together

### Why await?

**Why is there an await before fetch and before response.json()?**

☐ Each one takes time, and await waits for it before the next line runs

☐ It tells the browser the file is JSON

☐ It is only needed for big files

☐ await makes fetch faster

:::


:::teacher-note

**Answer:** Each one takes time, and await waits for it before the next line runs

Without await, the next line runs at once, before the reply is there, and gets a promise (a value that arrives later) instead of the data.

:::


:::keep-together

### Spot the bug

**The page stays on Loading… and shows a red error: Cannot read properties of undefined. Click the line that is wrong.**

```
 1  <p id="out">Loading…</p>
 2  
 3  <script>
 4    async function load() {
 5      const response = await fetch("weather.json");
 6      const data = response.json();
 7      document.querySelector("#out").textContent = data.daily.time.length + " days";
 8    }
 9    load();
10  </script>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

response.json() also takes time. Without await, data is a promise, not the data, so data.daily is undefined. Write await response.json().

:::


:::typical

## Modify

The live forecast comes from **Open-Meteo**, a free weather service with no sign-up. If your school's network blocks it, the page should still work: that is what the saved copy is for.

**Rain.** One more list from the data.

**Live, with a plan B.** Try, and catch.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Rain:**

```html
<h1>Canberra this week</h1>
<p id="status">Loading…</p>
<ul id="days"></ul>
<p><small>Weather data by Open-Meteo.com (CC BY 4.0)</small></p>

<script>
  async function load() {
    const response = await fetch("weather.json");
    const data = await response.json();
    const days = data.daily;
    for (let i = 0; i < days.time.length; i++) {
      const li = document.createElement("li");
      li.textContent = days.time[i] + ": " + days.temperature_2m_min[i] + " to " + days.temperature_2m_max[i] + " °C, rain " + days.precipitation_sum[i] + " mm";
      document.querySelector("#days").append(li);
    }
    document.querySelector("#status").textContent = "The saved forecast";
  }
  load();
</script>
```

**Live, with a plan B:**

```html
<h1>Canberra this week</h1>
<p id="status">Loading…</p>
<ul id="days"></ul>
<p><small>Weather data by Open-Meteo.com (CC BY 4.0)</small></p>

<script>
  const URL = "https://api.open-meteo.com/v1/forecast?latitude=-35.28&longitude=149.13&timezone=Australia%2FSydney&daily=temperature_2m_max,temperature_2m_min,precipitation_sum";

  async function load() {
    let data;
    let note;
    try {
      const response = await fetch(URL);
      data = await response.json();
      note = "Live forecast from Open-Meteo";
    } catch (error) {
      const response = await fetch("weather.json");
      data = await response.json();
      note = "No connection: using the saved forecast";
    }
    const days = data.daily;
    for (let i = 0; i < days.time.length; i++) {
      const li = document.createElement("li");
      li.textContent = days.time[i] + ": " + days.temperature_2m_min[i] + " to " + days.temperature_2m_max[i] + " °C";
      document.querySelector("#days").append(li);
    }
    document.querySelector("#status").textContent = note;
  }
  load();
</script>
```

:::

:::


## Make: the hottest day

Find the **hottest day** in the data (a loop that remembers the best so far, and an `if` that checks each day against it) and show it in the status line, with its date and temperature.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>Canberra this week</h1>
<p id="status">Loading…</p>
<ul id="days"></ul>
<p><small>Weather data by Open-Meteo.com (CC BY 4.0)</small></p>

<script>
  async function load() {
    const response = await fetch("weather.json");
    const data = await response.json();
    const days = data.daily;
    for (let i = 0; i < days.time.length; i++) {
      const li = document.createElement("li");
      li.textContent = days.time[i] + ": " + days.temperature_2m_min[i] + " to " + days.temperature_2m_max[i] + " °C";
      document.querySelector("#days").append(li);
    }
    let best = 0;
    for (let i = 1; i < days.time.length; i++) {
      if (days.temperature_2m_max[i] > days.temperature_2m_max[best]) {
        best = i;
      }
    }
    document.querySelector("#status").textContent = "Hottest: " + days.time[best] + ", " + days.temperature_2m_max[best] + " °C";
  }
  load();
</script>
```

:::


:::wider

## Where this leads

You can now load data while the page is open. **Apps with Vue** builds pages that follow their data; **Data detective** does the same in Python.

:::


## Exit ticket

:::keep-together

**Why does const data = response.json(); without await give an error later?**

{{lines-3}}

:::


:::teacher-note

**Answer:** response.json() gives a promise, not the data; without await the next line uses the promise before the data has arrived.

:::

