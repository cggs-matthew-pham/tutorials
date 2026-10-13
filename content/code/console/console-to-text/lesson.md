---
order: 3
unit: text
moveId: numbers-to-text
reviews: [print-text, ask-and-store]
introduces: [to-text]
assumes: [input, text-join, variable, arithmetic, length]
title: Numbers into text
summary: Join a number onto text by turning it into text first with str.
language: python
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
  url: http://127.0.0.1:8123/index.html
  ready: Python code
  layout: full
hook: "Scores, prices, countdowns and receipts all mix words with numbers. Python will not guess how to join them, so you tell it."
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "str turns a number into text so + can join it"
  say: "Str turns a number into text, so plus can join it to other text."
  pacing: { keyDelayMs: 22 }
  clip:
    - type: { into: "Python code", text: "score = 5\n", append: true }
    - caption:
        text: "+ joins text to text. A number is not text, so this fails."
        say: "Plus joins text to text. A number is not text, so this fails."
    - type: { into: "Python code", text: "print(\"Score: \" + score)\n", append: true }
    - click: "Run"
    - expect: { selector: "#status", contains: "Error" }
    - caption:
        text: "str(score) turns the number into text."
        say: "Str of score turns the number into text."
    - type: { into: "Python code", text: "print(\"Score: \" + str(score))\n", append: true }
    - click: "Run"
    - wait: 800
---
Last lesson the program joined text it was given. Now it will join a **number** onto text, such as `Score: 5`.

## Predict

```step
stage: predict
code: lesson.py#score
check:
  type: predict
  q: "What happens when you run it?"
  options:
    - "It shows Score: 5"
    - "It shows Score: score"
    - "It stops with an error on line 2"
    - "It shows Score: with the 5 added on a new line"
  fault: runtime
  misconception: text-plus-number
  actual: "It stops with an error on line 2. + joins text to text. score holds a number, and Python will not guess how to join a number onto text."
```

Read the code. You know `+` joins text. What happens when one of the pieces is a number?

## Run

```step
stage: run
code: lesson.py#score
try: { starter: "lesson.py#score", height: 380 }
```

Run it and read the message. Then change line 2 to `print("Score: " + str(score))` and run it again.

| Line | What it does | Why |
|---|---|---|
| `score = 5` | Stores the number 5 | No quotes, so it is a number, not text |
| `"Score: " + score` | Fails | `+` joins text to text, or adds number to number. It will not mix them |
| `str(score)` | Gives back the text "5" | `str` makes a text copy of the number. `score` itself stays a number |

## Investigate

```step
stage: investigate
code: lesson.py#trace
insight: "str makes a text copy of a number. The copy joins with +; the original is unchanged."
tasks:
  - check:
      type: trace
      text: "Fill in what each line shows."
      table: |
        | line | shows |
        | print("Score: " + str(score)) | Score: 5 |
        | print("Score: " + str(score + 1)) | [Score: 6] |
        | print(score + score) | [10] |
        | print(str(score) + str(score)) | [55] |
      explain: "score + score adds two numbers: 10. str(score) + str(score) joins two pieces of text: 55."
  - check:
      type: bug
      code: lesson.py#bug
      text: "This should show Lives: 3, but stops with an error. Click the line that still has the problem."
      answer: 3
      fault: runtime
      misconception: str-changes-in-place
      explain: "str(lives) on its own line makes a text copy and throws it away. lives is still a number. Put the str right where it is joined: \"Lives: \" + str(lives)."
```

### Trace the lines

Adding numbers and joining text look the same, but they are different.

### Spot the bug

The `str` is there, but not in the right place.

## Modify

```step
stage: modify
insight: "Anything that works out to a number can go inside str, including a calculation."
try: { starter: "lesson.py#modify", height: 380 }
hint:
  - "len(name) gives the number of letters. It is a number, so it needs str."
check: { type: code, text: "Print how many letters the name has, such as Ada has 3 letters.", rules: { contains: ["str(len(name))"] } }
```

Change the program so it also prints how many letters the name has.

## Mix it up

