---
marp: true
theme: default
html: true
---

# Variables and operations

Python Foundations with Turtle · Drawing and repeating

<!-- Speaker note: Students give numbers names (variables) and let the program calculate the turn, so one change at the top updates the whole shape. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 10 min · Make 10 min · Room plan 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** give a number a name, then calculate with it.

- I can store a value in a variable and use its name instead of the number.
- I can work out a value with a calculation, such as angle = 360 / sides.
- I can change a whole drawing by changing one variable.

<!-- Speaker note: Before class: Run the first program, then make the spiral from the Make step. The key line is `size = size + 5`, which looks wrong to anyone used to maths: in Python it means "work out size + 5, then store it back in size". Be ready to say that out loud. Teacher: Read = aloud as 'store'. sides = 5 means 'store 5 in sides', not 'sides equals 5'. This one habit prevents most confusion later. -->

---

## Why it matters

> Games keep score, maps keep scale and apps keep your settings. All of them store a value under a name and calculate with it.

<!-- Speaker note: In the last lesson the numbers were typed straight into each command. Here you give a number a **name**, so you can change it in one place and calculate with it. -->

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

<!-- Speaker note: Run it and compare it with your prediction. Students should be able to say: I can explain what sides, size and angle store, and where angle comes from. -->

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

<!-- Speaker note: `print(angle)` shows a value under the drawing. Change `sides` and watch what `angle` becomes. What this step is for: A variable is a named value: you can follow how it is used, find where it goes wrong, and change it in one place. -->

<!-- Speaker note: Teacher: print(angle) shows what is stored. Students change sides and watch angle change. Ask: why do we never need to type 72? The last two tasks teach size = size + 5 before the spiral: the question settles what it stores, and the table shows the value growing each pass. -->

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

## Store it back

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**A program has size = 20. Then it runs the line size = size + 5. What is stored in size afterwards?**

- Nothing: the line is an error
- 5
- 25
- 20 + 5

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

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Draw a hexagon, then a 12-sided shape:** Change one number at the top and run it each time.
- **Choose the colour with a variable:** Add a variable for the pen colour and use it.

<!-- Speaker note: What this step is for: Changing the program through a variable is safer than changing many numbers: one edit, whole shape updated. Hints, in order: You should only need to change one number. Which variable controls the number of sides? / A variable can hold text as well as numbers, for example a colour in quotes. / Give the colour a name at the top, then use that name inside pencolor( ). For students who need more support: Give students a table with two columns (sides, angle) and ask them to fill in angle for 3, 4, 5 and 6 before running anything. For early finishers: Make a shape generator. Change sides to 3, 4, 5 and up to 20, and record which values still look like the shape and which look like a circle. The hard part, on purpose: Following a value through a variable, especially size = size + 5. Have them trace the first three values on paper before running it. When students get stuck: The shape does not close, or the turtle spins in place. Ask: What is stored in angle when sides is 5? Print it. Fix: angle must be 360 / sides (divide, not multiply). / The spiral is a square: every line is the same length. Ask: Does anything change size while the loop runs? Fix: Add size = size + 5 as the last line inside the loop (indented). / A NameError says a name is not defined. Ask: Is the name spelt exactly the same everywhere, including capitals? Fix: Variable names must match exactly. Size and size are different names. -->

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

Draw a **square spiral**: each time round the loop, the line should be a little longer than the last.

<!-- Speaker note: Hints, in order: The line should get longer every time round the loop. What can change `size` inside the loop? / Look back at 'Store it back' and 'Watch it grow'. Make the last line inside the loop store a bigger `size`. -->

<!-- Speaker note: Teacher: the spiral needs a variable that changes inside the loop. Let students struggle for a few minutes before showing the hint. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Asize+%3D+5%0A%0Afor+i+in+range%2850%29%3A%0A++++forward%28size%29%0A++++right%2890%29%0A++++%23+Make+the+line+longer+every+time+round+the+loop.%0A}}

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

**What does size = size + 5 do if size is 20?**

* It works out 20 + 5 = 25 and stores 25 back in size.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson reads a whole program (a street of houses) that combines loops and variables. After that, programs make decisions about values. Scores, counters, game settings and the scale on maps and plans all use variables. Class ideas: a spiral gallery; scale drawings of the classroom. -->
