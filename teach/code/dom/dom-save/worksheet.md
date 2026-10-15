---
title: "Saving between visits"
subtitle: "The DOM and the browser console · Final challenge: a quiz page · Lesson 10"
---

# Saving between visits

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A game that remembers your best score, a to-do list that is still there tomorrow: the browser keeps a little data for each site.


:::teacher-note

**In one sentence:** Students predict a visit counter after three runs, save a reading list as JSON so it survives Run, find a list saved without JSON.stringify, make Start again forget the saved copy, remember a name, and keep a best score.

**Students should be able to say:** I can save data with localStorage so it is still there next visit. I can save a list as JSON text and load it back. I can explain that saved data stays in one browser.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`Number(...)` turns the saved text into a number; when nothing is saved yet it gives 0.

```html
<p>Visits: <span id="count">0</span></p>

<script>
  let visits = Number(localStorage.getItem("visits"));
  visits = visits + 1;
  localStorage.setItem("visits", visits);
  document.querySelector("#count").textContent = visits;
</script>
```

:::keep-together

**You press Run three times. What does the page show after the third?**

☐ Visits: 0

☐ Visits: 1: variables start over every time

☐ Visits: 111

☐ Visits: 3

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Visits: 3. Each run reads the saved number, adds one and saves it. The variable starts over; the saved text does not.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<h1>Books I have read</h1>
<input id="title" placeholder="A book">
<button id="add">Add</button>
<ul id="books"></ul>
<button id="clear">Start again</button>

<script>
  const list = document.querySelector("#books");
  let books = [];
  const saved = localStorage.getItem("books");
  if (saved !== null) {
    books = JSON.parse(saved);
  }

  function show() {
    list.textContent = "";
    for (const title of books) {
      const li = document.createElement("li");
      li.textContent = title;
      list.append(li);
    }
  }

  document.querySelector("#add").addEventListener("click", function () {
    const box = document.querySelector("#title");
    books.push(box.value);
    localStorage.setItem("books", JSON.stringify(books));
    box.value = "";
    show();
  });
  document.querySelector("#clear").addEventListener("click", function () {
    books = [];
    show();
  });
  show();
</script>
```

:::keep-together

### Which line does what?

**Match each line with what it does.**

A. turns the saved text back into a list

B. keeps the empty list on the very first visit

C. saves the list as text, every time it changes

D. loads the saved text, or null if there is none

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `const saved = localStorage.getItem("books");` | |
| `books = JSON.parse(saved);` | |
| `localStorage.setItem("books", JSON.stringify(books));` | |
| `if (saved !== null) { … }` | |

:::


:::teacher-note

**Answer:** const saved = localStorage.getItem("books"); → D. loads the saved text, or null if there is none; books = JSON.parse(saved); → A. turns the saved text back into a list; localStorage.setItem("books", JSON.stringify(books)); → C. saves the list as text, every time it changes; if (saved !== null) { … } → B. keeps the empty list on the very first visit

Load once, when the page opens; save every time the data changes. JSON is the bridge between a list and text.

:::


:::keep-together

### Start again

**Start again empties the list on the page. After you press Run, the books are back. Why?**

☐ Start again never changed what was saved, so the next visit loads the old list

☐ localStorage can't be emptied

☐ The books were in the code

☐ Run undoes Start again

:::


:::teacher-note

**Answer:** Start again never changed what was saved, so the next visit loads the old list

The page and the saved copy are separate. Start again must also save the empty list, or remove the saved one.

:::


:::keep-together

### Spot the bug

**The first Run shows 1 books. The next Run shows a red error: "Book 1" is not valid JSON. Click the line that is wrong.**

```
 1  <ul id="books"></ul>
 2  <script>
 3    let books = [];
 4    const saved = localStorage.getItem("books");
 5    if (saved !== null) {
 6      books = JSON.parse(saved);
 7    }
 8    books.push("Book " + (books.length + 1));
 9    localStorage.setItem("books", books);
