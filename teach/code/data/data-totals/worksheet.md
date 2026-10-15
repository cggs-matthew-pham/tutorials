---
title: "Totals and the biggest"
subtitle: "Data detective · Reading data · Lesson 2"
---

# Totals and the biggest

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Average speed, top scorer, longest song: most questions about data are a total, an average or a biggest.


:::teacher-note

**In one sentence:** Students total a column, divide for an average and track the longest song with a biggest-so-far variable, then restrict the average to one genre, find the oldest song and write genre stats that cope with no matches.

**Students should be able to say:** I can add up a column with a total that starts at 0. I can work out an average from a total and a count. I can keep the biggest (or smallest) so far as the loop goes.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Follow `total` through the loop: what is it after each number? Then what does `/ 3` give?

```python
total = 0
for n in [3, 4, 5]:
    total = total + n
print(total / 3)
```

:::keep-together

**What does it print?**

☐ 4.0

☐ 5

☐ 12

☐ 12.0

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 4.0. total goes 3, then 7, then 12, and 12 / 3 is 4.0. Dividing with / always gives a decimal number.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Follow the loop

**The first three songs are Jolene (2.7), Bohemian Rhapsody (5.9) and Billie Jean (4.9). Fill in total and the longest minutes after each one.**

{{rows 1}}

| song | minutes | total | longest minutes |
|---|---|---|---|
| Jolene | 2.7 | 2.7 | 2.7 |
| Bohemian Rhapsody | 5.9 |   |   |
| Billie Jean | 4.9 |   |   |

:::


:::teacher-note

**Answer:** 8.6, 5.9, 13.5, 5.9

total grows with every song. longest changes only when a song is longer than the one it holds, so Billie Jean (4.9) does not replace Bohemian Rhapsody (5.9).

:::


:::keep-together

### Where longest starts

**Why does longest start as songs[0], not 0?**

☐ Python does not allow 0 there

☐ It holds a whole song (a dictionary), so it starts as a real song: the first one

☐ songs[0] is always the longest

☐ 0 would make the program slower

:::


:::teacher-note

**Answer:** It holds a whole song (a dictionary), so it starts as a real song: the first one

longest is a song, so the program can print its title at the end. Starting with the first song means there is always something to compare with.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 8

total = float(...) replaces the total each time. total = total + float(...) adds each song on.

:::


:::typical

## Modify


**Average rock song.** Print the average length of the **rock** songs only. `len(songs)` counts every song, so you need a count of your own.

**The oldest song.** Also print the **oldest** song and its year, in the same loop.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Average rock song:**

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

total = 0
count = 0
longest = songs[0]
for song in songs:
    if song["genre"] == "rock":
        minutes = float(song["minutes"])
        total = total + minutes
        count = count + 1
    if float(song["minutes"]) > float(longest["minutes"]):
        longest = song

print("Average rock song: " + str(round(total / count, 1)) + " minutes")
print("Longest: " + longest["title"] + " (" + longest["minutes"] + " minutes)")
```

**The oldest song:**

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

total = 0
longest = songs[0]
oldest = songs[0]
for song in songs:
    minutes = float(song["minutes"])
    total = total + minutes
    if minutes > float(longest["minutes"]):
        longest = song
    if int(song["year"]) < int(oldest["year"]):
        oldest = song

print("Average length: " + str(round(total / len(songs), 1)) + " minutes")
print("Longest: " + longest["title"] + " (" + longest["minutes"] + " minutes)")
print("Oldest: " + oldest["title"] + " (" + oldest["year"] + ")")
```

:::

:::


## Make: genre stats

Ask for a genre, then print how many songs it has, their average length and its **shortest** song. If nobody types a genre that is there, say so instead of crashing (dividing by a count of 0 is an error).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

genre = input("Which genre? ").strip().lower()
matches = []
for song in songs:
    if song["genre"].lower() == genre:
        matches.append(song)

if len(matches) == 0:
    print("No songs in that genre.")
else:
    total = 0
    shortest = matches[0]
    for song in matches:
        minutes = float(song["minutes"])
        total = total + minutes
        if minutes < float(shortest["minutes"]):
            shortest = song
    print(str(len(matches)) + " songs, " + str(round(total / len(matches), 1)) + " minutes on average")
    print("Shortest: " + shortest["title"] + " (" + shortest["minutes"] + " minutes)")
```

:::


:::wider

## Where this leads

Next: count every genre at once, and draw the counts as a bar chart.

:::


## Exit ticket

:::keep-together

**Why does an average of the pop songs need its own count?**

{{lines-3}}

:::


:::teacher-note

**Answer:** len(songs) counts every song; the average of some songs divides their total by how many of them there are, counted inside the if.

:::

