---
order: 11
unit: challenge
reviews: [forever-loop, react-to-event, count-in-a-variable, read-a-sensor, if-true, if-else, first-true-wins, list-place, pick-from-list]
assumes: [variable, variable-update, if, else, list, list-index, length, random]
title: Pocket pet
summary: Build a pet that lives on your micro:bit, using everything in this course. It gets hungry as time passes, you feed it, and its face shows how it feels.
language: makecode
explainPicture: lesson.ts#sol-m3
hook: "Tamagotchis, Neopets and the pets in phone games all run the same loop: time makes a number go up, you bring it down, and a picture shows how things are going."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#sol-m3", lesson: "code/microbit/microbit-pet", target: "microbit" }
  caption: "A pet is a number that time changes"
  say: "This pet is a number, hunger, that time keeps changing."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "forever: wait, then hunger goes up by 1."
        say: "forever waits, then hunger goes up by one."
    - caption:
        text: "A feeds it: hunger goes down, but never below 0."
        say: "A feeds it. hunger goes down, but never below zero."
    - click: "Run"
    - wait: 600
    - caption:
        text: "if, else if, else picks the face. Shake picks a trick from a list."
        say: "if, else if and else pick the face, and a shake picks a trick."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Build a **pocket pet**. It gets hungry as time passes, **A** feeds it, its face shows how it feels, and a **shake** makes it do a trick. You already know every block it needs. You will build it in three milestones, with less help each time.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "Nobody presses anything. About what number shows 10 seconds after the pet starts?"
  options: ["3", "10", "0", "1"]
  actual: "3. forever waits 3 seconds, then adds 1 to hunger and shows it, again and again: 1 after 3 seconds, 2 after 6, 3 after 9."
```

This is the heart of the pet: time making hunger go up.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: microbit, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I watched hunger go up by itself and compared it with my prediction." }
```

Watch for about 10 seconds without pressing anything.

## Investigate

```step
stage: investigate
code: lesson.ts#sol-m3
insight: "A pet is a variable that forever changes by itself, events that change it back, and decisions that turn the number into a face."
tasks:
  - check:
      type: question
      q: "A feeds the pet: if hunger > 0, change hunger by -1. Why is the if there?"
      options: ["So hunger never goes below 0", "So A only works once", "So hunger goes up instead", "To make the pet sleep"]
      answer: 0
      explain: "Without the if, feeding a full pet makes hunger -1, -2, -3. The if only takes 1 away while there is some hunger to take."
  - check:
      type: trace
      text: "The face is chosen by if hunger < 3 … else if hunger < 6 … else. What does each hunger show?"
      table: |
        | hunger | face |
        | 1 | [happy] |
        | 4 | [asleep] |
        | 8 | [sad] |
      explain: "The questions are asked from the top and the first true one wins. 4 is not less than 3, but it is less than 6."
  - check:
      type: question
      q: "A shake picks a trick with get value at (pick random 0 to length of tricks − 1). You add a fourth trick. What else must change?"
      options: ["Nothing: length of tricks grows with the list", "The 3 in pick random", "The shake block", "You need a second list"]
      answer: 0
      explain: "length of tricks is now 4, so pick random already reaches the new trick."
```

This is the finished pet. Read it before you build your own.

### Feeding

### Faces

### Tricks

## Milestone 1: hungry over time

```step
stage: modify
insight: "Time is just forever with a pause: each time round, the number changes by itself."
try: { playground: microbit, starter: "lesson.ts#m1" }
hint:
  - "Inside forever: pause, then change hunger by 1, then show number hunger."
  - "3000 ms is 3 seconds."
check: { type: code, text: "Every few seconds, hunger goes up by 1 by itself, and shows.", rules: { inside: { "basic.forever": ["basic.pause(", "hunger+="] } } }
```

The variable `hunger` and the feeding button **A** are made for you.

1. Inside **forever**, pause for 3 seconds.
2. Then change `hunger` by 1 and show it.

## Milestone 2: a face for each feeling

