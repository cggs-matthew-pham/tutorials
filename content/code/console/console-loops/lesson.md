---
order: 3
unit: apps
introduces: [while]
title: Keep asking
summary: Repeat with while until something is true, count with +=, and keep a running total.
language: python
hook: "A PIN pad lets you try again, a game keeps going until you win, and a till keeps adding until you pay: all of them are loops that run until something changes."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "while repeats until its question is no longer true"
  say: "A while loop keeps repeating for as long as its question is true."
  pacing: { keyDelayMs: 22 }
  clip:
    - caption:
        text: "while asks a question before every lap."
        say: "while asks its question before every lap of the loop."
    - type: { into: "Python code", text: "total = 0\nwhile total < 10:\n    total += int(input(\"Add: \"))\n    print(\"Total: \" + str(total))\n" }
    - caption:
        text: "+= adds to total, so the question's answer changes."
        say: "Plus equals adds to total, so the answer to the question changes."
    - click: "Run"
    - type: { selector: ".con-in", text: "4" }
    - press: Enter
    - type: { selector: ".con-in", text: "5" }
    - press: Enter
    - type: { selector: ".con-in", text: "3" }
    - press: Enter
    - expect: { selector: "#status", contains: "Finished" }
    - caption:
        text: "12 is not less than 10, so the loop stops."
        say: "Twelve is not less than ten, so the loop stops."
    - wait: 1500
---
A `for` loop in the turtle course repeated a fixed number of times. Sometimes a program cannot know how many times in advance: keep asking until the guess is right, or until the total reaches 100. That is a `while` loop.

## Predict

```step
stage: predict
code: loops.py#predict
check:
  type: predict
  q: "The secret is 7. You guess 10, then 3, then 7. How many times does the program ask for a guess?"
  kind: number
  actual: "3 times. After 10 and 3 the guess is still not 7, so the loop asks again. After 7 the question guess != secret is False, so the loop stops and Got it! is printed."
```

`while guess != secret:` asks a question before every lap: is the guess **not equal** to the secret? While the answer is yes, the indented lines run again.

## Run

```step
stage: run
code: loops.py#game
try: { starter: "loops.py#game", height: 440 }
check: { type: reflect, text: "I can explain why the loop stops when I guess the number." }
unlocks: [while-loop, add-to]
```

This version picks a random secret from 1 to 20 and counts your tries. Play it a few times. What is the smallest number of guesses that always works?

## Investigate

```step
stage: investigate
code: loops.py#game
insight: "A while loop stops only when something inside it changes the answer to its question; += keeps a count or a total as it goes."
tasks:
  - check:
      type: trace
      text: "The secret is 12. Fill in what happens after each guess."
      table: |
        | guess | tries | prints | loop again? |
        | 5 | 1 | Higher | yes |
        | 15 | [2] | [Lower] | [yes] |
        | 12 | [3] | [Got it in 3 tries!] | [no] |
      explain: "tries += 1 adds one each lap. After 12, guess != secret is False, so the loop stops and the line after it runs."
  - check:
      type: question
      q: "Why does the program set guess = 0 before the loop?"
      options: ["So while has a guess to compare the first time it asks", "Because the secret is 0", "To make the game harder", "It does nothing: the line could go"]
      answer: 0
      feedback: [null, "The secret comes from random.randint(1, 20), so it is never 0.", "It has no effect on the secret or the guesses.", "Take it out and while stops with a NameError: guess has no value yet."]
      explain: "while asks its question before the first lap, so guess needs a value already. 0 can never be the secret, so the loop always runs at least once."
  - check:
      type: bug
      code: loops.py#bug
      text: "This should stop once the total reaches 100, but it keeps asking for ever, even after 60 and 50. Click the line that causes it."
      answer: 4
      fault: logic
      misconception: loop-never-changes
      explain: "total + points works out a sum but does not store it, so total stays 0 and total < 100 is always True. total += points (or total = total + points) changes it."
```

`tries += 1` is short for `tries = tries + 1`: add one to what is stored. Python reads `while` as a question asked again before every lap.

### Trace a game

Follow three guesses.

### Why guess = 0?

The line before the loop.

### Spot the bug

A loop that never ends. Press **Stop** if you run it.

## Modify

```step
stage: modify
insight: "The loop's question decides when the game ends; joining two conditions with and lets it end for two reasons."
try: { starter: "loops.py#modify", height: 460 }
tasks:
  - hint: "Change randint(1, 20) and the question in the input line."
    check: { type: code, text: "Pick the secret from 1 to 100.", rules: { contains: ["randint(1, 100)"] } }
  - hint:
      - "Add a second question to the while line with and: keep going while the guess is wrong and tries < 5."
      - "After the loop, use if guess == secret to print the win message, else print the secret."
    check: { type: code, text: "Allow only 5 tries, then reveal the secret.", rules: { contains: ["tries < 5", "else:"] } }
```

### A harder game

Pick the secret from **1 to 100**.

### Five tries only

Stop after **5 tries**. If the player runs out, print the secret.

## Make a points counter

```step
stage: make
insight: "A running total is the same pattern as the guessing game: a while loop, a value that changes each lap, and a line after the loop."
try: { starter: "loops.py#make", height: 440 }
check: { type: code, text: "Keep asking for points until 0 is typed, then print the total and the number of scores.", rules: { loops: 1, contains: ["while", "+=", "input("] } }
```

Write a **points counter** for a game or a sports day. It keeps asking for points until someone types `0`, adding each score to a total. Then it prints the total and how many scores were added, such as `Total: 23 from 4 scores.`

## Where this leads

```step
stage: info
check:
  type: question
  q: "A phone lets you try your PIN until you get it right or have tried 5 times. Which line is closest to how it decides whether to ask again?"
  options: ["while pin != correct and tries < 5:", "for i in range(5):", "if pin == correct:", "print(pin)"]
  answer: 0
  explain: "Keep asking while the PIN is wrong and there are tries left: two reasons to stop, joined with and, like the five-tries game."
```

Loops that wait for the right answer are everywhere: PIN pads, game loops, and programs that keep asking until the input is valid. Next lesson puts a whole menu inside a loop that runs until you choose to quit.
