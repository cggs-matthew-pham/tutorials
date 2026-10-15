---
marp: true
theme: default
html: true
---

# A street of houses

Python Foundations with Turtle · Commands, loops and values

<!-- Speaker note: Students watch a 30-line program being built part by part, then read it closely, change it and add to it. It uses only loops, variables and calculations from lessons 1 and 2; the new skill is reading a whole program. About 45 minutes (Watch 5 min · Predict and Run 5 min · Investigate 15 min · Modify 10 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** read a whole program that uses loops and variables together, then change it and add to it.

- I can find the lines in a longer program that do one job.
- I can say what changes when I change one variable, before I run it.
- I can add a new part to a program without breaking the rest.

<!-- Speaker note: Before class: Watch the build clip, then try the bug task with houses = 6. The bug (a loop that repeats houses times instead of 4) hides while houses is 4; that is the point of the lesson: parts of a program depend on each other in ways you only see when something changes. -->

---

## Why it matters

> Real programs are longer than a few lines. Programmers spend more time reading code than writing it: they find the part that does a job, then change just that part.

<!-- Speaker note: This program uses only what you already know: loops, names, the counter and updates. It is longer, so the skill now is **reading**: finding which part does which job, and how the parts depend on each other. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Think, pair, share

**Programmers spend more time reading code than writing it. Is that a good use of their time, or a sign something is wrong?**

- Who reads your code besides you?
- What makes a program easy to read? Is that the same as short?
- Would you rather have a program that is short or one you can change easily?

<!-- Speaker note: Expect both views. Reading is how you find where to make a change safely, so readable code saves time overall; but unclear code is a sign something is wrong. Come back to this at the jigsaw: which parts of the street program made it easy or hard to read? Give 30 seconds alone, 2 minutes in pairs, then take answers from both sides. There is no single right answer: ask for a reason, and let students change their minds. -->

---

## Today's program

Today's program is 30 lines long. It uses only loops and variables, which you already know.
The skill today is reading: which part does which job?

<!-- Speaker note: Play the Watch it built clip on the projector, pausing after each caption: what will the next lines do? -->

---

## Watch it built

Watch the program being built, one part at a time. Each caption names the job of the lines that follow it. You will need those jobs in a moment.

<!-- Speaker note: Teacher: play the clip once, whole class. Pause after each caption and ask what the next lines will do before they appear. The captions are the program's parts: name the numbers, move to the start, one house (walls, roof, step along), work out the length. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

_The program is 33 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-street/?full=step-2#step-2)

**Change houses to 5. What number will the last line print?**

<!-- Speaker note: What happens: 380. Five houses of 60 make 300, and the four gaps between them make 80 more: 5 × 60 + 4 × 20 = 380. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students commit to the printed length for 5 houses before running. The common wrong answer is 400 (5 gaps instead of 4): ask them to count the gaps on the 4-house picture. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0Ahouses+%3D+4%0Awidth+%3D+60%0Agap+%3D+20%0A%0Apenup%28%29%0Abackward%28220%29%0Apendown%28%29%0A%0Afor+house+in+range%28houses%29%3A%0A++++%23+walls%0A++++for+side+in+range%284%29%3A%0A++++++++forward%28width%29%0A++++++++left%2890%29%0A++++%23+roof%0A++++left%2890%29%0A++++forward%28width%29%0A++++right%2830%29%0A++++forward%28width%29%0A++++right%28120%29%0A++++forward%28width%29%0A++++right%2830%29%0A++++forward%28width%29%0A++++left%2890%29%0A++++%23+move+along+to+the+next+house%0A++++penup%28%29%0A++++forward%28gap%29%0A++++pendown%28%29%0A%0Aprint%28houses+*+width+%2B+%28houses+-+1%29+*+gap%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-street/?full=step-3#step-3)

<!-- Speaker note: Change `houses` to 5, run it and compare with your prediction. Watch the turtle: which part of the program is it running right now? Students should be able to say: I can point to the lines that draw one house, and the line that makes the houses repeat. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 380. Five houses of 60 make 300, and the four gaps between them make 80 more: 5 × 60 + 4 × 20 = 380.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 33 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-street/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A longer program is made of parts that each do one job. Find the part, see what it depends on, and you can change it without breaking the rest. -->

<!-- Speaker note: Teacher: this is the heart of the lesson. The match and trace tasks are about parts and how they connect, not single lines. Ask: which lines would you change to make the roofs taller? (None alone: the roof is drawn with width, so it follows the walls.) -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the parts

**Match each part of the program with its job.**

| | |
|---|---|
| `for side in range(4):` | A. draws the walls |
| `left(90) then forward(width), right(30) ...` | B. moves to where the next house starts, without drawing |
| `penup(), forward(gap), pendown()` | C. repeats everything indented under it, once per house |
| `for house in range(houses):` | D. draws the roof and comes back down to the ground |

* Answer: for side in range(4): → A. draws the walls; left(90) then forward(width), right(30) ... → D. draws the roof and comes back down to the ground; penup(), forward(gap), pendown() → B. moves to where the next house starts, without drawing; for house in range(houses): → C. repeats everything indented under it, once per house

<!-- Speaker note: The outer loop repeats a whole house: walls, roof and the move along. The inner loop repeats only the walls. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow a change

**Back to 4 houses. Change width to 70 and leave the rest. What will the last line print?**

* Answer: 340

<!-- Speaker note: 4 × 70 + 3 × 20 = 340. Every part that uses width follows the change: the walls, the roof and the length. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**With houses = 4 this street looks right. Change houses to 6 and the roofs go wild. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  speed(0)
 4  houses = 4
 5  width = 60
 6  gap = 20
 7  
 8  penup()
 9  backward(220)
10  pendown()
11  
12  for house in range(houses):
13      # walls
14      for side in range(houses):
15          forward(width)
16          left(90)
17      # roof
18      left(90)
19      forward(width)
20      right(30)
21      forward(width)
22      right(120)
23      forward(width)
24      right(30)
25      forward(width)
26      left(90)
27      # move along to the next house
28      penup()
29      forward(gap)
30      pendown()
```

* Answer: line 14

<!-- Speaker note: The walls loop repeats houses times instead of 4. It only looked right because houses happened to be 4. A square always has 4 sides, whatever houses is. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Jigsaw the program <span style="font-size:.6em;color:#64748b">(8 min)</span>

Half the pairs read the walls and the roof. The other half read the move along and the last line.
You have 3 minutes. Then find a pair from the other half and explain your part, line by line.

<!-- Speaker note: This is Code.org's jigsaw from its Investigate lessons. Finish with the class naming the plan: repeat a unit, then step along. Ask where else they would use it (a fence, a row of tiles, a bar chart). -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Two plans worth naming

**Repeat a unit, then step along:** draw one thing, move to where the next one starts, loop.
**Work it out from the variables:** the last line calculates the length from houses, width and gap.
Where else could you use each one?

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow the houses

**The first house starts at x = -220. Fill in where each house starts.**

| house | starts at x |
|---|---|
| 1 | -220 |
| 2 | ? |
| 3 | ? |
| 4 | ? |

* Answer: -140, -60, 20

<!-- Speaker note: Each house moves the turtle along width + gap = 60 + 20 = 80 before the next one starts. Ask on mini whiteboards or by show of hands before the reveal. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why is this line here?

**Inside the roof, forward(width) on the line after left(90) draws over a wall that is already there. Why is it needed?**

- It takes the turtle up to the corner where the roof starts
- It makes the wall thicker
- It is a mistake and can be deleted
- It draws the roof

* Answer: It takes the turtle up to the corner where the roof starts

<!-- Speaker note: After the walls the turtle is back at the bottom-left corner. The roof starts at the top-left, so the turtle has to get there first. Ask on mini whiteboards or by show of hands before the reveal. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Change the street one step at a time. Run after each change.

- **Six houses:** Fit six houses on the screen.
- **Growing houses:** Make each house a little wider than the last.
- **Is the length still right?:** The last line works out the length from `width`. Is it still true?

<!-- Speaker note: What this step is for: Change one part at a time and run after each change; the rest of the program should keep working. Hints, in order: The screen's right edge is about x = 250. The printed number is the street's length, starting from x = -220. / Six houses need six widths and five gaps. Try a smaller width. / Which line runs once per house? A change there happens to every house. / Look back at size = size + 5 in A value that grows. Add a line at the end of the house loop. For students who need more support: Give the match task first on paper, cutting the program into its parts, before students touch the code. For early finishers: Make the fence exactly as long as the street, using the same calculation as the last line. The hard part, on purpose: Reading a program longer than one screen. Ask students to say the job of each part aloud before they look at any single line. When students get stuck: The houses are drawn on top of each other, or only one house appears. Ask: Which lines move the turtle along, and are they indented under the house loop? Fix: penup, forward(gap) and pendown must be inside the house loop, so the turtle steps along after every house. / The roofs point sideways or downwards after changing houses. Ask: How many times does the walls loop repeat? Should that depend on how many houses there are? Fix: A square always has 4 sides, so the walls loop is range(4), not range(houses). / A student's new part starts in the wrong place. Ask: Where is the turtle, and which way is it facing, when the house loop ends? Fix: It is at the ground after the last gap, facing right. Start the new part from there, or move with penup first. -->

<!-- Speaker note: Teacher: use the live slide to change one number together (houses to 6 shows the length growing), then students work on their own screens. They change one thing and run. The third task is a real question: after the houses grow, the printed length is wrong, because the formula assumes every house is the same width. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0Ahouses+%3D+4%0Awidth+%3D+60%0Agap+%3D+20%0A%0Apenup%28%29%0Abackward%28220%29%0Apendown%28%29%0A%0Afor+house+in+range%28houses%29%3A%0A++++%23+walls%0A++++for+side+in+range%284%29%3A%0A++++++++forward%28width%29%0A++++++++left%2890%29%0A++++%23+roof%0A++++left%2890%29%0A++++forward%28width%29%0A++++right%2830%29%0A++++forward%28width%29%0A++++right%28120%29%0A++++forward%28width%29%0A++++right%2830%29%0A++++forward%28width%29%0A++++left%2890%29%0A++++%23+move+along+to+the+next+house%0A++++penup%28%29%0A++++forward%28gap%29%0A++++pendown%28%29%0A%0Aprint%28houses+*+width+%2B+%28houses+-+1%29+*+gap%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-street/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Optional: pairs at one computer

Driver types, navigator checks the printed length after every change. Swap after each task.

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Add something new after the houses: a fence, a row of trees or a shop.

- **Add a part:** Give it its own loop, after the house loop.
- **Make it adjustable:** Give it its own variable, so how many or how big is set in one place.

<!-- Speaker note: Hints, in order: Decide what one part looks like (one fence post, one tree), then what repeats. / One post: turn up, go up, come back down, turn back, step along. Put those under a for line. -->

<!-- Speaker note: Teacher: students work alone here; walk round, or use the live slide to build one part with the whole class. The new part needs its own loop and variable. Early finishers can make it depend on an existing variable (a fence as long as the street). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0Ahouses+%3D+4%0Awidth+%3D+60%0Agap+%3D+20%0A%0Apenup%28%29%0Abackward%28220%29%0Apendown%28%29%0A%0Afor+house+in+range%28houses%29%3A%0A++++%23+walls%0A++++for+side+in+range%284%29%3A%0A++++++++forward%28width%29%0A++++++++left%2890%29%0A++++%23+roof%0A++++left%2890%29%0A++++forward%28width%29%0A++++right%2830%29%0A++++forward%28width%29%0A++++right%28120%29%0A++++forward%28width%29%0A++++right%2830%29%0A++++forward%28width%29%0A++++left%2890%29%0A++++%23+move+along+to+the+next+house%0A++++penup%28%29%0A++++forward%28gap%29%0A++++pendown%28%29%0A%0A%23+Add+something+new+to+the+street+here%3A+a+fence%2C+trees+or+a+shop.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-street/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Lay a tiled floor

Tilers plan floors like this: one tile, repeated. This program is a loop inside a loop, like the street. Which loop draws one tile, and which repeats the tile? Change the number of tiles, make them bigger, then add a second row.

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Lay a tiled floor

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Afor+tile+in+range%285%29%3A%0A++++for+side+in+range%284%29%3A%0A++++++++forward%2840%29%0A++++++++right%2890%29%0A++++penup%28%29%0A++++forward%2840%29%0A++++pendown%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-street/?full=step-7#step-7)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Gallery walk <span style="font-size:.6em;color:#64748b">(4 min)</span>

Leave your street on screen. Walk round and find one street that does something yours doesn't.
Back at your desk: in one sentence, what does your program do?

<!-- Speaker note: The one-sentence summary is the standard test of reading a whole program (explain in plain English). Collect a few aloud. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**The street has houses = 3, width = 50 and gap = 10. What does the last line print, and where does house 2 start if house 1 starts at x = -220?**

* 170 (3 × 50 + 2 × 10). House 2 starts at -160 (-220 + 50 + 10).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This is the shape of every later unit: a few short lessons on new ideas, then a longer program that puts them together. Next unit adds decisions (if) and lists, and its programs grow the same way. -->
