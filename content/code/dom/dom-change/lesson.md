---
order: 1
unit: page
introduces: [script, js-query, text-content, style-prop, console-log]
assumes: [heading, paragraph]
title: Find and change
summary: "Find an element on a page with JavaScript, change its text and colour, and read what the console says."
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
  caption: "JavaScript finds an element by its id, then changes it"
  clip:
    - caption: "A heading with an id, so JavaScript can find it."
    - type: {into: "HTML and JavaScript code", text: "<h1 id=\"title\">Sports day</h1>\n", append: true}
    - caption: "A script runs when the browser reaches it, so it goes below the heading."
    - type: {into: "HTML and JavaScript code", text: "<script>\n  const title = document.querySelector(\"#title\");\n", append: true}
    - caption: "querySelector with # finds the element with that id. title now means that heading."
    - type: {into: "HTML and JavaScript code", text: "  title.textContent = \"Moved to Friday\";\n  title.style.color = \"crimson\";\n</script>\n", append: true}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 2200
    - caption: "textContent changed the words and style.color the colour, while the page was open."
hook: "Every button that opens a menu, every counter that goes up and every live search is JavaScript changing a page that is already on screen."
---
A web page is a tree of **elements**. JavaScript can find one and change it while the page is open. Two steps do most of the work:

1. **Find it**: `document.querySelector("#title")` finds the element with `id="title"`. A `#` means an id, a `.` means a class (`".note"`), and a plain word means a tag (`"h1"`).
2. **Change it**: `title.textContent = "New words"` replaces its text, and `title.style.color = "crimson"` changes its colour.

`console.log(...)` writes a message in the **Console** under the page, to see what your code is doing.

**The hard part** is the selector. It is just text, so a typo finds nothing: the answer is `null`, and the next line fails with "Cannot set properties of null". When you see `null`, check the selector first.

## Predict

```step
stage: predict
code: page.html#predict
check:
  type: predict
  q: "What does the heading say once the page has loaded?"
  options: ["Sports day: moved to Friday", "Sports day", "Moved to Friday", "Nothing: a script cannot change a heading"]
  actual: "Sports day: moved to Friday. The script finds the heading and replaces its text, and console.log then writes the new text in the Console."
```

Does the script run before or after the heading has appeared?

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 430 }
check: { type: reflect, text: "I can see that JavaScript changed the heading and the note after the page loaded." }
```

Press **Run**. The page starts as plain HTML, and then the script changes two elements. The Console shows what `console.log` wrote.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "querySelector turns a selector into an element, and changing the element's properties changes the page; a selector that matches nothing gives null."
tasks:
  - check:
      type: match
      q: "Match each line with what it does."
      pairs:
        - ["document.querySelector(\"#title\")", "finds the element with id title"]
        - ["document.querySelector(\".note\")", "finds the first element with class note"]
        - ["title.textContent = \"Moved\";", "replaces the words inside the element"]
        - ["console.log(title.textContent);", "writes the text in the Console, not on the page"]
  - check:
      type: question
      q: "Why is the script below the heading and not above it?"
      options: ["A script runs as soon as the browser reaches it, so the heading must already exist", "Scripts only work at the bottom of a file", "The heading would disappear otherwise", "It makes the page load faster"]
      answer: 0
      explain: "The browser reads the page from the top. A script above the heading would run before the heading exists, so querySelector would find null."
  - check:
      type: bug
      code: page.html#bug
      text: "This stops with an error: Cannot set properties of null. Click the line that is the real cause."
      answer: 4
      fault: runtime
      misconception: selector-typo
      explain: "The error shows on line 5, but the cause is line 4: the heading's id is title, so #titel finds nothing and title is null."
```

### Which line does what?

Match code with meaning.

### Script order

The browser reads from the top.

### Spot the bug

The error shows on one line and starts on another.

## Modify

```step
stage: modify
insight: "Every element has its own text and style; find it with its own selector."
try: { playground: dom, starter: "page.html#run", height: 430 }
tasks:
  - hint:
      - "The note has class note, so its selector starts with a dot."
      - "const note = document.querySelector(\".note\"); then note.textContent = \"…\";"
    expected: page.html#sol-note
    check: { type: code, text: "Change the note's words to bring sunscreen too.", rules: { contains: [".note", "textContent"] } }
  - hint:
      - "Style properties are on the element's style: title.style.color."
      - "The value is text, in quotes: title.style.color = \"crimson\";"
    expected: page.html#sol-colour
    check: { type: code, text: "Make the heading crimson.", rules: { contains: [".style.color"] } }
```

### The note

Change the note to say you should bring **sunscreen** too.

### Crimson

Make the heading **crimson**.

## Make: change three things

```step
stage: make
insight: "Goals only: find three elements and change something about each."
try: { playground: dom, starter: "page.html#make", height: 430 }
check: { type: reflect, text: "My page changes three elements with JavaScript: some text, a colour and a size." }
```

Find **three elements** and change something about each: text, colour (`style.color`), size (`style.fontSize = "24px"`). Add more elements of your own to the page if you like.

## Where this leads

```step
stage: info
check:
  type: question
  q: "You want the heading to change only when someone clicks a button. What is missing?"
  options: ["Code that waits for the click and then runs the change", "A longer script", "A second heading", "Nothing: scripts already wait for clicks"]
  answer: 0
  explain: "A script runs once, as the page loads. To wait for a click you give the button a function to run when the click happens: an event listener. Next lesson."
```

Your code can now find and change anything on a page. Next: make it happen **when someone clicks**.
