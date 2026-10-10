// Radio is a shared space: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own. The simulator runs a radio program on two micro:bits.

// region: predict
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendString("MEET AT 3")
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
// endregion

// region: sol-two
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendString("MEET AT 3")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("BRING SNACKS")
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
})
// endregion

// region: make
radio.setGroup(5)
// endregion

// region: sol-make
radio.setGroup(5)
input.onButtonPressed(Button.A, function () {
    radio.sendString("RING")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "RING") {
        basic.showIcon(IconNames.Heart)
        music.play(music.tonePlayable(659, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        basic.clearScreen()
    }
})
// endregion
