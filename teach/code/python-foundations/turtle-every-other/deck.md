---
marp: true
theme: default
html: true
---

# Every other

Python Foundations with Turtle · Choices and lists

<!-- Speaker note: Students use the remainder, %, to make a decision repeat every second or third pass, and add a third choice with elif. About 30 minutes (Predict and Run 8 min · Investigate 10 min · Modify 7 min · Mix it up 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** use the remainder, %, to pick every second or third pass, and add a third choice with elif.

- I can say what i % 2 gives and when it is 0.
- I can pick every second or every third pass of a loop.
- I can add a third choice with elif and say which check wins.

<!-- Speaker note: Before class: The new symbol is `%`, the **remainder** after dividing, not "percent". 7 % 2 is 1 (7 ÷ 2 is 3, remainder 1). Run the pattern and try `i % 3` yourself. Teacher: Mix it up: the first question is about which check wins when two are true. The second joins a name, the counter and the remainder. -->

---

## Why it matters

> Zebra crossings, chessboards, stripes and blinking lights all repeat a pattern: every second one is different.

<!-- Speaker note: Last lesson the program chose by comparing the counter with a number. A pattern that repeats needs a different question: is this pass an even one? -->

---

## By the end of this lesson

Here is the finished program running. By the end of the lesson you will write one like it.

<!-- Speaker note: Run the finished example on the projector before anything else. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

pensize(6)
for i in range(8):
    if i % 2 == 0:
        pencolor("red")
    else:
        pencolor("blue")
    forward(30)
    right(45)
```

**What colour are the sides, in order?**

- Red, blue, red, blue, and so on, taking turns
- Only the first side red, the rest blue
- Four red sides, then four blue sides
- Every side red

<!-- Speaker note: What happens: Red and blue take turns. i % 2 is the remainder after dividing i by 2: 0 for 0, 2, 4 and 6, and 1 for 1, 3, 5 and 7. The condition is true on every second pass. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: show the loop and take a vote. The wrong options are each a slip about what the condition picks: a half, everything, or only the first pass. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Apensize%286%29%0Afor+i+in+range%288%29%3A%0A++++if+i+%25+2+%3D%3D+0%3A%0A++++++++pencolor%28%22red%22%29%0A++++else%3A%0A++++++++pencolor%28%22blue%22%29%0A++++forward%2830%29%0A++++right%2845%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-every-other/?full=step-2#step-2)

<!-- Speaker note: Run it and compare it with your prediction. | Line | What it does | Why | |---|---|---| | `if i % 2 == 0:` | Is the remainder 0 when i is divided by 2? | True for 0, 2, 4, 6: every second pass | | ` pencolor("red")` | Runs on those passes | The even ones | | `else:` | Means "otherwise" | The odd passes: 1, 3, 5, 7 | -->

<!-- Speaker note: Teacher: run it live, then students run it. Say the if line as a question: is the remainder of i divided by 2 equal to 0? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Red and blue take turns. i % 2 is the remainder after dividing i by 2: 0 for 0, 2, 4 and 6, and 1 for 1, 3, 5 and 7. The condition is true on every second pass.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *

pensize(6)
for i in range(8):
    if i % 2 == 0:
        pencolor("red")
    else:
        pencolor("blue")
    forward(30)
    right(45)
```

<!-- Speaker note: What this step is for: The remainder repeats: 0, 1, 0, 1 for 2 and 0, 1, 2, 0, 1, 2 for 3. That repeat is what makes a pattern. -->

<!-- Speaker note: Teacher: students fill in the remainder table before running. Say that remainders repeat, and that the repeat is what makes a pattern. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow the remainder

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *

pensize(6)
for i in range(8):
    if i % 2 == 0:
        pencolor("red")
    else:
        pencolor("blue")
    forward(30)
    right(45)
```

</div>
<div>

**Fill in the gaps: the remainder when i is divided by 3.**

| i | i % 3 |
|---|---|
| 0 | 0 |
| 1 | ? |
| 2 | ? |
| 3 | ? |
| 4 | ? |
| 5 | ? |

* Answer: 1, 2, 0, 1, 2

</div>
</div>

<!-- Speaker note: Dividing by 3 leaves a remainder of 0, 1 or 2, then it starts again. i % 3 == 0 is true for 0, 3, 6, 9: every third pass. -->

<style scoped>section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What does % give?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *

pensize(6)
for i in range(8):
    if i % 2 == 0:
        pencolor("red")
    else:
        pencolor("blue")
    forward(30)
    right(45)
```

</div>
<div>

**What does 7 % 2 work out to?**

- 0
- 1
- 3
- 3.5

* Answer: 1

</div>
</div>

<!-- Speaker note: 2 fits into 7 three times (6), and 1 is left over. So 7 % 2 is 1. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the red sides

<div class="side" style="display:grid;grid-template-columns:1fr 3fr;gap:1em">
<div>

**The loop runs for i = 0 to 9 (ten passes). How many are red with if i % 2 == 0?**

* Answer: 5

</div>
<div>

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Apensize%286%29%0Afor+i+in+range%288%29%3A%0A++++if+i+%25+2+%3D%3D+0%3A%0A++++++++pencolor%28%22red%22%29%0A++++else%3A%0A++++++++pencolor%28%22blue%22%29%0A++++forward%2830%29%0A++++right%2845%29%0A}}

