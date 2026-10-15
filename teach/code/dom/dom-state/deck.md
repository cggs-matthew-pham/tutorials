---
marp: true
theme: default
html: true
---

# A page that keeps score

The DOM and the browser console · Building blocks

<!-- Speaker note: Students keep a count in a variable made above a click handler, show it on the page, win at ten with an if, find a variable made inside the handler that starts over, and make a clicker game of their own. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** keep a number between clicks in a variable made above the handler, and use an if to decide when something happens.

- I can keep a number between clicks in a variable.
- I can show a changing number on the page.
- I can use an if inside a handler to decide when something happens.

<!-- Speaker note: Before class: Read the unit primer first. This is the Python "global" and state idea in JavaScript: a variable made above a function is shared and kept; one made inside is made again each call. The p5 sketches kept values in `let` above `draw`; here the handler plays the part of `draw`. The page is only a picture of the variable: change the variable, then put it on the page. The bug has no red error. `button.disabled = true` is a property like `textContent`. The Make example uses `setInterval` (run a function every 1000 ms) and `clearInterval`; students can use it as a recipe, and a number of them will want it. -->

---

## Why it matters

> A score, a basket count and a "5 likes" all work the same way: a variable that lives between clicks.

<!-- Speaker note: A page can **remember** things in variables, as your p5 sketches did. The rule is where you make them: ```js let clicks = 0; // made once, above the handler button.addEventListener("click", function () { clicks = clicks + 1; // changed on every click countEl.textContent = clicks; // shown on the page }); ``` A variable made **above** the handler keeps its value between clicks. One made **inside** is made again on each click, so it starts over. An `if` inside the handler decides when something happens, such as winning at 10. **The hard part** is seeing that the number on the page is not the memory. The variable remembers; the page only shows it. Change the variable, then show it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**After 3 clicks, what does the page show?**

- Clicks: 111
- Clicks: 0
- Clicks: 1
- Clicks: 3

<!-- Speaker note: What happens: Clicks: 3. clicks is made once, above the handler. Each click adds 1 to the same variable, and the page shows the new value. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask students to say "made once" or "made each click" about clicks. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Clicks: 3. clicks is made once, above the handler. Each click adds 1 to the same variable, and the page shows the new value.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/dom/dom-state/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/dom/dom-state/?full=step-2#step-2)

<!-- Speaker note: Press **Run** and click the button ten times. The `if` inside the handler decides when you win, and `button.disabled = true` stops the button. Students should be able to say: I clicked ten times and won, and I saw the button stop working. -->

<!-- Speaker note: Teacher: ask where the number on the page comes from. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: A variable made above the handler remembers between clicks, a variable made inside starts over; the page only shows the variable, so change it first, then show it. -->

<!-- Speaker note: Teacher: for the bug, ask "how many times is let clicks run?" -->

<style scoped>pre, marp-pre { font-size: 0.6em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which line does what?

**Match each line with what it does.**

| | |
|---|---|
| `let clicks = 0;` | A. changes the memory on every click |
| `clicks = clicks + 1;` | B. decides when to win |
| `countEl.textContent = clicks;` | C. shows the memory on the page |
| `if (clicks >= 10) { … }` | D. makes the memory, once, above the handler |

* Answer: let clicks = 0; → D. makes the memory, once, above the handler; clicks = clicks + 1; → A. changes the memory on every click; countEl.textContent = clicks; → C. shows the memory on the page; if (clicks &gt;= 10) { … } → B. decides when to win

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Variable first

**Why does the code change clicks first and then set the text?**

- JavaScript needs variables to be first
- It is quicker
- The page only shows what the variable says, so the variable must change first
- The text would not change otherwise

* Answer: The page only shows what the variable says, so the variable must change first

<!-- Speaker note: The page does not know about clicks. It shows whatever you put in it. Change the variable, then put the new value on the page. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 6

<!-- Speaker note: let clicks = 0 is inside the handler, so each click makes a new clicks that starts at 0. Make it above the handler, once. -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Reset:** Put everything back.
- **Halfway:** A second if.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-state/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Reset puts the variable and the page back; a second if reacts to a different number. Hints, in order: A reset button needs to put back everything the game changed. / Set clicks back to 0, show it on the page, and also put the message and the button back. / The game already has one if. A second if can look for a different number. / if (clicks === 5) { message.textContent = "Halfway there!"; } inside the handler. For students who need more support: Give the counter and ask students for only the win message. For early finishers: Make the goal change each game (a random target), or keep a best score that survives a reset. The hard part, on purpose: The page shows the variable; it is not the variable. Ask "what does the page know about clicks?" and the answer is nothing. When students get stuck: The count stays at 1. Ask: Is the variable made inside the handler? Fix: Move let clicks = 0 above the handler. / The count is right but the page does not change. Ask: Is the new value put on the page? Fix: Set countEl.textContent = clicks after changing clicks. / Reset does not fully reset. Ask: What else did the game change besides clicks? Fix: Put back the message and enable the button. / Cannot assign to a const. Ask: Is the variable made with const and then changed? Fix: Use let for a variable that changes. -->

<!-- Speaker note: Teacher: ask what a reset must put back. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a clicker game of your own

Make a small game: click a moving star, press as fast as you can, guess a number. It needs a **score variable** made above the handler, a **goal or a time limit**, and a **message** when you win or lose. The page on this lesson moves a star and stops after 10 seconds, using `setInterval`.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-state/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a score that keeps its value, a goal, and a message when you win or lose. -->

<!-- Speaker note: Teacher: ask each student what the score is, what the goal is, and what happens at the end. -->

---

## Where this leads

You can now keep a score. Next: **the final challenge**, a quiz page.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why is let clicks above the handler and not inside it?**

* Above, it is made once and keeps its value; inside, it would start over on every click.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: the final challenge, a quiz page. -->
