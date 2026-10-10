// Capstone: a micro:bit build that acts on your model's labels (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: start
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    label = serial.readLine()
})
let label = ""
// endregion

// region: sol-build
// An example for a fruit sorter (Ripe, Unripe, Neither); students use their own classes and actions.
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    label = serial.readLine()
    if (label == "Ripe") {
        pins.servoWritePin(AnalogPin.P0, 30)
        serial.writeValue("bin", 1)
    } else if (label == "Unripe") {
        pins.servoWritePin(AnalogPin.P0, 150)
        serial.writeValue("bin", 2)
    } else {
        pins.servoWritePin(AnalogPin.P0, 90)
        serial.writeValue("bin", 0)
    }
})
let label = ""
pins.servoWritePin(AnalogPin.P0, 90)
// endregion
