// Remote control: starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// With radio, the simulator runs the same program on two micro:bits, each with a robot: each is the other's remote.

// region: predict
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(0)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        robot.motorTank(50, 50)
    } else if (receivedNumber == 2) {
        robot.motorTank(50, -50, 400)
        robot.motorStop()
    } else {
        robot.motorStop()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion

// region: bug-remote
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
radio.setGroup(1)
// endregion

// region: bug-robot
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        robot.motorTank(50, 50)
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(2)
// endregion

// region: modify
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(0)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        robot.motorTank(50, 50)
    } else if (receivedNumber == 2) {
        robot.motorTank(50, -50, 400)
        robot.motorStop()
    } else {
        robot.motorStop()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion

// region: sol-show
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(0)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
    if (receivedNumber == 1) {
        robot.motorTank(50, 50)
    } else if (receivedNumber == 2) {
        robot.motorTank(50, -50, 400)
        robot.motorStop()
    } else {
        robot.motorStop()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion

// region: sol-back
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(0)
})
input.onGesture(Gesture.Shake, function () {
    radio.sendNumber(3)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
    if (receivedNumber == 1) {
        robot.motorTank(50, 50)
    } else if (receivedNumber == 2) {
        robot.motorTank(50, -50, 400)
        robot.motorStop()
    } else if (receivedNumber == 3) {
        robot.motorTank(-50, -50, 1000)
        robot.motorStop()
    } else {
        robot.motorStop()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion

// region: make
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        robot.motorTank(50, 50, 1000)
        robot.motorStop()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion

// region: sol-make
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(3)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        robot.motorTank(-50, 50, 300)
        robot.motorStop()
    } else if (receivedNumber == 2) {
        robot.motorTank(50, -50, 300)
        robot.motorStop()
    } else if (receivedNumber == 3) {
        robot.motorTank(50, 50, 1000)
        robot.motorStop()
    } else {
        robot.motorStop()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion
