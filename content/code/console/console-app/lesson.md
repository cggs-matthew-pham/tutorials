---
order: 11
unit: challenge
moveId: console-challenge
reviews: [print-text, ask-and-store, numbers-to-text, text-to-number, check-first, repeat-until, running-total, menu-loop, test-cases]
assumes: [print, input, text-join, to-text, variable, variable-update, if, elif, else, compare, and-or, while, break, bool-value, dotted-call, function, return-value]
title: "Challenge: a console app"
summary: Read a working café till, change one thing and predict the result, then make a console app of your own with a menu, a checked number, a total and tests.
language: python
hook: "Every app you use is a menu, a check and a total, wearing a nicer coat. Today you build one."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
  url: http://127.0.0.1:8123/index.html
  ready: Python code
  layout: full
---
This is the end of the console course. The program below uses everything: `input`, a checked number, `while True`, `break`, a running total and a function. Read it first, then make an app of your own.

## Predict

```step
stage: predict
code: lesson.py#cafe
check:
  type: predict
  q: "You choose 1, then 2 with a quantity of 3, then 3. What total does the last line show?"
  kind: number
  actual: "19. One coffee is $4. Choice 2 asks how many and adds $5 for each, so 3 cakes add $15, and 4 + 15 = 19."
```

Read the program.

## Run

```step
stage: run
code: lesson.py#cafe
try: { starter: "lesson.py#cafe", height: 480 }
```

Run it and compare with your prediction. Try a quantity that is a word.

## Investigate

```step
stage: investigate
code: lesson.py#cafe
insight: "A bigger app is the small moves working together. You can predict a change by following the parts it touches."
tasks:
  - check:
      type: question
      q: "Which part stops the program crashing when the quantity is a word?"
      options: ["The isdigit check before int", "The while True", "The break", "The function"]
      answer: 0
      feedback: [null, "while True is what keeps the menu going.", "break is how the menu ends.", "The function only gives back replies."]
      explain: "text.isdigit() asks whether the quantity is all digits before int is used."
  - check:
      type: number
      q: "You choose 2 and type 2 as the quantity, and then choose 3. What is the total?"
      answer: 10
      explain: "Two cakes at $5 each are $10. The total starts at 0 and cake adds price × quantity."
```

### Which part does the job?

Name the part that protects the program.

### Follow a change

Work out a total by hand.

## Modify

```step
stage: modify
insight: "Predict first, then run: the gap between them shows what you do not yet understand."
try: { starter: "lesson.py#cafe", height: 480 }
hint:
  - "Copy the cake branch and change the name and the price."
  - "Add a line to the menu text so people know the new choice, and move pay to choice 4."
check: { type: code, text: "Add a new item to the menu with its own price and a checked quantity.", rules: { contains: ["isdigit()", "int("] } }
```

Change **one** thing at a time, predicting each result before you run it. Add a new item to the menu with its own price, and make pay choice 4.

## Make

```step
stage: make
try: { starter: "lesson.py#make", height: 480 }
hint:
  - "Plan it on paper first: what are the choices, what is stored, when does it end?"
  - "Start from the café and change the theme, the prices and the replies."
check: { type: code, text: "A console app with a menu loop, a checked number, a running total and a way to quit.", rules: { loops: 1, contains: ["while True", "break", ".isdigit()", "+="] } }
```

Make a console app of your own. Pick a theme: a game shop, a canteen order, a fitness log or a unit converter. It needs:

- a menu that keeps showing (`while True`) and a way to quit (`break`)
- at least one number typed by the person and checked before use
- a total that builds up (`+=`)
- a reply for a wrong choice

Then write three test cases for the part that works out replies, including one wrong input. Change one thing and predict what will happen before you run it.

You have finished the console course. Every Python extension starts from here.

