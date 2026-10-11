basic.forever(function () {
    serial.writeValue("temp", input.temperature())
    basic.pause(1000)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    command = serial.readLine()
    if (command == "alarm") {
        basic.showIcon(IconNames.Skull)
    } else if (command == "ok") {
        basic.clearScreen()
    }
})
let command = ""
