---
marp: true
theme: default
html: true
---

# Save the game

Deeper Python in the console · Errors and the adventure

<!-- Speaker note: Students write and read a file, save a dictionary with json, catch FileNotFoundError for a first run, then add save and load commands to their text adventure and test that a save survives a page reload. About 50 minutes (Predict and Run 10 min · Investigate 10 min · Milestone 1 10 min · Milestone 2 10 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** write the game to a file with json, read it back next time, and catch the error when there is no file yet.

- I can write text to a file and read it back.
- I can save a dictionary with json.dump and load it with json.load.
- I can catch FileNotFoundError when there is no file yet.

<!-- Speaker note: Before class: Read the unit primer first. This lesson runs in the **Python playground** (real Python in the browser, Pyodide), not the turtle playground: it has real files. The first load takes a few seconds; before teaching it, open the site's Check your school page once on a student device at school. A student's files are kept in their browser for this course and listed in the **Files** tab, where they can be read and deleted; they survive closing the page, but not clearing the browser's data, and they do not follow a student to another device. `open(name, "w")` empties the file first (the Predict and the bug task); `open(name)` reads. `with` closes the file when its block ends. `json.dump(data, f)` writes a dictionary or list as JSON text, and `json.load(f)` gives the same dictionary back. Opening a missing file causes `FileNotFoundError`, caught exactly like the errors in Lesson 4. The game saves `here`, `bag` and `things` (everything that changes during play): saving only `here` and `bag` would let a player take the key twice. Teacher: Milestone 1: ask what changes during play. Everything that changes must be saved. Teacher: Milestone 2: test with a reload, not just a second command. Pair students: one saves, the other reloads and loads. -->

---

## Why it matters

> Every game that lets you carry on tomorrow writes its world to a file, and reads it back when you return.

<!-- Speaker note: Your adventure forgets everything when the program stops. To carry on later, a program **writes** what it needs to a **file**, and **reads** it back next time. This lesson's playground keeps files in your browser, like files on a computer: they are still there after you close the page. The **Files** tab shows them. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
with open("note.txt", "w") as f:
    f.write("kitchen")
with open("note.txt", "w") as f:
    f.write("garden")
with open("note.txt") as f:
    print(f.read())
```

**What does it print?**

- kitchen
- An error: note.txt already exists
- garden
- kitchengarden

<!-- Speaker note: What happens: garden. Opening a file with "w" empties it first, so the second write replaces kitchen. Reading it back gives only garden. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: write kitchen then garden on two sticky notes; the second "w" throws the first note away. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* garden. Opening a file with "w" empties it first, so the second write replaces kitchen. Reading it back gives only garden.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/deeper/deeper-save/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/deeper/deeper-save/?full=step-2#step-2)

<!-- Speaker note: Run it, type your name, then run it again, and again. Reload the page and run it once more. Then open the **Files** tab and look inside `me.json`. Delete the file there, and run it again. Students should be able to say: I ran it three times, and once after reloading the page, and it remembered me. -->

<!-- Speaker note: Teacher: have students reload the page between runs. The point is that the file outlives the program. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
import json

try:
    with open("me.json") as f:
        me = json.load(f)
    me["visits"] = me["visits"] + 1
    print("Welcome back, " + me["name"] + ". This is visit " + str(me["visits"]) + ".")
except FileNotFoundError:
    name = input("What is your name? ")
    me = {"name": name, "visits": 1}
    print("Nice to meet you, " + name + ". Run me again.")

with open("me.json", "w") as f:
    json.dump(me, f)
```

<!-- Speaker note: What this step is for: A file outlives the program: json.dump writes a dictionary as text, json.load reads it back as a dictionary, and FileNotFoundError says there is no file yet. -->

<!-- Speaker note: Teacher: open the Files tab and compare me.json with the dictionary in the code. -->

<style scoped>pre, marp-pre { font-size: 0.73em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The first run

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import json

try:
    with open("me.json") as f:
        me = json.load(f)
    me["visits"] = me["visits"] + 1
    print("Welcome back, " + me["name"] + ". This is visit " + str(me["visits"]) + ".")
except FileNotFoundError:
    name = input("What is your name? ")
    me = {"name": name, "visits": 1}
    print("Nice to meet you, " + name + ". Run me again.")

with open("me.json", "w") as f:
    json.dump(me, f)
```

</div>
<div>

**The very first time it runs, why does the except part run?**

- input() always goes to except the first time
- The visits are 0
- There is no me.json yet, so open() causes a FileNotFoundError
- json.load() cannot read names

* Answer: There is no me.json yet, so open() causes a FileNotFoundError

</div>
</div>

<!-- Speaker note: Opening a file that is not there causes a FileNotFoundError. except FileNotFoundError: is the first-time path: ask the name and start counting. -->

<style scoped>section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Inside the file

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import json

try:
    with open("me.json") as f:
        me = json.load(f)
    me["visits"] = me["visits"] + 1
    print("Welcome back, " + me["name"] + ". This is visit " + str(me["visits"]) + ".")
except FileNotFoundError:
    name = input("What is your name? ")
    me = {"name": name, "visits": 1}
    print("Nice to meet you, " + name + ". Run me again.")

with open("me.json", "w") as f:
    json.dump(me, f)
```

</div>
<div>

**What does me.json hold after Ada's second run?**

- Ada 2
- {"name": "Ada", "visits": 2}
- {"name": "Ada", "visits": 1}
- Welcome back, Ada. This is visit 2.

* Answer: {"name": "Ada", "visits": 2}

</div>
</div>

<!-- Speaker note: json.dump writes the dictionary as JSON text, which looks almost exactly like a Python dictionary. The last lines write it again after every run, with the new count. -->

<style scoped>section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Reading it back

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import json

try:
    with open("me.json") as f:
        me = json.load(f)
    me["visits"] = me["visits"] + 1
    print("Welcome back, " + me["name"] + ". This is visit " + str(me["visits"]) + ".")
except FileNotFoundError:
    name = input("What is your name? ")
    me = {"name": name, "visits": 1}
    print("Nice to meet you, " + name + ". Run me again.")

with open("me.json", "w") as f:
    json.dump(me, f)
```

</div>
<div>

**After me = json.load(f), what is me?**

- A dictionary, so me["name"] works
- The file itself
- The text of the file, one string
- A list of lines

* Answer: A dictionary, so me["name"] works

</div>
</div>

<!-- Speaker note: json.load turns the JSON text back into the dictionary that was saved, so you use it exactly as before: me["name"], me["visits"]. -->

<style scoped>section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should welcome Ada back, but it stops with an error, and afterwards me.json is empty. Click the line that is wrong.**

```
 1  import json
 2  with open("me.json", "w") as f:
 3      me = json.load(f)
 4  print("Welcome back, " + me["name"])
```

* Answer: line 2

<!-- Speaker note: "w" empties the file straight away, ready to write: it cannot read. To read, open it without "w": open("me.json"). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: save

This is the adventure from the last lesson, with `import json` at the top. Where the comment says **Milestone 1**, add a `save` command:

1. Put everything that changes during play in one dictionary: `game = {"here": here, "bag": bag, "things": things}`.
2. Open `game.json` with `"w"` and `json.dump(game, f)`, then print `Saved.`

Test: take the lamp, `save`, then look in the **Files** tab.

[Open this step](https://tutorials.learningwaypoints.com/code/deeper/deeper-save/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Saving the game means writing everything that changes during play (here, bag and things) to one file. For students who need more support: Give students the save branch written out and ask them to write load by mirroring it, with json.load instead of json.dump. For early finishers: Keep a best score in a second file (fewest moves to win), and only replace it when a new game beats it. The hard part, on purpose: Milestone 2 is the hard part: putting the loaded values back into here, bag and things. When students are stuck, ask them to say aloud what game holds after json.load, before giving any code. When students get stuck: FileNotFoundError when they load. Ask: Did you save first, in this course's playground? Fix: Save first, or catch FileNotFoundError and say there is no saved game. / The save file is empty, or json.load says the file is not valid JSON. Ask: Which open() has "w" in it? Fix: Read with open("game.json"), not "w": "w" empties the file. Delete the broken file in the Files tab and save again. / After load, the key is back in the kitchen as well as in the bag. Ask: What else changes during play, apart from here and bag? Fix: Save and load things too. / load says Loaded. but nothing changed. Ask: Did you set here, bag and things from game, or only read the file? Fix: here = game["here"], and the same for bag and things. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: load

`save` works in this version. Where the comment says **Milestone 2**, add a `load` command: open `game.json`, `game = json.load(f)`, then set `here`, `bag` and `things` from `game`, and print the room. If there is no file yet, catch `FileNotFoundError` and say there is no saved game.

Test it properly: take something, `save`, `quit`, **reload the page**, run again, `load`, `bag`.

[Open this step](https://tutorials.learningwaypoints.com/code/deeper/deeper-save/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Loading reads the file back and puts each value where the game keeps it; a missing file is caught, not a crash. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: carry on where you left off



- **Offer to load:** When the game starts and there is a save, ask whether to load it. With no save, start a new game.
- **Your own touch:** Some ideas: save automatically when the player types `quit`; count the moves and save them too; keep the best (fewest) moves in a second file.

[Open this step](https://tutorials.learningwaypoints.com/code/deeper/deeper-save/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Goals only: the game uses its save file without being asked, plus a change of your own. Hints, in order: Before the loop, try to open game.json. If it is there, ask whether to load it. / except FileNotFoundError: is a new game, so just print the first room. -->

---

## Where this leads

Files are how programs remember: games save progress, apps keep settings, and data is shared as files (JSON, and the CSV tables in Data detective). The same `open()`, `json.dump` and `json.load` work in Python on any computer; there the files go in the folder the program runs in.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does the game save things as well as here and bag?**

* things changes during play (taking moves an item out of a room), so without it a loaded game would put the item back in the room as well as in the bag.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Data detective reads data files (CSV and JSON) the same way. Web apps later store what users type in a file, then in a database. -->
