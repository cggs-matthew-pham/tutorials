---
title: "Numbers into text"
subtitle: "Console bridge: text in, text out · Text in, text out · Lesson 3"
---

# Numbers into text

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Scores, prices, countdowns and receipts all mix words with numbers. Python will not guess how to join them, so you tell it.


:::teacher-note

**In one sentence:** Students learn why a number cannot be joined onto text with + and fix it with str.

**Students should be able to say:** I can say why "Score: " + 5 fails. I can use str to join a number onto text. I can build a line from text, a name and a calculated number.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the code. You know `+` joins text. What happens when one of the pieces is a number?

```python
score = 5
print("Score: " + score)
```

:::keep-together

**What happens when you run it?**

☐ It stops with an error on line 2

☐ It shows Score: score

☐ It shows Score: with the 5 added on a new line

☐ It shows Score: 5

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It stops with an error on line 2. + joins text to text. score holds a number, and Python will not guess how to join a number onto text.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
score = 5
print("Score: " + str(score))
print("Score: " + str(score + 1))
print(score + score)
print(str(score) + str(score))
```

:::keep-together

### Trace the lines

**Fill in what each line shows.**

{{rows 1}}

| line | shows |
|---|---|
| print("Score: " + str(score)) | Score: 5 |
| print("Score: " + str(score + 1)) |   |
| print(score + score) |   |
| print(str(score) + str(score)) |   |

:::


:::teacher-note

**Answer:** Score: 6, 10, 55

score + score adds two numbers: 10. str(score) + str(score) joins two pieces of text: 55.

:::


:::keep-together

### Spot the bug

**This should show Lives: 3, but stops with an error. Click the line that still has the problem.**

```
 1  lives = 3
 2  str(lives)
 3  print("Lives: " + lives)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

str(lives) on its own line makes a text copy and throws it away. lives is still a number. Put the str right where it is joined: "Lives: " + str(lives).

:::


:::typical

## Modify

Change the program so it also prints how many letters the name has.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
name = input("What is your name? ")
print("Hello, " + name)
print(name + " has " + str(len(name)) + " letters.")
```

:::

:::


## Mix it up

Mix of the last two lessons: the answer is stored, a number is worked out from it, and the number is turned into text.

```python
name = input("What is your name? ")
count = len(name)
print(name + " has " + str(count) + " letters.")
```

:::keep-together

**The person types Maria. What does the program print?**

☐ Maria has 5 letters.

☐ Maria has 5 letters

☐ Maria has count letters.

☐ It stops with an error

:::


:::teacher-note

**Answer:** Maria has 5 letters.

len(name) is 5, str(count) is the text 5, and the three pieces join into one line.

:::


## Make

A café sells cups of hot chocolate. Write a receipt: store the number of cups and the price, work out the total, and print a line such as `3 cups cost $12`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
cups = 3
price = 4
total = cups * price
print(str(cups) + " cups cost $" + str(total))
```

:::


## Exit ticket

:::keep-together

**score = 5. Which prints Score: 5, and why: A) print("Score: " + score)  B) print("Score: " + str(score))?**

{{lines-3}}

:::


:::teacher-note

**Answer:** B. + will not join text and a number. str makes the number into text.

:::

