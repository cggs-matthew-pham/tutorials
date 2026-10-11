---
order: 2
unit: loop
title: Keys and movement
summary: "Check the arrow keys in update() and move a paddle, keep it on the screen, then make a player that moves four ways and speeds up."
language: python
hook: "A game asks the keyboard a question 60 times a second: is the left arrow down right now?"
---
In the turtle course, pressing a key **called** a function once. A game engine works the other way round: every frame, `update()` **asks** whether a key is down, and moves a little if it is. Hold the key and it moves smoothly; let go and it stops.

`pressed("LEFT")` is a short helper at the top of the game: it is true while that key is down. Copy it as it is into every game (why it is needed is in Investigate).

## Predict

```step
stage: predict
code: game.py#predict
check:
  type: predict
  q: "You hold the right arrow for one second. What happens to the paddle?"
  options: ["It moves 120 steps right, smoothly", "It moves 2 steps right, once", "It jumps to the right edge", "It moves right and keeps going after you let go"]
  actual: "It moves 120 steps right. update() runs 60 times in that second, and each time the key is down px goes up by 2. Let go and pressed(\"RIGHT\") is false, so it stops."
```

How many times does `update()` run while you hold the key?

## Run

```step
stage: run
code: game.py#run
try: { playground: microstudio, starter: "game.py#run" }
check: { type: reflect, text: "I have moved the paddle with the arrow keys here and in my own microStudio project." }
```

Click the game, then hold the arrow keys. Then put this code in your microStudio project (a new project, or replace the code in last lesson's) and run it there.

## Investigate

```step
stage: investigate
code: game.py#run
insight: "Movement in a game is a question asked every frame: if the key is down, change the position a little."
tasks:
  - check:
      type: trace
      text: "px starts at 0. Fill in px after each frame."
      table: |
        | frame | key down | px |
        | 1 | RIGHT | 2 |
        | 2 | RIGHT | [4] |
        | 3 | none | [4] |
        | 4 | LEFT | [2] |
      explain: "Each frame with RIGHT down adds 2, a frame with no key changes nothing, and LEFT takes 2 away."
  - check:
      type: question
      q: "How would you make the paddle move faster?"
      options: ["Change px -= 2 and px += 2 to a bigger number, such as 4", "Call update() twice", "Hold the key down harder", "Change -80 to a bigger number"]
      answer: 0
      explain: "The paddle moves 2 steps a frame. 4 steps a frame is twice as fast. -80 is how high up the paddle is drawn."
  - check:
      type: bug
      code: game.py#bug
      text: "This looks right, but it stops with AttributeError: no attribute 'LEFT' before any key is pressed. Click the line where it goes wrong."
      answer: 7
      fault: runtime
      misconception: key-always-there
      explain: "microStudio adds keyboard.LEFT only after the first key press, so asking for it before then fails. The pressed() helper first checks the key is there with hasattr, so it is safe from the first frame."
```

### Trace the paddle

Four frames, one at a time.

### Faster

Which number is the speed?

### Spot the bug

Why the helper is there.

## Modify

```step
stage: modify
code: game.py#run
insight: "An if after the move keeps a value inside limits; each key is its own if, so two keys can work at once."
try: { playground: microstudio, starter: "game.py#sol-edges" }
tasks:
  - hint:
      - "After moving, check the edges: if px > 90, set it back to 90."
      - "Do the same for the left edge: if px < -90, px = -90."
    check: { type: reflect, text: "My paddle stops at both edges of the screen." }
  - hint:
      - "Add a second variable, py, for the height. Start it at -80 and draw the box at (px, py)."
      - "UP adds to py and DOWN takes away (y goes up the screen). Put py in both global lines."
    check: { type: reflect, text: "My paddle moves up and down as well as left and right." }
```

### Stay on the screen

Hold the right arrow for a while: the paddle disappears off the edge. Make it **stop at both edges**. The game on this page does.

### Up and down too

Make the up and down arrows move the paddle too.

## Make: a player that moves

```step
stage: make
code: game.py#make
insight: "Goals only: keys change variables in update, and draw shows them."
try: { playground: microstudio, starter: "game.py#sol-make" }
check: { type: reflect, text: "My player moves with the keys and does something more, such as a speed-up key." }
```

Make a player you can move all four ways, then add one thing of your own: a key that makes it go faster, a different colour when it is moving, wrapping round to the other side at the edges... Key names include `"SPACE"`, `"ENTER"` and letters such as `"Q"` (`"LEFT"` and the other arrows also work with W, A, S and D). The game on this page goes fast while you hold Space.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A player should jump once when Space is pressed, not keep jumping while it is held. Why does pressed(\"SPACE\") alone not do this?"
  options: ["It is true every frame the key is down, so the jump would start again and again", "It only works for arrow keys", "update() cannot change y", "It is only true for one frame"]
  answer: 0
  explain: "pressed() says whether the key is down now, every frame. A jump needs to remember it has started (a variable such as jumping = True), so a held key does not start it again."
```

Asking every frame is called **polling**; MakeCode and Godot can do both, polling and events. Next: lots of stars falling at once, each one an object.
