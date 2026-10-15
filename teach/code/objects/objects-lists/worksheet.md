---
title: "Lists of stars"
subtitle: "Objects with turtles · Many things on screen · Lesson 2"
---

# Lists of stars

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A game with a hundred enemies does not have a hundred variables. It keeps them in a list and loops over it.


:::teacher-note

**In one sentence:** Students rebuild the stars game with a list of stars and lists of speeds and points beside it, so one loop moves every star, then meet the weakness of lists side by side (they must stay in step).

**Students should be able to say:** I can keep many objects in a list and give each one a command in a loop. I can use the same place number to find a star's values in several lists. I can explain why lists side by side must be changed together.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`speeds` and `points` have one item per star. `speeds[2]` and `points[2]` are both about the third star. What will it print?

```python
speeds = [3, 8, 5, 6]
points = [1, 1, 5, 1]
print(speeds[2], points[2])
```

:::keep-together

**What does it print?**

☐ 5 1

☐ 3 1

☐ 5 5

☐ 8 1

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 5 5. Place 2 is the third item in each list (places start at 0): speeds[2] is 5 and points[2] is 5. Both describe the same star.

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
speeds = []
points = []
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.color("gold")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append(s)
    speeds.append(random.randint(3, 7))
    points.append(1)

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for i in range(len(stars)):
        stars[i].forward(speeds[i])
        if stars[i].distance(xcor(), ycor()) < 25:
            score += points[i]
            stars[i].goto(random.randint(-200, 200), 200)
        if stars[i].ycor() < -220:
            stars[i].goto(random.randint(-200, 200), 200)
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

### Eight stars

**What would you change to play with eight stars?**

☐ Add eight new variables

☐ range(4) to range(8)

☐ speeds.append(8)

☐ Copy the loop eight times

:::


:::teacher-note

**Answer:** range(4) to range(8)

The loop makes the stars, so one number sets how many. Every list grows with it, because the loop appends to all three.

:::


:::keep-together

### Same place, same star

**speeds is [4, 7, 3, 5] and points is [1, 1, 1, 1]. Fill in what the loop in tick uses for each star.**

{{rows 1}}

| i | which star | speeds[i] | points[i] |
|---|---|---|---|
| 0 | 1st | 4 | 1 |
| 1 | 2nd |   |   |
| 3 | 4th |   |   |

:::


:::teacher-note

**Answer:** 7, 1, 5, 1

The same i picks the same star from every list. stars[1] is the second star, so its speed is speeds[1], which is 7.

:::


:::keep-together

### Spot the bug

**Someone made a fifth star but it stops with an IndexError. Click the line where Python stops.**

```
 1  from turtle import *
 2  
 3  stars = []
 4  speeds = [3, 5, 4, 6]
 5  for i in range(5):
 6      s = Turtle()
 7      s.penup()
 8      stars.append(s)
 9  
10  for i in range(len(stars)):
11      stars[i].forward(speeds[i])
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 11

There are five stars but only four speeds, so speeds[4] does not exist. Lists side by side must be changed together: every new star needs a speed too.

:::


:::typical

## Modify


**Six stars.** Play with **six** stars.

**Different points.** Make each star worth a random **1 to 3** points.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Six stars:**

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
speeds = []
points = []
for i in range(6):
    s = Turtle()
    s.shape("circle")
    s.color("gold")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append(s)
    speeds.append(random.randint(3, 7))
    points.append(1)

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for i in range(len(stars)):
        stars[i].forward(speeds[i])
        if stars[i].distance(xcor(), ycor()) < 25:
            score += points[i]
            stars[i].goto(random.randint(-200, 200), 200)
        if stars[i].ycor() < -220:
            stars[i].goto(random.randint(-200, 200), 200)
    show_score()
    ontimer(tick, 50)

onkey(go_left, "Left")
onkey(go_right, "Right")
listen()
show_score()
tick()
mainloop()
```

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
speeds = []
points = []
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.color("gold")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append(s)
    speeds.append(random.randint(3, 7))
    points.append(random.randint(1, 3))

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for i in range(len(stars)):
        stars[i].forward(speeds[i])
        if stars[i].distance(xcor(), ycor()) < 25:
            score += points[i]
            stars[i].goto(random.randint(-200, 200), 200)
        if stars[i].ycor() < -220:
            stars[i].goto(random.randint(-200, 200), 200)
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

Make the first star a **bad star**: add a fourth list, `bad`, with `True` for the first star and `False` for the others. Colour the bad star red. Catching it **costs 3 points**; catching any other star adds its points.

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
speeds = []
points = []
bad = []
for i in range(4):
    s = Turtle()
    s.shape("circle")
    s.color("gold")
    s.penup()
    s.goto(-150 + i * 100, 200)
    s.setheading(270)
    stars.append(s)
    speeds.append(random.randint(3, 7))
    points.append(1)
    if i == 0:
        bad.append(True)
        s.color("red")
    else:
        bad.append(False)

def show_score():
    pen.clear()
    pen.write("Score: " + str(score), False, "left", ("Arial", 16, "normal"))

def go_left():
    goto(xcor() - 25, ycor())

def go_right():
    goto(xcor() + 25, ycor())

def tick():
    global score
    for i in range(len(stars)):
        stars[i].forward(speeds[i])
        if stars[i].distance(xcor(), ycor()) < 25:
            if bad[i]:
                score -= 3
            else:
                score += points[i]
            stars[i].goto(random.randint(-200, 200), 200)
        if stars[i].ycor() < -220:
            stars[i].goto(random.randint(-200, 200), 200)
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

Lists made the number of stars one number. But everything about one star is now spread over four lists. Next lesson keeps it together.

:::


## Exit ticket

:::keep-together

**names = ["Ada", "Bo"] and ages = [12, 13, 11]. What is wrong?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The lists are out of step: three ages for two names, so the third age belongs to nobody (and a loop over ages would fail on names[2]).

:::

