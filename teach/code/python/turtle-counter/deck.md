---
marp: true
theme: default
html: true
---

# Use the counter

Python Foundations with Turtle · Drawing and repeating

<!-- Speaker note: Students use the loop counter i to work out something different on every pass, and meet the fact that counting starts at 0. About 30 minutes (Predict and Run 10 min · Investigate 8 min · Modify 12 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** the loop counter i changes every pass, so a line can grow without you typing each number.

- I can say what i holds on each pass of a loop.
- I can use i in a calculation inside a loop.
- I can change a drawing by changing one number in that calculation.

<!-- Speaker note: Before class: Run the spiral, then try pensize(i + 1) yourself. Notice the first line is invisible because i is 0. -->

---

## Why it matters

> Progress bars, animation frames and game levels all count. The loop counter is how code counts.

<!-- Speaker note: You have met `i` in every loop so far, but never used it. It is a counter, and it changes on every pass. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

for i in range(30):
    forward(i * 5)
    right(90)
```

**What will the turtle draw?**

- a spiral that grows outward
- nothing: i is never stored
- a circle
- a square

<!-- Speaker note: What happens: A spiral. i is 0 on the first pass, 1 on the second, 2 on the third, so i * 5 is 0, 5, 10, and every line is longer than the last. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: show the loop with forward(i * 5) and ask what it draws. Take a vote before anyone runs it; the wrong options are a square (the counter does not change), a circle, and an error because i was never stored. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Afor+i+in+range%2830%29%3A%0A++++forward%28i+*+5%29%0A++++right%2890%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-counter/?full=step-2#step-2)

<!-- Speaker note: Run it and compare it with your prediction. Here is what each line does. | Line | What it does | Why | |---|---|---| | `for i in range(30):` | Runs 30 times and makes a counter called `i` | `i` is 0 on the first pass, 1 on the second, up to 29 | | ` forward(i * 5)` | Draws a line `i * 5` long | The lines are 0, 5, 10, 15 and so on, so they grow | | ` right(90)` | Turns a quarter turn | The same turn every pass | The first line is 0 steps long, because `i` is 0 on the first pass. Counting starts at 0, not 1. -->

<!-- Speaker note: Teacher: students run it and compare. Ask: how long is the first line, and why? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* A spiral. i is 0 on the first pass, 1 on the second, 2 on the third, so i * 5 is 0, 5, 10, and every line is longer than the last.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *

for i in range(30):
    forward(i * 5)
    right(90)
```

<!-- Speaker note: Follow the counter round the loop, then use what you know about names. What this step is for: The counter takes a new value on every pass, so any line that uses it does something different each time round. -->

<!-- Speaker note: Teacher: trace the counter 0, 1, 2, 3 and say that counting starts at 0, because later lessons rely on it. The second task checks that a name still holds a value you can calculate with. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow the counter

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *

for i in range(30):
    forward(i * 5)
    right(90)
```

</div>
<div>

**Fill in the counter and the length of the line on each pass.**

| pass | i | line length (i * 5) |
|---|---|---|
| 1 | 0 | 0 |
| 2 | ? | ? |
| 3 | ? | ? |
| 4 | ? | ? |

* Answer: 1, 5, 2, 10, 3, 15

</div>
</div>

<!-- Speaker note: i starts at 0 and goes up by 1 each pass, so i * 5 goes 0, 5, 10, 15. The first line is 0 long, so you never see it. -->

<style scoped>section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Work out the turn

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *

for i in range(30):
    forward(i * 5)
    right(90)
```

</div>
<div>

**A program has sides = 8 and turns right(360 / sides) on every pass of its loop. How many degrees is each turn?**

* Answer: 45

</div>
</div>

<!-- Speaker note: 360 / 8 = 45. The name sides holds 8 each time the line runs. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Grow faster:** Change one number so the spiral grows faster.
- **Thicker and thicker:** Use the counter to make the line thicker on every pass.

<!-- Speaker note: What this step is for: Because the line length is worked out from i, changing one number changes every line of the spiral. Hints, in order: Only one number needs to change. Which number is multiplied by i? / pensize( ) sets how thick the line is. The pen needs a number that changes each pass. / The counter changes each pass, so use it. pensize(i + 1) starts at 1. For students who need more support: Give the first three values of i * 5 and ask the student to continue the pattern before running. For early finishers: Draw a spiral that turns 91 degrees instead of 90. What happens, and why? The hard part, on purpose: Believing the counter is the same number every pass, or that it starts at 1. Ask what i is on the first pass. When students get stuck: The spiral is a square, with every line the same length. Ask: Is the length worked out from i, or typed as a number? Fix: The length must use i, for example forward(i * 5). / A student expects the first line to be 5 long. Ask: What is i on the very first pass? Fix: i is 0 on the first pass, so i * 5 is 0. Counting starts at 0. / An error says i is not defined. Ask: Is the line that uses i indented inside the for loop? Fix: i only exists inside the loop. Indent the line under the for line. -->

<!-- Speaker note: Teacher: students change the multiplier, then use the counter for the pen. Let them try pensize(i) first: it starts at 0, so the first line is thin. That is a good moment to talk about starting at 0. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Afor+i+in+range%2830%29%3A%0A++++forward%28i+*+5%29%0A++++right%2890%29%0A%0A%23+Change+one+number+so+the+spiral+grows+faster.%0A%23+Then+make+the+line+thicker+on+every+pass.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-counter/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**In for i in range(5): forward(i * 10), what is the length of the third line?**

* 20. The third pass has i = 2, and 2 * 10 = 20.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson makes a value grow without the counter: a variable that adds to itself. Counters are used for scores, timers and animations. Class ideas: a spiral gallery with different multipliers. -->
