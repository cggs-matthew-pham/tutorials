---
title: "Text in, text out"
subtitle: "Console bridge: text in, text out · Text in, text out · Lesson 1"
---

# Text in, text out

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Chatbots, ticket machines and quiz apps all do the same three things: ask, wait for an answer, and reply.


:::teacher-note

**In one sentence:** Students meet the console, the text version of the playground. They ask a question with input(), store the answer, reply with print(), join text with +, and turn a number into text with str().

**Students should be able to say:** I can ask a question with input() and store the answer in a variable. I can join text with + and print it, spaces included. I can turn a number into text with str() before joining it.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`input("What is your name? ")` shows the question and waits for an answer. What will the program print?

```python
name = input("What is your name? ")
print("Hello, " + name + "!")
```

:::keep-together

**You run it, type Ada and press Enter. What is the last line in the console?**

☐ Hello, name!

☐ Hello,Ada!

☐ Hello, Ada!

☐ Hello, + name + !

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Hello, Ada! The answer Ada is stored in name, and + joins "Hello, ", Ada and "!" into one line. The space is inside the quotes, so it stays.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This program asks two questions. Run it in the playground above if you like, then work through the tasks.

```python
name = input("What is your name? ")
food = input("What is your favourite food? ")
print("Hello, " + name + "!")
print(name + " likes " + food + ".")
print("Your name has " + str(len(name)) + " letters.")
```

:::keep-together

### Match the parts

**Match each part with what it does.**

A. joins three pieces of text into one

B. shows a line in the console

C. turns the number of letters into text

D. shows the question, waits, and gives back what was typed

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `input("What is your name? ")` | |
| `"Hello, " + name + "!"` | |
| `str(len(name))` | |
| `print(...)` | |

:::


:::teacher-note

**Answer:** input("What is your name? ") → D. shows the question, waits, and gives back what was typed; "Hello, " + name + "!" → A. joins three pieces of text into one; str(len(name)) → C. turns the number of letters into text; print(...) → B. shows a line in the console

:::


:::keep-together

### Spaces count

**You type Bo, then pizza. What does the fourth line, print(name + " likes " + food + "."), show?**

☐ name likes food.

☐ Bo likes pizza

☐ Bolikespizza.

☐ Bo likes pizza.

:::


:::teacher-note

**Answer:** Bo likes pizza.

name holds Bo and food holds pizza. + joins Bo, " likes ", pizza and "." exactly as written, spaces and full stop included.

:::


:::keep-together

### Spot the bug

**This should print Your score is 5, but it stops with a TypeError. Click the line that causes it.**

```
 1  score = 5
 2  print("Your score is " + score)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

+ can join text to text, but score is a number. str(score) turns it into the text "5" first: print("Your score is " + str(score)).

:::


:::typical

## Modify


**A second question.** Ask for a **favourite animal**, store it in a variable called `animal`, and print a sentence that uses both answers.

**Count the letters.** Print a line such as `Ada has 3 letters.`

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A second question:**

```python
name = input("What is your name? ")
animal = input("What is your favourite animal? ")
print("Hello, " + name + "!")
print(name + " would like a pet " + animal + ".")
```

**Count the letters:**

```python
name = input("What is your name? ")
print("Hello, " + name + "!")
print(name + " has " + str(len(name)) + " letters.")
```

:::

:::


## Make a story machine

Write a **story machine**: it asks for three words (such as a name, a place and an animal), then prints a short story of two or three lines that uses all of them. Run it with silly answers and with sensible ones.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
hero = input("Give me a name: ")
place = input("Give me a place: ")
animal = input("Give me an animal: ")
print("One morning, " + hero + " went to " + place + ".")
print("There, a talking " + animal + " was waiting for " + hero + ".")
```

:::


:::wider

## Where this leads

Every app with a text box does this: ask, store the answer in a variable, reply. Web forms and chatbots are the same idea with a nicer screen.

:::


## Exit ticket

:::keep-together

**age = 12. Why does print("I am " + age) stop with an error, and how do you fix it?**

{{lines-3}}

:::


:::teacher-note

**Answer:** + cannot join a number onto text. Turn the number into text first: print("I am " + str(age)).

:::

