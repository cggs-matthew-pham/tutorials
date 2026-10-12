---
marp: true
theme: default
html: true
---

# Functions that decide

Python Foundations with Turtle · Functions

<!-- Speaker note: Students write a function with an if inside that chooses its answer, call it for every size in a list to colour dots, trace its decisions, find a counter reset inside the loop, add an elif and a counting function, and colour score bars. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** put an if inside a function so it chooses its answer, then call it for every item in a list: decisions, lists and functions working together.

- I can write a function that uses if to choose its answer.
- I can call a function for every item in a list.
- I can count items in a list with a loop and an if inside a function.

<!-- Speaker note: Before class: A revisit lesson: nothing in it is new. Decisions (lesson 3), lists (lesson 4) and functions that return (lesson 7) come together: an `if` inside a function, with `return` in each branch, so the function **chooses** its answer; then a loop over a list calls it for every item. Students who found `if` or lists shaky get them again in a new place, which is the point. The planted bug is the classic counting slip: `count = 0` inside the loop resets the count every time round. The trace has one edge case on purpose: 50 is not more than 50. -->

---

## Why it matters

> Apps decide all the time: is this message spam, is this score a pass, which colour is this weather? Each is a function with an if inside.

<!-- Speaker note: You know three things that work well together: **if** chooses, **lists** hold many values, and **functions** give answers back. Put them together: ```python def size_colour(size): if size > 50: return "red" else: return "blue" ``` The function **decides** its answer. Call it inside a loop over a list, and it decides for every item. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *


def size_colour(size):
    if size > 50:
        return "red"
    else:
        return "blue"


print(size_colour(80))
print(size_colour(30))
```

**What two words are printed?**

- red, then red
- red, then blue
- blue, then red
- size_colour, then size_colour

<!-- Speaker note: What happens: red, then blue. 80 is more than 50, so the if returns red; 30 is not, so the else returns blue. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask students to read the function aloud as a sentence: if the size is over 50, give back red, otherwise blue. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0A%0A%0Adef+size_colour%28size%29%3A%0A++++if+size+%3E+50%3A%0A++++++++return+%22red%22%0A++++else%3A%0A++++++++return+%22blue%22%0A%0A%0Asizes+%3D+%5B20%2C+60%2C+35%2C+80%2C+50%5D%0A%0Apenup%28%29%0Agoto%28-160%2C+0%29%0Afor+s+in+sizes%3A%0A++++dot%28s%2C+size_colour%28s%29%29%0A++++forward%2880%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-decide/?full=step-2#step-2)

<!-- Speaker note: Run it. Each dot is as big as its size, and the function chose its colour. Change `50` to `30` and run again: which dots change? Students should be able to say: I can say why each dot got its colour. -->

<!-- Speaker note: Teacher: change 50 to 30 and ask which dots changed and why. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* red, then blue. 80 is more than 50, so the if returns red; 30 is not, so the else returns blue.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *

speed(0)


def size_colour(size):
    if size > 50:
        return "red"
    else:
        return "blue"


sizes = [20, 60, 35, 80, 50]

penup()
goto(-160, 0)
for s in sizes:
    dot(s, size_colour(s))
    forward(80)
```

<!-- Speaker note: What this step is for: The function makes the same decision for every item the loop gives it; a counter that totals the decisions must start before the loop. -->

<!-- Speaker note: Teacher: do the trace before running anything; argue about 50. -->

