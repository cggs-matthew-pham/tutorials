---
marp: true
theme: default
html: true
---

# Build a button

Python functions and events · Interaction

<!-- Speaker note: Students build a working button from scratch (a rectangle, a label and a check that a click landed inside), and find out what every app's buttons are really doing. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min · Panel and toolkit 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** turtle has no buttons, so build one from a rectangle and a click check.

- I can check whether a click landed inside a rectangle.
- I can make a click change a variable and redraw the screen.
- I can explain what a button does behind the scenes.

<!-- Speaker note: Before class: Turtle has no buttons, which is the point: students build one. The key idea is the **hit test**: a click at (x, y) is inside the button when x is between the left and right edges **and** y is between the bottom and top edges. Four comparisons joined with `and`. Run the counter and click inside and outside the button. Teacher: The 'iceberg' idea: the visible button is the small part. The rest is drawing it, checking the click, handling the event and updating what is shown. Teacher: Toolkit: the ui module holds draw_button and inside, the same code as students wrote. Compare the line counts. -->

---

## Why it matters

> Frameworks give you a button in one line. Underneath, it is a rectangle, a label and a check that a click landed inside. You are about to build all three.

<!-- Speaker note: A button is not magic. It is a **rectangle**, a **label**, and a check that asks: *did the click land inside the rectangle?* Click the picture once before you use it, and press **Stop** when you are done. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

_The program is 33 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-buttons/?full=step-1#step-1)

**You click the very centre of the picture, at (0, 0). What does the program print?**

- missed
- button pressed

<!-- Speaker note: What happens: button pressed. The button runs from x = -60 to 60 and from y = -25 to 25, and (0, 0) is inside it. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw the button on the board with its corners labelled, (bx, by) at the bottom left. Ask whether a click at the centre is inside. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0Ahideturtle%28%29%0Abx+%3D+-60%0Aby+%3D+-25%0Abw+%3D+120%0Abh+%3D+50%0A%0Apenup%28%29%0Agoto%28bx%2C+by%29%0Apendown%28%29%0Afor+i+in+range%282%29%3A%0A++++forward%28bw%29%0A++++left%2890%29%0A++++forward%28bh%29%0A++++left%2890%29%0Apenup%28%29%0Agoto%28bx+%2B+10%2C+by+%2B+15%29%0Awrite%28%22Press+me%22%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++if+x+%3E+bx+and+x+%3C+bx+%2B+bw+and+y+%3E+by+and+y+%3C+by+%2B+bh%3A%0A++++++++print%28%22button+pressed%22%29%0A++++else%3A%0A++++++++print%28%22missed%22%29%0A%0A%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-buttons/?full=step-2#step-2)

<!-- Speaker note: Run it, click inside the button and outside it, then press **Stop**. Students should be able to say: I can explain how the program decides whether a click is on the button. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* button pressed. The button runs from x = -60 to 60 and from y = -25 to 25, and (0, 0) is inside it.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 40 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-buttons/?full=step-3#step-3)

<!-- Speaker note: The program above counts presses. `draw_scene` redraws everything, and `clicked` checks the click. What this step is for: A hit test is four comparisons joined with and. You can work out the answer for any click, and find the bug by checking each comparison. -->

<!-- Speaker note: Teacher: students fill in the trace table by checking all four comparisons for each click. The bug (or instead of and) makes every click count. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Test some clicks

**The button runs from x = -60 to 60 and y = -25 to 25. Fill in whether each click is inside.**

| click x | click y | inside? |
|---|---|---|
| 0 | 0 | yes |
| 80 | 0 | ? |
| -30 | 20 | ? |
| 10 | 40 | ? |

* Answer: no, yes, no

<!-- Speaker note: A click is inside only when all four comparisons are true. x = 80 is past the right edge, and y = 40 is above the top. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the right edge

**A button has bx = -60 and bw = 120. What is the largest x that counts as the right edge?**

* Answer: 60

<!-- Speaker note: The right edge is bx + bw = -60 + 120 = 60. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**Every click counts as a press, even one far from the button. Click the wrong line.**

```
 1  bx = -60
 2  by = -25
 3  bw = 120
 4  bh = 50
 5  
 6  def clicked(x, y):
 7      if x > bx or x < bx + bw or y > by or y < by + bh:
 8          print("button pressed")
```

* Answer: line 7

<!-- Speaker note: With or, one true comparison is enough, and x > bx alone is true for most clicks. A click is inside only when all four are true, so they are joined with and. -->

