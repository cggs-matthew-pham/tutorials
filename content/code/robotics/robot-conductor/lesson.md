---
order: 8
unit: talk
title: Conductor and dancers
summary: One micro:bit plays a tune and sends a cue as each phrase starts; robots dance the move for each cue, in time.
language: makecode
extensions: [robot]
explainPicture: conductor.ts#predict
hook: "In a drone light show, hundreds of drones move together. They do not watch each other: each one waits for a signal, then does its part of the show."
---
A **conductor** micro:bit plays a tune, one **phrase** at a time. As each phrase starts, it sends a **cue** by radio: 1 for the first phrase, 2 for the second. Every robot that hears a cue dances the move for it, so the robots keep in time with the music.

**wiggle** and **spin** are the dance moves from lesson 2. In the simulator, press **A** on one micro:bit: it conducts, and the **other** robot dances.

## Predict

```step
stage: predict
code: conductor.ts#predict
check:
  type: predict
  q: "You press A on the first micro:bit. When does the second robot spin?"
  options: ["When the second phrase of the tune starts", "Straight away, at the same time as the wiggles", "After the whole tune has finished", "Never: only the first robot can hear the tune"]
  actual: "When the second phrase starts. phraseA plays its music until done, and only then does phraseB send cue 2, so the spin starts with the second phrase."
```

## Run

```step
stage: run
code: conductor.ts#predict
try: { playground: microbit, starter: "conductor.ts#predict" }
check: { type: reflect, text: "I pressed A, listened to the tune and watched when each move started." }
```

Press **A** on the first micro:bit. Listen to the tune (turn the sound on) and watch the second robot.

## Investigate

```step
stage: investigate
code: conductor.ts#predict
insight: "A cue is sent at the moment a phrase starts, and the robot acts when it arrives. Playing each phrase until done is what spaces the cues out in time."
tasks:
  - check:
      type: question
      q: "Why does the first robot (the conductor's) not dance?"
      options: ["Its motors are switched off", "A micro:bit never hears its own radio messages, so it never receives the cues", "It is too busy playing music", "Only one robot can dance at a time"]
      answer: 1
      explain: "The cues come from the first micro:bit, and a micro:bit never receives its own messages. Any other micro:bit in the group, and its robot, would dance."
  - check:
      type: question
      q: "Lily changed the music to play in the background. Now her robot does all its moves at once, before the tune reaches phrase 2. Why?"
      options: ["Background music is faster", "In the background, the program does not wait for the music, so cue 2 is sent straight after cue 1", "The radio is too slow", "She needs a pause in on radio received"]
      answer: 1
      fault: logic
      misconception: music-background-no-wait
      explain: "'in background' starts the music and moves on at once. phraseB runs straight away and sends cue 2, so the robot gets both cues together. 'until done' waits for each phrase to finish."
```

### The quiet robot

Watch the first robot while the second one dances.

### Lily's show

Lily's conductor:

```makecode
function phraseA () {
    radio.sendNumber(1)
    music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.InBackground)
}
function phraseB () {
    radio.sendNumber(2)
    music.play(music.stringPlayable("F F E E D D C - ", 120), music.PlaybackMode.InBackground)
}
input.onButtonPressed(Button.A, function () {
    phraseA()
    phraseB()
})
```

## Modify

```step
stage: modify
insight: "Each new part of the show is a phrase with its own cue on the conductor, and a branch with its own move on the dancers."
try: { playground: microbit, starter: "conductor.ts#modify" }
tasks:
  - hint: ["Duplicate phraseB and rename it phraseC. It sends 3 and plays G G F F E E D -.", "Call phraseC after phraseB on button A. Make a shuffle move (forward then back) and add else if receivedNumber = 3."]
    check: { type: code, text: "Add the third phrase: it sends cue 3, and the robot does a new move for it.", rules: { contains: ["radio.sendNumber(3)", "receivedNumber==3"] } }
  - hint: "robot set color is in Robot. Put one at the top of each branch in on radio received, each a different colour."
    check: { type: code, text: "The robot's lights change colour with each cue.", rules: { inside: { "radio.onReceivedNumber": ["robot.setColor("] }, count: { "robot.setColor(": 3 } } }
```

### Up above the world

Twinkle's third phrase is **G G F F E E D -** ("up above the world so high"). Add it as **phraseC**, with cue **3** and a new move for the robot.

### Light show

Make the robot's lights change **colour** with each cue, like a stage show.

## Make

```step
stage: make
try: { playground: microbit, starter: "conductor.ts#make" }
hint:
  - "Make phrase functions for your tune, each starting with send number and its own cue. Call them in order on A+B."
  - "Music notes: a letter for each note, - for a rest. Keep each phrase to about 8 notes. In on radio received, one branch per cue."
check: { type: code, text: "A show of your own: a tune in three phrases on A+B, each phrase sending its own cue to a different move.", rules: { count: { "music.play(": 3, "radio.sendNumber(": 3 }, contains: ["Button.AB"] } }
```

Make your own **robot show** to a tune you know (or make one up):

- three **phrases**, each a function that sends a cue, then plays its notes until done
- **A+B** plays the whole tune
- each cue makes the robot do a **different** move

Ideas for notes: *Mary Had a Little Lamb* starts **E D C D E E E -**.

## On a real robot

```step
stage: info
```

With real robots, one micro:bit (not in a robot) is the conductor and every robot in the same radio group dances. Things to notice:

- Every robot hears the cue at the same moment, so a whole class of robots can dance together.
- Real robots on different floors move different distances, so dancers drift apart over a long show. Short moves that end with a stop keep them together.
- A loud room drowns out a micro:bit speaker; a micro:bit plugged into a speaker helps.
