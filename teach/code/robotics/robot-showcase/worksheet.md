---
title: "Showcase"
subtitle: "Robotics challenges · Final challenge: Showcase and Patrol · Lesson 10"
---

# Showcase

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Robot shows at theme parks and festivals are built like this: a library of moves, a soundtrack in sections, a cue for each section, and a stop button for safety.


:::teacher-note

**In one sentence:** The performance challenge. Students build a robot show in three milestones (a moves library, three cued phrases, then a finale and a safety stop), combining functions, radio cues, music and decisions.

**Students should be able to say:** I can build a library of moves as functions. I can cue each move from a phrase of music over radio. I can add a finale and a safety stop to a show.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/33a21fc45109.png?v=41a9b4191eae2940)

:::keep-together

**You press A+B on the first micro:bit. What does the second robot do?**

☐ Wiggles twice with pink lights during the first phrase, then spins with blue lights during the second

☐ Does every move at once

☐ Nothing, because the moves are in functions

☐ Spins first, then wiggles

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It wiggles twice (pink) as the first phrase starts, then spins (blue) when the second phrase starts. Each move sets its own lights at its start.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/33a21fc45109.png?v=41a9b4191eae2940)

:::keep-together

### Three layers

**Which layer of the show does each part belong to?**

Groups: Move, Cue, Dancer's choice

- wiggle: turn right, turn left, stop, with pink lights: {{field-15}}
- phraseB: send 2, then play F F E E D D C until done: {{field-15}}
- if receivedNumber = 2, call spin: {{field-15}}
- spin: turn for 1.2 seconds, stop, with blue lights: {{field-15}}

:::


:::teacher-note

**Answer:** wiggle: turn right, turn left, stop, with pink lights → Move; phraseB: send 2, then play F F E E D D C until done → Cue; if receivedNumber = 2, call spin → Dancer's choice; spin: turn for 1.2 seconds, stop, with blue lights → Move

:::


:::keep-together

### Slower wiggles

**The director wants every wiggle in the show to be slower. Where is the one place to change?**

☐ Inside the wiggle function

☐ Every place wiggle is called

☐ In on radio received

☐ In each phrase's notes

:::


:::teacher-note

**Answer:** Inside the wiggle function

Every call runs the same wiggle function, so changing its times once changes every wiggle in the show.

:::


:::typical

## Milestone 1: a moves library

The show so far has one move, **wiggle**, and one phrase. Add two more moves:

1. **spin**: its own colour, turn for 1.2 seconds, then stop.
2. **shuffle**: its own colour, forward a little, back a little, then stop.

Test each by calling it from wiggle's branch for a moment, then put wiggle back.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/2cacd7244af3.png?v=333bb20b37faf084)

:::

:::


:::typical

## Milestone 2: cue the show

Turn the moves into a show:

- Add **phraseB** (cue 2) and **phraseC** (cue 3), and play all three phrases in order on **A+B**.
- The dancer does a **different move** for each cue.

Twinkle's next phrases are **F F E E D D C -** and **G G F F E E D -**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5ee9b04f539a.png?v=9c9c6e01fe5b181d)

:::

:::


## Make: Milestone 3: finale and safety stop

Finish the show:

- A **finale**: a fourth phrase with cue **4**, and a big final move with **changing lights** that ends in a pose (stopped, with a picture on the micro:bit).
- A **safety stop**: touching the conductor's **logo** sends a cue that makes every dancer stop and turn its lights off.

Then make it yours: change the tune, the moves or the colours.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5b4478142f17.png?v=f3755720f9a1329d)

:::


:::wider

## On a real robot

For a class show, one micro:bit (not in a robot) conducts and every robot in its radio group dances. Practise on the real floor: moves that look right in the simulator often need longer or shorter times. A dancer finishes the move it is doing before it obeys the stop, so keep moves short. Real shows have a person whose only job is the stop button.

:::


## Exit ticket

:::keep-together

**In your show, what is a cue, and where does the robot decide what a cue means?**

{{lines-3}}

:::


:::teacher-note

**Answer:** A cue is the number a phrase sends by radio as it starts. The dancer decides what it means in on radio received, by choosing a move for each number.

:::

