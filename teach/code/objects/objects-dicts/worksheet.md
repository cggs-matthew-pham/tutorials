---
title: "One dictionary per star"
subtitle: "Objects with turtles · Many things on screen · Lesson 3"
---

# One dictionary per star

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A contact on your phone keeps a name, a number and a photo together. A dictionary does the same for anything in a program.


:::teacher-note

**In one sentence:** Students keep each star's turtle, speed and points together in a dictionary, loop over a list of dictionaries, and see that a new property is now one key instead of one more list kept in step.

**Students should be able to say:** I can make a dictionary, and read and change a value by its key. I can loop over a list of dictionaries. I can explain why one dictionary per thing is safer than lists side by side.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`{"speed": 5, "points": 2}` is a dictionary: the key `"speed"` is paired with 5 and `"points"` with 2. `star["points"]` is the value stored under `"points"`. What will it print?

```python
star = {"speed": 5, "points": 2}
star["points"] = star["points"] + 1
print(star["speed"], star["points"])
```

:::keep-together

**What does it print?**

☐ speed points

☐ 3 5

☐ 5 2

☐ 5 3

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 5 3. star["points"] starts at 2; the second line stores 2 + 1 back under "points". star["speed"] is still 5.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
from turtle import *
import random

speed(0)
penup()
goto(0, -180)
left(90)
score = 0

pen = Turtle()
pen.hideturtle()
pen.penup()
pen.goto(-220, 200)

stars = []
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append({
        "turtle": s,
        "speed": random.randint(3, 7),
        "points": 1,
    })

for star in stars:
    star["turtle"].color("gold")

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for star in stars:
        star["turtle"].forward(star["speed"])
        if star["turtle"].distance(xcor(), ycor()) < 25:
            score += star["points"]
            star["turtle"].goto(random.randint(-200, 200), 200)
        if star["turtle"].ycor() < -220:
            star["turtle"].goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
```

:::keep-together

### Match the pieces

**Match each piece with what it does.**

A. the value stored under the key "speed"

B. each dictionary in the list, one at a time

C. changes the value stored under "points"

D. a dictionary: keys paired with values

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `{"speed": 5, "points": 1}` | |
| `star["speed"]` | |
| `star["points"] = 3` | |
| `for star in stars:` | |

:::


:::teacher-note

**Answer:** {"speed": 5, "points": 1} → D. a dictionary: keys paired with values; star["speed"] → A. the value stored under the key "speed"; star["points"] = 3 → C. changes the value stored under "points"; for star in stars: → B. each dictionary in the list, one at a time

:::


:::keep-together

### A new property

**Every star should also remember its colour. What changes?**

☐ A new variable for every star

☐ One more key in the dictionary where each star is made

☐ A new list beside stars

☐ Nothing: dictionaries cannot hold colours

:::


:::teacher-note

**Answer:** One more key in the dictionary where each star is made

Add "colour": ... where the dictionary is made, then read star["colour"] where it is needed. Nothing else can fall out of step.

:::


:::keep-together

### Spot the bug

**This should print each star's speed doubled, but it stops with a NameError. Click the line that causes it.**

```
 1  stars = [{"speed": 5, "points": 1}, {"speed": 3, "points": 5}]
 2  for star in stars:
 3      print(star[speed] * 2)
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Keys are text, so they need quotes: star["speed"]. Without quotes Python looks for a variable called speed, which does not exist.

:::


:::typical

## Modify


**Different points.** Give each star a random **1 to 3** points.

**Colours.** Store a **colour** in each star's dictionary, and use it to colour the turtle.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Different points:**

```python
from turtle import *
import random

speed(0)
penup()
goto(0, -180)
left(90)
score = 0

pen = Turtle()
pen.hideturtle()
pen.penup()
pen.goto(-220, 200)

stars = []
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append({
        "turtle": s,
        "speed": random.randint(3, 7),
        "points": random.randint(1, 3),
    })

for star in stars:
    star["turtle"].color("gold")

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for star in stars:
        star["turtle"].forward(star["speed"])
        if star["turtle"].distance(xcor(), ycor()) < 25:
            score += star["points"]
            star["turtle"].goto(random.randint(-200, 200), 200)
        if star["turtle"].ycor() < -220:
            star["turtle"].goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
```

**Colours:**

```python
from turtle import *
import random

speed(0)
penup()
goto(0, -180)
left(90)
score = 0

pen = Turtle()
pen.hideturtle()
pen.penup()
pen.goto(-220, 200)

colours = ["gold", "orange", "yellow"]
stars = []
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append({
        "turtle": s,
        "speed": random.randint(3, 7),
        "points": 1,
        "colour": colours[i % 3],
    })

for star in stars:
    star["turtle"].color(star["colour"])

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for star in stars:
        star["turtle"].forward(star["speed"])
        if star["turtle"].distance(xcor(), ycor()) < 25:
            score += star["points"]
            star["turtle"].goto(random.randint(-200, 200), 200)
        if star["turtle"].ycor() < -220:
            star["turtle"].goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
```

:::

:::


## Make a bad star

Make the first star a **bad star** again, this time with a `"bad"` key in each dictionary (`True` for the first star only). The bad star is red and **costs 3 points** when caught. Compare it with last lesson's version: what did you not have to do this time?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
from turtle import *
import random

speed(0)
penup()
goto(0, -180)
left(90)
score = 0

pen = Turtle()
pen.hideturtle()
pen.penup()
pen.goto(-220, 200)

stars = []
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append({
        "turtle": s,
        "speed": random.randint(3, 7),
        "points": 1,
        "bad": i == 0,
    })

for star in stars:
    if star["bad"]:
        star["turtle"].color("red")
    else:
        star["turtle"].color("gold")

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for star in stars:
        star["turtle"].forward(star["speed"])
        if star["turtle"].distance(xcor(), ycor()) < 25:
            if star["bad"]:
                score -= 3
            else:
                score += star["points"]
            star["turtle"].goto(random.randint(-200, 200), 200)
        if star["turtle"].ycor() < -220:
            star["turtle"].goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
```

:::


:::wider

## Where this leads

A list of dictionaries is how most programs store data: one record per thing. There is still one awkward part: `star["turtle"].forward(star["speed"])`. Next lesson makes a `Star` of your own, so it reads `star.turtle.forward(star.speed)`.

:::


## Exit ticket

:::keep-together

**pet = {"name": "Rex", "legs": 4}. Write the line that changes legs to 3.**

{{lines-3}}

:::


:::teacher-note

**Answer:** pet["legs"] = 3

:::

