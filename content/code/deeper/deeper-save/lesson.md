---
order: 6
unit: adventure
introduces: [file, json]
title: Save the game
summary: Write the game to a file with json, read it back next time, and catch the error when there is no file yet.
language: python
hook: "Every game that lets you carry on tomorrow writes its world to a file, and reads it back when you return."
app:
  # The whole site is served: the Python playground loads Pyodide from ../_pyodide/. (_playground-py names the playground for the clip cache.)
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist\" 8123 _playground-py"
  url: "http://127.0.0.1:8123/_playground-py/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "@save.py#sol-m2", view: output, autorun: 1 }
  caption: "Save the game to a file, then load it in a new run"
  say: "Here the game is saved to a file, and loaded again in a new run."
  pacing: { keyDelayMs: 8, afterActionMs: 250 }
  clip:
    - caption:
        text: "Take the lamp, then save."
        say: "Take the lamp, then save."
    - type: { selector: ".con-in", text: "take lamp" }
    - press: Enter
    - type: { selector: ".con-in", text: "save" }
    - press: Enter
    - type: { selector: ".con-in", text: "quit" }
    - press: Enter
    - expect: { selector: "#output", contains: "Saved." }
    - caption:
        text: "The save is a file, game.json, kept in this browser."
        say: "The save is a file called game dot json, kept in this browser."
    - click: { selector: "#view-files" }
    - wait: 1000
    - click: { selector: "#view-console" }
    - caption:
        text: "A new run starts with an empty bag, until you load."
        say: "A new run starts with an empty bag, until you load."
    - click: Run
    - type: { selector: ".con-in", text: "bag" }
    - press: Enter
    - type: { selector: ".con-in", text: "load" }
    - press: Enter
    - type: { selector: ".con-in", text: "bag" }
    - press: Enter
    - expect: { selector: "#output", contains: "You carry: lamp" }
    - wait: 1200
---
Your adventure forgets everything when the program stops. To carry on later, a program **writes** what it needs to a **file**, and **reads** it back next time. This lesson's playground keeps files in your browser, like files on a computer: they are still there after you close the page. The **Files** tab shows them.

## Predict

```step
stage: predict
code: save.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["garden", "kitchengarden", "kitchen", "An error: note.txt already exists"]
  actual: "garden. Opening a file with \"w\" empties it first, so the second write replaces kitchen. Reading it back gives only garden."
```

`open("note.txt", "w")` opens a file for **w**riting; `open("note.txt")` opens it for reading. The file is written twice, then read. What is in it at the end?

## Run

```step
stage: run
code: save.py#run
try: { playground: python, starter: "save.py#run", height: 440 }
check: { type: reflect, text: "I ran it three times, and once after reloading the page, and it remembered me." }
unlocks: [write-a-file, read-a-file, save-with-json, load-with-json, a-missing-file]
```

Run it, type your name, then run it again, and again. Reload the page and run it once more. Then open the **Files** tab and look inside `me.json`. Delete the file there, and run it again.

## Investigate

```step
stage: investigate
code: save.py#run
insight: "A file outlives the program: json.dump writes a dictionary as text, json.load reads it back as a dictionary, and FileNotFoundError says there is no file yet."
tasks:
  - check:
      type: question
      q: "The very first time it runs, why does the except part run?"
      options: ["There is no me.json yet, so open() causes a FileNotFoundError", "json.load() cannot read names", "The visits are 0", "input() always goes to except the first time"]
      answer: 0
      explain: "Opening a file that is not there causes a FileNotFoundError. except FileNotFoundError: is the first-time path: ask the name and start counting."
  - check:
      type: question
      q: "What does me.json hold after Ada's second run?"
      options: ["{\"name\": \"Ada\", \"visits\": 2}", "Ada 2", "Welcome back, Ada. This is visit 2.", "{\"name\": \"Ada\", \"visits\": 1}"]
      answer: 0
      explain: "json.dump writes the dictionary as JSON text, which looks almost exactly like a Python dictionary. The last lines write it again after every run, with the new count."
  - check:
      type: question
      q: "After me = json.load(f), what is me?"
      options: ["A dictionary, so me[\"name\"] works", "The text of the file, one string", "A list of lines", "The file itself"]
      answer: 0
      explain: "json.load turns the JSON text back into the dictionary that was saved, so you use it exactly as before: me[\"name\"], me[\"visits\"]."
  - check:
      type: bug
      code: save.py#bug
      text: "This should welcome Ada back, but it stops with an error, and afterwards me.json is empty. Click the line that is wrong."
      answer: 2
      fault: runtime
      misconception: open-w-reads
      explain: "\"w\" empties the file straight away, ready to write: it cannot read. To read, open it without \"w\": open(\"me.json\")."
```

