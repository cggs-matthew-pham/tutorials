---
marp: true
theme: default
html: true
---

# Power-ups

MakeCode Arcade · Final challenge: Space dodger

<!-- Speaker note: Students add power-ups to Space dodger, a shield kept in a true/false variable that runs out on a timer, a blaster with limited ammo, and a power-up of their own design. About 60 minutes (Predict, Run, Investigate 12 min · Milestone 1 12 min · Milestone 2 15 min · Milestone 3 15 min · Sprint boost 5 min). -->

---

## Today

**We are learning to** add a shield that runs out and a blaster with limited ammo to Space dodger, then design a power-up of your own.

- I can use a true/false variable to remember whether a power-up is on.
- I can make a power-up run out with a number that counts down in a timer.
- I can say which jobs Arcade's engine does and which rules my blocks decide.

<!-- Speaker note: Before class: The only new idea is a variable that holds **true** or **false** (in Logic). `shield` is true while the shield is on; the Player–Enemy overlap asks **if shield** to decide between 5 points and losing a life. A power-up is always three parts: a **variable** that remembers it, an **event** that changes it (catching a star), and a **rule** that uses it (the if in the overlap). Milestone 1 makes it run out: `shieldTime` starts at 5 and the 1-second timer counts it down; at 0 the shield goes off. Milestone 2 adds a number variable, `ammo`, that limits the A button. The Investigate match introduces a thread for lesson 13: **the engine** (velocity, overlaps noticed, game over at zero lives, auto destroy) does the same jobs in every game, while **game rules** are the blocks you write. Teacher: Sam's shield revisits the If lesson: on start runs once, so an if there is asked once. Ask where a check that keeps happening must go. Teacher: Milestone 1: an if inside an if. Read it aloud: 'every second, if the shield is on, count down; if it reached zero, switch it off'. Teacher: Milestone 2: the prize is random, so students may need a few stars to test the blaster. They can set prize to 1 while testing. Teacher: Milestone 3: goals only. Ask each student to say their power-up as three parts: variable, event, rule. Teacher: Sprint boost: the same pattern with a button instead of a star. -->

---

## Why it matters

> A mushroom in Mario, a power pellet in Pac-Man, a shield in a space shooter: each one is a variable that changes the rules for a while.

<!-- Speaker note: Your Space dodger now has a yellow **star** that floats past every 5 seconds. Catch it and you get a **shield**: while the shield is on, a rock that hits you is smashed for 5 points instead of costing a life. You will add three power-ups, one milestone each, with less help each time. **Behind the code:** a variable can hold **true** or **false** (in **Logic**). `shield` is true while the shield is on. **if shield** asks whether it is true right now. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/fcbeec67eac9.png?v=f57e507894573aa9)

**You catch one star. How long does the shield last?**

- For the rest of the game
- One frame
- 5 seconds
- Until the next rock hits you

<!-- Speaker note: What happens: For the rest of the game. Catching the star sets shield to true, and no block ever sets it back to false. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the shield never ends. Ask: is this fair? What would make it fair? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* For the rest of the game. Catching the star sets shield to true, and no block ever sets it back to false.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/arcade/arcade-powerups/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/arcade/arcade-powerups/?full=step-2#step-2)

<!-- Speaker note: Catch a star, then fly into the rocks. Is this power-up fair? Students should be able to say: I caught a star and saw the shield never ran out. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/fcbeec67eac9.png?v=f57e507894573aa9)

<!-- Speaker note: Play again and look at which blocks you wrote and which jobs Arcade does for you. What this step is for: Arcade's engine moves sprites, notices touches and ends the game; the rules (what a touch means, when a power-up is on) are the blocks you write, and a true/false variable is how those rules remember what is happening now. -->

<!-- Speaker note: Teacher: there is no trick; the aim is to name the split. Ask students for one more example of each. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Game rule or engine?

**Who decides each thing: Arcade's engine, or a game rule in your blocks? Match them.**

| | |
|---|---|
| `Each rock slides left a little every frame` | A. engine: auto destroy removes it |
| `The game ends when the lives reach 0` | B. engine: info ends the game at zero lives |
| `A star that leaves the screen is removed` | C. game rule: your if decides |
| `Catching a star turns the shield on` | D. game rule: your overlap event decides |
| `A rock costs no life while the shield is on` | E. engine: velocity moves it every frame |

* Answer: Each rock slides left a little every frame → E. engine: velocity moves it every frame; The game ends when the lives reach 0 → B. engine: info ends the game at zero lives; A star that leaves the screen is removed → A. engine: auto destroy removes it; Catching a star turns the shield on → D. game rule: your overlap event decides; A rock costs no life while the shield is on → C. game rule: your if decides

<!-- Speaker note: The engine does the same jobs in every game. The rules are what make this game yours, and they are where the bugs (and the fun) live. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Shield on, shield off

Trace a rock hitting the ship.

