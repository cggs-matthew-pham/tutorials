// Counting: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
let count = 0
basic.showNumber(count)
input.onButtonPressed(Button.A, function () {
    count += 1
    basic.showNumber(count)
})
// endregion

// region: trace
let count = 0
input.onButtonPressed(Button.A, function () {
    count += 1
    basic.showNumber(count)
})
input.onButtonPressed(Button.B, function () {
    count = 0
    basic.showNumber(count)
})
// endregion

// region: bug
let count = 0
input.onButtonPressed(Button.A, function () {
    count += 1
})
basic.forever(function () {
    count = 0
    basic.showNumber(count)
})
// endregion

// region: modify
let count = 0
basic.showNumber(count)
input.onButtonPressed(Button.A, function () {
    count += 1
    basic.showNumber(count)
})
// endregion

// region: sol-by-two
let count = 0
basic.showNumber(count)
input.onButtonPressed(Button.A, function () {
    count += 2
    basic.showNumber(count)
})
// endregion

// region: sol-down
let count = 0
basic.showNumber(count)
input.onButtonPressed(Button.A, function () {
    count += 2
    basic.showNumber(count)
})
input.onButtonPressed(Button.B, function () {
    count += -1
    basic.showNumber(count)
})
// endregion

// region: make
let steps = 0
// endregion

// region: sol-make
let steps = 0
input.onGesture(Gesture.Shake, function () {
    steps += 1
})
input.onButtonPressed(Button.A, function () {
    basic.showNumber(steps)
})
input.onButtonPressed(Button.B, function () {
    steps = 0
    basic.showIcon(IconNames.Yes)
})
// endregion

// region: scoreboard
let home = 0
let away = 0
input.onButtonPressed(Button.A, function () {
    home += 1
    basic.showString("H")
    basic.showNumber(home)
})
input.onButtonPressed(Button.B, function () {
    away += 1
    basic.showString("A")
    basic.showNumber(away)
})
// endregion
