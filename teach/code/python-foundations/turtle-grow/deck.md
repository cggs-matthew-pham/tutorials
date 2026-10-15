---
marp: true
theme: default
html: true
---

# A value that grows

Python Foundations with Turtle · Commands, loops and values

<!-- Speaker note: Students meet a variable that changes itself, size = size + 5, and use it to grow a spiral without the loop counter. About 35 minutes (Predict and Run 10 min · Investigate 12 min · Modify 5 min · Make 8 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** a variable can change itself, so a value grows each time round a loop.

- I can say what size = size + 5 does.
- I can use an update inside a loop to make a value grow.
- I can find an update that is in the wrong place.

<!-- Speaker note: Before class: Run the spiral, then make the thickening spiral from the Make step. The key line is size = size + 5, which looks wrong to anyone used to maths: in Python it means "work out size + 5, then store it back in size". Be ready to say that out loud. Teacher: Say it aloud: read size = size + 5 right to left. Work out size + 5, then store the answer back in size. Say 'store' instead of 'equals'. -->

---

## Why it matters

> Scores go up, timers count down and bank balances change. All of them are a variable that works out its next value from its last one.

<!-- Speaker note: Last lesson the counter `i` made the lines grow. A variable can do the same job on its own. -->

---

## By the end of this lesson

Here is the finished program running. By the end of the lesson you will write one like it.

<!-- Speaker note: Run the finished example on the projector before anything else. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

size = 0

for i in range(30):
    forward(size)
    right(90)
    size = size + 5
```

**Last lesson the spiral used the counter. This one uses size = size + 5. What will it draw?**

- A smaller spiral
- A bigger spiral
- The same spiral
- An error: size cannot equal size + 5

<!-- Speaker note: What happens: The same spiral. size starts at 0 and grows by 5 on every pass: 0, 5, 10, 15. That is exactly what i * 5 gave last lesson. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: show the spiral and ask whether it looks different from last lesson's. The wrong options include an error, because many students think size cannot equal size + 5. The counter spiral and the update spiral look the same: ask why before running. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Asize+%3D+0%0A%0Afor+i+in+range%2830%29%3A%0A++++forward%28size%29%0A++++right%2890%29%0A++++size+%3D+size+%2B+5%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-grow/?full=step-2#step-2)

<!-- Speaker note: Run it and compare it with your prediction. Here is what each line does. | Line | What it does | Why | |---|---|---| | `size = 0` | Starts `size` at 0 | It is before the loop, so it only happens once | | `forward(size)` | Draws a line `size` long | Uses whatever `size` holds right now | | `size = size + 5` | Works out `size + 5`, then stores the answer back in `size` | Read the right side first, then store. It is inside the loop, so it happens every pass | The picture is the same as last lesson's. There the counter `i` did the growing; here `size` does it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The same spiral. size starts at 0 and grows by 5 on every pass: 0, 5, 10, 15. That is exactly what i * 5 gave last lesson.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *

size = 0

for i in range(30):
    forward(size)
    right(90)
    size = size + 5
```

<!-- Speaker note: Follow the value as it changes. What this step is for: A variable can change itself: the right side is worked out first with the old value, and the answer is stored back. -->

<!-- Speaker note: Teacher: settle what is stored, trace the value over four passes, then show the update outside the loop and ask what happens. The last question links back to the counter: two ways to get the same lengths. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Store it back

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *

size = 0

for i in range(30):
    forward(size)
    right(90)
    size = size + 5
```

</div>
<div>

**A program has size = 20. Then it runs the line size = size + 5. What is stored in size afterwards?**

- 20 + 5
- Nothing: the line is an error
- 25
- 5

* Answer: 25

</div>
</div>

<!-- Speaker note: Read the line from the right. Python works out size + 5, which is 25, then stores 25 back in size. The = means store, not 'is equal to'. -->

<style scoped>section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Watch it grow

Follow `size` round this loop, which adds to it every pass.

```python
size = 10

for i in range(4):
    forward(size)
    right(90)
    size = size + 10
```

**Fill in the size that forward(size) uses on each pass.**

| pass | size used by forward(size) |
|---|---|
| 1 | 10 |
| 2 | ? |
| 3 | ? |
| 4 | ? |

* Answer: 20, 30, 40

<!-- Speaker note: The last line of each pass stores size + 10 back in size, so the next pass starts with a bigger size. This is how a spiral grows. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should draw a growing spiral, but it draws one small square over and over. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  size = 10
 4  
 5  for i in range(30):
 6      forward(size)
 7      right(90)
 8  size = size + 5
```

* Answer: line 8

<!-- Speaker note: size = size + 5 is not indented, so it runs once, after the loop. Inside the loop it runs on every pass. Indent it under the for line. -->

<style scoped>pre, marp-pre { font-size: 0.73em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Same lengths, two ways

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *

size = 0

for i in range(30):
    forward(size)
    right(90)
    size = size + 5
```

</div>
<div>

**Last lesson's lines were i * 5. This lesson's size starts at 0. Which update inside the loop gives the same lengths?**

- size = size + 5
- size = i
- size = size * 5
- size = 5

* Answer: size = size + 5

</div>
</div>

<!-- Speaker note: Adding 5 each pass gives 0, 5, 10, 15, the same as i * 5. size * 5 stays at 0, size = i gives 0, 1, 2, and size = 5 is always 5. -->

<style scoped>section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Trace size <span style="font-size:.6em;color:#64748b">(5 min)</span>

The class calls out size after each pass while one student updates a number on the board.

<!-- Speaker note: Make the idea physical before it goes back to the screen. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Change the amount added each pass so the spiral grows faster. Run it after each change.

<!-- Speaker note: What this step is for: Changing the amount added changes how fast the value grows, with one edit. Hints, in order: Only the number being added needs to change. For students who need more support: Give the trace table with the first two rows filled in and ask the student to continue it. For early finishers: Make the spiral shrink instead, by subtracting each pass. What happens when size goes below 0? The hard part, on purpose: Reading size = size + 5 as an equation. Have them trace the first three values on paper before running it. When students get stuck: The spiral is a square, with every line the same length. Ask: Does anything change size while the loop runs? Fix: Add size = size + 5 as the last line inside the loop (indented). / One small square is drawn over and over. Ask: Is the update line indented under the for line? Fix: The update must be inside the loop to run on every pass. / A student thinks size = size + 5 is an error. Ask: Which side does Python work out first? Fix: Work out the right side, then store the answer in the name on the left. -->

<!-- Speaker note: Teacher: one number changes. Let students predict before they run. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Asize+%3D+0%0A%0Afor+i+in+range%2830%29%3A%0A++++forward%28size%29%0A++++right%2890%29%0A++++size+%3D+size+%2B+5%0A%0A%23+Change+the+amount+added+so+the+spiral+grows+faster.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-grow/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make the spiral grow **and** get thicker on every pass. The thickness should be a variable that updates itself, like `size` does.

<!-- Speaker note: Hints, in order: Give the thickness its own variable, like size, and set it before the loop. / Use pensize(width) inside the loop, and add to width at the end of each pass. -->

<!-- Speaker note: Teacher: a second variable that updates itself. Students who finish can try changing the amount added to the thickness. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Asize+%3D+0%0A%0Afor+i+in+range%2830%29%3A%0A++++forward%28size%29%0A++++right%2890%29%0A++++size+%3D+size+%2B+5%0A++++%23+Make+the+pen+thicker+every+pass+too.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-grow/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What does size = size + 5 do if size is 20?**

* It works out 20 + 5 = 25 and stores 25 back in size.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next, a street of houses reads a whole program that uses loops, names, the counter and updates together. Scores, timers and bank balances all update this way. Class ideas: a growing-colour spiral; a countdown. -->
