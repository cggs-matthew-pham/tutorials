---
marp: true
theme: default
html: true
---

# Many turtles

Objects with turtles · Many things on screen

<!-- Speaker note: Students make extra turtles with Turtle(), give each one commands by name, and play a catch-the-stars game built from three separate star variables, so they can count what each star costs in code. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** make more turtles with Turtle(), give each one its own commands, and find out what a game with several stars costs in code.

- I can make a new turtle with Turtle() and give it commands by name.
- I can explain which turtle a command without a name in front goes to.
- I can work out how much code each extra object costs when every one has its own variable.

<!-- Speaker note: Before class: Read the unit primer first. `a = Turtle()` makes a new turtle; `a.forward(100)` moves only `a`. Commands with no name in front (`forward`, `goto`, `xcor()`) go to the **default turtle**, the one from the turtle course. As in real Python, the default turtle only appears once such a command uses it, which is why the Predict program shows two turtles, not three. In the game the student is the default turtle; the stars are `s1`, `s2` and `s3`; `pen` is a hidden turtle that writes the score. Keys need the picture clicked first. Teacher: Bug task: a missing name sends the command to the default turtle, which then appears. Students meet this again in their own games. -->

---

## Why it matters

> Every game has many things moving at once: enemies, coins, bullets, clouds. Each one is an object with its own position and its own commands.

<!-- Speaker note: So far one turtle did everything. `Turtle()` makes **another** turtle. Each one is an **object**: a thing with its own position, heading and colour, that you give commands to by name. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

a = Turtle()
b = Turtle()
b.color("red")
a.forward(100)
b.left(90)
b.forward(50)
```

**How many turtles are on the screen when it finishes?**

<!-- Speaker note: What happens: 2: a and b. Every command has a name in front of it, so the turtle you used in the turtle course (the default turtle) is never used, and Python does not draw it. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students say 3. Run it and ask where the third turtle went: nothing ever used it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0As1+%3D+Turtle%28%29%0As1.shape%28%22circle%22%29%0As1.color%28%22gold%22%29%0As1.penup%28%29%0As1.goto%28-120%2C+200%29%0As1.setheading%28270%29%0A%0As2+%3D+Turtle%28%29%0As2.shape%28%22circle%22%29%0As2.color%28%22gold%22%29%0As2.penup%28%29%0As2.goto%280%2C+200%29%0As2.setheading%28270%29%0A%0As3+%3D+Turtle%28%29%0As3.shape%28%22circle%22%29%0As3.color%28%22gold%22%29%0As3.penup%28%29%0As3.goto%28120%2C+200%29%0As3.setheading%28270%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++s1.forward%284%29%0A++++if+s1.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++score+%2B%3D+1%0A++++++++s1.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++if+s1.ycor%28%29+%3C+-220%3A%0A++++++++s1.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++s2.forward%286%29%0A++++if+s2.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++score+%2B%3D+1%0A++++++++s2.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++if+s2.ycor%28%29+%3C+-220%3A%0A++++++++s2.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++s3.forward%283%29%0A++++if+s3.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++score+%2B%3D+1%0A++++++++s3.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++if+s3.ycor%28%29+%3C+-220%3A%0A++++++++s3.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/objects/objects-turtles/?full=step-2#step-2)

<!-- Speaker note: A game: catch the falling stars. Press **Run**, click the picture, then use the **left and right arrow keys**. You are the turtle at the bottom: commands with no name in front (`goto`, `xcor()`) move you. Each star is its own turtle, `s1`, `s2` and `s3`, and the score is written by a fourth, hidden turtle called `pen`. Students should be able to say: I caught some stars, and I can point to the lines that make and move one star. -->

<!-- Speaker note: Teacher: give two minutes to play. Then ask students to put a finger on every line about s1. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 2: a and b. Every command has a name in front of it, so the turtle you used in the turtle course (the default turtle) is never used, and Python does not draw it.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 75 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/objects/objects-turtles/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Each object is driven by name; with separate variables, every new star costs the same block of lines again. -->

<!-- Speaker note: Teacher: the count (11 lines per star) is the point of the lesson. Ask what 20 stars would cost. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the lines

**Match each line with what it does.**

| | |
|---|---|
| `s1 = Turtle()` | A. moves s1 only |
| `s1.forward(4)` | B. writes the score with the hidden pen turtle |
| `goto(xcor() - 25, ycor())` | C. moves you, the turtle at the bottom |
| `pen.write(...)` | D. makes a new turtle and names it s1 |

* Answer: s1 = Turtle() → D. makes a new turtle and names it s1; s1.forward(4) → A. moves s1 only; goto(xcor() - 25, ycor()) → C. moves you, the turtle at the bottom; pen.write(...) → B. writes the score with the hidden pen turtle

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the cost

**Count the lines that mention s1 (making it, moving it, catching it, sending it back to the top). How many are there?**

* Answer: 11

<!-- Speaker note: Six lines make s1, then five more in tick move it, catch it and send it back. Every star costs those 11 lines again, so twenty stars would need about 220. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should draw a red line to the right and a blue line straight up. The blue line goes right instead, and a third turtle appears. Click the line that causes it.**

```
 1  from turtle import *
 2  
 3  a = Turtle()
 4  b = Turtle()
 5  a.color("red")
 6  b.color("blue")
 7  a.forward(100)
 8  left(90)
 9  b.forward(100)
