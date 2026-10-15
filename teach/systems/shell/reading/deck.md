---
marp: true
theme: default
html: true
---

# Reading and finding

The command line · Using a shell

<!-- Speaker note: Students print files with cat, find lines with grep (including -i, -c and paths to other folders), reveal hidden names with ls -a, and follow a clue trail to a hidden folder (AC9TDI10K01 node 1). About 40 minutes (Predict and Try 6 min · Worked example 10 min · Vary 12 min · Practise and Make 12 min). -->

---

## Today

**We are learning to** cat prints a whole file and grep prints only the lines that contain a word. Names that start with a dot are hidden: ls skips them, ls -a shows them. With these you can find anything on a computer you can't see.

- I can print a file with cat.
- I can find the lines I want with grep.
- I can find hidden files with ls -a.

<!-- Speaker note: Before class: Try the boards yourself, including the treasure hunt (fs: hunt): start.txt → library/shelf2/book.txt → gym/.locker/clue.txt. The hunt finishes in Pipes. The one idea: you can read and search files you can't see, and "hidden" only means ls skips the name. Teacher: Worked example: ask why catfish was printed. Teacher: Vary: ask why the third task didn't need cd. -->

---

## Why it matters

> ls shows four things in Sam's home folder. There are five. Where's the other one?

<!-- Speaker note: In *Where files live* you moved around and looked. Now read what's inside files, and find the ones that don't want to be seen. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**In /home/sam, ls shows notes.txt, pets.txt, photos/ and projects/. Is that everything in the folder?**

- Yes, unless the computer is broken
- Yes: ls always shows everything
- Maybe not: names starting with a dot are hidden from ls
- No: ls only shows files, not folders

<!-- Speaker note: What happens: Not everything: there's a hidden file, .plans.txt. ls skips names that start with a dot; ls -a shows them. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who said "everything" will meet .plans.txt in the Try. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fshell%2Freading%2Fstep-2&code=widget%3A+shell%0Atree%3A+on%0Afind%3A+%2Fhome%2Fsam%2F.plans.txt%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/shell/reading/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Not everything: there's a hidden file, .plans.txt. ls skips names that start with a dot; ls -a shows them.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## grep cat pets.txt, line by line

Now count the lines.

$$\text{cat} \Rightarrow \text{printed}$$

1) $\text{dog} \Rightarrow \text{skipped}$ — No c-a-t.
2) $\text{catfish} \Rightarrow \text{printed}$ — c-a-t is inside it: grep matches letters anywhere.
3) $\text{parrot, hamster} \Rightarrow \text{skipped}$ — No c-a-t.
4) $\text{cat} \Rightarrow \text{printed}$ — Three lines in all.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write cat printed and say "The line contains c-a-t." Line 1: write dog skipped and say "No c-a-t." Line 2: write catfish printed and say "c-a-t is inside it: grep matches letters anywhere." Line 3: write parrot, hamster skipped and say "No c-a-t." Line 4: write cat printed and say "Three lines in all." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## grep cat pets.txt, line by line

**pets.txt has six lines: cat, dog, catfish, parrot, cat, hamster. How many lines does grep cat pets.txt print?**

* Answer: 3

<!-- Speaker note: cat, catfish and cat: grep matches the letters anywhere in the line. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam looks for a clue in the gym folder. Click the line where it first goes wrong.**

```
 1  Sam types ls in the gym folder.
 2  ls shows only notice.txt.
 3  So notice.txt is the only thing in the gym folder.
 4  So there is nowhere else to look for the clue.
```

* Answer: line 3

<!-- Speaker note: Line 3: ls skips hidden names. ls -a might show a hidden folder or file. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Capital letters

**grep Friday notes.txt prints "Robot club on Friday". What does grep friday notes.txt print?**

- An error
- Every line
- Nothing: grep cares about capital letters (grep -i ignores them)
- The same line

* Answer: Nothing: grep cares about capital letters (grep -i ignores them)

<!-- Speaker note: grep -i friday notes.txt ignores capitals and finds it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: find it fast



- **One line:** 
- **Count:** 
- **Read from here:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/shell/reading/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing: one matching line, counting with grep -c, then reading a file in another folder without moving. For students who need more support: Add to the card: cat file (print it), grep word file (lines with word), ls -a (hidden too). For early finishers: grep -n shows line numbers and grep -v shows the lines that don't match. When would each be useful? The hard part, on purpose: grep matching inside words (catfish) surprises students; let the count come out wrong once, then look at the lines. When students get stuck: A student says there's nothing more in the gym (Sam's mistake). Ask: What did ls -a show in your home folder that ls didn't? Fix: Try ls -a in the gym too. / grep finds nothing. Ask: Do the capitals match? Fix: grep is case sensitive; grep -i ignores capitals. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A huge log

**A log file has 10,000 lines. You want only the lines with ERROR in them. Which command?**

- ls -a log.txt
- grep ERROR log.txt
- cat log.txt
- cd log.txt

* Answer: grep ERROR log.txt

<!-- Speaker note: This is how people read huge logs on servers: grep pulls out what matters. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Hidden

**Which of these is a hidden file?**

- Config
- .config
- config.
- _config

* Answer: .config

<!-- Speaker note: Names that start with a dot are hidden from plain ls. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: paths

**Review: you are in /home/sam/photos. What does cd .. do?**

- Goes home, wherever you are
- Goes to the top, /
- Nothing
- Goes up to /home/sam

* Answer: Goes up to /home/sam

<!-- Speaker note: .. is the folder above this one. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the treasure hunt, part 1

Then: on a real computer, what kinds of files do you think are hidden, and why?

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/shell/reading/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Following clue files through folders, one of them hidden, puts the moves together: look, move, read, and look again with -a. Hints, in order: Start with cat start.txt. / Each clue names a folder. Look inside with ls; read with cat. / The gym clue is hidden: ls -a. -->

<!-- Speaker note: Teacher: ask what made them try ls -a in the gym. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**How would you print only the lines of notes.txt with the word maths in them, and how would you check for hidden files?**

* grep maths notes.txt; ls -a.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Changing files. -->
