---
marp: true
theme: default
html: true
---

# One dictionary per star

Objects with turtles · Many things on screen

<!-- Speaker note: Students keep each star's turtle, speed and points together in a dictionary, loop over a list of dictionaries, and see that a new property is now one key instead of one more list kept in step. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** keep everything about one star together in a dictionary, so adding a property is one line and nothing can fall out of step.

- I can make a dictionary, and read and change a value by its key.
- I can loop over a list of dictionaries.
- I can explain why one dictionary per thing is safer than lists side by side.

<!-- Speaker note: Before class: Read the unit primer first. A dictionary pairs **keys** with **values**: `{"speed": 5, "points": 2}`. `star["speed"]` reads the value; `star["speed"] = 8` changes it. Keys are text, so they need quotes; `star[speed]` (the bug task) looks for a variable called `speed` and stops with a NameError. A list of dictionaries is a table: one row per thing. The Make task repeats last lesson's bad star so students can compare a new list with a new key. Teacher: Bug task: quotes make it text. Without them Python looks for a variable. -->

---

## Why it matters

> A contact on your phone keeps a name, a number and a photo together. A dictionary does the same for anything in a program.

<!-- Speaker note: Four lists for one star was fragile. A **dictionary** keeps everything about one star together: each value is stored under a name, called a **key**. The game keeps a list of dictionaries, one per star. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
star = {"speed": 5, "points": 2}
star["points"] = star["points"] + 1
print(star["speed"], star["points"])
```

**What does it print?**

- speed points
- 3 5
- 5 2
- 5 3

<!-- Speaker note: What happens: 5 3. star["points"] starts at 2; the second line stores 2 + 1 back under "points". star["speed"] is still 5. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: read the second line from the right: work out star["points"] + 1, then store it under "points". -->

<style scoped>pre, marp-pre { font-size: 0.81em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0Astars+%3D+%5B%5D%0Afor+i+in+range%284%29%3A%0A++++s+%3D+Turtle%28%29%0A++++s.shape%28%22circle%22%29%0A++++s.penup%28%29%0A++++s.goto%28-150+%2B+i+*+100%2C+200%29%0A++++s.setheading%28270%29%0A++++stars.append%28%7B%0A++++++++%22turtle%22%3A+s%2C%0A++++++++%22speed%22%3A+random.randint%283%2C+7%29%2C%0A++++++++%22points%22%3A+1%2C%0A++++%7D%29%0A%0Afor+star+in+stars%3A%0A++++star%5B%22turtle%22%5D.color%28%22gold%22%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++for+star+in+stars%3A%0A++++++++star%5B%22turtle%22%5D.forward%28star%5B%22speed%22%5D%29%0A++++++++if+star%5B%22turtle%22%5D.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++++++score+%2B%3D+star%5B%22points%22%5D%0A++++++++++++star%5B%22turtle%22%5D.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++++++if+star%5B%22turtle%22%5D.ycor%28%29+%3C+-220%3A%0A++++++++++++star%5B%22turtle%22%5D.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/objects/objects-dicts/?full=step-2#step-2)

<!-- Speaker note: The same game again. Each star is now one dictionary holding its turtle, speed and points, and `for star in stars:` visits each dictionary in turn. Play it, then find `star["speed"]` in `tick`. Students should be able to say: I can find where one star's speed is stored, and where the game reads it. -->

<!-- Speaker note: Teacher: ask students to find where a star's speed is stored and where it is read. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 5 3. star["points"] starts at 2; the second line stores 2 + 1 back under "points". star["speed"] is still 5.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 59 lines long: open it in the tutorial and read it together._

[Open this step](https://tutorials.learningwaypoints.com/code/objects/objects-dicts/?full=step-3#step-3)

<!-- Speaker note: What this step is for: A dictionary is one record per thing: values are found by name, not by place, so a new property is one more key. -->

<!-- Speaker note: Teacher: the colour question is the lesson's point. One key, made in one place. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the pieces

**Match each piece with what it does.**

| | |
|---|---|
| `{"speed": 5, "points": 1}` | A. the value stored under the key "speed" |
| `star["speed"]` | B. each dictionary in the list, one at a time |
| `star["points"] = 3` | C. changes the value stored under "points" |
| `for star in stars:` | D. a dictionary: keys paired with values |

* Answer: {"speed": 5, "points": 1} → D. a dictionary: keys paired with values; star["speed"] → A. the value stored under the key "speed"; star["points"] = 3 → C. changes the value stored under "points"; for star in stars: → B. each dictionary in the list, one at a time

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A new property

**Every star should also remember its colour. What changes?**

- A new variable for every star
- One more key in the dictionary where each star is made
- A new list beside stars
- Nothing: dictionaries cannot hold colours

* Answer: One more key in the dictionary where each star is made

<!-- Speaker note: Add "colour": ... where the dictionary is made, then read star["colour"] where it is needed. Nothing else can fall out of step. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should print each star's speed doubled, but it stops with a NameError. Click the line that causes it.**

```
 1  stars = [{"speed": 5, "points": 1}, {"speed": 3, "points": 5}]
 2  for star in stars:
 3      print(star[speed] * 2)
