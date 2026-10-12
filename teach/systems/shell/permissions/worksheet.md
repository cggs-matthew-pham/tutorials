---
title: "Who can read what"
subtitle: "The command line · Using a shell · Lesson 5"
---

# Who can read what

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Everyone at school logs into the same server. Why can't you read your teacher's marks file?


:::teacher-note

**In one sentence:** Students read permission strings with ls -l, are refused a file they may not read, turn permissions into digits, and set them with chmod on their own files but not someone else's (AC9TDI10K01 node 3, access control on a real kind of system).

**Students should be able to say:** I can read a permission string such as rw-r--r--. I can turn permissions into digits and back. I can protect a file with chmod, and explain why hiding it doesn't.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**A file's permissions for everyone else are r--. Can another student change the file?**

☐ Only if they rename it

☐ Yes: they can read it, so they can change it

☐ Only if it's hidden

☐ No: r means read, and there's no w (write)

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** No. r-- means read yes, write no, run no. They can open it but not change or delete it.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: reading rw-r--r--


:::keep-together

### -rw-r--r--, letter by letter

1. $\text{-}$ — The first character: - for a file, d for a folder.
2. $\text{rw-}$ — Owner: read yes, write yes, run no. 4 + 2 + 0 = 6.
3. $\text{r--}$ — Group: read only. 4.
4. $\text{r--}$ — Everyone else: read only. 4. So this file is 644.
5. $\text{chmod o-r file}$ — Take read (r) away from others (o): rw-r----- (640).

Now turn a permission string into digits.

**rw-r----- as three digits (read 4, write 2, run 1, for owner, group, everyone else)?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 640

rw- = 4 + 2 = 6; r-- = 4; --- = 0. So 640.

:::


:::keep-together

### Find the mistake

**Sam hides a file. Click the line where it first goes wrong.**

```
 1  Sam's plans are in a file called .plans.txt.
 2  The name starts with a dot, so ls does not show it.
 3  So nobody else on the computer can read it.
 4  Sam's plans are safe.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: hidden only means plain ls skips it. Anyone can ls -a and cat it if the permissions allow. chmod 600 is what protects it.

:::


:::keep-together

### Who can chmod?

**Who can change a file's permissions with chmod?**

☐ Anyone who can read it

☐ Anyone who can see it with ls

☐ Nobody, once set

☐ Its owner (and an administrator)

:::


:::teacher-note

**Answer:** Its owner (and an administrator)

That's why you couldn't chmod Lee's file.

:::


:::typical

## Vary: change who can do what


**Hide it properly.** 

**Let it run.** 

**Not yours.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Permissions


:::keep-together

### 755

**A file is rwxr-xr-x (755). Can everyone else run it?**

☐ No: only the owner can run anything

☐ Yes: their group is r-x

☐ Only on Mondays

☐ Only if it's hidden

:::


:::teacher-note

**Answer:** Yes: their group is r-x

r-x: read and run, but not change.

:::


:::keep-together

### Private

**Which digits mean only the owner can read and write, and nobody else can do anything?**

☐ 000

☐ 600

☐ 644

☐ 777

:::


:::teacher-note

**Answer:** 600

rw------- = 600: the setting for private files and keys.

:::


:::keep-together

### Review: pipes

**Review: what does grep error log.txt | wc -l print?**

☐ An error

☐ How many lines log.txt has

☐ The lines with error

☐ How many lines of log.txt contain error

:::


:::teacher-note

**Answer:** How many lines of log.txt contain error

grep picks the lines; wc -l counts them.

:::


## Make: lock your plans

Then: on a real Mac or Linux computer, run ls -l in your home folder. Which files are most private?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**What does rw-r----- mean, and how would you make it so only you can read it?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The owner can read and write, the group can read, everyone else nothing (640). chmod 600 file (or chmod g-r file).

:::

