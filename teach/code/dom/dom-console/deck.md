---
marp: true
theme: default
html: true
---

# The real browser console

The DOM and the browser console · Final challenge: a quiz page

<!-- Speaker note: Students use console.log, warn and error to look inside a page, find elements with querySelectorAll and count them, read an error message for its name and line, and try the real browser Console. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** use console.log to look inside your page, read error messages, and try the real Console and inspector in your own browser.

- I can use console.log to see what my code is doing.
- I can read an error message for the name and the line.
- I can open my browser's Console and inspector.

<!-- Speaker note: Before class: Optional enrichment after the challenge. The playground's Console shows what `console.log`, `warn` and `error` write, and what the browser would say about an error, in plain words first. In the real browser, F12 (or right-click, Inspect) opens the DevTools; the Console tab is the same idea, with more tools. Check the school's browsers allow DevTools before the lesson: some managed devices block it, and the Make step then stays in the playground. Make a point of the safety rule: never paste code into the Console because someone told you to. Changes made in the real Console last until the page is reloaded and do not change the real site. -->

---

## Why it matters

> Every web developer keeps the Console open all the time: it is how you find out what your code is really doing.

<!-- Speaker note: The **Console** is a list of messages from your page. `console.log(...)` writes one, `console.warn(...)` writes a warning, and `console.error(...)` writes an error. When something goes wrong the browser writes its own red error there, with the line it happened on. `document.querySelectorAll("p")` finds **every** matching element, not just the first, and its `.length` says how many. The Console in this playground is a copy of the real one. Your browser has a **real** Console and an **inspector** on every web page: press **F12** (or right-click a page and choose **Inspect**), then open the **Console** tab. **The hard part** is reading the message. An error such as `cout is not defined` is telling you the name it could not find, and the line: read both before you change anything. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<p id="demo">Hello</p>
<script>
  const demo = document.querySelector("#demo");
  console.log("The text is:", demo.textContent);
  console.log("The length is", demo.textContent.length);
  console.warn("Careful!");
  console.error("Something is wrong");
</script>
```

**How many messages does the Console show?**

- 0
- 1
- 2
- 4

<!-- Speaker note: What happens: 4. There are two console.log lines, one console.warn and one console.error. Each writes a message in the Console, in its own style. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask students to count console lines before running. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 4. There are two console.log lines, one console.warn and one console.error. Each writes a message in the Console, in its own style.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/dom/dom-console/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/dom/dom-console/?full=step-2#step-2)

<!-- Speaker note: Press **Run** and look at the Console under the page. The script logs what it found: the heading, the first paragraph and its tag name. Students should be able to say: I ran the page and read the three messages in the Console. -->

<!-- Speaker note: Teacher: ask where the messages appear and where they do not. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<h1>Sports day</h1>
<p>Bring a hat.</p>
<p>Bring water.</p>
<script>
  const heading = document.querySelector("h1");
  console.log("Heading:", heading.textContent);
  const paragraph = document.querySelector("p");
  console.log("First paragraph:", paragraph.textContent);
  console.log("Is it a paragraph?", paragraph.tagName);
</script>
```

<!-- Speaker note: What this step is for: console.log shows what your code sees without changing the page, and an error message names the problem and the line, so read both. -->

<!-- Speaker note: Teacher: for the bug, ask "what is the exact word it does not know?" -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which piece does what?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h1>Sports day</h1>
<p>Bring a hat.</p>
<p>Bring water.</p>
<script>
  const heading = document.querySelector("h1");
  console.log("Heading:", heading.textContent);
  const paragraph = document.querySelector("p");
  console.log("First paragraph:", paragraph.textContent);
  console.log("Is it a paragraph?", paragraph.tagName);
