---
marp: true
theme: default
html: true
---

# A Star class

Objects with turtles · Classes

<!-- Speaker note: Students rebuild the stars game with a Star class, set up each star in __init__, store its values with self, and add a second class for rocks. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 20 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** make a new kind of object with class, set up each one in __init__, and store its values with self.

- I can write a class with __init__ that stores values with self.
- I can make several objects from one class and read their values (star.speed).
- I can explain what self is inside __init__.

<!-- Speaker note: Before class: Read the unit primer first. `class Star:` describes a new kind of object. `__init__` (two underscores each side; say "init") runs every time `Star(...)` makes one, and `self` is the object being made. `self.speed = 5` stores a value **in that object**; a plain `speed = 5` only makes a variable that disappears when `__init__` ends, which is the bug task (AttributeError later, when the game asks for `s.speed`). Values read as `star.speed`, like a turtle's own commands. No inheritance, getters or class diagrams in this course. Teacher: Bug task: speed = speed looks like it works. Ask where the value lives after __init__ ends. -->

---

## Why it matters

> Game engines are full of classes: one Enemy class, a hundred enemies made from it, each with its own position and health.

<!-- Speaker note: A dictionary needed `star["speed"]`. A **class** lets you make your own kind of object: `class Star` describes what every star stores, and `Star(100)` makes one. Its values read like a turtle's: `star.speed`. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
class Pet:
    def __init__(self, name, legs):
        self.name = name
        self.legs = legs

a = Pet("Rex", 4)
b = Pet("Tweety", 2)
print(a.name, b.legs)
```

**What does it print?**

- Rex 2
- Rex 4
- Tweety 2
- name legs

<!-- Speaker note: What happens: Rex 2. Pet("Rex", 4) runs __init__ with name "Rex" and legs 4, and stores them in that pet. a.name is "Rex"; b is the other pet, so b.legs is 2. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: make two cards labelled a and b on the board, and write name and legs on each as __init__ runs. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0Aclass+Star%3A%0A++++def+__init__%28self%2C+x%29%3A%0A++++++++self.turtle+%3D+Turtle%28%29%0A++++++++self.turtle.shape%28%22circle%22%29%0A++++++++self.turtle.color%28%22gold%22%29%0A++++++++self.turtle.penup%28%29%0A++++++++self.turtle.goto%28x%2C+200%29%0A++++++++self.turtle.setheading%28270%29%0A++++++++self.speed+%3D+random.randint%283%2C+7%29%0A++++++++self.points+%3D+1%0A%0Astars+%3D+%5B%5D%0Afor+i+in+range%284%29%3A%0A++++stars.append%28Star%28-150+%2B+i+*+100%29%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++for+star+in+stars%3A%0A++++++++star.turtle.forward%28star.speed%29%0A++++++++if+star.turtle.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++++++score+%2B%3D+star.points%0A++++++++++++star.turtle.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++++++if+star.turtle.ycor%28%29+%3C+-220%3A%0A++++++++++++star.turtle.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/objects/objects-classes/?full=step-2#step-2)

<!-- Speaker note: The same game, now with a `Star` class. `Star(-150 + i * 100)` makes a star at that x position, and `__init__` sets up its turtle, speed and points. In `tick`, compare `star.speed` with last lesson's `star["speed"]`. Students should be able to say: I can point to where a star is set up, and where the game reads one star's speed. -->

<!-- Speaker note: Teacher: compare star.speed with last lesson's star["speed"]. Same idea, tidier. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Rex 2. Pet("Rex", 4) runs __init__ with name "Rex" and legs 4, and stores them in that pet. a.name is "Rex"; b is the other pet, so b.legs is 2.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 58 lines long: open it in the tutorial and read it together._

[Open this step](https://tutorials.learningwaypoints.com/code/objects/objects-classes/?full=step-3#step-3)

<!-- Speaker note: What this step is for: A class is the pattern, each object made from it keeps its own values in self, and __init__ sets them up once. -->

<!-- Speaker note: Teacher: self is the hardest word. 'The star being made right now' is enough for now. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the lines

**Match each line with what it does.**

| | |
|---|---|
| `class Star:` | A. runs each time a star is made |
| `def __init__(self, x):` | B. makes a star, with x = -150 + i * 100 |
| `self.speed = random.randint(3, 7)` | C. stores a speed in this star |
| `Star(-150 + i * 100)` | D. describes a new kind of object |

* Answer: class Star: → D. describes a new kind of object; def __init__(self, x): → A. runs each time a star is made; self.speed = random.randint(3, 7) → C. stores a speed in this star; Star(-150 + i * 100) → B. makes a star, with x = -150 + i * 100

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What is self?

**Inside __init__, what is self?**

- The star being made right now
- The class itself
- Every star at once
- The player

* Answer: The star being made right now

<!-- Speaker note: Each time Star(...) runs, self is the new star, so self.speed = ... stores a speed in that star only. Four stars, four speeds. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This stops with AttributeError: 'Star' object has no attribute 'speed'. Click the line that causes it.**

```
 1  class Star:
 2      def __init__(self, speed):
 3          speed = speed
 4  
 5  s = Star(5)
 6  print(s.speed)
