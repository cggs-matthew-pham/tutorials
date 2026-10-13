---
order: 7
unit: decide
reviews: [timer-spawns]
moveId: check-every-frame
title: If, every frame
summary: Put an if inside on game update, so the game keeps checking a question while it runs.
language: makecode
introduces: [if]
explainPicture: lesson.ts#predict
hook: "In Pac-Man, go off one side of the screen and you come back on the other. The game is asking 'has Pac-Man gone off the edge?' many times every second."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/arcade/arcade-if", target: "arcade" }
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
code: lesson.ts#predict
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
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I watched the car reach the edge a few times and compared it with my prediction." }
```

Watch the car for a few laps. This is called **wrap-around**.

## Investigate

```step
stage: investigate
code: lesson.ts#predict
insight: "on game update runs its blocks every frame, so an if there keeps asking its question and acts the moment it becomes true; an if in on start is asked once, before the game begins."
try: { playground: arcade, starter: "lesson.ts#predict" }
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
  - starter: lesson.ts#in-start
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
try: { playground: arcade, starter: "lesson.ts#modify" }
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

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "A timer runs its blocks every so many milliseconds; a smaller number means more often."
check:
  type: number
  q: "This timer runs every 2000 ms and makes one rock each time. How many rocks has it made after 6 seconds?"
  answer: 3
  explain: "2000 ms is two seconds, so it runs at 2, 4 and 6 seconds: 3 rocks."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "You need an on game update block with an if inside. The question is about hero y."
  - "Near the top is a small y: ask 'hero y < 30'. Inside, set the background colour."
  - "A second if, 'hero y ≥ 30', can set the colour back."
check: { type: code, text: "A safe zone: when the hero is near the top of the screen (y less than 30), the background changes colour, checked every frame.", rules: { inside: { "game.onUpdate(": ["if(", "scene.setBackgroundColor("] } } }
unlocks: [check-every-frame]
```

Make a **safe zone** at the top of the screen. Move the hero with the arrow keys.

- When the hero is in the top **30** pixels, the background turns a different colour.
- When the hero leaves, the colour goes back (a second **if**).

Remember: y counts **down**, so the top of the screen is a **small** y.

## Change a lift

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#lift" }
```

This lift rises up the building and, at the top, goes straight back to the ground floor. Make it slower, and make it go back to the ground floor from the **third floor** (about y 40) instead of the top.

```teacher
summary: Students put an if inside on game update to make wrap-around and a safe zone, and find that an if in on start is asked only once.
time: 45
timing: "Predict and Run 8 min · Investigate 12 min · Modify 12 min · Make 10 min · Lift 3 min"
goals:
  - I can put an if inside on game update so the game keeps checking a question.
  - I can compare a sprite's x or y with a number using < and >.
  - I can explain why an if in on start does not keep checking.
before: |
  An **if** block asks a yes-or-no question (a **condition**), such as *car x > 160*. When the answer is yes (**true**), it runs the blocks inside; when no (**false**), it skips them.

  The new idea is **when** the question is asked. A game draws the screen again about **30 times a second**; each drawing is a **frame**. **on game update** runs its blocks once every frame, so an if inside it is asked over and over, and acts the moment the answer becomes yes. **on start** runs its blocks once, before the game begins. An if there is asked one time and then forgotten: this is the planted misconception (Sam's version).

  Remember y counts **down** the screen, so "near the top" is a **small** y. The comparison block is in **Logic**; the car x block is in **Sprites**. Try the Make task yourself first.
running:
  - "Predict: most students expect the car to vanish, or to bounce. Wrap-around is a surprise. Ask how often the question is asked."
  - "Run: ask 'who moves the car back?' Point at the if: the game asks this 30 times a second."
  - "Investigate: the number task is 150 pixels at 50 a second. Then Sam's version: let them run it, see the car disappear, and drag the if into on game update. Say: on start is once, on game update is always."
  - "Modify: the left edge is a second if with < 0. Laps: change score goes inside the first if, so it happens only when the car wraps."
  - "Make: two ifs, one for in the zone and one for out of it. The colour block is in Scene."
  - "Lift: no new ideas; the third floor is a bigger y than the top."
stuck:
  - see: "The if never does anything."
    ask: "Which block is your if inside: on start or on game update?"
    fix: "on start asks once, before anything moves. Drag the if into on game update."
  - see: "The safe zone colour comes on at the bottom of the screen."
    ask: "Which way does y count?"
    fix: "Down from the top, so near the top is y < 30, not y > 90."
  - see: "The score shoots up while the car is still on the screen."
    ask: "Is change score inside the if, or just inside on game update?"
    fix: "Outside the if, it runs every frame. Drag it inside the if, under set car x to 0."
stretch: "Make the safe zone a box in the middle of the screen: the hero is safe only when x and y are both inside it (an if inside an if)."
support: "Give students the on game update block with an empty if already in it, and ask them only to build the question and choose the colour."
leads: "Next lesson: else, and an enemy that chases you by comparing its position with yours. Class ideas: a screen where all four edges wrap (like Asteroids); a 'lava floor' that changes colour when the player is near the bottom."
exit:
  q: "Why does an if that checks 'player x > 150' work in on game update but not in on start?"
  a: "on game update runs every frame, so the question keeps being asked while the player moves. on start runs once, before the game begins, so the question is asked one time and never again."
explain: |
  An **if** runs its blocks only when its question is **true**. Where you put it decides **when** it is asked:

  1. **on start**: once, before the game begins.
  2. **on game update**: every frame, about **30 times a second**, for as long as the game runs.

  So to keep checking something (has the car gone off the edge?), put the if in **on game update**.
solutions:
  step-4#t1: lesson.ts#sol-left
  step-4#t2: lesson.ts#sol-laps
  step-6: lesson.ts#sol-make
struggle: "An if in on start is asked once; in on game update it's asked every frame. When the if never acts, ask which block it is inside."
class:
  activities:
    - at: investigate
      title: Are we there yet?
      minutes: 3
      do: |
        One student walks across the room. Another asks "past the door yet?" every second, and calls "back to start!" the moment the answer is yes.
      notes: "Asking once at the start would never catch it: that is Sam's if in on start."
```

