---
title: "Ask and store"
subtitle: "Console bridge: text in, text out · Text in, text out · Lesson 2"
---

# Ask and store

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A login box, a quiz question and a chatbot all ask something and then use the answer. The answer has to be stored somewhere first.


:::teacher-note

**In one sentence:** Students meet input, store the typed answer in a name, and use it in the reply.

**Students should be able to say:** I can ask a question with input and store the answer in a name. I can use the stored answer in what the program prints. I can say that what is typed comes back as text.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`input` is new. Read the code. If you type `Ada` when it asks, what will the second line show?

```python
name = input("What is your name? ")
print("Hello, " + name)
```

:::keep-together

**You run it and type Ada. What does the last line show?**

☐ Hello, Ada

☐ Nothing: the program has no answer to show

☐ Hello, name

☐ Hello, What is your name? 

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Hello, Ada. input gives back what was typed, and name = stores it. The last line joins Hello, onto whatever name holds, which is Ada.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
name = input("What is your name? ")
print("Hello, " + name)
```

:::keep-together

### Follow the answer

**Fill in what name holds and what the last line shows for each answer.**

{{rows 1}}

| typed | name holds | last line shows |
|---|---|---|
| Ada | Ada | Hello, Ada |
| Sam |   |   |
| 42 |   |   |

:::


:::teacher-note

**Answer:** Sam, Hello, Sam, 42, Hello, 42

Whatever is typed is stored as text and shown back as typed, even digits.

:::


:::keep-together

### Spot the bug

**The program asks, but then stops with a NameError on line 2. Click the line that needs to change.**

```
 1  input("What is your name? ")
 2  print("Hello, " + name)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 1

The answer was typed but not stored: no name catches it. name = input(...) puts the answer in name.

:::


## Make

Write a program that asks **two** questions (for example a name and a favourite animal) and prints one sentence that uses both answers.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
name = input("What is your name? ")
animal = input("What is your favourite animal? ")
print(name + " likes the " + animal + ".")
```

:::


## Exit ticket

:::keep-together

**What is the difference between input("Name? ") on its own and name = input("Name? ")?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Both ask and wait. Only the second stores the answer, so the program can use it.

:::

