---
marp: true
theme: default
html: true
---

# Functions

Python Foundations with Turtle · Functions

<!-- Speaker note: Students give a group of steps a name with def, then use that name again and again, and see why one change inside a function updates every use. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** give a group of commands a name, then use that name again and again.

- I can write a function with def and call it by name.
- I can explain why changing a function once changes every place it is used.
- I can write a second function by following a pattern.

<!-- Speaker note: Before class: Read the unit primer "Functions in 5 minutes" first. Then run the def version and write the triangle function yourself. The surprise for students: `def square():` on its own draws nothing. It only describes the steps; `square()` runs them. Teacher: The match task separates describing (def) from doing (calling). Spend time here: it is the idea everything else builds on. -->

---

## Why it matters

> Every app is built from small named functions that other code calls. You are about to write your first.

<!-- Speaker note: You already know how to repeat steps with a loop. Now you will give a whole shape a **name**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

for i in range(4):
    forward(100)
    right(90)

penup()
forward(150)
pendown()

for i in range(4):
    forward(100)
    right(90)

penup()
forward(150)
pendown()

for i in range(4):
    forward(100)
    right(90)
```

This program draws three squares by repeating the same code. What does it draw? Count how many times the number `100` appears.

<!-- Speaker note: Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the copy-and-paste program works, but making the squares smaller means changing three numbers. Let students feel that. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Afor+i+in+range%284%29%3A%0A++++forward%28100%29%0A++++right%2890%29%0A%0Apenup%28%29%0Aforward%28150%29%0Apendown%28%29%0A%0Afor+i+in+range%284%29%3A%0A++++forward%28100%29%0A++++right%2890%29%0A%0Apenup%28%29%0Aforward%28150%29%0Apendown%28%29%0A%0Afor+i+in+range%284%29%3A%0A++++forward%28100%29%0A++++right%2890%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-functions/?full=step-2#step-2)

<!-- Speaker note: Run it. Then make all three squares half as big. Notice how many places you had to change. Students should be able to say: I changed the same number in several places to resize all three squares. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *


def square():
    for i in range(4):
        forward(100)
        right(90)


square()
penup()
forward(150)
pendown()
square()
penup()
forward(150)
pendown()
square()
```

<!-- Speaker note: `def square():` gives the loop a name. The steps only run when the name is **called**: `square()`. What this step is for: A def only describes steps; calling its name runs them, so one change inside the def changes every call. -->

<!-- Speaker note: Teacher: introduce def as 'teach Python a new word'. def square(): teaches it; square() uses it. Ask: what does the program draw if we delete the three square() lines? -->

<style scoped>pre, marp-pre { font-size: 0.57em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the changes

**To make all three squares half as big now, how many numbers change?**

* Answer: 1

<!-- Speaker note: Only the numbers inside def square(): change. The three calls are just the name square(), so they never need editing. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

**Match each part of the program with its job.**

| | |
|---|---|
| `def square():` | A. repeats the four sides |
| `square()` | B. moves the turtle |
| `for i in range(4):` | C. runs the steps |
| `forward(100)` | D. gives the steps a name |

* Answer: def square(): → D. gives the steps a name; square() → C. runs the steps; for i in range(4): → A. repeats the four sides; forward(100) → B. moves the turtle

<!-- Speaker note: def only describes the steps. Calling the name is what runs them. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Put it in order

**Put the lines in order so the program draws one square.**

```python
        right(90)
    for i in range(4):
def square():
        forward(100)
square()
```

<!-- Speaker note: The def comes first, indented lines belong inside it, and the call comes after. Correct order: def square(): for i in range(4): forward(100) right(90) square() -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Same name twice

This is one file.

```python
from turtle import *

def square():
    for i in range(4):
        forward(100)
        right(90)

def square():
    for i in range(3):
        forward(100)
        right(120)

square()
```

**Someone pasted a second def square below the first. What does square() draw?**

- Nothing: Python stops because square is defined twice
- A square
- A square, then a triangle
- A triangle

* Answer: A triangle

<!-- Speaker note: A def gives a name to some steps. The second def gives the same name to new steps, so by the time square() is called it means the triangle. Python gives no warning: the first def is simply lost. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Resize the square:** Change the size of the square inside `def square():` and run it.
- **Write a triangle function:** Write `def triangle():` following the pattern of `square`.
- **Use both:** Draw a square, then a triangle, then a square again.

<!-- Speaker note: What this step is for: Writing your own def, following a pattern, is the step from reading functions to making them. Hints, in order: Change a number inside the def, not the call. / Copy the pattern of `square`: the word `def`, a name, brackets, a colon, then the indented steps. / A triangle has 3 sides. The turn at each corner is not 90. / Call each function by its name with brackets, like square(). For students who need more support: Give the def square() code and ask students only to add a triangle() below it by copying and changing two numbers. For early finishers: Write a function star() (five lines, turning 144 degrees each time) and use it to draw a row of stars. The hard part, on purpose: A def on its own does nothing until it's called. When nothing draws, ask where the function is called. When students get stuck: Nothing is drawn, and there is no error. Ask: Where in your code do you call the function, with brackets? Fix: A def only describes. Add a line square() (not indented) below the def. / An IndentationError, or only part of the shape is in the function. Ask: Which lines are pushed in under the def line? Fix: Every line that belongs to the function must be indented under def. / Two functions with the same name; only the second one ever runs. Ask: How many functions are called square? Fix: Give each function its own name. A second def with the same name replaces the first. -->

<!-- Speaker note: Teacher: students write triangle by copying the pattern of square. Check they call it as well as define it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0A%0Adef+square%28%29%3A%0A++++for+i+in+range%284%29%3A%0A++++++++forward%28100%29%0A++++++++right%2890%29%0A%0A%0Asquare%28%29%0A%0A%23+Write+def+triangle%28%29%3A+below%2C+then+call+it+after+the+square.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-functions/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Write a function that draws any shape you like (a rectangle, a hexagon, a star), then call it three times in a row.

<!-- Speaker note: Hints, in order: Start with a shape you can already draw with a loop, then put `def name():` above it. -->

<!-- Speaker note: Teacher: any shape is fine. The check is a def and three calls. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0A%23+Write+a+function+that+draws+a+shape+of+your+choice%2C+then+call+it+three+times+in+a+row.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-functions/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Extend the house plan

A house plan is a few small named pieces: `wall()` and `roof()`. Run it. Then add a `door()` function and call it. Notice that you never edit `wall` or `roof` to do it.

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Extend the house plan

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0A%0Adef+wall%28%29%3A%0A++++for+i+in+range%284%29%3A%0A++++++++forward%28100%29%0A++++++++right%2890%29%0A%0A%0Adef+roof%28%29%3A%0A++++left%2860%29%0A++++forward%28100%29%0A++++right%28120%29%0A++++forward%28100%29%0A++++right%28120%29%0A++++forward%28100%29%0A++++right%28180%29%0A%0A%0Awall%28%29%0Aroof%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-functions/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A program has def square(): with a loop inside, and nothing else. What does it draw, and why?**

* Nothing. The def only describes the steps; the function has to be called with square() to run them.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson gives functions inputs (parameters), so one function can draw many sizes. Every app is built from named functions. Class ideas: each student writes one shape function and the class combines them into a picture; time how long it takes to change three copies versus one function. -->
