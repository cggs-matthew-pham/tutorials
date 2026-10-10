---
order: 4
unit: apps
introduces: [break]
assumes: [bool-value]
title: A text menu
summary: Put a menu inside while True, choose with if and elif, leave with break, and test the app against a table of cases.
language: python
hook: "Ticket machines, ATMs and the settings on a phone are all menus: show the choices, wait for one, do it, and show the menu again."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "A menu is a loop that runs until you choose to leave"
  say: "A menu is a loop that keeps going until you choose to leave."
  pacing: { keyDelayMs: 18 }
  clip:
    - caption:
        text: "while True repeats for ever, until break."
        say: "while True would repeat for ever. break is the way out."
    - type: { into: "Python code", text: "total = 0\nwhile True:\n    choice = input(\"1 add $5, 2 pay: \")\n    if choice == \"1\":\n        total += 5\n    elif choice == \"2\":\n        print(\"Total: $\" + str(total))\n        break\n" }
    - click: "Run"
    - type: { selector: ".con-in", text: "1" }
    - press: Enter
    - type: { selector: ".con-in", text: "1" }
    - press: Enter
    - caption:
        text: "Each choice runs one branch, then the menu asks again."
        say: "Each choice runs one branch, then the menu asks again."
    - type: { selector: ".con-in", text: "2" }
    - press: Enter
    - expect: { selector: "#output", contains: "Total: $10" }
    - caption:
        text: "Choosing 2 prints the total, and break leaves the loop."
        say: "Choosing two prints the total, and break leaves the loop."
    - wait: 1500
---
This lesson puts everything in the course together: a **menu** that shows the choices, waits for one, does it, and shows the menu again, until you choose to leave. Then you test it the way programmers do, against a table of cases.

## Predict

```step
stage: predict
code: menu.py#till
check:
  type: predict
  q: "You type 1, then 1, then 2, then 3. What total is printed?"
  kind: number
  actual: "8. Two drinks at $3 and one snack at $2 make 8. Choosing 3 prints the total, then break leaves the loop and Thank you! is printed."
```

`while True:` asks a question whose answer is always yes, so the menu would repeat for ever. The way out is `break`: it leaves the loop at once. What total does this canteen till print?

## Run

```step
stage: run
code: menu.py#till
try: { starter: "menu.py#till", height: 480 }
check: { type: reflect, text: "I can explain how the till keeps showing the menu, and how it stops." }
unlocks: [break]
```

Run it. Order a few things, type something that is not on the menu, then pay. Compare the result with your prediction.

## Investigate

```step
stage: investigate
code: menu.py#till
insight: "A menu app is a loop, a decision and a way out; testing it means choosing inputs and writing down the output you expect before you run them."
tasks:
  - check:
      type: trace
      text: "A test case is what you type and the output you expect. Fill in the total each case should print, then run each case to check."
      table: |
        | what you type | total printed |
        | 1, 3 | 3 |
        | 2, 2, 3 | [4] |
        | 5, 1, 3 | [3] |
        | 3 | [0] |
      explain: "5 is not on the menu, so the else replies and nothing is added. Paying straight away prints 0. Good test cases include normal choices, a wrong choice and the smallest order."
  - check:
      type: bug
      code: menu.py#bug
      text: "Whatever you type, this till only ever says Please type 1, 2 or 3. Click the first line that goes wrong."
      answer: 4
      fault: logic
      misconception: input-is-text
      explain: "input() gives back text, so choice is \"1\", never the number 1. \"1\" == 1 is False, so every choice falls through to the else. Compare with text: choice == \"1\"."
  - check:
      type: parsons
      code: menu.py#parsons
      text: "Put the lines in order: a till that adds $3 for choice 1 and pays on choice 2."
      explain: "The total starts before the loop. Inside while True: ask, then decide. Paying prints the total and then breaks out."
  - check:
      type: question
      q: "What does break do?"
      options: ["Stops the whole program with an error", "Leaves the loop straight away; the program carries on after it", "Skips to the next choice", "Shows the menu again"]
      answer: 1
      explain: "break leaves the loop it is in. The line after the loop, print(\"Thank you!\"), still runs."
```

`while True:` uses `True`, a value that is always yes. `show_menu()` is a function, so the menu text is written once and shown on every lap.

### Test cases

Work out the expected output before you run anything.

### Spot the bug

A till that never understands you.

### Build the loop

Put the lines in order.

### The way out

What `break` does.

## Modify

```step
stage: modify
insight: "A new choice is a new elif and a new line in show_menu; the loop and the way out stay the same."
try: { starter: "menu.py#modify", height: 480 }
tasks:
  - hint:
      - "Add a line to show_menu, and a new elif with total += 5."
      - "Paying moves to choice 4, so change that elif and the messages too."
    check: { type: code, text: "Add a sandwich for $5 as choice 3; paying becomes choice 4.", rules: { contains: ["total += 5", "elif choice == \"4\""] } }
  - hint: "A new elif sets total back to 0 and prints a message. Add it to show_menu as well."
    check: { type: code, text: "Add a choice that starts the order again.", rules: { contains: ["Start again", "total = 0"] } }
```

### Add a sandwich

Add a **sandwich for $5** as choice 3. Paying becomes choice 4.

### Start again

Add a choice called **Start again** that clears the order (the total goes back to 0). Test it: order something, start again, then pay.

## Make your own app

```step
stage: make
insight: "Planning the menu and the test cases first is what turns a program into an app someone else can use."
try: { starter: "menu.py#make", height: 500 }
tasks:
  - hint:
      - "Plan first: write the menu's choices on paper. One of them quits."
      - "Copy the shape of the till: a show_menu function, total or score before the loop, while True, input, if and elif, and break on the quit choice."
    check: { type: code, text: "A menu app: a function for the menu, while True, at least three choices with if and elif, and break to quit.", rules: { defs: 1, loops: 1, contains: ["while True", "elif", "break"] } }
  - check: { type: reflect, text: "I wrote three test cases (what to type and what it should print), including one wrong choice, and my app passed all three." }
```

### Build the app

Make a small menu app of your own: a **quiz** (each choice asks a question and keeps a score), a **converter** (centimetres to metres, minutes to seconds), or a **shop**. It needs a function that prints the menu, a `while True` loop, at least three choices with `if` and `elif`, and a choice that quits with `break`.

### Test it

Write three test cases in a table, like the one in Investigate: what you type, and what the app should print. Include one choice that is not on the menu. Run each case and fix anything that does not match.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Before a new ticket machine goes into the station, the company tries it with hundreds of planned inputs, including wrong ones. What are those?"
  options: ["Test cases", "Loops", "Menus", "Variables"]
  answer: 0
  explain: "Test cases: planned inputs with the output expected, including mistakes a real person might make. Professional programmers write them before or alongside the code."
```

You have built a real app: it talks to its user, checks what they type, keeps going until they leave, and passes its test cases. Every Python extension starts from here: games with many objects, data detective work with real data sets, and web apps where the menu becomes buttons.
