---
order: 4
unit: numbers
moveId: text-to-number
reviews: [ask-and-store, numbers-to-text]
assumes: [input, to-text, text-join, variable, arithmetic]
title: Text into numbers
summary: What input gives back is always text, so turn it into a number with int before calculating with it.
language: python
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
  url: http://127.0.0.1:8123/index.html
  ready: Python code
  layout: full
hook: "Every app that asks for an age, a quantity or a PIN has to turn what you typed into a number before it can calculate."
voice: true
explainClip:
  query: { code: "a = input(\"First number: \")\nb = input(\"Second number: \")\nprint(a + b)\n", speed: 8, console: 1 }
  caption: "input gives text; int turns it into a number"
  say: "Input always gives back text. Int turns it into a number."
  pacing: { keyDelayMs: 12 }
  clip:
    - caption:
        text: "input() gives back text, even when digits are typed."
        say: "Input gives back text, even when you type digits."
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
        say: "Int turns the text into a number. Now plus adds."
    - type: { into: "Python code", text: "a = int(input(\"First number: \"))\nb = int(input(\"Second number: \"))\nprint(a + b)\n" }
    - click: "Run"
    - type: { selector: ".con-in", text: "5" }
    - press: Enter
    - type: { selector: ".con-in", text: "5" }
    - press: Enter
    - expect: { selector: "#output", contains: "10" }
    - wait: 800
---
Last lesson you turned a number into text. Typed answers go the other way: they arrive as **text**, even when the person types digits. To calculate with them, the program turns the text into a number.

## Predict

```step
stage: predict
code: lesson.py#add
check:
  type: predict
  q: "You run it and type 5, then 5. What does it print?"
  options: ["10", "55", "5 + 5", "An error"]
  fault: logic
  misconception: input-is-text
  actual: "55. Both answers are text, \"5\" and \"5\", and + joins text, so the result is \"55\"."
```

The program asks for two numbers and prints `a + b`. What will it print?

## Run

```step
stage: run
code: lesson.py#add
try: { starter: "lesson.py#add", height: 380 }
```

Run it with 5 and 5. Then change the first two lines to `a = int(input("First number: "))` and `b = int(input("Second number: "))`, and run it again.

| Line | What it does | Why |
|---|---|---|
| `input("First number: ")` | Gives back the typed answer as text | Typed digits are still text, "5" not 5 |
| `int(...)` | Turns text made of digits into a whole number | Now `+` adds instead of joining |
| `print(a + b)` | Shows the total | Both are numbers, so there is nothing to convert back to text |

## Investigate

```step
stage: investigate
code: lesson.py#trace
insight: "Typed text and numbers look the same on screen but behave differently: + joins text and adds numbers."
tasks:
  - check:
      type: trace
      text: "You type 5 for the first answer and 3 for the second. Fill in what each line shows."
      table: |
        | line | shows |
        | print(a + b) | 53 |
        | print(int(a) + int(b)) | [8] |
        | print(a + " and " + b) | [5 and 3] |
        | print(int(a) * 2) | [10] |
      explain: "With a and b as text, a + b joins them: 53. int(a) + int(b) adds the numbers: 8. A number is only needed when the program calculates."
  - check:
      type: bug
      code: lesson.py#bug
      text: "A ticket costs $12. You type 3, and it prints That will be $333333333333. Click the line that causes it."
      answer: 2
      fault: logic
      misconception: input-is-text
      explain: "tickets holds the text \"3\", and text times 12 repeats it 12 times. Turn it into a number first: int(tickets) * 12."
```

### Trace the lines

The same two answers, different lines.

### Spot the bug

A ticket machine with a strange total.

## Modify

```step
stage: modify
insight: "Once the text is a number, it works in any calculation."
try: { starter: "lesson.py#modify", height: 380 }
hint:
  - "Add a line under the first print, using age + 10. Remember str for the number."
check: { type: code, text: "Also print the age in ten years.", rules: { contains: ["str(age + 10)"] } }
```

The program asks for an age and says what it will be next year. Change it so it also says what the age will be in ten years.

## Mix it up

