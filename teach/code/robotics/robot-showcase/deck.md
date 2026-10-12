---
marp: true
theme: default
html: true
---

# Showcase

Robotics challenges · Final challenge: Showcase and Patrol

<!-- Speaker note: The performance challenge. Students build a robot show in three milestones (a moves library, three cued phrases, then a finale and a safety stop), combining functions, radio cues, music and decisions. About 60 minutes (Predict, Run, Investigate 12 min · Milestone 1 12 min · Milestone 2 15 min · Milestone 3 18 min · Real robot 3 min (optional)). -->

---

## Today

**We are learning to** build a robot dance show to a tune in three milestones, from a moves library to a finale with an emergency stop.

- I can build a library of moves as functions.
- I can cue each move from a phrase of music over radio.
- I can add a finale and a safety stop to a show.

<!-- Speaker note: Before class: This is the performance strand's challenge, using lesson 2 (moves as functions), lesson 7 (radio numbers become moves) and lesson 8 (phrases send cues, then play until done). A show has three layers that change independently: **moves** (functions with lights), **cues** (phrase functions on the conductor) and the **dancer's choice** of move for each cue (on radio received). The milestones fade the help: Milestone 1 names the moves and gives their steps, Milestone 2 gives an outline, Milestone 3 gives goals only. Each starter is the previous milestone's solution, so a student who is stuck can still move on. Showcase and Patrol and alert together mark the course **Challenge complete**. In the simulator, two micro:bits and two robots appear; the conductor's own robot does not dance. A dancer finishes its current move before it obeys the stop cue (radio events wait their turn), so short moves make the stop feel quicker. The logo needs a micro:bit V2 (it shows in the simulator); with V1 micro:bits, use shake for the stop. Teacher: Milestone 1: two functions, each ending with a stop. Testing a new move by calling it from a branch is a real debugging habit. Teacher: Milestone 2: phraseB and phraseC are copies of phraseA with new notes and cues. Teacher: Milestone 3: let students design the finale. The check needs cue 4, a logo stop (cue 0) and at least five colour changes across the show. Teacher: Real robot (optional): a whole-class performance with one conductor. -->

---

## Why it matters

> Robot shows at theme parks and festivals are built like this: a library of moves, a soundtrack in sections, a cue for each section, and a stop button for safety.

<!-- Speaker note: Time to put the course together in a **show**. A conductor micro:bit plays a tune phrase by phrase and sends a cue as each phrase starts (lesson 8). Dancer robots do a move for each cue, and each move is a function with its own lights (lesson 2). You will build it in three milestones, with less help each time. In the simulator, press **A+B** on the first micro:bit to start the show; the **second** robot dances. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/33a21fc45109.png?v=41a9b4191eae2940)

**You press A+B on the first micro:bit. What does the second robot do?**

- Wiggles twice with pink lights during the first phrase, then spins with blue lights during the second
- Does every move at once
- Nothing, because the moves are in functions
- Spins first, then wiggles

<!-- Speaker note: What happens: It wiggles twice (pink) as the first phrase starts, then spins (blue) when the second phrase starts. Each move sets its own lights at its start. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: point out that each move sets its own lights first. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It wiggles twice (pink) as the first phrase starts, then spins (blue) when the second phrase starts. Each move sets its own lights at its start.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/robotics/robot-showcase/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/robotics/robot-showcase/?full=step-2#step-2)

<!-- Speaker note: Press **A+B** on the first micro:bit, with the sound on if you can. Students should be able to say: I started the show and watched the moves and lights change with the music. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/33a21fc45109.png?v=41a9b4191eae2940)

<!-- Speaker note: What this step is for: A show has three layers: moves (functions), cues (phrases that send a number, then play until done), and the dancer's choice of move for each cue. Each layer can change without touching the others. -->

<!-- Speaker note: Teacher: the three layers are the lesson's big idea. Write Move / Cue / Choice as three columns on the board. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Three layers

**Which layer of the show does each part belong to?**

Groups: Move · Cue · Dancer's choice

wiggle: turn right, turn left, stop, with pink lights · phraseB: send 2, then play F F E E D D C until done · if receivedNumber = 2, call spin · spin: turn for 1.2 seconds, stop, with blue lights