</script>
```

</div>
<div>

**Match each piece with what it does.**

| | |
|---|---|
| `console.log("Heading:", heading.textContent);` | A. writes a warning in the Console |
| `console.warn("Careful!");` | B. the first paragraph only |
| `document.querySelectorAll("p").length` | C. how many paragraphs are on the page |
| `document.querySelector("p")` | D. writes a message with a label and the value |

* Answer: console.log("Heading:", heading.textContent); → D. writes a message with a label and the value; console.warn("Careful!"); → A. writes a warning in the Console; document.querySelectorAll("p").length → C. how many paragraphs are on the page; document.querySelector("p") → B. the first paragraph only

</div>
</div>

<!-- Speaker note:  -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Reading an error

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h1>Sports day</h1>
<p>Bring a hat.</p>
<p>Bring water.</p>
<script>
  const heading = document.querySelector("h1");
  console.log("Heading:", heading.textContent);
  const paragraph = document.querySelector("p");
  console.log("First paragraph:", paragraph.textContent);
  console.log("Is it a paragraph?", paragraph.tagName);
</script>
```

</div>
<div>

**The Console says "ReferenceError: cout is not defined" on line 6. What should you do first?**

- Look at line 6 for a name that is not spelled the same as one you made
- Reload the page
- Delete the script
- Add more console.log lines to every line

* Answer: Look at line 6 for a name that is not spelled the same as one you made

</div>
</div>

<!-- Speaker note: The message names the word it does not know (cout) and the line. Compare it with the names you made: count is not cout. -->

<style scoped>section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**The Console shows "cout is not defined". Click the line where the Console says it happened.**

```
 1  <p id="demo">Hello</p>
 2  <script>
 3    const demo = document.querySelector("#demo");
 4    let count = 0;
 5    count = count + 1;
 6    console.log("Count is", cout);
 7  </script>
```

* Answer: line 6

<!-- Speaker note: The variable is called count, but line 6 writes cout. JavaScript treats them as different names and cannot find the second. -->

<style scoped>pre, marp-pre { font-size: 0.83em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **How many paragraphs?:** Find all, then count.
- **Each paragraph:** A loop over the matches.

[Open this step](https://tutorials.learningwaypoints.com/code/dom/dom-console/?full=step-4#step-4)

<!-- Speaker note: What this step is for: querySelectorAll finds every match, and a loop can log each one. Hints, in order: querySelector gives the first one. Is there a version that gives all of them? / const paragraphs = document.querySelectorAll("p"); then console.log(paragraphs.length). / You already know a loop that visits every item of a list. / for (const p of paragraphs) { console.log(p.textContent); } For students who need more support: Give the loop and ask students only for the labels in the messages. For early finishers: Use the real Console on a favourite site to find a heading with document.querySelector("h1").textContent, and change it to see the page change (until reload). The hard part, on purpose: Reading the error word for word: it names what it could not find. Ask "what is the exact word, and where did you make it?" When students get stuck: Nothing appears in the Console. Ask: Was Run pressed, and is there a console.log line? Fix: Press Run and check the spelling of console.log. / X is not defined. Ask: Is X spelled the same as the name you made? Fix: Compare the two names letter by letter. / Cannot read properties of null. Ask: Did the selector find anything? Fix: Check the selector against the HTML. / F12 does nothing. Ask: Is DevTools blocked on this device? Fix: Use the playground Console instead; try right-click, Inspect. -->

<!-- Speaker note: Teacher: ask what querySelectorAll gives that querySelector does not. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: explore a page

Use `console.log` to find **four facts** about the page: its heading, how many paragraphs, how many have the class `note`, what the note says. Then open the real Console on any web page (press **F12**, or right-click and choose **Inspect**) and type `document.title` and press Enter. Changes you make there only last until you reload the page. **Never paste code into the Console because someone online told you to**: it runs with your accounts logged in.

[Open this step](https://tutorials.learningwaypoints.com/code/dom/dom-console/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: use the Console to learn four facts about a page, then try the real Console in your own browser. -->

<!-- Speaker note: Teacher: if allowed, demonstrate F12 on the class page together. -->

---

## Where this leads

That is the end of the course. Next: your own project, the Python web apps course for pages that remember, or the p5.js course to draw and animate.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What two things does an error message tell you?**

* The word it could not make sense of, and the line it happened on.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: From here: students build their own page project, or move on to the Python web apps course. -->
