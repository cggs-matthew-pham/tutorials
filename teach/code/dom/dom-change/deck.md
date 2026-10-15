---
marp: true
theme: default
html: true
---

# Find and change

The DOM and the browser console · Change the page

<!-- Speaker note: Students find an element with querySelector, change its text and colour from JavaScript, read console.log in the Console, meet null from a mistyped selector, and change three elements on a page of their own. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** find an element on a page with JavaScript, change its text and colour, and read what the console says.

- I can find an element on a page with JavaScript.
- I can change its text and its colour.
- I can read the Console to see what my code did.

<!-- Speaker note: Before class: Read the unit primer first. Students know HTML and CSS (and, from p5.js, variables and functions); this is the first time JavaScript meets a page. `document.querySelector` takes a CSS-style selector as text: `#id`, `.class`, or a tag. `textContent` is the words, `style.color` and `style.fontSize` the look. The script sits below the elements it finds: it runs when the browser reaches it. The bug task is the most common slip of the whole course: a selector that matches nothing returns `null`, and the error appears on the next line. The playground says so in its hint. Our playground runs the whole page again each time you press Run, so changes made by the script always start from the HTML. -->

---

## Why it matters

> Every button that opens a menu, every counter that goes up and every live search is JavaScript changing a page that is already on screen.

<!-- Speaker note: A web page is a tree of **elements**. JavaScript can find one and change it while the page is open. Two steps do most of the work: 1. **Find it**: `document.querySelector("#title")` finds the element with `id="title"`. A `#` means an id, a `.` means a class (`".note"`), and a plain word means a tag (`"h1"`). 2. **Change it**: `title.textContent = "New words"` replaces its text, and `title.style.color = "crimson"` changes its colour. `console.log(...)` writes a message in the **Console** under the page, to see what your code is doing. **The hard part** is the selector. It is just text, so a typo finds nothing: the answer is `null`, and the next line fails with "Cannot set properties of null". When you see `null`, check the selector first. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<h1 id="title">Sports day</h1>
<p class="note">Bring a hat.</p>
<script>
  const title = document.querySelector("#title");
  title.textContent = "Sports day: moved to Friday";
  console.log(title.textContent);
</script>
```

**What does the heading say once the page has loaded?**

- Moved to Friday
- Nothing: a script cannot change a heading
- Sports day
- Sports day: moved to Friday

<!-- Speaker note: What happens: Sports day: moved to Friday. The script finds the heading and replaces its text, and console.log then writes the new text in the Console. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what the page looks like before the script runs, and after. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Sports day: moved to Friday. The script finds the heading and replaces its text, and console.log then writes the new text in the Console.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/dom/dom-change/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/dom/dom-change/?full=step-2#step-2)

<!-- Speaker note: Press **Run**. The page starts as plain HTML, and then the script changes two elements. The Console shows what `console.log` wrote. Students should be able to say: I can see that JavaScript changed the heading and the note after the page loaded. -->

<!-- Speaker note: Teacher: point out the Console under the page and where the message came from. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: querySelector turns a selector into an element, and changing the element's properties changes the page; a selector that matches nothing gives null. -->

<!-- Speaker note: Teacher: for the bug, ask 'what does querySelector give you when it finds nothing?' -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which line does what?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**Match each line with what it does.**

| | |
|---|---|
| `document.querySelector("#title")` | A. finds the first element with class note |
| `document.querySelector(".note")` | B. writes the text in the Console, not on the page |
| `title.textContent = "Moved";` | C. replaces the words inside the element |
| `console.log(title.textContent);` | D. finds the element with id title |

* Answer: document.querySelector("#title") → D. finds the element with id title; document.querySelector(".note") → A. finds the first element with class note; title.textContent = "Moved"; → C. replaces the words inside the element; console.log(title.textContent); → B. writes the text in the Console, not on the page

</div>
</div>

<!-- Speaker note:  -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Script order

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**Why is the script below the heading and not above it?**

- Scripts only work at the bottom of a file
- A script runs as soon as the browser reaches it, so the heading must already exist
- It makes the page load faster
- The heading would disappear otherwise

* Answer: A script runs as soon as the browser reaches it, so the heading must already exist

</div>
</div>

<!-- Speaker note: The browser reads the page from the top. A script above the heading would run before the heading exists, so querySelector would find null. -->

<style scoped>section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This stops with an error: Cannot set properties of null. Click the line that is the real cause.**

```
 1  <h1 id="title">Sports day</h1>
 2  <p class="note">Bring a hat.</p>
 3  <script>
 4    const title = document.querySelector("#titel");
 5    title.textContent = "Sports day: moved to Friday";
 6  </script>
```

* Answer: line 4

<!-- Speaker note: The error shows on line 5, but the cause is line 4: the heading's id is title, so #titel finds nothing and title is null. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **The note:** Change the note to say you should bring **sunscreen** too.
- **Crimson:** Make the heading **crimson**.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-change/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Every element has its own text and style; find it with its own selector. Hints, in order: The note has class note, so its selector starts with a dot. / const note = document.querySelector(".note"); then note.textContent = "…"; / Style properties are on the element's style: title.style.color. / The value is text, in quotes: title.style.color = "crimson"; For students who need more support: Give the first two lines (find, then change) and ask students to copy the pattern for each other element. For early finishers: Change the page title in the browser tab with document.title, or change an element's background with style.backgroundColor. The hard part, on purpose: The selector is text and a typo gives null, with the error one line later. Teach 'null means check the selector' before anything else. When students get stuck: Cannot set properties of null. Ask: Does the selector match the id or class exactly, with Fix: Copy the id or class from the HTML, and add / Nothing changes, and there is no error. Ask: Did you press Run, and is the change on a line after the selector? Fix: Press Run again, and check the line that changes the element is inside the script. / The colour or size does not change. Ask: Is the value in quotes and spelled as CSS spells it? Fix: Write el.style.color = "red"; and el.style.fontSize = "24px"; (capital S in fontSize). / The page shows the script as text. Ask: Is the code inside <script> and </script>? Fix: Wrap the JavaScript in script tags. -->

<!-- Speaker note: Teacher: ask students to say the selector aloud: 'hash for id, dot for class'. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: change three things

Find **three elements** and change something about each: text, colour (`style.color`), size (`style.fontSize = "24px"`). Add more elements of your own to the page if you like.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-change/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: find three elements and change something about each. -->

<!-- Speaker note: Teacher: ask each student which element they found first and how they knew its selector. -->

---

## Where this leads

Your code can now find and change anything on a page. Next: make it happen **when someone clicks**.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What does querySelector give you if nothing matches?**

* null, which has no textContent: that is why the next line fails.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: events, so the change happens when someone clicks. -->
