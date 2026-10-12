---
marp: true
theme: default
html: true
---

# If, every frame

MakeCode Arcade · Decide

<!-- Speaker note: Students put an if inside on game update to make wrap-around and a safe zone, and find that an if in on start is asked only once. About 45 minutes (Predict and Run 8 min · Investigate 12 min · Modify 12 min · Make 10 min · Lift 3 min). -->

---

## Today

**We are learning to** put an if inside on game update, so the game keeps checking a question while it runs.

- I can put an if inside on game update so the game keeps checking a question.
- I can compare a sprite's x or y with a number using &lt; and &gt;.
- I can explain why an if in on start does not keep checking.

<!-- Speaker note: Before class: An **if** block asks a yes-or-no question (a **condition**), such as *car x > 160*. When the answer is yes (**true**), it runs the blocks inside; when no (**false**), it skips them. The new idea is **when** the question is asked. A game draws the screen again about **30 times a second**; each drawing is a **frame**. **on game update** runs its blocks once every frame, so an if inside it is asked over and over, and acts the moment the answer becomes yes. **on start** runs its blocks once, before the game begins. An if there is asked one time and then forgotten: this is the planted misconception (Sam's version). Remember y counts **down** the screen, so "near the top" is a **small** y. The comparison block is in **Logic**; the car x block is in **Sprites**. Try the Make task yourself first. Teacher: Lift: no new ideas; the third floor is a bigger y than the top. -->

---

## Why it matters

> In Pac-Man, go off one side of the screen and you come back on the other. The game is asking 'has Pac-Man gone off the edge?' many times every second.

<!-- Speaker note: A game needs to **decide**: has the car gone off the screen? Is the player in the safe zone? An **if** block (in **Logic**) asks a yes-or-no question, such as *is car x more than 160?* If the answer is yes (**true**), it runs the blocks inside. If no (**false**), it skips them. But **when** is the question asked? That depends on where the if sits. **on game update** (in **Game**) runs its blocks **every frame**: about 30 times a second, for as long as the game runs. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:290](https://tutorials.learningwaypoints.com/_pictures/makecode/code/01cf15795937.png?v=69cf1a87048a295d)

**The car drives right at speed 50. What happens when it reaches the right edge?**

- It comes back in on the left, again and again
- It stops at the edge
- It bounces back to the left
- It drives off the screen and is gone

<!-- Speaker note: What happens: It comes back in on the left, again and again. on game update asks 'is car x more than 160?' every frame; once the car is past the edge the answer is yes, so its x is set to 0. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students expect the car to vanish, or to bounce. Wrap-around is a surprise. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It comes back in on the left, again and again. on game update asks 'is car x more than 160?' every frame; once the car is past the edge the answer is yes, so its x is set to 0.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/arcade/arcade-if/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/arcade/arcade-if/?full=step-2#step-2)

<!-- Speaker note: Watch the car for a few laps. This is called **wrap-around**. Students should be able to say: I watched the car reach the edge a few times and compared it with my prediction. -->

<!-- Speaker note: Teacher: ask 'who moves the car back?' Point at the if: the game asks this 30 times a second. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:290](https://tutorials.learningwaypoints.com/_pictures/makecode/code/01cf15795937.png?v=69cf1a87048a295d)

<!-- Speaker note: What this step is for: on game update runs its blocks every frame, so an if there keeps asking its question and acts the moment it becomes true; an if in on start is asked once, before the game begins. -->

<!-- Speaker note: Teacher: the number task is 150 pixels at 50 a second. Then Sam's version: let them run it, see the car disappear, and drag the if into on game update. Say: on start is once, on game update is always. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## How long until it wraps?

**The car starts at x 10 and moves 50 pixels every second. After how many seconds does it first jump back to the left?**

* Answer: 3

<!-- Speaker note: It must get from 10 to past 160: that is 150 pixels. At 50 pixels a second, that takes 3 seconds. Until then the question is asked every frame and the answer is no. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## How often?

**About how often does the if inside on game update ask 'is car x more than 160?'**

- Only when the car reaches the edge
- Once, when the game starts
- Once a second
- About 30 times a second, for as long as the game runs

* Answer: About 30 times a second, for as long as the game runs

<!-- Speaker note: on game update runs every frame, about 30 times a second. Most of the time the answer is no and nothing happens; the frame the car is past the edge, the answer is yes. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sam's tidy version

Sam's program (it is in the playground: run it):

![h:312](https://tutorials.learningwaypoints.com/_pictures/makecode/code/a49e12760bf0.png?v=21855b14fd52add2)

Fix it: drag the if into an **on game update** block.

**Sam thought on game update was untidy, so he moved the if into on start (the playground has his version). The car drives off the screen and never comes back. Why?**

- on start runs once, before the game begins: the if asks its question one time, when the car is at x 10, and never again
- x can never be more than 160
- An if only works with a button
- The car is too fast for the if to see it

* Answer: on start runs once, before the game begins: the if asks its question one time, when the car is at x 10, and never again

<!-- Speaker note: Blocks in on start run once, at the start. Then the car is at x 10, so the answer is no, and the question is never asked again. To keep checking, the if must be in on game update. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Both ways:** Now you drive the car (left and right arrows). Drive off the right: it wraps. Drive off the left: it is lost. Add a second **if** so the left edge wraps too.
- **Count the laps:** Score a point each time the car wraps around the right edge.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-if/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each edge needs its own question; anything can go inside the if, such as a point for every lap. Hints, in order: Drag in a second if, under the first one, inside on game update. / Ask 'car x < 0', and set car x to 160 inside it. / change score by is in Info. / Put it inside the first if, under set car x to 0. For students who need more support: Give students the on game update block with an empty if already in it, and ask them only to build the question and choose the colour. For early finishers: Make the safe zone a box in the middle of the screen: the hero is safe only when x and y are both inside it (an if inside an if). The hard part, on purpose: An if in on start is asked once; in on game update it's asked every frame. When the if never acts, ask which block it is inside. When students get stuck: The if never does anything. Ask: Which block is your if inside: on start or on game update? Fix: on start asks once, before anything moves. Drag the if into on game update. / The safe zone colour comes on at the bottom of the screen. Ask: Which way does y count? Fix: Down from the top, so near the top is y < 30, not y > 90. / The score shoots up while the car is still on the screen. Ask: Is change score inside the if, or just inside on game update? Fix: Outside the if, it runs every frame. Drag it inside the if, under set car x to 0. -->

<!-- Speaker note: Teacher: the left edge is a second if with < 0. Laps: change score goes inside the first if, so it happens only when the car wraps. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **safe zone** at the top of the screen. Move the hero with the arrow keys.

- When the hero is in the top **30** pixels, the background turns a different colour.
- When the hero leaves, the colour goes back (a second **if**).

Remember: y counts **down**, so the top of the screen is a **small** y.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-if/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: You need an on game update block with an if inside. The question is about hero y. / Near the top is a small y: ask 'hero y < 30'. Inside, set the background colour. / A second if, 'hero y ≥ 30', can set the colour back. -->

<!-- Speaker note: Teacher: two ifs, one for in the zone and one for out of it. The colour block is in Scene. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a lift

This lift rises up the building and, at the top, goes straight back to the ground floor. Make it slower, and make it go back to the ground floor from the **third floor** (about y 40) instead of the top.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-if/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does an if that checks 'player x &gt; 150' work in on game update but not in on start?**

* on game update runs every frame, so the question keeps being asked while the player moves. on start runs once, before the game begins, so the question is asked one time and never again.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: else, and an enemy that chases you by comparing its position with yours. Class ideas: a screen where all four edges wrap (like Asteroids); a 'lava floor' that changes colour when the player is near the bottom. -->
