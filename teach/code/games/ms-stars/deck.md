---
marp: true
theme: default
html: true
---

# Stars as objects

Games with microStudio · A whole game

<!-- Speaker note: Students bring the Star class from Objects with turtles into microStudio, where each star keeps self.x and self.y and draws itself, fix a method that forgets self, give each star its own colour, make 8 stars, and add a class of their own. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** bring the Star class from Objects with turtles into a game engine: each star moves itself in update() and draws itself in draw(). Change colours and numbers, then add a class of your own.

- I can write a class whose objects move and draw themselves in a game loop.
- I can give each object its own value, set in __init__.
- I can add a new kind of object with its own class and list.

<!-- Speaker note: Before class: Read the unit primer first. This lesson leans on Objects with turtles (classes, `self`, methods, a list of objects); the only new idea is that a star keeps its own `x` and `y` and paints itself in `draw()`, since there are no turtles. `random` works in microStudio's Python as usual. `print()` writes in microStudio's console, under the game. The bug task is the forgotten `self` from Objects with turtles, in a method this time. -->

---

## Why it matters

> Your falling-stars game from the turtle course, rebuilt in a game engine: same class, same methods, smoother and faster.

<!-- Speaker note: In **Objects with turtles** each star was an object with its own turtle, speed and `move()` method. A game engine has no turtles, so a star keeps its own position in `self.x` and `self.y`, and gets a `draw()` method that paints it where it is. Everything else is what you already know. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**What does it print?**

- -60
- 20
- 40
- 100

<!-- Speaker note: What happens: 20. stars[2] is the third star, made when i was 2, so its x is -60 + 2 × 40 = 20. (In microStudio, print() writes in the console under the game.) Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: write i = 0, 1, 2, 3 on the board with each x beside it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 20. stars[2] is the third star, made when i was 2, so its x is -60 + 2 × 40 = 20. (In microStudio, print() writes in the console under the game.)

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/games/ms-stars/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/games/ms-stars/?full=step-2#step-2)

<!-- Speaker note: Put this game in a new microStudio project (or replace your code) and run it. Each frame, `update()` tells every star to move, and `draw()` tells every star to draw itself. Students should be able to say: I can see that each star moves itself and draws itself. -->

<!-- Speaker note: Teacher: ask what replaced the turtle before Investigate asks it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 32 lines long: open it in the tutorial and read it together._

[Open this step](https://tutorials.learningwaypoints.com/code/games/ms-stars/?full=step-3#step-3)

<!-- Speaker note: What this step is for: An object keeps its own values in self; the game loop only calls each object's methods, so the loop stays short whatever the object does. -->

<!-- Speaker note: Teacher: the forgotten self: say the line aloud as this star's y. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Turtle to engine

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

- A list of positions
- Nothing: a game engine has turtles too
- A global x and y shared by every star
- self.x and self.y, and a draw() method that paints the star there

* Answer: self.x and self.y, and a draw() method that paints the star there

<!-- Speaker note: A turtle remembered where it was and drew itself. With no turtle, the star keeps self.x and self.y, and draw() paints a dot at that place every frame. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the lines

**Match each line with what it does.**

| | |
|---|---|
| `self.y -= self.speed` | A. paints this star where it is now |
| `for star in stars: star.move()` | B. makes a star and adds it to the list |
| `screen.fillRound(self.x, self.y, 8, 8, ...)` | C. tells every star to move |
| `stars.append(Star(-60 + i * 40))` | D. moves this star down by its own speed |

* Answer: self.y -= self.speed → D. moves this star down by its own speed; for star in stars: star.move() → C. tells every star to move; screen.fillRound(self.x, self.y, 8, 8, ...) → A. paints this star where it is now; stars.append(Star(-60 + i * 40)) → B. makes a star and adds it to the list

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 10

<!-- Speaker note: Inside a method, y on its own is a new local variable, not the star's. self.y -= self.speed changes this star's y. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A colour each:** Give each star its **own colour**, picked at random when it is made. The game on this page does.
- **More stars:** Make **8 stars**, spread across the screen.

[Open this step](https://tutorials.learningwaypoints.com/code/games/ms-stars/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A value set in __init__ gives each object its own copy; one number in init decides how many there are. Hints, in order: Store a colour in __init__: self.colour = random.choice([...]) with two or three colours. / In draw(), use self.colour instead of "rgb(255,210,0)". / range(4) makes 4 stars. Change it to range(8). / Space them out: -84 + i * 24 fits 8 stars across. For students who need more support: Give students the Cloud class's __init__ and ask them only for move() and draw(). For early finishers: Give stars a size as well as a colour, or make some stars twinkle by changing their size in move(). The hard part, on purpose: Moving from turtles to drawing by position: a star is now just numbers, painted each frame. Compare the two versions side by side. When students get stuck: cannot access local variable 'y'. Ask: Whose y is it: a new variable, or this star's? Fix: Write self.y. / NameError: name 'random' is not defined. Ask: Is import random at the top of the file? Fix: Add import random as the first line. / The new objects are made but never seen. Ask: Are they drawn in draw(), after screen.clear? Fix: Add a loop in draw() that calls each one's draw(). / All the stars have the same colour. Ask: Is the colour picked in __init__ (once per star) or in draw()? Fix: Pick it in __init__ and store it in self.colour. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: another class

Add a class of your own, with its own `__init__`, `move()` and `draw()`: clouds that drift sideways, snowflakes that wobble, a moon that grows. Keep its objects in their own list, and move and draw them in `update()` and `draw()`. The game on this page adds slow clouds behind the stars.

[Open this step](https://tutorials.learningwaypoints.com/code/games/ms-stars/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a new class with its own __init__, move and draw, kept in its own list. -->

<!-- Speaker note: Teacher: ask each pair which list holds their new objects, and where it is moved and drawn. -->

---

## Where this leads

Real game engines are built this way: every enemy, bullet and cloud is an object with its own update and draw. Next: a paddle that catches the stars, with a score.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does each star have self.x and self.y?**

* So that each star remembers where it is; draw() paints it there and move() changes it, for that star only.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: catching stars with the paddle and keeping score, which is the turtle course's Catch the turtle in a game engine. -->
