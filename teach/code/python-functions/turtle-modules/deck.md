---
marp: true
theme: default
html: true
---

# Modules

Python functions and events · Functions

<!-- Speaker note: Students import functions from a module (a separate file of related functions), see why copied code costs more to fix, then build a module of their own. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** keep related functions together in a file you can import, like a toolbox.

- I can import functions from a module and use them.
- I can explain why one shared module is easier to fix than copies of the same code.
- I can move related functions into a module of my own.

<!-- Speaker note: Before class: A **module** is a Python file of functions that other programs can use. `from shapes import square` means "find the file shapes.py and bring in its square function". In the playground, **+ module** makes a new file tab. Before class, do the Modify step yourself: move the three house functions into a module and import `house`. Teacher: Point out that My tools works the same way as copying: each paste is a separate copy. Teacher: Investigate (where does it come from?): open the shapes module from the Reference panel. Ask: what happens if main.py defines its own square after importing one? -->

---

## Why it matters

> Every Python program you will ever use imports other people's modules. Now you will build your own.

<!-- Speaker note: You have written several functions. A **module** is a file that holds related functions, so any program can import them. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *
from shapes import square, triangle

square(80)
triangle(80)
```

This program never defines `square` or `triangle`. What does it draw? Where do you think they come from?

<!-- Speaker note: Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the program draws a square and a triangle but never defines them. Ask where they might come from. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0Afrom+shapes+import+square%2C+triangle%0A%0Asquare%2880%29%0Atriangle%2880%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-modules/?full=step-2#step-2)

<!-- Speaker note: Run it. The line `from shapes import square, triangle` brings two ready-made functions into your program. Students should be able to say: I ran a program that imports functions from a module. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Every line to change

**The walls do not close: the turn inside wall is wrong. Click every line you would have to change.**

<div class="cols" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

**program_a.py**

```
 1  from turtle import *
 2  
 3  
 4  def wall(size):
 5      for i in range(4):
 6          forward(size)
 7          right(80)
 8  
 9  
10  wall(60)
```

</div>
<div>

**program_b.py**

```
 1  from turtle import *
 2  
 3  
 4  def wall(size):
 5      for i in range(4):
 6          forward(size)
 7          right(80)
 8  
 9  
10  wall(100)
```

</div>
</div>

* Answer: line program_a.py:7 and program_b.py:7

<!-- Speaker note: Both programs run, but each has its own copy of wall, so the same fix is needed in two places. Miss one and that program stays wrong. -->

<!-- Speaker note: Teacher: both programs have the same wrong turn. Fixing it means editing twice, and missing one leaves a bug. That cost is the reason modules exist. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the fixes

**You fix the bug in program_a.py. What happens to program_b.py?**

- It still has the bug, so you fix it separately
- It stops working
- Python warns you
- It is fixed too

* Answer: It still has the bug, so you fix it separately

<!-- Speaker note: Each file has its own copy of wall, so each copy needs fixing. If both programs imported wall from one module, you would fix it once. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: where does it come from?

```python
from turtle import *
from shapes import square, triangle

square(80)
triangle(80)
```

<!-- Speaker note: Open **Reference**, find **Module: shapes** and click **Show how it works**. Compare it with the functions you have written. What this step is for: An import gives a program names; a def with the same name replaces the imported one without warning. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the def

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *
from shapes import square, triangle

square(80)
triangle(80)
```

</div>
<div>

**Where is square defined?**

- Nowhere
- In shapes.py, which this program imports
- In this program
- Inside the turtle module

* Answer: In shapes.py, which this program imports

</div>
</div>

<!-- Speaker note: The def lives in shapes.py. The import line makes it available here. -->

<style scoped>section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Same name twice

```python
# file: shapes.py
from turtle import *

def square(size):
    for i in range(4):
        forward(size)
        right(90)

# file: main.py
from turtle import *
from shapes import square

def square(size):
    circle(size / 2)

square(80)
```

**main.py imports square, then defines its own square. What does square(80) draw?**

