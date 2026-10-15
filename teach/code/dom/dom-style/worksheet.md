---
title: "Classes and themes"
subtitle: "The DOM and the browser console · Change the page · Lesson 3"
---

# Classes and themes

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Dark mode, open menus and highlighted rows are all the same trick: JavaScript adds or removes a class, and CSS does the rest.


:::teacher-note

**In one sentence:** Students switch CSS classes with classList.toggle, add and remove, hide and show a tip with a hidden class, fix a classList call written with a dot, and make a themed page of their own.

**Students should be able to say:** I can switch a class on and off with classList. I can write a CSS class and use JavaScript to decide when it applies. I can show and hide something with a class.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Where does the dark look come from: the script or the style?

```html
<style>
  body { font-family: system-ui, sans-serif; padding: 16px; }
  .dark { background: midnightblue; color: white; }
  .hidden { display: none; }
  .big { font-size: 48px; }
</style>
<h1>Night mode</h1>
<p>Click the button to switch between light and dark.</p>
<button id="theme">Switch theme</button>
<script>
  const button = document.querySelector("#theme");
  button.addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
</script>
```

:::keep-together

**What happens the first time the button is clicked?**

☐ The page goes dark

☐ The page reloads

☐ Nothing: the class dark does not exist yet

☐ The button disappears

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The page goes dark. The CSS already has a .dark rule. toggle adds the class dark to the body, and the rule applies.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<style>
  body { font-family: system-ui, sans-serif; padding: 16px; }
  .dark { background: midnightblue; color: white; }
  .hidden { display: none; }
  .big { font-size: 48px; }
</style>
<h1>Night mode</h1>
<button id="theme">Switch theme</button>
<button id="tip-button">Show tip</button>
<p id="tip" class="hidden">Tip: dark pages are easier on the eyes at night.</p>
<script>
  document.querySelector("#theme").addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
  document.querySelector("#tip-button").addEventListener("click", function () {
    document.querySelector("#tip").classList.toggle("hidden");
  });
</script>
```

:::keep-together

### Which part does what?

**Match each piece with what it does.**

A. adds dark to the body if missing, removes it if there

B. takes the class away

C. adds the class, even if it is already there

D. CSS: what the dark look is

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `.dark { background: midnightblue; }` | |
| `document.body.classList.toggle("dark");` | |
| `classList.add("dark")` | |
| `classList.remove("dark")` | |

:::


:::teacher-note

**Answer:** .dark { background: midnightblue; } → D. CSS: what the dark look is; document.body.classList.toggle("dark"); → A. adds dark to the body if missing, removes it if there; classList.add("dark") → C. adds the class, even if it is already there; classList.remove("dark") → B. takes the class away

:::


:::keep-together

### Why a class?

**Why is hidden good for a tip that starts out of sight?**

☐ The CSS rule .hidden { display: none; } hides it, and removing the class shows it

☐ The tip is made when clicked

☐ hidden is a special word in JavaScript

☐ JavaScript deletes the tip

:::


:::teacher-note

**Answer:** The CSS rule .hidden { display: none; } hides it, and removing the class shows it

The class hidden has a CSS rule that hides the element. The tip is always in the page; toggling the class shows or hides it.

:::


:::keep-together

### Spot the bug

**Clicking the button does nothing, and there is no red error. Click the line that is wrong.**

```
 1  <style>
 2    body { font-family: system-ui, sans-serif; padding: 16px; }
 3    .dark { background: midnightblue; color: white; }
 4    .hidden { display: none; }
 5    .big { font-size: 48px; }
 6  </style>
 7  <h1>Night mode</h1>
 8  <button id="theme">Switch theme</button>
 9  <script>
10    document.querySelector("#theme").addEventListener("click", function () {
11      document.body.classList.toggle(".dark");
12    });
13  </script>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 11

classList takes the plain class name: toggle("dark"). With the dot, it toggles a class called ".dark", which no CSS rule matches.

:::


:::typical

## Modify


**A bigger heading.** Reuse a class.

**Two buttons.** add and remove.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A bigger heading:**

```html
<style>
  body { font-family: system-ui, sans-serif; padding: 16px; }
  .dark { background: midnightblue; color: white; }
  .hidden { display: none; }
  .big { font-size: 48px; }
</style>
<h1 id="heading">Night mode</h1>
<button id="theme">Switch theme</button>
<button id="tip-button">Show tip</button>
<button id="size">Bigger heading</button>
<p id="tip" class="hidden">Tip: dark pages are easier on the eyes at night.</p>
<script>
  document.querySelector("#theme").addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
  document.querySelector("#tip-button").addEventListener("click", function () {
    document.querySelector("#tip").classList.toggle("hidden");
  });
  document.querySelector("#size").addEventListener("click", function () {
    document.querySelector("#heading").classList.toggle("big");
  });
</script>
```

**Two buttons:**

```html
<style>
  body { font-family: system-ui, sans-serif; padding: 16px; }
  .dark { background: midnightblue; color: white; }
  .hidden { display: none; }
  .big { font-size: 48px; }
</style>
<h1>Night mode</h1>
<button id="light">Light</button>
<button id="night">Dark</button>
<script>
  document.querySelector("#light").addEventListener("click", function () {
    document.body.classList.remove("dark");
  });
  document.querySelector("#night").addEventListener("click", function () {
    document.body.classList.add("dark");
  });
</script>
```

:::

:::


## Make: your own themes

Write **two or more classes** of your own in the CSS (an ocean theme, spaced-out letters, a card style, something hidden), and give each its own button. The page on this lesson uses three.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  body { font-family: system-ui, sans-serif; padding: 16px; background: lightyellow; }
  .ocean { background: navy; color: white; }
  .spaced { letter-spacing: 4px; }
  .card { padding: 12px; border: 2px solid teal; border-radius: 12px; }
  .hidden { display: none; }
</style>
<h1 class="card">My themes</h1>
<button id="theme">Ocean theme</button>
<button id="space">Spaced letters</button>
<button id="more">Show more</button>
<p id="extra" class="hidden">Everything here is switched with classList.</p>
<script>
  document.querySelector("#theme").addEventListener("click", function () {
    document.body.classList.toggle("ocean");
  });
  document.querySelector("#space").addEventListener("click", function () {
    document.querySelector("h1").classList.toggle("spaced");
  });
  document.querySelector("#more").addEventListener("click", function () {
    document.querySelector("#extra").classList.toggle("hidden");
  });
</script>
```

:::


:::wider

## Where this leads

You can now change a whole page with one line. Next: **read what someone types**.

:::


## Exit ticket

:::keep-together

**Why does classList.toggle("dark") have no dot?**

{{lines-3}}

:::


:::teacher-note

**Answer:** classList takes the class name, not a CSS selector: the dot is only for CSS rules and querySelector.

:::

