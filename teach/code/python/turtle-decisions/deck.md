---
marp: true
theme: default
html: true
---

# Decisions

Python Foundations with Turtle · Choices and collections

<!-- Speaker note: Students make the program choose with if and else, using the remainder (%) to colour every other square, then add a third choice with elif. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min · Traffic light 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** make a program choose between two things with if and else.

- I can write an if / else that chooses between two actions.
- I can work out whether a condition is true for a given value.
- I can add another choice with elif.

<!-- Speaker note: Before class: The new symbol is `%`, the **remainder** after dividing, not "percent". 7 % 2 is 1 (7 ÷ 2 is 3, remainder 1). Even numbers have remainder 0 when divided by 2. Run the checkerboard and try `print(7 % 2)` and `print(8 % 2)` before class. Teacher: Say the if line out loud as a question: 'Is the remainder of i divided by 2 equal to 0?' Yes runs the indented lines under if; no runs the lines under else. -->

---

## Why it matters

> Traffic lights, game scores, login screens and thermostats all do the same thing: check a condition and pick what happens next.

<!-- Speaker note: So far every line of your program has run, in order, every time. Now the program will **choose**: run these lines if something is true, and those lines if it is not. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

size = 40
penup()
goto(-160, 0)
pendown()

for i in range(8):
    if i % 2 == 0:
        fillcolor("black")
    else:
        fillcolor("white")
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    forward(size)
```

**What colour is the third square (when i is 2)?**

- black
- white

<!-- Speaker note: What happens: Black. The squares alternate black, white, black, white, starting with black, because i % 2 is 0 for 0, 2, 4 and 6. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what colour the third square is. Walk through it together: the third square has i = 2, 2 % 2 is 0, so the if is true and it is black. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Asize+%3D+40%0Apenup%28%29%0Agoto%28-160%2C+0%29%0Apendown%28%29%0A%0Afor+i+in+range%288%29%3A%0A++++if+i+%25+2+%3D%3D+0%3A%0A++++++++fillcolor%28%22black%22%29%0A++++else%3A%0A++++++++fillcolor%28%22white%22%29%0A++++begin_fill%28%29%0A++++for+side+in+range%284%29%3A%0A++++++++forward%28size%29%0A++++++++right%2890%29%0A++++end_fill%28%29%0A++++forward%28size%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-decisions/?full=step-2#step-2)

<!-- Speaker note: Run it and compare it with your prediction. Students should be able to say: I can explain how the program chooses black or white for each square. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Black. The squares alternate black, white, black, white, starting with black, because i % 2 is 0 for 0, 2, 4 and 6.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *

size = 40
penup()
goto(-160, 0)
pendown()

for i in range(8):
    print(i, i % 2)
    if i % 2 == 0:
        fillcolor("black")
    else:
        fillcolor("white")
    begin_fill()
    for side in range(4):
        forward(size)
        right(90)
    end_fill()
    forward(size)
```

<!-- Speaker note: `print(i, i % 2)` shows each remainder as it is worked out. Run it and watch the output. What this step is for: A decision is a condition plus two paths. You can follow it by working out the condition for each value, and find the bug by checking the form of the condition. -->

<!-- Speaker note: Teacher: students fill in the trace table before running. The bug task is the classic mistake: = stores, == asks. The last question shows that a condition is itself a value, True or False; Catch the turtle stores one in a variable later (showing = False). -->

