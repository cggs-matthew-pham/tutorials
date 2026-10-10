// Challenge and response: starters and solutions (MakeCode JavaScript; students see blocks).
// One program for both micro:bits. The key micro:bit presses A to knock; the lock picks a challenge,
// the key micro:bit answers it, and the lock checks the answer.

// region: predict
let secretKey = 7
let challenge = 0
function answer(n: number): number {
    return (n * secretKey + 3) % 100
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendString("KNOCK")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "KNOCK") {
        challenge = randint(10, 99)
        radio.sendValue("challenge", challenge)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "challenge") {
        radio.sendValue("answer", answer(value))
    } else if (name == "answer") {
        if (value == answer(challenge)) {
            basic.showIcon(IconNames.Yes)
        } else {
            basic.showIcon(IconNames.No)
        }
    }
})
// endregion

// region: sol-count
let secretKey = 7
let challenge = 0
let opened = 0
function answer(n: number): number {
    return (n * secretKey + 3) % 100
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendString("KNOCK")
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(opened)
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "KNOCK") {
        challenge = randint(10, 99)
        radio.sendValue("challenge", challenge)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "challenge") {
        radio.sendValue("answer", answer(value))
    } else if (name == "answer") {
        if (value == answer(challenge)) {
            opened += 1
            basic.showIcon(IconNames.Yes)
        } else {
            basic.showIcon(IconNames.No)
        }
    }
})
// endregion

// region: make
let secretKey = 7
let challenge = 0
let wrong = 0
function answer(n: number): number {
    return (n * secretKey + 3) % 100
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendString("KNOCK")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "KNOCK") {
        challenge = randint(10, 99)
        radio.sendValue("challenge", challenge)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "challenge") {
        radio.sendValue("answer", answer(value))
    } else if (name == "answer") {
        if (value == answer(challenge)) {
            basic.showIcon(IconNames.Yes)
        } else {
            basic.showIcon(IconNames.No)
        }
    }
})
// endregion

// region: sol-make
let secretKey = 7
let challenge = 0
let wrong = 0
function answer(n: number): number {
    return (n * secretKey + 3) % 100
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendString("KNOCK")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "KNOCK") {
        if (wrong >= 3) {
            basic.showIcon(IconNames.Skull)
            basic.pause(5000)
            wrong = 0
        } else {
            challenge = randint(10, 99)
            radio.sendValue("challenge", challenge)
        }
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "challenge") {
        radio.sendValue("answer", answer(value))
    } else if (name == "answer") {
        if (value == answer(challenge)) {
            wrong = 0
            basic.showIcon(IconNames.Yes)
        } else {
            wrong += 1
            basic.showIcon(IconNames.No)
        }
    }
})
// endregion
