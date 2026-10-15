---
title: "Save the game"
subtitle: "Deeper Python in the console · Errors and the adventure · Lesson 6"
---

# Save the game

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every game that lets you carry on tomorrow writes its world to a file, and reads it back when you return.


:::teacher-note

**In one sentence:** Students write and read a file, save a dictionary with json, catch FileNotFoundError for a first run, then add save and load commands to their text adventure and test that a save survives a page reload.

**Students should be able to say:** I can write text to a file and read it back. I can save a dictionary with json.dump and load it with json.load. I can catch FileNotFoundError when there is no file yet.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`open("note.txt", "w")` opens a file for **w**riting; `open("note.txt")` opens it for reading. The file is written twice, then read. What is in it at the end?

```python
with open("note.txt", "w") as f:
    f.write("kitchen")
with open("note.txt", "w") as f:
    f.write("garden")
with open("note.txt") as f:
    print(f.read())
```

:::keep-together

**What does it print?**

☐ kitchen

☐ An error: note.txt already exists

☐ garden

☐ kitchengarden

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** garden. Opening a file with "w" empties it first, so the second write replaces kitchen. Reading it back gives only garden.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### The first run

**The very first time it runs, why does the except part run?**

☐ input() always goes to except the first time

☐ The visits are 0

☐ There is no me.json yet, so open() causes a FileNotFoundError

☐ json.load() cannot read names

:::


:::teacher-note

**Answer:** There is no me.json yet, so open() causes a FileNotFoundError

Opening a file that is not there causes a FileNotFoundError. except FileNotFoundError: is the first-time path: ask the name and start counting.

:::


:::keep-together

### Inside the file

**What does me.json hold after Ada's second run?**

☐ Ada 2

☐ {"name": "Ada", "visits": 2}

☐ {"name": "Ada", "visits": 1}

☐ Welcome back, Ada. This is visit 2.

:::


:::teacher-note

**Answer:** {"name": "Ada", "visits": 2}

json.dump writes the dictionary as JSON text, which looks almost exactly like a Python dictionary. The last lines write it again after every run, with the new count.

:::


:::keep-together

### Reading it back

**After me = json.load(f), what is me?**

☐ A dictionary, so me["name"] works

☐ The file itself

☐ The text of the file, one string

☐ A list of lines

:::


:::teacher-note

**Answer:** A dictionary, so me["name"] works

json.load turns the JSON text back into the dictionary that was saved, so you use it exactly as before: me["name"], me["visits"].

:::


:::keep-together

### Spot the bug

**This should welcome Ada back, but it stops with an error, and afterwards me.json is empty. Click the line that is wrong.**

```
 1  import json
 2  with open("me.json", "w") as f:
 3      me = json.load(f)
 4  print("Welcome back, " + me["name"])
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

"w" empties the file straight away, ready to write: it cannot read. To read, open it without "w": open("me.json").

:::


:::typical

## Milestone 1: save

This is the adventure from the last lesson, with `import json` at the top. Where the comment says **Milestone 1**, add a `save` command:

1. Put everything that changes during play in one dictionary: `game = {"here": here, "bag": bag, "things": things}`.
2. Open `game.json` with `"w"` and `json.dump(game, f)`, then print `Saved.`

Test: take the lamp, `save`, then look in the **Files** tab.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import json

rooms = {
    "hall": "A long hall with a creaky floor.",
    "kitchen": "A kitchen that smells of toast.",
    "garden": "A garden full of tall grass. A locked shed stands to the east.",
    "shed": "A dusty shed. Something glints in the corner.",
}
exits = {
    "hall": {"north": "kitchen", "east": "garden"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall", "east": "shed"},
    "shed": {"west": "garden"},
}
things = {
    "hall": ["lamp"],
    "kitchen": ["key"],
    "garden": [],
    "shed": ["crown"],
}
bag = []
here = "hall"
print(rooms[here])
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "look":
        print(rooms[here])
        print("Exits: " + ", ".join(exits[here]))
        if len(things[here]) > 0:
            print("You see: " + ", ".join(things[here]))
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            if exits[here][words[1]] == "shed" and "key" not in bag:
                print("The shed is locked.")
            else:
                here = exits[here][words[1]]
                print(rooms[here])
        else:
            print("You can't go that way.")
    elif len(words) == 2 and words[0] == "take":
        if words[1] in things[here]:
            things[here].remove(words[1])
            bag.append(words[1])
            print("You take the " + words[1] + ".")
        else:
            print("There is no " + words[1] + " here.")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            things[here].append(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    elif command == "save":
        game = {"here": here, "bag": bag, "things": things}
        with open("game.json", "w") as f:
            json.dump(game, f)
        print("Saved.")
    else:
        print("Try: look, go north, take lamp, drop lamp, bag, save, load or quit")
    if "crown" in bag:
        print("You found the crown. You win!")
        break
```

