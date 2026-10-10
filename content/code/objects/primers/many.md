---
title: Many things on screen in 5 minutes
---
## The idea in plain words

`Turtle()` makes **another turtle**. Give it a name, `star = Turtle()`, and put the name and a dot in front of a command to give the command to that turtle: `star.forward(50)`. Each turtle is an **object**: it keeps its own position, heading and colour. A command with no name in front goes to the **default turtle**, the one students used in the turtle course.

Once there are many objects, the program needs a way to keep track of them:

- **Separate variables** (`s1`, `s2`, `s3`) work for three and cost the same block of code for every new one.
- A **list** of turtles plus a loop handles any number. What each star needs to remember (speed, points) goes in more lists beside it, matched by place number. These **lists side by side** must always be changed together.
- A **dictionary** keeps everything about one star together: `{"turtle": s, "speed": 5, "points": 1}`, read as `star["speed"]`. A list of dictionaries is a table: one row per star.

## Why programmers use them

- **Games, simulations and apps are full of objects**: enemies, bullets, buttons, messages.
- **Lists make the count a number**: 4 stars or 400 is the same code.
- **Dictionaries keep a record together**, so nothing falls out of step. Most data is stored this way, from spreadsheets to databases.

## An everyday picture, and where it breaks

Lists side by side are like a class roll and a separate list of phone numbers, matched by row. They work until someone joins the class and only one list is updated. A dictionary is a contact card: the name and the number stay on the same card.

## Try it yourself (5 minutes)

1. Run Lesson 1's game, then count the lines that mention `s1`.
2. In Lesson 2, change `range(4)` to `range(8)` and run it.
3. In Lesson 3, add `"colour": "orange"` to the dictionary and colour each star with `star["turtle"].color(star["colour"])`.

## Questions students ask

- **Why is there sometimes an extra turtle in the middle?** A command without a name in front used the default turtle, so Python drew it.
- **Can a turtle be in a dictionary?** Yes. A dictionary can hold any value, including a turtle.
