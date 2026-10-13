---
order: 8
unit: loops
moveId: read-for-the-job
reviews: [repeat-until, running-total, check-first, if-else]
assumes: [while, input, to-text, text-join, variable, variable-update, if, else, elif, compare, and-or, random]
title: Guess the number
summary: Read a whole guessing game that uses loops, checks and a counter together, then change it and build a dice game from the same parts.
language: python
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
  url: http://127.0.0.1:8123/index.html
  ready: Python code
  layout: full
hook: "Real programs are longer than a few lines. The skill is to find the part that does a job, then change just that part."
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "A longer program is made of parts that each do one job"
  say: "A longer program is made of parts, and each part does one job."
  pacing: { keyDelayMs: 18 }
  clip:
    - caption:
        text: "First, pick a secret and ask for a guess."
        say: "First, pick a secret and ask for a guess."
    - type: { into: "Python code", text: "secret = 7\nguess = input(\"Guess a number from 1 to 20: \")\ntries = 1\n", append: true }
    - caption:
        text: "Keep going until the guess is the secret."
        say: "Keep going until the guess is the secret."
    - type: { into: "Python code", text: "while guess != str(secret):\n", append: true }
    - caption:
        text: "Check the guess, answer it, ask again and count."
        say: "Check the guess, answer it, ask again, and count."
    - type: { into: "Python code", text: "    if guess.isdigit() == False:\n        print(\"Type a whole number.\")\n    elif int(guess) < secret:\n        print(\"Too low.\")\n    else:\n        print(\"Too high.\")\n    guess = input(\"Try again: \")\n    tries += 1\nprint(\"Got it in \" + str(tries) + \" tries!\")\n", append: true }
    - click: "Run"
    - type: { selector: ".con-in", text: "10" }
    - press: Enter
    - type: { selector: ".con-in", text: "7" }
    - press: Enter
    - expect: { selector: "#output", contains: "tries" }
    - wait: 800
---
This program uses only what you already know: `input`, `while`, a check, `+=` and `if` / `elif` / `else`. It is longer, so the skill now is **reading**: finding which part does which job, and how the parts depend on each other.

## Predict

```step
stage: predict
code: lesson.py#fixed
check:
  type: predict
  q: "The secret is 7. You type 10, then 3, then 7. What number does the last line show?"
  kind: number
  actual: "3. tries starts at 1. The wrong guess 10 is followed by one more try, so tries is 2, then the wrong guess 3 makes it 3. 7 is right, so the loop ends and the program shows Got it in 3 tries!"
```

Read the program, one part at a time. How many tries will it say?

## Run

```step
stage: run
code: lesson.py#fixed
try: { starter: "lesson.py#fixed", height: 460 }
check: { type: reflect, text: "I can point to the line that ends the loop and the line that counts the tries." }
```

Run it with 10, 3, 7. The secret is fixed at 7 for now, so you can follow it. Watch for which part of the program runs after each guess.

## Investigate

```step
stage: investigate
code: lesson.py#game
insight: "A longer program is made of parts that each do one job. Find the part, see what it depends on, and you can change it without breaking the rest."
tasks:
  - check:
      type: match
      q: "Match each part of the program with its job."
      pairs:
        - ["secret = random.randint(1, 20)", "the computer picks a secret number"]
        - ["while guess != str(secret):", "keeps asking until the guess is the secret"]
        - ["elif int(guess) < secret:", "tells the player the guess was too low"]
        - ["tries += 1", "counts every guess"]
      explain: "The loop is the engine: it repeats the check, the hint, the new question and the count until the guess is right."
  - check:
      type: bug
      code: lesson.py#bug
      text: "With this version the program always says Got it in 2 tries, however many guesses it took. Click the wrong line."
      answer: 12
      fault: logic
      misconception: update-outside-loop
      explain: "tries += 1 is not indented, so it runs once after the loop, not on every guess. Indent it so it runs on every pass."
```

### Find the parts

Match each part with its job.

### Spot the bug

The counter is always the same.

## Modify

```step
stage: modify
insight: "Change one part at a time and run after each change; the rest of the program should keep working."
try: { starter: "lesson.py#game", height: 460 }
tasks:
  - hint:
      - "Which line decides how big the secret can be?"
      - "Change the second number in randint."
    check: { type: code, text: "Pick the secret from 1 to 100.", rules: { contains: ["randint(1, 100)"] } }
  - hint:
      - "The loop keeps going while the guess is wrong AND tries is under 5."
      - "After the loop, use an if to say either Got it or reveal the secret."
    check: { type: code, text: "Allow only 5 tries, then reveal the secret.", rules: { contains: ["tries < 5", "and"] } }
```

Change the game one step at a time. Run after each change.

### A bigger range

Pick the secret from 1 to 100.

### Only five tries

Stop after five wrong guesses and show the secret.

## Make

```step
stage: make
try: { starter: "lesson.py#make", height: 420 }
hint:
  - "Roll once before the loop. The loop keeps going while the roll is not 6."
  - "Inside the loop roll again and add 1 to the count."
check: { type: code, text: "Roll a dice until a six comes up, then print how many rolls it took.", rules: { loops: 1, contains: ["randint(1, 6)", "+= 1"] } }
```

