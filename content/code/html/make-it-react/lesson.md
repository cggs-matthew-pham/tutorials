---
order: 11
unit: challenge
optional: true
title: Make it react
summary: Add a few lines of JavaScript, as a recipe, so a button changes the page and a form greets people by name.
language: html
recipes: [script, js-event, js-query, text-content, style-prop]
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8133
  url: http://127.0.0.1:8133/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 35
voice: true
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.0 }
  caption: "Find an element, wait for a click, change the page"
  clip:
    - caption: "JavaScript goes in a <script> block, after the HTML."
    - type: { into: HTML code, text: "\n<script>\n", append: true }
    - caption:
        text: "Find the button with id=\"go\" (# means id), and wait for a click..."
        say: "Find the button whose I D is go, and wait for a click."
    - type: { into: HTML code, text: "  document.querySelector('#go').addEventListener('click', function () {\n", append: true }
    - caption: "...then find the message and change its words."
    - type: { into: HTML code, text: "    document.querySelector('#message').textContent = 'Go!';\n  });\n</script>", append: true }
    - caption: "Click Start."
    - click: { selector: "#go", preview: true }
    - expect: { selector: "#message", contains: "Go!", preview: true }
    - caption:
        text: "The page changed. The DOM course explains every part of this recipe."
        say: "The page changed. A later course explains every part of this recipe."
    - wait: 2500
hook: "Every like button, quiz and game on a website is a page that reacts: code waits for a click, then changes something."
---
So far your pages show things. With a few lines of **JavaScript**, a page can **react**. This lesson uses JavaScript as a recipe: copy the pattern, change the parts, and see what happens. The DOM course explains how every part works.

## Predict

```step
stage: predict
code: page.html#go
insight: "Students recognise selectors (#go) from CSS; predicting the change before clicking makes the cause and effect explicit."
check:
  type: predict
  q: "What happens when someone clicks Start?"
  options:
    - "The words Ready? change to Go!"
    - "A new page opens"
    - "Nothing: buttons only work inside forms"
    - "An error message appears"
  actual: "Ready? changes to Go! The script waits for a click on the button, then changes the message's words."
```

Read the code. The `<script>` block is JavaScript. What happens when someone clicks **Start**?

## Run

```step
stage: run
code: page.html#go
try: { playground: html, starter: "page.html#go", height: 380 }
insight: "A script finds elements by id, waits for a click, and changes the page."
check: { type: reflect, text: "I clicked Start and the words changed." }
unlocks: [on-click, change-the-text]
```

Click **Start**. Then change `'Go!'` to your own words (keep the quotes) and click again.

## Investigate

```step
stage: investigate
code: page.html#go
insight: "The recipe has three parts: find an element (by id, with #), wait for a click, change something."
tasks:
  - check:
      type: match
      q: "Match each part of the recipe with its job."
      pairs:
        - ["document.querySelector('#go')", "finds the element with id=\"go\""]
        - [".addEventListener('click', ...)", "waits for a click on it"]
        - ["function () { ... }", "the steps to run when it is clicked"]
        - [".textContent = 'Go!'", "replaces the words inside the element"]
      explain: "Find, wait, change. querySelector uses the same selectors as CSS: # for an id, . for a class."
  - check:
      type: question
      q: "In document.querySelector('#message'), what does '#message' pick?"
      options: ["The element with id=\"message\"", "Every paragraph", "The element with class=\"message\"", "The first button"]
      answer: 0
      explain: "Selectors work as in CSS: #message picks id=\"message\", .message would pick class=\"message\", and p would pick paragraphs."
  - check:
      type: bug
      code: page.html#typo
      answer: 4
      fault: logic
      misconception: selector-mismatch
      text: "Clicking Start does nothing, and nothing on the page says why. Click the line that causes it."
      explain: "Line 4 looks for #Go, but the button's id is go. Ids must match exactly, capitals included. The script stops there, so the click is never watched."
  - check:
      type: question
      q: "What does this extra line do when the button is clicked? document.querySelector('#message').style.color = 'green';"
      options: ["Turns the message green", "Turns the button green", "Turns the whole page green", "Nothing: CSS cannot be changed by JavaScript"]
      answer: 0
      explain: "style changes the element's CSS, here its colour. JavaScript can change words, colours, sizes, anything CSS can."
```

### Match the parts

The recipe, piece by piece.

### Ids

`#` picks an id, as `.` picks a class.

### The button that does nothing

Clicking Start should change the message.

### Change the look too

`.style` changes an element's CSS.

```html
<script>
  document.querySelector('#go').addEventListener('click', function () {
    document.querySelector('#message').textContent = 'Go!';
    document.querySelector('#message').style.color = 'green';
  });
</script>
```

## Modify

```step
stage: modify
insight: "Changing the recipe one part at a time: the words, then the colour, then a second button with its own recipe."
try: { playground: html, starter: "page.html#go", height: 440 }
tasks:
  - hint: "Change only the words between the quotes after `textContent =`."
    check: { type: reflect, text: "I changed the message to my own words, and clicking shows them." }
    expected: page.html#sol-message
  - hint:
      - "The colour should change when the button is clicked, so the new line goes inside the function, beside the text change."
      - "Add a line inside the function, under the textContent line: `document.querySelector('#message').style.color = 'green';`"
    check: { type: code, text: "Make the message turn a colour too.", rules: { contains: [".style.color"] } }
    expected: page.html#sol-colour
  - hint:
      - "Reset needs two things: a second button with its own id, and a second recipe that listens to it."
      - "Add `<button id=\"reset\">Reset</button>` after the Start button."
      - "Copy the whole recipe, change `#go` to `#reset`, and set the words back to Ready?."
    check: { type: code, text: "Add a Reset button that puts the message back.", rules: { contains: ["id=\"reset\"", "querySelector('#reset')"] } }
    expected: page.html#sol-reset
```

### Your own message

Change the message to your own words.

### A colour change

Make the message turn a colour when Start is clicked.

### A reset button

Add a **Reset** button that puts the message back to `Ready?` (and its colour back to black).

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 440 }
hint:
  - "Start from the recipe: find `#hello`, wait for a click."
  - "Inside: `const name = document.querySelector('#name').value;` reads the box. Then set the message's textContent to `'Hi, ' + name + '!'`."
check:
  type: code
  text: "When Say hello is clicked, show Hi, and the name typed in the box."
  rules: { contains: ["addEventListener", ".value", ".textContent"] }
```

Make the page greet people: when someone types their name and clicks **Say hello**, the message shows `Hi, Ada!` (with their name). `.value` reads what was typed, and `+` joins words together.

## Make the sign-up say thank you

```step
stage: modify
try: { playground: html, starter: "page.html#club", height: 460 }
insight: "The form from the Forms lesson, now doing something: it reads the name and thanks the person on the page."
```

This sign-up box is not connected to anything. Add the recipe so that clicking **Join** shows `Thanks, Ada! See you on Wednesday.` (with the name that was typed) in the empty paragraph. In a real club, the next step would be sending the name to the club, which needs a program on a server.
