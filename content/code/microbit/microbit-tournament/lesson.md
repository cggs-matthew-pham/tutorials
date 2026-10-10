---
order: 14
unit: challenge
optional: true
title: Tournament
summary: Take the Radio duel further. A scoreboard kept in a list, rounds that start themselves, and a champion at three wins.
language: makecode
explainPicture: tournament.ts#board
hook: "A tennis scoreboard, a chess clock and an esports bracket all do the same jobs: keep both scores, start the next round, and declare a winner."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@tournament.ts#board", lesson: "code/microbit/microbit-tournament", target: "microbit" }
  caption: "scores is a list of two numbers"
  say: "scores is a list of two numbers: place zero is you, place one is them."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "A win adds at place 0; a loss at place 1."
        say: "A win adds one at place zero. A loss adds one at place one."
    - caption:
        text: "Your partner counts from its side: 2 - 1 for you is 1 - 2 for them."
        say: "Your partner counts from its side: two one for you is one two for them."
    - click: "Run"
    - wait: 600
    - caption:
        text: "startRound is a function, so the winner starts the next round."
        say: "start round is a function, so the winner's micro:bit starts the next round."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
This lesson goes further than the Radio duel, for two players. You will add three things, one milestone each:

1. A **scoreboard** kept in a list: place 0 for you, place 1 for the other player.
2. A **round function**, so the winner's micro:bit starts the next round by itself.
3. A **champion**: the first to three wins, and both micro:bits reset for a new tournament.

## Predict

```step
stage: predict
code: tournament.ts#board
check:
  type: predict
  q: "scores is [2, 1]. You press A+B. What does the micro:bit show?"
  options: ["3", "2, then -, then 1", "1, then -, then 2", "21"]
  actual: "2, then -, then 1. showScores shows place 0 (your score), a dash, then place 1 (the other player's)."
```

## Run

```step
stage: run
code: tournament.ts#board
try: { playground: microbit, starter: "tournament.ts#board" }
check: { type: reflect, text: "I pressed A+B and read the scoreboard." }
```

Press **A+B**. Then change the numbers in the list and try again.

## Investigate

```step
stage: investigate
code: tournament.ts#board
insight: "Both micro:bits run the same program, so each keeps its own player at place 0: the two scoreboards show the same match from opposite sides."
tasks:
  - check:
      type: match
      q: "Match each block with what it does to the scoreboard."
      pairs:
        - ["get value at 0 from scores", "your wins"]
        - ["get value at 1 from scores", "the other player's wins"]
        - ["set value at 0 of scores to (scores[0] + 1)", "adds one to your wins"]
  - check:
      type: question
      q: "You lead 2 to 1. What does your partner's scoreboard show?"
      options: ["2 - 1", "1 - 2", "3 - 0", "Nothing"]
      answer: 1
      explain: "Your partner's micro:bit runs the same program, but its place 0 is your partner. From their side it is 1 - 2."
```

### The scoreboard

Match each block with its job.

### Two sides of one match

Both micro:bits run the same program.

## Milestone 1: keep score

```step
stage: modify
insight: "Each event updates the right place in the list: a win adds to place 0, a loss to place 1."
try: { playground: microbit, starter: "tournament.ts#m1" }
hint:
  - "In A (you pressed first): set value at 0 of scores to (get value at 0 + 1)."
  - "When 2 arrives while racing (you lost): add 1 at place 1 instead."
check: { type: code, text: "Add a point at place 0 when you win a round, and at place 1 when you lose one.", rules: { contains: ["scores[0]=scores[0]+1", "scores[1]=scores[1]+1"] } }
```

This is the duel with a scoreboard and a **showScores** function already made. Update `scores` when you win a round and when you lose one. Check with **A+B**.

## Milestone 2: the next round

```step
stage: modify
insight: "Moving a sequence into a function lets a second event reuse it, so the game can carry on without a button press."
try: { playground: microbit, starter: "tournament.ts#m2" }
hint:
  - "Make a function startRound and move everything inside B into it. B then calls startRound."
  - "After a win: pause, call showScores, then call startRound. After a loss: pause and call showScores."
check: { type: code, text: "A startRound function, called from B and after each win, so rounds keep coming.", rules: { count: { "startRound()": 3 }, contains: ["functionstartRound("] } }
```

Make a function **startRound** from the blocks inside **B**. After each round, both players see the scores, and the **winner's** micro:bit starts the next round.

## Milestone 3: champion

```step
stage: make
insight: "Ending a tournament joins every idea: a list item compared with a target, a new message in the code, and a function that resets the state."
try: { playground: microbit, starter: "tournament.ts#m3" }
hint:
  - "After a win: if scores[0] = 3, send 3 and show Champion; else start the next round."
  - "When 3 arrives: show Game over. A function newTournament sets scores back to [0, 0]; call it on both sides."
check: { type: code, text: "First to three wins the tournament: send 3, both sides show the result, and the scores reset.", rules: { contains: ["scores[0]==3", "radio.sendNumber(3)", "receivedNumber==3"] } }
```

Finish the tournament:

- The first player to **3** wins: their micro:bit sends **3** and shows Champion.
- When **3** arrives, show Game over.
- Both scoreboards reset for the next tournament.

## Run a class tournament

```step
stage: modify
try: { playground: microbit, starter: "tournament.ts#m3" }
```

With real micro:bits, run a knockout: each pair picks its own group number, winners move on and play each other. Ideas to make it yours: first to five, a sound for the champion, or showing the scores after every round on both sides.
