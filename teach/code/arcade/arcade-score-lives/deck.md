---
marp: true
theme: default
html: true
---

# Score, lives and timers

MakeCode Arcade · Collide and score

<!-- Speaker note: Students give the player lives and a countdown, spawn enemies with a timer event, and see that an overlap keeps running while two sprites still touch. About 50 minutes (Predict and Run 8 min · Investigate 12 min · Modify 10 min · Make 15 min · Rain dodger 5 min). -->

---

## Today

**We are learning to** give the player lives, send enemies on a timer, and let the engine end the game.

- I can give the player lives and a countdown, and let the game end by itself.
- I can use a timer event to make a new enemy every second.
- I can explain why an enemy must be destroyed (or moved) when it hits the player.

<!-- Speaker note: Before class: **Info** blocks keep a **score**, **lives** (hearts) and a **countdown** at the top of the screen. When the lives reach **0**, Arcade ends the game by itself; when the countdown reaches 0, it ends too. **on game update every 1000 ms** (Game) is a **timer event**: it runs its blocks again every so many milliseconds (1000 ms = 1 second). Here it makes a new enemy each time, at x 160 (the right edge) and a random height, with a **negative vx** so it flies left. One important fact: an **overlap event runs every frame** (about 30 times a second) **while the two sprites still touch**. If the enemy is not destroyed, one touch takes life after life, and the game ends at once. Try the Make task yourself: it is the biggest program so far (about 15 blocks). Teacher: Rain dodger: the same game turned on its side (random x at the top, positive vy). -->

---

## Why it matters

> Three hearts in the corner, a clock ticking down, enemies that keep on coming: that is what turns moving sprites into a game you can win or lose.

<!-- Speaker note: Last lesson the score went up and down, but the game never ended. Arcade's **Info** blocks keep a score, **lives** and a **countdown** at the top of the screen, and they end the game by themselves. A new kind of event, a **timer**, runs its blocks every so many **milliseconds** (1000 ms is one second). A timer can send a new enemy every second, for as long as the game lasts. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/20a47e2ba4c7.png?v=e7897b2805a3e455)

**The player has 3 lives and cannot move. A rock comes every second. What happens?**

- The player loses all 3 lives, then the game ends by itself
- Nothing ends the game, because there is no game over block
- The lives go to 0, then -1, -2, and the game keeps going
- Only one rock is ever made

<!-- Speaker note: What happens: Each rock that hits takes a life. After three hits the lives reach 0, and Arcade shows GAME OVER by itself: you never need a game over block for running out of lives. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: many students expect lives to go below 0, or that a game over block is needed. The engine does it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Each rock that hits takes a life. After three hits the lives reach 0, and Arcade shows GAME OVER by itself: you never need a game over block for running out of lives.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/arcade/arcade-score-lives/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/arcade/arcade-score-lives/?full=step-2#step-2)

<!-- Speaker note: Watch the hearts at the top of the screen. Use the restart button under the simulator to play again. Students should be able to say: I watched the rocks and the hearts, and compared what happened with my prediction. -->

<!-- Speaker note: Teacher: count the hearts aloud as they go. Ask: what made a new rock each second? -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/390be1970411.png?v=b0f8814fc66d7480)

<!-- Speaker note: Dodge the rocks with the arrow keys. Lose on purpose once, too. What this step is for: Info keeps score and lives, and ends the game when the lives reach 0. A timer event (on game update every … ms) runs its blocks again every so many milliseconds, so it can make a new enemy each time. -->

<!-- Speaker note: Teacher: the trace shows that only a touch changes the lives. Sam's dodger is the lesson's key bug: an overlap runs every frame while sprites touch. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the lives

**Play this dodge game in your head. Fill in the lives after each thing happens.**

| what happens | lives after |
|---|---|
| (start) | 3 |
| a rock hits the player | ? |
| a rock flies past | ? |
| a rock hits the player | ? |
| a rock hits the player | ? |

* Answer: 2, 2, 1, 0

<!-- Speaker note: Only a touch runs the Player–Enemy event, so a rock that flies past changes nothing. At 0 lives the engine ends the game. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the rocks

