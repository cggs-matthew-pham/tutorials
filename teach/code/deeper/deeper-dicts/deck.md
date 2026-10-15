---
marp: true
theme: default
html: true
---

# A map of rooms

Deeper Python in the console · Lists and dictionaries

<!-- Speaker note: Students store a map in dictionaries (rooms by name, and each room's exits), look values up by key, check keys with in, use a dictionary inside a dictionary, and count words with a dictionary. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** store rooms and exits in dictionaries, look things up by name, put a dictionary inside a dictionary, and count words.

- I can make a dictionary and look up a value by its key.
- I can check whether a key is in a dictionary before looking it up.
- I can use a dictionary to count things.

<!-- Speaker note: Before class: Read the unit primer first. A dictionary pairs keys with values: `{"north": "kitchen"}`; `exits["north"]` looks up the value. Keys must match exactly (the bug task: `"Hall"` is not `"hall"`, so KeyError). `"west" in exits` checks for a key. `exits[here]` is itself a dictionary, so `exits[here]["north"]` looks up twice. `", ".join(exits[here])` joins the keys. Counting with a dictionary (the Make task) is a classic pattern: a new key starts at 1, an existing one goes up by 1. Teacher: Bug task: ask what Hall and hall have in common, and what Python thinks. -->

---

## Why it matters

> A phone's contacts, a dictionary app and a game's map all do the same thing: look something up by its name.

<!-- Speaker note: A list finds things by place: `words[0]`. A **dictionary** finds things by name: `exits["north"]` is wherever north leads. The adventure keeps its rooms in one dictionary and its exits in another. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
exits = {"north": "kitchen", "east": "garden"}
print(exits["north"])
print("west" in exits)
```

**What is the first line it prints?**

- kitchen
- {'north': 'kitchen'}
- garden
- north

<!-- Speaker note: What happens: kitchen: the value stored under the key "north". The second line is False, because "west" is not a key. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw the dictionary as a two-column table, key and value. -->

<style scoped>pre, marp-pre { font-size: 0.81em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=rooms+%3D+%7B%0A++++%22hall%22%3A+%22A+long+hall+with+a+creaky+floor.%22%2C%0A++++%22kitchen%22%3A+%22A+kitchen+that+smells+of+toast.%22%2C%0A++++%22garden%22%3A+%22A+garden+full+of+tall+grass.%22%2C%0A%7D%0Aexits+%3D+%7B%0A++++%22hall%22%3A+%7B%22north%22%3A+%22kitchen%22%2C+%22east%22%3A+%22garden%22%7D%2C%0A++++%22kitchen%22%3A+%7B%22south%22%3A+%22hall%22%7D%2C%0A++++%22garden%22%3A+%7B%22west%22%3A+%22hall%22%7D%2C%0A%7D%0Ahere+%3D+%22hall%22%0Awhile+True%3A%0A++++print%28rooms%5Bhere%5D%29%0A++++print%28%22Exits%3A+%22+%2B+%22%2C+%22.join%28exits%5Bhere%5D%29%29%0A++++command+%3D+input%28%22%3E+%22%29.strip%28%29.lower%28%29%0A++++words+%3D+command.split%28%29%0A++++if+command+%3D%3D+%22quit%22%3A%0A++++++++break%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22go%22%3A%0A++++++++if+words%5B1%5D+in+exits%5Bhere%5D%3A%0A++++++++++++here+%3D+exits%5Bhere%5D%5Bwords%5B1%5D%5D%0A++++++++else%3A%0A++++++++++++print%28%22You+can%27t+go+that+way.%22%29%0A++++else%3A%0A++++++++print%28%22Try%3A+go+north%2C+or+quit%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-dicts/?full=step-2#step-2)

<!-- Speaker note: Walk around: `go north`, `go south`, `go east`, `go west`, then `quit`. `rooms` maps each room's name to its description. `exits` maps each room's name to **another dictionary** of its exits, so `exits[here]["north"]` is where north leads from here. Students should be able to say: I can explain how the program finds where go north leads. -->

<!-- Speaker note: Teacher: draw the map (hall in the middle, kitchen north, garden east) and walk it with the class. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* kitchen: the value stored under the key "north". The second line is False, because "west" is not a key.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: Dictionaries look things up by name, and a dictionary of dictionaries is a map: from here, which way leads where. -->

<!-- Speaker note: Teacher: read exits["hall"]["east"] in two steps: the hall's exits, then east. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A dictionary in a dictionary

**What is exits["hall"]["east"]?**

- "kitchen"
- "garden"
- "hall"
- {"north": "kitchen", "east": "garden"}

* Answer: "garden"

<!-- Speaker note: exits["hall"] is the hall's own exits dictionary; ["east"] looks up east in it: the garden. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A wall

**You are in the kitchen and type go west. What happens?**

- It stops with an error
- It prints You can't go that way.
- You go to the garden
- You go back to the hall

* Answer: It prints You can't go that way.

<!-- Speaker note: "west" in exits["kitchen"] is False (the kitchen only has south), so the else replies instead of looking it up. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This stops with KeyError: Hall. Click the line that causes it.**

```
 1  rooms = {"hall": "A long hall.", "kitchen": "A warm kitchen."}
 2  here = "Hall"
 3  print(rooms[here])
```

* Answer: line 2

<!-- Speaker note: Keys must match exactly: the room is "hall", but here is "Hall" with a capital. Dictionaries do not guess. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **An attic:** Add an **attic**, reached by `go up` from the hall (and `go down` back).
- **Count the moves:** Count each move, and say how many when the player quits.

<!-- Speaker note: What this step is for: A new room is one entry in rooms and one in exits; the loop that walks around needs no change. Hints, in order: Add "attic": "..." to rooms, and "attic": {"down": "hall"} to exits. / Then add "up": "attic" to the hall's exits. / Start moves = 0 before the loop, add moves += 1 when the player moves, and print it when they quit. For students who need more support: Give students the loop over the words and the if, and ask them to fill in the two lines that count. For early finishers: Put things in rooms (a dictionary from room to a list of things) and let the player take them into last lesson's bag. The hard part, on purpose: A dictionary of dictionaries: two lookups in one line. Have them say each step aloud (which room, then which way) before writing rooms[here][way]. When students get stuck: KeyError: ... Ask: Is the key spelled exactly as it was stored, capitals included? Fix: Tidy text before using it as a key (lower()), or check with in first. / The new room cannot be reached. Ask: Which room's exits lead to it? Fix: Add it to another room's exits as well as to rooms and exits. / The word counter crashes on the first word (KeyError). Ask: What is counts[word] before that word has been seen? Fix: If the word is not in counts yet, set it to 1; otherwise add 1. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=rooms+%3D+%7B%0A++++%22hall%22%3A+%22A+long+hall+with+a+creaky+floor.%22%2C%0A++++%22kitchen%22%3A+%22A+kitchen+that+smells+of+toast.%22%2C%0A++++%22garden%22%3A+%22A+garden+full+of+tall+grass.%22%2C%0A%7D%0Aexits+%3D+%7B%0A++++%22hall%22%3A+%7B%22north%22%3A+%22kitchen%22%2C+%22east%22%3A+%22garden%22%7D%2C%0A++++%22kitchen%22%3A+%7B%22south%22%3A+%22hall%22%7D%2C%0A++++%22garden%22%3A+%7B%22west%22%3A+%22hall%22%7D%2C%0A%7D%0Ahere+%3D+%22hall%22%0Awhile+True%3A%0A++++print%28rooms%5Bhere%5D%29%0A++++print%28%22Exits%3A+%22+%2B+%22%2C+%22.join%28exits%5Bhere%5D%29%29%0A++++command+%3D+input%28%22%3E+%22%29.strip%28%29.lower%28%29%0A++++words+%3D+command.split%28%29%0A++++if+command+%3D%3D+%22quit%22%3A%0A++++++++break%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22go%22%3A%0A++++++++if+words%5B1%5D+in+exits%5Bhere%5D%3A%0A++++++++++++here+%3D+exits%5Bhere%5D%5Bwords%5B1%5D%5D%0A++++++++else%3A%0A++++++++++++print%28%22You+can%27t+go+that+way.%22%29%0A++++else%3A%0A++++++++print%28%22Try%3A+go+north%2C+or+quit%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-dicts/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make a word counter

Ask for a **sentence** and print how many times each word appears, such as `the: 3`. Start with an empty dictionary, `counts = {}`. For each word: if it is already a key, add 1; if not, set it to 1. Tidy the sentence first so that `The` and `the` count as the same word.

<!-- Speaker note: What this step is for: A dictionary can count: each new key starts at 1, and a key already there goes up by one. -->

<!-- Speaker note: Teacher: act it out with words on cards. A new word gets a tally of 1; a word seen before gets another tally. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make a word counter

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=%23+Count+the+words%3A+ask+for+a+sentence%2C+then+print+how+many+times+each+word+appears.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-dicts/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

You now have the parts of a text adventure: a command parser, a bag and a map. Still to come in this course: handling errors with `try`, saving and loading a game in a file, and the adventure itself.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**ages = {"Ada": 12}. What do ages["Ada"] and "Bo" in ages give?**

* 12, and False: Bo is not a key.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This completes the lessons that run in the turtle playground. Still to come: errors with try, saving the game to a file, and the text adventure, which joins the parser, the bag and the map. Data detective uses lists of dictionaries for real data. -->
