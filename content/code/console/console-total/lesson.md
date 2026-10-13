---
order: 7
unit: loops
moveId: running-total
reviews: [repeat-until, value-update]
assumes: [while, input, to-text, text-join, variable, variable-update, if, compare]
title: Running total
summary: Keep a total across the passes of a loop with +=, setting it to 0 once before the loop starts.
language: python
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
  url: http://127.0.0.1:8123/index.html
  ready: Python code
  layout: full
hook: "A till adds up prices, a scoreboard adds up points and a fitness app adds up steps. Each one keeps a number that grows as the loop goes round."
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "+= adds to the total on every pass"
  say: "Plus equals adds to the total on every pass of the loop."
  pacing: { keyDelayMs: 22 }
  clip:
    - caption:
        text: "Start the total at 0 once, before the loop."
        say: "Start the total at zero, once, before the loop."
    - type: { into: "Python code", text: "total = 0\nwhile total < 10:\n", append: true }
    - caption:
        text: "+= adds to what is already in total, on every pass."
        say: "Plus equals adds to what is already in total, on every pass."
    - type: { into: "Python code", text: "    total += int(input(\"Add: \"))\n    print(\"Total: \" + str(total))\nprint(\"Done\")\n", append: true }
    - click: "Run"
    - type: { selector: ".con-in", text: "4" }
    - press: Enter
    - type: { selector: ".con-in", text: "5" }
    - press: Enter
    - type: { selector: ".con-in", text: "3" }
    - press: Enter
    - expect: { selector: "#output", contains: "Done" }
    - wait: 800
---
In the turtle courses a value could grow every pass, like `size = size + 5`. A console program does the same with numbers the person types: it adds each answer to a **running total**.

## Predict

```step
stage: predict
code: lesson.py#total
check:
  type: predict
  q: "You type 4, then 5, then 3. What does the program show?"
  options:
    - "Total: 4, Total: 9, Total: 12, then Done"
    - "Total: 4, Total: 5, Total: 3, then Done"
    - "Total: 4, Total: 9, then Done"
    - "Total: 12, then Done"
  fault: logic
  misconception: plus-equals-replaces
  actual: "Total: 4, Total: 9, Total: 12, then Done. total += n adds n to what total already holds. After 9 the condition total < 10 is still true, so it asks again. 12 is not less than 10, so the loop ends."
```

`+=` is the short way to write `total = total + ...`. Read the program. What is shown?

## Run

```step
stage: run
code: lesson.py#total
try: { starter: "lesson.py#total", height: 420 }
```

Run it and type 4, 5 and 3. Then run it again with 20.

| Line | What it does | Why |
|---|---|---|
| `total = 0` | Starts the total at zero | Once, before the loop. Put inside the loop it would start again every pass |
| `while total < 10:` | Keeps going while the total is small | The total itself decides when to stop |
| `total += int(input("Add: "))` | Asks for a number and adds it on | Same as `total = total + int(...)` |
| `print("Total: " + str(total))` | Shows the total so far | The total is a number, so it needs `str` |

## Investigate

```step
stage: investigate
code: lesson.py#total
insight: "A running total starts once and changes on every pass. The condition can read it."
tasks:
  - check:
      type: trace
      text: "You type 4, 5, then 3. Fill in the total after each pass and whether the loop goes round again."
      table: |
        | typed | total after | total < 10 |
        | 4 | 4 | True |
        | 5 | [9] | [True] |
        | 3 | [12] | [False] |
      explain: "Each answer is added to what was there. 4, then 4 + 5 = 9, then 9 + 3 = 12. 12 is not less than 10, so the loop ends."
  - check:
      type: bug
      code: lesson.py#bug
      text: "The program should add up the scores, but it always prints the last score by itself. Click the line that is wrong."
      answer: 3
      fault: logic
      misconception: counter-in-loop
      explain: "total = 0 inside the loop wipes the total at the start of every pass. Set it to 0 once, before the loop, so it can build up."
```

### Follow the total

The total changes on every pass.

### Spot the bug

A total that never builds up.

## Modify

```step
stage: modify
insight: "A second counter can run beside the total: count adds 1 every pass."
try: { starter: "lesson.py#modify", height: 420 }
hint:
  - "Start count at 0 next to total, before the loop."
  - "Inside the loop add 1 to count, then print it after the loop."
check: { type: code, text: "Also count how many scores were typed, and print the count.", rules: { contains: ["+= 1"] } }
```

