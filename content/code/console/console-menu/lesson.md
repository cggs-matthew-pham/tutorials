---
order: 9
unit: apps
moveId: menu-loop
reviews: [repeat-until, ask-and-store]
introduces: [break]
assumes: [while, input, text-join, to-text, variable, variable-update, if, elif, else, compare, bool-value]
title: A menu that keeps showing
summary: Put a menu inside while True, choose with if and elif, and leave the loop with break when the person picks quit.
language: python
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
  url: http://127.0.0.1:8123/index.html
  ready: Python code
  layout: full
hook: "Ticket machines, ATMs and the settings on a phone are all menus: show the choices, wait for one, do it, and show the menu again."
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "while True keeps going; break is the way out"
  say: "While true keeps going until a break runs."
  pacing: { keyDelayMs: 20 }
  clip:
    - type: { into: "Python code", text: "total = 0\nwhile True:\n    choice = input(\"1 add $5, 2 pay: \")\n", append: true }
    - caption:
        text: "while True never becomes false. The loop only ends when a break runs."
        say: "While true never becomes false. Only a break ends the loop."
    - type: { into: "Python code", text: "    if choice == \"1\":\n        total += 5\n    elif choice == \"2\":\n        break\nprint(\"Pay $\" + str(total))\n", append: true }
    - click: "Run"
    - type: { selector: ".con-in", text: "1" }
    - press: Enter
    - type: { selector: ".con-in", text: "1" }
    - press: Enter
    - type: { selector: ".con-in", text: "2" }
    - press: Enter
    - expect: { selector: "#output", contains: "Pay $10" }
    - wait: 800
---
A `while` loop stops when its condition turns false. A menu has no such moment: it should keep showing until the person says **stop**. So it loops for ever and leaves from the inside, with `break`.

## Predict

```step
stage: predict
code: lesson.py#till
check:
  type: predict
  q: "You type 1, 1, 3, then 2. What does the program show?"
  options:
    - "Total: $5, Total: $10, Please choose 1 or 2., Pay $10, Thank you"
    - "Total: $5, Total: $10, Please choose 1 or 2., Pay $10, and then it asks again"
    - "Total: $5, Total: $10, Please choose 1 or 2., and then the program stops"
    - "It never stops, even after 2"
  fault: logic
  misconception: break-leaves-if
  actual: "Total: $5, Total: $10, Please choose 1 or 2., Pay $10, Thank you. break leaves the whole loop at once, not just the if, so the program carries on after the loop and ends."
```

`while True` and `break` are new. Read the program. What is shown?

## Run

```step
stage: run
code: lesson.py#till
try: { starter: "lesson.py#till", height: 440 }
```

Run it. Add a few items, try a wrong choice, then pay.

| Line | What it does | Why |
|---|---|---|
| `while True:` | A loop whose condition is never false | The menu keeps showing until something inside ends it |
| `choice = input(...)` | Shows the menu and waits | Asked again on every pass |
| `if` / `elif` / `else` | Picks what to do for each choice | The `else` catches anything else, so a wrong choice gets a reply |
| `break` | Leaves the loop straight away | The program carries on with the first line after the loop |

## Investigate

```step
stage: investigate
code: lesson.py#till
insight: "A menu is a loop that ends only when you choose to end it. Every way out must be a break."
tasks:
  - check:
      type: trace
      text: "You type 1, 1, 3, 2. Fill in the total after each choice and whether the loop goes round again."
      table: |
        | choice | total after | loop goes round again |
        | 1 | 5 | yes |
        | 1 | [10] | [yes] |
        | 3 | [10] | [yes] |
        | 2 | [10] | [no] |
      explain: "A wrong choice (3) changes nothing, and the menu shows again. Only 2 runs break."
  - check:
      type: bug
      code: lesson.py#bug
      text: "Choosing 2 shows Pay $10, but then the menu comes back and the program never ends. Click the line where something is missing."
      answer: 7
      fault: logic
      misconception: while-true-forever
      explain: "Nothing ever runs break, so while True never ends. The pay branch needs a break line after the print."
  - check:
      type: question
      q: "What does break do when it runs inside an if inside a while True?"
      options: ["Leaves the whole loop at once", "Leaves only the if", "Stops the program", "Skips to the next pass"]
      answer: 0
      feedback: [null, "break belongs to the loop, not to the if.", "The program carries on with the line after the loop.", "Skipping to the next pass is a different keyword."]
      explain: "break ends the loop it is in. The program continues with the first line after the loop."
```

### Follow a session

A session is the list of choices typed.

### Spot the bug

A menu with no way out.

### What does break do?

A one-word answer.

## Modify

```step
stage: modify
insight: "Adding a choice is one more elif; the loop and the way out stay as they are."
try: { starter: "lesson.py#till", height: 440 }
hint:
  - "Add an elif for a new choice before the pay choice, and change the menu text."
  - "Pay becomes choice 4, so change the pay elif too."
check: { type: code, text: "Add a drink for $2 as choice 3; paying becomes choice 4.", rules: { contains: ["total += 2", "choice == \"4\""] } }
```

