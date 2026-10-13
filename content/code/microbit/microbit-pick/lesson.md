---
order: 10
unit: lists
moveId: pick-from-list
reviews: [list-place, count-in-a-variable]
introduces: [random, length]
assumes: [list, list-index, variable, variable-update, if]
title: Pick from a list
summary: Pick an item from a list at random, so it works however long the list grows.
language: makecode
explainPicture: lesson.ts#ball
hook: "A magic 8-ball, a game that deals a random card, a playlist on shuffle: each picks a place at random, then takes the item at that place."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#ball", lesson: "code/microbit/microbit-pick", target: "microbit" }
  caption: "Pick a random place, then take the item there"
  say: "To pick at random, pick a place, then take the item at that place."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "pick random 0 to 2 gives 0, 1 or 2, different each time."
        say: "pick random zero to two gives zero, one or two. Different each time."
    - click: "Run"
    - wait: 600
    - caption:
        text: "length of list counts the items. The last place is length − 1."
        say: "length of list counts the items. The last place is the length minus one."
    - caption:
        text: "So pick random 0 to length − 1 reaches every item."
        say: "So picking from zero to the length minus one reaches every item."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson you took an item out of a list by its place. Now the micro:bit chooses the place. **pick random** (in **Math**) gives a whole number between two numbers, a different one each time. **length of list** (in **Arrays**) counts the items in a list.

## Predict

```step
stage: predict
code: lesson.ts#ball
check:
  type: predict
  q: "You shake this magic 8-ball twice. Can it give the same answer both times?"
  options: ["Yes: each shake picks a new random place, and it can be the same one", "No: it never repeats until every answer has been used", "No: it goes in order, Yes, then No, then Maybe", "It always says Yes"]
  actual: "Yes. Each shake picks a random place from 0 to 2, with no memory of the last one, so the same place can come up twice."
```

**pick random 0 to length of answers − 1** chooses a place. **get value at** takes the item at that place.

## Run

```step
stage: run
code: lesson.ts#ball
try: { playground: microbit, starter: "lesson.ts#ball" }
check: { type: reflect, text: "I shook it several times and compared the answers with my prediction." }
```

Click **SHAKE** several times. Does an answer ever come up twice in a row?

## Investigate

```step
stage: investigate
code: lesson.ts#ball
insight: "pick random 0 to length − 1 gives any place in the list, so every item can come up, and new items are included without changing anything else."
tasks:
  - check:
      type: question
      q: "The list has 3 answers. Which places can pick random 0 to length − 1 choose?"
      options: ["0, 1 or 2", "1, 2 or 3", "0, 1, 2 or 3", "Only 0"]
      answer: 0
      explain: "The length is 3, so it picks from 0 to 2: exactly the three places."
  - check:
      type: question
      q: "Kai's magic 8-ball never says Yes, and sometimes shows nothing at all. Why?"
      options: ["Yes is too short to show", "Places start at 0, but Kai picks from 1 to 3: he skips Yes and asks for a place that is not there", "pick random is broken", "The list needs four items"]
      answer: 1
      fault: logic
      misconception: list-first-is-one
      explain: "Yes is at place 0, which Kai never picks, and place 3 does not exist. Picking from 0 to length − 1 covers every item."
  - check:
      type: question
      q: "Ana added two answers, so the list has five. Her code still picks from 0 to 2. What happens?"
      options: ["The two new answers never come up", "All five come up", "It shows an error", "Only the new answers come up"]
      answer: 0
      fault: logic
      misconception: pick-range-fixed
      explain: "0 to 2 only reaches the first three places. Picking from 0 to length − 1 grows with the list."
```

### Which places?

### Kai's 8-ball

Kai's program:

```makecode
let answers = ["Yes", "No", "Maybe"]
input.onGesture(Gesture.Shake, function () {
    basic.showString(answers[randint(1, 3)])
})
```

### Ana's longer list

Ana's program is in the next step's editor.

## Modify

```step
stage: modify
insight: "Using the list's length means the program still works when the list grows."
try: { playground: microbit, starter: "lesson.ts#ana" }
tasks:
  - hint: ["length of array is in Arrays. Drag it into the second number of pick random.", "Then take 1 away from it with the minus block from Math."]
    check: { type: code, text: "Fix Ana's 8-ball so every answer can come up, using the length of the list.", rules: { contains: ["randint(0,answers.length-1)"] } }
  - hint: "Drag in on button A pressed, with show number length of array answers."
    check: { type: code, text: "Make A show how many answers there are.", rules: { inside: { "input.onButtonPressed(Button.A": ["answers.length"] } } }
```

### Every answer

Fix Ana's 8-ball with **length of list**, so all five answers can come up. Shake to check.

### How many?

Make **A** show how many answers are in the list.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "A variable can be the place: change it, and get value at takes out a different item."
check:
  type: question
  q: "This is last lesson's mood chooser. choice starts at 0. You press A four times. Which mood shows after the 4th press?"
  options: ["Tired", "Happy", "Hungry", "Nothing"]
  answer: 0
  explain: "The presses make choice 1, 2, then 3, which goes back to 0, then 1. Place 1 is Tired."
```

## Make

```step
stage: make
try: { playground: microbit, starter: "lesson.ts#make" }
hint:
  - "Make a list with Rock, Paper and Scissors."
  - "In on shake: show string get value at pick random 0 to length of list − 1."
