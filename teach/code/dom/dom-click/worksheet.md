---
title: "Click events"
subtitle: "The DOM and the browser console · Change the page · Lesson 2"
---

# Click events

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A page that only changes when it loads is a poster. A page that changes when you click is an app.


:::teacher-note

**In one sentence:** Students run a function when a button is clicked with addEventListener, tell handing over a function from running it, fix a listener written with brackets, add a Reset button, and make buttons that change different things.

**Students should be able to say:** I can run a function when someone clicks a button. I can say what the event name and the handler are. I can give a handler without running it straight away.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Which line decides when `start` runs?

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

:::keep-together

**What does the heading say when the page first loads, before anyone clicks?**

☐ Nothing

☐ Ready?

☐ Go!

☐ An error

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Ready? The function start is only run when the button is clicked. Loading the page just tells the button what to do later.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Which part does what?

**Match each piece with what it does.**

A. when the button is clicked, run start

B. the change itself, inside the handler

C. the event: what the browser waits for

D. a recipe for the change: nothing happens until it is run

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `function start() { … }` | |
| `goButton.addEventListener("click", start);` | |
| `"click"` | |
| `message.textContent = "Go!";` | |

:::


:::teacher-note

**Answer:** function start() { … } → D. a recipe for the change: nothing happens until it is run; goButton.addEventListener("click", start); → A. when the button is clicked, run start; "click" → C. the event: what the browser waits for; message.textContent = "Go!"; → B. the change itself, inside the handler

:::


:::keep-together

### What makes it run?

**Which line makes start run on every click?**

☐ goButton.addEventListener("click", start);

☐ message.textContent = "Go!";

☐ function start() {

☐ const goButton = document.querySelector("#go");

:::


:::teacher-note

**Answer:** goButton.addEventListener("click", start);

The listener line tells the browser to run start on each click. The function on its own is just a recipe.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 9

start() has brackets, so it runs at once, when the page loads. Hand the function over without brackets: addEventListener("click", start).

:::


:::typical

## Modify


**A reset button.** Back to the beginning.

**Colours.** A handler can change two things.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A reset button:**

```html
<h1 id="message">Ready?</h1>
<button id="go">Start</button>
<button id="pause">Pause</button>
<button id="reset">Reset</button>
<script>
  const message = document.querySelector("#message");
  const goButton = document.querySelector("#go");
  const pauseButton = document.querySelector("#pause");
  const resetButton = document.querySelector("#reset");
  function start() {
    message.textContent = "Go!";
  }
  function pause() {
    message.textContent = "Paused";
  }
  function reset() {
    message.textContent = "Ready?";
  }
  goButton.addEventListener("click", start);
  pauseButton.addEventListener("click", pause);
  resetButton.addEventListener("click", reset);
</script>
```

**Colours:**

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
    message.style.color = "green";
  }
  function pause() {
    message.textContent = "Paused";
    message.style.color = "orange";
  }
  goButton.addEventListener("click", start);
  pauseButton.addEventListener("click", pause);
</script>
```

:::

:::


## Make: buttons of your own

Start from the two buttons and make a page where each button changes something different: size, colour, words, or a picture. The page on this lesson makes a heading bigger, smaller or purple.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1 id="message">My buttons</h1>
<button id="one">Bigger</button>
<button id="two">Smaller</button>
<button id="three">Colour</button>
<script>
  const message = document.querySelector("#message");
  let size = 32;
  function bigger() {
    size = size + 8;
    message.style.fontSize = size + "px";
  }
  function smaller() {
    size = size - 8;
    message.style.fontSize = size + "px";
  }
  function colour() {
    message.style.color = "rebeccapurple";
  }
  document.querySelector("#one").addEventListener("click", bigger);
  document.querySelector("#two").addEventListener("click", smaller);
  document.querySelector("#three").addEventListener("click", colour);
</script>
```

:::


:::wider

## Where this leads

You can now run code on a click. Next: change how the **whole page looks** with classes.

:::


## Exit ticket

:::keep-together

**What is the difference between start and start() in a listener?**

{{lines-3}}

:::


:::teacher-note

**Answer:** start hands the function over to run on each click; start() runs it once, right now.

:::

