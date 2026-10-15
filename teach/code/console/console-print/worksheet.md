---
title: "Print text"
subtitle: "Console bridge: text in, text out · Text in, text out · Lesson 1"
---

# Print text

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Chatbots, game menus and error messages all start the same way: a program puts a line of text on the screen.


:::teacher-note

**In one sentence:** Students meet print, text in quotes, and joining text with +, then make a four-line sign.

**Students should be able to say:** I can show a line of text with print. I can say why text needs quotes. I can join pieces of text with + and say where the spaces come from.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`print` is new. Read the code and decide what appears on the screen.

```python
name = "Ada"
print("Hello")
print("Hi, " + name)
```

:::keep-together

**What will the program show?**

☐ Two lines: Hello, then Hi, + Ada

☐ Two lines: Hello, then Hi,Ada

☐ Two lines: Hello, then Hi, Ada

☐ One line: Hello Hi, Ada

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Two lines: Hello, then Hi, Ada. Each print starts a new line. The + joins the two pieces exactly as typed, and the space after the comma is inside the quotes, so it stays.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
name = "Ada"
print("Hello")
print("Hi, " + name)
print("Hi," + name)
print(name + name)
```

:::keep-together

### Trace the lines

**Fill in what each line shows.**

{{rows 1}}

| line | shows |
|---|---|
| print("Hello") | Hello |
| print("Hi, " + name) |   |
| print("Hi," + name) |   |
| print(name + name) |   |

:::


:::teacher-note

**Answer:** Hi, Ada, Hi,Ada, AdaAda

A space only appears if it is inside the quotes. name + name joins Ada onto Ada with nothing between.

:::


:::keep-together

### Spot the bug

**This should show three lines, but the program stops with an error. Click the wrong line.**

```
 1  print("Welcome")
 2  print(Hi there)
 3  print("Goodbye")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Without quotes, Python reads Hi there as names it has never heard of. Text needs quotes around it: print("Hi there").

:::


:::keep-together

### Put the lines in order

**Put the lines in order so the screen shows a line of stars, then Room 12, then Welcome, then a line of stars.**

A. `print("Room 12")`

B. `print("*****")`

C. `print("Welcome")`

D. `print("*****")`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

print runs the lines from the top down, so the order of the lines is the order on the screen.

```python
print("*****")
print("Room 12")
print("Welcome")
print("*****")
```

:::


## Make

Make a four-line sign for your classroom door. Store a name once at the top, use it in at least two of the lines, and run it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
name = "Room 12"
print("*********")
print("Welcome to " + name)
print("Please come in to " + name)
print("*********")
```

:::


## Exit ticket

:::keep-together

**print("Hi, " + "Sam") shows what, and why is there a space?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Hi, Sam. The space is inside the first quotes. The + adds nothing.

:::

