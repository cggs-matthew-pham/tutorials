---
order: 3
unit: collections
introduces: [dict]
title: A map of rooms
summary: Store rooms and exits in dictionaries, look things up by name, put a dictionary inside a dictionary, and count words.
language: python
hook: "A phone's contacts, a dictionary app and a game's map all do the same thing: look something up by its name."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "A dictionary looks a value up by its name"
  say: "A dictionary looks a value up by its name."
  pacing: { keyDelayMs: 20 }
  clip:
    - caption:
        text: "Each key is paired with a value: north leads to the kitchen."
        say: "Each key is paired with a value. North leads to the kitchen."
    - type: { into: "Python code", text: "exits = {\"north\": \"kitchen\", \"east\": \"garden\"}\n" }
    - caption:
        text: "exits[\"north\"] looks it up; in checks whether a key is there."
        say: "exits, north, looks it up, and in checks whether a key is there."
    - type: { into: "Python code", text: "print(exits[\"north\"])\nprint(\"west\" in exits)\n", append: true }
    - click: "Run"
    - expect: { selector: "#output", contains: "kitchen" }
    - caption:
        text: "No exit to the west, so the answer is False."
        say: "There is no exit to the west, so the answer is False."
    - wait: 1500
---
A list finds things by place: `words[0]`. A **dictionary** finds things by name: `exits["north"]` is wherever north leads. The adventure keeps its rooms in one dictionary and its exits in another.

## Predict

```step
stage: predict
code: rooms.py#predict
check:
  type: predict
  q: "What is the first line it prints?"
  options: ["kitchen", "north", "garden", "{'north': 'kitchen'}"]
  actual: "kitchen: the value stored under the key \"north\". The second line is False, because \"west\" is not a key."
```

`{"north": "kitchen", "east": "garden"}` pairs each **key** with a **value**. `exits["north"]` looks up the value for that key. What does it print?

## Run

```step
stage: run
code: rooms.py#rooms
try: { starter: "rooms.py#rooms", height: 480 }
check: { type: reflect, text: "I can explain how the program finds where go north leads." }
unlocks: [dictionary, dictionary-value]
```

Walk around: `go north`, `go south`, `go east`, `go west`, then `quit`. `rooms` maps each room's name to its description. `exits` maps each room's name to **another dictionary** of its exits, so `exits[here]["north"]` is where north leads from here.

## Investigate

```step
stage: investigate
code: rooms.py#rooms
insight: "Dictionaries look things up by name, and a dictionary of dictionaries is a map: from here, which way leads where."
tasks:
  - check:
      type: question
      q: "What is exits[\"hall\"][\"east\"]?"
      options: ["\"garden\"", "\"kitchen\"", "\"hall\"", "{\"north\": \"kitchen\", \"east\": \"garden\"}"]
      answer: 0
      explain: "exits[\"hall\"] is the hall's own exits dictionary; [\"east\"] looks up east in it: the garden."
  - check:
      type: question
      q: "You are in the kitchen and type go west. What happens?"
      options: ["It prints You can't go that way.", "You go to the garden", "It stops with an error", "You go back to the hall"]
      answer: 0
      explain: "\"west\" in exits[\"kitchen\"] is False (the kitchen only has south), so the else replies instead of looking it up."
  - check:
      type: bug
      code: rooms.py#bug
      text: "This stops with KeyError: Hall. Click the line that causes it."
      answer: 2
      fault: runtime
      misconception: key-exact
      explain: "Keys must match exactly: the room is \"hall\", but here is \"Hall\" with a capital. Dictionaries do not guess."
```

### A dictionary in a dictionary

Look up one exit.

### A wall

What `in` protects against.

### Spot the bug

A key that is nearly right.

## Modify

```step
stage: modify
insight: "A new room is one entry in rooms and one in exits; the loop that walks around needs no change."
try: { starter: "rooms.py#rooms", height: 480 }
tasks:
  - hint:
      - "Add \"attic\": \"...\" to rooms, and \"attic\": {\"down\": \"hall\"} to exits."
      - "Then add \"up\": \"attic\" to the hall's exits."
    check: { type: code, text: "Add an attic, up from the hall.", rules: { contains: ["\"attic\":", "\"up\": \"attic\""] } }
  - hint: "Start moves = 0 before the loop, add moves += 1 when the player moves, and print it when they quit."
    check: { type: code, text: "Count the moves and say how many when the player quits.", rules: { contains: ["moves += 1"] } }
```

### An attic

Add an **attic**, reached by `go up` from the hall (and `go down` back).

### Count the moves

Count each move, and say how many when the player quits.

## Make a word counter

```step
stage: make
insight: "A dictionary can count: each new key starts at 1, and a key already there goes up by one."
try: { starter: "rooms.py#make", height: 440 }
check: { type: code, text: "Count how many times each word appears in a sentence, using a dictionary.", rules: { contains: ["= {}", ".split()", "+= 1"] } }
```

Ask for a **sentence** and print how many times each word appears, such as `the: 3`. Start with an empty dictionary, `counts = {}`. For each word: if it is already a key, add 1; if not, set it to 1. Tidy the sentence first so that `The` and `the` count as the same word.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A game stores each player's score by name: scores[\"Ada\"] = 12. What is scores?"
  options: ["A dictionary", "A list", "Text", "A number"]
  answer: 0
  explain: "Looking things up by name is what dictionaries are for: scores, contacts, translations, maps."
```

You now have the parts of a text adventure: a command parser, a bag and a map. Still to come in this course: handling errors with `try`, saving and loading a game in a file, and the adventure itself.
