---
title: The command line in 5 minutes
---
## The idea in plain words

A **shell** lets you use a computer by typing commands instead of clicking. Every Linux server, Raspberry Pi and Mac has one, and it is how most of the internet's computers are run.

Files live in a tree of **folders**. A **path** names a place in the tree: `/home/sam/projects` starts at the top (`/`); `projects/game` starts from where you are; `..` means the folder above; `~` means your home folder. `pwd` says where you are, `ls` lists what's here (`ls -a` shows hidden names, which start with a dot), and `cd` moves you.

`cat` prints a file; `grep word file` prints only the lines containing the word. `mkdir`, `cp`, `mv` and `rm` make, copy, move and delete; `rm` is for good, with no recycle bin. A **pipe** (`|`) sends one command's output into the next, so small commands combine: `grep cat pets.txt | wc -l` counts matching lines. `>` saves output into a file.

Every file has an owner and **permissions**: read, write and run (`r`, `w`, `x`) for the owner and for everyone else. `ls -l` shows them (`-rw-r--r--` is 644: you can read and change it, everyone else can only read it). Only the owner can `chmod` them, and hiding a file (a dot name) protects nothing.

## Where to run it for real

The board is a pretend computer, the same everywhere. For the real thing, in order of preference: a Raspberry Pi; an in-browser Linux such as WebVM (no install; test it on the school network first); Mac Terminal (zsh: almost the same commands); WSL on Windows or VirtualBox (both need admin rights to install).

## What students get wrong

- **cd moves files.** It moves *you*.
- **If ls doesn't show it, it isn't there.** Hidden names need `ls -a`.
- **Deleted files go to a recycle bin.** Not with `rm`.
- **Each command only reads files.** After a pipe, it reads the previous command's output.
- **Hidden means protected.** Only permissions protect a file.

## The words

**shell**, **command**, **folder**, **path**, **home folder**, **hidden file**, **pipe**, **permissions**, **owner**, **read, write, run**.
