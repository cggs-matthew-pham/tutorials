---
marp: true
theme: default
html: true
---

# Who can read what

The command line · Using a shell

<!-- Speaker note: Students read permission strings with ls -l, are refused a file they may not read, turn permissions into digits, and set them with chmod on their own files but not someone else's (AC9TDI10K01 node 3, access control on a real kind of system). About 45 minutes (Predict and Try 7 min · Worked example 12 min · Vary 12 min · Practise and Make 14 min). -->

---

## Today

**We are learning to** every file has an owner and permissions: read, write and run, for the owner and for everyone else. ls -l shows them as letters like rw-r--r-- (644). The owner changes them with chmod; nobody else can. Hiding a file protects nothing; permissions do.

- I can read a permission string such as rw-r--r--.
- I can turn permissions into digits and back.
- I can protect a file with chmod, and explain why hiding it doesn't.

<!-- Speaker note: Before class: Try the boards yourself. The one idea: the operating system checks permissions before every request, and only the owner (or an administrator) can change them. This is Security and privacy's access control (authorisation) on a real kind of system. Simplification: the pretend computer has no groups, so the middle group of letters is shown but only "owner" and "everyone else" are checked. sudo is refused on purpose. Teacher: Try: ask what the operating system checked before refusing. Teacher: Worked example: build 640 on the board one group at a time. Teacher: Vary: after the refusal, ask why the system lets Lee but not Sam change it. -->

---

## Why it matters

> Everyone at school logs into the same server. Why can't you read your teacher's marks file?

<!-- Speaker note: On a shared computer, the operating system checks every request against the file's **permissions** before it opens anything. This is the same idea as *Who are you, and what may you do?* in Security and privacy, on a real kind of system. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A file's permissions for everyone else are r--. Can another student change the file?**

- Only if they rename it
- Yes: they can read it, so they can change it
- Only if it's hidden
- No: r means read, and there's no w (write)

<!-- Speaker note: What happens: No. r-- means read yes, write no, run no. They can open it but not change or delete it. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who said yes think reading gives control. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fshell%2Fpermissions%2Fstep-2&code=widget%3A+shell%0Afind%3A+%2Fhome%2Flee%2Ftimetable.txt%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/shell/permissions/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* No. r-- means read yes, write no, run no. They can open it but not change or delete it.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## -rw-r--r--, letter by letter

Now turn a permission string into digits.

$$\text{-}$$

1) $\text{rw-}$ — Owner: read yes, write yes, run no. 4 + 2 + 0 = 6.
2) $\text{r--}$ — Group: read only. 4.
3) $\text{r--}$ — Everyone else: read only. 4. So this file is 644.
4) $\text{chmod o-r file}$ — Take read (r) away from others (o): rw-r----- (640).

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write - and say "The first character: - for a file, d for a folder." Line 1: write rw- and say "Owner: read yes, write yes, run no. 4 + 2 + 0 = 6." Line 2: write r-- and say "Group: read only. 4." Line 3: write r-- and say "Everyone else: read only. 4. So this file is 644." Line 4: write chmod o-r file and say "Take read (r) away from others (o): rw-r----- (640)." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## -rw-r--r--, letter by letter

**rw-r----- as three digits (read 4, write 2, run 1, for owner, group, everyone else)?**

* Answer: 640

<!-- Speaker note: rw- = 4 + 2 = 6; r-- = 4; --- = 0. So 640. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam hides a file. Click the line where it first goes wrong.**

```
 1  Sam's plans are in a file called .plans.txt.
 2  The name starts with a dot, so ls does not show it.
 3  So nobody else on the computer can read it.
 4  Sam's plans are safe.
```

* Answer: line 3

<!-- Speaker note: Line 3: hidden only means plain ls skips it. Anyone can ls -a and cat it if the permissions allow. chmod 600 is what protects it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Who can chmod?

**Who can change a file's permissions with chmod?**

- Anyone who can read it
- Anyone who can see it with ls
- Nobody, once set
- Its owner (and an administrator)

* Answer: Its owner (and an administrator)

<!-- Speaker note: That's why you couldn't chmod Lee's file. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change who can do what



- **Hide it properly:** 
- **Let it run:** 
- **Not yours:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/shell/permissions/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one permission: take read away from others, add run for the owner, then try to change a file you don't own. For students who need more support: A 4-2-1 card: r = 4, w = 2, x = 1, added for owner, group, everyone else. For early finishers: Find out what chmod 777 means and why people say never to use it. The hard part, on purpose: The digits are the hard part. Keep the 4-2-1 card visible and add up one group at a time. When students get stuck: A student thinks hidden means private (Sam's mistake). Ask: Can you cat .plans.txt? Could someone else? Fix: Only permissions protect it: chmod 600. / A student's chmod gives an error. Ask: Whose file is it? (ls -l shows the owner.) Fix: You can only chmod your own files. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## 755

**A file is rwxr-xr-x (755). Can everyone else run it?**

- No: only the owner can run anything
- Yes: their group is r-x
- Only on Mondays
- Only if it's hidden

* Answer: Yes: their group is r-x

<!-- Speaker note: r-x: read and run, but not change. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Private

**Which digits mean only the owner can read and write, and nobody else can do anything?**

- 000
- 600
- 644
- 777

* Answer: 600

<!-- Speaker note: rw------- = 600: the setting for private files and keys. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: pipes

**Review: what does grep error log.txt | wc -l print?**

- An error
- How many lines log.txt has
- The lines with error
- How many lines of log.txt contain error

* Answer: How many lines of log.txt contain error

<!-- Speaker note: grep picks the lines; wc -l counts them. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: lock your plans

Then: on a real Mac or Linux computer, run ls -l in your home folder. Which files are most private?

[Open this step](https://tutorials.learningwaypoints.com/systems/shell/permissions/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Setting a file to exact permissions reverses the process: from who should be allowed to the digits or letters that say so. Hints, in order: Only you should read it and change it: rw for you, nothing for anyone else. / rw------- in digits: 6, 0, 0. / chmod 600 .plans.txt -->

<!-- Speaker note: Teacher: ask why private keys and password files are usually 600. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What does rw-r----- mean, and how would you make it so only you can read it?**

* The owner can read and write, the group can read, everyone else nothing (640). chmod 600 file (or chmod g-r file).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Links: Security and privacy › Who are you, and what may you do? (authentication and permissions); Cyber security (planned). -->
