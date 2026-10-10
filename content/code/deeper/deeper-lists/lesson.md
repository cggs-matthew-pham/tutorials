---
order: 2
unit: collections
introduces: [list-change]
title: A bag that grows
summary: Add to a list with append(), take out with remove(), check with in, and list it with join().
language: python
hook: "A shopping basket, a playlist, a to-do list: all lists that grow and shrink while the program runs."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "A list can grow and shrink"
  say: "A list can grow and shrink while the program runs."
  pacing: { keyDelayMs: 20 }
  clip:
    - caption:
        text: "append() adds to the end; remove() takes one out."
        say: "append adds to the end, and remove takes one out."
    - type: { into: "Python code", text: "bag = [\"lamp\", \"map\"]\nbag.append(\"key\")\nbag.remove(\"map\")\n" }
    - caption:
        text: "in asks whether something is in the list; join() lists it neatly."
        say: "in asks whether something is in the list, and join lists it neatly."
    - type: { into: "Python code", text: "print(\"map\" in bag)\nprint(\", \".join(bag))\n", append: true }
    - click: "Run"
    - expect: { selector: "#output", contains: "lamp, key" }
    - caption:
        text: "The bag now holds lamp and key; the map is gone."
        say: "The bag now holds the lamp and the key. The map is gone."
    - wait: 1500
---
The adventurer needs a **bag**: a list that starts empty, grows when something is taken and shrinks when it is dropped. Lists have their own commands for that, called with a dot, like text.

## Predict

```step
stage: predict
code: bag.py#predict
check:
  type: predict
  q: "What is the first line it prints?"
  options: ["['lamp', 'key']", "['lamp', 'map', 'key']", "['key', 'lamp']", "['lamp', 'map']"]
  actual: "['lamp', 'key']. append() put \"key\" on the end; remove() took \"map\" out. The second line is False: \"map\" is no longer in the bag."
```

`bag.append("key")` adds to the end of the list; `bag.remove("map")` takes that item out. What does the bag hold at the end?

## Run

```step
stage: run
code: bag.py#bag
try: { starter: "bag.py#bag", height: 460 }
check: { type: reflect, text: "I can explain what happens to the list when I take and drop things." }
unlocks: [in, join, remove-from-a-list]
```

Run it and try: `take lamp`, `take key`, `bag`, `drop map`, `drop lamp`, `bag`, `quit`. The loop keeps asking until `quit` (`break` leaves it, as in the console bridge).

## Investigate

```step
stage: investigate
code: bag.py#bag
insight: "A list changes while the program runs; checking with in before remove() is what stops a mistake from crashing it."
tasks:
  - check:
      type: trace
      text: "Start with an empty bag. Fill in how many things are in it after each command."
      table: |
        | command | things in the bag |
        | take lamp | 1 |
        | take key | [2] |
        | drop map | [2] |
        | drop lamp | [1] |
        | take rope | [2] |
      explain: "drop map changes nothing, because the map is not in the bag: the in check catches it. After drop lamp the bag holds only the key; take rope adds a second thing."
  - check:
      type: question
      q: "Why does the drop part check if words[1] in bag first?"
      options: ["remove() stops with an error if the item is not in the list", "To make the program faster", "in sorts the list", "It is not needed"]
      answer: 0
      explain: "remove() only works for items that are there. Checking with in first lets the program reply politely instead of stopping."
  - check:
      type: bug
      code: bag.py#bug
      text: "You type map and it stops with ValueError: list.remove(x): x not in list. Click the line where it stops."
      answer: 3
      fault: runtime
      misconception: remove-missing
      explain: "remove() stops with an error when the item is not in the list. Check first: if item in bag: bag.remove(item)."
```

### Follow the bag

Count the bag after each command.

### Why check first?

The line before `remove()`.

### Spot the bug

A drop that crashes.

## Modify

```step
stage: modify
insight: "len() and in answer questions about a list; a rule like a full bag is one check before append()."
try: { starter: "bag.py#bag", height: 460 }
tasks:
  - hint: "len(bag) is how many things are in it. Add a line to the bag command that prints it."
    check: { type: code, text: "When the command is bag, also say how many things are in it.", rules: { contains: ["str(len(bag))"] } }
  - hint: "Before bag.append(...), check if len(bag) < 3:. Otherwise print that the bag is full."
    check: { type: code, text: "The bag holds at most 3 things.", rules: { contains: ["if len(bag) < 3:"] } }
```

### How many?

When the command is `bag`, also print how many things are in it.

### A full bag

The bag holds at most **3** things. Taking a fourth prints `Your bag is full.`

## Make a shopping list

```step
stage: make
insight: "The same list commands make a different app: add, remove with a check, show in order, finish."
try: { starter: "bag.py#make", height: 460 }
check: { type: code, text: "A shopping list: add, remove (checked with in), show in order, until done.", rules: { loops: 1, contains: [".append(", ".remove(", "in ", ".sort()", "break"] } }
```

Write a **shopping list** app. It keeps asking `add, remove, show or done`. `add` asks what to add; `remove` asks what to remove (and says so if it is not on the list); `show` prints the list in order (`items.sort()` puts it in order); `done` prints the final list and stops.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A music app's queue lets you add songs, skip one, and see what is next. What is the queue?"
  options: ["A list that grows and shrinks", "A single variable", "A dictionary", "Text"]
  answer: 0
  explain: "Queues, baskets, playlists and to-do lists are all lists that change while the program runs."
```

Next lesson adds the map: rooms and exits stored in **dictionaries**, so the adventurer can walk from room to room.
