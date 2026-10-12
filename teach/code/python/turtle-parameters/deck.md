---
marp: true
theme: default
html: true
---

# Functions with parameters

Python Foundations with Turtle · Functions

<!-- Speaker note: Students give a function inputs (parameters), so one function can draw many sizes and shapes, then build a pattern by calling one function from another. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 10 min · My tools 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** make one function draw many different shapes, and keep your best ones as tools.

- I can write a function with parameters and call it with different values.
- I can explain the difference between a parameter (the name in the def) and an argument (the value in the call).
- I can call one function from inside another.

<!-- Speaker note: Before class: Run the three nested squares and try adding a colour parameter to `polygon`. Two words to have straight: a **parameter** is the name in the def (`size`), an **argument** is the value you pass when calling (`50`). The argument fills the parameter, in order. Teacher: My tools: students save a function to My tools in the Reference panel. It is a copy they can paste into later programs. -->

---

## Why it matters

> One well-made function can do the work of a hundred copied lines: sending a message, drawing a tile, converting a unit.

<!-- Speaker note: Last lesson `square()` always drew the same size. A **parameter** lets each call say what it needs. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *


def square(size):
    for i in range(4):
        forward(size)
        right(90)


square(50)
square(100)
square(150)
```

`size` is a parameter. What will this draw? Where do the three squares share a corner, and why?

<!-- Speaker note: Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask why the three squares share a corner. They all start where the turtle is, facing the same way; only size changes. -->

<style scoped>pre, marp-pre { font-size: 0.61em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0A%0Adef+square%28size%29%3A%0A++++for+i+in+range%284%29%3A%0A++++++++forward%28size%29%0A++++++++right%2890%29%0A%0A%0Asquare%2850%29%0Asquare%28100%29%0Asquare%28150%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-parameters/?full=step-2#step-2)

<!-- Speaker note: Run it and compare it with your prediction. Then call `square` with other sizes. Students should be able to say: I can explain how square(50) and square(150) draw different squares from the same def. -->

<!-- Speaker note: Teacher: students try their own sizes. Ask what would happen with square(-50). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *


def polygon(sides, size):
    angle = 360 / sides
    for i in range(sides):
        forward(size)
        right(angle)


polygon(3, 80)
polygon(4, 80)
polygon(6, 80)
```

<!-- Speaker note: `polygon(sides, size)` has two parameters. The angle is calculated from `sides`, just like in the variables lesson. What this step is for: A parameter lets one function make many results: each call passes arguments in order, and the function calculates from them. -->

<!-- Speaker note: Teacher: arguments go to parameters in order. polygon(6, 80) fills sides with 6 and size with 80. Swapping them gives an 80-sided shape. -->

