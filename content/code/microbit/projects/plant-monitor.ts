let checks = 0
basic.forever(function () {
    if (input.lightLevel() < 40) {
        basic.showIcon(IconNames.Asleep)
    } else if (input.temperature() > 30) {
        basic.showIcon(IconNames.Sad)
    } else {
        basic.showIcon(IconNames.Happy)
    }
    checks += 1
    basic.pause(1000)
})
input.onButtonPressed(Button.A, function () {
    basic.showNumber(checks)
})
