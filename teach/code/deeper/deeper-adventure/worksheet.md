---
title: "A text adventure"
subtitle: "Deeper Python in the console · Errors and the adventure · Lesson 5"
---

# A text adventure

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Text adventures were among the first computer games, and the same pieces (a parser, an inventory, a map) still sit under every game.


:::teacher-note

**In one sentence:** Students combine the parser, the bag and the map into a text adventure in three milestones (take and drop, a locked shed, a win plus a change of their own), each starting from a working game.

**Students should be able to say:** I can combine lists, dictionaries and a command loop into one program. I can add a rule to a game as one check in the right place. I can extend a program with a feature of my own and test it.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Follow the moves through the map, one at a time. A move that is not an exit from the room you are in does nothing.

```python
exits = {
    "hall": {"north": "kitchen", "east": "garden"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall", "east": "shed"},
}
here = "hall"
for move in ["north", "south", "west", "east", "east"]:
    if move in exits[here]:
        here = exits[here][move]
print(here)
```

:::keep-together

**Which room does it print?**

☐ kitchen

☐ garden

☐ shed

☐ hall

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** shed. north to the kitchen, south back to the hall, west is not an exit from the hall (so nothing happens), east to the garden, east again to the shed.

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
things = {
    "hall": ["lamp"],
    "kitchen": ["key"],
    "garden": [],
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
            here = exits[here][words[1]]
            print(rooms[here])
        else:
            print("You can't go that way.")
    # Milestone 1: take and drop go here.
    else:
        print("Try: look, go north, take lamp, drop lamp, bag or quit")
```

:::keep-together

### Where things are

**What is things["kitchen"]?**

☐ The bag

☐ {"south": "hall"}

☐ "A kitchen that smells of toast."

☐ ["key"], the list of things lying in the kitchen

:::


:::teacher-note

**Answer:** ["key"], the list of things lying in the kitchen

things maps each room to a list of what lies there. Taking something moves it from that list to the bag.

:::


:::keep-together

### A new command

**Where would a new command, such as help, go?**

☐ In things

☐ In the rooms dictionary

☐ Before the loop

☐ A new elif branch in the loop

:::


:::teacher-note

**Answer:** A new elif branch in the loop

Each command is one branch: elif command == "help": and what it prints. The else at the end catches anything not understood.

:::


:::typical

## Milestone 1: take and drop

Where the comment says **Milestone 1**, add two branches:

- `take lamp`: if the thing is in `things[here]`, remove it from there and append it to `bag`. If not, say it is not here.
- `drop lamp`: if it is in `bag`, remove it from the bag and append it to `things[here]`. If not, say you do not have it.

Test: take the lamp, carry it to the kitchen, drop it, `look`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

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
things = {
    "hall": ["lamp"],
    "kitchen": ["key"],
    "garden": [],
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
    else:
        print("Try: look, go north, take lamp, drop lamp, bag or quit")
```

:::

:::


:::typical

## Milestone 2: a locked shed

This version adds a **shed** east of the garden, and take and drop work. Where the comment says **Milestone 2**, make the shed locked: if the way leads to `"shed"` and `"key" not in bag` (`not in` is the opposite of `in`), print `The shed is locked.` and stay where you are.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
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
    else:
        print("Try: look, go north, take lamp, drop lamp, bag or quit")
```

:::

:::


## Milestone 3: make it yours


**Win.** The game ends with a win message when the **crown** is in the bag.

**Your own touch.** Add something of your own: a room, a thing to find, a `help` command, a move counter, a second locked door.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Win:**

```python
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
moves = 0
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
                moves += 1
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
    else:
        print("Try: look, go north, take lamp, drop lamp, bag or quit")
    if "crown" in bag:
        print("You found the crown in " + str(moves) + " moves. You win!")
        break
```

:::


:::wider

## Where this leads

Every game, from text adventures to open worlds, is this shape: a loop that reads input, rules that change the world, and the world stored as data. Next in this course: saving and loading the game with a file.

:::


## Exit ticket

:::keep-together

**Which data structure would you use for the things in each room, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** A dictionary from room name to a list: look up the room by name, and the list grows and shrinks as things are taken and dropped.

:::

