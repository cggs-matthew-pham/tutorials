let team = 1
let open = true
radio.setGroup(7)
input.onButtonPressed(Button.A, function () {
    if (open) {
        open = false
        radio.sendNumber(team)
        basic.showString("WIN")
    }
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        open = true
        basic.clearScreen()
    } else if (open) {
        open = false
        basic.showNumber(receivedNumber)
    }
})
