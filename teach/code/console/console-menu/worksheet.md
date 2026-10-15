---
title: "A menu that keeps showing"
subtitle: "Console bridge: text in, text out · Menus and testing · Lesson 9"
---

# A menu that keeps showing

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Ticket machines, ATMs and the settings on a phone are all menus: show the choices, wait for one, do it, and show the menu again.


:::teacher-note

**In one sentence:** Students build a menu with while True, choose with if and elif, and leave with break.

**Students should be able to say:** I can use while True with break to make a menu that keeps showing. I can add a choice to a menu with elif. I can build my own small menu app.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`while True` and `break` are new. Read the program. What is shown?

```python
total = 0
while True:
    choice = input("1 add $5, 2 pay: ")
    if choice == "1":
        total += 5
        print("Total: $" + str(total))
    elif choice == "2":
        print("Pay $" + str(total))
        break
    else:
        print("Please choose 1 or 2.")
print("Thank you")
```

:::keep-together

**You type 1, 1, 3, then 2. What does the program show?**

☐ Total: $5, Total: $10, Please choose 1 or 2., Pay $10, Thank you

☐ Total: $5, Total: $10, Please choose 1 or 2., and then the program stops

☐ It never stops, even after 2

☐ Total: $5, Total: $10, Please choose 1 or 2., Pay $10, and then it asks again

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Total: $5, Total: $10, Please choose 1 or 2., Pay $10, Thank you. break leaves the whole loop at once, not just the if, so the program carries on after the loop and ends.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
total = 0
while True:
    choice = input("1 add $5, 2 pay: ")
    if choice == "1":
        total += 5
        print("Total: $" + str(total))
    elif choice == "2":
        print("Pay $" + str(total))
        break
    else:
        print("Please choose 1 or 2.")
print("Thank you")
```

:::keep-together

### Follow a session

**You type 1, 1, 3, 2. Fill in the total after each choice and whether the loop goes round again.**

{{rows 1}}

| choice | total after | loop goes round again |
|---|---|---|
| 1 | 5 | yes |
| 1 |   |   |
| 3 |   |   |
| 2 |   |   |

:::


:::teacher-note

**Answer:** 10, yes, 10, yes, 10, no

A wrong choice (3) changes nothing, and the menu shows again. Only 2 runs break.

:::


:::keep-together

### Spot the bug

**Choosing 2 shows Pay $10, but then the menu comes back and the program never ends. Click the line where something is missing.**

```
 1  total = 0
 2  while True:
 3      choice = input("1 add $5, 2 pay: ")
 4      if choice == "1":
 5          total += 5
 6      elif choice == "2":
 7          print("Pay $" + str(total))
 8      else:
 9          print("Please choose 1 or 2.")
10  print("Thank you")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 7

Nothing ever runs break, so while True never ends. The pay branch needs a break line after the print.

:::


:::keep-together

### What does break do?

**What does break do when it runs inside an if inside a while True?**

☐ Stops the program

☐ Leaves only the if

☐ Skips to the next pass

☐ Leaves the whole loop at once

:::


:::teacher-note

**Answer:** Leaves the whole loop at once

break ends the loop it is in. The program continues with the first line after the loop.

:::


:::typical

## Modify

Add a drink for $2 as choice 3. Paying becomes choice 4. Update the menu text too.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
total = 0
while True:
    choice = input("1 add $5, 3 drink $2, 4 pay: ")
    if choice == "1":
        total += 5
        print("Total: $" + str(total))
    elif choice == "3":
        total += 2
        print("Total: $" + str(total))
    elif choice == "4":
        print("Pay $" + str(total))
        break
    else:
        print("Please choose 1, 3 or 4.")
print("Thank you")
```

:::

:::


## Mix it up

This mixes the last lessons: a loop that repeats, and an answer stored again each pass.

```python
total = 0
while True:
    choice = input("1 add $5, 2 pay: ")
    if choice == "1":
        total += 5
        print("Total: $" + str(total))
    elif choice == "2":
        print("Pay $" + str(total))
        break
    else:
        print("Please choose 1 or 2.")
print("Thank you")
```

:::keep-together

**You type 3, 3, 2. How many times does the menu question appear?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 3

Each pass asks once. 3 and 3 are wrong choices that go round again, and 2 asks a third time before it breaks.

:::


## Make

Make your own menu app: a café, a game shop, a quiz scoreboard or a unit converter. It needs `while True`, at least three choices, a reply for a wrong choice, and a way to quit.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
total = 0
while True:
    choice = input("1 coffee $4, 2 cake $5, 3 pay: ")
    if choice == "1":
        total += 4
        print("Coffee added. Total: $" + str(total))
    elif choice == "2":
        total += 5
        print("Cake added. Total: $" + str(total))
    elif choice == "3":
        break
    else:
        print("Please choose 1, 2 or 3.")
print("Please pay $" + str(total))
```

:::


## Exit ticket

:::keep-together

**What does break do, and what happens to the program after it?**

{{lines-3}}

:::


:::teacher-note

**Answer:** break leaves the loop at once. The program carries on with the first line after the loop.

:::

