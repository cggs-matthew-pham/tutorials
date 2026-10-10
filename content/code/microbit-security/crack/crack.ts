// Breaking a Caesar cipher: starters and solutions (MakeCode JavaScript; students see blocks).

// region: predict
let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let guess = 0
let secret = "KHOOR"
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
    guess += 1
    if (guess > 25) {
        guess = 1
    }
    basic.showNumber(guess)
    basic.showString(decrypt(secret, guess))
})
// endregion

// region: sol-count
let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let guess = 0
let secret = "KHOOR"
let tries = 0
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
    guess += 1
    tries += 1
    if (guess > 25) {
        guess = 1
    }
    basic.showNumber(guess)
    basic.showString(decrypt(secret, guess))
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(tries)
})
// endregion

// region: make
let ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let guess = 0
let secret = "RLFZ THAALY"
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
    guess += 1
    if (guess > 25) {
        guess = 1
    }
    basic.showNumber(guess)
    basic.showString(decrypt(secret, guess))
})
// endregion