### The first run

Where the program goes when there is no file.

### Inside the file

What `json.dump` wrote. Look in the **Files** tab to check.

### Reading it back

What `json.load` gives you.

### Spot the bug

A program that wipes its own save.

## Milestone 1: save

```step
stage: modify
insight: "Saving the game means writing everything that changes during play (here, bag and things) to one file."
try: { playground: python, starter: "save.py#m1", height: 520 }
check: { type: code, text: "save writes here, bag and things to game.json with json.dump.", rules: { contains: ["json.dump(", "open(\"game.json\", \"w\")"] } }
```

This is the adventure from the last lesson, with `import json` at the top. Where the comment says **Milestone 1**, add a `save` command:

1. Put everything that changes during play in one dictionary: `game = {"here": here, "bag": bag, "things": things}`.
2. Open `game.json` with `"w"` and `json.dump(game, f)`, then print `Saved.`

Test: take the lamp, `save`, then look in the **Files** tab.

## Milestone 2: load

```step
stage: modify
insight: "Loading reads the file back and puts each value where the game keeps it; a missing file is caught, not a crash."
try: { playground: python, starter: "save.py#m2", height: 520 }
check: { type: code, text: "load reads game.json with json.load and sets here, bag and things, and says so if there is no save yet.", rules: { contains: ["json.load(", "except FileNotFoundError"] } }
```

`save` works in this version. Where the comment says **Milestone 2**, add a `load` command: open `game.json`, `game = json.load(f)`, then set `here`, `bag` and `things` from `game`, and print the room. If there is no file yet, catch `FileNotFoundError` and say there is no saved game.

Test it properly: take something, `save`, `quit`, **reload the page**, run again, `load`, `bag`.

## Make: carry on where you left off

```step
stage: make
insight: "Goals only: the game uses its save file without being asked, plus a change of your own."
try: { playground: python, starter: "save.py#m3", height: 520 }
tasks:
  - hint:
      - "Before the loop, try to open game.json. If it is there, ask whether to load it."
      - "except FileNotFoundError: is a new game, so just print the first room."
    check: { type: reflect, text: "When the game starts, it offers to load a saved game, and starts a new one if there is none." }
  - check: { type: reflect, text: "I added a change of my own and tested it with a reload, such as saving on quit or saving the number of moves." }
```

### Offer to load

When the game starts and there is a save, ask whether to load it. With no save, start a new game.

### Your own touch

Some ideas: save automatically when the player types `quit`; count the moves and save them too; keep the best (fewest) moves in a second file.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A friend opens your game on their own computer. Will your saved game be there?"
  options: ["No: the file is on the device that saved it (here, in your browser)", "Yes: files go with the program", "Yes: json.dump sends it online", "Only if they type load"]
  answer: 0
  explain: "A file lives where it was written. To share a save, the file itself has to be copied or uploaded, which is what cloud saves do."
```

Files are how programs remember: games save progress, apps keep settings, and data is shared as files (JSON, and the CSV tables in Data detective). The same `open()`, `json.dump` and `json.load` work in Python on any computer; there the files go in the folder the program runs in.