The program adds up scores until `0` is typed. Change it so it also counts how many scores were typed and prints the count.

## Mix it up

```step
stage: investigate
code: lesson.py#review
insight: "A value that grows by the same amount each pass, with a loop that watches it: the same shape as the spiral."
check:
  type: number
  q: "total starts at 0 and 5 is added on each pass while total < 12. How many passes does the loop make?"
  answer: 3
  explain: "total goes 0, 5, 10, 15. 0 and 5 and 10 are all less than 12, so the loop runs three times. After 15 it stops."
```

This mixes the last lesson's loop with a value that grows, as in the spiral.

## Make

```step
stage: make
try: { starter: "lesson.py#make", height: 420 }
hint:
  - "Set total to 0 before the loop. Ask once before the loop and again at the end of every pass."
  - "Inside the loop: total += int(answer), then ask again."
check: { type: code, text: "Keep asking for points until 0 is typed, then print the total.", rules: { loops: 1, contains: ["+=", "int("] } }
unlocks: [running-total]
```

Make a points counter. It asks for a score, adds it to the total, and asks again, until the person types `0`. Then it prints the total and how many scores were added.

```teacher
summary: Students keep a running total with += inside a while loop, set once before the loop.
time: 35
timing: "Predict and Run 9 min · Investigate 9 min · Modify 5 min · Mix it up 3 min · Make 9 min"
goals:
  - I can keep a running total with +=.
  - I can say why the total starts at 0 before the loop.
  - I can write a loop that adds up what the person types.
running:
  - "Predict: take a vote. The wrong options are two real beliefs: that += replaces the total, and that the loop stops at 9. Ask the 'replaces' voters what += does."
  - "Run: run with 4, 5, 3 and then with 20. Ask how many times the loop ran for 20, and why."
  - "Investigate: the bug is the counter reset. Ask students where the total is set to zero and how often that line runs."
  - "Make: students choose their own scoring theme. Early finishers print an average."
stuck:
  - see: The total prints only the last number.
    ask: Where is the total set to 0, and how often does that line run?
    fix: Move total = 0 above the loop so it runs once.
  - see: A NameError for total.
    ask: Is total made before the loop uses it?
    fix: total = 0 must come before the first line that reads total.
stretch: Print the average as well. What happens if the person types 0 straight away?
support: Give the loop with the += line missing and ask for it.
leads: "Next lesson: a longer program, a guessing game, built from the moves so far. Read it, then change it."
exit:
  q: "total is 7. What is total after total += 3, and what was the line short for?"
  a: "10. total += 3 is short for total = total + 3."
explain: |
  `total += n` means "add n to what total already holds" and is short for `total = total + n`. A running total is set to 0 once before the loop, then changed on every pass. If it were set to 0 inside the loop, every pass would start again from nothing.

  The loop's condition can read the total, or the loop can wait for a special answer such as 0 to finish.
solutions:
  step-4: lesson.py#sol-count
  step-6: lesson.py#sol-points
struggle: "Putting total = 0 inside the loop. Ask when each line runs, and how often."
class:
  activities:
    - at: end
      title: Add it up together
      minutes: 4
      do: |
        One person types scores, the other keeps a tally on paper. Does the program's total match yours?
```

```code lesson.py#total
total = 0
while total < 10:
    total += int(input("Add: "))
    print("Total: " + str(total))
print("Done")
```

```code lesson.py#bug
answer = input("Add a score, or 0 to finish: ")
while answer != "0":
    total = 0
    total += int(answer)
    answer = input("Add a score, or 0 to finish: ")
print("Total: " + str(total))
```

```code lesson.py#modify
total = 0
answer = input("Add a score, or 0 to finish: ")
while answer != "0":
    total += int(answer)
    answer = input("Add a score, or 0 to finish: ")
print("Total: " + str(total))
```

```code lesson.py#review
total = 0
while total < 12:
    total += 5
print(total)
```

```code lesson.py#make
# Points counter: keep asking for a score until 0 is typed.
# Then print the total and how many scores were added.

```

```code lesson.py#sol-count
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

```code lesson.py#sol-points
total = 0
count = 0
answer = input("Add a score, or 0 to finish: ")
while answer != "0":
    total += int(answer)
    count += 1
    answer = input("Add a score, or 0 to finish: ")
print("Total: " + str(total) + " from " + str(count) + " scores")
```
