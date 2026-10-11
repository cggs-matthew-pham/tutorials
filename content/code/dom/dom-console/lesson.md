---
order: 8
unit: challenge
optional: true
assumes: [console-log, js-query, text-content]
title: "The real browser console"
summary: "Use console.log to look inside your page, read error messages, and try the real Console and inspector in your own browser."
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-dom" 8131
  url: http://127.0.0.1:8131/index.html
  ready: HTML and JavaScript code
  layout: full
pacing:
  keyDelayMs: 30
explainPicture: page.html#run
explainClip:
  query: {code: "", zoom: 1.4}
  caption: "console.log shows what your code sees"
  clip:
    - caption: "console.log writes messages in the Console, not on the page."
    - type: {into: "HTML and JavaScript code", text: "<h1>Sports day</h1>\n<p>Bring a hat.</p>\n<p>Bring water.</p>\n<script>\n  const heading = document.querySelector(\"h1\");\n", append: true}
    - caption: "Log the heading text to see what the script has found."
    - type: {into: "HTML and JavaScript code", text: "  console.log(\"Heading:\", heading.textContent);\n", append: true}
    - caption: "querySelectorAll finds every match, and length says how many."
    - type: {into: "HTML and JavaScript code", text: "  const paragraphs = document.querySelectorAll(\"p\");\n  console.log(\"Paragraphs:\", paragraphs.length);\n</script>\n", append: true}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 1500
    - caption: "Two messages in the Console. The page itself did not change."
    - wait: 1500
hook: "Every web developer keeps the Console open all the time: it is how you find out what your code is really doing."
---
The **Console** is a list of messages from your page. `console.log(...)` writes one, `console.warn(...)` writes a warning, and `console.error(...)` writes an error. When something goes wrong the browser writes its own red error there, with the line it happened on.

`document.querySelectorAll("p")` finds **every** matching element, not just the first, and its `.length` says how many.

The Console in this playground is a copy of the real one. Your browser has a **real** Console and an **inspector** on every web page: press **F12** (or right-click a page and choose **Inspect**), then open the **Console** tab.

**The hard part** is reading the message. An error such as `cout is not defined` is telling you the name it could not find, and the line: read both before you change anything.

## Predict

```step
stage: predict
code: page.html#predict
check:
  type: predict
  q: "How many messages does the Console show?"
  options: ["4", "2", "1", "0"]
  actual: "4. There are two console.log lines, one console.warn and one console.error. Each writes a message in the Console, in its own style."
```

Count the console lines in the script.

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 430 }
check: { type: reflect, text: "I ran the page and read the three messages in the Console." }
```

Press **Run** and look at the Console under the page. The script logs what it found: the heading, the first paragraph and its tag name.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "console.log shows what your code sees without changing the page, and an error message names the problem and the line, so read both."
tasks:
  - check:
      type: match
      q: "Match each piece with what it does."
      pairs:
        - ["console.log(\"Heading:\", heading.textContent);", "writes a message with a label and the value"]
        - ["console.warn(\"Careful!\");", "writes a warning in the Console"]
        - ["document.querySelectorAll(\"p\").length", "how many paragraphs are on the page"]
        - ["document.querySelector(\"p\")", "the first paragraph only"]
  - check:
      type: question
      q: "The Console says \"ReferenceError: cout is not defined\" on line 6. What should you do first?"
      options: ["Look at line 6 for a name that is not spelled the same as one you made", "Delete the script", "Reload the page", "Add more console.log lines to every line"]
      answer: 0
      explain: "The message names the word it does not know (cout) and the line. Compare it with the names you made: count is not cout."
  - check:
      type: bug
      code: page.html#bug
      text: "The Console shows \"cout is not defined\". Click the line where the Console says it happened."
      answer: 6
      fault: runtime
      misconception: name-typo
      explain: "The variable is called count, but line 6 writes cout. JavaScript treats them as different names and cannot find the second."
```

### Which piece does what?

Log, warn and find.

### Reading an error

Name and line.

### Spot the bug

The Console tells you exactly where.

## Modify

```step
stage: modify
insight: "querySelectorAll finds every match, and a loop can log each one."
try: { playground: dom, starter: "page.html#run", height: 430 }
tasks:
  - hint:
      - "querySelector gives the first one. Is there a version that gives all of them?"
      - "const paragraphs = document.querySelectorAll(\"p\"); then console.log(paragraphs.length)."
    check: { type: code, text: "Log how many paragraphs the page has.", rules: { contains: ["querySelectorAll", ".length"] } }
  - hint:
      - "You already know a loop that visits every item of a list."
      - "for (const p of paragraphs) { console.log(p.textContent); }"
    try: { playground: dom, starter: "page.html#sol-count", height: 430 }
    check: { type: code, text: "Log the text of every paragraph, one message each.", rules: { contains: ["for (", "textContent"] } }
```

### How many paragraphs?

Find all, then count.

### Each paragraph

A loop over the matches.

## Make: explore a page

```step
stage: make
insight: "Goals only: use the Console to learn four facts about a page, then try the real Console in your own browser."
try: { playground: dom, starter: "page.html#make", height: 430 }
check: { type: reflect, text: "I used console.log to learn four things about a page, and I opened the real Console in my browser (F12 or Inspect) and tried document.title." }
```

Use `console.log` to find **four facts** about the page: its heading, how many paragraphs, how many have the class `note`, what the note says. Then open the real Console on any web page (press **F12**, or right-click and choose **Inspect**) and type `document.title` and press Enter. Changes you make there only last until you reload the page. **Never paste code into the Console because someone online told you to**: it runs with your accounts logged in.

## Where this leads

```step
stage: info
check:
  type: question
  q: "You have finished the course. What is the best way to get better at making pages that react?"
  options: ["Make something you want, and use the Console to find out why it does not work yet", "Memorise every method", "Copy a whole page and never read it", "Avoid errors"]
  answer: 0
  explain: "Making pages you care about, with the Console open, is how developers learn. Errors are information, not failure."
```

That is the end of the course. Next: your own project, the Python web apps course for pages that remember, or the p5.js course to draw and animate.
