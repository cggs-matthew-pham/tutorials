---
title: "A text menu"
subtitle: "Console bridge: text in, text out · Loops and menus · Lesson 4"
---

# A text menu

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Ticket machines, ATMs and the settings on a phone are all menus: show the choices, wait for one, do it, and show the menu again.


:::teacher-note

**In one sentence:** Students put a menu inside while True, choose with if and elif, leave with break, and test the app against a table of cases. The Make task is a small app of their own, tested with cases they write.

**Students should be able to say:** I can build a menu with while True, if and elif, and leave it with break. I can write test cases (what to type and what should be printed) and use them to check a program. I can plan and build a small text app of my own.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`while True:` asks a question whose answer is always yes, so the menu would repeat for ever. The way out is `break`: it leaves the loop at once. What total does this canteen till print?

```python
def show_menu():
    print("1. Add a drink ($3)")
    print("2. Add a snack ($2)")
    print("3. Pay")

total = 0
while True:
    show_menu()
    choice = input("Choose 1, 2 or 3: ")
    if choice == "1":
        total += 3
    elif choice == "2":
        total += 2
    elif choice == "3":
        print("Total: $" + str(total))
        break
    else:
        print("Please type 1, 2 or 3.")
print("Thank you!")
```

:::keep-together

**You type 1, then 1, then 2, then 3. What total is printed?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 8. Two drinks at $3 and one snack at $2 make 8. Choosing 3 prints the total, then break leaves the loop and Thank you! is printed.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

`while True:` uses `True`, a value that is always yes. `show_menu()` is a function, so the menu text is written once and shown on every lap.

```python
def show_menu():
    print("1. Add a drink ($3)")
    print("2. Add a snack ($2)")
    print("3. Pay")

total = 0
while True:
    show_menu()
    choice = input("Choose 1, 2 or 3: ")
    if choice == "1":
        total += 3
    elif choice == "2":
        total += 2
    elif choice == "3":
        print("Total: $" + str(total))
        break
    else:
        print("Please type 1, 2 or 3.")
print("Thank you!")
```

:::keep-together

### Test cases

**A test case is what you type and the output you expect. Fill in the total each case should print, then run each case to check.**

{{rows 1}}

| what you type | total printed |
|---|---|
| 1, 3 | 3 |
| 2, 2, 3 |   |
| 5, 1, 3 |   |
| 3 |   |

:::


:::teacher-note

**Answer:** 4, 3, 0

5 is not on the menu, so the else replies and nothing is added. Paying straight away prints 0. Good test cases include normal choices, a wrong choice and the smallest order.

:::


:::keep-together

### Spot the bug

**Whatever you type, this till only ever says Please type 1, 2 or 3. Click the first line that goes wrong.**

```
 1  total = 0
 2  while True:
 3      choice = input("1 drink, 2 snack, 3 pay: ")
 4      if choice == 1:
 5          total += 3
 6      elif choice == 2:
 7          total += 2
 8      elif choice == 3:
 9          print("Total: $" + str(total))
10          break
11      else:
12          print("Please type 1, 2 or 3.")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

input() gives back text, so choice is "1", never the number 1. "1" == 1 is False, so every choice falls through to the else. Compare with text: choice == "1".

:::


:::keep-together

### Build the loop

**Put the lines in order: a till that adds $3 for choice 1 and pays on choice 2.**

A. `total += 3`

B. `print("Total: $" + str(total))`

C. `total = 0`

D. `choice = input("1 add $3, 2 pay: ")`

E. `if choice == "1":`

F. `while True:`

G. `elif choice == "2":`

H. `break`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

The total starts before the loop. Inside while True: ask, then decide. Paying prints the total and then breaks out.

```python
total = 0
while True:
    choice = input("1 add $3, 2 pay: ")
    if choice == "1":
        total += 3
    elif choice == "2":
        print("Total: $" + str(total))
        break
```

:::


:::keep-together

### The way out

**What does break do?**

☐ Shows the menu again

☐ Leaves the loop straight away; the program carries on after it

☐ Skips to the next choice

☐ Stops the whole program with an error

:::


:::teacher-note

**Answer:** Leaves the loop straight away; the program carries on after it

break leaves the loop it is in. The line after the loop, print("Thank you!"), still runs.

:::


:::typical

## Modify


**Add a sandwich.** Add a **sandwich for $5** as choice 3. Paying becomes choice 4.

**Start again.** Add a choice called **Start again** that clears the order (the total goes back to 0). Test it: order something, start again, then pay.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Add a sandwich:**

```python
def show_menu():
    print("1. Add a drink ($3)")
    print("2. Add a snack ($2)")
    print("3. Add a sandwich ($5)")
    print("4. Pay")

total = 0
while True:
    show_menu()
    choice = input("Choose 1, 2, 3 or 4: ")
    if choice == "1":
        total += 3
    elif choice == "2":
        total += 2
    elif choice == "3":
        total += 5
    elif choice == "4":
        print("Total: $" + str(total))
        break
    else:
        print("Please type 1, 2, 3 or 4.")
print("Thank you!")
```

**Start again:**

```python
def show_menu():
    print("1. Add a drink ($3)")
    print("2. Add a snack ($2)")
    print("3. Pay")
    print("4. Start again")

total = 0
while True:
    show_menu()
    choice = input("Choose 1, 2, 3 or 4: ")
    if choice == "1":
        total += 3
    elif choice == "2":
        total += 2
    elif choice == "3":
        print("Total: $" + str(total))
        break
    elif choice == "4":
        total = 0
        print("Order cleared.")
    else:
        print("Please type 1, 2, 3 or 4.")
print("Thank you!")
```

:::

:::


## Make your own app


**Build the app.** Make a small menu app of your own: a **quiz** (each choice asks a question and keeps a score), a **converter** (centimetres to metres, minutes to seconds), or a **shop**. It needs a function that prints the menu, a `while True` loop, at least three choices with `if` and `elif`, and a choice that quits with `break`.

**Test it.** Write three test cases in a table, like the one in Investigate: what you type, and what the app should print. Include one choice that is not on the menu. Run each case and fix anything that does not match.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Build the app:**

```python
def show_menu():
    print("1. Centimetres to metres")
    print("2. Minutes to seconds")
    print("3. Quit")

def ask_number(question):
    text = input(question)
    if text.isdigit():
        return int(text)
    print("That is not a whole number, so I will use 0.")
    return 0

while True:
    show_menu()
    choice = input("Choose 1, 2 or 3: ")
    if choice == "1":
        cm = ask_number("Centimetres: ")
        print(str(cm) + " cm is " + str(cm / 100) + " m")
    elif choice == "2":
        minutes = ask_number("Minutes: ")
        print(str(minutes) + " minutes is " + str(minutes * 60) + " seconds")
    elif choice == "3":
        print("Goodbye!")
        break
    else:
        print("Please type 1, 2 or 3.")
```

:::


:::wider

## Where this leads

You have built a real app: it talks to its user, checks what they type, keeps going until they leave, and passes its test cases. Every Python extension starts from here: games with many objects, data detective work with real data sets, and web apps where the menu becomes buttons.

:::


## Exit ticket

:::keep-together

**In the till, what would happen if break were missing from the pay choice?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The total is printed, then the loop carries on and shows the menu again, for ever, because nothing else leaves while True.

:::

