---
order: 2
unit: shell
node: AC9TDI10K01 n1
title: Reading and finding
summary: "cat prints a whole file and grep prints only the lines that contain a word. Names that start with a dot are hidden: ls skips them, ls -a shows them. With these you can find anything on a computer you can't see."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "ls shows four things in Sam's home folder. There are five. Where's the other one?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8489
  url: http://127.0.0.1:8489/index.html
  readySelector: ".shin"
  layout: full
explainPicture: { ref: shell.yml#explain-pic, caption: "ls -a shows the hidden file .plans.txt, and cat prints it." }
explainClip:
  query: { code: "@shell.yml#explain", fresh: 1, id: explain }
  caption: "Hidden files and grep"
  say: "Two ways to find things."
  clip:
    - type: { into: Command, text: ls -a }
    - press: Enter
    - caption: { text: "ls -a also shows hidden names, the ones starting with a dot.", say: "l s dash a shows hidden files too." }
    - wait: 1200
    - type: { into: Command, text: grep cat pets.txt }
    - press: Enter
    - expect: { selector: ".shout", contains: "catfish" }
    - caption: { text: "grep cat pets.txt prints only the lines with cat in them, catfish too.", say: "grep prints only the lines that contain the word." }
    - wait: 1500
---
In *Where files live* you moved around and looked. Now read what's inside files, and find the ones that don't want to be seen.

## Predict: what ls shows

```step
stage: predict
insight: "Committing to whether ls shows everything tests the new move: hidden names need ls -a."
check:
  type: predict
  q: "In /home/sam, ls shows notes.txt, pets.txt, photos/ and projects/. Is that everything in the folder?"
  options: ["Maybe not: names starting with a dot are hidden from ls", "Yes: ls always shows everything", "No: ls only shows files, not folders", "Yes, unless the computer is broken"]
  actual: "Not everything: there's a hidden file, .plans.txt. ls skips names that start with a dot; ls -a shows them."
```

## Try: find the hidden file

```step
stage: run
insight: "Finding and printing the hidden file settles the prediction and introduces cat."
try: { playground: board, starter: "shell.yml#run", height: 520 }
check: { type: board, text: "Find the hidden file in your home folder and print it with cat.", when: "a = 1 and s = 1", explain: "ls -a shows .plans.txt; cat .plans.txt prints it. Hidden only means ls skips it." }
```

Was your prediction right?

## Worked example: grep

```step
stage: investigate
insight: "Working out which lines grep prints models the new move: grep matches the word anywhere in a line. Sam trusts plain ls, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "pets.txt has six lines: cat, dog, catfish, parrot, cat, hamster. How many lines does grep cat pets.txt print?"
      answer: "3"
      feedback:
        - ["2", "catfish has cat in it too."]
        - ["6", "grep prints only the lines that match."]
      explain: "cat, catfish and cat: grep matches the letters anywhere in the line."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam looks for a clue in the gym folder. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: ls-shows-everything
      explain: "Line 3: ls skips hidden names. ls -a might show a hidden folder or file."
  - check:
      type: question
      q: "grep Friday notes.txt prints \"Robot club on Friday\". What does grep friday notes.txt print?"
      options: ["Nothing: grep cares about capital letters (grep -i ignores them)", "The same line", "Every line", "An error"]
      answer: 0
      feedback: [null, "f and F are different letters to grep.", "Only lines with the exact letters.", "No match isn't an error."]
      explain: "grep -i friday notes.txt ignores capitals and finds it."
```

### grep cat pets.txt, line by line

```worked
\text{cat} \Rightarrow \text{printed} :: The line contains c-a-t.
\text{dog} \Rightarrow \text{skipped} :: No c-a-t.
\text{catfish} \Rightarrow \text{printed} :: c-a-t is inside it: grep matches letters anywhere.
\text{parrot, hamster} \Rightarrow \text{skipped} :: No c-a-t.
\text{cat} \Rightarrow \text{printed} :: Three lines in all.
```

Now count the lines.

### Find the mistake

### Capital letters

## Vary: find it fast

```step
stage: modify
insight: "Each task changes one thing: one matching line, counting with grep -c, then reading a file in another folder without moving."
try: { playground: board, starter: "shell.yml#modify", height: 520 }
tasks:
  - check: { type: board, text: "Print only the line of notes.txt that mentions Friday.", when: "g = 1 and l = 1 and e = 0", explain: "grep Friday notes.txt: one line, without reading the whole file." }
  - check: { type: board, text: "How many pets have the letter a in them? Make grep count them with -c.", when: "g = 1 and o = 5", explain: "grep -c a pets.txt prints 5: it counts matching lines instead of printing them." }
  - check: { type: board, text: "Print level1.txt from your home folder, without using cd.", when: "s = 1 and c = 0", explain: "cat projects/game/level1.txt: commands take paths, so you don't have to go there first." }
```

### One line

### Count

### Read from here

## Practise: reading

```step
stage: practise
insight: "Choosing the right reading command is the same move in mixed forms, plus a review of paths."
tasks:
  - check:
      type: question
      q: "A log file has 10,000 lines. You want only the lines with ERROR in them. Which command?"
      options: ["grep ERROR log.txt", "cat log.txt", "ls -a log.txt", "cd log.txt"]
      answer: 0
      feedback: [null, "That prints all 10,000.", "ls lists names, not contents.", "A file isn't a folder."]
      explain: "This is how people read huge logs on servers: grep pulls out what matters."
  - check:
      type: question
      q: "Which of these is a hidden file?"
      options: [".config", "config.", "_config", "Config"]
      answer: 0
      feedback: [null, "The dot must come first.", "An underscore isn't hidden.", "Capitals don't hide anything."]
      explain: "Names that start with a dot are hidden from plain ls."
  - check:
      type: question
      q: "Review: you are in /home/sam/photos. What does cd .. do?"
      options: ["Goes up to /home/sam", "Goes to the top, /", "Goes home, wherever you are", "Nothing"]
      answer: 0
      feedback: [null, "That's cd /.", "That's cd ~.", ".. means the folder above."]
      explain: ".. is the folder above this one."
```

### A huge log

### Hidden

### Review: paths

## Make: the treasure hunt, part 1

```step
stage: make
insight: "Following clue files through folders, one of them hidden, puts the moves together: look, move, read, and look again with -a."
try: { playground: board, starter: "shell.yml#make", height: 560 }
hint: ["Start with cat start.txt.", "Each clue names a folder. Look inside with ls; read with cat.", "The gym clue is hidden: ls -a."]
check: { type: board, text: "A treasure hunt starts in this folder. Follow the clues until you find the one hidden in the gym, and print it.", when: "s = 1", explain: "You followed the trail and spotted the hidden folder with ls -a. The last clue sends you to the office: you'll need pipes for that one (next lesson but one)." }
```

Then: on a real computer, what kinds of files do you think are hidden, and why?
