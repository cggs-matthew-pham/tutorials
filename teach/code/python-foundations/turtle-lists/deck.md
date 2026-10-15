---
marp: true
theme: default
html: true
---

# Lists

Python Foundations with Turtle · Choices and lists

<!-- Speaker note: Students keep many values in one list, pick one by its place, and count them with len, learning that places start at 0. About 30 minutes (Predict and Run 10 min · Investigate 10 min · Modify 6 min · Mix it up 4 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** keep many values under one name, pick one by its place, and count them with len.

- I can store several values in a list.
- I can find an item by its place, counting from 0.
- I can use len to count the items in a list.

<!-- Speaker note: Before class: Run the coloured shape. The idea to have ready: the first item in a list is in place **0**, so a list of 5 items has places 0 to 4. Asking for place 5 stops the program with an IndexError. Teacher: Mix it up: the turn is worked out from len, so it changes when the list does. -->

---

## Why it matters

> A playlist, a shopping cart, a class roll and a leaderboard are all lists: many values kept in order under one name.

<!-- Speaker note: Names hold one value. A **list** holds many, in order, under a single name. You pick one by its place. -->

---

## By the end of this lesson

Here is the finished program running. By the end of the lesson you will write one like it.

<!-- Speaker note: Run the finished example on the projector before anything else. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]

pensize(8)
for i in range(len(colours)):
    pencolor(colours[i])
    forward(50)
    right(72)
```

**What colour is the third side?**

- orange
- yellow
- red
- green

<!-- Speaker note: What happens: Yellow. The third pass has i = 2, and colours[2] is the item in place 2. Places count from 0, so place 0 is red, place 1 is orange and place 2 is yellow. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what colour the third side is. Many say orange: they count the places from 1. Do not correct it yet; run it and let the picture do the work. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Acolours+%3D+%5B%22red%22%2C+%22orange%22%2C+%22yellow%22%2C+%22green%22%2C+%22blue%22%5D%0A%0Apensize%288%29%0Afor+i+in+range%28len%28colours%29%29%3A%0A++++pencolor%28colours%5Bi%5D%29%0A++++forward%2850%29%0A++++right%2872%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-lists/?full=step-2#step-2)

<!-- Speaker note: Run it and compare it with your prediction. | Line | What it does | Why | |---|---|---| | `colours = ["red", ...]` | Keeps five colours under one name | Each one is in quotes, with commas between | | `colours[0]` | The item in place 0: `"red"` | The first place is 0, not 1 | | `len(colours)` | How many items: 5 | The loop runs once for each | | `pencolor(colours[i])` | Picks the colour for this pass | `i` is the place | -->

<!-- Speaker note: Teacher: read colours[i] aloud as 'the colour in place i'. Ask: what is i on the first pass, and so which colour? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Yellow. The third pass has i = 2, and colours[2] is the item in place 2. Places count from 0, so place 0 is red, place 1 is orange and place 2 is yellow.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]

pensize(8)
for i in range(len(colours)):
    pencolor(colours[i])
    forward(50)
    right(72)
```

<!-- Speaker note: What this step is for: A list is numbered from 0, so the last place is one less than the length, and asking for a place that does not exist stops the program. -->

<!-- Speaker note: Teacher: students say which item is in each place before running. The number question is the same idea backwards: the last place is one less than the length. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the place

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]

pensize(8)
for i in range(len(colours)):
    pencolor(colours[i])
    forward(50)
    right(72)
```

</div>
<div>

**Fill in the item at each place in the list (counting from 0).**

| place | item |
|---|---|
| 0 | red |
| 1 | ? |
| 2 | ? |
| 3 | ? |
| 4 | ? |

* Answer: orange, yellow, green, blue

</div>
</div>

<!-- Speaker note: Counting starts at 0, so the first item is colours[0] and the last of five is colours[4]. -->

<style scoped>section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Last place

<div class="side" style="display:grid;grid-template-columns:1fr 3fr;gap:1em">
<div>

**A list has 8 items. What is the place number of the last one?**

* Answer: 7

</div>
<div>

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Acolours+%3D+%5B%22red%22%2C+%22orange%22%2C+%22yellow%22%2C+%22green%22%2C+%22blue%22%5D%0A%0Apensize%288%29%0Afor+i+in+range%28len%28colours%29%29%3A%0A++++pencolor%28colours%5Bi%5D%29%0A++++forward%2850%29%0A++++right%2872%29%0A}}

</div>
</div>

<!-- Speaker note: Places run from 0 to 7, so the last of eight is colours[7]. The length is always one more than the last place. -->

<style scoped>section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This program should draw three circles, but it stops with an error. Click the line that causes it.**

```
 1  from turtle import *
 2  
 3  colours = ["red", "blue", "green"]
 4  
 5  for i in range(4):
 6      pencolor(colours[i])
 7      circle(20 + i * 10)
