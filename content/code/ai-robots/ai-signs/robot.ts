// Signs: starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// The model reads printed signs (Go, Left, Right, Stop). The board needs 95% confidence before it sends Go and 70% for
// the others, sends Unsure otherwise, and repeats the label every second. In the simulator, buttons stand in for the model.

// region: predict
radio.onReceivedString(function (receivedString) {
    mode = receivedString
    lastHeard = input.runningTime()
})
basic.forever(function () {
    if (input.runningTime() - lastHeard > 2000) {
        mode = "Stop"
    }
    if (mode == "Go") {
        robot.motorTank(50, 50)
    } else if (mode == "Left") {
        robot.motorTank(-30, 30)
    } else if (mode == "Right") {
        robot.motorTank(30, -30)
    } else {
        robot.motorStop()
    }
})
input.onButtonPressed(Button.A, function () {
    radio.sendString("Left")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("Right")
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("Go")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("Stop")
})
let lastHeard = 0
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: sol-stop
radio.onReceivedString(function (receivedString) {
    mode = receivedString
    lastHeard = input.runningTime()
    if (mode == "Stop") {
        robot.motorStop()
        robot.setColor(0xff0000)
        robot.playTone(523, 200)
    }
})
basic.forever(function () {
    if (input.runningTime() - lastHeard > 2000) {
        mode = "Stop"
    }
    if (mode == "Go") {
        robot.motorTank(50, 50)
    } else if (mode == "Left") {
        robot.motorTank(-30, 30)
    } else if (mode == "Right") {
        robot.motorTank(30, -30)
    } else {
        robot.motorStop()
    }
})
input.onButtonPressed(Button.A, function () {
    radio.sendString("Left")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("Right")
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("Go")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("Stop")
})
let lastHeard = 0
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: sol-twice
radio.onReceivedString(function (receivedString) {
    if (receivedString == "Go") {
        goCount += 1
    } else {
        goCount = 0
    }
    mode = receivedString
    lastHeard = input.runningTime()
})
basic.forever(function () {
    if (input.runningTime() - lastHeard > 2000) {
        mode = "Stop"
    }
    if (mode == "Go" && goCount >= 2) {
        robot.motorTank(50, 50)
    } else if (mode == "Left") {
        robot.motorTank(-30, 30)
    } else if (mode == "Right") {
        robot.motorTank(30, -30)
    } else {
        robot.motorStop()
    }
})
input.onButtonPressed(Button.A, function () {
    radio.sendString("Left")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("Right")
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("Go")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("Stop")
})
let goCount = 0
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
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("Go")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("Stop")
})
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: sol-make
radio.onReceivedString(function (receivedString) {
    if (receivedString == "Go") {
        goCount += 1
    } else {
        goCount = 0
    }
    mode = receivedString
    lastHeard = input.runningTime()
})
basic.forever(function () {
    if (input.runningTime() - lastHeard > 2000) {
        mode = "Stop"
    }
    if (mode == "Go" && goCount >= 2) {
        robot.motorTank(40, 40)
        robot.setColor(0x00ff00)
    } else if (mode == "Left") {
        robot.motorTank(-30, 30)
        robot.setColor(0xffff00)
    } else if (mode == "Right") {
        robot.motorTank(30, -30)
        robot.setColor(0xffff00)
    } else {
        robot.motorStop()
        robot.setColor(0xff0000)
    }
})
input.onButtonPressed(Button.A, function () {
    radio.sendString("Left")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("Right")
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("Go")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("Stop")
})
let goCount = 0
let lastHeard = 0
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion
