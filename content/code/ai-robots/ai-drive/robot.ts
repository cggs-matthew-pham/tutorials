// Drive with gestures: starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// In class the robot's micro:bit runs this, and a bridge micro:bit on the computer passes the model's labels on by
// radio (A radio bridge, in micro:bit and the computer). In the simulator, the buttons stand in for the model: with
// radio, the simulator shows two micro:bits and two robots, and each micro:bit's buttons drive the other robot.

// region: predict
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
// Test remote: the buttons send what the model would send.
input.onButtonPressed(Button.A, function () {
    radio.sendString("Left")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("Right")
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("Forward")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("Stop")
})
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: sol-back
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
    } else if (mode == "Back") {
        robot.motorTank(-50, -50)
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
    radio.sendString("Forward")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("Stop")
})
input.onGesture(Gesture.Shake, function () {
    radio.sendString("Back")
})
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: sol-show
radio.onReceivedString(function (receivedString) {
    mode = receivedString
    basic.showString(mode.charAt(0))
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
input.onButtonPressed(Button.A, function () {
    radio.sendString("Left")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("Right")
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("Forward")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("Stop")
})
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
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: sol-make
radio.onReceivedString(function (receivedString) {
    mode = receivedString
})
basic.forever(function () {
    if (mode == "Forward") {
        robot.motorTank(50, 50)
        robot.setColor(0x00ff00)
    } else if (mode == "Left") {
        robot.motorTank(-30, 30)
    } else if (mode == "Right") {
        robot.motorTank(30, -30)
    } else if (mode == "Spin") {
        robot.motorTank(60, -60)
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
    radio.sendString("Forward")
})
input.onGesture(Gesture.Shake, function () {
    radio.sendString("Spin")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString("Stop")
})
let mode = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(7)
// endregion

// region: bridge
// The bridge micro:bit, plugged into the computer: each line from the board goes out by radio.
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    radio.sendString(serial.readLine())
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
radio.setGroup(7)
// endregion
