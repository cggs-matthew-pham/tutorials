---
title: "Text into numbers"
subtitle: "Console bridge: text in, text out · Numbers from text · Lesson 4"
---

# Text into numbers

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every app that asks for an age, a quantity or a PIN has to turn what you typed into a number before it can calculate.


:::teacher-note

**In one sentence:** Students learn that input gives back text, and turn it into a number with int.

**Students should be able to say:** I can say that input always gives back text. I can turn typed digits into a number with int. I can calculate with a typed number and print the result.

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


```python
a = input("First number: ")
b = input("Second number: ")
print(a + b)
print(int(a) + int(b))
print(a + " and " + b)
print(int(a) * 2)
```

:::keep-together

### Trace the lines

**You type 5 for the first answer and 3 for the second. Fill in what each line shows.**

{{rows 1}}

| line | shows |
|---|---|
| print(a + b) | 53 |
| print(int(a) + int(b)) |   |
| print(a + " and " + b) |   |
| print(int(a) * 2) |   |

:::


:::teacher-note

**Answer:** 8, 5 and 3, 10

With a and b as text, a + b joins them: 53. int(a) + int(b) adds the numbers: 8. A number is only needed when the program calculates.

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

**Answer:** line 2

tickets holds the text "3", and text times 12 repeats it 12 times. Turn it into a number first: int(tickets) * 12.

:::


:::typical

## Modify

The program asks for an age and says what it will be next year. Change it so it also says what the age will be in ten years.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
age = int(input("How old are you? "))
print("Next year you will be " + str(age + 1) + ".")
print("In ten years you will be " + str(age + 10) + ".")
```

:::

:::


## Mix it up

This mixes the last three lessons: ask and store, text into a number, a number back into text.

```python
name = input("What is your name? ")
age = int(input("How old are you? "))
print(name + " will be " + str(age + 1) + " next year.")
```

:::keep-together

**The person types Sam, then 11. What does the program print?**

☐ Sam will be 111 next year.

☐ Sam will be 12 next year.

☐ Sam will be age + 1 next year.

☐ It stops with an error

:::


:::teacher-note

**Answer:** Sam will be 12 next year.

name stays text. int makes age the number 11, age + 1 is 12, and str makes the 12 into text so it joins.

:::


## Make

Tickets to the school play cost **$12** each. Write a ticket machine that asks how many tickets and prints the total, such as `That will be $36.` Test it with 3. (Typing a word will stop it for now. Two lessons from now it learns to cope.)

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
tickets = int(input("How many tickets? "))
print("That will be $" + str(tickets * 12) + ".")
```

:::


## Exit ticket

:::keep-together

**a = input("?") and the person types 7. What is a + a, and what is int(a) + int(a)?**

{{lines-3}}

:::


:::teacher-note

**Answer:** a + a is 77 (text joined). int(a) + int(a) is 14.

:::

