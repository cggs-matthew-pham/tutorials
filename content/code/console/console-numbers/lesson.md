---
order: 2
unit: text
introduces: [dotted-call]
assumes: [input, to-text, text-join]
title: Numbers from text
summary: Turn typed text into a number with int(), and check the text first with isdigit() so a typo does not crash the program.
language: python
hook: "Every app that asks for a quantity, an age or a PIN has to turn what you typed into a number, and cope when you type something else."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "a = input(\"First number: \")\nb = input(\"Second number: \")\nprint(a + b)\n", speed: 8 }
  caption: "input() gives text; int() makes it a number"
  say: "input always gives back text. int turns it into a number."
  pacing: { keyDelayMs: 12 }
  clip:
    - caption:
        text: "input() gives back text, even when digits are typed."
        say: "input gives back text, even when you type digits."
    - click: "Run"
    - type: { selector: ".con-in", text: "5" }
    - press: Enter
    - type: { selector: ".con-in", text: "5" }
    - press: Enter
    - expect: { selector: "#output", contains: "55" }
    - caption:
        text: "So + joins \"5\" and \"5\" into \"55\"."
        say: "So plus joins the text five and five into fifty-five."
    - caption:
        text: "int() turns text into a number. Now + adds."
        say: "int turns the text into a number. Now plus adds."
    - type: { into: "Python code", text: "a = int(input(\"First number: \"))\nb = int(input(\"Second number: \"))\nprint(a + b)\n" }
    - click: "Run"
    - type: { selector: ".con-in", text: "5" }
    - press: Enter
    - type: { selector: ".con-in", text: "5" }
    - press: Enter
    - expect: { selector: "#output", contains: "10" }
    - wait: 800
---
Last lesson, `input()` gave back what was typed. It always gives back **text**, even when the person types digits. To calculate with it, the program has to turn the text into a number, and cope when someone types something that is not a number.

## Predict

```step
stage: predict
code: numbers.py#add
check:
  type: predict
  q: "You run it and type 5, then 5. What does it print?"
  options: ["10", "55", "5 + 5", "An error"]
  actual: "55. Both answers are text, \"5\" and \"5\", and + joins text, so the result is \"55\"."
```

The program asks for two numbers and prints `a + b`. What will it print?

## Run

```step
stage: run
code: numbers.py#add
try: { starter: "numbers.py#add", height: 380 }
check: { type: reflect, text: "I can explain why 5 and 5 gave 55, and what int() changes." }
unlocks: [int]
```

Run it with 5 and 5. Then change the first two lines to `a = int(input("First number: "))` and `b = int(input("Second number: "))`, and run it again. `int()` turns text made of digits into a whole number, so now `+` adds.

## Investigate

```step
stage: investigate
code: numbers.py#check
insight: "int() only works on text made of digits, so a program checks the text first with isdigit(), and chooses what to do with if and else."
unlocks: [isdigit]
tasks:
  - check:
      type: trace
      text: "For each answer typed, fill in what text.isdigit() gives and what the program prints."
      table: |
        | typed | text.isdigit() | prints |
        | 12 | True | Next year you will be 13. |
        | twelve | [False] | [Please type your age as a number, such as 12.] |
        | 9 | [True] | [Next year you will be 10.] |
        | -3 | [False] | [Please type your age as a number, such as 12.] |
      explain: "isdigit() is True only when every character is a digit from 0 to 9. A minus sign is not a digit, so -3 fails the check too, which suits an age."
  - check:
      type: question
      q: "What would happen if you removed the if line and typed twelve?"
      options: ["It prints Next year you will be thirteen.", "It stops with a ValueError on the int() line", "It prints the else message", "It prints 13"]
      answer: 1
      feedback: ["Python cannot read number words: int() only turns digits into a number.", null, "Without the if, there is no else: the program goes straight to int().", "int(\"twelve\") never gives a number, so nothing is added."]
      explain: "int(\"twelve\") cannot turn letters into a number, so the program stops with a ValueError. Checking with isdigit() first lets it reply politely instead."
  - check:
      type: bug
      code: numbers.py#bug
      text: "A ticket costs $12. You type 3, and it prints That will be $333333333333. Click the line that causes it."
      answer: 1
      fault: logic
      misconception: input-is-text
      explain: "tickets holds the text \"3\", and text times 12 repeats it 12 times. Turning it into a number first fixes it: tickets = int(input(\"How many tickets? \"))."
```

`text.isdigit()` asks the text a question: are all your characters digits? The dot means "ask this text". It gives `True` or `False`, so it fits straight into an `if`.

### Trace the check

Follow the program for four different answers.

### Without the check

What does the check protect against?

### Spot the bug

A ticket machine with a strange total.

## Modify

```step
stage: modify
insight: "Once text is a number, it can be used in any calculation; every number that comes from input() needs the same check."
try: { starter: "numbers.py#modify", height: 420 }
tasks:
  - hint: "Add a print line inside the if, under the first one, using age + 10."
    check: { type: code, text: "Also print the age in ten years.", rules: { contains: ["str(age + 10)"] } }
  - hint:
      - "Start a new program: ask for two answers with input(), and check both with isdigit() joined by and."
      - "Inside the if, add int(first) + int(second) and print the total."
    check: { type: code, text: "Ask for two numbers, check both, and print their total.", rules: { contains: [".isdigit() and", "int(", "str("] } }
```

### Ten years from now

Also print how old the person will be in ten years.

### Add two numbers safely

Replace the program with one that asks for **two** numbers, checks both with `isdigit()`, and prints their total. If either answer is not a number, print a message instead.

## Make a ticket machine

```step
stage: make
insight: "On their own: ask, check, convert, calculate, reply. This is the shape of every input in the course from now on."
try: { starter: "numbers.py#make", height: 420 }
check: { type: code, text: "Ask how many tickets, check it with isdigit(), and print the total cost.", rules: { contains: ["input(", ".isdigit()", "int(", "12"] } }
```

Tickets to the school play cost **$12** each. Write a ticket machine that asks how many tickets, checks the answer is a number, and prints the total cost, such as `That will be $36.` If the answer is not a number, it prints a helpful message instead. Test it with 3, with 0 and with `three`.

## Where this leads

```step
stage: info
check:
  type: question
  q: "An online form says \"Please enter a valid quantity\" when you type 2x. What is it doing?"
  options: ["Checking the text before turning it into a number, like isdigit()", "Adding 2 and x", "Joining the text with +", "Nothing: the website crashed"]
  answer: 0
  explain: "Checking input before using it is called validation. Real apps check every box someone types into, for the same reason: what people type is not always what the program expects."
```

Checking what people type before using it is called **validation**. Real apps validate every box on a form. Next lesson keeps asking in a loop, so the program can keep going until it gets the answer it needs.
