// A radio bridge: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// With radio, the simulator runs the same program on two micro:bits. In class, the same program goes on both:
// one is plugged into the computer (the bridge), the other is the sensor or the build across the room.

// region: predict
// Bridge: radio to the computer
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
// Sensor: send the temperature by radio every second
basic.forever(function () {
    radio.sendValue("temp", input.temperature())
    basic.pause(1000)
})
radio.setGroup(7)
// endregion

// region: bug-group
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
radio.setGroup(8)
// endregion

// region: sol-light
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
basic.forever(function () {
    radio.sendValue("temp", input.temperature())
    radio.sendValue("light", input.lightLevel())
    basic.pause(1000)
})
radio.setGroup(7)
// endregion

// region: sol-beep
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    radio.sendString(serial.readLine())
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "beep") {
        music.play(music.tonePlayable(880, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
    }
})
basic.forever(function () {
    radio.sendValue("temp", input.temperature())
    basic.pause(1000)
})
radio.setGroup(7)
// endregion

// region: make
radio.setGroup(7)
// endregion

// region: sol-make
// Bridge: both directions
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    radio.sendString(serial.readLine())
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
// Room monitor
basic.forever(function () {
    radio.sendValue("temp", input.temperature())
    radio.sendValue("light", input.lightLevel())
    basic.pause(1000)
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "alarm") {
        basic.showIcon(IconNames.No)
        radio.sendValue("alarm", 1)
    } else if (receivedString == "clear") {
        basic.clearScreen()
        radio.sendValue("alarm", 0)
    }
})
radio.setGroup(7)
// endregion