<style scoped>pre, marp-pre { font-size: 0.54em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the squares

**Fill in the gaps for each square: the remainder and the colour the program picks.**

| i | i % 2 | colour |
|---|---|---|
| 0 | 0 | black |
| 1 | ? | ? |
| 2 | ? | ? |
| 3 | ? | ? |

* Answer: 1, white, 0, black, 1, white

<!-- Speaker note: Even numbers leave a remainder of 0, so the condition is true and the square is black. Odd numbers leave 1, so the else path makes it white. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the black squares

**If the row had 9 squares instead of 8, how many would be black?**

* Answer: 5

<!-- Speaker note: The black squares are i = 0, 2, 4, 6 and 8, so there are five. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This program should draw a row of circles that alternate colour, but it will not even start. Click the wrong line.**

```
 1  from turtle import *
 2  
 3  for i in range(8):
 4      if i % 2 = 0:
 5          fillcolor("black")
 6      else:
 7          fillcolor("white")
 8      begin_fill()
 9      circle(20)
10      end_fill()
11      forward(50)
```

* Answer: line 4

<!-- Speaker note: A single = stores a value. To ask whether two things are equal, the condition needs two: i % 2 == 0. -->

<style scoped>pre, marp-pre { font-size: 0.53em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## True or false

**A condition is worked out to a value, like a sum is. What would print(3 % 2 == 0) show?**

- 1
- False
- True
- 0

* Answer: False

<!-- Speaker note: 3 % 2 is 1, and 1 == 0 is not true, so the condition is False. Every condition works out to True or False, and if runs its lines only when it is True. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Change the colours:** Swap black and white for two colours of your own.
- **Add a third colour:** Make every third square green. Place the new check before the others, and use `elif`.

<!-- Speaker note: What this step is for: Changing a condition changes the whole pattern, and an extra path (elif) adds a choice without rewriting the rest. Hints, in order: The colours are the words in quotes inside fillcolor( ). / Check the third-square case first, with an elif above the else. / The condition `i % 3 == 0` is true for 0, 3, 6 and 9. For students who need more support: Give students the trace table with the first two rows done and ask them to say each condition aloud before filling the colour. For early finishers: Make a pattern that repeats every 4 squares with four colours, using % 4. The hard part, on purpose: Writing a condition: == to compare, the colon, and what i % 2 means. Ask them to work out the condition for i = 0, 1, 2 before running. When students get stuck: A SyntaxError on the if line. Ask: Does the condition ask a question (==) or store a value (=)? Is there a colon at the end? Fix: Use == to compare and end the line with a colon: if i % 2 == 0: / Every square is the same colour. Ask: What does i % 2 give for i = 0, 1, 2, 3? Print it. Fix: The if must be inside the loop (indented), so it is asked again for every square. / The third colour never appears, or appears in the wrong places. Ask: Which question does Python ask first? Fix: Put the i % 3 == 0 check first. Python stops at the first true answer. -->

<!-- Speaker note: Teacher: elif is a second question, asked only if the first answer was no. The order matters, so ask students what happens if they put the elif check last. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Asize+%3D+40%0Apenup%28%29%0Agoto%28-160%2C+0%29%0Apendown%28%29%0A%0Afor+i+in+range%288%29%3A%0A++++if+i+%25+2+%3D%3D+0%3A%0A++++++++fillcolor%28%22black%22%29%0A++++else%3A%0A++++++++fillcolor%28%22white%22%29%0A++++begin_fill%28%29%0A++++for+side+in+range%284%29%3A%0A++++++++forward%28size%29%0A++++++++right%2890%29%0A++++end_fill%28%29%0A++++forward%28size%29%0A%0A%23+Change+the+two+colours%2C+then+add+a+third+colour+for+every+third+square.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-decisions/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Draw a row of **10 shapes**. Even-numbered shapes should be circles, odd-numbered shapes squares.

<!-- Speaker note: Hints, in order: Inside the loop, use `if i % 2 == 0:` to pick between two different shapes. / One path could draw a circle, the other a square. Both paths finish by moving forward. -->

<!-- Speaker note: Teacher: let students choose their two shapes. Check that both paths still move the turtle forward. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Apenup%28%29%0Agoto%28-180%2C+0%29%0Apendown%28%29%0A%0Afor+i+in+range%2810%29%3A%0A++++%23+Draw+a+shape+here.+Use+an+if+%2F+else+to+decide+which+kind+of+shape+it+is.%0A++++pass%0A++++forward%2840%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-decisions/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Set the traffic light

A traffic light is a decision: one variable says which light is on, and the program picks what to do. Change `light` to `"red"`, run it, then to `"orange"`. Then add a new state, `"flashing"`, that fills the circle yellow and prints `"Slow down"`.

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Set the traffic light

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Alight+%3D+%22green%22+++%23+try+%22red%22+or+%22orange%22%0A%0Aif+light+%3D%3D+%22red%22%3A%0A++++fillcolor%28%22red%22%29%0A++++print%28%22Stop%22%29%0Aelif+light+%3D%3D+%22orange%22%3A%0A++++fillcolor%28%22orange%22%29%0A++++print%28%22Get+ready%22%29%0Aelse%3A%0A++++fillcolor%28%22green%22%29%0A++++print%28%22Go%22%29%0A%0Abegin_fill%28%29%0Acircle%2850%29%0Aend_fill%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-decisions/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A loop colours square i black if i % 2 == 0, else white. Is square 5 black or white? Explain using the remainder.**

* White. 5 % 2 is 1, so the condition i % 2 == 0 is false and the else path runs.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson runs a decision on every item in a list. Decisions return later inside functions and in the game's hit test. Class ideas: a traffic light that runs through its states; predict the colour of tile 7 as a whole-class game. -->
