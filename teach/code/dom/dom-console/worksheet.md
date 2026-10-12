---
title: "The real browser console"
subtitle: "The DOM and the browser console · Final challenge: a quiz page · Lesson 8"
---

# The real browser console

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every web developer keeps the Console open all the time: it is how you find out what your code is really doing.


:::teacher-note

**In one sentence:** Students use console.log, warn and error to look inside a page, find elements with querySelectorAll and count them, read an error message for its name and line, and try the real browser Console.

**Students should be able to say:** I can use console.log to see what my code is doing. I can read an error message for the name and the line. I can open my browser's Console and inspector.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Count the console lines in the script.

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

:::keep-together

**How many messages does the Console show?**

☐ 0

☐ 1

☐ 2

☐ 4

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 4. There are two console.log lines, one console.warn and one console.error. Each writes a message in the Console, in its own style.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Which piece does what?

**Match each piece with what it does.**

A. writes a warning in the Console

B. the first paragraph only

C. how many paragraphs are on the page

D. writes a message with a label and the value

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `console.log("Heading:", heading.textContent);` | |
| `console.warn("Careful!");` | |
| `document.querySelectorAll("p").length` | |
| `document.querySelector("p")` | |

:::


:::teacher-note

**Answer:** console.log("Heading:", heading.textContent); → D. writes a message with a label and the value; console.warn("Careful!"); → A. writes a warning in the Console; document.querySelectorAll("p").length → C. how many paragraphs are on the page; document.querySelector("p") → B. the first paragraph only

:::


:::keep-together

### Reading an error

**The Console says "ReferenceError: cout is not defined" on line 6. What should you do first?**

☐ Look at line 6 for a name that is not spelled the same as one you made

☐ Reload the page

☐ Delete the script

☐ Add more console.log lines to every line

:::


:::teacher-note

**Answer:** Look at line 6 for a name that is not spelled the same as one you made

The message names the word it does not know (cout) and the line. Compare it with the names you made: count is not cout.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

The variable is called count, but line 6 writes cout. JavaScript treats them as different names and cannot find the second.

:::


:::typical

## Modify


**How many paragraphs?.** Find all, then count.

**Each paragraph.** A loop over the matches.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**How many paragraphs?:**

```html
<h1>Sports day</h1>
<p>Bring a hat.</p>
<p>Bring water.</p>
<script>
  const paragraphs = document.querySelectorAll("p");
  console.log("Paragraphs on the page:", paragraphs.length);
</script>
```

**Each paragraph:**

```html
<h1>Sports day</h1>
<p>Bring a hat.</p>
<p>Bring water.</p>
<script>
  const paragraphs = document.querySelectorAll("p");
  for (const p of paragraphs) {
    console.log(p.textContent);
  }
</script>
```

:::

:::


## Make: explore a page

Use `console.log` to find **four facts** about the page: its heading, how many paragraphs, how many have the class `note`, what the note says. Then open the real Console on any web page (press **F12**, or right-click and choose **Inspect**) and type `document.title` and press Enter. Changes you make there only last until you reload the page. **Never paste code into the Console because someone online told you to**: it runs with your accounts logged in.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>Explore me</h1>
<p>One paragraph.</p>
<p class="note">Another, with a class.</p>
<script>
  console.log("Title:", document.querySelector("h1").textContent);
  console.log("Paragraphs:", document.querySelectorAll("p").length);
  console.log("Notes:", document.querySelectorAll(".note").length);
  console.log("The note says:", document.querySelector(".note").textContent);
</script>
```

:::


:::wider

## Where this leads

That is the end of the course. Next: your own project, the Python web apps course for pages that remember, or the p5.js course to draw and animate.

:::


## Exit ticket

:::keep-together

**What two things does an error message tell you?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The word it could not make sense of, and the line it happened on.

:::

