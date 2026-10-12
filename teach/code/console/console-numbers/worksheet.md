---
title: "Numbers from text"
subtitle: "Console bridge: text in, text out · Text in, text out · Lesson 2"
---

# Numbers from text

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every app that asks for a quantity, an age or a PIN has to turn what you typed into a number, and cope when you type something else.


:::teacher-note

**In one sentence:** Students find out that input() always gives back text, turn it into a number with int(), and check it first with isdigit() so a typo gets a helpful reply instead of a crash.

**Students should be able to say:** I can explain why input() gives back text, even when digits are typed. I can turn text into a number with int() and calculate with it. I can check an answer with isdigit() before turning it into a number.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The program asks for two numbers and prints `a + b`. What will it print?

```python
a = input("First number: ")
b = input("Second number: ")
print(a + b)
```

:::keep-together

**You run it and type 5, then 5. What does it print?**

☐ An error

☐ 5 + 5

☐ 55

☐ 10

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 55. Both answers are text, "5" and "5", and + joins text, so the result is "55".

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

`text.isdigit()` asks the text a question: are all your characters digits? The dot means "ask this text". It gives `True` or `False`, so it fits straight into an `if`.

```python
text = input("How old are you? ")
if text.isdigit():
    age = int(text)
    print("Next year you will be " + str(age + 1) + ".")
else:
    print("Please type your age as a number, such as 12.")
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
| -3 |   |   |

:::


:::teacher-note

**Answer:** False, Please type your age as a number, such as 12., True, Next year you will be 10., False, Please type your age as a number, such as 12.

isdigit() is True only when every character is a digit from 0 to 9. A minus sign is not a digit, so -3 fails the check too, which suits an age.

:::


:::keep-together

### Without the check

**What would happen if you removed the if line and typed twelve?**

☐ It prints 13

☐ It prints Next year you will be thirteen.

☐ It prints the else message

☐ It stops with a ValueError on the int() line

:::


:::teacher-note

**Answer:** It stops with a ValueError on the int() line

int("twelve") cannot turn letters into a number, so the program stops with a ValueError. Checking with isdigit() first lets it reply politely instead.

:::


:::keep-together

### Spot the bug

**A ticket costs $12. You type 3, and it prints That will be $333333333333. Click the line that causes it.**

```
 1  tickets = input("How many tickets? ")
 2  cost = tickets * 12
 3  print("That will be $" + str(cost))
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 1

tickets holds the text "3", and text times 12 repeats it 12 times. Turning it into a number first fixes it: tickets = int(input("How many tickets? ")).

:::


:::typical

## Modify


**Ten years from now.** Also print how old the person will be in ten years.

**Add two numbers safely.** Replace the program with one that asks for **two** numbers, checks both with `isdigit()`, and prints their total. If either answer is not a number, print a message instead.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Ten years from now:**

```python
text = input("How old are you? ")
if text.isdigit():
    age = int(text)
    print("Next year you will be " + str(age + 1) + ".")
    print("In ten years you will be " + str(age + 10) + ".")
else:
    print("Please type your age as a number, such as 12.")
```

**Add two numbers safely:**

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


## Make a ticket machine

Tickets to the school play cost **$12** each. Write a ticket machine that asks how many tickets, checks the answer is a number, and prints the total cost, such as `That will be $36.` If the answer is not a number, it prints a helpful message instead. Test it with 3, with 0 and with `three`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
text = input("How many tickets? ")
if text.isdigit():
    tickets = int(text)
    print("That will be $" + str(tickets * 12) + ".")
else:
    print("Please type the number of tickets, such as 3.")
```

:::


:::wider

## Where this leads

Checking what people type before using it is called **validation**. Real apps validate every box on a form. Next lesson keeps asking in a loop, so the program can keep going until it gets the answer it needs.

:::


## Exit ticket

:::keep-together

**a = input("Number: ") and you type 7. What does print(a * 2) show, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 77. a is the text "7", and text times 2 repeats it. int(a) * 2 would give 14.

:::

