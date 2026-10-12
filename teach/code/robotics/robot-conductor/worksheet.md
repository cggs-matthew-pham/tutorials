---
title: "Conductor and dancers"
subtitle: "Robotics challenges · Talk · Lesson 8"
---

# Conductor and dancers

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** In a drone light show, hundreds of drones move together. They do not watch each other: each one waits for a signal, then does its part of the show.


:::teacher-note

**In one sentence:** Students make a conductor micro:bit that plays a tune phrase by phrase and sends a radio cue as each phrase starts; robots dance the move for each cue, so the dance keeps in time with the music.

**Students should be able to say:** I can send a radio cue at the moment a phrase of music starts. I can make a robot do a different move for each cue it receives. I can explain why playing music until done keeps the cues in time.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/39ceebab12a6.png?v=81f7d89fc6dd595a)

:::keep-together

**You press A on the first micro:bit. When does the second robot spin?**

☐ Never: only the first robot can hear the tune

☐ After the whole tune has finished

☐ When the second phrase of the tune starts

☐ Straight away, at the same time as the wiggles

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** When the second phrase starts. phraseA plays its music until done, and only then does phraseB send cue 2, so the spin starts with the second phrase.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/39ceebab12a6.png?v=81f7d89fc6dd595a)

:::keep-together

### The quiet robot

**Why does the first robot (the conductor's) not dance?**

☐ Only one robot can dance at a time

☐ It is too busy playing music

☐ Its motors are switched off

☐ A micro:bit never hears its own radio messages, so it never receives the cues

:::


:::teacher-note

**Answer:** A micro:bit never hears its own radio messages, so it never receives the cues

The cues come from the first micro:bit, and a micro:bit never receives its own messages. Any other micro:bit in the group, and its robot, would dance.

:::


:::keep-together

### Lily's show

Lily's conductor:

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/6d97f01bb74f.png?v=2c675b7b77ef69a2)

**Lily changed the music to play in the background. Now her robot does all its moves at once, before the tune reaches phrase 2. Why?**

☐ Background music is faster

☐ The radio is too slow

☐ In the background, the program does not wait for the music, so cue 2 is sent straight after cue 1

☐ She needs a pause in on radio received

:::


:::teacher-note

**Answer:** In the background, the program does not wait for the music, so cue 2 is sent straight after cue 1

'in background' starts the music and moves on at once. phraseB runs straight away and sends cue 2, so the robot gets both cues together. 'until done' waits for each phrase to finish.

:::


:::typical

## Modify


**Up above the world.** Twinkle's third phrase is **G G F F E E D -** ("up above the world so high"). Add it as **phraseC**, with cue **3** and a new move for the robot.

**Light show.** Make the robot's lights change **colour** with each cue, like a stage show.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Up above the world:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/8ee264d7c594.png?v=1ef96607b3b407a7)

**Light show:**

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/e0e71185bdb8.png?v=59eb942e0ba56c92)

:::

:::


## Make

Make your own **robot show** to a tune you know (or make one up):

- three **phrases**, each a function that sends a cue, then plays its notes until done
- **A+B** plays the whole tune
- each cue makes the robot do a **different** move

Ideas for notes: *Mary Had a Little Lamb* starts **E D C D E E E -**.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/1524516b2b4a.png?v=c5c81494a1ce8ef5)

:::


:::wider

## On a real robot

With real robots, one micro:bit (not in a robot) is the conductor and every robot in the same radio group dances. Things to notice:

- Every robot hears the cue at the same moment, so a whole class of robots can dance together.
- Real robots on different floors move different distances, so dancers drift apart over a long show. Short moves that end with a stop keep them together.
- A loud room drowns out a micro:bit speaker; a micro:bit plugged into a speaker helps.

:::


## Exit ticket

:::keep-together

**Why does each phrase play its music until done before the next phrase starts?**

{{lines-3}}

:::


:::teacher-note

**Answer:** So the next cue is only sent when the music reaches the next phrase. The robots then move in time with the tune.

:::

