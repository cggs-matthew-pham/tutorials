---
title: "A page that keeps score"
subtitle: "The DOM and the browser console · Building blocks · Lesson 6"
---

# A page that keeps score

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A score, a basket count and a "5 likes" all work the same way: a variable that lives between clicks.


:::teacher-note

**In one sentence:** Students keep a count in a variable made above a click handler, show it on the page, win at ten with an if, find a variable made inside the handler that starts over, and make a clicker game of their own.

**Students should be able to say:** I can keep a number between clicks in a variable. I can show a changing number on the page. I can use an if inside a handler to decide when something happens.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Is `clicks` made once, or on every click?

```html
<p>Clicks: <span id="count">0</span></p>
<button id="click">Click me</button>
<script>
  let clicks = 0;
  const countEl = document.querySelector("#count");
  document.querySelector("#click").addEventListener("click", function () {
    clicks = clicks + 1;
    countEl.textContent = clicks;
  });
</script>
```

:::keep-together

**After 3 clicks, what does the page show?**

☐ Clicks: 111

☐ Clicks: 0

☐ Clicks: 1

☐ Clicks: 3

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Clicks: 3. clicks is made once, above the handler. Each click adds 1 to the same variable, and the page shows the new value.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<p>Clicks: <span id="count">0</span></p>
<button id="click">Click me</button>
<p id="message">Reach 10 clicks to win.</p>
<script>
  let clicks = 0;
  const countEl = document.querySelector("#count");
  const message = document.querySelector("#message");
  const button = document.querySelector("#click");
  button.addEventListener("click", function () {
    clicks = clicks + 1;
    countEl.textContent = clicks;
    if (clicks >= 10) {
      message.textContent = "You win!";
      button.disabled = true;
    }
  });
</script>
```

:::keep-together

### Which line does what?

**Match each line with what it does.**

A. changes the memory on every click

B. decides when to win

C. shows the memory on the page

D. makes the memory, once, above the handler

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `let clicks = 0;` | |
| `clicks = clicks + 1;` | |
| `countEl.textContent = clicks;` | |
| `if (clicks >= 10) { … }` | |

:::


:::teacher-note

**Answer:** let clicks = 0; → D. makes the memory, once, above the handler; clicks = clicks + 1; → A. changes the memory on every click; countEl.textContent = clicks; → C. shows the memory on the page; if (clicks &gt;= 10) { … } → B. decides when to win

:::


:::keep-together

### Variable first

**Why does the code change clicks first and then set the text?**

☐ JavaScript needs variables to be first

☐ It is quicker

☐ The page only shows what the variable says, so the variable must change first

☐ The text would not change otherwise

:::


:::teacher-note

**Answer:** The page only shows what the variable says, so the variable must change first

The page does not know about clicks. It shows whatever you put in it. Change the variable, then put the new value on the page.

:::


:::keep-together

### Spot the bug

**The page shows 1 on every click and never goes higher. There is no red error. Click the line that is wrong.**

```
 1  <p>Clicks: <span id="count">0</span></p>
 2  <button id="click">Click me</button>
 3  <script>
 4    const countEl = document.querySelector("#count");
 5    document.querySelector("#click").addEventListener("click", function () {
 6      let clicks = 0;
 7      clicks = clicks + 1;
 8      countEl.textContent = clicks;
 9    });
10  </script>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

let clicks = 0 is inside the handler, so each click makes a new clicks that starts at 0. Make it above the handler, once.

:::


:::typical

## Modify


**Reset.** Put everything back.

**Halfway.** A second if.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Reset:**

```html
<p>Clicks: <span id="count">0</span></p>
<button id="click">Click me</button>
<button id="reset">Reset</button>
<p id="message">Reach 10 clicks to win.</p>
<script>
  let clicks = 0;
  const countEl = document.querySelector("#count");
  const message = document.querySelector("#message");
  const button = document.querySelector("#click");
  button.addEventListener("click", function () {
    clicks = clicks + 1;
    countEl.textContent = clicks;
    if (clicks >= 10) {
      message.textContent = "You win!";
      button.disabled = true;
    }
  });
  document.querySelector("#reset").addEventListener("click", function () {
    clicks = 0;
    countEl.textContent = clicks;
    message.textContent = "Reach 10 clicks to win.";
    button.disabled = false;
  });
</script>
```

**Halfway:**

```html
<p>Clicks: <span id="count">0</span></p>
<button id="click">Click me</button>
<p id="message">Reach 10 clicks to win.</p>
<script>
  let clicks = 0;
  const countEl = document.querySelector("#count");
  const message = document.querySelector("#message");
  const button = document.querySelector("#click");
  button.addEventListener("click", function () {
    clicks = clicks + 1;
    countEl.textContent = clicks;
    if (clicks === 5) {
      message.textContent = "Halfway there!";
    }
    if (clicks >= 10) {
      message.textContent = "You win!";
      button.disabled = true;
    }
  });
</script>
```

:::

:::


## Make: a clicker game of your own

Make a small game: click a moving star, press as fast as you can, guess a number. It needs a **score variable** made above the handler, a **goal or a time limit**, and a **message** when you win or lose. The page on this lesson moves a star and stops after 10 seconds, using `setInterval`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>Catch the star</h1>
<p>Score: <span id="score">0</span> &nbsp; Time: <span id="time">10</span></p>
<button id="star" style="position: relative; left: 40px">&#9733;</button>
<p id="message">Click the star as fast as you can.</p>
<script>
  let score = 0;
  let time = 10;
  const scoreEl = document.querySelector("#score");
  const timeEl = document.querySelector("#time");
  const star = document.querySelector("#star");
  const message = document.querySelector("#message");
  star.addEventListener("click", function () {
    if (time <= 0) {
      return;
    }
    score = score + 1;
    scoreEl.textContent = score;
    star.style.left = Math.floor(Math.random() * 300) + "px";
  });
  const timer = setInterval(function () {
    time = time - 1;
    timeEl.textContent = time;
    if (time <= 0) {
      clearInterval(timer);
      message.textContent = "Time is up! You scored " + score + ".";
    }
  }, 1000);
</script>
```

:::


:::wider

## Where this leads

You can now keep a score. Next: **the final challenge**, a quiz page.

:::


## Exit ticket

:::keep-together

**Why is let clicks above the handler and not inside it?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Above, it is made once and keeps its value; inside, it would start over on every click.

:::

