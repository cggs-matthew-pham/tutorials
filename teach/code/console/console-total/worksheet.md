---
title: "Running total"
subtitle: "Console bridge: text in, text out · Keep asking · Lesson 7"
---

# Running total

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A till adds up prices, a scoreboard adds up points and a fitness app adds up steps. Each one keeps a number that grows as the loop goes round.


:::teacher-note

**In one sentence:** Students keep a running total with += inside a while loop, set once before the loop.

**Students should be able to say:** I can keep a running total with +=. I can say why the total starts at 0 before the loop. I can write a loop that adds up what the person types.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`+=` is the short way to write `total = total + ...`. Read the program. What is shown?

```python
total = 0
while total < 10:
    total += int(input("Add: "))
    print("Total: " + str(total))
print("Done")
```

:::keep-together

**You type 4, then 5, then 3. What does the program show?**

☐ Total: 4, Total: 5, Total: 3, then Done

☐ Total: 4, Total: 9, then Done

☐ Total: 12, then Done

☐ Total: 4, Total: 9, Total: 12, then Done

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Total: 4, Total: 9, Total: 12, then Done. total += n adds n to what total already holds. After 9 the condition total &lt; 10 is still true, so it asks again. 12 is not less than 10, so the loop ends.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
total = 0
while total < 10:
    total += int(input("Add: "))
    print("Total: " + str(total))
print("Done")
```

:::keep-together

### Follow the total

**You type 4, 5, then 3. Fill in the total after each pass and whether the loop goes round again.**

{{rows 1}}

| typed | total after | total < 10 |
|---|---|---|
| 4 | 4 | True |
| 5 |   |   |
| 3 |   |   |

:::


:::teacher-note

**Answer:** 9, True, 12, False

Each answer is added to what was there. 4, then 4 + 5 = 9, then 9 + 3 = 12. 12 is not less than 10, so the loop ends.

:::


:::keep-together

### Spot the bug

**The program should add up the scores, but it always prints the last score by itself. Click the line that is wrong.**

```
 1  answer = input("Add a score, or 0 to finish: ")
 2  while answer != "0":
 3      total = 0
 4      total += int(answer)
 5      answer = input("Add a score, or 0 to finish: ")
 6  print("Total: " + str(total))
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

total = 0 inside the loop wipes the total at the start of every pass. Set it to 0 once, before the loop, so it can build up.

:::


:::typical

## Modify

The program adds up scores until `0` is typed. Change it so it also counts how many scores were typed and prints the count.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
total = 0
count = 0
answer = input("Add a score, or 0 to finish: ")
while answer != "0":
    total += int(answer)
    count += 1
    answer = input("Add a score, or 0 to finish: ")
print("Total: " + str(total))
print("Scores: " + str(count))
```

:::

:::


## Mix it up

This mixes the last lesson's loop with a value that grows, as in the spiral.

```python
total = 0
while total < 12:
    total += 5
print(total)
```

:::keep-together

**total starts at 0 and 5 is added on each pass while total &lt; 12. How many passes does the loop make?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 3

total goes 0, 5, 10, 15. 0 and 5 and 10 are all less than 12, so the loop runs three times. After 15 it stops.

:::


## Make

Make a points counter. It asks for a score, adds it to the total, and asks again, until the person types `0`. Then it prints the total and how many scores were added.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
total = 0
count = 0
answer = input("Add a score, or 0 to finish: ")
while answer != "0":
    total += int(answer)
    count += 1
    answer = input("Add a score, or 0 to finish: ")
print("Total: " + str(total) + " from " + str(count) + " scores")
```

:::


## Exit ticket

:::keep-together

**total is 7. What is total after total += 3, and what was the line short for?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 10. total += 3 is short for total = total + 3.

:::

