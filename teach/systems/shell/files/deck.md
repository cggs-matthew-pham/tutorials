---
marp: true
theme: default
html: true
---

# Where files live

The command line · Using a shell

<!-- Speaker note: Students move around a pretend Linux filesystem with pwd, ls and cd, reading full paths, short paths, .. and ~, with a folder tree beside the terminal (AC9TDI10K01 node 1, the operating system's file system). About 40 minutes (Predict and Try 8 min · Worked example 10 min · Vary 10 min · Practise and Make 12 min). -->

---

## Today

**We are learning to** files live in a tree of folders, and a path names a place in it. pwd says where you are, ls lists what is here and cd moves you, with full paths from the top (/), short paths from where you are, .. for the folder above and ~ for home.

- I can say where I am, list what is here, and move with cd.
- I can read a full path and a short path, including .. and ~.
- I can find a file by looking and moving.

<!-- Speaker note: Before class: Try the boards yourself. Everything runs in the browser on a pretend computer; nothing touches the school's machines. The one idea: files live in a tree, and a path names a place in it. The folder tree is on for the Try and Vary and off for the Make, so students build the path themselves. For the real thing (optional, after the course): a Raspberry Pi is best; WebVM runs Linux in a browser tab with no install (test it on the school network first); Mac Terminal works with the same commands; WSL or VirtualBox on Windows need admin rights. Teacher: Try: ask what the prompt shows after each cd. Teacher: Worked example: model reading a path aloud: "from the top, home, sam, projects". Teacher: Vary: ask which way works from anywhere. -->

---

## Why it matters

> Most of the world's servers have no mouse and no windows. People run them by typing. Where do you even start?

<!-- Speaker note: A **shell** is a way to use a computer by typing. You type a command, press Enter, and the computer answers. This board is a pretend computer, so nothing you type can break anything. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**You are in /home/sam. You type cd projects, then pwd. What does pwd show?**

- /home/sam (cd only looks inside)
- /projects
- projects
- /home/sam/projects

<!-- Speaker note: What happens: /home/sam/projects: cd moved you into the projects folder inside where you were, and pwd prints the full path. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who said /projects think cd starts from the top. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fshell%2Ffiles%2Fstep-2&code=widget%3A+shell%0Atree%3A+on%0Aat%3A+%2Fhome%2Fsam%2Fprojects%2Fgame%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/shell/files/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Type pwd to check. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* /home/sam/projects: cd moved you into the projects folder inside where you were, and pwd prints the full path.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Three ways to name one folder

Now try two lots of ..

$$/home/sam/projects/game$$

1) $\text{projects/game}$ — A short path starts from where you are now (here, /home/sam).
2) $\text{..}$ — The folder above. From game, .. is projects, and ../.. is sam.
3) $\sim$ — Your home folder, /home/sam. cd on its own also goes home.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write /home/sam/projects/game and say "A full path starts with /, the very top, and works from anywhere." Line 1: write projects/game and say "A short path starts from where you are now (here, /home/sam)." Line 2: write .. and say "The folder above. From game, .. is projects, and ../.. is sam." Line 3: write and say "Your home folder, /home/sam. cd on its own also goes home." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Three ways to name one folder

**You are in /home/sam/projects/game. You type cd ../.. Where are you now?**

- /home/sam
- /home
- /home/sam/projects
- /

* Answer: /home/sam

<!-- Speaker note: Each .. goes up one folder: game → projects → sam. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam explains what cd does. Click the line where it first goes wrong.**

```
 1  Sam is in /home/sam, where notes.txt is.
 2  Sam types cd photos.
 3  Now notes.txt has moved into the photos folder too.
 4  So ls in photos shows notes.txt.
```

* Answer: line 3

<!-- Speaker note: Line 3: cd moves you, not your files. notes.txt stays in /home/sam; mv is the command that moves files. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which command?

**Which command lists what is in the folder you are in?**

- pwd
- ls
- cd
- cat

* Answer: ls

<!-- Speaker note: ls lists files and folders (folders end with /). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: other ways to move



- **A full path:** 
- **Up with ..:** 
- **Home:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/shell/files/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing about the path: a full path from the top, going up with .., then cd on its own to go home. For students who need more support: A card with four commands: pwd (where am I?), ls (what's here?), cd name (go in), cd .. (go up). For early finishers: Press Tab after typing the start of a folder name. What does it do? (It completes the name.) The hard part, on purpose: The first minutes at a prompt feel like guessing. Let students type and get it wrong: the board is pretend, errors are friendly, and the tree shows where they are. When students get stuck: A student thinks cd moved their files (Sam's mistake). Ask: Go back with cd .. and ls. Is notes.txt still there? Fix: cd moves you; files stay put. / A student gets "No such folder". Ask: Is that folder inside the one you're in? Check with ls. Fix: Use the right short path, or a full path from /. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Full paths

**Which path works from any folder?**

- ../photos
- /home/sam/photos
- photos
- ./photos

* Answer: /home/sam/photos

<!-- Speaker note: Paths that start with / start from the top. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The prompt

**The prompt says sam@school:~/projects$. Where are you?**

- /home/sam/projects
- Nowhere yet
- /projects
- ~projects

* Answer: /home/sam/projects

<!-- Speaker note: ~ means /home/sam, so ~/projects is /home/sam/projects. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: the OS

**Review: the same ls command works on an SSD, a USB stick or a network drive. Why?**

- It doesn't
- All storage is the same inside
- ls checks each type itself
- The operating system hides the difference; ls just asks it for the folder

* Answer: The operating system hides the difference; ls just asks it for the folder

<!-- Speaker note: Commands ask the operating system, which uses the right driver for each kind of storage. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: find and read a file

Then: what's the full path of that file? Could you print it with one command from home?

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/shell/files/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Finding a file with no tree to look at reverses the process: students build the path themselves from ls. Hints, in order: No tree this time: use ls to look inside each folder. / It's somewhere inside projects. / cd projects/game, then cat level1.txt. -->

<!-- Speaker note: Teacher: no tree: ask how they knew where to go. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**You are in /home/sam/photos. Write the command to get to /home/sam/projects in one step.**

* cd ../projects (or cd /home/sam/projects, or cd ~/projects).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Reading and finding (cat, grep, hidden files). Links: Security and privacy › What the operating system does. -->
