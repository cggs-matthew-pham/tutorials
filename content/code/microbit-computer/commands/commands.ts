// Commands from the computer: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// The board sends each command as a line of text ending with a new line.

// region: predict
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    command = serial.readLine()
    if (command == "happy") {
        basic.showIcon(IconNames.Happy)
    } else if (command == "sad") {
        basic.showIcon(IconNames.Sad)
    }
})
let command = ""
// endregion

// region: bug-comma
serial.onDataReceived(serial.delimiters(Delimiters.Comma), function () {
    command = serial.readLine()
    if (command == "happy") {
        basic.showIcon(IconNames.Happy)
    }
})
let command = ""
// endregion

// region: sol-heart
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    command = serial.readLine()
    if (command == "happy") {
        basic.showIcon(IconNames.Happy)
    } else if (command == "sad") {
        basic.showIcon(IconNames.Sad)
    } else if (command == "heart") {
        basic.showIcon(IconNames.Heart)
    }
})
let command = ""
// endregion

// region: sol-reply
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    command = serial.readLine()
    if (command == "happy") {
        basic.showIcon(IconNames.Happy)
        serial.writeLine("ok")
    } else if (command == "sad") {
        basic.showIcon(IconNames.Sad)
        serial.writeLine("ok")
    } else {
        serial.writeLine("?")
    }
})
let command = ""
// endregion

// region: make
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    command = serial.readLine()
})
let command = ""
// endregion

// region: sol-make
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    command = serial.readLine()
    if (command == "on") {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        serial.writeLine("ok")
    } else if (command == "off") {
        basic.clearScreen()
        serial.writeLine("ok")
    } else if (command == "count") {
        basic.showNumber(count)
        serial.writeValue("count", count)
    } else {
        serial.writeLine("?")
    }
    count += 1
})
let count = 0
let command = ""
// endregion