```

* Answer: line 8

<!-- Speaker note: left(90) has no name in front, so it turns the default turtle (which then appears) instead of b. It should be b.left(90). -->

<style scoped>pre, marp-pre { font-size: 0.51em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A blue star:** Make `s2` **blue** and faster than the others.
- **A fourth star:** Add a fourth star, `s4`. Count how many lines it took.

<!-- Speaker note: What this step is for: Changing one star means changing its own lines; adding a star means copying the whole block. Hints, in order: s2's colour is set with s2.color(...). Its speed is the number in s2.forward(...) in tick. / Copy the six lines that make s3 and change every s3 to s4. / Then copy s3's five lines in tick for s4. For students who need more support: Give students the six lines that make the rock, and ask them to add only its lines in tick. For early finishers: Give the rock its own speed that increases a little every time it is sent back to the top. The hard part, on purpose: Seeing that every command needs the turtle's name and a dot. When the wrong turtle moves, ask whose name is in front of that line. When students get stuck: An extra turtle appears in the middle, or the player moves when a star should. Ask: Does every command for a star have the star's name and a dot in front? Fix: Add the name: s4.forward(5), not forward(5). / The arrow keys do nothing. Ask: Did you click the picture after pressing Run? Fix: Click the picture once, then use the arrow keys. / NameError: name 's4' is not defined. Ask: Is s4 made (s4 = Turtle()) before tick uses it? Fix: Put the lines that make s4 with the other stars, above the functions. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0As1+%3D+Turtle%28%29%0As1.shape%28%22circle%22%29%0As1.color%28%22gold%22%29%0As1.penup%28%29%0As1.goto%28-120%2C+200%29%0As1.setheading%28270%29%0A%0As2+%3D+Turtle%28%29%0As2.shape%28%22circle%22%29%0As2.color%28%22gold%22%29%0As2.penup%28%29%0As2.goto%280%2C+200%29%0As2.setheading%28270%29%0A%0As3+%3D+Turtle%28%29%0As3.shape%28%22circle%22%29%0As3.color%28%22gold%22%29%0As3.penup%28%29%0As3.goto%28120%2C+200%29%0As3.setheading%28270%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++s1.forward%284%29%0A++++if+s1.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++score+%2B%3D+1%0A++++++++s1.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++if+s1.ycor%28%29+%3C+-220%3A%0A++++++++s1.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++s2.forward%286%29%0A++++if+s2.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++score+%2B%3D+1%0A++++++++s2.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++if+s2.ycor%28%29+%3C+-220%3A%0A++++++++s2.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++s3.forward%283%29%0A++++if+s3.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++score+%2B%3D+1%0A++++++++s3.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++if+s3.ycor%28%29+%3C+-220%3A%0A++++++++s3.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/objects/objects-turtles/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make a rock

Add a **rock**: a grey square (`rock.shape("square")`) that falls like a star but **costs 3 points** if it touches you. It needs its own lines to make it, move it, and check whether it touched you.

<!-- Speaker note: What this step is for: A different kind of object is still a turtle with a name: it gets its own block of lines, and its own rule when caught. -->

<!-- Speaker note: Teacher: the rock is a whole new block of lines. Ask how many lines it took, and keep the number for next lesson. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make a rock

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0As1+%3D+Turtle%28%29%0As1.shape%28%22circle%22%29%0As1.color%28%22gold%22%29%0As1.penup%28%29%0As1.goto%28-120%2C+200%29%0As1.setheading%28270%29%0A%0As2+%3D+Turtle%28%29%0As2.shape%28%22circle%22%29%0As2.color%28%22gold%22%29%0As2.penup%28%29%0As2.goto%280%2C+200%29%0As2.setheading%28270%29%0A%0As3+%3D+Turtle%28%29%0As3.shape%28%22circle%22%29%0As3.color%28%22gold%22%29%0As3.penup%28%29%0As3.goto%28120%2C+200%29%0As3.setheading%28270%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++s1.forward%284%29%0A++++if+s1.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++score+%2B%3D+1%0A++++++++s1.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++if+s1.ycor%28%29+%3C+-220%3A%0A++++++++s1.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++s2.forward%286%29%0A++++if+s2.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++score+%2B%3D+1%0A++++++++s2.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++if+s2.ycor%28%29+%3C+-220%3A%0A++++++++s2.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++s3.forward%283%29%0A++++if+s3.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++score+%2B%3D+1%0A++++++++s3.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++if+s3.ycor%28%29+%3C+-220%3A%0A++++++++s3.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/objects/objects-turtles/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

Separate names work for three stars and break down for fifty. The rest of this course tidies the game step by step: a list of stars, then one dictionary per star, then a `Star` class of your own.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**a = Turtle(), then forward(50). Which turtle moves?**

* The default turtle, not a: forward(50) has no name in front. a.forward(50) would move a.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson keeps the stars in lists, so one loop moves them all and adding a star is one number. Real games (Arcade sprites, microStudio, every game engine) are many objects like these, each with its own position and behaviour. -->