```

* Answer: line 3

<!-- Speaker note: Keys are text, so they need quotes: star["speed"]. Without quotes Python looks for a variable called speed, which does not exist. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Different points:** Give each star a random **1 to 3** points.
- **Colours:** Store a **colour** in each star's dictionary, and use it to colour the turtle.

<!-- Speaker note: What this step is for: Changing what a star stores is one line where it is made; using it is star["key"] where it is needed. Hints, in order: "points": 1 gives every star 1 point. Use random.randint(1, 3) instead. / Add a list of colours before the loop, and a "colour" key in each dictionary: colours[i % 3] picks gold, orange, yellow in turn. / Then colour each turtle with star["turtle"].color(star["colour"]). For students who need more support: Give students the "bad" key already in the dictionary and ask them only to change what happens when a star is caught. For early finishers: Add a "hits" key that counts how often each star has been caught, and make a star faster every third catch. The hard part, on purpose: Keys are text in quotes: star["speed"], not star[speed]. Ask them to read the NameError aloud and say what Python thinks speed is. When students get stuck: NameError: name 'speed' is not defined. Ask: Is the key in quotes? Fix: star["speed"], not star[speed]. / KeyError: 'colour'. Ask: Was the key added to every dictionary when the stars were made? Fix: Add the key in the dictionary where each star is made, with the same spelling. / All the stars are the same colour. Ask: Where is each turtle coloured, and which value does it use? Fix: After the loop that makes them: star["turtle"].color(star["colour"]) for each star. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0Astars+%3D+%5B%5D%0Afor+i+in+range%284%29%3A%0A++++s+%3D+Turtle%28%29%0A++++s.shape%28%22circle%22%29%0A++++s.penup%28%29%0A++++s.goto%28-150+%2B+i+*+100%2C+200%29%0A++++s.setheading%28270%29%0A++++stars.append%28%7B%0A++++++++%22turtle%22%3A+s%2C%0A++++++++%22speed%22%3A+random.randint%283%2C+7%29%2C%0A++++++++%22points%22%3A+1%2C%0A++++%7D%29%0A%0Afor+star+in+stars%3A%0A++++star%5B%22turtle%22%5D.color%28%22gold%22%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++for+star+in+stars%3A%0A++++++++star%5B%22turtle%22%5D.forward%28star%5B%22speed%22%5D%29%0A++++++++if+star%5B%22turtle%22%5D.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++++++score+%2B%3D+star%5B%22points%22%5D%0A++++++++++++star%5B%22turtle%22%5D.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++++++if+star%5B%22turtle%22%5D.ycor%28%29+%3C+-220%3A%0A++++++++++++star%5B%22turtle%22%5D.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/objects/objects-dicts/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make a bad star

Make the first star a **bad star** again, this time with a `"bad"` key in each dictionary (`True` for the first star only). The bad star is red and **costs 3 points** when caught. Compare it with last lesson's version: what did you not have to do this time?

<!-- Speaker note: What this step is for: The same bad star as last lesson, now one key instead of one more list: compare the two. -->

<!-- Speaker note: Teacher: compare with last lesson's bad star. No list to keep in step. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make a bad star

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Aimport+random%0A%0Aspeed%280%29%0Apenup%28%29%0Agoto%280%2C+-180%29%0Aleft%2890%29%0Ascore+%3D+0%0A%0Apen+%3D+Turtle%28%29%0Apen.hideturtle%28%29%0Apen.penup%28%29%0Apen.goto%28-220%2C+200%29%0A%0Astars+%3D+%5B%5D%0Afor+i+in+range%284%29%3A%0A++++s+%3D+Turtle%28%29%0A++++s.shape%28%22circle%22%29%0A++++s.penup%28%29%0A++++s.goto%28-150+%2B+i+*+100%2C+200%29%0A++++s.setheading%28270%29%0A++++stars.append%28%7B%0A++++++++%22turtle%22%3A+s%2C%0A++++++++%22speed%22%3A+random.randint%283%2C+7%29%2C%0A++++++++%22points%22%3A+1%2C%0A++++%7D%29%0A%0Afor+star+in+stars%3A%0A++++star%5B%22turtle%22%5D.color%28%22gold%22%29%0A%0Adef+show_score%28%29%3A%0A++++pen.clear%28%29%0A++++pen.write%28%22Score%3A+%22+%2B+str%28score%29%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+16%2C+%22normal%22%29%29%0A%0Adef+go_left%28%29%3A%0A++++goto%28xcor%28%29+-+25%2C+ycor%28%29%29%0A%0Adef+go_right%28%29%3A%0A++++goto%28xcor%28%29+%2B+25%2C+ycor%28%29%29%0A%0Adef+tick%28%29%3A%0A++++global+score%0A++++for+star+in+stars%3A%0A++++++++star%5B%22turtle%22%5D.forward%28star%5B%22speed%22%5D%29%0A++++++++if+star%5B%22turtle%22%5D.distance%28xcor%28%29%2C+ycor%28%29%29+%3C+25%3A%0A++++++++++++score+%2B%3D+star%5B%22points%22%5D%0A++++++++++++star%5B%22turtle%22%5D.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++++++if+star%5B%22turtle%22%5D.ycor%28%29+%3C+-220%3A%0A++++++++++++star%5B%22turtle%22%5D.goto%28random.randint%28-200%2C+200%29%2C+200%29%0A++++show_score%28%29%0A++++ontimer%28tick%2C+50%29%0A%0Aonkey%28go_left%2C+%22Left%22%29%0Aonkey%28go_right%2C+%22Right%22%29%0Alisten%28%29%0Ashow_score%28%29%0Atick%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/objects/objects-dicts/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

A list of dictionaries is how most programs store data: one record per thing. There is still one awkward part: `star["turtle"].forward(star["speed"])`. Next lesson makes a `Star` of your own, so it reads `star.turtle.forward(star.speed)`.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**pet = {"name": "Rex", "legs": 4}. Write the line that changes legs to 3.**

* pet["legs"] = 3

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson makes a Star class, so a star's values read star.speed instead of star["speed"], and later the star can do things itself. Data detective uses lists of dictionaries for real data sets. -->
