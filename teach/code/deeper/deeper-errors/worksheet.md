---
title: "When things go wrong"
subtitle: "Deeper Python in the console · Errors and the adventure · Lesson 4"
---

# When things go wrong

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Apps you trust never crash when you mistype: they catch the mistake, say what they wanted, and ask again.


:::teacher-note

**In one sentence:** Students catch errors with try and except so typed mistakes get a reply instead of a crash, compare it with checking first (isdigit), and catch two kinds of error in one program.

**Students should be able to say:** I can use try and except to catch an error and carry on. I can name the kind of error to catch (ValueError, KeyError, ZeroDivisionError). I can explain why a caught error is not the same as a sensible answer.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`int("twelve")` cannot work. Inside `try`, what happens to the next line, and does the program stop?

```python
text = "twelve"
try:
    age = int(text)
    print("Next year: " + str(age + 1))
except ValueError:
    print("That is not a number.")
print("Done")
```

:::keep-together

**What does it print?**

☐ Only Done

☐ Next year: 13 then Done

☐ It stops with a ValueError

☐ That is not a number. then Done

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** That is not a number. then Done. int("twelve") causes a ValueError, so Python skips the rest of try and runs the except lines. Then the program carries on after them.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
while True:
    text = input("How many tickets? ")
    try:
        tickets = int(text)
        break
    except ValueError:
        print("Please type a whole number, such as 3.")
print("That will be $" + str(tickets * 12) + ".")
```

:::keep-together

### Which answers pass?

**Which answer does int() accept, so the loop stops?**

☐ 3.5

☐ 3 tickets

☐ -2

☐ three

:::


:::teacher-note

**Answer:** -2

int("-2") is the number -2, so nothing goes wrong and the loop stops, charging $-24. A caught error is not the same as a sensible answer: the program still has to check the number.

:::


:::keep-together

### Try or check first?

**Compared with isdigit() in the console bridge, what does try let you do?**

☐ Skip the input

☐ Never get errors at all

☐ Turn letters into numbers

☐ Just try it, and handle the error if it happens

:::


:::teacher-note

**Answer:** Just try it, and handle the error if it happens

isdigit() checks first; try does it and catches the error. Python programmers often say it is easier to ask forgiveness than permission.

:::


:::keep-together

### Spot the bug

**This should say There is no such room, but it stops with KeyError: attic. Click the line that is wrong.**

```
 1  rooms = {"hall": "A long hall."}
 2  try:
 3      print(rooms["attic"])
 4  except ValueError:
 5      print("There is no such room.")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

except ValueError only catches a ValueError. A missing key is a KeyError, so it should be except KeyError:.

:::


:::typical

## Modify

A canteen with two kinds of mistake: an item that is not on the menu (`KeyError`) and a number that is not a number (`ValueError`). Try both.

**One to ten.** Only accept **1 to 10** of an item.

**Quit.** Let the customer type `quit` instead of an item.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**One to ten:**

```python
prices = {"pie": 5, "drink": 3, "fruit": 2}
while True:
    item = input("What would you like? ").strip().lower()
    try:
        price = prices[item]
        break
    except KeyError:
        print("We have: " + ", ".join(prices))
while True:
    text = input("How many? ")
    try:
        count = int(text)
        if count >= 1 and count <= 10:
            break
        print("Choose 1 to 10.")
    except ValueError:
        print("Please type a whole number.")
print("That will be $" + str(price * count) + ".")
```

**Quit:**

```python
prices = {"pie": 5, "drink": 3, "fruit": 2}
price = 0
while True:
    item = input("What would you like? ").strip().lower()
    if item == "quit":
        break
    try:
        price = prices[item]
        break
    except KeyError:
        print("We have: " + ", ".join(prices))
if item != "quit":
    while True:
        text = input("How many? ")
        try:
            count = int(text)
            break
        except ValueError:
            print("Please type a whole number.")
    print("That will be $" + str(price * count) + ".")
else:
    print("Goodbye!")
```

:::

:::


## Make a safe calculator

Ask for two whole numbers and print the first divided by the second. Catch **two** kinds of mistake, each with its own `except` and its own message: a typing mistake (`ValueError`) and dividing by zero (`ZeroDivisionError`). After either, ask again.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
while True:
    try:
        a = int(input("First number: "))
        b = int(input("Divide it by: "))
        print("Answer: " + str(a / b))
        break
    except ValueError:
        print("Please type whole numbers.")
    except ZeroDivisionError:
        print("You can't divide by zero. Try again.")
```

:::


:::wider

## Where this leads

Next: the text adventure, built from the parser, the bag, the map and safe input.

:::


## Exit ticket

:::keep-together

**try: n = int("3.5") except ValueError: n = 0. What is n?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 0: int("3.5") causes a ValueError, so the except line runs.

:::

