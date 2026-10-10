// Send data to the computer: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
basic.forever(function () {
    serial.writeValue("light", input.lightLevel())
    basic.pause(500)
})
// endregion

// region: bug-once
serial.writeValue("light", input.lightLevel())
// endregion

// region: sol-temp
basic.forever(function () {
    serial.writeValue("light", input.lightLevel())
    serial.writeValue("temperature", input.temperature())
    basic.pause(500)
})
// endregion

// region: sol-fast
basic.forever(function () {
    serial.writeValue("light", input.lightLevel())
    basic.pause(100)
})
// endregion

// region: make
basic.forever(function () {
    basic.pause(200)
})
// endregion

// region: sol-make
basic.forever(function () {
    serial.writeValue("x", input.acceleration(Dimension.X))
    serial.writeValue("y", input.acceleration(Dimension.Y))
    basic.pause(200)
})
input.onButtonPressed(Button.A, function () {
    serial.writeLine("mark")
})
// endregion
