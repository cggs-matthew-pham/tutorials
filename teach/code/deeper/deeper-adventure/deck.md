---
marp: true
theme: default
html: true
---

# A text adventure

Deeper Python in the console · Errors and the adventure

<!-- Speaker note: Students combine the parser, the bag and the map into a text adventure in three milestones (take and drop, a locked shed, a win plus a change of their own), each starting from a working game. About 60 minutes (Predict, Run and Investigate 15 min · Milestone 1 15 min · Milestone 2 10 min · Milestone 3 20 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** put the parser, the bag and the map together into a text adventure, in three milestones, then make it your own.

- I can combine lists, dictionaries and a command loop into one program.
- I can add a rule to a game as one check in the right place.
- I can extend a program with a feature of my own and test it.

<!-- Speaker note: Before class: Read the unit primers first. The game keeps three dictionaries: `rooms` (descriptions), `exits` (each room's dictionary of directions) and `things` (each room's list of things). `here` is the current room and `bag` is a list. Each command is one `elif` branch inside `while True`. Milestone 1 moves a thing between `things[here]` and `bag`; Milestone 2 adds one check (`"key" not in bag`; `not in` is the opposite of `in`, said once in the text); Milestone 3 is goals only. Each milestone starts from a working version, so a student stuck on one can still do the next. Teacher: Milestone 1: the item moves between two lists. Act it out with a real object and two boxes. Teacher: Milestone 2: ask where the check must go: before here changes. Teacher: Milestone 3: pair students to play each other's adventures and report one bug. -->

---

## Why it matters

> Text adventures were among the first computer games, and the same pieces (a parser, an inventory, a map) still sit under every game.

<!-- Speaker note: You have built every piece: a parser that tidies and splits commands, a bag that grows and shrinks, and a map of rooms in dictionaries. Now put them together into a **text adventure**, in three milestones. Each milestone starts from a working game; the last one is yours. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
exits = {
    "hall": {"north": "kitchen", "east": "garden"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall", "east": "shed"},
}
here = "hall"
for move in ["north", "south", "west", "east", "east"]:
    if move in exits[here]:
        here = exits[here][move]
print(here)
```

**Which room does it print?**

- kitchen
- garden
- shed
- hall

<!-- Speaker note: What happens: shed. north to the kitchen, south back to the hall, west is not an exit from the hall (so nothing happens), east to the garden, east again to the shed. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw the map on the board and walk it with a counter. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=rooms+%3D+%7B%0A++++%22hall%22%3A+%22A+long+hall+with+a+creaky+floor.%22%2C%0A++++%22kitchen%22%3A+%22A+kitchen+that+smells+of+toast.%22%2C%0A++++%22garden%22%3A+%22A+garden+full+of+tall+grass.%22%2C%0A%7D%0Aexits+%3D+%7B%0A++++%22hall%22%3A+%7B%22north%22%3A+%22kitchen%22%2C+%22east%22%3A+%22garden%22%7D%2C%0A++++%22kitchen%22%3A+%7B%22south%22%3A+%22hall%22%7D%2C%0A++++%22garden%22%3A+%7B%22west%22%3A+%22hall%22%7D%2C%0A%7D%0Athings+%3D+%7B%0A++++%22hall%22%3A+%5B%22lamp%22%5D%2C%0A++++%22kitchen%22%3A+%5B%22key%22%5D%2C%0A++++%22garden%22%3A+%5B%5D%2C%0A%7D%0Abag+%3D+%5B%5D%0Ahere+%3D+%22hall%22%0Aprint%28rooms%5Bhere%5D%29%0Awhile+True%3A%0A++++command+%3D+input%28%22%3E+%22%29.strip%28%29.lower%28%29%0A++++words+%3D+command.split%28%29%0A++++if+command+%3D%3D+%22quit%22%3A%0A++++++++break%0A++++elif+command+%3D%3D+%22look%22%3A%0A++++++++print%28rooms%5Bhere%5D%29%0A++++++++print%28%22Exits%3A+%22+%2B+%22%2C+%22.join%28exits%5Bhere%5D%29%29%0A++++++++if+len%28things%5Bhere%5D%29+%3E+0%3A%0A++++++++++++print%28%22You+see%3A+%22+%2B+%22%2C+%22.join%28things%5Bhere%5D%29%29%0A++++elif+command+%3D%3D+%22bag%22%3A%0A++++++++print%28%22You+carry%3A+%22+%2B+%22%2C+%22.join%28bag%29%29%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22go%22%3A%0A++++++++if+words%5B1%5D+in+exits%5Bhere%5D%3A%0A++++++++++++here+%3D+exits%5Bhere%5D%5Bwords%5B1%5D%5D%0A++++++++++++print%28rooms%5Bhere%5D%29%0A++++++++else%3A%0A++++++++++++print%28%22You+can%27t+go+that+way.%22%29%0A++++%23+Milestone+1%3A+take+and+drop+go+here.%0A++++else%3A%0A++++++++print%28%22Try%3A+look%2C+go+north%2C+take+lamp%2C+drop+lamp%2C+bag+or+quit%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-adventure/?full=step-2#step-2)

<!-- Speaker note: Play it: `look`, `go north`, `look`, `bag`. You can see things but not take them yet. Each command is one branch of the `if` / `elif` chain inside the loop. Students should be able to say: I can find where each command is handled: look, bag, go and quit. -->

<!-- Speaker note: Teacher: ask students to find the branch that handles each command. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* shed. north to the kitchen, south back to the hall, west is not an exit from the hall (so nothing happens), east to the garden, east again to the shed.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 40 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-adventure/?full=step-3#step-3)

<!-- Speaker note: What this step is for: A text adventure is a loop around a parser, with the world stored in dictionaries and lists: every new feature is one more branch or one more entry. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where things are

**What is things["kitchen"]?**

- The bag
- {"south": "hall"}
- "A kitchen that smells of toast."
- ["key"], the list of things lying in the kitchen

* Answer: ["key"], the list of things lying in the kitchen

<!-- Speaker note: things maps each room to a list of what lies there. Taking something moves it from that list to the bag. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A new command

**Where would a new command, such as help, go?**

- In things
- In the rooms dictionary
- Before the loop
- A new elif branch in the loop

* Answer: A new elif branch in the loop

<!-- Speaker note: Each command is one branch: elif command == "help": and what it prints. The else at the end catches anything not understood. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: take and drop

Where the comment says **Milestone 1**, add two branches:

- `take lamp`: if the thing is in `things[here]`, remove it from there and append it to `bag`. If not, say it is not here.
- `drop lamp`: if it is in `bag`, remove it from the bag and append it to `things[here]`. If not, say you do not have it.

Test: take the lamp, carry it to the kitchen, drop it, `look`.

<!-- Speaker note: What this step is for: Taking moves an item from the room's list to the bag; dropping moves it back. Both check with in first. For students who need more support: Give students the take branch for Milestone 1 and ask them to write drop by mirroring it. For early finishers: Add a second item that must be used somewhere (light the lamp in a dark cellar), or a timer of moves that ends the game. The hard part, on purpose: Holding several parts in mind: the loop, the parser, the rooms and the bag. Point them back to the milestone list and have them test one command at a time. When students get stuck: Taking something says it is not here, though look shows it. Ask: Is the word being checked exactly as stored (small letters)? Fix: The command is lowered; store things in small letters too. / The shed opens without the key. Ask: Does the check happen before here = ... changes? Fix: Check where the way leads first, and only move if it is allowed. / The win message never appears. Ask: Is the win check inside the loop, after the commands? Fix: Put if "crown" in bag: at the end of the loop body, with break. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Milestone 1: take and drop

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=rooms+%3D+%7B%0A++++%22hall%22%3A+%22A+long+hall+with+a+creaky+floor.%22%2C%0A++++%22kitchen%22%3A+%22A+kitchen+that+smells+of+toast.%22%2C%0A++++%22garden%22%3A+%22A+garden+full+of+tall+grass.%22%2C%0A%7D%0Aexits+%3D+%7B%0A++++%22hall%22%3A+%7B%22north%22%3A+%22kitchen%22%2C+%22east%22%3A+%22garden%22%7D%2C%0A++++%22kitchen%22%3A+%7B%22south%22%3A+%22hall%22%7D%2C%0A++++%22garden%22%3A+%7B%22west%22%3A+%22hall%22%7D%2C%0A%7D%0Athings+%3D+%7B%0A++++%22hall%22%3A+%5B%22lamp%22%5D%2C%0A++++%22kitchen%22%3A+%5B%22key%22%5D%2C%0A++++%22garden%22%3A+%5B%5D%2C%0A%7D%0Abag+%3D+%5B%5D%0Ahere+%3D+%22hall%22%0Aprint%28rooms%5Bhere%5D%29%0Awhile+True%3A%0A++++command+%3D+input%28%22%3E+%22%29.strip%28%29.lower%28%29%0A++++words+%3D+command.split%28%29%0A++++if+command+%3D%3D+%22quit%22%3A%0A++++++++break%0A++++elif+command+%3D%3D+%22look%22%3A%0A++++++++print%28rooms%5Bhere%5D%29%0A++++++++print%28%22Exits%3A+%22+%2B+%22%2C+%22.join%28exits%5Bhere%5D%29%29%0A++++++++if+len%28things%5Bhere%5D%29+%3E+0%3A%0A++++++++++++print%28%22You+see%3A+%22+%2B+%22%2C+%22.join%28things%5Bhere%5D%29%29%0A++++elif+command+%3D%3D+%22bag%22%3A%0A++++++++print%28%22You+carry%3A+%22+%2B+%22%2C+%22.join%28bag%29%29%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22go%22%3A%0A++++++++if+words%5B1%5D+in+exits%5Bhere%5D%3A%0A++++++++++++here+%3D+exits%5Bhere%5D%5Bwords%5B1%5D%5D%0A++++++++++++print%28rooms%5Bhere%5D%29%0A++++++++else%3A%0A++++++++++++print%28%22You+can%27t+go+that+way.%22%29%0A++++%23+Milestone+1%3A+take+and+drop+go+here.%0A++++else%3A%0A++++++++print%28%22Try%3A+look%2C+go+north%2C+take+lamp%2C+drop+lamp%2C+bag+or+quit%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-adventure/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: a locked shed

This version adds a **shed** east of the garden, and take and drop work. Where the comment says **Milestone 2**, make the shed locked: if the way leads to `"shed"` and `"key" not in bag` (`not in` is the opposite of `in`), print `The shed is locked.` and stay where you are.

<!-- Speaker note: What this step is for: A rule of the world is one extra check in the right branch: here, a door that needs something in the bag. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Milestone 2: a locked shed

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=rooms+%3D+%7B%0A++++%22hall%22%3A+%22A+long+hall+with+a+creaky+floor.%22%2C%0A++++%22kitchen%22%3A+%22A+kitchen+that+smells+of+toast.%22%2C%0A++++%22garden%22%3A+%22A+garden+full+of+tall+grass.+A+locked+shed+stands+to+the+east.%22%2C%0A++++%22shed%22%3A+%22A+dusty+shed.+Something+glints+in+the+corner.%22%2C%0A%7D%0Aexits+%3D+%7B%0A++++%22hall%22%3A+%7B%22north%22%3A+%22kitchen%22%2C+%22east%22%3A+%22garden%22%7D%2C%0A++++%22kitchen%22%3A+%7B%22south%22%3A+%22hall%22%7D%2C%0A++++%22garden%22%3A+%7B%22west%22%3A+%22hall%22%2C+%22east%22%3A+%22shed%22%7D%2C%0A++++%22shed%22%3A+%7B%22west%22%3A+%22garden%22%7D%2C%0A%7D%0Athings+%3D+%7B%0A++++%22hall%22%3A+%5B%22lamp%22%5D%2C%0A++++%22kitchen%22%3A+%5B%22key%22%5D%2C%0A++++%22garden%22%3A+%5B%5D%2C%0A++++%22shed%22%3A+%5B%22crown%22%5D%2C%0A%7D%0Abag+%3D+%5B%5D%0Ahere+%3D+%22hall%22%0Aprint%28rooms%5Bhere%5D%29%0Awhile+True%3A%0A++++command+%3D+input%28%22%3E+%22%29.strip%28%29.lower%28%29%0A++++words+%3D+command.split%28%29%0A++++if+command+%3D%3D+%22quit%22%3A%0A++++++++break%0A++++elif+command+%3D%3D+%22look%22%3A%0A++++++++print%28rooms%5Bhere%5D%29%0A++++++++print%28%22Exits%3A+%22+%2B+%22%2C+%22.join%28exits%5Bhere%5D%29%29%0A++++++++if+len%28things%5Bhere%5D%29+%3E+0%3A%0A++++++++++++print%28%22You+see%3A+%22+%2B+%22%2C+%22.join%28things%5Bhere%5D%29%29%0A++++elif+command+%3D%3D+%22bag%22%3A%0A++++++++print%28%22You+carry%3A+%22+%2B+%22%2C+%22.join%28bag%29%29%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22go%22%3A%0A++++++++if+words%5B1%5D+in+exits%5Bhere%5D%3A%0A++++++++++++%23+Milestone+2%3A+the+shed+is+locked+unless+the+key+is+in+the+bag.%0A++++++++++++here+%3D+exits%5Bhere%5D%5Bwords%5B1%5D%5D%0A++++++++++++print%28rooms%5Bhere%5D%29%0A++++++++else%3A%0A++++++++++++print%28%22You+can%27t+go+that+way.%22%29%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22take%22%3A%0A++++++++if+words%5B1%5D+in+things%5Bhere%5D%3A%0A++++++++++++things%5Bhere%5D.remove%28words%5B1%5D%29%0A++++++++++++bag.append%28words%5B1%5D%29%0A++++++++++++print%28%22You+take+the+%22+%2B+words%5B1%5D+%2B+%22.%22%29%0A++++++++else%3A%0A++++++++++++print%28%22There+is+no+%22+%2B+words%5B1%5D+%2B+%22+here.%22%29%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22drop%22%3A%0A++++++++if+words%5B1%5D+in+bag%3A%0A++++++++++++bag.remove%28words%5B1%5D%29%0A++++++++++++things%5Bhere%5D.append%28words%5B1%5D%29%0A++++++++++++print%28%22You+drop+the+%22+%2B+words%5B1%5D+%2B+%22.%22%29%0A++++++++else%3A%0A++++++++++++print%28%22You+don%27t+have+a+%22+%2B+words%5B1%5D+%2B+%22.%22%29%0A++++else%3A%0A++++++++print%28%22Try%3A+look%2C+go+north%2C+take+lamp%2C+drop+lamp%2C+bag+or+quit%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-adventure/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 3: make it yours



- **Win:** The game ends with a win message when the **crown** is in the bag.
- **Your own touch:** Add something of your own: a room, a thing to find, a `help` command, a move counter, a second locked door.

<!-- Speaker note: What this step is for: Goals only: a win condition and a change of your own, using what the course has taught. Hints, in order: After the if / elif chain, still inside the loop: if "crown" in bag:, print a win message and break. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Milestone 3: make it yours

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=rooms+%3D+%7B%0A++++%22hall%22%3A+%22A+long+hall+with+a+creaky+floor.%22%2C%0A++++%22kitchen%22%3A+%22A+kitchen+that+smells+of+toast.%22%2C%0A++++%22garden%22%3A+%22A+garden+full+of+tall+grass.+A+locked+shed+stands+to+the+east.%22%2C%0A++++%22shed%22%3A+%22A+dusty+shed.+Something+glints+in+the+corner.%22%2C%0A%7D%0Aexits+%3D+%7B%0A++++%22hall%22%3A+%7B%22north%22%3A+%22kitchen%22%2C+%22east%22%3A+%22garden%22%7D%2C%0A++++%22kitchen%22%3A+%7B%22south%22%3A+%22hall%22%7D%2C%0A++++%22garden%22%3A+%7B%22west%22%3A+%22hall%22%2C+%22east%22%3A+%22shed%22%7D%2C%0A++++%22shed%22%3A+%7B%22west%22%3A+%22garden%22%7D%2C%0A%7D%0Athings+%3D+%7B%0A++++%22hall%22%3A+%5B%22lamp%22%5D%2C%0A++++%22kitchen%22%3A+%5B%22key%22%5D%2C%0A++++%22garden%22%3A+%5B%5D%2C%0A++++%22shed%22%3A+%5B%22crown%22%5D%2C%0A%7D%0Abag+%3D+%5B%5D%0Ahere+%3D+%22hall%22%0Aprint%28rooms%5Bhere%5D%29%0Awhile+True%3A%0A++++command+%3D+input%28%22%3E+%22%29.strip%28%29.lower%28%29%0A++++words+%3D+command.split%28%29%0A++++if+command+%3D%3D+%22quit%22%3A%0A++++++++break%0A++++elif+command+%3D%3D+%22look%22%3A%0A++++++++print%28rooms%5Bhere%5D%29%0A++++++++print%28%22Exits%3A+%22+%2B+%22%2C+%22.join%28exits%5Bhere%5D%29%29%0A++++++++if+len%28things%5Bhere%5D%29+%3E+0%3A%0A++++++++++++print%28%22You+see%3A+%22+%2B+%22%2C+%22.join%28things%5Bhere%5D%29%29%0A++++elif+command+%3D%3D+%22bag%22%3A%0A++++++++print%28%22You+carry%3A+%22+%2B+%22%2C+%22.join%28bag%29%29%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22go%22%3A%0A++++++++if+words%5B1%5D+in+exits%5Bhere%5D%3A%0A++++++++++++if+exits%5Bhere%5D%5Bwords%5B1%5D%5D+%3D%3D+%22shed%22+and+%22key%22+not+in+bag%3A%0A++++++++++++++++print%28%22The+shed+is+locked.%22%29%0A++++++++++++else%3A%0A++++++++++++++++here+%3D+exits%5Bhere%5D%5Bwords%5B1%5D%5D%0A++++++++++++++++print%28rooms%5Bhere%5D%29%0A++++++++else%3A%0A++++++++++++print%28%22You+can%27t+go+that+way.%22%29%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22take%22%3A%0A++++++++if+words%5B1%5D+in+things%5Bhere%5D%3A%0A++++++++++++things%5Bhere%5D.remove%28words%5B1%5D%29%0A++++++++++++bag.append%28words%5B1%5D%29%0A++++++++++++print%28%22You+take+the+%22+%2B+words%5B1%5D+%2B+%22.%22%29%0A++++++++else%3A%0A++++++++++++print%28%22There+is+no+%22+%2B+words%5B1%5D+%2B+%22+here.%22%29%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22drop%22%3A%0A++++++++if+words%5B1%5D+in+bag%3A%0A++++++++++++bag.remove%28words%5B1%5D%29%0A++++++++++++things%5Bhere%5D.append%28words%5B1%5D%29%0A++++++++++++print%28%22You+drop+the+%22+%2B+words%5B1%5D+%2B+%22.%22%29%0A++++++++else%3A%0A++++++++++++print%28%22You+don%27t+have+a+%22+%2B+words%5B1%5D+%2B+%22.%22%29%0A++++else%3A%0A++++++++print%28%22Try%3A+look%2C+go+north%2C+take+lamp%2C+drop+lamp%2C+bag+or+quit%22%29%0A++++%23+Milestone+3%3A+check+here+whether+the+player+has+won.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-adventure/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

Every game, from text adventures to open worlds, is this shape: a loop that reads input, rules that change the world, and the world stored as data. Next in this course: saving and loading the game with a file.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Which data structure would you use for the things in each room, and why?**

* A dictionary from room name to a list: look up the room by name, and the list grows and shrinks as things are taken and dropped.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Saving and loading the game is the next part of this course (files, then try for a missing file). Game engines use the same shape: a loop, input, rules and the world as data. -->
