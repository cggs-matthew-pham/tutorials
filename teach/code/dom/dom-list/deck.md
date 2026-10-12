---
marp: true
theme: default
html: true
---

# Building a list

The DOM and the browser console · Building blocks

<!-- Speaker note: Students make elements with createElement and put them on the page with append, loop over an array to build a list, add items from a box, fix a push that never reaches the page, and add features of their own. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** make new elements with createElement and add them to the page, so a list can grow, one click at a time.

- I can make a new element and add it to the page.
- I can build a list on the page from an array.
- I can make each new element do something when clicked.

<!-- Speaker note: Before class: Read the unit primer first. This brings together arrays and loops (p5.js) with the page: the array is data, the list on the page is a picture of it. `createElement` makes an element in memory; `append` is what shows it. `li.remove()` takes one away. The classic slip is changing the array and expecting the page to follow, so the bug has no red error. A listener added to each new li is a closure over `li`: students do not need that word, only that "this li removes itself". Plain `append`, `createElement` and `remove` are enough; we do not use innerHTML on purpose. -->

---

## Why it matters

> A feed, a shopping basket and a chat are all lists that grow: the code makes a new element and puts it on the page.

<!-- Speaker note: A page changes only when your code changes it. To add a line to a list you do three things: ```js const li = document.createElement("li"); // make a new <li> li.textContent = "milk"; // give it text list.append(li); // put it into the list ``` `createElement("li")` makes an element that is **not on the page yet**. `append` is what puts it there. `li.remove()` takes one off again. **The hard part** is the difference between a list in your script (an array) and the list people see. Pushing to an array changes nothing on the page: the page only changes when you make or remove elements. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<ul id="list"></ul>
<script>
  const items = ["apples", "bread", "milk"];
  const list = document.querySelector("#list");
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    list.append(li);
  }
</script>
```

**How many bullet points does the page show?**

- 0
- 1
- 3
- 4

<!-- Speaker note: What happens: 3. The loop runs once for each of the three items. Each time it makes a new li, gives it the item as text, and appends it to the list. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask students to count the loop turns on their fingers. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 3. The loop runs once for each of the three items. Each time it makes a new li, gives it the item as text, and appends it to the list.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/dom/dom-list/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/dom/dom-list/?full=step-2#step-2)

<!-- Speaker note: Press **Run**. Type something and click **Add**: each click makes a new `<li>` and puts it on the page. Students should be able to say: I added several items to the list with the box and button. -->

<!-- Speaker note: Teacher: ask where the new li came from, and where it went. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<input id="item" placeholder="Add an item">
<button id="add">Add</button>
<ul id="list"></ul>
<script>
  const input = document.querySelector("#item");
  const list = document.querySelector("#list");
  document.querySelector("#add").addEventListener("click", function () {
    const li = document.createElement("li");
    li.textContent = input.value;
    list.append(li);
    input.value = "";
  });
</script>
```

<!-- Speaker note: What this step is for: A new element is made with createElement and only appears once it is appended; changing an array does not change the page, so update both. -->

<!-- Speaker note: Teacher: for the bug, ask "what does the page know about the array?" -->

<style scoped>pre, marp-pre { font-size: 0.79em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which line does what?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<input id="item" placeholder="Add an item">
<button id="add">Add</button>
<ul id="list"></ul>
<script>
  const input = document.querySelector("#item");
  const list = document.querySelector("#list");
  document.querySelector("#add").addEventListener("click", function () {
    const li = document.createElement("li");
    li.textContent = input.value;
    list.append(li);
    input.value = "";
  });
</script>
```

</div>
<div>

**Match each line with what it does.**

| | |
|---|---|
| `document.createElement("li")` | A. gives the new li the typed words |
| `li.textContent = input.value;` | B. empties the box ready for the next item |
| `list.append(li);` | C. puts the li at the end of the list on the page |
| `input.value = "";` | D. makes a new li that is not on the page yet |

* Answer: document.createElement("li") → D. makes a new li that is not on the page yet; li.textContent = input.value; → A. gives the new li the typed words; list.append(li); → C. puts the li at the end of the list on the page; input.value = ""; → B. empties the box ready for the next item

</div>
</div>

<!-- Speaker note:  -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What shows it?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<input id="item" placeholder="Add an item">
<button id="add">Add</button>
<ul id="list"></ul>
<script>
  const input = document.querySelector("#item");
  const list = document.querySelector("#list");
  document.querySelector("#add").addEventListener("click", function () {
    const li = document.createElement("li");
    li.textContent = input.value;
    list.append(li);
    input.value = "";
  });
</script>
```

</div>
<div>

**What makes the new item appear on the page?**

- document.createElement("li")
- li.textContent = …
- input.value = ""
- list.append(li)

* Answer: list.append(li)

</div>
</div>

<!-- Speaker note: createElement only makes the element, in memory. append puts it into the page; before that, nobody can see it. -->

<style scoped>section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**Clicking Add changes nothing on the page, and there is no red error. Click the line that is the problem.**

```
 1  <input id="item" placeholder="Add an item">
 2  <button id="add">Add</button>
 3  <ul id="list"></ul>
 4  <script>
 5    const items = [];
 6    const input = document.querySelector("#item");
 7    document.querySelector("#add").addEventListener("click", function () {
 8      items.push(input.value);
 9      input.value = "";
10    });
11  </script>
```

* Answer: line 8

<!-- Speaker note: items.push changes the array in the script only. The page changes when the code makes an li and appends it to the list. -->

<style scoped>pre, marp-pre { font-size: 0.53em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Click to remove:** Each li gets its own listener.
- **No empty items:** Stop early.

[Open this step](https://tutorials.learningwaypoints.com/code/dom/dom-list/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A handler can be added to every new element, and an if with return stops a handler early. Hints, in order: Each new li can have its own listener, made at the same time as the li. / Inside the Add handler, li.addEventListener("click", function () { li.remove(); }); / Check the box before you make anything. / if (input.value === "") { return; } at the top of the handler stops an empty item. For students who need more support: Give the Add handler complete and ask students only for the remove-on-click. For early finishers: Add a Clear all button, or keep the items in an array as well, and show how many there are. The hard part, on purpose: Made is not shown: createElement does nothing visible until append. Ask "is it on the page yet?" at every step. When students get stuck: Clicking Add changes nothing. Ask: Does the handler make an element and append it? Fix: Make an li, set its text, then list.append(li). / Cannot read properties of null (reading append). Ask: Does the list id match the selector? Fix: Match the id exactly, with #. / Every item removes at once, or the wrong one. Ask: Is the listener inside the handler, on the new li? Fix: Add li.addEventListener inside the Add handler, before append. / Empty items still appear. Ask: Is the check before the li is made? Fix: Put the if and return at the top of the handler. -->

<!-- Speaker note: Teacher: ask what return does inside a handler. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a list of your own

Make a list of your own that grows as someone types: a shopping list, a homework tracker, a playlist, a scoreboard. Add **one more feature**: remove on click, a counter of items, a limit. The page on this lesson counts tasks left.

[Open this step](https://tutorials.learningwaypoints.com/code/dom/dom-list/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a list that grows from what someone types, with one more feature of your own. -->

<!-- Speaker note: Teacher: ask each student what the elements of their list are, and what each one should do. -->

---

## Where this leads

You can now grow a page. Next: a page that **keeps a score** between clicks.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What is the difference between createElement and append?**

* createElement makes the element in memory; append puts it on the page, where people can see it.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: a page that keeps a score between clicks. -->
