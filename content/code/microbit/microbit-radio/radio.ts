// Send and receive: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// The simulator shows a second micro:bit as soon as a program uses radio; both run the same program.

// region: predict
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.clearScreen()
})
// endregion

// region: modify
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.clearScreen()
})
// endregion

// region: sol-two
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        basic.showIcon(IconNames.Heart)
    } else if (receivedNumber == 2) {
        basic.showIcon(IconNames.Sad)
    }
    basic.pause(500)
    basic.clearScreen()
})
// endregion

// region: make
radio.setGroup(1)
// endregion

// region: sol-make
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
input.onGesture(Gesture.Shake, function () {
    radio.sendNumber(3)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        basic.showArrow(ArrowNames.West)
    } else if (receivedNumber == 2) {
        basic.showArrow(ArrowNames.East)
    } else if (receivedNumber == 3) {
        basic.showIcon(IconNames.Surprised)
    }
})
// endregion

// region: doorbell
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendString("ding")
})
radio.onReceivedString(function (receivedString) {
    basic.showIcon(IconNames.Heart)
    basic.showString(receivedString)
})
// endregion
