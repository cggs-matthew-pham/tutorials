// Agreeing a key in the open: starters and solutions (MakeCode JavaScript; students see blocks).

// region: predict
// Public numbers everyone may know
let P = 23
let G = 5
// This micro:bit's own secret number (the other micro:bit has 15)
let secret = 6
let shared = 0
function modPow(base: number, power: number, prime: number): number {
    let result = 1
    for (let i = 0; i < power; i++) {
        result = (result * base) % prime
    }
    return result
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendValue("mix", modPow(G, secret, P))
})
radio.onReceivedValue(function (name, value) {
    if (name == "mix") {
        shared = modPow(value, secret, P)
        basic.showNumber(shared)
    }
})
// endregion

// region: run
let P = 23
let G = 5
let secret = randint(2, 20)
let shared = 0
function modPow(base: number, power: number, prime: number): number {
    let result = 1
    for (let i = 0; i < power; i++) {
        result = (result * base) % prime
    }
    return result
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendValue("mix", modPow(G, secret, P))
})
radio.onReceivedValue(function (name, value) {
    if (name == "mix") {
        shared = modPow(value, secret, P)
        basic.showNumber(shared)
    }
})
// endregion

// region: sol-lock
let P = 23
let G = 5
let secret = randint(2, 20)
let shared = 0
function modPow(base: number, power: number, prime: number): number {
    let result = 1
    for (let i = 0; i < power; i++) {
        result = (result * base) % prime
    }
    return result
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendValue("mix", modPow(G, secret, P))
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(7 ^ shared)
})
radio.onReceivedValue(function (name, value) {
    if (name == "mix") {
        shared = modPow(value, secret, P)
        basic.showNumber(shared)
    }
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber ^ shared)
})
// endregion

// region: make
let P = 23
let G = 5
let secret = randint(2, 20)
let shared = 0
function modPow(base: number, power: number, prime: number): number {
    let result = 1
    for (let i = 0; i < power; i++) {
        result = (result * base) % prime
    }
    return result
}
radio.setGroup(5)
// endregion

// region: sol-make
let P = 23
let G = 5
let secret = randint(2, 20)
let shared = 0
let pin = 4271
function modPow(base: number, power: number, prime: number): number {
    let result = 1
    for (let i = 0; i < power; i++) {
        result = (result * base) % prime
    }
    return result
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendValue("mix", modPow(G, secret, P))
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(pin ^ shared)
})
radio.onReceivedValue(function (name, value) {
    if (name == "mix") {
        shared = modPow(value, secret, P)
        basic.showIcon(IconNames.Yes)
    }
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber ^ shared)
})
// endregion
