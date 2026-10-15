---
marp: true
theme: default
html: true
---

# Saving between visits

The DOM and the browser console · Final challenge: a quiz page

<!-- Speaker note: Students predict a visit counter after three runs, save a reading list as JSON so it survives Run, find a list saved without JSON.stringify, make Start again forget the saved copy, remember a name, and keep a best score. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. Sources: MDN: Window.localStorage, https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage (checked 12 October 2026). -->

---

## Today

**We are learning to** keep data when the page is closed with localStorage: save text when something changes, load it when the page opens, and save lists as JSON.

- I can save data with localStorage so it is still there next visit.
- I can save a list as JSON text and load it back.
- I can explain that saved data stays in one browser.

<!-- Speaker note: Before class: An optional lesson at the end of the DOM course, and the "saving" step for every route through the Web pathway. `localStorage` is a small store each browser keeps per website: `setItem(name, text)`, `getItem(name)` (null when nothing is saved) and `removeItem(name)`. It keeps **text only**, so lists and objects go through `JSON.stringify` and `JSON.parse` (met in the fetch lesson). The planted bug saves a list without stringify: the first run looks fine, the second fails, because the bad text is still saved. The playground's hint says to clear it. The pattern for any app: **load once when the page opens, save every time the data changes**. In the playground, each Run is a new visit; the playground keeps each step's saved data for this browser (the preview page cannot use the real store, so a stand-in behaves the same way). On a real site it is the browser's own localStorage, per site and per browser: nothing is shared between computers or people, and clearing browsing data deletes it. Don't save anything private. **For Vue students** (the to-do app): load the list in `setup` (`const tasks = ref(JSON.parse(localStorage.getItem("tasks")) || [])`), then `watch(tasks, (t) => localStorage.setItem("tasks", JSON.stringify(t)), { deep: true })`. Preact and Svelte have their own versions (`useEffect`, `$effect`). -->

---

## Why it matters

> A game that remembers your best score, a to-do list that is still there tomorrow: the browser keeps a little data for each site.

<!-- Speaker note: Every time a page opens, its variables start from nothing. **`localStorage`** is a small store the browser keeps for each website, so data survives a reload and a visit next week: ```js localStorage.setItem("visits", visits); // save, under a name let visits = Number(localStorage.getItem("visits")); // load (null if nothing was saved) localStorage.removeItem("visits"); // forget it ``` It only keeps **text**. To save a list, turn it into JSON text first, and turn it back when you load it: ```js localStorage.setItem("books", JSON.stringify(books)); books = JSON.parse(localStorage.getItem("books")); ``` Here, each **Run** is a new visit to the page. The playground keeps your saved data for each step, as a browser keeps it for a website. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<p>Visits: <span id="count">0</span></p>

<script>
  let visits = Number(localStorage.getItem("visits"));
  visits = visits + 1;
  localStorage.setItem("visits", visits);
  document.querySelector("#count").textContent = visits;
</script>
```

**You press Run three times. What does the page show after the third?**

- Visits: 0
- Visits: 1: variables start over every time
- Visits: 111
- Visits: 3

<!-- Speaker note: What happens: Visits: 3. Each run reads the saved number, adds one and saves it. The variable starts over; the saved text does not. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what happens to variables when a page closes. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Visits: 3. Each run reads the saved number, adds one and saves it. The variable starts over; the saved text does not.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/dom/dom-save/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/dom/dom-save/?full=step-2#step-2)

<!-- Speaker note: Press **Run**, add two books, then press **Run again**. Then try **Start again** and Run once more: what comes back? Students should be able to say: I added books, pressed Run again, and they were still there. -->

<!-- Speaker note: Teacher: after Start again and Run, ask where the books came back from. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 37 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-save/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Load when the page opens, save whenever the data changes; lists go in and out as JSON text. -->

<!-- Speaker note: Teacher: draw two boxes on the board, the page's list and the saved text, and an arrow each way. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which line does what?

**Match each line with what it does.**

| | |
|---|---|
| `const saved = localStorage.getItem("books");` | A. turns the saved text back into a list |
| `books = JSON.parse(saved);` | B. keeps the empty list on the very first visit |
| `localStorage.setItem("books", JSON.stringify(books));` | C. saves the list as text, every time it changes |
| `if (saved !== null) { … }` | D. loads the saved text, or null if there is none |

* Answer: const saved = localStorage.getItem("books"); → D. loads the saved text, or null if there is none; books = JSON.parse(saved); → A. turns the saved text back into a list; localStorage.setItem("books", JSON.stringify(books)); → C. saves the list as text, every time it changes; if (saved !== null) { … } → B. keeps the empty list on the very first visit

<!-- Speaker note: Load once, when the page opens; save every time the data changes. JSON is the bridge between a list and text. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Start again

**Start again empties the list on the page. After you press Run, the books are back. Why?**

- Start again never changed what was saved, so the next visit loads the old list
- localStorage can't be emptied
- The books were in the code
- Run undoes Start again

* Answer: Start again never changed what was saved, so the next visit loads the old list

<!-- Speaker note: The page and the saved copy are separate. Start again must also save the empty list, or remove the saved one. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 9

<!-- Speaker note: setItem saved the list as plain text (Book 1), not as JSON, so JSON.parse can't read it next time. Save it with JSON.stringify(books). -->

<style scoped>pre, marp-pre { font-size: 0.53em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Really start again:** Forget the saved copy.
- **Remember a name:** Save on every change.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-save/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Forgetting is part of saving; any input can be remembered by saving it when it changes and putting it back when the page opens. Hints, in order: Start again empties the list on the page, but the saved copy is still there. / Add localStorage.removeItem("books"); inside the Start again handler. / A box for the reader's name: save its value whenever it changes, and put the saved value back when the page opens. / An "input" event that runs localStorage.setItem("reader", reader.value); and, at the start, if getItem("reader") is not null, set reader.value to it. For students who need more support: Give the load and save lines on the board; students choose where each goes. For early finishers: Save the to-do app from Apps with Vue (see the note above). Save a whole object (name and score) as one JSON item. The hard part, on purpose: Students forget that saving is separate from the page: they change the list and expect it saved. Ask "which line saves it?" after every change they make. When students get stuck: Red error: is not valid JSON. Ask: Was the list saved with JSON.stringify? Fix: Save with JSON.stringify; the bad copy is still saved, so remove it once (localStorage.removeItem) and run again. / The data is gone after Run. Ask: Does the code save it when it changes, and load it at the start? Fix: setItem after every change; getItem when the page opens. / A saved number adds like text (1 + 1 = 11). Ask: What does getItem give back? Fix: Text: turn it into a number with Number(...). -->

<!-- Speaker note: Teacher: ask where in the code the saved data changes, and whether each place saves. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a best score that lasts

The clicker keeps a **best score**, but it is lost on every visit. Make it last: load it when the page opens and save it whenever it goes up.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-save/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: load at the start, save when it changes. -->

<!-- Speaker note: Teacher: ask when the best score must be loaded and when saved. -->

---

## Where this leads

For Vue: save inside `watch(tasks, …, { deep: true })` and load in `setup`. Next on the pathway: **Your site, for real**, where your page goes online.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why must a list be saved with JSON.stringify?**

* localStorage keeps only text; JSON.stringify turns the list into text that JSON.parse can turn back into a list.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next on the Web pathway: Your site, for real (accessibility, then putting the page online). Sharing saved data between people needs a server: Web apps with Flask. -->
