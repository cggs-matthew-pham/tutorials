---
title: "Where files live"
subtitle: "The command line · Using a shell · Lesson 1"
---

# Where files live

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Most of the world's servers have no mouse and no windows. People run them by typing. Where do you even start?


:::teacher-note

**In one sentence:** Students move around a pretend Linux filesystem with pwd, ls and cd, reading full paths, short paths, .. and ~, with a folder tree beside the terminal (AC9TDI10K01 node 1, the operating system's file system).

**Students should be able to say:** I can say where I am, list what is here, and move with cd. I can read a full path and a short path, including .. and ~. I can find a file by looking and moving.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**You are in /home/sam. You type cd projects, then pwd. What does pwd show?**

☐ /home/sam (cd only looks inside)

☐ /projects

☐ projects

☐ /home/sam/projects

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** /home/sam/projects: cd moved you into the projects folder inside where you were, and pwd prints the full path.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: reading a path


:::keep-together

### Three ways to name one folder

1. $/home/sam/projects/game$ — A full path starts with /, the very top, and works from anywhere.
2. $\text{projects/game}$ — A short path starts from where you are now (here, /home/sam).
3. $\text{..}$ — The folder above. From game, .. is projects, and ../.. is sam.
4. $\sim$ — Your home folder, /home/sam. cd on its own also goes home.

Now try two lots of ..

**You are in /home/sam/projects/game. You type cd ../.. Where are you now?**

☐ /home/sam

☐ /home

☐ /home/sam/projects

☐ /

:::


:::teacher-note

**Answer:** /home/sam

Each .. goes up one folder: game → projects → sam.

:::


:::keep-together

### Find the mistake

**Sam explains what cd does. Click the line where it first goes wrong.**

```
 1  Sam is in /home/sam, where notes.txt is.
 2  Sam types cd photos.
 3  Now notes.txt has moved into the photos folder too.
 4  So ls in photos shows notes.txt.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: cd moves you, not your files. notes.txt stays in /home/sam; mv is the command that moves files.

:::


:::keep-together

### Which command?

**Which command lists what is in the folder you are in?**

☐ pwd

☐ ls

☐ cd

☐ cat

:::


:::teacher-note

**Answer:** ls

ls lists files and folders (folders end with /).

:::


:::typical

## Vary: other ways to move


**A full path.** 

**Up with ...** 

**Home.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Paths


:::keep-together

### Full paths

**Which path works from any folder?**

☐ ../photos

☐ /home/sam/photos

☐ photos

☐ ./photos

:::


:::teacher-note

**Answer:** /home/sam/photos

Paths that start with / start from the top.

:::


:::keep-together

### The prompt

**The prompt says sam@school:~/projects$. Where are you?**

☐ /home/sam/projects

☐ Nowhere yet

☐ /projects

☐ ~projects

:::


:::teacher-note

**Answer:** /home/sam/projects

~ means /home/sam, so ~/projects is /home/sam/projects.

:::


:::keep-together

### Review: the OS

**Review: the same ls command works on an SSD, a USB stick or a network drive. Why?**

☐ It doesn't

☐ All storage is the same inside

☐ ls checks each type itself

☐ The operating system hides the difference; ls just asks it for the folder

:::


:::teacher-note

**Answer:** The operating system hides the difference; ls just asks it for the folder

Commands ask the operating system, which uses the right driver for each kind of storage.

:::


## Make: find and read a file

Then: what's the full path of that file? Could you print it with one command from home?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**You are in /home/sam/photos. Write the command to get to /home/sam/projects in one step.**

{{lines-3}}

:::


:::teacher-note

**Answer:** cd ../projects (or cd /home/sam/projects, or cd ~/projects).

:::

