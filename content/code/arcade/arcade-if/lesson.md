---
order: 5
unit: decide
title: If, every frame
summary: Put an if inside on game update, so the game keeps checking a question while it runs.
language: makecode
introduces: [if]
explainPicture: if.ts#predict
hook: "In Pac-Man, go off one side of the screen and you come back on the other. The game is asking 'has Pac-Man gone off the edge?' many times every second."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@if.ts#predict", lesson: "code/arcade/arcade-if", target: "arcade" }
  caption: "An if runs only when its question is true"
  say: "An if runs its blocks only when its question is true."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "In on start, it is asked once."
        say: "In on start, the question is asked once, before the game begins."
    - caption:
        text: "In on game update, about 30 times a second."
        say: "In on game update, it's asked every frame, about 30 times a second."
    - click: "Run"
    - wait: 600
    - caption: "To keep checking something, put the if in on game update."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
A game needs to **decide**: has the car gone off the screen? Is the player in the safe zone? An **if** block (in **Logic**) asks a yes-or-no question, such as *is car x more than 160?* If the answer is yes (**true**), it runs the blocks inside. If no (**false**), it skips them.

But **when** is the question asked? That depends on where the if sits. **on game update** (in **Game**) runs its blocks **every frame**: about 30 times a second, for as long as the game runs.

## Predict

```step
stage: predict
code: if.ts#predict
check:
  type: predict
  q: "The car drives right at speed 50. What happens when it reaches the right edge?"
  options: ["It comes back in on the left, again and again", "It drives off the screen and is gone", "It stops at the edge", "It bounces back to the left"]
  actual: "It comes back in on the left, again and again. on game update asks 'is car x more than 160?' every frame; once the car is past the edge the answer is yes, so its x is set to 0."
```

`>` means "more than". The screen is 160 pixels across.

## Run

```step
stage: run
code: if.ts#predict
try: { playground: arcade, starter: "if.ts#predict" }
check: { type: reflect, text: "I watched the car reach the edge a few times and compared it with my prediction." }
```

Watch the car for a few laps. This is called **wrap-around**.

## Investigate

```step
stage: investigate
code: if.ts#predict
insight: "on game update runs its blocks every frame, so an if there keeps asking its question and acts the moment it becomes true; an if in on start is asked once, before the game begins."
try: { playground: arcade, starter: "if.ts#predict" }
tasks:
  - check:
      type: number
      q: "The car starts at x 10 and moves 50 pixels every second. After how many seconds does it first jump back to the left?"
      answer: 3
      explain: "It must get from 10 to past 160: that is 150 pixels. At 50 pixels a second, that takes 3 seconds. Until then the question is asked every frame and the answer is no."
  - check:
      type: question
      q: "About how often does the if inside on game update ask 'is car x more than 160?'"
      options: ["Once, when the game starts", "Once a second", "About 30 times a second, for as long as the game runs", "Only when the car reaches the edge"]
      answer: 2
      explain: "on game update runs every frame, about 30 times a second. Most of the time the answer is no and nothing happens; the frame the car is past the edge, the answer is yes."
  - starter: if.ts#in-start
    check:
      type: question
      q: "Sam thought on game update was untidy, so he moved the if into on start (the playground has his version). The car drives off the screen and never comes back. Why?"
      options: ["The car is too fast for the if to see it", "on start runs once, before the game begins: the if asks its question one time, when the car is at x 10, and never again", "An if only works with a button", "x can never be more than 160"]
      answer: 1
      fault: logic
      misconception: check-in-start
      explain: "Blocks in on start run once, at the start. Then the car is at x 10, so the answer is no, and the question is never asked again. To keep checking, the if must be in on game update."
```

### How long until it wraps?

Work it out from the numbers.

### How often?

### Sam's tidy version

Sam's program (it is in the playground: run it):

```makecode
car.setPosition(10, 60)
car.vx = 50
if (car.x > 160) {
    car.x = 0
}
```

Fix it: drag the if into an **on game update** block.

## Modify

```step
stage: modify
insight: "Each edge needs its own question; anything can go inside the if, such as a point for every lap."
try: { playground: arcade, starter: "if.ts#modify" }
tasks:
  - hint: ["Drag in a second if, under the first one, inside on game update.", "Ask 'car x < 0', and set car x to 160 inside it."]
    check: { type: code, text: "Make the car wrap the other way too: off the left edge, it comes back on the right.", rules: { count: { "if(": 2 }, contains: ["car.x<"] } }
  - hint: ["change score by is in Info.", "Put it inside the first if, under set car x to 0."]
    check: { type: code, text: "Score a point every time the car wraps around the right edge.", rules: { inside: { "game.onUpdate(": ["info.changeScoreBy("] } } }
```

### Both ways

Now you drive the car (left and right arrows). Drive off the right: it wraps. Drive off the left: it is lost. Add a second **if** so the left edge wraps too.

### Count the laps

Score a point each time the car wraps around the right edge.

## Make

```step
stage: make
try: { playground: arcade, starter: "if.ts#make" }
hint:
  - "You need an on game update block with an if inside. The question is about hero y."
  - "Near the top is a small y: ask 'hero y < 30'. Inside, set the background colour."
  - "A second if, 'hero y ≥ 30', can set the colour back."
check: { type: code, text: "A safe zone: when the hero is near the top of the screen (y less than 30), the background changes colour, checked every frame.", rules: { inside: { "game.onUpdate(": ["if(", "scene.setBackgroundColor("] } } }
```

Make a **safe zone** at the top of the screen. Move the hero with the arrow keys.

- When the hero is in the top **30** pixels, the background turns a different colour.
- When the hero leaves, the colour goes back (a second **if**).

Remember: y counts **down**, so the top of the screen is a **small** y.

## Change a lift

```step
stage: modify
try: { playground: arcade, starter: "if.ts#lift" }
```

This lift rises up the building and, at the top, goes straight back to the ground floor. Make it slower, and make it go back to the ground floor from the **third floor** (about y 40) instead of the top.
