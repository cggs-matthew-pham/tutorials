---
title: "Pipes"
subtitle: "The command line · Using a shell · Lesson 4"
---

# Pipes

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** No command counts how many different pets are in a list. Three tiny commands joined together do.


:::teacher-note

**In one sentence:** Students join commands with pipes (grep, wc, sort, uniq, head), save output with >, and finish the treasure hunt by finding an exact line and counting with a pipe (AC9TDI10K01 node 1).

**Students should be able to say:** I can join commands with a pipe. I can count, sort and remove repeats. I can save a command's output into a file.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**grep cat pets.txt prints cat, catfish and cat. What does grep cat pets.txt | wc -l print?**

☐ An error

☐ 6

☐ 3

☐ cat catfish cat

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 3. The three lines go into wc -l instead of the screen, and wc -l counts them.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: a three-part pipe


:::keep-together

### sort pets.txt | uniq | wc -l

1. $\text{sort pets.txt}$ — cat, cat, catfish, dog, hamster, parrot: same lines, in order.
2. $\text{| uniq}$ — Neighbouring repeats go: cat, catfish, dog, hamster, parrot.
3. $\text{| wc -l}$ — Counts the lines it receives: 5.
4. $\text{one line, three jobs}$ — Each command is tiny; the pipe joins them into something new.

Now count the lines after uniq.

**pets.txt is cat, dog, catfish, parrot, cat, hamster. How many lines does sort pets.txt | uniq print?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 5

sort puts the two cats next to each other; uniq keeps one. cat, catfish, dog, hamster, parrot: 5.

:::


:::keep-together

### Find the mistake

**Sam explains a pipe. Click the line where it first goes wrong.**

```
 1  Sam types grep cat pets.txt | wc -l.
 2  grep finds the lines with cat in them: cat, catfish, cat.
 3  wc -l counts the lines in pets.txt, which has 6 lines.
 4  So the answer is 6.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: after the |, wc -l reads grep's output (three lines), not pets.txt. The answer is 3.

:::


:::keep-together

### Why sort first

**Why does uniq need sort before it?**

☐ uniq only works on sorted words

☐ uniq only drops repeats that are next to each other

☐ It doesn't

☐ sort makes uniq faster

:::


:::teacher-note

**Answer:** uniq only drops repeats that are next to each other

Without sort, cat … cat aren't neighbours, so both stay.

:::


:::typical

## Vary: different pipes


**Different pets.** 

**First two.** 

**Save it.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Build the pipe


:::keep-together

### Count visits

**A server log has a line for every visit. Which pipe counts the visits from Australia (lines with AU)?**

☐ cat log.txt | sort

☐ grep log.txt | AU

☐ grep AU log.txt | wc -l

☐ wc -l log.txt | grep AU

:::


:::teacher-note

**Answer:** grep AU log.txt | wc -l

Find the lines first, then count them.

:::


:::keep-together

### First name

**What does sort names.txt | head -n 1 print?**

☐ The name that comes first alphabetically

☐ The number of names

☐ Every name

☐ The first name in the file

:::


:::teacher-note

**Answer:** The name that comes first alphabetically

sort orders the names; head keeps the first.

:::


:::keep-together

### Review: rm

**Review: what does rm -r projects do?**

☐ Deletes the projects folder and everything in it, for good

☐ Moves it to the recycle bin

☐ Renames it

☐ Lists it

:::


:::teacher-note

**Answer:** Deletes the projects folder and everything in it, for good

-r means the folder and everything inside it.

:::


## Make: the treasure hunt, part 2


**The GOLD line.** 

**The code.** 

**Count with a pipe.** Then: think of a question about a long list (your playlist, a class list) that a pipe could answer in one line.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Write one line that counts how many lines of pets.txt contain the letter o.**

{{lines-3}}

:::


:::teacher-note

**Answer:** grep o pets.txt | wc -l (or grep -c o pets.txt).

:::

