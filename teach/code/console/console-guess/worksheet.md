---
title: "Guess the number"
subtitle: "Console bridge: text in, text out · Keep asking · Lesson 8"
---

# Guess the number

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Real programs are longer than a few lines. The skill is to find the part that does a job, then change just that part.


:::teacher-note

**In one sentence:** Students read a guessing game made of moves they know, find the part that does each job, change one part, and build a dice game from the same pieces.

**Students should be able to say:** I can point to the lines that do each job in a longer program. I can change one part of a program without breaking the rest. I can build a new loop from parts I know.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the program, one part at a time. How many tries will it say?

```python
secret = 7
guess = input("Guess a number from 1 to 20: ")
tries = 1
while guess != str(secret):
    if guess.isdigit() == False:
        print("Type a whole number.")
    elif int(guess) < secret:
        print("Too low.")
    else:
        print("Too high.")
    guess = input("Try again: ")
    tries += 1
print("Got it in " + str(tries) + " tries!")
```

:::keep-together

**The secret is 7. You type 10, then 3, then 7. What number does the last line show?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 3. tries starts at 1. The wrong guess 10 is followed by one more try, so tries is 2, then the wrong guess 3 makes it 3. 7 is right, so the loop ends and the program shows Got it in 3 tries!

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
import random

secret = random.randint(1, 20)
guess = input("Guess a number from 1 to 20: ")
tries = 1
while guess != str(secret):
    if guess.isdigit() == False:
        print("Type a whole number.")
    elif int(guess) < secret:
        print("Too low.")
    else:
        print("Too high.")
    guess = input("Try again: ")
    tries += 1
print("Got it in " + str(tries) + " tries!")
```

:::keep-together

### Find the parts

**Match each part of the program with its job.**

A. keeps asking until the guess is the secret

B. counts every guess

C. tells the player the guess was too low

D. the computer picks a secret number

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `secret = random.randint(1, 20)` | |
| `while guess != str(secret):` | |
| `elif int(guess) < secret:` | |
| `tries += 1` | |

:::


:::teacher-note

**Answer:** secret = random.randint(1, 20) → D. the computer picks a secret number; while guess != str(secret): → A. keeps asking until the guess is the secret; elif int(guess) &lt; secret: → C. tells the player the guess was too low; tries += 1 → B. counts every guess

The loop is the engine: it repeats the check, the hint, the new question and the count until the guess is right.

:::


:::keep-together

### Spot the bug

**With this version the program always says Got it in 2 tries, however many guesses it took. Click the wrong line.**

```
 1  secret = 7
 2  guess = input("Guess a number from 1 to 20: ")
 3  tries = 1
 4  while guess != str(secret):
 5      if guess.isdigit() == False:
 6          print("Type a whole number.")
 7      elif int(guess) < secret:
 8          print("Too low.")
 9      else:
10          print("Too high.")
11      guess = input("Try again: ")
12  tries += 1
13  print("Got it in " + str(tries) + " tries!")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 12

tries += 1 is not indented, so it runs once after the loop, not on every guess. Indent it so it runs on every pass.

:::


:::typical

## Modify

Change the game one step at a time. Run after each change.

**A bigger range.** Pick the secret from 1 to 100.

**Only five tries.** Stop after five wrong guesses and show the secret.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A bigger range:**

```python
import random

secret = random.randint(1, 100)
guess = input("Guess a number from 1 to 100: ")
tries = 1
while guess != str(secret):
    if guess.isdigit() == False:
        print("Type a whole number.")
    elif int(guess) < secret:
        print("Too low.")
    else:
        print("Too high.")
    guess = input("Try again: ")
    tries += 1
print("Got it in " + str(tries) + " tries!")
```

**Only five tries:**

```python
import random

secret = random.randint(1, 20)
guess = input("Guess a number from 1 to 20: ")
tries = 1
while guess != str(secret) and tries < 5:
    if guess.isdigit() == False:
        print("Type a whole number.")
    elif int(guess) < secret:
        print("Too low.")
    else:
        print("Too high.")
    guess = input("Try again: ")
    tries += 1
if guess == str(secret):
    print("Got it in " + str(tries) + " tries!")
else:
    print("Out of tries. The secret was " + str(secret) + ".")
```

:::

:::


## Make

Make a dice game with the same parts. The computer rolls a dice (a random number from 1 to 6) again and again until it gets a six, then prints how many rolls it took.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import random

roll = random.randint(1, 6)
count = 1
while roll != 6:
    roll = random.randint(1, 6)
    count += 1
print("It took " + str(count) + " rolls to get a six.")
```

:::


## Exit ticket

:::keep-together

**Which line in the guessing game makes it ask again, and which line counts the guesses?**

{{lines-3}}

:::


:::teacher-note

**Answer:** guess = input("Try again: ") asks again, and tries += 1 counts.

:::

