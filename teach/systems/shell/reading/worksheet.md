---
title: "Reading and finding"
subtitle: "The command line · Using a shell · Lesson 2"
---

# Reading and finding

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** ls shows four things in Sam's home folder. There are five. Where's the other one?


:::teacher-note

**In one sentence:** Students print files with cat, find lines with grep (including -i, -c and paths to other folders), reveal hidden names with ls -a, and follow a clue trail to a hidden folder (AC9TDI10K01 node 1).

**Students should be able to say:** I can print a file with cat. I can find the lines I want with grep. I can find hidden files with ls -a.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**In /home/sam, ls shows notes.txt, pets.txt, photos/ and projects/. Is that everything in the folder?**

☐ Yes, unless the computer is broken

☐ Yes: ls always shows everything

☐ Maybe not: names starting with a dot are hidden from ls

☐ No: ls only shows files, not folders

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Not everything: there's a hidden file, .plans.txt. ls skips names that start with a dot; ls -a shows them.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: grep


:::keep-together

### grep cat pets.txt, line by line

1. $\text{cat} \Rightarrow \text{printed}$ — The line contains c-a-t.
2. $\text{dog} \Rightarrow \text{skipped}$ — No c-a-t.
3. $\text{catfish} \Rightarrow \text{printed}$ — c-a-t is inside it: grep matches letters anywhere.
4. $\text{parrot, hamster} \Rightarrow \text{skipped}$ — No c-a-t.
5. $\text{cat} \Rightarrow \text{printed}$ — Three lines in all.

Now count the lines.

**pets.txt has six lines: cat, dog, catfish, parrot, cat, hamster. How many lines does grep cat pets.txt print?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 3

cat, catfish and cat: grep matches the letters anywhere in the line.

:::


:::keep-together

### Find the mistake

**Sam looks for a clue in the gym folder. Click the line where it first goes wrong.**

```
 1  Sam types ls in the gym folder.
 2  ls shows only notice.txt.
 3  So notice.txt is the only thing in the gym folder.
 4  So there is nowhere else to look for the clue.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: ls skips hidden names. ls -a might show a hidden folder or file.

:::


:::keep-together

### Capital letters

**grep Friday notes.txt prints "Robot club on Friday". What does grep friday notes.txt print?**

☐ An error

☐ Every line

☐ Nothing: grep cares about capital letters (grep -i ignores them)

☐ The same line

:::


:::teacher-note

**Answer:** Nothing: grep cares about capital letters (grep -i ignores them)

grep -i friday notes.txt ignores capitals and finds it.

:::


:::typical

## Vary: find it fast


**One line.** 

**Count.** 

**Read from here.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Reading


:::keep-together

### A huge log

**A log file has 10,000 lines. You want only the lines with ERROR in them. Which command?**

☐ ls -a log.txt

☐ grep ERROR log.txt

☐ cat log.txt

☐ cd log.txt

:::


:::teacher-note

**Answer:** grep ERROR log.txt

This is how people read huge logs on servers: grep pulls out what matters.

:::


:::keep-together

### Hidden

**Which of these is a hidden file?**

☐ Config

☐ .config

☐ config.

☐ _config

:::


:::teacher-note

**Answer:** .config

Names that start with a dot are hidden from plain ls.

:::


:::keep-together

### Review: paths

**Review: you are in /home/sam/photos. What does cd .. do?**

☐ Goes home, wherever you are

☐ Goes to the top, /

☐ Nothing

☐ Goes up to /home/sam

:::


:::teacher-note

**Answer:** Goes up to /home/sam

.. is the folder above this one.

:::


## Make: the treasure hunt, part 1

Then: on a real computer, what kinds of files do you think are hidden, and why?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**How would you print only the lines of notes.txt with the word maths in them, and how would you check for hidden files?**

{{lines-3}}

:::


:::teacher-note

**Answer:** grep maths notes.txt; ls -a.

:::