<style scoped>pre, marp-pre { font-size: 0.73em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Move and resize it:** Make the button bigger and move it to a new place.
- **Change what a click does:** Make each click add 5 instead of 1.

<!-- Speaker note: What this step is for: Changing the numbers moves and resizes the button, and changing what clicked does changes what the button means. Hints, in order: Change bx, by, bw and bh at the top. The click check uses the same names, so it follows. / Change the line inside clicked that adds to count. / To add 5, use count = count + 5. For students who need more support: Give students a printed grid with the button drawn and five click points marked, to decide inside or outside before coding. For early finishers: Add a third button that resets the count to 0, and draw the count in red when it goes below zero. The hard part, on purpose: The hit test: four comparisons joined with and. Have them work out each comparison for one click on paper before fixing the code. When students get stuck: Clicks far from the button still count. Ask: Are the four comparisons joined with and, or with or? Fix: Use and. A click is inside only when all four comparisons are true. / Clicks inside the button are missed near the top or right. Ask: What are the right and top edges, using bx, bw, by and bh? Fix: The right edge is bx + bw and the top edge is by + bh. / The number on screen does not change, or numbers pile up on top of each other. Ask: Does the click redraw the screen, and does the redraw clear the old drawing first? Fix: Call draw_scene() after changing the count, and start draw_scene with clear(). -->

<!-- Speaker note: Teacher: because the click check uses the same variables as the drawing, moving the button moves the check too. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0Ahideturtle%28%29%0Abx+%3D+-60%0Aby+%3D+-25%0Abw+%3D+120%0Abh+%3D+50%0Acount+%3D+0%0A%0A%0Adef+draw_scene%28%29%3A%0A++++clear%28%29%0A++++penup%28%29%0A++++goto%28bx%2C+by%29%0A++++pendown%28%29%0A++++for+i+in+range%282%29%3A%0A++++++++forward%28bw%29%0A++++++++left%2890%29%0A++++++++forward%28bh%29%0A++++++++left%2890%29%0A++++penup%28%29%0A++++goto%28bx+%2B+10%2C+by+%2B+15%29%0A++++write%28%22Click+me%22%29%0A++++goto%28-20%2C+70%29%0A++++write%28count%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+24%2C+%22normal%22%29%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+count%0A++++if+x+%3E+bx+and+x+%3C+bx+%2B+bw+and+y+%3E+by+and+y+%3C+by+%2B+bh%3A%0A++++++++count+%3D+count+%2B+1%0A++++++++draw_scene%28%29%0A%0A%0Adraw_scene%28%29%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-buttons/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**The student clicks at x = 120. How many times does "pressed" appear?**

* Answer: 0

<!-- Speaker note: 120 is not between 0 and 100, so the condition is false and the print does not run. Zero times. What this step is for: A hit test is a decision: the code under if runs only when the condition is true. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Build a counter with **two buttons**: `+1` on the left and `-1` on the right, with the number shown above.

<!-- Speaker note: Hints, in order: Write one function that draws a button at a given place, and call it twice. / In clicked, use two separate if statements, one for each button. Change count by +1 or -1. -->

<!-- Speaker note: Teacher: two buttons means two separate if statements, one per button. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0Ahideturtle%28%29%0Acount+%3D+0%0A%0A%23+Make+a+counter+with+two+buttons%2C+%22%2B1%22+on+the+left+and+%22-1%22+on+the+right.%0A%23+Draw+both+buttons%2C+and+show+the+number+above+them.%0A%23+Each+click+must+check+which+button+%28if+any%29+it+landed+inside.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-buttons/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Pick a background colour

A control panel is a list of buttons. This program keeps the button names in a list, draws one button for each with a loop, and uses a loop in `clicked` to find which one was pressed. Add `"lightgreen"` to the list and see a fifth button appear. Then change the panel so the buttons sit in two rows.

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Pick a background colour

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0Ahideturtle%28%29%0Anames+%3D+%5B%22white%22%2C+%22yellow%22%2C+%22lightblue%22%2C+%22pink%22%5D%0Abw+%3D+100%0Abh+%3D+40%0Aby+%3D+-20%0A%0A%0Adef+draw_button%28bx%2C+label%29%3A%0A++++penup%28%29%0A++++goto%28bx%2C+by%29%0A++++pendown%28%29%0A++++for+i+in+range%282%29%3A%0A++++++++forward%28bw%29%0A++++++++left%2890%29%0A++++++++forward%28bh%29%0A++++++++left%2890%29%0A++++penup%28%29%0A++++goto%28bx+%2B+10%2C+by+%2B+12%29%0A++++write%28label%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++for+i+in+range%28len%28names%29%29%3A%0A++++++++bx+%3D+-220+%2B+i+*+110%0A++++++++if+x+%3E+bx+and+x+%3C+bx+%2B+bw+and+y+%3E+by+and+y+%3C+by+%2B+bh%3A%0A++++++++++++bgcolor%28names%5Bi%5D%29%0A%0A%0Afor+i+in+range%28len%28names%29%29%3A%0A++++draw_button%28-220+%2B+i+*+110%2C+names%5Bi%5D%29%0A%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-buttons/?full=step-7#step-7)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Use your toolkit

You wrote the drawing and the click check by hand. Real programs keep them in a module. `ui` holds both as functions: `draw_button` and `inside`. Use them to add a second button that takes one away. Compare how many lines this took with your hand-built version.

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Use your toolkit

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0Afrom+ui+import+draw_button%2C+inside%0A%0Aspeed%280%29%0Ahideturtle%28%29%0Acount+%3D+0%0Adraw_button%28-60%2C+-25%2C+120%2C+50%2C+%22Add+one%22%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+count%0A++++if+inside%28x%2C+y%2C+-60%2C+-25%2C+120%2C+50%29%3A%0A++++++++count+%3D+count+%2B+1%0A++++++++print%28count%29%0A%0A%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-buttons/?full=step-8#step-8)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A button has bx = 0, by = 0, bw = 100, bh = 40. Is a click at (50, 50) inside? Why?**

* No. x = 50 is between 0 and 100, but y = 50 is above the top edge (0 + 40 = 40).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next unit is the final challenge, a game that uses everything including these buttons. Gradio's Button and every phone app do this same work for you. Class ideas: a class control panel with different buttons; design a calculator keypad. -->