```teacher
summary: Students read a working café till, predict a change, then build a console app with a menu, a checked number and a total.
time: 45
timing: "Predict and Run 8 min · Investigate 8 min · Modify 8 min · Make 20 min"
goals:
  - I can read a longer console program and say what each part does.
  - I can add a feature to a working app.
  - I can build a console app from a menu, a check and a total.
running:
  - "Predict: students read the program and work out the total by hand before running."
  - "Run: run with a word as the quantity. Ask which line protected the program."
  - "Modify: encourage one change and a run at a time."
  - "Make: this is the main task. Milestones: it runs and shows a menu; a choice adds to a total; a typed number is checked; it quits with break; three test cases pass."
stuck:
  - see: The menu never ends.
    ask: Which line runs break?
    fix: One branch needs a break, indented inside the loop.
  - see: A crash when a word is typed for a quantity.
    ask: Is int called before or after the isdigit check?
    fix: Check inside an if first, and convert inside it.
stretch: Save the order to a list and print every item at the end.
support: Give the café with one branch missing and ask for it.
leads: "The Python extensions all start here: objects, data detective, deeper console Python, and apps with Gradio."
exit:
  q: "Name three moves your app uses and the line that shows each."
  a: "Any three of: input, int with isdigit, while True with break, +=, if/elif/else, a function."
explain: |
  A bigger app is the small moves working together: a loop keeps the menu going, `if` / `elif` / `else` picks what to do, `isdigit` checks typed numbers, `+=` builds the total and `break` ends the loop. A function gives back the replies so they can be tested.

  A good plan is the theme, the choices, what is stored, and what ends it.
solutions:
  step-4: lesson.py#sol-new
  step-5: lesson.py#sol-make
struggle: "Planning before typing. Ask for the choices and what ends the program."
class:
  activities:
    - at: predict
      kind: discussion
      title: Work it out by hand
      minutes: 4
      do: |
        Work out the total on paper with your partner. Compare before you run.
    - at: end
      title: App showcase
      minutes: 6
      do: |
        Show your app to another pair. They try it, including a wrong input, and tell you one thing that works well and one that could be better.
```

```code lesson.py#cafe
total = 0
while True:
    choice = input("1 coffee $4, 2 cake $5, 3 pay: ")
    if choice == "1":
        total += 4
        print("Coffee added. Total: $" + str(total))
    elif choice == "2":
        how_many = input("How many cakes? ")
        if how_many.isdigit():
            total += 5 * int(how_many)
            print("Cakes added. Total: $" + str(total))
        else:
            print("Please type a number.")
    elif choice == "3":
        break
    else:
        print("Please choose 1, 2 or 3.")
print("Please pay $" + str(total))
```

```code lesson.py#make
# Your console app: a menu, a checked number, a running total, and a way to quit.

```

```code lesson.py#sol-new
total = 0
while True:
    choice = input("1 coffee $4, 2 cake $5, 3 sandwich $7, 4 pay: ")
    if choice == "1":
        total += 4
        print("Coffee added. Total: $" + str(total))
    elif choice == "2":
        how_many = input("How many cakes? ")
        if how_many.isdigit():
            total += 5 * int(how_many)
            print("Cakes added. Total: $" + str(total))
        else:
            print("Please type a number.")
    elif choice == "3":
        how_many = input("How many sandwiches? ")
        if how_many.isdigit():
            total += 7 * int(how_many)
            print("Sandwiches added. Total: $" + str(total))
        else:
            print("Please type a number.")
    elif choice == "4":
        break
    else:
        print("Please choose 1, 2, 3 or 4.")
print("Please pay $" + str(total))
```

```code lesson.py#sol-make
total = 0
while True:
    choice = input("1 pencil $2, 2 ruler $3, 3 pay: ")
    if choice == "1":
        amount = input("How many pencils? ")
        if amount.isdigit():
            total += 2 * int(amount)
            print("Total: $" + str(total))
        else:
            print("Please type a number.")
    elif choice == "2":
        total += 3
        print("Total: $" + str(total))
    elif choice == "3":
        break
    else:
        print("Please choose 1, 2 or 3.")
print("Please pay $" + str(total))
```