```step
stage: investigate
code: lesson.py#review
insight: "Ask, store, calculate, convert, print: each move does one job."
check:
  type: question
  q: "The person types Maria. What does the program print?"
  options: ["Maria has 5 letters.", "Maria has count letters.", "It stops with an error", "Maria has 5 letters"]
  answer: 0
  feedback: [null, "count has no quotes, so Python uses the number it holds.", "count is turned into text by str before it is joined, so the line works.", "The last piece of text is \" letters.\", which ends with a full stop."]
  explain: "len(name) is 5, str(count) is the text 5, and the three pieces join into one line."
```

Mix of the last two lessons: the answer is stored, a number is worked out from it, and the number is turned into text.

## Make

```step
stage: make
try: { starter: "lesson.py#make", height: 380 }
hint:
  - "Work out the total first: total = cups * price. Then turn it into text in the print line."
  - "Each number joined onto text needs its own str()."
check: { type: code, text: "Print a receipt line that joins a count and a calculated total with text.", rules: { contains: ["str(", "*"] } }
```

A café sells cups of hot chocolate. Write a receipt: store the number of cups and the price, work out the total, and print a line such as `3 cups cost $12`.

```teacher
summary: Students learn why a number cannot be joined onto text with + and fix it with str.
time: 30
timing: "Predict and Run 8 min · Investigate 8 min · Modify 5 min · Mix it up 3 min · Make 8 min"
goals:
  - 'I can say why "Score: " + 5 fails.'
  - I can use str to join a number onto text.
  - I can build a line from text, a name and a calculated number.
running:
  - "Predict: show the failing program and vote. Many students expect it to work, and that is the point."
  - "Run: read the friendly error together, then fix it with str."
  - "Investigate: score + score and str(score) + str(score) look alike but give 10 and 55. This prepares for typed numbers next lesson."
  - "Make: students choose their own receipt. Ask each to point to every str in their program."
stuck:
  - see: An error that mentions joining a number onto text.
    ask: Which piece of the line is a number?
    fix: Put str( ) around that piece only.
  - see: str( ) on its own line does nothing.
    ask: Where does the text copy go?
    fix: str makes a copy. Use it where the number is joined onto text.
stretch: Print a receipt with a count, a price each, a total and a tip.
support: Give the line with the numbers joined and ask which pieces need str.
leads: "Next lesson: what input gives back is text, even digits, so adding two typed numbers needs a conversion the other way."
exit:
  q: "score = 5. Which prints Score: 5, and why: A) print(\"Score: \" + score)  B) print(\"Score: \" + str(score))?"
  a: "B. + will not join text and a number. str makes the number into text."
explain: |
  `+` joins text to text, and adds a number to a number, but will not mix them. To join a number onto text, turn it into text first: `str(score)` gives back a text copy, such as "5". The number itself stays a number.

  Calculations can go inside: `str(cups * price)`.
solutions:
  step-4: lesson.py#sol-letters
  step-6: lesson.py#sol-receipt
struggle: "Remembering which pieces are numbers. Ask which piece has no quotes and works out to a number."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what happens. Hold up 1, 2, 3 or 4 fingers.
      notes: "Most students expect Score: 5. Let them be surprised, then ask what + was designed to join."
    - at: end
      title: Spot the number
      minutes: 3
      do: |
        Look at a partner's receipt. Point to each number that was turned into text and say why.
```

```code lesson.py#score
score = 5
print("Score: " + score)
```

```code lesson.py#trace
score = 5
print("Score: " + str(score))
print("Score: " + str(score + 1))
print(score + score)
print(str(score) + str(score))
```

```code lesson.py#bug
lives = 3
str(lives)
print("Lives: " + lives)
```

```code lesson.py#modify
name = input("What is your name? ")
print("Hello, " + name)
```

```code lesson.py#review
name = input("What is your name? ")
count = len(name)
print(name + " has " + str(count) + " letters.")
```

```code lesson.py#make
# Hot chocolate receipt: store cups and price, work out the total, print a line.

```

```code lesson.py#sol-letters
name = input("What is your name? ")
print("Hello, " + name)
print(name + " has " + str(len(name)) + " letters.")
```

```code lesson.py#sol-receipt
cups = 3
price = 4
total = cups * price
print(str(cups) + " cups cost $" + str(total))
```
