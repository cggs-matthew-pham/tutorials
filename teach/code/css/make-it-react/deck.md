---
marp: true
theme: default
html: true
---

# Make it react

Layout and components · Final challenge: lay out the club page

<!-- Speaker note: An optional lesson. Students use a short JavaScript recipe (find an element by id, wait for a click, change the page) to make a button change words and colours, and a form greet people by name. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min · Sign-up 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** add a few lines of JavaScript, as a recipe, so a button changes the page and a form greets people by name.

- I can use the recipe to make a button change the words on a page.
- I can explain the three parts of the recipe (find, wait, change).
- I can use an id selector with
- I can read what someone typed and show it on the page.

<!-- Speaker note: Before class: This lesson is **optional** and treats JavaScript as a **recipe**: students copy the pattern, change the parts and see the effect, without needing to understand every symbol. That is deliberate (the same way `from turtle import *` is a recipe in the Python course). The DOM course explains it properly: what `document` is, why `function () { ... }` is passed to `addEventListener`, and how to write it from scratch. The recipe has three parts: **find** an element (`document.querySelector('#go')`, where `#` means id, as `.` means class in CSS), **wait** for a click (`.addEventListener('click', ...)`), **change** something (`.textContent = '...'` for words, `.style.color = '...'` for colour). Do the Make task yourself first. Teacher: The button that does nothing: `#Go` versus `id="go"`. Like CSS, a mismatched selector fails silently. (The browser's developer console shows an error, if you want to show it.) Teacher: Sign-up: the Forms lesson's form, now reacting. Point out what is still missing: sending the name somewhere needs a server. -->

---

## Why it matters

> Every like button, quiz and game on a website is a page that reacts: code waits for a click, then changes something.

<!-- Speaker note: So far your pages show things. With a few lines of **JavaScript**, a page can **react**. This lesson uses JavaScript as a recipe: copy the pattern, change the parts, and see what happens. The DOM course explains how every part works. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<p id="message">Ready?</p>
<button id="go">Start</button>
<script>
  document.querySelector('#go').addEventListener('click', function () {
    document.querySelector('#message').textContent = 'Go!';
  });
</script>
```

**What happens when someone clicks Start?**

- The words Ready? change to Go!
- A new page opens
- An error message appears
- Nothing: buttons only work inside forms

<!-- Speaker note: What happens: Ready? changes to Go! The script waits for a click on the button, then changes the message's words. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students say the words change; a few expect nothing because there is no form. Click to see. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cp+id%3D%22message%22%3EReady%3F%3C%2Fp%3E%0A%3Cbutton+id%3D%22go%22%3EStart%3C%2Fbutton%3E%0A%3Cscript%3E%0A++document.querySelector%28%27%23go%27%29.addEventListener%28%27click%27%2C+function+%28%29+%7B%0A++++document.querySelector%28%27%23message%27%29.textContent+%3D+%27Go%21%27%3B%0A++%7D%29%3B%0A%3C%2Fscript%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/make-it-react/?full=step-2#step-2)

<!-- Speaker note: Click **Start**. Then change `'Go!'` to your own words (keep the quotes) and click again. Students should be able to say: I clicked Start and the words changed. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Ready? changes to Go! The script waits for a click on the button, then changes the message's words.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<p id="message">Ready?</p>
<button id="go">Start</button>
<script>
  document.querySelector('#go').addEventListener('click', function () {
    document.querySelector('#message').textContent = 'Go!';
  });
</script>
```

<!-- Speaker note: What this step is for: The recipe has three parts: find an element (by id, with #), wait for a click, change something. -->

<!-- Speaker note: Teacher: name the three parts on the board (find, wait, change). The selectors are the CSS ones they know, plus # for id. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<p id="message">Ready?</p>
<button id="go">Start</button>
<script>
  document.querySelector('#go').addEventListener('click', function () {
    document.querySelector('#message').textContent = 'Go!';
  });
</script>
```

</div>
<div>

**Match each part of the recipe with its job.**

| | |
|---|---|
| `document.querySelector('#go')` | A. waits for a click on it |
| `.addEventListener('click', ...)` | B. replaces the words inside the element |
| `function () { ... }` | C. the steps to run when it is clicked |
| `.textContent = 'Go!'` | D. finds the element with id="go" |

* Answer: document.querySelector('#go') → D. finds the element with id="go"; .addEventListener('click', ...) → A. waits for a click on it; function () { ... } → C. the steps to run when it is clicked; .textContent = 'Go!' → B. replaces the words inside the element

</div>
</div>

<!-- Speaker note: Find, wait, change. querySelector uses the same selectors as CSS: # for an id, . for a class. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ids

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<p id="message">Ready?</p>
<button id="go">Start</button>
<script>
  document.querySelector('#go').addEventListener('click', function () {
    document.querySelector('#message').textContent = 'Go!';
  });
</script>
```

</div>
<div>

**In document.querySelector('#message'), what does '#message' pick?**

- The first button
- Every paragraph
- The element with class="message"
- The element with id="message"

* Answer: The element with id="message"

</div>
</div>

<!-- Speaker note: Selectors work as in CSS: #message picks id="message", .message would pick class="message", and p would pick paragraphs. -->

<style scoped>section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The button that does nothing

**Clicking Start does nothing, and nothing on the page says why. Click the line that causes it.**

```
 1  <p id="message">Ready?</p>
 2  <button id="go">Start</button>
 3  <script>
 4    document.querySelector('#Go').addEventListener('click', function () {
 5      document.querySelector('#message').textContent = 'Go!';
 6    });
 7  </script>
```

* Answer: line 4

<!-- Speaker note: Line 4 looks for #Go, but the button's id is go. Ids must match exactly, capitals included. The script stops there, so the click is never watched. -->

<style scoped>pre, marp-pre { font-size: 0.83em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Change the look too

`.style` changes an element's CSS.

```html
<script>
  document.querySelector('#go').addEventListener('click', function () {
    document.querySelector('#message').textContent = 'Go!';
    document.querySelector('#message').style.color = 'green';
  });
</script>
```

**What does this extra line do when the button is clicked? document.querySelector('#message').style.color = 'green';**

- Turns the whole page green
- Turns the message green
- Turns the button green
- Nothing: CSS cannot be changed by JavaScript

* Answer: Turns the message green

<!-- Speaker note: style changes the element's CSS, here its colour. JavaScript can change words, colours, sizes, anything CSS can. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Your own message:** Change the message to your own words.
- **A colour change:** Make the message turn a colour when Start is clicked.
- **A reset button:** Add a **Reset** button that puts the message back to `Ready?` (and its colour back to black).

<!-- Speaker note: What this step is for: Changing the recipe one part at a time: the words, then the colour, then a second button with its own recipe. Hints, in order: Change only the words between the quotes after `textContent =`. / The colour should change when the button is clicked, so the new line goes inside the function, beside the text change. / Add a line inside the function, under the textContent line: `document.querySelector('#message').style.color = 'green';` / Reset needs two things: a second button with its own id, and a second recipe that listens to it. / Add `<button id="reset">Reset</button>` after the Start button. / Copy the whole recipe, change `#go` to `#reset`, and set the words back to Ready?. For students who need more support: Do the first Modify task together, then let students copy and change the recipe for the reset button with the hint open. For early finishers: Count clicks: let count = 0; outside the function, then count = count + 1; and show the count inside it. Or change the page's background: document.body.style.backgroundColor = 'gold'; The hard part, on purpose: The recipe has unfamiliar punctuation, so small slips break it silently. Ask them to compare the id in querySelector with the button's id, quotes and brackets included. When students get stuck: Clicking the button does nothing. Ask: Does the id in querySelector (after the Fix: Make them identical, capitals included, and check the quotes and brackets are all closed. / The message shows Hi, ! with no name. Ask: Did you read the box with .value inside the click function, after something was typed? Fix: Put the const name = ... line inside the function, so it reads the box when the button is clicked. / The script code shows on the page as text. Ask: Is the JavaScript between <script> and </script>? Fix: Wrap the recipe in a script block after the HTML. -->

<!-- Speaker note: Teacher: each task changes one part of the recipe. The reset button is a second copy of the whole recipe. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cp+id%3D%22message%22%3EReady%3F%3C%2Fp%3E%0A%3Cbutton+id%3D%22go%22%3EStart%3C%2Fbutton%3E%0A%3Cscript%3E%0A++document.querySelector%28%27%23go%27%29.addEventListener%28%27click%27%2C+function+%28%29+%7B%0A++++document.querySelector%28%27%23message%27%29.textContent+%3D+%27Go%21%27%3B%0A++%7D%29%3B%0A%3C%2Fscript%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/make-it-react/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make the page greet people: when someone types their name and clicks **Say hello**, the message shows `Hi, Ada!` (with their name). `.value` reads what was typed, and `+` joins words together.

<!-- Speaker note: Hints, in order: Start from the recipe: find `#hello`, wait for a click. / Inside: `const name = document.querySelector('#name').value;` reads the box. Then set the message's textContent to `'Hi, ' + name + '!'`. -->

<!-- Speaker note: Teacher: `.value` reads a box and `+` joins words. Students who finish can greet differently by time of day, or count clicks. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Clabel+for%3D%22name%22%3EName%3C%2Flabel%3E%0A%3Cinput+id%3D%22name%22+type%3D%22text%22%3E%0A%3Cbutton+id%3D%22hello%22%3ESay+hello%3C%2Fbutton%3E%0A%3Cp+id%3D%22message%22%3E%3C%2Fp%3E%0A%3Cscript%3E%0A++%2F%2F+When+Say+hello+is+clicked%3A+read+the+name%2C+then+show+Hi%2C+%28the+name%29%21+in+the+message.%0A%3C%2Fscript%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/make-it-react/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make the sign-up say thank you

This sign-up box is not connected to anything. Add the recipe so that clicking **Join** shows `Thanks, Ada! See you on Wednesday.` (with the name that was typed) in the empty paragraph. In a real club, the next step would be sending the name to the club, which needs a program on a server.

<!-- Speaker note: What this step is for: The form from the Forms lesson, now doing something: it reads the name and thanks the person on the page. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make the sign-up say thank you

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.signup+%7B%0A++++width%3A+260px%3B%0A++++padding%3A+16px%3B%0A++++border%3A+2px+solid+teal%3B%0A++%7D%0A++label+%7B%0A++++display%3A+block%3B%0A++++margin-top%3A+8px%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cdiv+class%3D%22signup%22%3E%0A++%3Ch2%3EJoin+the+chess+club%3C%2Fh2%3E%0A++%3Clabel+for%3D%22name%22%3EName%3C%2Flabel%3E%0A++%3Cinput+id%3D%22name%22+type%3D%22text%22%3E%0A++%3Cbutton+id%3D%22join%22%3EJoin%3C%2Fbutton%3E%0A++%3Cp+id%3D%22thanks%22%3E%3C%2Fp%3E%0A%3C%2Fdiv%3E%0A%3Cscript%3E%0A++%2F%2F+When+Join+is+clicked%2C+show%3A+Thanks%2C+%28the+name%29%21+See+you+on+Wednesday.%0A%3C%2Fscript%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/make-it-react/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name the three parts of the recipe, and what each one does.**

* Find an element (document.querySelector('#id')), wait for a click (addEventListener('click', ...)), and change something (textContent or style).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: The DOM course teaches JavaScript properly: variables, decisions, functions and events, with the same querySelector and addEventListener. Students from the Python course will recognise events (onscreenclick there, addEventListener here). Forms that send data somewhere need a server; Gradio (in the Python pathway) is one way to put a program behind a form. -->
