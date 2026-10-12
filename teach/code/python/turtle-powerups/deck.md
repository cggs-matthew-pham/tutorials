---
marp: true
theme: default
html: true
---

# Power-ups

Python Foundations with Turtle · Final challenge: Catch the turtle

<!-- Speaker note: The second half of the final challenge. Students add lives, a status bar, a gold turtle worth 5 and an upgrade bought with points, then invent a power-up of their own. About 60 minutes (Predict, Run and Investigate 15 min · Status bar 10 min · Gold turtle 10 min · Upgrade 10 min · Your own power-up 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** add lives, a status bar, a gold turtle and an upgrade you buy with points.

- I can tell which parts of a program are the user interface and which are the rules.
- I can write a function with four parameters and use it several times.
- I can add a rule that costs something, and explain why the cost is fair.

<!-- Speaker note: Before class: This lesson mixes both directions students could take next. The **user interface** is what the player sees and uses (the status bar, the buttons); the **rules** decide what each event means (losing a life, gold is worth 5, an upgrade costs 5). The Investigate task sorts parts into the two kinds. Try the upgrade task yourself: it uses a variable `delay` instead of the fixed 1000 milliseconds. Teacher: Status bar: one function, label(x, y, name, value), called three times. Ask what the alternative would be (copying six lines three times). Teacher: Gold turtle: every third spot is gold, using % from the Decisions lesson. The gold circle is drawn under the turtle. Teacher: Upgrade: the button only works if score >= 5. Ask what happens without that check (scores go negative). Teacher: Your own power-up: students write one sentence at the top explaining why its cost is fair. Share a few. -->

---

## Why it matters

> Games and apps are built from the same parts: buttons that change state, and rules about what each change means.

<!-- Speaker note: Your game works. Now make it richer: lives instead of misses, a proper status bar, a gold turtle worth more, and an upgrade that costs points. Each one is a small change to the program you already have. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

_The program is 96 lines long: open it in the tutorial and read it together._

[Open this step](https://tutorials.learningwaypoints.com/code/python/turtle-powerups/?full=step-1#step-1)

**You start a game and miss three turtles in a row. What happens?**

- The game ends after the first miss
- Lives goes below 0 and the game carries on
- Nothing: misses are not counted
- Lives goes 3, 2, 1, 0 and the game stops with the Start button back

<!-- Speaker note: What happens: Each miss takes a life. At 0, playing becomes False, so hop stops and the Start button is drawn again. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: each miss takes a life; at 0 lives the game stops. Point to the line that ends the game. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Afrom+ui+import+inside%2C+draw_button%0A%0Aspeed%280%29%0Apenup%28%29%0Ahideturtle%28%29%0A%0Axs+%3D+%5B-120%2C+0%2C+120%2C+120%2C+0%2C+-120%5D%0Ays+%3D+%5B60%2C+110%2C+60%2C+-50%2C+-100%2C+-50%5D%0Aplace+%3D+0%0Atx+%3D+0%0Aty+%3D+0%0Ascore+%3D+0%0Alives+%3D+3%0Ashowing+%3D+False%0Atime_left+%3D+30%0Aplaying+%3D+False%0A%0A%0Adef+draw_scene%28%29%3A%0A++++clear%28%29%0A++++goto%28-190%2C+160%29%0A++++write%28score%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++goto%28-20%2C+160%29%0A++++write%28lives%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++goto%28150%2C+160%29%0A++++write%28time_left%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++if+playing+%3D%3D+False%3A%0A++++++++draw_button%28-60%2C+-180%2C+120%2C+40%2C+%22Start%22%29%0A++++goto%28tx%2C+ty%29%0A%0A%0Adef+hop%28%29%3A%0A++++global+place%2C+tx%2C+ty%2C+showing%0A++++if+playing%3A%0A++++++++tx+%3D+xs%5Bplace%5D%0A++++++++ty+%3D+ys%5Bplace%5D%0A++++++++place+%3D+%28place+%2B+1%29+%25+len%28xs%29%0A++++++++goto%28tx%2C+ty%29%0A++++++++showturtle%28%29%0A++++++++showing+%3D+True%0A++++++++ontimer%28hide%2C+700%29%0A++++++++ontimer%28hop%2C+1000%29%0A%0A%0Adef+hide%28%29%3A%0A++++global+showing%2C+lives%2C+playing%0A++++if+showing%3A%0A++++++++lives+%3D+lives+-+1%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A++++++++if+lives+%3D%3D+0%3A%0A++++++++++++playing+%3D+False%0A++++++++draw_scene%28%29%0A%0A%0Adef+tick%28%29%3A%0A++++global+time_left%2C+playing%0A++++if+playing%3A%0A++++++++time_left+%3D+time_left+-+1%0A++++++++if+time_left+%3D%3D+0%3A%0A++++++++++++playing+%3D+False%0A++++++++++++hideturtle%28%29%0A++++++++else%3A%0A++++++++++++ontimer%28tick%2C+1000%29%0A++++++++draw_scene%28%29%0A%0A%0Adef+start%28%29%3A%0A++++global+score%2C+lives%2C+time_left%2C+playing%2C+place%0A++++score+%3D+0%0A++++lives+%3D+3%0A++++time_left+%3D+30%0A++++place+%3D+0%0A++++playing+%3D+True%0A++++draw_scene%28%29%0A++++hop%28%29%0A++++ontimer%28tick%2C+1000%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+score%2C+showing%0A++++if+playing+and+showing+and+inside%28x%2C+y%2C+tx+-+20%2C+ty+-+20%2C+40%2C+40%29%3A%0A++++++++score+%3D+score+%2B+1%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A++++++++draw_scene%28%29%0A++++if+playing+%3D%3D+False+and+inside%28x%2C+y%2C+-60%2C+-180%2C+120%2C+40%29%3A%0A++++++++start%28%29%0A%0A%0Adraw_scene%28%29%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-powerups/?full=step-2#step-2)

<!-- Speaker note: Press Start and miss on purpose. Then play properly and see how long you last. Students should be able to say: I played until I ran out of lives, and I can point to the line that ends the game. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Each miss takes a life. At 0, playing becomes False, so hop stops and the Start button is drawn again.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 96 lines long: open it in the tutorial and read it together._

[Open this step](https://tutorials.learningwaypoints.com/code/python/turtle-powerups/?full=step-3#step-3)

<!-- Speaker note: Look at the program again: which lines draw things the player sees, and which lines decide what happens? What this step is for: The same program has two kinds of parts: the user interface (show the state, let the player act) and the rules (what each event means). Naming them is the first step to both app and game design. -->

<!-- Speaker note: Teacher: discuss the match before checking it. 'Both' (a button that costs points) is the interesting one. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Investigate

**Each part of a game is user interface, a game rule, or both. Match them.**

| | |
|---|---|
| `The status bar showing score, lives and time` | A. user interface: the player acts |
| `The Start button` | B. user interface: shows the state |
| `Losing a life when a turtle escapes` | C. game rule: what an event means |
| `A gold turtle worth 5 points` | D. game rule: a reward |
| `A button that costs 5 points to use` | E. both: a control that follows a rule |

* Answer: The status bar showing score, lives and time → B. user interface: shows the state; The Start button → A. user interface: the player acts; Losing a life when a turtle escapes → C. game rule: what an event means; A gold turtle worth 5 points → D. game rule: a reward; A button that costs 5 points to use → E. both: a control that follows a rule

<!-- Speaker note: Apps are mostly user interface around some rules; games are mostly rules with some user interface. You are building both. What this step is for: The same program has two kinds of parts: the user interface (show the state, let the player act) and the rules (what each event means). Naming them is the first step to both app and game design. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Add the power-ups



- **Status bar:** Write `label(x, y, name, value)` and use it to show **Score**, **Lives** and **Time** across the top. One function, three calls.
- **Gold turtle:** Every third spot, the turtle is gold: draw a gold circle under it, and make catching it worth **5**.
- **Upgrade button:** While playing, the button says **Slow (5)**. Clicking it spends 5 points and slows the turtle down by 200 milliseconds, but only if you can afford it.

<!-- Speaker note: Hints, in order: def label(x, y, name, value): goto(x, y), write(name), goto(x + 55, y), write(value). / In draw_scene: label(-190, 160, "Score", score), then Lives at -50 and Time at 90. / In hop, after place changes: if place % 3 == 0: gold = True, else: gold = False. / In draw_scene: if showing and gold: goto(tx, ty) then dot(50, "gold"). In clicked: if gold: score = score + 5, else: score = score + 1. / Add delay = 1000 with the other variables, set it back to 1000 in start(), and use ontimer(hop, delay) and ontimer(hide, delay - 300). / In clicked: if playing and score >= 5 and inside(x, y, -60, -180, 120, 40): take 5 points, add 200 to delay, draw_scene(). For students who need more support: Do the status bar together, then let students choose either the gold turtle or the upgrade rather than both. For early finishers: Add a power-up that makes the catch box bigger for 10 seconds, then switches back by itself (a timer). The hard part, on purpose: Separating the rules from the display, and the check before buying. Ask what must be true before the player can buy, before they write the if. When students get stuck: The upgrade can be bought with 0 points and the score goes negative. Ask: What should be true before the player can buy it? Fix: Add score >= 5 to the if that checks the button. / The gold circle stays on screen after the turtle moves on. Ask: When is the gold circle drawn, and what clears it? Fix: Draw it only when showing and gold are both True, and redraw (draw_scene) after a catch or a hide. / The upgrade button seems to do nothing. Ask: Does hop() use delay, or still the number 1000? Fix: Use ontimer(hop, delay) and ontimer(hide, delay - 300). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Add the power-ups

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Afrom+ui+import+inside%2C+draw_button%0A%0Aspeed%280%29%0Apenup%28%29%0Ahideturtle%28%29%0A%0Axs+%3D+%5B-120%2C+0%2C+120%2C+120%2C+0%2C+-120%5D%0Ays+%3D+%5B60%2C+110%2C+60%2C+-50%2C+-100%2C+-50%5D%0Aplace+%3D+0%0Atx+%3D+0%0Aty+%3D+0%0Ascore+%3D+0%0Alives+%3D+3%0Ashowing+%3D+False%0Atime_left+%3D+30%0Aplaying+%3D+False%0A%0A%0A%23+Power-up+1%3A+write+label%28x%2C+y%2C+name%2C+value%29+here%2C+then+use+it+three+times+in+draw_scene.%0A%0A%0Adef+draw_scene%28%29%3A%0A++++clear%28%29%0A++++goto%28-190%2C+160%29%0A++++write%28score%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++goto%28-20%2C+160%29%0A++++write%28lives%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++goto%28150%2C+160%29%0A++++write%28time_left%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++if+playing+%3D%3D+False%3A%0A++++++++draw_button%28-60%2C+-180%2C+120%2C+40%2C+%22Start%22%29%0A++++goto%28tx%2C+ty%29%0A%0A%0Adef+hop%28%29%3A%0A++++global+place%2C+tx%2C+ty%2C+showing%0A++++if+playing%3A%0A++++++++tx+%3D+xs%5Bplace%5D%0A++++++++ty+%3D+ys%5Bplace%5D%0A++++++++place+%3D+%28place+%2B+1%29+%25+len%28xs%29%0A++++++++goto%28tx%2C+ty%29%0A++++++++showturtle%28%29%0A++++++++showing+%3D+True%0A++++++++ontimer%28hide%2C+700%29%0A++++++++ontimer%28hop%2C+1000%29%0A%0A%0Adef+hide%28%29%3A%0A++++global+showing%2C+lives%2C+playing%0A++++if+showing%3A%0A++++++++lives+%3D+lives+-+1%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A++++++++if+lives+%3D%3D+0%3A%0A++++++++++++playing+%3D+False%0A++++++++draw_scene%28%29%0A%0A%0Adef+tick%28%29%3A%0A++++global+time_left%2C+playing%0A++++if+playing%3A%0A++++++++time_left+%3D+time_left+-+1%0A++++++++if+time_left+%3D%3D+0%3A%0A++++++++++++playing+%3D+False%0A++++++++++++hideturtle%28%29%0A++++++++else%3A%0A++++++++++++ontimer%28tick%2C+1000%29%0A++++++++draw_scene%28%29%0A%0A%0Adef+start%28%29%3A%0A++++global+score%2C+lives%2C+time_left%2C+playing%2C+place%0A++++score+%3D+0%0A++++lives+%3D+3%0A++++time_left+%3D+30%0A++++place+%3D+0%0A++++playing+%3D+True%0A++++draw_scene%28%29%0A++++hop%28%29%0A++++ontimer%28tick%2C+1000%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+score%2C+showing%0A++++if+playing+and+showing+and+inside%28x%2C+y%2C+tx+-+20%2C+ty+-+20%2C+40%2C+40%29%3A%0A++++++++score+%3D+score+%2B+1%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A++++++++draw_scene%28%29%0A++++if+playing+%3D%3D+False+and+inside%28x%2C+y%2C+-60%2C+-180%2C+120%2C+40%29%3A%0A++++++++start%28%29%0A%0A%0Adraw_scene%28%29%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-powerups/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own power-up

Invent a power-up of your own. Decide what it does, what it costs and when it can be used, then build it. Write one sentence (as a comment at the top) that explains why the cost is fair.

<!-- Speaker note: Hints, in order: More time: a button that costs 10 points and adds 5 to time_left. / Bigger catch box: a power-up that makes the box 60 by 60 instead of 40 by 40 (remember to centre it: tx - 30). / Double points: a variable that doubles every catch until the next game. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make: your own power-up

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Afrom+ui+import+inside%2C+draw_button%0A%0Aspeed%280%29%0Apenup%28%29%0Ahideturtle%28%29%0A%0Axs+%3D+%5B-120%2C+0%2C+120%2C+120%2C+0%2C+-120%5D%0Ays+%3D+%5B60%2C+110%2C+60%2C+-50%2C+-100%2C+-50%5D%0Aplace+%3D+0%0Atx+%3D+0%0Aty+%3D+0%0Ascore+%3D+0%0Alives+%3D+3%0Ashowing+%3D+False%0Agold+%3D+False%0Atime_left+%3D+30%0Aplaying+%3D+False%0Adelay+%3D+1000%0A%0A%0Adef+label%28x%2C+y%2C+name%2C+value%29%3A%0A++++goto%28x%2C+y%29%0A++++write%28name%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+14%2C+%22normal%22%29%29%0A++++goto%28x+%2B+55%2C+y%29%0A++++write%28value%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+14%2C+%22bold%22%29%29%0A%0A%0Adef+draw_scene%28%29%3A%0A++++clear%28%29%0A++++label%28-190%2C+160%2C+%22Score%22%2C+score%29%0A++++label%28-50%2C+160%2C+%22Lives%22%2C+lives%29%0A++++label%2890%2C+160%2C+%22Time%22%2C+time_left%29%0A++++if+playing%3A%0A++++++++draw_button%28-60%2C+-180%2C+120%2C+40%2C+%22Slow+%285%29%22%29%0A++++else%3A%0A++++++++draw_button%28-60%2C+-180%2C+120%2C+40%2C+%22Start%22%29%0A++++if+showing+and+gold%3A%0A++++++++goto%28tx%2C+ty%29%0A++++++++dot%2850%2C+%22gold%22%29%0A++++goto%28tx%2C+ty%29%0A%0A%0Adef+hop%28%29%3A%0A++++global+place%2C+tx%2C+ty%2C+showing%2C+gold%0A++++if+playing%3A%0A++++++++tx+%3D+xs%5Bplace%5D%0A++++++++ty+%3D+ys%5Bplace%5D%0A++++++++place+%3D+%28place+%2B+1%29+%25+len%28xs%29%0A++++++++if+place+%25+3+%3D%3D+0%3A%0A++++++++++++gold+%3D+True%0A++++++++else%3A%0A++++++++++++gold+%3D+False%0A++++++++showing+%3D+True%0A++++++++draw_scene%28%29%0A++++++++showturtle%28%29%0A++++++++ontimer%28hide%2C+delay+-+300%29%0A++++++++ontimer%28hop%2C+delay%29%0A%0A%0Adef+hide%28%29%3A%0A++++global+showing%2C+lives%2C+playing%0A++++if+showing%3A%0A++++++++lives+%3D+lives+-+1%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A++++++++if+lives+%3D%3D+0%3A%0A++++++++++++playing+%3D+False%0A++++++++draw_scene%28%29%0A%0A%0Adef+tick%28%29%3A%0A++++global+time_left%2C+playing%0A++++if+playing%3A%0A++++++++time_left+%3D+time_left+-+1%0A++++++++if+time_left+%3D%3D+0%3A%0A++++++++++++playing+%3D+False%0A++++++++++++hideturtle%28%29%0A++++++++else%3A%0A++++++++++++ontimer%28tick%2C+1000%29%0A++++++++draw_scene%28%29%0A%0A%0Adef+start%28%29%3A%0A++++global+score%2C+lives%2C+time_left%2C+playing%2C+place%2C+delay%0A++++score+%3D+0%0A++++lives+%3D+3%0A++++delay+%3D+1000%0A++++time_left+%3D+30%0A++++place+%3D+0%0A++++playing+%3D+True%0A++++draw_scene%28%29%0A++++hop%28%29%0A++++ontimer%28tick%2C+1000%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+score%2C+showing%2C+delay%0A++++if+playing+and+showing+and+inside%28x%2C+y%2C+tx+-+20%2C+ty+-+20%2C+40%2C+40%29%3A%0A++++++++if+gold%3A%0A++++++++++++score+%3D+score+%2B+5%0A++++++++else%3A%0A++++++++++++score+%3D+score+%2B+1%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A++++++++draw_scene%28%29%0A++++if+playing+and+score+%3E%3D+5+and+inside%28x%2C+y%2C+-60%2C+-180%2C+120%2C+40%29%3A%0A++++++++score+%3D+score+-+5%0A++++++++delay+%3D+delay+%2B+200%0A++++++++draw_scene%28%29%0A++++if+playing+%3D%3D+False+and+inside%28x%2C+y%2C+-60%2C+-180%2C+120%2C+40%29%3A%0A++++++++start%28%29%0A%0A%0Adraw_scene%28%29%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-powerups/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name one part of your game that is user interface and one that is a game rule.**

* For example: the status bar is user interface (it shows the state); losing a life on a miss is a game rule.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Completing this and Catch the turtle marks the course Challenge complete. Optional next: Control panel (user interface, towards Gradio and web pages) or Game levels (games, towards MakeCode Arcade and microStudio). -->
