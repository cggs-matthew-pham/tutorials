---
title: "Find and change"
subtitle: "The DOM and the browser console · Change the page · Lesson 1"
---

# Find and change

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every button that opens a menu, every counter that goes up and every live search is JavaScript changing a page that is already on screen.


:::teacher-note

**In one sentence:** Students find an element with querySelector, change its text and colour from JavaScript, read console.log in the Console, meet null from a mistyped selector, and change three elements on a page of their own.

**Students should be able to say:** I can find an element on a page with JavaScript. I can change its text and its colour. I can read the Console to see what my code did.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Does the script run before or after the heading has appeared?

```html
<h1 id="title">Sports day</h1>
<p class="note">Bring a hat.</p>
<script>
  const title = document.querySelector("#title");
  title.textContent = "Sports day: moved to Friday";
  console.log(title.textContent);
</script>
```

:::keep-together

**What does the heading say once the page has loaded?**

☐ Moved to Friday

☐ Nothing: a script cannot change a heading

☐ Sports day

☐ Sports day: moved to Friday

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Sports day: moved to Friday. The script finds the heading and replaces its text, and console.log then writes the new text in the Console.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<h1 id="title">Sports day</h1>
<p class="note">Bring a hat.</p>
<script>
  const title = document.querySelector("#title");
  title.textContent = "Sports day: moved to Friday";
  const note = document.querySelector(".note");
  note.textContent = "Bring a hat and water.";
  note.style.fontStyle = "italic";
  console.log(title.textContent);
</script>
```

:::keep-together

### Which line does what?

**Match each line with what it does.**

A. finds the first element with class note

B. writes the text in the Console, not on the page

C. replaces the words inside the element

D. finds the element with id title

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `document.querySelector("#title")` | |
| `document.querySelector(".note")` | |
| `title.textContent = "Moved";` | |
| `console.log(title.textContent);` | |

:::


:::teacher-note

**Answer:** document.querySelector("#title") → D. finds the element with id title; document.querySelector(".note") → A. finds the first element with class note; title.textContent = "Moved"; → C. replaces the words inside the element; console.log(title.textContent); → B. writes the text in the Console, not on the page

:::


:::keep-together

### Script order

**Why is the script below the heading and not above it?**

☐ Scripts only work at the bottom of a file

☐ A script runs as soon as the browser reaches it, so the heading must already exist

☐ It makes the page load faster

☐ The heading would disappear otherwise

:::


:::teacher-note

**Answer:** A script runs as soon as the browser reaches it, so the heading must already exist

The browser reads the page from the top. A script above the heading would run before the heading exists, so querySelector would find null.

:::


:::keep-together

### Spot the bug

**This stops with an error: Cannot set properties of null. Click the line that is the real cause.**

```
 1  <h1 id="title">Sports day</h1>
 2  <p class="note">Bring a hat.</p>
 3  <script>
 4    const title = document.querySelector("#titel");
 5    title.textContent = "Sports day: moved to Friday";
 6  </script>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

The error shows on line 5, but the cause is line 4: the heading's id is title, so #titel finds nothing and title is null.

:::


:::typical

## Modify


**The note.** Change the note to say you should bring **sunscreen** too.

**Crimson.** Make the heading **crimson**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**The note:**

```html
<h1 id="title">Sports day</h1>
<p class="note">Bring a hat.</p>
<script>
  const title = document.querySelector("#title");
  title.textContent = "Sports day: moved to Friday";
  const note = document.querySelector(".note");
  note.textContent = "Bring a hat, water and sunscreen.";
</script>
```

**Crimson:**

```html
<h1 id="title">Sports day</h1>
<p class="note">Bring a hat.</p>
<script>
  const title = document.querySelector("#title");
  title.textContent = "Sports day: moved to Friday";
  title.style.color = "crimson";
</script>
```

:::

:::


## Make: change three things

Find **three elements** and change something about each: text, colour (`style.color`), size (`style.fontSize = "24px"`). Add more elements of your own to the page if you like.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1 id="title">My page</h1>
<p class="note">Change me with JavaScript.</p>
<p id="extra">Me too.</p>
<script>
  const title = document.querySelector("#title");
  title.textContent = "Welcome to my page";
  title.style.color = "teal";
  const note = document.querySelector(".note");
  note.textContent = "Written by JavaScript.";
  note.style.fontSize = "24px";
  const extra = document.querySelector("#extra");
  extra.textContent = "Me too, in a different colour.";
  extra.style.color = "darkorange";
</script>
```

:::


:::wider

## Where this leads

Your code can now find and change anything on a page. Next: make it happen **when someone clicks**.

:::


## Exit ticket

:::keep-together

**What does querySelector give you if nothing matches?**

{{lines-3}}

:::


:::teacher-note

**Answer:** null, which has no textContent: that is why the next line fails.

:::