```step
stage: investigate
code: lesson.py#review
insight: "Two answers, two jobs: one stays text, one becomes a number, and the result goes back to text."
check:
  type: question
  q: "The person types Sam, then 11. What does the program print?"
  options: ["Sam will be 12 next year.", "Sam will be 111 next year.", "It stops with an error", "Sam will be age + 1 next year."]
  answer: 0
  feedback: [null, "age was turned into a number by int, so + 1 adds.", "Every conversion is in the right place, so the line works.", "age + 1 is outside the quotes, so Python works it out."]
  explain: "name stays text. int makes age the number 11, age + 1 is 12, and str makes the 12 into text so it joins."
```

This mixes the last three lessons: ask and store, text into a number, a number back into text.

## Make

```step
stage: make
try: { starter: "lesson.py#make", height: 380 }
hint:
  - "tickets = int(input(\"How many tickets? \")) turns the answer into a number as it is stored."
  - "Work out the total, then use str() to join it onto the text."
check: { type: code, text: "Ask how many tickets, turn the answer into a number, and print the total cost.", rules: { contains: ["int(input(", "12", "str("] } }
```

Tickets to the school play cost **$12** each. Write a ticket machine that asks how many tickets and prints the total, such as `That will be $36.` Test it with 3. (Typing a word will stop it for now. Two lessons from now it learns to cope.)

```teacher
summary: Students learn that input gives back text, and turn it into a number with int.
time: 30
timing: "Predict and Run 8 min · Investigate 8 min · Modify 4 min · Mix it up 3 min · Make 7 min"
goals:
  - I can say that input always gives back text.
  - I can turn typed digits into a number with int.
  - I can calculate with a typed number and print the result.
running:
  - "Predict: the 55 answer surprises many students. Let them argue before running. Ask the 55 voters to explain, then run it."
  - "Run: run it with 5 and 5, then fix it with int. Ask what changed in the output and why."
  - "Investigate: the trace shows the same two answers giving 53 and 8. Ask students to say which lines work with text and which with numbers."
  - "Make: students use their own price. Ask them to test with a few quantities."
stuck:
  - see: The total is a long repeated string of digits.
    ask: What does input give back, a number or text?
    fix: Put int( ) around the input line so the answer is stored as a number.
  - see: An error when adding a number to text in the print line.
    ask: Which piece of the line is a number?
    fix: Put str( ) around that piece, as in the last lesson.
stretch: Ask for two numbers and print their sum, difference and product.
support: Give the program with int missing and ask the student where it goes.
leads: "Next lesson: what happens when someone types a word instead of a number, and how a program checks first."
exit:
  q: "a = input(\"?\") and the person types 7. What is a + a, and what is int(a) + int(a)?"
  a: "a + a is 77 (text joined). int(a) + int(a) is 14."
explain: |
  `input()` always gives back text. `int(text)` turns text made of digits into a whole number, so `+` adds instead of joins, and `*` multiplies instead of repeating text. Convert once, as the answer is stored: `age = int(input("Age? "))`.

  A number joined onto text still needs `str`, as in the last lesson.
solutions:
  step-4: lesson.py#sol-ten
  step-6: lesson.py#sol-tickets
struggle: "Believing the typed 5 is already a number. Ask whether quotes are around it."
class:
  activities:
```

```code lesson.py#add
a = input("First number: ")
b = input("Second number: ")
print(a + b)
```

```code lesson.py#trace
a = input("First number: ")
b = input("Second number: ")
print(a + b)
print(int(a) + int(b))
print(a + " and " + b)
print(int(a) * 2)
```

```code lesson.py#bug
tickets = input("How many tickets? ")
cost = tickets * 12
print("That will be $" + str(cost))
```

```code lesson.py#modify
age = int(input("How old are you? "))
print("Next year you will be " + str(age + 1) + ".")
```

```code lesson.py#review
name = input("What is your name? ")
age = int(input("How old are you? "))
print(name + " will be " + str(age + 1) + " next year.")
```

```code lesson.py#make
# Ticket machine: tickets cost $12 each.
# Ask how many tickets, then print the total cost.

```

```code lesson.py#sol-ten
age = int(input("How old are you? "))
print("Next year you will be " + str(age + 1) + ".")
print("In ten years you will be " + str(age + 10) + ".")
```

```code lesson.py#sol-tickets
tickets = int(input("How many tickets? "))
print("That will be $" + str(tickets * 12) + ".")
```
