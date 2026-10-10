// Else and ranges: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
basic.forever(function () {
    if (input.acceleration(Dimension.X) < -300) {
        basic.showArrow(ArrowNames.West)
    } else if (input.acceleration(Dimension.X) > 300) {
        basic.showArrow(ArrowNames.East)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})
// endregion

// region: bug
basic.forever(function () {
    if (input.acceleration(Dimension.X) > 0) {
        basic.showIcon(IconNames.SmallDiamond)
    } else if (input.acceleration(Dimension.X) > 500) {
        basic.showArrow(ArrowNames.East)
    } else {
        basic.showIcon(IconNames.SmallSquare)
    }
})
// endregion

// region: nightlight
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

// region: sol-nightlight
basic.forever(function () {
    if (input.lightLevel() < 50) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        basic.clearScreen()
    }
})
// endregion

// region: sol-forward
basic.forever(function () {
    if (input.lightLevel() < 50) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        basic.clearScreen()
    }
    if (input.acceleration(Dimension.Y) < -300) {
        basic.showArrow(ArrowNames.North)
    } else if (input.acceleration(Dimension.Y) > 300) {
        basic.showArrow(ArrowNames.South)
    }
})
// endregion

// region: make
basic.forever(function () {

})
// endregion

// region: sol-make
basic.forever(function () {
    if (input.temperature() < 15) {
        basic.showLeds(`
            # . # . #
            . # # # .
            # # # # #
            . # # # .
            # . # . #
            `)
    } else if (input.temperature() < 25) {
        basic.showIcon(IconNames.Happy)
    } else {
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

// region: level
basic.forever(function () {
    if (input.acceleration(Dimension.X) < -100) {
        basic.showArrow(ArrowNames.East)
    } else if (input.acceleration(Dimension.X) > 100) {
        basic.showArrow(ArrowNames.West)
    } else {
        basic.showIcon(IconNames.Yes)
    }
})
// endregion