**The timer runs every 1000 ms. How many rocks has it made after 10 seconds?**

* Answer: 10

<!-- Speaker note: 1000 milliseconds is one second, so the timer runs once a second: 10 times in 10 seconds, one new rock each time. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sam's dodger

Sam's overlap event:

![h:136](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4157f57f428e.png?v=ed56f0b2eaaa871f)

**Sam's player touches one rock and the game is over straight away, though he started with 3 lives. Why?**

- changeLifeBy(-1) takes away all the lives
- The timer ends the game after one rock
- setLife(3) only gives one life
- The rock is not destroyed, so the overlap event runs again every frame while they touch

* Answer: The rock is not destroyed, so the overlap event runs again every frame while they touch

<!-- Speaker note: An overlap event runs every frame (about 30 times a second) while the two sprites still touch. The rock is still touching after the first life is gone, so the next frame takes another. Destroy the rock (or move it away) in the event. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Faster rocks:** Make a rock come every **half a second**. Is it still possible to survive?
- **Extra life:** Put a **heart** (kind Food) in the middle of the screen. Collecting it gives an extra life.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-score-lives/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The number in the timer sets how often it runs: a smaller number means more often. A new kind of item needs its own overlap event. Hints, in order: Change 1000 in on game update every. Half a second is 500 ms. / Make a heart sprite of kind Food and place it in the middle. / Add an on overlap event for Player and Food. Inside: change life by 1, then destroy otherSprite. For students who need more support: Give students the timer block with the enemy already inside, and ask them to add lives, the countdown and the overlap event. For early finishers: Make the game a win if you survive: add on countdown end (Info) with game over (win). Then add a coin worth points so there is something to chase as well as dodge. The hard part, on purpose: An overlap runs every frame while sprites touch, so one hit takes every life. Ask what happens to the enemy after it touches the player. When students get stuck: One touch ends the game. Ask: What happens to the enemy after it touches the player? Fix: Nothing, so the overlap runs again next frame. Add destroy otherSprite inside the overlap event. / No enemies appear. Ask: Where does each enemy start, and which way does it move? Fix: Start at x 160 and give a negative vx. With a positive vx it leaves the screen to the right at once. / Only one enemy ever appears. Ask: Is the create block inside the timer, or in on start? Fix: Move it into on game update every 1000 ms, so a new one is made each second. / No hearts at the top of the screen. Ask: Is there a set life block in on start? Fix: Add set life to 3 (Info). Lives appear only once they are set. -->

<!-- Speaker note: Teacher: a smaller timer number means more often. The heart needs its own Player–Food event, revisiting lesson 3. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **30-second dodge game** (bats in a cave, asteroids, traffic):

- the player starts with **3 lives**
- a **countdown** of 30 seconds: survive it to finish
- every second, a new **enemy** flies in from the **right edge** at a **random height**
- each touch takes **one** life

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-score-lives/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: In on start: set life to 3 and start countdown 30 (both in Info). / Timer: on game update every 1000 ms (Game). Inside, create an Enemy, set its position to x 160 and y pick random 10 to 110, and set its vx to a negative number. / Overlap Player with Enemy: change life by -1, and destroy otherSprite so one touch takes only one life. -->

<!-- Speaker note: Teacher: x 160 is the right edge, negative vx flies left. Students who forget destroy will lose all three lives at once: let them find it, then ask which lesson task it reminds them of. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a rain dodger

Someone is walking home in the rain without an umbrella. Make the rain heavier (more drops, falling faster), then give the walker 5 lives and a 40-second walk home.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-score-lives/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**In a dodge game one touch takes all three lives. What one block is missing, and why does it matter?**

* destroy otherSprite in the Player–Enemy overlap. The overlap runs every frame while the sprites touch, so without it the same enemy takes a life each frame.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next unit the game decides things every frame: if a sprite leaves the screen, wrap it round; if the player is in a safe zone, no harm. Class ideas: a road-crossing game; a 'catch the good, dodge the bad' rain of fruit and rocks; vote on the fairest number of lives and timer speed. -->
