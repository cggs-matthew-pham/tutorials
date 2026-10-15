---
marp: true
theme: default
html: true
---

# Tournament

micro:bit: talk and play · Final challenge: Reaction duel

<!-- Speaker note: An optional, harder extension of the Radio duel. Students keep a two-place scoreboard list, move a round into a function so rounds carry on, and end the tournament at three wins. About 60 minutes (Predict, Run, Investigate 10 min · Milestone 1 10 min · Milestone 2 15 min · Milestone 3 20 min · Class tournament 5 min). -->

---

## Today

**We are learning to** take the Radio duel further. A scoreboard kept in a list, rounds that start themselves, and a champion at three wins.

- I can keep a scoreboard in a list and update the right place.
- I can move a sequence into a function and call it from two places.
- I can end a game with a target, a message and a reset.

<!-- Speaker note: Before class: This lesson is **optional**: it is for students who finished the Radio duel and want a harder challenge. It needs nothing new. The scoreboard is a list of two numbers: **place 0 is this micro:bit's player**, place 1 is the other player. Because both micro:bits run the same program, each one sees the match from its own side (2 - 1 on one is 1 - 2 on the other). Adding a point uses *set value at 0 of scores to (get value at 0 of scores + 1)*. Milestone 2 moves the round into a function **startRound**, so the winner's micro:bit can start the next round by itself. Milestone 3 adds message **3** (champion) and a reset. Teacher: Milestone 1: two set value blocks, one in A (win) and one when 2 arrives (loss). Teacher: Milestone 2: moving blocks into a function, then calling it twice, is the same move as Milestone 1 of the duel. Teacher: Milestone 3: goals only. Ask pairs to agree what message 3 means before building. Teacher: Class tournament: real micro:bits make this a great end-of-unit event. -->

---

## Why it matters

> A tennis scoreboard, a chess clock and an esports bracket all do the same jobs: keep both scores, start the next round, and declare a winner.

<!-- Speaker note: This lesson goes further than the Radio duel, for two players. You will add three things, one milestone each: 1. A **scoreboard** kept in a list: place 0 for you, place 1 for the other player. 2. A **round function**, so the winner's micro:bit starts the next round by itself. 3. A **champion**: the first to three wins, and both micro:bits reset for a new tournament. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6180f8a2e1a7.png?v=d334629537f1816d)

**scores is [2, 1]. You press A+B. What does the micro:bit show?**

- 3
- 2, then -, then 1
- 21
- 1, then -, then 2

<!-- Speaker note: What happens: 2, then -, then 1. showScores shows place 0 (your score), a dash, then place 1 (the other player's). Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: 2 - 1. Ask which place is 'you'. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 2, then -, then 1. showScores shows place 0 (your score), a dash, then place 1 (the other player's).

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-tournament/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-tournament/?full=step-2#step-2)

<!-- Speaker note: Press **A+B**. Then change the numbers in the list and try again. Students should be able to say: I pressed A+B and read the scoreboard. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/6180f8a2e1a7.png?v=d334629537f1816d)

<!-- Speaker note: What this step is for: Both micro:bits run the same program, so each keeps its own player at place 0: the two scoreboards show the same match from opposite sides. -->

<!-- Speaker note: Teacher: the 'two sides' question is the key idea: same program, different point of view. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The scoreboard

**Match each block with what it does to the scoreboard.**

| | |
|---|---|
| `get value at 0 from scores` | A. adds one to your wins |
| `get value at 1 from scores` | B. the other player's wins |
| `set value at 0 of scores to (scores[0] + 1)` | C. your wins |

* Answer: get value at 0 from scores → C. your wins; get value at 1 from scores → B. the other player's wins; set value at 0 of scores to (scores[0] + 1) → A. adds one to your wins

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two sides of one match

**You lead 2 to 1. What does your partner's scoreboard show?**

- 1 - 2
- Nothing
- 3 - 0
- 2 - 1

* Answer: 1 - 2

<!-- Speaker note: Your partner's micro:bit runs the same program, but its place 0 is your partner. From their side it is 1 - 2. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: keep score

This is the duel with a scoreboard and a **showScores** function already made. Update `scores` when you win a round and when you lose one. Check with **A+B**.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-tournament/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each event updates the right place in the list: a win adds to place 0, a loss to place 1. Hints, in order: In A (you pressed first): set value at 0 of scores to (get value at 0 + 1). / When 2 arrives while racing (you lost): add 1 at place 1 instead. For students who need more support: Students who find this heavy can stop after Milestone 1: a working scoreboard is a good result. For early finishers: Keep a list of round times as well, and show the fastest reaction of the tournament on the champion's micro:bit. The hard part, on purpose: Each micro:bit keeps itself at place 0, so the two scoreboards are mirrored. Ask which place a win and a loss each add to. When students get stuck: Both scoreboards count the same player's wins. Ask: Which place does a loss add to? Fix: A win adds at place 0; a loss (2 arrives) adds at place 1. / Rounds stop after the first one. Ask: Where is startRound called after a win? Fix: Call startRound at the end of the winning branch in A. / The scores do not reset after a champion. Ask: Do both sides reset? Fix: Set scores to [0, 0] on the champion's side and when 3 arrives. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: the next round

Make a function **startRound** from the blocks inside **B**. After each round, both players see the scores, and the **winner's** micro:bit starts the next round.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-tournament/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Moving a sequence into a function lets a second event reuse it, so the game can carry on without a button press. Hints, in order: Make a function startRound and move everything inside B into it. B then calls startRound. / After a win: pause, call showScores, then call startRound. After a loss: pause and call showScores. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Milestone 3: champion

Finish the tournament:

- The first player to **3** wins: their micro:bit sends **3** and shows Champion.
- When **3** arrives, show Game over.
- Both scoreboards reset for the next tournament.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-tournament/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Ending a tournament joins every idea: a list item compared with a target, a new message in the code, and a function that resets the state. Hints, in order: After a win: if scores[0] = 3, send 3 and show Champion; else start the next round. / When 3 arrives: show Game over. A function newTournament sets scores back to [0, 0]; call it on both sides. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run a class tournament

With real micro:bits, run a knockout: each pair picks its own group number, winners move on and play each other. Ideas to make it yours: first to five, a sound for the champion, or showing the scores after every round on both sides.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-play/microbit-tournament/?full=step-7#step-7)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**You win a round. Why does your scoreboard add at place 0 while your partner's adds at place 1?**

* Both run the same program, and each keeps its own player at place 0. Your win is a loss on your partner's side.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This ends micro:bit Foundations. Robotics challenges comes next: each idea in the simulator, then on a real MOVE Motor. Class ideas: a class knockout bracket on the board; a rematch where students change one rule and explain why it is fairer. -->
