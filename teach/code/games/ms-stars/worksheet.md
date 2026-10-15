---
title: "Stars as objects"
subtitle: "Games with microStudio · A whole game · Lesson 3"
---

# Stars as objects

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Your falling-stars game from the turtle course, rebuilt in a game engine: same class, same methods, smoother and faster.


:::teacher-note

**In one sentence:** Students bring the Star class from Objects with turtles into microStudio, where each star keeps self.x and self.y and draws itself, fix a method that forgets self, give each star its own colour, make 8 stars, and add a class of their own.

**Students should be able to say:** I can write a class whose objects move and draw themselves in a game loop. I can give each object its own value, set in __init__. I can add a new kind of object with its own class and list.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Which `i` made `stars[2]`?

```python
class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100

stars = []
for i in range(4):
    stars.append(Star(-60 + i * 40))
print(stars[2].x)
```

:::keep-together

**What does it print?**

☐ -60

☐ 20

☐ 40

☐ 100

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 20. stars[2] is the third star, made when i was 2, so its x is -60 + 2 × 40 = 20. (In microStudio, print() writes in the console under the game.)

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10

    def move(self):
        self.y -= self.speed
        if self.y < -100:
            self.y = 100
            self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")

def init():
    global stars
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))

def update():
    for star in stars:
        star.move()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
```

:::keep-together

### Turtle to engine

The turtle version, from Objects with turtles:

```python
class Star:
    def __init__(self, x):
        self.turtle = Turtle()
        self.turtle.goto(x, 200)
        self.speed = random.randint(3, 7)

    def move(self):
        self.turtle.forward(self.speed)
```

**This is the turtle version of Star. What has the microStudio version got instead of self.turtle?**

☐ A list of positions

☐ Nothing: a game engine has turtles too

☐ A global x and y shared by every star

☐ self.x and self.y, and a draw() method that paints the star there

:::


:::teacher-note

**Answer:** self.x and self.y, and a draw() method that paints the star there

A turtle remembered where it was and drew itself. With no turtle, the star keeps self.x and self.y, and draw() paints a dot at that place every frame.

:::


:::keep-together

### Match the lines

**Match each line with what it does.**

A. paints this star where it is now

B. makes a star and adds it to the list

C. tells every star to move

D. moves this star down by its own speed

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `self.y -= self.speed` | |
| `for star in stars: star.move()` | |
| `screen.fillRound(self.x, self.y, 8, 8, ...)` | |
| `stars.append(Star(-60 + i * 40))` | |

:::


:::teacher-note

**Answer:** self.y -= self.speed → D. moves this star down by its own speed; for star in stars: star.move() → C. tells every star to move; screen.fillRound(self.x, self.y, 8, 8, ...) → A. paints this star where it is now; stars.append(Star(-60 + i * 40)) → B. makes a star and adds it to the list

:::


:::keep-together

### Spot the bug

**This stops with an error: cannot access local variable 'y'. Click the line that causes it.**

```
 1  import random
 2  
 3  class Star:
 4      def __init__(self, x):
 5          self.x = x
 6          self.y = 100
 7          self.speed = random.randint(5, 15) / 10
 8  
 9      def move(self):
10          y -= self.speed
11          if self.y < -100:
12              self.y = 100
13              self.x = random.randint(-90, 90)
14  
15      def draw(self):
16          screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")
17  
18  def init():
19      global stars
20      stars = []
21      for i in range(4):
22          stars.append(Star(-60 + i * 40))
23  
24  def update():
25      for star in stars:
26          star.move()
27  
28  def draw():
29      screen.clear("rgb(10,10,40)")
30      for star in stars:
31          star.draw()
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 10

Inside a method, y on its own is a new local variable, not the star's. self.y -= self.speed changes this star's y.

:::


:::typical

## Modify


**A colour each.** Give each star its **own colour**, picked at random when it is made. The game on this page does.

**More stars.** Make **8 stars**, spread across the screen.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A colour each:**

```python
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10
        self.colour = random.choice(["rgb(255,210,0)", "rgb(255,120,160)", "rgb(120,220,255)"])

    def move(self):
        self.y -= self.speed
        if self.y < -100:
            self.y = 100
            self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, self.colour)

def init():
    global stars
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))

def update():
    for star in stars:
        star.move()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
```

**More stars:**

```python
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10

    def move(self):
        self.y -= self.speed
        if self.y < -100:
            self.y = 100
            self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")

def init():
    global stars
    stars = []
    for i in range(8):
        stars.append(Star(-84 + i * 24))

def update():
    for star in stars:
        star.move()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
```

:::

:::


## Make: another class

Add a class of your own, with its own `__init__`, `move()` and `draw()`: clouds that drift sideways, snowflakes that wobble, a moon that grows. Keep its objects in their own list, and move and draw them in `update()` and `draw()`. The game on this page adds slow clouds behind the stars.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10

    def move(self):
        self.y -= self.speed
        if self.y < -100:
            self.y = 100
            self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")

class Cloud:
    def __init__(self, y):
        self.x = -120
        self.y = y

    def move(self):
        self.x += 0.3
        if self.x > 120:
            self.x = -120

    def draw(self):
        screen.fillRound(self.x, self.y, 30, 12, "rgb(200,200,220)")

def init():
    global stars, clouds
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))
    clouds = [Cloud(60), Cloud(20)]

def update():
    for star in stars:
        star.move()
    for cloud in clouds:
        cloud.move()

def draw():
    screen.clear("rgb(10,10,40)")
    for cloud in clouds:
        cloud.draw()
    for star in stars:
        star.draw()
```

:::


:::wider

## Where this leads

Real game engines are built this way: every enemy, bullet and cloud is an object with its own update and draw. Next: a paddle that catches the stars, with a score.

:::


## Exit ticket

:::keep-together

**Why does each star have self.x and self.y?**

{{lines-3}}

:::


:::teacher-note

**Answer:** So that each star remembers where it is; draw() paints it there and move() changes it, for that star only.

:::

