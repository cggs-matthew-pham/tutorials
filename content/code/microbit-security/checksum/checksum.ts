// Checksums: starters and solutions (MakeCode JavaScript; students see blocks).

// region: predict
let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
function checksum(message: string): number {
    let total = 0
    for (let i = 0; i < message.length; i++) {
        total += ALPHABET.indexOf(message.charAt(i))
    }
    return total % 10
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendValue("HELLO", checksum("HELLO"))
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue("HELLP", checksum("HELLO"))
})
radio.onReceivedValue(function (name, value) {
    if (checksum(name) == value) {
        basic.showString(name)
    } else {
        basic.showIcon(IconNames.No)
    }
})
// endregion

// region: sol-keyed
let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let secretKey = 7
function checksum(message: string): number {
    let total = secretKey
    for (let i = 0; i < message.length; i++) {
        total += ALPHABET.indexOf(message.charAt(i))
    }
    return total % 10
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendValue("HELLO", checksum("HELLO"))
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue("HELLP", checksum("HELLO"))
})
radio.onReceivedValue(function (name, value) {
    if (checksum(name) == value) {
        basic.showString(name)
    } else {
        basic.showIcon(IconNames.No)
    }
})
// endregion

// region: make
let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let secretKey = 7
function checksum(message: string): number {
    let total = secretKey
    for (let i = 0; i < message.length; i++) {
        total += ALPHABET.indexOf(message.charAt(i))
    }
    return total % 10
}
radio.setGroup(5)
// endregion

// region: sol-make
let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let secretKey = 7
let bad = 0
function checksum(message: string): number {
    let total = secretKey
    for (let i = 0; i < message.length; i++) {
        total += ALPHABET.indexOf(message.charAt(i))
    }
    return total % 10
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendValue("MEET", checksum("MEET"))
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue("MEAT", checksum("MEET"))
})
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(bad)
})
radio.onReceivedValue(function (name, value) {
    if (checksum(name) == value) {
        basic.showIcon(IconNames.Yes)
    } else {
        bad += 1
        basic.showIcon(IconNames.No)
    }
})
// endregion
