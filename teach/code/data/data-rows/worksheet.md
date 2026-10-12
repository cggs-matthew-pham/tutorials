---
title: "Rows of data"
subtitle: "Data detective · Reading data · Lesson 1"
---

# Rows of data

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Spreadsheets, sports tables and music charts can all be saved as a CSV file: plain text that Python can read row by row.


:::teacher-note

**In one sentence:** Students read music.csv into a list of dictionaries with csv.DictReader, find values by row and key, learn that every value from a CSV is text, then filter and count rows and build a genre finder.

**Students should be able to say:** I can read a CSV file into a list of dictionaries. I can find a value by row and column, such as songs[2]["artist"]. I can pick and count rows with a loop and an if, turning text into a number when I compare.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The year is in quotes. What does `+` do with two pieces of text?

```python
song = {"title": "Royals", "year": "2013"}
print(song["year"] + "1")
```

:::keep-together

**What does it print?**

☐ An error

☐ 2014

☐ 2013 1

☐ 20131

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 20131. "2013" is in quotes, so it is text, and + joins text. Values read from a CSV file are all text like this.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### One row

**What is songs[0]?**

☐ The first line of the file, title,artist,year,genre,minutes

☐ A list of five values

☐ The title of the first song

☐ A dictionary: the first song, with keys title, artist, year, genre and minutes

:::


:::teacher-note

**Answer:** A dictionary: the first song, with keys title, artist, year, genre and minutes

DictReader uses the first line of the file as the keys, so every row after it becomes a dictionary like {"title": "Jolene", "artist": "Dolly Parton", ...}.

:::


:::keep-together

### Finding a value

**How would you get the artist of the third song?**

☐ songs[2]["artist"]

☐ artist[2]

☐ songs["artist"][2]

☐ songs[3]["artist"]

:::


:::teacher-note

**Answer:** songs[2]["artist"]

songs[2] is the third song (counting from 0), and ["artist"] looks up that key in it.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 7

song["year"] is text, such as "2021", and Python will not compare text with a number. int(song["year"]) &gt;= 2020 turns it into a number first.

:::


:::typical

## Modify


**Songs from 2010 on.** List only the songs from **2010 or later**. The year has to become a number first.

**How many pop songs?.** Count the **pop** songs and print the total at the end.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Songs from 2010 on:**

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

print(str(len(songs)) + " songs")
print(songs[0])
for song in songs:
    if int(song["year"]) >= 2010:
        print(song["title"] + " by " + song["artist"])
```

**How many pop songs?:**

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

count = 0
for song in songs:
    if song["genre"] == "pop":
        count = count + 1
print(str(count) + " pop songs")
```

:::

:::


## Make: a genre finder

Ask which genre to look for, list each of its songs with its year, and finish with how many there were. Make it work whether someone types `pop`, `Pop` or ` POP `.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

genre = input("Which genre? ").strip()
count = 0
for song in songs:
    if song["genre"].lower() == genre.lower():
        print(song["title"] + " (" + song["year"] + ")")
        count = count + 1
print(str(count) + " " + genre + " songs")
```

:::


:::wider

## Where this leads

Every data tool, from spreadsheets to big databases, works on rows and columns like this. Next: totals, averages and the biggest value.

:::


## Exit ticket

:::keep-together

**Why does int(song["year"]) need int()?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Every value read from a CSV is text; int() turns "2013" into the number 2013 so it can be compared or added.

:::

