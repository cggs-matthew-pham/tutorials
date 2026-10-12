---
marp: true
theme: default
html: true
---

# Classes and themes

The DOM and the browser console · Change the page

<!-- Speaker note: Students switch CSS classes with classList.toggle, add and remove, hide and show a tip with a hidden class, fix a classList call written with a dot, and make a themed page of their own. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** switch a whole look on and off with classList.toggle, so CSS does the styling and JavaScript only flips a class.

- I can switch a class on and off with classList.
- I can write a CSS class and use JavaScript to decide when it applies.
- I can show and hide something with a class.

<!-- Speaker note: Before class: Read the unit primer first. This ties the CSS lessons to JavaScript: the look is in `<style>`, the script only flips a class. `classList.toggle("dark")` on `document.body` applies a rule to the whole page. The classic slip is `classList.toggle(".dark")`: no error, no change. The bug task is a logic bug, so students must click the button and notice nothing happens. Hiding with a `.hidden { display: none }` class is the pattern behind menus, tabs and tips; make the link to "display" from the CSS course. -->

---

## Why it matters

> Dark mode, open menus and highlighted rows are all the same trick: JavaScript adds or removes a class, and CSS does the rest.

<!-- Speaker note: You already know CSS: a **class** such as `.dark` says how something looks. JavaScript can switch a class on and off: ```js document.body.classList.toggle("dark"); ``` `toggle` adds the class if the element has not got it, and removes it if it has. `add("dark")` and `remove("dark")` do one or the other. In `classList`, the class name is written **without the dot**. This is the neatest way to change a look: the CSS stays in `<style>`, and JavaScript only decides **when**. **The hard part** is the dot. In CSS the rule is `.dark`, but `classList.toggle(".dark")` makes a class actually called `.dark` that nothing styles, so nothing happens and there is no error. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**What happens the first time the button is clicked?**

- The page goes dark
- The page reloads
- Nothing: the class dark does not exist yet
- The button disappears

<!-- Speaker note: What happens: The page goes dark. The CSS already has a .dark rule. toggle adds the class dark to the body, and the rule applies. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask where the colour of the dark page is written. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The page goes dark. The CSS already has a .dark rule. toggle adds the class dark to the body, and the rule applies.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/dom/dom-style/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/dom/dom-style/?full=step-2#step-2)

<!-- Speaker note: Press **Run**. One button flips `dark` on the body; the other flips `hidden` on the tip. Click each one twice. Students should be able to say: I toggled the dark theme and the tip, and each button flipped its own class. -->

<!-- Speaker note: Teacher: ask students to click each button twice and say what toggle does. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: classList.toggle switches a CSS class on and off; the look lives in the CSS, and the script only decides when. The class name goes in quotes without the dot. -->

<!-- Speaker note: Teacher: for the bug, ask "is it the CSS or the script, and how can you tell?" -->

<style scoped>pre, marp-pre { font-size: 0.57em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which part does what?

**Match each piece with what it does.**

| | |
|---|---|
| `.dark { background: midnightblue; }` | A. adds dark to the body if missing, removes it if there |
| `document.body.classList.toggle("dark");` | B. takes the class away |
| `classList.add("dark")` | C. adds the class, even if it is already there |
| `classList.remove("dark")` | D. CSS: what the dark look is |

* Answer: .dark { background: midnightblue; } → D. CSS: what the dark look is; document.body.classList.toggle("dark"); → A. adds dark to the body if missing, removes it if there; classList.add("dark") → C. adds the class, even if it is already there; classList.remove("dark") → B. takes the class away

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why a class?

**Why is hidden good for a tip that starts out of sight?**

- The CSS rule .hidden { display: none; } hides it, and removing the class shows it
- The tip is made when clicked
- hidden is a special word in JavaScript
- JavaScript deletes the tip

* Answer: The CSS rule .hidden { display: none; } hides it, and removing the class shows it

<!-- Speaker note: The class hidden has a CSS rule that hides the element. The tip is always in the page; toggling the class shows or hides it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 11

<!-- Speaker note: classList takes the plain class name: toggle("dark"). With the dot, it toggles a class called ".dark", which no CSS rule matches. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A bigger heading:** Reuse a class.
- **Two buttons:** add and remove.

[Open this step](https://tutorials.learningwaypoints.com/code/dom/dom-style/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A new look is a new class in the CSS and one classList line; add and remove give you separate buttons. Hints, in order: The CSS already has a class called big. Which element should get it? / Give the heading an id, add a button, and toggle big on the heading with classList. / toggle flips; add and remove do one job each. / Make a Light button that removes dark and a Dark button that adds it. For students who need more support: Give the CSS classes ready-made and ask students to write only the buttons and listeners. For early finishers: Remember the theme with a second class for each choice, or make a button that cycles through three themes using a variable. The hard part, on purpose: The dot: the CSS rule is .dark but the class name is dark. The page does nothing and says nothing. When students get stuck: Clicking does nothing and there is no error. Ask: Does the class name in classList have a dot? Fix: Remove the dot: toggle("dark"). / The class is added but nothing changes. Ask: Does the CSS have a rule for exactly that class name? Fix: Check the spelling of the rule and the class. / Cannot read properties of null. Ask: Does the id in the selector match the HTML? Fix: Match the id, with a #. / It changes the wrong thing. Ask: Which element did you call classList on? Fix: Check the selector, and use document.body for the whole page. -->

<!-- Speaker note: Teacher: ask which element gets the class in each case. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own themes

Write **two or more classes** of your own in the CSS (an ocean theme, spaced-out letters, a card style, something hidden), and give each its own button. The page on this lesson uses three.

[Open this step](https://tutorials.learningwaypoints.com/code/dom/dom-style/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: at least two classes in the CSS, each switched with classList by its own button. -->

<!-- Speaker note: Teacher: ask each student to list their classes before writing the buttons. -->

---

## Where this leads

You can now change a whole page with one line. Next: **read what someone types**.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does classList.toggle("dark") have no dot?**

* classList takes the class name, not a CSS selector: the dot is only for CSS rules and querySelector.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: inputs, reading what someone types. -->
