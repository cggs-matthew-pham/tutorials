---
title: "Building a list"
subtitle: "The DOM and the browser console · Building blocks · Lesson 5"
---

# Building a list

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A feed, a shopping basket and a chat are all lists that grow: the code makes a new element and puts it on the page.


:::teacher-note

**In one sentence:** Students make elements with createElement and put them on the page with append, loop over an array to build a list, add items from a box, fix a push that never reaches the page, and add features of their own.

**Students should be able to say:** I can make a new element and add it to the page. I can build a list on the page from an array. I can make each new element do something when clicked.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

How many times does the loop run, and what happens each time?

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

:::keep-together

**How many bullet points does the page show?**

☐ 0

☐ 1

☐ 3

☐ 4

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 3. The loop runs once for each of the three items. Each time it makes a new li, gives it the item as text, and appends it to the list.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Which line does what?

**Match each line with what it does.**

A. gives the new li the typed words

B. empties the box ready for the next item

C. puts the li at the end of the list on the page

D. makes a new li that is not on the page yet

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `document.createElement("li")` | |
| `li.textContent = input.value;` | |
| `list.append(li);` | |
| `input.value = "";` | |

:::


:::teacher-note

**Answer:** document.createElement("li") → D. makes a new li that is not on the page yet; li.textContent = input.value; → A. gives the new li the typed words; list.append(li); → C. puts the li at the end of the list on the page; input.value = ""; → B. empties the box ready for the next item

:::


:::keep-together

### What shows it?

**What makes the new item appear on the page?**

☐ document.createElement("li")

☐ li.textContent = …

☐ input.value = ""

☐ list.append(li)

:::


:::teacher-note

**Answer:** list.append(li)

createElement only makes the element, in memory. append puts it into the page; before that, nobody can see it.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 8

items.push changes the array in the script only. The page changes when the code makes an li and appends it to the list.

:::


:::typical

## Modify


**Click to remove.** Each li gets its own listener.

**No empty items.** Stop early.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Click to remove:**

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
    li.addEventListener("click", function () {
      li.remove();
    });
    list.append(li);
    input.value = "";
  });
</script>
```

**No empty items:**

```html
<input id="item" placeholder="Add an item">
<button id="add">Add</button>
<ul id="list"></ul>
<script>
  const input = document.querySelector("#item");
  const list = document.querySelector("#list");
  document.querySelector("#add").addEventListener("click", function () {
    if (input.value === "") {
      return;
    }
    const li = document.createElement("li");
    li.textContent = input.value;
    list.append(li);
    input.value = "";
  });
</script>
```

:::

:::


## Make: a list of your own

Make a list of your own that grows as someone types: a shopping list, a homework tracker, a playlist, a scoreboard. Add **one more feature**: remove on click, a counter of items, a limit. The page on this lesson counts tasks left.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>Homework tracker</h1>
<input id="item" placeholder="A task">
<button id="add">Add task</button>
<ul id="list"></ul>
<p><span id="left">0</span> tasks left</p>
<script>
  const input = document.querySelector("#item");
  const list = document.querySelector("#list");
  const left = document.querySelector("#left");
  let remaining = 0;
  document.querySelector("#add").addEventListener("click", function () {
    if (input.value === "") {
      return;
    }
    const li = document.createElement("li");
    li.textContent = input.value;
    li.addEventListener("click", function () {
      li.remove();
      remaining = remaining - 1;
      left.textContent = remaining;
    });
    list.append(li);
    remaining = remaining + 1;
    left.textContent = remaining;
    input.value = "";
  });
</script>
```

:::


:::wider

## Where this leads

You can now grow a page. Next: a page that **keeps a score** between clicks.

:::


## Exit ticket

:::keep-together

**What is the difference between createElement and append?**

{{lines-3}}

:::


:::teacher-note

**Answer:** createElement makes the element in memory; append puts it on the page, where people can see it.

:::

