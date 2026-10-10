// Scrambling without a key: starters and solutions (MakeCode JavaScript; students see blocks).

// region: predict
function reverse(text: string): string {
    let result = ""
    for (let i = 0; i < text.length; i++) {
        result = text.charAt(i) + result
    }
    return result
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendString(reverse("HELLO"))
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
// endregion

// region: sol-unscramble
function reverse(text: string): string {
    let result = ""
    for (let i = 0; i < text.length; i++) {
        result = text.charAt(i) + result
    }
    return result
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendString(reverse("HELLO"))
})
radio.onReceivedString(function (receivedString) {
    basic.showString(reverse(receivedString))
})
// endregion

// region: make
radio.setGroup(5)
// endregion

// region: sol-make
function scramble(text: string): string {
    let result = ""
    for (let i = 0; i < text.length; i++) {
        result = result + text.charAt(i) + "X"
    }
    return result
}
function unscramble(text: string): string {
    let result = ""
    for (let i = 0; i < text.length / 2; i++) {
        result = result + text.charAt(i * 2)
    }
    return result
}
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendString(scramble("MEET AT 3"))
})
radio.onReceivedString(function (receivedString) {
    basic.showString(unscramble(receivedString))
})
// endregion
