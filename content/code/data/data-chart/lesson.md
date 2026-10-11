---
order: 3
unit: show
title: A bar chart in text
summary: Count every genre at once with a dictionary, then draw each count as a bar of # characters.
language: python
hook: "Before computers drew charts, people drew them with tally marks. A row of # characters is the same idea, and it is a real bar chart."
app:
  # The whole site is served: the Python playground loads Pyodide from ../_pyodide/. (_playground-py names the playground for the clip cache.)
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist\" 8123 _playground-py"
  url: "http://127.0.0.1:8123/_playground-py/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "@chart.py#run", "file:music.csv": "@../sets/music.csv" }
  caption: "A dictionary keeps one count per genre; each count becomes a bar"
  say: "A dictionary keeps one count for each genre, and each count becomes a bar."
  clip:
    - caption:
        text: "counts starts as an empty dictionary."
        say: "counts starts as an empty dictionary."
    - wait: 1500
    - caption:
        text: "Each song adds 1 to its genre's count, or starts that count at 1."
        say: "Each song adds one to its genre's count, or starts that count at one."
    - wait: 2500
    - click: Run
    - expect: { selector: "#output", contains: "pop" }
    - caption:
        text: "Then \"#\" times the count draws one bar for each genre."
        say: "Then the hash sign, times the count, draws one bar for each genre."
    - wait: 3000
---
Last lesson counted one genre at a time. A **dictionary** can count every genre at once: one key per genre, and its count as the value. Then each count becomes a bar, because `"#" * 5` is `#####`.

## Predict

```step
stage: predict
code: chart.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["pop   ###, then rock  ##", "pop 3, then rock 2", "pop###rock##", "An error: you cannot multiply text"]
  actual: "pop   ###, then rock  ##. \"#\" * 3 repeats the text 3 times, and ljust(6) pads each name to 6 characters so the bars start in the same place."
```

`"#" * 3` repeats text. `ljust(6)` pads a word with spaces until it is 6 characters long.

## Run

```step
stage: run
code: chart.py#run
try: { playground: python, starter: "chart.py#run", files: [../sets/music.csv], height: 480 }
check: { type: reflect, text: "I can explain how counts gets one key for each genre." }
unlocks: [count-with-a-dictionary, a-text-bar]
```

Run it: a bar for each genre, with its count. Which genre has the most songs? Add `print(counts)` after the first loop to see the whole dictionary.

## Investigate

```step
stage: investigate
code: chart.py#run
insight: "Counting with a dictionary: a new key starts at 1, a key already there goes up by 1; then a loop over the keys draws the chart."
tasks:
  - check:
      type: question
      q: "After the first two songs (Jolene, country, then Bohemian Rhapsody, rock), what is counts?"
      options: ["{\"country\": 1, \"rock\": 1}", "{\"Jolene\": 1, \"Bohemian Rhapsody\": 1}", "{\"country\": 2}", "{}"]
      answer: 0
      explain: "Each song's genre is a key. Both genres are new, so each starts at 1. The titles are never keys."
  - check:
      type: question
      q: "Why is there an if genre in counts: before adding 1?"
      options: ["The first time a genre turns up it has no count yet, so it must start at 1", "To skip genres with no songs", "To sort the genres", "To stop counting twice"]
      answer: 0
      explain: "counts[genre] + 1 needs counts[genre] to exist. The else starts a new genre at 1."
  - check:
      type: bug
      code: chart.py#bug
      text: "This should count the genres, but it stops straight away with KeyError: 'country'. Click the line that is wrong."
      answer: 9
      fault: runtime
      misconception: count-key-missing
      explain: "The first country song looks up counts[\"country\"] before it exists. Check with if genre in counts: and start it at 1 otherwise."
```

### The first two songs

What the dictionary holds.

### Why the if

A key that is not there yet.

### Spot the bug

A count that never starts.

## Modify

```step
stage: modify
insight: "Change what you count by changing the key; change what you show with an if around the bar."
try: { playground: python, starter: "chart.py#run", files: [../sets/music.csv], height: 480 }
tasks:
  - hint:
      - "Use the decade as the key instead of the genre: decade = int(song[\"year\"]) // 10 * 10."
      - "// divides and drops the remainder: 1987 // 10 is 198, and 198 * 10 is 1980. A number key needs str() before ljust."
    check: { type: code, text: "Chart the songs by decade instead of genre.", rules: { contains: ["// 10"] } }
  - hint: "Put the print inside if counts[genre] >= 3:."
    check: { type: code, text: "Only draw genres with 3 or more songs.", rules: { contains: ["counts[genre] >"] } }
```

### Songs by decade

Chart the songs by **decade** (1970, 1980, ...) instead of by genre.

### Only the big genres

Only draw a bar for genres with **3 or more** songs.

## Make: minutes per genre

```step
stage: make
insight: "Goals only: a dictionary can add up minutes as well as count, and a bar can stand for any amount."
try: { playground: python, starter: "chart.py#make", files: [../sets/music.csv], height: 480 }
check: { type: code, text: "Total the minutes for each genre and draw a bar for each, one # for every 5 minutes.", rules: { contains: ["\"#\" *"], loops: 2 } }
```

Add up the **minutes** of each genre, then draw a bar for each genre with one `#` for every 5 minutes, and the total at the end of the bar. (`int()` drops the decimals from a number of #s.)

## Where this leads

```step
stage: info
check:
  type: question
  q: "Pop has far more songs than folk in this data. What does that tell you about music in general?"
  options: ["Nothing much: it tells you about the songs someone chose to put in this file", "Pop is the most popular genre in the world", "Folk is dying out", "The chart is wrong"]
  answer: 0
  explain: "A chart shows the data, and data is a choice. Before claiming anything, ask who collected it, how, and what is missing."
```

Real charting tools (spreadsheets, pandas, Gradio's BarPlot in Lesson 5) draw the same bars from the same counts. Next: data that is messy, and how to check your code with test cases.
