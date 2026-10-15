---
title: "Challenge: a console app"
subtitle: "Console bridge: text in, text out · Console challenge · Lesson 11"
---

# Challenge: a console app

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every app you use is a menu, a check and a total, wearing a nicer coat. Today you build one.


:::teacher-note

**In one sentence:** Students read a working café till, predict a change, then build a console app with a menu, a checked number and a total.

**Students should be able to say:** I can read a longer console program and say what each part does. I can add a feature to a working app. I can build a console app from a menu, a check and a total.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the program.

```python
total = 0
while True:
    choice = input("1 coffee $4, 2 cake $5, 3 pay: ")
    if choice == "1":
        total += 4
        print("Coffee added. Total: $" + str(total))
    elif choice == "2":
        how_many = input("How many cakes? ")
        if how_many.isdigit():
            total += 5 * int(how_many)
            print("Cakes added. Total: $" + str(total))
        else:
            print("Please type a number.")
    elif choice == "3":
        break
    else:
        print("Please choose 1, 2 or 3.")
print("Please pay $" + str(total))
```

:::keep-together

**You choose 1, then 2 with a quantity of 3, then 3. What total does the last line show?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 19. One coffee is $4. Choice 2 asks how many and adds $5 for each, so 3 cakes add $15, and 4 + 15 = 19.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
total = 0
while True:
    choice = input("1 coffee $4, 2 cake $5, 3 pay: ")
    if choice == "1":
        total += 4
        print("Coffee added. Total: $" + str(total))
    elif choice == "2":
        how_many = input("How many cakes? ")
        if how_many.isdigit():
            total += 5 * int(how_many)
            print("Cakes added. Total: $" + str(total))
        else:
            print("Please type a number.")
    elif choice == "3":
        break
    else:
        print("Please choose 1, 2 or 3.")
print("Please pay $" + str(total))
```

:::keep-together

### Which part does the job?

**Which part stops the program crashing when the quantity is a word?**

☐ The while True

☐ The function

☐ The break

☐ The isdigit check before int

:::


:::teacher-note

**Answer:** The isdigit check before int

text.isdigit() asks whether the quantity is all digits before int is used.

:::


:::keep-together

### Follow a change

**You choose 2 and type 2 as the quantity, and then choose 3. What is the total?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 10

Two cakes at $5 each are $10. The total starts at 0 and cake adds price × quantity.

:::


:::typical

## Modify

Change **one** thing at a time, predicting each result before you run it. Add a new item to the menu with its own price, and make pay choice 4.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
total = 0
while True:
    choice = input("1 coffee $4, 2 cake $5, 3 sandwich $7, 4 pay: ")
    if choice == "1":
        total += 4
        print("Coffee added. Total: $" + str(total))
    elif choice == "2":
        how_many = input("How many cakes? ")
        if how_many.isdigit():
            total += 5 * int(how_many)
            print("Cakes added. Total: $" + str(total))
        else:
            print("Please type a number.")
    elif choice == "3":
        how_many = input("How many sandwiches? ")
        if how_many.isdigit():
            total += 7 * int(how_many)
            print("Sandwiches added. Total: $" + str(total))
        else:
            print("Please type a number.")
    elif choice == "4":
        break
    else:
        print("Please choose 1, 2, 3 or 4.")
print("Please pay $" + str(total))
```

:::

:::


## Make

Make a console app of your own. Pick a theme: a game shop, a canteen order, a fitness log or a unit converter. It needs:

- a menu that keeps showing (`while True`) and a way to quit (`break`)
- at least one number typed by the person and checked before use
- a total that builds up (`+=`)
- a reply for a wrong choice

Then write three test cases for the part that works out replies, including one wrong input. Change one thing and predict what will happen before you run it.

You have finished the console course. Every Python extension starts from here.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
total = 0
while True:
    choice = input("1 pencil $2, 2 ruler $3, 3 pay: ")
    if choice == "1":
        amount = input("How many pencils? ")
        if amount.isdigit():
            total += 2 * int(amount)
            print("Total: $" + str(total))
        else:
            print("Please type a number.")
    elif choice == "2":
        total += 3
        print("Total: $" + str(total))
    elif choice == "3":
        break
    else:
        print("Please choose 1, 2 or 3.")
print("Please pay $" + str(total))
```

:::


## Exit ticket

:::keep-together

**Name three moves your app uses and the line that shows each.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Any three of: input, int with isdigit, while True with break, +=, if/elif/else, a function.

:::