10    document.querySelector("#books").textContent = books.length + " books";
11  </script>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 9

setItem saved the list as plain text (Book 1), not as JSON, so JSON.parse can't read it next time. Save it with JSON.stringify(books).

:::


:::typical

## Modify


**Really start again.** Forget the saved copy.

**Remember a name.** Save on every change.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Really start again:**

```html
<h1>Books I have read</h1>
<input id="title" placeholder="A book">
<button id="add">Add</button>
<ul id="books"></ul>
<button id="clear">Start again</button>

<script>
  const list = document.querySelector("#books");
  let books = [];
  const saved = localStorage.getItem("books");
  if (saved !== null) {
    books = JSON.parse(saved);
  }

  function show() {
    list.textContent = "";
    for (const title of books) {
      const li = document.createElement("li");
      li.textContent = title;
      list.append(li);
    }
  }

  document.querySelector("#add").addEventListener("click", function () {
    const box = document.querySelector("#title");
    books.push(box.value);
    localStorage.setItem("books", JSON.stringify(books));
    box.value = "";
    show();
  });
  document.querySelector("#clear").addEventListener("click", function () {
    books = [];
    localStorage.removeItem("books");
    show();
  });
  show();
</script>
```

**Remember a name:**

```html
<h1>Books I have read</h1>
<input id="title" placeholder="A book">
<button id="add">Add</button>
<ul id="books"></ul>
<button id="clear">Start again</button>
<p>Reader: <input id="reader"></p>

<script>
  const list = document.querySelector("#books");
  let books = [];
  const saved = localStorage.getItem("books");
  if (saved !== null) {
    books = JSON.parse(saved);
  }

  function show() {
    list.textContent = "";
    for (const title of books) {
      const li = document.createElement("li");
      li.textContent = title;
      list.append(li);
    }
  }

  document.querySelector("#add").addEventListener("click", function () {
    const box = document.querySelector("#title");
    books.push(box.value);
    localStorage.setItem("books", JSON.stringify(books));
    box.value = "";
    show();
  });
  document.querySelector("#clear").addEventListener("click", function () {
    books = [];
    show();
  });
  const reader = document.querySelector("#reader");
  if (localStorage.getItem("reader") !== null) {
    reader.value = localStorage.getItem("reader");
  }
  reader.addEventListener("input", function () {
    localStorage.setItem("reader", reader.value);
  });
  show();
</script>
```

:::

:::


## Make: a best score that lasts

The clicker keeps a **best score**, but it is lost on every visit. Make it last: load it when the page opens and save it whenever it goes up.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<p>Clicks: <span id="count">0</span> · Best: <span id="best">0</span></p>
<button id="click">Click me</button>
<button id="new">New game</button>

<script>
  // Save the best score, so it is still there after Run (or a visit next week).
  let clicks = 0;
  let best = Number(localStorage.getItem("best"));
  const countEl = document.querySelector("#count");
  const bestEl = document.querySelector("#best");
  bestEl.textContent = best;
  document.querySelector("#click").addEventListener("click", function () {
    clicks = clicks + 1;
    countEl.textContent = clicks;
    if (clicks > best) {
      best = clicks;
      bestEl.textContent = best;
      localStorage.setItem("best", best);
    }
  });
  document.querySelector("#new").addEventListener("click", function () {
    clicks = 0;
    countEl.textContent = clicks;
  });
</script>
```

:::


:::wider

## Where this leads

For Vue: save inside `watch(tasks, …, { deep: true })` and load in `setup`. Next on the pathway: **Your site, for real**, where your page goes online.

:::


## Exit ticket

:::keep-together

**Why must a list be saved with JSON.stringify?**

{{lines-3}}

:::


:::teacher-note

**Answer:** localStorage keeps only text; JSON.stringify turns the list into text that JSON.parse can turn back into a list.

:::

