// Sensors are numbers: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
basic.forever(function () {
    basic.showNumber(input.lightLevel())
})
// endregion

// region: bug
basic.showNumber(input.temperature())
// endregion

// region: investigate
let reading = 0
basic.forever(function () {
    reading = input.lightLevel()
    basic.showNumber(reading)
})
// endregion

// region: modify
basic.forever(function () {
    basic.showNumber(input.lightLevel())
})
// endregion

// region: sol-temperature
basic.forever(function () {
    basic.showNumber(input.temperature())
})
// endregion

// region: sol-buttons
input.onButtonPressed(Button.A, function () {
    basic.showNumber(input.lightLevel())
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(input.temperature())
})
// endregion

// region: make
basic.forever(function () {

})
// endregion

// region: sol-make
basic.forever(function () {
    basic.showNumber(input.temperature())
    basic.showString("C")
    basic.pause(2000)
})
// endregion

// region: meter
basic.forever(function () {
    led.plotBarGraph(input.lightLevel(), 255)
})
// endregion
