---
order: 1
unit: shell
node: AC9TDI10K01 n1
title: Where files live
summary: "Files live in a tree of folders, and a path names a place in it. pwd says where you are, ls lists what is here and cd moves you, with full paths from the top (/), short paths from where you are, .. for the folder above and ~ for home."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Most of the world's servers have no mouse and no windows. People run them by typing. Where do you even start?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8488
  url: http://127.0.0.1:8488/index.html
  readySelector: ".shin"
  layout: full
explainPicture: { ref: shell.yml#explain-pic, caption: "The folder tree beside a terminal: ls lists what is here, cd moves you, and the prompt shows where you are." }
explainClip:
  query: { code: "@shell.yml#explain", fresh: 1, id: explain }
  caption: "pwd, ls and cd"
  say: "A pretend computer, and its folder tree."
  clip:
    - type: { into: Command, text: pwd }
    - press: Enter
    - caption: { text: "pwd: where am I? In /home/sam, my home folder.", say: "p w d says where you are." }
    - wait: 1000
    - type: { into: Command, text: ls }
    - press: Enter
    - caption: { text: "ls: what is here? Two files and two folders.", say: "l s lists what is here." }
    - wait: 1000
    - type: { into: Command, text: cd projects/game }
    - press: Enter
    - expect: { selector: ".shprompt", contains: "~/projects/game" }
    - caption: { text: "cd projects/game: move down two folders. The prompt shows the new place.", say: "c d moves you. The prompt shows where you are now." }
    - wait: 1500
---
A **shell** is a way to use a computer by typing. You type a command, press Enter, and the computer answers. This board is a pretend computer, so nothing you type can break anything.

## Predict: where will you be?

```step
stage: predict
insight: "Committing to where cd takes you tests the new move: a path names a place in the folder tree, and cd moves you there."
check:
  type: predict
  q: "You are in /home/sam. You type cd projects, then pwd. What does pwd show?"
  options: ["/home/sam/projects", "/projects", "projects", "/home/sam (cd only looks inside)"]
  actual: "/home/sam/projects: cd moved you into the projects folder inside where you were, and pwd prints the full path."
```

## Try: find your way

```step
stage: run
insight: "Moving through the tree with ls and cd, with the tree shown beside, settles the prediction and shows the new move."
try: { playground: board, starter: "shell.yml#run", height: 520 }
check: { type: board, text: "Get to the game folder. Type ls to look around and cd to move; the tree shows where you are.", when: "w = 1", explain: "cd projects, then cd game (or cd projects/game in one go). The prompt and the tree both show where you are." }
```

Was your prediction right? Type pwd to check.

## Worked example: reading a path

```step
stage: investigate
insight: "Reading full and short paths, including .., models the new move. Sam thinks cd carries files along, the misconception planted after the method."
tasks:
  - check:
      type: question
      q: "You are in /home/sam/projects/game. You type cd ../.. Where are you now?"
      options: ["/home/sam", "/home/sam/projects", "/home", "/"]
      answer: 0
      feedback: [null, "That's one .. up. There are two.", "That's three folders up.", "That's the very top."]
      explain: "Each .. goes up one folder: game → projects → sam."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam explains what cd does. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: cd-moves-files
      explain: "Line 3: cd moves you, not your files. notes.txt stays in /home/sam; mv is the command that moves files."
  - check:
      type: question
      q: "Which command lists what is in the folder you are in?"
      options: ["ls", "cd", "pwd", "cat"]
      answer: 0
      feedback: [null, "cd moves you.", "pwd says where you are.", "cat prints a file."]
      explain: "ls lists files and folders (folders end with /)."
```

### Three ways to name one folder

```worked
/home/sam/projects/game :: A full path starts with /, the very top, and works from anywhere.
\text{projects/game} :: A short path starts from where you are now (here, /home/sam).
\text{..} :: The folder above. From game, .. is projects, and ../.. is sam.
\sim :: Your home folder, /home/sam. cd on its own also goes home.
```

Now try two lots of ..

### Find the mistake

### Which command?

## Vary: other ways to move

```step
stage: modify
insight: "Each task changes one thing about the path: a full path from the top, going up with .., then cd on its own to go home."
try: { playground: board, starter: "shell.yml#etc", height: 520 }
tasks:
  - starter: "shell.yml#etc"
    check: { type: board, text: "Go to the folder /etc with one cd, using a full path.", when: "w = 1", explain: "cd /etc: a full path starts with / and works from anywhere." }
  - starter: "shell.yml#up"
    check: { type: board, text: "You start in projects/game. Get to the photos folder using ..", when: "w = 1", explain: "cd ../../photos: up to projects, up to sam, then down into photos." }
  - starter: "shell.yml#home"
    check: { type: board, text: "You start in /etc. Get home with the shortest command you can.", when: "w = 1", explain: "cd on its own (or cd ~) always goes home." }
```

### A full path

### Up with ..

### Home

## Practise: paths

```step
stage: practise
insight: "Reading paths without the board is the same move in mixed forms, plus a review of what the operating system does."
tasks:
  - check:
      type: question
      q: "Which path works from any folder?"
      options: ["/home/sam/photos", "photos", "../photos", "./photos"]
      answer: 0
      feedback: [null, "That starts from where you are.", "That depends on where you are.", "./ means here."]
      explain: "Paths that start with / start from the top."
  - check:
      type: question
      q: "The prompt says sam@school:~/projects$. Where are you?"
      options: ["/home/sam/projects", "/projects", "~projects", "Nowhere yet"]
      answer: 0
      feedback: [null, "~ is your home folder.", "~ stands for /home/sam.", "The prompt always shows where you are."]
      explain: "~ means /home/sam, so ~/projects is /home/sam/projects."
  - check:
      type: question
      q: "Review: the same ls command works on an SSD, a USB stick or a network drive. Why?"
      options: ["The operating system hides the difference; ls just asks it for the folder", "All storage is the same inside", "ls checks each type itself", "It doesn't"]
      answer: 0
      feedback: [null, "They are very different inside.", "ls doesn't need to know.", "It does work on all of them."]
      explain: "Commands ask the operating system, which uses the right driver for each kind of storage."
```

### Full paths

### The prompt

### Review: the OS

## Make: find and read a file

```step
stage: make
insight: "Finding a file with no tree to look at reverses the process: students build the path themselves from ls."
try: { playground: board, starter: "shell.yml#make", height: 520 }
hint: ["No tree this time: use ls to look inside each folder.", "It's somewhere inside projects.", "cd projects/game, then cat level1.txt."]
check: { type: board, text: "There's a file called level1.txt somewhere in your home folder. Find it and print it with cat.", when: "s = 1", explain: "You found it by looking (ls) and moving (cd), then read it (cat): the three moves of every shell." }
```

Then: what's the full path of that file? Could you print it with one command from home?
