---
title: A machine that remembers in 5 minutes
---
## The idea in plain words

A **latch** is two gates whose outputs feed back into each other. Turn Set on and its output Q becomes 1; turn Set off again and Q *stays* 1, because the gates keep each other going. Reset makes it 0. That loop is a bit of **memory**. Put several latches side by side and you have a **register** that holds a number; billions of them (in a related form) make RAM, which is why RAM needs power.

A **processor** is gates, registers and memory together. Its **program counter** (PC) says which memory cell to use next. Each **clock tick** does one step of the **fetch–decode–execute** cycle: fetch the instruction from memory, work out what it means, do it. Instructions are just numbers in memory, like the data: a stored program. A 3 GHz processor ticks about 3 billion times a second.

## Links

*Inside a computer*: RAM empties when the power goes off; GHz is clock speed; cores are copies of the processor. *Bits all the way down*: numbers wrap when they run out of bits.

## What students get wrong

- **A latch forgets when Set goes off.** It keeps its bit until Reset.
- **Instructions and data are different kinds of thing.** Both are numbers in the same memory.

## The words

**latch**, **register**, **memory**, **clock**, **program counter**, **instruction register**, **accumulator**, **fetch**, **decode**, **execute**, **stored program**.