```step
stage: modify
insight: "Ranges turn one number into one of three faces: the first true question wins."
try: { playground: microbit, starter: "lesson.ts#m2" }
hint:
  - "Replace show number with one if block. Click + to add else if and else."
  - "Ask hunger < 3 first, then hunger < 6. Anything else is very hungry."
check: { type: code, text: "The face shows how the pet feels: happy, tired or sad, from hunger, in one if … else if … else.", rules: { contains: ["if(hunger<", "elseif(hunger<", "}else{"] } }
```

Swap the number for a face. Choose your own pictures:

- **hunger** below 3: happy.
- Below 6: tired or bored.
- Anything else: sad.

## Milestone 3: tricks

```step
stage: make
insight: "Combining a list, a random place and an event shows whether a student can put the course's ideas together."
try: { playground: microbit, starter: "lesson.ts#m3" }
check: { type: code, text: "A shake makes the pet do a trick, picked at random from a list of tricks.", rules: { inside: { "input.onGesture(Gesture.Shake": ["tricks[randint(0,tricks.length-1)]"] } } }
```

The list `tricks` is made for you. Make a **shake** show one trick, picked at random. Add a trick of your own to the list.

## Make it yours

```step
stage: modify
try: { playground: microbit, starter: "lesson.ts#sol-m3" }
```

Give your pet a life of its own. Some ideas:

- It **sleeps** when it is dark (light level), and hunger stops going up.
- **B** plays with it, which makes it hungrier.
- A second need, such as `bored`, with its own number.

```teacher
summary: "Students build a pocket pet in three milestones, using forever, events, a variable, ranges with else if, and a random pick from a list."
time: 55
timing: "Predict, Run, Investigate 12 min · Milestone 1 10 min · Milestone 2 12 min · Milestone 3 12 min · Make it yours 9 min"
goals:
  - I can make a number change by itself as time passes.
  - I can turn one number into one of several pictures with else if.
  - I can put the ideas of the course together into a small game.
before: |
  This challenge uses every lesson in the course and adds nothing new. The pet is a variable, `hunger`, that **forever** makes go up (pause, then change by 1); **A** brings it down (with an **if** so it never goes below 0); **if … else if … else** turns the number into a face; and a **shake** picks a trick from a **list** at random. The milestones fade the help: Milestone 1 gives nearly all the code, Milestone 2 an outline, Milestone 3 only a goal. Build it yourself first; it takes about ten minutes.
running:
  - "Predict and Run: the pause sets the pet's speed of life. Ask what would make it get hungry faster."
  - "Investigate: three looks back: an if that guards a number, ranges, and a list with its length."
  - "Milestone 1: if hunger never changes, the change block is outside forever."
  - "Milestone 2: the order of the questions matters, as in The first true question wins."
  - "Milestone 3: the trick uses pick random 0 to length − 1, from Pick from a list."
  - "Make it yours: the sleeping pet needs an if around the change in forever."
stuck:
  - see: "hunger never changes."
    ask: "Is the change block inside forever?"
    fix: "Drag change hunger by 1 inside forever, after the pause."
  - see: "The pet is always sad, or always happy."
    ask: "Read the questions from the top with hunger at 4. Which is true first?"
    fix: "Ask < 3 first, then < 6, then else."
  - see: "hunger goes below 0."
    ask: "What does A do when hunger is already 0?"
    fix: "Only change hunger by -1 if hunger > 0."
stretch: "Add a second need, bored, with its own number, its own button and its own face rule. Which need wins when both are high?"
support: "Pair students for Milestone 3: one reads the goal aloud while the other builds."
leads: "Course complete. Next: micro:bit: talk and play, where functions name jobs and radio connects micro:bits. With real micro:bits: keep the pet in a pocket for a lesson and see if it survives."
exit:
  q: "Your pet has: if hunger < 6 tired, else if hunger < 3 happy, else sad. What does it show when hunger is 1, and why?"
  a: "Tired. 1 is less than 6, so the first question is true and the rest are skipped. Ask < 3 first."
explain: |
  A pocket pet is a few ideas from the course working together:

  - **forever** with a **pause** makes `hunger` go up by itself.
  - **on button A pressed** brings it down, with an **if** so it never goes below 0.
  - **if … else if … else** turns the number into a face; the first true question wins.
  - **on shake** picks a trick from a **list** with **pick random 0 to length − 1**.
solutions:
  step-4: lesson.ts#sol-m1
  step-5: lesson.ts#sol-m2
  step-6: lesson.ts#sol-m3
struggle: "Putting it all in the right blocks. Ask which block each job belongs in: time, button, face or shake."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 2
      do: |
        Decide with your partner what number shows after 10 seconds.
      notes: "Count it out together: 3, 6, 9 seconds."
    - at: investigate
      title: Whose job is it?
      minutes: 4
      do: |
        Four corners of the room: forever, A, face, shake. The teacher reads a job ("gets hungrier", "picks a trick", "eats"); students go to the corner that does it.
      notes: "This is the plan for the milestones: each job has one home."
    - at: end
      title: Pet show
      minutes: 4
      do: |
        Leave your pet running and visit another table. Can you keep their pet happy for a minute?
```

