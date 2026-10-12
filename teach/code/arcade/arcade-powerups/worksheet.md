---
title: "Power-ups"
subtitle: "MakeCode Arcade · Final challenge: Space dodger · Lesson 12"
---

# Power-ups

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A mushroom in Mario, a power pellet in Pac-Man, a shield in a space shooter: each one is a variable that changes the rules for a while.


:::teacher-note

**In one sentence:** Students add power-ups to Space dodger, a shield kept in a true/false variable that runs out on a timer, a blaster with limited ammo, and a power-up of their own design.

**Students should be able to say:** I can use a true/false variable to remember whether a power-up is on. I can make a power-up run out with a number that counts down in a timer. I can say which jobs Arcade's engine does and which rules my blocks decide.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the two overlap events first. The background turns dark blue while the shield is on.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/fcbeec67eac9.png?v=f57e507894573aa9)

:::keep-together

**You catch one star. How long does the shield last?**

☐ For the rest of the game

☐ One frame

☐ 5 seconds

☐ Until the next rock hits you

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** For the rest of the game. Catching the star sets shield to true, and no block ever sets it back to false.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

Play again and look at which blocks you wrote and which jobs Arcade does for you.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/fcbeec67eac9.png?v=f57e507894573aa9)

:::keep-together

### Game rule or engine?

**Who decides each thing: Arcade's engine, or a game rule in your blocks? Match them.**

A. engine: auto destroy removes it

B. engine: info ends the game at zero lives

C. game rule: your if decides

D. game rule: your overlap event decides

E. engine: velocity moves it every frame

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `Each rock slides left a little every frame` | |
| `The game ends when the lives reach 0` | |
| `A star that leaves the screen is removed` | |
| `Catching a star turns the shield on` | |
| `A rock costs no life while the shield is on` | |

:::


:::teacher-note

**Answer:** Each rock slides left a little every frame → E. engine: velocity moves it every frame; The game ends when the lives reach 0 → B. engine: info ends the game at zero lives; A star that leaves the screen is removed → A. engine: auto destroy removes it; Catching a star turns the shield on → D. game rule: your overlap event decides; A rock costs no life while the shield is on → C. game rule: your if decides

The engine does the same jobs in every game. The rules are what make this game yours, and they are where the bugs (and the fun) live.

:::


:::keep-together

### Shield on, shield off

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

{{rows 1}}

| shield | lives before | lives after | score change |
|---|---|---|---|
| false | 3 |   |   |
| true | 3 |   |   |
| false | 1 |   |   |

:::


:::teacher-note

**Answer:** 2, 0, 3, 5, 0, 0

The if asks shield every time a rock hits. True: 5 points and no life lost. False: lose a life (and at 0 lives the engine ends the game).

:::


:::keep-together

### Sam's shield

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/ae20cc71550e.png?v=810be60a19dafabd)

**Sam wants the shield to switch off when shieldTime reaches 0. He puts the blocks below in on start. He catches a star, and shieldTime counts down to 0. What happens to the shield?**

☐ It switches off at 0

☐ It switches off straight away

☐ It never switches off: the if was asked once, at the start, before the star was caught

☐ The game ends

:::


:::teacher-note

**Answer:** It never switches off: the if was asked once, at the start, before the star was caught

Blocks in on start run once, before the game begins. The if is never asked again. A check that must keep happening goes in a timer or in on game update.

:::


:::typical

## Milestone 1: the shield runs out

A new variable, `shieldTime`, is set to **5** when you catch a star.

1. Every second while the shield is on, take 1 off `shieldTime`.
2. When `shieldTime` reaches **0**, set `shield` to **false** and put the black background back.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/3caedb68a828.png?v=95ce34b189d7b832)

:::

:::


:::typical

## Milestone 2: a blaster with limited ammo

Now a star gives a random prize: `prize` is 0 (the shield) or 1 (the blaster, still empty).

- Prize 1 sets `ammo` to **5**.
- **A** (space on the keyboard) fires a shot only **if ammo > 0**, and each shot takes 1 from `ammo`.
- A shot that hits a rock destroys both.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/58e703b1ea2e.png?v=86f60bb54937448f)

:::

:::


## Make: Milestone 3: your own power-up

Design a **third power-up** and add it to the prizes:

- Decide what it does and how long it lasts.
- A star now picks one of **three** prizes.
- Play it: is it too strong, too weak, or just right?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b8acd522f533.png?v=6a5fb2e909e02fa4)

:::


:::wider

## Change a sprint boost

A runner with a sprint boost on **B** (enter on the keyboard): 3 seconds of extra speed, then back to normal. Make it a fair power-up. Ideas: the boost can only be used again after a rest, a counter of boosts left, or a background colour while boosting.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**Name the three parts of a power-up in your game, using the shield as the example.**

{{lines-3}}

:::


:::teacher-note

**Answer:** A variable that remembers it (shield), an event that changes it (catching a star sets it to true), and a rule that uses it (if shield, a rock costs no life).

:::

