---
order: 4
unit: adventure
introduces: [try]
title: When things go wrong
summary: Catch an error with try and except, so a typing mistake gets a helpful reply and the program asks again.
language: python
hook: "Apps you trust never crash when you mistype: they catch the mistake, say what they wanted, and ask again."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "try runs code that might fail; except says what to do if it does"
  say: "try runs code that might fail, and except says what to do then."
  pacing: { keyDelayMs: 18 }
  clip:
    - caption:
        text: "int() on letters would stop the program with a ValueError..."
        say: "int on letters would stop the program with a value error."
    - type: { into: "Python code", text: "text = input(\"Age? \")\ntry:\n    age = int(text)\n    print(\"Next year: \" + str(age + 1))\nexcept ValueError:\n    print(\"That is not a number.\")\n" }
    - caption:
        text: "...so try it, and except ValueError catches that error."
        say: "So try it, and except value error catches that error."
    - click: "Run"
    - type: { selector: ".con-in", text: "twelve" }
    - press: Enter
    - expect: { selector: "#output", contains: "That is not a number." }
    - caption:
        text: "The program replies instead of stopping."
        say: "The program replies, instead of stopping."
    - wait: 1500
---
In the console bridge you checked typed numbers with `isdigit()` **before** using them. Another way is to just **try**, and say what to do if it goes wrong. `try` runs some lines; if one of them causes a `ValueError`, Python jumps to `except ValueError:` instead of stopping the program.

## Predict

```step
stage: predict
code: errors.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["That is not a number. then Done", "Next year: 13 then Done", "It stops with a ValueError", "Only Done"]
  actual: "That is not a number. then Done. int(\"twelve\") causes a ValueError, so Python skips the rest of try and runs the except lines. Then the program carries on after them."
```

`int("twelve")` cannot work. Inside `try`, what happens to the next line, and does the program stop?

## Run

```step
stage: run
code: errors.py#tickets
try: { starter: "errors.py#tickets", height: 420 }
check: { type: reflect, text: "I can explain how the program keeps asking until it gets a whole number." }
unlocks: [try-and-except]
```

Try `three`, then `3.5`, then ` 4 `. The loop asks again after each mistake; `break` leaves it once `int()` works.

## Investigate

```step
stage: investigate
code: errors.py#tickets
insight: "try and except catch one named kind of error; the program decides what still counts as wrong."
tasks:
  - check:
      type: question
      q: "Which answer does int() accept, so the loop stops?"
      options: ["-2", "3.5", "three", "3 tickets"]
      answer: 0
      explain: "int(\"-2\") is the number -2, so nothing goes wrong and the loop stops, charging $-24. A caught error is not the same as a sensible answer: the program still has to check the number."
  - check:
      type: question
      q: "Compared with isdigit() in the console bridge, what does try let you do?"
      options: ["Just try it, and handle the error if it happens", "Never get errors at all", "Turn letters into numbers", "Skip the input"]
      answer: 0
      explain: "isdigit() checks first; try does it and catches the error. Python programmers often say it is easier to ask forgiveness than permission."
  - check:
      type: bug
      code: errors.py#bug
      text: "This should say There is no such room, but it stops with KeyError: attic. Click the line that is wrong."
      answer: 4
      fault: runtime
      misconception: except-any
      explain: "except ValueError only catches a ValueError. A missing key is a KeyError, so it should be except KeyError:."
```

### Which answers pass?

What `int()` accepts.

### Try or check first?

Two ways to deal with bad input.

### Spot the bug

An error that was not caught.

## Modify

```step
stage: modify
insight: "A caught error keeps the program running; the code inside try decides what still counts as a good answer."
try: { starter: "errors.py#canteen", height: 460 }
tasks:
  - hint:
      - "After count = int(text), only break if the count is between 1 and 10."
      - "if count >= 1 and count <= 10: then break; otherwise print Choose 1 to 10."
    check: { type: code, text: "Only accept 1 to 10 of an item.", rules: { contains: ["count >= 1", "count <= 10"] } }
  - hint: "Before the try in the first loop, add: if item == \"quit\": break, and say goodbye instead of asking how many."
    check: { type: code, text: "Let the customer type quit instead of an item.", rules: { contains: ["if item == \"quit\""] } }
```

A canteen with two kinds of mistake: an item that is not on the menu (`KeyError`) and a number that is not a number (`ValueError`). Try both.

### One to ten

Only accept **1 to 10** of an item.

### Quit

Let the customer type `quit` instead of an item.

## Make a safe calculator

```step
stage: make
insight: "One try can have several excepts, one for each kind of thing that can go wrong."
try: { starter: "errors.py#make", height: 420 }
check: { type: code, text: "Divide two numbers, catching ValueError and ZeroDivisionError, and ask again after either.", rules: { loops: 1, contains: ["except ValueError", "except ZeroDivisionError"] } }
```

Ask for two whole numbers and print the first divided by the second. Catch **two** kinds of mistake, each with its own `except` and its own message: a typing mistake (`ValueError`) and dividing by zero (`ZeroDivisionError`). After either, ask again.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A game loads a saved file that has been deleted. What should a well-made program do?"
  options: ["Catch the error, say the save is missing, and start a new game", "Crash", "Delete the game", "Nothing"]
  answer: 0
  explain: "Files, networks and people all go wrong. Catching the error and carrying on sensibly is what makes a program feel solid."
```

Next: the text adventure, built from the parser, the bag, the map and safe input.
