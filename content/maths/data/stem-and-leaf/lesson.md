---
order: 4
unit: statistics
node: AC9M7ST02 n1
uses: [AC9M7ST01 n2]   # reading the median, mode and range from the plot
title: Stem-and-leaf plots
summary: "A stem-and-leaf plot keeps every value and shows the shape: the tens are the stems, the units are the leaves, written in order. Include every stem, even with no leaves, and add a key."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Thirty homework times in a list tell you very little. Sort them into a stem-and-leaf plot and the shape jumps out, and you can still read every value."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8182
  url: http://127.0.0.1:8182/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: data.yml#explain, caption: "Stems are the tens, leaves the units, in order: 3 | 1 5 5 8 is 31, 35, 35 and 38." }
explainClip:
  query: { code: "@data.yml#explain", fresh: 1, id: explain }
  caption: "Tens as stems, units as leaves"
  say: "Tens are the stems; units are the leaves."
  clip:
    - caption: { text: "Each row is a stem (the tens). Its leaves are the units.", say: "Each row is a stem: the tens digit. The leaves are the units." }
    - wait: 1000
    - caption: { text: "3 | 1 5 5 8 means 31, 35, 35 and 38, in order.", say: "Three, then one, five, five, eight: thirty one, thirty five, thirty five, thirty eight." }
    - wait: 1000
    - caption: { text: "Every value is still there, and the shape shows where most of them are.", say: "Every value is kept, and the shape shows where most of them are." }
    - wait: 1400
---
A **stem-and-leaf plot** is a display that keeps every value. For two-digit numbers:

- the **stem** is the tens digit, written once down the left;
- the **leaves** are the units digits, written in order along each stem's row;
- a **key** says how to read it: $3 \mid 5$ means $35$.

Turned on its side, it looks like a bar graph, so you can see the shape of the data and still read every value.

## Predict: read a row

```step
stage: predict
insight: "Committing to what a row means before building one tests whether they combine the stem and each leaf into one value."
check:
  type: predict
  q: "In a stem-and-leaf plot, a row reads $3 \\mid 1\\ 5\\ 5\\ 8$. Which values does it show?"
  options:
    - "31, 35, 35 and 38"
    - "3, 1, 5, 5 and 8"
    - "The number 31 558"
    - "3, 15 and 58"
  actual: "31, 35, 35 and 38. The stem 3 is the tens; each leaf is the units of one value."
```

How many values are in that row?

## Run: add two values

```step
stage: run
insight: "Adding values and watching them land in the right row, in order, shows the plot's rule: the tens choose the row, the units the place."
try: { playground: board, starter: "data.yml#run", height: 600 }
check: { type: board, text: "Add 44 and 29 to the data (type them in the box). Where does each go? Was your prediction right about reading a row?", when: "n = 10 and s = 375" }
```

The dot plot and the stem-and-leaf plot show the same data. Which is easier to read exact values from?

## Investigate: build and read

```step
stage: investigate
insight: "Stems in order with none missed, leaves in order, a key; then the median, mode and range read straight off. Jo's mistake leaves out a stem with no leaves, which hides a gap."
tasks:
  - picture: { ref: data.yml#pic-a, caption: "A stem-and-leaf plot of 11 values." }
    check:
      type: answer
      q: "What is the median of the data in this plot?"
      answer: "27"
      feedback:
        - ["23", "23 is the mode. Count to the 6th value of 11."]
        - ["30", "Count carefully: 14, 18, 21, 23, 23, 27 is the 6th."]
      explain: "11 values, so the median is the 6th: 14, 18, 21, 23, 23, 27."
  - check:
      type: bug
      code: "working.txt#jo"
      text: "Jo draws a stem-and-leaf plot. Click the line where her working goes wrong."
      answer: 3
      fault: logic
      misconception: stem-skip-empty
      explain: "Line 3: every stem from the smallest to the largest goes in, even with no leaves: 1, 2, 3, 4. The empty 3 row shows the gap between the 20s and the 40s."
  - picture: { ref: data.yml#pic-a, caption: "The same plot." }
    check:
      type: answer
      q: "What is the range of the data?"
      answer: "31"
      feedback:
        - ["41", "The lowest value is 14 (1 | 4), not 4."]
        - ["4", "Read whole values: highest 45, lowest 14."]
      explain: "Highest 45, lowest 14: 45 − 14 = 31."
```

### Build, then read

Here is how to build one, and read from it.

```worked
23, 31, 35, 35, 38, 42, 47, 51 :: Sort the values first (or sort the leaves at the end).
\text{stems: } 2, 3, 4, 5 :: The tens digits, from smallest to largest, none missed out.
3 \mid 1\ 5\ 5\ 8 :: Each value's units digit goes on its stem's row, in order.
\text{Key: } 3 \mid 5 = 35 :: A key says how to read the plot.
\text{median} = \tfrac{35 + 38}{2} = 36.5 :: 8 values: count in to the 4th and 5th leaves.
```

