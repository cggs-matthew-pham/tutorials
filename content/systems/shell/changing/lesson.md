---
order: 3
unit: shell
node: AC9TDI10K01 n1
title: Changing files
summary: "mkdir makes a folder, cp copies, mv moves or renames, rm deletes and echo … > saves text into a file. rm is for good: there is no recycle bin in a shell, so look before you delete."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "On your laptop, deleted files go to the bin. In a shell, rm means gone. Ready?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8490
  url: http://127.0.0.1:8490/index.html
  readySelector: ".shin"
  layout: full
explainPicture: { ref: shell.yml#explain-pic, caption: "After mkdir old, cp notes.txt old and rm notes.txt: the copy is safe in old, the original is gone." }
explainClip:
  query: { code: "@shell.yml#explain", fresh: 1, id: explain }
  caption: "Make, copy, delete"
  say: "Three commands that change things."
  clip:
    - type: { into: Command, text: mkdir old }
    - press: Enter
    - caption: { text: "mkdir old makes a new folder; the tree shows it.", say: "mkdir makes a folder." }
    - wait: 900
    - type: { into: Command, text: cp notes.txt old }
    - press: Enter
    - caption: { text: "cp notes.txt old puts a copy in old. The original stays.", say: "c p makes a copy." }
    - wait: 900
    - type: { into: Command, text: rm notes.txt }
    - press: Enter
    - expect: { selector: ".shtree", contains: "old" }
    - caption: { text: "rm notes.txt deletes the original, for good. Only the copy is left.", say: "r m deletes, for good." }
    - wait: 1500
---
So far you've only looked. These commands change things: they make, copy, move and delete files and folders.

## Predict: after rm

```step
stage: predict
insight: "Committing to where a deleted file goes tests the new move: rm deletes for good."
check:
  type: predict
  q: "You type rm notes.txt. Where is notes.txt now?"
  options: ["Gone for good: a shell has no recycle bin", "In the recycle bin", "In a hidden folder called .trash", "Still there until you restart"]
  actual: "Gone. rm deletes straight away; the bin on your laptop is something the desktop adds, not the operating system."
```

## Try: back it up, then delete

```step
stage: run
insight: "Making a backup before deleting settles the prediction and uses mkdir, cp and rm in a safe order."
try: { playground: board, starter: "shell.yml#run", height: 520 }
check: { type: board, text: "Make a folder called old, copy notes.txt into it, then delete the notes.txt in your home folder.", when: "x = 1 and z = 1", explain: "mkdir old, cp notes.txt old, rm notes.txt. The copy in old is the only one left: rm really deletes." }
```

Was your prediction right? Try ls: no notes.txt, and no bin to fetch it from.

## Worked example: cp or mv?

```step
stage: investigate
insight: "Comparing cp and mv on the same file models the new move: copy keeps the original, move doesn't. Sam expects a recycle bin, the misconception planted after the method."
tasks:
  - check:
      type: question
      q: "You type mv pets.txt photos. Then ls in your home folder. Is pets.txt there?"
      options: ["No: mv moved it into photos", "Yes: mv makes a copy", "Yes, and there's another in photos", "It's deleted"]
      answer: 0
      feedback: [null, "That's cp.", "That's cp.", "It still exists, in photos."]
      explain: "mv moves (one file, new place); cp copies (two files)."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam deletes a file. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: rm-recycle-bin
      explain: "Line 3: rm has no recycle bin. The file is gone; copy anything you might need first."
  - check:
      type: question
      q: "How do you rename notes.txt to todo.txt?"
      options: ["mv notes.txt todo.txt", "cp notes.txt todo.txt", "rename notes.txt", "cd notes.txt todo.txt"]
      answer: 0
      feedback: [null, "That makes a second file and keeps notes.txt.", "There's no rename command here.", "cd moves you, not files."]
      explain: "Moving a file to a new name in the same folder renames it."
```

### Five commands that change things

```worked
\text{mkdir old} :: Make a new, empty folder called old.
\text{cp notes.txt old} :: Copy: notes.txt stays, and old/notes.txt is a second copy.
\text{mv notes.txt old} :: Move: notes.txt leaves here and goes into old. Also renames: mv a.txt b.txt.
\text{rm notes.txt} :: Delete, for good. rm -r deletes a folder and everything in it.
\text{echo hi > hello.txt} :: Save some text into a file (> replaces it; >> adds to the end).
```

Now compare cp and mv.

### Find the mistake

### Renaming

## Vary: one change each

```step
stage: modify
insight: "Each task changes one thing: renaming with mv, making a file with echo and >, then removing a whole folder with rm -r."
try: { playground: board, starter: "shell.yml#rename", height: 520 }
tasks:
  - starter: "shell.yml#rename"
    check: { type: board, text: "Rename notes.txt to todo.txt.", when: "x = 1 and z = 1", explain: "mv notes.txt todo.txt: same file, new name." }
  - starter: "shell.yml#save"
    check: { type: board, text: "Make a file called hello.txt that says hello, using echo and >.", when: "x = 1", explain: "echo hello > hello.txt. Careful: > replaces whatever was in the file." }
  - starter: "shell.yml#folder"
    check: { type: board, text: "Delete the photos folder and both photos in it, with one command.", when: "z = 1", explain: "rm -r photos. Plain rm refuses folders, because -r deletes everything inside." }
```

### Rename

### Make a file

### Remove a folder

## Practise: safely

```step
stage: practise
insight: "Choosing the safe command is the same move in mixed forms, plus a review of hidden files."
tasks:
  - check:
      type: question
      q: "You want to try editing report.txt but keep the original safe. What first?"
      options: ["cp report.txt report-backup.txt", "mv report.txt report-backup.txt", "rm report.txt", "mkdir report.txt"]
      answer: 0
      feedback: [null, "Then report.txt is gone (renamed).", "That deletes it.", "That makes a folder."]
      explain: "Copy first; then you can always go back."
  - check:
      type: question
      q: "echo hi > notes.txt. What happens to what was in notes.txt?"
      options: ["It's replaced by hi", "hi is added to the end", "Nothing: it saves to a new file", "An error"]
      answer: 0
      feedback: [null, "That's >>.", "> writes into the file named.", "It works, which is the danger."]
      explain: "> replaces the file's contents; >> adds to the end."
  - check:
      type: question
      q: "Review: how do you see hidden files?"
      options: ["ls -a", "ls", "cat -a", "cd .hidden"]
      answer: 0
      feedback: [null, "Plain ls skips them.", "cat prints files.", "That only works if you know the name."]
      explain: "-a for all."
```

### Back up first

### Replace or add

### Review: hidden

## Make: tidy up

```step
stage: make
insight: "Reorganising folders to match a description reverses the process: from the tidy result wanted to the commands that make it."
try: { playground: board, starter: "shell.yml#make", height: 520 }
hint: ["The result: a folder called pictures inside projects, with both photos in it, and no photos folder.", "mkdir projects/pictures, then move the photos.", "mv photos/beach.jpg projects/pictures, the same for dog.jpg, then rm -r photos."]
check: { type: board, text: "Tidy up: both photos should end up in a new folder called pictures inside projects, and the old photos folder should be gone.", when: "x = 1 and z = 1", explain: "mkdir, mv, mv, rm -r. Or, before making pictures, one command: mv photos projects/pictures moves and renames the whole folder." }
```

Then: which of today's commands would you be most careful with, and why?
