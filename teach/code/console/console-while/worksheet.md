---
title: "Repeat until"
subtitle: "Console bridge: text in, text out · Keep asking · Lesson 6"
---

# Repeat until

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A PIN pad lets you try again, a game keeps going until you win, and a form keeps asking until the answer is valid. All of them repeat until something changes.


:::teacher-note

**In one sentence:** Students meet while, a loop that keeps going for as long as a condition is true, and use it to keep asking until the answer is right.

**Students should be able to say:** I can use while to repeat lines until a condition is false. I can say what makes a loop stop. I can write a loop that keeps asking until the answer is right.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`while` is new, and it works like `if` that keeps going. Read the code and decide what is shown.

```python
word = input("Type quit to stop: ")
while word != "quit":
    print("You typed " + word)
    word = input("Type quit to stop: ")
print("Bye")
```

:::keep-together

**You type hi, then yo, then quit. What does the program show?**

☐ You typed hi, then You typed yo, then You typed quit, then Bye

☐ It asks once and stops

☐ Bye only

☐ You typed hi, then You typed yo, then Bye

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** You typed hi, then You typed yo, then Bye. The condition is checked before every pass, so once quit is typed the loop body is skipped and quit is never shown.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
word = input("Type quit to stop: ")
while word != "quit":
    print("You typed " + word)
    word = input("Type quit to stop: ")
print("Bye")
```

:::keep-together

### Follow the loop

**Fill in the condition and what the program shows after each word is typed.**

{{rows 1}}

| typed | word != "quit" | shows |
|---|---|---|
| hi | True | You typed hi |
| yo |   |   |
| quit |   |   |

:::


:::teacher-note

**Answer:** True, You typed yo, False, Bye

The condition is tested after every answer. While it is True the body runs again. When quit is typed it is False, so the body is skipped and the program carries on to Bye.

:::


:::keep-together

### Zero times

**The very first word typed is quit. How many times does the indented part of the loop run?**

☐ Until quit is typed again

☐ 1 time

☐ 0 times

☐ It stops with an error

:::


:::teacher-note

**Answer:** 0 times

while checks first. If the condition is False straight away, the body never runs.

:::


:::keep-together

### Spot the bug

**Type hi and the program shows You typed hi again and again and never stops. Click the line that is in the wrong place.**

```
 1  word = input("Type quit to stop: ")
 2  while word != "quit":
 3      print("You typed " + word)
 4  word = input("Type quit to stop: ")
 5  print("Bye")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

The line that asks again is not indented, so it is outside the loop. Nothing inside the loop changes word, so the condition stays True for ever. Indent it so it runs on every pass.

:::


:::typical

## Modify

Change the program so typing either `quit` or `exit` stops it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
word = input("Type quit or exit to stop: ")
while word != "quit" and word != "exit":
    print("You typed " + word)
    word = input("Type quit or exit to stop: ")
print("Bye")
```

:::

:::


## Mix it up

This mixes `while` with the check from last lesson: ask again until the answer is good.

```python
text = input("Pick a number from 1 to 9: ")
while text.isdigit() == False:
    text = input("Digits only. Try again: ")
print("You picked " + text)
```

:::keep-together

**The person types two, one, then 7. How many times does Digits only appear?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 2

two and one both fail the check, so the loop body runs twice. 7 passes, so the loop ends.

:::


## Make

Write a password door. Choose a secret word. The program asks for the password, says `Wrong, try again` for every wrong guess, and prints `Welcome in!` when it is right.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
secret = "open sesame"
attempt = input("Password: ")
while attempt != secret:
    print("Wrong, try again.")
    attempt = input("Password: ")
print("Welcome in!")
```

:::


## Exit ticket

:::keep-together

**A while loop's condition is already False the first time it is checked. How many times does the body run?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Zero times. while checks before every pass, including the first.

:::

