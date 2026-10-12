---
marp: true
theme: default
html: true
---

# Stars that move themselves

Objects with turtles · Classes

<!-- Speaker note: Students give the Star class methods (move, restart, touches), so the game loop asks each star to act, then add methods of their own and a Rock class with the same method names. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 20 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** give the Star class methods (move, restart, touches), so the game loop is short and a new kind of falling thing is one class.

- I can write a method (a def inside a class, with self first) and call it on an object.
- I can explain why behaviour belongs inside the class.
- I can add a second class with the same method names, so the game treats both kinds alike.

<!-- Speaker note: Before class: Read the unit primer first. A **method** is a function inside a class; its first parameter is `self`, the object it was called on. `star.move()` runs `move` with `self` as that star, which is why a method without `self` (the bug task) stops with "takes 0 positional arguments but 1 was given". Methods can call each other (`self.restart()`) and change the object's own values (`self.points += 1`). The Make task gives Rock the same method names as Star, so `tick` treats both the same way. That is the idea behind game engines, without the word polymorphism. Teacher: Bug task: Python always passes the object first. That is what self receives. -->

---

## Why it matters

> In a game engine you never move every enemy by hand: you tell each enemy to update itself, and it knows how.

<!-- Speaker note: The game still moved and checked each star itself. A **method** is a function inside a class: `star.move()` asks a star to move itself. The game loop shrinks to a few lines, and the star's rules live with the star. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
class Counter:
    def __init__(self):
        self.count = 0

    def add(self, n):
        self.count = self.count + n

c = Counter()
c.add(2)
c.add(5)
print(c.count)
```

**What number does it print?**

<!-- Speaker note: What happens: 7. c starts at 0; c.add(2) makes it 2 and c.add(5) makes it 7. Each call runs add with self as c. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: trace c.count on the board: 0, then 2, then 7. -->

<style scoped>pre, marp-pre { font-size: 0.78em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0Aclass+Star%3A%0A++++def+__init__%28self%2C+x%29%3A%0A++++++++self.turtle+%3D+Turtle%28%29%0A++++++++self.turtle.shape%28%22circle%22%29%0A++++++++self.turtle.color%28%22gold%22%29%0A++++++++self.turtle.penup%28%29%0A++++++++self.turtle.goto%28x%2C+200%29%0A++++++++self.turtle.setheading%28270%29%0A++++++++self.speed+%3D+random.randint%283%2C+7%29%0A++++++++self.points+%3D+1%0A%0A++++def+move%28self%29%3A%0A++++++++self.turtle.forward%28self.speed%29%0A++++++++if+self.turtle.ycor%28%29+%3C+-220%3A%0A++++++++++++self.restart%28%29%0A%0A++++def+restart%28self%29%3A%0A++++++++self.turtle.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A%0A++++def+touches%28self%2C+x%2C+y%29%3A%0A++++++++return+self.turtle.distance%28x%2C+y%29+%3C+25%0A%0Astars+%3D+%5B%5D%0Afor+i+in+range%284%29%3A%0A++++stars.append%28Star%28-150+%2B+i+*+100%29%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++for+star+in+stars%3A%0A++++++++star.move%28%29%0A++++++++if+star.touches%28xcor%28%29%2C+ycor%28%29%29%3A%0A++++++++++++score+%2B%3D+star.points%0A++++++++++++star.restart%28%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/objects/objects-methods/?full=step-2#step-2)

<!-- Speaker note: The same game, now with methods: `move`, `restart` and `touches`. Read `tick` first: it only asks each star to move, and asks whether it touches you. Students should be able to say: I can explain what star.move() does, and where its code is. -->

<!-- Speaker note: Teacher: read tick aloud. Ask how much shorter it is than the first lesson's. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 7. c starts at 0; c.add(2) makes it 2 and c.add(5) makes it 7. Each call runs add with self as c.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 67 lines long: open it in the tutorial and read it together._

[Open this step](https://tutorials.learningwaypoints.com/code/objects/objects-methods/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Methods put each object's rules inside its class, so the code that uses objects is short and the same for every star. -->

<!-- Speaker note: Teacher: the 'where does it belong' question is the main idea. Behaviour lives with the object. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the calls

**Match each call with what it does.**

| | |
|---|---|
| `star.move()` | A. puts this star back at the top |
| `star.restart()` | B. makes a new star |
| `star.touches(xcor(), ycor())` | C. gives True if this star is close to you |
| `Star(-150 + i * 100)` | D. moves this star down, and sends it back to the top if it falls off |

* Answer: star.move() → D. moves this star down, and sends it back to the top if it falls off; star.restart() → A. puts this star back at the top; star.touches(xcor(), ycor()) → C. gives True if this star is close to you; Star(-150 + i * 100) → B. makes a new star

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where does it belong?

**You want stars to fall faster as the game goes on. Where would that change go?**

- In go_left
- Inside the Star class (in move, or a new method)
- In a new list of speeds
- In every place a star is used

* Answer: Inside the Star class (in move, or a new method)

<!-- Speaker note: How a star behaves belongs to the Star class. Change it there once and every star follows. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This stops with TypeError: faster() takes 0 positional arguments but 1 was given. Click the line that causes it.**

```
 1  class Star:
 2      def __init__(self):
 3          self.speed = 5
 4  
 5      def faster():
 6          self.speed = self.speed + 1
 7  
 8  s = Star()
 9  s.faster()
