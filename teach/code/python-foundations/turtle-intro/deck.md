---
marp: true
theme: default
html: true
---

# Drawing with a turtle

Python Foundations with Turtle · Commands, loops and values

<!-- Speaker note: Students meet the turtle, read a program that draws a digital 2, learn that the order of commands is the picture, and draw a 4 themselves. About 35 minutes (Meet the commands 8 min · Predict and Run 8 min · Put the lines in order 7 min · Make 12 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** give a turtle commands, in order, and watch the picture they make.

- I can say what forward, right and left do to the turtle.
- I can say why the order of the commands matters.
- I can write a program of several commands that draws a digit.

<!-- Speaker note: Before class: Draw the 4 yourself. It takes two minutes, and you will see why the last turn is right(180). Teacher: Meet the commands: you explain, at the board. Run the three lines live, one at a time. Say what forward and right do, that right does not move the turtle, and that left turns the other way. Teacher: Put the lines in order: students do the ordering on their own screens. Circulate; if a student is stuck, ask which way the turtle is facing after the first turn. -->

---

## Why it matters

> Every animation, game character and robot is moved by a list of commands that run in order. Today you give the commands.

<!-- Speaker note: A turtle walks across the screen, leaving a line behind. Your program tells it where to go. By the end you will draw digits, the way a calculator or a digital clock does. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Think, pair, share

**A robot follows its commands in the wrong order and walks into a wall. Whose fault is it: the robot's or the programmer's?**

- Did the robot do what it was told?
- What could the programmer have done to catch the mistake before running it?

<!-- Speaker note: Let students defend both sides. The robot did exactly what the program said, so the mistake is in the program. Return to this after the ordering task: did anyone's first order give a surprising picture? Give 30 seconds alone, 2 minutes in pairs, then take answers from both sides. There is no single right answer: ask for a reason, and let students change their minds. -->

---

## By the end of this lesson

Here is a digital 2 made from five lines of commands. By the end of the lesson you will write commands that draw a 4.

<!-- Speaker note: Show the finished 2 on the projector before anything else. -->

---

## Meet the commands

A program is a list of commands. The turtle follows them one at a time, from the top down.

| Line | What it does | Why |
|---|---|---|
| `from turtle import *` | Gives your program the turtle commands | Copy this to the top of every program for now. A later lesson shows how it works |
| `forward(100)` | Moves the turtle 100 steps and draws a line | The number is how far |
| `right(90)` | Turns the turtle a quarter turn clockwise, on the spot | It does not move or draw. 90 is a quarter of a full turn |
| `left(90)` | Turns the turtle a quarter turn the other way | Also on the spot, also no line |
| `forward(100)` | Moves again, now in the new direction | The turn changed which way is forward |

The turtle starts in the middle, facing right. The order matters: swap two lines and you get a different picture.

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

forward(60)
right(90)
forward(60)
right(90)
forward(60)
left(90)
forward(60)
left(90)
forward(60)
```

**What will the turtle draw?**

- The digit 2, like a calculator shows it
- A straight line, 300 steps long
- The digit 5, like a calculator shows it

<!-- Speaker note: What happens: The digit 2. Five lines of 60, with a turn between each pair: across, down, across, down, across. The turns change direction without drawing (so not one straight line), and the first turn is right, so the turtle goes down on the right side first (so 2, not 5). Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: show the digit-2 program and take a vote before anyone runs it. Ask students to walk it as the turtle. The wrong options are two slips: thinking the turns draw, and mixing up right with left. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aforward%2860%29%0Aright%2890%29%0Aforward%2860%29%0Aright%2890%29%0Aforward%2860%29%0Aleft%2890%29%0Aforward%2860%29%0Aleft%2890%29%0Aforward%2860%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-intro/?full=step-3#step-3)

<!-- Speaker note: Run the program and compare it with your prediction. Which lines did the drawing, and which only turned? -->

<!-- Speaker note: Teacher: run it on the slide, then students run it themselves. Ask: which lines drew, and which only turned? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The digit 2. Five lines of 60, with a turn between each pair: across, down, across, down, across. The turns change direction without drawing (so not one straight line), and the first turn is right, so the turtle goes down on the right side first (so 2, not 5).

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Put the lines in order

```python
forward(60)
left(90)
forward(40)
right(90)
forward(60)
```

<!-- Speaker note: Look at the picture, then put the lines in order. What this step is for: The order of the commands is the picture: the same lines in a different order make a different drawing. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Put the lines in order

**These five lines are mixed up. Put them in the order that draws the picture.**

```python
right(90)
forward(60)
forward(60)
forward(40)
left(90)
```

<!-- Speaker note: The turtle goes across 60, turns left to face up, goes 40, turns right to face across again, then goes 60 more. Any other order draws a different picture, because each turn changes which way the next forward goes. Correct order: forward(60) left(90) forward(40) right(90) forward(60) What this step is for: The order of the commands is the picture: the same lines in a different order make a different drawing. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Play turtle <span style="font-size:.6em;color:#64748b">(5 min)</span>

One volunteer is the turtle, standing in the middle facing the window.
The class reads the commands aloud, one at a time. The turtle obeys: 3 steps for each forward, a quarter turn for right(90) or left(90).

<!-- Speaker note: Papert designed the turtle so learners could play it. Walking the commands makes it concrete that a turn changes which way forward goes. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Draw a **4** like the one on a calculator: a short stroke down, a bar across, then one long stroke from top to bottom. Use bars of 50 steps. The turtle may draw over a line it has already drawn, so you do not need to lift the pen.

<!-- Speaker note: Hints, in order: Start at the top left. The first stroke goes down 50, then across 50 to the right, then up 50 to the top. / You can go back over a line you already drew. After the stroke up, turn right twice (right(180)) and go down 100 for the long stroke. For students who need more support: Give the first stroke and the first turn, and ask the student to add the rest. For early finishers: Draw a second digit beside the first, such as an 8 or a 7. Where does the turtle have to start? The hard part, on purpose: Remembering that right and left turn without drawing. Ask what the turtle did on that line, instead of telling them. When students get stuck: The turtle draws a line where the student expected a turn. Ask: Does right(90) move the turtle, or only turn it? Fix: right and left turn the turtle on the spot. Only forward draws. / The 4 comes out back to front, or the strokes point the wrong way. Ask: Read the lines aloud in order, as if you were the turtle. Where does it face after each turn? Fix: Each line happens after the one above it, and each turn changes which way forward goes. Swap a left for a right, or the other way, and see. / A NameError or "forward is not defined". Ask: What is the first line of your program? Fix: Every program starts with from turtle import *. Copy it to the top. -->

<!-- Speaker note: Teacher: the 4. Hints are in the speaker notes. If the room is unsure, model the first stroke on the board and let students write the rest. The last stroke goes over a line already drawn, which is allowed. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0A%23+Draw+a+4.+Each+bar+is+50+steps.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-intro/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A turtle runs forward(100), right(90), forward(50). How many lines does it draw, and which is longer, the first or the second?**

* Two lines (the turn does not draw). The first is longer: 100 steps against 50.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: the same commands again and again. A square is eight lines written out, and a loop makes it three. -->
