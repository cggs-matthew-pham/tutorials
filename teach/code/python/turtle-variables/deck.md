---
marp: true
theme: default
html: true
---

# Name a value

Python Foundations with Turtle · Drawing and repeating

<!-- Speaker note: Students give numbers names (variables) and let the program calculate the turn, so one change at the top updates the whole shape. About 40 minutes (Predict and Run 10 min · Investigate 12 min · Modify 6 min · Make 8 min · Room plan 4 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** give a number a name, then let the program work out the rest.

- I can store a value in a variable and use its name instead of the number.
- I can work out a value with a calculation, such as angle = 360 / sides.
- I can change a whole drawing by changing one variable.

<!-- Speaker note: Before class: Run the first program, then make the shape generator from the Make step. Notice how little you change to get a different shape: that is the point of the lesson. Teacher: Read = aloud as 'store'. sides = 5 means 'store 5 in sides', not 'sides equals 5'. This one habit prevents most confusion later. -->

---

## Why it matters

> Games keep score, maps keep scale and apps keep your settings. All of them store a value under a name and calculate with it.

<!-- Speaker note: In the last lesson the numbers were typed straight into each command. Here you give a number a **name**, so you can change it in one place and let the program work out the rest. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

sides = 5
size = 80
angle = 360 / sides

for i in range(sides):
    forward(size)
    right(angle)
```

**How many sides will the shape have?**

<!-- Speaker note: What happens: Five sides. angle = 360 / 5 = 72, so the turtle turns 72 degrees at each corner and the shape closes. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask how many sides the shape will have and why the turtle turns 72 degrees. The answer is in the line angle = 360 / sides. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Asides+%3D+5%0Asize+%3D+80%0Aangle+%3D+360+%2F+sides%0A%0Afor+i+in+range%28sides%29%3A%0A++++forward%28size%29%0A++++right%28angle%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-variables/?full=step-2#step-2)

<!-- Speaker note: Run it and compare it with your prediction. Here is what each line does. | Line | What it does | Why | |---|---|---| | `sides = 5` | Stores 5 under the name `sides` | Read `=` as "store": put 5 in a box called `sides` | | `size = 80` | Stores 80 under the name `size` | Change it here and every `size` below changes | | `angle = 360 / sides` | Works out the turn and stores it | A full turn is 360 degrees, split between the corners | | `range(sides)` | Repeats `sides` times | The name stands in for 5 | | `right(angle)` | Turns by whatever `angle` holds | 72 here, but you never typed 72 | Change `sides` and the turn updates by itself. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Five sides. angle = 360 / 5 = 72, so the turtle turns 72 degrees at each corner and the shape closes.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *

sides = 5
size = 80
angle = 360 / sides
print(angle)

for i in range(sides):
    forward(size)
    right(angle)
```

<!-- Speaker note: `print(angle)` shows a value under the drawing. Copy it whenever you want to see what a name holds; the console lessons explain how it works. Change `sides` and watch what `angle` becomes, then work through the checks. What this step is for: A variable is a named value: you can follow how it is used, find where it goes wrong, and change it in one place. -->

<!-- Speaker note: Teacher: students work the angle for 6 sides, find the multiply-for-divide bug, decide what a later store does to a line already drawn (it does nothing to it), and find the unindented turn in a loop they met last lesson. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Calculate the angle

<div class="side" style="display:grid;grid-template-columns:1fr 3fr;gap:1em">
<div>

**If sides = 6, what is angle?**

* Answer: 60

</div>
<div>

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Asides+%3D+5%0Asize+%3D+80%0Aangle+%3D+360+%2F+sides%0Aprint%28angle%29%0A%0Afor+i+in+range%28sides%29%3A%0A++++forward%28size%29%0A++++right%28angle%29%0A}}

</div>
</div>

<!-- Speaker note: 360 / 6 = 60, so the turtle turns 60 degrees at each corner. -->

<style scoped>section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This program should draw a 5-sided shape, but it does not close. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  sides = 5
 4  size = 80
 5  angle = 360 * sides
 6  
 7  for i in range(sides):
 8      forward(size)
 9      right(angle)
