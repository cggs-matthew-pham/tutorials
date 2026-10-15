---
title: "A map of rooms"
subtitle: "Deeper Python in the console · Lists and dictionaries · Lesson 3"
---

# A map of rooms

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A phone's contacts, a dictionary app and a game's map all do the same thing: look something up by its name.


:::teacher-note

**In one sentence:** Students store a map in dictionaries (rooms by name, and each room's exits), look values up by key, check keys with in, use a dictionary inside a dictionary, and count words with a dictionary.

**Students should be able to say:** I can make a dictionary and look up a value by its key. I can check whether a key is in a dictionary before looking it up. I can use a dictionary to count things.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`{"north": "kitchen", "east": "garden"}` pairs each **key** with a **value**. `exits["north"]` looks up the value for that key. What does it print?

```python
exits = {"north": "kitchen", "east": "garden"}
print(exits["north"])
print("west" in exits)
```

:::keep-together

**What is the first line it prints?**

☐ kitchen

☐ {'north': 'kitchen'}

☐ garden

☐ north

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** kitchen: the value stored under the key "north". The second line is False, because "west" is not a key.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
rooms = {
    "hall": "A long hall with a creaky floor.",
    "kitchen": "A kitchen that smells of toast.",
    "garden": "A garden full of tall grass.",
}
exits = {
    "hall": {"north": "kitchen", "east": "garden"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall"},
}
here = "hall"
while True:
    print(rooms[here])
    print("Exits: " + ", ".join(exits[here]))
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            here = exits[here][words[1]]
        else:
            print("You can't go that way.")
    else:
        print("Try: go north, or quit")
```

:::keep-together

### A dictionary in a dictionary

**What is exits["hall"]["east"]?**

☐ "kitchen"

☐ "garden"

☐ "hall"

☐ {"north": "kitchen", "east": "garden"}

:::


:::teacher-note

**Answer:** "garden"

exits["hall"] is the hall's own exits dictionary; ["east"] looks up east in it: the garden.

:::


:::keep-together

### A wall

**You are in the kitchen and type go west. What happens?**

☐ It stops with an error

☐ It prints You can't go that way.

☐ You go to the garden

☐ You go back to the hall

:::


:::teacher-note

**Answer:** It prints You can't go that way.

"west" in exits["kitchen"] is False (the kitchen only has south), so the else replies instead of looking it up.

:::


:::keep-together

### Spot the bug

**This stops with KeyError: Hall. Click the line that causes it.**

```
 1  rooms = {"hall": "A long hall.", "kitchen": "A warm kitchen."}
 2  here = "Hall"
 3  print(rooms[here])
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Keys must match exactly: the room is "hall", but here is "Hall" with a capital. Dictionaries do not guess.

:::


:::typical

## Modify


**An attic.** Add an **attic**, reached by `go up` from the hall (and `go down` back).

**Count the moves.** Count each move, and say how many when the player quits.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**An attic:**

```python
rooms = {
    "hall": "A long hall with a creaky floor.",
    "kitchen": "A kitchen that smells of toast.",
    "garden": "A garden full of tall grass.",
    "attic": "A dusty attic full of old boxes.",
}
exits = {
    "hall": {"north": "kitchen", "east": "garden", "up": "attic"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall"},
    "attic": {"down": "hall"},
}
here = "hall"
while True:
    print(rooms[here])
    print("Exits: " + ", ".join(exits[here]))
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            here = exits[here][words[1]]
        else:
            print("You can't go that way.")
    else:
        print("Try: go north, or quit")
```

**Count the moves:**

```python
rooms = {
    "hall": "A long hall with a creaky floor.",
    "kitchen": "A kitchen that smells of toast.",
    "garden": "A garden full of tall grass.",
}
exits = {
    "hall": {"north": "kitchen", "east": "garden"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall"},
}
here = "hall"
moves = 0
while True:
    print(rooms[here])
    print("Exits: " + ", ".join(exits[here]))
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        print("You made " + str(moves) + " moves.")
        break
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            here = exits[here][words[1]]
            moves += 1
        else:
            print("You can't go that way.")
    else:
        print("Try: go north, or quit")
```

:::

:::


## Make a word counter

Ask for a **sentence** and print how many times each word appears, such as `the: 3`. Start with an empty dictionary, `counts = {}`. For each word: if it is already a key, add 1; if not, set it to 1. Tidy the sentence first so that `The` and `the` count as the same word.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
sentence = input("Type a sentence: ").strip().lower()
counts = {}
for word in sentence.split():
    if word in counts:
        counts[word] += 1
    else:
        counts[word] = 1
for word in counts:
    print(word + ": " + str(counts[word]))
```

:::


:::wider

## Where this leads

You now have the parts of a text adventure: a command parser, a bag and a map. Still to come in this course: handling errors with `try`, saving and loading a game in a file, and the adventure itself.

:::


## Exit ticket

:::keep-together

**ages = {"Ada": 12}. What do ages["Ada"] and "Bo" in ages give?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 12, and False: Bo is not a key.

:::