```code lesson.ts#predict
let hunger = 0
basic.forever(function () {
    basic.pause(3000)
    hunger += 1
    basic.showNumber(hunger)
})
```

```code lesson.ts#m1
let hunger = 0
input.onButtonPressed(Button.A, function () {
    if (hunger > 0) {
        hunger += -1
    }
    basic.showIcon(IconNames.Heart)
})
basic.forever(function () {

})
```

```code lesson.ts#sol-m1
let hunger = 0
input.onButtonPressed(Button.A, function () {
    if (hunger > 0) {
        hunger += -1
    }
    basic.showIcon(IconNames.Heart)
})
basic.forever(function () {
    basic.pause(3000)
    hunger += 1
    basic.showNumber(hunger)
})
```

```code lesson.ts#m2
let hunger = 0
input.onButtonPressed(Button.A, function () {
    if (hunger > 0) {
        hunger += -1
    }
    basic.showIcon(IconNames.Heart)
})
basic.forever(function () {
    basic.pause(3000)
    hunger += 1
    basic.showNumber(hunger)
})
```

```code lesson.ts#sol-m2
let hunger = 0
input.onButtonPressed(Button.A, function () {
    if (hunger > 0) {
        hunger += -1
    }
    basic.showIcon(IconNames.Heart)
})
basic.forever(function () {
    basic.pause(3000)
    hunger += 1
    if (hunger < 3) {
        basic.showIcon(IconNames.Happy)
    } else if (hunger < 6) {
        basic.showIcon(IconNames.Asleep)
    } else {
        basic.showIcon(IconNames.Sad)
    }
})
```

```code lesson.ts#m3
let tricks = ["SPIN", "JUMP", "WAVE"]
let hunger = 0
input.onButtonPressed(Button.A, function () {
    if (hunger > 0) {
        hunger += -1
    }
    basic.showIcon(IconNames.Heart)
})
basic.forever(function () {
    basic.pause(3000)
    hunger += 1
    if (hunger < 3) {
        basic.showIcon(IconNames.Happy)
    } else if (hunger < 6) {
        basic.showIcon(IconNames.Asleep)
    } else {
        basic.showIcon(IconNames.Sad)
    }
})
```

```code lesson.ts#sol-m3
let tricks = ["SPIN", "JUMP", "WAVE"]
let hunger = 0
input.onButtonPressed(Button.A, function () {
    if (hunger > 0) {
        hunger += -1
    }
    basic.showIcon(IconNames.Heart)
})
input.onGesture(Gesture.Shake, function () {
    basic.showString(tricks[randint(0, tricks.length - 1)])
})
basic.forever(function () {
    basic.pause(3000)
    hunger += 1
    if (hunger < 3) {
        basic.showIcon(IconNames.Happy)
    } else if (hunger < 6) {
        basic.showIcon(IconNames.Asleep)
    } else {
        basic.showIcon(IconNames.Sad)
    }
})
```
