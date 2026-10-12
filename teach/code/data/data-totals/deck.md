---
marp: true
theme: default
html: true
---

# Totals and the biggest

Data detective · Reading data

<!-- Speaker note: Students total a column, divide for an average and track the longest song with a biggest-so-far variable, then restrict the average to one genre, find the oldest song and write genre stats that cope with no matches. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** add up a column, divide for the average, and keep the biggest so far, one row at a time.

- I can add up a column with a total that starts at 0.
- I can work out an average from a total and a count.
- I can keep the biggest (or smallest) so far as the loop goes.

<!-- Speaker note: Before class: Read the unit primer first. Two patterns carry the lesson. The **accumulator**: `total = 0` before the loop, `total = total + x` inside it (the bug task replaces instead of adding). The **biggest so far**: start with the first row, and replace it only when a row beats it. `float()` turns "3.9" into a number (minutes have decimals; years use `int()`). An average of some rows needs its own count, since `len(songs)` counts every song; with no matching rows the count is 0 and dividing by it is an error, which the Make asks students to handle. `round(x, 1)` is used once for tidy output. -->

---

## Why it matters

> Average speed, top scorer, longest song: most questions about data are a total, an average or a biggest.

<!-- Speaker note: Last lesson you picked rows out of the table. Now you will work out things **about** the rows: a total, an average, and the longest song. Each one is a variable that changes as the loop goes through the rows. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
total = 0
for n in [3, 4, 5]:
    total = total + n
print(total / 3)
```

**What does it print?**

- 4.0
- 5
- 12
- 12.0

<!-- Speaker note: What happens: 4.0. total goes 3, then 7, then 12, and 12 / 3 is 4.0. Dividing with / always gives a decimal number. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: write total on the board and update it aloud for each number. -->

<style scoped>pre, marp-pre { font-size: 0.61em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 4.0. total goes 3, then 7, then 12, and 12 / 3 is 4.0. Dividing with / always gives a decimal number.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/data/data-totals/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/data/data-totals/?full=step-2#step-2)

<!-- Speaker note: Run it. `total` adds up every song's minutes; `longest` keeps the longest song found so far. `round(x, 1)` rounds to one decimal place. Students should be able to say: I can say what total and longest hold after the loop. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

total = 0
longest = songs[0]
for song in songs:
    minutes = float(song["minutes"])
    total = total + minutes
    if minutes > float(longest["minutes"]):
        longest = song

print("Average length: " + str(round(total / len(songs), 1)) + " minutes")
print("Longest: " + longest["title"] + " (" + longest["minutes"] + " minutes)")
```

<!-- Speaker note: What this step is for: A total starts at 0 and adds each row; a biggest-so-far starts as the first row and is replaced only by something bigger. -->

<!-- Speaker note: Teacher: do the trace together, then ask why Billie Jean does not replace Bohemian Rhapsody. -->

<style scoped>pre, marp-pre { font-size: 0.68em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow the loop

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

total = 0
longest = songs[0]
for song in songs:
    minutes = float(song["minutes"])
    total = total + minutes
    if minutes > float(longest["minutes"]):
        longest = song

print("Average length: " + str(round(total / len(songs), 1)) + " minutes")
print("Longest: " + longest["title"] + " (" + longest["minutes"] + " minutes)")
```

</div>
<div>

**The first three songs are Jolene (2.7), Bohemian Rhapsody (5.9) and Billie Jean (4.9). Fill in total and the longest minutes after each one.**

| song | minutes | total | longest minutes |
|---|---|---|---|
| Jolene | 2.7 | 2.7 | 2.7 |
| Bohemian Rhapsody | 5.9 | ? | ? |
| Billie Jean | 4.9 | ? | ? |

* Answer: 8.6, 5.9, 13.5, 5.9

</div>
</div>

<!-- Speaker note: total grows with every song. longest changes only when a song is longer than the one it holds, so Billie Jean (4.9) does not replace Bohemian Rhapsody (5.9). -->

<style scoped>section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where longest starts

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

total = 0
longest = songs[0]
for song in songs:
    minutes = float(song["minutes"])
    total = total + minutes
    if minutes > float(longest["minutes"]):
        longest = song

print("Average length: " + str(round(total / len(songs), 1)) + " minutes")
print("Longest: " + longest["title"] + " (" + longest["minutes"] + " minutes)")
```

</div>
<div>

**Why does longest start as songs[0], not 0?**

- Python does not allow 0 there
- It holds a whole song (a dictionary), so it starts as a real song: the first one
- songs[0] is always the longest
- 0 would make the program slower

* Answer: It holds a whole song (a dictionary), so it starts as a real song: the first one

</div>
</div>

<!-- Speaker note: longest is a song, so the program can print its title at the end. Starting with the first song means there is always something to compare with. -->

<style scoped>section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should add up the minutes of every song, but it prints only 3.3, the length of the last song. Click the line that is wrong.**

```
 1  import csv
 2  
 3  with open("music.csv") as f:
 4      songs = list(csv.DictReader(f))
 5  
 6  total = 0
 7  for song in songs:
 8      total = float(song["minutes"])
 9  print("Total: " + str(total) + " minutes")
```

* Answer: line 8

<!-- Speaker note: total = float(...) replaces the total each time. total = total + float(...) adds each song on. -->

<style scoped>pre, marp-pre { font-size: 0.65em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Average rock song:** Print the average length of the **rock** songs only. `len(songs)` counts every song, so you need a count of your own.
- **The oldest song:** Also print the **oldest** song and its year, in the same loop.

[Open this step](https://tutorials.learningwaypoints.com/code/data/data-totals/?full=step-4#step-4)

<!-- Speaker note: What this step is for: An average of some rows needs its own count: add up and count only inside the if. Hints, in order: Start count = 0 beside total = 0. / Put the adding inside if song["genre"] == "rock": and add 1 to count there too. Then divide by count. / Copy the idea of longest: oldest = songs[0], then replace it when int(song["year"]) is smaller than int(oldest["year"]). For students who need more support: Give students the rock average with the count already added, and ask them to do the oldest song by copying the longest pattern. For early finishers: Find the longest song of each decade (the 1980s, the 1990s...), using year // 10 * 10 for the decade. The hard part, on purpose: The biggest-so-far pattern. Ask students to fill in the trace by hand before running anything; resist writing the comparison for them. When students get stuck: The total is only the last song's minutes. Ask: Does the line add to total, or replace it? Fix: total = total + minutes. / ZeroDivisionError: division by zero. Ask: What is the count when no song matches? Fix: Check if count == 0 before dividing, and print a message instead. / TypeError: can only concatenate str (not "float") to str. Ask: Is the number being joined onto text? Fix: Wrap it in str() before joining with +. -->

<!-- Speaker note: Teacher: ask where the count must go up: inside the if, beside the adding. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: genre stats

Ask for a genre, then print how many songs it has, their average length and its **shortest** song. If nobody types a genre that is there, say so instead of crashing (dividing by a count of 0 is an error).

[Open this step](https://tutorials.learningwaypoints.com/code/data/data-totals/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: choose rows with input, then total, average and smallest, and a sensible answer when nothing matches. -->

<!-- Speaker note: Teacher: ask students for a genre that is not in the data, and what their program does with it. -->

---

## Where this leads

Next: count every genre at once, and draw the counts as a bar chart.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does an average of the pop songs need its own count?**

* len(songs) counts every song; the average of some songs divides their total by how many of them there are, counted inside the if.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson counts every genre at once with a dictionary and draws a bar chart. In pandas (Lesson 5) these become one-word methods such as .mean() and .max(). -->
