---
marp: true
theme: default
html: true
---

# Changing files

The command line · Using a shell

<!-- Speaker note: Students make folders, copy, move, rename and delete files (rm and rm -r) and save text with echo and >, learning that rm has no recycle bin (AC9TDI10K01 node 1). About 40 minutes (Predict and Try 7 min · Worked example 10 min · Vary 10 min · Practise and Make 13 min). -->

---

## Today

**We are learning to** mkdir makes a folder, cp copies, mv moves or renames, rm deletes and echo … > saves text into a file. rm is for good: there is no recycle bin in a shell, so look before you delete.

- I can make folders and copy, move and rename files.
- I can delete files and folders, knowing it is for good.
- I can save text into a file.

<!-- Speaker note: Before class: Try the boards yourself. The one idea: these commands change the filesystem, and rm is permanent. Real servers have no bin; backups are how people recover. The pretend mv and cp take one file and one destination. Teacher: Worked example: ask how many copies exist after cp, and after mv. Teacher: Vary: ask why rm refuses a folder without -r. -->

---

## Why it matters

> On your laptop, deleted files go to the bin. In a shell, rm means gone. Ready?

<!-- Speaker note: So far you've only looked. These commands change things: they make, copy, move and delete files and folders. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**You type rm notes.txt. Where is notes.txt now?**

- Gone for good: a shell has no recycle bin
- Still there until you restart
- In the recycle bin
- In a hidden folder called .trash

<!-- Speaker note: What happens: Gone. rm deletes straight away; the bin on your laptop is something the desktop adds, not the operating system. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who said the bin will meet the empty ls in the Try. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fshell%2Fchanging%2Fstep-2&code=widget%3A+shell%0Atree%3A+on%0Aexists%3A+%2Fhome%2Fsam%2Fold%2Fnotes.txt%0Agone%3A+%2Fhome%2Fsam%2Fnotes.txt%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/shell/changing/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Try ls: no notes.txt, and no bin to fetch it from. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Gone. rm deletes straight away; the bin on your laptop is something the desktop adds, not the operating system.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Five commands that change things

Now compare cp and mv.

$$\text{mkdir old}$$

1) $\text{cp notes.txt old}$ — Copy: notes.txt stays, and old/notes.txt is a second copy.
2) $\text{mv notes.txt old}$ — Move: notes.txt leaves here and goes into old. Also renames: mv a.txt b.txt.
3) $\text{rm notes.txt}$ — Delete, for good. rm -r deletes a folder and everything in it.
4) $\text{echo hi > hello.txt}$ — Save some text into a file (> replaces it; >> adds to the end).

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write mkdir old and say "Make a new, empty folder called old." Line 1: write cp notes.txt old and say "Copy: notes.txt stays, and old/notes.txt is a second copy." Line 2: write mv notes.txt old and say "Move: notes.txt leaves here and goes into old. Also renames: mv a.txt b.txt." Line 3: write rm notes.txt and say "Delete, for good. rm -r deletes a folder and everything in it." Line 4: write echo hi > hello.txt and say "Save some text into a file (> replaces it; >> adds to the end)." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Five commands that change things

**You type mv pets.txt photos. Then ls in your home folder. Is pets.txt there?**

- Yes, and there's another in photos
- It's deleted
- No: mv moved it into photos
- Yes: mv makes a copy

* Answer: No: mv moved it into photos

<!-- Speaker note: mv moves (one file, new place); cp copies (two files). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam deletes a file. Click the line where it first goes wrong.**

```
 1  Sam types rm notes.txt.
 2  ls no longer shows notes.txt.
 3  The file is in the recycle bin, like on a laptop.
 4  So Sam can get it back later if needed.
```

* Answer: line 3

<!-- Speaker note: Line 3: rm has no recycle bin. The file is gone; copy anything you might need first. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Renaming

**How do you rename notes.txt to todo.txt?**

- rename notes.txt
- mv notes.txt todo.txt
- cp notes.txt todo.txt
- cd notes.txt todo.txt

* Answer: mv notes.txt todo.txt

<!-- Speaker note: Moving a file to a new name in the same folder renames it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one change each



- **Rename:** 
- **Make a file:** 
- **Remove a folder:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/shell/changing/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing: renaming with mv, making a file with echo and >, then removing a whole folder with rm -r. For students who need more support: Add to the card: mkdir, cp a b, mv a b, rm a, rm -r folder, echo text > file. For early finishers: Make a folder called backups and copy every .txt file in your home folder into it, one cp at a time. How would a script do it? The hard part, on purpose: The Make has more than one route; students who try one big mv and get pictures/photos inside should look at the tree and fix it, not start again. When students get stuck: A student expects to undo rm (Sam's mistake). Ask: Where would the file have gone? Is there a bin folder? Fix: rm is final; copy first. / A student's > emptied a file. Ask: What's the difference between > and >>? Fix: > replaces; >> adds to the end. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Back up first

**You want to try editing report.txt but keep the original safe. What first?**

- mv report.txt report-backup.txt
- rm report.txt
- cp report.txt report-backup.txt
- mkdir report.txt

* Answer: cp report.txt report-backup.txt

<!-- Speaker note: Copy first; then you can always go back. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Replace or add

**echo hi &gt; notes.txt. What happens to what was in notes.txt?**

- Nothing: it saves to a new file
- hi is added to the end
- It's replaced by hi
- An error

* Answer: It's replaced by hi

<!-- Speaker note: > replaces the file's contents; >> adds to the end. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: hidden

**Review: how do you see hidden files?**

- ls
- cd .hidden
- ls -a
- cat -a

* Answer: ls -a

<!-- Speaker note: -a for all. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: tidy up

Then: which of today's commands would you be most careful with, and why?

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/shell/changing/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Reorganising folders to match a description reverses the process: from the tidy result wanted to the commands that make it. Hints, in order: The result: a folder called pictures inside projects, with both photos in it, and no photos folder. / mkdir projects/pictures, then move the photos. / mv photos/beach.jpg projects/pictures, the same for dog.jpg, then rm -r photos. -->

<!-- Speaker note: Teacher: compare routes: three commands or one? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What is the difference between cp notes.txt old and mv notes.txt old? Which is safer before deleting?**

* cp leaves the original and makes a copy in old; mv moves it. cp is safer.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Pipes. -->
