---
title: "Test with a table"
subtitle: "Console bridge: text in, text out · Menus and testing · Lesson 10"
---

# Test with a table

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Apps are tested before anyone uses them. A test case says what to type and what should come back, and the computer checks it every time.


:::teacher-note

**In one sentence:** Students write test cases as comparison lines, find a bug with a wrong-choice test, and fix the code.

**Students should be able to say:** I can write a test case as a line that shows True or False. I can include a wrong choice in my tests. I can fix code until all my tests show True.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Each `print` line compares what `reply` gives back with what you expect, and shows `True` or `False`. Decide what each line shows.

```python
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2"

print(reply("1") == "Added $5")
print(reply("2") == "Pay now")
print(reply("9") == "Please choose 1 or 2.")
```

:::keep-together

**What do the three test lines show?**

☐ False, True, True

☐ True, True, True: if the first two work the third will too

☐ An error, because reply needs the loop

☐ True, True, False

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** True, True, False. reply("9") returns Please choose 1 or 2 with no full stop, but the test expects one. The first two cases only tried choices that work. The wrong-choice test is the one that found the slip.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2"

print(reply("1") == "Added $5")
print(reply("2") == "Pay now")
print(reply("9") == "Please choose 1 or 2.")
```

:::keep-together

### Read the tests

**Fill in what each test shows.**

{{rows 1}}

| test | shows |
|---|---|
| reply("1") == "Added $5" | True |
| reply("2") == "Pay now" |   |
| reply("9") == "Please choose 1 or 2." |   |
| reply("1") == "Added $4" |   |

:::


:::teacher-note

**Answer:** True, False, False

A test shows True only when the function gives back exactly what the test expects. The last line is a wrong expectation, so it shows False even though the function is fine.

:::


:::keep-together

### Spot the bug

**This test was meant to check the wrong-choice reply, but the program stops with an error before it runs. Click the wrong line.**

```
 1  def reply(choice):
 2      if choice == "1":
 3          return "Added $5"
 4      elif choice == "2":
 5          return "Pay now"
 6      else:
 7          return "Please choose 1 or 2."
 8  
 9  print(reply("9") = "Please choose 1 or 2.")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 9

A single = stores a value. A test compares with two: reply("9") == "Please choose 1 or 2.".

:::


:::typical

## Modify


**Add a test.** Add a test line for a wrong choice.

**Fix the slip.** If it shows `False`, fix the function, and run the tests again.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Add a test:**

```python
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2"

print(reply("1") == "Added $5")
print(reply("2") == "Pay now")
print(reply("9") == "Please choose 1 or 2.")
```

**Fix the slip:**

```python
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2."

print(reply("1") == "Added $5")
print(reply("2") == "Pay now")
print(reply("9") == "Please choose 1 or 2.")
```

:::

:::


## Mix it up

This mixes the menu loop and a function that gives back an answer.

```python
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2."

while True:
    choice = input("1 add $5, 2 pay: ")
    print(reply(choice))
    if choice == "2":
        break
```

:::keep-together

**You type 1, then 9, then 2. What does the menu show?**

☐ Added $5, Pay now

☐ Added $5, Please choose 1 or 2., and it asks again

☐ Added $5, Please choose 1 or 2., Pay now

☐ Pay now only

:::


:::teacher-note

**Answer:** Added $5, Please choose 1 or 2., Pay now

Each pass prints what reply gives back. 2 shows Pay now, and then break ends the loop.

:::


## Make

Here is a till function. Write three test lines for it: what to type and what it should reply. Include a wrong choice. Run the tests and fix anything that shows `False`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2."

print(reply("1") == "Added $5")
print(reply("2") == "Pay now")
print(reply("9") == "Please choose 1 or 2.")
print(reply(" 1") == "Please choose 1 or 2.")
```

:::


## Exit ticket

:::keep-together

**Why should a test list always include a wrong input?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Wrong inputs are where bugs hide. If only the cases that work are tested, a bug in the other cases is never found.

:::