Now read the median of the plot in the picture.

### Find the mistake

Read Jo's working. Which stem is missing, and why does it matter?

### Range from the plot

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: build a plot on the board, read the mode from a different plot, count the values, use the key, then the edge case of three-digit values."
try: { playground: board, starter: "data.yml#build", height: 560 }
tasks:
  - starter: "data.yml#build"
    hint: "Type the values in the box: 8, 15, 17, 22, 26, 26, 31."
    check: { type: board, text: "Build the stem-and-leaf plot for these quiz scores: $8, 15, 17, 22, 26, 26, 31$.", when: "n = 7 and s = 145 and l = 8 and h = 31", explain: "Stems 0, 1, 2, 3: 0 | 8, 1 | 5 7, 2 | 2 6 6, 3 | 1. A one-digit value has stem 0." }
  - picture: { ref: data.yml#pic-b, caption: "Another stem-and-leaf plot." }
    check:
      type: answer
      q: "What is the mode?"
      answer: "63"
      feedback:
        - ["3", "Read the whole value: stem 6, leaf 3."]
        - ["6", "The mode is a value: the stem 6 and the repeated leaf 3 make 63."]
      explain: "The leaf 3 appears three times on the 6 stem: 63."
  - picture: { ref: data.yml#pic-b, caption: "The same plot." }
    check:
      type: answer
      q: "How many values are in this plot?"
      answer: "10"
      feedback:
        - ["3", "Count the leaves, not the stems."]
      explain: "Each leaf is one value: 2 + 5 + 3 = 10."
  - check:
      type: question
      q: "A plot of heights has the key $15 \\mid 2 = 152$ cm. What does $16 \\mid 7$ show?"
      options: ["167 cm", "16.7 cm", "1.67 cm"]
      answer: 0
      feedback: [null, "Use the key: 15 | 2 means 152.", "Use the key: 15 | 2 means 152."]
      explain: "The key tells you the place values: 16 | 7 is 167 cm."
  - check:
      type: question
      q: "Edge case: values $105, 112, 118, 121$. What are the stems?"
      options: ["10, 11 and 12", "1 only", "0, 1, 2"]
      answer: 0
      feedback: [null, "One stem of 1 would crowd every value into one row.", "The leaves are the units; the stems are everything before them."]
      explain: "For three-digit values the stem is the first two digits: 10 | 5, 11 | 2 8, 12 | 1."
```

### Build one

Each task changes one thing.

### The mode

### Count the values

### Use the key

### Three digits

## Practise: read the plot

```step
stage: practise
insight: "Reading the median, range and number of values from plots, mixed; the missing-stem slip in a question; the review keeps the mean fresh."
tasks:
  - picture: { ref: data.yml#pic-b, caption: "A stem-and-leaf plot." }
    check:
      type: answer
      q: "What is the median?"
      answer: "63"
      feedback:
        - ["68", "10 values: the median is halfway between the 5th and 6th, both 63."]
      explain: "5th and 6th values are both 63, so the median is 63."
  - picture: { ref: data.yml#pic-b, caption: "The same plot." }
    check:
      type: answer
      q: "What is the range?"
      answer: "27"
      feedback:
        - ["7", "Use whole values: 79 − 52."]
      explain: "79 − 52 = 27."
  - check:
      type: question
      q: "Values $41, 44, 62, 65$. Which stems should the plot have?"
      options: ["4, 5 and 6 (5 has no leaves)", "4 and 6", "1, 2, 4 and 5"]
      answer: 0
      feedback: [null, "Leaving out 5 hides the gap in the data.", "The stems are the tens digits."]
      explain: "Every stem from 4 to 6, so the empty 5 row shows the gap."
  - check:
      type: answer
      q: "Review: find the mean of $23, 31, 35, 35$."
      answer: "31"
      feedback:
        - ["124", "That is the total. Divide by 4."]
      explain: "124 ÷ 4 = 31."
```

### Median

### Range

### Which stems

### Review: mean

## Make: a plot with a given median

```step
stage: make
insight: "Building eight two-digit values with a median of 35 reverses reading: the 4th and 5th leaves must average 35."
try: { playground: board, starter: "data.yml#make", height: 600 }
hint: ["8 values: the median is halfway between the 4th and 5th.", "Make the 4th and 5th values 34 and 36, or 35 and 35."]
check: { type: board, text: "Make a stem-and-leaf plot of 8 two-digit values with a median of 35.", when: "n = 8 and d = 35 and l >= 10", explain: "For example 21, 28, 33, 34, 36, 40, 45, 52: the 4th and 5th are 34 and 36, halfway is 35." }
```

Then: could you do it with no value of 35 at all?
