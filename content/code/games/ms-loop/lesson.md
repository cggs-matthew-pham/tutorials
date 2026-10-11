---
order: 1
unit: loop
title: A game loop
summary: "Every game engine runs your game in a loop: init once, then update and draw about 60 times a second. Make a ball move across the screen in microStudio."
language: python
hook: "Every game you have played redraws the whole screen about 60 times a second. Between pictures, the game moves everything a tiny bit."
---
**microStudio** is a free game engine that runs in the browser. You write Python there, and it runs your game. These lessons show each game working on this page; you make your own copy on **microstudio.dev**.

A microStudio game is three functions, and you never call them yourself: the engine does.

- `init()` runs **once**, when the game starts: set things up here.
- `update()` runs **60 times a second**: move things, check keys, keep score.
- `draw()` runs after each update: clear the screen and draw everything where it is now.

The middle of the screen is `(0, 0)`. `y` goes **up** to `100` at the top and down to `-100` at the bottom; `x` goes left and right from the middle.

## Predict

```step
stage: predict
code: game.py#predict
check:
  type: predict
  q: "What happens when the game runs?"
  options: ["A yellow dot slides to the right and off the screen", "A yellow dot sits still in the middle", "A yellow dot jumps to x = 1 and stops", "Nothing: no function is called"]
  actual: "The dot slides right. update() runs 60 times a second, so x goes up by 1 each time: 60 steps to the right every second. Nothing brings it back, so it slides off the edge."
```

Nobody calls `update()` in this code. Who does, and how often?

## Run

```step
stage: run
code: game.py#run
try: { playground: microstudio, starter: "game.py#run" }
check: { type: reflect, text: "I have watched x go up and the dot start again from the left." }
```

Watch the number at the top: that is `x`, going up by 1 sixty times a second. When it passes `100`, `update()` sends the dot back to `-100`.

**Now make your own copy.** Open [microstudio.dev](https://microstudio.dev) in a new tab and click **Create**, then make a new project. Choose **Python** as its language (in the new project box, or later in the project's **Settings**). Open its **Code** tab, replace everything in the file `main` with the code above (use its Copy button), then press **Run** ▶. Keep this tab open for every lesson.

## Investigate

```step
stage: investigate
code: game.py#run
insight: "The engine calls init once, then update and draw again and again; a variable that update changes needs global, because it was made outside update."
tasks:
  - check:
      type: match
      q: "Match each function with when the engine runs it."
      pairs:
        - ["init()", "once, when the game starts"]
        - ["update()", "60 times a second, to change things"]
        - ["draw()", "after each update, to show things"]
  - check:
      type: question
      q: "The game has run for 2 seconds. About how far has the dot moved?"
      options: ["120 steps", "2 steps", "60 steps", "200 steps"]
      answer: 0
      explain: "update() runs 60 times a second and adds 1 to x each time: 2 × 60 = 120 steps (it wraps back to -100 after 200)."
  - check:
      type: bug
      code: game.py#bug
      text: "This stops with an error: cannot access local variable 'x'. Click the line where it goes wrong."
      answer: 6
      fault: runtime
      misconception: global-missing
      explain: "x += 1 changes x, but update() has no global x line, so Python looks for an x made inside update() and finds none. Add global x as the first line of update()."
```

### When does each run?

The engine decides, not you.

### How far?

Count the frames.

### Spot the bug

The same game, one line missing.

## Modify

```step
stage: modify
code: game.py#run
insight: "x moves left and right, y moves up and down; a speed kept in a variable can change sign to bounce."
try: { playground: microstudio, starter: "game.py#sol-bounce" }
tasks:
  - hint:
      - "Use y instead of x: the dot is drawn at (x, 0) now. Draw it at (0, y)."
      - "Start y at -100, add 1 to it in update(), and when y > 100, set it back to -100."
    check: { type: reflect, text: "My dot moves up the screen and starts again at the bottom." }
  - hint:
      - "Keep a speed in a second variable, dx = 1, and add it: x += dx."
      - "When x > 100 or x < -100, turn the speed round: dx = -dx. Both x and dx need to be in the global line."
    check: { type: reflect, text: "My dot bounces between the edges." }
```

### Up, not across

In your microStudio project, make the dot move **up** the screen instead, and start again at the bottom.

### Bounce

Make the dot **bounce** off each edge instead of starting again. The game on this page shows a bouncing dot.

## Make: something that moves

```step
stage: make
code: game.py#make
insight: "Goals only: a value changed in update and used in draw makes anything move."
try: { playground: microstudio, starter: "game.py#sol-make" }
check: { type: reflect, text: "I made at least two things move in my own way." }
```

Start from this empty game in microStudio and make at least **two things move** in different ways: one faster than the other, one going the other way, one changing size... The game on this page is one idea. `screen.fillRect(x, y, width, height, colour)` draws a box, `screen.fillRound(...)` a dot, and `screen.drawText(text, x, y, size, colour)` writes.

## Where this leads

```step
stage: info
check:
  type: question
  q: "In the turtle course, events waited for a click or a key. What does a game loop do instead?"
  options: ["It runs update and draw again and again, whether or not anything happens", "It waits for a click before every frame", "It runs once, then stops", "It runs draw only when you press a key"]
  answer: 0
  explain: "A game loop never waits: 60 times a second it updates and redraws, which is why things can move on their own. Clicks and keys are checked inside update()."
```

Every game engine works this way: Unity, Godot, Pico-8 and MakeCode Arcade all call an update and a draw function every frame. Next: move something with the arrow keys.