Add a drink for $2 as choice 3. Paying becomes choice 4. Update the menu text too.

## Mix it up

```step
stage: investigate
code: lesson.py#till
insight: "Ask, test, add, repeat: each pass of the menu uses every move so far."
check:
  type: number
  q: "You type 3, 3, 2. How many times does the menu question appear?"
  answer: 3
  explain: "Each pass asks once. 3 and 3 are wrong choices that go round again, and 2 asks a third time before it breaks."
```

This mixes the last lessons: a loop that repeats, and an answer stored again each pass.

## Make

```step
stage: make
try: { starter: "lesson.py#make", height: 440 }
hint:
  - "A menu starts with while True: and an input line inside it."
  - "Use if / elif for each choice and else for anything else. One choice runs break."
check: { type: code, text: "A menu app: while True, at least three choices with if and elif, and break to quit.", rules: { loops: 1, contains: ["while True", "elif", "break"] } }
unlocks: [menu-loop]
```

Make your own menu app: a café, a game shop, a quiz scoreboard or a unit converter. It needs `while True`, at least three choices, a reply for a wrong choice, and a way to quit.

```teacher
summary: Students build a menu with while True, choose with if and elif, and leave with break.
time: 35
timing: "Predict and Run 9 min · Investigate 9 min · Modify 5 min · Mix it up 3 min · Make 9 min"
goals:
  - I can use while True with break to make a menu that keeps showing.
  - I can add a choice to a menu with elif.
  - I can build my own small menu app.
running:
  - "Predict: take a vote. The wrong options are three real beliefs: break only leaves the if, a wrong choice ends the program, and nothing ends it."
  - "Run: students try all the choices, including a wrong one. Ask which line stopped the loop."
  - "Investigate: the bug has no break line at all, so the loop cannot end. Ask what ends a while True."
  - "Make: students choose their theme. Check each program has an else for a wrong choice."
stuck:
  - see: The program never ends.
    ask: Which line makes the loop stop?
    fix: One branch needs a break line, indented inside the loop.
  - see: A wrong choice makes the program do something odd.
    ask: What does the program do when none of the choices match?
    fix: Add an else with a message, such as Please choose 1, 2 or 3.
stretch: Add a choice that clears the total and starts the order again.
support: Give the menu with the choices as comments and ask the student to fill in each branch.
leads: "Next lesson: how to test a menu without typing the same choices over and over."
exit:
  q: "What does break do, and what happens to the program after it?"
  a: "break leaves the loop at once. The program carries on with the first line after the loop."
explain: |
  `while True:` is a loop whose condition is never false, so it only ends when a `break` runs. A menu fits: show the choices, read one, do it, and go round again. `if` / `elif` / `else` picks what to do for each choice, and `else` catches anything else.

  `break` leaves the loop it is in, not only the `if`. The program continues with the first line after the loop.
solutions:
  step-4: lesson.py#sol-drink
  step-6: lesson.py#sol-cafe
struggle: "Forgetting a way out. Ask what makes a while True stop."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what the program shows. Hold up 1, 2, 3 or 4 fingers.
      notes: "The 'asks again' option is the common slip: students think break leaves only the if."
    - at: end
      title: Order from my menu
      minutes: 4
      do: |
        Swap seats and use your partner's menu app. Try every choice and a wrong one.
```

```code lesson.py#till
total = 0
while True:
    choice = input("1 add $5, 2 pay: ")
    if choice == "1":
        total += 5
        print("Total: $" + str(total))
    elif choice == "2":
        print("Pay $" + str(total))
        break
    else:
        print("Please choose 1 or 2.")
print("Thank you")
```

```code lesson.py#bug
total = 0
while True:
    choice = input("1 add $5, 2 pay: ")
    if choice == "1":
        total += 5
    elif choice == "2":
        print("Pay $" + str(total))
    else:
        print("Please choose 1 or 2.")
print("Thank you")
```

```code lesson.py#make
# Menu app: while True, at least three choices, a reply for a wrong choice, and a way to quit.

```

```code lesson.py#sol-drink
total = 0
while True:
    choice = input("1 add $5, 3 drink $2, 4 pay: ")
    if choice == "1":
        total += 5
        print("Total: $" + str(total))
    elif choice == "3":
        total += 2
        print("Total: $" + str(total))
    elif choice == "4":
        print("Pay $" + str(total))
        break
    else:
        print("Please choose 1, 3 or 4.")
print("Thank you")
```

```code lesson.py#sol-cafe
total = 0
while True:
    choice = input("1 coffee $4, 2 cake $5, 3 pay: ")
    if choice == "1":
        total += 4
        print("Coffee added. Total: $" + str(total))
    elif choice == "2":
        total += 5
        print("Cake added. Total: $" + str(total))
    elif choice == "3":
        break
    else:
        print("Please choose 1, 2 or 3.")
print("Please pay $" + str(total))
```