:::

:::


:::typical

## Milestone 2: load

`save` works in this version. Where the comment says **Milestone 2**, add a `load` command: open `game.json`, `game = json.load(f)`, then set `here`, `bag` and `things` from `game`, and print the room. If there is no file yet, catch `FileNotFoundError` and say there is no saved game.

Test it properly: take something, `save`, `quit`, **reload the page**, run again, `load`, `bag`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import json

rooms = {
    "hall": "A long hall with a creaky floor.",
    "kitchen": "A kitchen that smells of toast.",
    "garden": "A garden full of tall grass. A locked shed stands to the east.",
    "shed": "A dusty shed. Something glints in the corner.",
}
exits = {
    "hall": {"north": "kitchen", "east": "garden"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall", "east": "shed"},
    "shed": {"west": "garden"},
}
things = {
    "hall": ["lamp"],
    "kitchen": ["key"],
    "garden": [],
    "shed": ["crown"],
}
bag = []
here = "hall"
print(rooms[here])
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "look":
        print(rooms[here])
        print("Exits: " + ", ".join(exits[here]))
        if len(things[here]) > 0:
            print("You see: " + ", ".join(things[here]))
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            if exits[here][words[1]] == "shed" and "key" not in bag:
                print("The shed is locked.")
            else:
                here = exits[here][words[1]]
                print(rooms[here])
        else:
            print("You can't go that way.")
    elif len(words) == 2 and words[0] == "take":
        if words[1] in things[here]:
            things[here].remove(words[1])
            bag.append(words[1])
            print("You take the " + words[1] + ".")
        else:
            print("There is no " + words[1] + " here.")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            things[here].append(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    elif command == "save":
        game = {"here": here, "bag": bag, "things": things}
        with open("game.json", "w") as f:
            json.dump(game, f)
        print("Saved.")
    elif command == "load":
        try:
            with open("game.json") as f:
                game = json.load(f)
            here = game["here"]
            bag = game["bag"]
            things = game["things"]
            print("Loaded.")
            print(rooms[here])
        except FileNotFoundError:
            print("There is no saved game yet.")
    else:
        print("Try: look, go north, take lamp, drop lamp, bag, save, load or quit")
    if "crown" in bag:
        print("You found the crown. You win!")
        break
```

:::

:::


## Make: carry on where you left off


**Offer to load.** When the game starts and there is a save, ask whether to load it. With no save, start a new game.

**Your own touch.** Some ideas: save automatically when the player types `quit`; count the moves and save them too; keep the best (fewest) moves in a second file.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}


:::wider

## Where this leads

Files are how programs remember: games save progress, apps keep settings, and data is shared as files (JSON, and the CSV tables in Data detective). The same `open()`, `json.dump` and `json.load` work in Python on any computer; there the files go in the folder the program runs in.

:::


## Exit ticket

:::keep-together

**Why does the game save things as well as here and bag?**

{{lines-3}}

:::


:::teacher-note

**Answer:** things changes during play (taking moves an item out of a room), so without it a loaded game would put the item back in the room as well as in the bag.

:::

