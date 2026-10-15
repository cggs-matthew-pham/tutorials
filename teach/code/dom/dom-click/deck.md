---
marp: true
theme: default
html: true
---

# Click events

The DOM and the browser console · Change the page

<!-- Speaker note: Students run a function when a button is clicked with addEventListener, tell handing over a function from running it, fix a listener written with brackets, add a Reset button, and make buttons that change different things. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** run a function when someone clicks a button: addEventListener, and the difference between handing over a function and running it.

- I can run a function when someone clicks a button.
- I can say what the event name and the handler are.
- I can give a handler without running it straight away.

<!-- Speaker note: Before class: Read the unit primer first. This is the Python events lesson (a handler runs when something happens) in JavaScript, and the same lesson as p5's `mousePressed`, but the page picks the element and the event. `addEventListener("click", start)` hands the browser a function; `start()` calls it now. The bug has no red error, so students must look at the page: it says Go! straight away. Functions were taught in the p5.js course; if students skipped it, spend a minute on "a function is code with a name" first. IDs named like variables (`message`) are fine here because the script uses `const`. -->

---

## Why it matters

> A page that only changes when it loads is a poster. A page that changes when you click is an app.

<!-- Speaker note: Until now your script ran once, as the page loaded. To react to a click you give the button a **function** and say when to run it: ```js button.addEventListener("click", start); ``` Read it as "when this button is clicked, run `start`". `"click"` is the **event**. The function after it is the **handler**. **The hard part** is the brackets. `start` hands the function over to be run later, on each click. `start()` runs it **right now**, once, and hands over whatever it returned, so the click does nothing. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<h1 id="message">Ready?</h1>
<button id="go">Start</button>
<script>
  const message = document.querySelector("#message");
  const goButton = document.querySelector("#go");
  function start() {
    message.textContent = "Go!";
  }
  goButton.addEventListener("click", start);
</script>
```

**What does the heading say when the page first loads, before anyone clicks?**

- Nothing
- Ready?
- Go!
- An error

<!-- Speaker note: What happens: Ready? The function start is only run when the button is clicked. Loading the page just tells the button what to do later. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what is different between writing a recipe and cooking it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Ready? The function start is only run when the button is clicked. Loading the page just tells the button what to do later.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/dom/dom-click/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/dom/dom-click/?full=step-2#step-2)

<!-- Speaker note: Press **Run**, then click **Start** and **Pause**. The heading changes only when you click. Students should be able to say: I clicked both buttons and saw the heading change each time. -->

<!-- Speaker note: Teacher: ask students to click each button and say which function ran. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<h1 id="message">Ready?</h1>
<button id="go">Start</button>
<button id="pause">Pause</button>
<script>
  const message = document.querySelector("#message");
  const goButton = document.querySelector("#go");
  const pauseButton = document.querySelector("#pause");
  function start() {
    message.textContent = "Go!";
  }
  function pause() {
    message.textContent = "Paused";
  }
  goButton.addEventListener("click", start);
  pauseButton.addEventListener("click", pause);
</script>
```

<!-- Speaker note: What this step is for: addEventListener hands a function to the browser to run later, on each event; writing the function name with brackets runs it now instead. -->

<!-- Speaker note: Teacher: for the bug, ask "when did the heading change, and why then?" -->

<style scoped>pre, marp-pre { font-size: 0.64em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which part does what?

**Match each piece with what it does.**

| | |
|---|---|
| `function start() { … }` | A. when the button is clicked, run start |
| `goButton.addEventListener("click", start);` | B. the change itself, inside the handler |
| `"click"` | C. the event: what the browser waits for |
| `message.textContent = "Go!";` | D. a recipe for the change: nothing happens until it is run |

* Answer: function start() { … } → D. a recipe for the change: nothing happens until it is run; goButton.addEventListener("click", start); → A. when the button is clicked, run start; "click" → C. the event: what the browser waits for; message.textContent = "Go!"; → B. the change itself, inside the handler

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What makes it run?

**Which line makes start run on every click?**

- goButton.addEventListener("click", start);
- message.textContent = "Go!";
- function start() {
- const goButton = document.querySelector("#go");

* Answer: goButton.addEventListener("click", start);

<!-- Speaker note: The listener line tells the browser to run start on each click. The function on its own is just a recipe. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This page says Go! as soon as it loads, and clicking does nothing. There is no red error. Click the line that is wrong.**

```
 1  <h1 id="message">Ready?</h1>
 2  <button id="go">Start</button>
 3  <script>
 4    const message = document.querySelector("#message");
 5    const goButton = document.querySelector("#go");
 6    function start() {
 7      message.textContent = "Go!";
 8    }
 9    goButton.addEventListener("click", start());
10  </script>
```

* Answer: line 9

<!-- Speaker note: start() has brackets, so it runs at once, when the page loads. Hand the function over without brackets: addEventListener("click", start). -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A reset button:** Back to the beginning.
- **Colours:** A handler can change two things.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-click/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each button needs its own function and its own listener; a handler can change more than one thing. Hints, in order: A third button needs three things: the button in the HTML, a function, and a listener. / Add `<button id="reset">Reset</button>`, a function reset that puts back "Ready?", and resetButton.addEventListener("click", reset). / A handler can change more than one thing. What else about the heading can you change? / Add message.style.color = "green"; inside start, and another colour inside pause. For students who need more support: Give the whole Reset function and listener, and ask students to change what it says. For early finishers: Make one button toggle between two states using a variable, or make a button remove itself with button.remove(). The hard part, on purpose: Brackets: start hands the function over, start() runs it now. The page, not an error, shows the slip. When students get stuck: The heading says Go! at once and the button does nothing. Ask: Are there brackets after start in the listener? Fix: Remove them: addEventListener("click", start). / Cannot read properties of null (reading addEventListener). Ask: Does the button id in the HTML match the selector? Fix: Match the id exactly, with # in the selector. / Nothing happens when I click. Ask: Did you press Run, and is the button inside the page? Fix: Press Run again; check the id. / The new button does nothing. Ask: Did you add a listener for it? Fix: Add its listener under the others. -->

<!-- Speaker note: Teacher: ask where the third button is in the HTML, and where in the script. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: buttons of your own

Start from the two buttons and make a page where each button changes something different: size, colour, words, or a picture. The page on this lesson makes a heading bigger, smaller or purple.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-click/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: at least two buttons that change different things, each with its own function. -->

<!-- Speaker note: Teacher: ask each pair which button does what, before they test. -->

---

## Where this leads

You can now run code on a click. Next: change how the **whole page looks** with classes.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What is the difference between start and start() in a listener?**

* start hands the function over to run on each click; start() runs it once, right now.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: classes, to change how the whole page looks with one line. -->
