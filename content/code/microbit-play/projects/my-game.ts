let score = 0
let x = 2
let dotX = 0
let dotY = 0
function newDot() {
    dotX = randint(0, 4)
    dotY = 0
}
input.onButtonPressed(Button.A, function () {
    if (x > 0) {
        x = x - 1
    }
})
input.onButtonPressed(Button.B, function () {
    if (x < 4) {
        x = x + 1
    }
})
newDot()
basic.forever(function () {
    basic.clearScreen()
    led.plot(dotX, dotY)
    led.plot(x, 4)
    basic.pause(400 - score * 20)
    dotY = dotY + 1
    if (dotY == 4) {
        if (dotX == x) {
            score = score + 1
            newDot()
        } else {
            basic.showString("SCORE")
            basic.showNumber(score)
            score = 0
            newDot()
        }
    }
})
