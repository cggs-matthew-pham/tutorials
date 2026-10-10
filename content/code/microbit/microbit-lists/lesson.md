---
order: 7
unit: tools
title: Lists
summary: Keep many values in one list, pick one by its place, and pick one at random.
language: makecode
introduces: [list, list-index, length, random]
explainPicture: lists.ts#ball
hook: "A playlist, a lunch menu, a class roll: each is a list of things in order, and you pick one by its place or at random."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lists.ts#ball", lesson: "code/microbit/microbit-lists", target: "microbit" }
  caption: "A list holds many values, in order"
  say: "A list holds many values, in order, under one name."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "Places count from 0: Yes is at 0, Maybe at 2."
        say: "Each item has a place, counted from zero. Yes is at zero, Maybe at two."
    - caption:
        text: "The last place is length − 1."
        say: "So the last place is the length minus one."
    - click: "Run"
    - wait: 600
    - caption:
        text: "Pick random 0 to length − 1, then get the value there."
        say: "To pick at random, pick a place, then get the value at that place."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
A variable holds one value. A **list** holds many, in order, under one name, such as `answers`. Each item has a **place number** (an **index**), and the micro:bit counts places from **0**. You find list blocks in **Advanced › Arrays** (an array is another name for a list).

## Predict

```step
stage: predict
code: lists.ts#predict
check:
  type: predict
  q: "You press A. What does the micro:bit show?"
  options: ["Yes", "No", "Maybe", "Nothing"]
  actual: "No. The places are counted from 0: Yes is at 0, No is at 1, Maybe is at 2. Place 1 is No."
```

**get value at 1** takes one item out of the list, by its place.

## Run

```step
stage: run
code: lists.ts#predict
try: { playground: microbit, starter: "lists.ts#predict" }
check: { type: reflect, text: "I pressed A and compared the word with my prediction." }
```

Press **A** and read the word as it scrolls.

## Investigate

```step
stage: investigate
code: lists.ts#ball
insight: "A list keeps items in order, counted from 0, so the last place is one less than the length. A random place from 0 to length − 1 picks any item."
tasks:
  - check:
      type: trace
      text: "The list is Yes, No, Maybe. What is at each place?"
      table: |
        | place | item |
        | 0 | [Yes] |
        | 1 | [No] |
        | 2 | [Maybe] |
      explain: "The first item is at place 0. Three items use places 0, 1 and 2."
  - check:
      type: number
      q: "A list has 5 items. What is the place number of the last one?"
      answer: 4
      explain: "Places start at 0, so 5 items use places 0, 1, 2, 3 and 4. The last place is the length minus 1."
  - check:
      type: question
      q: "Kai's magic 8-ball never says Yes, and sometimes it goes wrong. Why?"
      options: ["Yes is too short to show", "Places start at 0, but Kai picks from 1 to 3: he skips Yes and asks for a place that is not there", "randint is broken", "The list needs four items"]
      answer: 1
      fault: logic
      misconception: list-first-is-one
      explain: "Yes is at place 0, which Kai never picks, and place 3 does not exist. Picking from 0 to length − 1 covers every item."
```

This is a **magic 8-ball**: shake it and it picks a random answer. **pick random 0 to length − 1** chooses a place, and **get value at** takes the item at that place.

### Places

Fill in the item at each place.

### The last place

Work out the last place of a longer list.

### Kai's 8-ball

Kai's program:

```makecode
let answers = ["Yes", "No", "Maybe"]
input.onGesture(Gesture.Shake, function () {
    basic.showString(answers[randint(1, 3)])
})
```

## Modify

```step
stage: modify
insight: "Using the list's length means the program still works when the list grows."
try: { playground: microbit, starter: "lists.ts#ball" }
tasks:
  - hint: ["Click the + on the list block to add a place.", "Type your answer into each new place."]
    check: { type: code, text: "Add two more answers, so the list has five.", rules: { count: { "\",\"": 4 } } }
  - hint: ["Use on button A pressed and show number.", "length of array is in Arrays."]
    check: { type: code, text: "Make A show how many answers there are.", rules: { inside: { "input.onButtonPressed(Button.A": ["answers.length"] } } }
```

### More answers

Add two answers of your own. Shake a few times: do the new answers come up? (You did not have to change the random part. Why not?)

### How many?

Make **A** show how many answers are in the list.

## Make

```step
stage: make
try: { playground: microbit, starter: "lists.ts#make" }
hint:
  - "Make a list called choices with Rock, Paper and Scissors."
  - "Inside on shake: show string, get value at, pick random 0 to length of choices − 1."
check: { type: code, text: "Rock, paper, scissors: shaking picks one of three choices from a list.", rules: { count: { "\",\"": 2 }, inside: { "input.onGesture(Gesture.Shake": ["basic.showString(", "randint(0,"] } } }
```

Make **rock, paper, scissors**. Each shake shows Rock, Paper or Scissors, picked at random from a list. Play against a friend with their own micro:bit (or the simulator).

## Change a team picker

```step
stage: modify
try: { playground: microbit, starter: "lists.ts#picker" }
```

This picks a name at random from a class list. Put in names from your class, then make **B** show the first name in the list.
