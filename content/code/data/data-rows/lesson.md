---
order: 1
unit: read
introduces: [csv, dict]
recipes: [file]
title: Rows of data
summary: Read a CSV file into a list of dictionaries, one per row, then pick out the rows you want.
language: python
hook: "Spreadsheets, sports tables and music charts can all be saved as a CSV file: plain text that Python can read row by row."
app:
  # The whole site is served: the Python playground loads Pyodide from ../_pyodide/. (_playground-py names the playground for the clip cache.)
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist\" 8123 _playground-py"
  url: "http://127.0.0.1:8123/_playground-py/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", files: music.csv, from: "code/data/data-rows/files/" }
  caption: "csv.DictReader turns each row of the file into a dictionary"
  say: "csv dot DictReader turns each row of the file into a dictionary."
  pacing: { keyDelayMs: 22 }
  clip:
    - caption:
        text: "Open the file, and read every row into a list."
        say: "Open the file, and read every row into a list."
    - type: { into: "Python code", text: "import csv\n\nwith open(\"music.csv\") as f:\n    songs = list(csv.DictReader(f))\n\nprint(songs[0])\n" }
    - click: Run
    - expect: { selector: "#output", contains: "'title': 'Jolene'" }
    - caption:
        text: "Each row is a dictionary. The first line of the file gives the keys."
        say: "Each row is a dictionary. The first line of the file gives the keys."
    - wait: 2000
    - caption:
        text: "Every value is text, even the year: '1973'. Use int() to compare it."
        say: "Every value is text, even the year. Use int to compare it."
    - type: { into: "Python code", append: true, text: "print(int(songs[0][\"year\"]) + 1)\n" }
    - click: Run
    - expect: { selector: "#output", contains: "1974" }
    - wait: 1500
---
A **CSV file** (comma-separated values) is a table saved as plain text: the first line names the columns, and every other line is one row. This course uses `music.csv`, a table of well-known songs. It is already in your **Files** tab; open it there to see what it looks like. Python reads each row into a **dictionary**, which looks a value up by its name (its **key**): `song["title"]`.

## Predict

```step
stage: predict
code: rows.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["20131", "2014", "An error", "2013 1"]
  actual: "20131. \"2013\" is in quotes, so it is text, and + joins text. Values read from a CSV file are all text like this."
```

The year is in quotes. What does `+` do with two pieces of text?

## Run

```step
stage: run
code: rows.py#run
try: { playground: python, starter: "rows.py#run", files: [../sets/music.csv], height: 460 }
check: { type: reflect, text: "I can see that each song is a dictionary, with the column names as keys." }
unlocks: [read-a-csv]
```

Run it. It prints how many songs there are, the first song, then the rock songs. Change `"rock"` to `"K-pop"` and run it again.

## Investigate

```step
stage: investigate
code: rows.py#run
insight: "A CSV file read with csv.DictReader is a list of dictionaries, one per row, keyed by the column names; every value is text until you change it."
tasks:
  - check:
      type: question
      q: "What is songs[0]?"
      options: ["A dictionary: the first song, with keys title, artist, year, genre and minutes", "The first line of the file, title,artist,year,genre,minutes", "The title of the first song", "A list of five values"]
      answer: 0
      explain: "DictReader uses the first line of the file as the keys, so every row after it becomes a dictionary like {\"title\": \"Jolene\", \"artist\": \"Dolly Parton\", ...}."
  - check:
      type: question
      q: "How would you get the artist of the third song?"
      options: ["songs[2][\"artist\"]", "songs[3][\"artist\"]", "songs[\"artist\"][2]", "artist[2]"]
      answer: 0
      explain: "songs[2] is the third song (counting from 0), and [\"artist\"] looks up that key in it."
  - check:
      type: bug
      code: rows.py#bug
      text: "This should list the songs from 2020 on, but it stops with TypeError: '>=' not supported between instances of 'str' and 'int'. Click the line that is wrong."
      answer: 7
      fault: runtime
      misconception: csv-text-values
      explain: "song[\"year\"] is text, such as \"2021\", and Python will not compare text with a number. int(song[\"year\"]) >= 2020 turns it into a number first."
```

### One row

What one row of the table becomes.

### Finding a value

A row, then a key.

### Spot the bug

A comparison that does not work.

## Modify

```step
stage: modify
insight: "Picking rows is a loop with an if; counting them is a variable that goes up by one inside that if."
try: { playground: python, starter: "rows.py#run", files: [../sets/music.csv], height: 460 }
tasks:
  - hint: "Change the if to compare the year as a number: int(song[\"year\"]) >= 2010."
    check: { type: code, text: "List the songs from 2010 or later.", rules: { contains: ["int(song[\"year\"])"] } }
  - hint:
      - "Before the loop, count = 0. Inside the if, count = count + 1."
      - "After the loop (not indented), print the count."
    check: { type: code, text: "Count the pop songs and print how many there are.", rules: { contains: ["\"pop\"", "count"] } }
```

### Songs from 2010 on

List only the songs from **2010 or later**. The year has to become a number first.

### How many pop songs?

Count the **pop** songs and print the total at the end.

## Make: a genre finder

```step
stage: make
insight: "Goals only: input chooses what to look for, the loop finds it, and a count says how many."
try: { playground: python, starter: "rows.py#make", files: [../sets/music.csv], height: 460 }
check: { type: code, text: "Ask for a genre, list its songs, and say how many there are.", rules: { contains: ["input("], loops: 1 } }
```

Ask which genre to look for, list each of its songs with its year, and finish with how many there were. Make it work whether someone types `pop`, `Pop` or ` POP `.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your teacher gives you films.csv with the columns title, studio, year, rating. What would you change in your genre finder?"
  options: ["The file name and the keys, such as \"studio\" instead of \"genre\"", "Everything: it is a different kind of data", "Nothing", "Only the file name"]
  answer: 0
  explain: "The program is the same shape for any table: read the rows, loop, pick by a key. Only the file and the keys change."
```

Every data tool, from spreadsheets to big databases, works on rows and columns like this. Next: totals, averages and the biggest value.
