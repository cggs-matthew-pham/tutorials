// Delivery robot (challenge): starters and solutions (MakeCode JavaScript with the microbit-robot extension).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// The start is the careful sign robot from "Signs: some mistakes cost more". In the simulator, buttons stand in for the
// model (A Left, B Right, A+B Go, logo Stop); drag a box in front of the robot to block it.

// region: predict
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

// region: sol-m1
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
    if (robot.obstacleDistance() < 15) {
        robot.motorStop()
        robot.setColor(0xff0000)
    } else if (mode == "Go" && goCount >= 2) {
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

// region: sol-m2
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
    if (blocked && robot.obstacleDistance() >= 15) {
        radio.sendValue("blocked", 0)
        blocked = false
    }
    if (input.runningTime() - lastHeard > 2000) {
        mode = "Stop"
    }
    if (robot.obstacleDistance() < 15) {
        robot.motorStop()
        robot.setColor(0xff0000)
        if (!(blocked)) {
            radio.sendValue("blocked", 1)
            blocked = true
        }
    } else if (mode == "Go" && goCount >= 2) {
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
basic.forever(function () {
    radio.sendValue("dist", robot.obstacleDistance())
    basic.pause(500)
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
let blocked = false
let goCount = 0
let lastHeard = 0
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: sol-m3
radio.onReceivedString(function (receivedString) {
    if (receivedString == "Go") {
        goCount += 1
    } else {
        goCount = 0
    }
    if (receivedString == "Stop" && mode == "Go") {
        deliveries += 1
        radio.sendValue("done", deliveries)
    }
    mode = receivedString
    lastHeard = input.runningTime()
})
input.onGesture(Gesture.Shake, function () {
    basic.showNumber(deliveries)
})
basic.forever(function () {
    if (blocked && robot.obstacleDistance() >= 15) {
        radio.sendValue("blocked", 0)
        blocked = false
    }
    if (input.runningTime() - lastHeard > 2000) {
        mode = "Stop"
    }
    if (robot.obstacleDistance() < 15) {
        robot.motorStop()
        robot.setColor(0xff0000)
        if (!(blocked)) {
            radio.sendValue("blocked", 1)
            blocked = true
        }
    } else if (mode == "Go" && goCount >= 2) {
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
basic.forever(function () {
    radio.sendValue("dist", robot.obstacleDistance())
    basic.pause(500)
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
let deliveries = 0
let blocked = false
let goCount = 0
let lastHeard = 0
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion
