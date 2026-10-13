---
order: 9
unit: lists
moveId: list-place
reviews: [first-true-wins]
introduces: [list, list-index]
assumes: [variable, variable-update, if, else]
title: Lists
summary: Keep many values in one list, and pick one by its place, counted from 0.
language: makecode
explainPicture: lesson.ts#chooser
hook: "A playlist, a lunch menu, a class roll: each is a list of things in order, and you pick one by its place."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/microbit/microbit-lists", target: "microbit" }
  caption: "A list holds many values, in order"
  say: "A list holds many values, in order, under one name."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "Places count from 0: Yes is at 0, No at 1, Maybe at 2."
        say: "Each item has a place, counted from zero. Yes is at zero, Maybe at two."
    - click: "Run"
    - wait: 600
    - caption:
        text: "get value at 1 takes out the item at place 1: No."
        say: "get value at one takes out the item at place one. That is No."
    - caption:
        text: "Three items use places 0, 1 and 2. There is no place 3."
        say: "Three items use places zero, one and two. There is no place three."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
A variable holds one value. A **list** holds many, in order, under one name, such as `answers`. Each item has a **place number** (an **index**), and the micro:bit counts places from **0**. You find list blocks in **Advanced › Arrays** (an array is another name for a list).

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "You press A. What does the micro:bit show?"
  options: ["Yes", "No", "Maybe", "Nothing"]
  fault: logic
  misconception: list-first-is-one
  actual: "No. The places are counted from 0: Yes is at 0, No is at 1, Maybe is at 2. Place 1 is No."
```

**get value at 1** takes one item out of the list, by its place.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I pressed A and compared the word with my prediction." }
```

Press **A** and read the word as it scrolls.

## Investigate

```step
stage: investigate
code: lesson.ts#predict
insight: "A list keeps items in order, counted from 0, so the first item is at place 0 and the last place is one less than the number of items."
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
      fault: logic
      misconception: last-place-is-length
      explain: "Places start at 0, so 5 items use places 0, 1, 2, 3 and 4. The last place is one less than the number of items."
  - check:
      type: question
      q: "Jo wants A to show the first word, Yes. She uses get value at 1. What does A show?"
      options: ["No", "Yes", "Nothing", "An error"]
      answer: 0
      fault: logic
      misconception: list-first-is-one
      explain: "Place 1 is the second item, No. The first item is at place 0."
```

### Places

Fill in the item at each place.

### The last place

Work out the last place of a longer list.

### Jo's first word

## Modify

```step
stage: modify
insight: "Every item has a place, and get value at takes out any one of them."
try: { playground: microbit, starter: "lesson.ts#predict" }
tasks:
  - hint: ["Click + on the list block to add a place, and type Later.", "Drag in on button B pressed, with show string get value at 3."]
    check: { type: code, text: "Add a fourth word, Later, and make B show it.", rules: { contains: ["\"Later\""], inside: { "input.onButtonPressed(Button.B": ["[3]"] } } }
  - hint: "Drag in on button A+B pressed. The first word is at place 0."
    check: { type: code, text: "Make A+B show the first word in the list.", rules: { inside: { "input.onButtonPressed(Button.AB": ["[0]"] } } }
```

### One more word

Add a fourth word, **Later**. Which place is it at? Make **B** show it.

### The first word

Make **A+B** show the first word.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "The first true question wins, so the bigger tilt is asked about first."
check:
  type: trace
  text: "A tilt meter: what shows for each value of acceleration x?"
  table: |
    | acceleration x | shows |
    | 600 | [right arrow] |
    | 200 | [small diamond] |
    | -50 | [small square] |
  explain: "600 is more than 500, so the first part runs. 200 is not, but it is more than 0. -50 is neither, so else runs."
```

A tilt meter from the Decide unit.

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "In on button A pressed: change choice by 1, then show string get value at choice."
  - "There are only places 0, 1 and 2. If choice is 3, set it back to 0, before you show the word."
check: { type: code, text: "A mood chooser: each press of A shows the next mood in the list, and goes back to the first after the last.", rules: { inside: { "input.onButtonPressed(Button.A": ["choice+=1", "[choice]"] } } }
unlocks: [get-value-at]
```

Make a **mood chooser**. The list of moods and the variable `choice` are made for you. Each press of **A** shows the next mood: Happy, then Tired, then Hungry, then back to Happy.

## Change a lunch menu

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#menu" }
```

This menu has a lunch for each school day, Monday first. **A** shows Monday's. Put in your canteen's lunches, then make **B** show Friday's.

```teacher
summary: "Students keep many values in one list and take one out by its place, counted from 0."
time: 40
timing: "Predict and Run 7 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 9 min · Lunch menu 3 min"
goals:
  - I can make a list and get an item by its place.
  - I can say why the first item is at place 0.
  - I can step through a list with a variable.
