---
order: 2
unit: text
moveId: ask-and-store
reviews: [print-text]
introduces: [input]
assumes: [print, string, text-join, variable]
title: Ask and store
summary: Ask a question with input, store the typed answer in a name, and use it in what the program says back.
language: python
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
  url: http://127.0.0.1:8123/index.html
  ready: Python code
  layout: full
hook: "A login box, a quiz question and a chatbot all ask something and then use the answer. The answer has to be stored somewhere first."
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "input waits for an answer and gives it back"
  say: "Input shows a question, waits, and gives back what was typed."
  pacing: { keyDelayMs: 22 }
  clip:
    - caption:
        text: "input shows the question and waits for the person to type."
        say: "Input shows a question and waits for the person to type."
    - type: { into: "Python code", text: "name = input(\"What is your name? \")\n", append: true }
    - caption:
        text: "name = stores what they typed, so the program can use it later."
        say: "The name equals part stores what was typed, so it can be used later."
    - type: { into: "Python code", text: "print(\"Hello, \" + name)\n", append: true }
    - click: "Run"
    - type: { selector: ".con-in", text: "Ada" }
    - press: Enter
    - expect: { selector: "#output", contains: "Hello, Ada" }
    - wait: 800
---
Last lesson the program said the same thing every time. Now it will **ask**, wait for you, and use your answer.

## Predict

```step
stage: predict
code: lesson.py#ask
check:
  type: predict
  q: "You run it and type Ada. What does the last line show?"
  options:
    - "Hello, Ada"
    - "Hello, name"
    - "Hello, What is your name? "
    - "Nothing: the program has no answer to show"
  fault: logic
  misconception: input-is-prompt
  actual: "Hello, Ada. input gives back what was typed, and name = stores it. The last line joins Hello, onto whatever name holds, which is Ada."
```

`input` is new. Read the code. If you type `Ada` when it asks, what will the second line show?

## Run

```step
stage: run
code: lesson.py#ask
try: { starter: "lesson.py#ask", height: 380 }
```

Run it, type an answer in the console and press Enter. Run it again with a different answer.

| Line | What it does | Why |
|---|---|---|
| `name = input("What is your name? ")` | Shows the question, waits for typing, stores the answer in `name` | The words in the brackets are shown to the person. The answer is what they type |
| `print("Hello, " + name)` | Joins Hello, onto the stored answer and shows it | `name` has no quotes, so Python uses what it holds |

The answer is stored as **text**, whatever is typed. The program is now different every time it runs.

## Investigate

```step
stage: investigate
code: lesson.py#ask
insight: "input hands back whatever was typed. If you do not store it in a name, it is gone."
tasks:
  - check:
      type: trace
      text: "Fill in what name holds and what the last line shows for each answer."
      table: |
        | typed | name holds | last line shows |
        | Ada | Ada | Hello, Ada |
        | Sam | [Sam] | [Hello, Sam] |
        | 42 | [42] | [Hello, 42] |
      explain: "Whatever is typed is stored as text and shown back as typed, even digits."
  - check:
      type: bug
      code: lesson.py#bug
      text: "The program asks, but then stops with a NameError on line 2. Click the line that needs to change."
      answer: 1
      fault: logic
      misconception: input-not-stored
      explain: "The answer was typed but not stored: no name catches it. name = input(...) puts the answer in name."
```

### Follow the answer

Where does the typed text go?

### Spot the bug

The question is asked, then the answer disappears.

## Make

```step
stage: make
try: { starter: "lesson.py#make", height: 380 }
hint:
  - "Store each answer under its own name: one input line per question."
  - "Use both names in the final print, with + between the pieces and spaces inside the quotes."
check: { type: code, text: "Ask two questions, store both answers, and print one line that uses both.", rules: { contains: ["= input(", "print(", "+"] } }
unlocks: [ask-and-reply]
```

Write a program that asks **two** questions (for example a name and a favourite animal) and prints one sentence that uses both answers.

```teacher
summary: Students meet input, store the typed answer in a name, and use it in the reply.
time: 30
timing: "Predict and Run 8 min · Investigate 8 min · Make 14 min"
goals:
  - I can ask a question with input and store the answer in a name.
  - I can use the stored answer in what the program prints.
  - I can say that what is typed comes back as text.
running:
  - "Predict: take a vote before running. Wrong options: the name as a word, the prompt stored in the name, no answer at all."
  - "Run: students run it several times with different answers. Ask: what changed each time, and what stayed the same?"
  - "Investigate: the bug is a very common first slip. Ask what happened to the typed text."
  - "Make: students choose their own two questions. Circulate and ask each to read the program aloud, line by line."
stuck:
  - see: A NameError on the first line that uses the answer.
    ask: Which line stores what was typed?
    fix: Write name = in front of input so the answer is stored under that name.
  - see: The question shows but there is no space before the answer.
    ask: What is inside the quotes of the question?
    fix: End the question text with a space, such as "Name? ".
stretch: Ask for three things and print a card with one line per answer.
support: Give the first question and ask the student to add the second.
leads: "Next lesson: the answer is always text, so adding a typed number to a number fails. Joining numbers onto text takes str."
exit:
  q: "What is the difference between input(\"Name? \") on its own and name = input(\"Name? \")?"
  a: "Both ask and wait. Only the second stores the answer, so the program can use it."
explain: |
  `input("question")` shows the question in the console, waits for the person to type and press Enter, and gives back what they typed as text. Store it with `name = input(...)` so later lines can use it.

  Whatever is typed comes back as text, even digits. The next lessons deal with numbers.
solutions:
  step-4: lesson.py#sol-two
struggle: "Remembering that input needs a name to catch the answer. Ask where the typed text went."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what the last line shows when Ada is typed.
        Hold up 1, 2, 3 or 4 fingers for your choice.
      notes: "Ask one pair from each option to explain. The prompt-stored option is the mistake to draw out: the question is shown, not stored."
    - at: end
      title: Interview a partner
      minutes: 4
      do: |
        Run your program and let your partner answer. Swap. Does the sentence make sense with their answers?
```

```code lesson.py#ask
name = input("What is your name? ")
print("Hello, " + name)
```

```code lesson.py#bug
input("What is your name? ")
print("Hello, " + name)
```

```code lesson.py#make
# Ask two questions and print one sentence that uses both answers.

```

```code lesson.py#sol-two
name = input("What is your name? ")
animal = input("What is your favourite animal? ")
print(name + " likes the " + animal + ".")
```
