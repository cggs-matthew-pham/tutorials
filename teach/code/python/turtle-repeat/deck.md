---
marp: true
theme: default
html: true
---

# Repeat with a loop

Python Foundations with Turtle · Drawing and repeating

<!-- Speaker note: Students see that the square they drew with eight lines can be written with three, using a loop, and find out how to change the count and the turn. About 35 minutes (Predict and Run 10 min · Investigate 10 min · Modify 8 min · Make 7 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** predict, run and change short programs that repeat lines with a loop.

- I can use a loop to repeat lines instead of copying them.
- I can say which lines belong to a loop.
- I can work out the turn for a shape with any number of sides.

<!-- Speaker note: Before class: Open the lesson, run the first program and draw the triangle from the Modify step yourself. It takes about five minutes and you will meet the same surprise students do: the turn is 120 degrees, not 60. -->

---

## Why it matters

> Loops are how a program draws 100 tiles, sends 100 emails or reads 100 sensors without 100 lines of code.

<!-- Speaker note: Last lesson you drew a square with eight lines. There is a shorter way. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Think, pair, share

**Would you rather give a robot 100 separate instructions, or one instruction to repeat 100 times? What could go wrong with each?**

- Which is easier to change if the plan changes?
- Which is easier to get wrong without noticing?
- Is there ever a time copying the lines would be the better choice?

<!-- Speaker note: Let students defend both sides. Copying wins when each step is different, when you will only ever do it once, or when a reader needs to see every step. The loop wins when the steps are the same and the count may change. Return to this after the staircase Make: did anyone choose copying, and why? Give 30 seconds alone, 2 minutes in pairs, then take answers from both sides. There is no single right answer: ask for a reason, and let students change their minds. -->

---

## By the end of this lesson

Here is a shape drawn by 3 lines of Python. By the end of the lesson you will write programs like it.

<!-- Speaker note: Run the 36-sided shape from the stretch task on the projector (for i in range(36): forward(20) right(10)) before anything else. Ask: how many lines of code do you think that took? -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

for i in range(4):
    forward(100)
    right(90)
```

**What will the turtle draw?**

- one side, then a turn
- one long line
- a square
- nothing, because i is never used

<!-- Speaker note: What happens: A square. The two indented lines run 4 times: a side of 100, then a quarter turn, four times over. The turtle finishes where it started, facing right. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: show the loop and ask what it draws. Take two or three answers before anyone runs it; each wrong option is a different idea of what a loop repeats (only the first line, only once, nothing because i is unused). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Vote, then argue <span style="font-size:.6em;color:#64748b">(3 min)</span>

Decide with your partner: what will the turtle draw?
Hold up 1, 2, 3 or 4 fingers for the option you chose.

<!-- Speaker note: Count the votes before anyone runs it. Ask one pair from each option to say why. The wrong options are different ideas of what a loop repeats: only the first line, only once, nothing because i is unused. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Afor+i+in+range%284%29%3A%0A++++forward%28100%29%0A++++right%2890%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-repeat/?full=step-2#step-2)

<!-- Speaker note: Run the program and compare it with your prediction. Which lines ran four times? Here is what each line does. | Line | What it does | Why | |---|---|---| | `for i in range(4):` | Starts a loop that runs four times | `range(4)` counts 0, 1, 2, 3: one run each | | ` forward(100)` | Draws a side | It is indented, so it is part of the loop | | ` right(90)` | Turns a quarter turn | Also indented, so it repeats too | Without the loop, the same square is eight lines. The loop writes the pattern once, and the count is a number you can change. -->

<!-- Speaker note: Teacher: run it live on the slide, then students run it on their own screens and compare with their prediction. Ask: which lines ran four times, and how do you know? Then show the eight-line square beside the loop. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* A square. The two indented lines run 4 times: a side of 100, then a quarter turn, four times over. The turtle finishes where it started, facing right.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
# Without a loop
forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)

# With a loop
for i in range(4):
    forward(100)
    right(90)
```

<!-- Speaker note: Compare the two programs. They draw the same square. What this step is for: Repetition has a cost: without a loop the code grows with every side, and a loop does the same work with a number you can change. -->

<!-- Speaker note: Teacher: the key idea is that a loop does the same work as copied lines, but stays the same size. Ask a student to say why the loop version is easier to change. The bug task (right(90) not indented) comes after students have seen the loop work. The trace task traces the counter i (0, 1, 2, 3); say that it counts from 0, because later lessons use it. -->

<style scoped>pre, marp-pre { font-size: 0.73em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the lines

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
# Without a loop
forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)
forward(100)
right(90)

# With a loop
for i in range(4):
    forward(100)
    right(90)
```

</div>
<div>

**Your square last lesson used 8 lines of drawing code. A 20-sided shape drawn the same way would use how many lines?**

* Answer: 40

</div>
</div>

<!-- Speaker note: Each side needs 2 lines (forward and a turn), so 20 sides need 40. -->

<style scoped>section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This was meant to draw a square. Instead the turtle draws one long line and turns once at the very end. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  for i in range(4):
 4      forward(100)
 5  right(90)
```

* Answer: line 5

<!-- Speaker note: right(90) is not indented, so it is not part of the loop. The loop draws four sides in a straight line, and the turn runs once afterwards. Indent it under the for line so both lines repeat. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow the counter

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *

for i in range(4):
    forward(100)
    right(90)
```

</div>
<div>

**for i in range(4): makes a counter called i. It starts at 0 and goes up by 1 each time round the loop. Fill in the table for the square.**

| pass | i | turned so far |
|---|---|---|
| 1 | 0 | 90 |
| 2 | ? | ? |
| 3 | ? | ? |
| 4 | ? | ? |

* Answer: 1, 180, 2, 270, 3, 360

</div>
</div>

<!-- Speaker note: i counts 0, 1, 2, 3: four passes, starting from 0. This square never uses i, but it is there, and later programs will use it. After four turns of 90 the turtle has turned 360 degrees, a full turn. -->

<style scoped>section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Play turtle <span style="font-size:.6em;color:#64748b">(5 min)</span>

One volunteer is the turtle, standing in the middle facing the window.
The class reads the loop aloud, one line at a time. The turtle obeys: 3 steps for forward(100), a quarter turn for right(90).
Now try it with range(3) and right(120). Where does the turtle end up?

<!-- Speaker note: Papert designed the turtle so learners could play it. Walking the shape makes two things concrete: only the indented lines repeat, and a closed shape turns all the way round (360). If the turtle turns 60 for the triangle, ask the class to watch which way they end up facing. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the changes

<div class="side" style="display:grid;grid-template-columns:1fr 3fr;gap:1em">
<div>

**The loop version draws a 20-sided shape. How many numbers in it change?**

* Answer: 2

</div>
<div>

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Afor+i+in+range%284%29%3A%0A++++forward%28100%29%0A++++right%2890%29%0A}}

</div>
</div>

<!-- Speaker note: Only range(20) and the turn (360 / 20 = 18 degrees). The loop is the same 3 lines. Ask on mini whiteboards or by show of hands before the reveal. -->

<style scoped>section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which way now?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *

for i in range(4):
    forward(100)
    right(90)
```

</div>
<div>

**The turtle starts in the middle, facing right. After the square, which way is it facing?**

- Up
- Down
- Right
- Left

* Answer: Right

</div>
</div>

<!-- Speaker note: Four turns of 90 make 360 degrees, a full turn, so the turtle faces right again. Any shape that closes up turns 360 degrees in total. Ask on mini whiteboards or by show of hands before the reveal. -->

<style scoped>section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Change the loop so it draws a triangle instead of a square. Run after each change.

<!-- Speaker note: What this step is for: Change a working program one small step at a time and check each result; the turn angle comes from the shape, not from guessing. Hints, in order: A square turns the turtle 90 degrees four times. How many times does a triangle turn, and what do all the turns add up to? / Two numbers change: how many times the loop repeats, and how far the turtle turns each time. For students who need more support: Give the loop version and ask the student to change only one number at a time, running after each change. For early finishers: Draw a shape with 50 sides and turn 360 / 50 degrees. What does it start to look like, and why? The hard part, on purpose: Working out the turn angle for a shape. Ask how far the turtle turns in total and how many turns there are, instead of giving the number. When students get stuck: The triangle has a gap, or the shape looks like a star. Ask: How many times does the loop repeat, and how far does the turtle turn each time? Fix: A shape with 3 sides repeats 3 times and turns 120 degrees. All the turns add up to 360. / Only the first line repeats, or the program stops with an indentation error. Ask: Which lines are pushed in under the for line? Fix: The lines that repeat must be indented (four spaces) under the for line. / A student types forward(100) and right(90) many times and sees no reason to change. Ask: How long would that be for a 50-sided shape? Fix: Ask them to draw a 50-sided shape both ways. The loop stays 3 lines; the copied version needs 100. -->

<!-- Speaker note: Teacher: work the triangle live on the slide first if the room is unsure, then let students go on alone. Let them get it wrong first. If they try 60 degrees, ask them to walk the shape themselves: how far do you turn at each corner? -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Afor+i+in+range%284%29%3A%0A++++forward%28100%29%0A++++right%2890%29%0A%0A%23+Change+the+code+so+it+draws+a+triangle.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-repeat/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Optional: pairs at one computer

One person types (driver), the other reads the task and checks each run (navigator).
Swap at every new shape.

<!-- Speaker note: Pair programming keeps both students thinking and talking, and it helps students who are less confident. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

A loop works for any pattern, not only shapes. Find the part that repeats, write it once, and say how many times.

Draw a staircase with 5 steps, like the picture. When it works, change one number to make it 10 steps. Then try a pattern of your own: a zigzag, a row of battlements or a dashed line. Find the part that repeats first.

Next lesson adds variables. Then you put loops and variables to work on a whole program: a street of houses.

<!-- Speaker note: Hints, in order: Trace one step with your finger. Which moves and turns make one step? / One step is four lines: up, turn, across, turn back. Put those under a for line. -->

<!-- Speaker note: Teacher: the staircase reverses the lesson: students find the part that repeats in a picture and write it once. Early finishers can try the house (a square, then a roof turning left 60 and right 120). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0A%23+Draw+a+staircase+with+a+loop.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-repeat/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Show a friend <span style="font-size:.6em;color:#64748b">(3 min)</span>

Turn to the next pair. Show your pattern from Make and point to the part that repeats.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A turtle draws a shape with 5 equal sides using a loop. How many times does the loop repeat, and how far does the turtle turn each time?**

* 5 times, turning 72 degrees each time (360 divided by 5).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Loops come back in every lesson, and in tessellations, logo design and generative art. Next lesson stores numbers in variables, so the turn can be worked out instead of guessed. Then A street of houses reads a whole program that uses both. Class ideas: design a floor tile and repeat it; recreate a simple logo from code. -->