```code lesson.ts#predict
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . . 2 2 2 2 . .
    . 2 9 9 2 9 2 .
    2 2 2 2 2 2 2 2
    . f . . . . f .
    `, SpriteKind.Player)
car.setPosition(10, 60)
car.vx = 50
game.onUpdate(function () {
    if (car.x > 160) {
        car.x = 0
    }
})
```

```code lesson.ts#in-start
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . . 2 2 2 2 . .
    . 2 9 9 2 9 2 .
    2 2 2 2 2 2 2 2
    . f . . . . f .
    `, SpriteKind.Player)
car.setPosition(10, 60)
car.vx = 50
if (car.x > 160) {
    car.x = 0
}
```

```code lesson.ts#modify
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . . 2 2 2 2 . .
    . 2 9 9 2 9 2 .
    2 2 2 2 2 2 2 2
    . f . . . . f .
    `, SpriteKind.Player)
car.setPosition(80, 60)
controller.moveSprite(car, 100, 0)
game.onUpdate(function () {
    if (car.x > 160) {
        car.x = 0
    }
})
```

```code lesson.ts#sol-left
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . . 2 2 2 2 . .
    . 2 9 9 2 9 2 .
    2 2 2 2 2 2 2 2
    . f . . . . f .
    `, SpriteKind.Player)
car.setPosition(80, 60)
controller.moveSprite(car, 100, 0)
game.onUpdate(function () {
    if (car.x > 160) {
        car.x = 0
    }
    if (car.x < 0) {
        car.x = 160
    }
})
```

```code lesson.ts#sol-laps
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . . 2 2 2 2 . .
    . 2 9 9 2 9 2 .
    2 2 2 2 2 2 2 2
    . f . . . . f .
    `, SpriteKind.Player)
car.setPosition(80, 60)
controller.moveSprite(car, 100, 0)
info.setScore(0)
game.onUpdate(function () {
    if (car.x > 160) {
        car.x = 0
        info.changeScoreBy(1)
    }
})
```

```code lesson.ts#review
let rock: Sprite = null
game.onUpdateInterval(2000, function () {
    rock = sprites.create(img`
        . e e .
        e e e e
        e e e e
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
})
```

```code lesson.ts#make
scene.setBackgroundColor(7)
let hero = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
hero.setPosition(80, 100)
controller.moveSprite(hero)
hero.setStayInScreen(true)
```

```code lesson.ts#sol-make
scene.setBackgroundColor(7)
let hero = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
hero.setPosition(80, 100)
controller.moveSprite(hero)
hero.setStayInScreen(true)
game.onUpdate(function () {
    if (hero.y < 30) {
        scene.setBackgroundColor(9)
    }
    if (hero.y >= 30) {
        scene.setBackgroundColor(7)
    }
})
```

```code lesson.ts#lift
scene.setBackgroundColor(13)
let lift = sprites.create(img`
    e e e e e e
    e 1 1 1 1 e
    e 1 f f 1 e
    e 1 f f 1 e
    e e e e e e
    `, SpriteKind.Player)
lift.setPosition(80, 110)
lift.vy = -20
game.onUpdate(function () {
    if (lift.y < 10) {
        lift.y = 110
    }
})
```
