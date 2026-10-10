// A shared-key cipher with XOR: starters and solutions (MakeCode JavaScript; students see blocks).

// region: predict
let key = 5
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(7 ^ key)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber ^ key)
})
// endregion

// region: sol-keys
let key = 5
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(7 ^ key)
})
input.onButtonPressed(Button.B, function () {
    key += 1
    if (key > 15) {
        key = 1
    }
    basic.showNumber(key)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber ^ key)
})
// endregion

// region: make
let key = 5
radio.setGroup(5)
// endregion

// region: sol-make
let key = 12
let pin = 4271
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(pin ^ key)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber ^ key)
})
// endregion
