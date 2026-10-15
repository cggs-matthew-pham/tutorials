---
marp: true
theme: default
html: true
---

# For each item

Python Foundations with Turtle · Choices and lists

<!-- Speaker note: Students visit every item of a list with a for-each loop, and see that the loop name holds the item itself. About 30 minutes (Predict and Run 8 min · Investigate 8 min · Modify 5 min · Mix it up 3 min · Make 6 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** visit every item in a list in turn, without counting places.

- I can use a for loop to visit each item in a list.
- I can say what the loop name holds on each pass.
- I can draw one thing for each item in a list.

<!-- Speaker note: Before class: Run the coloured squares and the bar chart. The idea to have ready: in `for c in colours`, `c` is the colour itself, not its place. Teacher: Mix it up: students work the count out on paper. Each score is tested as it is visited. -->

---

## Why it matters

> A playlist plays each song, a printer prints each page and a game moves each enemy. They all work through a list, one item at a time.

<!-- Speaker note: Last lesson you picked items by their place. Often you don't care about the place: you want to do something with **each** item. -->

---

## By the end of this lesson

Here is the finished program running. By the end of the lesson you will write one like it.

<!-- Speaker note: Run the finished example on the projector before anything else. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]
size = 40

penup()
goto(-130, 0)
pendown()

for c in colours:
    fillcolor(c)
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    penup()
    forward(size + 10)
    pendown()
```

**On the first time round the loop, what does c hold?**

- "red", the first colour itself
- the whole list
- nothing yet
- 0, the place of the first colour

<!-- Speaker note: What happens: "red", the first colour itself. In for c in colours, c is each item in turn: first "red", then "orange", and so on. It is not a place number. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what c holds the first time round. The wrong options are the place number, the whole list, and nothing. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Acolours+%3D+%5B%22red%22%2C+%22orange%22%2C+%22yellow%22%2C+%22green%22%2C+%22blue%22%5D%0Asize+%3D+40%0A%0Apenup%28%29%0Agoto%28-130%2C+0%29%0Apendown%28%29%0A%0Afor+c+in+colours%3A%0A++++fillcolor%28c%29%0A++++begin_fill%28%29%0A++++for+side+in+range%284%29%3A%0A++++++++forward%28size%29%0A++++++++right%2890%29%0A++++end_fill%28%29%0A++++penup%28%29%0A++++forward%28size+%2B+10%29%0A++++pendown%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-for-each/?full=step-2#step-2)

<!-- Speaker note: Run it and compare it with your prediction. | Line | What it does | Why | |---|---|---| | `for c in colours:` | Runs the indented lines once for each item | No `range`, no counting | | `c` | Holds the current item: `"red"`, then `"orange"` ... | It is the item itself, not its place | | `fillcolor(c)` | Uses the colour for this square | Five items, five squares | -->

<!-- Speaker note: Teacher: read the loop aloud as 'for each colour c in the list colours'. Ask: how many times did it run, and how do you know without counting? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* "red", the first colour itself. In for c in colours, c is each item in turn: first "red", then "orange", and so on. It is not a place number.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]
size = 40

penup()
goto(-130, 0)
pendown()

for c in colours:
    fillcolor(c)
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    penup()
    forward(size + 10)
    pendown()
```

<!-- Speaker note: What this step is for: In a for-each loop the name holds the item itself. Use it directly; asking the list for it again is a mistake. -->

<!-- Speaker note: Teacher: the trace shows c changing each pass. The bug task uses c as a place; ask what colours[c] would mean. -->

