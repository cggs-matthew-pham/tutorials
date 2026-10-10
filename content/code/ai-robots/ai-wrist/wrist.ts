// A wrist remote: starters and solutions (MakeCode JavaScript with the robot and Machine Learning blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// In class, the wrist micro:bit (a V2) runs a CreateAI model and the wrist part; the robot's micro:bit runs the robot
// part. Here one program holds both: with radio the simulator shows two micro:bits and two robots, and choosing an
// action in the ML panel makes a micro:bit send its command to the other robot. The practice actions stand in for the
// ones students train: walking for "push forward", waving for "tilt left", clapping for "tilt right", still for stop.

// region: predict
// Wrist: each action the model recognises becomes a command
ml.onStart(ml.event.Walking, function () {
    radio.sendString("Forward")
})
ml.onStart(ml.event.Waving, function () {
    radio.sendString("Left")
})
ml.onStart(ml.event.Clapping, function () {
    radio.sendString("Right")
})
ml.onStart(ml.event.Still, function () {
    radio.sendString("Stop")
})
// Robot: the same code as Drive with gestures
radio.onReceivedString(function (receivedString) {
    mode = receivedString
})
basic.forever(function () {
    if (mode == "Forward") {
        robot.motorTank(50, 50)
    } else if (mode == "Left") {
        robot.motorTank(-30, 30)
    } else if (mode == "Right") {
        robot.motorTank(30, -30)
    } else {
        robot.motorStop()
    }
})
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: sol-unknown
ml.onStart(ml.event.Walking, function () {
    radio.sendString("Forward")
})
ml.onStart(ml.event.Waving, function () {
    radio.sendString("Left")
})
ml.onStart(ml.event.Clapping, function () {
    radio.sendString("Right")
})
ml.onStart(ml.event.Still, function () {
    radio.sendString("Stop")
})
ml.onStart(ml.event.Unknown, function () {
    radio.sendString("Stop")
})
radio.onReceivedString(function (receivedString) {
    mode = receivedString
})
basic.forever(function () {
    if (mode == "Forward") {
        robot.motorTank(50, 50)
    } else if (mode == "Left") {
        robot.motorTank(-30, 30)
    } else if (mode == "Right") {
        robot.motorTank(30, -30)
    } else {
        robot.motorStop()
    }
})
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: sol-arrows
ml.onStart(ml.event.Walking, function () {
    radio.sendString("Forward")
    basic.showArrow(ArrowNames.North)
})
ml.onStart(ml.event.Waving, function () {
    radio.sendString("Left")
    basic.showArrow(ArrowNames.West)
})
ml.onStart(ml.event.Clapping, function () {
    radio.sendString("Right")
    basic.showArrow(ArrowNames.East)
})
ml.onStart(ml.event.Still, function () {
    radio.sendString("Stop")
    basic.showIcon(IconNames.Square)
})
radio.onReceivedString(function (receivedString) {
    mode = receivedString
})
basic.forever(function () {
    if (mode == "Forward") {
        robot.motorTank(50, 50)
    } else if (mode == "Left") {
        robot.motorTank(-30, 30)
    } else if (mode == "Right") {
        robot.motorTank(30, -30)
    } else {
        robot.motorStop()
    }
})
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: make
ml.onStart(ml.event.Still, function () {
    radio.sendString("Stop")
})
radio.onReceivedString(function (receivedString) {
    mode = receivedString
})
basic.forever(function () {
    robot.motorStop()
})
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: sol-make
ml.onStart(ml.event.Walking, function () {
    radio.sendString("Forward")
    basic.showArrow(ArrowNames.North)
})
ml.onStart(ml.event.Waving, function () {
    radio.sendString("Left")
    basic.showArrow(ArrowNames.West)
})
ml.onStart(ml.event.Clapping, function () {
    radio.sendString("Right")
    basic.showArrow(ArrowNames.East)
})
ml.onStart(ml.event.Jumping, function () {
    radio.sendString("Spin")
    basic.showIcon(IconNames.Diamond)
})
ml.onStart(ml.event.Still, function () {
    radio.sendString("Stop")
    basic.showIcon(IconNames.Square)
})
ml.onStart(ml.event.Unknown, function () {
    radio.sendString("Stop")
    basic.showString("?")
})
radio.onReceivedString(function (receivedString) {
    mode = receivedString
})
basic.forever(function () {
    if (mode == "Forward") {
        robot.motorTank(50, 50)
    } else if (mode == "Left") {
        robot.motorTank(-30, 30)
    } else if (mode == "Right") {
        robot.motorTank(30, -30)
    } else if (mode == "Spin") {
        robot.motorTank(60, -60)
    } else {
        robot.motorStop()
    }
})
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion
