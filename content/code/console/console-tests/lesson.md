---
order: 10
unit: apps
moveId: test-cases
reviews: [menu-loop, function-answers]
assumes: [function, param, return-value, if, elif, else, compare, bool-value, while, input, text-join]
title: Test with a table
summary: Write test cases (what to type and what the program should reply) as lines that print True or False, and include a wrong choice.
language: python
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
  url: http://127.0.0.1:8123/index.html
  ready: Python code
  layout: full
hook: "Apps are tested before anyone uses them. A test case says what to type and what should come back, and the computer checks it every time."
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "A test case is what you give and what you expect back"
  say: "A test case is what you give, and what you expect back."
  pacing: { keyDelayMs: 20 }
  clip:
    - type: { into: "Python code", text: "def reply(choice):\n    if choice == \"1\":\n        return \"Added $5\"\n    else:\n        return \"Please choose 1.\"\n\n", append: true }
    - caption:
        text: "Each test calls the function and compares with what you expect."
        say: "Each test calls the function and compares the answer with what you expect."
    - type: { into: "Python code", text: "print(reply(\"1\") == \"Added $5\")\nprint(reply(\"9\") == \"Please choose 1.\")\n", append: true }
    - click: "Run"
    - expect: { selector: "#output", contains: "True" }
    - wait: 800
---
A menu is awkward to test by typing: you have to type the same choices every time. If the menu's replies come from a **function**, you can test the function with one line per case, and the computer says `True` or `False` for each.

## Predict

```step
stage: predict
code: lesson.py#tests
check:
  type: predict
  q: "What do the three test lines show?"
  options:
    - "True, True, False"
    - "True, True, True: if the first two work the third will too"
    - "False, True, True"
    - "An error, because reply needs the loop"
  fault: logic
  misconception: works-for-me
  actual: "True, True, False. reply(\"9\") returns Please choose 1 or 2 with no full stop, but the test expects one. The first two cases only tried choices that work. The wrong-choice test is the one that found the slip."
```

Each `print` line compares what `reply` gives back with what you expect, and shows `True` or `False`. Decide what each line shows.

## Run

```step
stage: run
code: lesson.py#tests
try: { starter: "lesson.py#tests", height: 460 }
```

Run it and compare with your prediction.

| Line | What it does | Why |
|---|---|---|
| `def reply(choice):` | The menu's replies, as a function | A function can be called with any choice, with no typing |
| `reply("9") == "Please choose 1 or 2."` | One test case: given 9, expect this reply | `==` gives `True` when they match and `False` when they do not |
| `print(...)` | Shows the result | Run all the tests at once and read down the `True`s and `False`s |

## Investigate

```step
stage: investigate
code: lesson.py#tests
insight: "A test case is an input and the reply you expect. Good tests include the wrong inputs."
tasks:
  - check:
      type: trace
      text: "Fill in what each test shows."
      table: |
        | test | shows |
        | reply("1") == "Added $5" | True |
        | reply("2") == "Pay now" | [True] |
        | reply("9") == "Please choose 1 or 2." | [False] |
        | reply("1") == "Added $4" | [False] |
      explain: "A test shows True only when the function gives back exactly what the test expects. The last line is a wrong expectation, so it shows False even though the function is fine."
  - check:
      type: bug
      code: lesson.py#bug
      text: "This test was meant to check the wrong-choice reply, but the program stops with an error before it runs. Click the wrong line."
      answer: 9
      fault: syntax
      misconception: assign-vs-compare
      explain: "A single = stores a value. A test compares with two: reply(\"9\") == \"Please choose 1 or 2.\"."
```

### Read the tests

Each line is one test case.

### Spot the bug

A test that cannot run.

## Modify

```step
stage: modify
insight: "Find the bug with a test, then fix the code and run all the tests again."
try: { starter: "lesson.py#modify", height: 460 }
tasks:
  - hint: "Copy a test line and change what you type, and what you expect, to a wrong choice such as 9."
    check: { type: code, text: "Add a test for the wrong choice 9.", rules: { contains: ["reply(\"9\")"] } }
  - hint: "The new test shows False. Compare the reply text in the function with the text in the test."
    check: { type: code, text: "Fix the function so all the tests show True.", rules: { contains: ["return \"Please choose 1 or 2.\""] } }
```

### Add a test

Add a test line for a wrong choice.

### Fix the slip

If it shows `False`, fix the function, and run the tests again.

## Mix it up

```step
stage: investigate
code: lesson.py#review
insight: "The menu loop calls the function and prints what it returns. The function can be tested on its own."
check:
  type: question
  q: "You type 1, then 9, then 2. What does the menu show?"
  options: ["Added $5, Please choose 1 or 2., Pay now", "Added $5, Pay now", "Added $5, Please choose 1 or 2., and it asks again", "Pay now only"]
  answer: 0
  feedback: [null, "The wrong choice 9 gets a reply too.", "2 runs the break, so the loop ends after Pay now.", "Every choice prints its reply, and only 2 breaks."]
  explain: "Each pass prints what reply gives back. 2 shows Pay now, and then break ends the loop."
```

This mixes the menu loop and a function that gives back an answer.

## Make

```step
stage: make
try: { starter: "lesson.py#make", height: 460 }
hint:
  - "One test per line: print(reply(\"typed\") == \"expected\")."
  - "Include a wrong choice such as 9, and a choice with a space, such as \" 1\"."
check: { type: code, text: "Write at least three test lines for the till, including a wrong choice.", rules: { contains: ["reply(\"9\")", "== "] } }
```

Here is a till function. Write three test lines for it: what to type and what it should reply. Include a wrong choice. Run the tests and fix anything that shows `False`.

```teacher
summary: Students write test cases as comparison lines, find a bug with a wrong-choice test, and fix the code.
time: 35
timing: "Predict and Run 8 min · Investigate 8 min · Modify 8 min · Mix it up 3 min · Make 8 min"
goals:
  - I can write a test case as a line that shows True or False.
  - I can include a wrong choice in my tests.
  - I can fix code until all my tests show True.
running:
  - "Predict: the common slip is trusting the first two tests. Let students argue before running. Ask the all-True voters what would convince them the function works for every input."
  - "Run: ask which test found the bug and why the first two did not."
  - "Investigate: the last trace line has a wrong expectation. A False test does not always mean the function is wrong: it can be the test."
  - "Modify: students add the missing test, watch it show False, and fix the function."
  - "Make: encourage unusual inputs: a space, an empty answer, a letter."
stuck:
  - see: Every test shows False.
    ask: Are the expected texts exactly the same as the replies, including spaces and full stops?
    fix: Copy the reply text from the function into the test.
  - see: A SyntaxError on a test line.
    ask: Is it = or == in the comparison?
    fix: Tests compare with two equals signs.
stretch: Add a test for the choice 2 with the number typed as 2 instead of "2". What happens?
support: Give the test lines with the expected text missing and ask for it.
leads: "Next: the challenge. Build a console app that uses every move so far, with test cases of your own."
exit:
  q: "Why should a test list always include a wrong input?"
  a: "Wrong inputs are where bugs hide. If only the cases that work are tested, a bug in the other cases is never found."
explain: |
  A test case is an input and the reply you expect. `print(reply("9") == "Please choose 1 or 2.")` calls the function with that input and shows `True` if the reply is exactly what was expected.

  Good tests include normal cases and wrong ones. A test that shows `False` means either the code or the test is wrong: read both.
solutions:
  step-4#t1: lesson.py#sol-test
  step-4#t2: lesson.py#sol-fixed
  step-6: lesson.py#sol-make
struggle: "Believing the program works because the easy tests pass. Ask which input has not been tried."
class:
  activities:
    - at: end
      title: Break my function
      minutes: 4
      do: |
        Swap functions with a partner. Write a test that you think will find a bug in theirs.
```

```code lesson.py#tests
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2"

print(reply("1") == "Added $5")
print(reply("2") == "Pay now")
print(reply("9") == "Please choose 1 or 2.")
```

```code lesson.py#bug
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2."

print(reply("9") = "Please choose 1 or 2.")
```

```code lesson.py#modify
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2"

print(reply("1") == "Added $5")
print(reply("2") == "Pay now")
```

```code lesson.py#review
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2."

while True:
    choice = input("1 add $5, 2 pay: ")
    print(reply(choice))
    if choice == "2":
        break
```

```code lesson.py#make
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2."

# Write three test lines. Include a wrong choice.

```

```code lesson.py#sol-test
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2"

print(reply("1") == "Added $5")
print(reply("2") == "Pay now")
print(reply("9") == "Please choose 1 or 2.")
```

```code lesson.py#sol-fixed
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2."

print(reply("1") == "Added $5")
print(reply("2") == "Pay now")
print(reply("9") == "Please choose 1 or 2.")
```

```code lesson.py#sol-make
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2."

print(reply("1") == "Added $5")
print(reply("2") == "Pay now")
print(reply("9") == "Please choose 1 or 2.")
print(reply(" 1") == "Please choose 1 or 2.")
```
