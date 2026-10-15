---
marp: true
theme: default
html: true
---

# Data from the web: fetch

The DOM and the browser console · Final challenge: a quiz page

<!-- Speaker note: Students predict that a page shows Loading before fetched data arrives, order the lines that load JSON, find a missing await, add rain to the forecast, load the live forecast with a saved copy as plan B, and find the week's hottest day. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. Sources: Open-Meteo: Weather Forecast API, https://open-meteo.com/en/docs (checked 12 October 2026); Open-Meteo: Terms and licence (CC BY 4.0), https://open-meteo.com/en/licence (checked 12 October 2026). -->

---

## Today

**We are learning to** load JSON data with fetch, wait for it with await, show it on the page, and fall back to a saved copy when the network fails.

- I can load JSON data with fetch and show it on the page.
- I can explain why fetch needs await inside an async function.
- I can fall back to a saved copy with try and catch when the network fails.

<!-- Speaker note: Before class: An optional lesson at the end of the DOM course. `fetch("weather.json")` asks for a file (or a web address) and gives back a **promise**, a value that arrives later. `await` waits for it, and only works inside an `async function`. The reply is text; `await response.json()` turns it into JavaScript objects and arrays. Forgetting the second `await` is the planted bug: `data` is then a promise, so `data.daily` is undefined. `weather.json` is a saved week of Canberra temperatures from Open-Meteo, the same file as Data detective's weather lesson in Python (dates are when it was saved). The live task asks Open-Meteo, a free service with no account or key. `try … catch` loads the saved copy when the live request fails, which is also what happens if the school network blocks the site, so check it before class with the Check your school page. Weather data by Open-Meteo.com, licensed CC BY 4.0: the credit line stays on the page. -->

---

## Why it matters

> Weather apps, maps and live scores all ask a server for data while the page is open, then show it.

<!-- Speaker note: So far every page had its data written in it. **`fetch`** asks for data from a file or a server while the page is open. The reply takes time to arrive, so the code **waits** for it: ```js async function load() { const response = await fetch("weather.json"); // ask, and wait for the reply const data = await response.json(); // turn the reply into data, and wait // now use data } load(); ``` - **JSON** is data written as text, with the same `{ }` objects and `[ ]` arrays as JavaScript. `weather.json` sits beside the page here: a saved forecast for Canberra from Open-Meteo. - **`await`** waits for something slow; it only works inside a function marked **`async`**. - **`try { … } catch (error) { … }`** runs a plan B when something in `try` fails, such as no network. This is the same idea as Data detective's weather lesson in Python, if you have done it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**What does the page show when it opens, and a moment later?**

- A red error: the data is not there yet
- Top on the first day: 19.4 °C straight away
- Loading…, then Top on the first day: 19.4 °C
- Loading… for ever: a page can't read a file

<!-- Speaker note: What happens: Loading… first: the page is drawn before the data arrives. Then await gets the reply, the line after it runs, and the text changes. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what the page could show while the data is on its way. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Loading… first: the page is drawn before the data arrives. Then await gets the reply, the line after it runs, and the text changes.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/dom/dom-fetch/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/dom/dom-fetch/?full=step-2#step-2)

<!-- Speaker note: Press **Run**. The list is made with the `createElement` and `append` you already know, one item per day. Students should be able to say: I saw the week's forecast appear, made from the JSON data. -->

<!-- Speaker note: Teacher: point out that the list code is the DOM list lesson's, unchanged. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: Ask with fetch, wait with await, turn the reply into data with .json(), and only then use the data; each step waits for the one before. -->

<!-- Speaker note: Teacher: before the bug, ask students to say what each await waits for. -->

<style scoped>pre, marp-pre { font-size: 0.54em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Put it in order

**Put the lines in order: ask for the file, turn the reply into data, then show the first day.**

```html
    const data = await response.json();
    document.querySelector("#out").textContent = data.daily.time[0];
    const response = await fetch("weather.json");
  load();
  }
  async function load() {
```

<!-- Speaker note: Each line needs the one before it: you cannot use data before it has arrived and been turned from text into data. Correct order: async function load() { const response = await fetch("weather.json"); const data = await response.json(); document.querySelector("#out").textContent = data.daily.time[0]; } load(); -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why await?

**Why is there an await before fetch and before response.json()?**

- Each one takes time, and await waits for it before the next line runs
- It tells the browser the file is JSON
- It is only needed for big files
- await makes fetch faster

* Answer: Each one takes time, and await waits for it before the next line runs

<!-- Speaker note: Without await, the next line runs at once, before the reply is there, and gets a promise (a value that arrives later) instead of the data. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 6

<!-- Speaker note: response.json() also takes time. Without await, data is a promise, not the data, so data.daily is undefined. Write await response.json(). -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

The live forecast comes from **Open-Meteo**, a free weather service with no sign-up. If your school's network blocks it, the page should still work: that is what the saved copy is for.

- **Rain:** One more list from the data.
- **Live, with a plan B:** Try, and catch.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-fetch/?full=step-4#step-4)

<!-- Speaker note: What this step is for: More of the data is one more name from the JSON; a live source needs a plan B, so try the live one and catch the failure. Hints, in order: weather.json has a third list beside the temperatures: precipitation_sum, the rain in mm. / Add + ", rain " + days.precipitation_sum[i] + " mm" to the end of each line's text. / Wrap the live fetch in try. In catch, fetch weather.json instead. Either way, data ends up holding the forecast. / let data; try { const response = await fetch(URL); data = await response.json(); } catch (error) { … the same two lines with "weather.json" … } For students who need more support: Give the try and catch written out; students change only what the status line says. For early finishers: Show the forecast as bars with widths from the temperatures; add a Refresh button that calls load() again; load a different town by changing the latitude and longitude in the URL. The hard part, on purpose: The order of events is the hard part: the rest of the page runs before the data arrives. Ask "has the data arrived yet at this line?" rather than fixing their awaits for them. When students get stuck: Red error: Cannot read properties of undefined. Ask: Is there an await before fetch and before response.json()? Fix: Both need await, inside an async function. / await is only valid in async functions. Ask: Does the function have async in front? Fix: async function load() { … } / The live forecast never shows, only the saved one. Ask: Is the network or the site blocked here? Fix: That is plan B working; try at home, or check the URL is exactly the one given. -->

<!-- Speaker note: Teacher: for the live task, turn the Wi-Fi off (or use a wrong URL) to see plan B work. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the hottest day

Find the **hottest day** in the data (a loop that remembers the best so far, and an `if` that checks each day against it) and show it in the status line, with its date and temperature.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-fetch/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: use the loaded data with a loop and an if. -->

<!-- Speaker note: Teacher: ask what the loop must remember as it goes (the best day so far). -->

---

## Where this leads

You can now load data while the page is open. **Apps with Vue** builds pages that follow their data; **Data detective** does the same in Python.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does const data = response.json(); without await give an error later?**

* response.json() gives a promise, not the data; without await the next line uses the promise before the data has arrived.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Apps with Vue: a fetch in a setup function that sets a ref. Data detective does the same in Python with requests. Class idea: list apps on a phone that fetch data, and what each would show with no connection. -->
