---
marp: true
theme: default
html: true
---

# Events

Python functions and events · Interaction

<!-- Speaker note: Students write programs that wait for clicks, keys and timers, and run a function (a callback) each time something happens. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min · Counter 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** make a program wait, then react when something happens.

- I can make a function run when the picture is clicked or a key is pressed.
- I can explain why the program keeps running and waiting after the last line.
- I can hand a function over by its name, without brackets.

<!-- Speaker note: Before class: Until now programs ran top to bottom and stopped. An event-driven program sets up what should happen, then **waits** (`mainloop()`). A **callback** is a function you hand over by name, which the computer runs for you later, every time the event happens. Try the stamp program: click the picture, then press Stop. Keys only work after the picture has been clicked once. Teacher: Say it plainly: onscreenclick(stamp) means 'when someone clicks, run stamp'. Nothing runs until the event happens. Teacher: Counter: global score lets the function change the score made outside it. Read the Behind the code note together. -->

---

## Why it matters

> Every app you use is waiting: for a tap, a key or a timer. Code runs when an event happens, not from top to bottom.

<!-- Speaker note: Until now your program ran from the top to the bottom and stopped. Programs with a user interface do not work like that. They **wait**, and run a function when something happens. That function is called a **callback**. In these examples, click the picture once before using the keyboard, and press **Stop** when you are done. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

speed(0)
penup()


def stamp(x, y):
    goto(x, y)
    dot(30, "orange")


onscreenclick(stamp)
listen()
mainloop()
```

**What happens when you click on the picture?**

- Nothing: the program has already finished
- The turtle draws a square
- The turtle returns to the centre
- An orange dot appears where you click

<!-- Speaker note: What happens: An orange dot appears at the spot you clicked. Each click runs the stamp function with the position of the click. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the program reaches its last line, then waits. Ask what happens on a click, and why the program does not just end. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0Apenup%28%29%0A%0A%0Adef+stamp%28x%2C+y%29%3A%0A++++goto%28x%2C+y%29%0A++++dot%2830%2C+%22orange%22%29%0A%0A%0Aonscreenclick%28stamp%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-events/?full=step-2#step-2)

<!-- Speaker note: Run it, click around the picture, then press **Stop** and compare with your prediction. Students should be able to say: I can explain why the program keeps running after the last line, and what happens on each click. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* An orange dot appears at the spot you clicked. Each click runs the stamp function with the position of the click.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *

speed(0)


def go_up():
    setheading(90)
    forward(20)


def go_down():
    setheading(270)
    forward(20)


onkey(go_up, "Up")
onkey(go_down, "Down")
listen()
mainloop()
```

<!-- Speaker note: Look at how the keys work: each `onkey` pairs a function with a key. What this step is for: An event handler is a function the system calls for you. You can say which event runs which function, and bugs come from handing it over wrongly. -->

<!-- Speaker note: Teacher: the bug task is the most common mistake. stamp() with brackets runs the function now, once, instead of handing it over. -->

