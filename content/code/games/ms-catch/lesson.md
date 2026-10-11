---
order: 4
unit: game
title: Catch and score
summary: "Put the paddle and the stars together: a star that touches the paddle scores a point and starts again. Add lives, a game over and a restart, then a power-up of your own."
language: python
hook: "A game is a loop, things that move, and one question asked every frame: are these two touching?"
---
This is the whole game: the paddle from Keys and movement, the stars from Stars as objects, and a `touches()` method that asks whether a star is close to the paddle. When it is, the score goes up and the star starts again from the top.

## Predict

```step
stage: predict
code: game.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["True, then False", "False, then True", "True, then True", "False, then False"]
  actual: "True, then False. The first star is 10 across and 4 up from the paddle: both are close enough (under 12 and under 8). The second is 30 across, too far."
```

`abs()` gives a distance without its sign: `abs(-4)` is `4`. Work out each distance across and up.

## Run

```step
stage: run
code: game.py#run
try: { playground: microstudio, starter: "game.py#run" }
check: { type: reflect, text: "I have caught stars and watched the score go up, here and in microStudio." }
```

Click the game and catch some stars. Then put this code in a microStudio project and run it there.

## Investigate

```step
stage: investigate
code: game.py#run
insight: "Collision is a question asked every frame for every star: close enough across and close enough up and down."
tasks:
  - check:
      type: question
      q: "Why does touches() use and, not or?"
      options: ["A star must be close across and close up and down at the same time to touch", "and is faster than or", "or would never be true", "It makes no difference"]
      answer: 0
      explain: "With or, a star anywhere in the same column (close across, far above) would count as a catch. Touching needs both distances small."
  - check:
      type: question
      q: "What would happen without star.restart() after score += 1?"
      options: ["The star stays on the paddle and scores a point every frame", "The star scores once and disappears", "The game stops with an error", "Nothing would change"]
      answer: 0
      explain: "The star would still be touching the paddle next frame, so the score would jump by 60 a second. restart() moves it back to the top."
  - check:
      type: bug
      code: game.py#bug
      text: "The score never goes past 1, however many stars you catch. Click the line that is wrong."
      answer: 10
      fault: logic
      misconception: score-set
      explain: "score = 1 sets the score to 1 every time. score += 1 adds one to what it was."
```

### Close enough

Both distances, or either?

### Why restart?

What if the star stayed where it is?

### Spot the bug

A score that is stuck.

## Modify

```step
stage: modify
code: game.py#run
insight: "A second counter counts misses; an if at the top of update stops the game, and calling init again starts it over."
try: { playground: microstudio, starter: "game.py#sol-restart" }
tasks:
  - hint:
      - "Start lives at 3 in init(). In update(), when a star falls past the bottom (star.y < -100), take a life and restart the star."
      - "Take the y < -100 check out of move(), so update() can count it. At the start of update(): if lives == 0: return, and draw GAME OVER when lives is 0."
    check: { type: reflect, text: "My game has 3 lives, and it shows GAME OVER when they are gone." }
  - hint:
      - "When lives is 0, check pressed(\"SPACE\")."
      - "Calling init() sets everything back to the start: stars, score and lives."
    check: { type: reflect, text: "Pressing Space after GAME OVER starts a new game." }
```

### Lives

Give the player **3 lives**: a star that reaches the bottom takes one. At 0 lives, stop the game and show **GAME OVER**.

### Play again

After GAME OVER, pressing **Space** starts a new game. The game on this page has both changes.

## Make: a power-up

```step
stage: make
code: game.py#make
insight: "Goals only: one kind of star that is different (faster, another colour) and worth more, told apart when it is caught."
try: { playground: microstudio, starter: "game.py#sol-make" }
check: { type: reflect, text: "My game has a power-up that looks different and is worth more." }
```

Add a **power-up**: a star that looks different and is worth more when caught (a gold star worth 5, a heart that gives back a life, a slow star that freezes the others...). It can be its own class, or a `Star` with an extra value. The game on this page has a fast gold star worth 5.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your game is finished. What makes it better to play, not just bigger?"
  options: ["Testing it with someone else and changing what is too hard, too easy or confusing", "Adding as many kinds of star as possible", "Making the stars faster every second", "Writing all the code in one function"]
  answer: 0
  explain: "Game designers call this playtesting: watching someone play shows what to change. Next lesson: pictures, sound and sharing your game."
```

You have now built a whole game in a real engine: a loop, input, objects, collisions and a score. Next: draw your own sprites, add sound, and share it.