```

* Answer: line 3

<!-- Speaker note: speed = speed only changes a variable inside __init__, which is thrown away when it ends. self.speed = speed stores it in the star. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A colour for each star:** Give `__init__` a **colour** parameter, and pass a colour in where the stars are made.
- **Different points:** Give each star a random **1 to 3** points.

<!-- Speaker note: What this step is for: Values a star needs come in as parameters of __init__ and are stored on self; the loop that makes stars passes them in. Hints, in order: Add a colour parameter after x: def __init__(self, x, colour): / Use it with self.turtle.color(colour), and pass a colour where the stars are made: Star(-150 + i * 100, "orange"). / self.points = 1 gives every star 1 point. Use random.randint(1, 3). For students who need more support: Give students the Rock class already written, and ask them to make the list of rocks and move them in tick. For early finishers: Give Star a size parameter and use shape() and points so bigger stars are worth more. The hard part, on purpose: self: why values need it to stay with each star. Ask them to point to where each value is stored, and whether it has self. in front. When students get stuck: AttributeError: 'Star' object has no attribute ... Ask: Was the value stored with self. in front, inside __init__? Fix: self.speed = ..., not speed = .... / TypeError: __init__() missing 1 required positional argument. Ask: How many values does __init__ need, and how many does Star(...) pass? Fix: Pass one value for every parameter after self. / NameError: name 'self' is not defined. Ask: Is the line inside a method of the class (indented under def)? Fix: Use self only inside the class's methods; outside, use the object's name (star.speed). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0Aclass+Star%3A%0A++++def+__init__%28self%2C+x%29%3A%0A++++++++self.turtle+%3D+Turtle%28%29%0A++++++++self.turtle.shape%28%22circle%22%29%0A++++++++self.turtle.color%28%22gold%22%29%0A++++++++self.turtle.penup%28%29%0A++++++++self.turtle.goto%28x%2C+200%29%0A++++++++self.turtle.setheading%28270%29%0A++++++++self.speed+%3D+random.randint%283%2C+7%29%0A++++++++self.points+%3D+1%0A%0Astars+%3D+%5B%5D%0Afor+i+in+range%284%29%3A%0A++++stars.append%28Star%28-150+%2B+i+*+100%29%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++for+star+in+stars%3A%0A++++++++star.turtle.forward%28star.speed%29%0A++++++++if+star.turtle.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++++++score+%2B%3D+star.points%0A++++++++++++star.turtle.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++++++if+star.turtle.ycor%28%29+%3C+-220%3A%0A++++++++++++star.turtle.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/objects/objects-classes/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make a Rock class

Add a **Rock** class: a grey square that falls, with its own speed. Make a list of two rocks, move them in `tick` like the stars, and take **3 points** off when one touches you.

<!-- Speaker note: What this step is for: A second class is a second pattern: the same shape of code, a different kind of thing. -->

<!-- Speaker note: Teacher: the Rock class is the Star class's shape again. Ask what is the same and what differs. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make a Rock class

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0Aclass+Star%3A%0A++++def+__init__%28self%2C+x%29%3A%0A++++++++self.turtle+%3D+Turtle%28%29%0A++++++++self.turtle.shape%28%22circle%22%29%0A++++++++self.turtle.color%28%22gold%22%29%0A++++++++self.turtle.penup%28%29%0A++++++++self.turtle.goto%28x%2C+200%29%0A++++++++self.turtle.setheading%28270%29%0A++++++++self.speed+%3D+random.randint%283%2C+7%29%0A++++++++self.points+%3D+1%0A%0Astars+%3D+%5B%5D%0Afor+i+in+range%284%29%3A%0A++++stars.append%28Star%28-150+%2B+i+*+100%29%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++for+star+in+stars%3A%0A++++++++star.turtle.forward%28star.speed%29%0A++++++++if+star.turtle.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++++++score+%2B%3D+star.points%0A++++++++++++star.turtle.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++++++if+star.turtle.ycor%28%29+%3C+-220%3A%0A++++++++++++star.turtle.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/objects/objects-classes/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

The stars and rocks still need the game to move them and check them one line at a time. Next lesson gives the class its own **methods**, so a star can move itself: `star.move()`.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**class Dog: def __init__(self, name): self.name = name. d = Dog("Rex"). What is d.name?**

* "Rex": __init__ stored it in d with self.name = name.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson adds methods, so a star moves itself (star.move()) and adding a new kind of falling thing is one class. Every game engine is built from classes like these. -->
