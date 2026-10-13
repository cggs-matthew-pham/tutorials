---
order: 5
unit: numbers
moveId: check-first
reviews: [text-to-number, if-else]
introduces: [dotted-call]
assumes: [input, to-text, text-join, variable, if, else, compare, and-or]
title: Check first
summary: Ask the typed text whether it is all digits with isdigit, and use an if to choose, so a typo gets an answer instead of a crash.
language: python
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
  url: http://127.0.0.1:8123/index.html
  ready: Python code
  layout: full
hook: "Type a word into a quantity box and a good app says so politely. A careless one crashes. The difference is one question asked before the number is used."
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "isdigit asks the text if it is all digits"
  say: "Is digit asks the text if it is all digits."
  pacing: { keyDelayMs: 22 }
  clip:
    - type: { into: "Python code", text: "text = input(\"How old are you? \")\n", append: true }
    - caption:
        text: "text.isdigit() asks the text: are you all digits? The answer is True or False."
        say: "The answer is true or false."
    - type: { into: "Python code", text: "if text.isdigit():\n", append: true }
    - type: { into: "Python code", text: "    age = int(text)\n    print(\"Next year you will be \" + str(age + 1) + \".\")\nelse:\n    print(\"Please type your age as a number.\")\n", append: true }
    - click: "Run"
    - type: { selector: ".con-in", text: "twelve" }
    - press: Enter
    - expect: { selector: "#output", contains: "Please type" }
    - caption:
        text: "No crash: the else path answered instead."
        say: "No crash. The else path answered instead."
    - wait: 800
---
Last lesson `int()` turned typed digits into a number. But `int("twelve")` stops the program with an error. A careful program **checks first**, and chooses what to do.

## Predict

```step
stage: predict
code: lesson.py#check
check:
  type: predict
  q: "You run it and type twelve. What happens?"
  options:
    - "It prints Please type your age as a number."
    - "It stops with an error on the int line"
    - "It prints Next year you will be 13."
    - "It prints nothing at all"
  fault: runtime
  misconception: int-reads-words
  actual: "It prints Please type your age as a number. The if asks whether the text is all digits first. twelve is not, so the else path runs, and int is never reached."
```

You know `if` and `else`. Read the code, including the new `text.isdigit()`. What happens if you type `twelve`?

## Run

```step
stage: run
code: lesson.py#check
try: { starter: "lesson.py#check", height: 420 }
```

Run it three times: with `12`, with `twelve`, and with `-3`.

| Line | What it does | Why |
|---|---|---|
| `if text.isdigit():` | Asks the text: are you made only of digits? | The dot means "ask this text". The answer is `True` or `False`, which an `if` can use |
| `age = int(text)` | Turns the text into a number | Only runs when the check said yes, so it cannot fail |
| `else:` | Runs when the check said no | The person gets a reply instead of a crash |

A minus sign is not a digit, so `-3` fails the check. That suits an age.

## Investigate

```step
stage: investigate
code: lesson.py#check
insight: "The check goes before the conversion. Asking first is what stops the crash."
tasks:
  - check:
      type: trace
      text: "For each answer typed, fill in what text.isdigit() gives and what the program prints."
      table: |
        | typed | text.isdigit() | prints |
        | 12 | True | Next year you will be 13. |
        | twelve | [False] | [Please type your age as a number.] |
        | 9 | [True] | [Next year you will be 10.] |
        | 4.5 | [False] | [Please type your age as a number.] |
      explain: "isdigit() is True only when every character is a digit from 0 to 9. A full stop is not a digit, so 4.5 fails too."
  - check:
      type: bug
      code: lesson.py#bug
      text: "The program has a check, but typing twelve still crashes it. Click the line that is in the wrong place."
      answer: 2
      fault: runtime
      misconception: check-after-convert
      explain: "int(text) runs on line 2, before the check on line 3, so the crash happens before the program has asked. The conversion has to go inside the if."
```

### Trace the check

Four answers, four paths.

### Spot the bug

The check is there, but it comes too late.

## Modify

```step
stage: modify
insight: "Two checks joined with and: the if runs only when both are true."
try: { starter: "lesson.py#modify", height: 420 }
hint:
  - "Ask for two answers, store them as text, and check both: first.isdigit() and second.isdigit()."
  - "Inside the if, convert each with int and print the total."
check: { type: code, text: "Ask for two numbers, check both, and print their total.", rules: { contains: [".isdigit() and", "int("] } }
```

Change the program so it asks for **two** numbers, checks both, and prints their total. If either answer is not a number, print a message instead.

## Mix it up

