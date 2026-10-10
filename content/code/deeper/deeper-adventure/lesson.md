---
order: 5
unit: adventure
introduces: [not]
title: A text adventure
summary: Put the parser, the bag and the map together into a text adventure, in three milestones, then make it your own.
language: python
hook: "Text adventures were among the first computer games, and the same pieces (a parser, an inventory, a map) still sit under every game."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "@adventure.py#sol-m3", speed: 8, console: 1, view: output, autorun: 1 }
  caption: "The finished adventure: find the key, open the shed, take the crown"
  say: "Here is the finished adventure. Find the key, open the shed, and take the crown."
  pacing: { keyDelayMs: 8, afterActionMs: 250 }
  clip:
    - caption:
        text: "The shed is locked until the key is in the bag."
        say: "The shed is locked until the key is in your bag."
    - type: { selector: ".con-in", text: "go east" }
    - press: Enter
    - type: { selector: ".con-in", text: "go east" }
    - press: Enter
    - type: { selector: ".con-in", text: "go west" }
    - press: Enter
    - type: { selector: ".con-in", text: "go north" }
    - press: Enter
    - type: { selector: ".con-in", text: "take key" }
    - press: Enter
    - caption:
        text: "With the key, the shed opens. The crown wins the game."
        say: "With the key, the shed opens, and the crown wins the game."
    - type: { selector: ".con-in", text: "go south" }
    - press: Enter
    - type: { selector: ".con-in", text: "go east" }
    - press: Enter
    - type: { selector: ".con-in", text: "go east" }
    - press: Enter
    - type: { selector: ".con-in", text: "take crown" }
    - press: Enter
    - expect: { selector: "#output", contains: "You win!" }
    - wait: 1500
---
You have built every piece: a parser that tidies and splits commands, a bag that grows and shrinks, and a map of rooms in dictionaries. Now put them together into a **text adventure**, in three milestones. Each milestone starts from a working game; the last one is yours.

## Predict

```step
stage: predict
code: adventure.py#predict
check:
  type: predict
  q: "Which room does it print?"
  options: ["shed", "garden", "hall", "kitchen"]
  actual: "shed. north to the kitchen, south back to the hall, west is not an exit from the hall (so nothing happens), east to the garden, east again to the shed."
```

Follow the moves through the map, one at a time. A move that is not an exit from the room you are in does nothing.

## Run

```step
stage: run
code: adventure.py#start
try: { starter: "adventure.py#start", height: 520 }
check: { type: reflect, text: "I can find where each command is handled: look, bag, go and quit." }
```

Play it: `look`, `go north`, `look`, `bag`. You can see things but not take them yet. Each command is one branch of the `if` / `elif` chain inside the loop.

## Investigate

```step
stage: investigate
code: adventure.py#start
insight: "A text adventure is a loop around a parser, with the world stored in dictionaries and lists: every new feature is one more branch or one more entry."
tasks:
  - check:
      type: question
      q: "What is things[\"kitchen\"]?"
      options: ["[\"key\"], the list of things lying in the kitchen", "\"A kitchen that smells of toast.\"", "{\"south\": \"hall\"}", "The bag"]
      answer: 0
      explain: "things maps each room to a list of what lies there. Taking something moves it from that list to the bag."
  - check:
      type: question
      q: "Where would a new command, such as help, go?"
      options: ["A new elif branch in the loop", "In the rooms dictionary", "In things", "Before the loop"]
      answer: 0
      explain: "Each command is one branch: elif command == \"help\": and what it prints. The else at the end catches anything not understood."
```

### Where things are

The third dictionary.

### A new command

Where it would go.

## Milestone 1: take and drop

```step
stage: modify
insight: "Taking moves an item from the room's list to the bag; dropping moves it back. Both check with in first."
try: { starter: "adventure.py#start", height: 520 }
check: { type: code, text: "take moves a thing from the room into the bag, and drop puts it back.", rules: { contains: ["things[here].remove(", "bag.append(", "bag.remove(", "things[here].append("] } }
```

Where the comment says **Milestone 1**, add two branches:

- `take lamp`: if the thing is in `things[here]`, remove it from there and append it to `bag`. If not, say it is not here.
- `drop lamp`: if it is in `bag`, remove it from the bag and append it to `things[here]`. If not, say you do not have it.

Test: take the lamp, carry it to the kitchen, drop it, `look`.

## Milestone 2: a locked shed

```step
stage: modify
insight: "A rule of the world is one extra check in the right branch: here, a door that needs something in the bag."
try: { starter: "adventure.py#m2", height: 520 }
check: { type: code, text: "The shed only opens when the key is in the bag.", rules: { contains: ["\"key\" not in bag"] } }
```

This version adds a **shed** east of the garden, and take and drop work. Where the comment says **Milestone 2**, make the shed locked: if the way leads to `"shed"` and `"key" not in bag` (`not in` is the opposite of `in`), print `The shed is locked.` and stay where you are.

## Milestone 3: make it yours

```step
stage: make
insight: "Goals only: a win condition and a change of your own, using what the course has taught."
try: { starter: "adventure.py#m3", height: 520 }
tasks:
  - hint: "After the if / elif chain, still inside the loop: if \"crown\" in bag:, print a win message and break."
    check: { type: code, text: "Win when the crown is in the bag.", rules: { contains: ["\"crown\" in bag", "break"] } }
  - check: { type: reflect, text: "I added something of my own (a room, a thing, a command or a rule) and tested it." }
```

### Win

The game ends with a win message when the **crown** is in the bag.

### Your own touch

Add something of your own: a room, a thing to find, a `help` command, a move counter, a second locked door.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your adventure forgets everything when the program stops. What would it need to save the game?"
  options: ["To write here and bag to a file, and read them back next time", "A bigger dictionary", "More rooms", "Nothing: Python remembers"]
  answer: 0
  explain: "Saving means writing the game's state to a file and reading it back. That is the next step in this course: files."
```

Every game, from text adventures to open worlds, is this shape: a loop that reads input, rules that change the world, and the world stored as data. Next in this course: saving and loading the game with a file.
