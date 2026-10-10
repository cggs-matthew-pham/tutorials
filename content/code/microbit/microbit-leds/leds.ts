// Pictures on the LEDs: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
basic.showIcon(IconNames.Heart)
basic.showIcon(IconNames.SmallHeart)
// endregion

// region: bug
basic.showIcon(IconNames.Heart)
basic.showIcon(IconNames.SmallHeart)
basic.forever(function () {

})
// endregion

// region: investigate
basic.showIcon(IconNames.Heart)
basic.showIcon(IconNames.SmallHeart)
basic.forever(function () {

})
// endregion

// region: sol-forever
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
})
// endregion

// region: modify
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
})
// endregion

// region: sol-picture
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
})
// endregion

// region: sol-pause
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.pause(500)
})
// endregion

// region: make
basic.forever(function () {

})
// endregion

// region: sol-make
basic.forever(function () {
    basic.showLeds(`
        . . . . .
        . # # # .
        # # . # #
        . # # # .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . # # # .
        # # . # #
        . # # # .
        . . . . .
        `)
    basic.pause(1000)
})
// endregion

// region: sign
basic.forever(function () {
    basic.showString("OPEN")
    basic.showIcon(IconNames.Happy)
    basic.pause(1000)
})
// endregion
