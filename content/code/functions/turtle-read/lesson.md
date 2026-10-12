---
order: 1
unit: reading
moveId: read-for-the-job
reviews: [loop-counter, value-update, if-else, list-position]
assumes: [repeat, variable, arithmetic, loop-index, variable-update, if, else, compare, remainder, list, list-index, length]
title: Read a program
summary: Find the part of a longer program that does one job, then change only that part.
language: python
hook: "Programmers read far more code than they write. The first skill is finding the part that does the job you want to change."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
---
This program is longer than any you have met, but it uses only things you know. The skill now is **reading**: finding which lines do which job.

## Predict

```step
stage: predict
code: garden.py#garden
check:
  type: predict
  q: "stem is 50. How tall is the third stem (when i is 2)?"
  kind: number
  actual: "70. The stem is stem + i * 10, which is 50 + 2 * 10 = 70. Each stem is 10 taller than the one before."
```

Read the code, one comment at a time. How tall is the third stem?

## Run

```step
stage: run
code: garden.py#garden
try: { starter: "garden.py#garden", height: 440 }
check: { type: reflect, text: "I can point to the lines that draw a stem, the lines that draw a flower head, and the line that makes the flowers repeat." }
```

Run it and compare it with your prediction. Which part is the turtle running right now?

## Investigate

```step
stage: investigate
code: garden.py#garden
insight: "A longer program is made of parts that each do one job. Find the part, see what it depends on, and you can change it without breaking the rest."
tasks:
  - check:
      type: match
      q: "Match each part of the program with its job."
      pairs:
        - ["if i % 2 == 0: ... else: ...", "alternates the stem between two greens"]
        - ["forward(stem + i * 10)", "makes each stem taller than the last"]
        - ["head = head + 4", "makes each flower head bigger than the last"]
        - ["colours[i]", "picks the flower's colour by its place"]
      explain: "Each line has one job. The if / else is a decision, i * 10 uses the counter, head + 4 is an update, and colours[i] is a list item picked by its place."
  - check:
      type: bug
      code: garden.py#bug
      text: "The flower heads should grow, but all four are the same size. Click the line that stops them growing."
      answer: 16
      fault: logic
      misconception: update-outside-loop
      explain: "head = 10 is inside the loop, so it is reset to 10 at the start of every pass, and the update never gets a chance to add up. Set it once before the loop."
```

### Find the parts

Match each part with its job.

### Spot the bug

The update is there, but something undoes it.

## Modify

```step
stage: modify
insight: "Change one part at a time and run after each change; the rest of the program should keep working."
try: { starter: "garden.py#modify", height: 440 }
tasks:
  - hint:
      - "Which line holds the list of colours? Add to it."
      - "Six flowers are wider than four. Move the start further left with goto."
    check: { type: code, text: "Add two more flowers that fit on the screen.", rules: { contains: ["colours = ["], uses: [goto] } }
  - hint:
      - "Which part of the program makes the stems different heights?"
      - "Where it says stem + i * 10, take away the part that uses i."
    check: { type: reflect, text: "I changed only the stem lines, and every stem is the same height." }
```

### Add flowers

Add two more colours. Everything else should keep working.

### Same height

Find the part that makes the stems different, and change only that.

You have found parts by their jobs. In Course B, you will give those parts names, so you can reuse them.
