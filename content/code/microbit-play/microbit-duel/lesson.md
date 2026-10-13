---
order: 8
unit: challenge
reviews: [name-a-job, shared-code, remember-state, message-decides]
assumes: [variable, variable-update, if, else, random, bool-value, radio, radio-number, function]
title: Radio duel
summary: Turn the reaction timer into a two-player race over radio. First to press after the heart wins.
language: makecode
explainPicture: duel.ts#start
hook: "Quiz shows use buzzers that lock out everyone else the moment one player presses. That is a few radio messages and a true/false variable."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@duel.ts#start", lesson: "code/microbit-play/microbit-duel", target: "microbit" }
  caption: "Both micro:bits agree a code"
  say: "Both micro:bits run the same program, and agree a code."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "0 get ready, 1 go, 2 I pressed first."
        say: "Zero means get ready, one means go, two means I pressed first."
    - caption:
        text: "racing is true only while a round is on."
        say: "racing is true only while a round is on, so only the first press counts."
    - click: "Run"
    - wait: 600
    - caption:
        text: "The function go keeps one copy of the signal."
        say: "The go function keeps one copy of the signal, so both see the same."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Two players, two micro:bits. Either player presses **B** to start a round. After a random wait, the heart appears on both; the first to press **A** wins the round. Both micro:bits run the **same** program, and they agree on a code: **0** means get ready, **1** means go, **2** means I pressed first.

In the simulator, the second micro:bit appears because the program uses radio. Press B on one, then race yourself by pressing A on either.

## Predict

```step
stage: predict
code: duel.ts#start
check:
  type: predict
  q: "Player 1 presses B. When the heart appears, where does it show?"
  options: ["Only on player 1's micro:bit", "Only on player 2's micro:bit", "On both, at almost the same moment", "Nowhere until A is pressed"]
  actual: "On both. Player 1's micro:bit sends 1 and shows its own heart; player 2's shows its heart when the 1 arrives."
```

## Run

```step
stage: run
code: duel.ts#start
try: { playground: microbit, starter: "duel.ts#start" }
check: { type: reflect, text: "I pressed B on one micro:bit and saw the heart appear on both." }
```

Press **B** on either micro:bit and watch both.

## Investigate

```step
stage: investigate
code: duel.ts#start
insight: "Two micro:bits stay in step by agreeing on a code of messages. The same blocks written twice must be kept the same by hand, which is a reason for a function."
tasks:
  - check:
      type: match
      q: "Match each message with what it means in the duel."
      pairs:
        - ["0", "get ready: clear the screen, no racing yet"]
        - ["1", "go: show the heart and start racing"]
        - ["2", "I pressed first: you lose this round"]
  - check:
      type: question
      q: "The blocks 'show heart, set racing to true' appear in two places. You change the heart to a diamond in one place only. What goes wrong?"
      options: ["Nothing", "The player who pressed B sees a different signal from the other player", "The radio stops working", "Both see the diamond"]
      answer: 1
      fault: design
      misconception: copied-blocks
      explain: "Copied blocks have to be changed in every copy. Forget one and the two players see different signals: an unfair race. A function keeps one copy."
  - check:
      type: match
      q: "The receiving part in Python. Match each line with what it does."
      pairs:
        - ["if receivedNumber == 0:", "checks for get ready"]
        - ["elif receivedNumber == 1:", "otherwise, checks for go"]
        - ["racing = True", "remembers that a round is on"]
```

### The code

Match each message with its meaning.

### Two copies

Look for blocks that appear twice.

### In Python

```python
def on_received_number(receivedNumber):
    global racing
    if receivedNumber == 0:
        racing = False
        basic.clear_screen()
    elif receivedNumber == 1:
        basic.show_icon(IconNames.HEART)
        racing = True
radio.on_received_number(on_received_number)
```

`elif` is Python's short way to write *else if*.

## Milestone 1: one go function

```step
stage: modify
insight: "A function removes the copy: both places call one job, so a change happens everywhere at once."
try: { playground: microbit, starter: "duel.ts#start" }
hint:
  - "Make a Function called go, and drag show heart and set racing to true into it."
  - "Put call go in both places where those blocks were."
check: { type: code, text: "Make a function go for the heart and racing, and call it from both places.", rules: { defs: 1, calls: 2 } }
```

Make a function **go** that shows the heart and sets `racing` to true. Call it in **both** places, so there is one copy to change.

## Milestone 2: first press wins

```step
stage: modify
insight: "One message tells the other player the result, and racing makes sure only the first press counts."
try: { playground: microbit, starter: "duel.ts#m2" }
hint:
  - "In A: if racing, set racing to false, send 2 and show a happy face."
  - "In on radio received, add else if receivedNumber = 2: if racing, set racing to false and show a sad face."
check: { type: code, text: "The first press after the heart sends 2 and wins; the other player sees they lost.", rules: { contains: ["radio.sendNumber(2)", "receivedNumber==2"], inside: { "input.onButtonPressed(Button.A": ["if(racing"] } } }
```

- When **A** is pressed while racing: stop racing, send **2**, show a happy face.
- When **2** arrives while racing: stop racing, show a sad face.

## Milestone 3: first to three

```step
stage: make
insight: "A match adds a score variable and one more agreed message, without changing how a round works."
try: { playground: microbit, starter: "duel.ts#m3" }
hint:
  - "A variable wins goes up by 1 each time you win a round. A+B shows it."
  - "When wins reaches 3, send 3 and show a trophy (a picture). When 3 arrives, the other player shows game over."
check: { type: code, text: "Count wins, and the first to three wins the match: send 3, and the other shows game over.", rules: { contains: ["wins+=1", "wins==3", "radio.sendNumber(3)", "receivedNumber==3"] } }
```

Make it a **match**: the first player to win **three** rounds wins.

- Count your round wins; **A+B** shows them.
- At three wins, send **3** and show a trophy.
- When **3** arrives, show game over.

## Fair play

```step
stage: modify
code: duel.ts#start
check:
  type: question
  q: "Two real micro:bits play the duel in a classroom where another pair also uses group 7. What could go wrong?"
  options: ["Nothing", "The other pair's messages arrive too, so their go or win messages mix into your race", "The hearts get smaller", "Group 7 is too high"]
  answer: 1
  explain: "Every micro:bit in group 7 hears every message. Each pair needs its own group number, as in the Send and receive lesson."
```

Play a match against a partner. Agree a group number of your own before you start.