```python
def on_overlap(sprite, otherSprite):
    otherSprite.destroy()
    if shield:
        info.change_score_by(5)
    else:
        info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_overlap)
```

The same overlap event in Python: `if shield:` asks whether `shield` is `True`.

**Fill in what happens when a rock hits the ship.**

| shield | lives before | lives after | score change |
|---|---|---|---|
| false | 3 | ? | ? |
| true | 3 | ? | ? |
| false | 1 | ? | ? |

* Answer: 2, 0, 3, 5, 0, 0

<!-- Speaker note: The if asks shield every time a rock hits. True: 5 points and no life lost. False: lose a life (and at 0 lives the engine ends the game). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sam's shield

![h:264](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ae20cc71550e.png?v=810be60a19dafabd)

**Sam wants the shield to switch off when shieldTime reaches 0. He puts the blocks below in on start. He catches a star, and shieldTime counts down to 0. What happens to the shield?**

- It switches off at 0
- It switches off straight away
- It never switches off: the if was asked once, at the start, before the star was caught
- The game ends

* Answer: It never switches off: the if was asked once, at the start, before the star was caught

<!-- Speaker note: Blocks in on start run once, before the game begins. The if is never asked again. A check that must keep happening goes in a timer or in on game update. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: the shield runs out

A new variable, `shieldTime`, is set to **5** when you catch a star.

1. Every second while the shield is on, take 1 off `shieldTime`.
2. When `shieldTime` reaches **0**, set `shield` to **false** and put the black background back.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-powerups/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A number that counts down in a timer turns a true/false variable back off, so a power-up lasts a set time. Hints, in order: Catching a star already sets shieldTime to 5. In the timer that runs every 1000 ms, add: if shield, change shieldTime by -1. / Inside that if, add another: if shieldTime = 0, set shield to false and set the background back to colour 15 (black). For students who need more support: A student who finishes Milestone 1 has the key idea. For Milestone 3, offer the extra life (change life by 1) as a first power-up, then ask for one more of their own. For early finishers: Show the ammo on screen: a sprite's say block (Sprites, say) can show 'ammo 3' above the ship after each shot. The hard part, on purpose: A true/false variable switched on and off at the right moments. Ask where the shield is set to true and false, and when each block runs. When students get stuck: The shield switches off straight away, or never switches on. Ask: Where is shield set to false, and when does that block run? Fix: Only inside the if shieldTime = 0, inside the if shield, inside the timer. / The shield never runs out. Ask: Is the countdown inside a timer, or in on start? Fix: Move it into on game update every 1000 ms; on start runs only once. / A fires forever, or never. Ask: What is ammo at the start, and where does it change? Fix: ammo starts at 0, a prize-1 star sets it to 5, and each shot changes it by -1, all inside if ammo > 0. / Shots pass through rocks. Ask: Which kinds does your overlap event name? Fix: A shot is a Projectile, so the event must be Projectile overlaps Enemy. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: a blaster with limited ammo

Now a star gives a random prize: `prize` is 0 (the shield) or 1 (the blaster, still empty).

- Prize 1 sets `ammo` to **5**.
- **A** (space on the keyboard) fires a shot only **if ammo > 0**, and each shot takes 1 from `ammo`.
- A shot that hits a rock destroys both.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-powerups/?full=step-5#step-5)

<!-- Speaker note: What this step is for: A number variable limits an action: the button event asks the variable first, and a power-up refills it. Hints, in order: In the else of the star overlap: set ammo to 5. Then add on A button pressed with if ammo > 0. / Inside the if: projectile from ship with vx 100, vy 0, then change ammo by -1. A Projectile–Enemy overlap destroys both and adds points. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Milestone 3: your own power-up

Design a **third power-up** and add it to the prizes:

- Decide what it does and how long it lasts.
- A star now picks one of **three** prizes.
- Play it: is it too strong, too weak, or just right?

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-powerups/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Designing a power-up from goals alone shows whether a student can turn a game idea into a variable, an event that changes it, and a rule that uses it. Hints, in order: Change prize to pick random 0 to 2, and add else if prize = 1 for the blaster. The last else is yours. / Ideas: an extra life, a slow-down (a variable the rock timer uses for vx), or a magnet that makes stars follow the ship. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a sprint boost

A runner with a sprint boost on **B** (enter on the keyboard): 3 seconds of extra speed, then back to normal. Make it a fair power-up. Ideas: the boost can only be used again after a rest, a counter of boosts left, or a background colour while boosting.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-powerups/?full=step-7#step-7)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name the three parts of a power-up in your game, using the shield as the example.**

* A variable that remembers it (shield), an event that changes it (catching a star sets it to true), and a rule that uses it (if shield, a rock costs no life).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Will it work in Arcade?, judging which games Arcade does well by the building blocks they need. Class ideas: a power-up design jam where pairs swap power-ups and rate them for fairness; draw a power-up card (name, variable, event, rule, how long). -->
