---
title: "Changing files"
subtitle: "The command line · Using a shell · Lesson 3"
---

# Changing files

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** On your laptop, deleted files go to the bin. In a shell, rm means gone. Ready?


:::teacher-note

**In one sentence:** Students make folders, copy, move, rename and delete files (rm and rm -r) and save text with echo and >, learning that rm has no recycle bin (AC9TDI10K01 node 1).

**Students should be able to say:** I can make folders and copy, move and rename files. I can delete files and folders, knowing it is for good. I can save text into a file.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**You type rm notes.txt. Where is notes.txt now?**

☐ Gone for good: a shell has no recycle bin

☐ Still there until you restart

☐ In the recycle bin

☐ In a hidden folder called .trash

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Gone. rm deletes straight away; the bin on your laptop is something the desktop adds, not the operating system.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: cp or mv?


:::keep-together

### Five commands that change things

1. $\text{mkdir old}$ — Make a new, empty folder called old.
2. $\text{cp notes.txt old}$ — Copy: notes.txt stays, and old/notes.txt is a second copy.
3. $\text{mv notes.txt old}$ — Move: notes.txt leaves here and goes into old. Also renames: mv a.txt b.txt.
4. $\text{rm notes.txt}$ — Delete, for good. rm -r deletes a folder and everything in it.
5. $\text{echo hi > hello.txt}$ — Save some text into a file (> replaces it; >> adds to the end).

Now compare cp and mv.

**You type mv pets.txt photos. Then ls in your home folder. Is pets.txt there?**

☐ Yes, and there's another in photos

☐ It's deleted

☐ No: mv moved it into photos

☐ Yes: mv makes a copy

:::


:::teacher-note

**Answer:** No: mv moved it into photos

mv moves (one file, new place); cp copies (two files).

:::


:::keep-together

### Find the mistake

**Sam deletes a file. Click the line where it first goes wrong.**

```
 1  Sam types rm notes.txt.
 2  ls no longer shows notes.txt.
 3  The file is in the recycle bin, like on a laptop.
 4  So Sam can get it back later if needed.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: rm has no recycle bin. The file is gone; copy anything you might need first.

:::


:::keep-together

### Renaming

**How do you rename notes.txt to todo.txt?**

☐ rename notes.txt

☐ mv notes.txt todo.txt

☐ cp notes.txt todo.txt

☐ cd notes.txt todo.txt

:::


:::teacher-note

**Answer:** mv notes.txt todo.txt

Moving a file to a new name in the same folder renames it.

:::


:::typical

## Vary: one change each


**Rename.** 

**Make a file.** 

**Remove a folder.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Safely


:::keep-together

### Back up first

**You want to try editing report.txt but keep the original safe. What first?**

☐ mv report.txt report-backup.txt

☐ rm report.txt

☐ cp report.txt report-backup.txt

☐ mkdir report.txt

:::


:::teacher-note

**Answer:** cp report.txt report-backup.txt

Copy first; then you can always go back.

:::


:::keep-together

### Replace or add

**echo hi &gt; notes.txt. What happens to what was in notes.txt?**

☐ Nothing: it saves to a new file

☐ hi is added to the end

☐ It's replaced by hi

☐ An error

:::


:::teacher-note

**Answer:** It's replaced by hi

&gt; replaces the file's contents; &gt;&gt; adds to the end.

:::


:::keep-together

### Review: hidden

**Review: how do you see hidden files?**

☐ ls

☐ cd .hidden

☐ ls -a

☐ cat -a

:::


:::teacher-note

**Answer:** ls -a

-a for all.

:::


## Make: tidy up

Then: which of today's commands would you be most careful with, and why?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**What is the difference between cp notes.txt old and mv notes.txt old? Which is safer before deleting?**

{{lines-3}}

:::


:::teacher-note

**Answer:** cp leaves the original and makes a copy in old; mv moves it. cp is safer.

:::