```

* Answer: line 5

<!-- Speaker note: angle = 360 * sides is too big. To split one full turn between the corners it should be 360 / sides. -->

<style scoped>pre, marp-pre { font-size: 0.65em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A name keeps its value

A name holds one value at a time. Lines that ran earlier keep what they used.

```python
size = 50
forward(size)
size = 100
forward(size)
```

**The program stores size = 50 and draws a line. Later it stores size = 100 and draws another line. How long was the first line?**

- Storing size twice is an error
- 50
- 100
- 150

* Answer: 50

<!-- Speaker note: A line uses the value size holds at that moment. Storing a new value changes the lines drawn after it, not the ones already drawn. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug in the loop

**This should draw a hexagon, but the turtle draws one long line and turns once at the end. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  sides = 6
 4  size = 80
 5  angle = 360 / sides
 6  
 7  for i in range(sides):
 8      forward(size)
 9  right(angle)
```

* Answer: line 9

<!-- Speaker note: right(angle) is not indented, so it is not part of the loop. Indent it under the for line so both lines repeat. -->

<style scoped>pre, marp-pre { font-size: 0.65em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Change one number at the top to draw a hexagon, then a 12-sided shape. Run it each time.

<!-- Speaker note: What this step is for: Changing the program through a variable is safer than changing many numbers: one edit, whole shape updated. Hints, in order: You should only need to change one number. Which variable controls the number of sides? For students who need more support: Give students a table with two columns (sides, angle) and ask them to fill in angle for 3, 4, 5 and 6 before running anything. For early finishers: Change sides to 3, 4, 5 and up to 20, and record which values still look like the shape and which look like a circle. The hard part, on purpose: Seeing that a name holds a value the program can reuse. Ask them to say, for each line, which stored value it uses. When students get stuck: The shape does not close, or the turtle spins in place. Ask: What is stored in angle when sides is 5? Work it out on paper. Fix: angle must be 360 / sides (divide, not multiply). / A NameError says a name is not defined. Ask: Is the name spelt exactly the same everywhere, including capitals? Fix: Variable names must match exactly. Size and size are different names. / A student changes a variable after the loop and expects the shape to change. Ask: Which lines already ran before you changed it? Fix: Lines use the value a name holds when they run. Put the change above the loop. -->

<!-- Speaker note: Teacher: students should only ever change the top numbers. If someone edits inside the loop, ask them to find the one variable that does the job. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Asides+%3D+5%0Asize+%3D+80%0Aangle+%3D+360+%2F+sides%0A%0Afor+i+in+range%28sides%29%3A%0A++++forward%28size%29%0A++++right%28angle%29%0A%0A%23+Change+one+number+at+the+top+to+draw+a+hexagon%2C+then+a+12-sided+shape.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-variables/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make your own shape generator. Put three names at the top (`sides`, `size` and `colour`) and use all three below. Then change each one and watch the shape change.

<!-- Speaker note: Hints, in order: Put three names at the top: sides, size and colour. Then use each name below. / A colour is text, so it goes in quotes: colour = "purple". Use it with pencolor(colour). -->

<!-- Speaker note: Teacher: three names and a loop. Let students choose their own values; the check only needs a variable-coloured pen and a loop. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0A%23+Name+the+sides%2C+the+size+and+the+colour%2C+then+draw+the+shape.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-variables/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Resize a room plan

Plans and maps store a **scale**: how many pixels are one metre. This program draws a 6 m by 4 m room. Change the room to 8 m by 5 m, then change `scale` and notice the whole plan resizes. Then add a second room beside it.

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Resize a room plan

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Ascale+%3D+20+++%23+pixels+per+metre%0Awidth+%3D+6++++%23+metres%0Adepth+%3D+4%0A%0Afor+i+in+range%282%29%3A%0A++++forward%28width+*+scale%29%0A++++right%2890%29%0A++++forward%28depth+*+scale%29%0A++++right%2890%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-variables/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A program has sides = 8 and angle = 360 / sides. How far does the turtle turn at each corner?**

* 45 degrees (360 divided by 8).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson uses the loop counter, so a value can change each pass without being typed. After that, a value that grows. Scores, game settings and the scale on maps and plans all use variables. Class ideas: a spiral gallery; scale drawings of the classroom. -->