* Answer: wiggle: turn right, turn left, stop, with pink lights → Move; phraseB: send 2, then play F F E E D D C until done → Cue; if receivedNumber = 2, call spin → Dancer's choice; spin: turn for 1.2 seconds, stop, with blue lights → Move

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Slower wiggles

**The director wants every wiggle in the show to be slower. Where is the one place to change?**

- Inside the wiggle function
- Every place wiggle is called
- In on radio received
- In each phrase's notes

* Answer: Inside the wiggle function

<!-- Speaker note: Every call runs the same wiggle function, so changing its times once changes every wiggle in the show. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: a moves library

The show so far has one move, **wiggle**, and one phrase. Add two more moves:

1. **spin**: its own colour, turn for 1.2 seconds, then stop.
2. **shuffle**: its own colour, forward a little, back a little, then stop.

Test each by calling it from wiggle's branch for a moment, then put wiggle back.

[Open this step](https://tutorials.learningwaypoints.com/code/robotics/robot-showcase/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A move library is a set of functions, each a short move with its own lights that ends with a stop. Hints, in order: In Advanced › Functions, make a function called spin, and another called shuffle. / spin: set color, motor tank 50 −50 for 1200 ms, stop. shuffle: set color, forward for 300 ms, back for 300 ms, stop. For students who need more support: Pair students: one writes the moves library, the other the phrases, then they agree the cue numbers. For early finishers: Two parts: give dancers a role variable (lead or chorus) so the same cue makes different robots do different moves. The hard part, on purpose: Keeping moves, cues and choices as separate layers. When a move never happens, ask which cue calls it and whether that branch checks the right number. When students get stuck: A move never happens. Ask: Is the function called from a branch, and does that branch check the right cue? Fix: Match the cue number in the phrase to the branch, and call the move there. / Moves happen all at once. Ask: Do the phrases play until done? Fix: Use play … until done in every phrase. / The stop does nothing. Ask: Which number does the logo send, and is there a branch (or else) for it? Fix: Send 0 from the logo; add an else at the end of on radio received that stops and turns the lights off. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: cue the show

Turn the moves into a show:

- Add **phraseB** (cue 2) and **phraseC** (cue 3), and play all three phrases in order on **A+B**.
- The dancer does a **different move** for each cue.

Twinkle's next phrases are **F F E E D D C -** and **G G F F E E D -**.

[Open this step](https://tutorials.learningwaypoints.com/code/robotics/robot-showcase/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Each phrase is a cue; the dancer needs one branch per cue. Hints, in order: phraseB sends 2 and plays F F E E D D C -. phraseC sends 3 and plays G G F F E E D -. / Call the phrases in order on A+B. In on radio received, add else if branches for 2 (spin) and 3 (shuffle twice). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Milestone 3: finale and safety stop

Finish the show:

- A **finale**: a fourth phrase with cue **4**, and a big final move with **changing lights** that ends in a pose (stopped, with a picture on the micro:bit).
- A **safety stop**: touching the conductor's **logo** sends a cue that makes every dancer stop and turn its lights off.

Then make it yours: change the tune, the moves or the colours.

[Open this step](https://tutorials.learningwaypoints.com/code/robotics/robot-showcase/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Combining functions, cues and decisions into a whole show is the course's ideas working together. Hints, in order: A fourth phrase sends 4. A finale function changes colour several times as it moves, then stops and shows a picture. / The logo sends 0. In on radio received, an else at the end stops the robot and turns its lights off. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## On a real robot

For a class show, one micro:bit (not in a robot) conducts and every robot in its radio group dances. Practise on the real floor: moves that look right in the simulator often need longer or shorter times. A dancer finishes the move it is doing before it obeys the stop, so keep moves short. Real shows have a person whose only job is the stop button.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**In your show, what is a cue, and where does the robot decide what a cue means?**

* A cue is the number a phrase sends by radio as it starts. The dancer decides what it means in on radio received, by choosing a move for each number.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Real-world links: theme-park animatronics, drone light shows, stage lighting desks with cue lists. For a class performance, assign each group a section of a longer tune. -->
