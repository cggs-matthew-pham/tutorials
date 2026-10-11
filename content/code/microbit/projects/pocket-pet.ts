let hunger = 0
input.onButtonPressed(Button.A, function () {
    hunger = hunger - 3
    if (hunger < 0) {
        hunger = 0
    }
})
basic.forever(function () {
    hunger = hunger + 1
    if (hunger < 5) {
        basic.showIcon(IconNames.Happy)
    } else if (hunger < 10) {
        basic.showIcon(IconNames.Asleep)
    } else {
        basic.showIcon(IconNames.Sad)
    }
    basic.pause(2000)
})
