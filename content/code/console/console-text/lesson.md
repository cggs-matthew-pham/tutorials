---
order: 1
unit: text
introduces: [input, text-join, to-text, string]
title: Text in, text out
summary: Ask a question with input(), answer with print(), join text with +, and turn a number into text with str().
language: python
hook: "Chatbots, ticket machines and quiz apps all do the same three things: ask, wait for an answer, and reply."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8 }
  caption: "input() asks and waits; print() answers"
  say: "A console program asks a question, waits for an answer, and replies."
  pacing: { keyDelayMs: 22 }
  clip:
    - caption:
        text: "input() shows a question and waits for an answer."
        say: "input shows a question, then waits for someone to type an answer."
    - type: { into: "Python code", text: "name = input(\"What is your name? \")\n" }
    - caption:
        text: "+ joins pieces of text into one line."
        say: "The plus sign joins pieces of text into one line."
    - type: { into: "Python code", text: "print(\"Hello, \" + name + \"!\")\n", append: true }
    - click: "Run"
    - type: { selector: ".con-in", text: "Ada" }
    - press: Enter
    - expect: { selector: "#output", contains: "Hello, Ada!" }
    - caption:
        text: "The answer is stored in name, so print can use it."
        say: "Whatever was typed is stored in name, so print can use it."
    - wait: 1500
---
The turtle course drew pictures. A **console** program works with text instead: it asks a question, waits for someone to type an answer, and replies. The ideas are the same ones you already know: variables, decisions, loops and functions.

## Predict

```step
stage: predict
code: text.py#hello
check:
  type: predict
  q: "You run it, type Ada and press Enter. What is the last line in the console?"
  options: ["Hello, Ada!", "Hello, name!", "Hello, + name + !", "Hello,Ada!"]
  actual: "Hello, Ada! The answer Ada is stored in name, and + joins \"Hello, \", Ada and \"!\" into one line. The space is inside the quotes, so it stays."
```

`input("What is your name? ")` shows the question and waits for an answer. What will the program print?

## Run

```step
stage: run
code: text.py#hello
try: { starter: "text.py#hello", height: 380 }
check: { type: reflect, text: "I can explain where the answer I typed is stored, and how print uses it." }
unlocks: [input, join-text]
```

Run it. When the question appears in the console, click the line, type your name and press Enter. Compare the result with your prediction.

## Investigate

```step
stage: investigate
code: text.py#parts
insight: "input() always gives back text, and + joins text exactly as written, spaces included. A number has to become text with str() before it can be joined."
unlocks: [str]
tasks:
  - check:
      type: match
      q: "Match each part with what it does."
      pairs:
        - ["input(\"What is your name? \")", "shows the question, waits, and gives back what was typed"]
        - ["\"Hello, \" + name + \"!\"", "joins three pieces of text into one"]
        - ["str(len(name))", "turns the number of letters into text"]
        - ["print(...)", "shows a line in the console"]
  - check:
      type: question
      q: "You type Bo, then pizza. What does the fourth line, print(name + \" likes \" + food + \".\"), show?"
      options: ["Bo likes pizza.", "Bolikespizza.", "name likes food.", "Bo likes pizza"]
      answer: 0
      feedback: [null, "Look inside the quotes: \" likes \" has a space at each end. + keeps exactly what is in the quotes.", "name and food have no quotes, so they are variables: Python uses what is stored in them.", "Check the end of the line: + \".\" adds a full stop."]
      explain: "name holds Bo and food holds pizza. + joins Bo, \" likes \", pizza and \".\" exactly as written, spaces and full stop included."
  - check:
      type: bug
      code: text.py#bug
      text: "This should print Your score is 5, but it stops with a TypeError. Click the line that causes it."
      answer: 2
      fault: runtime
      misconception: text-plus-number
      explain: "+ can join text to text, but score is a number. str(score) turns it into the text \"5\" first: print(\"Your score is \" + str(score))."
```

This program asks two questions. Run it in the playground above if you like, then work through the tasks.

### Match the parts

Say what each part of the program does.

### Spaces count

Work out exactly what one line prints.

### Spot the bug

Here is a short program that stops with an error.

## Modify

```step
stage: modify
insight: "Each new question is one more input() stored in its own variable; each reply is text joined with +."
try: { starter: "text.py#modify", height: 380 }
tasks:
  - hint:
      - "Copy the first line and change the variable name and the question."
      - "Then print a sentence that joins name and animal: print(name + \" would like a pet \" + animal + \".\")"
    check: { type: code, text: "Ask a second question, store it in animal, and print a sentence that uses it.", rules: { contains: ["animal = input(", "+ animal"] } }
  - hint:
      - "len(name) is the number of letters, but it is a number."
      - "Turn it into text with str() before joining it: str(len(name))."
    check: { type: code, text: "Print how many letters are in the name, such as Ada has 3 letters.", rules: { contains: ["str(len(name))"] } }
```

### A second question

Ask for a **favourite animal**, store it in a variable called `animal`, and print a sentence that uses both answers.

### Count the letters

Print a line such as `Ada has 3 letters.`

## Make a story machine

```step
stage: make
insight: "Without a starter, students show they can ask, store and join on their own."
try: { starter: "text.py#make", height: 400 }
check: { type: code, text: "Ask at least one question with input() and print a story that joins the answers in with +.", rules: { contains: ["= input(", "print(", "+"] } }
```

Write a **story machine**: it asks for three words (such as a name, a place and an animal), then prints a short story of two or three lines that uses all of them. Run it with silly answers and with sensible ones.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A school library kiosk asks for your student number, then prints which books you have out. Which part of this lesson is it doing?"
  options: ["Drawing with the turtle", "input() to ask, then print() to reply", "Nothing like it: real kiosks do not use text", "A loop that never ends"]
  answer: 1
  explain: "Ask, wait, reply: the same pattern, with the reply looked up from stored data. The next lesson turns typed text into numbers, so a program can calculate with what it is told."
```

Every app with a text box does this: ask, store the answer in a variable, reply. Web forms and chatbots are the same idea with a nicer screen.
