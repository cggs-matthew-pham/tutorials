---
marp: true
theme: default
html: true
---

# Optional: Game levels

Python Foundations with Turtle · Final challenge: Catch the turtle

<!-- Speaker note: An optional lesson in the games direction. Students add screens (title, play, game over), levels that speed up and a turtle that walks between spots, the way game engines move sprites. About 45 minutes (Predict, Run and Investigate 15 min · Levels 10 min · Moving turtle 10 min · Your own rule 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** turn the game into a real game with screens, levels and a turtle that moves.

- I can use a state variable to switch between screens.
- I can make a game harder as the score rises.
- I can make something move smoothly with small steps on a timer.

<!-- Speaker note: Before class: `state` holds one of three words: "title", "play" or "over". It replaces True and False because a game has three screens, and two values cannot tell them apart. The moving turtle takes 10 small steps, one every 50 milliseconds, instead of jumping. (An animated move with speed() would make the program ignore clicks until the move finished.) Teacher: Levels: every 5 points, the level goes up and delay drops by 150, but never below 400. Ask why a minimum matters. Teacher: Moving turtle: move() takes one step and asks the timer to run it again in 50 ms, until steps reaches 0. This is how game loops move things. -->

---

## Why it matters

> Every game is a loop that updates its data and redraws, and a few screens it moves between.

<!-- Speaker note: Your game starts as soon as you press Start and just stops at the end. Real games have **screens** (a title, the game, game over), get harder as you play, and have things that **move**. Each is a small change to the game you already built. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

_The program is 99 lines long: open it in the tutorial and read it together._

[Open this step](https://tutorials.learningwaypoints.com/code/python/turtle-levels/?full=step-1#step-1)

**The 30 seconds run out. What is on the screen?**

- The title screen
- The turtle keeps hopping
- Nothing: the program has stopped
- Game over, your score, and an Again button

<!-- Speaker note: What happens: tick sets state to "over", and draw_scene draws the over screen: Game over, the score and Again. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: when time runs out, tick sets state to 'over' and draw_scene draws the game-over screen. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Afrom+ui+import+inside%2C+draw_button%0A%0Aspeed%280%29%0Apenup%28%29%0Ahideturtle%28%29%0A%0Axs+%3D+%5B-120%2C+0%2C+120%2C+120%2C+0%2C+-120%5D%0Ays+%3D+%5B60%2C+110%2C+60%2C+-50%2C+-100%2C+-50%5D%0Aplace+%3D+0%0Atx+%3D+0%0Aty+%3D+0%0Ascore+%3D+0%0Ashowing+%3D+False%0Atime_left+%3D+30%0Astate+%3D+%22title%22%0A%0A%0Adef+big%28text%2C+x%2C+y%29%3A%0A++++goto%28x%2C+y%29%0A++++write%28text%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+28%2C+%22bold%22%29%29%0A%0A%0Adef+draw_scene%28%29%3A%0A++++clear%28%29%0A++++if+state+%3D%3D+%22title%22%3A%0A++++++++big%28%22Catch+the+turtle%22%2C+-140%2C+40%29%0A++++++++draw_button%28-60%2C+-180%2C+120%2C+40%2C+%22Play%22%29%0A++++if+state+%3D%3D+%22play%22%3A%0A++++++++goto%28-190%2C+160%29%0A++++++++write%28score%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++++++goto%28150%2C+160%29%0A++++++++write%28time_left%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++if+state+%3D%3D+%22over%22%3A%0A++++++++big%28%22Game+over%22%2C+-90%2C+40%29%0A++++++++big%28score%2C+-10%2C+-10%29%0A++++++++draw_button%28-60%2C+-180%2C+120%2C+40%2C+%22Again%22%29%0A++++goto%28tx%2C+ty%29%0A%0A%0Adef+hop%28%29%3A%0A++++global+place%2C+tx%2C+ty%2C+showing%0A++++if+state+%3D%3D+%22play%22%3A%0A++++++++tx+%3D+xs%5Bplace%5D%0A++++++++ty+%3D+ys%5Bplace%5D%0A++++++++place+%3D+%28place+%2B+1%29+%25+len%28xs%29%0A++++++++goto%28tx%2C+ty%29%0A++++++++showturtle%28%29%0A++++++++showing+%3D+True%0A++++++++ontimer%28hide%2C+700%29%0A++++++++ontimer%28hop%2C+1000%29%0A%0A%0Adef+hide%28%29%3A%0A++++global+showing%0A++++if+showing%3A%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A%0A%0Adef+tick%28%29%3A%0A++++global+time_left%2C+state%0A++++if+state+%3D%3D+%22play%22%3A%0A++++++++time_left+%3D+time_left+-+1%0A++++++++if+time_left+%3D%3D+0%3A%0A++++++++++++state+%3D+%22over%22%0A++++++++++++hideturtle%28%29%0A++++++++else%3A%0A++++++++++++ontimer%28tick%2C+1000%29%0A++++++++draw_scene%28%29%0A%0A%0Adef+start%28%29%3A%0A++++global+score%2C+time_left%2C+place%2C+state%0A++++score+%3D+0%0A++++time_left+%3D+30%0A++++place+%3D+0%0A++++state+%3D+%22play%22%0A++++draw_scene%28%29%0A++++hop%28%29%0A++++ontimer%28tick%2C+1000%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+score%2C+showing%0A++++if+state+%3D%3D+%22play%22+and+showing+and+inside%28x%2C+y%2C+tx+-+20%2C+ty+-+20%2C+40%2C+40%29%3A%0A++++++++score+%3D+score+%2B+1%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A++++++++draw_scene%28%29%0A++++if+state+%21%3D+%22play%22+and+inside%28x%2C+y%2C+-60%2C+-180%2C+120%2C+40%29%3A%0A++++++++start%28%29%0A%0A%0Adraw_scene%28%29%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-levels/?full=step-2#step-2)

<!-- Speaker note: Play a game to the end, then play again. Students should be able to say: I saw all three screens and can say which line changes the state each time. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* tick sets state to "over", and draw_scene draws the over screen: Game over, the score and Again.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 99 lines long: open it in the tutorial and read it together._

[Open this step](https://tutorials.learningwaypoints.com/code/python/turtle-levels/?full=step-3#step-3)

<!-- Speaker note: Find every line that changes `state`. Which event causes each change? What this step is for: A state variable names which screen the game is on; each event checks it and may change it, and drawing follows from it. -->

<!-- Speaker note: Teacher: find every line that changes state and say which event causes it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Investigate

**Why does this game use state with three values instead of playing = True or False?**

- So the timer works
- Strings are faster than True and False
- The game has three screens, and True or False can only tell two apart
- Python needs a string to draw text

* Answer: The game has three screens, and True or False can only tell two apart

<!-- Speaker note: Title, play and over are three different situations. Two values cannot tell the title screen from game over. What this step is for: A state variable names which screen the game is on; each event checks it and may change it, and drawing follows from it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## levels and a moving turtle



- **Levels:** Every 5 points, go up a level and make the turtle faster. Show the level at the top.
- **Moving turtle:** Make the turtle walk to each spot instead of jumping, in 10 small steps. It is harder to catch, and you can see where it is heading.

<!-- Speaker note: Hints, in order: In clicked, after score = score + 1: if score % 5 == 0 and delay > 400: level = level + 1, delay = delay - 150. / Use ontimer(hop, delay) and ontimer(hide, delay - 300), and reset level and delay in start(). / move(): if state == "play" and steps > 0: tx = tx + dx, ty = ty + dy, goto(tx, ty), steps = steps - 1, ontimer(move, 50). / hop(): dx = (xs[place] - tx) / 10, the same for dy, steps = 10, then move() instead of goto. For students who need more support: Do Levels together; leave Moving turtle as an extra for those who finish. For early finishers: Add a boss turtle every tenth spot that needs three clicks, with its own hit counter. The hard part, on purpose: A state variable deciding which screen runs. Ask them to say which state the game is in after each click, and check the spelling is the same everywhere. When students get stuck: A screen never appears. Ask: Is the state name spelt the same everywhere, including capitals? Fix: "Play" and "play" are different. Use the same lowercase words everywhere. / The game becomes impossibly fast. Ask: What stops delay getting smaller and smaller? Fix: Only take 150 off while delay > 400. / A new game starts at the level the last one ended on. Ask: What does start() set back to the beginning? Fix: Reset level and delay in start(), with score and time. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: levels and a moving turtle

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Afrom+ui+import+inside%2C+draw_button%0A%0Aspeed%280%29%0Apenup%28%29%0Ahideturtle%28%29%0A%0Axs+%3D+%5B-120%2C+0%2C+120%2C+120%2C+0%2C+-120%5D%0Ays+%3D+%5B60%2C+110%2C+60%2C+-50%2C+-100%2C+-50%5D%0Aplace+%3D+0%0Atx+%3D+0%0Aty+%3D+0%0Ascore+%3D+0%0Ashowing+%3D+False%0Atime_left+%3D+30%0Astate+%3D+%22title%22%0A%0A%23+Levels%3A+add+level+%3D+1+and+delay+%3D+1000.+Every+5+points%2C+go+up+a+level+and+take+150+off+delay%0A%23+%28but+never+below+400%29.+Show+the+level+at+goto%28-30%2C+160%29%2C+and+use+delay+in+hop%28%29.%0A%0A%0Adef+big%28text%2C+x%2C+y%29%3A%0A++++goto%28x%2C+y%29%0A++++write%28text%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+28%2C+%22bold%22%29%29%0A%0A%0Adef+draw_scene%28%29%3A%0A++++clear%28%29%0A++++if+state+%3D%3D+%22title%22%3A%0A++++++++big%28%22Catch+the+turtle%22%2C+-140%2C+40%29%0A++++++++draw_button%28-60%2C+-180%2C+120%2C+40%2C+%22Play%22%29%0A++++if+state+%3D%3D+%22play%22%3A%0A++++++++goto%28-190%2C+160%29%0A++++++++write%28score%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++++++goto%28150%2C+160%29%0A++++++++write%28time_left%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++if+state+%3D%3D+%22over%22%3A%0A++++++++big%28%22Game+over%22%2C+-90%2C+40%29%0A++++++++big%28score%2C+-10%2C+-10%29%0A++++++++draw_button%28-60%2C+-180%2C+120%2C+40%2C+%22Again%22%29%0A++++goto%28tx%2C+ty%29%0A%0A%0Adef+hop%28%29%3A%0A++++global+place%2C+tx%2C+ty%2C+showing%0A++++if+state+%3D%3D+%22play%22%3A%0A++++++++tx+%3D+xs%5Bplace%5D%0A++++++++ty+%3D+ys%5Bplace%5D%0A++++++++place+%3D+%28place+%2B+1%29+%25+len%28xs%29%0A++++++++goto%28tx%2C+ty%29%0A++++++++showturtle%28%29%0A++++++++showing+%3D+True%0A++++++++ontimer%28hide%2C+700%29%0A++++++++ontimer%28hop%2C+1000%29%0A%0A%0Adef+hide%28%29%3A%0A++++global+showing%0A++++if+showing%3A%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A%0A%0Adef+tick%28%29%3A%0A++++global+time_left%2C+state%0A++++if+state+%3D%3D+%22play%22%3A%0A++++++++time_left+%3D+time_left+-+1%0A++++++++if+time_left+%3D%3D+0%3A%0A++++++++++++state+%3D+%22over%22%0A++++++++++++hideturtle%28%29%0A++++++++else%3A%0A++++++++++++ontimer%28tick%2C+1000%29%0A++++++++draw_scene%28%29%0A%0A%0Adef+start%28%29%3A%0A++++global+score%2C+time_left%2C+place%2C+state%0A++++score+%3D+0%0A++++time_left+%3D+30%0A++++place+%3D+0%0A++++state+%3D+%22play%22%0A++++draw_scene%28%29%0A++++hop%28%29%0A++++ontimer%28tick%2C+1000%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+score%2C+showing%0A++++if+state+%3D%3D+%22play%22+and+showing+and+inside%28x%2C+y%2C+tx+-+20%2C+ty+-+20%2C+40%2C+40%29%3A%0A++++++++score+%3D+score+%2B+1%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A++++++++draw_scene%28%29%0A++++if+state+%21%3D+%22play%22+and+inside%28x%2C+y%2C+-60%2C+-180%2C+120%2C+40%29%3A%0A++++++++start%28%29%0A%0A%0Adraw_scene%28%29%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-levels/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own game rule

Add a rule that makes the game your own. **Where this leads:** MakeCode Arcade and microStudio give you sprites that move by themselves and screens to switch between. Under the hood they run the same loop you just built: update the data, check for hits, redraw.

<!-- Speaker note: Hints, in order: Boss turtle: every tenth spot needs three clicks. Count hits in a variable and only score when it reaches 3. / High score: a best variable that only changes when a game ends with a higher score, shown on the over screen. -->

<!-- Speaker note: Teacher: a high score or a boss turtle that needs three clicks. Both need one new variable. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make: your own game rule

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=from+turtle+import+*%0Afrom+ui+import+inside%2C+draw_button%0A%0Aspeed%280%29%0Apenup%28%29%0Ahideturtle%28%29%0A%0Axs+%3D+%5B-120%2C+0%2C+120%2C+120%2C+0%2C+-120%5D%0Ays+%3D+%5B60%2C+110%2C+60%2C+-50%2C+-100%2C+-50%5D%0Aplace+%3D+0%0Atx+%3D+0%0Aty+%3D+0%0Ascore+%3D+0%0Ashowing+%3D+False%0Atime_left+%3D+30%0Astate+%3D+%22title%22%0Alevel+%3D+1%0Adelay+%3D+1000%0Asteps+%3D+0%0Adx+%3D+0%0Ady+%3D+0%0A%0A%0Adef+big%28text%2C+x%2C+y%29%3A%0A++++goto%28x%2C+y%29%0A++++write%28text%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+28%2C+%22bold%22%29%29%0A%0A%0Adef+draw_scene%28%29%3A%0A++++clear%28%29%0A++++if+state+%3D%3D+%22title%22%3A%0A++++++++big%28%22Catch+the+turtle%22%2C+-140%2C+40%29%0A++++++++draw_button%28-60%2C+-180%2C+120%2C+40%2C+%22Play%22%29%0A++++if+state+%3D%3D+%22play%22%3A%0A++++++++goto%28-190%2C+160%29%0A++++++++write%28score%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++++++goto%28150%2C+160%29%0A++++++++write%28time_left%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++++++goto%28-30%2C+160%29%0A++++++++write%28level%2C+False%2C+%22left%22%2C+%28%22Arial%22%2C+20%2C+%22normal%22%29%29%0A++++if+state+%3D%3D+%22over%22%3A%0A++++++++big%28%22Game+over%22%2C+-90%2C+40%29%0A++++++++big%28score%2C+-10%2C+-10%29%0A++++++++draw_button%28-60%2C+-180%2C+120%2C+40%2C+%22Again%22%29%0A++++goto%28tx%2C+ty%29%0A%0A%0Adef+move%28%29%3A%0A++++global+tx%2C+ty%2C+steps%0A++++if+state+%3D%3D+%22play%22+and+steps+%3E+0%3A%0A++++++++tx+%3D+tx+%2B+dx%0A++++++++ty+%3D+ty+%2B+dy%0A++++++++goto%28tx%2C+ty%29%0A++++++++steps+%3D+steps+-+1%0A++++++++ontimer%28move%2C+50%29%0A%0A%0Adef+hop%28%29%3A%0A++++global+place%2C+showing%2C+steps%2C+dx%2C+dy%0A++++if+state+%3D%3D+%22play%22%3A%0A++++++++dx+%3D+%28xs%5Bplace%5D+-+tx%29+%2F+10%0A++++++++dy+%3D+%28ys%5Bplace%5D+-+ty%29+%2F+10%0A++++++++steps+%3D+10%0A++++++++place+%3D+%28place+%2B+1%29+%25+len%28xs%29%0A++++++++showturtle%28%29%0A++++++++showing+%3D+True%0A++++++++move%28%29%0A++++++++ontimer%28hide%2C+delay+-+300%29%0A++++++++ontimer%28hop%2C+delay%29%0A%0A%0Adef+hide%28%29%3A%0A++++global+showing%0A++++if+showing%3A%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A%0A%0Adef+tick%28%29%3A%0A++++global+time_left%2C+state%0A++++if+state+%3D%3D+%22play%22%3A%0A++++++++time_left+%3D+time_left+-+1%0A++++++++if+time_left+%3D%3D+0%3A%0A++++++++++++state+%3D+%22over%22%0A++++++++++++hideturtle%28%29%0A++++++++else%3A%0A++++++++++++ontimer%28tick%2C+1000%29%0A++++++++draw_scene%28%29%0A%0A%0Adef+start%28%29%3A%0A++++global+score%2C+time_left%2C+place%2C+state%2C+level%2C+delay%0A++++level+%3D+1%0A++++delay+%3D+1000%0A++++score+%3D+0%0A++++time_left+%3D+30%0A++++place+%3D+0%0A++++state+%3D+%22play%22%0A++++draw_scene%28%29%0A++++hop%28%29%0A++++ontimer%28tick%2C+1000%29%0A%0A%0Adef+clicked%28x%2C+y%29%3A%0A++++global+score%2C+showing%2C+level%2C+delay%0A++++if+state+%3D%3D+%22play%22+and+showing+and+inside%28x%2C+y%2C+tx+-+20%2C+ty+-+20%2C+40%2C+40%29%3A%0A++++++++score+%3D+score+%2B+1%0A++++++++if+score+%25+5+%3D%3D+0+and+delay+%3E+400%3A%0A++++++++++++level+%3D+level+%2B+1%0A++++++++++++delay+%3D+delay+-+150%0A++++++++showing+%3D+False%0A++++++++hideturtle%28%29%0A++++++++draw_scene%28%29%0A++++if+state+%21%3D+%22play%22+and+inside%28x%2C+y%2C+-60%2C+-180%2C+120%2C+40%29%3A%0A++++++++start%28%29%0A%0A%0Adraw_scene%28%29%0Aonscreenclick%28clicked%29%0Alisten%28%29%0Amainloop%28%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/python/turtle-levels/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does this game use state = "title", "play" or "over" instead of playing = True or False?**

* There are three screens, and True or False can only tell two situations apart.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: MakeCode Arcade and microStudio give you sprites that move by themselves and screens to switch between. Underneath they run the same loop: update the data, check for hits, redraw. -->