<style scoped>pre, marp-pre { font-size: 0.54em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What does c hold?

**Fill in what c holds on each pass.**

| pass | c |
|---|---|
| 1 | red |
| 2 | ? |
| 3 | ? |
| 4 | ? |
| 5 | ? |

* Answer: orange, yellow, green, blue

<!-- Speaker note: c holds each item in turn, in the order they are in the list. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This program should draw three circles, but it stops with an error. Click the line that causes it.**

```
 1  from turtle import *
 2  
 3  colours = ["red", "blue", "green"]
 4  
 5  for c in colours:
 6      pencolor(colours[c])
 7      circle(30)
```

* Answer: line 6

<!-- Speaker note: c is already a colour, such as "red". colours[c] asks for the item in place "red", which makes no sense. Use pencolor(c). -->

<style scoped>pre, marp-pre { font-size: 0.83em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Visit each <span style="font-size:.6em;color:#64748b">(5 min)</span>

One student walks along a row of colour cards and says what c holds at each. Compare with the index version from last lesson.

<!-- Speaker note: Make the idea physical before it goes back to the screen. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Add two more colours to the list. Move the start so they all fit on the screen.

<!-- Speaker note: What this step is for: A longer list gives a longer result with no change to the loop, and you never count the items. Hints, in order: Each colour is a word in quotes, separated from the next by a comma. / Seven squares are wider than five. Move the start further left, with goto. For students who need more support: Give the loop with the first two passes traced, and ask the student to continue the table. For early finishers: Draw the bar chart with each bar a different colour, using a second list of colours alongside the heights. The hard part, on purpose: Remembering that c is the item, not its place. Ask what c holds on the first pass before running. When students get stuck: An error on the pencolor line inside the loop. Ask: What does c hold? Is it a place or a colour? Fix: c is already the colour. Use pencolor(c), not pencolor(colours[c]). / The bars all start in the same place and overlap. Ask: What does the turtle do after finishing one bar? Fix: Lift the pen and move forward past the bar before drawing the next one. / A student prefers range(len(...)). Ask: Do you need the place in this loop? Fix: If only the item matters, use for-each. Use the place when you need it, for example to pick from two lists at once. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Acolours+%3D+%5B%22red%22%2C+%22orange%22%2C+%22yellow%22%2C+%22green%22%2C+%22blue%22%5D%0Asize+%3D+40%0A%0Apenup%28%29%0Agoto%28-130%2C+0%29%0Apendown%28%29%0A%0Afor+c+in+colours%3A%0A++++fillcolor%28c%29%0A++++begin_fill%28%29%0A++++for+side+in+range%284%29%3A%0A++++++++forward%28size%29%0A++++++++right%2890%29%0A++++end_fill%28%29%0A++++penup%28%29%0A++++forward%28size+%2B+10%29%0A++++pendown%28%29%0A%0A%23+Add+two+more+colours+to+the+list%2C+then+move+the+start+so+they+all+fit.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-for-each/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

_The program is 29 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-for-each/?full=step-5#step-5)

<!-- Speaker note: This program visits each score and decides its colour. Work out the answer before you run it. What this step is for: Each item can be tested as it is visited: an if inside a for-each decides what to do with each one. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**scores = [45, 72, 90, 38, 66] and pass_mark = 50. How many bars are green?**

* Answer: 3

<!-- Speaker note: 72, 90 and 66 are at least 50, so three bars are green. 45 and 38 are red. What this step is for: Each item can be tested as it is visited: an if inside a for-each decides what to do with each one. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Draw a **bar chart**: one bar for each number in `heights`, the height of the bar equal to the number.

<!-- Speaker note: Hints, in order: One bar for each number in the list: for h in heights does that, and each time round h is the next height. / A bar is a rectangle: forward(20), left(90), forward(h), left(90), forward(20), left(90), forward(h), left(90). Then move on before the next bar. -->

<!-- Speaker note: Teacher: the bar chart is the same loop with heights instead of colours. A bar is a rectangle whose tall side is the number. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aheights+%3D+%5B30%2C+80%2C+50%2C+100%2C+60%5D%0A%0Apenup%28%29%0Agoto%28-100%2C+-100%29%0Apendown%28%29%0A%0A%23+Draw+one+bar+for+each+height+in+the+list.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-for-each/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**sizes = [10, 20, 30]. for s in sizes: forward(s). How far does the turtle go on the second pass?**

* 20. On the second pass s holds the second item, 20.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Lists and loops return in Catch the turtle, where a list holds the path, and in the control panel. Course B starts by reading a longer program that uses everything from this course. -->
