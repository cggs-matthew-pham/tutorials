---
order: 1
unit: drive
title: Drive with gestures
summary: A model's label reaches the robot as a word, and the robot turns it into a mode. The robot keeps acting on the last mode until a new label arrives.
language: makecode
extensions: [robot]
explainPicture: robot.ts#predict
hook: "Some wheelchairs and drones can be steered by head movements or hand signs instead of a joystick. A camera and a trained model turn each movement into a command."
---
You have trained a model (Train a recycling sorter), sent its labels to a micro:bit, and built a radio bridge (micro:bit and the computer). Now the labels drive a **robot**. Train a model with four hand gestures, **Forward**, **Left**, **Right** and **Stop**, and the bridge passes each label on to the robot by radio.

In the simulator, the micro:bit's buttons stand in for the model: **A** sends Left, **B** sends Right, **A+B** sends Forward and the **logo** sends Stop. With radio, the simulator shows two robots, and each micro:bit's buttons drive the **other** robot.

## Predict

```step
stage: predict
code: robot.ts#predict
check:
  type: predict
  q: "The model sends Forward. Then your hand leaves the camera and the board sends nothing more. What does the robot do?"
  options: ["Keeps driving forward", "Stops", "Turns left", "Drives forward for one second, then stops"]
  actual: "It keeps driving forward. on radio received string only sets the mode; forever keeps acting on the last mode until a new label arrives."
```

## Run

```step
stage: run
code: robot.ts#predict
try: { playground: microbit, starter: "robot.ts#predict" }
check: { type: reflect, text: "I drove the other robot with A, B, A+B and the logo, and saw that it keeps doing the last thing it was told." }
```

Press **A+B** on one micro:bit and watch the **other** robot. Then try **A**, **B** and the **logo**.

## Drive with your model

```step
stage: run
tier: typical
insight: "With a real model, each gesture becomes a word on the robot's radio, and the robot behaves exactly as it did with the buttons."
try: { playground: board, starter: "boards.yml#drive", height: 700 }
check: { type: board, text: "Drive the robot with your gestures: send Forward and Stop at least once each.", when: "sent_forward >= 1 and sent_stop >= 1" }
```

1. In Teachable Machine, train four classes named exactly **Forward**, **Left**, **Right** and **Stop** (a hand sign each), and export with **Upload my model**.
2. Download the robot program to the robot's micro:bit, and the **bridge program** below to a second micro:bit plugged into the computer.
3. Paste your model link, click **Load**, **Connect a micro:bit** (the bridge), then **Try it on the webcam**.

The bridge program (from A radio bridge):

```makecode
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    radio.sendString(serial.readLine())
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
radio.setGroup(7)
```

## Investigate

```step
stage: investigate
code: robot.ts#predict
insight: "The model only names a gesture; the robot's program decides what each name does and keeps doing it, so the label is a mode."
tasks:
  - check:
      type: question
      q: "Where is it decided that Left means turn left slowly?"
      options: ["In the robot's program", "In Teachable Machine", "In the bridge micro:bit", "In the board"]
      answer: 0
      explain: "The model sends the word Left. The robot's if turns that word into wheel speeds."
  - check:
      type: question
      q: "Mia named her class forward (small f). She shows the Forward sign. What does her robot do?"
      options: ["Stops: forward matches no branch, so else runs", "Drives forward", "Turns left", "Shows an error"]
      answer: 0
      explain: "Words must match exactly. Here the else is a safe default: a word the robot doesn't know makes it stop."
  - check:
      type: question
      q: "Why does on radio received string only set the mode, while forever drives the motors?"
      options: ["Messages arrive at any time; forever keeps driving between them and checks the mode every time round", "Radio blocks can't use motors", "It makes the radio faster", "Forever runs only when a message arrives"]
      answer: 0
      explain: "As in Robotics challenges: the handler remembers the latest command, and forever acts on it continuously."
```

### Who decides

### Mia's robot

### Mode and forever

## Modify

```step
stage: modify
insight: "A new gesture needs a new class in the model and a new branch on the robot; showing the mode helps you see what the robot heard."
try: { playground: microbit, starter: "robot.ts#predict" }
tasks:
  - hint: ["Add an else if: mode = Back, with robot motor tank −50 −50.", "For testing, shaking the micro:bit sends Back (on shake: radio send string Back)."]
    check: { type: code, text: "Add a Back label that drives the robot backwards (shake sends it in the simulator).", rules: { inside: { "basic.forever": ["mode==\"Back\"", "robot.motorTank(-50,-50)"] }, contains: ["radio.sendString(\"Back\")"] } }
  - hint: "In on radio received string, after setting the mode: show string, the first letter of the mode (Text › char from)."
    check: { type: code, text: "The robot's micro:bit shows the first letter of each label it hears.", rules: { inside: { "radio.onReceivedString": ["basic.showString(mode.charAt(0))"] } } }
```

### Back

Add a fifth label, **Back**. (With a real model, add a fifth class too.)

### Show what it heard

Make the robot's micro:bit show the **first letter** of each label it hears, so you can tell whether a wrong move came from the model or the code.

## Make

```step
stage: make
try: { playground: microbit, starter: "robot.ts#make" }
hint:
  - "In forever: one branch per label (Forward, Left, Right, Spin), else stop."
  - "Robot set color is in Robot: green when going forward, red when stopped. Shake sends Spin for testing."
check: { type: code, text: "A gesture robot with Forward, Left, Right and Spin, stopping for anything else, green lights going forward and red when stopped.", rules: { inside: { "basic.forever": ["mode==\"Forward\"", "mode==\"Left\"", "mode==\"Right\"", "mode==\"Spin\"", "robot.motorStop()", "robot.setColor(0xff0000)", "robot.setColor(0x00ff00)"] } } }
```

Make a **gesture robot** with four moves (**Forward**, **Left**, **Right**, **Spin**) that stops for any other word, with **green** lights while going forward and **red** when stopped. Add test-remote buttons so you can try it in the simulator.
