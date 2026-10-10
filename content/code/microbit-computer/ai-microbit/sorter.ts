// A model drives a micro:bit: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// The board sends the model's top label as a line of text over USB (115200 baud, MakeCode's default).

// region: predict
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    label = serial.readLine()
    if (label == "Paper") {
        basic.showString("P")
    } else {
        basic.showString("L")
    }
})
let label = ""
// endregion

// region: bug-case
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    label = serial.readLine()
    if (label == "paper") {
        basic.showString("P")
    } else if (label == "plastic") {
        basic.showString("L")
    }
})
let label = ""
// endregion

// region: sol-neither
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    label = serial.readLine()
    if (label == "Paper") {
        basic.showString("P")
    } else if (label == "Plastic") {
        basic.showString("L")
    } else if (label == "Neither") {
        basic.showIcon(IconNames.No)
    }
})
let label = ""
// endregion

// region: sol-reply
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    label = serial.readLine()
    if (label == "Paper") {
        basic.showString("P")
        serial.writeValue("bin", 1)
    } else if (label == "Plastic") {
        basic.showString("L")
        serial.writeValue("bin", 2)
    } else {
        basic.showIcon(IconNames.No)
        serial.writeValue("bin", 0)
    }
})
let label = ""
// endregion

// region: bridge
// On the micro:bit plugged into the computer: pass each line from the board on by radio,
// and pass each value that comes back by radio on to the board.
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    radio.sendString(serial.readLine())
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
radio.setGroup(7)
// endregion

// region: sol-bridge
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    radio.sendString(serial.readLine())
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString.charAt(0))
    radio.sendValue("got", 1)
})
radio.setGroup(7)
// endregion

// region: make
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    radio.sendString(serial.readLine())
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
radio.setGroup(7)
// endregion

// region: sol-make
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    radio.sendString(serial.readLine())
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "Paper") {
        pins.servoWritePin(AnalogPin.P0, 30)
        radio.sendValue("bin", 1)
    } else if (receivedString == "Plastic") {
        pins.servoWritePin(AnalogPin.P0, 150)
        radio.sendValue("bin", 2)
    } else {
        pins.servoWritePin(AnalogPin.P0, 90)
        radio.sendValue("bin", 0)
    }
})
radio.setGroup(7)
pins.servoWritePin(AnalogPin.P0, 90)
// endregion
