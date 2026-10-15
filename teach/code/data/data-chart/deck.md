---
marp: true
theme: default
html: true
---

# A bar chart in text

Data detective · Charts and checking

<!-- Speaker note: Students count every genre at once with a dictionary and draw the counts as a text bar chart, then chart by decade, filter the bars, and total minutes per genre. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** count every genre at once with a dictionary, then draw each count as a bar of.

- I can count every value in a column with a dictionary.
- I can draw a count as a bar with "#" * n.
- I can change what a chart shows by changing the key or adding an if.

<!-- Speaker note: Before class: Read the unit primer first. The counting pattern: `counts = {}`, then for each row, if the key is in `counts` add 1, otherwise start it at 1 (the bug task leaves out the start, giving a `KeyError`). Looping over a dictionary (`for genre in counts:`) gives its keys. `"#" * n` repeats text; `ljust(12)` pads text with spaces to 12 characters so the bars line up. The decade task uses `//` (divide and drop the remainder): `1987 // 10 * 10` is 1980. The Where this leads question is about where data comes from: this file is a hand-picked set of well-known songs, so it says nothing about music in general. -->

---

## Why it matters

> Before computers drew charts, people drew them with tally marks. A row of # characters is the same idea, and it is a real bar chart.

<!-- Speaker note: Last lesson counted one genre at a time. A **dictionary** can count every genre at once: one key per genre, and its count as the value. Then each count becomes a bar, because `"#" * 5` is `#####`. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
counts = {"pop": 3, "rock": 2}
for genre in counts:
    print(genre.ljust(6) + "#" * counts[genre])
```

**What does it print?**

- pop###rock##
- pop   ###, then rock  ##
- An error: you cannot multiply text
- pop 3, then rock 2

<!-- Speaker note: What happens: pop ###, then rock ##. "#" * 3 repeats the text 3 times, and ljust(6) pads each name to 6 characters so the bars start in the same place. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw the two bars on the board with tally marks first. -->

<style scoped>pre, marp-pre { font-size: 0.81em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* pop ###, then rock ##. "#" * 3 repeats the text 3 times, and ljust(6) pads each name to 6 characters so the bars start in the same place.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/data/data-chart/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/data/data-chart/?full=step-2#step-2)

<!-- Speaker note: Run it: a bar for each genre, with its count. Which genre has the most songs? Add `print(counts)` after the first loop to see the whole dictionary. Students should be able to say: I can explain how counts gets one key for each genre. -->

<!-- Speaker note: Teacher: add print(counts) after the loop so students see the dictionary itself. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

counts = {}
for song in songs:
    genre = song["genre"]
    if genre in counts:
        counts[genre] = counts[genre] + 1
    else:
        counts[genre] = 1

for genre in counts:
    print(genre.ljust(12) + "#" * counts[genre] + " " + str(counts[genre]))
```

<!-- Speaker note: What this step is for: Counting with a dictionary: a new key starts at 1, a key already there goes up by 1; then a loop over the keys draws the chart. -->

<!-- Speaker note: Teacher: act out counting with sticky notes, one per genre, adding a stroke for each song. -->

<style scoped>pre, marp-pre { font-size: 0.68em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The first two songs

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

counts = {}
for song in songs:
    genre = song["genre"]
    if genre in counts:
        counts[genre] = counts[genre] + 1
    else:
        counts[genre] = 1

for genre in counts:
    print(genre.ljust(12) + "#" * counts[genre] + " " + str(counts[genre]))
```

</div>
<div>

**After the first two songs (Jolene, country, then Bohemian Rhapsody, rock), what is counts?**

- {"country": 2}
- {}
- {"country": 1, "rock": 1}
- {"Jolene": 1, "Bohemian Rhapsody": 1}

* Answer: {"country": 1, "rock": 1}

</div>
</div>

<!-- Speaker note: Each song's genre is a key. Both genres are new, so each starts at 1. The titles are never keys. -->

<style scoped>section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why the if

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

counts = {}
for song in songs:
    genre = song["genre"]
    if genre in counts:
        counts[genre] = counts[genre] + 1
    else:
        counts[genre] = 1

for genre in counts:
    print(genre.ljust(12) + "#" * counts[genre] + " " + str(counts[genre]))
```

</div>
<div>

**Why is there an if genre in counts: before adding 1?**

- To sort the genres
- To skip genres with no songs
- To stop counting twice
- The first time a genre turns up it has no count yet, so it must start at 1

* Answer: The first time a genre turns up it has no count yet, so it must start at 1

</div>
</div>

<!-- Speaker note: counts[genre] + 1 needs counts[genre] to exist. The else starts a new genre at 1. -->

<style scoped>section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should count the genres, but it stops straight away with KeyError: 'country'. Click the line that is wrong.**

```
 1  import csv
 2  
 3  with open("music.csv") as f:
 4      songs = list(csv.DictReader(f))
 5  
 6  counts = {}
 7  for song in songs:
 8      genre = song["genre"]
 9      counts[genre] = counts[genre] + 1
10  print(counts)
```

* Answer: line 9

<!-- Speaker note: The first country song looks up counts["country"] before it exists. Check with if genre in counts: and start it at 1 otherwise. -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Songs by decade:** Chart the songs by **decade** (1970, 1980, ...) instead of by genre.
- **Only the big genres:** Only draw a bar for genres with **3 or more** songs.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/data/data-chart/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Change what you count by changing the key; change what you show with an if around the bar. Hints, in order: Use the decade as the key instead of the genre: decade = int(song["year"]) // 10 * 10. / // divides and drops the remainder: 1987 // 10 is 198, and 198 * 10 is 1980. A number key needs str() before ljust. / Put the print inside if counts[genre] >= 3:. For students who need more support: Give students the counting loop and ask them only to write the loop that draws the bars. For early finishers: Print the bars in order, biggest first (sorted(counts, key=counts.get, reverse=True) is one way to look up). The hard part, on purpose: Counting with a dictionary: the new key that has no count yet. Ask what counts holds after the first song, on paper, before they change code. When students get stuck: KeyError: 'country'. Ask: Does the genre have a count before you add 1 to it? Fix: if genre in counts: add 1, else: start it at 1. / AttributeError: 'int' object has no attribute 'ljust'. Ask: Is the key a number now? Fix: str(decade).ljust(12). / TypeError: can't multiply sequence by non-int of type 'float'. Ask: Is the number of Fix: "#" * int(minutes / 5). -->

<!-- Speaker note: Teacher: 1987 // 10 * 10 on the board, step by step. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: minutes per genre

Add up the **minutes** of each genre, then draw a bar for each genre with one `#` for every 5 minutes, and the total at the end of the bar. (`int()` drops the decimals from a number of #s.)

[Open this step](https://studio.learningwaypoints.com/tutorials/code/data/data-chart/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a dictionary can add up minutes as well as count, and a bar can stand for any amount. -->

<!-- Speaker note: Teacher: ask what one # stands for, and write it on the chart as a key. -->

---

## Where this leads

Real charting tools (spreadsheets, pandas, Gradio's BarPlot in Lesson 5) draw the same bars from the same counts. Next: data that is messy, and how to check your code with test cases.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does counting need if genre in counts:?**

* The first time a genre appears it has no count yet, so counts[genre] + 1 would fail; it starts at 1 instead.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson cleans messy data and checks code with test cases. Lesson 5 draws the same chart with Gradio's BarPlot. -->
