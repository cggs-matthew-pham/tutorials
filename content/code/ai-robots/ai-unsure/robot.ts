// When the model is unsure: starters and solutions (MakeCode JavaScript with the microbit-robot extension).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// The board sends Unsure when no label is confident enough, and repeats the current label every second, so the robot
// can stop when it hears nothing for a while (a watchdog). In the simulator, buttons stand in for the model.

// region: predict
radio.onReceivedString(function (receivedString) {
    mode = receivedString
    lastHeard = input.runningTime()
})
basic.forever(function () {
    if (input.runningTime() - lastHeard > 2000) {
        mode = "Stop"
    }
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
// Test remote: A+B sends Forward once (like a model that then goes quiet); B sends Unsure.
input.onButtonPressed(Button.AB, function () {
    radio.sendString("Forward")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("Unsure")
})
let lastHeard = 0
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion


// region: sol-quick
radio.onReceivedString(function (receivedString) {
    mode = receivedString
    lastHeard = input.runningTime()
})
basic.forever(function () {
    if (input.runningTime() - lastHeard > 1000) {
        mode = "Stop"
    }
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
input.onButtonPressed(Button.AB, function () {
    radio.sendString("Forward")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("Unsure")
})
let lastHeard = 0
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: sol-unsure
radio.onReceivedString(function (receivedString) {
    mode = receivedString
    lastHeard = input.runningTime()
})
basic.forever(function () {
    if (input.runningTime() - lastHeard > 2000) {
        mode = "Stop"
    }
    if (mode == "Forward") {
        robot.motorTank(50, 50)
    } else if (mode == "Left") {
        robot.motorTank(-30, 30)
    } else if (mode == "Right") {
        robot.motorTank(30, -30)
    } else if (mode == "Unsure") {
        robot.motorStop()
        robot.setColor(0xffff00)
    } else {
        robot.motorStop()
    }
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("Forward")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("Unsure")
})
let lastHeard = 0
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: make
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
input.onButtonPressed(Button.AB, function () {
    radio.sendString("Forward")
})
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: sol-make
radio.onReceivedString(function (receivedString) {
    mode = receivedString
    lastHeard = input.runningTime()
})
basic.forever(function () {
    if (input.runningTime() - lastHeard > 1500) {
        if (mode != "Lost") {
            robot.playTone(262, 300)
        }
        mode = "Lost"
    }
    if (mode == "Forward") {
        robot.motorTank(50, 50)
    } else if (mode == "Left") {
        robot.motorTank(-30, 30)
    } else if (mode == "Right") {
        robot.motorTank(30, -30)
    } else if (mode == "Lost") {
        robot.motorStop()
        robot.setColor(0xff0000)
    } else {
        robot.motorStop()
    }
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("Forward")
})
let lastHeard = 0
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion
