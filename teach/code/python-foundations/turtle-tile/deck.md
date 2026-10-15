---
marp: true
theme: default
html: true
---

# Challenge: a tile

Python Foundations with Turtle · Choices and lists

<!-- Speaker note: Students read a tile pattern that combines loops, names, a list and the remainder, change it, and make a tile of their own. About 40 minutes (Predict and Run 8 min · Investigate 8 min · Modify 8 min · Make 16 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** read a tile pattern, change one thing and predict the result, then make a tile of your own.

- I can read a pattern program and predict what it draws.
- I can change one part and say what will happen before I run it.
- I can make a tile using a loop in a loop, a list, a name and a decision.

<!-- Speaker note: Before class: Run the tile, then make a checkerboard yourself. The tricky part is `backward(size * 4)` at the end of a row: it must match the number of columns. -->

---

## Why it matters

> Floors, fabrics, wrapping paper and websites are made from a tile repeated. Today you make the tile.

<!-- Speaker note: This is the end of Course A. The program below uses everything you have learned: loops, names, the counter, a list and the remainder. Read it first, then make it your own. -->

---

## By the end of this lesson

Here is the finished program running. By the end of the lesson you will write one like it.

<!-- Speaker note: Run the finished example on the projector before anything else. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

colours = ["gold", "navy", "teal"]
size = 40
speed(0)

penup()
goto(-80, -60)
for row in range(3):
    for col in range(4):
        pick = (row + col) % len(colours)
        fillcolor(colours[pick])
        begin_fill()
        for side in range(4):
            forward(size)
            right(90)
        end_fill()
        forward(size)
    backward(size * 4)
    left(90)
    forward(size)
    right(90)
```

**How many squares will the program draw?**

<!-- Speaker note: What happens: 12. The outer loop makes 3 rows and the inner loop makes 4 squares in each row, so 3 × 4 = 12. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the count is rows times columns. Ask students to say which loop is which. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Acolours+%3D+%5B%22gold%22%2C+%22navy%22%2C+%22teal%22%5D%0Asize+%3D+40%0Aspeed%280%29%0A%0Apenup%28%29%0Agoto%28-80%2C+-60%29%0Afor+row+in+range%283%29%3A%0A++++for+col+in+range%284%29%3A%0A++++++++pick+%3D+%28row+%2B+col%29+%25+len%28colours%29%0A++++++++fillcolor%28colours%5Bpick%5D%29%0A++++++++begin_fill%28%29%0A++++++++for+side+in+range%284%29%3A%0A++++++++++++forward%28size%29%0A++++++++++++right%2890%29%0A++++++++end_fill%28%29%0A++++++++forward%28size%29%0A++++backward%28size+*+4%29%0A++++left%2890%29%0A++++forward%28size%29%0A++++right%2890%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-tile/?full=step-2#step-2)

<!-- Speaker note: Run it and compare it with your prediction. Which line makes the colours repeat in a pattern? | Line | What it does | Why | |---|---|---| | `for row in range(3):` | Makes 3 rows | The outer loop | | `for col in range(4):` | Makes 4 squares in each row | The inner loop runs fully for every row | | `pick = (row + col) % len(colours)` | Works out which colour to use | The remainder goes 0, 1, 2, 0, 1, 2 ... however long the list is | | `fillcolor(colours[pick])` | Uses that colour | A list item picked by its place | -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 12. The outer loop makes 3 rows and the inner loop makes 4 squares in each row, so 3 × 4 = 12.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *

colours = ["gold", "navy", "teal"]
size = 40
speed(0)

penup()
goto(-80, -60)
for row in range(3):
    for col in range(4):
        pick = (row + col) % len(colours)
        fillcolor(colours[pick])
        begin_fill()
        for side in range(4):
            forward(size)
            right(90)
        end_fill()
        forward(size)
    backward(size * 4)
    left(90)
    forward(size)
    right(90)
```

<!-- Speaker note: What this step is for: A pattern comes from a few simple parts working together. You can predict a change by following the parts it touches. -->

<!-- Speaker note: Teacher: students work out the colour of one square on paper. The remainder is what makes the pattern repeat. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow one square

**In row 0, column 1, what is pick?**

* Answer: 1

<!-- Speaker note: row + col is 0 + 1 = 1, and 1 % 3 is 1. colours[1] is navy. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Change the list

**colours has 4 colours instead of 3. What is pick in row 2, column 3?**

* Answer: 1

<!-- Speaker note: row + col is 5, and 5 % 4 is 1. A longer list changes the remainder, so the pattern repeats more slowly. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Predict, then run <span style="font-size:.6em;color:#64748b">(5 min)</span>

Each pair changes one thing, writes down what they expect, then runs it. Share the biggest surprise.

<!-- Speaker note: Make the idea physical before it goes back to the screen. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Change **one** thing at a time, predicting each result before you run it. Then try a bigger grid with a fourth colour.

<!-- Speaker note: What this step is for: Predict first, then run: the gap between them shows what you do not yet understand. Hints, in order: Add a colour to the list, make the grid 4 rows by 5 columns, and move the start further left and down. / backward(size * 5) must match the number of columns, so the next row starts at the left again. For students who need more support: Give the working tile and ask the student to change only the list of colours, then only the size. For early finishers: Make the tile grow: each square a little bigger than the one before, using an update. The hard part, on purpose: Planning the pattern before coding. Ask them to colour a small grid on paper and say the rule in words first. When students get stuck: The rows do not line up, or each row starts further right. Ask: How far does the turtle move along a row, and how far does it come back? Fix: Come back by size times the number of columns: backward(size * 5) for 5 columns. / An IndexError on the colours line. Ask: Is the place always less than len(colours)? Fix: Use the remainder with len(colours): (row + col) % len(colours). / The tile is one colour. Ask: What does the decision depend on? Does it change as row and col change? Fix: The condition must use row or col, or the remainder of them. -->

<!-- Speaker note: Teacher: insist on a prediction before each run. Ask students to say what they expect, then check. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Acolours+%3D+%5B%22gold%22%2C+%22navy%22%2C+%22teal%22%5D%0Asize+%3D+40%0Aspeed%280%29%0A%0Apenup%28%29%0Agoto%28-80%2C+-60%29%0Afor+row+in+range%283%29%3A%0A++++for+col+in+range%284%29%3A%0A++++++++pick+%3D+%28row+%2B+col%29+%25+len%28colours%29%0A++++++++fillcolor%28colours%5Bpick%5D%29%0A++++++++begin_fill%28%29%0A++++++++for+side+in+range%284%29%3A%0A++++++++++++forward%28size%29%0A++++++++++++right%2890%29%0A++++++++end_fill%28%29%0A++++++++forward%28size%29%0A++++backward%28size+*+4%29%0A++++left%2890%29%0A++++forward%28size%29%0A++++right%2890%29%0A%0A%23+Change+one+thing%3A+the+colours%2C+the+size%2C+the+rows+or+the+columns.%0A%23+Predict+what+it+will+do+before+you+run+it.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-tile/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a tile of your own. Plan it on paper first, then build it:

- a name for the size
- a list of colours
- a loop inside a loop
- a decision (`if` / `else`) that picks something

When it works, change one thing and predict what will happen before you run it.

You have finished Course A. Course B starts from a working program and builds something bigger.

<!-- Speaker note: Hints, in order: Start from the program above. Change the pattern rule: a decision instead of pick, or a different remainder. / A checkerboard: if (row + col) % 2 == 0 picks one colour, else picks another. -->

<!-- Speaker note: Teacher: let students plan on paper first. Early finishers add a second decision, or a list of sizes. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0A%23+Make+a+tile+of+your+own.+Plan+it+first%3A%0A%23+++one+name+for+the+size%0A%23+++a+list+of+colours%0A%23+++a+loop+in+a+loop%0A%23+++a+decision+that+picks+something%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-tile/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Tile gallery <span style="font-size:.6em;color:#64748b">(3 min)</span>

Walk round and look at three tiles. Guess each tile's rule from the picture before you read its code.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A grid has 5 rows and 6 columns. How many squares is that, and which line would you change to get 8 columns?**

* 30 squares. Change the number in the inner loop, range(6), and the backward(size * 6) line to match.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Course B starts from a working program and builds up to a game: functions, modules and events. Class ideas: print the tiles and arrange them in a class wall. -->