```step
stage: investigate
code: lesson.py#review
insight: "isdigit checks the shape of the text, not whether the answer makes sense."
check:
  type: question
  q: "The person types 0. What does the program print?"
  options: ["That will be $0.", "Please type a number.", "It stops with an error"]
  answer: 0
  feedback: [null, "0 is a digit, so the check says yes.", "0 is a digit, so int works."]
  explain: "isdigit is True for 0, so the program calculates 0 tickets at $12, which is $0. The check only asks whether the text is all digits."
```

This mixes the last lesson and `if`: a typed number, converted, and used.

## Make

```step
stage: make
try: { starter: "lesson.py#make", height: 420 }
hint:
  - "Store the answer as text first, then check it, then convert it inside the if."
  - "Put the cost calculation inside the if, and a helpful message in the else."
check: { type: code, text: "Ask how many tickets, check it with isdigit, and print the total cost.", rules: { contains: ["input(", ".isdigit()", "int(", "12"] } }
unlocks: [check-then-convert]
```

Tickets to the school play cost **$12** each. Write a ticket machine that asks how many tickets, checks the answer is a number, and prints the total, such as `That will be $36.` If the answer is not a number, it prints a helpful message. Test it with 3, with 0 and with `three`.

```teacher
summary: Students learn to check typed text with isdigit before converting it, so a typo gets a reply, not a crash.
time: 30
timing: "Predict and Run 8 min · Investigate 8 min · Modify 5 min · Mix it up 3 min · Make 8 min"
goals:
  - I can use isdigit to check typed text before turning it into a number.
  - I can say why the check goes before the conversion.
  - I can write a program that replies politely to a typo.
running:
  - "Predict: take a vote before running. The wrong options are three real beliefs: int reads words, the crash happens anyway, and nothing happens. Ask the 'error' voters what they think isdigit does, and the '13' voters whether Python can read words."
  - "Run: run with 12, twelve and -3. Ask which path each took."
  - "Investigate: the bug is about order. Ask a student to say what the program does first."
  - "Make: students test with a number, zero and a word. Ask them to try something to break it (the empty answer, a space)."
stuck:
  - see: The program still crashes on a word.
    ask: Is int( ) inside the if, or before it?
    fix: Store the text first, check it, and convert only inside the if.
  - see: A NameError for age or number in the else path.
    ask: Where is that name made, and does the else path reach it?
    fix: Names made inside the if exist only on that path. The else path should only use the text.
stretch: What does the check say for an empty answer? Try it and fix the message.
support: Give the if / else with the middle lines missing and ask the student to complete them.
leads: "Next lesson: instead of ending after one bad answer, the program keeps asking until it gets a good one."
exit:
  q: "Why does the check go before int, and what does text.isdigit() give?"
  a: "int stops the program on text that is not digits, so the program asks first. isdigit gives True or False."
explain: |
  `int("twelve")` stops the program with an error, so a careful program checks first. `text.isdigit()` asks the text whether it is all digits and gives back `True` or `False`, which an `if` uses. The dot means "ask this text": the same shape appears for many questions you can ask a piece of text.

  The pattern is: store the text, check it, convert inside the `if`, and reply in the `else`.
solutions:
  step-4: lesson.py#sol-sum
  step-6: lesson.py#sol-tickets
struggle: "Putting the conversion before the check. Ask which line runs first."
class:
  activities:
    - at: end
      title: Break my machine
      minutes: 4
      do: |
        Swap seats and try to crash your partner's ticket machine with unusual answers. Can you find one?
      notes: "Empty answers, spaces, negative numbers and decimals are all good tries. Ask what the check says for each."
```

```code lesson.py#check
text = input("How old are you? ")
if text.isdigit():
    age = int(text)
    print("Next year you will be " + str(age + 1) + ".")
else:
    print("Please type your age as a number.")
```

```code lesson.py#bug
text = input("How old are you? ")
age = int(text)
if text.isdigit():
    print("Next year you will be " + str(age + 1) + ".")
else:
    print("Please type your age as a number.")
```

```code lesson.py#modify
text = input("How old are you? ")
if text.isdigit():
    age = int(text)
    print("Next year you will be " + str(age + 1) + ".")
else:
    print("Please type your age as a number.")
```

```code lesson.py#review
text = input("How many tickets? ")
if text.isdigit():
    print("That will be $" + str(int(text) * 12) + ".")
else:
    print("Please type a number.")
```

```code lesson.py#make
# Ticket machine: tickets cost $12 each.
# Ask how many tickets, check the answer is a number, then print the total cost.

```

```code lesson.py#sol-sum
first = input("First number: ")
second = input("Second number: ")
if first.isdigit() and second.isdigit():
    total = int(first) + int(second)
    print("The total is " + str(total) + ".")
else:
    print("Please type two whole numbers.")
```

```code lesson.py#sol-tickets
text = input("How many tickets? ")
if text.isdigit():
    print("That will be $" + str(int(text) * 12) + ".")
else:
    print("Please type a number, such as 3.")
```