Make a dice game with the same parts. The computer rolls a dice (a random number from 1 to 6) again and again until it gets a six, then prints how many rolls it took.

```teacher
summary: Students read a guessing game made of moves they know, find the part that does each job, change one part, and build a dice game from the same pieces.
time: 35
timing: "Predict and Run 8 min · Investigate 9 min · Modify 8 min · Make 10 min"
goals:
  - I can point to the lines that do each job in a longer program.
  - I can change one part of a program without breaking the rest.
  - I can build a new loop from parts I know.
running:
  - "Predict: students read the program and work out the count by hand before running."
  - "Run: run with 10, 3, 7. Ask which line ended the loop."
  - "Investigate: the match task is the key. Ask which part would you change to make the game harder?"
  - "Modify: encourage one change and a run at a time, and ask what each change affected."
  - "Make: the dice game is the same shape as the guessing game with the check removed."
stuck:
  - see: The loop ends at once or never.
    ask: What does the condition say, and what changes it?
    fix: Trace the first two passes with the typed answers.
  - see: A TypeError comparing text with a number.
    ask: Which side is text and which is a number?
    fix: guess is text. Use int(guess) to compare it with the secret, or str(secret) to compare as text.
stretch: Add a 'warm' hint when the guess is within 3 of the secret.
support: Give the dice program with the loop condition missing and ask for it.
leads: "Next lesson: a menu that keeps showing until the person chooses to quit."
exit:
  q: "Which line in the guessing game makes it ask again, and which line counts the guesses?"
  a: "guess = input(\"Try again: \") asks again, and tries += 1 counts."
explain: |
  A longer program is easier to read once you split it into jobs: set up (the secret and the first guess), the loop (keep asking until the guess is right), the check and hint inside the loop, and the count. Each job uses a move from an earlier lesson.

  The secret comes from `random.randint(1, 20)`, which gives a random whole number from 1 to 20. For now it is a recipe to copy.
solutions:
  step-4#t1: lesson.py#sol-hundred
  step-4#t2: lesson.py#sol-limit
  step-5: lesson.py#sol-dice
struggle: "Holding the whole program in mind. Split it into jobs and trace one pass."
class:
  activities:
    - at: predict
      kind: discussion
      title: Read it like a computer
      minutes: 4
      do: |
        Read the program with your partner. One of you says each line aloud; the other keeps the value of tries on paper.
      notes: "Count before anyone runs it. The common slip is forgetting tries starts at 1."
```

```code lesson.py#fixed
secret = 7
guess = input("Guess a number from 1 to 20: ")
tries = 1
while guess != str(secret):
    if guess.isdigit() == False:
        print("Type a whole number.")
    elif int(guess) < secret:
        print("Too low.")
    else:
        print("Too high.")
    guess = input("Try again: ")
    tries += 1
print("Got it in " + str(tries) + " tries!")
```

```code lesson.py#game
import random

secret = random.randint(1, 20)
guess = input("Guess a number from 1 to 20: ")
tries = 1
while guess != str(secret):
    if guess.isdigit() == False:
        print("Type a whole number.")
    elif int(guess) < secret:
        print("Too low.")
    else:
        print("Too high.")
    guess = input("Try again: ")
    tries += 1
print("Got it in " + str(tries) + " tries!")
```

```code lesson.py#bug
secret = 7
guess = input("Guess a number from 1 to 20: ")
tries = 1
while guess != str(secret):
    if guess.isdigit() == False:
        print("Type a whole number.")
    elif int(guess) < secret:
        print("Too low.")
    else:
        print("Too high.")
    guess = input("Try again: ")
tries += 1
print("Got it in " + str(tries) + " tries!")
```

```code lesson.py#make
# Dice game: roll until a six comes up, and count the rolls.
import random

```

```code lesson.py#sol-hundred
import random

secret = random.randint(1, 100)
guess = input("Guess a number from 1 to 100: ")
tries = 1
while guess != str(secret):
    if guess.isdigit() == False:
        print("Type a whole number.")
    elif int(guess) < secret:
        print("Too low.")
    else:
        print("Too high.")
    guess = input("Try again: ")
    tries += 1
print("Got it in " + str(tries) + " tries!")
```

```code lesson.py#sol-limit
import random

secret = random.randint(1, 20)
guess = input("Guess a number from 1 to 20: ")
tries = 1
while guess != str(secret) and tries < 5:
    if guess.isdigit() == False:
        print("Type a whole number.")
    elif int(guess) < secret:
        print("Too low.")
    else:
        print("Too high.")
    guess = input("Try again: ")
    tries += 1
if guess == str(secret):
    print("Got it in " + str(tries) + " tries!")
else:
    print("Out of tries. The secret was " + str(secret) + ".")
```

```code lesson.py#sol-dice
import random

roll = random.randint(1, 6)
count = 1
while roll != 6:
    roll = random.randint(1, 6)
    count += 1
print("It took " + str(count) + " rolls to get a six.")
```
