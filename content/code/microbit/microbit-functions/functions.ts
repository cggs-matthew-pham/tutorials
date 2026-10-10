// Functions: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
function flashHeart () {
    basic.showIcon(IconNames.Heart)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(200)
}
input.onButtonPressed(Button.A, function () {
    flashHeart()
    flashHeart()
})
// endregion

// region: bug
function flashHeart () {
    basic.showIcon(IconNames.Heart)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(200)
}
input.onButtonPressed(Button.A, function () {

})
// endregion

// region: modify
function flashHeart () {
    basic.showIcon(IconNames.Heart)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(200)
}
input.onButtonPressed(Button.A, function () {
    flashHeart()
    flashHeart()
})
// endregion

// region: sol-three
function flashHeart () {
    basic.showIcon(IconNames.Heart)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(200)
}
input.onButtonPressed(Button.A, function () {
    flashHeart()
    flashHeart()
})
input.onButtonPressed(Button.B, function () {
    flashHeart()
    flashHeart()
    flashHeart()
})
// endregion

// region: sol-param
function flashHeart () {
    basic.showIcon(IconNames.Heart)
    basic.pause(200)
    basic.clearScreen()
    basic.pause(200)
}
function showScore (points: number) {
    basic.showString("Score")
    basic.showNumber(points)
}
input.onButtonPressed(Button.A, function () {
    flashHeart()
    flashHeart()
})
input.onButtonPressed(Button.B, function () {
    flashHeart()
    flashHeart()
    flashHeart()
})
input.onButtonPressed(Button.AB, function () {
    showScore(5)
})
// endregion

// region: make
input.onButtonPressed(Button.A, function () {

})
input.onButtonPressed(Button.B, function () {

})
// endregion

// region: sol-make
function wave () {
    basic.showLeds(`
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        . # . # .
        `)
    basic.showLeds(`
        . . # . .
        . . # . .
        # # # # #
        . . # . .
        . # . # .
        `)
}
function jump () {
    basic.showLeds(`
        . . . . .
        . . # . .
        . # # # .
        . . # . .
        . # . # .
        `)
    basic.showLeds(`
        . . # . .
        . # # # .
        . . # . .
        . # . # .
        . . . . .
        `)
}
input.onButtonPressed(Button.A, function () {
    wave()
    wave()
})
input.onButtonPressed(Button.B, function () {
    jump()
    jump()
})
input.onGesture(Gesture.Shake, function () {
    wave()
    jump()
})
// endregion

// region: alarm
function beepFlash () {
    music.play(music.tonePlayable(880, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    basic.showIcon(IconNames.No)
    basic.clearScreen()
}
input.onButtonPressed(Button.A, function () {
    beepFlash()
    beepFlash()
    beepFlash()
})
// endregion
