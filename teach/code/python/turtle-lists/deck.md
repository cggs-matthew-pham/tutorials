---
marp: true
theme: default
html: true
---

# Lists

Python Foundations with Turtle · Choices and collections

<!-- Speaker note: Students keep many values in one list, loop over it to draw one square per colour, and learn that the places in a list are counted from 0. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min · Bar chart 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** store many values under one name, then work through them one by one.

- I can store several values in a list and loop over them.
- I can find an item by its place, counting from 0.
- I can change a program's result by changing its list, not its loop.

<!-- Speaker note: Before class: Run the colour squares, then try the bar chart in Make. The idea to have ready: the first item in a list is in place **0**, so a list of 5 items has places 0 to 4. Asking for place 5 stops the program with an IndexError. Teacher: Read for c in colours aloud as 'for each colour c in the list colours'. Each time round, c holds the next colour. -->

---

## Why it matters

> A playlist, a shopping cart, a class roll and a leaderboard are all lists: many values kept in order under one name.

<!-- Speaker note: Variables hold one value. A **list** holds many, in order, under a single name. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]
size = 40

penup()
goto(-130, 0)
pendown()

for c in colours:
    fillcolor(c)
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    penup()
    forward(size + 10)
    pendown()
```

**How many squares will the program draw?**

<!-- Speaker note: What happens: Five squares, one for each colour in the list, drawn in order from left to right. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask how many squares will be drawn. The answer is the number of colours, because the loop takes them one at a time. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Acolours+%3D+%5B%22red%22%2C+%22orange%22%2C+%22yellow%22%2C+%22green%22%2C+%22blue%22%5D%0Asize+%3D+40%0A%0Apenup%28%29%0Agoto%28-130%2C+0%29%0Apendown%28%29%0A%0Afor+c+in+colours%3A%0A++++fillcolor%28c%29%0A++++begin_fill%28%29%0A++++for+side+in+range%284%29%3A%0A++++++++forward%28size%29%0A++++++++right%2890%29%0A++++end_fill%28%29%0A++++penup%28%29%0A++++forward%28size+%2B+10%29%0A++++pendown%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-lists/?full=step-2#step-2)

<!-- Speaker note: Run it and compare it with your prediction. Students should be able to say: I can explain how the loop uses each colour in the list in turn. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Five squares, one for each colour in the list, drawn in order from left to right.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]

print(colours[0])
print(colours[2])
print(len(colours))

pencolor(colours[2])
pensize(5)
circle(60)
```

<!-- Speaker note: `colours[2]` is the item in place 2. `len(colours)` counts the items. Run it and read the output. What this step is for: A list is numbered from 0, so you can pick one item by its place, count them, and spot a bug when the place does not exist. -->

<!-- Speaker note: Teacher: students say which item is in each place before running. Many expect red to be place 1; that surprise is the point. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the place

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *

colours = ["red", "orange", "yellow", "green", "blue"]

print(colours[0])
print(colours[2])
print(len(colours))

pencolor(colours[2])
pensize(5)
circle(60)
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

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Acolours+%3D+%5B%22red%22%2C+%22orange%22%2C+%22yellow%22%2C+%22green%22%2C+%22blue%22%5D%0A%0Aprint%28colours%5B0%5D%29%0Aprint%28colours%5B2%5D%29%0Aprint%28len%28colours%29%29%0A%0Apencolor%28colours%5B2%5D%29%0Apensize%285%29%0Acircle%2860%29%0A}}

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

<!-- Speaker note: The loop runs four times, so on the last time it asks for colours[3]. The list has only places 0, 1 and 2. -->