before: |
  A **list** (MakeCode calls it an **array**, in **Advanced › Arrays**) holds many values in order under one name. Each item has a **place** (an **index**), counted from **0**: in Yes, No, Maybe, Yes is at place 0. So a list of 3 has places 0, 1 and 2, and the last place is one less than the number of items. **get value at** takes out the item at a place. Picking at random is next lesson.
running:
  - "Predict: most students say Yes. Ask: which place does the micro:bit start counting from? Or: where does a ruler start?"
  - "Run: No. Say it plainly: lists count from 0, like a ruler starts at 0."
  - "Investigate: the last-place question is where counting from 0 bites."
  - "Modify: adding Later and asking for place 3 makes students count."
  - "Mix it up: a tilt meter from the Decide unit, read from the top."
  - "Make: the chooser uses a variable as the place, and an if to go back to 0."
stuck:
  - see: "The list block has only one or two places."
    ask: "Where is the + on the list block?"
    fix: "Click + on the list block to add places."
  - see: "The chooser shows nothing after the third press."
    ask: "What is choice after three presses, and is there a place with that number?"
    fix: "There is no place 3. When choice reaches 3, set it back to 0."
  - see: "A number shows instead of the word."
    ask: "Is it show string or show number?"
    fix: "Words need show string, from Basic."
stretch: "Make B step backwards through the moods, going round to the last one after the first."
support: "Give students the A event with change and show already in, and ask them only to add the if that goes back to 0."
leads: "Next lesson: pick an item at random, however long the list is. Class idea: a list of the week's homework, one item per day."
exit:
  q: "A list has Red, Green, Blue. What is at place 2, and what is at place 3?"
  a: "Blue is at place 2. There is no place 3: three items use places 0, 1 and 2."
explain: |
  A **list** holds many values, in order, under one name.

  Each item has a **place**, counted from **0**. In Yes, No, Maybe: Yes is at 0, No at 1, Maybe at 2.

  **get value at** takes out the item at a place. The last place is one less than the number of items.
solutions:
  step-4#t1: lesson.ts#sol-later
  step-4#t2: lesson.ts#sol-first
  step-6: lesson.ts#sol-make
struggle: "Counting places from 0. Ask them to point at each item and count aloud from zero."
class:
  activities:
    - at: investigate
      title: Line up from 0
      minutes: 3
      do: |
        Five students stand in a row holding cards 0 to 4. The class calls a place; that student steps forward.
      notes: "Ask for place 5. Nobody steps forward: five items stop at place 4."
    - at: end
      title: Round the list
      minutes: 3
      do: |
        Swap mood choosers with the next pair. Press A until it goes round.
```

```code lesson.ts#predict
let answers = ["Yes", "No", "Maybe"]
input.onButtonPressed(Button.A, function () {
    basic.showString(answers[1])
})
```

```code lesson.ts#sol-later
let answers = ["Yes", "No", "Maybe", "Later"]
input.onButtonPressed(Button.A, function () {
    basic.showString(answers[1])
})
input.onButtonPressed(Button.B, function () {
    basic.showString(answers[3])
})
```

```code lesson.ts#sol-first
let answers = ["Yes", "No", "Maybe", "Later"]
input.onButtonPressed(Button.A, function () {
    basic.showString(answers[1])
})
input.onButtonPressed(Button.B, function () {
    basic.showString(answers[3])
})
input.onButtonPressed(Button.AB, function () {
    basic.showString(answers[0])
})
```

```code lesson.ts#review
basic.forever(function () {
    if (input.acceleration(Dimension.X) > 500) {
        basic.showArrow(ArrowNames.East)
    } else if (input.acceleration(Dimension.X) > 0) {
        basic.showIcon(IconNames.SmallDiamond)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

```code lesson.ts#make
let moods = ["Happy", "Tired", "Hungry"]
let choice = 0
input.onButtonPressed(Button.A, function () {

})
```

```code lesson.ts#sol-make
let moods = ["Happy", "Tired", "Hungry"]
let choice = 0
input.onButtonPressed(Button.A, function () {
    choice += 1
    if (choice == 3) {
        choice = 0
    }
    basic.showString(moods[choice])
})
```

```code lesson.ts#chooser
let moods = ["Happy", "Tired", "Hungry"]
let choice = 0
input.onButtonPressed(Button.A, function () {
    choice += 1
    if (choice == 3) {
        choice = 0
    }
    basic.showString(moods[choice])
})
```

```code lesson.ts#menu
let lunches = ["Pasta", "Tacos", "Soup", "Curry", "Pizza"]
input.onButtonPressed(Button.A, function () {
    basic.showString(lunches[0])
})
```
