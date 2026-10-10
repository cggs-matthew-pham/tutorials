// Defend the door lock: starters and solutions (MakeCode JavaScript; students see blocks).
// One program for both micro:bits: A on the key micro:bit asks the lock to open.

// region: weak
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendString("OPEN 4271")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "OPEN 4271") {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
})
// endregion

// region: step1
let secretKey = 7
radio.setGroup(5)
// endregion

// region: sol-step1
let secretKey = 7
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(4271 ^ secretKey)
})
radio.onReceivedNumber(function (receivedNumber) {
    if ((receivedNumber ^ secretKey) == 4271) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
})
// endregion

// region: make
let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let secretKey = 7
let challenge = 0
function checksum(message: string): number {
    let total = secretKey
    for (let i = 0; i < message.length; i++) {
        total += ALPHABET.indexOf(message.charAt(i))
    }
    return total % 10
}
function answer(n: number): number {
    return (n * secretKey + 3) % 100
}
radio.setGroup(5)
// endregion

// region: sol-final
let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let secretKey = 7
let challenge = 0
function checksum(message: string): number {
    let total = secretKey
    for (let i = 0; i < message.length; i++) {
        total += ALPHABET.indexOf(message.charAt(i))
    }
    return total % 10
}
function answer(n: number): number {
    return (n * secretKey + 3) % 100
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendValue("KNOCK", checksum("KNOCK"))
})
radio.onReceivedValue(function (name, value) {
    if (name == "KNOCK") {
        if (checksum("KNOCK") == value) {
            challenge = randint(10, 99)
            radio.sendValue("CHALL", challenge)
        } else {
            basic.showIcon(IconNames.No)
        }
    } else if (name == "CHALL") {
        radio.sendValue("ANSWER", answer(value))
    } else if (name == "ANSWER") {
        if (value == answer(challenge)) {
            basic.showIcon(IconNames.Yes)
        } else {
            basic.showIcon(IconNames.No)
        }
    }
})
// endregion
