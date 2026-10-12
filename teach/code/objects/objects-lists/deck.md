---
marp: true
theme: default
html: true
---

# Lists of stars

Objects with turtles · Many things on screen

<!-- Speaker note: Students rebuild the stars game with a list of stars and lists of speeds and points beside it, so one loop moves every star, then meet the weakness of lists side by side (they must stay in step). About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** keep the stars in a list and their speeds and points in lists beside it, so one loop moves them all, and find out why lists side by side are fragile.

- I can keep many objects in a list and give each one a command in a loop.
- I can use the same place number to find a star's values in several lists.
- I can explain why lists side by side must be changed together.

<!-- Speaker note: Before class: Read the unit primer first. `stars.append(s)` adds a turtle to the end of a list. `speeds[i]` and `points[i]` are the values for `stars[i]`: lists side by side ("parallel lists") linked only by the place number. They work while every list is changed together, and break when one is not. The bug task shows this: five stars but four speeds gives `IndexError: list index out of range`. The lesson ends with four lists for one star, which is the problem next lesson fixes. Teacher: Bug task: ask students to count the stars and the speeds. Then ask which line should change. -->

---

## Why it matters

> A game with a hundred enemies does not have a hundred variables. It keeps them in a list and loops over it.

<!-- Speaker note: Last lesson every star cost 11 lines. This version keeps the stars in a **list**, and what each star needs to remember (its speed, its points) in more lists beside it. Place `i` in every list is about the same star. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
speeds = [3, 8, 5, 6]
points = [1, 1, 5, 1]
print(speeds[2], points[2])
```

**What does it print?**

- 5 1
- 3 1
- 5 5
- 8 1

<!-- Speaker note: What happens: 5 5. Place 2 is the third item in each list (places start at 0): speeds[2] is 5 and points[2] is 5. Both describe the same star. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: places start at 0, so place 2 is the third item. Point at the same column in both lists. -->

<style scoped>pre, marp-pre { font-size: 0.81em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0Astars+%3D+%5B%5D%0Aspeeds+%3D+%5B%5D%0Apoints+%3D+%5B%5D%0Afor+i+in+range%284%29%3A%0A++++s+%3D+Turtle%28%29%0A++++s.shape%28%22circle%22%29%0A++++s.color%28%22gold%22%29%0A++++s.penup%28%29%0A++++s.goto%28-150+%2B+i+*+100%2C+200%29%0A++++s.setheading%28270%29%0A++++stars.append%28s%29%0A++++speeds.append%28random.randint%283%2C+7%29%29%0A++++points.append%281%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++for+i+in+range%28len%28stars%29%29%3A%0A++++++++stars%5Bi%5D.forward%28speeds%5Bi%5D%29%0A++++++++if+stars%5Bi%5D.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++++++score+%2B%3D+points%5Bi%5D%0A++++++++++++stars%5Bi%5D.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++++++if+stars%5Bi%5D.ycor%28%29+%3C+-220%3A%0A++++++++++++stars%5Bi%5D.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/objects/objects-lists/?full=step-2#step-2)

<!-- Speaker note: The same game, now with four stars made by a loop. Play it (click the picture, then use the arrow keys). `stars.append(s)` adds each new star to the end of the list. Students should be able to say: I can explain how one loop moves every star, and how it finds each star's speed. -->

<!-- Speaker note: Teacher: ask how many lines a fifth star costs now (one number) compared with last lesson (11 lines). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 5 5. Place 2 is the third item in each list (places start at 0): speeds[2] is 5 and points[2] is 5. Both describe the same star.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 57 lines long: open it in the tutorial and read it together._

[Open this step](https://tutorials.learningwaypoints.com/code/objects/objects-lists/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Lists plus a loop make the number of stars one number; lists side by side only work while every list is changed together. -->

<!-- Speaker note: Teacher: in the trace, say each row aloud: star 1 uses speed 7 and 1 point. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Eight stars

**What would you change to play with eight stars?**

- Add eight new variables
- range(4) to range(8)
- speeds.append(8)
- Copy the loop eight times

* Answer: range(4) to range(8)

<!-- Speaker note: The loop makes the stars, so one number sets how many. Every list grows with it, because the loop appends to all three. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Same place, same star

**speeds is [4, 7, 3, 5] and points is [1, 1, 1, 1]. Fill in what the loop in tick uses for each star.**

| i | which star | speeds[i] | points[i] |
|---|---|---|---|
| 0 | 1st | 4 | 1 |
| 1 | 2nd | ? | ? |
| 3 | 4th | ? | ? |

* Answer: 7, 1, 5, 1

<!-- Speaker note: The same i picks the same star from every list. stars[1] is the second star, so its speed is speeds[1], which is 7. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 11

<!-- Speaker note: There are five stars but only four speeds, so speeds[4] does not exist. Lists side by side must be changed together: every new star needs a speed too. -->

<style scoped>pre, marp-pre { font-size: 0.53em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Six stars:** Play with **six** stars.
- **Different points:** Make each star worth a random **1 to 3** points.

<!-- Speaker note: What this step is for: A new property for every star is a new list, filled in the same loop and read with the same i. Hints, in order: The number of stars is set in one place: the range in the loop that makes them. / points.append(1) gives every star 1 point. Use random.randint(1, 3) instead. For students who need more support: Give students the bad list already filled in, and ask them only to change what happens when a star is caught. For early finishers: Add a fifth list, sizes, and use it to make some stars bigger with turtlesize-style shapes (or different shapes) and worth more. The hard part, on purpose: Keeping lists side by side in step. Let the IndexError happen, then ask them to count the items in each list. When students get stuck: IndexError: list index out of range. Ask: Does every list have one item for every star? Fix: Append to every list in the same loop that makes the stars. / A star moves at another star's speed. Ask: Do the lists have their items in the same order? Fix: Fill all the lists in the same loop, one item each time round. / The bad star costs points but stays gold. Ask: Where is the bad star's colour set? Fix: Set s.color("red") in the loop when bad is True for that star. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0Astars+%3D+%5B%5D%0Aspeeds+%3D+%5B%5D%0Apoints+%3D+%5B%5D%0Afor+i+in+range%284%29%3A%0A++++s+%3D+Turtle%28%29%0A++++s.shape%28%22circle%22%29%0A++++s.color%28%22gold%22%29%0A++++s.penup%28%29%0A++++s.goto%28-150+%2B+i+*+100%2C+200%29%0A++++s.setheading%28270%29%0A++++stars.append%28s%29%0A++++speeds.append%28random.randint%283%2C+7%29%29%0A++++points.append%281%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++for+i+in+range%28len%28stars%29%29%3A%0A++++++++stars%5Bi%5D.forward%28speeds%5Bi%5D%29%0A++++++++if+stars%5Bi%5D.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++++++score+%2B%3D+points%5Bi%5D%0A++++++++++++stars%5Bi%5D.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++++++if+stars%5Bi%5D.ycor%28%29+%3C+-220%3A%0A++++++++++++stars%5Bi%5D.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/objects/objects-lists/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make a bad star

Make the first star a **bad star**: add a fourth list, `bad`, with `True` for the first star and `False` for the others. Colour the bad star red. Catching it **costs 3 points**; catching any other star adds its points.

<!-- Speaker note: What this step is for: Adding a property means another list kept in step with the others, which is where the next lesson starts. -->

<!-- Speaker note: Teacher: four lists for one star. Ask what could go wrong when someone adds a fifth property. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make a bad star

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0Astars+%3D+%5B%5D%0Aspeeds+%3D+%5B%5D%0Apoints+%3D+%5B%5D%0Afor+i+in+range%284%29%3A%0A++++s+%3D+Turtle%28%29%0A++++s.shape%28%22circle%22%29%0A++++s.color%28%22gold%22%29%0A++++s.penup%28%29%0A++++s.goto%28-150+%2B+i+*+100%2C+200%29%0A++++s.setheading%28270%29%0A++++stars.append%28s%29%0A++++speeds.append%28random.randint%283%2C+7%29%29%0A++++points.append%281%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++for+i+in+range%28len%28stars%29%29%3A%0A++++++++stars%5Bi%5D.forward%28speeds%5Bi%5D%29%0A++++++++if+stars%5Bi%5D.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++++++score+%2B%3D+points%5Bi%5D%0A++++++++++++stars%5Bi%5D.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++++++if+stars%5Bi%5D.ycor%28%29+%3C+-220%3A%0A++++++++++++stars%5Bi%5D.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/objects/objects-lists/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

Lists made the number of stars one number. But everything about one star is now spread over four lists. Next lesson keeps it together.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**names = ["Ada", "Bo"] and ages = [12, 13, 11]. What is wrong?**

* The lists are out of step: three ages for two names, so the third age belongs to nobody (and a loop over ages would fail on names[2]).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson keeps everything about one star in one dictionary, so nothing can fall out of step. Databases have the same choice: separate columns kept in step, or one record per thing. -->
