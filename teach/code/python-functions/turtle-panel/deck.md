---
marp: true
theme: default
html: true
---

# Optional: Control panel

Python functions and events · Final challenge: Catch the turtle

<!-- Speaker note: An optional lesson in the user interface direction. Students turn the game into an app with rows of buttons built from lists, so adding a control means adding to a list. About 45 minutes (Predict, Run and Investigate 15 min · Difficulty row 15 min · Your own controls 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** turn the game into an app with a panel of buttons made from lists.

- I can draw a row of buttons from lists with a loop.
- I can find which button was clicked with a loop.
- I can add a control to an app by adding to its lists.

<!-- Speaker note: Before class: The big idea: **buttons are data**. Three lists (the names, the positions, the values) and two loops (one draws the buttons, one checks which was clicked) replace a pile of copied if statements. "New game" waits 1.1 seconds before starting: that lets any timer still running from the last game stop first, so two games never run at once. Teacher: Ask: what goes wrong if names has four items but bxs has three? (The loop asks for a position that does not exist.) -->

---

## Why it matters

> Every app is a panel of controls over some state. Build the panel from data, and adding a control is one more item in a list.

<!-- Speaker note: Your game has one button. Real apps have panels: rows of controls that change what the program does. Here the buttons come from **lists**, so a loop draws them and a loop finds which one was clicked. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

_The program is 106 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-panel/?full=step-1#step-1)

**You click at x = 0 on the row of buttons. Which button is pressed?**

- Pause
- Go
- New game
- None of them

<!-- Speaker note: What happens: Pause: its button starts at bxs[1] = -60 and is 120 wide, so it covers x from -60 to 60. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the Pause button covers x from -60 to 60, so a click at x = 0 presses Pause. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0Afrom+ui+import+inside%2C+draw_button%0A%0Aspeed%280%29%0Apenup%28%29%0Ahideturtle%28%29%0A%0Axs+%3D+%5B-120%2C+0%2C+120%2C+120%2C+0%2C+-120%5D%0Ays+%3D+%5B70%2C+110%2C+70%2C+-20%2C+-50%2C+-20%5D%0Aplace+%3D+0%0Atx+%3D+0%0Aty+%3D+0%0Ascore+%3D+0%0Ashowing+%3D+False%0Atime_left+%3D+30%0Aplaying+%3D+False%0Adelay+%3D+1000%0A%0Anames+%3D+%5B%22New+game%22%2C+%22Pause%22%2C+%22Go%22%5D%0Abxs+%3D+%5B-190%2C+-60%2C+70%5D%0A%0A%0Adef+draw_scene%28%29%3A%0A++++clear%28%29%0A++++goto%28-190%2C+160%29%0A++++write%28score%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++goto%28150%2C+160%29%0A++++write%28time_left%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++for+i+in+range%28len%28names%29%29%3A%0A++++++++draw_button%28bxs%5Bi%5D%2C+-190%2C+120%2C+40%2C+names%5Bi%5D%29%0A++++goto%28tx%2C+ty%29%0A%0A%0Adef+hop%28%29%3A%0A++++global+place%2C+tx%2C+ty%2C+showing%0A++++if+playing%3A%0A++++++++tx+%3D+xs%5Bplace%5D%0A++++++++ty+%3D+ys%5Bplace%5D%0A++++++++place+%3D+%28place+%2B+1%29+%25+len%28xs%29%0A++++++++goto%28tx%2C+ty%29%0A++++++++showturtle%28%29%0A++++++++showing+%3D+True%0A++++++++ontimer%28hide%2C+delay+-+300%29%0A++++++++ontimer%28hop%2C+delay%29%0A%0A%0Adef+hide%28%29%3A%0A++++global+showing%0A++++if+showing%3A%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A%0A%0Adef+tick%28%29%3A%0A++++global+time_left%2C+playing%0A++++if+playing%3A%0A++++++++time_left+%3D+time_left+-+1%0A++++++++if+time_left+%3D%3D+0%3A%0A++++++++++++playing+%3D+False%0A++++++++++++hideturtle%28%29%0A++++++++else%3A%0A++++++++++++ontimer%28tick%2C+1000%29%0A++++++++draw_scene%28%29%0A%0A%0Adef+go%28%29%3A%0A++++global+playing%0A++++if+playing+%3D%3D+False+and+time_left+%3E+0%3A%0A++++++++playing+%3D+True%0A++++++++hop%28%29%0A++++++++ontimer%28tick%2C+1000%29%0A%0A%0Adef+press%28name%29%3A%0A++++global+score%2C+time_left%2C+place%2C+playing%0A++++if+name+%3D%3D+%22New+game%22%3A%0A++++++++playing+%3D+False%0A++++++++score+%3D+0%0A++++++++time_left+%3D+30%0A++++++++place+%3D+0%0A++++++++draw_scene%28%29%0A++++++++ontimer%28go%2C+1100%29%0A++++if+name+%3D%3D+%22Pause%22%3A%0A++++++++playing+%3D+False%0A++++++++hideturtle%28%29%0A++++if+name+%3D%3D+%22Go%22%3A%0A++++++++go%28%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+score%2C+showing%0A++++if+playing+and+showing+and+inside%28x%2C+y%2C+tx+-+20%2C+ty+-+20%2C+40%2C+40%29%3A%0A++++++++score+%3D+score+%2B+1%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A++++++++draw_scene%28%29%0A++++for+i+in+range%28len%28names%29%29%3A%0A++++++++if+inside%28x%2C+y%2C+bxs%5Bi%5D%2C+-190%2C+120%2C+40%29%3A%0A++++++++++++press%28names%5Bi%5D%29%0A%0A%0Adraw_scene%28%29%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-panel/?full=step-2#step-2)

<!-- Speaker note: Press **New game**, play, pause, then go again. Students should be able to say: I used New game, Pause and Go, and I can say which list each button's name and position come from. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Pause: its button starts at bxs[1] = -60 and is 120 wide, so it covers x from -60 to 60.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 106 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-panel/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Controls stored as data are drawn and checked by loops, so the panel grows by adding to lists, not by copying code. -->

<!-- Speaker note: Teacher: follow the loop for a click at x = 100. Only the third button matches. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow a click

**A click at x = 100, y = -170. Follow the loop in clicked.**

| i | bxs[i] | inside? |
|---|---|---|
| 0 | -190 | no |
| 1 | ? | ? |
| 2 | ? | ? |

* Answer: -60, no, 70, yes

<!-- Speaker note: Only the third button covers x = 100 (it runs from 70 to 190), so press("Go") runs. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Keep the lists in step

**You add a fourth name to names but forget to add a position to bxs. What happens?**

- Nothing changes
- An error: the loop asks for bxs[3], which does not exist
- The button appears at x = 0
- Python adds a position for you

* Answer: An error: the loop asks for bxs[3], which does not exist

<!-- Speaker note: The loops go up to len(names), so they ask for a fourth position. Parallel lists must stay the same length. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## difficulty row

Add a second row: **Easy**, **Medium** and **Hard**. Each one sets how fast the turtle hops. Three more lists, two more loops.

<!-- Speaker note: Hints, in order: Three new lists: levels = ["Easy", "Medium", "Hard"], lxs = [-190, -60, 70], delays = [1300, 1000, 700]. / Copy the drawing loop in draw_scene, but use levels, lxs and y = -140. / Copy the checking loop in clicked: when a level is clicked, delay = delays[i] (and add delay to the global line). For students who need more support: Give the difficulty row's three lists already written; students add only the two loops. For early finishers: Add a row that chooses between two different paths (two pairs of lists) for the turtle. The hard part, on purpose: Controls stored as lists that must stay the same length. Ask them to count each list's items when an IndexError appears. When students get stuck: An IndexError when clicking or drawing. Ask: Do all the lists that go together have the same number of items? Fix: Lists used side by side (names and bxs) must be the same length. / Two rows of buttons overlap. Ask: What y value does each row use? Fix: Give each row its own y, at least 50 apart for 40-high buttons. / A click changes the difficulty but the turtle still moves at the old speed. Ask: Is delay in the global line of clicked? Fix: Add delay to clicked's global line. -->

<!-- Speaker note: Teacher: the difficulty row is the same pattern again: three lists, a drawing loop and a checking loop. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: difficulty row

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0Afrom+ui+import+inside%2C+draw_button%0A%0Aspeed%280%29%0Apenup%28%29%0Ahideturtle%28%29%0A%0Axs+%3D+%5B-120%2C+0%2C+120%2C+120%2C+0%2C+-120%5D%0Ays+%3D+%5B70%2C+110%2C+70%2C+-20%2C+-50%2C+-20%5D%0Aplace+%3D+0%0Atx+%3D+0%0Aty+%3D+0%0Ascore+%3D+0%0Ashowing+%3D+False%0Atime_left+%3D+30%0Aplaying+%3D+False%0Adelay+%3D+1000%0A%0Anames+%3D+%5B%22New+game%22%2C+%22Pause%22%2C+%22Go%22%5D%0Abxs+%3D+%5B-190%2C+-60%2C+70%5D%0A%0A%23+Difficulty+row%3A+add+three+lists+here+%28levels%2C+lxs%2C+delays%29%2C+draw+the+row+at+y+%3D+-140%0A%23+with+a+loop+in+draw_scene%2C+and+in+clicked+set+delay+%3D+delays%5Bi%5D+for+the+button+clicked.%0A%0A%0Adef+draw_scene%28%29%3A%0A++++clear%28%29%0A++++goto%28-190%2C+160%29%0A++++write%28score%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++goto%28150%2C+160%29%0A++++write%28time_left%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++for+i+in+range%28len%28names%29%29%3A%0A++++++++draw_button%28bxs%5Bi%5D%2C+-190%2C+120%2C+40%2C+names%5Bi%5D%29%0A++++goto%28tx%2C+ty%29%0A%0A%0Adef+hop%28%29%3A%0A++++global+place%2C+tx%2C+ty%2C+showing%0A++++if+playing%3A%0A++++++++tx+%3D+xs%5Bplace%5D%0A++++++++ty+%3D+ys%5Bplace%5D%0A++++++++place+%3D+%28place+%2B+1%29+%25+len%28xs%29%0A++++++++goto%28tx%2C+ty%29%0A++++++++showturtle%28%29%0A++++++++showing+%3D+True%0A++++++++ontimer%28hide%2C+delay+-+300%29%0A++++++++ontimer%28hop%2C+delay%29%0A%0A%0Adef+hide%28%29%3A%0A++++global+showing%0A++++if+showing%3A%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A%0A%0Adef+tick%28%29%3A%0A++++global+time_left%2C+playing%0A++++if+playing%3A%0A++++++++time_left+%3D+time_left+-+1%0A++++++++if+time_left+%3D%3D+0%3A%0A++++++++++++playing+%3D+False%0A++++++++++++hideturtle%28%29%0A++++++++else%3A%0A++++++++++++ontimer%28tick%2C+1000%29%0A++++++++draw_scene%28%29%0A%0A%0Adef+go%28%29%3A%0A++++global+playing%0A++++if+playing+%3D%3D+False+and+time_left+%3E+0%3A%0A++++++++playing+%3D+True%0A++++++++hop%28%29%0A++++++++ontimer%28tick%2C+1000%29%0A%0A%0Adef+press%28name%29%3A%0A++++global+score%2C+time_left%2C+place%2C+playing%0A++++if+name+%3D%3D+%22New+game%22%3A%0A++++++++playing+%3D+False%0A++++++++score+%3D+0%0A++++++++time_left+%3D+30%0A++++++++place+%3D+0%0A++++++++draw_scene%28%29%0A++++++++ontimer%28go%2C+1100%29%0A++++if+name+%3D%3D+%22Pause%22%3A%0A++++++++playing+%3D+False%0A++++++++hideturtle%28%29%0A++++if+name+%3D%3D+%22Go%22%3A%0A++++++++go%28%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+score%2C+showing%0A++++if+playing+and+showing+and+inside%28x%2C+y%2C+tx+-+20%2C+ty+-+20%2C+40%2C+40%29%3A%0A++++++++score+%3D+score+%2B+1%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A++++++++draw_scene%28%29%0A++++for+i+in+range%28len%28names%29%29%3A%0A++++++++if+inside%28x%2C+y%2C+bxs%5Bi%5D%2C+-190%2C+120%2C+40%29%3A%0A++++++++++++press%28names%5Bi%5D%29%0A%0A%0Adraw_scene%28%29%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-panel/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own controls

Add a row of controls you design. **Where this leads:** in Gradio, you list the controls (`gr.Button`, `gr.Radio`) and Gradio draws them and checks the clicks for you. On a web page, HTML draws the buttons and JavaScript listens for clicks. You have just built what both of them do.

<!-- Speaker note: Hints, in order: A theme row: names like "Day" and "Night" with a list of colours, and bgcolor(colours[i]) when one is clicked. / A path chooser: two pairs of lists, and a button that swaps which pair xs and ys use. -->

<!-- Speaker note: Teacher: students design a row of their own. A colour theme with bgcolor is a good first choice. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make: your own controls

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=from+turtle+import+*%0Afrom+ui+import+inside%2C+draw_button%0A%0Aspeed%280%29%0Apenup%28%29%0Ahideturtle%28%29%0A%0Axs+%3D+%5B-120%2C+0%2C+120%2C+120%2C+0%2C+-120%5D%0Ays+%3D+%5B70%2C+110%2C+70%2C+-20%2C+-50%2C+-20%5D%0Aplace+%3D+0%0Atx+%3D+0%0Aty+%3D+0%0Ascore+%3D+0%0Ashowing+%3D+False%0Atime_left+%3D+30%0Aplaying+%3D+False%0Adelay+%3D+1000%0A%0Anames+%3D+%5B%22New+game%22%2C+%22Pause%22%2C+%22Go%22%5D%0Abxs+%3D+%5B-190%2C+-60%2C+70%5D%0A%0Alevels+%3D+%5B%22Easy%22%2C+%22Medium%22%2C+%22Hard%22%5D%0Alxs+%3D+%5B-190%2C+-60%2C+70%5D%0Adelays+%3D+%5B1300%2C+1000%2C+700%5D%0A%0A%0Adef+draw_scene%28%29%3A%0A++++clear%28%29%0A++++goto%28-190%2C+160%29%0A++++write%28score%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++goto%28150%2C+160%29%0A++++write%28time_left%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++for+i+in+range%28len%28names%29%29%3A%0A++++++++draw_button%28bxs%5Bi%5D%2C+-190%2C+120%2C+40%2C+names%5Bi%5D%29%0A++++for+i+in+range%28len%28levels%29%29%3A%0A++++++++draw_button%28lxs%5Bi%5D%2C+-140%2C+120%2C+40%2C+levels%5Bi%5D%29%0A++++goto%28tx%2C+ty%29%0A%0A%0Adef+hop%28%29%3A%0A++++global+place%2C+tx%2C+ty%2C+showing%0A++++if+playing%3A%0A++++++++tx+%3D+xs%5Bplace%5D%0A++++++++ty+%3D+ys%5Bplace%5D%0A++++++++place+%3D+%28place+%2B+1%29+%25+len%28xs%29%0A++++++++goto%28tx%2C+ty%29%0A++++++++showturtle%28%29%0A++++++++showing+%3D+True%0A++++++++ontimer%28hide%2C+delay+-+300%29%0A++++++++ontimer%28hop%2C+delay%29%0A%0A%0Adef+hide%28%29%3A%0A++++global+showing%0A++++if+showing%3A%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A%0A%0Adef+tick%28%29%3A%0A++++global+time_left%2C+playing%0A++++if+playing%3A%0A++++++++time_left+%3D+time_left+-+1%0A++++++++if+time_left+%3D%3D+0%3A%0A++++++++++++playing+%3D+False%0A++++++++++++hideturtle%28%29%0A++++++++else%3A%0A++++++++++++ontimer%28tick%2C+1000%29%0A++++++++draw_scene%28%29%0A%0A%0Adef+go%28%29%3A%0A++++global+playing%0A++++if+playing+%3D%3D+False+and+time_left+%3E+0%3A%0A++++++++playing+%3D+True%0A++++++++hop%28%29%0A++++++++ontimer%28tick%2C+1000%29%0A%0A%0Adef+press%28name%29%3A%0A++++global+score%2C+time_left%2C+place%2C+playing%0A++++if+name+%3D%3D+%22New+game%22%3A%0A++++++++playing+%3D+False%0A++++++++score+%3D+0%0A++++++++time_left+%3D+30%0A++++++++place+%3D+0%0A++++++++draw_scene%28%29%0A++++++++ontimer%28go%2C+1100%29%0A++++if+name+%3D%3D+%22Pause%22%3A%0A++++++++playing+%3D+False%0A++++++++hideturtle%28%29%0A++++if+name+%3D%3D+%22Go%22%3A%0A++++++++go%28%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+score%2C+showing%2C+delay%0A++++if+playing+and+showing+and+inside%28x%2C+y%2C+tx+-+20%2C+ty+-+20%2C+40%2C+40%29%3A%0A++++++++score+%3D+score+%2B+1%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A++++++++draw_scene%28%29%0A++++for+i+in+range%28len%28names%29%29%3A%0A++++++++if+inside%28x%2C+y%2C+bxs%5Bi%5D%2C+-190%2C+120%2C+40%29%3A%0A++++++++++++press%28names%5Bi%5D%29%0A++++for+i+in+range%28len%28levels%29%29%3A%0A++++++++if+inside%28x%2C+y%2C+lxs%5Bi%5D%2C+-140%2C+120%2C+40%29%3A%0A++++++++++++delay+%3D+delays%5Bi%5D%0A%0A%0Adraw_scene%28%29%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/python-functions/turtle-panel/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A panel has names = ["A", "B", "C"] and bxs = [-190, -60, 70], each button 120 wide. Which button does a click at x = -100 press?**

* A. Its button runs from -190 to -70, and -100 is inside that range.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Gradio lets you list controls (gr.Button, gr.Radio) and draws them and checks clicks for you. On a web page, HTML draws the buttons and JavaScript listens for clicks. Students have built what both do. -->