- A square and a circle
- A square, from shapes.py
- A circle, from main.py
- Nothing: Python stops with an error

* Answer: A circle, from main.py

<!-- Speaker note: The def in main.py comes after the import, so the name square now means the new function. Python gives no warning. Use a different name, or keep one definition. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

These three functions are all in one file, and the wall does not close. Click **+ module**, move them into it, and import `house` back into `main.py`. Then fix the turn in `wall`, once, in the module. Work it out from the shape, as you did with variables: `360 / 4`, not a guessed number.

<!-- Speaker note: Hints, in order: Click + module, give it a name, then cut the three functions and paste them there. / Your program needs a line at the top: from yourname import house / The walls turn 80 degrees. Work the turn out from the shape instead: right(360 / 4). For students who need more support: Do the Modify step together on the projector, then let students make a two-function module before attempting three. For early finishers: Write a module with a docstring for each function (a first line in triple quotes). The docstring becomes the hint on the function's card in the Reference panel. The hard part, on purpose: Seeing why a module beats copying, and that a def with the same name replaces an import. Ask how many places they'd have to fix if the code were copied. When students get stuck: A ModuleNotFoundError or ImportError. Ask: Is the module's file name exactly the name after from, without .py? Fix: The tab name and the import must match exactly, in lowercase. / The drawing happens twice, or as soon as the module is imported. Ask: Are there calls (not just defs) inside the module? Fix: Keep only def blocks in the module. Calls go in main.py. / An imported function behaves differently from what the module says. Ask: Is there a def with the same name in main.py? Fix: A def in main.py with the same name replaces the imported one. Rename or delete one of them. -->

<!-- Speaker note: Teacher: students move three functions into a module, import house, and fix the turn once. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0A%0Adef+wall%28size%29%3A%0A++++for+i+in+range%284%29%3A%0A++++++++forward%28size%29%0A++++++++right%2880%29%0A%0A%0Adef+roof%28size%29%3A%0A++++left%2860%29%0A++++forward%28size%29%0A++++right%28120%29%0A++++forward%28size%29%0A++++right%28120%29%0A++++forward%28size%29%0A++++right%28180%29%0A%0A%0Adef+house%28size%29%3A%0A++++wall%28size%29%0A++++roof%28size%29%0A%0A%0Ahouse%2860%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-modules/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**How far does the turtle draw in total, counting only the lines (not the turns)?**

* Answer: 320

<!-- Speaker note: square(30) draws 4 × 30 = 120 and square(50) draws 4 × 50 = 200, so 320 altogether. What this step is for: A module is functions kept in a file. Calling them still follows the same rules. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Create a module of your own with at least three related functions. Import it and use it to draw a small scene.

<!-- Speaker note: Hints, in order: Pick a theme for your module, such as trees, stars or buildings. / Keep drawing calls in main.py. The module should only contain functions. -->

<!-- Speaker note: Teacher: a theme helps (trees, stars, buildings). Keep the drawing calls in main.py; the module only holds functions. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0A%23+Create+a+module+of+your+own+with+several+functions%2C+then+import+it+here+and+use+it.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-modules/?full=step-7#step-7)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Extend a street

A street is a few buildings repeated, and each building comes from a module. Run it. Add a roof colour, a taller house, or a gap in the street. You are changing the plan without rewriting any of the shapes.

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Extend a street

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0Afrom+shapes+import+square%2C+triangle%0A%0Afor+i+in+range%284%29%3A%0A++++square%2860%29%0A++++triangle%2860%29%0A++++penup%28%29%0A++++forward%2880%29%0A++++pendown%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-modules/?full=step-8#step-8)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Two programs each have their own copy of a draw_tree function with a bug. Why would putting draw_tree in a module be better?**

* Both programs would import the one function, so fixing it once in the module fixes it for both.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next unit makes programs react to clicks and keys. Every real Python program imports modules others wrote (random, math, and libraries like Gradio). Class ideas: each student builds a module for a theme and a classmate imports it; a class town built from everyone's modules. -->
