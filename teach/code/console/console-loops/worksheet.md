---
title: "Keep asking"
subtitle: "Console bridge: text in, text out · Loops and menus · Lesson 3"
---

# Keep asking

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A PIN pad lets you try again, a game keeps going until you win, and a till keeps adding until you pay: all of them are loops that run until something changes.


:::teacher-note

**In one sentence:** Students meet while, a loop that repeats until its question is no longer true, through a guess-the-number game, then count tries with += and keep a running total.

**Students should be able to say:** I can use while to repeat until something becomes true. I can explain what makes a while loop stop, and why a loop runs for ever. I can keep a count or a running total with +=.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`while guess != secret:` asks a question before every lap: is the guess **not equal** to the secret? While the answer is yes, the indented lines run again.

```python
secret = 7
guess = 0
while guess != secret:
    guess = int(input("Guess my number: "))
    if guess < secret:
        print("Higher")
    elif guess > secret:
        print("Lower")
print("Got it!")
```

:::keep-together

**The secret is 7. You guess 10, then 3, then 7. How many times does the program ask for a guess?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 3 times. After 10 and 3 the guess is still not 7, so the loop asks again. After 7 the question guess != secret is False, so the loop stops and Got it! is printed.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

`tries += 1` is short for `tries = tries + 1`: add one to what is stored. Python reads `while` as a question asked again before every lap.

```python
import random

secret = random.randint(1, 20)
guess = 0
tries = 0
while guess != secret:
    guess = int(input("Guess a number from 1 to 20: "))
    tries += 1
    if guess < secret:
        print("Higher")
    elif guess > secret:
        print("Lower")
print("Got it in " + str(tries) + " tries!")
```

:::keep-together

### Trace a game

**The secret is 12. Fill in what happens after each guess.**

{{rows 1}}

| guess | tries | prints | loop again? |
|---|---|---|---|
| 5 | 1 | Higher | yes |
| 15 |   |   |   |
| 12 |   |   |   |

:::


:::teacher-note

**Answer:** 2, Lower, yes, 3, Got it in 3 tries!, no

tries += 1 adds one each lap. After 12, guess != secret is False, so the loop stops and the line after it runs.

:::


:::keep-together

### Why guess = 0?

**Why does the program set guess = 0 before the loop?**

☐ So while has a guess to compare the first time it asks

☐ Because the secret is 0

☐ To make the game harder

☐ It does nothing: the line could go

:::


:::teacher-note

**Answer:** So while has a guess to compare the first time it asks

while asks its question before the first lap, so guess needs a value already. 0 can never be the secret, so the loop always runs at least once.

:::


:::keep-together

### Spot the bug

**This should stop once the total reaches 100, but it keeps asking for ever, even after 60 and 50. Click the line that causes it.**

```
 1  total = 0
 2  while total < 100:
 3      points = int(input("Points scored: "))
 4      total + points
 5  print("You reached " + str(total) + " points!")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

total + points works out a sum but does not store it, so total stays 0 and total &lt; 100 is always True. total += points (or total = total + points) changes it.

:::


:::typical

## Modify


**A harder game.** Pick the secret from **1 to 100**.

**Five tries only.** Stop after **5 tries**. If the player runs out, print the secret.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A harder game:**

```python
import random

secret = random.randint(1, 100)
guess = 0
tries = 0
while guess != secret:
    guess = int(input("Guess a number from 1 to 100: "))
    tries += 1
    if guess < secret:
        print("Higher")
    elif guess > secret:
        print("Lower")
print("Got it in " + str(tries) + " tries!")
```

**Five tries only:**

```python
import random

secret = random.randint(1, 20)
guess = 0
tries = 0
while guess != secret and tries < 5:
    guess = int(input("Guess a number from 1 to 20: "))
    tries += 1
    if guess < secret:
        print("Higher")
    elif guess > secret:
        print("Lower")
if guess == secret:
    print("Got it in " + str(tries) + " tries!")
else:
    print("Out of tries! It was " + str(secret) + ".")
```

:::

:::


## Make a points counter

Write a **points counter** for a game or a sports day. It keeps asking for points until someone types `0`, adding each score to a total. Then it prints the total and how many scores were added, such as `Total: 23 from 4 scores.`

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
total = 0
count = 0
points = -1
while points != 0:
    points = int(input("Points (0 to stop): "))
    if points != 0:
        total += points
        count += 1
print("Total: " + str(total) + " from " + str(count) + " scores.")
```

:::


:::wider

## Where this leads

Loops that wait for the right answer are everywhere: PIN pads, game loops, and programs that keep asking until the input is valid. Next lesson puts a whole menu inside a loop that runs until you choose to quit.

:::


## Exit ticket

:::keep-together

**n = 1. while n &lt; 20: n = n * 2. What is n when the loop stops?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 32. n goes 1, 2, 4, 8, 16, 32; at 32 the question n &lt; 20 is False, so the loop stops.

:::

