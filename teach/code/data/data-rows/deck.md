---
marp: true
theme: default
html: true
---

# Rows of data

Data detective · Reading data

<!-- Speaker note: Students read music.csv into a list of dictionaries with csv.DictReader, find values by row and key, learn that every value from a CSV is text, then filter and count rows and build a genre finder. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** read a CSV file into a list of dictionaries, one per row, then pick out the rows you want.

- I can read a CSV file into a list of dictionaries.
- I can find a value by row and column, such as songs[2]["artist"].
- I can pick and count rows with a loop and an if, turning text into a number when I compare.

<!-- Speaker note: Before class: Read the unit primer first. This course runs in the **Python playground** (real Python in the browser, Pyodide). The first load takes a few seconds; before teaching it, open the site's Check your school page once on a student device at school. `music.csv` appears in each student's Files tab by itself (the Files tab can put the lesson's copy back, or add a CSV from the computer). `csv.DictReader(f)` reads the first line as column names and makes every other line a dictionary; `list(...)` keeps them all. Every value is **text**, so `"2013" + "1"` is `"20131"` (the Predict) and comparing a year with a number fails (the bug task) until `int()` changes it. Dictionaries are introduced here only as far as reading one (`song["title"]`: a value looked up by its key); Deeper Python goes further. `with open(...)` is a recipe here (copy the lines), taught properly in Deeper Python's Save the game. -->

---

## Why it matters

> Spreadsheets, sports tables and music charts can all be saved as a CSV file: plain text that Python can read row by row.

<!-- Speaker note: A **CSV file** (comma-separated values) is a table saved as plain text: the first line names the columns, and every other line is one row. This course uses `music.csv`, a table of well-known songs. It is already in your **Files** tab; open it there to see what it looks like. Python reads each row into a **dictionary**, which looks a value up by its name (its **key**): `song["title"]`. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
song = {"title": "Royals", "year": "2013"}
print(song["year"] + "1")
```

**What does it print?**

- An error
- 2014
- 2013 1
- 20131

<!-- Speaker note: What happens: 20131. "2013" is in quotes, so it is text, and + joins text. Values read from a CSV file are all text like this. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: write "2013" + "1" on the board, then 2013 + 1. Quotes make text. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 20131. "2013" is in quotes, so it is text, and + joins text. Values read from a CSV file are all text like this.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/data/data-rows/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/data/data-rows/?full=step-2#step-2)

<!-- Speaker note: Run it. It prints how many songs there are, the first song, then the rock songs. Change `"rock"` to `"K-pop"` and run it again. Students should be able to say: I can see that each song is a dictionary, with the column names as keys. -->

<!-- Speaker note: Teacher: have students open music.csv in the Files tab and match the first row with songs[0]. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

print(str(len(songs)) + " songs")
print(songs[0])
for song in songs:
    if song["genre"] == "rock":
        print(song["title"] + " by " + song["artist"])
```

<!-- Speaker note: What this step is for: A CSV file read with csv.DictReader is a list of dictionaries, one per row, keyed by the column names; every value is text until you change it. -->

<!-- Speaker note: Teacher: count from 0 together: songs[0] is the first song. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## One row

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

print(str(len(songs)) + " songs")
print(songs[0])
for song in songs:
    if song["genre"] == "rock":
        print(song["title"] + " by " + song["artist"])
```

</div>
<div>

**What is songs[0]?**

- The first line of the file, title,artist,year,genre,minutes
- A list of five values
- The title of the first song
- A dictionary: the first song, with keys title, artist, year, genre and minutes

* Answer: A dictionary: the first song, with keys title, artist, year, genre and minutes

</div>
</div>

<!-- Speaker note: DictReader uses the first line of the file as the keys, so every row after it becomes a dictionary like {"title": "Jolene", "artist": "Dolly Parton", ...}. -->

<style scoped>section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Finding a value

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

print(str(len(songs)) + " songs")
print(songs[0])
for song in songs:
    if song["genre"] == "rock":
        print(song["title"] + " by " + song["artist"])
```

</div>
<div>

**How would you get the artist of the third song?**

- songs[2]["artist"]
- artist[2]
- songs["artist"][2]
- songs[3]["artist"]

* Answer: songs[2]["artist"]

</div>
</div>

<!-- Speaker note: songs[2] is the third song (counting from 0), and ["artist"] looks up that key in it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should list the songs from 2020 on, but it stops with TypeError: '&gt;=' not supported between instances of 'str' and 'int'. Click the line that is wrong.**

```
 1  import csv
 2  
 3  with open("music.csv") as f:
 4      songs = list(csv.DictReader(f))
 5  
 6  for song in songs:
 7      if song["year"] >= 2020:
 8          print(song["title"])
```

* Answer: line 7

<!-- Speaker note: song["year"] is text, such as "2021", and Python will not compare text with a number. int(song["year"]) >= 2020 turns it into a number first. -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Songs from 2010 on:** List only the songs from **2010 or later**. The year has to become a number first.
- **How many pop songs?:** Count the **pop** songs and print the total at the end.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/data/data-rows/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Picking rows is a loop with an if; counting them is a variable that goes up by one inside that if. Hints, in order: Change the if to compare the year as a number: int(song["year"]) >= 2010. / Before the loop, count = 0. Inside the if, count = count + 1. / After the loop (not indented), print the count. For students who need more support: Give students the loop with the if already written, and ask them only to add the count. For early finishers: Ask for a year as well, and list only that genre's songs from that year on. The hard part, on purpose: The bug task and the first Modify: realising every value is text. Ask students to print one value with type() and predict before fixing. When students get stuck: TypeError: '>=' not supported between instances of 'str' and 'int'. Ask: Is the year text or a number at this point? Fix: int(song["year"]) >= 2010. / KeyError: 'Genre'. Ask: How is the key spelled in the first line of the file? Fix: Keys must match exactly, including capitals: genre, not Genre. / The count prints once for every song. Ask: Is the print indented inside the loop? Fix: Move the print to after the loop, not indented. / FileNotFoundError: music.csv. Ask: Is music.csv in the Files tab? Fix: Use "Get this lesson's files again" in the Files tab. -->

<!-- Speaker note: Teacher: the count goes up inside the if; the print goes after the loop. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a genre finder

Ask which genre to look for, list each of its songs with its year, and finish with how many there were. Make it work whether someone types `pop`, `Pop` or ` POP `.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/data/data-rows/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: input chooses what to look for, the loop finds it, and a count says how many. -->

<!-- Speaker note: Teacher: test with pop, Pop and a genre that is not there. -->

---

## Where this leads

Every data tool, from spreadsheets to big databases, works on rows and columns like this. Next: totals, averages and the biggest value.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does int(song["year"]) need int()?**

* Every value read from a CSV is text; int() turns "2013" into the number 2013 so it can be compared or added.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: totals, averages and the longest song. Swapping in another CSV with the same idea (a class survey, sports results) keeps every program working with new keys. -->