check: { type: code, text: "Rock, paper, scissors: shaking picks one of three choices from a list.", rules: { count: { "\",\"": 2 }, inside: { "input.onGesture(Gesture.Shake": ["basic.showString(", "randint(0,"] } } }
unlocks: [pick-from-list]
```

Make **rock, paper, scissors**. Each shake shows Rock, Paper or Scissors, picked at random from a list. Play against a friend with their own micro:bit (or the simulator).

## Change a team picker

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#picker" }
```

This picks a name at random from a class list. Put in names from your class, then make **B** show how many names there are.

```teacher
summary: "Students pick an item from a list at random with pick random 0 to length − 1, so every item can come up however long the list grows."
time: 40
timing: "Predict and Run 7 min · Investigate 10 min · Modify 8 min · Mix it up 3 min · Make 8 min · Team picker 4 min"
goals:
  - I can pick a random item from a list.
  - I can say why the range is 0 to length − 1.
  - I can add items to a list without changing the random part.
before: |
  **pick random** (Math) gives a whole number between two numbers. **length of array** (Arrays) counts the items. A random item is **get value at (pick random 0 to length − 1)**: the length is one more than the last place, because places start at 0. Using the length means new items are included without changing anything else.
running:
  - "Predict: some students think it cycles through or never repeats. Random has no memory."
  - "Run: shake several times. Repeats happen."
  - "Investigate: Kai counts from 1; Ana's range stays fixed when her list grows. Both are fixed by 0 to length − 1."
  - "Modify: students fix Ana's 8-ball with length, then show the length."
  - "Mix it up: last lesson's chooser, traced by hand."
  - "Make: rock, paper, scissors is the same pattern with new items."
stuck:
  - see: "One item never comes up."
    ask: "Which places can pick random choose from?"
    fix: "Pick from 0 to length − 1, not from 1 and not a fixed number."
  - see: "The minus block will not fit."
    ask: "Is it the round number minus block from Math?"
    fix: "Drag Math's 0 − 0 block into the slot, then put length of array on its left and 1 on its right."
  - see: "A number shows instead of the word."
    ask: "Is the random number inside get value at?"
    fix: "pick random gives the place; get value at turns the place into the item."
stretch: "Make a dice: a list of six show leds pictures is hard to make, so use show number pick random 1 to 6 instead, and say why this one starts at 1."
support: "Give students the list and the on shake block with show string already in, and ask them only to build get value at with pick random."
leads: "Next: the final challenge, a pocket pet that uses everything in this course."
exit:
  q: "A list has 6 items. What should pick random choose between, and why?"
  a: "0 and 5 (0 to length − 1), because places start at 0, so the last of 6 items is at place 5."
explain: |
  **pick random 0 to 2** gives 0, 1 or 2, a new one each time.

  To pick an item at random, pick a **place**, then take the item at that place: **get value at (pick random 0 to length − 1)**.

  **length of list** counts the items. The last place is one less, because places start at 0. Using the length means the list can grow without changing anything else.
solutions:
  step-4#t1: lesson.ts#sol-ana
  step-4#t2: lesson.ts#sol-count
  step-6: lesson.ts#sol-make
struggle: "Why it is length − 1. Ask them to count the places of a 3-item list aloud from 0."
class:
  activities:
    - at: predict
      title: Roll a dice
      minutes: 3
      do: |
        Roll a real dice twice. Can it give the same number both times?
      notes: "Roll a real dice twice to settle it: random has no memory."
    - at: investigate
      title: Draw a card
      minutes: 3
      do: |
        Three cards numbered 0, 1 and 2 go in a hat. A student draws one, reads the item at that place, and puts it back.
      notes: "Add two more items to the board but not to the hat: they never come up. That is Ana's bug."
    - at: end
      title: Play a round
      minutes: 3
      do: |
        Play rock, paper, scissors against the next pair: both shake at once.
```

```code lesson.ts#ball
let answers = ["Yes", "No", "Maybe"]
input.onGesture(Gesture.Shake, function () {
    basic.showString(answers[randint(0, answers.length - 1)])
})
```

```code lesson.ts#ana
let answers = ["Yes", "No", "Maybe", "Ask again", "Never"]
input.onGesture(Gesture.Shake, function () {
    basic.showString(answers[randint(0, 2)])
})
```

```code lesson.ts#sol-ana
let answers = ["Yes", "No", "Maybe", "Ask again", "Never"]
input.onGesture(Gesture.Shake, function () {
    basic.showString(answers[randint(0, answers.length - 1)])
})
```

```code lesson.ts#sol-count
let answers = ["Yes", "No", "Maybe", "Ask again", "Never"]
input.onGesture(Gesture.Shake, function () {
    basic.showString(answers[randint(0, answers.length - 1)])
})
input.onButtonPressed(Button.A, function () {
    basic.showNumber(answers.length)
})
```

```code lesson.ts#review
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

```code lesson.ts#make
input.onGesture(Gesture.Shake, function () {

})
```

```code lesson.ts#sol-make
let choices = ["Rock", "Paper", "Scissors"]
input.onGesture(Gesture.Shake, function () {
    basic.showString(choices[randint(0, choices.length - 1)])
})
```

```code lesson.ts#picker
let names = ["Ava", "Ben", "Chloe", "Dev"]
input.onButtonPressed(Button.A, function () {
    basic.showString(names[randint(0, names.length - 1)])
})
```
