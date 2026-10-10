// The Caesar cipher: starters and solutions (MakeCode JavaScript; students see blocks).

// region: predict
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
    basic.showString(encrypt("HELLO", 3))
})
// endregion

// region: sol-decrypt
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
function decrypt(message: string, key: number): string {
    return encrypt(message, 26 - key)
}
input.onButtonPressed(Button.A, function () {
    basic.showString(decrypt(encrypt("HELLO", 3), 3))
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
function decrypt(message: string, key: number): string {
    return encrypt(message, 26 - key)
}
radio.setGroup(5)
// endregion

// region: sol-make
let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let key = 3
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
function decrypt(message: string, key: number): string {
    return encrypt(message, 26 - key)
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendString(encrypt("MEET AT 3", key))
})
input.onButtonPressed(Button.B, function () {
    key += 1
    basic.showNumber(key)
})
radio.onReceivedString(function (receivedString) {
    basic.showString(decrypt(receivedString, key))
})
// endregion