<style scoped>pre, marp-pre { font-size: 0.83em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Add two colours:** Put two more colours into the list and run it.
- **Change the first colour:** Replace the first colour and notice what moves.

<!-- Speaker note: What this step is for: Adding to a list changes the whole result with no change to the loop, which is why data and code are kept apart. Hints, in order: Each colour is a word in quotes, separated from the next by a comma. / Write the list on one line in square brackets, then use it in the loop. / You do not need to change the loop for a longer list. For students who need more support: Give students the list on paper with the places written under each item, and ask them to point to colours[2] before running the Investigate code. For early finishers: Draw the bar chart with each bar a different colour, using a second list of colours alongside the heights. The hard part, on purpose: Places start at 0, so the last place is one less than the length. Ask how many items there are and what the last place number is. When students get stuck: An IndexError: list index out of range. Ask: How many items are in the list, and what is the last place number? Fix: The last place is one less than the length. Loop over the list itself (for c in colours) to avoid counting. / A NameError, or the colour name is printed instead of used. Ask: Does every colour have quotes round it, with commas between them? Fix: Text in a list needs quotes: ["red", "blue"]. / The bars all start in the same place and overlap. Ask: What does the turtle do after finishing one bar? Fix: Lift the pen and move forward past the bar before drawing the next one. -->

<!-- Speaker note: Teacher: adding colours makes more squares without touching the loop. Ask why that is useful (the data changes, the instructions do not). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Acolours+%3D+%5B%22red%22%2C+%22orange%22%2C+%22yellow%22%2C+%22green%22%2C+%22blue%22%5D%0Asize+%3D+40%0A%0Apenup%28%29%0Agoto%28-130%2C+0%29%0Apendown%28%29%0A%0Afor+c+in+colours%3A%0A++++fillcolor%28c%29%0A++++begin_fill%28%29%0A++++for+side+in+range%284%29%3A%0A++++++++forward%28size%29%0A++++++++right%2890%29%0A++++end_fill%28%29%0A++++penup%28%29%0A++++forward%28size+%2B+10%29%0A++++pendown%28%29%0A%0A%23+Add+two+more+colours+to+the+list%2C+then+change+the+first+one.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-lists/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Draw a **bar chart**: one bar for each number in `heights`, the height of the bar equal to the number.

<!-- Speaker note: Hints, in order: One bar for each number in the list: a for loop over the list does that, and each time round h is the next height. / Use `for h in heights:` and draw one bar each time round. / A bar is a rectangle: forward(20), left(90), forward(h), left(90), forward(20), left(90), forward(h), left(90). Then move on before the next bar. -->

<!-- Speaker note: Teacher: the bar chart is the same loop with heights instead of colours. A bar is a rectangle whose tall side is the number. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Aheights+%3D+%5B30%2C+80%2C+50%2C+100%2C+60%5D%0A%0Apenup%28%29%0Agoto%28-100%2C+-100%29%0Apendown%28%29%0A%0A%23+Draw+one+bar+for+each+height+in+the+list.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-lists/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Colour a bar chart by pass mark

A teacher's chart colours each score green or red by comparing it with a pass mark. This program holds the scores in a list and uses an `if` inside the loop. Change the scores to five of your own, then change `pass_mark` to 70 and see which bars change colour. Then add a third colour for scores above 85.

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Colour a bar chart by pass mark

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Ascores+%3D+%5B45%2C+72%2C+90%2C+38%2C+66%5D%0Apass_mark+%3D+50%0Awidth+%3D+30%0A%0Apenup%28%29%0Agoto%28-100%2C+-100%29%0Apendown%28%29%0A%0Afor+score+in+scores%3A%0A++++if+score+%3E%3D+pass_mark%3A%0A++++++++fillcolor%28%22green%22%29%0A++++else%3A%0A++++++++fillcolor%28%22red%22%29%0A++++begin_fill%28%29%0A++++forward%28width%29%0A++++left%2890%29%0A++++forward%28score%29%0A++++left%2890%29%0A++++forward%28width%29%0A++++left%2890%29%0A++++forward%28score%29%0A++++left%2890%29%0A++++end_fill%28%29%0A++++penup%28%29%0A++++forward%28width+%2B+10%29%0A++++pendown%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-lists/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**colours = ["red", "blue", "green", "gold"]. What is colours[1], and what is the place of "gold"?**

* colours[1] is "blue" (counting starts at 0). "gold" is in place 3.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson names a group of steps (a function); later, lists hold the path in the final challenge and the buttons of a control panel. Playlists, class rolls and leaderboards are lists. Class ideas: a colour palette the class votes on; a bar chart of the class's own numbers. -->
