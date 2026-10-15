---
marp: true
theme: default
html: true
---

# Catch the turtle

Python functions and events · Final challenge: Catch the turtle

<!-- Speaker note: The final challenge. Students build a game in three milestones, each with less help, using everything from the course; the turtle hops along a path and players catch it before it hides. About 60 minutes (Predict, Run and Investigate 15 min · Milestone 1 10 min · Milestone 2 15 min · Milestone 3 15 min · Path or random 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** build a game that uses everything so far. The turtle hops along a path; catch it before it hides.

- I can combine variables, decisions, lists, functions and events in one program.
- I can use True and False to remember what is happening right now.
- I can build a working game step by step, testing as I go.

<!-- Speaker note: Before class: Play the finished game (the Milestone 3 solution below) for a minute, then read the three milestone starters. Milestone 1 gives most of the code, milestone 2 an outline, milestone 3 only the goals: that fading support is deliberate. The two new words are `True` and `False`: a variable like `showing` remembers whether the turtle is on screen right now. Finishing this lesson and Power-ups marks the course "Challenge complete". Teacher: The bug task is the missing global line from Events: Python stops on score = score + 1 with UnboundLocalError. Every milestone needs global in each function that changes score, showing or time_left, so point back to it when a student meets this error. Teacher: Milestone 1: the catch is the hit test from Build a button, with the box centred on the turtle (tx - 20, ty - 20). Teacher: Milestone 2: showing is True while the turtle is visible. Clicks only count when showing is True, and a turtle that hides uncaught is a miss. Teacher: Milestone 3: students work from the five goals in the comment. Encourage one goal at a time, running after each. Teacher: Path or random: let students play both. A path can be predicted; random spots can only be reacted to. -->

---

## Why it matters

> Every game is a few rules, some data and a loop. You already know all three.

<!-- Speaker note: The turtle hops around a path. You will turn it into a game: catch the turtle before it hides, score as many as you can in 30 seconds. You will build it in three milestones, with less help each time. **Behind the code:** the turtle is both the target and the pen. `penup()` stops it drawing lines, and `speed(0)` makes every move instant. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
from turtle import *

speed(0)
penup()

xs = [-120, 0, 120, 120, 0, -120]
ys = [60, 110, 60, -50, -100, -50]
place = 0


def hop():
    global place
    goto(xs[place], ys[place])
    place = (place + 1) % len(xs)
    ontimer(hop, 1000)


hop()
mainloop()
```

**The turtle starts at place 0. Where is it after its fourth hop?**

- Bottom right (120, -50)
- Top right (120, 60)
- Top left (-120, 60)
- Top middle (0, 110)

<!-- Speaker note: What happens: Bottom right (120, -50): the fourth hop uses place 3, the fourth number in each list. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the path is two lists (xs and ys) and place says where we are. % wraps place back to 0 at the end of a lap. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0A%0Aspeed%280%29%0Apenup%28%29%0A%0Axs+%3D+%5B-120%2C+0%2C+120%2C+120%2C+0%2C+-120%5D%0Ays+%3D+%5B60%2C+110%2C+60%2C+-50%2C+-100%2C+-50%5D%0Aplace+%3D+0%0A%0A%0Adef+hop%28%29%3A%0A++++global+place%0A++++goto%28xs%5Bplace%5D%2C+ys%5Bplace%5D%29%0A++++place+%3D+%28place+%2B+1%29+%25+len%28xs%29%0A++++ontimer%28hop%2C+1000%29%0A%0A%0Ahop%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-catch/?full=step-2#step-2)

<!-- Speaker note: Run it and watch a full lap. Press **Stop** when you are done. Students should be able to say: I watched the turtle follow the path, and I could say where it would go next. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Bottom right (120, -50): the fourth hop uses place 3, the fourth number in each list.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
from turtle import *

speed(0)
penup()

xs = [-120, 0, 120, 120, 0, -120]
ys = [60, 110, 60, -50, -100, -50]
place = 0


def hop():
    global place
    goto(xs[place], ys[place])
    place = (place + 1) % len(xs)
    ontimer(hop, 1000)


hop()
mainloop()
```

<!-- Speaker note: What this step is for: The path is data (two lists) and place is where we are in it; % wraps place back to the start so the loop never runs off the end. -->

<style scoped>pre, marp-pre { font-size: 0.54em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the path

**Fill in place after each hop. The lists have 6 spots.**

| hop | place used | place after |
|---|---|---|
| 1 | 0 | 1 |
| 2 | 1 | ? |
| 6 | 5 | ? |
| 7 | ? | 1 |

* Answer: 2, 0, 0

<!-- Speaker note: (5 + 1) % 6 is 0, so after the sixth hop place goes back to the start of the lists. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Change the path

**You want the turtle to visit a seventh spot. What do you change?**

- Add a number to xs only
- Change % len(xs) to % 7
- Add one number to xs and one to ys
- Add another hop() call

* Answer: Add one number to xs and one to ys

<!-- Speaker note: Each spot is one x and one y at the same place in the two lists. len(xs) already counts the new spot. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**Every click should add a point, but the first click stops with an error. Click the line where it goes wrong.**

```
 1  from turtle import *
 2  
 3  hideturtle()
 4  score = 0
 5  
 6  def add_point(x, y):
 7      score = score + 1
 8      clear()
 9      write(score, False, "left", ("Arial", 20, "normal"))
10  
11  onscreenclick(add_point)
12  mainloop()
```

* Answer: line 7

<!-- Speaker note: Without global score, the line score = score + 1 makes a new score inside add_point and tries to read it before it has a value (UnboundLocalError). Add global score as the first line of the function so it changes the score made outside. Your game needs the same line in every function that changes score. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: catch it

The turtle now remembers where it is in `tx` and `ty`. Fill in `clicked` so that a click on the turtle adds a point. Run it and try to catch the turtle.

<!-- Speaker note: What this step is for: Catching is the hit test from Build a button, with the box around a moving point instead of a fixed button. Hints, in order: Use the same check as Build a button: if inside(x, y, tx - 20, ty - 20, 40, 40): / Inside the if: score = score + 1, then show_score(). For students who need more support: Pair students for Milestone 3, one reading the goals and the other typing, swapping after each goal. For early finishers: Make the path draw a picture (each spot a corner of a shape) and reveal it with the pen down at game over. The hard part, on purpose: Every variable a function changes needs global, and % wraps the path. When the score doesn't change, ask which variables the function changes. When students get stuck: The score never changes, or an error says a name has no value. Ask: Which variables does this function change? Are they all in its global line? Fix: Every variable a function changes must be listed after global at the top of that function. / Clicking right on the turtle does not score. Ask: Where does the box around the turtle start? Fix: The box starts at (tx - 20, ty - 20) and is 40 by 40, so it is centred on the turtle. / After pressing Start twice quickly, the turtle hops twice as fast. Ask: How many hop loops might be running? Fix: Each Start begins a new hop loop. Only start one when playing is False (the solution checks this). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Milestone 1: catch it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0Afrom+ui+import+inside%0A%0Aspeed%280%29%0Apenup%28%29%0A%0Axs+%3D+%5B-120%2C+0%2C+120%2C+120%2C+0%2C+-120%5D%0Ays+%3D+%5B60%2C+110%2C+60%2C+-50%2C+-100%2C+-50%5D%0Aplace+%3D+0%0Atx+%3D+0%0Aty+%3D+0%0Ascore+%3D+0%0A%0A%0Adef+hop%28%29%3A%0A++++global+place%2C+tx%2C+ty%0A++++tx+%3D+xs%5Bplace%5D%0A++++ty+%3D+ys%5Bplace%5D%0A++++place+%3D+%28place+%2B+1%29+%25+len%28xs%29%0A++++goto%28tx%2C+ty%29%0A++++ontimer%28hop%2C+1000%29%0A%0A%0Adef+show_score%28%29%3A%0A++++clear%28%29%0A++++goto%28-190%2C+160%29%0A++++write%28score%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++goto%28tx%2C+ty%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+score%0A++++%23+Milestone+1%3A+if+the+click+%28x%2C+y%29+is+inside+a+40+by+40+box+around%0A++++%23+the+turtle%2C+add+1+to+score+and+call+show_score%28%29.%0A++++%23+The+box+starts+at+%28tx+-+20%2C+ty+-+20%29.+pass+means+%22do+nothing+yet%22%3A+replace+it.%0A++++pass%0A%0A%0Ahop%28%29%0Ashow_score%28%29%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-catch/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: now you see it

Too easy? Now the turtle only shows for 0.7 seconds. `showing` is `True` while it is there and `False` when it is gone. Follow the three comments that start with **Milestone 2**.

<!-- Speaker note: What this step is for: A boolean variable (True or False) remembers what is happening now, so each event can check it. Hints, in order: In hop: showturtle(), then showing = True, then ontimer(hide, 700). / In hide: if showing: then misses = misses + 1, showing = False and hideturtle(). / In clicked: add showing to the if (if showing and inside(...)), and inside it set showing = False and hideturtle(). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Milestone 2: now you see it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0Afrom+ui+import+inside%0A%0Aspeed%280%29%0Apenup%28%29%0Ahideturtle%28%29%0A%0Axs+%3D+%5B-120%2C+0%2C+120%2C+120%2C+0%2C+-120%5D%0Ays+%3D+%5B60%2C+110%2C+60%2C+-50%2C+-100%2C+-50%5D%0Aplace+%3D+0%0Atx+%3D+0%0Aty+%3D+0%0Ascore+%3D+0%0Amisses+%3D+0%0Ashowing+%3D+False%0A%0A%0Adef+hop%28%29%3A%0A++++global+place%2C+tx%2C+ty%2C+showing%0A++++tx+%3D+xs%5Bplace%5D%0A++++ty+%3D+ys%5Bplace%5D%0A++++place+%3D+%28place+%2B+1%29+%25+len%28xs%29%0A++++goto%28tx%2C+ty%29%0A++++%23+Milestone+2a%3A+show+the+turtle%2C+set+showing+to+True%2C%0A++++%23+and+hide+it+again+after+700+milliseconds+with+ontimer%28hide%2C+700%29.%0A++++ontimer%28hop%2C+1000%29%0A%0A%0Adef+hide%28%29%3A%0A++++global+showing%2C+misses%0A++++%23+Milestone+2b%3A+if+the+turtle+is+still+showing%2C+nobody+caught+it%3A%0A++++%23+add+1+to+misses%2C+set+showing+to+False+and+hide+the+turtle.%0A++++pass%0A%0A%0Adef+show_score%28%29%3A%0A++++clear%28%29%0A++++goto%28-190%2C+160%29%0A++++write%28score%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++goto%28tx%2C+ty%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+score%2C+showing%0A++++%23+Milestone+2c%3A+only+a+showing+turtle+can+be+caught.+When+it+is%2C+hide+it+straight+away.%0A++++if+inside%28x%2C+y%2C+tx+-+20%2C+ty+-+20%2C+40%2C+40%29%3A%0A++++++++score+%3D+score+%2B+1%0A++++++++show_score%28%29%0A%0A%0Ahop%28%29%0Ashow_score%28%29%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-catch/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Milestone 3: game on

Make it a real game: a **Start** button, a 30 second timer, and a score that resets each game. The comment at the top lists the five parts. If you get stuck, the hints show one part at a time.

<!-- Speaker note: What this step is for: Written without a full starter, this shows whether a student can combine state, events and timers into a working program. Hints, in order: Start with time_left = 30 and playing = False. Every function that changes them needs them in its global line. Show the time like the score, at goto(150, 160). / In clicked: if playing == False and inside(x, y, -60, -180, 120, 40): start(). Draw the Start button only when playing == False. / tick(): if playing: take 1 from time_left; if it reaches 0 set playing = False, else ontimer(tick, 1000). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make: Milestone 3: game on

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0Afrom+ui+import+inside%2C+draw_button%0A%0Aspeed%280%29%0Apenup%28%29%0Ahideturtle%28%29%0A%0Axs+%3D+%5B-120%2C+0%2C+120%2C+120%2C+0%2C+-120%5D%0Ays+%3D+%5B60%2C+110%2C+60%2C+-50%2C+-100%2C+-50%5D%0Aplace+%3D+0%0Atx+%3D+0%0Aty+%3D+0%0Ascore+%3D+0%0Amisses+%3D+0%0Ashowing+%3D+False%0A%0A%23+Milestone+3%3A+make+it+a+game.%0A%23+++1.+Add+time_left+%3D+30+and+playing+%3D+False.%0A%23+++2.+Draw+a+Start+button+with+draw_button%28-60%2C+-180%2C+120%2C+40%2C+%22Start%22%29+when+not+playing.%0A%23+++3.+A+click+on+Start+sets+everything+back+to+the+beginning%2C+sets+playing+to+True+and+starts+hop%28%29.%0A%23+++4.+A+tick%28%29+function+takes+1+away+from+time_left+every+second+%28ontimer%29%2C+and+stops+the+game+at+0.%0A%23+++5.+hop%28%29+and+catching+only+work+while+playing+is+True.%0A%0A%0Adef+hop%28%29%3A%0A++++global+place%2C+tx%2C+ty%2C+showing%0A++++tx+%3D+xs%5Bplace%5D%0A++++ty+%3D+ys%5Bplace%5D%0A++++place+%3D+%28place+%2B+1%29+%25+len%28xs%29%0A++++goto%28tx%2C+ty%29%0A++++showturtle%28%29%0A++++showing+%3D+True%0A++++ontimer%28hide%2C+700%29%0A++++ontimer%28hop%2C+1000%29%0A%0A%0Adef+hide%28%29%3A%0A++++global+showing%2C+misses%0A++++if+showing%3A%0A++++++++misses+%3D+misses+%2B+1%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A%0A%0Adef+show_score%28%29%3A%0A++++clear%28%29%0A++++goto%28-190%2C+160%29%0A++++write%28score%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++goto%28tx%2C+ty%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+score%2C+showing%0A++++if+showing+and+inside%28x%2C+y%2C+tx+-+20%2C+ty+-+20%2C+40%2C+40%29%3A%0A++++++++score+%3D+score+%2B+1%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A++++++++show_score%28%29%0A%0A%0Ahop%28%29%0Ashow_score%28%29%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-catch/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Path or random?

Play a few games. Do you start moving to the next spot before the turtle arrives? Then try random spots instead. `random` is a module someone else wrote, just like your `ui.py`. `random.randint(-150, 150)` picks a whole number from -150 up to 150, a new one each time it runs, so the turtle lands somewhere new on every hop. The first number is the lowest it can pick and the second is the highest. Swap the first two lines of `hop()` for the two lines above. Copy `import random` to the top and `random.` before `randint` as they are for now; a later lesson explains how they work. Then change the numbers so the turtle only appears in the top half of the screen.

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A catch game scores a click with if showing and inside(x, y):, where showing is True only while the turtle is on screen. Why check showing as well as inside?**

* So a click only scores while the turtle is visible. After it hides, clicking its old spot should not count.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Power-ups (next) adds lives, a status bar, a gold turtle and an upgrade. Then two optional lessons: Control panel (towards Gradio and web pages) and Game levels (towards MakeCode Arcade and microStudio). Creative option: students design their own path, such as their initials. -->
