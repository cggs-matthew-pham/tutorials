---
title: "Check first"
subtitle: "Console bridge: text in, text out · Numbers from text · Lesson 5"
---

# Check first

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Type a word into a quantity box and a good app says so politely. A careless one crashes. The difference is one question asked before the number is used.


:::teacher-note

**In one sentence:** Students learn to check typed text with isdigit before converting it, so a typo gets a reply, not a crash.

**Students should be able to say:** I can use isdigit to check typed text before turning it into a number. I can say why the check goes before the conversion. I can write a program that replies politely to a typo.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

You know `if` and `else`. Read the code, including the new `text.isdigit()`. What happens if you type `twelve`?

```python
text = input("How old are you? ")
if text.isdigit():
    age = int(text)
    print("Next year you will be " + str(age + 1) + ".")
else:
    print("Please type your age as a number.")
```

:::keep-together

**You run it and type twelve. What happens?**

☐ It prints Please type your age as a number.

☐ It prints Next year you will be 13.

☐ It stops with an error on the int line

☐ It prints nothing at all

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It prints Please type your age as a number. The if asks whether the text is all digits first. twelve is not, so the else path runs, and int is never reached.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
text = input("How old are you? ")
if text.isdigit():
    age = int(text)
    print("Next year you will be " + str(age + 1) + ".")
else:
    print("Please type your age as a number.")
```

:::keep-together

### Trace the check

**For each answer typed, fill in what text.isdigit() gives and what the program prints.**

{{rows 1}}

| typed | text.isdigit() | prints |
|---|---|---|
| 12 | True | Next year you will be 13. |
| twelve |   |   |
| 9 |   |   |
| 4.5 |   |   |

:::


:::teacher-note

**Answer:** False, Please type your age as a number., True, Next year you will be 10., False, Please type your age as a number.

isdigit() is True only when every character is a digit from 0 to 9. A full stop is not a digit, so 4.5 fails too.

:::


:::keep-together

### Spot the bug

**The program has a check, but typing twelve still crashes it. Click the line that is in the wrong place.**

```
 1  text = input("How old are you? ")
 2  age = int(text)
 3  if text.isdigit():
 4      print("Next year you will be " + str(age + 1) + ".")
 5  else:
 6      print("Please type your age as a number.")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

int(text) runs on line 2, before the check on line 3, so the crash happens before the program has asked. The conversion has to go inside the if.

:::


:::typical

## Modify

Change the program so it asks for **two** numbers, checks both, and prints their total. If either answer is not a number, print a message instead.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
first = input("First number: ")
second = input("Second number: ")
if first.isdigit() and second.isdigit():
    total = int(first) + int(second)
    print("The total is " + str(total) + ".")
else:
    print("Please type two whole numbers.")
```

:::

:::


## Mix it up

This mixes the last lesson and `if`: a typed number, converted, and used.

```python
text = input("How many tickets? ")
if text.isdigit():
    print("That will be $" + str(int(text) * 12) + ".")
else:
    print("Please type a number.")
```

:::keep-together

**The person types 0. What does the program print?**

☐ Please type a number.

☐ That will be $0.

☐ It stops with an error

:::


:::teacher-note

**Answer:** That will be $0.

isdigit is True for 0, so the program calculates 0 tickets at $12, which is $0. The check only asks whether the text is all digits.

:::


## Make

Tickets to the school play cost **$12** each. Write a ticket machine that asks how many tickets, checks the answer is a number, and prints the total, such as `That will be $36.` If the answer is not a number, it prints a helpful message. Test it with 3, with 0 and with `three`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
text = input("How many tickets? ")
if text.isdigit():
    print("That will be $" + str(int(text) * 12) + ".")
else:
    print("Please type a number, such as 3.")
```

:::


## Exit ticket

:::keep-together

**Why does the check go before int, and what does text.isdigit() give?**

{{lines-3}}

:::


:::teacher-note

**Answer:** int stops the program on text that is not digits, so the program asks first. isdigit gives True or False.

:::

