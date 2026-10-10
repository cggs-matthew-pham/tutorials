---
order: 1
unit: text
assumes: [dotted-call]
title: Working with text
summary: Tidy typed text with strip() and lower(), cut it into words with split(), and pick out a word by its place.
language: python
hook: "Every search box, chat window and voice assistant starts the same way: tidy what was typed, then cut it into words."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "", speed: 8, console: 1 }
  caption: "Tidy the text, then cut it into words"
  say: "First tidy what was typed, then cut it into words."
  pacing: { keyDelayMs: 20 }
  clip:
    - caption:
        text: "strip() takes off the spaces at the ends; lower() makes it all small letters."
        say: "strip takes off spaces at the ends, and lower makes every letter small."
    - type: { into: "Python code", text: "command = input(\"> \").strip().lower()\n" }
    - caption:
        text: "split() cuts the text into a list of words."
        say: "split cuts the text into a list of words."
    - type: { into: "Python code", text: "words = command.split()\nprint(words)\nprint(\"Verb: \" + words[0])\n", append: true }
    - click: "Run"
    - type: { selector: ".con-in", text: "  Take the LAMP " }
    - press: Enter
    - expect: { selector: "#output", contains: "Verb: take" }
    - caption:
        text: "words[0] is the first word, whatever the person typed around it."
        say: "words, place zero, is the first word, however it was typed."
    - wait: 1500
---
What people type is messy: extra spaces, capitals, more words than you expect. Text has its own commands, called with a dot (`command.lower()`), that tidy it and cut it up. In this course you build the parts of a **text adventure**, starting with understanding a typed command.

## Predict

```step
stage: predict
code: text.py#predict
check:
  type: predict
  q: "What is the second line it prints?"
  kind: number
  actual: "8. strip() removes the spaces at both ends and lower() makes the capitals small, so command is \"go north\": 2 letters, a space and 5 letters."
```

`strip()` removes spaces from both ends of the text; `lower()` turns capitals into small letters. Each gives back new text. What will `len(command)` be?

## Run

```step
stage: run
code: text.py#parser
try: { starter: "text.py#parser", height: 420 }
check: { type: reflect, text: "I can explain how the program finds the verb, however the command was typed." }
unlocks: [strip-and-lower, split]
```

Run it and type a command such as `go north`, then try `  TAKE lamp  ` and `look`. `split()` cuts the text into a **list** of words at the spaces, so `words[0]` is the first word.

## Investigate

```step
stage: investigate
code: text.py#parser
insight: "Tidying text before comparing it, and splitting it into words, turns messy typing into something a program can understand."
tasks:
  - check:
      type: question
      q: "You type   Take LAMP   (with spaces around it). What is words[1]?"
      options: ["lamp", "LAMP", " LAMP ", "take"]
      answer: 0
      feedback: [null, "lower() runs before split(), so the capitals are already gone.", "strip() removed the spaces at the ends, and split() never keeps spaces.", "That is words[0], the first word. Places start at 0."]
      explain: "strip() and lower() turn it into \"take lamp\"; split() makes [\"take\", \"lamp\"], and place 1 is \"lamp\"."
  - check:
      type: number
      q: "You type: pick up the red key. How many words does split() give?"
      answer: 5
      explain: "split() cuts at every space: pick, up, the, red, key. Five words, so the program asks for two."
  - check:
      type: bug
      code: text.py#bug
      text: "You type Yes and the door stays shut. Click the line that causes it."
      answer: 2
      fault: logic
      misconception: text-case
      explain: "\"Yes\" == \"yes\" is False: capitals count. Compare tidied text: answer.strip().lower() == \"yes\"."
```

### Which word?

Follow one command through the tidying.

### Count the words

How `split()` cuts a longer command.

### Spot the bug

A door that will not open.

## Modify

```step
stage: modify
insight: "A program that understands commands checks the tidied text, and checks words against a list of the ones it knows."
try: { starter: "text.py#parser", height: 420 }
tasks:
  - hint: "Before the other checks, add if command == \"quit\": and print a goodbye. Change the next if to elif."
    check: { type: code, text: "Say goodbye when the command is quit.", rules: { contains: ["== \"quit\""] } }
  - hint:
      - "in checks whether something is in a list: words[0] in [\"go\", \"take\", \"look\"]."
      - "Print the verb and thing only for known verbs; otherwise print I don't understand."
    check: { type: code, text: "Only accept the verbs go, take and look.", rules: { contains: ["in [\"go\", \"take\", \"look\"]"] } }
```

### Quit

Make the program say goodbye when the command is `quit`.

### Known verbs only

Accept only the verbs `go`, `take` and `look`. For any other verb, print `I don't understand` and the word.

## Make initials

```step
stage: make
insight: "The same tools (strip, split, a place, upper) answer a new question: they are not just for adventures."
try: { starter: "text.py#make", height: 420 }
check: { type: code, text: "Ask for a full name, then print the initials and the name in capitals.", rules: { contains: ["input(", ".split()", ".upper()"] } }
```

Ask for someone's **full name**. Print their **initials** (the first letter of each word, in capitals) and their whole name in capitals. `word[0]` is the first letter of a word, just as `words[0]` is the first word. Test it with extra spaces and with three names.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A website's search finds \"Python\" when you type \"  python \". What has it done first?"
  options: ["Tidied the text: removed the spaces and ignored capitals", "Guessed", "Nothing: the text is the same", "Turned it into a number"]
  answer: 0
  explain: "Almost every program that reads typed text tidies it first, exactly like strip() and lower()."
```

Next lesson keeps things in a **list** that grows and shrinks: the adventurer's bag.