10  print(s.speed)
```

* Answer: line 5

<!-- Speaker note: Python passes the star itself as the first argument of every method, so the method needs self: def faster(self):. -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Flash:** Add a method `flash` that turns a star **orange**, and call it when a star is caught.
- **Level up:** Add a method `level_up` that makes a caught star worth one more point and a little faster.

<!-- Speaker note: What this step is for: New behaviour is a new method in the class and one call where it is needed. Hints, in order: Add def flash(self): inside the class, with self.turtle.color("orange") in it. / Call star.flash() in tick, where a star is caught. / A method can change the star's own values: self.points += 1 and self.speed += 1. / Call it when a star is caught. For students who need more support: Give students the Rock class with __init__ and move written, and ask them to add restart and touches by copying Star's. For early finishers: Add a Heart class that gives back a life, and a lives counter that ends the game at 0. The hard part, on purpose: Remembering self in a method's def and inside it. Let the TypeError happen, then ask what Python hands to a method first. When students get stuck: TypeError: ... takes 0 positional arguments but 1 was given. Ask: Does the method's def start with self? Fix: def flash(self):, then use self inside it. / NameError: name 'turtle' is not defined (or speed). Ask: Inside a method, how do you reach the star's own values? Fix: Use self. in front: self.turtle, self.speed. / The method is written but nothing happens. Ask: Where is the method called? Fix: Call it on a star where it should happen, such as star.flash() when a star is caught. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0Aclass+Star%3A%0A++++def+__init__%28self%2C+x%29%3A%0A++++++++self.turtle+%3D+Turtle%28%29%0A++++++++self.turtle.shape%28%22circle%22%29%0A++++++++self.turtle.color%28%22gold%22%29%0A++++++++self.turtle.penup%28%29%0A++++++++self.turtle.goto%28x%2C+200%29%0A++++++++self.turtle.setheading%28270%29%0A++++++++self.speed+%3D+random.randint%283%2C+7%29%0A++++++++self.points+%3D+1%0A%0A++++def+move%28self%29%3A%0A++++++++self.turtle.forward%28self.speed%29%0A++++++++if+self.turtle.ycor%28%29+%3C+-220%3A%0A++++++++++++self.restart%28%29%0A%0A++++def+restart%28self%29%3A%0A++++++++self.turtle.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A%0A++++def+touches%28self%2C+x%2C+y%29%3A%0A++++++++return+self.turtle.distance%28x%2C+y%29+%3C+25%0A%0Astars+%3D+%5B%5D%0Afor+i+in+range%284%29%3A%0A++++stars.append%28Star%28-150+%2B+i+*+100%29%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++for+star+in+stars%3A%0A++++++++star.move%28%29%0A++++++++if+star.touches%28xcor%28%29%2C+ycor%28%29%29%3A%0A++++++++++++score+%2B%3D+star.points%0A++++++++++++star.restart%28%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/objects/objects-methods/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make rocks that move themselves

Add a **Rock** class with the same three methods as `Star` (`move`, `restart`, `touches`). Make two rocks, and in `tick` ask each rock to move and to check whether it touches you. A rock costs **3 points**. How many lines in `tick` did the rocks need?

<!-- Speaker note: What this step is for: A second class with the same method names lets the game treat different things the same way. -->

<!-- Speaker note: Teacher: when students finish, ask how many lines a third kind of thing would need in tick. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make rocks that move themselves

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0Aclass+Star%3A%0A++++def+__init__%28self%2C+x%29%3A%0A++++++++self.turtle+%3D+Turtle%28%29%0A++++++++self.turtle.shape%28%22circle%22%29%0A++++++++self.turtle.color%28%22gold%22%29%0A++++++++self.turtle.penup%28%29%0A++++++++self.turtle.goto%28x%2C+200%29%0A++++++++self.turtle.setheading%28270%29%0A++++++++self.speed+%3D+random.randint%283%2C+7%29%0A++++++++self.points+%3D+1%0A%0A++++def+move%28self%29%3A%0A++++++++self.turtle.forward%28self.speed%29%0A++++++++if+self.turtle.ycor%28%29+%3C+-220%3A%0A++++++++++++self.restart%28%29%0A%0A++++def+restart%28self%29%3A%0A++++++++self.turtle.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A%0A++++def+touches%28self%2C+x%2C+y%29%3A%0A++++++++return+self.turtle.distance%28x%2C+y%29+%3C+25%0A%0Astars+%3D+%5B%5D%0Afor+i+in+range%284%29%3A%0A++++stars.append%28Star%28-150+%2B+i+*+100%29%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++for+star+in+stars%3A%0A++++++++star.move%28%29%0A++++++++if+star.touches%28xcor%28%29%2C+ycor%28%29%29%3A%0A++++++++++++score+%2B%3D+star.points%0A++++++++++++star.restart%28%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/objects/objects-methods/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

You started with 11 lines per star. Now a star is one line, `Star(x)`, and each kind of thing knows how to move itself. Game engines such as microStudio and MakeCode Arcade work this way: sprites are objects, and you write how they behave.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**class Lamp: def __init__(self): self.on = False. Write a method switch that turns it on.**

* def switch(self): self.on = True (inside the class), called as lamp.switch().

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This completes the course. microStudio's sprites and MakeCode Arcade's sprites are objects with their own values and behaviour. Apps with Gradio and Data detective use objects too (a Question class, a row of data). -->
