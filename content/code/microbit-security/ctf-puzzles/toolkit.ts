// Capture-the-flag toolkit: starters and solutions (MakeCode JavaScript; students see blocks).

// region: toolkit
let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let guess = 0
let number = 0
let which = 0
let codes = [26, 12, 10, 27, 12, 29]
let messages = ["HELLO", "MEET", "KEY", "LOCK"]
function shift(letter: string, key: number): string {
    let place = ALPHABET.indexOf(letter)
    if (place < 0) {
        return letter
    }
    return ALPHABET.charAt((place + key) % 26)
}
function decrypt(message: string, key: number): string {
    let result = ""
    for (let i = 0; i < message.length; i++) {
        result = result + shift(message.charAt(i), 26 - key)
    }
    return result
}
function checksum(message: string): number {
    let total = 0
    for (let i = 0; i < message.length; i++) {
        total += ALPHABET.indexOf(message.charAt(i))
    }
    return total % 10
}
// A tries the next Caesar key on puzzle 1
input.onButtonPressed(Button.A, function () {
    guess += 1
    if (guess > 25) {
        guess = 1
    }
    basic.showNumber(guess)
    basic.showString(decrypt("RIZIV WIRH OICW", guess))
})
// B shows the next puzzle 2 number after XOR with a key (change the 9 to try another key)
input.onButtonPressed(Button.B, function () {
    number = codes[which] ^ 9
    which = (which + 1) % codes.length
    basic.showNumber(number)
})
// A+B shows the checksum of the next puzzle 3 message
input.onButtonPressed(Button.AB, function () {
    basic.showString(messages[which])
    basic.showNumber(checksum(messages[which]))
    which = (which + 1) % messages.length
})
// endregion

// region: make
let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
function shift(letter: string, key: number): string {
    let place = ALPHABET.indexOf(letter)
    if (place < 0) {
        return letter
    }
    return ALPHABET.charAt((place + key) % 26)
}
function encrypt(message: string, key: number): string {
    let result = ""
    for (let i = 0; i < message.length; i++) {
        result = result + shift(message.charAt(i), key)
    }
    return result
}
// endregion

// region: sol-make
let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
function shift(letter: string, key: number): string {
    let place = ALPHABET.indexOf(letter)
    if (place < 0) {
        return letter
    }
    return ALPHABET.charAt((place + key) % 26)
}
function encrypt(message: string, key: number): string {
    let result = ""
    for (let i = 0; i < message.length; i++) {
        result = result + shift(message.charAt(i), key)
    }
    return result
}
input.onButtonPressed(Button.A, function () {
    basic.showString(encrypt("MEET AT NOON", 5))
})
// endregion
