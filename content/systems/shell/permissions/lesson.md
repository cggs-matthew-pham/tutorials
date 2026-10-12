---
order: 5
unit: shell
node: AC9TDI10K01 n3
assumes: [AC9TDI10K01 n2]
title: Who can read what
summary: "Every file has an owner and permissions: read, write and run, for the owner and for everyone else. ls -l shows them as letters like rw-r--r-- (644). The owner changes them with chmod; nobody else can. Hiding a file protects nothing; permissions do."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Everyone at school logs into the same server. Why can't you read your teacher's marks file?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8492
  url: http://127.0.0.1:8492/index.html
  readySelector: ".shin"
  layout: full
explainPicture: { ref: shell.yml#explain-pic, caption: "ls -l /home/lee: marks.txt is rw------- (only Lee can read it); timetable.txt is rw-r--r-- (anyone can read it)." }
explainClip:
  query: { code: "@shell.yml#explain", fresh: 1, id: explain }
  caption: "Permissions"
  say: "Every file says who may read it."
  clip:
    - type: { into: Command, text: ls -l /home/lee }
    - press: Enter
    - caption: { text: "ls -l shows permissions: rw------- for marks.txt, rw-r--r-- for the timetable.", say: "l s dash l shows who may do what." }
    - wait: 1400
    - type: { into: Command, text: cat /home/lee/marks.txt }
    - press: Enter
    - expect: { selector: ".shout", contains: "Permission denied" }
    - caption: { text: "Permission denied: the operating system checks before it opens the file.", say: "Permission denied. The operating system checks first." }
    - wait: 1500
---
On a shared computer, the operating system checks every request against the file's **permissions** before it opens anything. This is the same idea as *Who are you, and what may you do?* in Security and privacy, on a real kind of system.

## Predict: read-only

```step
stage: predict
insight: "Committing to what r-- allows tests the new move: each letter is one permission."
check:
  type: predict
  q: "A file's permissions for everyone else are r--. Can another student change the file?"
  options: ["No: r means read, and there's no w (write)", "Yes: they can read it, so they can change it", "Only if it's hidden", "Only if they rename it"]
  actual: "No. r-- means read yes, write no, run no. They can open it but not change or delete it."
```

## Try: Lee's files

```step
stage: run
insight: "Trying to read two of the teacher's files settles the prediction: one is allowed, one is refused."
try: { playground: board, starter: "shell.yml#run", height: 520 }
check: { type: board, text: "Look at Lee's files with ls -l /home/lee. Try to read both with cat. Which one can you read?", when: "s = 1", explain: "The timetable (rw-r--r--: everyone may read). marks.txt is rw-------: only Lee." }
```

Was your prediction right?

## Worked example: reading rw-r--r--

```step
stage: investigate
insight: "Splitting a permission string into its two groups and turning it into digits models the new move. Sam trusts a hidden name, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "rw-r----- as three digits (read 4, write 2, run 1, for owner, group, everyone else)?"
      answer: "640"
      feedback:
        - ["644", "The last three letters are ---: everyone else gets 0."]
        - ["620", "The middle group is r--: read is 4."]
      explain: "rw- = 4 + 2 = 6; r-- = 4; --- = 0. So 640."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam hides a file. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: hidden-is-protected
      explain: "Line 3: hidden only means plain ls skips it. Anyone can ls -a and cat it if the permissions allow. chmod 600 is what protects it."
  - check:
      type: question
      q: "Who can change a file's permissions with chmod?"
      options: ["Its owner (and an administrator)", "Anyone who can read it", "Anyone who can see it with ls", "Nobody, once set"]
      answer: 0
      feedback: [null, "Reading doesn't give control.", "Seeing a name gives nothing.", "The owner can change them any time."]
      explain: "That's why you couldn't chmod Lee's file."
```

### -rw-r--r--, letter by letter

```worked
\text{-} :: The first character: - for a file, d for a folder.
\text{rw-} :: Owner: read yes, write yes, run no. 4 + 2 + 0 = 6.
\text{r--} :: Group: read only. 4.
\text{r--} :: Everyone else: read only. 4. So this file is 644.
\text{chmod o-r file} :: Take read (r) away from others (o): rw-r----- (640).
```

Now turn a permission string into digits.

### Find the mistake

### Who can chmod?

## Vary: change who can do what

```step
stage: modify
insight: "Each task changes one permission: take read away from others, add run for the owner, then try to change a file you don't own."
try: { playground: board, starter: "shell.yml#plans", height: 520 }
tasks:
  - starter: "shell.yml#plans"
    check: { type: board, text: "Make .plans.txt unreadable to everyone except you. Check with ls -la.", when: "k = 0", explain: "chmod o-r .plans.txt (or chmod 600 .plans.txt). Now hiding it doesn't matter: the permissions protect it." }
  - starter: "shell.yml#robot"
    check: { type: board, text: "Let yourself run projects/robot.py as a program (x for the owner).", when: "m = 744", explain: "chmod u+x projects/robot.py: rwxr--r--, 744." }
  - starter: "shell.yml#lee"
    check: { type: board, text: "Try to make Lee's marks.txt readable with chmod 644. What happens?", when: "e = 1 and m = 600", explain: "Refused: only the owner (or an administrator) can change a file's permissions." }
```

### Hide it properly

### Let it run

### Not yours

## Practise: permissions

```step
stage: practise
insight: "Reading and choosing permissions without the board is the same move in mixed forms, plus a review of pipes."
tasks:
  - check:
      type: question
      q: "A file is rwxr-xr-x (755). Can everyone else run it?"
      options: ["Yes: their group is r-x", "No: only the owner can run anything", "Only if it's hidden", "Only on Mondays"]
      answer: 0
      feedback: [null, "Look at the last three letters.", "Hiding changes nothing.", "Permissions don't depend on the day."]
      explain: "r-x: read and run, but not change."
  - check:
      type: question
      q: "Which digits mean only the owner can read and write, and nobody else can do anything?"
      options: ["600", "644", "777", "000"]
      answer: 0
      feedback: [null, "Others could read that.", "Everyone could do everything.", "Not even the owner could read that."]
      explain: "rw------- = 600: the setting for private files and keys."
  - check:
      type: question
      q: "Review: what does grep error log.txt | wc -l print?"
      options: ["How many lines of log.txt contain error", "The lines with error", "How many lines log.txt has", "An error"]
      answer: 0
      feedback: [null, "wc -l counts them instead.", "wc counts what grep sends it.", "This is a normal pipe."]
      explain: "grep picks the lines; wc -l counts them."
```

### 755

### Private

### Review: pipes

## Make: lock your plans

```step
stage: make
insight: "Setting a file to exact permissions reverses the process: from who should be allowed to the digits or letters that say so."
try: { playground: board, starter: "shell.yml#make", height: 520 }
hint: ["Only you should read it and change it: rw for you, nothing for anyone else.", "rw------- in digits: 6, 0, 0.", "chmod 600 .plans.txt"]
check: { type: board, text: "Your .plans.txt should be readable and changeable by you, and nobody else should be able to do anything with it.", when: "m = 600", explain: "600: rw-------. That's how private files, passwords and keys are kept on servers." }
```

Then: on a real Mac or Linux computer, run ls -l in your home folder. Which files are most private?