<style scoped>pre, marp-pre { font-size: 0.54em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the lines

**Match each line with what it does.**

| | |
|---|---|
| `onscreenclick(stamp)` | A. runs go_up each time the Up arrow is pressed |
| `onkey(go_up, "Up")` | B. keeps the program waiting for events |
| `ontimer(step, 50)` | C. runs step once, after 50 milliseconds |
| `mainloop()` | D. runs stamp each time the picture is clicked |

* Answer: onscreenclick(stamp) → D. runs stamp each time the picture is clicked; onkey(go_up, "Up") → A. runs go_up each time the Up arrow is pressed; ontimer(step, 50) → C. runs step once, after 50 milliseconds; mainloop() → B. keeps the program waiting for events

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the presses

**The program above is running. You press the Up arrow 5 times. How many times does go_up run?**

* Answer: 5

<!-- Speaker note: The handler runs once for every press: it is called for you each time the event happens. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This program should stamp a dot where you click, but it stops with an error. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  def stamp(x, y):
 4      goto(x, y)
 5      dot(30)
 6  
 7  onscreenclick(stamp())
 8  mainloop()
```

* Answer: line 7

<!-- Speaker note: stamp() with brackets runs the function straight away, before any click. Handing it over needs the name only: onscreenclick(stamp). -->

<style scoped>pre, marp-pre { font-size: 0.73em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Restyle the stamp:** Change the size and colour of the dot.
- **Stamp a square:** Make each click stamp a square.

<!-- Speaker note: What this step is for: Because the handler is a normal function, you can change what an event does by changing the function, without touching the event line. Hints, in order: The dot size is the first number in dot( ), and the colour is the word in quotes. / A square is four sides: a loop that moves forward and turns right 90. / Put the loop inside stamp, after the goto. For students who need more support: Give students the three key functions already written and ask them only to connect each one with an onkey line. For early finishers: Add a timer that moves the turtle forward every half second, so it drives by itself while the keys steer it. The hard part, on purpose: Handing a function over (no brackets) instead of calling it. When the error appears, ask whether the line runs the function now or hands it over for later. When students get stuck: An error on the onscreenclick line: stamp() missing 2 required positional arguments. Ask: Does the line hand over the function's name, or call it? Fix: Remove the brackets, onscreenclick(stamp). The computer adds the click position when it calls it. / Nothing happens when keys are pressed. Ask: Have you clicked the picture since pressing Run? Is listen() there? Fix: Click the picture first, and make sure listen() and mainloop() are the last lines. / An UnboundLocalError (or 'referenced before assignment') when the score changes. Ask: Which variables does this function change that were made outside it? Fix: Add global score as the first line inside the function. -->

<!-- Speaker note: Teacher: change what the function does, not the event line. That separation is the point. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0Apenup%28%29%0A%0A%0Adef+stamp%28x%2C+y%29%3A%0A++++goto%28x%2C+y%29%0A++++dot%2830%2C+%22orange%22%29%0A%0A%0Aonscreenclick%28stamp%29%0Alisten%28%29%0Amainloop%28%29%0A%0A%23+Change+the+size+and+colour+of+the+dot.+Then+make+each+click+stamp+a+square+instead.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-events/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**The student clicks the screen 5 times. What is score afterwards?**

* Answer: 5

<!-- Speaker note: Each click calls add_point once, and each call adds 1. Because of global score, the change is kept between clicks, so score is 5. What this step is for: A function can change a name each time it is called, like an update in a loop. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Steer the turtle with the keys: **Up** moves forward 20, **Left** turns left 30 degrees, **Right** turns right 30 degrees.

<!-- Speaker note: Hints, in order: Write three small functions, one for each key, then connect each with onkey. / Left turns left 30 degrees: `left(30)`. Right turns right 30. -->

<!-- Speaker note: Teacher: three small functions, three onkey lines, then listen() and mainloop(). Remind students to click the picture before pressing keys. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0A%0A%23+Make+the+arrow+keys+steer+the+turtle%3A%0A%23+++Up+moves+forward+20%2C+Left+turns+left+30%2C+Right+turns+right+30.%0A%23+Remember%3A+onkey%28+%29+wants+the+function%27s+name+with+no+brackets%2C+and+listen%28+%29+and+mainloop%28+%29+go+last.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-events/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Count the clicks

Games and apps keep a **score** that changes when events happen. This program keeps `score` in a variable and shows it each time you click.

The `write(score, False, "left", ("Arial", 40, "normal"))` line is a recipe: copy it whenever you want to show a value on the screen. The first part is what to write, and the last bracket sets the font and size.

**Behind the code:** `score` is made outside the function. The line `global score` lets `add_point` change that same `score`. Without it, Python treats `score` inside the function as a new, empty name and stops with an error. Any handler that changes a variable from outside needs `global`.

Make it count by 5 instead of 1, then make a key (`r`) that resets it to zero. Then add a timer: use `ontimer` to add a point every second.

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Count the clicks

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Ahideturtle%28%29%0Ascore+%3D+0%0Apenup%28%29%0Agoto%28-20%2C+0%29%0A%0A%0Adef+add_point%28x%2C+y%29%3A%0A++++global+score%0A++++score+%3D+score+%2B+1%0A++++clear%28%29%0A++++write%28score%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+40%2C+%22normal%22%29%29%0A%0A%0Aonscreenclick%28add_point%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-events/?full=step-7#step-7)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What is the difference between onscreenclick(stamp) and onscreenclick(stamp())?**

* onscreenclick(stamp) hands the function over to run on each click. stamp() with brackets runs it straight away, once, which is wrong here.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson builds a button from scratch: a drawn rectangle plus a click check. Every app waits for events: taps, keys and timers. Class ideas: a stamp painting the class designs together; steering a turtle through a maze drawn on paper; a timer-based animation. -->
