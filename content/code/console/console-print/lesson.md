---
order: 1
unit: text
moveId: print-text
introduces: [print, string, text-join]
assumes: [variable]
title: Print text
summary: Show text on the screen with print, and join pieces of text into one line with +.
language: python
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground" 8123
  url: http://127.0.0.1:8123/index.html
  ready: Python code
  layout: full
hook: "Chatbots, game menus and error messages all start the same way: a program puts a line of text on the screen."
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "print shows text; + joins pieces of text"
  say: "Print shows a line of text, and plus joins pieces of text."
  pacing: { keyDelayMs: 22 }
  clip:
    - type: { into: "Python code", text: "name = \"Ada\"\n", append: true }
    - caption:
        text: "Text goes in quotes. print shows it on its own line."
        say: "Text goes in quotes, and print shows it on its own line."
    - type: { into: "Python code", text: "print(\"Hello\")\n", append: true }
    - caption:
        text: "+ joins pieces of text. Spaces only appear where you type them."
        say: "Plus joins pieces of text. A space only appears where you type one."
    - type: { into: "Python code", text: "print(\"Hi, \" + name)\n", append: true }
    - click: "Run"
    - expect: { selector: "#output", contains: "Hi, Ada" }
    - wait: 800
---
Until now your programs made pictures. Many programs make **text** instead. This course is about programs you talk to: they show a line, wait for you, and reply.

## Predict

```step
stage: predict
code: lesson.py#hello
check:
  type: predict
  q: "What will the program show?"
  options:
    - "Two lines: Hello, then Hi, Ada"
    - "One line: Hello Hi, Ada"
    - "Two lines: Hello, then Hi, + Ada"
    - "Two lines: Hello, then Hi,Ada"
  fault: logic
  misconception: join-adds-space
  actual: "Two lines: Hello, then Hi, Ada. Each print starts a new line. The + joins the two pieces exactly as typed, and the space after the comma is inside the quotes, so it stays."
```

`print` is new. Read the code and decide what appears on the screen.

## Run

```step
stage: run
code: lesson.py#hello
try: { starter: "lesson.py#hello", height: 380 }
```

Run it and compare with your prediction.

| Line | What it does | Why |
|---|---|---|
| `name = "Ada"` | Stores the text Ada under the name `name` | Text goes in quotes. The quotes are not shown |
| `print("Hello")` | Shows Hello and moves to a new line | Each `print` is one line of output |
| `print("Hi, " + name)` | Joins two pieces of text and shows the result | `+` glues text together. It adds nothing, not even a space |

## Investigate

```step
stage: investigate
code: lesson.py#trace
insight: "Quotes make text. print shows exactly the text it is given, and + joins pieces with nothing in between."
tasks:
  - check:
      type: trace
      text: "Fill in what each line shows."
      table: |
        | line | shows |
        | print("Hello") | Hello |
        | print("Hi, " + name) | [Hi, Ada] |
        | print("Hi," + name) | [Hi,Ada] |
        | print(name + name) | [AdaAda] |
      explain: "A space only appears if it is inside the quotes. name + name joins Ada onto Ada with nothing between."
  - check:
      type: bug
      code: lesson.py#bug
      text: "This should show three lines, but the program stops with an error. Click the wrong line."
      answer: 2
      fault: syntax
      misconception: quotes-optional
      explain: "Without quotes, Python reads Hi there as names it has never heard of. Text needs quotes around it: print(\"Hi there\")."
  - check:
      type: parsons
      code: lesson.py#parsons
      text: "Put the lines in order so the screen shows a line of stars, then Room 12, then Welcome, then a line of stars."
      explain: "print runs the lines from the top down, so the order of the lines is the order on the screen."
```

### Trace the lines

What does each line show?

### Spot the bug

One line is missing something.

### Put the lines in order

Output appears in the order the lines run.

## Make

```step
stage: make
try: { starter: "lesson.py#make", height: 380 }
hint:
  - "Set name once at the top, then use it in more than one print line."
  - "Each print is one line: print(\"Welcome, \" + name)."
check: { type: code, text: "Print a four-line sign, with your name stored once and used in two lines.", rules: { contains: ["name =", "+ name"] } }
```

Make a four-line sign for your classroom door. Store a name once at the top, use it in at least two of the lines, and run it.

```teacher
summary: Students meet print, text in quotes, and joining text with +, then make a four-line sign.
time: 30
timing: "Predict and Run 8 min · Investigate 12 min · Make 10 min"
goals:
  - I can show a line of text with print.
  - I can say why text needs quotes.
  - I can join pieces of text with + and say where the spaces come from.
running:
  - "Predict: show the two-line program and take a vote. The wrong options are a slip about new lines, a slip about what + does, and a slip about spaces."
  - "Run: run it live, then change the space inside the quotes and run again. Ask where the space came from."
  - "Investigate: the trace is the key idea, that + adds nothing. Ask a student to read a line aloud as if they were the computer."
  - "Make: students choose their own sign. Show a friend a finished one and ask what each line does."
stuck:
  - see: A NameError mentioning a word the student meant as text.
    ask: Is that word inside quotes?
    fix: Text needs quotes. Without them Python looks for a name.
  - see: Words run together on the screen ("HiAda").
    ask: Where did the space come from in the first program?
    fix: A space is a character. Put it inside the quotes, such as "Hi, ".
stretch: Print a box of stars around a message, using more than four print lines.
support: Give the sign with one line missing and ask the student to complete it.
leads: "Next lesson: the program asks a question and uses the answer, so it is no longer the same every time."
exit:
  q: "print(\"Hi, \" + \"Sam\") shows what, and why is there a space?"
  a: "Hi, Sam. The space is inside the first quotes. The + adds nothing."
explain: |
  `print(...)` shows a line of text and moves to a new line. Text goes inside quotes; the quotes are not shown. A name without quotes is a stored value, so `print(name)` shows what is stored, and `print("name")` shows the word name.

  `+` between two pieces of text joins them with nothing in between. A space only appears if it is typed inside the quotes.
solutions:
  step-4: lesson.py#sol-sign
struggle: "Telling apart a name and text in quotes. Ask what print would show for the name without quotes."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what the screen will show.
        Hold up 1, 2, 3 or 4 fingers for the option you chose.
      notes: "Count the votes before anyone runs it. Ask one pair from each option to say why. The wrong options are different slips: one line, a literal plus, and no space."
    - at: end
      title: Read it like a computer
      minutes: 3
      do: |
        Swap signs with a partner. Read their program line by line and say aloud what each print shows. Does the screen match?
```

```code lesson.py#hello
name = "Ada"
print("Hello")
print("Hi, " + name)
```

```code lesson.py#trace
name = "Ada"
print("Hello")
print("Hi, " + name)
print("Hi," + name)
print(name + name)
```

```code lesson.py#bug
print("Welcome")
print(Hi there)
print("Goodbye")
```

```code lesson.py#parsons
print("*****")
print("Room 12")
print("Welcome")
print("*****")
```

```code lesson.py#make
# Make a four-line sign. Store a name once and use it twice.

```

```code lesson.py#sol-sign
name = "Room 12"
print("*********")
print("Welcome to " + name)
print("Please come in to " + name)
print("*********")
```
