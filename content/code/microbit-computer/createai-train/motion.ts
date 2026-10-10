// Train movements: a motion logger (MakeCode JavaScript; students see blocks).
// It sends the micro:bit's x, y and z acceleration 20 times a second, so students can see what a movement looks like
// as data: the same readings CreateAI records for each sample.

// region: log
basic.forever(function () {
    serial.writeValue("x", input.acceleration(Dimension.X))
    serial.writeValue("y", input.acceleration(Dimension.Y))
    serial.writeValue("z", input.acceleration(Dimension.Z))
    basic.pause(50)
})
// endregion
