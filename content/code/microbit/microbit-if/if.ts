// If: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
basic.forever(function () {
    if (input.lightLevel() < 50) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
})
// endregion

// region: bug
basic.forever(function () {
    if (input.lightLevel() > 50) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
    if (input.lightLevel() < 50) {
        basic.clearScreen()
    }
})
// endregion

// region: sol-off
basic.forever(function () {
    if (input.lightLevel() < 50) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
    if (input.lightLevel() >= 50) {
        basic.clearScreen()
    }
})
// endregion

// region: modify
basic.forever(function () {
    if (input.lightLevel() < 50) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
    if (input.lightLevel() >= 50) {
        basic.clearScreen()
    }
})
// endregion

// region: sol-threshold
basic.forever(function () {
    if (input.lightLevel() < 100) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
    if (input.lightLevel() >= 100) {
        basic.clearScreen()
    }
})
// endregion

// region: sol-hot
basic.forever(function () {
    if (input.lightLevel() < 100) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
    if (input.lightLevel() >= 100) {
        basic.clearScreen()
    }
    if (input.temperature() > 30) {
        basic.showIcon(IconNames.Sad)
    }
})
// endregion

// region: make
basic.forever(function () {

})
// endregion

// region: sol-make
basic.forever(function () {
    if (input.temperature() < 10) {
        basic.showLeds(`
            # . # . #
            . # # # .
            # # # # #
            . # # # .
            # . # . #
            `)
    }
    if (input.temperature() > 30) {
        basic.showLeds(`
            # . # . #
            . # # # .
            # # . # #
            . # # # .
            # . # . #
            `)
    }
})
// endregion

// region: fridge
basic.forever(function () {
    if (input.temperature() > 5) {
        basic.showIcon(IconNames.No)
        basic.pause(500)
        basic.clearScreen()
        basic.pause(500)
    }
})
// endregion
