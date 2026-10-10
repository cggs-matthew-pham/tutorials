---
order: 3
unit: many
introduces: [dict]
title: One dictionary per star
summary: Keep everything about one star together in a dictionary, so adding a property is one line and nothing can fall out of step.
language: python
hook: "A contact on your phone keeps a name, a number and a photo together. A dictionary does the same for anything in a program."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "A dictionary keeps values together under names"
  say: "A dictionary keeps values together, each under a name."
  pacing: { keyDelayMs: 20 }
  clip:
    - caption:
        text: "Each key, in quotes, is paired with a value."
        say: "Each key, in quotes, is paired with a value."
    - type: { into: "Python code", text: "star = {\"speed\": 5, \"points\": 2}\n" }
    - caption:
        text: "star[\"points\"] reads or changes the value under that key."
        say: "star, points in square brackets, reads or changes the value under that key."
    - type: { into: "Python code", text: "star[\"points\"] = star[\"points\"] + 1\nprint(star[\"speed\"], star[\"points\"])\n", append: true }
    - click: "Run"
    - expect: { selector: "#output", contains: "5 3" }
    - caption:
        text: "Everything about one star stays in one place."
        say: "Everything about one star stays together, in one place."
    - wait: 1500
---
Four lists for one star was fragile. A **dictionary** keeps everything about one star together: each value is stored under a name, called a **key**. The game keeps a list of dictionaries, one per star.

## Predict

```step
stage: predict
code: stars.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["5 3", "5 2", "speed points", "3 5"]
  actual: "5 3. star[\"points\"] starts at 2; the second line stores 2 + 1 back under \"points\". star[\"speed\"] is still 5."
```

`{"speed": 5, "points": 2}` is a dictionary: the key `"speed"` is paired with 5 and `"points"` with 2. `star["points"]` is the value stored under `"points"`. What will it print?

## Run

```step
stage: run
code: stars.py#game
try: { starter: "stars.py#game", height: 520 }
check: { type: reflect, text: "I can find where one star's speed is stored, and where the game reads it." }
unlocks: [dictionary, dictionary-value]
```

The same game again. Each star is now one dictionary holding its turtle, speed and points, and `for star in stars:` visits each dictionary in turn. Play it, then find `star["speed"]` in `tick`.

## Investigate

```step
stage: investigate
code: stars.py#game
insight: "A dictionary is one record per thing: values are found by name, not by place, so a new property is one more key."
tasks:
  - check:
      type: match
      q: "Match each piece with what it does."
      pairs:
        - ["{\"speed\": 5, \"points\": 1}", "a dictionary: keys paired with values"]
        - ["star[\"speed\"]", "the value stored under the key \"speed\""]
        - ["star[\"points\"] = 3", "changes the value stored under \"points\""]
        - ["for star in stars:", "each dictionary in the list, one at a time"]
  - check:
      type: question
      q: "Every star should also remember its colour. What changes?"
      options: ["One more key in the dictionary where each star is made", "A new list beside stars", "A new variable for every star", "Nothing: dictionaries cannot hold colours"]
      answer: 0
      explain: "Add \"colour\": ... where the dictionary is made, then read star[\"colour\"] where it is needed. Nothing else can fall out of step."
  - check:
      type: bug
      code: stars.py#bug
      text: "This should print each star's speed doubled, but it stops with a NameError. Click the line that causes it."
      answer: 3
      fault: runtime
      misconception: dict-key-quotes
      explain: "Keys are text, so they need quotes: star[\"speed\"]. Without quotes Python looks for a variable called speed, which does not exist."
```

### Match the pieces

What each part of a dictionary does.

### A new property

How much changes when every star needs one more value?

### Spot the bug

A key without its quotes.

## Modify

```step
stage: modify
insight: "Changing what a star stores is one line where it is made; using it is star[\"key\"] where it is needed."
try: { starter: "stars.py#game", height: 520 }
tasks:
  - hint: "\"points\": 1 gives every star 1 point. Use random.randint(1, 3) instead."
    check: { type: code, text: "Give each star a random 1 to 3 points.", rules: { contains: ["\"points\": random.randint(1, 3)"] } }
  - hint:
      - "Add a list of colours before the loop, and a \"colour\" key in each dictionary: colours[i % 3] picks gold, orange, yellow in turn."
      - "Then colour each turtle with star[\"turtle\"].color(star[\"colour\"])."
    check: { type: code, text: "Store a colour in each star and use it to colour the turtle.", rules: { contains: ["\"colour\":", "star[\"colour\"]"] } }
```

### Different points

Give each star a random **1 to 3** points.

### Colours

Store a **colour** in each star's dictionary, and use it to colour the turtle.

## Make a bad star

```step
stage: make
insight: "The same bad star as last lesson, now one key instead of one more list: compare the two."
try: { starter: "stars.py#game", height: 520 }
check: { type: code, text: "Add a \"bad\" key: the first star is red and costs 3 points when caught.", rules: { contains: ["\"bad\":", "star[\"bad\"]", "score -= 3"] } }
```

Make the first star a **bad star** again, this time with a `"bad"` key in each dictionary (`True` for the first star only). The bad star is red and **costs 3 points** when caught. Compare it with last lesson's version: what did you not have to do this time?

## Where this leads

```step
stage: info
check:
  type: question
  q: "A school stores each student as a dictionary: {\"name\": \"Ada\", \"year\": 9}. What is a list of them?"
  options: ["A table: one row per student, one column per key", "A list of names only", "A single number", "A turtle"]
  answer: 0
  explain: "A list of dictionaries is a table, which is how most data is stored: spreadsheets, databases and the data sets in Data detective."
```

A list of dictionaries is how most programs store data: one record per thing. There is still one awkward part: `star["turtle"].forward(star["speed"])`. Next lesson makes a `Star` of your own, so it reads `star.turtle.forward(star.speed)`.
