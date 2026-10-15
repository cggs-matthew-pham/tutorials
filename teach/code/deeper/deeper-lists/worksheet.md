---
title: "A bag that grows"
subtitle: "Deeper Python in the console · Lists and dictionaries · Lesson 2"
---

# A bag that grows

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A shopping basket, a playlist, a to-do list: all lists that grow and shrink while the program runs.


:::teacher-note

**In one sentence:** Students keep an inventory in a list that grows with append() and shrinks with remove(), check with in before removing, list it with join(), and build a shopping list app.

**Students should be able to say:** I can add to and remove from a list while the program runs. I can check whether something is in a list with in before removing it. I can show a list neatly with join().

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`bag.append("key")` adds to the end of the list; `bag.remove("map")` takes that item out. What does the bag hold at the end?

```python
bag = ["lamp", "map"]
bag.append("key")
bag.remove("map")
print(bag)
print("map" in bag)
```

:::keep-together

**What is the first line it prints?**

☐ ['lamp', 'map', 'key']

☐ ['lamp', 'key']

☐ ['lamp', 'map']

☐ ['key', 'lamp']

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** ['lamp', 'key']. append() put "key" on the end; remove() took "map" out. The second line is False: "map" is no longer in the bag.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
bag = []
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
    elif len(words) == 2 and words[0] == "take":
        bag.append(words[1])
        print("You take the " + words[1] + ".")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    else:
        print("Try: take lamp, drop lamp, bag or quit")
```

:::keep-together

### Follow the bag

**Start with an empty bag. Fill in how many things are in it after each command.**

{{rows 1}}

| command | things in the bag |
|---|---|
| take lamp | 1 |
| take key |   |
| drop map |   |
| drop lamp |   |
| take rope |   |

:::


:::teacher-note

**Answer:** 2, 2, 1, 2

drop map changes nothing, because the map is not in the bag: the in check catches it. After drop lamp the bag holds only the key; take rope adds a second thing.

:::


:::keep-together

### Why check first?

**Why does the drop part check if words[1] in bag first?**

☐ remove() stops with an error if the item is not in the list

☐ in sorts the list

☐ It is not needed

☐ To make the program faster

:::


:::teacher-note

**Answer:** remove() stops with an error if the item is not in the list

remove() only works for items that are there. Checking with in first lets the program reply politely instead of stopping.

:::


:::keep-together

### Spot the bug

**You type map and it stops with ValueError: list.remove(x): x not in list. Click the line where it stops.**

```
 1  bag = ["lamp", "key"]
 2  item = input("Drop what? ")
 3  bag.remove(item)
 4  print(bag)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

remove() stops with an error when the item is not in the list. Check first: if item in bag: bag.remove(item).

:::


:::typical

## Modify


**How many?.** When the command is `bag`, also print how many things are in it.

**A full bag.** The bag holds at most **3** things. Taking a fourth prints `Your bag is full.`

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**How many?:**

```python
bag = []
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
        print("That is " + str(len(bag)) + " things.")
    elif len(words) == 2 and words[0] == "take":
        bag.append(words[1])
        print("You take the " + words[1] + ".")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    else:
        print("Try: take lamp, drop lamp, bag or quit")
```

**A full bag:**

```python
bag = []
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
    elif len(words) == 2 and words[0] == "take":
        if len(bag) < 3:
            bag.append(words[1])
            print("You take the " + words[1] + ".")
        else:
            print("Your bag is full.")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    else:
        print("Try: take lamp, drop lamp, bag or quit")
```

:::

:::


## Make a shopping list

Write a **shopping list** app. It keeps asking `add, remove, show or done`. `add` asks what to add; `remove` asks what to remove (and says so if it is not on the list); `show` prints the list in order (`items.sort()` puts it in order); `done` prints the final list and stops.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
items = []
while True:
    command = input("add, remove, show or done: ").strip().lower()
    if command == "done":
        break
    elif command == "add":
        items.append(input("What? ").strip().lower())
    elif command == "remove":
        item = input("What? ").strip().lower()
        if item in items:
            items.remove(item)
        else:
            print(item + " is not on the list.")
    elif command == "show":
        items.sort()
        print(", ".join(items))
print("Final list: " + ", ".join(items))
```

:::


:::wider

## Where this leads

Next lesson adds the map: rooms and exits stored in **dictionaries**, so the adventurer can walk from room to room.

:::


## Exit ticket

:::keep-together

**bag = ["lamp"]. What happens with bag.remove("key"), and how do you avoid it?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It stops with a ValueError because key is not in the bag. Check first: if "key" in bag: bag.remove("key").

:::

