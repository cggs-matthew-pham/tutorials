---
order: 2
unit: read
title: Totals and the biggest
summary: Add up a column, divide for the average, and keep the biggest so far, one row at a time.
language: python
hook: "Average speed, top scorer, longest song: most questions about data are a total, an average or a biggest."
---
Last lesson you picked rows out of the table. Now you will work out things **about** the rows: a total, an average, and the longest song. Each one is a variable that changes as the loop goes through the rows.

## Predict

```step
stage: predict
code: totals.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["4.0", "12", "5", "12.0"]
  actual: "4.0. total goes 3, then 7, then 12, and 12 / 3 is 4.0. Dividing with / always gives a decimal number."
```

Follow `total` through the loop: what is it after each number? Then what does `/ 3` give?

## Run

```step
stage: run
code: totals.py#run
try: { playground: python, starter: "totals.py#run", files: [../sets/music.csv], height: 480 }
check: { type: reflect, text: "I can say what total and longest hold after the loop." }
```

Run it. `total` adds up every song's minutes; `longest` keeps the longest song found so far. `round(x, 1)` rounds to one decimal place.

## Investigate

```step
stage: investigate
code: totals.py#run
insight: "A total starts at 0 and adds each row; a biggest-so-far starts as the first row and is replaced only by something bigger."
tasks:
  - check:
      type: trace
      text: "The first three songs are Jolene (2.7), Bohemian Rhapsody (5.9) and Billie Jean (4.9). Fill in total and the longest minutes after each one."
      table: |
        | song | minutes | total | longest minutes |
        | Jolene | 2.7 | 2.7 | 2.7 |
        | Bohemian Rhapsody | 5.9 | [8.6] | [5.9] |
        | Billie Jean | 4.9 | [13.5] | [5.9] |
      explain: "total grows with every song. longest changes only when a song is longer than the one it holds, so Billie Jean (4.9) does not replace Bohemian Rhapsody (5.9)."
  - check:
      type: question
      q: "Why does longest start as songs[0], not 0?"
      options: ["It holds a whole song (a dictionary), so it starts as a real song: the first one", "0 would make the program slower", "songs[0] is always the longest", "Python does not allow 0 there"]
      answer: 0
      explain: "longest is a song, so the program can print its title at the end. Starting with the first song means there is always something to compare with."
  - check:
      type: bug
      code: totals.py#bug
      text: "This should add up the minutes of every song, but it prints only 3.3, the length of the last song. Click the line that is wrong."
      answer: 8
      fault: logic
      misconception: total-replaced
      explain: "total = float(...) replaces the total each time. total = total + float(...) adds each song on."
```

### Follow the loop

The total and the longest, row by row.

### Where longest starts

Why the first song.

### Spot the bug

A total that only keeps the last song.

## Modify

```step
stage: modify
insight: "An average of some rows needs its own count: add up and count only inside the if."
try: { playground: python, starter: "totals.py#run", files: [../sets/music.csv], height: 480 }
tasks:
  - hint:
      - "Start count = 0 beside total = 0."
      - "Put the adding inside if song[\"genre\"] == \"rock\": and add 1 to count there too. Then divide by count."
    check: { type: code, text: "Print the average length of the rock songs only.", rules: { contains: ["\"rock\"", "count"] } }
  - hint: "Copy the idea of longest: oldest = songs[0], then replace it when int(song[\"year\"]) is smaller than int(oldest[\"year\"])."
    check: { type: code, text: "Also find and print the oldest song.", rules: { contains: ["oldest", "\"year\""] } }
```

### Average rock song

Print the average length of the **rock** songs only. `len(songs)` counts every song, so you need a count of your own.

### The oldest song

Also print the **oldest** song and its year, in the same loop.

## Make: genre stats

```step
stage: make
insight: "Goals only: choose rows with input, then total, average and smallest, and a sensible answer when nothing matches."
try: { playground: python, starter: "totals.py#make", files: [../sets/music.csv], height: 480 }
check: { type: code, text: "Ask for a genre, then print its number of songs, their average length and its shortest song.", rules: { contains: ["input("], loops: 1 } }
```

Ask for a genre, then print how many songs it has, their average length and its **shortest** song. If nobody types a genre that is there, say so instead of crashing (dividing by a count of 0 is an error).

## Where this leads

```step
stage: info
check:
  type: question
  q: "A spreadsheet's AVERAGE() and MAX() give the same answers. Why learn the loop?"
  options: ["The loop works for any question, such as the longest pop song after 2010, not only the ones a button exists for", "Spreadsheets are often wrong", "Loops are faster than spreadsheets", "You cannot open a CSV in a spreadsheet"]
  answer: 0
  explain: "Built-in tools answer common questions. A loop with your own if answers any question, and it is how those built-in tools work inside."
```

Next: count every genre at once, and draw the counts as a bar chart.