<style scoped>pre, marp-pre { font-size: 0.54em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the decisions

**Fill in what size_colour gives back for each size in the list.**

| s | size_colour(s) |
|---|---|
| 20 | blue |
| 60 | red |
| 35 | ? |
| 80 | ? |
| 50 | ? |

* Answer: blue, red, blue

<!-- Speaker note: 50 is not more than 50, so it goes to the else: blue. > means more than, not equal to. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why a function?

**Why put the if inside a function, and not straight in the loop?**

- It makes the dots bigger
- It runs faster
- Python only allows if inside functions
- The decision gets a name and can be used anywhere: in this loop, in another loop, in a print

* Answer: The decision gets a name and can be used anywhere: in this loop, in another loop, in a print

<!-- Speaker note: Named once, size_colour can be reused and changed in one place. Change the rule inside it, and every place that uses it follows. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**There are two sizes over 50, but this prints 1. There is no error. Click the line that is wrong.**

```
 1  def count_big(sizes):
 2      for s in sizes:
 3          count = 0
 4          if s > 50:
 5              count = count + 1
 6      return count
 7  
 8  
 9  print(count_big([20, 60, 35, 80]))
```

* Answer: line 3

<!-- Speaker note: count = 0 is inside the loop, so it goes back to 0 for every size: only the last count survives. Set it to 0 once, before the loop. -->

<style scoped>pre, marp-pre { font-size: 0.65em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Three colours:** Add an elif.
- **Count the big ones:** Count with a loop and an if.

<!-- Speaker note: What this step is for: A decision can have more than two answers; counting with a loop and an if is another function that gives an answer back. Hints, in order: elif adds another choice between if and else. / elif size > 30: return "orange", between the if and the else. / A function that counts: start at 0 before the loop, add 1 inside an if, return the count after the loop. / def count_big(sizes): then count = 0, for s in sizes:, if s > 50: count = count + 1, and return count. Then print(count_big(sizes)). For students who need more support: Give the counting function with count = 0 missing; students decide where it goes. For early finishers: Write is_even(n) that returns True or False, and use it to draw only the even-numbered dots. Return a size as well as a colour from two functions. The hard part, on purpose: The counter is where students struggle: they put count = 0 wherever it fits. Ask them to trace the loop with a table on paper (s, count) before changing a line. When students get stuck: The count is always 0 or 1. Ask: Where does count start at 0, inside the loop or before it? Fix: Set count = 0 once, before the loop. / TypeError: a colour is None. Ask: Does every branch of the function return a value? Fix: Each if, elif and else needs its own return (or print was used instead of return). / Every dot is the same colour. Ask: Is the function called with each s, or with the same number every time? Fix: Call size_colour(s) inside the loop. -->

<!-- Speaker note: Teacher: for count_big, ask "when should count start at 0: once, or every time round?" -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0A%0A%0Adef+size_colour%28size%29%3A%0A++++if+size+%3E+50%3A%0A++++++++return+%22red%22%0A++++else%3A%0A++++++++return+%22blue%22%0A%0A%0Asizes+%3D+%5B20%2C+60%2C+35%2C+80%2C+50%5D%0A%0Apenup%28%29%0Agoto%28-160%2C+0%29%0Afor+s+in+sizes%3A%0A++++dot%28s%2C+size_colour%28s%29%29%0A++++forward%2880%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-decide/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: score bars

Draw a bar for each score, as tall as the score, coloured by a function you write: **green** for 70 or more, **orange** for 50 or more, **red** below that. Most people need two goes at the bars: draw one bar first, then loop.

<!-- Speaker note: What this step is for: Goals only: a function that decides, called for every item in a list, inside a drawing loop. -->

<!-- Speaker note: Teacher: ask students to draw one bar first, then wrap it in a loop. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make: score bars

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0A%0Ascores+%3D+%5B45%2C+80%2C+62%2C+30%2C+95%5D%0A%0A%23+Write+def+score_colour%28score%29+that+returns+a+colour%3A+green+for+70+or+more%2C%0A%23+orange+for+50+or+more%2C+red+for+anything+less.%0A%23+Then+draw+a+bar+for+each+score%2C+as+tall+as+the+score%2C+in+its+colour.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-decide/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**def grade(score): if score &gt;= 50: return "pass" else: return "try again". What is grade(50)?**

* pass: 50 is greater than or equal to 50.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: modules, a place to keep useful functions such as size_colour. The same pattern (a function that decides, called for each item) appears in Catch the turtle's hit test and in the console bridge's menus. -->
