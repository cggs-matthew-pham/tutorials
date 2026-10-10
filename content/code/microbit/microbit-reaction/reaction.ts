// Reaction timer: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: wait
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    basic.showIcon(IconNames.Heart)
})
// endregion

// region: timing
let start = 0
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    basic.showIcon(IconNames.Heart)
    start = input.runningTime()
})
input.onButtonPressed(Button.A, function () {
    basic.showNumber(input.runningTime() - start)
})
// endregion

// region: m1
let start = 0
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    basic.showIcon(IconNames.Heart)
})
input.onButtonPressed(Button.A, function () {

})
// endregion

// region: sol-m1
let start = 0
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    basic.showIcon(IconNames.Heart)
    start = input.runningTime()
})
input.onButtonPressed(Button.A, function () {
    basic.showNumber(input.runningTime() - start)
})
// endregion

// region: m2
let waiting = false
let start = 0
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    basic.showIcon(IconNames.Heart)
    start = input.runningTime()
})
input.onButtonPressed(Button.A, function () {
    basic.showNumber(input.runningTime() - start)
})
// endregion

// region: sol-m2
let waiting = false
let start = 0
input.onButtonPressed(Button.B, function () {
    waiting = false
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    basic.showIcon(IconNames.Heart)
    start = input.runningTime()
    waiting = true
})
input.onButtonPressed(Button.A, function () {
    if (waiting) {
        waiting = false
        basic.showNumber(input.runningTime() - start)
    } else {
        basic.showIcon(IconNames.No)
    }
})
// endregion

// region: m3
let waiting = false
let start = 0
input.onButtonPressed(Button.B, function () {
    waiting = false
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    basic.showIcon(IconNames.Heart)
    start = input.runningTime()
    waiting = true
})
input.onButtonPressed(Button.A, function () {
    if (waiting) {
        waiting = false
        basic.showNumber(input.runningTime() - start)
    } else {
        basic.showIcon(IconNames.No)
    }
})
// endregion

// region: sol-m3
let reaction = 0
let waiting = false
let start = 0
let best = 99999
input.onButtonPressed(Button.B, function () {
    waiting = false
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    basic.showIcon(IconNames.Heart)
    start = input.runningTime()
    waiting = true
})
input.onButtonPressed(Button.A, function () {
    if (waiting) {
        waiting = false
        reaction = input.runningTime() - start
        basic.showNumber(reaction)
        if (reaction < best) {
            best = reaction
            basic.showIcon(IconNames.Happy)
        }
    } else {
        basic.showIcon(IconNames.No)
    }
})
input.onButtonPressed(Button.AB, function () {
    basic.showString("Best")
    basic.showNumber(best)
})
// endregion

// region: fixed
let waiting = false
let start = 0
input.onButtonPressed(Button.B, function () {
    waiting = false
    basic.clearScreen()
    basic.pause(2000)
    basic.showIcon(IconNames.Heart)
    start = input.runningTime()
    waiting = true
})
input.onButtonPressed(Button.A, function () {
    if (waiting) {
        waiting = false
        basic.showNumber(input.runningTime() - start)
    } else {
        basic.showIcon(IconNames.No)
    }
})
// endregion