</div>
</div>

<!-- Speaker note: The red passes are i = 0, 2, 4, 6 and 8, so there are five. -->

<style scoped>section { font-size: 28px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Stand on the remainder <span style="font-size:.6em;color:#64748b">(5 min)</span>

Number students 0 to 7. Ask those with i % 2 == 0 to stand, then i % 3 == 0. Which students stand for both?

<!-- Speaker note: Make the idea physical before it goes back to the screen. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Make every **third** side green and keep the red and blue taking turns on the rest. Use `elif`.

<!-- Speaker note: What this step is for: A second question (elif) is asked only when the first answer was no, so it adds a choice without rewriting the rest. Hints, in order: Put the new check first, before the others. Python stops at the first true answer. / i % 3 == 0 is true for 0, 3 and 6. Use elif for the red check. For students who need more support: Give the remainder table with the first rows done, and ask the student to say each condition aloud before filling in the colour. For early finishers: Make a pattern that repeats every 4 sides with four colours, using % 4. The hard part, on purpose: Reading i % 2 as 'half' and the order of elif. Ask them to work out the remainder for i = 0, 1, 2, 3 before running. When students get stuck: A student reads i % 2 as 'half' or 'percent'. Ask: What is left over when 7 is divided by 2? Fix: % gives the remainder. 7 % 2 is 1, 8 % 2 is 0. / The third colour never appears, or appears in the wrong places. Ask: Which question does Python ask first? Fix: Put the i % 3 == 0 check first. Python stops at the first true answer. / A SyntaxError on the elif line. Ask: Does the elif line end in a colon, and is it lined up with the if? Fix: elif i % 2 == 0: lines up with if and ends in a colon. -->

<!-- Speaker note: Teacher: elif is a second question, asked only if the first answer was no. The order matters, so ask what happens if the i % 3 check goes last. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Apensize%286%29%0Afor+i+in+range%288%29%3A%0A++++if+i+%25+2+%3D%3D+0%3A%0A++++++++pencolor%28%22red%22%29%0A++++else%3A%0A++++++++pencolor%28%22blue%22%29%0A++++forward%2830%29%0A++++right%2845%29%0A%0A%23+Make+every+third+side+green.+Use+elif.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-foundations/turtle-every-other/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```python
from turtle import *

pensize(6)
for i in range(8):
    if i % 3 == 0:
        pencolor("green")
    elif i % 2 == 0:
        pencolor("red")
    else:
        pencolor("blue")
    forward(30)
    right(45)
```

<!-- Speaker note: What this step is for: When an if and an elif could both be true, only the first one runs. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which check wins?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *

pensize(6)
for i in range(8):
    if i % 3 == 0:
        pencolor("green")
    elif i % 2 == 0:
        pencolor("red")
    else:
        pencolor("blue")
    forward(30)
    right(45)
```

</div>
<div>

**On pass i = 6, both i % 3 == 0 and i % 2 == 0 are true. Which colour is the side?**

- Green: the first true check wins
- Blue: the else covers them
- Red: the last true check wins
- Both: the side is drawn twice

* Answer: Green: the first true check wins

</div>
</div>

<!-- Speaker note: Python asks the checks in order and stops at the first true one. 6 % 3 == 0 is asked first, so the side is green and the elif is never asked. -->

<style scoped>section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Work out the length

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
from turtle import *

pensize(6)
for i in range(8):
    if i % 3 == 0:
        pencolor("green")
    elif i % 2 == 0:
        pencolor("red")
    else:
        pencolor("blue")
    forward(30)
    right(45)
```

</div>
<div>

**size = 30 and the line is forward(size + (i % 2) * 20). How long is the line on pass i = 3?**

* Answer: 50

</div>
</div>

<!-- Speaker note: 3 % 2 is 1, so the line is 30 + 1 * 20 = 50. On even passes the remainder is 0, so the line is 30. -->

<style scoped>section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Guess the rule <span style="font-size:.6em;color:#64748b">(3 min)</span>

Leave your stripe pattern on screen. The next pair guesses its rule from the picture, then reads your if line to check.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A loop colours pass i red if i % 2 == 0, else blue. What colour is pass 5, and why?**

* Blue. 5 % 2 is 1, so the condition is false and the else path runs.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson keeps many values under one name, a list, so a pattern can pick from colours you choose. The remainder returns in Catch the turtle. -->
