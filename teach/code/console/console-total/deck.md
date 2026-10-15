---
marp: true
theme: default
html: true
---

# Running total

Console bridge: text in, text out · Keep asking

<!-- Speaker note: Students keep a running total with += inside a while loop, set once before the loop. About 35 minutes (Predict and Run 9 min · Investigate 9 min · Modify 5 min · Mix it up 3 min · Make 9 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** keep a total across the passes of a loop with +=, setting it to 0 once before the loop starts.

- I can keep a running total with +=.
- I can say why the total starts at 0 before the loop.
- I can write a loop that adds up what the person types.

---

## Why it matters

> A till adds up prices, a scoreboard adds up points and a fitness app adds up steps. Each one keeps a number that grows as the loop goes round.

<!-- Speaker note: In the turtle courses a value could grow every pass, like `size = size + 5`. A console program does the same with numbers the person types: it adds each answer to a **running total**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
total = 0
while total < 10:
    total += int(input("Add: "))
    print("Total: " + str(total))
print("Done")
```

**You type 4, then 5, then 3. What does the program show?**

- Total: 4, Total: 5, Total: 3, then Done
- Total: 4, Total: 9, then Done
- Total: 12, then Done
- Total: 4, Total: 9, Total: 12, then Done

<!-- Speaker note: What happens: Total: 4, Total: 9, Total: 12, then Done. total += n adds n to what total already holds. After 9 the condition total &lt; 10 is still true, so it asks again. 12 is not less than 10, so the loop ends. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: take a vote. The wrong options are two real beliefs: that += replaces the total, and that the loop stops at 9. Ask the 'replaces' voters what += does. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=total+%3D+0%0Awhile+total+%3C+10%3A%0A++++total+%2B%3D+int%28input%28%22Add%3A+%22%29%29%0A++++print%28%22Total%3A+%22+%2B+str%28total%29%29%0Aprint%28%22Done%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-total/?full=step-2#step-2)

<!-- Speaker note: Run it and type 4, 5 and 3. Then run it again with 20. | Line | What it does | Why | |---|---|---| | `total = 0` | Starts the total at zero | Once, before the loop. Put inside the loop it would start again every pass | | `while total < 10:` | Keeps going while the total is small | The total itself decides when to stop | | `total += int(input("Add: "))` | Asks for a number and adds it on | Same as `total = total + int(...)` | | `print("Total: " + str(total))` | Shows the total so far | The total is a number, so it needs `str` | -->

<!-- Speaker note: Teacher: run with 4, 5, 3 and then with 20. Ask how many times the loop ran for 20, and why. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Total: 4, Total: 9, Total: 12, then Done. total += n adds n to what total already holds. After 9 the condition total &lt; 10 is still true, so it asks again. 12 is not less than 10, so the loop ends.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
total = 0
while total < 10:
    total += int(input("Add: "))
    print("Total: " + str(total))
print("Done")
```

<!-- Speaker note: What this step is for: A running total starts once and changes on every pass. The condition can read it. -->

<!-- Speaker note: Teacher: the bug is the counter reset. Ask students where the total is set to zero and how often that line runs. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow the total

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
total = 0
while total < 10:
    total += int(input("Add: "))
    print("Total: " + str(total))
print("Done")
```

</div>
<div>

**You type 4, 5, then 3. Fill in the total after each pass and whether the loop goes round again.**

| typed | total after | total < 10 |
|---|---|---|
| 4 | 4 | True |
| 5 | ? | ? |
| 3 | ? | ? |

* Answer: 9, True, 12, False

</div>
</div>

<!-- Speaker note: Each answer is added to what was there. 4, then 4 + 5 = 9, then 9 + 3 = 12. 12 is not less than 10, so the loop ends. -->

<style scoped>section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**The program should add up the scores, but it always prints the last score by itself. Click the line that is wrong.**

```
 1  answer = input("Add a score, or 0 to finish: ")
 2  while answer != "0":
 3      total = 0
 4      total += int(answer)
 5      answer = input("Add a score, or 0 to finish: ")
 6  print("Total: " + str(total))
```

* Answer: line 3

<!-- Speaker note: total = 0 inside the loop wipes the total at the start of every pass. Set it to 0 once, before the loop, so it can build up. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

The program adds up scores until `0` is typed. Change it so it also counts how many scores were typed and prints the count.

<!-- Speaker note: What this step is for: A second counter can run beside the total: count adds 1 every pass. Hints, in order: Start count at 0 next to total, before the loop. / Inside the loop add 1 to count, then print it after the loop. For students who need more support: Give the loop with the += line missing and ask for it. For early finishers: Print the average as well. What happens if the person types 0 straight away? The hard part, on purpose: Putting total = 0 inside the loop. Ask when each line runs, and how often. When students get stuck: The total prints only the last number. Ask: Where is the total set to 0, and how often does that line run? Fix: Move total = 0 above the loop so it runs once. / A NameError for total. Ask: Is total made before the loop uses it? Fix: total = 0 must come before the first line that reads total. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=total+%3D+0%0Aanswer+%3D+input%28%22Add+a+score%2C+or+0+to+finish%3A+%22%29%0Awhile+answer+%21%3D+%220%22%3A%0A++++total+%2B%3D+int%28answer%29%0A++++answer+%3D+input%28%22Add+a+score%2C+or+0+to+finish%3A+%22%29%0Aprint%28%22Total%3A+%22+%2B+str%28total%29%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-total/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```python
total = 0
while total < 12:
    total += 5
print(total)
```

<!-- Speaker note: This mixes the last lesson's loop with a value that grows, as in the spiral. What this step is for: A value that grows by the same amount each pass, with a loop that watches it: the same shape as the spiral. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
total = 0
while total < 12:
    total += 5
print(total)
```

</div>
<div>

**total starts at 0 and 5 is added on each pass while total &lt; 12. How many passes does the loop make?**

* Answer: 3

</div>
</div>

<!-- Speaker note: total goes 0, 5, 10, 15. 0 and 5 and 10 are all less than 12, so the loop runs three times. After 15 it stops. What this step is for: A value that grows by the same amount each pass, with a loop that watches it: the same shape as the spiral. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a points counter. It asks for a score, adds it to the total, and asks again, until the person types `0`. Then it prints the total and how many scores were added.

<!-- Speaker note: Hints, in order: Set total to 0 before the loop. Ask once before the loop and again at the end of every pass. / Inside the loop: total += int(answer), then ask again. -->

<!-- Speaker note: Teacher: students choose their own scoring theme. Early finishers print an average. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=%23+Points+counter%3A+keep+asking+for+a+score+until+0+is+typed.%0A%23+Then+print+the+total+and+how+many+scores+were+added.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-total/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Add it up together <span style="font-size:.6em;color:#64748b">(4 min)</span>

One person types scores, the other keeps a tally on paper. Does the program's total match yours?

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**total is 7. What is total after total += 3, and what was the line short for?**

* 10. total += 3 is short for total = total + 3.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: a longer program, a guessing game, built from the moves so far. Read it, then change it. -->
