---
marp: true
theme: default
html: true
---

# Drawing with a turtle

Python Foundations with Turtle · Drawing and repeating

<!-- Speaker note: Students meet the turtle, read a short program that follows its commands in order, and learn that the order is the picture. About 35 minutes (Meet the commands 8 min · Predict and Run 7 min · Put the lines in order 8 min · Make 12 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** give a turtle commands, in order, and watch the picture they make.

- I can say what forward and right do to the turtle.
- I can say why the order of the commands matters.
- I can write a program of several commands that draws a shape.

<!-- Speaker note: Before class: Run the first program and draw the square yourself. It takes two minutes. Teacher: Meet the commands: you explain, at the board. Run the three lines live, one at a time. Say what forward and right do, and that right does not move the turtle. Teacher: Put the lines in order: students do the ordering on their own screens. Circulate; if a student is stuck, ask which way the turtle is facing after the first turn. -->

---

## Why it matters

> Every animation, game character and robot is moved by a list of commands that run in order. Today you give the commands.

<!-- Speaker note: A turtle walks across the screen, leaving a line behind. Your program tells it where to go. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Think, pair, share

**A robot follows its commands in the wrong order and walks into a wall. Whose fault is it: the robot's or the programmer's?**

- Did the robot do what it was told?
- What could the programmer have done to catch the mistake before running it?

<!-- Speaker note: Let students defend both sides. The robot did exactly what the program said, so the mistake is in the program. Return to this after the ordering task: did anyone's first order give a surprising picture? Give 30 seconds alone, 2 minutes in pairs, then take answers from both sides. There is no single right answer: ask for a reason, and let students change their minds. -->

---

## By the end of this lesson

Here is a picture made from commands. By the end of the lesson you will write commands that draw a shape.

<!-- Speaker note: Run the three-line L on the projector before anything else. -->

---

## Meet the commands

A program is a list of commands. The turtle follows them one at a time, from the top down.

| Line | What it does | Why |
|---|---|---|
| `from turtle import *` | Gives your program the turtle commands | Copy this to the top of every program for now. A later lesson shows how it works |
| `forward(100)` | Moves the turtle 100 steps and draws a line | The number is how far |
| `right(90)` | Turns the turtle a quarter turn, on the spot | It does not move or draw. 90 is a quarter of a full turn |
| `forward(100)` | Moves again, now in the new direction | The turn changed which way is forward |

`left(90)` turns the other way.

The order matters. The turtle does the first line first. Swap two lines and you get a different picture.

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

forward(100)
right(90)
forward(50)
```

**What will the turtle draw?**

- 50 steps across first, then 100 steps down
- An L: 100 steps across, a turn, then 50 steps down
- A line of 100 steps, then a line of 90 steps

<!-- Speaker note: What happens: An L. forward(100) draws across, right(90) turns without drawing, and forward(50) draws down. The turn is not a line (so not 90 steps), and the lines run in the order written (so 100 comes before 50). Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: show the three-line program and take a vote before anyone runs it. The wrong options are two slips: thinking right(90) draws or moves 90 steps, and thinking the order does not matter. -->

<style scoped>pre, marp-pre { font-size: 0.8em; line-height: 1.25; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Vote, then argue <span style="font-size:.6em;color:#64748b">(3 min)</span>

Decide with your partner: what will the turtle draw?
Hold up 1, 2 or 3 fingers for the option you chose.

<!-- Speaker note: Count the votes before anyone runs it. Ask one pair from each option to say why. The wrong options are two different slips: a turn that draws, and lines in the wrong order. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Aforward%28100%29%0Aright%2890%29%0Aforward%2850%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-intro/?full=step-3#step-3)

<!-- Speaker note: Run the program and compare it with your prediction. Did the turn draw anything? -->

<!-- Speaker note: Teacher: run it on the slide, then students run it themselves. Ask: did the turn draw anything? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* An L. forward(100) draws across, right(90) turns without drawing, and forward(50) draws down. The turn is not a line (so not 90 steps), and the lines run in the order written (so 100 comes before 50).

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Put the lines in order

```python
forward(100)
right(90)
forward(60)
right(90)
forward(30)
```

<!-- Speaker note: Look at the picture, then put the lines in the order that draws it. What this step is for: The order of the commands is the picture: the same lines in a different order make a different drawing. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Put the lines in order

**These five lines are mixed up. Put them in the order that draws the picture.**

```python
right(90)
forward(30)
forward(100)
forward(60)
right(90)
```

<!-- Speaker note: The turtle draws 100 across, turns, draws 60, turns, then draws 30, so each line is shorter and the picture hooks inward. Any other order draws a different picture, because each turn changes which way the next forward goes. Correct order: forward(100) right(90) forward(60) right(90) forward(30) What this step is for: The order of the commands is the picture: the same lines in a different order make a different drawing. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Play turtle <span style="font-size:.6em;color:#64748b">(5 min)</span>

One volunteer is the turtle, standing in the middle facing the window.
The class reads the commands aloud, one at a time. The turtle obeys: 3 steps for each forward, a quarter turn for right(90).

<!-- Speaker note: Papert designed the turtle so learners could play it. Walking the commands makes it concrete that a turn changes which way forward goes. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Draw a square. Each side is 100 steps long. Write every command out, one after another. Next lesson shows a shorter way.

<!-- Speaker note: Hints, in order: A square has four equal sides. How many forward lines will you need? How many turns? / Draw one side, then turn a quarter turn (90). Do that four times, one line after another. For students who need more support: Give the first side and turn, and ask the student to add the other three. For early finishers: Make a rectangle, with two side lengths. How many different numbers do you need? The hard part, on purpose: Remembering that right turns without drawing. Ask what the turtle did on that line, instead of telling them. When students get stuck: The turtle draws a line where the student expected a turn. Ask: Does right(90) move the turtle, or only turn it? Fix: right turns the turtle on the spot. Only forward draws. / The shape comes out in the wrong order or looks mixed up. Ask: Read the lines aloud in order, as if you were the turtle. Where does it face after each turn? Fix: Each line happens after the one above it, and each turn changes which way forward goes. / A NameError or "forward is not defined". Ask: What is the first line of your program? Fix: Every program starts with from turtle import *. Copy it to the top. -->

<!-- Speaker note: Teacher: the square. Hints are in the speaker notes. If the room is unsure, model one side on the board and let students write the rest. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0A%23+Draw+a+square.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-intro/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Show a friend <span style="font-size:.6em;color:#64748b">(3 min)</span>

Turn to the next pair. Show your square and point to the line that makes the turn.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A turtle runs forward(100), right(90), forward(50). How many lines does it draw, and which is longer, the first or the second?**

* Two lines (the turn does not draw). The first is longer: 100 steps against 50.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: the same square, but the eight lines become three. Then variables, so the numbers can be worked out instead of guessed. -->
