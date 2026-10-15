---
title: "A bar chart in text"
subtitle: "Data detective · Charts and checking · Lesson 3"
---

# A bar chart in text

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Before computers drew charts, people drew them with tally marks. A row of # characters is the same idea, and it is a real bar chart.


:::teacher-note

**In one sentence:** Students count every genre at once with a dictionary and draw the counts as a text bar chart, then chart by decade, filter the bars, and total minutes per genre.

**Students should be able to say:** I can count every value in a column with a dictionary. I can draw a count as a bar with "#" * n. I can change what a chart shows by changing the key or adding an if.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`"#" * 3` repeats text. `ljust(6)` pads a word with spaces until it is 6 characters long.

```python
counts = {"pop": 3, "rock": 2}
for genre in counts:
    print(genre.ljust(6) + "#" * counts[genre])
```

:::keep-together

**What does it print?**

☐ pop###rock##

☐ pop   ###, then rock  ##

☐ An error: you cannot multiply text

☐ pop 3, then rock 2

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** pop   ###, then rock  ##. "#" * 3 repeats the text 3 times, and ljust(6) pads each name to 6 characters so the bars start in the same place.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### The first two songs

**After the first two songs (Jolene, country, then Bohemian Rhapsody, rock), what is counts?**

☐ {"country": 2}

☐ {}

☐ {"country": 1, "rock": 1}

☐ {"Jolene": 1, "Bohemian Rhapsody": 1}

:::


:::teacher-note

**Answer:** {"country": 1, "rock": 1}

Each song's genre is a key. Both genres are new, so each starts at 1. The titles are never keys.

:::


:::keep-together

### Why the if

**Why is there an if genre in counts: before adding 1?**

☐ To sort the genres

☐ To skip genres with no songs

☐ To stop counting twice

☐ The first time a genre turns up it has no count yet, so it must start at 1

:::


:::teacher-note

**Answer:** The first time a genre turns up it has no count yet, so it must start at 1

counts[genre] + 1 needs counts[genre] to exist. The else starts a new genre at 1.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 9

The first country song looks up counts["country"] before it exists. Check with if genre in counts: and start it at 1 otherwise.

:::


:::typical

## Modify


**Songs by decade.** Chart the songs by **decade** (1970, 1980, ...) instead of by genre.

**Only the big genres.** Only draw a bar for genres with **3 or more** songs.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Songs by decade:**

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

counts = {}
for song in songs:
    decade = int(song["year"]) // 10 * 10
    if decade in counts:
        counts[decade] = counts[decade] + 1
    else:
        counts[decade] = 1

for decade in counts:
    print(str(decade).ljust(12) + "#" * counts[decade] + " " + str(counts[decade]))
```

**Only the big genres:**

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
    if counts[genre] >= 3:
        print(genre.ljust(12) + "#" * counts[genre] + " " + str(counts[genre]))
```

:::

:::


## Make: minutes per genre

Add up the **minutes** of each genre, then draw a bar for each genre with one `#` for every 5 minutes, and the total at the end of the bar. (`int()` drops the decimals from a number of #s.)

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

minutes = {}
for song in songs:
    genre = song["genre"]
    if genre in minutes:
        minutes[genre] = minutes[genre] + float(song["minutes"])
    else:
        minutes[genre] = float(song["minutes"])

for genre in minutes:
    bar = "#" * int(minutes[genre] / 5)
    print(genre.ljust(12) + bar + " " + str(round(minutes[genre])) + " min")
```

:::


:::wider

## Where this leads

Real charting tools (spreadsheets, pandas, Gradio's BarPlot in Lesson 5) draw the same bars from the same counts. Next: data that is messy, and how to check your code with test cases.

:::


## Exit ticket

:::keep-together

**Why does counting need if genre in counts:?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The first time a genre appears it has no count yet, so counts[genre] + 1 would fail; it starts at 1 instead.

:::