<style scoped>pre, marp-pre { font-size: 0.79em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace three calls

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *


def polygon(sides, size):
    angle = 360 / sides
    for i in range(sides):
        forward(size)
        right(angle)


polygon(3, 80)
polygon(4, 80)
polygon(6, 80)
```

</div>
<div>

**Fill in what each call passes to polygon(sides, size), and the angle it calculates.**

| call | sides | size | angle |
|---|---|---|---|
| polygon(3, 80) | 3 | 80 | ? |
| polygon(4, 80) | 4 | 80 | ? |
| polygon(6, 80) | ? | ? | ? |

* Answer: 120, 90, 6, 80, 60

</div>
</div>

<!-- Speaker note: Arguments go to the parameters in order, and angle = 360 / sides inside the function. -->

<style scoped>section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Name the parts

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *


def polygon(sides, size):
    angle = 360 / sides
    for i in range(sides):
        forward(size)
        right(angle)


polygon(3, 80)
polygon(4, 80)
polygon(6, 80)
```

</div>
<div>

**Match each piece with its role.**

| | |
|---|---|
| `sides in def polygon(sides, size):` | A. calculated inside the function |
| `6 in polygon(6, 80)` | B. a call: runs the function with these values |
| `angle = 360 / sides` | C. an argument: the value for sides |
| `polygon(4, 80)` | D. a parameter: filled in by each call |

* Answer: sides in def polygon(sides, size): → D. a parameter: filled in by each call; 6 in polygon(6, 80) → C. an argument: the value for sides; angle = 360 / sides → A. calculated inside the function; polygon(4, 80) → B. a call: runs the function with these values

</div>
</div>

<!-- Speaker note: Parameters are the names in the def. Arguments are the values you pass when you call it. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Draw one more shape:** Call `polygon` with sides and size of your choice.
- **Add a colour parameter:** Change `polygon` so each call can choose its own pen colour, like `polygon(3, 80, "red")`.

<!-- Speaker note: What this step is for: Extending a function means changing its definition and every call; it shows why parameters are a contract between the def and its callers. Hints, in order: Add a line like polygon(8, 50) at the bottom. / A new parameter goes in the brackets of the def, and a new value goes in every call. / Inside the function, `pencolor(...)` takes the value of your new parameter. For students who need more support: Give students a table of calls (square(50), square(100)) and ask them to sketch what each draws before running. For early finishers: Add a third parameter to pattern for the size, and draw a gallery of three different patterns side by side. The hard part, on purpose: Arguments fill parameters in order. Read the call and the def aloud side by side and match each value to its name. When students get stuck: A TypeError: polygon() missing 1 required positional argument. Ask: How many parameters does the def have, and how many values does this call pass? Fix: Every call must pass one value for each parameter, in the same order. / The shape has far too many sides or does not close. Ask: Which value went into sides, and which into size? Fix: Arguments match parameters by position. polygon(6, 80), not polygon(80, 6). / The pattern draws one shape on top of itself. Ask: Does the turtle turn between the copies? Fix: Add right(360 / copies) inside the loop, after drawing each polygon. -->

<!-- Speaker note: Teacher: adding a colour parameter means changing the def and every call. That is the 'contract' between a function and its callers. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0A%0Adef+polygon%28sides%2C+size%29%3A%0A++++angle+%3D+360+%2F+sides%0A++++for+i+in+range%28sides%29%3A%0A++++++++forward%28size%29%0A++++++++right%28angle%29%0A%0A%0Apolygon%283%2C+80%29%0Apolygon%284%2C+80%29%0Apolygon%286%2C+80%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-parameters/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Write `def pattern(sides, copies):` that draws `copies` polygons, turning a little between them so they fan out around a point.

<!-- Speaker note: Hints, in order: Use a loop to repeat. Inside it, call polygon, then turn a little. / To go round once in total, each turn is 360 divided by the number of copies. -->

<!-- Speaker note: Teacher: pattern calls polygon in a loop and turns a little each time. Set speed(0) so it draws quickly. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0A%0Adef+polygon%28sides%2C+size%29%3A%0A++++angle+%3D+360+%2F+sides%0A++++for+i+in+range%28sides%29%3A%0A++++++++forward%28size%29%0A++++++++right%28angle%29%0A%0A%0A%23+Write+def+pattern%28sides%2C+copies%29%3A+below.+It+draws+a+polygon%2C+turns+a+little%2C+and+repeats.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-parameters/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Keep it as a button

You have unlocked **Save selection to My tools**. Open **Reference**, put the cursor inside one of your functions, and click it. It appears under **My tools**, ready to copy into any program. A saved tool is the first layer of abstraction: you can use the idea again without rewriting it.

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make: Keep it as a button

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0A%0Adef+polygon%28sides%2C+size%29%3A%0A++++angle+%3D+360+%2F+sides%0A++++for+i+in+range%28sides%29%3A%0A++++++++forward%28size%29%0A++++++++right%28angle%29%0A%0A%0A%23+Write+def+pattern%28sides%2C+copies%29%3A+below.+It+draws+a+polygon%2C+turns+a+little%2C+and+repeats.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-parameters/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Rearrange a floor plan

A floor plan is `room(width, depth)` called many times. Run it. Move the kitchen, add a bathroom, then change `scale` and see the whole plan resize.

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Rearrange a floor plan

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Ascale+%3D+20++%23+pixels+per+metre%0A%0A%0Adef+room%28width%2C+depth%29%3A%0A++++for+i+in+range%282%29%3A%0A++++++++forward%28width+*+scale%29%0A++++++++right%2890%29%0A++++++++forward%28depth+*+scale%29%0A++++++++right%2890%29%0A%0A%0Adef+move_to%28x%2C+y%29%3A%0A++++penup%28%29%0A++++goto%28x+*+scale%2C+y+*+scale%29%0A++++pendown%28%29%0A%0A%0Amove_to%28-8%2C+4%29%0Aroom%285%2C+4%29++++%23+bedroom%0Amove_to%28-3%2C+4%29%0Aroom%284%2C+4%29++++%23+kitchen%0Amove_to%28-8%2C+0%29%0Aroom%289%2C+3%29++++%23+living+room%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-parameters/?full=step-7#step-7)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**def polygon(sides, size): ... What does polygon(5, 40) draw?**

* A pentagon (5 sides) with each side 40 steps long, turning 72 degrees at each corner.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson functions give answers back with return. Parameters are how every app passes information around. Class ideas: a pattern gallery where each student chooses sides and copies; compare function designs and talk about what makes one easy to reuse. -->