```

* Answer: line 6

<!-- Speaker note: The loop runs four times, so on the last time it asks for colours[3]. The list has only places 0, 1 and 2. range(len(colours)) would always match the list. -->

<style scoped>pre, marp-pre { font-size: 0.83em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Human list <span style="font-size:.6em;color:#64748b">(5 min)</span>

Five students hold colour cards in places 0 to 4. Call colours[2]; the student steps forward. Then call colours[5].

<!-- Speaker note: Make the idea physical before it goes back to the screen. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Add two colours:** Put two more colours into the list and run it. Does the loop need to change?
- **Change the first colour:** Replace the first colour (place 0) with "pink".

<!-- Speaker note: What this step is for: Changing a list changes the whole result with no change to the loop, which is why the data and the instructions are kept apart. Hints, in order: Each colour is a word in quotes, separated from the next by a comma. / Replace the first word in the list. Nothing else changes. / The first item is colours[0]. The loop still uses it first. For students who need more support: Give students the list on paper with the places written under each item, and ask them to point to colours[2] before running the program. For early finishers: Make a second list of sizes and use sizes[i] alongside colours[i], so each side has its own colour and length. The hard part, on purpose: Places start at 0, so the last place is one less than the length. Ask how many items there are and what the last place number is. When students get stuck: An IndexError: list index out of range. Ask: How many items are in the list, and what is the last place number? Fix: The last place is one less than the length. Loop with range(len(colours)) so the count always matches. / A NameError, or the colour name is printed instead of used. Ask: Does every colour have quotes round it, with commas between them? Fix: Text in a list needs quotes: ["red", "blue"]. / A student expects colours[1] to be red. Ask: What is the place of the very first item? Fix: The first place is 0. colours[0] is red, colours[1] is orange. -->

<!-- Speaker note: Teacher: adding colours changes the picture without touching the loop. Ask why that is useful (the data changes, the instructions do not). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Acolours+%3D+%5B%22red%22%2C+%22orange%22%2C+%22yellow%22%2C+%22green%22%2C+%22blue%22%5D%0A%0Apensize%288%29%0Afor+i+in+range%28len%28colours%29%29%3A%0A++++pencolor%28colours%5Bi%5D%29%0A++++forward%2850%29%0A++++right%2872%29%0A%0A%23+Add+two+more+colours+to+the+list%2C+then+change+the+first+one.%0A%23+Notice+that+you+do+not+need+to+change+the+loop.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-lists/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```python
from turtle import *

sizes = [20, 40, 60]

for i in range(len(sizes)):
    forward(sizes[i])
    right(360 / len(sizes))
```

<!-- Speaker note: This mixes three lessons: a name, the counter, and a list. Work it out on paper first. What this step is for: Names, the counter and a list work together: the list holds the values, the counter picks one, and len keeps the loop in step. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *

sizes = [20, 40, 60]

for i in range(len(sizes)):
    forward(sizes[i])
    right(360 / len(sizes))
```

</div>
<div>

**sizes = [20, 40, 60] and the turn is 360 / len(sizes). How many degrees does the turtle turn on each pass?**

* Answer: 120

</div>
</div>

<!-- Speaker note: len(sizes) is 3, and 360 / 3 is 120. The turn is worked out from the list, so a longer list gives a smaller turn. What this step is for: Names, the counter and a list work together: the list holds the values, the counter picks one, and len keeps the loop in step. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**colours = ["red", "blue", "green", "gold"]. What is colours[1], and what is the place of "gold"?**

* colours[1] is "blue" (counting starts at 0). "gold" is in place 3.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson visits every item without counting places: a for-each loop. Lists return in the game's path and the buttons of a control panel. Playlists, class rolls and leaderboards are lists. -->
